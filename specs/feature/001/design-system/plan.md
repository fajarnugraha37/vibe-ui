# Implementation Plan: SaaS Design System (v1)

**Branch**: `feature/001/design-system` | **Date**: 2026-02-22 | **Spec**: `C:\Users\nugra\workspace\project\local-rag\vibe-ui\specs\feature\001\design-system\spec.md`  
**Input**: Feature specification from `C:\Users\nugra\workspace\project\local-rag\vibe-ui\specs\feature\001\design-system\spec.md`

**Note**: This plan is aligned with `.specify/memory/constitution.md` (tokens-only, a11y gate,
minimal JS islands, responsive rules, cheap-model task discipline).

## Summary

Deliver a token-first design system for a SaaS web app plus public site shell (marketing + blog),
including:
- Schema-driven tokens (foundation + semantic + component tokens), light/dark/high-contrast themes
  with persisted overrides, and Tailwind mappings to `hsl(var(--token))`.
- Typography system split into UI scale vs prose scale.
- A v1 component library (primitives first, then composites) with complete states and documentation
  (examples + do/don't).
- Baseline "stories" routes/pages that exercise variants/states as a visual regression anchor.

Implementation approach (minimal + incremental):
1. Build token schema + token values + theme switching + Tailwind mapping + base styles.
2. Build layout primitives and story shell.
3. Build high-leverage primitives (buttons + forms + feedback + surfaces).
4. Add composites and the minimum interactive islands (combobox/menus/dialogs) only where needed.
5. Add basic unit validation + small e2e coverage for the highest-risk flows.

## Technical Context

**Language/Version**: TypeScript (Node.js; project uses Astro)  
**Primary Dependencies**: Astro, Tailwind CSS, React (islands only), AlpineJS (small behaviors only)  
**Storage**: N/A (design system deliverables + example pages; no backend required)  
**Testing**: Vitest (unit), Playwright (basic e2e for critical flows)  
**Target Platform**: Web (modern evergreen browsers)  
**Project Type**: Web UI app (Astro shell + component library + story routes)  
**Performance Goals**: Minimal client JS; avoid global SPA; keep islands scoped; fast page loads  
**Constraints**: Tokens-only styling; WCAG 2.2 AA baseline; reduced motion support; mobile-first  
**Scale/Scope**: v1 focuses on foundations + core primitives + key composites + baseline stories

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Reference: `.specify/memory/constitution.md`

- Token compliance: semantic tokens only (no raw hex/ad-hoc colors in components)
- Theming: light/dark + high-contrast via token overrides; Tailwind maps to tokens
- Design system first: check existing tokens/components; extend before creating new
- Accessibility: keyboard nav, `:focus-visible` ring, ARIA/semantics, reduced motion
- Interactivity: minimal JS; islands only; avoid global SPA; hydration scoped
- Component states: default/hover/focus/active/disabled/loading/error (success where relevant)
- Responsive rules: mobile-first; tables -> cards on mobile; sidebar -> drawer; forms 2-col -> 1-col
- Layout rhythm: max-w 1200, padding 24, spacing rhythm 4/8/12/16/24/32 (tokenized)
- Typography: separate UI scale vs prose scale; blog uses a prose wrapper with styled code blocks
- Task discipline: tasks must be cheap-AI followable; progress updated before/after; ambiguities captured as "CLARIFY" tasks
- Cheap-model constraints: tasks are self-contained, single-responsibility, explicit steps/commands,
  include expected outputs + verification, and include stop-and-clarify rules (no guessing)

## Project Structure

### Documentation (this feature)

```text
specs/feature/001/design-system/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/                 # Primitives (Button, Input, Badge, Card, ...)
│   ├── forms/              # Composites (FormField, FormRow, Fieldset, ...)
│   ├── layout/             # Layout primitives (Container, Section, Shell, ...)
│   ├── nav/                # Navigation composites (SideNav, TopBar, Breadcrumbs, ...)
│   └── ai/                 # AI UI composites (citation badge/list, tool-run status, ...)
├── islands/
│   └── react/              # React islands ONLY (Combobox, Dialog, Menu, ...)
├── layouts/
│   └── Layout.astro        # Global shell layout (tokens + typography + base)
├── pages/
│   ├── index.astro
│   ├── ui/
│   │   └── stories/        # Stable story routes for regression anchors
│   ├── docs/
│   │   └── design-system/  # Docs pages with examples + do/don't
│   ├── marketing/          # Example public pages
│   └── app/                # Example app shell routes (auth, dashboard, settings, chat)
├── styles/
│   ├── tokens/             # Token values (foundation/semantic/component)
│   ├── themes/             # Theme overrides (light/dark/high-contrast)
│   ├── typography/         # UI scale vs prose scale tokens + utilities
│   ├── motion/             # Motion tokens + reduced-motion policies
│   └── globals.css         # Base layer (body, focus ring, link rules)
└── lib/
    ├── tokens/             # Token schema + validation helpers
    └── a11y/               # Small a11y helpers (focus, ids, live regions)

tests/
├── unit/                   # Token schema validation, helper unit tests
└── e2e/                    # Minimal Playwright flows (themes, focus, forms, tables)
```

**Structure Decision**: Use a single Astro project with a token-first `src/styles/` foundation,
Astro components for primitives/composites where possible, and React islands only for components
that require non-trivial client-side behavior (combobox, menus, overlays).

## Key Design Decisions (With Tradeoffs)

1. Tokens as the contract (schema-driven).
Tradeoff: more upfront work, but prevents drift and makes theme coverage testable.

2. Astro components first; React islands only for interactivity.
Tradeoff: some interactive primitives are more complex to implement, but keeps JS bounded and
avoids turning the site into a global SPA.

3. Stories as stable in-repo routes (not a separate tool).
Tradeoff: must maintain deterministic examples, but drift becomes visible early and review is
cheap.

## Theming System (Tokens + Tailwind Mapping + Persistence)

Implementation rules (constitution-aligned):
- Tokens live as CSS variables. No raw hex values in components.
- Tailwind maps semantic roles to `hsl(var(--token))` with alpha support.
- Modes:
  - `data-theme`: `light` | `dark` (default from OS, with manual override persisted)
  - `data-contrast`: `default` | `high` (default from OS, with manual override persisted)
- Persistence:
  - Store explicit user overrides (theme + contrast) in `localStorage`.
  - If no override exists, follow OS preferences (`prefers-color-scheme`, `prefers-contrast`).
- Link styling rules and focus ring (`--ring`) are tokenized and must remain visible in all modes.

## Typography System (UI vs Prose)

- UI scale tokens: dashboards/forms (compact, high information density, clear hierarchy).
- Prose scale tokens: blog/marketing (comfortable rhythm; styled headings/lists/quotes/code).
- Provide a `Prose` wrapper component that applies prose tokens without leaking UI scale rules.
- Enforce long-string tolerance for LTR multi-language content (no RTL in v1).

## Component Library Strategy (Primitives -> Compositions)

Order of build (reuse-before-new):
1. Foundations: tokens/themes/typography/motion + base styles.
2. Primitives: Button, Link, Badge/Tag/Chip, Card/Surface, Input/Textarea, Checkbox/Radio/Switch.
3. Form composites: FormField, Fieldset, helper text, validation states (blur + submit).
4. Feedback: Alert/Inline message, Toast, Progress/Skeleton/Spinner, Empty state.
5. Overlays + advanced controls (React islands where needed): Dialog/Modal, Drawer, DropdownMenu,
   Tooltip/Popover, Combobox.
6. Navigation + data display: Tabs/Segmented, Breadcrumbs, SideNav/TopBar, Table/DataGrid (comfortable
   default + optional dense) + pagination + mobile card degradation.
7. AI UI: citation badge + citations list section; uncertainty and tool-run status surfaces.

Documentation policy:
- Every primitive must ship with: usage examples + do/don't guidance + token roles used.

## Islands Strategy (Hydration Scope)

Principle: no global SPA; hydrate only the minimal region.
- Theme/contrast toggles: small island (or minimal script) in header; persists overrides.
- Combobox: React island (keyboard/typeahead + async states; requires client logic).
- Dialog/Drawer/Menu: React islands (focus management, keyboard interactions, escape handling).
- Tables/forms are SSR by default; islands only for enhanced behavior (e.g., client filtering)
  and only when justified by a user story.

## Responsiveness Patterns (By Page Type)

- Public marketing pages: max-w 1200; 24px padding; roomy desktop spacing; compact mobile spacing.
- Blog/prose: prose wrapper controls rhythm; code blocks styled; long lines wrap safely.
- App shell/dashboard: medium density defaults; sidebar becomes drawer on mobile; tables degrade
  to cards; forms are 2-col on desktop and 1-col on mobile.
- Overlays: modal becomes fullscreen on small screens as needed; drawers support bottom variant.

## Motion Guidelines (Tokenized + Reduced Motion)

- All duration/easing values are tokens; transitions only on opacity/transform where possible.
- Respect `prefers-reduced-motion`: remove non-essential animation; preserve state visibility.
- Avoid motion that conveys meaning without an alternative (e.g., don't rely on animation to
  indicate loading).

## Testing Approach (Unit + Basic E2E)

Unit (Vitest):
- Token schema validation: ensure all required token keys exist for all modes and layers.
- Theme coverage validation: detect missing/invalid values per theme/mode.
- Small helper utilities (a11y ids, class composition helpers) where applicable.

Basic e2e (Playwright):
- Theme/contrast switching persistence + OS-default behavior.
- Keyboard-only walkthrough of key stories (focus ring visible; overlays behave correctly).
- Form validation timing (blur + submit) with error/success/loading states.
- Table responsive degradation (table -> cards) and density toggle behavior.

## Incremental Milestones (v1 First)

- **M1**: Token schema + token values (light/dark/high-contrast) + Tailwind mapping + base styles
  + typography split + story shell routes.
- **M2**: Core primitives (Button variants + states; Input/Textarea; Checkbox/Radio/Switch; Card;
  Badge/Tag/Chip) + docs pages (examples + do/don't) + unit schema validation.
- **M3**: Form composites (FormField + validation rules + helper text) + feedback components
  (Alert/Toast/Skeleton/Spinner/Progress/Empty) + e2e smoke tests for forms.
- **M4**: Overlays + advanced controls (Dialog/Drawer/Menu/Tooltip/Popover/Combobox) as React islands
  with a11y and reduced-motion guarantees + e2e overlay focus tests.
- **M5**: Navigation + Table/DataGrid (comfortable default + optional dense; mobile degradation;
  pagination) + app-shell example pages (auth/dashboard/settings/chat) using only primitives.
- **M6**: Hardening: audit for token drift/duplicate primitives, complete baseline stories set for
  regression anchors, and finalize docs index/catalog.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No planned constitution violations for v1.
