"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Search, X } from "lucide-react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import type { SafariPackage } from "@/data/safaris";
import SerengetiPackageCard from "@/components/safaris/serengeti/SerengetiPackageCard";
import type { NgorongoroPackage } from "@/data/ngorongoro-packages";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

type ExplorerPackage = SafariPackage | NgorongoroPackage;
type Filters = { q: string; duration: string; park: string[]; style: string; destination: string; sort: string };
const durationOptions = ["All", "3 days", "4 to 5", "6 to 7", "8 or more"];
const parkOptions = ["Serengeti", "Ngorongoro", "Tarangire", "Lake Manyara", "Zanzibar"];
const styleOptions = ["Great Migration", "Women-Only", "Safari and Beach", "Short Safaris", "Short stays", "Luxury", "Family", "Culture and walking", "After Kilimanjaro", "With the Serengeti"];
const destinationOptions = ["All", "Ngorongoro"];
const defaults: Filters = { q: "", duration: "All", park: [], style: "All", destination: "All", sort: "Recommended" };

function isNgorongoroPackage(item: ExplorerPackage): item is NgorongoroPackage {
  return "durationDays" in item;
}

function packageDays(item: ExplorerPackage) {
  return isNgorongoroPackage(item) ? item.durationDays : item.days;
}

function packageParks(item: ExplorerPackage) {
  return isNgorongoroPackage(item) ? item.destinations : item.parks;
}

function ExplorerSkeleton() {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading safari packages">{Array.from({ length: 3 }, (_, i) => <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-sand motion-reduce:animate-none" />)}</div>;
}

function Explorer({ packages }: { packages: ExplorerPackage[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reducedMotion = useReducedMotionPreference();
  const monthParam = params.get("month");
  const rawDuration = params.get("duration") ?? "All";
  const duration = rawDuration === "3" ? "3 days" : rawDuration === "4" || rawDuration === "5" ? "4 to 5" : rawDuration === "6" || rawDuration === "7" ? "6 to 7" : rawDuration === "8" ? "8 or more" : rawDuration;
  const initial: Filters = {
    q: params.get("q") ?? "",
    duration,
    park: (params.get("park")?.split(",").filter(Boolean) ?? []).flatMap((park) => {
      const option = parkOptions.find((item) => item.toLowerCase() === park.toLowerCase());
      return option ? [option] : [];
    }),
    style: params.get("style") ?? "All",
    destination: params.get("destination")?.toLowerCase() === "ngorongoro" ? "Ngorongoro" : "All",
    sort: params.get("sort") ?? "Recommended",
  };
  const [filters, setFilters] = useState(initial);

  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.q) next.set("q", filters.q);
    if (filters.duration !== "All") next.set("duration", filters.duration);
    if (filters.park.length) next.set("park", filters.park.join(","));
    if (filters.style !== "All") next.set("style", filters.style);
    if (filters.destination !== "All") next.set("destination", filters.destination.toLowerCase());
    if (filters.sort !== "Recommended") next.set("sort", filters.sort);
    if (monthParam) next.set("month", monthParam);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [filters, monthParam, pathname, router]);

  const visible = useMemo(() => {
    const query = filters.q.trim().toLowerCase();
    const filtered = packages.filter((item) => {
      const parks = packageParks(item);
      const days = packageDays(item);
      const matchesQuery = !query || [item.title, item.summary, isNgorongoroPackage(item) ? item.tagline : item.highlight, ...parks].join(" ").toLowerCase().includes(query);
      const matchesDuration = filters.duration === "All"
        || filters.duration === "3 days" && days === 3
        || filters.duration === "4 to 5" && days >= 4 && days <= 5
        || filters.duration === "6 to 7" && days >= 6 && days <= 7
        || filters.duration === "8 or more" && days >= 8;
      const matchesPark = !filters.park.length || filters.park.some((park) => parks.includes(park));
      const matchesDestination = filters.destination === "All"
        || isNgorongoroPackage(item) && item.destinations.includes(filters.destination);
      const matchesStyle = filters.style === "All" || (isNgorongoroPackage(item)
        ? item.collections.includes(filters.style) || item.style === filters.style
        : filters.style === "Great Migration" && item.tags.includes("Great Migration")
          || filters.style === "Women-Only" && item.tags.includes("Women-Only")
          || filters.style === "Safari and Beach" && item.tags.includes("Safari and Beach")
          || filters.style === "Short Safaris" && days <= 4);
      return matchesQuery && matchesDuration && matchesPark && matchesDestination && matchesStyle;
    });
    if (filters.sort === "Shortest first") filtered.sort((a, b) => packageDays(a) - packageDays(b));
    if (filters.sort === "Longest first") filtered.sort((a, b) => packageDays(b) - packageDays(a));
    return filtered;
  }, [filters, packages]);

  const update = (key: keyof Filters, value: string | string[]) => setFilters((current) => ({ ...current, [key]: value }));
  const clear = () => setFilters(defaults);

  return (
    <>
      <div className="sticky top-[var(--navbar-height,78px)] z-30 border-y border-earth/10 bg-cream/95 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl space-y-4 px-5 sm:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative block min-w-56 flex-1">
              <Search aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input value={filters.q} onChange={(event) => update("q", event.target.value)} placeholder="Search safaris or parks" aria-label="Search safaris or parks" className="min-h-11 w-full rounded-full border border-earth/15 bg-white pl-11 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-terracotta" />
            </label>
            <label className="flex min-h-11 items-center gap-2 text-sm"><span className="font-semibold">Sort</span><select value={filters.sort} onChange={(event) => update("sort", event.target.value)} className="min-h-11 rounded-full border border-earth/15 bg-white px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{["Recommended", "Shortest first", "Longest first"].map((option) => <option key={option}>{option}</option>)}</select></label>
            <button type="button" onClick={clear} className="inline-flex min-h-11 items-center gap-1 self-start rounded-full px-3 text-sm font-semibold text-terracotta underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><X aria-hidden="true" size={15} />Clear filters</button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <ChipSet label="Duration" options={durationOptions} selected={[filters.duration]} onChange={(value) => update("duration", value[0] ?? "All")} />
            <ChipSet label="Parks" options={parkOptions} selected={filters.park} onChange={(value) => update("park", value)} multiple />
            <ChipSet label="Style" options={styleOptions} selected={filters.style === "All" ? [] : [filters.style]} onChange={(value) => update("style", value[0] ?? "All")} />
            <ChipSet label="Destination" options={destinationOptions.slice(1)} selected={filters.destination === "All" ? [] : [filters.destination]} onChange={(value) => update("destination", value[0] ?? "All")} />
          </div>
          <p className="text-sm text-muted" aria-live="polite">Showing {visible.length} of {packages.length} safaris</p>
        </div>
      </div>

      {visible.length ? (
        <motion.div layout={!reducedMotion} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <motion.article
                key={item.slug}
                layout={!reducedMotion}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
                className={isNgorongoroPackage(item) ? "overflow-visible bg-transparent shadow-none" : index === 0 && filters.duration === "All" && filters.sort === "Recommended" ? "group overflow-hidden rounded-3xl bg-white shadow-card lg:col-span-2 lg:grid lg:grid-cols-2" : "group overflow-hidden rounded-3xl bg-white shadow-card"}
              >
                {isNgorongoroPackage(item) ? <SerengetiPackageCard item={item} /> : (
                  <>
                    <Link href={`/safaris/packages/${item.slug}`} className="relative block min-h-64 overflow-hidden bg-sand focus-visible:outline focus-visible:outline-4 focus-visible:outline-terracotta">
                      <SmartImage src={item.image} alt={`${item.title} in ${item.parks.join(", ")}`} sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"} fill className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
                      {item.badge ? <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-2 text-xs font-bold text-gold">{item.badge}</span> : null}
                      <span className="absolute bottom-4 right-4 rounded-full bg-cream px-3 py-2 text-xs font-bold text-earth">{item.days} days</span>
                    </Link>
                    <div className="flex flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3"><h3 className="font-heading text-2xl text-earth">{item.title}</h3><span className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs font-semibold">{item.pace}</span></div>
                      <p className="mt-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-terracotta"><MapPin aria-hidden="true" size={14} />{item.parks.join(", ")}</p>
                      <p className="mt-4 leading-6 text-muted">{item.summary}</p>
                      <p className="mt-4 text-sm font-semibold text-earth">{item.priceFrom === null ? "Price on request" : `From $${item.priceFrom.toLocaleString()} per person`}</p>
                      <Link href={`/safaris/packages/${item.slug}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-terracotta">View Journey<ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" /></Link>
                    </div>
                  </>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-3xl border border-sand bg-white px-6 py-12 text-center">
          <svg viewBox="0 0 120 90" className="mx-auto mb-4 h-20 text-terracotta" role="img" aria-label="A simple safari landscape illustration"><path d="M8 75 40 30l22 30 16-20 34 35H8Z" fill="currentColor" opacity=".2" /><circle cx="87" cy="20" r="10" fill="currentColor" opacity=".5" /></svg>
          <h3 className="font-heading text-2xl text-earth">No safaris match those filters yet.</h3>
          <div className="mt-5 flex flex-wrap justify-center gap-3"><button onClick={clear} className="min-h-11 rounded-full border border-earth/20 px-5 font-semibold">Clear filters</button><Link href="/plan-your-safari" className="min-h-11 rounded-full bg-terracotta px-5 py-3 font-semibold text-white">Ask us to tailor one</Link></div>
        </div>
      )}
    </>
  );
}

function ChipSet({ label, options, selected, onChange, multiple = false }: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      {options.map((option) => {
        const active = selected.includes(option);
        return <button key={option} type="button" aria-pressed={active} onClick={() => {
          if (!multiple) { onChange(active ? [] : [option]); return; }
          onChange(active ? selected.filter((item) => item !== option) : [...selected, option]);
        }} className={`min-h-11 rounded-full border px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${active ? "border-terracotta bg-terracotta text-white" : "border-earth/15 bg-white text-earth"}`}>{option}</button>;
      })}
    </fieldset>
  );
}

export default function PackagesExplorer({ packages }: { packages: ExplorerPackage[] }) {
  return <Suspense fallback={<ExplorerSkeleton />}><Explorer packages={packages} /></Suspense>;
}
