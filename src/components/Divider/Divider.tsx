import type { HTMLAttributes, ReactNode } from 'react';
import './Divider.css';

export type DividerVariant = 'default' | 'crimson' | 'azure' | 'ornate';

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  variant?: DividerVariant;
};

function DividerFlourish() {
  return (
    <svg
      className="art-divider__flourish"
      viewBox="0 0 400 16"
      aria-hidden
      focusable="false"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="8"
        x2="400"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Divider({ label, variant = 'default', className = '', ...props }: DividerProps) {
  const hasLabel = label != null && label !== '';
  const classes = [
    'art-divider',
    `art-divider--${variant}`,
    hasLabel ? 'art-divider--labeled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="separator" {...props}>
      {hasLabel ? (
        <>
          <span className="art-divider__rule" />
          <span className="art-divider__label">{label}</span>
          <span className="art-divider__rule" />
        </>
      ) : (
        <DividerFlourish />
      )}
    </div>
  );
}
