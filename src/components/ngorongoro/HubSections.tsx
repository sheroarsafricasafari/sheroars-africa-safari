import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Mountain,
  PawPrint,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Callout from "@/components/inner/Callout";
import FaqAccordion from "@/components/inner/FaqAccordion";
import PackageCard from "@/components/inner/PackageCard";
import StatTiles from "@/components/inner/StatTiles";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { ngorongoroHub } from "@/data/ngorongoro";
import type { PackageCardProps } from "@/components/inner/PackageCard";

const factIcons = {
  landscape: Mountain,
  heritage: Sparkles,
  season: Compass,
  journey: Compass,
  caldera: Mountain,
  clock: Compass,
  gate: Compass,
  wildlife: PawPrint,
} as const;

export function NgRimDivider({ fill = "#fbf6ee" }: { fill?: string }) {
  return (
    <svg aria-hidden="true" className="block h-12 w-full md:h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0 72C165 110 275 90 408 51C559 7 669 16 808 54C954 94 1052 103 1186 67C1280 42 1363 43 1440 59V120H0V72Z" fill={fill} />
    </svg>
  );
}

export function NgQuickFacts({
  items,
}: {
  items: typeof ngorongoroHub.quickFacts | typeof import("@/data/ngorongoro").ngorongoroCrater.quickFacts;
}) {
  return (
    <section aria-label="Ngorongoro quick facts" className="relative z-20 -mt-7 pb-10 sm:-mt-12">
      <Container>
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-sand bg-sand shadow-lift sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => {
            const Icon = factIcons[item.icon as keyof typeof factIcons] ?? Mountain;
            return (
              <div key={item.label} className="bg-white p-5 sm:p-6">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
                  <Icon aria-hidden="true" size={17} />
                  {item.label}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-earth">{item.text}</dd>
                {"links" in item && item.links ? (
                  <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {item.links.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm font-semibold text-terracotta underline underline-offset-4">
                        {link.label}
                      </Link>
                    ))}
                  </dd>
                ) : null}
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}

export function NgStory({
  story,
  pullQuote,
}: {
  story: typeof ngorongoroHub.story | typeof import("@/data/ngorongoro").ngorongoroCrater.story;
  pullQuote?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-sand sm:min-h-[440px]">
          <SmartImage src={story.image} alt={story.imageAlt} sizes="(max-width: 768px) 100vw, 50vw" fill className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/35 to-transparent" />
        </div>
        <div>
          <SectionHeading eyebrow={story.eyebrow} title={story.title} align="left" />
          <div className="space-y-5 text-base leading-8 text-muted">
            {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {pullQuote ? (
            <blockquote className="mt-7 border-l-[3px] border-gold pl-5 font-heading text-xl italic leading-relaxed text-earth">
              {pullQuote}
            </blockquote>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function NgExploreTiles({ data }: { data: typeof ngorongoroHub.explore }) {
  const spans = ["lg:col-span-3 lg:row-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-4"];
  return (
    <section className="bg-forest py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} tone="light" />
        <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[230px] lg:grid-cols-6">
          {data.items.map((item, index) => (
            <Link key={item.href} href={item.href} className={`group relative isolate min-h-[280px] overflow-hidden rounded-3xl bg-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${spans[index] ?? "lg:col-span-3"}`}>
              <SmartImage src={item.image} alt={item.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full border border-white/60 text-xs font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-2xl text-white sm:text-3xl">{item.title}</h3>
                <p className="mt-2 max-w-[48ch] text-sm leading-6 text-white/85">{item.text}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold">
                  {item.linkLabel} <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <NgRimDivider fill="#fbf6ee" />
    </section>
  );
}

export function NgFactsGrid({ data }: { data: typeof ngorongoroHub.facts }) {
  return (
    <section className="bg-cream py-8 md:py-14">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <StatTiles items={data.items} className="lg:grid-cols-3" />
        <p className="mt-5 text-center text-xs text-muted">{data.caption}</p>
      </Container>
    </section>
  );
}

export function NgPeopleBand({ data }: { data: typeof ngorongoroHub.people }) {
  return (
    <section className="bg-forest py-16 text-cream md:py-20">
      <Container className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
        <div className="flex size-16 items-center justify-center rounded-full border border-gold/50 text-gold">
          <UsersRound aria-hidden="true" size={30} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl leading-tight text-white sm:text-4xl">{data.title}</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-cream/85">{data.text}</p>
        </div>
        <Button href={data.link.href} variant="light">{data.link.label}</Button>
      </Container>
    </section>
  );
}

export function NgCompare({ data }: { data: typeof ngorongoroHub.compare }) {
  return (
    <section className="bg-sand/50 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {data.cards.map((card, index) => (
            <article key={card.title} className={`rounded-3xl border p-7 sm:p-9 ${index === 0 ? "border-terracotta/30 bg-white shadow-card" : "border-forest/20 bg-forest text-white"}`}>
              <span className={`text-xs font-bold uppercase tracking-[0.2em] ${index === 0 ? "text-terracotta" : "text-gold"}`}>{card.title}</span>
              <p className={`mt-4 text-base leading-7 ${index === 0 ? "text-muted" : "text-cream/85"}`}>{card.text}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-3xl text-center font-heading text-xl leading-relaxed text-earth">{data.punchline}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {data.links.map((link) => <Button key={link.href} href={link.href} variant="secondary">{link.label}</Button>)}
        </div>
      </Container>
    </section>
  );
}

export function NgSeasons({ data }: { data: typeof ngorongoroHub.seasons }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
              <span className="font-heading text-3xl text-gold">0{index + 1}</span>
              <h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <Callout variant="tip">{data.callout}</Callout>
          <div className="flex items-center justify-center rounded-2xl bg-sand/60 p-5">
            <Button href={data.link.href} variant="secondary">{data.link.label}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function NgLogistics({ data }: { data: typeof ngorongoroHub.logistics }) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <div className="grid gap-5 md:grid-cols-2">
          {data.cards.map((card) => (
            <article key={card.title} className="rounded-3xl bg-white p-7 shadow-card sm:p-9">
              <h3 className="font-heading text-2xl text-earth">{card.title}</h3>
              <p className="mt-4 leading-7 text-muted">{card.text}</p>
            </article>
          ))}
        </div>
        <Callout variant="note" className="mt-6">{data.callout}</Callout>
      </Container>
    </section>
  );
}

export function NgJourneys({
  data,
  packages,
}: {
  data: typeof ngorongoroHub.journeys;
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
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {data.links.map((link) => <Button key={link.href} href={link.href} variant="secondary">{link.label}</Button>)}
        </div>
      </Container>
    </section>
  );
}

export function NgStayTeaser({ data }: { data: typeof ngorongoroHub.stay }) {
  return (
    <section className="bg-forest py-16 md:py-24">
      <Container className="grid overflow-hidden rounded-[2rem] bg-earth md:grid-cols-2">
        <div className="relative min-h-[300px] bg-sand md:min-h-[440px]">
          <SmartImage src={data.image} alt={data.imageAlt} sizes="(max-width: 768px) 100vw, 50vw" fill className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/45 to-transparent" />
        </div>
        <div className="flex flex-col items-start justify-center p-7 text-white sm:p-10 md:p-12">
          <SectionHeading eyebrow={data.eyebrow} title={data.title} align="left" tone="light" />
          <p className="leading-7 text-cream/85">{data.text}</p>
          <Button href={data.link.href} variant="light" className="mt-7">{data.link.label}</Button>
        </div>
      </Container>
      <NgRimDivider />
    </section>
  );
}

export function NgFaqSection({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: typeof ngorongoroHub.faq | typeof import("@/data/ngorongoro").ngorongoroCrater.faq;
}) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container className="max-w-5xl">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <FaqAccordion items={[...items]} jsonLd />
      </Container>
    </section>
  );
}
