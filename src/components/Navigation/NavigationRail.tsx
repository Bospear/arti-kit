import type { HTMLAttributes, ReactNode } from 'react';
import { NavItem } from './NavItem';
import './Navigation.css';

export type NavigationRailItem = {
  id: string;
  icon: ReactNode;
  /** Accessible name for the icon-only control. */
  'aria-label': string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
};

export type NavigationRailProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: NavigationRailItem[];
  /** Accessible name for the rail landmark. */
  'aria-label'?: string;
};

/**
 * Vertical icon-only navigation rail. Reuses collapsed `NavItem` styling.
 */
export function NavigationRail({
  items,
  className = '',
  'aria-label': ariaLabel = 'Primary',
  ...props
}: NavigationRailProps) {
  return (
    <nav
      className={['art-nav-rail', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...props}
    >
      <ul className="art-nav-rail__list" role="list">
        {items.map((item) => (
          <li key={item.id} className="art-nav-rail__item">
            {item.href != null ? (
              <a
                href={item.href}
                className={[
                  'art-nav-item',
                  'art-nav-item--collapsed',
                  item.active ? 'art-nav-item--active' : '',
                  item.disabled ? 'art-nav-item--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={item['aria-label']}
                aria-current={item.active ? 'page' : undefined}
                aria-disabled={item.disabled || undefined}
                title={item['aria-label']}
                onClick={
                  item.disabled
                    ? (e) => e.preventDefault()
                    : item.onClick
                      ? (e) => {
                          e.preventDefault();
                          item.onClick?.();
                        }
                      : undefined
                }
                tabIndex={item.disabled ? -1 : undefined}
              >
                <span className="art-nav-item__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="art-nav-item__label">{item['aria-label']}</span>
              </a>
            ) : (
              <NavItem
                label={item['aria-label']}
                icon={item.icon}
                collapsed
                active={item.active}
                disabled={item.disabled}
                onClick={item.onClick}
                aria-label={item['aria-label']}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
