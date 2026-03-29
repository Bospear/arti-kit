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
      viewBox="0 0 400 56"
      aria-hidden
      focusable="false"
    >
      <path
        d="M 14,15 C 7,19 10,27 22,26 C 32,25 42,34 40,43 C 38,50 26,49 25,41 C 24,33 34,23 56,25 C 105,28 160,27 200,27 C 240,27 295,28 344,25 C 366,23 376,33 375,41 C 374,49 362,50 360,43 C 358,34 368,25 378,26 C 390,27 393,19 386,15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
