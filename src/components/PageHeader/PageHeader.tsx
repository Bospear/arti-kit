import type { HTMLAttributes, ReactNode } from 'react';
import './PageHeader.css';

export type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
};

/** Figma Page Header — title row with optional breadcrumbs, description, and actions. */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  meta,
  className = '',
  ...props
}: PageHeaderProps) {
  return (
    <header className={`art-page-header${className ? ` ${className}` : ''}`} {...props}>
      {breadcrumbs && <div className="art-page-header__crumbs">{breadcrumbs}</div>}
      <div className="art-page-header__row">
        <div className="art-page-header__main">
          <h1 className="art-page-header__title">{title}</h1>
          {description && <p className="art-page-header__description">{description}</p>}
          {meta && <div className="art-page-header__meta">{meta}</div>}
        </div>
        {actions && <div className="art-page-header__actions">{actions}</div>}
      </div>
    </header>
  );
}
