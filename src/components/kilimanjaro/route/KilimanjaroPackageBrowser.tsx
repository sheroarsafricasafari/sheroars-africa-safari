"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import { ROUTES } from "@/data/kilimanjaro";
import { getPrice, PACKAGES, type RouteSlug, type TierKey } from "@/data/kilimanjaro-packages";

const routeOrder = new Map(ROUTES.map((route, index) => [route.slug, index]));
const sortedPackages = [...PACKAGES].sort((a, b) =>
  (routeOrder.get(a.route) ?? 0) - (routeOrder.get(b.route) ?? 0) || a.days - b.days,
);
const dayOptions = [...new Set(sortedPackages.map((pkg) => pkg.days))].sort((a, b) => a - b);
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function KilimanjaroPackageBrowser() {
  const [route, setRoute] = useState<RouteSlug | "all">("all");
  const [days, setDays] = useState<number | "all">("all");
  const [tier, setTier] = useState<TierKey>("midRange");

  const visiblePackages = useMemo(
    () => sortedPackages.filter((pkg) => (route === "all" || pkg.route === route) && (days === "all" || pkg.days === days)),
    [days, route],
  );

  return (
    <div>
      <Container>
        <div className="mb-8 grid gap-4 rounded-3xl border border-sand bg-white p-5 shadow-card sm:grid-cols-3 sm:p-6">
          <label className="grid gap-2 text-sm font-semibold text-earth">
            Route
            <select value={route} onChange={(event) => {
              const value = event.target.value;
              setRoute(value === "all" ? "all" : ROUTES.find((item) => item.slug === value)?.slug ?? "all");
            }} className="min-h-12 rounded-xl border border-sand bg-cream px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              <option value="all">All routes</option>
              {ROUTES.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-earth">
            Days on the mountain
            <select value={days} onChange={(event) => {
              const value = Number(event.target.value);
              const matchingDay = dayOptions.find((option) => option === value);
              setDays(event.target.value === "all" ? "all" : matchingDay ?? "all");
            }} className="min-h-12 rounded-xl border border-sand bg-cream px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              <option value="all">All durations</option>
              {dayOptions.map((count) => <option key={count} value={count}>{count} days</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-earth">
            Comfort
            <select value={tier} onChange={(event) => setTier(event.target.value === "luxury" ? "luxury" : "midRange")} className="min-h-12 rounded-xl border border-sand bg-cream px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              <option value="midRange">Mid-range</option>
              <option value="luxury">Luxury</option>
            </select>
          </label>
        </div>
        <p className="mb-5 text-sm leading-6 text-muted" role="status" aria-live="polite">
          Showing {visiblePackages.length} of {PACKAGES.length} climbs. Starting prices are based on six travellers in green season; your written quote confirms the price for your group and dates.
        </p>
        {visiblePackages.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePackages.map((pkg) => {
              const routeData = ROUTES.find((item) => item.slug === pkg.route);
              if (!routeData) throw new Error(`Missing route details for ${pkg.route}`);
              const price = getPrice(pkg, tier, "green", 6);
              const href = `/kilimanjaro/routes/${pkg.route}?days=${pkg.days}&tier=${tier === "luxury" ? "luxury" : "midrange"}#packages`;
              return (
                <article key={pkg.slug} className="group overflow-hidden rounded-3xl border border-sand bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                    <SmartImage src={`/images/kilimanjaro/route-${pkg.route}.jpg`} alt={`${routeData.name} route landscape on Mount Kilimanjaro`} sizes="(max-width: 1024px) 100vw, 33vw" fill className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
                    <span className="absolute left-3 top-3 rounded-full bg-earth/85 px-3 py-1 text-xs font-semibold text-white">{pkg.days} days</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">{routeData.name} | {tier === "luxury" ? "Luxury" : "Mid-range"}</p>
                    <h3 className="mt-2 font-heading text-2xl text-earth">{pkg.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{pkg.tagline}</p>
                    <p className="mt-4 border-t border-sand pt-4 text-sm font-semibold text-earth">From {currency.format(price)} per person</p>
                    <Link href={href} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">
                      Explore itinerary and price <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-sand bg-white p-6 text-center text-muted">No climbs match those filters. Choose a different route or duration.</p>
        )}
      </Container>
    </div>
  );
}
