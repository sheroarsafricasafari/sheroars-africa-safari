"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DescentRail({
  stops,
}: {
  stops: readonly { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string>(stops[0].id);

  useEffect(() => {
    const observed = stops
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!observed.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        const current = visible[0]?.target.id;
        if (current) setActive(current);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    observed.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [stops]);

  return (
    <nav aria-label="On this crater page" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-sand bg-cream/95 p-2 shadow-card backdrop-blur 2xl:block">
      <ol className="grid gap-1">
        {stops.map((stop, index) => (
          <li key={stop.id}>
            <Link
              href={`#${stop.id}`}
              aria-current={active === stop.id ? "location" : undefined}
              aria-label={`${index + 1}. ${stop.label}`}
              title={stop.label}
              className="flex size-10 items-center justify-center rounded-full text-xs font-bold text-muted transition-colors hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-[current=location]:bg-forest aria-[current=location]:text-gold"
            >
              {String(index + 1).padStart(2, "0")}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
