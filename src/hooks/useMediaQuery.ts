import { useSyncExternalStore, useCallback } from 'react';

/**
 * Low-level hook that subscribes to a raw CSS media query string
 * and returns whether it currently matches.
 *
 * Works with SSR (returns `false` during server render).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
