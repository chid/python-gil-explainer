import { useMemo, useState } from 'react';
import { SectionCard } from '../../components/SectionCard';
import { SimulationControls } from '../../components/SimulationControls';
import { StatStrip } from '../../components/StatStrip';
import { TimelinePlayer } from '../../components/TimelinePlayer';
import { scenarioPack } from '../../content';
import { toParamsFromScenario } from '../../core/useScenarioSimulation';
import { runSimulation } from '../../core/simulation';

export function SimulatorPage(): JSX.Element {
  const seed = scenarioPack.scenarios[0];
  const [params, setParams] = useState(() => toParamsFromScenario('gil', seed));
  const result = useMemo(() => runSimulation(params), [params]);

  return (
    <div className="page-grid">
      <SectionCard
        title="Simulator Lab"
        subtitle="Adjust workload, contention, and switching to inspect runtime behavior changes."
      >
        <SimulationControls value={params} onChange={setParams} />
        <StatStrip result={result} />
        <TimelinePlayer result={result} />
      </SectionCard>
    </div>
  );
}
