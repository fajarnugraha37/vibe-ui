<!--
Sync Impact Report

- Version change: 1.2.0 -> 1.3.0
- Modified principles: none
- Added sections: none
- Removed sections: none
- Notes: Expanded cheap-model task authoring constraints (self-contained, explicit,
  verifiable steps; stop-and-clarify rules).
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
  - ⚠️ N/A .specify/templates/commands/*.md (directory not present)
- Follow-up TODOs: None
-->

# vibe-ui Constitution

## Core Principles

### I. Design Tokens + Theme System (NON-NEGOTIABLE)
- All design decisions MUST be expressed as tokens (CSS variables) for: colors,
  typography, spacing, radius, shadow, and motion.
- Themes MUST include light and dark, plus a high-contrast variant. Theme switching
  MUST be implemented via token value overrides (e.g., `data-theme`, and optionally
  `data-contrast`), and components MUST NOT special-case theme logic.
- Color tokens MUST cover:
  semantic surfaces (bg/surface/elevation), borders, text roles, and state colors
  (info/success/warn/error), plus link styling rules (link/hover/visited/focus).
- Conceptual reference: use a role/value mindset similar to IBM Carbon theme tokens,
  and treat foundation tokens as the base of the system (aligned with USWDS-style
  token thinking). This is guidance, not a dependency.
- Components MUST NOT use raw hex values or ad-hoc colors. Styling MUST reference
  tokens only (e.g., Tailwind classes mapped to `hsl(var(--token))`).
- Tailwind configuration MUST map semantic color tokens to `hsl(var(--token))` and
  MUST NOT expose arbitrary component-level hex palettes.
- Base styles MUST define defaults for body background/text and a visible focus ring
  token (e.g., `--ring`) that works on dashboards and forms.

Rationale: A token-first system ensures consistent, themeable UI without drift.

### II. Accessibility + Interaction States (NON-NEGOTIABLE)
- Minimum target accessibility is WCAG 2.2. For SaaS dashboards and forms, the
  baseline is WCAG 2.2 AA unless an explicit, documented exception is approved.
- Accessibility is a release gate: keyboard navigation, semantic HTML, and correct
  ARIA labeling MUST be implemented for all interactive surfaces.
- Focus visibility MUST be preserved (`:focus-visible` ring) and focus management
  MUST be handled for drawers, dialogs, and async form flows.
- Motion MUST respect user preference: `prefers-reduced-motion` MUST reduce or
  remove non-essential animation without breaking usability.
- Every interactive component MUST implement, at minimum:
  default, hover, focus, active, disabled, loading, and error states (and success
  where it changes behavior, e.g., forms).
- Loading behavior MUST be clear: use skeletons/spinners where appropriate and
  ensure assistive tech gets status updates (`aria-busy`, `aria-live` as needed).
- Form UX MUST follow:
  immediate field-level errors near inputs, disable submission during invalid or
  loading periods, and show clear progress and outcomes. Track dirty/unsaved state
  when the flow can lose user work.

Rationale: This project targets dashboards and forms; usability and a11y are core.

### III. Minimal JavaScript, Islands Only
- Astro SSR/render-first is the default. The site MUST NOT become a global SPA.
- Client-side JavaScript MUST be used only when necessary for user value.
- Interactivity MUST be confined to islands and bounded to the smallest possible
  region. Shared global state across the entire app is discouraged and requires a
  specific justification.
- React islands are the default for complex interactions. AlpineJS is acceptable
  for small, localized behaviors. Introducing additional island frameworks requires
  explicit justification and bundle impact review.

Rationale: Minimal JS preserves performance, reliability, and maintainability.

### IV. Responsive Layout + Density Rules
- Layout MUST be mobile-first and adapt cleanly across breakpoints.
- The layout system MUST provide:
  max content width 1200px, default page padding 24px, and a spacing rhythm of
  4/8/12/16/24/32 (expressed as spacing tokens).
- Desktop spacing SHOULD feel roomy; mobile spacing SHOULD be compact while staying
  readable and tappable.
- Visual style MUST be calm and enterprise: neutral-based palette with a single
  restrained primary accent, subtle shadows, and radius in the 12-16px range
  (via tokens).
- Responsive behavior MUST include:
  tables degrade to card views on mobile, sidebars become drawers, and forms use
  2-column layouts on desktop but 1-column on mobile.
- Dashboard defaults MUST target medium density with readable tables and clear
  focus/selection states.

Rationale: A predictable layout system enables fast, consistent UI delivery.

### V. Typography System: UI Scale vs Prose Scale
- Typography MUST be tokenized and separated into two scales:
  UI scale for dashboards/forms and prose scale for blog/marketing content.
- Blog/prose pages MUST use a dedicated wrapper/component that enforces a
  comfortable reading rhythm, including consistent spacing for headings, lists,
  blockquotes, and code blocks.
- The overall mood MUST stay clean, calm, and professional. Playfulness is allowed
  only as subtle motion, soft shadows, and rounded corners, never as flashy color.

Rationale: UI and prose have different readability needs; mixing scales causes
inconsistent hierarchy and visual noise.

### VI. Design System First: Reuse Before New + Token Architecture + Naming Contract
- For any request to create a component, composite, or page, the approach MUST be
  system design first:
  check existing tokens and existing primitives/composites before creating new.
  Extending existing primitives is preferred over creating new variants.
- Components, composites, and pages MUST NOT introduce raw styling values:
  no raw hex colors, no arbitrary spacing/sizing/typography/radius/shadow/motion.
  All styling MUST flow through tokens (CSS variables) surfaced via Tailwind mapping.
- Token architecture MUST follow a three-layer model to avoid theme/scale explosion:
  foundation tokens (e.g., `space.16`, `radius.3`, `color.neutral.900`),
  semantic/role tokens (e.g., `color.text.primary`, `color.bg.surface`),
  and component tokens (e.g., `chat.message.user.bg`, `button.primary.bg`).
  AI-specific semantic tokens are first-class where needed (e.g., `color.ai.citation`,
  `color.ai.uncertainty`, `color.ai.toolRun`, `color.ai.blocked`).
- Naming contract MUST be consistent:
  - Tokens MUST use dot-separated, lowercase names with stable domains
    (e.g., `color.*`, `space.*`, `radius.*`, `shadow.*`, `motion.*`, `font.*`).
  - Components MUST use clear, purpose-based names. Primitives are small and reusable;
    composites are composed from primitives; pages compose composites.
- New tokens MUST NOT be added without:
  updating the token definitions for all supported modes (light/dark/high-contrast),
  updating Tailwind mappings, and updating documentation.
- Documentation policy: every primitive MUST include usage examples plus "do/don't"
  guidance, and MUST explain which tokens it uses (semantic roles, not raw values).
- Theme customization MUST be designed so changing the primary accent token (and
  a small set of root theme inputs) updates derived semantic roles consistently,
  rather than hand-editing many unrelated tokens.

Rationale: A design-system-first approach keeps the UI consistent, scalable, and
maintainable across marketing, blog, and SaaS dashboard surfaces.

## Technology Stack

- Framework: Astro (SSR/render-first, islands architecture)
- Language: TypeScript
- Styling: Tailwind CSS (utility classes mapped to semantic tokens), Sass/SCSS for
  global layers where appropriate
- Islands: React (default), AlpineJS (small/local behaviors)
- Content: MDX supported for blog/marketing content

Non-negotiable implementation constraints:
- Semantic tokens only in components (no ad-hoc hex colors or untracked styles).
- Theme values MUST be provided for light/dark and high-contrast via token overrides.
- Spacing/radius/shadow/motion/typography MUST be defined as tokens and surfaced
  through Tailwind `theme.extend`.

## Workflow & Quality Gates

Project build order (for foundational UI work):
1. Define tokens (colors, typography, spacing, radius, shadow, motion) and theme
   switching (light/dark/high-contrast).
2. Map tokens into Tailwind configuration and add base styles (body defaults,
   focus ring utilities).
3. Create layout primitives in Astro for: landing/marketing, blog, dashboard,
   auth (login/register).
4. Create UI primitives (Astro components) using only semantic tokens.
5. Create React island primitives only when interactivity is required; keep bundle
   minimal and hydration scoped.

Required review gates (apply to all UI work):
- Token compliance: no raw hex colors in components; use semantic tokens via
  Tailwind mappings.
- Design system first: verify existing tokens/components were checked; prefer
  extending primitives; if a new primitive/token is added, include docs + mappings.
- States: interactive components include default/hover/active/focus/disabled/loading/error
  (and success where relevant).
- Accessibility: keyboard navigation works, focus ring visible, ARIA/semantics
  correct, reduced motion supported.
- Responsiveness: mobile-first behavior matches the rules in Principle IV.

Task authoring + execution discipline (cheap AI-ready):
- Tasks MUST be detailed and followable by a human or a low-context, low-reasoning
  agent. Each task MUST include explicit file paths and concrete steps.
- Tasks MUST be self-contained for cheap models:
  include the minimum required context inline (short excerpts or pointers), and do
  not rely on implicit repo knowledge or "as above" references.
- Each task MUST specify:
  inputs (files/paths), exact edits (what to add/remove), commands to run (if any),
  expected outputs, and verification steps (what proves it is done).
- Tasks MUST be written as single-responsibility work items:
  one primary outcome per task; avoid bundling unrelated changes.
- Tasks MUST include a stop condition:
  if any required detail is missing/ambiguous, the assignee MUST NOT guess and MUST
  add/complete a `CLARIFY` task that states the question, options, and what is
  blocked until clarified.
- Before starting a task, the assignee MUST update the task entry to indicate it is
  in progress. After finishing, the assignee MUST mark the task completed and note
  what verification was performed.
- If any requirement, dependency, or decision is ambiguous or missing, the plan or
  task list MUST include an explicit "CLARIFY" task that records:
  the question, the options, and what blocks until clarified.

## Governance

- This constitution is the source of truth for UI architecture and quality gates.
  It supersedes defaults in templates when there is conflict.
- Amendment procedure:
  - Update `.specify/memory/constitution.md`.
  - Prepend/update the "Sync Impact Report" at the top of the file.
  - Update dependent templates in `.specify/templates/` when constitution rules
    affect planning/spec/task structure.
- Versioning policy (SemVer):
  - MAJOR: backward-incompatible governance change or principle removal/redefinition.
  - MINOR: new principle/section added or materially expanded guidance.
  - PATCH: clarifications/wording/typos without semantic policy changes.
- Compliance expectations:
  - Feature plans MUST include a "Constitution Check" gate.
  - Task lists MUST be cheap-AI executable: explicit steps, progress updates, and
    explicit clarification tasks for unknowns.
- PR reviews MUST explicitly confirm token compliance, a11y requirements, and
  responsive behavior, and design-system-first reuse rules for any UI-affecting
  changes.

**Version**: 1.3.0 | **Ratified**: 2026-02-22 | **Last Amended**: 2026-02-22
