# Copilot instructions — vibe-ui

This file captures concise, repo-specific guidance for future Copilot/Codex sessions.

## Quick commands (what exists)

- Setup: `npm install`
- Dev server: `npm run dev` (Astro)
- Build: `npm run build`
- Preview a build: `npm run preview`

Note: package.json currently does not define `test` or `lint` scripts. The feature specs reference Vitest (unit) and Playwright (e2e); when those are configured, the recommended scripts are:

- `npm run test` → `vitest`
- `npm run test:unit` → run unit tests
- `npm run test:e2e` → `playwright test`

Examples for running a single test (once tooling is added):
- Vitest (single file): `npx vitest run tests/unit/path/to/file.test.ts`
- Vitest (single test by name): `npx vitest -t "test name"`
- Playwright (single spec): `npx playwright test tests/e2e/path/to/spec.ts`

## High-level architecture (big picture)

- Single Astro project at the repository root. Pages and SSR components live under `src/`.
- Token-first design system: tokens are the source of truth (JSON registry under `src/lib/tokens` or `src/styles/tokens` per plan) and are emitted as CSS variables; Tailwind maps semantic roles to `hsl(var(--token))`.
- React islands are used only for interactive controls requiring client logic (combobox, overlays, drawer, dialog) and live under `src/islands/react`.
- Stable visual-regression anchor pages ("stories") live at `src/pages/ui/stories/`.
- Feature specs, plans, tasks, contracts and checklists are under `specs/feature/001/design-system/` (look for `plan.md`, `tasks.md`, `contracts/`, `checklists/`).

## Key conventions and repo-specific rules

- Tokens-only discipline: components must not use raw hex/spacing/shadow/motion values. Use token ids (dot-separated lowercase, e.g. `color.text.primary`) and the token registry. See `specs/feature/001/design-system/contracts/tokens.schema.json` for the canonical schema.
- Tailwind mapping: prefer semantic utilities that resolve to token-based CSS variables (avoid hard-coded Tailwind color literals in components).
- Islands rule: prefer Astro SSR components; only convert to a React island when client behavior and focus management are non-trivial.
- Story & docs policy: every primitive should ship with a story and a docs page (`src/pages/ui/stories/*` and `src/pages/docs/design-system/*`) that show usage + do/don't guidance.
- Task discipline: tasks in `specs/feature/001/design-system/tasks.md` follow the cheap-AI convention. Before starting a task, append `(IN PROGRESS)` to the task line; after finishing, mark `- [x]` and add verification notes. Tasks are intended to be ~30–120 minutes; split if longer.
- AGENTS.md: contains a manual additions block. Preserve manual content when running automated updates; do not allow scripts to overwrite it without explicit review.
- Checklists: the implementation gate checklist is `specs/feature/001/design-system/checklists/requirements.md` and must be all-checked before implementation phases proceed.

## Useful paths & files

- `README.md` — general project README (Astro starter content)
- `package.json` — scripts and dependencies (currently includes `dev`, `build`, `preview`)
- `AGENTS.md` — agent guidance and manual additions
- `specs/feature/001/design-system/` — main design system spec (plan.md, tasks.md, research.md, data-model.md, quickstart.md, contracts/, checklists/)
- token schema/contracts: `specs/feature/001/design-system/contracts/tokens.schema.json`, `components.schema.json`

## Notes for Copilot sessions / automations

- The repo uses `.specify`/speckit artifacts; some helper scripts expect a specific feature directory name. If you see scripts failing (missing feature dir), run `/speckit.specify` or check `specs/feature/001/design-system/` for the canonical spec files.
- When adding test or lint tooling, add explicit scripts to `package.json` so Copilot can run single-file commands (`npx vitest run <file>` or `npx playwright test <spec>`).
- Preserve `AGENTS.md` manual blocks and avoid committing secrets or local-only config.

---

If you'd like, configure an MCP server for Playwright e2e runs (recommended for visual/e2e automation).