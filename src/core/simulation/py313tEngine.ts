import type { EventFrame } from '../../types/content';
import type { SimulationEngine, SimulationParams, SimulationResult } from '../../types/simulation';
import { contentionToWaitFactor, workloadParallelism, toThreadId } from './shared';

export class Py313TSimulationEngine implements SimulationEngine {
  readonly model = 'py313t' as const;

  run(params: SimulationParams): SimulationResult {
    const frames: EventFrame[] = [];
    let switches = 0;
    let totalWaiting = 0;
    let previousFirstRunner = 0;

    const parallelSlots = Math.max(
      1,
      Math.min(params.threadCount, workloadParallelism[params.workload])
    );

    for (let tick = 0; tick < params.ticks; tick += 1) {
      const firstRunner = tick % params.threadCount;
      if (tick > 0 && firstRunner !== previousFirstRunner) {
        switches += 1;
      }
      previousFirstRunner = firstRunner;

      const runningThreadIds = Array.from({ length: parallelSlots }, (_, slot) =>
        toThreadId((firstRunner + slot) % params.threadCount)
      );

      const candidateWaiters = params.threadCount - runningThreadIds.length;
      const waiters = Math.max(
        0,
        Math.min(
          candidateWaiters,
          Math.round(candidateWaiters * contentionToWaitFactor[params.contention] * 0.6)
        )
      );

      const waitingThreadIds = Array.from({ length: waiters }, (_, index) =>
        toThreadId((firstRunner + parallelSlots + index) % params.threadCount)
      );
      totalWaiting += waitingThreadIds.length;

      frames.push({
        tick,
        ownerThreadId: null,
        runningThreadIds,
        waitingThreadIds,
        note:
          runningThreadIds.length > 1
            ? `${runningThreadIds.length} threads advance in parallel without a process-wide GIL.`
            : `${runningThreadIds[0]} executes with free-threading overhead constraints.`
      });
    }

    return {
      model: this.model,
      frames,
      stats: {
        contextSwitches: switches,
        averageWaitingThreads: params.ticks ? totalWaiting / params.ticks : 0,
        maxParallelThreads: parallelSlots
      }
    };
  }
}
