"use client";

import { useState } from "react";
import Link from "next/link";
import type { AccommodationTier, SerengetiPackage } from "@/types/serengeti-package";

const tierNames: Record<AccommodationTier, string> = {
  camping: "Camping",
  "mid-range": "Mid-range",
  luxury: "Luxury",
};

function enquiryHref(item: SerengetiPackage, tier: AccommodationTier, travellers: number, month: string) {
  const params = new URLSearchParams({
    package: item.slug,
    accommodation: tierNames[tier],
    adults: String(travellers),
  });
  if (month) params.set("month", month);
  if (item.departureType.status === "specified") params.set("travelersType", "Group");
  return `/plan-your-safari?${params.toString()}`;
}

export default function SerengetiPackageEstimator({ item }: { item: SerengetiPackage }) {
  const [selectedTier, setSelectedTier] = useState<AccommodationTier>("mid-range");
  const [travellers, setTravellers] = useState(item.groupSize.minimum ?? 2);
  const [month, setMonth] = useState("");
  const tier = item.pricing.tiers.find((price) => price.tier === selectedTier);
  const groupPrice = item.pricing.midRangeGroupPrices.find((price) => price.travellers === travellers);
  const groupOutsideBounds = (item.groupSize.minimum !== undefined && travellers < item.groupSize.minimum)
    || (item.groupSize.maximum !== undefined && travellers > item.groupSize.maximum);
  const isGroupPackage = item.groupSize.minimum !== undefined || item.groupSize.maximum !== undefined;
  const quoteHref = enquiryHref(item, selectedTier, travellers, month);

  let estimateMessage = "Select a tier and group size to review the supplied proposed price.";
  if (groupOutsideBounds) {
    estimateMessage = `This group departure is proposed for ${item.groupSize.minimum} to ${item.groupSize.maximum} guests. Request a quote for a supported group size.`;
  } else if (tier?.availability === "unavailable") {
    estimateMessage = `${tierNames[selectedTier]} is not available for this package.`;
  } else if (tier?.availability === "on-request") {
    estimateMessage = "Camping is available on request. No camping amount was supplied; request a tailored quote.";
  } else if (isGroupPackage && tier?.amount !== null && tier?.amount !== undefined) {
    estimateMessage = `Proposed ${tierNames[selectedTier].toLowerCase()} listed price: $${tier.amount.toLocaleString("en-US")} USD${tier.twinShare ? " twin share" : ""}. Confirm the actual group departure and quote in writing.`;
  } else if (selectedTier === "mid-range" && groupPrice) {
    estimateMessage = `Proposed mid-range group-size amount for ${travellers} ${travellers === 1 ? "traveller" : "travellers"}: $${groupPrice.amount.toLocaleString("en-US")} USD.`;
  } else if (selectedTier === "mid-range") {
    estimateMessage = "No proposed mid-range amount was supplied for this group size. Request a tailored written quote.";
  } else if (tier?.amount !== null && tier?.amount !== undefined) {
    estimateMessage = `Proposed ${tierNames[selectedTier].toLowerCase()} listed price: $${tier.amount.toLocaleString("en-US")} USD. The final amount depends on group size, dates, and accommodation availability.`;
  }

  return (
    <div className="rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
      <p className="text-eyebrow text-terracotta">PROPOSED PRICING</p>
      <h3 className="mt-2 font-heading text-2xl text-earth">Explore a price option</h3>
      <p className="mt-2 text-sm leading-6 text-muted">This is an enquiry guide, not a booking or confirmed quote. Unsupported combinations are not calculated.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-earth">
          Accommodation tier
          <select value={selectedTier} onChange={(event) => setSelectedTier(event.target.value as AccommodationTier)} className="mt-2 min-h-11 w-full rounded-xl border border-earth/15 bg-white px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            {item.pricing.tiers.map((price) => <option key={price.tier} value={price.tier}>{tierNames[price.tier]}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-earth">
          Group size
          <select
            value={travellers}
            onChange={(event) => setTravellers(Number(event.target.value))}
            className="mt-2 min-h-11 w-full rounded-xl border border-earth/15 bg-white px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
          >
            {Array.from({ length: 8 }, (_, index) => index + 1)
              .filter((size) => !isGroupPackage || ((item.groupSize.minimum === undefined || size >= item.groupSize.minimum) && (item.groupSize.maximum === undefined || size <= item.groupSize.maximum)))
              .map((size) => {
                const hasPrice = item.pricing.midRangeGroupPrices.some((price) => price.travellers === size);
                return <option key={size} value={size}>{size} {size === 1 ? "traveller" : "travellers"}{selectedTier === "mid-range" && !isGroupPackage && !hasPrice ? " · quote required" : ""}</option>;
              })}
          </select>
        </label>
        <label className="block text-sm font-semibold text-earth sm:col-span-2">
          Preferred travel month (optional)
          <select value={month} onChange={(event) => setMonth(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-earth/15 bg-white px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            <option value="">Not selected</option>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((name) => <option key={name}>{name}</option>)}
          </select>
        </label>
      </div>
      <p aria-live="polite" className="mt-5 rounded-2xl bg-sand p-4 text-sm leading-6 text-earth">
        {estimateMessage}
      </p>
      {item.pricing.singleSupplement ? <p className="mt-3 text-sm text-muted">Single supplement: {item.pricing.singleSupplement.prefix} ${item.pricing.singleSupplement.amount.toLocaleString("en-US")} USD. This is separate from the twin-share price.</p> : null}
      <p className="mt-3 text-xs leading-5 text-muted">{item.pricing.unitConfirmation}</p>
      <Link href={quoteHref} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
        Request a written quote
      </Link>
      <p className="mt-4 text-sm font-semibold text-earth">Prices are indicative and confirmed in your written quote.</p>
    </div>
  );
}
