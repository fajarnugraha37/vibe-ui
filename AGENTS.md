# vibe-ui Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-22

## Active Technologies
- N/A (design system deliverables + example pages; no backend required) (feature/001/design-system)

- TypeScript (Node.js; project uses Astro) + Astro, Tailwind CSS, React (islands only), AlpineJS (small behaviors only) (feature/001/design-system)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript (Node.js; project uses Astro): Follow standard conventions

## Recent Changes
- feature/001/design-system: Added TypeScript (Node.js; project uses Astro) + Astro, Tailwind CSS, React (islands only), AlpineJS (small behaviors only)
- feature/001/design-system: Added TypeScript (Node.js; project uses Astro) + Astro, Tailwind CSS, React (islands only), AlpineJS (small behaviors only)
- feature/001/design-system: Added TypeScript (Node.js; project uses Astro) + Astro, Tailwind CSS, React (islands only), AlpineJS (small behaviors only)


<!-- MANUAL ADDITIONS START -->
<!--
AGENTS.md instructions for C:\Users\nugra\workspace\project\local-rag\vibe-ui

<INSTRUCTIONS>
## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.
### Available skills
- skill-creator: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. (file: C:/Users/nugra/workspace/project/speckit-playground/.codex/skills/.system/skill-creator/SKILL.md)
- skill-installer: Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). (file: C:/Users/nugra/workspace/project/speckit-playground/.codex/skills/.system/skill-installer/SKILL.md)
### How to use skills
- Discovery: The list above is the skills available in this session (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
- How to use a skill (progressive disclosure):
  1) After deciding to use a skill, open its `SKILL.md`. Read only enough to follow the workflow.
  2) When `SKILL.md` references relative paths (e.g., `scripts/foo.py`), resolve them relative to the skill directory listed above first, and only consider other paths if needed.
  3) If `SKILL.md` points to extra folders such as `references/`, load only the specific files needed for the request; don't bulk-load everything.
  4) If `scripts/` exist, prefer running or patching them instead of retyping large code blocks.
  5) If `assets/` or templates exist, reuse them instead of recreating from scratch.
- Coordination and sequencing:
  - If multiple skills apply, choose the minimal set that covers the request and state the order you'll use them.
  - Announce which skill(s) you're using and why (one short line). If you skip an obvious skill, say why.
- Context hygiene:
  - Keep context small: summarize long sections instead of pasting them; only load extra files when needed.
  - Avoid deep reference-chasing: prefer opening only files directly linked from `SKILL.md` unless you're blocked.
  - When variants exist (frameworks, providers, domains), pick only the relevant reference file(s) and note that choice.
- Safety and fallback: If a skill can't be applied cleanly (missing files, unclear instructions), state the issue, pick the next-best approach, and continue.
</INSTRUCTIONS>
-->

## Speckit Command Flavors

Use these FLAVOR blocks to keep `/speckit.*` outputs consistent and predictable.

### /speckit.specify
```text
FLAVOR: product strategist - keep them consistent with constitution.md - focus on what/why,
user journeys, success metrics, edge cases - avoid implementation details and library
decisions - write crisp acceptance criteria - mark any ambiguity as
[NEEDS CLARIFICATION]
tone: clear, structured, not verbose
```

### /speckit.plan
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

### /speckit.tasks
```text
FLAVOR: delivery senior lead - keep them consistent with constitution.md - split into tasks
30-120 minutes each - each task: scope, exact files to touch, acceptance checks,
test/verify steps - include STOP-AND-ESCALATE conditions if ambiguous
tone: very operational, checklist-like
```

### /speckit.implement
```text
FLAVOR: disciplined implementer - keep them consistent with constitution.md - implement ONLY
current task, no redesign, no scope creep - minimal diffs, keep code modular + readable
- no placeholders/todos - update tasks.md checkboxes - include commands to verify
(lint/build/tests) - avoid re-inventing primitives; create reusable components - keep
components small, composable, and documented
tone: concise, code-first
```
<!-- MANUAL ADDITIONS END -->
