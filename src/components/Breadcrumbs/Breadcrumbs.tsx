import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import './Breadcrumbs.css';

export type BreadcrumbItem = {
  id: string;
  label: ReactNode;
  href?: string;
  current?: boolean;
};

export type BreadcrumbsProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  linkComponent?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => ReactNode;
};

export function Breadcrumbs({
  items,
  separator = '/',
  linkComponent,
  className = '',
  ...props
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`art-breadcrumbs${className ? ` ${className}` : ''}`}
      {...props}
    >
      <ol className="art-breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = item.current ?? index === items.length - 1;
          return (
            <li key={item.id} className="art-breadcrumbs__item">
              {index > 0 && (
                <span className="art-breadcrumbs__sep" aria-hidden="true">
                  {separator}
                </span>
              )}
              {isCurrent || !item.href ? (
                <span
                  className={`art-breadcrumbs__current${isCurrent ? '' : ''}`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : linkComponent ? (
                linkComponent({
                  href: item.href,
                  className: 'art-breadcrumbs__link',
                  children: item.label,
                })
              ) : (
                <a href={item.href} className="art-breadcrumbs__link">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
