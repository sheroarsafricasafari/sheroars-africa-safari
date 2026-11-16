import Link from "next/link";
import {
  Bird,
  CalendarDays,
  Clock3,
  Compass,
  MapPin,
  Mountain,
  PawPrint,
  Search,
  Sun,
  TreeDeciduous,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import PackageCard from "@/components/inner/PackageCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import styles from "./TgHero.module.css";
import type { PackageCardProps } from "@/components/inner/PackageCard";
import type { TarangireIcon } from "@/data/tarangire";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";

const icons = {
  elephant: PawPrint,
  baobab: TreeDeciduous,
  river: Waves,
  bird: Bird,
  antelope: Search,
  compass: Compass,
  landscape: Mountain,
  wildlife: PawPrint,
  season: CalendarDays,
  location: MapPin,
  sun: Sun,
  clock: Clock3,
} satisfies Record<TarangireIcon, LucideIcon>;

type HeroData = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  badges: readonly { icon: TarangireIcon; label: string }[];
};

export function TgHero({ data, breadcrumbs, headingId }: {
  data: HeroData;
  breadcrumbs: readonly { title: string; href: string }[];
  headingId: string;
}) {
  return (
    <section aria-labelledby={headingId} className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-[#2b2118] text-white md:min-h-[92svh]">
      <SmartImage src={data.image} alt={data.imageAlt} sizes="100vw" fill priority className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-earth/80 via-earth/5 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/35 to-earth/5" />
      <div aria-hidden="true" className={styles.dust} />
      <Container className="relative z-10 w-full pb-28 pt-36 md:pb-36">
        <div className="max-w-4xl">
          <Breadcrumbs items={[...breadcrumbs]} tone="light" className="mb-8" />
          <p className="text-eyebrow text-gold">{data.eyebrow}</p>
          <h1 id={headingId} className="mt-4 max-w-4xl text-display text-white">{data.title}</h1>
          <div className="gold-rule mb-6 mt-7" />
          <p className="max-w-[65ch] text-[17px] leading-[1.8] text-cream/90 sm:text-lg">{data.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {data.badges.map((badge) => {
              const Icon = icons[badge.icon];
              return (
                <span key={badge.label} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <Icon aria-hidden="true" size={16} className="text-gold" />{badge.label}
                </span>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={data.primaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {data.primaryCta.label}
            </Link>
            <Link href={data.secondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/75 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
      <BaobabDivider fill="#fbf6ee" />
    </section>
  );
}

export function TgQuickFacts({ items, ariaLabel }: {
  items: readonly { label: string; text: string; icon: TarangireIcon; links?: readonly { label: string; href: string }[] }[];
  ariaLabel: string;
}) {
  return (
    <section aria-label={ariaLabel} className="relative z-20 -mt-12 pb-10 sm:-mt-16">
      <Container>
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-sand bg-sand shadow-lift sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.label} className="bg-white p-5 sm:p-6">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
                  <Icon aria-hidden="true" size={17} />{item.label}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-earth">{item.text}</dd>
                {item.links ? (
                  <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {item.links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-semibold text-terracotta underline underline-offset-4">{link.label}</Link>)}
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

export function TgStory({ data, headingId }: {
  data: { image: string; imageAlt: string; eyebrow: string; title: string; paragraphs: readonly string[]; pullQuote?: string };
  headingId: string;
}) {
  return (
    <section aria-labelledby={headingId} className="py-16 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading id={headingId} eyebrow={data.eyebrow} title={data.title} align="left" />
          <div className="space-y-5 text-base leading-8 text-muted">
            {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {data.pullQuote ? <blockquote className="mt-7 border-l-[3px] border-gold pl-5 font-heading text-xl italic leading-relaxed text-earth">{data.pullQuote}</blockquote> : null}
        </div>
        <div className="img-zoom relative min-h-[360px] overflow-hidden rounded-[2rem] bg-sand sm:min-h-[480px]">
          <SmartImage src={data.image} alt={data.imageAlt} sizes="(max-width: 768px) 100vw, 50vw" fill className="object-cover" />
        </div>
      </Container>
    </section>
  );
}

export function BaobabDivider({ fill = "#fbf6ee" }: { fill?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 150" preserveAspectRatio="none" className="block h-16 w-full md:h-24">
      <path d="M0 94C210 63 384 119 594 86C810 52 1004 108 1212 76C1310 61 1380 70 1440 80V150H0Z" fill={fill} />
      <g fill="#2a1f17">
        <path d="M95 101V62H106V101Z" /><path d="M72 65C77 43 90 38 101 47C111 31 130 40 133 58C149 51 160 66 155 79H73C67 75 68 69 72 65Z" />
        <path d="M331 106V46H343V106Z" /><path d="M305 50C309 29 326 23 338 34C349 15 371 25 373 43C392 38 401 55 394 68H306C299 63 300 55 305 50Z" />
        <path d="M622 94V55H633V94Z" /><path d="M600 59C604 42 617 36 628 46C640 30 659 38 661 55C676 51 686 65 680 77H601C595 73 596 64 600 59Z" />
        <path d="M884 96V38H896V96Z" /><path d="M858 42C862 22 879 16 891 27C903 8 924 18 926 36C945 31 954 48 947 60H859C852 55 853 47 858 42Z" />
        <path d="M1159 89V57H1170V89Z" /><path d="M1137 60C1141 43 1155 37 1165 47C1177 31 1196 39 1198 56C1214 52 1223 66 1217 78H1138C1132 74 1133 65 1137 60Z" />
        <path d="M1344 96V48H1356V96Z" /><path d="M1321 52C1325 33 1340 27 1351 37C1363 20 1383 28 1385 46C1402 42 1412 57 1405 70H1322C1316 66 1317 57 1321 52Z" />
      </g>
    </svg>
  );
}

export function TgWhyCards({ data }: { data: typeof import("@/data/tarangire").tarangirePage.why }) {
  return (
    <section aria-labelledby="tarangire-why-heading" className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeading id="tarangire-why-heading" eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card, index) => {
            const Icon = icons[card.icon];
            return (
              <StaggerItem key={card.title}>
                <article className="h-full rounded-3xl border border-white/75 bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:p-8 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <Icon aria-hidden="true" className="size-8 text-terracotta" />
                  <span className="mt-4 block font-heading text-3xl text-gold">0{index + 1}</span>
                  <h3 className="mt-2 font-heading text-2xl text-earth">{card.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{card.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}

export function TgExploreTiles({ data }: { data: typeof import("@/data/tarangire").tarangirePage.explore }) {
  return (
    <section aria-labelledby="tarangire-explore-heading" className="py-16 md:py-24">
      <Container>
        <SectionHeading id="tarangire-explore-heading" eyebrow={data.eyebrow} title={data.title} />
        <div className="grid gap-5 md:grid-cols-3">
          {data.tiles.map((tile, index) => (
            <Link key={tile.href} href={tile.href} className="group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl bg-earth p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta sm:p-8">
              <SmartImage src={tile.image} alt={tile.alt} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/45 to-transparent" />
              <span className="relative mb-3 inline-flex size-9 items-center justify-center rounded-full border border-white/60 text-xs font-bold text-white">0{index + 1}</span>
              <h3 className="relative font-heading text-2xl text-white">{tile.title}</h3>
              <p className="relative mt-2 text-sm leading-6 text-white/85">{tile.text}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <p className="text-sm font-semibold text-earth">{data.pairsWellLabel}</p>
          {data.pairsWell.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-earth/15 bg-white px-4 text-sm font-semibold text-earth hover:border-terracotta hover:text-terracotta">{item.label}</Link>)}
        </div>
      </Container>
    </section>
  );
}

export function TgWildlifeBento({ data }: { data: typeof import("@/data/tarangire").tarangirePage.wildlife }) {
  const spans = [
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
  ];
  return (
    <section aria-labelledby="tarangire-wildlife-heading" className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeading id="tarangire-wildlife-heading" eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
          {data.items.map((item, index) => (
            <StaggerItem key={item.name} className={spans[index]}>
              <article className="group relative isolate h-full min-h-[250px] overflow-hidden rounded-3xl bg-earth shadow-card">
                <SmartImage src={item.image} alt={item.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="inline-flex min-h-7 items-center rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-earth">{item.frequency}</span>
                  <h3 className="mt-3 font-heading text-xl text-white sm:text-2xl">{item.name}</h3>
                  <p className="mt-1 text-sm leading-5 text-white/85">{item.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Callout variant="note" className="mx-auto mt-7 max-w-4xl">{data.callout}</Callout>
      </Container>
    </section>
  );
}

export function TgInfoCards({ id, data, columns = "sm:grid-cols-2 lg:grid-cols-3" }: {
  id: string;
  data: { eyebrow: string; title: string; cards: readonly { title: string; text: string; link?: { label: string; href: string } }[] };
  columns?: string;
}) {
  return (
    <section aria-labelledby={id} className="py-16 md:py-24">
      <Container>
        <SectionHeading id={id} eyebrow={data.eyebrow} title={data.title} />
        <div className={`grid gap-4 ${columns}`}>
          {data.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.035}>
              <article className="h-full rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
                <span className="font-heading text-3xl text-gold">0{index + 1}</span>
                <h3 className="mt-3 font-heading text-2xl text-earth">{card.title}</h3>
                <p className="mt-3 leading-7 text-muted">{card.text}</p>
                {card.link ? <Link href={card.link.href} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-terracotta underline underline-offset-4">{card.link.label}</Link> : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TgCompare({ id, eyebrow, title, caption, rowHeader, columns, rows, closing }: {
  id: string;
  eyebrow: string;
  title: string;
  caption: string;
  rowHeader: string;
  columns: readonly string[];
  rows: readonly { label: string; values: readonly string[] }[];
  closing?: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        <div className="hidden overflow-hidden rounded-2xl border border-sand shadow-card md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <caption className="sr-only">{caption}</caption>
              <thead className="bg-forest text-cream">
                <tr>
                  <th scope="col" className="sticky left-0 z-10 bg-forest px-4 py-4 font-semibold">{rowHeader}</th>
                  {columns.map((column) => <th key={column} scope="col" className="px-4 py-4 font-semibold">{column}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={row.label} className={rowIndex % 2 === 0 ? "bg-white" : "bg-cream"}>
                    <th scope="row" className={`sticky left-0 z-10 px-4 py-4 text-left font-semibold text-earth ${rowIndex % 2 === 0 ? "bg-white" : "bg-cream"}`}>{row.label}</th>
                    {row.values.map((value, index) => <td key={`${row.label}-${index}`} className="px-4 py-4 leading-6 text-muted">{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid gap-4 md:hidden">
          {columns.map((column, columnIndex) => (
            <article key={column} className="rounded-3xl border border-white bg-white p-5 shadow-card">
              <h3 className="font-heading text-2xl text-earth">{column}</h3>
              <dl className="mt-4 space-y-3">
                {rows.map((row) => (
                  <div key={row.label} className="border-t border-sand pt-3">
                    <dt className="text-xs font-bold uppercase tracking-wider text-terracotta">{row.label}</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted">{row.values[columnIndex]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-sm leading-7 text-muted">{closing ?? caption}</p>
      </Container>
    </section>
  );
}

export function TgJourneys({ id, eyebrow, title, subtitle, callout, browse, secondary, empty, emptyLinkLabel, emptyLinkHref, packageSlugs }: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  callout?: string;
  browse: { label: string; href: string };
  secondary: { label: string; href: string };
  empty: string;
  emptyLinkLabel: string;
  emptyLinkHref: string;
  packageSlugs: readonly string[];
}) {
  const packages: PackageCardProps[] = packageSlugs.flatMap((slug) => {
    const item = safaris.find((candidate) => candidate.slug === slug);
    return item ? [{
      slug: item.slug,
      title: item.title,
      days: item.days,
      parks: item.parks,
      summary: item.summary,
      priceFrom: null,
      image: { src: item.image, alt: `${item.title} safari in ${item.parks.join(", ")}` },
      href: `/safaris/packages/${item.slug}`,
      hidePrice: true,
    }] : [];
  });

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 bg-cream py-16 md:py-24">
      <Container>
        <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {packages.length ? (
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {packages.map((item) => <StaggerItem key={item.slug}><PackageCard {...item} /></StaggerItem>)}
          </StaggerGroup>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl bg-sand p-6 text-center">
            <p className="leading-7 text-muted">{empty}</p>
            <Link href={emptyLinkHref} className="mt-4 inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4">{emptyLinkLabel}</Link>
          </div>
        )}
        {callout ? <Callout variant="note" className="mx-auto mt-7 max-w-4xl">{callout}</Callout> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={browse.href} className="inline-flex min-h-11 items-center justify-center rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-white hover:bg-terracotta-hover">{browse.label}</Link>
          <Link href={secondary.href} className="inline-flex min-h-11 items-center justify-center rounded-full border border-terracotta px-5 py-3 text-sm font-semibold text-terracotta hover:bg-terracotta hover:text-white">{secondary.label}</Link>
        </div>
      </Container>
    </section>
  );
}

export function TgPractical({ data, id }: {
  data: { eyebrow: string; title: string; items: readonly { title: string; text: string; link?: { label: string; href: string } }[] };
  id: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeading id={id} eyebrow={data.eyebrow} title={data.title} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.035}>
              <article className="h-full rounded-3xl border border-white bg-white p-6 shadow-card">
                <span className="font-heading text-3xl text-gold">0{index + 1}</span>
                <h3 className="mt-3 font-heading text-xl text-earth">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                {item.link ? <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-terracotta underline underline-offset-4">{item.link.label}</a> : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TgFaq({ id, section, items }: {
  id: string;
  section: { eyebrow: string; title: string };
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section aria-labelledby={id} className="py-16 md:py-24">
      <Container className="max-w-5xl">
        <SectionHeading id={id} eyebrow={section.eyebrow} title={section.title} />
        <FaqAccordion items={[...items]} jsonLd />
      </Container>
    </section>
  );
}

export function TgCta({ data }: {
  data: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    primary: { label: string; href: string };
    secondaryLabel: string;
    whatsappMessage: string;
  };
}) {
  return (
    <CtaBanner
      eyebrow={data.eyebrow}
      title={data.title}
      description={data.description}
      image={{ src: data.image, alt: data.imageAlt }}
      primaryCta={data.primary}
      secondaryCta={{ label: data.secondaryLabel, href: siteConfig.whatsappUrlWithMessage(data.whatsappMessage) }}
      parallax={false}
    />
  );
}
