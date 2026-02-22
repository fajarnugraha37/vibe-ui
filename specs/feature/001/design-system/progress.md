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
