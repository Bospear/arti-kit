import { SidePanel, type SidePanelProps } from '../SidePanel/SidePanel';

export type DrawerProps = SidePanelProps;

/**
 * Mobile-friendly drawer — thin wrapper around `SidePanel` (defaults to left edge).
 */
export function Drawer({ side = 'left', ...props }: DrawerProps) {
  return <SidePanel side={side} {...props} />;
}
