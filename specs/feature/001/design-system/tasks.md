---
description: "Task list for SaaS Design System (tokens + components + stories)"
---

# Tasks: SaaS Design System (v1)

**Input**: Design documents from `C:\Users\nugra\workspace\project\local-rag\vibe-ui\specs\feature\001\design-system\`  
**Prerequisites**: `specs/feature/001/design-system/plan.md` (required), `specs/feature/001/design-system/spec.md` (required)  

**Organization**: Tasks are grouped by user story so each story can be delivered and reviewed independently.

**Timebox rule**: Each task is intended to be 30-120 minutes. If it will exceed 120 minutes, split it.

## Constitution-Driven Tasks (UI Work)

If the feature touches UI, include explicit tasks for:

- Design tokens + theming (semantic tokens only; themes via `data-theme` + `data-contrast`)
- Base styles (body bg/text defaults, focus ring, link styling, reduced motion support)
- Component states (default/hover/active/focus/disabled/loading/error/success as applicable)
- Responsive behavior (tables -> cards, sidebar -> drawer, forms 2-col -> 1-col)
- Typography system (UI scale vs prose scale; prose wrapper incl. code blocks)
- Design system first: reuse before new; no raw values in components; docs required for primitives

## Task Authoring & Progress Discipline (Cheap AI-Ready)

This list is intended to be executable by a human or a low-context, low-reasoning model.

Progress discipline:
- Before starting a task: append `(IN PROGRESS)` to the task line.
- After finishing: change `- [ ]` to `- [x]`, remove `(IN PROGRESS)`, and add verification notes under the task.

Stop-and-escalate discipline:
- If you cannot proceed without guessing, STOP and add a `CLARIFY` task that states:
  the question, options, and which tasks are blocked.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the minimum scaffolding so foundational token/theme work is straightforward.

- [x] T001 Audit current styling + Tailwind usage in `src/styles/global.css`
Scope: Determine what exists today (Tailwind v4 CSS import only, no tokens yet) and what must change.
Files: `src/styles/global.css`, `src/layouts/Layout.astro`, `astro.config.mjs`, `package.json`
Acceptance: Written audit doc exists and lists next actions without ambiguity.
Verify: Create `specs/feature/001/design-system/notes/setup-audit.md` with:
existing state, gaps vs constitution, and the exact files to change in M1.
STOP-AND-ESCALATE: If Tailwind config already exists elsewhere or tokens already exist in CSS.

- [x] T002 Create baseline folder scaffolding for the design system

Verify: Created placeholder directories and .gitkeep files; run git status to confirm new files are present.

Scope: Add empty placeholder files to anchor the planned structure (no components yet).
Files: `src/components/ui/.gitkeep`, `src/components/forms/.gitkeep`, `src/components/layout/.gitkeep`, `src/components/nav/.gitkeep`, `src/components/ai/.gitkeep`, `src/islands/react/.gitkeep`, `src/pages/ui/stories/.gitkeep`, `src/pages/docs/design-system/.gitkeep`, `src/styles/tokens/.gitkeep`, `src/styles/themes/.gitkeep`, `src/styles/typography/.gitkeep`, `src/styles/motion/.gitkeep`, `src/styles/generated/.gitkeep`, `src/lib/tokens/.gitkeep`, `src/lib/a11y/.gitkeep`, `tests/unit/.gitkeep`, `tests/e2e/.gitkeep`, `scripts/tokens/.gitkeep`
Acceptance: Folders exist and are tracked by git (placeholders committed).
Verify: `git status` shows the new files; no other unrelated changes.
STOP-AND-ESCALATE: If the repo uses a different structure already (document it and propose mapping).

- [x] T003 Update `README.md` to describe the design system workflow and story routes

Verify: README updated with commands, token locations, theme switching info, and /ui/stories; run `npm run dev` and open /ui/stories to verify.
Scope: Replace the default Astro starter README with DS-specific usage instructions.
Files: `README.md`
Acceptance: README includes:
commands, where tokens live, how to switch themes, and where to find `/ui/stories`.
Verify: `npm run dev` instructions remain correct; no dead links.
STOP-AND-ESCALATE: If the expected story routes differ from the plan (must reconcile first).

- [x] T004 Decide how `AGENTS.md` is handled and make it explicit

Acceptance: AGENTS.md is committed to the repo and manual additions are preserved.
Verify: Ensure AGENTS.md is tracked (git ls-files AGENTS.md) and README contains guidance to preserve the manual block when updating automation scripts.
Scope: Ensure the repo has a stable agent guidance file policy (commit or ignore) and is consistent.
Files: `AGENTS.md`, `.gitignore` (only if needed)
Acceptance: Either:
1) `AGENTS.md` is committed and contains correct manual additions, or
2) `AGENTS.md` is added to `.gitignore` with rationale recorded in docs.
Verify: `git status` reflects the chosen policy; no ambiguity for future automation.
STOP-AND-ESCALATE: If committing `AGENTS.md` would leak private info (do not commit).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tokens, themes, mapping, base styles, typography split, motion rules, and test scaffolding.

**⚠️ CRITICAL**: No component work can begin until this phase is complete.

- [x] T005 Define token registry source-of-truth as JSON in `src/lib/tokens/tokens.v1.json`

Verify: tokens.v1.json created under src/lib/tokens with foundation tokens (space/radius/font/motion), semantic tokens (color.surface.*, color.text.*, color.border.*, color.state.*, color.link.*, color.ring), and component placeholders (component.button.*, component.input.*, component.formfield.*, component.table.*). Token ids follow dot-separated lowercase contract (e.g., `color.text.primary`).
Scope: Create the machine-readable token registry (token list only, no CSS yet).
Files: `src/lib/tokens/tokens.v1.json`
Acceptance: JSON includes at least:
foundation tokens (space/radius/font/motion), semantic tokens (surface/text/border/state/link/ring),
and component tokens placeholders for v1 primitives (button/input/formfield/table).
Verify: Token ids follow dot-separated lowercase contract (e.g., `color.text.primary`).
STOP-AND-ESCALATE: If naming contract conflicts with constitution; do not invent a new convention.

- [x] T006 Define theme values (light/dark + contrast default/high) in `src/lib/tokens/themes.v1.json`

Verify: themes.v1.json created under src/lib/tokens with values for light/default, light/high, dark/default, dark/high for each semantic token from T005; quick check: ensure each mode has the same number of keys.
Scope: Provide actual token values for all required semantic tokens across 4 modes:
light/default, light/high, dark/default, dark/high.
Files: `src/lib/tokens/themes.v1.json`
Acceptance: Every semantic token from T005 has a value in each mode; no missing keys.
Verify: Quick check by counting keys per theme; values are strings (HSL triplets recommended).
STOP-AND-ESCALATE: If you cannot pick reasonable defaults without brand input; propose neutrals + 1 accent.

- [ ] T007 Add minimal generator script to build CSS variables from JSON
Scope: Create a script that outputs `src/styles/generated/tokens.css` from the JSON registry + themes.
Files: `scripts/tokens/generate-css.mjs`, `src/styles/generated/tokens.css`
Acceptance: Running the script overwrites the generated file deterministically and sets:
`:root` defaults + `[data-theme]` and `[data-contrast]` overrides for modes.
Verify: Run: `node scripts/tokens/generate-css.mjs` and inspect `src/styles/generated/tokens.css`.
STOP-AND-ESCALATE: If script output differs between runs on the same input (must be deterministic).

- [ ] T008 Add Tailwind mapping for semantic tokens (colors/spacing/radius/shadow/motion)
Scope: Ensure Tailwind utilities consume tokens only and no raw palette is exposed.
Files: `tailwind.config.ts` (create), `src/styles/global.css` (update if needed)
Acceptance: Tailwind theme values map to `hsl(var(--token) / <alpha-value>)` for colors and to
CSS variables for spacing/radius/shadows/motion where applicable.
Verify: Build: `npm run build` succeeds; adding a sample class `bg-surface` works in a page.
STOP-AND-ESCALATE: If Tailwind v4 config is not being picked up; document and switch to CSS `@theme`.

- [ ] T009 Implement theme/contrast attribute initialization to avoid FOUC
Scope: Apply `data-theme` and `data-contrast` early based on:
persisted override else OS preference.
Files: `src/lib/tokens/theme.ts` (create), `src/layouts/Layout.astro` (update)
Acceptance: Layout sets the correct attributes on first paint (no flash from wrong theme).
Verify: Manual test: set localStorage overrides, reload, confirm attributes on `<html>` or `<body>`.
STOP-AND-ESCALATE: If deciding between `<html>` vs `<body>` attributes changes too much; pick one and be consistent.

- [ ] T010 Add theme + contrast toggle UI (minimal JS, bounded)
Scope: Provide a small control to set persisted overrides for theme and contrast.
Files: `src/components/nav/ThemeControls.astro` (create), `src/layouts/Layout.astro` (wire in)
Acceptance: Toggle updates attributes and persists overrides; "reset to system" is possible.
Verify: Manual test in devtools Application/Storage; reload persists.
STOP-AND-ESCALATE: If this requires a full framework island; keep it as minimal inline script first.

- [ ] T011 Implement base styles: body, text, surfaces, links, focus ring, reduced motion
Scope: Define a calm enterprise default look using semantic tokens only.
Files: `src/styles/global.css`, `src/styles/generated/tokens.css` (generated)
Acceptance: Base layer includes:
body background/text, link styling, `:focus-visible` ring using `--ring`, and reduced-motion rules.
Verify: Keyboard-tab through a simple page; focus ring is visible in all themes/contrast modes.
STOP-AND-ESCALATE: If any rule requires raw hex or arbitrary spacing; add missing tokens instead.

- [ ] T012 Implement typography tokens and utilities (UI scale vs prose scale)
Scope: Establish consistent font sizes/line heights for UI and prose, tokenized.
Files: `src/styles/typography/ui.css`, `src/styles/typography/prose.css`, `src/components/layout/Prose.astro`
Acceptance: Prose wrapper styles headings/lists/quotes/code blocks; UI scale remains separate.
Verify: Create a temporary page snippet under `src/pages/ui/stories/typography.astro` (later refined).
STOP-AND-ESCALATE: If prose styling requires non-token values; add tokens first.

- [ ] T013 Implement motion tokens and reduced-motion policy
Scope: Define transition durations/easings as tokens and enforce reduced-motion behavior.
Files: `src/styles/motion/tokens.css`, `src/styles/global.css`
Acceptance: Motion utilities reference tokens; reduced motion disables non-essential animation.
Verify: Toggle OS reduced motion (or emulate) and confirm animations reduce.
STOP-AND-ESCALATE: If any animation is required to understand state; add a non-motion fallback.

- [ ] T014 Create layout primitives to enforce max width, padding, spacing rhythm
Scope: Provide reusable Container/Section/Surface primitives to prevent per-page spacing drift.
Files: `src/components/layout/Container.astro`, `src/components/layout/Section.astro`, `src/components/layout/Surface.astro`
Acceptance: Defaults match constitution:
max-w 1200, padding 24, spacing rhythm tokenized.
Verify: Render primitives in a test page; confirm they apply expected spacing classes/tokens.
STOP-AND-ESCALATE: If spacing/rhythm tokens are missing; add them in token registry first.

- [ ] T015 Setup unit test tooling (Vitest) for token/schema validation
Scope: Add minimal unit test setup to validate token registry and theme coverage.
Files: `package.json` (scripts + dev deps), `vitest.config.ts`, `tests/unit/tokens-schema.test.ts`
Acceptance: `npm test` runs and validates:
token id naming contract + theme completeness across modes.
Verify: Run `npm test` and confirm it fails if you remove a token value.
STOP-AND-ESCALATE: If adding test tooling breaks build; revert and isolate config.

- [ ] T016 Setup basic e2e tooling (Playwright) for smoke coverage
Scope: Add Playwright config and 1-2 minimal tests for:
stories page loads, theme persistence attribute present.
Files: `package.json` (scripts + dev deps), `playwright.config.ts`, `tests/e2e/stories-smoke.spec.ts`
Acceptance: `npm run test:e2e` runs locally and passes on dev server URL.
Verify: Run `npx playwright install` (once) then run tests.
STOP-AND-ESCALATE: If CI environment is required; document local-only steps and defer CI wiring.

**Checkpoint**: Foundation ready (tokens/themes/base/typography/motion/layout + test scaffolding).

---

## Phase 3: User Story 1 - Tokens + Themes + Baseline Stories (Priority: P1) 🎯 MVP

**Goal**: A stable story area that demonstrates tokens-only styling, theme switching, and baseline primitives/states.

**Independent Test**: Open `/ui/stories` and verify:
theme + contrast switching, focus ring, token-only styling, and deterministic state coverage.

- [ ] T017 [US1] Create stories index route in `src/pages/ui/stories/index.astro`
Scope: Provide a stable navigation hub for all story pages.
Files: `src/pages/ui/stories/index.astro`, `src/components/layout/Container.astro` (reuse)
Acceptance: Index lists links to all story pages (buttons, inputs, typography, surfaces, tables, modals).
Verify: `npm run dev` and navigate to `/ui/stories`.
STOP-AND-ESCALATE: If routing differs (Astro file-based); follow Astro conventions only.

- [ ] T018 [US1] Implement `Button` primitive (Astro) with full state styling
Scope: Add Button supporting variants and sizes; token-only styles; states visible.
Files: `src/components/ui/Button.astro`, `src/pages/ui/stories/buttons.astro`, `src/pages/docs/design-system/button.astro`
Acceptance: Supports at minimum:
variants (primary/secondary/ghost/destructive/link), sizes (sm/md/lg/icon),
states (default/hover/active/focus/disabled/loading).
Verify: Story page shows all combinations; keyboard focus visible; no raw hex in component.
STOP-AND-ESCALATE: If you need JS for button; do not add it (buttons are SSR).

- [ ] T019 [US1] Implement `Surface/Card` primitive (Astro) for semantic surfaces/elevation
Scope: Provide a neutral surface component for dashboards and marketing cards.
Files: `src/components/ui/Surface.astro`, `src/pages/ui/stories/surfaces.astro`, `src/pages/docs/design-system/surface.astro`
Acceptance: Uses semantic surface/border/shadow tokens; supports subtle elevation options.
Verify: Story page shows surface variants across themes; contrast remains readable.
STOP-AND-ESCALATE: If you introduce new shadow tokens, update JSON + regenerate CSS.

- [ ] T020 [US1] Implement typography story and prose wrapper demo
Scope: Provide a deterministic page showing UI scale vs prose scale.
Files: `src/pages/ui/stories/typography.astro`, `src/components/layout/Prose.astro`, `src/pages/docs/design-system/typography.astro`
Acceptance: Story demonstrates:
UI headings/forms text vs prose article with headings/lists/quotes/code.
Verify: Long strings wrap without breaking layout; code blocks styled.
STOP-AND-ESCALATE: If prose styling requires arbitrary margins; add spacing tokens.

- [ ] T021 [US1] Add a token-drift guard check (fast scan) and wire to `npm run check:tokens`
Scope: Add a cheap check that detects raw hex and obvious raw spacing usage in components.
Files: `package.json` (script), `scripts/tokens/check-token-drift.mjs`
Acceptance: Script fails CI/local if it finds:
`#` hex literals in `src/components/**` or `src/pages/**` (excluding docs snippets if justified).
Verify: Run `npm run check:tokens`.
STOP-AND-ESCALATE: If false positives occur, narrow scope with explicit allowlist comments.

**Checkpoint**: US1 complete (stories hub + button + surfaces + typography + token drift guard).

---

## Phase 4: User Story 2 - Form-Heavy Admin UX Primitives (Priority: P2)

**Goal**: Compose form-heavy screens with consistent states and validation timing (blur + submit).

**Independent Test**: Open a form story page and validate:
labels/help/errors, blur validation behavior, loading/disabled, keyboard navigation, responsive 2-col to 1-col.

- [ ] T022 [US2] Implement `Input` + `Textarea` primitives with validation states
Scope: Provide text inputs with semantic label/description/error wiring support.
Files: `src/components/ui/Input.astro`, `src/components/ui/Textarea.astro`, `src/pages/ui/stories/inputs.astro`, `src/pages/docs/design-system/input.astro`
Acceptance: Inputs support states:
default/focus/disabled/loading/error/success and tolerate long labels/messages.
Verify: Story renders each state; focus ring visible; errors are adjacent to field.
STOP-AND-ESCALATE: If ARIA associations are unclear; follow a standard pattern (id + aria-describedby).

- [ ] T023 [US2] Implement selection controls primitives (Checkbox/Radio/Switch)
Scope: Provide accessible selection controls for admin forms.
Files: `src/components/ui/Checkbox.astro`, `src/components/ui/Radio.astro`, `src/components/ui/Switch.astro`, `src/pages/ui/stories/selection.astro`, `src/pages/docs/design-system/selection.astro`
Acceptance: Keyboard toggle works; labels are clickable; disabled/error states rendered.
Verify: Tab/space/arrow behavior works per control; focus visible.
STOP-AND-ESCALATE: If you need JS for switch; do not add it (use native input).

- [ ] T024 [US2] Implement `FormField` composite (label + helper + error) and responsive grid helpers
Scope: A single source of truth for form field layout and messaging.
Files: `src/components/forms/FormField.astro`, `src/components/forms/FormGrid.astro`, `src/pages/ui/stories/forms.astro`, `src/pages/docs/design-system/formfield.astro`
Acceptance: Enforces:
label/help/error placement, blur+submit validation display, 2-col desktop -> 1-col mobile layout.
Verify: Story includes:
required, optional, error, success, loading, and disabled examples.
STOP-AND-ESCALATE: If it becomes too configurable; reduce props and keep composition-based API.

- [ ] T025 [US2] Add e2e smoke for blur+submit validation timing
Scope: One high-value e2e test for form behavior.
Files: `tests/e2e/forms-validation.spec.ts`
Acceptance: Test covers:
blur shows error, submit blocks when invalid, loading disables submission.
Verify: `npm run test:e2e` passes.
STOP-AND-ESCALATE: If the app has no stable URL for stories; fix story routes first.

- [ ] T026 [US2] Add docs index and navigation for design system docs pages
Scope: Make docs discoverable (not just story pages).
Files: `src/pages/docs/design-system/index.astro`, `src/pages/docs/design-system/_nav.astro` (optional)
Acceptance: Docs index links to all primitive docs created so far; includes "do/don't" sections.
Verify: Navigate to `/docs/design-system` and click through.
STOP-AND-ESCALATE: If routing conflicts with existing docs; align with Astro file routes.

**Checkpoint**: US2 complete (form primitives + FormField composite + e2e form smoke + docs nav).

---

## Phase 5: User Story 3 - Navigation + Data Display for Dashboard (Priority: P3)

**Goal**: Provide dashboard navigation and table patterns with responsive degradation and density modes.

**Independent Test**: Open nav + table stories and validate:
mobile drawer behavior, table comfortable vs dense, and table-to-cards on small screens.

- [ ] T027 [US3] Implement basic nav primitives (Breadcrumbs + Tabs/Segmented)
Scope: Provide low-risk navigation primitives (SSR only).
Files: `src/components/nav/Breadcrumbs.astro`, `src/components/nav/Tabs.astro`, `src/pages/ui/stories/nav.astro`, `src/pages/docs/design-system/nav.astro`
Acceptance: Keyboard accessible; active state visible; long labels do not break.
Verify: Story demonstrates active/disabled/overflow behavior.
STOP-AND-ESCALATE: If tabs require JS roving index; keep v1 minimal or convert to island explicitly.

- [ ] T028 [US3] Implement `SideNav` + mobile drawer pattern (Astro + minimal island only if required)
Scope: Side nav becomes a drawer on mobile with correct focus management.
Files: `src/components/nav/SideNav.astro`, `src/components/nav/TopBar.astro`, `src/pages/ui/stories/app-shell.astro`
Acceptance: On small screens:
drawer opens/closes, escape closes, focus returns to trigger.
Verify: Keyboard walkthrough; reduced-motion respected.
STOP-AND-ESCALATE: If focus management is hard without JS; move only the drawer into a React island.

- [ ] T029 [US3] Implement `Table` (SSR) + pagination + responsive degradation to cards
Scope: Table default comfortable density with optional dense mode; mobile card degradation.
Files: `src/components/ui/Table.astro`, `src/components/ui/Pagination.astro`, `src/pages/ui/stories/table.astro`, `src/pages/docs/design-system/table.astro`
Acceptance: Story shows:
comfortable vs dense, empty/loading/error states, selection state, and mobile card view.
Verify: Resize viewport and confirm degradation; keyboard reachable actions.
STOP-AND-ESCALATE: If DataGrid complexity explodes; keep v1 as Table + patterns only.

- [ ] T030 [US3] Add e2e smoke for table responsive degradation + density toggle
Scope: One high-value test for the most drift-prone UI (tables).
Files: `tests/e2e/table-responsive.spec.ts`
Acceptance: Test asserts:
table story loads, density toggle changes class/attribute, mobile breakpoint shows card layout.
Verify: `npm run test:e2e` passes.
STOP-AND-ESCALATE: If density toggle UI not implemented; add minimal toggle in story only.

**Checkpoint**: US3 complete (nav primitives + app shell demo + table/pagination patterns + e2e table smoke).

---

## Phase 6: User Story 4 - Overlays + Feedback + Empty/Loading States (Priority: P4)

**Goal**: Provide overlay primitives and feedback patterns with accessibility-first behavior and reduced motion.

**Independent Test**: Open overlay stories and validate:
focus trap/return, escape close, keyboard navigation, toasts/alerts, empty/loading patterns.

- [ ] T031 [US4] Implement `Alert` + `InlineMessage` + `Toast` primitives
Scope: Provide consistent feedback components for success/error/info/warn.
Files: `src/components/ui/Alert.astro`, `src/components/ui/Toast.astro`, `src/pages/ui/stories/feedback.astro`, `src/pages/docs/design-system/feedback.astro`
Acceptance: Supports semantic variants and clear states; tokens-only styling.
Verify: Story shows each variant; assistive roles documented (status vs alert).
STOP-AND-ESCALATE: If toast requires global state; keep it story-only in v1 or use a tiny island.

- [ ] T032 [US4] Implement async and empty patterns (Skeleton/Spinner/Progress/EmptyState)
Scope: Provide consistent loading and empty-state UI patterns.
Files: `src/components/ui/Skeleton.astro`, `src/components/ui/Spinner.astro`, `src/components/ui/Progress.astro`, `src/components/ui/EmptyState.astro`, `src/pages/ui/stories/states.astro`
Acceptance: Reduced-motion respected; aria-busy/status guidance included in docs.
Verify: Story shows variations; no motion reliance for meaning.
STOP-AND-ESCALATE: If animations are needed for meaning; add text/status alternative.

- [ ] T033 [US4] Implement `Dialog/Modal` as a React island with focus trap + return
Scope: Provide an accessible modal with sizes (sm/md/lg/fullscreen as needed) and reduced motion.
Files: `src/islands/react/Dialog.tsx`, `src/components/ui/Dialog.astro` (wrapper), `src/pages/ui/stories/dialog.astro`, `src/pages/docs/design-system/dialog.astro`
Acceptance: Keyboard-only:
trap works, escape closes, focus returns; states visible; tokens-only styling.
Verify: Manual keyboard walkthrough; add minimal e2e if stable.
STOP-AND-ESCALATE: If focus trap implementation is unclear; use a minimal proven approach, do not hand-roll complex logic.

- [ ] T034 [US4] Implement `Drawer` as a React island (mobile nav + settings panels)
Scope: Provide drawer with left/right/bottom variants; focus management; escape close.
Files: `src/islands/react/Drawer.tsx`, `src/components/ui/Drawer.astro`, `src/pages/ui/stories/drawer.astro`
Acceptance: Works on mobile; respects reduced motion; tokens-only.
Verify: Manual test; ensure aria labels/roles correct.
STOP-AND-ESCALATE: If drawer overlaps with SideNav implementation; refactor to reuse one primitive.

- [ ] T035 [US4] Implement minimum chat citation UI components (badges + citations list)
Scope: Provide citation badge and citations list section using AI semantic tokens.
Files: `src/components/ai/CitationBadge.astro`, `src/components/ai/CitationsList.astro`, `src/pages/ui/stories/chat-citations.astro`, `src/pages/docs/design-system/ai-tokens.astro`
Acceptance: Citations are readable in all modes; tokens-only styling; long URLs wrap safely.
Verify: Story page shows example message with citations; check contrast in high-contrast mode.
STOP-AND-ESCALATE: If citation data model is missing; use a minimal static example in v1.

- [ ] T036 [US4] Add e2e smoke for overlay focus management (Dialog + Drawer)
Scope: One e2e test that catches the most common a11y regression.
Files: `tests/e2e/overlays-focus.spec.ts`
Acceptance: Test covers:
open overlay, tab cycles, escape closes, focus returns.
Verify: `npm run test:e2e` passes.
STOP-AND-ESCALATE: If tests are flaky; reduce assertions to deterministic signals only.

**Checkpoint**: US4 complete (feedback + async/empty + overlays + AI citations + e2e overlay smoke).

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Hardening, catalog completeness checks, and documentation cleanup.

- [ ] T037 Run a token drift audit and fix violations (no raw values)
Scope: Enforce constitution compliance across `src/`.
Files: `src/**` as needed, `scripts/tokens/check-token-drift.mjs`
Acceptance: `npm run check:tokens` passes; no raw hex or obvious ad-hoc spacing in components.
Verify: Run `npm run check:tokens` and `npm run build`.
STOP-AND-ESCALATE: If violations are in third-party code; exclude with justification.

- [ ] T038 Ensure stories cover required regression anchors and are deterministic
Scope: Confirm stories exist for:
buttons, inputs/stateful controls, modals, table density, toasts/alerts, empty/loading, typography.
Files: `src/pages/ui/stories/*`
Acceptance: Each story page:
lists explicit variants/states and uses only DS primitives.
Verify: Manual review + navigation from `/ui/stories`.
STOP-AND-ESCALATE: If story pages depend on random data/time; remove randomness.

- [ ] T039 Update docs catalog completeness (examples + do/don't) and link from README
Scope: Make docs the primary reference and ensure every introduced primitive has docs.
Files: `src/pages/docs/design-system/*`, `README.md`
Acceptance: Docs index links to every component doc; each doc contains examples + do/don't.
Verify: Navigate docs; confirm no broken links.
STOP-AND-ESCALATE: If a component lacks docs, block release until docs exist.

- [ ] T040 Update agent context and ensure `AGENTS.md` manual block preserved (if committed)
Scope: Keep automation guidance consistent with the final plan and structure.
Files: `AGENTS.md`
Acceptance: Agent context lists correct active tech and includes your manual instructions block.
Verify: Re-run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex` and confirm manual block remains.
STOP-AND-ESCALATE: If script overwrites manual content; fix script or stop committing AGENTS.md.

- [ ] T041 Final build + test verification pass
Scope: Ensure the repo is shippable at v1.
Files: N/A
Acceptance: All commands pass:
`npm run build`, `npm test`, `npm run test:e2e` (if configured).
Verify: Run commands and record outputs under this task.
STOP-AND-ESCALATE: If e2e depends on local server orchestration not yet implemented; add a helper script.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion; BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 7)**: Depends on completing desired user stories

### User Story Dependencies

- **US1 (P1)**: First deliverable; defines tokens + stories baseline
- **US2 (P2)**: Depends on tokens + base styles; otherwise independent
- **US3 (P3)**: Depends on tokens + layout primitives; otherwise independent
- **US4 (P4)**: Depends on tokens + base styles; overlays depend on islands scaffolding

---

## Parallel Opportunities (Use Sparingly)

If staffed, tasks can be parallelized only after Phase 2 is complete:
- US2 primitives and US3 nav primitives can proceed in parallel (different files).
- Keep overlay islands (US4) separate from SSR primitives to avoid conflicts.


