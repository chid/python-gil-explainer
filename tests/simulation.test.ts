import { describe, expect, it } from 'vitest';
import { runSimulation } from '../src/core/simulation';
import type { SimulationParams } from '../src/types/simulation';

const base: Omit<SimulationParams, 'model'> = {
  threadCount: 6,
  ticks: 20,
  workload: 'mixed',
  contention: 'medium',
  switchInterval: 3
};

describe('simulation engines', () => {
  it('gil model stays single-threaded for running execution', () => {
    const result = runSimulation({ ...base, model: 'gil' });

    expect(result.frames.length).toBe(base.ticks);
    expect(result.stats.maxParallelThreads).toBe(1);
    expect(result.frames.every((frame) => frame.runningThreadIds.length === 1)).toBe(true);
  });

  it('3.13t model provides parallel running slots for mixed workload', () => {
    const result = runSimulation({ ...base, model: 'py313t' });

    expect(result.frames.length).toBe(base.ticks);
    expect(result.stats.maxParallelThreads).toBeGreaterThan(1);
    expect(result.frames.some((frame) => frame.runningThreadIds.length > 1)).toBe(true);
  });
});
