"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllPackages } from "@/data";
import { PACKAGES as kilimanjaroPackages, type RouteSlug } from "@/data/kilimanjaro-packages";
import type { FormType } from "@/lib/forms/submitInquiry";
import InquiryForm from "./InquiryForm";
import type { InquiryFormValues } from "@/types/inquiry";

const packages = [
  ...getAllPackages(),
  ...kilimanjaroPackages.map(({ slug, name }) => ({ slug, title: name })),
];
const routeNames: Record<RouteSlug, string> = {
  machame: "Machame",
  lemosho: "Lemosho",
  marangu: "Marangu",
  rongai: "Rongai",
  "northern-circuit": "Northern Circuit",
  umbwe: "Umbwe",
};
const isRouteSlug = (value: string | null): value is RouteSlug =>
  value === "machame" || value === "lemosho" || value === "marangu" ||
  value === "rongai" || value === "northern-circuit" || value === "umbwe";

function PrefilledForm({ variant }: { variant: FormType }) {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type")?.trim().toLowerCase();
  const mappedType = requestedType === "kilimanjaro" ? "Kilimanjaro Climb" : [
    "Safari", "Kilimanjaro Climb", "Zanzibar Beach Escape", "Day Trip",
    "Safari and Zanzibar", "Climb and Safari", "Not sure yet",
  ].find((item) => item.toLowerCase() === requestedType);
  const travelers = searchParams.get("travelers")?.trim().toLowerCase();
  const requestedGroupSize = (searchParams.get("group") ?? searchParams.get("groupSize"))?.trim();
  const validGroupSize = requestedGroupSize && /^\d+$/.test(requestedGroupSize) && Number(requestedGroupSize) >= 1 && Number(requestedGroupSize) <= 30
    ? requestedGroupSize
    : undefined;
  const adults = validGroupSize ?? (travelers === "3 to 4" ? "3" : travelers === "5 or more" ? "5" : /^\d+$/.test(travelers ?? "") ? travelers : undefined);
  const rawPackage = searchParams.get("package") ?? "";
  const selectedPackage = packages.find((item) => item.slug === rawPackage);
  const selectedKilimanjaroPackage = kilimanjaroPackages.find((item) => item.slug === rawPackage);
  const requestedRoute = searchParams.get("route");
  const route = selectedKilimanjaroPackage?.route ?? (isRouteSlug(requestedRoute) ? requestedRoute : undefined);
  const packageSlug = selectedPackage?.slug ?? "";
  const requestedTier = searchParams.get("tier")?.trim().toLowerCase();
  const tier = requestedTier === "standard" || requestedTier === "comfort" || requestedTier === "luxury" || requestedTier === "midrange"
    ? requestedTier
    : undefined;
  const requestedSeason = searchParams.get("season");
  const season = requestedSeason === "peak" ? "Peak season" : requestedSeason === "green" ? "Green season" : undefined;
  const requestedMonth = searchParams.get("month")?.trim();
  const month = requestedMonth && ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].includes(requestedMonth)
    ? requestedMonth
    : "";
  const initialValues: Partial<InquiryFormValues> = {
    interest: mappedType,
    month,
    adults,
    package: packageSlug,
    accommodation: tier === "comfort" ? "Comfortable lodges" : tier === "luxury" ? "Luxury" : tier === "midrange" ? "Mid-range" : undefined,
  };

  return (
    <div className="space-y-6">
      {selectedPackage || route ? (
        <section aria-labelledby="selected-package-title" className="rounded-3xl border border-gold/50 bg-gold/10 p-5 sm:p-6">
          <p className="text-eyebrow text-terracotta">Your selected journey</p>
          <h2 id="selected-package-title" className="mt-2 font-heading text-2xl text-earth">{selectedPackage?.title ?? `${route ? routeNames[route] : "Kilimanjaro"} Route`}</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
            {route ? <div><dt className="text-muted">Route</dt><dd className="mt-1 font-semibold text-earth">{routeNames[route]}</dd></div> : null}
            {tier ? <div><dt className="text-muted">Comfort</dt><dd className="mt-1 font-semibold capitalize text-earth">{tier === "midrange" ? "Mid-range" : tier}</dd></div> : null}
            {month ? <div><dt className="text-muted">Travel month</dt><dd className="mt-1 font-semibold text-earth">{month}</dd></div> : null}
            {adults ? <div><dt className="text-muted">Travellers</dt><dd className="mt-1 font-semibold text-earth">{Number(adults) >= 7 ? "7 or more" : adults} travellers</dd></div> : null}
            {season ? <div><dt className="text-muted">Season</dt><dd className="mt-1 font-semibold text-earth">{season}</dd></div> : null}
          </dl>
          {selectedKilimanjaroPackage ? <p className="mt-4 text-xs leading-5 text-muted">Pricing is an estimate until dates, availability and the written itinerary are confirmed.</p> : null}
        </section>
      ) : null}
      <InquiryForm variant={variant} initialValues={initialValues} />
    </div>
  );
}

export default function InquiryFormWithPrefill({ variant }: { variant: FormType }) {
  return (
    <Suspense fallback={<div className="min-h-48 animate-pulse rounded-3xl bg-white/70" aria-busy="true" aria-label="Loading inquiry form" />}>
      <PrefilledForm variant={variant} />
    </Suspense>
  );
}
