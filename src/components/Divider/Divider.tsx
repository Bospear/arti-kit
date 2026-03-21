import type { HTMLAttributes } from 'react';
import './Divider.css';

export type DividerVariant = 'default' | 'crimson' | 'azure' | 'ornate';

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  variant?: DividerVariant;
};

export function Divider({ label, variant = 'default', className = '', ...props }: DividerProps) {
  const classes = [
    'art-divider',
    `art-divider--${variant}`,
    label ? 'art-divider--labeled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="separator" {...props}>
      {label && <span className="art-divider__label">{label}</span>}
    </div>
  );
}
