"use client";

import { useState } from "react";
import {
  Bath,
  Car,
  HeartPulse,
  Hotel,
  MoveHorizontal,
  Tent,
  UtensilsCrossed,
  Users,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { TIER_COPY, TIER_ROWS, type RouteSlug } from "@/data/kilimanjaro-packages";

const AREA_ICONS: Record<string, LucideIcon> = {
  Users,
  Tent,
  Bath,
  UtensilsCrossed,
  HeartPulse,
  Hotel,
  Car,
  UsersRound,
};

const EXTRA_SPEND = [
  { label: "Crew", value: 22 },
  { label: "Camp comfort", value: 24 },
  { label: "Food", value: 12 },
  { label: "Safety", value: 10 },
  { label: "Hotels", value: 24 },
  { label: "Extras", value: 8 },
];

export default function TierCompare({ route }: { route: RouteSlug }) {
  const [split, setSplit] = useState(50);
  const imageBase = `/images/kilimanjaro/routes/${route}`;
  const campImages = route === "machame"
    ? { midRange: "camp-midrange.webp", luxury: "camp-luxury.webp" }
    : { midRange: "camp-midrange.jpg", luxury: "camp-luxury.jpg" };

  return (
    <div className="space-y-12">
      <div className="hidden overflow-hidden rounded-3xl border border-sand bg-white shadow-card md:block">
        <div className="sticky top-[calc(var(--navbar-height,78px)+3.5rem)] z-10 grid grid-cols-[minmax(10rem,0.8fr)_1fr_1fr] border-b border-sand bg-white">
          <div className="p-5 font-semibold text-earth">What changes</div>
          <div className="p-5 text-center font-semibold text-earth">Mid-range</div>
          <div className="relative border-x-2 border-gold bg-gold/5 p-5 text-center font-semibold text-earth">
            Luxury
            <span className="absolute right-3 top-2 rounded-full bg-gold px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-earth">Most comfort</span>
          </div>
        </div>
        <StaggerGroup>
          {TIER_ROWS.map((row) => {
            const Icon = AREA_ICONS[row.icon];
            return (
              <StaggerItem key={row.area} className="grid grid-cols-[minmax(10rem,0.8fr)_1fr_1fr] border-b border-sand last:border-b-0">
                <div className="flex items-start gap-3 p-5 font-semibold text-earth">
                  <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-terracotta" />
                  {row.area}
                </div>
                <p className="p-5 text-sm leading-6 text-muted">{row.mid}</p>
                <p className="border-x-2 border-gold bg-gold/5 p-5 text-sm leading-6 text-muted">{row.lux}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>

      <div className="grid gap-4 md:hidden">
        {TIER_ROWS.map((row) => {
          const Icon = AREA_ICONS[row.icon];
          return (
            <article key={row.area} className="rounded-2xl border border-sand bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 font-semibold text-earth"><Icon aria-hidden="true" className="size-5 text-terracotta" />{row.area}</h3>
              <dl className="mt-4 space-y-4">
                <div><dt className="text-sm font-semibold text-earth">Mid-range</dt><dd className="mt-1 text-sm leading-6 text-muted">{row.mid}</dd></div>
                <div className="rounded-xl border border-gold/60 bg-gold/5 p-3"><dt className="text-sm font-semibold text-earth">Luxury</dt><dd className="mt-1 text-sm leading-6 text-muted">{row.lux}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {(["midRange", "luxury"] as const).map((tier) => (
          <article key={tier} className={`rounded-3xl border bg-white p-6 shadow-card ${tier === "luxury" ? "border-gold/70 bg-gradient-to-br from-gold/10 via-white to-white" : "border-sand"}`}>
            <p className="text-eyebrow text-terracotta">{TIER_COPY[tier].name}</p>
            <h3 className="mt-2 font-heading text-2xl text-earth">{TIER_COPY[tier].tagline}</h3>
            <p className="mt-5 text-sm font-semibold text-earth">This is for you if</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
              {TIER_COPY[tier].whoFor.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-terracotta">✓</span>{item}</li>)}
            </ul>
            {route === "umbwe" && tier === "luxury" ? <p className="mt-4 text-sm leading-6 text-muted">Luxury helps with recovery, but it does not fix a too-short acclimatisation window.</p> : null}
            <p className="mt-5 text-sm leading-6 text-muted"><span className="font-semibold text-earth">Maybe not if:</span> {TIER_COPY[tier].notFor}</p>
          </article>
        ))}
      </div>

      <section aria-labelledby="extra-spend-heading" className="rounded-3xl bg-forest p-6 text-cream sm:p-8">
        <h3 id="extra-spend-heading" className="font-heading text-2xl text-white">Where the extra money goes</h3>
        <p className="mt-2 text-sm text-cream/75">Illustrative split of the Luxury upgrade</p>
        <div className="mt-5 flex h-10 overflow-hidden rounded-full" aria-hidden="true">
          {EXTRA_SPEND.map((segment) => <div key={segment.label} title={`${segment.label}: ${segment.value}%`} className="flex items-center justify-center border-r border-white/30 bg-gold px-1 text-[10px] font-semibold text-earth last:border-0 sm:text-xs" style={{ width: `${segment.value}%` }}>{segment.value >= 10 ? segment.label : null}</div>)}
        </div>
        <table className="sr-only">
          <caption>Illustrative split of the Luxury upgrade</caption>
          <thead><tr><th>Area</th><th>Share</th></tr></thead>
          <tbody>{EXTRA_SPEND.map(({ label, value }) => <tr key={label}><td>{label}</td><td>{value}%</td></tr>)}</tbody>
        </table>
        <p className="mt-4 text-sm leading-6 text-cream/80">The route, the park fees and the summit are exactly the same. What you choose is how it feels.</p>
      </section>

      <section aria-labelledby="camp-comparison-heading" className="rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-eyebrow text-terracotta">Compare the camps</p>
            <h3 id="camp-comparison-heading" className="mt-2 font-heading text-2xl text-earth">Mid-range and Luxury camp</h3>
          </div>
          <label htmlFor={`camp-split-${route}`} className="text-sm font-semibold text-earth">Drag or use arrow keys to compare</label>
        </div>
        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl bg-sand">
          <SmartImage src={`${imageBase}/${campImages.midRange}`} alt="Mid-range camp on Mount Kilimanjaro" sizes="(max-width: 768px) 100vw, 80vw" fill className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
            <SmartImage src={`${imageBase}/${campImages.luxury}`} alt="Luxury camp on Mount Kilimanjaro" sizes="(max-width: 768px) 100vw, 80vw" fill className="object-cover" />
          </div>
          <div aria-hidden="true" className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${split}%` }}>
            <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-forest text-white shadow"><MoveHorizontal aria-hidden="true" className="size-5" /></span>
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-earth/80 px-3 py-1 text-xs font-semibold text-white">Mid-range camp</span>
          <span className="absolute bottom-3 right-3 rounded-full bg-earth/80 px-3 py-1 text-xs font-semibold text-white">Luxury camp</span>
          <input
            id={`camp-split-${route}`}
            type="range"
            min="10"
            max="90"
            value={split}
            onChange={(event) => setSplit(Number(event.target.value))}
            aria-label="Compare Mid-range and Luxury camp images"
            className="absolute inset-x-0 bottom-0 z-10 h-12 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100"
          />
        </div>
      </section>
    </div>
  );
}
