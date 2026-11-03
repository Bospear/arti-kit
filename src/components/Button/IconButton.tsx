import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Required accessible name (Figma: Accessible Name). */
  'aria-label': string;
  icon: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      icon={icon}
      className={`art-icon-btn ${className}`.trim()}
      {...props}
    />
  );
}
