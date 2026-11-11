"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import type { Stay, StayTier } from "@/data/ngorongoro-stays";
import { stayMatcherQuestions, stayRegionLabels, stayTierLabels, stayTierSummaries, stayZoneLabels } from "@/data/ngorongoro-stays";
import type { ngorongoroStayPage } from "@/data/ngorongoro-stay-page";

type MatcherDimension = "rim" | "karatu" | "camping" | "mid-range" | "luxury" | "upgrade";
type MatcherOption = { label: string; weights: Partial<Record<MatcherDimension, number>> };
type StayGridCopy = typeof ngorongoroStayPage.stayGrid;
type MatcherCopy = typeof ngorongoroStayPage.matcher;

function tierLabel(tier: StayTier) {
  return stayTierLabels[tier];
}

function PropertyCard({ stay, copy }: { stay: Stay; copy: StayGridCopy }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-white shadow-card">
      <div className="img-zoom relative aspect-[4/3] bg-sand">
        <SmartImage src={stay.image.src} alt={stay.image.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover motion-reduce:group-hover:scale-100" />
        <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-cream">{stay.type}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">{tierLabel(stay.tier)} · {stay.zone ? stayZoneLabels[stay.zone] : stayRegionLabels[stay.region]}</p>
        <h3 className="mt-2 font-heading text-2xl text-earth">{stay.name}</h3>
        {stay.operator ? <p className="mt-1 text-sm font-medium text-muted">{stay.operator}</p> : null}
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{stay.description}</p>
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-earth">{copy.bestForLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {stay.bestFor.map((item) => <li key={item} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-earth">{item}</li>)}
          </ul>
        </div>
        <p className="mt-4 border-t border-sand pt-4 text-xs leading-5 text-muted">{stay.seasonNote}</p>
        <p className="mt-2 text-xs font-semibold text-terracotta">{copy.orSimilarCaption}</p>
      </div>
    </article>
  );
}

export function NgorongoroStayFilters({ stays, copy }: { stays: readonly Stay[]; copy: StayGridCopy }) {
  const [tier, setTier] = useState<StayTier | "all">("all");
  const [zone, setZone] = useState<"all" | "rim" | "karatu">("all");

  const visibleStays = stays.filter((stay) => {
    const matchesTier = tier === "all" || stay.tier === tier;
    const matchesZone = zone === "all"
      || (zone === "rim" && stay.region === "ngorongoro-rim")
      || (zone === "karatu" && stay.region === "karatu");
    return matchesTier && matchesZone;
  });
  const tiers: (StayTier | "all")[] = ["all", "camping", "mid-range", "luxury", "upgrade"];
  const zones: ("all" | "rim" | "karatu")[] = ["all", "rim", "karatu"];

  return (
    <div>
      <div className="space-y-4 rounded-3xl border border-sand bg-cream p-5 sm:p-6">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{copy.filter.tierLabel}</p>
          <div role="group" aria-label={copy.filter.tierLabel} className="flex flex-wrap gap-2">
            {tiers.map((item) => (
              <button key={item} type="button" aria-pressed={tier === item} onClick={() => setTier(item)} className="min-h-11 rounded-full border border-sand bg-white px-4 text-sm font-semibold text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-white">
                {item === "all" ? copy.filter.allLabel : tierLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{copy.filter.zoneLabel}</p>
          <div role="group" aria-label={copy.filter.zoneLabel} className="flex flex-wrap gap-2">
            {zones.map((item) => (
              <button key={item} type="button" aria-pressed={zone === item} onClick={() => setZone(item)} className="min-h-11 rounded-full border border-sand bg-white px-4 text-sm font-semibold text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-white">
                {item === "all" ? copy.filter.allLabel : item === "rim" ? copy.filter.rimLabel : copy.filter.karatuLabel}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-4">
          <p aria-live="polite" className="text-sm font-semibold text-earth">{visibleStays.length} {visibleStays.length === 1 ? copy.filter.countOne : copy.filter.countMany}</p>
          <button type="button" onClick={() => { setTier("all"); setZone("all"); }} className="min-h-11 rounded-full px-4 text-sm font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{copy.filter.clearLabel}</button>
        </div>
      </div>
      {visibleStays.length > 0 ? (
        <div className="mt-7 space-y-10">
          {(["camping", "mid-range", "luxury", "upgrade"] as const).map((currentTier) => {
            const group = visibleStays.filter((stay) => stay.tier === currentTier);
            if (!group.length) return null;
            const summary = stayTierSummaries[currentTier];
            return (
              <section key={currentTier} aria-labelledby={`stays-${currentTier}-heading`}>
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{summary.title}</p>
                  <h3 id={`stays-${currentTier}-heading`} className="mt-2 font-heading text-2xl text-earth">{summary.description}</h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {group.map((stay) => <PropertyCard key={stay.slug} stay={stay} copy={copy} />)}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="mt-7 rounded-2xl bg-sand p-6 text-center text-muted">{copy.filter.empty}</p>
      )}
    </div>
  );
}

function matchResult(answers: Record<string, string>, stays: readonly Stay[]) {
  const selected: MatcherOption[] = stayMatcherQuestions.flatMap((question) => {
    const label = answers[question.id];
    const option = question.options.find((item) => item.label === label);
    return option ? [option] : [];
  });

  const score: Record<MatcherDimension, number> = {
    rim: 0,
    karatu: 0,
    camping: 0,
    "mid-range": 0,
    luxury: 0,
    upgrade: 0,
  };
  const dimensions: MatcherDimension[] = ["rim", "karatu", "camping", "mid-range", "luxury", "upgrade"];
  for (const option of selected) {
    for (const dimension of dimensions) {
      score[dimension] += option.weights[dimension] ?? 0;
    }
  }

  const location: "rim" | "karatu" | "either" = score.rim > score.karatu
    ? "rim"
    : score.karatu > score.rim
      ? "karatu"
      : "either";
  const tier: StayTier = score.camping >= score["mid-range"] && score.camping >= score.luxury && score.camping >= score.upgrade
    ? "camping"
    : score["mid-range"] >= score.luxury && score["mid-range"] >= score.upgrade
      ? "mid-range"
      : score.upgrade > score.luxury
        ? "upgrade"
        : "luxury";
  const nearbyStays = stays.filter((stay) => (
    location === "either"
      || (location === "rim" && stay.region === "ngorongoro-rim")
      || (location === "karatu" && stay.region === "karatu")
  ));
  const matching = nearbyStays.filter((stay) => stay.tier === tier);
  const recommendations = [
    ...matching,
    ...nearbyStays.filter((stay) => stay.tier !== tier),
  ].slice(0, 3);

  return { location, tier, recommendations };
}

export function NgorongoroStayMatcher({ stays, copy }: { stays: readonly Stay[]; copy: MatcherCopy }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const completed = stayMatcherQuestions.every((question) => answers[question.id]);
  const result = completed ? matchResult(answers, stays) : null;

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {stayMatcherQuestions.map((question, index) => (
          <fieldset key={question.id} className="rounded-3xl border border-sand bg-white p-5 shadow-sm sm:p-7">
            <legend className="mb-4 block font-heading text-xl text-earth"><span className="mr-2 text-sm font-bold text-terracotta">0{index + 1}</span>{question.title}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((option) => (
                <button key={option.label} type="button" aria-pressed={answers[question.id] === option.label} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.label }))} className="min-h-12 rounded-xl border border-sand px-4 py-3 text-left text-sm font-medium text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-white">
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-6">
        {result ? (
          <section aria-labelledby="stay-matcher-result-title" className="rounded-[2rem] border border-forest/15 bg-forest p-6 text-white shadow-lift sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{copy.resultEyebrow}</p>
            <h3 id="stay-matcher-result-title" className="mt-3 font-heading text-3xl text-white">
              {result.location === "either" ? copy.eitherLabel : result.location === "rim" ? copy.rimLabel : copy.karatuLabel}
            </h3>
            <p className="mt-2 text-sm leading-6 text-cream/85">{copy.recommendationLabel.replace("{tier}", tierLabel(result.tier).toLowerCase())}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {result.recommendations.map((stay) => (
                <article key={stay.slug} className="overflow-hidden rounded-2xl bg-white text-earth">
                  <div className="relative aspect-[4/3] bg-sand">
                    <SmartImage src={stay.image.src} alt={stay.image.alt} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{tierLabel(stay.tier)} · {stay.zone ? stayZoneLabels[stay.zone] : stayRegionLabels[stay.region]}</p>
                    <h4 className="mt-2 font-heading text-xl">{stay.name}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">{stay.description}</p>
                    <p className="mt-3 text-xs font-semibold text-terracotta">{copy.orSimilarCaption}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={copy.askHref} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-forest hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                {copy.askButton} <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <button type="button" onClick={() => setAnswers({})} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                <RotateCcw aria-hidden="true" size={16} /> {copy.restartButton}
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

export function StayElevationDiagram({ label, description }: { label: string; description: string }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <figure className="rounded-3xl border border-white/15 bg-white/5 p-4 sm:p-6">
      <svg role="img" aria-labelledby="stay-elevation-title stay-elevation-desc" viewBox="0 0 900 330" className="w-full">
        <title id="stay-elevation-title">{label}</title>
        <desc id="stay-elevation-desc">{description}</desc>
        <motion.path d="M25 260 155 258 255 180 360 112 430 90 500 135 600 205 730 239 870 250" fill="none" stroke="#d9a441" strokeWidth="8" strokeLinecap="round" initial={reducedMotion ? false : { pathLength: 0 }} whileInView={reducedMotion ? undefined : { pathLength: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.5, ease: "easeOut" }} />
        <path d="M25 260 155 258 255 180 360 112 430 90 500 135 600 205 730 239 870 250V310H25Z" fill="#6d8c71" opacity=".8" />
        <path d="M350 280 420 258 470 267 530 245 590 260 640 248V310H350Z" fill="#6d9da2" opacity=".9" />
        <path d="M600 205 700 225 870 250" fill="none" stroke="#fbf6ee" strokeWidth="3" strokeDasharray="9 10" />
        <g fill="#fbf6ee" stroke="#d9a441" strokeWidth="3">
          <circle cx="380" cy="106" r="10" /><circle cx="435" cy="95" r="10" /><circle cx="490" cy="126" r="10" />
          <circle cx="705" cy="226" r="9" /><circle cx="752" cy="237" r="9" /><circle cx="800" cy="244" r="9" />
        </g>
        <g fill="#fbf6ee" fontFamily="sans-serif" fontSize="18" fontWeight="600">
          <text x="50" y="292">Crater floor</text>
          <text x="340" y="56">Rim, lodges and gate</text>
          <text x="685" y="292">Karatu highlands and farms</text>
          <text x="645" y="188">A drive to the gate</text>
        </g>
        <path d="M155 256 225 208" stroke="#fbf6ee" strokeWidth="2" markerEnd="url(#stay-arrow)" />
        <defs>
          <marker id="stay-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#fbf6ee" /></marker>
        </defs>
      </svg>
      <figcaption className="mt-3 text-center text-sm leading-6 text-cream/80">{label}. {description}</figcaption>
    </figure>
  );
}
