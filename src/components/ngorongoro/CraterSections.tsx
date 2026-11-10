import Link from "next/link";
import {
  ArrowRight,
  Backpack,
  Clock3,
  Compass,
  ShieldCheck,
  ThermometerSun,
} from "lucide-react";
import Callout from "@/components/inner/Callout";
import PackageCard from "@/components/inner/PackageCard";
import StatTiles from "@/components/inner/StatTiles";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import type { PackageCardProps } from "@/components/inner/PackageCard";
import { ngorongoroCrater } from "@/data/ngorongoro";

export function CraterCrossSection({ data }: { data: typeof ngorongoroCrater.anatomy }) {
  return (
    <section id="anatomy" className="scroll-mt-24 bg-cream py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-sand bg-gradient-to-b from-sky-100 via-cream to-sand sm:min-h-[400px]">
            <svg aria-hidden="true" viewBox="0 0 900 410" className="absolute inset-0 size-full">
              <path d="M25 25C95 60 124 157 205 210C264 249 292 275 332 289C398 311 488 311 554 289C598 274 630 244 689 208C770 158 810 58 875 25L875 368H25Z" fill="#435b3d" />
              <path d="M190 220C270 265 315 327 446 335C575 327 624 264 708 218L708 368H190Z" fill="#caa36b" />
              <path d="M362 326C397 311 470 311 512 328C484 352 398 355 362 326Z" fill="#74a8aa" />
            </svg>
            <p className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-earth sm:bottom-5 sm:left-6">{data.schematicLabel}</p>
          </div>
          <ol className="grid content-center gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {data.hotspots.map((item, index) => (
              <li key={item.id} className="flex items-start gap-3 rounded-xl bg-white p-3 text-sm leading-6 text-earth">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">{index + 1}</span>
                <span><strong className="block">{item.title}</strong>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function CraterFloorMap({
  data,
  places,
}: {
  data: typeof ngorongoroCrater.floorMap;
  places: typeof ngorongoroCrater.floorPlaces;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-sand bg-[#e7dfc9] sm:min-h-[400px]">
            <svg aria-hidden="true" viewBox="0 0 900 520" className="absolute inset-0 size-full">
              <path d="M450 28C660 28 845 158 842 284C839 403 664 492 449 492C232 492 57 403 58 282C59 157 240 28 450 28Z" fill="#d2bd8d" stroke="#59734a" strokeWidth="22" />
              <path d="M450 81C620 81 778 169 780 282C782 379 632 438 449 438C266 438 122 377 120 282C118 169 279 81 450 81Z" fill="#c6a968" />
              <path d="M283 286C325 219 440 196 511 217C578 236 637 298 624 346C609 400 501 414 411 386C330 361 255 333 283 286Z" fill="#80b4b1" />
            </svg>
            <p className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-earth sm:bottom-5 sm:left-6">{data.schematicLabel}</p>
          </div>
          <ol className="grid content-center gap-3 sm:grid-cols-2">
            {places.map((place, index) => (
              <li key={place.id} className="rounded-2xl bg-cream p-4">
                <h3 className="font-heading text-lg text-earth">{String(index + 1).padStart(2, "0")} {place.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{place.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function CraterFacts({ data }: { data: typeof ngorongoroCrater.facts }) {
  return (
    <section className="bg-forest py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} tone="light" />
        <StatTiles items={data.items} className="lg:grid-cols-3" />
        <p className="mt-5 text-center text-xs text-cream/70">{data.caption}</p>
      </Container>
    </section>
  );
}

export function CraterWildlife({ data }: { data: typeof ngorongoroCrater.wildlife }) {
  const spans = {
    large: "sm:col-span-2 sm:row-span-2",
    wide: "sm:col-span-2",
    normal: "",
  } as const;

  return (
    <section id="wildlife" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.animals.map((animal) => (
            <article key={animal.name} className={`group relative isolate min-h-[280px] overflow-hidden rounded-3xl bg-earth ${spans[animal.size]}`}>
              <SmartImage src={animal.image} alt={animal.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur">{animal.frequency}</span>
                <h3 className="mt-3 font-heading text-2xl text-white">{animal.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85">{animal.text}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="mt-5 grid gap-4 rounded-2xl border border-sand bg-cream p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-3 text-terracotta">
            <Compass aria-hidden="true" size={22} />
            <h3 className="font-heading text-lg text-earth">{data.giraffe.title}</h3>
          </div>
          <p className="text-sm leading-6 text-muted">{data.giraffe.text}</p>
        </aside>
        <Callout variant="note" className="mt-5">{data.callout}</Callout>
      </Container>
    </section>
  );
}

export function CraterDay({ data }: { data: typeof ngorongoroCrater.day }) {
  return (
    <section id={data.id} className="scroll-mt-24 bg-cream py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <ol className="relative mx-auto max-w-4xl space-y-3 before:absolute before:bottom-8 before:left-[3.55rem] before:top-8 before:w-px before:bg-gold sm:before:left-[4.25rem]">
          {data.items.map((item, index) => (
            <li key={item.time} className="relative grid grid-cols-[4.5rem_1fr] gap-4 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
              <div className="relative z-10 flex flex-col items-center">
                <span className="flex size-11 items-center justify-center rounded-full border border-gold bg-white text-terracotta shadow-sm">
                  <Clock3 aria-hidden="true" size={17} />
                </span>
                <span className="mt-2 text-xs font-bold tabular-nums text-terracotta">{item.time}</span>
              </div>
              <article className="mb-2 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="hidden font-heading text-2xl text-gold sm:block">0{index + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl text-earth">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function CraterRules({ data }: { data: typeof ngorongoroCrater.rules }) {
  const icons = [Compass, Clock3, ShieldCheck, ArrowRight, ThermometerSun, Backpack];
  return (
    <section id="rules" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} tone="light" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => {
            const Icon = icons[index % icons.length] ?? ShieldCheck;
            return (
              <article key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <Icon aria-hidden="true" className="size-6 text-gold" />
                <h3 className="mt-4 font-heading text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-cream/80">{item.text}</p>
                {"link" in item && item.link ? (
                  <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                    {item.link.label}<ArrowRight aria-hidden="true" size={15} />
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function CraterWays({ data }: { data: typeof ngorongoroCrater.ways }) {
  return (
    <section id="ways" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <div className="grid gap-5 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <article key={item.title} className="flex flex-col rounded-3xl border border-sand bg-white p-7 shadow-card sm:p-8">
              <span className="font-heading text-4xl text-gold">0{index + 1}</span>
              {"label" in item ? <span className="mt-3 w-fit rounded-full bg-forest px-3 py-1 text-xs font-bold text-gold">{item.label}</span> : null}
              <h3 className="mt-4 font-heading text-2xl leading-tight text-earth">{item.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-muted">{item.text}</p>
              <Link href={item.link.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">
                {item.link.label}<ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CraterSeasonsPacking({ data }: { data: typeof ngorongoroCrater.seasonsAndPacking }) {
  const cards = [
    { ...data.bestTime, Icon: Compass },
    { ...data.packing, Icon: Backpack },
  ];
  return (
    <section id="seasons" className="scroll-mt-24 bg-cream py-16 md:py-24">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map(({ title, text, link, Icon }) => (
            <article key={title} className="rounded-3xl bg-white p-7 shadow-card sm:p-9">
              <Icon aria-hidden="true" className="size-7 text-terracotta" />
              <h2 className="mt-4 font-heading text-2xl text-earth">{title}</h2>
              <p className="mt-3 leading-7 text-muted">{text}</p>
              <Button href={link.href} variant="secondary" className="mt-6">{link.label}</Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CraterRespect({ data }: { data: typeof ngorongoroCrater.respect }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Callout variant="safety" title={data.title} className="mx-auto max-w-5xl">
          <p>{data.text}</p>
          <Link href={data.link.href} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline underline-offset-4">{data.link.label}<ArrowRight aria-hidden="true" size={16} /></Link>
        </Callout>
      </Container>
    </section>
  );
}

export function CraterStayTeaser({ data }: { data: typeof ngorongoroCrater.stay }) {
  return (
    <section className="bg-forest py-16 md:py-24">
      <Container className="grid overflow-hidden rounded-[2rem] bg-earth md:grid-cols-2">
        <div className="relative min-h-[300px] bg-sand md:min-h-[440px]">
          <SmartImage src={data.image} alt={data.imageAlt} sizes="(max-width: 768px) 100vw, 50vw" fill className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/45 to-transparent" />
        </div>
        <div className="flex flex-col items-start justify-center p-7 text-white sm:p-10 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl leading-tight text-white sm:text-4xl">{data.title}</h2>
          <p className="mt-5 leading-7 text-cream/85">{data.text}</p>
          <Button href={data.link.href} variant="light" className="mt-7">{data.link.label}</Button>
        </div>
      </Container>
    </section>
  );
}

export function CraterJourneys({
  data,
  packages,
}: {
  data: typeof ngorongoroCrater.journeys;
  packages: PackageCardProps[];
}) {
  return (
    <section id="journeys" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
        {packages.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => <PackageCard key={item.slug} {...item} priceFrom={null} />)}
          </div>
        ) : (
          <p className="mx-auto max-w-2xl rounded-2xl bg-sand p-6 text-center leading-7 text-muted">{data.noPackages}</p>
        )}
        {data.callout ? <Callout variant="note" className="mx-auto mt-7 max-w-4xl">{data.callout}</Callout> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {data.links.map((link) => <Button key={link.href} href={link.href} variant="secondary">{link.label}</Button>)}
        </div>
      </Container>
    </section>
  );
}
