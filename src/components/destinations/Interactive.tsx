"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Plane, Signpost } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import type { DestinationNavItem, DestinationPin, DayOptionData, RegionData, ZoneData } from "@/types/destination";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";

// Props: StickySectionNav takes section links and an optional CTA; RegionExplorer takes region shapes, pins and a note; HowManyDays takes duration options; ZoneExplorer takes landscape panels.
export function StickySectionNav({ items, cta }: { items: DestinationNavItem[]; cta?: { label: string; href: string } }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const tabsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] });
    items.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [items]);

  const selectItem = (index: number) => {
    const item = items[index];
    if (!item) return;
    setActive(item.id);
    tabsRef.current[index]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index + items.length - 1) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    selectItem(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <nav aria-label="On this page" className="sticky z-40 border-y border-sand bg-cream/95 shadow-sm backdrop-blur-md" style={{ top: "var(--navbar-height, 78px)" }}>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-8">
        <div className="flex min-w-0 flex-1 snap-x gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => (
            <a key={item.id} ref={(node) => { tabsRef.current[index] = node; }} href={`#${item.id}`} onClick={() => selectItem(index)} onKeyDown={(event) => onKeyDown(event, index)} aria-current={active === item.id ? "location" : undefined} className="relative flex min-h-11 shrink-0 snap-center items-center rounded-full px-3 text-xs font-semibold text-muted transition-colors hover:text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta sm:px-4 sm:text-sm">
              {item.label}
              {active === item.id ? <motion.span layoutId="destination-nav-underline" className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-terracotta" transition={reducedMotion ? { duration: 0 } : undefined} /> : null}
            </a>
          ))}
        </div>
        {cta ? <Button href={cta.href} size="sm" className="hidden shrink-0 md:inline-flex">{cta.label}</Button> : null}
      </div>
    </nav>
  );
}

export function RegionExplorer({ regions, pins, note }: { regions: RegionData[]; pins: DestinationPin[]; note: string }) {
  const [selectedId, setSelectedId] = useState(regions[0]?.id ?? "");
  const [showGates, setShowGates] = useState(false);
  const [showAirstrips, setShowAirstrips] = useState(false);
  const regionRefs = useRef<Array<SVGPathElement | null>>([]);
  const region = regions.find((item) => item.id === selectedId) ?? regions[0];
  if (!region) return null;

  const moveRegion = (event: KeyboardEvent<SVGPathElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % regions.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + regions.length - 1) % regions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = regions.length - 1;
    else return;
    event.preventDefault();
    setSelectedId(regions[next].id);
    regionRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-3xl bg-forest p-4 text-cream sm:p-7">
        <div className="mb-4 flex flex-wrap gap-2">
          <button type="button" aria-pressed={showGates} onClick={() => setShowGates(!showGates)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"><Signpost size={15} />Show gates</button>
          <button type="button" aria-pressed={showAirstrips} onClick={() => setShowAirstrips(!showAirstrips)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"><Plane size={15} />Show airstrips</button>
        </div>
        <div className="relative">
          <svg viewBox="0 0 560 390" role="radiogroup" aria-label="Select a Serengeti region" className="w-full">
            <title>Illustrative Serengeti region map</title>
            <desc>Abstract schematic regions. This map is not to scale.</desc>
            {regions.map((item, index) => (
              <path key={item.id} ref={(node) => { regionRefs.current[index] = node; }} d={item.path} role="radio" aria-checked={selectedId === item.id} tabIndex={selectedId === item.id ? 0 : -1} aria-label={item.name} onClick={() => setSelectedId(item.id)} onMouseEnter={() => setSelectedId(item.id)} onFocus={() => setSelectedId(item.id)} onKeyDown={(event) => moveRegion(event, index)} className={`cursor-pointer stroke-white/50 transition-colors duration-300 focus-visible:outline-none ${selectedId === item.id ? "fill-gold [filter:drop-shadow(0_0_10px_rgba(205,167,95,.65))]" : "fill-white/15 hover:fill-gold/60"}`} strokeWidth="2" />
            ))}
            {pins.map((pin) => {
              const visible = pin.kind === "gate" ? showGates : showAirstrips;
              return visible ? <g key={`${pin.kind}-${pin.label}`} className="transition-opacity duration-300">
                <circle cx={pin.x * 5.6} cy={pin.y * 3.9} r="5" fill="#cda75f" stroke="#fff" strokeWidth="2" />
                <title>{pin.label}</title>
              </g> : null;
            })}
            <text x="15" y="376" fill="rgba(255,255,255,.72)" fontSize="13">Illustrative map, not to scale</text>
            <text x={region.labelPosition.x * 5.6} y={region.labelPosition.y * 3.9 - 18} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600">{region.shortName}</text>
          </svg>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 xl:hidden">
          {regions.map((item) => <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id} className={`min-h-11 shrink-0 rounded-full px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${selectedId === item.id ? "bg-gold text-forest" : "border border-white/20 text-cream"}`}>{item.shortName}</button>)}
        </div>
      </div>
      <div aria-live="polite" className="rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
        <p className="text-eyebrow text-terracotta">{region.name}</p>
        <h3 className="mt-3 font-heading text-3xl text-earth">{region.character}</h3>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          {([["Best for", region.bestFor], ["Best months", region.bestMonths], ["Wildlife", region.wildlife], ["Feel", region.feel]] as const).map(([label, value]) => <div key={label}><dt className="font-bold text-earth">{label}</dt><dd className="mt-1 leading-6 text-muted">{value}</dd></div>)}
        </dl>
        <div className="mt-6 flex items-center gap-2" role="meter" aria-label="Typical crowd level" aria-valuemin={1} aria-valuemax={5} aria-valuenow={region.crowd}>
          <span className="mr-2 text-sm font-semibold text-earth">Crowds</span>{Array.from({ length: 5 }, (_, i) => <span key={i} aria-hidden="true" className={`size-2.5 rounded-full ${i < region.crowd ? "bg-terracotta" : "bg-sand"}`} />)}
        </div>
        <div className="mt-7 flex flex-wrap gap-3"><Button href={region.href}>Explore {region.shortName}</Button><Button href="/safaris/packages" variant="secondary">See Journeys</Button></div>
      </div>
      <p className="text-sm leading-6 text-muted xl:col-span-2">{note}</p>
    </div>
  );
}

export function HowManyDays({ options }: { options: DayOptionData[] }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotionPreference();
  const selectedOption = options[selected];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft") next = (index + options.length - 1) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };
  if (!selectedOption) return null;
  return (
    <div>
      <div role="tablist" aria-label="Choose safari duration" className="flex flex-wrap gap-2">
        {options.map((option, index) => <button key={option.label} ref={(node) => { tabRefs.current[index] = node; }} role="tab" id={`days-tab-${index}`} aria-controls="days-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKeyDown(event, index)} className={`min-h-11 rounded-full px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selected === index ? "bg-forest text-cream" : "bg-white text-earth"}`}>{option.label}</button>)}
      </div>
      <div id="days-panel" role="tabpanel" aria-labelledby={`days-tab-${selected}`} className="mt-6 min-h-64 overflow-hidden rounded-3xl bg-white p-6 shadow-card sm:p-9">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
            <h3 className="font-heading text-3xl text-earth">{selectedOption.headline}</h3>
            <p className="mt-4 leading-7 text-muted"><strong className="text-earth">Who it suits: </strong>{selectedOption.suits}</p>
            <p className="mt-2 leading-7 text-muted"><strong className="text-earth">What you will see: </strong>{selectedOption.experience}</p>
            <Link href={selectedOption.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Explore options<ArrowRight size={17} /></Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ZoneExplorer({ zones }: { zones: ZoneData[] }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotionPreference();
  const zone = zones[selected];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % zones.length;
    else if (event.key === "ArrowLeft") next = (index + zones.length - 1) % zones.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = zones.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };
  if (!zone) return null;
  return (
    <div>
      <div role="tablist" aria-label="Seronera landscapes" className="flex gap-2 overflow-x-auto pb-3">
        {zones.map((item, index) => <button key={item.title} ref={(node) => { tabRefs.current[index] = node; }} role="tab" id={`zone-tab-${index}`} aria-selected={selected === index} aria-controls="zone-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKeyDown(event, index)} className="relative min-h-12 shrink-0 px-4 text-sm font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{item.title}<span className={`absolute inset-x-3 bottom-0 h-0.5 ${selected === index ? "bg-terracotta" : "bg-transparent"}`} /></button>)}
      </div>
      <div id="zone-panel" role="tabpanel" aria-labelledby={`zone-tab-${selected}`} className="mt-5 grid overflow-hidden rounded-3xl bg-white shadow-card lg:grid-cols-2">
        <div className="relative min-h-64 bg-sand sm:min-h-96"><SmartImage src={zone.image} alt={zone.title} sizes="(max-width: 1024px) 100vw, 50vw" fill className="object-cover" /></div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="p-6 sm:p-9">
            <h3 className="font-heading text-3xl text-earth">{zone.title}</h3><p className="mt-3 leading-7 text-muted">{zone.description}</p>
            <ul className="mt-5 grid gap-2 text-sm text-earth">{zone.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="text-terracotta">•</span>{bullet}</li>)}</ul>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-terracotta">Look for</p><div className="mt-2 flex flex-wrap gap-2">{zone.lookFor.map((item) => <span key={item} className="rounded-full bg-sand px-3 py-1.5 text-xs text-earth">{item}</span>)}</div>
            <p className="mt-5 text-sm text-muted"><strong className="text-earth">Best time of day: </strong>{zone.bestTime}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DestinationScrollCue() {
  return <a href="#overview" aria-label="Scroll to explore" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Scroll to explore<ArrowDown size={16} /></a>;
}
