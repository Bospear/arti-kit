import type { HTMLAttributes, ReactNode } from 'react';
import './EmptyState.css';

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  /** Optional illustration or icon above the title. */
  icon?: ReactNode;
  /** Primary action slot (e.g. a Button). */
  action?: ReactNode;
};

/**
 * Placeholder for empty collections or missing results.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={['art-empty-state', className].filter(Boolean).join(' ')}
      role="status"
      {...props}
    >
      {icon != null && (
        <div className="art-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h2 className="art-empty-state__title">{title}</h2>
      {description != null && description !== '' && (
        <p className="art-empty-state__description">{description}</p>
      )}
      {action != null && <div className="art-empty-state__action">{action}</div>}
    </div>
  );
}
