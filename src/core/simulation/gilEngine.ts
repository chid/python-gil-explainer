import type { EventFrame } from '../../types/content';
import type { SimulationEngine, SimulationParams, SimulationResult } from '../../types/simulation';
import { contentionToWaitFactor, rotateThread, toThreadId } from './shared';

export class GilSimulationEngine implements SimulationEngine {
  readonly model = 'gil' as const;

  run(params: SimulationParams): SimulationResult {
    const frames: EventFrame[] = [];
    let owner = 0;
    let switches = 0;
    let totalWaiting = 0;

    for (let tick = 0; tick < params.ticks; tick += 1) {
      if (tick > 0 && tick % Math.max(1, params.switchInterval) === 0) {
        owner = rotateThread(owner, params.threadCount);
        switches += 1;
      }

      const waitingCount = Math.max(
        0,
        Math.min(
          params.threadCount - 1,
          Math.round((params.threadCount - 1) * contentionToWaitFactor[params.contention])
        )
      );
      const waitingThreadIds = Array.from({ length: waitingCount }, (_, index) =>
        toThreadId((owner + index + 1) % params.threadCount)
      );
      totalWaiting += waitingThreadIds.length;

      frames.push({
        tick,
        ownerThreadId: toThreadId(owner),
        runningThreadIds: [toThreadId(owner)],
        waitingThreadIds,
        note:
          waitingThreadIds.length > 0
            ? `${toThreadId(owner)} holds the GIL while ${waitingThreadIds.length} thread(s) wait.`
            : `${toThreadId(owner)} holds the GIL with no visible contention.`
      });
    }

    return {
      model: this.model,
      frames,
      stats: {
        contextSwitches: switches,
        averageWaitingThreads: params.ticks ? totalWaiting / params.ticks : 0,
        maxParallelThreads: 1
      }
    };
  }
}
