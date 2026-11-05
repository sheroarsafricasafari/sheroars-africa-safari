"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import type { MigrationRegion } from "@/data/destinations/great-migration";

export default function MigrationJourneyExplorer({ regions }: { regions: MigrationRegion[] }) {
  const [selectedId, setSelectedId] = useState(regions[0]?.id ?? "");
  const reducedMotion = useReducedMotionPreference();
  const selected = regions.find((region) => region.id === selectedId) ?? regions[0];
  if (!selected) return null;

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-stretch">
      <div className="min-w-0 rounded-3xl bg-forest p-4 text-cream sm:p-7">
        <div className="relative mx-auto aspect-[4/3] max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#183c31]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <linearGradient id="migration-route-gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#cda75f" stopOpacity=".45" />
                <stop offset="50%" stopColor="#f1d58a" />
                <stop offset="100%" stopColor="#cda75f" stopOpacity=".45" />
              </linearGradient>
            </defs>
            <motion.path
              d="M49 73 C29 67 19 54 20 41 C21 28 41 24 57 19 C66 15 75 13 82 14 C85 35 74 53 60 64 C56 68 52 71 49 73"
              fill="none"
              stroke="url(#migration-route-gradient)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="1.2 2.4"
              initial={reducedMotion ? false : { pathLength: 0.6, strokeDashoffset: 18 }}
              animate={reducedMotion ? undefined : { pathLength: 1, strokeDashoffset: 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <path d="M48 72l2 1-2 2" fill="none" stroke="#f1d58a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="50" y="94" fill="rgba(255,255,255,.72)" fontSize="3.1" textAnchor="middle">Illustrative migration route · not to scale</text>
          </svg>
          {regions.map((region, index) => {
            const active = selected.id === region.id;
            return (
              <button
                key={region.id}
                type="button"
                aria-label={`Select ${region.name}`}
                aria-pressed={active}
                onClick={() => setSelectedId(region.id)}
                className={`absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-bold shadow-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:size-12 ${active ? "border-gold bg-gold text-forest" : "border-white/60 bg-forest text-cream hover:border-gold hover:text-gold"}`}
                style={{ left: `${region.position.x}%`, top: `${region.position.y}%` }}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs leading-5 text-cream/75">Illustrative migration map, not to scale. Herd movements vary with rainfall.</p>
        <div role="group" aria-label="Choose a migration region" className="mt-5 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              aria-pressed={selected.id === region.id}
              onClick={() => setSelectedId(region.id)}
              className={`min-h-11 shrink-0 snap-start rounded-full px-4 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:text-sm ${selected.id === region.id ? "bg-gold text-forest" : "border border-white/25 text-cream hover:border-gold"}`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      <div id="migration-region-panel" aria-live="polite" aria-atomic="true" className="flex min-w-0 flex-col justify-center rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={selected.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <p className="text-eyebrow text-terracotta">{selected.approximateSeason}</p>
            <h3 className="mt-3 font-heading text-3xl leading-tight text-earth">{selected.name}</h3>
            <p className="mt-4 leading-7 text-muted">{selected.whatHappens}</p>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="font-bold text-earth">Wildlife experience</dt><dd className="mt-1 leading-6 text-muted">{selected.wildlifeExperience}</dd></div>
              <div><dt className="font-bold text-earth">For visitors</dt><dd className="mt-1 leading-6 text-muted">{selected.visitorExperience}</dd></div>
            </dl>
            <Link href={selected.href} className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              {selected.linkLabel}<ArrowRight aria-hidden="true" size={17} />
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
