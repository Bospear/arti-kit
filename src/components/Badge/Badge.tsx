import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'default'
  | 'crimson'
  | 'azure'
  | 'bark'
  | 'steel'
  | 'solid-crimson'
  | 'solid-azure';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const classes = [
    'art-badge',
    `art-badge--${variant}`,
    `art-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
