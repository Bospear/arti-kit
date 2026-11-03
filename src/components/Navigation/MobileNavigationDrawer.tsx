import type { ReactNode } from 'react';
import { Drawer, type DrawerProps } from '../Drawer/Drawer';
import './Navigation.css';

export type MobileNavigationDrawerProps = Omit<DrawerProps, 'children' | 'side'> & {
  /** Drawer title (e.g. app name). */
  title?: ReactNode;
  /** Navigation content (links, `NavItem`s, etc.). */
  children: ReactNode;
  /** Edge the drawer opens from. Defaults to `left`. */
  side?: DrawerProps['side'];
};

/**
 * Mobile navigation shell wrapping `Drawer` for off-canvas nav menus.
 */
export function MobileNavigationDrawer({
  open,
  onClose,
  title,
  children,
  side = 'left',
  className = '',
  width = 300,
  ...props
}: MobileNavigationDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      side={side}
      width={width}
      className={['art-mobile-nav-drawer', className].filter(Boolean).join(' ')}
      {...props}
    >
      <nav className="art-mobile-nav-drawer__nav" aria-label="Mobile">
        {children}
      </nav>
    </Drawer>
  );
}
