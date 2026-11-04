"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SafariHubData } from "@/types/safari-hub";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

const regions = [
  { id: "south", label: "Southern Plains & Ndutu", d: "M105 284 C128 244 205 250 235 285 C255 315 216 355 164 350 C116 345 86 320 105 284Z" },
  { id: "central", label: "Central Seronera", d: "M280 195 C319 165 377 178 395 218 C410 254 378 284 337 277 C294 271 258 232 280 195Z" },
  { id: "west", label: "Western Corridor & Grumeti", d: "M153 141 C205 105 259 125 265 164 C270 196 226 216 187 202 C151 190 123 164 153 141Z" },
  { id: "north", label: "Northern Serengeti & Mara River", d: "M325 65 C372 39 430 61 434 103 C438 143 396 162 356 146 C319 132 292 88 325 65Z" },
  { id: "east", label: "Eastern track", d: "M420 156 C460 133 499 157 494 194 C489 225 454 239 428 218 C403 199 395 171 420 156Z" },
] as const;

export default function MigrationExplorer({ migration }: { migration: SafariHubData["migration"] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();
  const inView = useInView(sectionRef);
  const entry = migration[selected];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % migration.length;
    else if (event.key === "ArrowLeft") next = (index + migration.length - 1) % migration.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = migration.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={sectionRef}>
      <div role="tablist" aria-label="Select a month for the Great Migration" className="flex snap-x gap-2 overflow-x-auto pb-3">
        {migration.map((item, index) => (
          <button
            key={item.month}
            ref={(node) => { tabRefs.current[index] = node; }}
            type="button"
            role="tab"
            id={`migration-tab-${index}`}
            aria-selected={selected === index}
            aria-controls="migration-panel"
            aria-label={item.month}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            className="relative min-h-11 shrink-0 snap-start rounded-full px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {selected === index ? <motion.span layoutId="migration-month" className="absolute inset-0 rounded-full bg-gold" transition={reducedMotion ? { duration: 0 } : undefined} /> : null}
            <span className={`relative z-10 ${selected === index ? "text-forest" : ""}`}>{item.month.slice(0, 3)}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-7">
          <svg viewBox="0 0 560 390" role="img" aria-labelledby="migration-map-title migration-map-desc" className="w-full">
            <title id="migration-map-title">Illustrative Serengeti migration map</title>
            <desc id="migration-map-desc">An abstract diagram of five Serengeti regions, not a geographic map.</desc>
            <path d="M75 332 C165 283 211 303 274 230 C319 180 367 188 461 116" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="4" strokeDasharray="4 11" className={inView && !reducedMotion ? "motion-safe:animate-[migration-flow_15s_linear_infinite]" : ""} />
            {regions.map((region) => {
              const active = region.id === entry.activeRegion;
              return <path key={region.id} d={region.d} fill={active ? "#cda75f" : "rgba(255,255,255,.12)"} stroke="rgba(255,255,255,.45)" strokeWidth="2" className={active && inView && !reducedMotion ? "motion-safe:animate-pulse" : ""}><title>{region.label}</title></path>;
            })}
            <text x="15" y="376" fill="rgba(255,255,255,.7)" fontSize="13">Illustrative map, not to scale</text>
          </svg>
          <ul className="mt-4 grid gap-2 text-xs text-cream/75 sm:grid-cols-2">{regions.map(({ id, label }) => <li key={id} className="flex items-center gap-2"><span className={`size-2 rounded-full ${id === entry.activeRegion ? "bg-gold" : "bg-white/30"}`} />{label}</li>)}</ul>
        </div>

        <section id="migration-panel" role="tabpanel" aria-labelledby={`migration-tab-${selected}`} className="rounded-3xl bg-cream p-6 text-earth sm:p-8">
          <p className="text-eyebrow text-terracotta">{entry.region}</p>
          <h3 className="mt-3 font-heading text-3xl">{entry.headline}</h3>
          <p className="mt-4 leading-7 text-muted">{entry.text}</p>
          <div className="mt-6 flex items-center gap-2" role="meter" aria-label="Seasonal activity" aria-valuemin={1} aria-valuemax={5} aria-valuenow={entry.intensity}>
            <span className="mr-2 text-sm font-semibold">Seasonal activity</span>
            {Array.from({ length: 5 }, (_, index) => <span key={index} aria-hidden="true" className={`size-3 rounded-full ${index < entry.intensity ? "bg-terracotta" : "bg-sand"}`} />)}
          </div>
          <div className="mt-7 grid gap-3">
            <Link href={`/safaris/packages?month=${encodeURIComponent(entry.month)}`} className="inline-flex min-h-11 items-center justify-between rounded-full bg-terracotta px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              See Safaris for {entry.month}<ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link href="/safaris/serengeti/great-migration" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              Read the full migration guide<ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>
      </div>
      <p className="mt-5 text-sm text-cream/70">Movements vary with the rains. Your guide follows the herds in real time. <span className="sr-only">TODO(CONFIRM): verify migration guidance.</span></p>
      <style jsx>{`@keyframes migration-flow { to { stroke-dashoffset: -120; } }`}</style>
    </div>
  );
}
