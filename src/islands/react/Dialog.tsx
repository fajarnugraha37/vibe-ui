import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  triggerText?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Dialog({ triggerText = 'Open dialog', title = 'Dialog', description, children }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const dialog = dialogRef.current;
    // focus the dialog container for accessibility
    if (dialog) dialog.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'Tab') {
        // Basic focus trap
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused.current) previouslyFocused.current.focus();
    };
  }, [open]);

  // Render nothing on server to avoid mismatch; island will mount on client
  if (typeof document === 'undefined') {
    return <button onClick={() => {}} className="dialog-trigger">{triggerText}</button>;
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="dialog-trigger">{triggerText}</button>
      {open && createPortal(
        <div className="dialog-overlay" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            tabIndex={-1}
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="dialog-title">{title}</h2>
            {description ? <p>{description}</p> : null}
            <div className="dialog-body">{children || <p>Dialog content goes here.</p>}</div>
            <div className="dialog-actions">
              <button onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
          <style>{`
            .dialog-overlay { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.45); z-index: 9999; }
            .dialog { background: var(--color-surface-default); color: var(--color-text-primary); padding: calc(var(--space-3)); border-radius: var(--radius-md); max-width: 720px; width: 92%; box-shadow: 0 12px 40px rgba(2,6,23,0.2); }
            .dialog h2 { margin: 0 0 var(--space-2) 0; }
            .dialog-body { margin-top: var(--space-2); }
            .dialog-actions { margin-top: var(--space-3); display:flex; gap: var(--space-2); justify-content:flex-end; }
            @media (prefers-reduced-motion: reduce) { .dialog { transition: none; } }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
