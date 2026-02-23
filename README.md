# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Design system (feature/001/design-system)

This repository includes a token-first design system and story pages.

Quick commands
- npm install
- npm run dev          # start local dev server (Astro)
- npm run build        # production build
- npm run preview      # preview a build
- npm test             # run unit tests (when configured)
- npm run test:e2e     # run Playwright e2e tests (when configured)

Where tokens and generated CSS live
- Token registry (source-of-truth): src/lib/tokens/
- Generated CSS: src/styles/generated/tokens.css (from token generator)
- Tailwind mapping: tailwind.config.ts

Theme switching and persistence
- The site uses data attributes (data-theme, data-contrast) to apply themes. Overrides persist in localStorage (keys: 'theme' and 'contrast') and fall back to OS preferences (prefers-color-scheme / prefers-contrast).
- Story routes and UI examples are available at /ui/stories.

Notes for contributors
- Preserve the manual block in AGENTS.md when updating automation scripts.
- See specs/feature/001/design-system/ for plan.md, tasks.md, contracts/, and checklists/.
- @agent:speckit-runner "execute /speckit.implement for specs/design-system. keep going task-by-task (undone) until done or blocked."