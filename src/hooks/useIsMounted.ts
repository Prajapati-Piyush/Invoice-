'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * React 19 / Next.js compliant hook to safely detect if the component has mounted in the browser.
 * Uses useSyncExternalStore to avoid hydration mismatches and cascading render warnings.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client snapshot
    () => false  // Server snapshot
  );
}

