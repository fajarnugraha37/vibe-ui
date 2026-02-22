# Research: SaaS Design System (v1)

**Feature**: `specs/feature/001/design-system/spec.md`  
**Plan**: `specs/feature/001/design-system/plan.md`  
**Date**: 2026-02-22

This feature is primarily a governance + UI foundation effort. Research is therefore expressed
as explicit design decisions with alternatives and tradeoffs (no external dependencies required).

## Decision: Token Architecture (Foundation -> Semantic -> Component)

**Decision**: Use a three-layer token model:
foundation tokens, semantic/role tokens, and component tokens.

**Rationale**: Prevents token explosion while keeping components stable across themes and
allowing component-specific tuning without raw values.

**Alternatives considered**:
- Semantic-only tokens: simpler initially, but becomes hard to scale and to derive variants.
- Component-only tokens: fast in the short term, but produces duplication and inconsistent roles.

## Decision: Themes (Light/Dark/High-Contrast) + Control Model

**Decision**: Provide light, dark, and high-contrast token sets.
High-contrast defaults to OS/browser preference with a persisted manual override.
Light/dark defaults to OS with a persisted manual override.

**Rationale**: Accessibility by default plus deterministic QA/stories.

**Alternatives considered**:
- Manual-only: deterministic but ignores OS preferences and hurts accessibility defaults.
- OS-only: accessible but makes QA and user preference persistence difficult.

## Decision: Tailwind Integration (Tokens-Only)

**Decision**: Tailwind utilities map to semantic roles via `hsl(var(--token))` with alpha support.
Components never reference raw hex values or ad-hoc spacing values.

**Rationale**: Keeps styling consistent and searchable and enforces tokens-only discipline.

**Alternatives considered**:
- Tailwind palette literals: fast but violates constitution and causes drift.
- CSS-only without Tailwind mapping: possible but increases custom CSS and reduces consistency.

## Decision: Component Implementation Strategy (Astro First, React Islands Only)

**Decision**: Build primitives as SSR-friendly components (Astro where feasible).
Use React islands only for components requiring real client logic (combobox, menu, overlays).

**Rationale**: Keeps JS minimal and bounded; avoids global SPA; aligns with constitution.

**Alternatives considered**:
- React everywhere: simpler mental model but increases bundle and risks SPA creep.
- No islands: insufficient for accessible interactive overlays/combobox patterns.

## Decision: Stories as Stable Routes

**Decision**: Provide baseline "stories" as stable pages/routes in the app.

**Rationale**: Enables cheap review, consistent QA, and a stable visual regression anchor without
tooling commitments.

**Alternatives considered**:
- Dedicated storybook tooling: powerful but adds tooling overhead and non-trivial integration.
- Ad-hoc manual demo pages: tends to drift and become non-deterministic.

## Decision: Validation + Testing (Minimal, High-Leverage)

**Decision**:
- Unit tests validate token schema and theme coverage (missing tokens fail fast).
- Basic e2e tests cover: theme persistence, focus management for overlays, blur+submit validation,
  and responsive table degradation.

**Rationale**: Most regressions in DS come from token drift and a11y regressions; test these first.

**Alternatives considered**:
- Full component unit test coverage: expensive and brittle early.
- No tests: drift becomes invisible and costly to correct.

