import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import './Card.css';

export type CardVariant = 'default' | 'parchment' | 'crimson' | 'azure' | 'elevated';
export type CardLayout = 'vertical' | 'horizontal';
export type CardDensity = 'compact' | 'detailed';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  /** Content orientation. Defaults to vertical. */
  layout?: CardLayout;
  /** Spacing / content scale. Defaults to detailed. */
  density?: CardDensity;
  /** Selection state — uses border, left indicator, and check (not color alone). */
  selected?: boolean;
};

export function Card({
  children,
  variant = 'default',
  layout = 'vertical',
  density = 'detailed',
  selected = false,
  className = '',
  tabIndex,
  role,
  onClick,
  onKeyDown,
  ...props
}: CardProps) {
  const interactive = typeof onClick === 'function';
  const classes = [
    'art-card',
    `art-card--${variant}`,
    `art-card--${layout}`,
    `art-card--${density}`,
    selected ? 'art-card--selected' : '',
    interactive ? 'art-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
    }
  }

  return (
    <div
      className={classes}
      data-selected={selected ? 'true' : undefined}
      aria-pressed={interactive ? selected : undefined}
      role={role ?? (interactive ? 'button' : undefined)}
      tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
      onClick={onClick}
      onKeyDown={interactive || onKeyDown ? handleKeyDown : onKeyDown}
      {...props}
    >
      {selected && (
        <>
          <span className="art-card__select-indicator" aria-hidden="true" />
          <span className="art-card__select-check" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6.2 4.8 8.5 9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </>
      )}
      {children}
    </div>
  );
}

export type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function CardHeader({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`art-card__header ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`art-card__body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`art-card__footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
