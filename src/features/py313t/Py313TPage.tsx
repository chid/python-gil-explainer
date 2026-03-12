import { useMemo, useState } from 'react';
import { scenarioPack } from '../../content';
import { ScenarioPicker } from '../../components/ScenarioPicker';
import { SectionCard } from '../../components/SectionCard';
import { StatStrip } from '../../components/StatStrip';
import { TimelinePlayer } from '../../components/TimelinePlayer';
import { toParamsFromScenario } from '../../core/useScenarioSimulation';
import { runSimulation } from '../../core/simulation';

export function Py313TPage(): JSX.Element {
  const scenarios = scenarioPack.scenarios;
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
    </div>
  );
}
