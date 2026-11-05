"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import SmartImage from "@/components/ui/SmartImage";
import type { MigrationMonth } from "@/data/destinations/great-migration";

export default function MigrationMonthExplorer({ months }: { months: MigrationMonth[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();
  const selected = months[selectedIndex];
  if (!selected) return null;

  const selectMonth = (index: number) => {
    setSelectedIndex(index);
    tabRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % months.length;
    else if (event.key === "ArrowLeft") next = (index + months.length - 1) % months.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = months.length - 1;
    else return;
    event.preventDefault();
    selectMonth(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Select a migration month" className="flex snap-x gap-1 overflow-x-auto rounded-2xl border border-sand bg-white p-2 [scrollbar-width:thin]">
        {months.map((item, index) => (
          <button
            key={item.month}
            ref={(node) => { tabRefs.current[index] = node; }}
            type="button"
            role="tab"
            id={`migration-month-tab-${index}`}
            aria-controls="migration-month-panel"
            aria-selected={selectedIndex === index}
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => selectMonth(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`relative min-h-11 shrink-0 snap-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selectedIndex === index ? "bg-forest text-cream" : "text-muted hover:bg-sand hover:text-earth"}`}
          >
            {item.month}
            {selectedIndex === index ? <motion.span layoutId="migration-month-indicator" className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gold" transition={reducedMotion ? { duration: 0 } : undefined} /> : null}
          </button>
        ))}
      </div>

      <div id="migration-month-panel" role="tabpanel" aria-labelledby={`migration-month-tab-${selectedIndex}`} aria-live="polite" aria-atomic="true" className="mt-6 min-h-[26rem] overflow-hidden rounded-3xl border border-sand bg-white shadow-card">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={selected.month}
            className="grid min-w-0 lg:grid-cols-[0.85fr_1.15fr]"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
          >
            <div className="relative min-h-64 bg-sand sm:min-h-80">
              <SmartImage src={selected.image} alt={selected.imageAlt} sizes="(max-width: 1024px) 100vw, 40vw" fill className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-forest/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur">{selected.confidence}</span>
            </div>
            <div className="min-w-0 p-6 sm:p-8 lg:p-10">
              <p className="text-eyebrow text-terracotta">{selected.stage}</p>
              <h3 className="mt-3 font-heading text-3xl text-earth sm:text-4xl">{selected.month}</h3>
              <p className="mt-5 text-sm font-semibold text-earth">General herd location</p>
              <p className="mt-1 text-lg text-forest">{selected.herdLocation}</p>
              <p className="mt-4 leading-7 text-muted">{selected.experience}</p>
              <p className="mt-4 text-sm leading-6 text-muted"><strong className="text-earth">Landscape and conditions: </strong>{selected.landscapeWeather}</p>
              <p className="mt-4 text-sm leading-6 text-muted"><strong className="text-earth">Wildlife: </strong>{selected.wildlife.join(", ")}</p>
              <Link href={selected.destinationHref} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                Explore {selected.destination}<ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">Monthly locations describe broad seasonal patterns, not guaranteed herd positions. Rainfall and ecological conditions can shift the migration.</p>
    </div>
  );
}
