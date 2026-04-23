# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server with hot reload
npm run build        # tsc -b then Vite build to dist/
npm run test         # Run all tests once with Vitest
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview built app (requires build first)
```

To run a single test file:
```bash
npx vitest run tests/simulation.test.ts
```

There is no linter configured (no ESLint or Prettier).

## Architecture

The app is a React + TypeScript SPA that visualizes Python GIL and 3.13t free-threading behavior through interactive simulations.

### Simulation Engines (`src/core/simulation/`)

The central abstraction is a pair of pluggable engines that model thread execution per tick:

- **`gilEngine.ts`** — GIL model: one thread owns the lock at a time (`maxParallelThreads=1`), ownership rotates on `switchInterval` ticks.
- **`py313tEngine.ts`** — Free-threading model: multiple threads can run concurrently; actual parallelism is capped by `workloadParallelism` (cpu_bound=1, mixed=2, io_bound=3).
- **`shared.ts`** — Shared utilities: `contentionToWaitFactor`, `workloadParallelism`, `toThreadId()`, `rotateThread()`.

Both engines consume `SimulationParams` and produce `SimulationResult` (an array of `EventFrame` snapshots + aggregate stats). The types live in `src/types/simulation.ts`.

### Content Model (`src/content/` + `src/types/content.ts`)

A `ScenarioPack` holds three collections: `lessons`, `scenarios`, and `quizzes`. The pack loader in `scenarioPack.ts` validates all scenario ID references and throws on any inconsistency at module load time. All default content (7 scenarios, 2 lessons, quiz items) is defined in `content/defaultPack.ts`.

### UI Layer

- **`src/app/App.tsx`** — React Router v6 with 6 routes mapping to page components in `src/features/`.
- **`src/features/`** — One directory per page: `intro`, `gil`, `py313t`, `simulator`, `compare`, `quiz`.
- **`src/components/`** — Shared components: `TimelinePlayer` (frame animation), `SimulationControls` (param sliders/selects), `ScenarioPicker`, `StatStrip`, `SectionCard`.
- **`src/core/useScenarioSimulation.ts`** — Custom hook that owns `SimulationParams` state and memoizes `runSimulation()` calls; used by pages that need interactive simulation.

State management is plain React hooks (no Redux or Context). `ComparePage` is the most complex page — it drives two simultaneous simulations (GIL vs. 3.13t) from a single shared `SimulationParams` instance.

### Styling

Single `src/styles/global.css` with CSS custom properties for the color palette (teal accent `#0f766e`, warm beige backgrounds). No CSS modules or styled-components. Fonts loaded via Google Fonts in `index.html`.

### Testing

Tests live in `tests/` and use Vitest + jsdom + Testing Library. The four test files cover: engine logic (`simulation.test.ts`), pack validation (`scenarioPack.test.ts`), page rendering (`lessonPages.test.tsx`), and component interactions (`controls.test.tsx`).

TypeScript strict mode is on with `noUnusedLocals` and `noUnusedParameters` enforced by the compiler.
