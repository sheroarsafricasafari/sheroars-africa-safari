"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getPackagePrice, getPackageSeason, parsePackageGroupSize, parsePackageMonth } from "@/data/tarangire-packages";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import { packageMonths, packageSeasons, packageTiers, type PackageGroupSize, type PackageMonth, type PackagePricing, type PackageSeason, type PackageTier } from "@/types/tarangire-package";

type PricingPackage = { slug: string; name: string; pricing: PackagePricing };

const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

const seasonLabels: Record<PackageSeason, string> = {
  low: "Low season",
  high: "High season",
  peak: "Peak season",
};

const groups = [
  { value: 1, label: "Solo" },
  { value: 2, label: "2 travellers" },
  { value: 4, label: "4 travellers" },
  { value: 6, label: "6 travellers" },
] as const;

export default function PackagePriceCalculator({
  item,
  finalRates = false,
  seasonByMonth,
}: {
  item: PricingPackage;
  finalRates?: boolean;
  seasonByMonth?: Partial<Record<PackageMonth, PackageSeason>>;
}) {
  const [tier, setTier] = useState<PackageTier>("comfort");
  const [month, setMonth] = useState<PackageMonth>(7);
  const [group, setGroup] = useState<PackageGroupSize | "7plus">(2);
  const reducedMotion = useReducedMotionPreference();
  const season = seasonByMonth?.[month] ?? getPackageSeason(month);
  const price = group === "7plus" ? null : getPackagePrice(item, tier, season, group);
  const monthLabel = packageMonths.find((entry) => entry.value === month)?.label ?? "July";
  const query = new URLSearchParams({
    package: item.slug,
    tier: item.pricing.standard ? "standard" : tier,
    month: monthLabel,
    groupSize: String(group === "7plus" ? 7 : group),
    travelers: String(group === "7plus" ? 7 : group),
    adults: String(group === "7plus" ? 7 : group),
  }).toString();
  const quoteHref = `/book?${query}`;
  const whatsappHref = siteConfig.whatsappUrlWithMessage(
    `Hello, I am interested in the ${item.name}. ${item.pricing.tiers ? `${tier} tier, ` : ""}${monthLabel}, ${group === "7plus" ? "7 or more" : group} travellers. Please confirm availability and the current price.`,
  );

  return (
    <div className="rounded-3xl border border-earth/10 bg-white p-5 shadow-card sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          {item.pricing.tiers ? (
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-earth">Accommodation style</legend>
              <div className="inline-flex rounded-full border border-earth/15 bg-cream p-1">
                {packageTiers.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={tier === option}
                    onClick={() => setTier(option)}
                    className={`min-h-11 rounded-full px-5 text-sm font-semibold capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${
                      tier === option ? "bg-forest text-white" : "text-earth hover:text-terracotta"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}
          <label className="grid gap-2 text-sm font-semibold text-earth">
            Travel month
            <select
              value={month}
              onChange={(event) => {
                const nextMonth = parsePackageMonth(event.target.value);
                if (nextMonth !== undefined) setMonth(nextMonth);
              }}
              className="min-h-12 rounded-xl border border-earth/15 bg-white px-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
            >
              {packageMonths.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-earth">
            Travellers
            <select
              value={group}
              onChange={(event) => {
                if (event.target.value === "7plus") {
                  setGroup("7plus");
                  return;
                }
                const nextGroup = parsePackageGroupSize(event.target.value);
                if (nextGroup !== undefined) setGroup(nextGroup);
              }}
              className="min-h-12 rounded-xl border border-earth/15 bg-white px-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
            >
              {groups.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              <option value="7plus">7 or more, ask us</option>
            </select>
          </label>
          <p className="text-sm leading-6 text-muted">Month selection gives an estimate. Exact dates determine the final season and confirmed quote.</p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-forest p-5 text-cream sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{seasonLabels[season]} · {monthLabel}</p>
          {group !== "7plus" && price !== null ? (
            <>
              <p className="mt-4 text-sm text-cream/75">{finalRates ? "Price per person sharing" : "Estimated price per person"}</p>
              <motion.p key={`price-${price}`} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="mt-1 font-heading text-5xl text-white" aria-live="polite">{currency(price)}</motion.p>
              <motion.p key={`total-${price}-${group}`} initial={reducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="mt-2 text-sm text-cream/75" aria-live="polite">{finalRates ? "Party total" : "Estimated party total"}: {currency(price * group)}</motion.p>
            </>
          ) : (
            <>
              <p className="mt-4 font-heading text-3xl text-white">Travelling with 7 or more?</p>
              <p className="mt-2 text-sm leading-6 text-cream/75">Ask us for a group quote and vehicle plan.</p>
            </>
          )}
          <p className="mt-4 text-xs leading-5 text-cream/75">Includes the private 4x4, guide, listed park fees, and accommodation and meals shown in the itinerary.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href={quoteHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-4 text-sm font-bold text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
              Request this price <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-4 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
              Send on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-earth/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">{finalRates ? "Price per person sharing" : "Estimated per-person prices"} by season and group size</caption>
          <thead className="bg-sand text-earth">
            <tr>
              <th scope="col" className="px-4 py-3">Season</th>
              {groups.map((option) => <th key={option.value} scope="col" className="px-4 py-3">{option.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {packageSeasons.map((seasonName) => (
              <tr key={seasonName} className="border-t border-earth/10">
                <th scope="row" className="px-4 py-3 font-semibold text-earth">{seasonLabels[seasonName]}</th>
                {groups.map((option) => (
                  <td key={option.value} className="px-4 py-3 text-muted">
                    {currency(getPackagePrice(item, tier, seasonName, option.value))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">
        {finalRates
          ? "Price per person sharing. Your written quote confirms the final amount. Solo prices include the single supplement."
          : "Estimated price per person sharing, confirmed in your written quote. Rates for 2026 to 2027 may change with park fee updates. Solo prices include the single supplement."}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted">{finalRates ? "Month-only season selection is indicative near rate changes. Your quote confirms the rate for your exact dates." : "Month-to-season mapping is indicative when a month crosses a rate boundary."}</p>
    </div>
  );
}
