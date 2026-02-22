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

