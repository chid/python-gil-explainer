import { useMemo, useState } from 'react';
import { scenarioPack } from '../../content';
import { ScenarioPicker } from '../../components/ScenarioPicker';
import { SectionCard } from '../../components/SectionCard';
import { StatStrip } from '../../components/StatStrip';
import { TimelinePlayer } from '../../components/TimelinePlayer';
import { toParamsFromScenario } from '../../core/useScenarioSimulation';
import { runSimulation } from '../../core/simulation';

export function GilPage(): JSX.Element {
  const scenarios = scenarioPack.scenarios;
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? '');

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const result = useMemo(() => runSimulation(toParamsFromScenario('gil', scenario)), [scenario]);

  return (
    <div className="page-grid">
      <SectionCard
        title="GIL Mechanics"
        subtitle="In classic CPython, one thread holds the interpreter lock for bytecode execution."
      >
        <ScenarioPicker scenarios={scenarios} selectedId={scenario.id} onSelect={setScenarioId} />
        <TimelinePlayer result={result} title="Single Lock Ownership Timeline" />
        <StatStrip result={result} />
      </SectionCard>
    </div>
  );
}
