import type { Scenario } from '../../types/content';

export const contentionToWaitFactor: Record<Scenario['contention'], number> = {
  low: 0.25,
  medium: 0.5,
  high: 0.8
};

export const workloadParallelism: Record<Scenario['workload'], number> = {
  cpu_bound: 1,
  mixed: 2,
  io_bound: 3
};

export function rotateThread(current: number, threadCount: number): number {
  return (current + 1) % Math.max(1, threadCount);
}

export function toThreadId(index: number): string {
  return `T${index + 1}`;
}
