"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import SmartImage from "@/components/ui/SmartImage";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import { accommodationMonths, accommodationRegions } from "@/data/destinations/serengeti-where-to-stay";

type Region = (typeof accommodationRegions)[number];
type Month = (typeof accommodationMonths)[number];

export function AccommodationRegionExplorer() {
  const [selectedId, setSelectedId] = useState<Region["id"]>("central");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();
  const selectedIndex = accommodationRegions.findIndex((region) => region.id === selectedId);
  const region = accommodationRegions[selectedIndex] ?? accommodationRegions[0];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % accommodationRegions.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + accommodationRegions.length - 1) % accommodationRegions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = accommodationRegions.length - 1;
    else return;
    event.preventDefault();
    const target = accommodationRegions[next];
    if (!target) return;
    setSelectedId(target.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="min-w-0 rounded-3xl bg-forest p-5 text-cream sm:p-7">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-5">
          <svg viewBox="0 0 520 350" role="img" aria-labelledby="stay-map-title stay-map-desc" className="h-auto w-full">
            <title id="stay-map-title">Illustrative Serengeti accommodation regions</title>
            <desc id="stay-map-desc">An abstract, not-to-scale diagram showing five selectable Serengeti planning regions.</desc>
            <path d="M75 48 195 30 242 86 205 133 89 128 46 92Z" fill={region.id === "north" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.72)" strokeWidth="2" />
            <path d="m205 133 37-47 107 10 43 50-37 60-119 11-45-36Z" fill={region.id === "central" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.72)" strokeWidth="2" />
            <path d="m355 146 75 4 25 61-70 33-55-38Z" fill={region.id === "east" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.72)" strokeWidth="2" />
            <path d="m130 191 119-10 45 36-32 64-96 30-61-47Z" fill={region.id === "south" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.72)" strokeWidth="2" />
            <path d="m205 133 31 48-70 73-61-4-16-63 56-46Z" fill={region.id === "west" ? "#cda75f" : "rgba(255,255,255,.16)"} stroke="rgba(255,255,255,.72)" strokeWidth="2" />
            <text x="135" y="92" textAnchor="middle" fill="white" fontSize="13">Northern</text>
            <text x="285" y="156" textAnchor="middle" fill="white" fontSize="13">Central</text>
            <text x="202" y="246" textAnchor="middle" fill="white" fontSize="13">Western</text>
            <text x="218" y="274" textAnchor="middle" fill="white" fontSize="13">Southern</text>
            <text x="410" y="186" textAnchor="middle" fill="white" fontSize="13">Eastern</text>
            <text x="260" y="335" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="12">Illustrative map, not to scale</text>
          </svg>
        </div>
        <div role="tablist" aria-label="Select an accommodation region" className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {accommodationRegions.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`stay-region-tab-${item.id}`}
              aria-controls="stay-region-panel"
              aria-selected={selectedId === item.id}
              tabIndex={selectedId === item.id ? 0 : -1}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${selectedId === item.id ? "bg-gold text-forest" : "border border-white/25 text-cream hover:bg-white/10"}`}
            >
              {item.shortName}
            </button>
          ))}
        </div>
      </div>
      <div id="stay-region-panel" role="tabpanel" aria-labelledby={`stay-region-tab-${region.id}`} aria-live="polite" className="grid min-w-0 overflow-hidden rounded-3xl border border-sand bg-white shadow-card sm:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-56 bg-sand sm:min-h-full">
          <SmartImage src={region.image} alt={`${region.name} landscape`} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 30vw" fill className="object-cover" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={region.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="min-w-0 p-5 sm:p-7">
            <p className="text-eyebrow text-terracotta">REGION GUIDE</p>
            <h3 className="mt-2 font-heading text-2xl text-earth sm:text-3xl">{region.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{region.description}</p>
            <p className="mt-4 text-sm leading-6 text-earth"><strong>Accommodation:</strong> {region.accommodation}</p>
            <p className="mt-3 text-sm leading-6 text-earth"><strong>Season:</strong> {region.season}</p>
            <div className="mt-4 flex flex-wrap gap-2">{region.bestFor.map((item) => <span key={item} className="rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-earth">{item}</span>)}</div>
            <Link href={region.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
              Explore this region <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AccommodationSeasonCalendar() {
  const [selectedMonth, setSelectedMonth] = useState<Month>(accommodationMonths[0]);
  return (
    <div>
      <div role="group" aria-label="Select a month for broad accommodation planning" className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
        {accommodationMonths.map((month) => (
          <button key={month.month} type="button" aria-pressed={selectedMonth.month === month.month} onClick={() => setSelectedMonth(month)} className={`min-h-11 rounded-xl border px-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selectedMonth.month === month.month ? "border-forest bg-forest text-cream" : "border-sand bg-white text-earth hover:bg-sand"}`}>
            {month.month}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 grid gap-4 rounded-2xl border border-sand bg-white p-5 sm:grid-cols-[0.35fr_1fr] sm:p-7">
        <div><p className="text-eyebrow text-terracotta">BROAD PLANNING GUIDE</p><h3 className="mt-2 font-heading text-2xl text-earth">{selectedMonth.season}</h3></div>
        <div><p className="font-semibold text-earth">{selectedMonth.region}</p><p className="mt-2 text-sm leading-6 text-muted">{selectedMonth.note}</p></div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">Wildlife movements follow rainfall and grazing conditions. These are general planning patterns, not a fixed calendar.</p>
    </div>
  );
}

type StayResult = { region: Region; style: string; explanation: string; travelerNote: string };

export function SerengetiStayPlanner() {
  const [result, setResult] = useState<StayResult | null>(null);

  const recommend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const travel = String(values.get("travel"));
    const interest = String(values.get("interest"));
    const preference = String(values.get("preference"));
    const traveler = String(values.get("traveler"));

    let regionId: Region["id"] = "central";
    if (interest === "mara") regionId = "north";
    else if (interest === "cats") regionId = "central";
    else if (interest === "quiet") regionId = "west";
    else if (travel === "jan-mar") regionId = "south";
    else if (travel === "apr-may") regionId = "west";
    else if (travel === "jun-jul") regionId = "north";
    else if (travel === "aug-oct") regionId = "north";
    else if (travel === "nov-dec") regionId = "south";

    const region = accommodationRegions.find((item) => item.id === regionId) ?? accommodationRegions[0];
    const styleLabels: Record<string, string> = {
      comfortable: "Compare practical accommodation with essential safari comforts.",
      midrange: "Compare well-appointed stays and check which facilities matter most to you.",
      luxury: "Compare premium stays by their exact location, inclusions and facilities.",
      camping: "Explore official campsite categories and confirm their facilities and booking arrangements.",
      unsure: "Our team can help compare accommodation styles against your route and dates.",
    };
    const travelerNote = traveler === "family"
      ? "For a family, confirm room configurations, minimum ages, child policies and activities directly with the property."
      : traveler === "solo" || traveler === "group"
        ? "Ask for a proposal that accounts for your party size and the route logistics."
        : "Compare room configuration and inclusions for your party before selecting a property.";
    const timingExplanation = travel === "unsure" ? "Your travel month is not set, so use this as a starting point and compare regions with our team." : `For ${travel.replace("-", " to ")}, use the seasonal notes as a guide, then confirm current conditions and camp operations.`;
    const interestExplanation = interest === "unsure" ? "Your preferred experience is not fixed, so the central region is a flexible starting point for comparison." : `You selected an interest in ${interest === "mara" ? "the Mara River region" : interest === "cats" ? "big cats and year-round wildlife" : interest === "quiet" ? "peaceful landscapes" : interest === "migration" ? "the Great Migration" : "general Serengeti exploration"}.`;
    setResult({
      region,
      style: styleLabels[preference] ?? styleLabels.unsure,
      explanation: `${interestExplanation} ${timingExplanation}`,
      travelerNote,
    });
  };

  const reset = () => setResult(null);

  return (
    <div className="grid gap-7 lg:grid-cols-[1fr_0.85fr]">
      <form onSubmit={recommend} className="grid gap-5 rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-8">
        <PlannerSelect name="travel" label="When are you planning to travel?" options={[["jan-mar", "January to March"], ["apr-may", "April to May"], ["jun-jul", "June to July"], ["aug-oct", "August to October"], ["nov-dec", "November to December"], ["unsure", "Not sure yet"]]} />
        <PlannerSelect name="interest" label="Which experience interests you most?" options={[["migration", "Great Migration"], ["mara", "Mara River region"], ["cats", "Big cats and year-round wildlife"], ["quiet", "Peaceful landscapes"], ["general", "General Serengeti exploration"], ["unsure", "Not sure yet"]]} />
        <PlannerSelect name="preference" label="What accommodation style do you prefer?" options={[["comfortable", "Comfortable"], ["midrange", "Mid-range"], ["luxury", "Luxury"], ["camping", "Camping"], ["unsure", "Not sure yet"]]} />
        <PlannerSelect name="traveler" label="Who is travelling?" options={[["solo", "Solo"], ["couple", "Couple"], ["friends", "Friends"], ["family", "Family"], ["group", "Group"]]} />
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest">Show my starting point <ArrowRight aria-hidden="true" size={17} /></button>
      </form>
      <div aria-live="polite" className="min-h-64 rounded-3xl bg-forest p-6 text-cream sm:p-8">
        {result ? (
          <div>
            <p className="text-eyebrow text-gold">YOUR STARTING POINT</p>
            <h3 className="mt-3 font-heading text-3xl">{result.region.name}</h3>
            <p className="mt-4 text-sm leading-6 text-cream/85">{result.explanation}</p>
            <p className="mt-4 text-sm leading-6"><strong className="text-gold">Stay style:</strong> {result.style}</p>
            <p className="mt-3 text-sm leading-6 text-cream/85">{result.travelerNote}</p>
            <p className="mt-3 text-xs leading-5 text-cream/70">This is an educational guide, not a booking engine. It does not check rooms, availability or prices. Our team can help compare options once your route and dates are known.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={result.region.href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-4 font-semibold text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Explore region <ArrowRight aria-hidden="true" size={15} /></Link>
              <Link href="/plan-your-safari?type=Safari" className="inline-flex min-h-11 items-center rounded-full border border-white/50 px-4 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Request a tailor-made proposal</Link>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-52 flex-col justify-center">
            <p className="text-eyebrow text-gold">A USEFUL PLACE TO BEGIN</p>
            <h3 className="mt-3 font-heading text-3xl">Match your stay to your journey</h3>
            <p className="mt-4 text-sm leading-6 text-cream/80">Choose your dates, interests, accommodation style and travel party. The guide will suggest a region to discuss, not a property or live availability.</p>
          </div>
        )}
        {result ? <button type="button" onClick={reset} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cream underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"><RotateCcw aria-hidden="true" size={15} /> Reset planner</button> : null}
      </div>
    </div>
  );
}

function PlannerSelect({ name, label, options }: { name: string; label: string; options: [string, string][] }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-earth">
      {label}
      <select required name={name} defaultValue="" className="min-h-12 rounded-xl border border-sand bg-cream px-4 font-normal text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
        <option value="" disabled>Select an option</option>
        {options.map(([value, title]) => <option key={value} value={value}>{title}</option>)}
      </select>
    </label>
  );
}
