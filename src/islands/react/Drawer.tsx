import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  triggerText?: string;
  direction?: 'left' | 'right' | 'bottom';
  title?: string;
  children?: React.ReactNode;
}

export default function Drawer({ triggerText = 'Open drawer', direction = 'left', title = 'Panel', children }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (panel) panel.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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

  if (typeof document === 'undefined') {
    return <button className="drawer-trigger">{triggerText}</button>;
  }

  const panelStyle = (dir: string) => {
    if (dir === 'left') return { left: 0, top: 0, bottom: 0, width: 'min(420px, 90%)', transform: 'translateX(0)' };
    if (dir === 'right') return { right: 0, top: 0, bottom: 0, width: 'min(420px, 90%)', transform: 'translateX(0)' };
    return { left: 0, right: 0, bottom: 0, height: '40vh', transform: 'translateY(0)' };
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="drawer-trigger">{triggerText}</button>
      {open && createPortal(
        <div className="drawer-overlay" role="presentation" onClick={() => setOpen(false)}>
          <aside
            className={`drawer drawer--${direction}`}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h3 id="drawer-title">{title}</h3>
              <button aria-label="Close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="drawer-body">{children}</div>
          </aside>
          <style>{`
            .drawer-overlay { position: fixed; inset: 0; z-index: 9998; display:flex; }
            .drawer { background: var(--color-surface-default); color: var(--color-text-primary); box-shadow: 0 8px 32px rgba(2,6,23,0.12); padding: var(--space-3); }
            .drawer--left { transform: translateX(-0%); }
            .drawer--right { transform: translateX(0%); margin-left: auto; }
            .drawer--bottom { width: 100%; height: 40vh; margin-top: auto; }
            .drawer-header { display:flex; justify-content:space-between; align-items:center; gap: var(--space-2); }
            .drawer-body { margin-top: var(--space-2); }
            .drawer-overlay { background: rgba(0,0,0,0.35); align-items: ${direction === 'bottom' ? 'flex-end' : 'stretch'}; justify-content: ${direction === 'right' ? 'flex-end' : 'flex-start'}; }
            @media (prefers-reduced-motion: reduce) { .drawer { transition: none; } }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
