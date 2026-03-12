import { useMemo, useState } from 'react';
import { scenarioPack } from '../../content';
import { ScenarioPicker } from '../../components/ScenarioPicker';
import { SectionCard } from '../../components/SectionCard';
import { SimulationControls } from '../../components/SimulationControls';
import { StatStrip } from '../../components/StatStrip';
import { TimelinePlayer } from '../../components/TimelinePlayer';
import { toParamsFromScenario } from '../../core/useScenarioSimulation';
import { runSimulation } from '../../core/simulation';

export function ComparePage(): JSX.Element {
  const scenarios = scenarioPack.scenarios;
  const [scenarioId, setScenarioId] = useState(scenarios[1]?.id ?? scenarios[0].id);

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  const [controls, setControls] = useState(() => toParamsFromScenario('gil', scenario));

  const gilResult = useMemo(() => runSimulation({ ...controls, model: 'gil' }), [controls]);
  const freeThreadResult = useMemo(() => runSimulation({ ...controls, model: 'py313t' }), [controls]);

  return (
    <div className="page-grid">
      <SectionCard
        title="Side-by-Side Model Comparison"
        subtitle="Drive both models with the same parameters to compare scheduling and parallelism."
      >
        <ScenarioPicker
          scenarios={scenarios}
          selectedId={scenario.id}
          onSelect={(nextId) => {
            setScenarioId(nextId);
            const nextScenario = scenarios.find((item) => item.id === nextId) ?? scenarios[0];
            setControls(toParamsFromScenario('gil', nextScenario));
          }}
        />
        <SimulationControls value={controls} onChange={setControls} />

        <div className="compare-grid">
          <article>
            <h3>CPython GIL</h3>
            <StatStrip result={gilResult} />
            <TimelinePlayer result={gilResult} title="GIL Timeline" />
          </article>

          <article>
            <h3>Python 3.13t</h3>
            <StatStrip result={freeThreadResult} />
            <TimelinePlayer result={freeThreadResult} title="3.13t Timeline" />
          </article>
        </div>
      </SectionCard>
    </div>
  );
}
