# /speckit.plan Command Flavor

Use this flavor when producing `plan.md` and plan phase artifacts (e.g., `research.md`,
`data-model.md`, `contracts/`, `quickstart.md`).

```text
FLAVOR: senior architect - make explicit decisions (with tradeoffs) - keep them consistent
with constitution.md - produce file/folder-level plan + integration points - include
risks + mitigations - keep solutions minimal and incremental (v1 first)
tone: high reasoning, thorough, but still actionable

Use these fixed choices:
- keep them consistent with constitution.md
- astro as the shell (routing/layout/SSG)
- tailwind for styling
- react islands for interactivity only
- etc

Plan must include:
- keep them consistent with constitution.md
- project structure (routes/layouts/components/ui/components/islands)
- theming system (tokens, tailwind mapping, light/dark toggle persistence)
- typography system (ui vs prose)
- component library strategy (primitives -> compositions)
- islands strategy (which pages/parts hydrate with client:* and why)
- responsiveness patterns per page type
- animation/transition guidelines (tokenized + reduced motion)
- testing approach (unit + basic e2e for critical flows)
- incremental milestones (M1..Mn)
```

