"use client";

import { useState } from "react";
import type { SerengetiPackage } from "@/types/serengeti-package";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SerengetiPackageSeason({ item }: { item: SerengetiPackage }) {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const isBestMonth = item.bestMonths.includes(selectedMonth);
  const isGoodMonth = item.goodMonths?.includes(selectedMonth) ?? false;
  const isPublished = item.pricing.status === "published";
  return (
    <div className="rounded-3xl bg-forest p-5 text-cream sm:p-7">
      <p className="text-eyebrow text-gold">{isPublished ? "BEST TRAVEL MONTHS" : "PROPOSED TRAVEL WINDOW"}</p>
      <h3 className="mt-2 font-heading text-2xl text-white">{item.season}</h3>
      <p className="mt-3 text-sm leading-6 text-cream/80">{item.seasonNote}</p>
      <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {months.map((month, index) => {
          const listed = item.bestMonths.includes(index + 1);
          const good = item.goodMonths?.includes(index + 1) ?? false;
          const selected = selectedMonth === index + 1;
          return (
            <button
              key={month}
              type="button"
              aria-pressed={selected}
              aria-label={`${month}: ${listed ? "best month" : good ? "good month" : "not listed for this package"}`}
              onClick={() => setSelectedMonth(index + 1)}
              className={`min-h-11 rounded-xl border px-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${selected ? "border-gold bg-gold text-earth" : listed ? "border-gold/60 bg-white/10 text-white" : good ? "border-cream/60 bg-white/5 text-cream" : "border-white/15 bg-transparent text-cream/60"}`}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-cream/90">
        {months[selectedMonth - 1]} is {isBestMonth ? "one of the best months for this safari." : isGoodMonth ? "also a good month for this safari." : isPublished ? "not listed as a recommended month for this safari." : "not listed as an available month for this package."}
      </p>
      <p className="mt-2 text-xs text-cream/65">Month guidance is not a promise of specific wildlife locations or events.</p>
    </div>
  );
}
