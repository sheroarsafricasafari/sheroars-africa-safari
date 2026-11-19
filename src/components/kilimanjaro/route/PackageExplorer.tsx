"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import AltitudeProfile from "@/components/kilimanjaro/AltitudeProfile";
import InclusionsExclusions from "@/components/inner/InclusionsExclusions";
import { getPrice, profileOf, resolveDays, SEASON_LABELS, TIER_COPY, INCLUSIONS_COMMON, EXCLUSIONS_COMMON } from "@/data/kilimanjaro-packages";
import type { GroupSize, KiliPackage, RouteSlug, SeasonKey, TierKey } from "@/data/kilimanjaro-packages";
import { siteConfig } from "@/data/site";
import AnimatedPrice from "./AnimatedPrice";
import DayCard from "./DayCard";

const GROUPS: GroupSize[] = [1, 2, 4, 6];

function isGroupSize(value: number): value is GroupSize {
  return GROUPS.includes(value as GroupSize);
}

export default function PackageExplorer({
  route,
  packages,
  routeName,
  whatsappHref,
}: {
  route: RouteSlug;
  packages: KiliPackage[];
  routeName: string;
  whatsappHref: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const recommended = packages.find((pkg) => pkg.recommended) ?? packages[0];
  const [days, setDays] = useState<number>(() => {
    const requested = Number(searchParams.get("days"));
    return packages.some((pkg) => pkg.days === requested) ? requested : recommended?.days ?? 7;
  });
  const [tier, setTier] = useState<TierKey>(() => searchParams.get("tier")?.toLowerCase() === "luxury" ? "luxury" : "midRange");
  const [season, setSeason] = useState<SeasonKey>(() => searchParams.get("season") === "green" ? "green" : "peak");
  const [group, setGroup] = useState<GroupSize>(() => {
    const requested = Number(searchParams.get("group"));
    return isGroupSize(requested) ? requested : 2;
  });
  const [allOpen, setAllOpen] = useState<boolean | null>(null);

  const pkg = packages.find((item) => item.days === days);
  const resolved = useMemo(() => pkg ? resolveDays(pkg) : [], [pkg]);
  if (!pkg) {
    return (
      <div role="status" className="rounded-3xl border border-sand bg-white p-6 text-earth">
        <h3 className="font-heading text-2xl">Package details are being prepared</h3>
        <p className="mt-2 leading-6 text-muted">Contact us and we will help you plan this climb.</p>
        <a className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline" href={siteConfig.whatsappUrlWithMessage(`Hello She Roars, I would like help planning the ${routeName} route.`)}>Ask us on WhatsApp <ArrowRight aria-hidden="true" size={16} /></a>
      </div>
    );
  }

  const perPerson = getPrice(pkg, tier, season, group);
  const total = perPerson * group;
  const requestHref = `/book?type=kilimanjaro&route=${route}&package=${pkg.slug}&tier=${tier}&group=${group}&season=${season}`;
  const whatsappUrl = `${whatsappHref}?text=${encodeURIComponent(`Hello She Roars, I am interested in the ${pkg.name} (${TIER_COPY[tier].name}) for ${group} traveller${group > 1 ? "s" : ""} in ${SEASON_LABELS[season].name.toLowerCase()}. Please send me a quote.`)}`;

  const syncUrl = (nextDays: number, nextTier: TierKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", String(nextDays));
    params.set("tier", nextTier === "luxury" ? "luxury" : "midrange");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setDayCount = (nextDays: number) => {
    setDays(nextDays);
    setAllOpen(null);
    syncUrl(nextDays, tier);
  };
  const setComfort = (nextTier: TierKey) => {
    setTier(nextTier);
    syncUrl(days, nextTier);
  };

  const pricePanel = (
    <div className="rounded-3xl bg-earth p-5 text-white md:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-gold">Your price</p>
      <p className="mt-2 font-heading text-4xl sm:text-5xl">
        <AnimatedPrice value={perPerson} /> <span className="font-body text-base font-normal text-white/80">per person</span>
      </p>
      <p className="mt-2 text-sm text-white/80">Total for {group} traveller{group > 1 ? "s" : ""}: <AnimatedPrice value={total} /></p>
      {group === 1 ? <p className="mt-1 text-xs text-white/70">Solo price includes the single supplement.</p> : null}
      <p className="mt-3 text-xs leading-5 text-white/70">Prices are per person, based on the group size and season you choose, and are confirmed in your written quote.</p>
      <div className="mt-4 grid gap-2">
        <Link href={requestHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Request this climb</Link>
        <a href={whatsappUrl} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">WhatsApp about this package</a>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-10">
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="space-y-6 rounded-3xl border border-sand bg-white p-5 shadow-card md:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta">1. Days on the mountain</p>
            <LayoutGroup id={`kilimanjaro-days-${route}`}>
              <div role="group" aria-label="Days on the mountain" className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-sand/60 p-1">
                {packages.map((option) => {
                  const dayCount = option.days;
                  return (
                    <button
                      key={dayCount}
                      type="button"
                      aria-pressed={days === dayCount}
                      onClick={() => setDayCount(dayCount)}
                      className="relative min-h-12 rounded-xl px-2 text-sm font-medium text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
                    >
                      {days === dayCount ? <motion.span layoutId="kilimanjaro-day-pill" className="absolute inset-0 rounded-xl bg-white shadow" transition={{ type: "spring", stiffness: 400, damping: 32 }} /> : null}
                      <span className="relative">{dayCount} days{option?.recommended ? <span className="ml-1 inline-block size-2 rounded-full bg-gold align-middle" aria-label="Recommended" /> : null}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta">2. Comfort level</p>
            <div role="group" aria-label="Comfort level" className="mt-3 grid grid-cols-2 gap-2">
              {(["midRange", "luxury"] as TierKey[]).map((level) => (
                <button key={level} type="button" aria-pressed={tier === level} onClick={() => setComfort(level)} className={`min-h-12 rounded-xl border px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${tier === level ? "border-gold bg-gold/15 text-earth" : "border-sand text-muted"}`}>
                  {TIER_COPY[level].name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{TIER_COPY[tier].tagline}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta">3. Travellers</p>
            <div role="group" aria-label="Travellers" className="mt-3 flex flex-wrap gap-2">
              {GROUPS.map((size) => <button key={size} type="button" aria-pressed={group === size} onClick={() => setGroup(size)} className={`min-h-11 min-w-14 rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${group === size ? "border-gold bg-gold/15 font-semibold text-earth" : "border-sand text-muted"}`}>{size === 1 ? "Solo" : size}</button>)}
            </div>
            <a href={`${whatsappHref}?text=${encodeURIComponent(`Hello She Roars, we are a group of 7 or more and would like a ${routeName} Kilimanjaro quote.`)}`} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-terracotta underline">7 or more? Ask us</a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta">4. Season</p>
            <div role="group" aria-label="Season" className="mt-3 grid grid-cols-2 gap-2">
              {(["peak", "green"] as SeasonKey[]).map((seasonKey) => <button key={seasonKey} type="button" aria-pressed={season === seasonKey} onClick={() => setSeason(seasonKey)} className={`min-h-12 rounded-xl border px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${season === seasonKey ? "border-gold bg-gold/15 font-semibold text-earth" : "border-sand text-muted"}`}>{SEASON_LABELS[seasonKey].name}</button>)}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{SEASON_LABELS[season].when}. {SEASON_LABELS[season].note}</p>
          </div>
          <div className="hidden lg:block">{pricePanel}</div>
        </div>
      </aside>

      <div className="min-w-0">
        <AnimatePresence mode="wait">
          <motion.div key={`${pkg.slug}-${tier}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            <div className="flex flex-wrap items-center gap-2">
              {pkg.recommended ? <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-earth">Our recommendation</span> : null}
              <span className="rounded-full border border-sand px-3 py-1 text-xs text-earth">{pkg.days} days</span>
              <span className="rounded-full border border-sand px-3 py-1 text-xs text-earth">{pkg.accommodation}</span>
              <span className="rounded-full border border-sand px-3 py-1 text-xs text-earth">{pkg.pace} pace</span>
            </div>
            <h3 className="mt-3 font-heading text-3xl text-earth md:text-4xl">{pkg.name}</h3>
            <p className="mt-2 text-lg leading-7 text-earth">{pkg.tagline}</p>
            <p className="mt-4 max-w-[68ch] leading-7 text-muted">{pkg.hook}</p>
            <p className="mt-3 text-sm leading-6 text-muted"><strong className="text-earth">Summit chances:</strong> {pkg.successNote}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{pkg.bestFor.map((item) => <li key={item} className="rounded-full border border-sand bg-white px-3 py-2 text-sm text-earth">{item}</li>)}</ul>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{pkg.highlights.map((item) => <li key={item} className="flex gap-2 rounded-xl bg-sand/50 p-3 text-sm leading-6 text-earth"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-terracotta" />{item}</li>)}</ul>

            <h4 className="mt-10 font-heading text-2xl text-earth">Altitude profile</h4>
            <div className="mt-3 rounded-2xl border border-sand bg-white p-4">
              <AltitudeProfile profile={profileOf(pkg)} routeName={`${routeName} ${pkg.days}-day package`} />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-heading text-2xl text-earth">Your {pkg.days}-day itinerary, explained</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <button type="button" className="min-h-11 font-semibold text-terracotta underline" onClick={() => setAllOpen((value) => value === true ? false : true)}>{allOpen === true ? "Collapse all" : "Expand all"}</button>
                <button type="button" className="min-h-11 font-semibold text-terracotta underline" onClick={() => window.print()}>Print itinerary</button>
              </div>
            </div>
            <ol key={`${pkg.slug}-${allOpen}`} className="kilimanjaro-print-area relative mt-4 space-y-4 border-l-2 border-gold/50 pl-4 sm:pl-6">
              {resolved.map((day, index) => <li key={`${pkg.slug}-${day.id}-${index}`}><DayCard day={day} tier={tier} defaultOpen={allOpen === true || (allOpen === null && index === 0)} /></li>)}
            </ol>

            <div className="mt-10">
              <InclusionsExclusions
                included={[
                  ...INCLUSIONS_COMMON,
                  ...(pkg.route === "rongai" ? ["Your final night is spent in a simple mountain hut at Horombo on the Marangu trail, as required for the Rongai descent."] : []),
                  tier === "luxury" ? "Luxury camp comfort as described, private chef, private toilet tent and a summit celebration dinner" : "Mid-range camp comfort as described, with hot meals and a mess tent",
                ]}
                excluded={EXCLUSIONS_COMMON}
                footnote="Exact package inclusions are confirmed in your written quote."
              />
            </div>
            <details className="mt-8 rounded-2xl border border-sand bg-white p-5">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold text-earth">Good to know <X aria-hidden="true" className="size-4 rotate-45 text-terracotta" /></summary>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-muted">
                <li>The park minimum age is 10 years.</li>
                <li>Park fees are included in the listed package price.</li>
                <li>Typical tipping guidance is about $250 to $350 per climber for the whole crew.</li>
                <li>Travel and medical insurance must cover trekking to 6,000 m and emergency evacuation.</li>
                <li>Gear rental can be arranged; ask us what is available for your dates.</li>
                <li>We recommend speaking with your doctor before booking.</li>
              </ul>
            </details>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-cream/95 p-3 shadow-soft backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted">Your price, per person</p>
            <p className="font-semibold text-earth"><AnimatedPrice value={perPerson} /></p>
          </div>
          <Link href={requestHref} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-terracotta px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth">Request quote <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
