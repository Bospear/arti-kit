import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Navigation.css';

export type NavItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  active?: boolean;
  /** Icon-only layout; label is exposed via `title` / `aria-label`. */
  collapsed?: boolean;
  /** Accessible name when collapsed; defaults to stringified `label`. */
  'aria-label'?: string;
};

/**
 * Sidebar / nav list item with optional icon, badge, and collapsed icon-only mode.
 */
export function NavItem({
  label,
  icon,
  badge,
  active = false,
  collapsed = false,
  disabled = false,
  className = '',
  title,
  'aria-label': ariaLabelProp,
  type = 'button',
  ...props
}: NavItemProps) {
  const labelText =
    typeof label === 'string' || typeof label === 'number' ? String(label) : undefined;
  const ariaLabel = collapsed ? (ariaLabelProp ?? labelText) : ariaLabelProp;
  const tip = collapsed ? (title ?? labelText) : title;

  const classes = [
    'art-nav-item',
    active ? 'art-nav-item--active' : '',
    collapsed ? 'art-nav-item--collapsed' : '',
    disabled ? 'art-nav-item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      aria-label={ariaLabel}
      title={tip}
      {...props}
    >
      {icon != null && (
        <span className="art-nav-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="art-nav-item__label">{label}</span>
      {badge != null && <span className="art-nav-item__badge">{badge}</span>}
    </button>
  );
}
