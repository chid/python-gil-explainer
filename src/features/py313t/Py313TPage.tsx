import { useMemo, useState } from 'react';
import { scenarioPack } from '../../content';
import { ScenarioPicker } from '../../components/ScenarioPicker';
import { SectionCard } from '../../components/SectionCard';
import { StatStrip } from '../../components/StatStrip';
import { TimelinePlayer } from '../../components/TimelinePlayer';
import { toParamsFromScenario } from '../../core/useScenarioSimulation';
import { runSimulation } from '../../core/simulation';

export function Py313TPage(): JSX.Element {
  const lesson = scenarioPack.lessons.find((item) => item.id === 'py313t-basics');
  const scenarios = scenarioPack.scenarios.filter((item) =>
    lesson ? lesson.scenarios.includes(item.id) : true
  );
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? '');

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const result = useMemo(() => runSimulation(toParamsFromScenario('py313t', scenario)), [scenario]);

  return (
    <div className="page-grid">
      <SectionCard
        title="Python 3.13t Free-Threading"
        subtitle="3.13t removes the process-wide GIL, allowing true multi-thread parallel Python execution."
      >
        <ScenarioPicker scenarios={scenarios} selectedId={scenario.id} onSelect={setScenarioId} />
        <TimelinePlayer result={result} title="Parallel Execution Timeline" />
        <StatStrip result={result} />
      </SectionCard>

      <SectionCard title="Model Limits" subtitle="This visualization explains the model, not exact production profiling data.">
        <ul className="list-flow">
          <li>Parallel slots represent conceptual concurrency, not core-pinned execution traces.</li>
          <li>Synchronization overhead is summarized and does not model every internal lock path.</li>
          <li>Scheduler fairness and contention behavior are intentionally simplified for readability.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Common Misconceptions" subtitle="Free-threading changes constraints, but it does not remove tradeoffs.">
        <ul className="list-flow">
          <li>Myth: 3.13t always makes threaded code faster. Reality: overhead and contention still matter.</li>
          <li>Myth: Data races disappear. Reality: shared mutable state still needs synchronization.</li>
          <li>Myth: Scheduling complexity vanishes. Reality: concurrency debugging remains essential.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
