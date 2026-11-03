import type { HTMLAttributes, ReactNode } from 'react';
import './Navigation.css';

export type SectionNavigationItem = {
  id: string;
  label: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
};

export type SectionNavigationProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: SectionNavigationItem[];
  /** Accessible name for the section nav landmark. */
  'aria-label'?: string;
};

/**
 * Vertical section / page TOC links with an active indicator.
 */
export function SectionNavigation({
  items,
  className = '',
  'aria-label': ariaLabel = 'On this page',
  ...props
}: SectionNavigationProps) {
  return (
    <nav
      className={['art-section-nav', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...props}
    >
      <ul className="art-section-nav__list" role="list">
        {items.map((item) => {
          const classes = [
            'art-section-nav__link',
            item.active ? 'art-section-nav__link--active' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li key={item.id} className="art-section-nav__item">
              {item.href != null ? (
                <a
                  href={item.href}
                  className={classes}
                  aria-current={item.active ? 'location' : undefined}
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className={classes}
                  aria-current={item.active ? 'location' : undefined}
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
