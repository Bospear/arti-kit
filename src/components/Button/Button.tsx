import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'submit';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  onClick,
  type = variant === 'submit' ? 'submit' : 'button',
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'art-btn',
    `art-btn--${variant}`,
    `art-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="art-btn__icon">{icon}</span>}
      <span className="art-btn__label">{children}</span>
    </button>
  );
}
