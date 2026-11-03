import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

/**
 * Figma Artificer Button variants.
 * `ghost` remains for back-compat (maps visually near tertiary).
 * `submit` remains as a primary styling shortcut with type="submit".
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'submit';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon (Figma Show Icon). */
  icon?: ReactNode;
  /** Trailing icon. */
  iconEnd?: ReactNode;
  /** Shows a spinner and disables the button; preserves layout. */
  loading?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  iconEnd,
  loading = false,
  onClick,
  type = variant === 'submit' ? 'submit' : 'button',
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const classes = [
    'art-btn',
    `art-btn--${variant}`,
    `art-btn--${size}`,
    loading ? 'art-btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="art-btn__spinner" aria-hidden="true" />
      ) : (
        icon && <span className="art-btn__icon">{icon}</span>
      )}
      {children != null && children !== '' && (
        <span className="art-btn__label">{children}</span>
      )}
      {!loading && iconEnd && <span className="art-btn__icon art-btn__icon--end">{iconEnd}</span>}
    </button>
  );
}
