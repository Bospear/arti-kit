import { useEffect, useRef, type ComponentType, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { AlertVariant } from '../Alert/Alert';
import './Snackbar.css';

function IconInfo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 10v6M12 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconError({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSuccess({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8 12l2.5 2.5L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWarning({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L2 20h20L12 3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<AlertVariant, ComponentType<{ className?: string }>> = {
  message: IconInfo,
  error: IconError,
  success: IconSuccess,
  warning: IconWarning,
};

export type SnackbarVariant = AlertVariant;
export type SnackbarPosition = 'center' | 'start' | 'end';

export type SnackbarProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: SnackbarVariant;
  /** Auto-dismiss after this many ms. `0` = no timer. Default `5000`. */
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
  showDismiss?: boolean;
  position?: SnackbarPosition;
  className?: string;
  container?: Element | DocumentFragment | null;
};

/**
 * Bottom toast (portal). Variants match `Alert`; error/warning use `role="alert"` and assertive live region.
 */
export function Snackbar({
  open,
  onClose,
  children,
  variant = 'message',
  duration = 5000,
  actionLabel,
  onAction,
  showDismiss = true,
  position = 'center',
  className = '',
  container,
}: SnackbarProps) {
  const timerRef = useRef<number | null>(null);
  const Icon = ICONS[variant] ?? IconInfo;
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const live: 'assertive' | 'polite' =
    variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';

  useEffect(() => {
    if (!open || duration <= 0) return;
    timerRef.current = window.setTimeout(() => {
      onClose();
    }, duration);
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, [open, duration, onClose]);

  if (!open) return null;

  const mount = container ?? (typeof document !== 'undefined' ? document.body : null);
  if (mount == null) return null;

  const hostClass = [
    'art-snackbar-host',
    position === 'start' && 'art-snackbar-host--start',
    position === 'end' && 'art-snackbar-host--end',
  ]
    .filter(Boolean)
    .join(' ');

  const panelClass = ['art-snackbar', `art-snackbar--${variant}`, className].filter(Boolean).join(' ');

  const content = (
    <div className={hostClass} role="presentation">
      <div className={panelClass} role={role} aria-live={live} aria-atomic="true">
        <span className="art-snackbar__icon-wrap" aria-hidden="true">
          <Icon className="art-snackbar__icon" />
        </span>
        <div className="art-snackbar__content">{children}</div>
        {actionLabel != null && actionLabel !== '' && typeof onAction === 'function' && (
          <button type="button" className="art-snackbar__action" onClick={onAction}>
            {actionLabel}
          </button>
        )}
        {showDismiss && (
          <button type="button" className="art-snackbar__dismiss" onClick={onClose} aria-label="Dismiss">
            ×
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(content, mount);
}
