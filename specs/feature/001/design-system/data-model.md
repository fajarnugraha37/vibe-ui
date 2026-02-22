# Data Model: Design System Artifacts (Tokens + Themes + Component Metadata)

**Feature**: `specs/feature/001/design-system/spec.md`  
**Date**: 2026-02-22

This feature does not model business entities. Instead it defines the "data model" for the
design system itself: schema-driven tokens, theme coverage, and metadata needed to prevent
drift.

## Entities

### Token

Represents a named design decision.

Fields:
- `id`: stable token id (dot-separated lowercase), e.g. `color.text.primary`
- `layer`: `foundation` | `semantic` | `component`
- `type`: `color` | `space` | `radius` | `shadow` | `motion` | `font`
- `description`: short human doc
- `deprecated`: optional boolean + replacement id

Constraints:
- `id` MUST follow the naming contract from the constitution (dot-separated, stable domains).
- Tokens MUST NOT be added without schema + docs + all theme values updated.

### Theme

Represents a mode-specific assignment of token values.

Fields:
- `id`: `light` | `dark`
- `contrast`: `default` | `high`
- `values`: mapping `{ tokenId: value }`

Constraints:
- Every required semantic token MUST have a value in every theme/contrast combination.
- High-contrast defaults to OS/browser preference but can be overridden and persisted.

### ComponentSpec

Represents the minimum contract for a primitive/composite.

Fields:
- `id`: e.g. `Button`, `Input`, `Dialog`
- `kind`: `primitive` | `composite` | `page-example`
- `states`: array including at least `default`, `hover`, `active`, `focus`, `disabled`,
  `loading`, `error` (+ `success` where relevant)
- `variants`: enumerated names (e.g. `primary`, `secondary`, `ghost`, ...)
- `sizes`: enumerated names (e.g. `sm`, `md`, `lg`)
- `a11y`: notes + required attributes/roles (non-exhaustive checklist)
- `responsive`: rules (e.g. table -> cards on mobile)
- `tokenRoles`: list of semantic roles used (not raw values)

Constraints:
- Component APIs must remain minimal and semantic; avoid prop explosion.
- Components must consume tokens only (via Tailwind mapping / CSS variables).

### Story

Represents a deterministic "story surface" that renders component variants/states.

Fields:
- `id`: stable story id
- `route`: stable route path
- `components`: list of `ComponentSpec.id` included
- `coverage`: explicit list of variants/states shown

Constraints:
- Stories MUST be stable and deterministic to function as regression anchors.

## Validation Rules (What We Intend To Test)

- Theme coverage: token ids required by schema exist for all theme/contrast combinations.
- Token naming: all ids match contract (dot-separated, lowercase).
- Component state coverage: component metadata includes required states; story pages render them.

## Contracts Output

These entities are expressed as JSON schemas in:
- `specs/feature/001/design-system/contracts/tokens.schema.json`
- `specs/feature/001/design-system/contracts/components.schema.json`

