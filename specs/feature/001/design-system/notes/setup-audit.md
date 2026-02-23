# Setup audit: SaaS Design System (T001)

Date: 2026-02-22

Summary

- src/styles/global.css: currently contains only `@import "tailwindcss";` — no token CSS variables or generated tokens are present.
- src/layouts/Layout.astro: imports `global.css` and contains no theme/contrast initialization or token usage.
- astro.config.mjs: includes Tailwind integration via `@tailwindcss/vite` (Vite plugin) — Tailwind is present.
- package.json: project is Node/Astro with Tailwind dependency present; dev/test scripts are minimal.

Gaps vs constitution

- No token registry (no `src/lib/tokens/*.json`) — tokens-only discipline not yet enforced.
- No token-to-CSS generation pipeline (no `scripts/tokens/generate-css.mjs` or `src/styles/generated/tokens.css`).
- No Tailwind semantic mapping (`tailwind.config.ts`) to map utilities to CSS variables (tokens).
- No theme/contrast initialization (no `data-theme` / `data-contrast` application on first paint).
- No story routes or component primitives implemented under `src/pages/ui/stories` and `src/components/*` for DS examples.

Files to change in M1 (minimal set)

- Create: `src/lib/tokens/tokens.v1.json` (token registry)
- Create: `src/lib/tokens/themes.v1.json` (theme values for light/dark/high-contrast)
- Create: `scripts/tokens/generate-css.mjs` (emit `src/styles/generated/tokens.css`)
- Create: `tailwind.config.ts` (map semantic roles to `hsl(var(--token) / <alpha>)`)
- Update: `src/styles/global.css` to import generated tokens and add base layer (focus ring, reduced-motion)
- Update: `src/layouts/Layout.astro` to set `data-theme`/`data-contrast` early (FOUC avoidance)
- Create: `src/pages/ui/stories/index.astro` (stories index)

Verification commands

- npm install
- npm run dev          # open local site and inspect /ui/stories
- npm run build        # ensure build succeeds
- npm test             # run unit checks (when configured)

Notes

This audit is intentionally lightweight and scoped to the minimal M1 changes required by the plan. Next step: implement token registry and CSS generation (T005/T007).
