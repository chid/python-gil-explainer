# TODO and Next Steps

## Immediate Stabilization (P0)
- [ ] Add deterministic simulation snapshots for key scenarios.
  - Why: lock expected timeline outputs and prevent accidental behavior drift.
  - Deliverable: fixture snapshots for `cpu-four-threads`, `mixed-six-threads`, `io-eight-threads` in both models.
- [ ] Add route-level smoke tests for all pages.
  - Why: ensure future refactors do not break navigation or base rendering.
  - Deliverable: test coverage for Intro, GIL, 3.13t, Simulator, Compare, Quiz routes.
- [ ] Add error state handling for malformed/empty scenario packs.
  - Why: future pack loading should fail safely in UI.
  - Deliverable: user-visible fallback panel + unit tests for error boundaries.

## Content Accuracy and Depth (P1)
- [ ] Expand explanation panels with explicit assumptions and simplifications.
  - Why: avoid confusion between educational model and exact runtime internals.
  - Deliverable: “Model Limits” cards on GIL and 3.13t pages.
- [ ] Add 6-10 additional canonical scenarios.
  - Why: broader intuition across thread counts and contention patterns.
  - Deliverable: new scenario pack entries covering lock-heavy mutation, extension-heavy compute, and mixed burst traffic.
- [ ] Add misconception-focused quiz items.
  - Why: improve learning retention and practical understanding.
  - Deliverable: 3-question minimum per lesson with explanation text.

## Interactivity and UX (P1)
- [ ] Add timeline playback controls.
  - Why: users need pause, rewind, speed controls, and manual scrub.
  - Deliverable: `play/pause`, `step`, `speed`, and drag scrubber controls reusable across timeline components.
- [ ] Add synchronized compare cursors.
  - Why: side-by-side analysis is strongest when frame index is locked.
  - Deliverable: single source of truth frame index and shared control bar in compare view.
- [ ] Add mobile-specific layout tuning.
  - Why: improve readability and control affordance on smaller screens.
  - Deliverable: stacked control groups and larger touch targets below 768px.

## Extensibility (P2)
- [ ] Implement scenario pack registry/discovery.
  - Why: enable plug-and-play feature packs without hardcoded imports.
  - Deliverable: pack manifest index and loader contract with validation.
- [ ] Introduce persistent learning state.
  - Why: users can resume progress and compare runs over time.
  - Deliverable: localStorage-backed progress for visited modules and quiz scores.
- [ ] Add export/share capability for simulation runs.
  - Why: supports teaching, debugging discussions, and reproducible examples.
  - Deliverable: JSON export plus permalink encoding of current simulator settings.

## Quality, Accessibility, and Ops (P2)
- [ ] Add keyboard-first timeline interactions.
  - Why: improve accessibility and power-user workflow.
  - Deliverable: focusable controls, arrow-key stepping, and space to play/pause.
- [ ] Add accessibility audit checks in CI.
  - Why: prevent regressions in semantics, contrast, and reduced-motion behavior.
  - Deliverable: automated checks integrated into test pipeline.
- [ ] Add CI pipeline for test + build on pull requests.
  - Why: keep main branch always shippable.
  - Deliverable: GitHub Actions workflow running `npm run test` and `npm run build`.

## Proposed Execution Order
1. Stabilization and coverage hardening (P0).
2. Playback/synchronized compare controls (P1 UX core).
3. Content expansion and misconception quizzes (P1 content).
4. Registry + persistence + exports (P2 platform).
5. Accessibility/CI operational hardening (P2 quality).
