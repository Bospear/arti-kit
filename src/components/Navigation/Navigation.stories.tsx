import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { AppSidebar } from './AppSidebar';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { NavItem } from './NavItem';
import { NavigationRail } from './NavigationRail';
import { SectionNavigation } from './SectionNavigation';
import { TopNavigation } from './TopNavigation';
import { TreeNavigation } from './TreeNavigation';

const icon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 10l8-6 8 6v10H4V10z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: 'Artikit/Navigation',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const NavItemStates: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 220 }}>
      <NavItem label="Overview" icon={icon} />
      <NavItem label="Active" icon={icon} active />
      <NavItem label="Disabled" icon={icon} disabled />
      <NavItem
        label="With badge"
        icon={icon}
        badge={
          <Badge size="sm" variant="solid-crimson">
            3
          </Badge>
        }
      />
      <NavItem label="Collapsed" icon={icon} collapsed />
    </div>
  ),
};

export const Sidebar: StoryObj = {
  render: function SidebarStory() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ height: 360, display: 'flex' }}>
        <AppSidebar
          collapsed={collapsed}
          header={<strong>{collapsed ? 'A' : 'Artificer'}</strong>}
          footer={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? '»' : '«'}
            </Button>
          }
        >
          <NavItem label="Home" icon={icon} active collapsed={collapsed} />
          <NavItem label="Library" icon={icon} collapsed={collapsed} />
          <NavItem label="Settings" icon={icon} collapsed={collapsed} />
        </AppSidebar>
      </div>
    );
  },
};

export const TopBar: StoryObj = {
  render: () => (
    <TopNavigation
      brand={<span>Artificer</span>}
      links={[
        { id: 'home', label: 'Home', href: '#', active: true },
        { id: 'docs', label: 'Docs', href: '#' },
        { id: 'kits', label: 'Kits', onClick: () => undefined },
      ]}
      actions={
        <Button type="button" variant="primary" size="sm">
          Sign in
        </Button>
      }
    />
  ),
};

export const Rail: StoryObj = {
  render: function RailStory() {
    const [active, setActive] = useState('home');
    return (
      <div style={{ height: 280, display: 'flex' }}>
        <NavigationRail
          items={[
            {
              id: 'home',
              icon,
              'aria-label': 'Home',
              active: active === 'home',
              onClick: () => setActive('home'),
            },
            {
              id: 'library',
              icon,
              'aria-label': 'Library',
              active: active === 'library',
              onClick: () => setActive('library'),
            },
            {
              id: 'settings',
              icon,
              'aria-label': 'Settings',
              active: active === 'settings',
              onClick: () => setActive('settings'),
            },
          ]}
        />
      </div>
    );
  },
};

export const MobileDrawer: StoryObj = {
  render: function MobileDrawerStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open menu
        </Button>
        <MobileNavigationDrawer open={open} onClose={() => setOpen(false)} title="Menu">
          <NavItem label="Home" icon={icon} active />
          <NavItem label="Library" icon={icon} />
          <NavItem label="Settings" icon={icon} />
        </MobileNavigationDrawer>
      </>
    );
  },
};

export const Tree: StoryObj = {
  render: function TreeStory() {
    const [activeId, setActiveId] = useState('guides');
    return (
      <div style={{ width: 260 }}>
        <TreeNavigation
          activeId={activeId}
          onSelect={setActiveId}
          defaultExpandedIds={['docs']}
          items={[
            {
              id: 'docs',
              label: 'Docs',
              children: [
                { id: 'guides', label: 'Guides' },
                { id: 'api', label: 'API' },
              ],
            },
            { id: 'changelog', label: 'Changelog', href: '#' },
          ]}
        />
      </div>
    );
  },
};

export const Section: StoryObj = {
  render: function SectionStory() {
    const [active, setActive] = useState('intro');
    return (
      <div style={{ width: 200 }}>
        <SectionNavigation
          items={[
            { id: 'intro', label: 'Introduction', active: active === 'intro', onClick: () => setActive('intro') },
            { id: 'usage', label: 'Usage', active: active === 'usage', onClick: () => setActive('usage') },
            { id: 'api', label: 'API', active: active === 'api', onClick: () => setActive('api') },
          ]}
        />
      </div>
    );
  },
};
