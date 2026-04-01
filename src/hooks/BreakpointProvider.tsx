import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useMediaQuery } from './useMediaQuery';

export type BreakpointMap = Record<string, number>;

export type BreakpointContextValue = {
  /** The raw breakpoint config that was passed to the provider. */
  breakpoints: BreakpointMap;
  /**
   * Returns `true` when the viewport is **at least** `minWidth` pixels wide.
   * Equivalent to `@media (min-width: <value>px)`.
   */
  up: (name: string) => boolean;
  /**
   * Returns `true` when the viewport is **below** the named breakpoint.
   * Equivalent to `@media (max-width: <value - 0.02>px)`.
   */
  down: (name: string) => boolean;
  /**
   * Returns `true` when the viewport is **between** two named breakpoints (inclusive of min, exclusive of max).
   */
  between: (min: string, max: string) => boolean;
  /** The name of the currently active breakpoint (largest that still matches). */
  current: string;
};

const BreakpointContext = createContext<BreakpointContextValue | null>(null);

const DEFAULT_BREAKPOINTS: BreakpointMap = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export type BreakpointProviderProps = {
  children: ReactNode;
  /** Custom breakpoint map. Keys are names, values are min-width in px. Defaults to xs/sm/md/lg/xl. */
  breakpoints?: BreakpointMap;
};

function useSortedBreakpoints(bp: BreakpointMap) {
  return useMemo(
    () =>
      Object.entries(bp)
        .sort(([, a], [, b]) => a - b)
        .map(([name, value]) => ({ name, value })),
    [bp],
  );
}

/**
 * Internal component that subscribes to every breakpoint media query.
 * Each call to useMediaQuery creates a single matchMedia listener.
 */
function BreakpointProviderInner({
  children,
  breakpoints,
}: {
  children: ReactNode;
  breakpoints: BreakpointMap;
}) {
  const sorted = useSortedBreakpoints(breakpoints);

  const matches: Record<string, boolean> = {};
  for (const { name, value } of sorted) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    matches[name] = useMediaQuery(`(min-width: ${value}px)`);
  }

  const context = useMemo<BreakpointContextValue>(() => {
    const up = (name: string) => {
      if (!(name in matches)) {
        throw new Error(`Unknown breakpoint "${name}". Available: ${Object.keys(breakpoints).join(', ')}`);
      }
      return matches[name];
    };

    const down = (name: string) => !up(name);

    const between = (min: string, max: string) => up(min) && down(max);

    let current = sorted[0]?.name ?? '';
    for (const { name } of sorted) {
      if (matches[name]) current = name;
    }

    return { breakpoints, up, down, between, current };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoints, ...sorted.map(({ name }) => matches[name])]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('art-bp-ready');

    const upClasses = sorted
      .filter(({ name }) => matches[name])
      .map(({ name }) => `art-bp-up-${name}`);

    upClasses.forEach((cls) => root.classList.add(cls));

    return () => {
      root.classList.remove('art-bp-ready');
      sorted.forEach(({ name }) => root.classList.remove(`art-bp-up-${name}`));
    };
  });

  return (
    <BreakpointContext.Provider value={context}>
      {children}
    </BreakpointContext.Provider>
  );
}

export function BreakpointProvider({
  children,
  breakpoints = DEFAULT_BREAKPOINTS,
}: BreakpointProviderProps) {
  return (
    <BreakpointProviderInner breakpoints={breakpoints}>
      {children}
    </BreakpointProviderInner>
  );
}

/**
 * Consume the nearest `<BreakpointProvider>`.
 * Returns helpers: `up('md')`, `down('sm')`, `between('sm','lg')`, and `current`.
 */
export function useBreakpoint(): BreakpointContextValue {
  const ctx = useContext(BreakpointContext);
  if (!ctx) {
    throw new Error('useBreakpoint must be used within a <BreakpointProvider>');
  }
  return ctx;
}
