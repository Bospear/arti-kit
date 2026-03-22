import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';

export type DialogProps = {
  /** When `false`, nothing is rendered (no portal). */
  open: boolean;
  onClose: () => void;
  /** Shown in the header; linked with `aria-labelledby`. */
  title?: ReactNode;
  children: ReactNode;
  /** Optional footer region (e.g. wrap actions in `DialogActions`). */
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  /** Added to the dialog panel element (not the overlay). */
  className?: string;
  /** Used when `title` is omitted; defaults to `"Dialog"`. */
  'aria-label'?: string;
  /** Portal mount node (defaults to `document.body`). */
  container?: Element | DocumentFragment | null;
};

/**
 * Modal dialog rendered via a portal. Closes on overlay click (optional), Escape, or the header close control.
 * Locks body scroll while open, restores focus to the previously focused element on close, and moves focus to the dialog panel when opened.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  'aria-label': ariaLabelProp,
  container,
}: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const labelFallback =
    ariaLabelProp ?? (title == null || title === '' ? 'Dialog' : undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const prevActive = document.activeElement;
    let cancelled = false;
    const raf = window.requestAnimationFrame(() => {
      if (!cancelled) panel.focus();
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      if (prevActive instanceof HTMLElement && typeof prevActive.focus === 'function') {
        prevActive.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  function handleOverlayClick() {
    if (closeOnOverlayClick) onClose();
  }

  const hasTitle = title != null && title !== '';
  const mount = container ?? (typeof document !== 'undefined' ? document.body : null);
  if (mount == null) return null;

  const panel = (
    <div className="art-dialog-overlay" onClick={handleOverlayClick} role="presentation">
      <div
        ref={panelRef}
        className={['art-dialog', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-label={hasTitle ? undefined : labelFallback}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="art-dialog__header">
          {hasTitle ? (
            <h2 id={titleId} className="art-dialog__title">
              {title}
            </h2>
          ) : (
            <span className="art-dialog__title-spacer" aria-hidden="true" />
          )}
          {showCloseButton && (
            <button
              type="button"
              className="art-dialog__close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              ×
            </button>
          )}
        </header>
        <div className="art-dialog__body">{children}</div>
        {footer != null && footer !== false && (
          <footer className="art-dialog__footer">{footer}</footer>
        )}
      </div>
    </div>
  );

  return createPortal(panel, mount);
}

export type DialogActionsProps = {
  children: ReactNode;
  className?: string;
};

/** Flex row for footer actions (typically right-aligned). */
export function DialogActions({ children, className = '' }: DialogActionsProps) {
  return (
    <div className={['art-dialog__actions', className].filter(Boolean).join(' ')}>{children}</div>
  );
}
