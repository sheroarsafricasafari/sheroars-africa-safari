import Link from "next/link";
import {
  ArrowDown, ArrowRight, Backpack, Binoculars, Camera, Check, Coffee, Compass, Heart, Info,
  Mail, MapPinned, MessageCircle, Moon, Mountain, PawPrint, Plane, ShieldCheck, Sun, Sunrise,
  Phone,
} from "lucide-react";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import PackageCard from "@/components/inner/PackageCard";
import RelatedLinks from "@/components/inner/RelatedLinks";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import DrawPath from "@/components/motion/DrawPath";
import Parallax from "@/components/motion/Parallax";
import SplitReveal from "@/components/motion/SplitReveal";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import {
  approachCards, comparisonCallout, comparisonIntro, comparisonRows, dayOnSafari,
  destinationCards, faqItems, finalCta, intro, journeyCopy, migrationStages, planSteps,
  practicalCallout, practicalCards, relatedLinks, responsibleTravel, routeStops,
  quickFacts, safariExperience, safariHero, seasonCards, seasonColumns, seasonGrid, seasonNotes, sectionCopy, travelStyles,
  wildlife, wildlifeCallout,
} from "@/data/tanzania-safari";
import { EnquiryModule } from "@/components/tanzania-safari/Interactive";

const approachIcons = {
  heart: Heart,
  compass: Compass,
  map: MapPinned,
  message: MessageCircle,
};

const practicalIcons = {
  plane: Plane,
  passport: Check,
  shield: ShieldCheck,
  backpack: Backpack,
  paw: PawPrint,
  info: Info,
};

const timelineIcons = {
  sunrise: Sunrise,
  binoculars: Binoculars,
  coffee: Coffee,
  sun: Sun,
  camera: Camera,
  moon: Moon,
};

const ratingLabels = {
  best: "Best",
  good: "Good",
  mixed: "Mixed",
  low: "Low",
};

const factIcons = {
  binoculars: Binoculars,
  sun: Sun,
  plane: Plane,
  route: MapPinned,
  mountain: Mountain,
};

const heroBadgeIcons = [Binoculars, ShieldCheck, Compass];

export function HeroAndFacts() {
  return (
    <>
      <SafariHero />
      <QuickFacts />
      <Credentials />
    </>
  );
}

function SafariHero() {
  return (
    <section id="overview" data-tanzania-section aria-labelledby="tanzania-safari-heading" className="relative isolate flex min-h-[86svh] scroll-mt-24 items-end overflow-hidden bg-forest text-white">
      <Parallax className="absolute -inset-y-[8%] inset-x-0 overflow-hidden">
        <SmartImage src={safariHero.image} alt={safariHero.imageAlt} sizes="100vw" fill priority className="object-cover" />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-earth/80 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/25 to-transparent" />
      <Container className="relative w-full pb-20 pt-36 md:pb-28">
        <div className="mx-auto max-w-4xl text-center md:mx-0 md:text-left">
          <Breadcrumbs path="/tanzania-safari" tone="light" className="mb-7" />
          <p className="text-eyebrow text-gold">{safariHero.eyebrow}</p>
          <h1 id="tanzania-safari-heading" className="text-display mt-4 text-white"><SplitReveal text={safariHero.title} eager /></h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-cream/90 sm:text-lg sm:leading-8 md:mx-0">{safariHero.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button href="#destinations" variant="light" size="lg" className="focus-visible:outline-white">Explore Safari Destinations</Button>
            <Button href="/plan-your-safari?type=Safari" variant="outline-light" size="lg" className="focus-visible:outline-white">Plan Your Tanzania Safari</Button>
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 md:justify-start">
            {safariHero.badges.map((badge, index) => {
              const Icon = heroBadgeIcons[index];
              return <li key={badge} className="inline-flex items-center gap-2 text-sm text-white/90"><Icon aria-hidden="true" size={17} className="text-gold" />{badge}</li>;
            })}
          </ul>
        </div>
      </Container>
      <a href="#why-tanzania" aria-label="Scroll to discover Tanzania" className="absolute bottom-5 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/60 text-white motion-safe:animate-bounce motion-reduce:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
        <ArrowDown aria-hidden="true" size={18} />
      </a>
    </section>
  );
}

function QuickFacts() {
  return (
    <div className="relative z-10 -mt-7 bg-cream sm:-mt-12">
      <Container>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-sand bg-sand shadow-soft sm:grid-cols-2 lg:grid-cols-5">
          {quickFacts.map((fact) => {
            const Icon = factIcons[fact.icon];
            return (
              <div key={fact.label} className="min-h-36 bg-cream p-3 sm:p-6">
                <dt className="flex items-start gap-1.5 text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-terracotta sm:items-center sm:gap-2 sm:text-[10px] sm:tracking-[0.17em]"><Icon aria-hidden="true" size={17} className="shrink-0" />{fact.label}</dt>
                <dd className="mt-3 text-sm leading-6 text-earth">
                  {"links" in fact
                    ? <>{fact.text} {fact.links.map((link, index) => <span key={link.href}>{index > 0 ? " and " : ""}<Link className="font-semibold text-terracotta underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta" href={link.href}>{link.label}</Link></span>)}</>
                    : fact.text}
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </div>
  );
}

function Credentials() {
  const credentials: { label: string; href?: string }[] = siteConfig.credentials;
  if (credentials.length === 0) return null;
  return (
    <Container className="py-5">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-gold/40 pb-5 text-xs font-semibold text-muted">
        {credentials.map(({ label, href }) => <li key={label}>{href ? <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{label}</a> : label}</li>)}
      </ul>
    </Container>
  );
}

export function WhyTanzania() {
  return (
    <Section id="why-tanzania" background="cream" ariaLabelledBy="why-tanzania-heading">
      <Container>
        <SectionHeading id="why-tanzania-heading" eyebrow={intro.eyebrow} title={intro.title} align="left" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              <SmartImage src={intro.image} alt={intro.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" fill className="object-cover" />
              <div className="absolute bottom-4 right-4 max-w-[80%] border-l-2 border-gold bg-cream/95 px-4 py-3 text-sm font-medium text-earth shadow-soft">{intro.caption}</div>
            </div>
          </div>
          <div className="order-2 space-y-5 lg:order-1">
            {intro.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)} className="max-w-[65ch] text-base leading-8 text-muted md:text-lg">{paragraph}</p>)}
            <div className="flex flex-wrap gap-2 pt-2">
              {destinationCards.map((destination) => <Link key={destination.slug} href={`#destination-${destination.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-terracotta/30 bg-white px-4 text-sm font-semibold text-terracotta transition-colors hover:bg-terracotta hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{destination.title}<ArrowDown aria-hidden="true" className="ml-2 size-3.5 -rotate-45" /></Link>)}
            </div>
          </div>
        </div>
        <GoldDivider />
      </Container>
    </Section>
  );
}

export function DestinationCards() {
  return (
    <Section id="destinations" background="forest" className="relative isolate overflow-hidden" ariaLabelledBy="destinations-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(ellipse_at_center,transparent_0_38%,#fbf6ee_39%,transparent_40%),radial-gradient(ellipse_at_center,transparent_0_58%,#fbf6ee_59%,transparent_60%)] [background-size:140px_90px]" />
      <Container className="relative">
        <SectionHeading id="destinations-heading" eyebrow={sectionCopy.destinations.eyebrow} title={sectionCopy.destinations.title} subtitle={sectionCopy.destinations.subtitle} tone="light" />
        <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {destinationCards.map((card, index) => (
            <li key={card.slug} id={`destination-${card.slug}`} className={index === 1 ? "lg:translate-y-8" : ""}>
              <Reveal className="h-full" delay={index * 0.08}>
                <article className="group relative isolate aspect-[4/5] overflow-hidden rounded-3xl bg-earth shadow-soft transition duration-700 hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-forest">
                  <SmartImage src={card.image} alt={card.imageAlt} sizes="(min-width: 1024px) 33vw, 100vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-5 text-cream sm:p-7">
                    <span aria-hidden="true" className="absolute left-6 top-6 flex size-11 items-center justify-center rounded-full border border-gold/70 font-heading text-lg text-gold">{card.index}</span>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{card.eyebrow}</p>
                    <h3 className="font-heading text-4xl leading-tight sm:text-5xl">
                      <Link href={card.href} className="outline-none after:absolute after:inset-0 after:content-['']">
                        {card.title}<span className="sr-only">: explore the {card.title} safari page</span>
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-cream/90">{card.description}</p>
                    <ul aria-label={`${card.title} highlights`} className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => <li key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] text-white backdrop-blur-md">{tag}</li>)}
                    </ul>
                    <span aria-hidden="true" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold">{`Explore ${card.title}`}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function CompareDestinations() {
  const columns = [
    { title: "Tarangire", index: 0 },
    { title: "Ngorongoro", index: 1 },
    { title: "Serengeti", index: 2 },
  ];
  return (
    <Section id="compare" background="cream" ariaLabelledBy="compare-heading">
      <Container>
        <SectionHeading id="compare-heading" eyebrow={sectionCopy.comparison.eyebrow} title={sectionCopy.comparison.title} subtitle={sectionCopy.comparison.subtitle} />
        <div className="hidden overflow-hidden rounded-3xl border border-sand bg-white shadow-card md:block">
          <table className="w-full border-collapse text-left">
            <thead className="bg-forest text-cream">
              <tr><th scope="col" className="w-40 p-4 text-xs uppercase tracking-wider text-gold">Compare</th>{columns.map(({ title }) => <th scope="col" key={title} className="p-4 font-heading text-xl">{title}</th>)}</tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-t border-sand odd:bg-white even:bg-cream/70">
                  <th scope="row" className="p-4 text-sm font-bold text-terracotta">{row.label}</th>
                  {row.values.map((value, index) => <td key={columns[index].title} className="p-4 text-sm leading-6 text-muted">{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-4 md:hidden">
          {columns.map(({ title, index }) => (
            <article key={title} className="rounded-2xl border border-sand bg-white p-5 shadow-card">
              <h3 className="font-heading text-2xl text-earth">{title}</h3>
              <dl className="mt-4 grid gap-3">
                {comparisonRows.map((row) => <div key={row.label} className="border-t border-sand pt-3"><dt className="text-xs font-bold uppercase tracking-wider text-terracotta">{row.label}</dt><dd className="mt-1 text-sm leading-6 text-muted">{row.values[index]}</dd></div>)}
              </dl>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-center font-heading text-xl leading-8 text-earth sm:text-2xl">{comparisonIntro}</p>
        <Callout className="mx-auto mt-6 max-w-4xl" variant="tip">{comparisonCallout}</Callout>
      </Container>
    </Section>
  );
}

export function SampleJourneys() {
  const matching = safaris.filter((item) => item.parks.some((park) => ["Tarangire", "Ngorongoro", "Serengeti"].includes(park)));
  const spotlight = matching.find((item) => item.badge?.toLowerCase().includes("popular")) ?? matching[0];
  const additional = matching.filter((item) => item.slug !== spotlight?.slug).slice(0, 3);

  return (
    <Section id="journeys" background="sand" ariaLabelledBy="journeys-heading">
      <Container>
        <SectionHeading id="journeys-heading" eyebrow={journeyCopy.eyebrow} title={journeyCopy.title} subtitle={journeyCopy.subtitle} />
        <p className="-mt-5 mb-8 text-center text-sm text-muted">{journeyCopy.discoveryLine}</p>
        {spotlight ? (
          <Reveal>
            <article className="mb-8 grid overflow-hidden rounded-3xl bg-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
              <Link href={`/safaris/packages/${spotlight.slug}`} aria-label={`View ${spotlight.title}`} className="group relative block min-h-72 overflow-hidden bg-forest focus-visible:outline focus-visible:outline-4 focus-visible:outline-terracotta lg:min-h-[420px]">
                <SmartImage src={spotlight.image} alt={`${spotlight.title} safari`} sizes="(min-width: 1024px) 50vw, 100vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                <span className="absolute left-5 top-5 rounded-full bg-forest px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold">{spotlight.badge ?? "A considered route"}</span>
              </Link>
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <p className="text-eyebrow text-terracotta">A NORTHERN CIRCUIT SPOTLIGHT</p>
                <h3 className="mt-3 font-heading text-3xl text-earth sm:text-4xl">{spotlight.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{spotlight.summary}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-terracotta">{spotlight.days} days · {spotlight.priceFrom === null ? "Price on request" : `From $${spotlight.priceFrom.toLocaleString()} per person`}</p>
                <ul aria-label="Parks on this journey" className="mt-4 flex flex-wrap gap-2">{spotlight.parks.map((park) => <li key={park} className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-earth">{park}</li>)}</ul>
                {spotlight.dayByDay.length > 0 ? <ol className="mt-5 grid gap-2 border-t border-sand pt-4">{spotlight.dayByDay.slice(0, 3).map((day) => <li key={day.day} className="text-sm text-muted"><span className="font-semibold text-earth">Day {day.day}:</span> {day.title}</li>)}</ol> : null}
                <Link href={`/safaris/packages/${spotlight.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Explore this journey <ArrowRight aria-hidden="true" size={17} /></Link>
              </div>
            </article>
          </Reveal>
        ) : (
          <div className="rounded-2xl border border-sand bg-white p-6 text-muted">
            {/* TODO(REPLACE): Add approved package content when matching safari records are available. */}
            <p>{journeyCopy.empty}</p><Link href="/plan-your-safari" className="mt-3 inline-flex min-h-11 items-center font-semibold text-terracotta underline">Talk with our team</Link>
          </div>
        )}
        {additional.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{additional.map((item) => <PackageCard key={item.slug} slug={item.slug} title={item.title} days={item.days} parks={item.parks} summary={item.summary} priceFrom={item.priceFrom} image={{ src: item.image, alt: `${item.title} safari` }} badge={item.badge} />)}</div> : null}
        <div className="mt-8 text-center"><Button href="/safaris/packages" variant="secondary" className="focus-visible:outline-terracotta">View All Safari Journeys</Button></div>
      </Container>
    </Section>
  );
}

export function RouteSchematic() {
  return (
    <Section id="route" background="cream" ariaLabelledBy="route-heading">
      <Container>
        <SectionHeading id="route-heading" eyebrow={sectionCopy.route.eyebrow} title={sectionCopy.route.title} />
        <div className="relative">
          <svg role="img" aria-labelledby="northern-route-title northern-route-description" viewBox="0 0 1000 130" className="absolute inset-x-0 top-6 hidden h-28 w-full text-terracotta/65 lg:block">
            <title id="northern-route-title">{sectionCopy.routeDiagram.title}</title>
            <desc id="northern-route-description">{sectionCopy.routeDiagram.description}</desc>
            <path d="M75 75 C150 5 245 115 290 70 S570 15 705 72 S850 130 925 55" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
            <path d="M290 70 C360 120 430 120 500 55 C570 0 640 30 705 72" fill="none" stroke="#d9a441" strokeWidth="2" strokeDasharray="3 8" />
            {[{ x: 75, y: 75 }, { x: 290, y: 70 }, { x: 500, y: 55 }, { x: 705, y: 72 }, { x: 925, y: 55 }].map(({ x, y }) => <circle key={x} cx={x} cy={y} r={x === 500 ? 5 : 8} fill="#fbf6ee" stroke={x === 500 ? "#d9a441" : "currentColor"} strokeWidth="3" />)}
          </svg>
          <DrawPath d="M75 75 C150 5 245 115 290 70 S570 15 705 72 S850 130 925 55" className="pointer-events-none absolute inset-x-0 top-6 hidden h-28 w-full text-terracotta/35 lg:block" />
          <svg aria-hidden="true" viewBox="0 0 1000 130" className="absolute inset-x-0 top-6 hidden h-28 w-full text-gold/80 lg:block"><path d="M925 55 C850 120 160 110 75 75" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" /></svg>
          <span aria-hidden="true" className="absolute bottom-4 left-2 top-4 w-px bg-terracotta/35 lg:hidden" />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {routeStops.map((stop, index) => (
              <li key={stop.name} className={`rounded-2xl border border-sand bg-white p-3 shadow-card lg:mt-16 ${index % 2 === 1 ? "lg:mt-24" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                  <SmartImage src={stop.image} alt={stop.alt} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw" fill className="object-cover" />
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-terracotta">0{index + 1}</p>
                <h3 className="mt-1 font-heading text-xl text-earth">{stop.name}</h3>
                <p className="mt-2 min-h-12 text-xs leading-5 text-muted">{stop.description}</p>
                {stop.href ? <Link href={stop.href} className="mt-2 inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-terracotta underline underline-offset-4">Explore {stop.name.replace(" (optional)", "")}<ArrowRight aria-hidden="true" size={14} /></Link> : <span className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-muted">Gateway stop</span>}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-5 text-muted">{sectionCopy.route.disclaimer}</p>
        </div>
      </Container>
    </Section>
  );
}

export function SafariExperience() {
  return (
    <Section id="experience" background="sand" ariaLabelledBy="experience-heading">
      <Container>
        <SectionHeading id="experience-heading" eyebrow={safariExperience.eyebrow} title={safariExperience.title} />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="space-y-5">
            {safariExperience.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 36)} className="text-base leading-8 text-muted md:text-lg">{paragraph}</p>)}
            <blockquote className="border-l-2 border-gold py-2 pl-5 font-heading text-2xl italic leading-snug text-earth sm:text-3xl">{safariExperience.quote}</blockquote>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
            <SmartImage src={safariExperience.image} alt={safariExperience.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" fill className="object-cover" />
          </div>
        </div>
        <div className="mt-20">
          <p className="text-eyebrow text-terracotta">{sectionCopy.dayOnSafari.eyebrow}</p>
          <h3 className="mt-2 font-heading text-3xl text-earth sm:text-4xl">{sectionCopy.dayOnSafari.title}</h3>
          <ol className="relative mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {dayOnSafari.map((step, index) => {
              const Icon = timelineIcons[step.icon];
              return (
                <li key={step.time} className="relative rounded-2xl border border-sand bg-white p-5 shadow-card">
                  <span className="flex size-11 items-center justify-center rounded-full border-2 border-gold bg-cream text-terracotta"><Icon aria-hidden="true" size={20} /></span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-terracotta">{step.time}</p>
                  <h4 className="mt-2 font-heading text-lg text-earth">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                  {index < dayOnSafari.length - 1 ? <span aria-hidden="true" className="absolute -right-4 top-10 z-10 hidden h-px w-4 bg-gold lg:block" /> : null}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-xs text-muted">{sectionCopy.dayOnSafari.disclaimer}</p>
        </div>
      </Container>
    </Section>
  );
}

export function WildlifeBento() {
  const bigFive = wildlife.filter((animal) => animal.size === "large");
  const otherAnimals = wildlife.filter((animal) => animal.size === "small");
  const renderAnimal = (animal: (typeof wildlife)[number], index: number, total: number) => (
    <article key={animal.slug} className={`group relative isolate min-h-64 overflow-hidden rounded-2xl bg-earth ${total === 5 && index === 0 ? "lg:col-span-3" : total === 5 && index === 4 ? "lg:col-span-3" : "lg:col-span-2"} ${total === 12 && index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}>
      <SmartImage src={`/images/tanzania-safari/${animal.slug}.jpg`} alt={animal.alt} sizes="(min-width: 1024px) 25vw, 50vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h4 className="font-heading text-2xl text-white">{animal.name}</h4>
        <p className="mt-1 text-xs leading-5 text-white/85">{animal.description}</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-cream/75">{animal.destinations}</p>
      </div>
    </article>
  );

  return (
    <Section id="wildlife" background="cream" ariaLabelledBy="wildlife-heading">
      <Container>
        <SectionHeading id="wildlife-heading" eyebrow={sectionCopy.wildlife.eyebrow} title={sectionCopy.wildlife.title} subtitle={sectionCopy.wildlife.subtitle} />
        <p className="-mt-5 mb-8 text-center text-sm text-muted">{sectionCopy.wildlife.supportingText}</p>
        <h3 className="mb-4 font-heading text-2xl text-earth">{sectionCopy.wildlife.bigFive}</h3>
        <div className="grid auto-rows-[250px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-12 lg:auto-rows-[290px]">{bigFive.map((animal, index) => renderAnimal(animal, index, bigFive.length))}</div>
        <h3 className="mb-4 mt-12 font-heading text-2xl text-earth">{sectionCopy.wildlife.others}</h3>
        <div className="grid auto-rows-[260px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-8 lg:auto-rows-[280px]">{otherAnimals.map((animal, index) => renderAnimal(animal, index, otherAnimals.length))}</div>
        <Callout variant="note" className="mt-8">{wildlifeCallout}</Callout>
      </Container>
    </Section>
  );
}

export function WhenToGo() {
  return (
    <Section id="when-to-go" background="forest" ariaLabelledBy="when-to-go-heading">
      <Container>
        <SectionHeading id="when-to-go-heading" eyebrow={sectionCopy.whenToGo.eyebrow} title={sectionCopy.whenToGo.title} subtitle={sectionCopy.whenToGo.subtitle} tone="light" />
        <div className="grid gap-4 sm:grid-cols-2">
          {seasonCards.map((season) => (
            <article key={season.months} className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 sm:p-6">
              <p className="text-eyebrow text-gold">{season.months}</p>
              <h3 className="mt-2 font-heading text-2xl text-cream">{season.name}</h3>
              <p className="mt-3 text-sm leading-7 text-cream/80">{season.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <p className="text-eyebrow text-gold">{sectionCopy.migration.eyebrow}</p>
          <h3 className="mt-2 font-heading text-3xl text-cream">{sectionCopy.migration.title}</h3>
          <ol className="relative mt-7 grid gap-4 md:grid-cols-4">
            {migrationStages.map((stage, index) => (
              <li key={stage.months} className="relative border-l border-gold/70 pl-5 md:border-l-0 md:border-t md:pl-0 md:pt-5">
                <span aria-hidden="true" className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-gold md:-top-[5px] md:left-0" />
                <p className="text-xs font-bold uppercase tracking-wider text-gold">{stage.months}</p>
                <h4 className="mt-2 font-heading text-xl text-cream">{stage.place}</h4>
                <p className="mt-2 text-sm leading-6 text-cream/75">{stage.note}</p>
                {index < migrationStages.length - 1 ? <ArrowRight aria-hidden="true" className="absolute right-2 top-5 hidden size-4 text-gold/70 md:block" /> : null}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs leading-5 text-cream/70">{sectionCopy.migration.disclaimer}</p>
        </div>
        <SeasonGrid />
      </Container>
    </Section>
  );
}

function SeasonGrid() {
  return (
    <div className="mt-16 rounded-3xl bg-cream p-4 text-earth shadow-soft sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-eyebrow text-terracotta">{sectionCopy.seasonGrid.eyebrow}</p><h3 className="mt-2 font-heading text-2xl sm:text-3xl">{sectionCopy.seasonGrid.title}</h3></div>
        <p className="text-xs text-muted">{sectionCopy.seasonGrid.caption}</p>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-sand"><th scope="col" className="p-3 text-left text-xs uppercase tracking-wider text-muted">Destination</th>{seasonColumns.map((month) => <th scope="col" key={month} className="p-3 text-center text-xs font-bold text-earth">{month}</th>)}</tr></thead>
          <tbody>{seasonGrid.map((row) => <tr key={row.destination} className="border-b border-sand last:border-0"><th scope="row" className="p-3 font-semibold text-earth">{row.destination}</th>{row.ratings.map((rating, index) => <td key={`${row.destination}-${seasonColumns[index]}`} className="p-2 text-center"><span className={`inline-flex min-h-8 min-w-14 items-center justify-center rounded-full border px-2 text-[10px] font-bold ${rating === "best" ? "border-forest/20 bg-forest/10 text-forest" : rating === "good" ? "border-gold/50 bg-gold/15 text-earth" : rating === "mixed" ? "border-terracotta/25 bg-terracotta/10 text-earth" : "border-sand bg-sand text-muted"}`}>{ratingLabels[rating]}</span></td>)}</tr>)}</tbody>
        </table>
      </div>
      <ul aria-label="Season rating legend" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">{Object.entries(ratingLabels).map(([rating, label]) => <li key={rating} className="inline-flex items-center gap-2"><span aria-hidden="true" className={`size-3 rounded-sm ${rating === "best" ? "bg-forest" : rating === "good" ? "bg-gold" : rating === "mixed" ? "bg-terracotta/70" : "bg-sand"}`} />{label}</li>)}</ul>
      <ul className="mt-5 grid gap-2 border-t border-sand pt-4 text-sm leading-6 text-muted">{seasonNotes.map((note) => <li key={note.destination}><strong className="text-earth">{note.destination}:</strong> {note.text}</li>)}</ul>
      <Button href="/travel-guide/best-time-to-visit" variant="secondary" className="mt-5">Full Best-Time Guide</Button>
    </div>
  );
}

export function Approach() {
  return (
    <Section id="approach" background="cream" ariaLabelledBy="approach-heading">
      <Container>
        <SectionHeading id="approach-heading" eyebrow={sectionCopy.approach.eyebrow} title={sectionCopy.approach.title} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approachCards.map((card) => {
            const Icon = approachIcons[card.icon];
            return <article key={card.title} className="rounded-2xl border border-sand bg-white p-6 shadow-card"><span className="flex size-12 items-center justify-center rounded-full bg-gold/15 text-terracotta"><Icon aria-hidden="true" size={22} /></span><h3 className="mt-4 font-heading text-xl text-earth">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{card.text}</p></article>;
          })}
        </div>
        <div className="mt-8 text-center"><Button href="/why-she-roars" variant="secondary">Why She Roars</Button></div>
      </Container>
    </Section>
  );
}

export function TravelStyles() {
  return (
    <Section id="travel-styles" background="sand" ariaLabelledBy="travel-styles-heading">
      <Container>
        <SectionHeading id="travel-styles-heading" eyebrow={sectionCopy.travelStyles.eyebrow} title={sectionCopy.travelStyles.title} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {travelStyles.map((style) => (
            <li key={style.title} className="min-w-0">
              <article className="group relative isolate aspect-[4/5] overflow-hidden rounded-3xl bg-earth shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-within:ring-2 focus-within:ring-terracotta">
                <SmartImage src={style.image} alt={style.alt} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-heading text-2xl"><Link href={style.href} className="outline-none after:absolute after:inset-0 after:content-['']">{style.title}</Link></h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">{style.text}</p>
                  <span aria-hidden="true" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold">Explore this safari style <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function PlanSafari() {
  return (
    <Section id="plan" background="cream" ariaLabelledBy="plan-heading">
      <Container>
        <SectionHeading id="plan-heading" eyebrow={sectionCopy.planning.eyebrow} title={sectionCopy.planning.title} />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ol className="relative grid min-w-0 gap-0">
            {planSteps.map((step, index) => <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0"><span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-gold bg-cream font-heading text-xl text-terracotta">{`0${index + 1}`}</span>{index < planSteps.length - 1 ? <span aria-hidden="true" className="absolute bottom-0 left-6 top-12 w-px bg-gold/60" /> : null}<div className="min-w-0 flex-1 pt-1"><h3 className="font-heading text-xl text-earth">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{step.text}</p></div></li>)}
          </ol>
          <div className="min-w-0">
            <EnquiryModule />
            <ContactTeam />
          </div>
        </div>
        <div className="mt-8 text-center"><Button href="/plan-your-safari">Start Planning My Safari</Button></div>
      </Container>
    </Section>
  );
}

function ContactTeam() {
  return (
    <aside className="mt-5 rounded-3xl border border-sand bg-sand/45 p-5 sm:p-6">
      <p className="text-eyebrow text-terracotta">HERE WHEN YOU NEED US</p>
      <h3 className="mt-2 font-heading text-2xl text-earth">Talk to our team</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"><MessageCircle aria-hidden="true" size={17} />WhatsApp our team</Link>
        <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><Mail aria-hidden="true" size={17} />{siteConfig.email}</a>
        <a href={`tel:${siteConfig.phoneTel}`} className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><Phone aria-hidden="true" size={17} />{siteConfig.phoneDisplay}</a>
      </div>
    </aside>
  );
}

export function PracticalInformation() {
  return (
    <Section id="practical" background="sand" ariaLabelledBy="practical-heading">
      <Container>
        <SectionHeading id="practical-heading" eyebrow={sectionCopy.practical.eyebrow} title={sectionCopy.practical.title} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practicalCards.map((card) => {
            const Icon = practicalIcons[card.icon];
            return (
              <article key={card.title} className="rounded-2xl border border-white/80 bg-cream p-5 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-full bg-forest/10 text-forest"><Icon aria-hidden="true" size={20} /></span>
                <h3 className="mt-4 font-heading text-xl text-earth">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
                {"href" in card && card.href ? <Link href={card.href} className="mt-3 inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4">{card.linkLabel}</Link> : null}
                {"externalLinks" in card ? <div className="mt-3 flex flex-wrap gap-3">{card.externalLinks.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4">{item.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div> : null}
              </article>
            );
          })}
        </div>
        <Callout className="mt-6" variant="note">{practicalCallout}</Callout>
      </Container>
    </Section>
  );
}

export function ResponsibleTravel() {
  return (
    <Section id="responsible" background="cream" ariaLabelledBy="responsible-heading">
      <Container className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div><p className="text-eyebrow text-terracotta">{responsibleTravel.eyebrow}</p><h2 id="responsible-heading" className="mt-3 font-heading text-3xl text-earth sm:text-4xl">{responsibleTravel.title}</h2><p className="mt-3 max-w-3xl text-base leading-7 text-muted">{responsibleTravel.text}</p></div>
        <Button href="/giving-back" variant="secondary">Our Approach</Button>
      </Container>
    </Section>
  );
}

export function TanzaniaSafariFaq() {
  return (
    <Section id="faq" background="sand" ariaLabelledBy="faq-heading">
      <Container>
        <SectionHeading id="faq-heading" eyebrow={sectionCopy.faq.eyebrow} title={sectionCopy.faq.title} />
        <div className="mx-auto grid max-w-4xl gap-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-sand/80 bg-white px-5 py-4 shadow-sm open:bg-cream sm:px-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-earth marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta [&::-webkit-details-marker]:hidden">
                {item.question}<ArrowDown aria-hidden="true" className="size-4 shrink-0 text-terracotta transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <p className="max-w-3xl pb-2 pt-3 text-sm leading-7 text-muted">
                {item.answer.map((part, index) => part.href
                  ? <Link key={`${part.href}-${index}`} href={part.href} className="font-semibold text-terracotta underline underline-offset-4">{part.text}</Link>
                  : <span key={index}>{part.text}</span>)}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function RelatedSafariLinks() {
  return <RelatedLinks items={relatedLinks} title="Keep Exploring Tanzania" className="bg-cream" limit={6} />;
}

export function FinalSafariCta() {
  return (
    <CtaBanner
      eyebrow={finalCta.eyebrow}
      title={finalCta.title}
      description={finalCta.description}
      image={{ src: finalCta.image, alt: finalCta.imageAlt }}
      primaryCta={{ label: "Plan Your Tanzania Safari", href: "/plan-your-safari" }}
      secondaryCta={{ label: "Chat With Our Team", href: siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage) }}
      parallax
      id="start"
    />
  );
}

function GoldDivider() {
  return <div aria-hidden="true" className="mx-auto mt-16 flex max-w-xl items-center gap-3"><span className="h-px flex-1 bg-gold/60" /><span className="size-2 rotate-45 bg-gold" /><span className="h-px flex-1 bg-gold/60" /></div>;
}
