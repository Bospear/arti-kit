import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './SidePanel.css';

export type SidePanelProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  side?: 'right' | 'left';
  /** Desktop width; on narrow screens becomes full-screen. */
  width?: number | string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
  'aria-label'?: string;
  container?: Element | DocumentFragment | null;
};

export function SidePanel({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  width = 400,
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  'aria-label': ariaLabelProp,
  container,
}: SidePanelProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const labelFallback =
    ariaLabelProp ?? (title == null || title === '' ? 'Side panel' : undefined);

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
    const raf = window.requestAnimationFrame(() => panel.focus());
    return () => {
      window.cancelAnimationFrame(raf);
      if (prevActive instanceof HTMLElement) prevActive.focus();
    };
  }, [open]);

  if (!open) return null;

  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  const node = (
    <div className="art-side-panel" role="presentation">
      <div
        className="art-side-panel__backdrop"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={labelFallback}
        tabIndex={-1}
        className={`art-side-panel__panel art-side-panel__panel--${side}${className ? ` ${className}` : ''}`}
        style={{ ['--art-side-panel-width' as string]: widthStyle }}
      >
        {(title || showCloseButton) && (
          <header className="art-side-panel__header">
            {title ? (
              <h2 id={titleId} className="art-side-panel__title">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showCloseButton && (
              <button
                type="button"
                className="art-side-panel__close"
                aria-label="Close"
                onClick={onClose}
              >
                ×
              </button>
            )}
          </header>
        )}
        <div className="art-side-panel__body">{children}</div>
        {footer && <footer className="art-side-panel__footer">{footer}</footer>}
      </div>
    </div>
  );

  return createPortal(node, container ?? document.body);
}
