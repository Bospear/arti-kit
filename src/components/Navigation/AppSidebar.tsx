import type { HTMLAttributes, ReactNode } from 'react';
import './Navigation.css';

export type AppSidebarProps = HTMLAttributes<HTMLElement> & {
  /** Brand / logo region. */
  header?: ReactNode;
  /** Nav items (typically `NavItem` children). */
  children: ReactNode;
  /** Bottom slot (user menu, collapse control, etc.). */
  footer?: ReactNode;
  collapsed?: boolean;
  'aria-label'?: string;
};

/**
 * Application sidebar shell with optional header/footer and expanded/collapsed width.
 */
export function AppSidebar({
  header,
  children,
  footer,
  collapsed = false,
  className = '',
  'aria-label': ariaLabel = 'Application',
  ...props
}: AppSidebarProps) {
  return (
    <aside
      className={[
        'art-app-sidebar',
        collapsed ? 'art-app-sidebar--collapsed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
      data-collapsed={collapsed || undefined}
      {...props}
    >
      {header != null && <div className="art-app-sidebar__header">{header}</div>}
      <nav className="art-app-sidebar__nav" aria-label={ariaLabel}>
        {children}
      </nav>
      {footer != null && <div className="art-app-sidebar__footer">{footer}</div>}
    </aside>
  );
}
