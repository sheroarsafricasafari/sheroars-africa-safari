"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import DrawPath from "@/components/motion/DrawPath";
import { ExperienceCards } from "@/components/destinations/Editorial";
import TiltCard from "@/components/motion/TiltCard";
import PackageCard from "@/components/inner/PackageCard";
import SmartImage from "@/components/ui/SmartImage";
import TarangirePackageItinerary from "@/components/tarangire/packages/TarangirePackageItinerary";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import type { LakeManyaraPackage } from "@/data/lake-manyara-packages";
import type { LakeManyaraActivity } from "@/data/lake-manyara";
import type { ZoneData } from "@/types/destination";

const zonePoints = [
  { x: 120, y: 112 },
  { x: 330, y: 226 },
  { x: 183, y: 300 },
  { x: 303, y: 145 },
  { x: 440, y: 90 },
];

export function LakeManyaraLandscapeExplorer({ zones }: { zones: ZoneData[] }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotionPreference();
  const zone = zones[selected];

  const selectByKey = (event: KeyboardEvent<SVGGElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % zones.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + zones.length - 1) % zones.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = zones.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`manyara-zone-hotspot-${next}`)?.focus();
  };

  if (!zone) return null;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="min-w-0 rounded-3xl bg-forest p-4 text-cream sm:p-7">
        <p className="mb-4 text-sm text-cream/75">Choose a habitat on the illustrative map or use the tabs below.</p>
        <div className="relative aspect-[7/5] overflow-hidden rounded-2xl border border-white/10 bg-[#183c31]">
          <svg viewBox="0 0 560 390" role="radiogroup" aria-label="Select a Lake Manyara habitat" className="absolute inset-0 size-full">
            <title>Illustrative Lake Manyara habitat map</title>
            <desc>A stylised, not-to-scale map showing five habitat zones and a game-drive loop.</desc>
            <path d="M22 18h516v354H22z" fill="#183c31" />
            <path d="M30 50C82 28 142 44 175 91c26 37 28 91 2 133-30 47-91 70-147 47z" fill="#527b51" opacity=".8" />
            <path d="M260 42c55-14 123 0 166 32 41 31 63 77 57 121-4 36-22 70-48 103-45-21-85-43-116-77-39-43-62-98-59-179z" fill="#cda75f" opacity=".15" />
            <ellipse cx="367" cy="215" rx="74" ry="126" fill="#6ba6a2" opacity=".75" />
            <path d="M31 286c74-18 126-8 177 18 42 21 80 36 131 26 47-9 85-27 192-6v45H31z" fill="#b28b49" opacity=".4" />
            <path d="M490 28c-27 41-34 75-31 114 4 49 23 85 48 124" fill="none" stroke="#d7c6a4" strokeWidth="12" opacity=".4" />
            <path d="M55 80c52-25 106-11 138 23 32 35 48 77 67 105 27 41 69 60 118 48 42-11 66-43 92-72 24-27 45-36 66-30" fill="none" stroke="#d8b76e" strokeWidth="2" strokeDasharray="7 7" opacity=".55" />
            <text x="54" y="58" fill="#fff" fontSize="13">Groundwater forest</text>
            <text x="312" y="215" fill="#fff" fontSize="13">Soda lake</text>
            <text x="405" y="360" fill="#fff" fontSize="12">Floodplain</text>
            <text x="25" y="374" fill="rgba(255,255,255,.72)" fontSize="12">Illustrative, not to scale</text>
            {zones.map((item, index) => {
              const point = zonePoints[index];
              if (!point) return null;
              const active = selected === index;
              return (
                <g
                  key={item.title}
                  id={`manyara-zone-hotspot-${index}`}
                  role="radio"
                  aria-checked={active}
                  aria-label={item.title}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onFocus={() => setSelected(index)}
                  onKeyDown={(event) => selectByKey(event, index)}
                  className="cursor-pointer outline-none"
                >
                  <circle cx={point.x} cy={point.y} r={active ? 17 : 13} fill={active ? "#cda75f" : "#f7f2e8"} stroke="#183c31" strokeWidth="4" />
                  <text x={point.x} y={point.y + 5} textAnchor="middle" fill="#183c31" fontSize="14" fontWeight="700">{index + 1}</text>
                  {active ? <circle cx={point.x} cy={point.y} r="23" fill="none" stroke="#fff" strokeWidth="2" /> : null}
                </g>
              );
            })}
          </svg>
          <DrawPath d="M70 25 C175 105 260 40 395 72 S765 26 915 76" className="pointer-events-none absolute inset-0 size-full text-gold/70" />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-earth/75 px-3 py-1.5 text-xs font-semibold text-cream"><MapPin aria-hidden="true" size={13} /> Main game-drive loop</span>
        </div>
        <div role="tablist" aria-label="Lake Manyara habitat zones" className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {zones.map((item, index) => (
            <button key={item.title} type="button" id={`manyara-zone-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="manyara-zone-panel" onClick={() => setSelected(index)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${selected === index ? "bg-gold text-forest" : "border border-white/25 text-cream"}`}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div id="manyara-zone-panel" role="tabpanel" aria-labelledby={`manyara-zone-tab-${selected}`} aria-live="polite" className="min-w-0 overflow-hidden rounded-3xl border border-sand bg-white shadow-card">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={selected} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
            <div className="relative aspect-[16/9] bg-sand">
              <SmartImage src={zone.image} alt={`${zone.title} habitat in Lake Manyara National Park`} sizes="(max-width: 1280px) 100vw, 45vw" fill className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-heading text-3xl text-earth">{zone.title}</h3>
              <p className="mt-3 leading-7 text-muted">{zone.description}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-terracotta">Look out for</p>
              <div className="mt-2 flex flex-wrap gap-2">{zone.lookFor.map((item) => <span key={item} className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-earth">{item}</span>)}</div>
              <p className="mt-5 text-sm text-muted"><strong className="text-earth">Best time: </strong>{zone.bestTime}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function LakeManyaraActivityChooser({
  activities,
  styles,
}: {
  activities: LakeManyaraActivity[];
  styles: { label: string; packageSlug: string; packageName: string; description: string; activities: string[] }[];
}) {
  const [selected, setSelected] = useState(styles[0]?.label ?? "Wildlife");
  const style = styles.find((item) => item.label === selected) ?? styles[0];
  if (!style) return null;
  return (
    <div>
      <fieldset>
        <legend className="sr-only">Choose your Lake Manyara travel style</legend>
        <div className="flex flex-wrap gap-2">
          {styles.map((item) => <button key={item.label} type="button" aria-pressed={selected === item.label} onClick={() => setSelected(item.label)} className={`min-h-11 rounded-full border px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selected === item.label ? "border-forest bg-forest text-white" : "border-earth/15 bg-white text-earth hover:border-terracotta"}`}>{item.label}</button>)}
        </div>
      </fieldset>
      <div className="mt-5 rounded-2xl border border-gold/40 bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div><p className="text-xs font-bold uppercase tracking-wider text-terracotta">Your best fit</p><p className="mt-2 font-heading text-xl text-earth">{style.packageName}</p><p className="mt-1 text-sm leading-6 text-muted">{style.description}</p></div>
        <Link href={`/safaris/packages/${style.packageSlug}`} className="mt-4 inline-flex min-h-11 shrink-0 items-center rounded-full bg-terracotta px-5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta sm:mt-0">View best-fit package</Link>
      </div>
      <div className="mt-7"><ExperienceCards items={activities} highlightedTitles={style.activities} /></div>
    </div>
  );
}

export function LakeManyaraPackageCarousel({ packages }: { packages: LakeManyaraPackage[] }) {
  const [viewportRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reducedMotion = useReducedMotionPreference();

  const updateIndex = useCallback(() => setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateIndex);
    emblaApi.on("reInit", updateIndex);
    return () => {
      emblaApi.off("select", updateIndex);
      emblaApi.off("reInit", updateIndex);
    };
  }, [emblaApi, updateIndex]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">Swipe to compare the three Lake Manyara journeys.</p>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous Lake Manyara package" onClick={() => emblaApi?.scrollPrev()} className="flex size-11 items-center justify-center rounded-full border border-earth/15 bg-white text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><ArrowLeft aria-hidden="true" size={18} /></button>
          <button type="button" aria-label="Next Lake Manyara package" onClick={() => emblaApi?.scrollNext()} className="flex size-11 items-center justify-center rounded-full border border-earth/15 bg-white text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><ArrowRight aria-hidden="true" size={18} /></button>
        </div>
      </div>
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div className="-ml-4 flex" layout={!reducedMotion}>
          {packages.map((item, index) => (
            <motion.article key={item.slug} className="min-w-0 flex-[0_0_90%] pl-4 sm:flex-[0_0_72%] xl:flex-[0_0_50%]" initial={reducedMotion ? false : { opacity: 0, y: 10 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.3 }}>
              <TiltCard className="h-full">
                <PackageCard
                  slug={item.slug}
                  title={item.title}
                  days={item.days}
                  parks={item.parks}
                  summary={item.summary}
                  priceFrom={item.pricing.priceFrom}
                  image={{ src: item.cardImage, alt: item.cardAlt }}
                  badge={item.badge}
                  className="h-full"
                />
              </TiltCard>
              <div className="mt-5 rounded-3xl border border-sand bg-white p-4 sm:p-6">
                <h3 className="mb-4 font-heading text-2xl text-earth">Day-by-day itinerary</h3>
                <TarangirePackageItinerary
                  item={item}
                  initialOpenDays={index === 0 ? [1] : []}
                  idPrefix={item.slug}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <p className="mt-4 text-center text-xs text-muted" aria-live="polite">Package {selectedIndex + 1} of {packages.length}</p>
    </div>
  );
}
