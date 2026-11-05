"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import type { MigrationSeason } from "@/data/destinations/great-migration";

export default function MigrationExperienceSelector({ options }: { options: MigrationSeason[] }) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");
  const selected = options.find((option) => option.id === selectedId) ?? options[0];
  const reducedMotion = useReducedMotionPreference();
  if (!selected) return null;

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div role="group" aria-label="Choose your Great Migration experience" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected.id === option.id}
            onClick={() => setSelectedId(option.id)}
            className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-semibold leading-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selected.id === option.id ? "border-forest bg-forest text-cream" : "border-sand bg-white text-earth hover:border-gold"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="min-w-0 rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={selected.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <p className="text-eyebrow text-terracotta">A starting point, not a guarantee</p>
            <h3 className="mt-3 font-heading text-3xl text-earth">{selected.label}</h3>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="font-bold text-earth">General months</dt><dd className="mt-1 leading-6 text-muted">{selected.months}</dd></div>
              <div><dt className="font-bold text-earth">Suggested region</dt><dd className="mt-1 leading-6 text-muted">{selected.region}</dd></div>
            </dl>
            <p className="mt-5 leading-7 text-muted">{selected.reason}</p>
            <p className="mt-4 text-sm leading-6 text-muted">Rainfall and wildlife movement influence timing each year. These recommendations are approximate seasonal guidance, not a promise of location or sightings.</p>
            <Link href={selected.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              {selected.linkLabel}<ArrowRight aria-hidden="true" size={17} />
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
