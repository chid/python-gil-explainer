import type { RuntimeModel } from '../../types/content';
import type { SimulationEngine, SimulationParams, SimulationResult } from '../../types/simulation';
import { GilSimulationEngine } from './gilEngine';
import { Py313TSimulationEngine } from './py313tEngine';

const engines: Record<RuntimeModel, SimulationEngine> = {
  gil: new GilSimulationEngine(),
  py313t: new Py313TSimulationEngine()
};

export function runSimulation(params: SimulationParams): SimulationResult {
  return engines[params.model].run(params);
}

export function getEngine(model: RuntimeModel): SimulationEngine {
  return engines[model];
}
