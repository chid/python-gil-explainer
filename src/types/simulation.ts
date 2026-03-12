import type { EventFrame, RuntimeModel, Scenario } from './content';

export interface SimulationParams {
  model: RuntimeModel;
  threadCount: number;
  ticks: number;
  workload: Scenario['workload'];
  contention: Scenario['contention'];
  switchInterval: number;
}

export interface SimulationResult {
  model: RuntimeModel;
  frames: EventFrame[];
  stats: {
    contextSwitches: number;
    averageWaitingThreads: number;
    maxParallelThreads: number;
  };
}

export interface SimulationEngine {
  readonly model: RuntimeModel;
  run(params: SimulationParams): SimulationResult;
}
