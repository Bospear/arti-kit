import type { Meta, StoryObj } from '@storybook/react';
import { useMediaQuery } from './useMediaQuery';
import { BreakpointProvider, useBreakpoint } from './BreakpointProvider';
import type { BreakpointMap } from './BreakpointProvider';

function Indicator({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: `2px solid ${active ? 'var(--color-crimson-300)' : 'var(--color-border)'}`,
        background: active ? 'var(--color-crimson-50)' : 'var(--color-surface-raised)',
        color: active ? 'var(--color-crimson-400)' : 'var(--color-text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
        transition: 'all 150ms ease',
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: active ? 'var(--color-crimson-300)' : 'var(--color-steel-200)',
          transition: 'background 150ms ease',
        }}
      />
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Story 1: Raw useMediaQuery
   ───────────────────────────────────────────── */

function UseMediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 599px)');
  const isTablet = useMediaQuery('(min-width: 600px) and (max-width: 899px)');
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.75rem' }}>Viewport size</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Indicator label="Mobile (<600px)" active={isMobile} />
          <Indicator label="Tablet (600–899px)" active={isTablet} />
          <Indicator label="Desktop (≥900px)" active={isDesktop} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.75rem' }}>User preferences</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Indicator label="Light mode" active={prefersLight} />
          <Indicator label="Dark mode" active={prefersDark} />
          <Indicator label="Reduced motion" active={prefersReducedMotion} />
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>
        Resize the browser window to see indicators update in real time.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Story 2: BreakpointProvider + useBreakpoint
   ───────────────────────────────────────────── */

function BreakpointDashboard() {
  const { breakpoints, up, current } = useBreakpoint();

  const sorted = Object.entries(breakpoints).sort(([, a], [, b]) => a - b);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.75rem' }}>
          Current breakpoint: <span style={{ color: 'var(--color-crimson-300)' }}>{current}</span>
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {sorted.map(([name, value]) => (
            <Indicator key={name} label={`${name} (≥${value}px)`} active={up(name)} />
          ))}
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>
        Resize the browser window — all breakpoints above the current width light up.
      </p>
    </div>
  );
}

function BreakpointProviderDemo() {
  return (
    <BreakpointProvider>
      <BreakpointDashboard />
    </BreakpointProvider>
  );
}

/* ─────────────────────────────────────────────
   Story 3: Custom breakpoints
   ───────────────────────────────────────────── */

const CUSTOM_BREAKPOINTS: BreakpointMap = {
  phone: 0,
  phablet: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  ultrawide: 1920,
};

function CustomBreakpointDemo() {
  return (
    <BreakpointProvider breakpoints={CUSTOM_BREAKPOINTS}>
      <BreakpointDashboard />
    </BreakpointProvider>
  );
}

/* ─────────────────────────────────────────────
   Story 4: Responsive layout example
   ───────────────────────────────────────────── */

function ResponsiveLayoutInner() {
  const { up, current } = useBreakpoint();

  const columns = up('lg') ? 3 : up('md') ? 2 : 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
        Breakpoint: {current} — showing {columns} column{columns > 1 ? 's' : ''}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '1rem',
          transition: 'all 250ms ease',
        }}
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              padding: '2rem',
              borderRadius: '8px',
              border: '2px solid var(--color-border-strong)',
              background: 'var(--color-surface-raised)',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-xl)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Card {n}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponsiveLayoutDemo() {
  return (
    <BreakpointProvider>
      <ResponsiveLayoutInner />
    </BreakpointProvider>
  );
}

/* ─────────────────────────────────────────────
   Meta + exports
   ───────────────────────────────────────────── */

const meta: Meta = {
  title: 'Artikit/Hooks/useMediaQuery',
};

export default meta;

type Story = StoryObj;

export const RawHook: Story = {
  name: 'useMediaQuery (raw)',
  render: () => <UseMediaQueryDemo />,
};

export const WithProvider: Story = {
  name: 'BreakpointProvider + useBreakpoint',
  render: () => <BreakpointProviderDemo />,
};

export const CustomBreakpoints: Story = {
  name: 'Custom breakpoints',
  render: () => <CustomBreakpointDemo />,
};

export const ResponsiveLayout: Story = {
  name: 'Responsive layout example',
  render: () => <ResponsiveLayoutDemo />,
};
