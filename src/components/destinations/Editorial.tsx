import Link from "next/link";
import {
  Binoculars, Bird, Camera, CarFront, Clock, Compass, Crown, Heart, Leaf,
  MapPin, Mountain, PawPrint, Plane, Route, Sun, Tent, Trees,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Callout from "@/components/inner/Callout";
import ComparisonTable from "@/components/inner/ComparisonTable";
import DrawPath from "@/components/motion/DrawPath";
import CountUp from "@/components/motion/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import TiltCard from "@/components/motion/TiltCard";
import SmartImage from "@/components/ui/SmartImage";
import LikelihoodDots from "@/components/destinations/LikelihoodDots";
import type {
  DestinationFact, ExperienceData, GettingThereData, SeasonData,
  SightingData, StayTierData, TipData, WildlifeTileData,
} from "@/types/destination";

// Props: FactStrip takes facts and a footnote; PullQuote takes editorial text; SeasonGrid/SeasonCards take season data; WildlifeShowcase and SightingGuide take wildlife data; GettingThere takes two travel modes; TipsGrid and ExperienceCards take card data; StayTiers takes tiers, footnote and a destination link.
const iconMap: Record<string, LucideIcon> = {
  binoculars: Binoculars, bird: Bird, camera: Camera, car: CarFront, compass: Compass,
  clock: Clock, crown: Crown, heart: Heart, leaf: Leaf, map: MapPin, mountain: Mountain,
  paw: PawPrint, plane: Plane, route: Route, sun: Sun, tent: Tent, trees: Trees,
};

export function FactStrip({ items, footnote }: { items: DestinationFact[]; footnote: string }) {
  return (
    <div>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => <div key={item.label} className="border-l border-gold pl-4 sm:pl-5">
          <dt className="font-heading text-3xl leading-tight text-earth sm:text-4xl">
            {item.numericValue !== undefined ? <CountUp value={item.numericValue} /> : item.value}{item.suffix ?? ""}
          </dt>
          <dd className="mt-2 text-sm leading-5 text-muted">{item.label}<sup className="ml-1 text-terracotta" aria-label="Figure to be verified">*</sup></dd>
        </div>)}
      </dl>
      <p className="mt-5 text-xs leading-5 text-muted">{footnote}</p>
    </div>
  );
}

export function PullQuote({ quote }: { quote: string }) {
  return <figure className="mx-auto max-w-4xl border-l-2 border-gold py-2 pl-6 shadow-[12px_0_30px_-28px_rgba(42,31,23,.3)] sm:pl-10">
    <blockquote className="font-heading text-3xl italic leading-snug text-earth sm:text-4xl lg:text-5xl">“{quote}”</blockquote>
    <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">Our take</figcaption>
  </figure>;
}

export function SeasonGrid({ data, dark = false }: { data: SeasonData; dark?: boolean }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const color: Record<string, string> = {
    peak: "bg-gold", good: "bg-terracotta/70", quiet: dark ? "bg-white/10" : "bg-sand",
  };
  return (
    <div className={`overflow-hidden rounded-3xl border p-4 sm:p-6 ${dark ? "border-white/10 bg-white/5 text-cream" : "border-sand bg-forest text-cream"}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-x-1 border-spacing-y-2 text-xs">
          <caption className="sr-only">{data.caption ?? "Monthly wildlife, migration and weather guide"}</caption>
          <thead><tr><th scope="col" className="sticky left-0 z-10 min-w-48 bg-forest px-3 py-2 text-left">Season</th>{months.map((month) => <th key={month} scope="col" className="min-w-10 px-1 py-2 font-semibold">{month}</th>)}</tr></thead>
          <tbody>{data.rows.map((row) => <tr key={row.label}>
            <th scope="row" className={`sticky left-0 z-10 px-3 py-3 text-left font-semibold ${dark ? "bg-[#183c31]" : "bg-forest"}`}>{row.label}</th>
            {row.months.map((rating, index) => <td key={`${row.label}-${months[index]}`} className="p-1">
              <span role="img" aria-label={`${row.label}, ${months[index]}: ${rating}`} className={`block h-8 rounded-md ${color[rating]}`} />
            </td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <ul className="mt-5 flex flex-wrap gap-5 text-xs">
        {([["peak", "Peak"], ["good", "Good"], ["quiet", "Quieter"]] as const).map(([key, label]) => <li key={key} className="inline-flex items-center gap-2"><span className={`size-3 rounded-sm ${color[key]}`} />{label}</li>)}
      </ul>
    </div>
  );
}

export function SeasonCards({ items }: { items: SeasonData["cards"] }) {
  return <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {items.map((item) => { const Icon = iconMap[item.icon] ?? Sun; return <article key={item.title} className="rounded-2xl border border-sand bg-white p-5 shadow-sm">
      <Icon aria-hidden="true" className="size-5 text-terracotta" />
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-terracotta">{item.range}</p>
      <h3 className="mt-2 font-heading text-xl text-earth">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
    </article>; })}
  </div>;
}

export function WildlifeShowcase({ items, note }: { items: WildlifeTileData[]; note: string }) {
  return (
    <>
      <div className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => <article key={item.name} className={`group relative isolate overflow-hidden rounded-2xl bg-forest text-white ${item.featured ? "sm:col-span-2 sm:row-span-2" : ""}`}>
          <SmartImage src={item.image} alt={item.name} sizes={item.featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"} fill className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="inline-flex rounded-full border border-white/35 bg-forest/70 px-3 py-1 text-xs backdrop-blur">{item.likelihood}</span>
            <h3 className="mt-3 font-heading text-2xl">{item.name}</h3>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/85">{item.description}</p>
          </div>
        </article>)}
      </div>
      <Callout variant="note" title="A note on sightings" className="mt-7">{note}</Callout>
    </>
  );
}

export function SightingGuide({ items }: { items: SightingData[] }) {
  return <div className="overflow-hidden rounded-3xl border border-sand bg-white">
    <ul className="divide-y divide-sand">
      {items.map((item) => <li key={item.name} className="grid min-w-0 gap-3 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(110px,150px)_minmax(0,1.2fr)_minmax(0,1fr)] sm:items-center sm:px-7">
        <h3 className="min-w-0 break-words font-heading text-xl text-earth">{item.name}</h3>
        {item.outlook ? <span className="inline-flex min-h-8 max-w-full items-center whitespace-normal break-words rounded-full bg-sand px-3 py-1 text-xs font-semibold text-earth">{item.outlook}</span> : item.likelihood !== undefined ? <LikelihoodDots name={item.name} value={item.likelihood} /> : null}
        <p className="min-w-0 break-words text-sm leading-6 text-muted"><strong className="text-earth">Where to look: </strong>{item.where}</p>
        <p className="min-w-0 break-words text-sm leading-6 text-muted"><strong className="text-earth">Best time: </strong>{item.bestTime}</p>
      </li>)}
    </ul>
    <p className="border-t border-sand bg-cream px-5 py-4 text-xs text-muted sm:px-7">Likelihood is a guide, not a guarantee.</p>
  </div>;
}

export function GettingThere({ data }: { data: GettingThereData }) {
  const modes = [
    { item: data.road, Icon: CarFront },
    { item: data.air, Icon: Plane },
  ];
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {modes.map(({ item, Icon }) => <article key={item.title} className="relative overflow-hidden rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3"><Icon aria-hidden="true" className="size-7 text-terracotta" /><h3 className="font-heading text-2xl text-earth">{item.title}</h3></div>
          <p className="mt-4 leading-7 text-muted">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{item.times.map((time) => <span key={time} className="rounded-full bg-sand px-3 py-2 text-xs font-semibold text-earth">{time}</span>)}</div>
          <DrawPath d="M20 60 C220 8 480 110 740 52 S950 48 980 60" className="mt-4 h-10 w-full text-terracotta/60" />
          <ol className="grid gap-3 text-sm text-earth">{item.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-cream">{index + 1}</span><span className="leading-6">{step}</span></li>)}</ol>
        </article>)}
      </div>
      <Callout variant="tip" title="Good to know" className="mt-6">{data.note}</Callout>
    </div>
  );
}

export function TipsGrid({ items }: { items: TipData[] }) {
  return <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => { const Icon = iconMap[item.icon] ?? Compass; return <StaggerItem key={item.title}>
      <article className="h-full rounded-2xl border border-sand bg-white p-5">
        <Icon aria-hidden="true" className="size-5 text-terracotta" /><h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
      </article>
    </StaggerItem>; })}
  </StaggerGroup>;
}

export function ExperienceCards({ items, variant = "default" }: { items: ExperienceData[]; variant?: "default" | "overlay" }) {
  return <StaggerGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {items.map((item) => <StaggerItem key={item.title} className="h-full">
      {variant === "overlay" ? (
        <TiltCard className="h-full overflow-hidden rounded-2xl shadow-card">
          <Link
            href={item.href}
            className="group relative block min-h-[420px] h-full overflow-hidden rounded-2xl bg-earth text-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-terracotta sm:min-h-[460px]"
          >
            <SmartImage src={item.image} alt={item.title} sizes="(max-width: 640px) 88vw, (max-width: 1280px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/35 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <span className="flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/35 bg-earth/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">{tag}</span>)}
              </span>
              <span className="mt-4 block font-heading text-2xl sm:text-3xl">{item.title}</span>
              <span className="mt-2 block text-sm leading-6 text-white/90">{item.text}</span>
              <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline underline-offset-4">
                Explore experience <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        </TiltCard>
      ) : (
        <TiltCard className="h-full overflow-hidden rounded-2xl border border-sand bg-white shadow-sm">
          <article className="h-full">
            <div className="relative aspect-[4/3] bg-sand"><SmartImage src={item.image} alt={item.title} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" fill className="object-cover" /></div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-earth">{tag}</span>)}</div>
              <h3 className="mt-4 font-heading text-2xl text-earth">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              <Link href={item.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Explore experience <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        </TiltCard>
      )}
    </StaggerItem>)}
  </StaggerGroup>;
}

export function StayTiers({ tiers, footnote, href, linkLabel }: { tiers: StayTierData[]; footnote: string; href: string; linkLabel: string }) {
  const icons = [Tent, Trees, Crown];
  return <>
    <div className="grid gap-5 lg:grid-cols-3">
      {tiers.map((item, index) => { const Icon = icons[index % icons.length]; return <article key={item.title} className={`rounded-3xl border p-6 sm:p-8 ${index === 1 ? "border-gold bg-forest text-cream shadow-lift" : "border-sand bg-white text-earth"}`}>
        <Icon aria-hidden="true" className={`size-7 ${index === 1 ? "text-gold" : "text-terracotta"}`} />
        <h3 className="mt-5 font-heading text-2xl">{item.title}</h3><p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-cream/80" : "text-muted"}`}>{item.description}</p>
        <p className={`mt-5 text-sm leading-6 ${index === 1 ? "text-cream/90" : "text-earth"}`}><strong>Best for: </strong>{item.bestFor}</p>
        <p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-cream/90" : "text-earth"}`}><strong>Recommended for: </strong>{item.recommendedFor}</p>
      </article>; })}
    </div>
    <p className="mt-5 text-sm text-muted">{footnote}</p>
    <Link href={href} className="mt-3 inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{linkLabel}</Link>
  </>;
}

export function RegionComparison({ columns, rows, note }: { columns: string[]; rows: { label: string; values: string[] }[]; note: string }) {
  return <div className="mt-8">
    <ComparisonTable caption="Compare Serengeti regions" columns={columns.slice(1)} rows={rows.map((row) => ({ label: row.label, values: row.values }))} />
    <p className="mt-3 text-xs leading-5 text-muted">{note}</p>
  </div>;
}
