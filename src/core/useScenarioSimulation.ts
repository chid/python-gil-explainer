import { useMemo, useState } from 'react';
import type { Scenario } from '../types/content';
import type { SimulationParams } from '../types/simulation';
import { runSimulation } from './simulation';

export function toParamsFromScenario(model: SimulationParams['model'], scenario: Scenario): SimulationParams {
  return {
    model,
    threadCount: scenario.threadCount,
    ticks: scenario.defaultTicks,
    workload: scenario.workload,
    contention: scenario.contention,
    switchInterval: 3
  };
}

export function useScenarioSimulation(scenario: Scenario, initialModel: SimulationParams['model']): {
  params: SimulationParams;
  setParams: (params: SimulationParams) => void;
  result: ReturnType<typeof runSimulation>;
} {
  const [params, setParams] = useState<SimulationParams>(() =>
    toParamsFromScenario(initialModel, scenario)
  );

  const result = useMemo(() => runSimulation(params), [params]);

  return { params, setParams, result };
}
