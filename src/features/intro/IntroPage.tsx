import { Link } from 'react-router-dom';
import { SectionCard } from '../../components/SectionCard';

export function IntroPage(): JSX.Element {
  return (
    <div className="page-grid">
      <SectionCard
        title="Why This Lab Exists"
        subtitle="Understand thread behavior by manipulating runtime parameters, not by reading static text."
      >
        <p>
          This interactive site models how CPython&apos;s process-wide GIL serializes bytecode execution and how
          Python 3.13t free-threading changes concurrency behavior.
        </p>
        <p>
          Use the simulator to test workload and contention assumptions, then compare models side-by-side.
        </p>
      </SectionCard>

      <SectionCard title="Learning Path" subtitle="Follow this sequence for the quickest mental model.">
        <ol className="list-flow">
          <li>GIL Mechanics: single-owner lock timeline.</li>
          <li>Python 3.13t: free-threading execution shape and tradeoffs.</li>
          <li>Simulator Lab: vary inputs and observe stats.</li>
          <li>Compare: synchronized runtime visualization.</li>
          <li>Quiz: verify model-level understanding.</li>
        </ol>
        <p>
          <Link to="/gil" className="inline-link">
            Start with GIL Mechanics
          </Link>
        </p>
      </SectionCard>
    </div>
  );
}
