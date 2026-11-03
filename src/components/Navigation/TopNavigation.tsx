import type { HTMLAttributes, ReactNode } from 'react';
import './Navigation.css';

export type TopNavLink = {
  id: string;
  label: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
};

export type TopNavigationProps = HTMLAttributes<HTMLElement> & {
  brand: ReactNode;
  links?: TopNavLink[];
  actions?: ReactNode;
  'aria-label'?: string;
};

/**
 * Horizontal top bar with brand, nav links, and trailing actions.
 */
export function TopNavigation({
  brand,
  links = [],
  actions,
  className = '',
  'aria-label': ariaLabel = 'Primary',
  ...props
}: TopNavigationProps) {
  return (
    <header
      className={['art-top-nav', className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="art-top-nav__brand">{brand}</div>
      {links.length > 0 && (
        <nav className="art-top-nav__links" aria-label={ariaLabel}>
          {links.map((link) => {
            const classes = [
              'art-top-nav__link',
              link.active ? 'art-top-nav__link--active' : '',
            ]
              .filter(Boolean)
              .join(' ');

            if (link.href) {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={classes}
                  aria-current={link.active ? 'page' : undefined}
                  onClick={link.onClick}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <button
                key={link.id}
                type="button"
                className={classes}
                aria-current={link.active ? 'page' : undefined}
                onClick={link.onClick}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      )}
      {actions != null && <div className="art-top-nav__actions">{actions}</div>}
    </header>
  );
}
