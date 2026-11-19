"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getAllSerengetiPackages } from "@/lib/serengeti-packages";
import { getAllPackages } from "@/data";
import { PACKAGES as kilimanjaroPackages, type RouteSlug } from "@/data/kilimanjaro-packages";
import type { InquiryFormValues } from "@/types/inquiry";
import InquiryForm from "./InquiryForm";

const monthNames = new Set([
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]);
const packageSlugs = new Set([
  ...getAllPackages().map(({ slug }) => slug),
  ...getAllSerengetiPackages().map(({ slug }) => slug),
  ...kilimanjaroPackages.map(({ slug }) => slug),
]);
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

export default function InquiryFormWithQuery() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const params = new URLSearchParams(query);
  const requestedPackage = params.get("package") ?? "";
  const kilimanjaroPackage = kilimanjaroPackages.find(({ slug }) => slug === requestedPackage);
  const requestedRoute = params.get("route");
  const route = kilimanjaroPackage?.route ?? (isRouteSlug(requestedRoute) ? requestedRoute : undefined);
  const requestedTier = params.get("tier")?.toLowerCase();
  const tier = requestedTier === "luxury" ? "Luxury" : requestedTier === "midrange" ? "Mid-range" : undefined;
  const requestedGroup = Number(params.get("group") ?? params.get("adults"));
  const group = Number.isInteger(requestedGroup) && requestedGroup >= 1 && requestedGroup <= 30 ? requestedGroup : undefined;
  const requestedSeason = params.get("season");
  const season = requestedSeason === "peak" ? "Peak season" : requestedSeason === "green" ? "Green season" : undefined;
  const initialValues = useMemo<Partial<InquiryFormValues>>(() => {
    const params = new URLSearchParams(query);
    const slug = params.get("package") ?? "";
    const travellers = Number(params.get("adults"));
    const month = params.get("month") ?? "";
    const travelersType = params.get("travelersType") ?? "";
    const accommodation = params.get("accommodation") ?? "";

    return {
      ...(packageSlugs.has(slug) ? { package: slug } : {}),
      ...(kilimanjaroPackages.some(({ slug: packageSlug }) => packageSlug === slug) || params.get("type")?.toLowerCase() === "kilimanjaro" ? { interest: "Kilimanjaro Climb" } : {}),
      ...(packageSlugs.has(slug) && !kilimanjaroPackages.some(({ slug: packageSlug }) => packageSlug === slug) ? { interest: "Safari" } : {}),
      ...(Number.isInteger(travellers) && travellers > 0 && travellers <= 30 ? { adults: String(travellers) } : {}),
      ...(monthNames.has(month) ? { month } : {}),
      ...(new Set(["Solo", "Couple", "Friends", "Family", "Group"]).has(travelersType) ? { travelersType } : {}),
      ...(new Set(["Camping", "Mid-range", "Comfortable lodges", "Luxury"]).has(accommodation) ? { accommodation } : {}),
      ...(params.get("tier")?.toLowerCase() === "luxury" ? { accommodation: "Luxury" } : params.get("tier")?.toLowerCase() === "midrange" ? { accommodation: "Mid-range" } : {}),
      ...(Number.isInteger(Number(params.get("group"))) && Number(params.get("group")) >= 1 && Number(params.get("group")) <= 30 ? { adults: params.get("group") ?? undefined } : {}),
      ...(params.get("type") === "Safari" ? { interest: "Safari" } : {}),
    };
  }, [query]);

  return (
    <div className="space-y-6">
      {route || kilimanjaroPackage ? (
        <section aria-labelledby="selected-climb-title" className="rounded-3xl border border-gold/50 bg-gold/10 p-5 sm:p-6">
          <p className="text-eyebrow text-terracotta">Your selected climb</p>
          <h2 id="selected-climb-title" className="mt-2 font-heading text-2xl text-earth">{kilimanjaroPackage?.name ?? `${route ? routeNames[route] : "Kilimanjaro"} Route`}</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {route ? <div><dt className="text-muted">Route</dt><dd className="mt-1 font-semibold text-earth">{routeNames[route]}</dd></div> : null}
            {tier ? <div><dt className="text-muted">Comfort</dt><dd className="mt-1 font-semibold text-earth">{tier}</dd></div> : null}
            {group ? <div><dt className="text-muted">Travellers</dt><dd className="mt-1 font-semibold text-earth">{group} travellers</dd></div> : null}
            {season ? <div><dt className="text-muted">Season</dt><dd className="mt-1 font-semibold text-earth">{season}</dd></div> : null}
          </dl>
        </section>
      ) : null}
      <InquiryForm key={query} variant="plan" initialValues={initialValues} />
    </div>
  );
}
