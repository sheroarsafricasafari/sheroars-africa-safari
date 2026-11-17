"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Compass } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TarangirePackageCard from "@/components/tarangire/packages/TarangirePackageCard";
import { tarangirePackages } from "@/data/tarangire-packages";
import type { TarangirePackage } from "@/types/tarangire-package";

const filters = ["All", "Day trip", "Short escape", "Budget", "Walking", "Photography", "Family", "Circuit"] as const;
type Filter = typeof filters[number];

export function TarangirePackageBrowser({
  items = tarangirePackages,
  title = "Eight Ways to Meet the Elephant Kingdom",
  eyebrow = "Our Tarangire Journeys",
  intro = "Choose a single day among the baobabs or take a longer route through Tarangire and its neighbouring parks.",
}: {
  items?: TarangirePackage[];
  title?: string;
  eyebrow?: string;
  intro?: string;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [days, setDays] = useState("all");
  const [sort, setSort] = useState("recommended");
  const reduceMotion = useReducedMotion();
  const [viewportRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  const visible = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesTag = filter === "All" || item.tags.includes(filter);
      const matchesDays = days === "all" || item.days === Number(days);
      return matchesTag && matchesDays;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.pricing.priceFrom - b.pricing.priceFrom;
      if (sort === "price-high") return b.pricing.priceFrom - a.pricing.priceFrom;
      return items.indexOf(a) - items.indexOf(b);
    });
  }, [days, filter, items, sort]);

  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={intro} />
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter Tarangire safari packages">
          {filters.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => {
                setFilter(option);
                emblaApi?.scrollTo(0);
              }}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${
                filter === option
                  ? "border-forest bg-forest text-white"
                  : "border-earth/15 bg-white text-earth hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <label className="grid gap-1 text-xs font-semibold text-muted">
            Trip length
            <select
              value={days}
              onChange={(event) => setDays(event.target.value)}
              className="min-h-11 min-w-44 rounded-xl border border-earth/15 bg-white px-3 text-sm text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
            >
              <option value="all">Any duration</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value} {value === 1 ? "day" : "days"}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-semibold text-muted">
            Sort by price
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-h-11 min-w-48 rounded-xl border border-earth/15 bg-white px-3 text-sm text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
          <div className="ml-auto hidden gap-2 md:flex">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous packages" className="flex size-11 items-center justify-center rounded-full border border-earth/15 bg-white text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><ArrowLeft aria-hidden="true" size={18} /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next packages" className="flex size-11 items-center justify-center rounded-full border border-earth/15 bg-white text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><ArrowRight aria-hidden="true" size={18} /></button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} Tarangire packages shown.</p>
        <div ref={viewportRef} className="mt-7 overflow-hidden">
          <motion.div layout={!reduceMotion} className="-ml-4 flex">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.div
                  key={item.slug}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <TarangirePackageCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        {!visible.length ? <p className="mt-8 rounded-2xl bg-sand p-6 text-center text-muted">No packages match those filters. Try another trip length or category.</p> : null}
      </Container>
    </section>
  );
}

export function TarangirePackageComparison() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-earth/10 bg-white shadow-card">
      <table className="w-full min-w-[880px] border-collapse text-left text-sm">
        <caption className="sr-only">Compare all eight Tarangire safari packages</caption>
        <thead className="bg-forest text-cream">
          <tr>
            {["Journey", "Duration", "Parks", "Stay", "Pace", "Best for", "From"].map((heading) => (
              <th key={heading} scope="col" className="px-4 py-4 font-semibold">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tarangirePackages.map((item) => (
            <tr key={item.slug} className="border-t border-earth/10 align-top odd:bg-cream/60">
              <th scope="row" className="px-4 py-4 font-semibold text-earth"><Link href={`/safaris/packages/${item.slug}`} className="underline decoration-terracotta/40 underline-offset-4 hover:text-terracotta">{item.shortName}</Link></th>
              <td className="px-4 py-4 text-muted">{item.duration}</td>
              <td className="px-4 py-4 text-muted">{item.parks.join(", ")}</td>
              <td className="px-4 py-4 text-muted">{item.accommodationSummary}</td>
              <td className="px-4 py-4 text-muted">{item.pace}</td>
              <td className="px-4 py-4 text-muted">{item.bestFor.slice(0, 2).join(", ")}</td>
              <td className="px-4 py-4 font-bold text-terracotta">${item.pricing.priceFrom.toLocaleString("en-US")} pp</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TarangirePackageFinder() {
  const [days, setDays] = useState("any");
  const [traveller, setTraveller] = useState("any");
  const [interest, setInterest] = useState("any");
  const recommendation = useMemo(() => {
    const score = (item: TarangirePackage) =>
      Number(days === "any" || item.days === Number(days)) +
      Number(traveller === "any" || item.tags.some((tag) => tag.toLowerCase() === traveller)) +
      Number(interest === "any" || item.tags.some((tag) => tag.toLowerCase() === interest));
    return [...tarangirePackages].sort((a, b) => score(b) - score(a))[0];
  }, [days, interest, traveller]);

  return (
    <div className="grid gap-8 rounded-3xl bg-forest p-6 text-cream sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
      <div>
        <p className="text-eyebrow text-gold">A 30-second safari finder</p>
        <h3 className="mt-3 font-heading text-3xl sm:text-4xl">Which Tarangire safari is right for you?</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-semibold">
            How many days?
            <select value={days} onChange={(event) => setDays(event.target.value)} className="min-h-12 rounded-xl border border-white/20 bg-white px-3 text-sm text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <option value="any">I am flexible</option>
              {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} {value === 1 ? "day" : "days"}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Who is travelling?
            <select value={traveller} onChange={(event) => setTraveller(event.target.value)} className="min-h-12 rounded-xl border border-white/20 bg-white px-3 text-sm text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <option value="any">Any group</option>
              <option value="family">Family</option>
              <option value="couples">Couple</option>
              <option value="budget">Friends on a budget</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Main interest?
            <select value={interest} onChange={(event) => setInterest(event.target.value)} className="min-h-12 rounded-xl border border-white/20 bg-white px-3 text-sm text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <option value="any">A little of everything</option>
              <option value="photography">Photography</option>
              <option value="walking">Walking</option>
              <option value="circuit">Northern circuit</option>
              <option value="budget">Budget value</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-white/10 p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold"><Compass aria-hidden="true" size={16} />A good place to start</p>
        <h4 className="mt-3 font-heading text-2xl">{recommendation.name}</h4>
        <p className="mt-2 text-sm leading-6 text-cream/80">{recommendation.tagline}</p>
        <Link href={`/safaris/packages/${recommendation.slug}`} className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-gold px-5 font-semibold text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
          See this safari <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </div>
  );
}

export function TarangireFeeTransparency() {
  const included = [
    ["Park entry", "Included as listed in the itinerary"],
    ["Conservation and concession fees", "Included when listed for the route"],
    ["Private vehicle and guide", "Included"],
    ["Accommodation and meals", "Included as shown in the itinerary"],
  ];
  return (
    <div className="rounded-3xl border border-earth/10 bg-white p-6 shadow-card sm:p-8">
      <h3 className="font-heading text-2xl text-earth">What is inside your safari price?</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Your written quote lists the services and fees included for your exact route and travel dates.</p>
      <dl className="mt-5 divide-y divide-earth/10">
        {included.map(([label, detail]) => (
          <div key={label} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <dt className="font-semibold text-earth">{label}</dt>
            <dd className="flex items-center gap-2 text-sm text-muted"><Check aria-hidden="true" size={16} className="text-terracotta" />{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function TarangirePackageShowcase() {
  return (
    <>
      <TarangirePackageBrowser />
      <section className="bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Choose with confidence" title="Compare all Tarangire packages" />
          <div className="mt-8"><TarangirePackageComparison /></div>
          <div className="mt-12"><TarangirePackageFinder /></div>
          <div className="mt-8"><TarangireFeeTransparency /></div>
          <div className="mt-8 rounded-3xl border border-earth/10 bg-cream p-6 text-center sm:p-8">
            <h3 className="font-heading text-2xl text-earth">Not sure which one? Let us help.</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted">Share your dates, travel style and interests. We can help you choose a pace that fits.</p>
            <Link href="/plan-your-safari?type=Safari" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 font-semibold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-earth">Talk to a safari planner</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export function PopularTarangirePackages() {
  const items = [
    tarangirePackages.find((item) => item.slug === "tarangire-elephant-escape"),
    tarangirePackages.find((item) => item.slug === "tarangire-manyara-ngorongoro-circuit"),
    tarangirePackages.find((item) => item.slug === "tarangire-budget-camping-safari"),
  ].filter((item): item is TarangirePackage => Boolean(item));

  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Explore Tarangire" title="Popular Tarangire safaris" subtitle="Compare a short wildlife escape, a full northern circuit and a value-focused camping journey." align="left" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => <TarangirePackageCard key={item.slug} item={item} />)}
        </div>
        <div className="mt-7 text-center">
          <Link href="/safaris/tarangire" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-terracotta px-5 text-sm font-semibold text-terracotta hover:bg-terracotta hover:text-white">
            Explore Tarangire <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function TarangireNearbyPackages({ destination }: { destination: "Lake Manyara" | "Ngorongoro" }) {
  const slugs = [
    "tarangire-lake-manyara-classic",
    "tarangire-family-adventure-safari",
    "tarangire-manyara-ngorongoro-circuit",
  ];
  const items = slugs
    .map((slug) => tarangirePackages.find((item) => item.slug === slug))
    .filter((item): item is TarangirePackage => Boolean(item));

  return (
    <section className="bg-sand py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Nearby journeys" title={`Tarangire packages that include ${destination}`} subtitle="Compare routes that combine Tarangire with neighbouring landscapes." align="left" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => <TarangirePackageCard key={item.slug} item={item} />)}
        </div>
      </Container>
    </section>
  );
}
