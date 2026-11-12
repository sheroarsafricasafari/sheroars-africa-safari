"use client";

import { useState } from "react";
import type { SerengetiPackage } from "@/types/serengeti-package";

const tierLabels = { "mid-range": "Mid-range", luxury: "Luxury", camping: "Camping" } as const;

export default function NgorongoroAccommodationTabs({ item }: { item: SerengetiPackage }) {
  const tiers = item.staysByTier ?? [];
  const [selectedTier, setSelectedTier] = useState(tiers[0]?.tier ?? "mid-range");
  const selected = tiers.find(({ tier }) => tier === selectedTier) ?? tiers[0];

  if (!selected) return null;

  return (
    <div>
      <div role="tablist" aria-label="Accommodation tier" className="flex flex-wrap gap-2">
        {tiers.map(({ tier }) => (
          <button
            key={tier}
            id={`stay-tab-${tier}`}
            type="button"
            role="tab"
            aria-selected={tier === selected.tier}
            aria-controls="stay-panel"
            onClick={() => setSelectedTier(tier)}
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${tier === selected.tier ? "border-terracotta bg-terracotta text-white" : "border-earth/20 bg-white text-earth"}`}
          >
            {tierLabels[tier]}
          </button>
        ))}
      </div>
      <div id="stay-panel" role="tabpanel" aria-labelledby={`stay-tab-${selected.tier}`} className="mt-5 rounded-3xl border border-sand bg-white p-5 sm:p-7">
        {selected.note ? <p className="mb-5 text-sm leading-6 text-muted">{selected.note}</p> : null}
        <ol className="grid gap-4 md:grid-cols-2">
          {selected.segments.map((segment, index) => (
            <li key={`${segment.location}-${index}`} className="rounded-2xl bg-sand p-5">
              <p className="text-eyebrow text-terracotta">STOP {index + 1}{segment.nights ? ` · ${segment.nights} ${segment.nights === 1 ? "NIGHT" : "NIGHTS"}` : ""}</p>
              <h3 className="mt-2 font-heading text-xl text-earth">{segment.location}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {segment.properties.map((property) => <li key={property}>{property}</li>)}
              </ul>
            </li>
          ))}
        </ol>
        {selected.upgrades?.length ? (
          <div className="mt-5">
            <h3 className="font-semibold text-earth">Upgrade options</h3>
            <ul className="mt-2 flex flex-wrap gap-2">{selected.upgrades.map((upgrade) => <li key={upgrade} className="rounded-full border border-earth/10 px-3 py-2 text-sm text-earth">{upgrade}</li>)}</ul>
          </div>
        ) : null}
        <p className="mt-5 text-xs leading-5 text-muted">Examples are subject to availability. Your written quote confirms the exact accommodation and room configuration.</p>
      </div>
    </div>
  );
}
