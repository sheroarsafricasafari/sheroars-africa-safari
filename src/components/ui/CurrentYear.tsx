"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Server render and first client render use the fallback year, then the
// browser shows the real current year. The build never reads the clock.
export default function CurrentYear({ fallback = 2026 }: { fallback?: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <>{year}</>;
}
