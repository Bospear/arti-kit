import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import './Alert.css';

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

export type AlertVariant = 'message' | 'error' | 'success' | 'warning';

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'aria-live' | 'title'> & {
  variant?: AlertVariant;
  title?: ReactNode;
  children: ReactNode;
  onDismiss?: () => void;
};

/**
 * Inline alert / callout. Error & warning use `role="alert"` and assertive live region;
 * message & success use `role="status"` and polite.
 */
export function Alert({
  variant = 'message',
  title,
  children,
  onDismiss,
  className = '',
  ...props
}: AlertProps) {
  const Icon = ICONS[variant] ?? IconInfo;
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const live: 'assertive' | 'polite' =
    variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';

  const classes = ['art-alert', `art-alert--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role={role} aria-live={live} {...props}>
      <span className="art-alert__icon-wrap" aria-hidden="true">
        <Icon className="art-alert__icon" />
      </span>
      <div className="art-alert__content">
        {title != null && title !== '' && <p className="art-alert__title">{title}</p>}
        <div className="art-alert__body">{children}</div>
      </div>
      {typeof onDismiss === 'function' && (
        <button
          type="button"
          className="art-alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
}
