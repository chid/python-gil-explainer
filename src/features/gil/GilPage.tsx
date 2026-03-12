import { useMemo, useState } from 'react';
import { scenarioPack } from '../../content';
import { ScenarioPicker } from '../../components/ScenarioPicker';
import { SectionCard } from '../../components/SectionCard';
import { StatStrip } from '../../components/StatStrip';
import { TimelinePlayer } from '../../components/TimelinePlayer';
import { toParamsFromScenario } from '../../core/useScenarioSimulation';
import { runSimulation } from '../../core/simulation';

export function GilPage(): JSX.Element {
  const lesson = scenarioPack.lessons.find((item) => item.id === 'gil-basics');
  const scenarios = scenarioPack.scenarios.filter((item) =>
    lesson ? lesson.scenarios.includes(item.id) : true
  );
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

      <SectionCard title="Model Limits" subtitle="This page is an educational approximation, not a bytecode tracer.">
        <ul className="list-flow">
          <li>Timeline ticks are conceptual units, not wall-clock milliseconds.</li>
          <li>Contention and waiting are normalized for clarity instead of exact runtime counters.</li>
          <li>Extension behavior and I/O release patterns are simplified into aggregate workload types.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Common Misconceptions" subtitle="Use these checks to avoid incorrect mental models.">
        <ul className="list-flow">
          <li>Myth: GIL means threads are useless. Reality: I/O-bound concurrency can still benefit.</li>
          <li>Myth: One thread always keeps the GIL. Reality: ownership rotates as scheduling progresses.</li>
          <li>Myth: GIL eliminates switching overhead. Reality: context switches still happen and affect throughput.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
