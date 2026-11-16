import Link from "next/link";
import { ArrowRight, Bird, Compass, Footprints, PawPrint, ShieldCheck, UsersRound } from "lucide-react";
import Callout from "@/components/inner/Callout";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { BaobabAnatomy, StayZonesDiagram, TarangireStayFinder, TarangireYear, TgStayGrid } from "@/components/tarangire/TarangireInteractions";
import {
  BaobabDivider,
  TgCta,
  TgExploreTiles,
  TgFaq,
  TgHero,
  TgInfoCards,
  TgJourneys,
  TgPractical,
  TgQuickFacts,
  TgStory,
  TgCompare,
  TgWildlifeBento,
  TgWhyCards,
} from "@/components/tarangire/TarangireShared";
import { tarangireBreadcrumbs, tarangirePage } from "@/data/tarangire";
import { tarangireElephantsBreadcrumbs, tarangireElephantsPage as elephantData } from "@/data/tarangire-elephants-baobabs";
import {
  tarangireStayFinderKaratuSlugs,
  tarangireStays,
  tarangireStaysBreadcrumbs,
  tarangireStayPage,
} from "@/data/tarangire-stays";
import { ngorongoroStays } from "@/data/ngorongoro-stays";

function HubStructuredData() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: "Tarangire National Park",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Northern Tanzania",
        addressCountry: "TZ",
      },
    }} />
  );
}

function ElephantsStructuredData() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: elephantData.metadata.title,
      about: { "@type": "Place", name: "Tarangire National Park" },
    }} />
  );
}

function StaysStructuredData() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: tarangireStayPage.metadata.title,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: tarangireStays.map((stay, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: stay.name,
        })),
      },
    }} />
  );
}

function TarangireJourneySection({ page, id, callout }: {
  page: {
    eyebrow: string;
    title: string;
    subtitle: string;
    browse: { label: string; href: string };
    secondary: { label: string; href: string };
    empty: string;
    emptyLinkLabel: string;
    emptyLinkHref: string;
    packageSlugs: readonly string[];
  };
  id: string;
  callout?: string;
}) {
  return (
    <TgJourneys
      id={id}
      eyebrow={page.eyebrow}
      title={page.title}
      subtitle={page.subtitle}
      callout={callout}
      browse={page.browse}
      secondary={page.secondary}
      empty={page.empty}
      emptyLinkLabel={page.emptyLinkLabel}
      emptyLinkHref={page.emptyLinkHref}
      packageSlugs={page.packageSlugs}
    />
  );
}

export function TarangireHubPage() {
  const data = tarangirePage;

  return (
    <main>
      <HubStructuredData />
      <TgHero data={data.hero} breadcrumbs={tarangireBreadcrumbs} headingId="tarangire-hub-title" />
      <TgQuickFacts items={data.quickFacts} ariaLabel={data.quickFactsLabel} />
      <TgStory data={data.story} headingId="tarangire-story-heading" />
      <BaobabDivider fill="#f1e6d3" />

      <TgWhyCards data={data.why} />
      <TgExploreTiles data={data.explore} />
      <TgWildlifeBento data={data.wildlife} />

      <section id={data.year.id} aria-labelledby="tarangire-year-heading" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="tarangire-year-heading" eyebrow={data.year.eyebrow} title={data.year.title} subtitle={data.year.intro} tone="light" />
          <TarangireYear data={data.year} />
        </Container>
        <BaobabDivider fill="#fbf6ee" />
      </section>

      <TgInfoCards id="tarangire-duration-heading" data={data.duration} />

      <TgCompare
        id="tarangire-comparison-heading"
        eyebrow={data.compare.eyebrow}
        title={data.compare.title}
        caption={data.compare.title}
        rowHeader={data.compare.rowHeader}
        columns={data.compare.columns}
        rows={data.compare.rows}
        closing={data.compare.closing}
      />

      <TarangireJourneySection page={data.journeys} id={data.journeys.id} callout={data.journeys.callout} />
      <TgPractical id="tarangire-practical-heading" data={data.practical} />
      <TgFaq id="tarangire-faq-heading" section={data.faqSection} items={data.faq} />
      <TgCta data={data.cta} />
    </main>
  );
}

export function TarangireElephantsPage() {
  const data = elephantData;

  return (
    <main>
      <ElephantsStructuredData />
      <TgHero data={data.hero} breadcrumbs={tarangireElephantsBreadcrumbs} headingId="tarangire-elephants-title" />
      <TgQuickFacts items={data.quickFacts} ariaLabel={data.quickFactsLabel} />
      <TgStory data={data.story} headingId="tarangire-elephants-story-heading" />

      <section id={data.baobab.id} aria-labelledby="tarangire-baobab-heading" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="tarangire-baobab-heading" eyebrow={data.baobab.eyebrow} title={data.baobab.title} subtitle={data.baobab.intro} tone="light" />
          <BaobabAnatomy
            parts={data.baobab.parts}
            label={data.baobab.diagramLabel}
            description={data.baobab.diagramDescription}
            ageLabel={data.baobab.ageLabel}
            ageText={data.baobab.ageText}
            caption={data.baobab.caption}
          />
        </Container>
        <BaobabDivider fill="#fbf6ee" />
      </section>

      <section aria-labelledby="tarangire-elephant-family-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-elephant-family-heading" eyebrow={data.elephantFamilies.eyebrow} title={data.elephantFamilies.title} subtitle={data.elephantFamilies.intro} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.elephantFamilies.cards.map((card, index) => {
              const icons = [UsersRound, PawPrint, Footprints, Compass] as const;
              const Icon = icons[index] ?? PawPrint;
              return (
                <article key={card.id} className="rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-7">
                  <Icon aria-hidden="true" className="size-8 text-terracotta" />
                  <h3 className="mt-4 font-heading text-xl text-earth">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-center leading-7 text-muted">{data.elephantFamilies.closing}</p>
        </Container>
      </section>

      <section aria-labelledby="tarangire-elephant-relationship-heading" className="bg-sand py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-elephant-relationship-heading" eyebrow={data.relationship.eyebrow} title={data.relationship.title} />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-white bg-white p-6 shadow-card sm:p-8">
              <p className="leading-8 text-muted">{data.relationship.left}</p>
            </article>
            <article className="rounded-3xl border border-white bg-white p-6 shadow-card sm:p-8">
              <p className="leading-8 text-muted">{data.relationship.right}</p>
            </article>
          </div>
          <Callout variant="tip" className="mx-auto mt-6 max-w-4xl">{data.relationship.callout}</Callout>
        </Container>
      </section>

      <section id={data.spots.id} aria-labelledby="tarangire-spots-heading" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-spots-heading" eyebrow={data.spots.eyebrow} title={data.spots.title} subtitle={data.spots.intro} />
          <div className="grid gap-5 md:grid-cols-3">
            {data.spots.places.map((place) => (
              <article key={place.title} className="overflow-hidden rounded-3xl border border-sand bg-white shadow-card">
                <div className="img-zoom relative aspect-[4/3] bg-sand">
                  <SmartImage src={place.image} alt={place.alt} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-earth">{place.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{place.text}</p>
                  <p className="mt-4 border-t border-sand pt-4 text-xs font-bold uppercase tracking-wider text-terracotta">{place.best}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id={data.year.id} aria-labelledby="tarangire-elephant-year-heading" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="tarangire-elephant-year-heading" eyebrow={data.year.eyebrow} title={data.year.title} tone="light" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.year.seasons.map((season, index) => (
              <li key={season.id} className="rounded-3xl border border-white/15 bg-white/5 p-6">
                <span className="font-heading text-3xl text-gold">0{index + 1}</span>
                <h3 className="mt-4 font-heading text-xl text-white">{season.title}</h3>
                <p className="mt-3 text-sm leading-6 text-cream/85">{season.text}</p>
              </li>
            ))}
          </ol>
        </Container>
        <BaobabDivider fill="#f1e6d3" />
      </section>

      <TgInfoCards id="tarangire-photo-tips-heading" data={{ eyebrow: data.photography.eyebrow, title: data.photography.title, cards: data.photography.tips }} columns="sm:grid-cols-2 lg:grid-cols-4" />

      <section aria-labelledby="tarangire-elephant-etiquette-heading" className="bg-cream py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-elephant-etiquette-heading" eyebrow={data.etiquette.eyebrow} title={data.etiquette.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.etiquette.rules.map((rule) => (
              <article key={rule.title} className="rounded-2xl border border-sand bg-white p-5 shadow-sm">
                <ShieldCheck aria-hidden="true" className="size-6 text-forest" />
                <h3 className="mt-3 font-heading text-xl text-earth">{rule.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{rule.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="tarangire-full-cast-heading" className="bg-sand py-12 md:py-16">
        <Container className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
          <Bird aria-hidden="true" className="size-10 shrink-0 text-terracotta" />
          <div className="flex-1">
            <p className="text-eyebrow text-terracotta">{data.more.eyebrow}</p>
            <h2 id="tarangire-full-cast-heading" className="mt-2 text-3xl text-earth">{data.more.title}</h2>
            <p className="mt-3 leading-7 text-muted">{data.more.text}</p>
          </div>
          <Link href={data.more.link.href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-terracotta px-5 py-3 text-sm font-semibold text-terracotta hover:bg-terracotta hover:text-white">
            {data.more.link.label}<ArrowRight aria-hidden="true" size={16} />
          </Link>
        </Container>
      </section>

      <section aria-labelledby="tarangire-plan-links-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-plan-links-heading" eyebrow={data.plan.eyebrow} title={data.plan.title} />
          <div className="mb-9 grid gap-4 md:grid-cols-3">
            {data.plan.links.map((item) => (
              <Link key={item.href} href={item.href} className="group flex min-h-28 items-center justify-between gap-4 rounded-2xl border border-sand bg-white p-5 shadow-card hover:border-terracotta">
                <span className="font-heading text-xl text-earth">{item.title}</span>
                <ArrowRight aria-hidden="true" className="shrink-0 text-terracotta transition-transform group-hover:translate-x-1" size={18} />
              </Link>
            ))}
          </div>
          <TgJourneys
            id="journeys"
            eyebrow={data.plan.eyebrow}
            title={data.plan.title}
            subtitle={data.plan.journeySubtitle}
            browse={data.plan.browse}
            secondary={data.plan.planButton}
            empty={data.plan.empty}
            emptyLinkLabel={data.plan.emptyLinkLabel}
            emptyLinkHref={data.plan.emptyLinkHref}
            packageSlugs={tarangirePage.journeys.packageSlugs}
          />
        </Container>
      </section>

      <TgFaq id="tarangire-elephant-faq-heading" section={data.faqSection} items={data.faq} />
      <TgCta data={data.cta} />
    </main>
  );
}

export function TarangireStayPage() {
  const data = tarangireStayPage;
  const karatuSlugs: readonly string[] = tarangireStayFinderKaratuSlugs;
  const karatuStays = ngorongoroStays.filter((stay) => karatuSlugs.includes(stay.slug) && stay.region === "karatu");

  return (
    <main>
      <StaysStructuredData />
      <TgHero data={data.hero} breadcrumbs={tarangireStaysBreadcrumbs} headingId="tarangire-stays-title" />
      <TgQuickFacts items={data.quickFacts} ariaLabel={data.quickFactsLabel} />
      <TgStory data={data.story} headingId="tarangire-stays-story-heading" />

      <section id={data.zones.id} aria-labelledby="tarangire-stay-zones-heading" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="tarangire-stay-zones-heading" eyebrow={data.zones.eyebrow} title={data.zones.title} tone="light" />
          <StayZonesDiagram data={data.zones} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {data.zones.items.map((item) => (
              <article key={item.id} className="rounded-3xl border border-white/15 bg-white/5 p-6">
                <h3 className="font-heading text-2xl text-white">{item.title}</h3>
                <p className="mt-4 leading-7 text-cream/85">{item.why}</p>
                <p className="mt-3 text-sm leading-6 text-cream/75">{item.know}</p>
                <p className="mt-4 text-sm font-semibold text-gold">{data.zones.bestForLabel} {item.bestFor}</p>
              </article>
            ))}
          </div>
        </Container>
        <BaobabDivider fill="#fbf6ee" />
      </section>

      <section id={data.finder.id} aria-labelledby="tarangire-finder-heading" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-finder-heading" eyebrow={data.finder.eyebrow} title={data.finder.title} subtitle={data.finder.intro} />
          <TarangireStayFinder questions={data.finder.questions} stays={tarangireStays} karatuStays={karatuStays} copy={data.finder} />
        </Container>
      </section>

      <section aria-labelledby="tarangire-stay-shortlist-heading" className="bg-sand py-16 md:py-24">
        <Container>
          <SectionHeading id="tarangire-stay-shortlist-heading" eyebrow={data.shortlist.eyebrow} title={data.shortlist.title} subtitle={data.shortlist.intro} />
          <TgStayGrid stays={tarangireStays} copy={data.shortlist} />
          <p className="mt-6 text-center text-sm leading-6 text-muted">{data.shortlist.note}</p>
        </Container>
      </section>

      <section aria-labelledby="tarangire-karatu-heading" className="py-16 md:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="tarangire-karatu-heading" eyebrow={data.karatu.eyebrow} title={data.karatu.title} align="left" />
          <div>
            <p className="text-base leading-8 text-muted">{data.karatu.text}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {data.karatu.links.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-terracotta px-5 py-3 text-sm font-semibold text-terracotta hover:bg-terracotta hover:text-white">{item.label}<ArrowRight aria-hidden="true" size={16} /></Link>)}
            </div>
          </div>
        </Container>
      </section>

      <TgCompare
        id="tarangire-activities-heading"
        eyebrow={data.activities.eyebrow}
        title={data.activities.title}
        caption={data.activities.title}
        rowHeader={data.activities.rowHeader}
        columns={data.activities.columns}
        rows={data.activities.rows}
        closing={data.activities.closing}
      />

      <TgInfoCards id="tarangire-stay-tips-heading" data={data.tips} columns="sm:grid-cols-2 lg:grid-cols-4" />

      <TarangireJourneySection page={data.journeys} id={data.journeys.id} callout={data.journeys.callout} />
      <TgFaq id="tarangire-stays-faq-heading" section={data.faqSection} items={data.faq} />
      <TgCta data={data.cta} />
    </main>
  );
}
