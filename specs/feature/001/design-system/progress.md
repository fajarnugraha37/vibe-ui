T032 Implement async and empty patterns (Skeleton/Spinner/Progress/EmptyState)

- What changed:
  - Added src/components/ui/Skeleton.astro, Spinner.astro, Progress.astro, EmptyState.astro
  - Added story: src/pages/ui/stories/states.astro (demonstrates variants)

- Spec/Constitution compliance:
  - Components use token CSS variables (e.g., --color-surface-muted, --color-link-primary, --space-2/3, --radius-md); no raw hex or ad-hoc spacing in new components.
  - Reduced-motion respected: animations disabled under prefers-reduced-motion.
  - Accessibility: Spinner supports decorative (aria-hidden) and non-decorative (role="status", aria-live) usage; Progress uses role="progressbar" with aria-valuenow; Skeleton is aria-hidden by default; EmptyState uses role="status" and aria-live="polite".

- Verification commands & result:
  - npm run test:e2e → 18 passed
  - npm test → 2 passed
  - npm run build → success (16 pages built)


T033 Implement Dialog/Modal (React island + focus trap)

- What changed:
  - Added src/islands/react/Dialog.tsx (React island), src/components/ui/Dialog.astro (Astro wrapper), src/pages/ui/stories/dialog.astro, src/pages/docs/design-system/dialog.astro

- Spec/Constitution compliance:
  - Dialog surface and text use token CSS variables (e.g., --color-surface-default, --color-text-primary); overlay uses a translucent layer (no dedicated overlay token in v1).
  - Reduced-motion respected; focus is trapped while open and Escape closes the dialog with focus returned to the trigger.

- Verification commands & result:
  - npm test → 2 passed
  - npm run build → success (18 pages built)


T034 Implement Drawer (React island + sliding panels)

- What changed:
  - Added src/islands/react/Drawer.tsx (React island), src/components/ui/Drawer.astro, src/pages/ui/stories/drawer.astro

- Spec/Constitution compliance:
  - Drawer surface uses token CSS variables for background and text (e.g., --color-surface-default, --color-text-primary).
  - Reduced-motion respected; focus is trapped while drawer is open and Escape closes with focus return to trigger.

- Verification commands & result:
  - npm test → 2 passed
  - npm run build → success (19 pages built)


T035 Chat citations (badges + list)

- What changed:
  - Added src/components/ai/CitationBadge.astro, src/components/ai/CitationsList.astro, src/pages/ui/stories/chat-citations.astro, src/pages/docs/design-system/ai-tokens.astro

- Spec/Constitution compliance:
  - Components use token CSS variables for spacing/colors where available (e.g., --color-surface-default, --color-border-default, --color-text-secondary).
  - Long URLs will wrap safely in badges/lists per story examples.

- Verification commands & result:
  - npm test → 2 passed
  - npm run build → success (21 pages built)


## BLOCKED: T036 Add e2e smoke for overlay focus management

Failing command:
- npx playwright test tests/e2e/overlays-focus.spec.ts --project=chromium --workers=1

Latest failing output (trimmed):
- Playwright test timeout waiting for button attached: locator.waitFor: Test timeout of 30000ms exceeded while waiting for getByRole('button', { name: /open dialog/i }) to be attached (dialog test)
- Similar timeouts observed for the Drawer test (waiting for getByRole('button', { name: /open left/i })).
- Previous mount-marker wait also reported: selector '.dialog-trigger[data-island-mounted="1"]' not observed.

What was tried (chronological):
- Initial approach: server-rendered trigger with the React island attaching to the existing DOM trigger by id and setting data-island-mounted when listeners attach.
- Added explicit waits and a data-island-mounted marker for the island to set when it attaches to the server trigger to make tests wait for hydration.
- Observed intermittent element-detached errors (SSR trigger vs client listener mismatch) during hydration.
- Attempted change: render the trigger entirely client-side (island owns the trigger) by updating Dialog.astro and Drawer.astro to pass triggerText to islands and remove SSR trigger to avoid duplicate elements.
- Re-ran e2e tests; Playwright now times out waiting for the client-rendered button to be attached (no button found), indicating island mounting timing is unpredictable in the test harness.

Spec/Constitution source of conflict:
- Islands strategy in plan.md / constitution: "Astro SSR components first; React islands only for interactive overlays." This task sits at that boundary and the hydration ordering between server markup and client islands is causing unstable test behavior.

Questions to proceed (pick up to 3):
1. Choose one approach for stability: (A) server-stable triggers with deterministic IDs that islands attach to, or (B) client-owned triggers (islands render the trigger) and tests wait for the button to appear — which is preferred?
2. If (A) server-stable triggers are preferred: confirm a deterministic id format (suggestion: 'dialog-trigger-{name}' / 'drawer-trigger-{name}') so tests can target a known selector.
3. If (B) client-owned triggers are preferred: confirm that e2e tests should be updated to wait for the button locator (e.g., page.waitForSelector('button:has-text("Open dialog")', { timeout: 10000 })) instead of relying on data-island-mounted markers.

What I need to proceed:
- Answer one of the above choices (A or B) and, if applicable, the deterministic id format or the preferred test selector/timeout. Once given, the implementer will update islands or tests and re-run verification.


