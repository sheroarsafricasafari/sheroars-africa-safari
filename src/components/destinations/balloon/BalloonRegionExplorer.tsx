"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import SmartImage from "@/components/ui/SmartImage";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import { balloonRegions, balloonSeasons } from "@/data/destinations/serengeti-hot-air-balloon";

type BalloonRegion = (typeof balloonRegions)[number];

export default function BalloonRegionExplorer() {
  const [selectedId, setSelectedId] = useState<BalloonRegion["id"]>("central");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();
  const selectedIndex = balloonRegions.findIndex((region) => region.id === selectedId);
  const region = balloonRegions[selectedIndex] ?? balloonRegions[0];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % balloonRegions.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + balloonRegions.length - 1) % balloonRegions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = balloonRegions.length - 1;
    else return;
    event.preventDefault();
    const target = balloonRegions[next];
    if (!target) return;
    setSelectedId(target.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-7">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0 rounded-3xl bg-forest p-5 text-cream sm:p-7">
          <svg viewBox="0 0 420 300" role="img" aria-labelledby="balloon-map-title balloon-map-desc" className="h-auto w-full">
            <title id="balloon-map-title">Illustrative Serengeti balloon launch regions</title>
            <desc id="balloon-map-desc">An abstract not-to-scale illustration of four possible regional launch areas.</desc>
            <path d="M45 45 145 30 175 75 151 113 57 115 30 78Z" fill={region.id === "north" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.7)" strokeWidth="2" />
            <path d="m151 113 24-38 103 8 45 50-39 49-93 8-40-39Z" fill={region.id === "central" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.7)" strokeWidth="2" />
            <path d="m151 113 40 39-30 70-76 25-35-61 7-71Z" fill={region.id === "west" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.7)" strokeWidth="2" />
            <path d="m132 229 29-77 30 39 93-8-18 68-87 28-68-10Z" fill={region.id === "south" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.7)" strokeWidth="2" />
            <text x="98" y="82" textAnchor="middle" fill="white" fontSize="12">Northern</text>
            <text x="230" y="144" textAnchor="middle" fill="white" fontSize="12">Central</text>
            <text x="112" y="187" textAnchor="middle" fill="white" fontSize="12">Western</text>
            <text x="210" y="238" textAnchor="middle" fill="white" fontSize="12">Southern</text>
            <text x="210" y="292" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="11">Illustrative regional launch map, not to scale</text>
          </svg>
          <div role="tablist" aria-label="Choose a balloon launch region" className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {balloonRegions.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`balloon-region-tab-${item.id}`}
                type="button"
                role="tab"
                aria-controls="balloon-region-panel"
                aria-selected={selectedId === item.id}
                tabIndex={selectedId === item.id ? 0 : -1}
                onClick={() => setSelectedId(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${selectedId === item.id ? "bg-gold text-forest" : "border border-white/25 text-cream hover:bg-white/10"}`}
              >
                {item.shortName}
              </button>
            ))}
          </div>
        </div>
        <div id="balloon-region-panel" role="tabpanel" aria-labelledby={`balloon-region-tab-${region.id}`} aria-live="polite" className="grid min-w-0 overflow-hidden rounded-3xl border border-sand bg-white shadow-card sm:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-56 bg-sand sm:min-h-full">
            <SmartImage src={region.image} alt={`${region.name} landscape`} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 30vw" fill className="object-cover" />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={region.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="min-w-0 p-5 sm:p-7">
              <p className="text-eyebrow text-terracotta">REGIONAL LAUNCH GUIDE</p>
              <h3 className="mt-2 font-heading text-2xl text-earth sm:text-3xl">{region.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{region.description}</p>
              <p className="mt-4 rounded-xl bg-sand/60 p-4 text-sm leading-6 text-earth">{region.season}</p>
              <Link href={region.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Explore this region <ArrowRight aria-hidden="true" size={16} /></Link>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

export function BalloonSeasonChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div>
      <h3 className="font-heading text-2xl text-earth sm:text-3xl">Approximate seasonal availability</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">These broad windows summarize commonly published seasonal offers, not a guaranteed schedule. Confirm launch operations with the selected supplier for your dates.</p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-sand bg-white shadow-sm">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <caption className="sr-only">Approximate balloon flight windows by Serengeti region and month</caption>
          <thead className="bg-forest text-left text-cream"><tr><th scope="col" className="sticky left-0 z-10 min-w-56 bg-forest px-4 py-3">Region</th>{months.map((month) => <th scope="col" key={month} className="min-w-10 px-2 py-3 text-center">{month}</th>)}</tr></thead>
          <tbody>{balloonSeasons.map((row, rowIndex) => <tr key={row.region} className={rowIndex % 2 ? "bg-white" : "bg-sand/50"}>
            <th scope="row" className={`sticky left-0 z-10 px-4 py-3 text-left font-semibold text-earth ${rowIndex % 2 ? "bg-white" : "bg-sand"}`}><Link href={row.href} className="underline decoration-terracotta/40 underline-offset-4 hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{row.region}</Link></th>
            {months.map((month) => {
              const active = row.months.some((availableMonth) => availableMonth === month);
              return <td key={`${row.region}-${month}`} className="px-2 py-3 text-center"><span role="img" aria-label={active ? "Commonly offered season, confirm with operator" : "Not shown as a common season"} className={`mx-auto block size-5 rounded-full ${active ? "bg-gold" : "bg-sand"}`} /></td>;
            })}
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted"><span aria-hidden="true" className="size-3 rounded-full bg-gold" />Commonly advertised window, operator confirmation required</p>
    </div>
  );
}
