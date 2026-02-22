# Feature Specification: SaaS Design System (Tokens + Components + Stories)

**Feature Branch**: `001-design-system`  
**Created**: 2026-02-22  
**Status**: Draft  
**Input**: Create a token-first design system for a SaaS web app and public site
(marketing + blog + account/app) with a complete component catalog, full states,
accessibility by default, and baseline "stories" usable for visual regression.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Tokens + Themes + Baseline Stories (Priority: P1)

As a developer/design system maintainer, I can apply a consistent theme (light/dark/high-contrast)
and tokenized typography/spacing to a baseline "stories" area so the team can verify the
look-and-feel, states, and accessibility without guesswork.

**Why this priority**: It creates the foundation and a shared, testable contract that every
future component must conform to. Without this, components drift immediately.

**Independent Test**: A reviewer can open the baseline stories and confirm:
token-only styling, theme switching, readable contrast, visible focus ring, and that
interactive state coverage exists for the baseline components.

**Acceptance Scenarios**:

1. **Given** the default theme, **When** a user switches to dark and high-contrast modes,
   **Then** all baseline stories remain readable, focus remains visible, and semantic roles
   (surface/text/border/state colors) remain consistent.
2. **Given** baseline story components (e.g., Button/Input/Card), **When** each state is
   exercised (hover/active/focus/disabled/loading/error/success where relevant), **Then**
   the UI communicates state clearly without custom per-component theme logic.

---

### User Story 2 - Form-Heavy Admin UX Primitives (Priority: P2)

As a developer building admin-like flows, I can compose accessible form-heavy screens using
standard primitives that handle success/error/loading states consistently.

**Why this priority**: SaaS apps live and die on forms. A consistent form system prevents
inconsistent validation, spacing, and state behavior across the app.

**Independent Test**: A reviewer can validate that form primitives cover:
labels/help text/errors, keyboard navigation, `:focus-visible`, disabled and loading, and
responsive 2-col desktop to 1-col mobile behavior.

**Acceptance Scenarios**:

1. **Given** a form with required fields, **When** the user submits invalid input,
   **Then** field-level errors are shown next to the fields, focus moves predictably,
   and submission is blocked while invalid.
2. **Given** a form submission in progress, **When** the user attempts to resubmit,
   **Then** inputs and actions reflect loading/disabled states and success/error outcomes
   are communicated clearly (including assistive tech status where applicable).

---

### User Story 3 - Navigation + Data Display for Dashboard (Priority: P3)

As a developer building a dashboard, I can use standard navigation and data display components
that remain usable on mobile and do not break spacing/typography density rules.

**Why this priority**: Dashboards introduce the highest risk of inconsistency (tables, density,
responsive behavior, overlays, and complex states).

**Independent Test**: A reviewer can validate that navigation and table components render with:
medium density defaults, responsive degradation (table to cards), and accessible keyboard/focus
behavior for drawers/menus.

**Acceptance Scenarios**:

1. **Given** a narrow viewport, **When** a table is viewed, **Then** it degrades into a readable
   card/list representation without losing key information or action affordances.
2. **Given** a sidebar-based layout, **When** the viewport becomes mobile, **Then** the sidebar
   becomes a drawer with proper focus management and keyboard navigation.

---

### User Story 4 - Overlays + Feedback + Empty/Loading States (Priority: P4)

As a developer, I can present overlays (modal/drawer/popover/tooltip/menu) and user feedback
(toast/alerts/inline messages) with consistent state and accessibility behavior.

**Why this priority**: Overlays and feedback are where most a11y regressions occur and where
state handling often becomes inconsistent.

**Independent Test**: A reviewer can validate focus trapping/return, escape handling, keyboard
navigation, `prefers-reduced-motion`, and consistent visual tokens across overlay components.

**Acceptance Scenarios**:

1. **Given** an overlay is opened, **When** the user navigates via keyboard, **Then** focus is
   constrained appropriately and returns to the trigger on close.
2. **Given** a long-running operation, **When** the UI shows skeleton/spinner and then success
   or error, **Then** the user can understand progress and outcome without reading logs.

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Token drift: new components introduce ad-hoc spacing/radius/colors that don't exist as tokens.
- Duplicate primitives: similar components diverge (e.g., two Buttons, two FormField patterns).
- Theme gaps: token exists in light but is missing/incorrect in dark or high-contrast.
- State inconsistency: hover/active/focus/disabled/loading/error visuals differ across components.
- Density inconsistency: tables/forms ignore default density and rhythm rules.
- Responsive breakpoints: tables don't degrade; sidebars don't become drawers; form grids collapse poorly.
- A11y regressions: focus ring lost, keyboard navigation broken, ARIA labeling inconsistent.
- Documentation drift: examples don't match component behavior; do/don't guidance is missing.
- Token naming drift: tokens stop following the naming contract and become unsearchable/unscalable.
- "Random overrides": per-page CSS overrides reintroduce raw values and bypass tokens.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Constitution Constraints *(mandatory for UI work)*

- Use semantic tokens only (no raw hex/ad-hoc colors in components).
- Implement themes via token overrides: light/dark plus high-contrast where required.
- Design system first: check existing tokens/components; extend before creating new.
- New tokens MUST NOT be introduced without updating token definitions (all themes),
  Tailwind mappings, and documentation.
- Ensure a11y gates: keyboard nav, visible focus ring, ARIA/semantics, reduced motion.
- Keep JS minimal: islands only; avoid turning the site into a global SPA.
- Implement required interaction states: default/hover/active/focus/disabled/loading/error
  (success where relevant).
- Follow responsive rules: tables -> cards on mobile; sidebar -> drawer; forms 2-col desktop -> 1-col mobile.
- Primitive components MUST include usage examples plus "do/don't" guidance in docs
  when introduced or materially changed.

### Functional Requirements

#### Design Principles (Product + UI)

- **FR-001**: Design system MUST produce a calm, clean, enterprise mood with slightly playful
  modern polish (soft shadows, rounded corners, subtle motion) without flashy color.
- **FR-002**: Design system MUST be readable for dashboards and forms; defaults MUST target
  medium density for dashboards and clear, helpful form UX.
- **FR-003**: Design system MUST be mobile-first: desktop spacing feels roomy; mobile spacing
  is compact while staying readable and tappable.

#### Foundations Inventory (Tokens + Themes)

- **FR-010**: System MUST define a token framework with layers:
  foundation tokens, semantic/role tokens, and component tokens (per constitution).
- **FR-011**: System MUST support themes: light, dark, and high-contrast, with consistent
  semantic roles for surfaces, borders, text, and states (info/success/warn/error).
- **FR-011a**: Theme configuration MUST be tunable by changing a small set of root inputs
  (at minimum, the primary accent), with derived semantic roles updating consistently.
  The system MUST NOT require hand-editing many unrelated tokens for normal theme changes.
- **FR-012**: System MUST include two typography scales: UI scale (dashboards/forms) and
  prose scale (blog/marketing) with a prose wrapper that styles headings/lists/quotes/code.
- **FR-013**: System MUST define spacing/radius/shadow/motion tokens with a consistent rhythm
  (notably 4/8/12/16/24/32 spacing) and map them into utilities/components consistently.
- **FR-014**: System MUST include AI-specific semantic tokens where AI UI appears (citations,
  uncertainty, tool runs, blocked/error states) to avoid one-off styling in chat modules.

#### Schema-Driven Tokens (Drift Prevention)

- **FR-020**: Token definitions MUST be schema-driven (machine-readable) so coverage can be
  validated across themes and layers, and missing tokens can be detected early.
- **FR-021**: Adding a new token MUST require updating schema + docs + all theme values and
  MUST be review-gated (no "quick token" additions).

#### Component Catalog (Scope)

- **FR-030**: System MUST provide reusable building blocks sufficient to compose:
  public site pages (marketing, blog, company pages) and app surfaces (auth, dashboard,
  settings, admin flows, chat).
- **FR-031**: Component catalog MUST include (at minimum):
  buttons, form controls (input/textarea/select/combobox), form structure (FormField),
  selection controls (checkbox/radio/switch), overlays (modal/drawer/popover/tooltip/menu),
  navigation (tabs/segmented, breadcrumbs, side nav, top bar), data display (table/datagrid
  with pagination), feedback (toast/alert/inline message), async states (skeleton/spinner/
  progress), empty states, badges/tags/chips, attachments (file/link/snippet), and feedback
  controls (thumbs/report issue).
- **FR-032**: System MUST provide layout primitives (e.g., Container/Section/Card/surface)
  that enforce the layout rhythm (max width, padding, spacing) across public site and app.

#### Component Behavior Contract (Applies to Every Interactive Component)

- **FR-040**: Every interactive component MUST implement states:
  default/hover/active/focus/disabled/loading/error, and success where it changes behavior.
- **FR-041**: Every interactive component MUST document:
  variants, sizes, expected states, accessibility notes (keyboard/ARIA), and responsive rules.
- **FR-042**: Component APIs MUST be minimal (avoid prop explosion) and MUST enable semantic
  HTML by default (labels, descriptions, error messages).

#### Component Behavior Matrix (Minimum)

| Component | Variants (min) | Sizes (min) | States (min) | A11y notes (min) | Responsive notes (min) |
|----------|-----------------|-------------|--------------|------------------|------------------------|
| Button | primary/secondary/ghost/destructive/link | sm/md/lg/icon | default/hover/active/focus/disabled/loading | `<button>` by default; visible focus; disabled semantics | full-width option; tappable size on mobile |
| Input/Textarea | default/with-prefix/with-suffix | sm/md/lg | default/focus/disabled/loading/error/success | label + description + error association; keyboard friendly | full-width; helper text wraps safely |
| Select/Combobox | single/multi (if in scope) | sm/md/lg | default/open/focus/disabled/loading/error | ARIA combobox/listbox patterns; typeahead where applicable | menu positions within viewport; mobile-friendly trigger |
| Checkbox/Radio/Switch | default | sm/md | default/hover/focus/disabled/error | correct role; group labeling; keyboard toggle | larger hit targets on mobile |
| FormField (composite) | inline/stacked | n/a | error/success/loading | ties label/help/error to control | 2-col desktop to 1-col mobile grid |
| Modal/Dialog | sm/md/lg/fullscreen | n/a | open/closing (reduced motion) | focus trap + return; escape; aria-labelledby | fullscreen on small screens as needed |
| Drawer | left/right/bottom | n/a | open/closing | focus management; escape; inert background | becomes primary nav on mobile |
| DropdownMenu/Popover/Tooltip | anchored | n/a | open/close | keyboard navigation; aria-expanded where relevant | avoid off-screen rendering; touch-friendly fallbacks |
| Tabs/Segmented | default | sm/md | active/focus/disabled | roving tab index; aria-selected | overflow handling on small screens |
| Table/DataGrid | default/dense | n/a | empty/loading/error/selected | headers association; keyboard reachable actions | degrade to cards/lists on mobile |
| Pagination | default | sm/md | current/disabled | aria-current; next/prev labels | compact layout on mobile |
| Badge/Tag/Chip | neutral/semantic | sm/md | default/disabled (if clickable) | button semantics if interactive | wrap and truncate rules |
| Toast/Alert/Inline message | info/success/warn/error | n/a | show/dismiss | role=status/alert; focus rules if actions | avoid covering critical controls on mobile |
| Skeleton/Spinner/Progress | n/a | sm/md/lg | running/complete | aria-busy; announce progress where needed | respects reduced motion |
| Empty state | default | n/a | n/a | meaningful text and actions | centers and scales gracefully |

#### Documentation + Story Baselines (Visual Regression Anchor)

- **FR-050**: Every primitive MUST include usage examples plus "do/don't" guidance.
- **FR-051**: System MUST provide baseline "stories" that show:
  button variants + all states; input/stateful controls across all states; modal sizes and
  focus behavior; table densities and mobile degradation; toast/alert variants; empty/loading
  patterns; and typography UI/prose scales.
- **FR-052**: Baseline stories MUST be stable and deterministic so they can act as a visual
  regression baseline (tooling choice is out of scope for this spec).

#### Integration Points (Public Site + App)

- **FR-060**: Public site surfaces MUST be composable using prose scale + layout primitives
  without importing app-only complexity.
- **FR-061**: App surfaces MUST be composable using UI scale + navigation + form primitives
  and MUST support admin-like flows with clear success/error outcomes.
- **FR-062**: Chat surfaces MUST use AI semantic tokens and provide readable citations,
  uncertainty messaging, and tool-run status styling without one-off CSS overrides.

#### Explicit Decisions (With Tradeoffs)

- **FR-065**: Token layering decision: use foundation + semantic + component tokens.
  Tradeoff: more upfront structure, but prevents theme/scale explosion and removes ad-hoc values.
- **FR-066**: Reuse-before-new decision: extend existing primitives before introducing new ones.
  Tradeoff: slightly more refactor work early, but prevents duplicated primitives and drift.
- **FR-067**: Baseline stories decision: maintain deterministic story surfaces inside the app
  (or repo) to anchor visual regression. Tradeoff: extra upkeep, but makes drift visible early.

#### Deliverables (Repository Artifacts + Integration Points)

- **FR-070**: The feature MUST deliver, at minimum:
  a token schema artifact (machine-readable), token values for all themes (light/dark/high-contrast),
  documentation entries with examples + do/don't for primitives, and baseline stories for regression.
- **FR-071**: The feature MUST include a clear public entry point for baseline stories (a stable
  set of URLs/pages or an equivalent stable navigation surface) so reviewers can validate:
  themes, tokens, and component states without needing local knowledge of the repo.
- **FR-072**: File/folder-level integration plan MUST be explicit and consistent (paths may evolve
  but the separation of concerns MUST hold):
  - Tokens/themes: `src/styles/` (foundation + semantic + component token values, theme overrides)
  - UI primitives/composites: `src/components/ui/` and `src/components/forms/`
  - Layout primitives: `src/layouts/` and `src/components/layout/`
  - Baseline stories: `src/pages/ui/stories/` (stable routes for regression anchors)
  - Docs: `src/pages/docs/design-system/` (usage examples + do/don't)

#### Risks & Mitigations

- **FR-080**: Risk: scope bloat (too many components at once). Mitigation: prioritize P1-P4
  user stories and enforce "done" criteria (docs + states + a11y + tokens-only) before expanding.
- **FR-081**: Risk: token explosion. Mitigation: enforce schema-driven tokens and the layering
  model; prefer semantic roles; reject component-specific tokens unless justified.
- **FR-082**: Risk: duplicated primitives. Mitigation: reuse-before-new gate and a catalog
  index that forces discovery before creation.
- **FR-083**: Risk: accessibility regressions in overlays/forms. Mitigation: baseline stories
  explicitly exercise keyboard flows, focus management, and reduced motion behavior.

#### Assumptions & Dependencies

- **FR-090**: Assumption: the app and public site will share the same token foundation, but
  may differ in typography scale defaults (UI vs prose) and density defaults (dashboard vs marketing).
- **FR-091**: Dependency: the constitution governs tokens-only styling, themes, a11y, and the
  cheap-model task discipline; this spec assumes those gates will be enforced in planning and tasks.

#### Non-Goals (Out of Scope)

- **FR-900**: This feature does NOT require implementing the full SaaS product (business logic,
  backend services, or real account management). Pages may exist only as examples/stories.
- **FR-901**: This feature does NOT require choosing a specific third-party visual regression
  platform or design tooling; it only requires stable story surfaces that make such testing possible.
- **FR-902**: This feature does NOT require exhaustive branding exploration; it establishes a
  consistent, extensible system aligned with the constitution mood and constraints.

### Key Entities *(include if feature involves data)*

- **Token**: A named design decision (foundation, semantic, or component layer).
- **Theme**: A set of token values for a mode (light/dark/high-contrast).
- **Primitive**: A small reusable component (e.g., Button, Input, Badge).
- **Composite**: A component assembled from primitives (e.g., FormField, DataTable, SideNav).
- **Story**: A deterministic showcase surface that displays variants/states for review and regression.
- **Documentation Entry**: Usage examples and do/don't guidance tied to a primitive/composite.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 100% of design system components and stories use tokens only (no raw hex, no
  arbitrary spacing/sizing/typography values in component code).
- **SC-002**: Token schema covers all tokens across light/dark/high-contrast with no missing values.
- **SC-003**: Baseline stories exist for the required regression anchors (buttons, inputs, modals,
  tables/density/responsive behavior, toasts/alerts, empty/loading, typography).
- **SC-004**: A reviewer can complete a keyboard-only walkthrough of baseline stories without
  encountering a blocked focus trap, missing focus indicator, or unlabeled control.
- **SC-005**: A new dashboard form screen can be composed using the design system primitives
  without inventing new spacing conventions (measured by requiring no new tokens for typical screens).
