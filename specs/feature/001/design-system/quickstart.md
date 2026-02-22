# Quickstart: SaaS Design System (v1)

**Feature**: `specs/feature/001/design-system/spec.md`  
**Plan**: `specs/feature/001/design-system/plan.md`  
**Date**: 2026-02-22

## Goals

- Provide a token-first theme system (light/dark/high-contrast) with persisted overrides.
- Provide baseline "stories" routes to review component variants/states.
- Provide primitives/composites that consume tokens only.

## Run Locally

From repository root `C:\Users\nugra\workspace\project\local-rag\vibe-ui`:

```powershell
npm install
npm run dev
```

Open the local site URL printed by Astro.

## Review Checkpoints (What To Look For)

1. Theme switching:
   - Light/dark default follows OS, with a manual override persisted.
   - High-contrast default follows OS, with a manual override persisted.
2. Accessibility:
   - Focus ring is always visible on keyboard navigation.
   - Overlays trap/return focus correctly and close via Escape.
3. Tokens-only enforcement:
   - No components use raw hex or ad-hoc spacing/radius/shadow/motion values.
4. Responsiveness:
   - Tables degrade to cards on mobile.
   - Sidebar becomes a drawer on mobile.
   - Forms are 2-col on desktop and 1-col on mobile.

## Baseline Story Routes

The plan requires stable routes under:
- `src/pages/ui/stories/` (buttons, inputs, modals, table density, toasts/alerts, empty/loading, typography)

These routes are designed to be deterministic and suitable for visual regression tooling later.

## Token Schema Contracts

Schemas are defined here:
- `specs/feature/001/design-system/contracts/tokens.schema.json`
- `specs/feature/001/design-system/contracts/components.schema.json`

In v1, we validate schema coverage via unit tests and/or a small validation script.

