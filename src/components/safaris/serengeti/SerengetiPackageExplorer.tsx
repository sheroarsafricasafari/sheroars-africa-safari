"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import SerengetiPackageCard from "@/components/safaris/serengeti/SerengetiPackageCard";
import type { AccommodationTier, SerengetiPackage } from "@/types/serengeti-package";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const regions = ["Central Serengeti", "Southern Serengeti", "Ndutu", "Western Corridor", "Grumeti", "Northern Serengeti"];
const tiers: { value: AccommodationTier; label: string }[] = [
  { value: "camping", label: "Camping" },
  { value: "mid-range", label: "Mid-range" },
  { value: "luxury", label: "Luxury" },
];

type Filters = {
  query: string;
  duration: string;
  month: string;
  regions: string[];
  tiers: AccommodationTier[];
  access: string[];
  experiences: string[];
};


function parseFilters(query: string): Filters {
  const params = new URLSearchParams(query);
  const duration = params.get("duration") ?? "";
  const month = params.get("month") ?? "";
  const parsedMonth = Number(month);
  const validTiers = new Set(tiers.map(({ value }) => value));
  return {
    query: params.get("q") ?? "",
    duration: /^\d+$/.test(duration) && Number(duration) >= 3 && Number(duration) <= 8 ? duration : "",
    month: Number.isInteger(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12 ? month : "",
    regions: (params.get("region") ?? "").split(",").filter((value) => regions.includes(value)),
    tiers: (params.get("tier") ?? "").split(",").filter((value): value is AccommodationTier => validTiers.has(value as AccommodationTier)),
    access: (params.get("access") ?? "").split(","),
    experiences: (params.get("experience") ?? "").split(","),
  };
}

function FilterChips<T extends string>({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly T[];
  selected: T[];
  onChange: (value: T[]) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? selected.filter((item) => item !== option) : [...selected, option])}
            className={`min-h-11 rounded-full border px-3 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${active ? "border-terracotta bg-terracotta text-white" : "border-earth/15 bg-white text-earth hover:border-terracotta/50"}`}
          >
            {option.replaceAll("-", " ")}
          </button>
        );
      })}
    </fieldset>
  );
}

function toQuery(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.duration) params.set("duration", filters.duration);
  if (filters.month) params.set("month", filters.month);
  if (filters.regions.length) params.set("region", filters.regions.join(","));
  if (filters.tiers.length) params.set("tier", filters.tiers.join(","));
  if (filters.access.length) params.set("access", filters.access.join(","));
  if (filters.experiences.length) params.set("experience", filters.experiences.join(","));
  return params.toString();
}

function tierLabel(item: SerengetiPackage) {
  return item.pricing.tiers
    .filter(({ availability }) => availability !== "unavailable")
    .map(({ tier }) => tier.replace("-", " "))
    .join(", ") || "Not specified";
}

function comparisonValue(item: SerengetiPackage, key: string) {
  switch (key) {
    case "Duration": return `${item.durationDays} days / ${item.nights} nights`;
    case "Regions": return item.regions.map(({ name, nights }) => `${name}${nights === undefined ? "" : ` (${nights} nights)`}`).join(" · ");
    case "Best travel period": return item.season;
    case "Access": return item.access.label;
    case "Pace": return item.pace.label;
    case "Accommodation": return tierLabel(item);
    case "Camping": {
      const camping = item.pricing.tiers.find(({ tier }) => tier === "camping");
      return camping?.availability === "unavailable" ? "Not available" : camping?.availability === "on-request" ? "On request" : camping?.availability === "limited" ? "Limited availability" : "Available";
    }
    case "Main experience": return item.highlights.join(" · ");
    case "Departure": return item.departureType.label;
    case "Balloon": return item.pricing.balloonIncluded ? "Included in mid-range and luxury proposed prices" : "Not specified";
    case "Seasonal considerations": return item.seasonNote;
    default: return "Not specified";
  }
}

function Explorer({ items }: { items: SerengetiPackage[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const filters = useMemo(() => parseFilters(queryString), [queryString]);
  const [comparison, setComparison] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const accessOptions = [...new Set(items.filter((item) => item.access.status === "specified").map((item) => item.access.label))];
  const experienceOptions = [...new Set(items.flatMap(({ experienceTags }) => experienceTags))];

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return items.filter((item) => {
      const text = [item.title, item.shortTitle, item.subtitle, item.summary, item.sellingPoint, ...item.highlights, ...item.bestFor, ...item.regions.map(({ name }) => name)].join(" ").toLowerCase();
      const regionMatch = !filters.regions.length || filters.regions.some((region) => item.regionSearchTerms.some((searchTerm) => searchTerm.toLowerCase().includes(region.toLowerCase())));
      const tierMatch = !filters.tiers.length || filters.tiers.every((selectedTier) => item.pricing.tiers.some((price) => price.tier === selectedTier && price.availability !== "unavailable"));
      const accessMatch = !filters.access.length || filters.access.includes(item.access.label);
      const experienceMatch = !filters.experiences.length || filters.experiences.every((experience) => item.experienceTags.includes(experience));
      const monthMatch = !filters.month || item.bestMonths.includes(Number(filters.month));
      return (!query || text.includes(query))
        && (!filters.duration || item.durationDays === Number(filters.duration))
        && monthMatch && regionMatch && tierMatch && accessMatch && experienceMatch;
    });
  }, [filters, items]);

  const selectedItems = comparison.flatMap((slug) => {
    const item = items.find((candidate) => candidate.slug === slug);
    return item ? [item] : [];
  });
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const nextQuery = toQuery({ ...filters, [key]: value });
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };
  const clearFilters = () => router.replace(pathname, { scroll: false });
  const toggleComparison = (slug: string) => {
    setComparison((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : current.length >= 3 ? current : [...current, slug]);
  };

  return (
    <div>
      <section aria-label="Filter Serengeti packages" className="sticky top-[var(--navbar-height,78px)] z-30 border-y border-earth/10 bg-cream/95 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl space-y-4 px-5 sm:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <label className="block min-w-56 flex-1">
              <span className="mb-1 block text-xs font-semibold text-earth">Search packages</span>
              <input value={filters.query} onChange={(event) => update("query", event.target.value)} placeholder="Package, region or experience" className="min-h-11 w-full rounded-full border border-earth/15 bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-terracotta" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-earth">Duration</span>
              <select value={filters.duration} onChange={(event) => update("duration", event.target.value)} className="min-h-11 w-full rounded-full border border-earth/15 bg-white px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                <option value="">All durations</option>
                {[3, 4, 5, 6, 7, 8].map((days) => <option key={days} value={days}>{days} days</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-earth">Travel month</span>
              <select value={filters.month} onChange={(event) => update("month", event.target.value)} className="min-h-11 w-full rounded-full border border-earth/15 bg-white px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                <option value="">Any month</option>
                {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
              </select>
            </label>
            <button type="button" onClick={clearFilters} className="inline-flex min-h-11 items-center gap-1 self-start rounded-full px-3 text-sm font-semibold text-terracotta underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              <X aria-hidden="true" size={15} /> Clear filters
            </button>
          </div>
          <div className="grid gap-3 xl:grid-cols-2">
            <div className="space-y-2"><p className="text-xs font-semibold text-earth">Region</p><FilterChips label="Filter by region" options={regions} selected={filters.regions} onChange={(value) => update("regions", value)} /></div>
            <div className="space-y-2"><p className="text-xs font-semibold text-earth">Accommodation</p><FilterChips label="Filter by accommodation" options={tiers.map(({ value }) => value)} selected={filters.tiers} onChange={(value) => update("tiers", value)} /></div>
            {accessOptions.length ? <div className="space-y-2"><p className="text-xs font-semibold text-earth">Access</p><FilterChips label="Filter by access" options={accessOptions} selected={filters.access} onChange={(value) => update("access", value)} /></div> : null}
            <div className="space-y-2"><p className="text-xs font-semibold text-earth">Experience</p><FilterChips label="Filter by experience" options={experienceOptions} selected={filters.experiences} onChange={(value) => update("experiences", value)} /></div>
          </div>
          <p aria-live="polite" className="text-sm text-muted">Showing {visible.length} of {items.length} Serengeti safaris</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
        {visible.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((item) => (
              <div key={item.slug} className="flex min-w-0 flex-col">
                <SerengetiPackageCard item={item} />
                <button
                  type="button"
                  aria-pressed={comparison.includes(item.slug)}
                  onClick={() => toggleComparison(item.slug)}
                  disabled={!comparison.includes(item.slug) && comparison.length >= 3}
                  className="mt-3 min-h-11 self-start rounded-full border border-earth/20 px-4 text-sm font-semibold text-earth hover:border-terracotta disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
                >
                  {comparison.includes(item.slug) ? "Remove from comparison" : "Add to comparison"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-sand bg-white px-6 py-12 text-center">
            <h2 className="font-heading text-2xl text-earth">No packages match those filters.</h2>
            <p className="mt-2 text-sm text-muted">Try a different month or remove one or more filters.</p>
            <button type="button" onClick={clearFilters} className="mt-5 min-h-11 rounded-full bg-terracotta px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Reset filters</button>
          </div>
        )}

        {comparison.length ? (
          <section aria-labelledby="compare-title" className="mt-12 rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><p className="text-eyebrow text-terracotta">COMPARE YOUR OPTIONS</p><h2 id="compare-title" className="mt-2 font-heading text-2xl text-earth">Compare up to three journeys</h2></div>
              <div className="flex flex-wrap gap-3">
                <button type="button" aria-expanded={compareOpen} onClick={() => setCompareOpen((open) => !open)} className="min-h-11 rounded-full border border-earth/20 px-4 text-sm font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{compareOpen ? "Hide comparison" : "Show comparison"}</button>
                <button type="button" onClick={() => { setComparison([]); setCompareOpen(false); }} className="min-h-11 rounded-full px-4 text-sm font-semibold text-terracotta underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Clear selected</button>
              </div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {selectedItems.map((item) => <li key={item.slug}><button type="button" onClick={() => toggleComparison(item.slug)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-sand px-4 text-sm font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{item.shortTitle}<span aria-hidden="true">×</span><span className="sr-only">Remove</span></button></li>)}
            </ul>
            {compareOpen ? (
              <div className="mt-6 overflow-x-auto rounded-2xl border border-sand">
                <table className="min-w-[760px] border-collapse text-left text-sm">
                  <caption className="sr-only">Selected Serengeti safari package comparison</caption>
                  <thead><tr className="bg-forest text-cream"><th scope="col" className="sticky left-0 min-w-40 bg-forest p-3">Compare</th>{selectedItems.map((item) => <th scope="col" key={item.slug} className="min-w-56 p-3 align-top">{item.shortTitle}</th>)}</tr></thead>
                  <tbody>
                    {["Duration", "Regions", "Best travel period", "Access", "Pace", "Accommodation", "Camping", "Main experience", "Departure", "Balloon", "Seasonal considerations"].map((key) => (
                      <tr key={key} className="border-t border-sand align-top odd:bg-cream/60">
                        <th scope="row" className="sticky left-0 bg-inherit p-3 font-semibold text-earth">{key}</th>
                        {selectedItems.map((item) => <td key={item.slug} className="p-3 leading-6 text-muted">{comparisonValue(item, key)}</td>)}
                      </tr>
                    ))}
                    {(["camping", "mid-range", "luxury"] as const).map((tier) => (
                      <tr key={tier} className="border-t border-sand align-top odd:bg-cream/60">
                        <th scope="row" className="sticky left-0 bg-inherit p-3 font-semibold capitalize text-earth">{tier.replace("-", " ")} proposed price</th>
                        {selectedItems.map((item) => {
                          const price = item.pricing.tiers.find((candidate) => candidate.tier === tier);
                          const value = !price || price.availability === "unavailable" ? "Not available" : price.amount === null ? "On request" : `$${price.amount.toLocaleString("en-US")}${price.twinShare ? " twin share" : ""}`;
                          return <td key={item.slug} className="p-3 text-muted">{value}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <p className="mt-4 text-xs leading-5 text-muted">All prices shown are proposed. Pricing basis and final amount are confirmed in a written quote.</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default function SerengetiPackageExplorer({ items }: { items: SerengetiPackage[] }) {
  return (
    <Suspense fallback={<div className="grid min-h-72 place-items-center text-muted" role="status">Loading Serengeti packages…</div>}>
      <Explorer items={items} />
    </Suspense>
  );
}
