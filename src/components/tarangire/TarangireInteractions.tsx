"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { Stay, StayTier } from "@/data/ngorongoro-stays";
import type { TarangireStay, TarangireStayArea, TarangireStayLabels, TarangireStayWeights } from "@/data/tarangire-stays";
import { tarangireStayPage } from "@/data/tarangire-stays";
import type { tarangirePage } from "@/data/tarangire";
import type { tarangireElephantsPage } from "@/data/tarangire-elephants-baobabs";

type BaobabPart = (typeof tarangireElephantsPage.baobab.parts)[number];
type YearData = typeof tarangirePage.year;
type YearSeason = YearData["seasons"][number];
type StayZone = "all" | "in-park" | "park-edge";
type StayTierFilter = "all" | "mid-range" | "luxury" | "upgrade";
type StayFinderQuestion = (typeof tarangireStayPage.finder.questions)[number];
type StayFinderOption = StayFinderQuestion["options"][number];

function PropertyCard({ stay, labels }: { stay: Stay; labels: TarangireStayLabels }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-white shadow-card">
      <div className="img-zoom relative aspect-[4/3] bg-sand">
        <SmartImage src={stay.image.src} alt={stay.image.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover motion-reduce:group-hover:scale-100" />
        <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-cream">{stay.type}</span>
        <span className="absolute bottom-4 right-4 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-earth">{stay.zone ? labels.placeLabels[stay.zone] : labels.placeLabels[stay.region]}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">{labels.tierLabels[stay.tier]}</p>
        <h3 className="mt-2 font-heading text-2xl text-earth">{stay.name}</h3>
        {stay.operator ? <p className="mt-1 text-sm font-medium text-muted">{stay.operator}</p> : null}
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{stay.description}</p>
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-earth">{labels.bestForLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {stay.bestFor.map((item) => <li key={item} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-earth">{item}</li>)}
          </ul>
        </div>
        <p className="mt-4 border-t border-sand pt-4 text-xs font-semibold text-terracotta">{labels.orSimilarCaption}</p>
      </div>
    </article>
  );
}

export function BaobabAnatomy({ parts, label, description, ageLabel, ageText, caption }: {
  parts: readonly BaobabPart[];
  label: string;
  description: string;
  ageLabel: string;
  ageText: string;
  caption: string;
}) {
  const [selectedId, setSelectedId] = useState(parts[0]?.id ?? "");
  const selected = parts.find((part) => part.id === selectedId) ?? parts[0];
  const reducedMotion = useReducedMotion();

  if (!selected) return null;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <figure className="overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#d6a64a] via-[#80613f] to-[#30251d] p-4 sm:p-7">
          <div className="relative mx-auto aspect-[19/13] w-full max-w-[760px]">
            <svg role="group" aria-label={label} viewBox="0 0 760 520" className="absolute inset-0 size-full">
              <title>{label}</title>
              <desc>{description}</desc>
              <path d="M66 438C212 408 317 441 412 415C520 385 625 407 706 432V500H66Z" fill="#584632" />
              <motion.path
                d="M348 420C350 358 340 297 344 239C346 200 337 158 360 134C382 112 421 115 442 136C469 163 447 203 424 239C405 269 412 348 421 420Z"
                fill="#5a4030"
                initial={reducedMotion ? false : { pathLength: 0 }}
                whileInView={reducedMotion ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                stroke="#906b46"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <motion.path
                d="M382 147C362 102 318 84 279 54M394 135C400 90 437 65 452 28M422 148C465 103 518 103 568 76M360 159C322 135 285 139 244 124M439 166C487 150 533 170 570 203"
                fill="none"
                stroke="#5a4030"
                strokeWidth="20"
                strokeLinecap="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                whileInView={reducedMotion ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              />
              <g fill="#4a633d">
                <ellipse cx="278" cy="55" rx="22" ry="15" /><ellipse cx="453" cy="31" rx="21" ry="15" />
                <ellipse cx="568" cy="77" rx="23" ry="16" /><ellipse cx="244" cy="124" rx="20" ry="14" />
              </g>
              <path d="M496 253C522 235 541 251 534 276C528 296 507 306 490 286Z" fill="#bd7d3c" stroke="#f1ca78" strokeWidth="4" />
              <path d="M351 297C368 284 389 285 405 297V336C388 328 368 330 351 339Z" fill="#211d18" stroke="#c29559" strokeWidth="4" />
              <path d="M548 178C563 155 582 158 590 177C594 192 580 202 564 200Z" fill="#f3e5b7" />
              <g fill="#fbf6ee" stroke="#d9a441" strokeWidth="4">
                {parts.map((part) => <circle key={part.id} cx={part.x * 7.6} cy={part.y * 5.2} r={selectedId === part.id ? 17 : 12} fill={selectedId === part.id ? "#b5532f" : "#1f3d2b"} />)}
              </g>
            </svg>
            {parts.map((part) => (
              <button
                key={part.id}
                type="button"
                aria-label={part.label}
                aria-pressed={selectedId === part.id}
                onClick={() => setSelectedId(part.id)}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                className="absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-forest/60 text-transparent hover:bg-terracotta/70 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold aria-pressed:bg-terracotta/80"
              >
                <span className="sr-only">{part.label}</span>
              </button>
            ))}
          </div>
          <figcaption className="mt-2 rounded-xl bg-earth/70 px-4 py-3 text-sm text-cream">{description}</figcaption>
        </figure>
        <div>
          <article aria-live="polite" aria-atomic="true" className="min-h-44 rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{selected.label}</p>
            <p className="mt-3 leading-7 text-cream/90">{selected.text}</p>
          </article>
          <ol aria-label={label} className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {parts.map((part, index) => (
              <li key={part.id}>
                <button
                  type="button"
                  aria-pressed={selectedId === part.id}
                  onClick={() => setSelectedId(part.id)}
                  className="flex min-h-12 w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm leading-6 text-cream/90 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold aria-pressed:bg-white/10"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">{index + 1}</span>
                  <span><strong className="block text-white">{part.label}</strong>{part.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <aside className="mt-8 grid gap-4 rounded-3xl border border-gold/35 bg-white/5 p-6 text-center sm:grid-cols-[auto_1fr] sm:items-center sm:text-left">
        <p className="font-heading text-2xl text-gold">{ageLabel}</p>
        <p className="leading-7 text-cream/85">{ageText} {caption}</p>
      </aside>
    </>
  );
}

export function TarangireYear({ data }: { data: YearData }) {
  const [selectedIndex, setSelectedIndex] = useState(5);
  const activeMonth = data.months[selectedIndex];
  const activeSeason = data.seasons.find((season) => season.id === activeMonth?.season);

  const selectSeason = (season: YearSeason) => {
    const index = data.months.findIndex((month) => month.season === season.id);
    if (index >= 0) setSelectedIndex(index);
  };

  return (
    <div>
      <label htmlFor="tarangire-month-range" className="sr-only">{data.monthRangeLabel}</label>
      <input
        id="tarangire-month-range"
        type="range"
        min="0"
        max={data.months.length - 1}
        value={selectedIndex}
        onChange={(event) => setSelectedIndex(Number(event.target.value))}
        className="h-11 w-full cursor-pointer accent-gold"
      />
      <div role="group" aria-label={data.monthGroupLabel} className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
        {data.months.map((month, index) => (
          <button
            key={month.fullName}
            type="button"
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            className="min-h-14 rounded-xl border border-white/20 px-2 py-2 text-center text-sm text-cream hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-earth"
          >
            <span className="block font-bold">{month.name}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-wider">{month.label}</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-6 grid gap-3 sm:grid-cols-2">
        {data.seasons.map((season) => (
          <button
            key={season.id}
            type="button"
            aria-pressed={activeSeason?.id === season.id}
            onClick={() => selectSeason(season)}
            className="min-h-32 rounded-2xl border border-white/15 bg-white/5 p-5 text-left hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold aria-pressed:border-gold aria-pressed:bg-white/10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{season.label}</span>
            <span className="mt-2 block font-heading text-xl text-white">{season.title}</span>
            <span className="mt-2 block text-sm leading-6 text-cream/80">{season.text}</span>
          </button>
        ))}
      </div>
      {activeMonth ? (
        <p className="mt-5 text-center text-sm font-semibold text-gold">{activeMonth.fullName}: {activeMonth.label}</p>
      ) : null}
      <p className="mt-6 text-center text-sm leading-7 text-cream/85">{data.advice}</p>
    </div>
  );
}

export function StayZonesDiagram({ data }: { data: typeof tarangireStayPage.zones }) {
  const [selectedId, setSelectedId] = useState<TarangireStayArea>(data.items[0].id);
  const active = data.items.find((item) => item.id === selectedId) ?? data.items[0];
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <figure className="overflow-hidden rounded-3xl border border-white/15 bg-[#274831] p-4 sm:p-7">
        <div className="relative aspect-[45/22] w-full">
          <svg role="group" aria-label={data.diagramLabel} viewBox="0 0 900 440" className="absolute inset-0 size-full">
            <title>{data.diagramLabel}</title>
            <desc>{data.diagramDescription}</desc>
            <path d="M40 100C182 55 289 76 386 103C494 134 581 80 860 95V355C657 330 579 365 425 340C274 316 174 365 40 329Z" fill="#5c7651" />
            <path d="M110 245C203 196 292 211 385 248S570 289 765 229" fill="none" stroke="#72a9a0" strokeWidth="30" strokeLinecap="round" />
            <path d="M40 96C197 127 279 91 405 135S640 176 859 109" fill="none" stroke="#d9a441" strokeWidth="4" strokeDasharray="12 12" />
            <path d="M614 274C654 245 716 254 764 289C729 318 663 324 614 274Z" fill="#83a6a0" />
            <motion.path
              d="M89 386C226 370 279 394 399 381S622 389 825 360"
              fill="none"
              stroke="#fbf6ee"
              strokeWidth="4"
              strokeDasharray="10 10"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={reducedMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <g fill="#d9a441" stroke="#fbf6ee" strokeWidth="3">
              <circle cx="286" cy="172" r="13" /><circle cx="512" cy="158" r="13" /><circle cx="762" cy="199" r="13" />
            </g>
            <g fill="#fbf6ee" fontFamily="sans-serif" fontSize="18" fontWeight="600">
              <text x="74" y="188">{data.mapLabels.north}</text>
              <text x="170" y="292">{data.mapLabels.park}</text>
              <text x="520" y="124">{data.mapLabels.baobabZone}</text>
              <text x="303" y="228">{data.mapLabels.river}</text>
              <text x="80" y="320">{data.mapLabels.south}</text>
              <text x="663" y="241">{data.mapLabels.swamp}</text>
              <text x="342" y="424">{data.mapLabels.drive}</text>
            </g>
          </svg>
          {data.items.map((item, index) => {
            const x = [286, 512, 762][index] ?? 286;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
                style={{ left: `${(x / 900) * 100}%`, top: `${(174 / 440) * 100}%` }}
                className="absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-cream bg-terracotta text-sm font-bold text-white aria-pressed:bg-gold aria-pressed:text-earth focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <figcaption className="mt-2 rounded-xl bg-white/10 px-4 py-3 text-sm leading-6 text-cream/85">{data.diagramDescription}</figcaption>
      </figure>
      <div>
        <article aria-live="polite" aria-atomic="true" className="min-h-44 rounded-3xl border border-white/15 bg-white/10 p-6 text-cream sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{active.title}</p>
          <p className="mt-3 leading-7 text-cream/85">{active.why}</p>
          <p className="mt-3 text-sm leading-6 text-cream/75">{active.know}</p>
          <p className="mt-3 text-sm font-semibold text-white">{data.bestForLabel} {active.bestFor}</p>
        </article>
        <ol className="mt-4 grid gap-2">
          {data.items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
                className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-cream hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold aria-pressed:bg-white/10"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-earth">{index + 1}</span>{item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function scoreStays(answers: Record<string, string>, stays: readonly Stay[], questions: readonly StayFinderQuestion[]) {
  const selected: StayFinderOption[] = questions.flatMap((question) => {
    const option = question.options.find((item) => item.label === answers[question.id]);
    return option ? [option] : [];
  });
  const stayScores: Record<string, number> = {};
  const areaScores: Record<TarangireStayArea, number> = { "in-park": 0, "park-edge": 0, karatu: 0 };
  const tierScores: Record<StayTier, number> = { camping: 0, "mid-range": 0, luxury: 0, upgrade: 0 };

  selected.forEach((option) => {
    const weights = option.weights as TarangireStayWeights;
    for (const [slug, score] of Object.entries(weights.stays ?? {})) {
      stayScores[slug] = (stayScores[slug] ?? 0) + score;
    }
    for (const [area, score] of Object.entries(weights.area ?? {})) {
      const key = area as TarangireStayArea;
      areaScores[key] += score;
    }
    for (const [tier, score] of Object.entries(weights.tier ?? {})) {
      const key = tier as StayTier;
      tierScores[key] += score;
    }
  });

  const preferredArea = (["in-park", "park-edge", "karatu"] as const)
    .reduce((best, current) => areaScores[current] > areaScores[best] ? current : best, "in-park");
  const preferredTier = (["mid-range", "luxury", "upgrade", "camping"] as const)
    .reduce((best, current) => tierScores[current] > tierScores[best] ? current : best, "mid-range");
  const rankedStays = stays
    .map((stay, index) => ({
      stay,
      index,
      score: (stayScores[stay.slug] ?? 0)
        + Number(preferredArea === "in-park" && stay.zone === "in-park")
        + Number(preferredArea === "park-edge" && stay.zone === "park-edge")
        + Number(preferredArea === "karatu" && stay.region === "karatu")
        + Number(stay.tier === preferredTier),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map(({ stay }) => stay);

  return { preferredArea, preferredTier, stays: rankedStays };
}

export function TarangireStayFinder({ questions, stays, karatuStays, copy }: {
  questions: readonly StayFinderQuestion[];
  stays: readonly TarangireStay[];
  karatuStays: readonly Stay[];
  copy: typeof tarangireStayPage.finder;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const completed = questions.every((question) => Boolean(answers[question.id]));
  const availableStays = useMemo(() => [...stays, ...karatuStays], [stays, karatuStays]);
  const result = useMemo(() => completed ? scoreStays(answers, availableStays, questions) : null, [answers, availableStays, completed, questions]);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {questions.map((question, index) => (
          <fieldset key={question.id} className="rounded-3xl border border-sand bg-white p-5 shadow-sm sm:p-7">
            <legend className="mb-4 block font-heading text-xl text-earth"><span className="mr-2 text-sm font-bold text-terracotta">0{index + 1}</span>{question.title}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={answers[question.id] === option.label}
                  onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.label }))}
                  className="min-h-12 rounded-xl border border-sand px-4 py-3 text-left text-sm font-medium text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-6">
        {result ? (
          <section aria-labelledby="tarangire-stay-result-heading" className="rounded-[2rem] border border-forest/15 bg-forest p-6 text-white shadow-lift sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{copy.resultTitle}</p>
            <h3 id="tarangire-stay-result-heading" className="mt-3 font-heading text-3xl text-white">
              {copy.areaLabels[result.preferredArea]} · {tarangireStayPage.shortlist.tierLabels[result.preferredTier]}
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {result.stays.map((stay) => <PropertyCard key={stay.slug} stay={stay} labels={tarangireStayPage.shortlist} />)}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={copy.askHref} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-forest hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                {copy.resultButton}<ArrowRight aria-hidden="true" size={16} />
              </Link>
              <button type="button" onClick={() => setAnswers({})} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                <RotateCcw aria-hidden="true" size={16} />{copy.restartButton}
              </button>
            </div>
          </section>
        ) : (
          <p className="rounded-2xl bg-sand/60 p-4 text-center text-sm text-muted">{copy.incomplete}</p>
        )}
      </div>
    </div>
  );
}

function FilterButtons<T extends string>({ label, value, options, onChange, getLabel }: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  getLabel: (value: T) => string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className="min-h-11 rounded-full border border-sand bg-white px-4 text-sm font-semibold text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-white"
          >
            {getLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TgStayGrid({ stays, copy }: {
  stays: readonly TarangireStay[];
  copy: typeof tarangireStayPage.shortlist;
}) {
  const [tier, setTier] = useState<StayTierFilter>("all");
  const [zone, setZone] = useState<StayZone>("all");
  const visible = stays.filter((stay) => (
    (tier === "all" || stay.tier === tier)
    && (zone === "all" || stay.zone === zone)
  ));
  const tiers: readonly StayTierFilter[] = ["all", "mid-range", "luxury", "upgrade"];
  const zones: readonly StayZone[] = ["all", "in-park", "park-edge"];

  return (
    <div>
      <div className="space-y-4 rounded-3xl border border-sand bg-cream p-5 sm:p-6">
        <FilterButtons
          label={copy.filters.styleLabel}
          value={tier}
          options={tiers}
          onChange={setTier}
          getLabel={(value) => value === "all" ? copy.filters.allLabel : value === "mid-range" ? copy.filters.midRangeLabel : value === "luxury" ? copy.filters.luxuryLabel : copy.filters.upgradeLabel}
        />
        <FilterButtons
          label={copy.filters.zoneLabel}
          value={zone}
          options={zones}
          onChange={setZone}
          getLabel={(value) => value === "all" ? copy.filters.allLabel : value === "in-park" ? copy.filters.inParkLabel : copy.filters.parkEdgeLabel}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-4">
          <p aria-live="polite" className="text-sm font-semibold text-earth">{visible.length} {visible.length === 1 ? copy.filters.countOne : copy.filters.countMany}</p>
          <button type="button" onClick={() => { setTier("all"); setZone("all"); }} className="min-h-11 rounded-full px-4 text-sm font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{copy.filters.clearLabel}</button>
        </div>
      </div>
      {visible.length ? (
        <div className="mt-7 space-y-10">
          {(["mid-range", "luxury", "upgrade"] as const).map((currentTier) => {
            const group = visible.filter((stay) => stay.tier === currentTier);
            if (!group.length) return null;
            const summary = copy.tierSummaries.find(({ tier: itemTier }) => itemTier === currentTier);
            return (
              <section key={currentTier} aria-labelledby={`tarangire-stays-${currentTier}-heading`}>
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{summary?.title}</p>
                  <h3 id={`tarangire-stays-${currentTier}-heading`} className="mt-2 max-w-3xl font-heading text-2xl text-earth">{summary?.description}</h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {group.map((stay) => <PropertyCard key={stay.slug} stay={stay} labels={copy} />)}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="mt-7 rounded-2xl bg-sand p-6 text-center text-muted">{copy.filters.empty}</p>
      )}
    </div>
  );
}
