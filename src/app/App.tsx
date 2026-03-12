import { NavLink, Route, Routes } from 'react-router-dom';
import { IntroPage } from '../features/intro/IntroPage';
import { GilPage } from '../features/gil/GilPage';
import { Py313TPage } from '../features/py313t/Py313TPage';
import { SimulatorPage } from '../features/simulator/SimulatorPage';
import { ComparePage } from '../features/compare/ComparePage';
import { QuizPage } from '../features/quiz/QuizPage';

const links = [
  { to: '/', label: 'Intro' },
  { to: '/gil', label: 'GIL Mechanics' },
  { to: '/py313t', label: 'Python 3.13t' },
  { to: '/simulator', label: 'Simulator Lab' },
  { to: '/compare', label: 'Compare' },
  { to: '/quiz', label: 'Quiz' }
];

export function App(): JSX.Element {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Interactive Runtime Lab</p>
          <h1>Python GIL and 3.13t</h1>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-frame">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/gil" element={<GilPage />} />
          <Route path="/py313t" element={<Py313TPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </main>
    </div>
  );
}
