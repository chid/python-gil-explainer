import type { SimulationResult } from '../types/simulation';

interface StatStripProps {
  result: SimulationResult;
}

export function StatStrip({ result }: StatStripProps): JSX.Element {
  return (
    <div className="stat-strip">
      <article>
        <p>Context Switches</p>
        <strong>{result.stats.contextSwitches}</strong>
      </article>
      <article>
        <p>Avg Waiting Threads</p>
        <strong>{result.stats.averageWaitingThreads.toFixed(2)}</strong>
      </article>
      <article>
        <p>Max Parallel Threads</p>
        <strong>{result.stats.maxParallelThreads}</strong>
      </article>
    </div>
  );
}
