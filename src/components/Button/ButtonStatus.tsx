import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonSize } from './Button';

export type ButtonStatusTone = 'success' | 'warning' | 'danger' | 'info';

export type ButtonStatusProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: ButtonStatusTone;
  size?: ButtonSize;
  /** Kept for API stability; Figma status buttons are solid fills (no marker). */
  showDot?: boolean;
  icon?: ReactNode;
};

export function ButtonStatus({
  children,
  tone = 'info',
  size = 'md',
  showDot: _showDot = false,
  icon,
  className = '',
  ...props
}: ButtonStatusProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={`art-btn-status art-btn--status-${tone} ${className}`.trim()}
      icon={icon}
      {...props}
    >
      {children}
    </Button>
  );
}
