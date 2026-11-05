import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Compass } from "lucide-react";
import { getAllPackages } from "@/data";
import type { SerengetiRegionPageData } from "@/types/destination";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { SubRegionLayout, DestinationSection } from "@/components/destinations/Layouts";
import SerengetiMigrationFeature from "@/components/destinations/SerengetiMigrationFeature";
import { GettingThere, SeasonCards, SeasonGrid, SightingGuide, StayTiers, TipsGrid } from "@/components/destinations/Editorial";
import SidebarFacts from "@/components/destinations/SidebarFacts";
import DaySchedule from "@/components/destinations/DaySchedule";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Prose from "@/components/inner/Prose";
import Callout from "@/components/inner/Callout";
import FaqAccordion from "@/components/inner/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { ZoneExplorer } from "@/components/destinations/Interactive";

const LazyPackagesCarousel = dynamic(() => import("@/components/destinations/PackagesCarouselServer"), {
  ssr: true,
  loading: () => <div className="min-h-72 rounded-3xl bg-sand" aria-hidden="true" />,
});

export default function SerengetiRegionPage({
  data,
  path,
}: {
  data: SerengetiRegionPageData;
  path: string;
}) {
  const hasVerifiedPackage = getAllPackages().some((item) => item.parks.includes("Serengeti") && item.tags.includes(data.journeys.packageTag));
  const destinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: data.hero.title,
    description: data.meta.description,
    url: new URL(path, siteConfig.url).toString(),
    image: new URL(data.hero.image, siteConfig.url).toString(),
    containedInPlace: { "@type": "TouristDestination", name: "Serengeti National Park" },
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(data.breadcrumbs);
  const faqJsonLd = buildFaqJsonLd(data.faqs);

  return (
    <SubRegionLayout
      hero={data.hero}
      breadcrumbs={data.breadcrumbs}
      nav={data.nav}
      related={data.related}
      relatedTitle="Continue Exploring the Serengeti"
      cta={data.cta}
      ctaImage={data.ctaImage}
      ctaImageAlt={data.ctaImageAlt}
      ctaEyebrow={data.ctaEyebrow}
      whatsappMessage={data.whatsappMessage}
    >
      <JsonLd data={destinationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <DestinationSection id="overview" tone="cream">
        <SectionHeading eyebrow={data.overview.eyebrow} title={data.overview.title} subtitle={data.overview.subtitle} align="left" />
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
          <Prose>
            <p>{data.overview.lead}</p>
            <p>{data.overview.body}</p>
          </Prose>
          <div className="min-w-0">
            <dl className="grid gap-3 sm:grid-cols-2 lg:hidden">
              {data.sidebarFacts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-sand bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-terracotta">{fact.label}</dt>
                  <dd className="mt-1 text-sm leading-6 text-earth">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <SidebarFacts items={data.sidebarFacts} message={data.whatsappMessage} />
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="highlights" tone="sand">
        <SectionHeading {...data.sections.highlights} />
        <TipsGrid items={data.highlights} />
      </DestinationSection>

      <DestinationSection id="landscape" tone="cream">
        <SectionHeading {...data.sections.landscape} />
        <Suspense fallback={<div className="min-h-[28rem] rounded-3xl bg-sand" aria-hidden="true" />}>
          <ZoneExplorer zones={data.zones} />
        </Suspense>
      </DestinationSection>

      <DestinationSection id="migration" tone="forest" className="!p-0">
        <SerengetiMigrationFeature
          eyebrow={data.migration.eyebrow}
          title={data.migration.title}
          subtitle={data.migration.subtitle}
          feature={data.migration.feature}
        />
      </DestinationSection>

      <DestinationSection id="wildlife" tone="sand">
        <SectionHeading eyebrow={data.wildlife.eyebrow} title={data.wildlife.title} subtitle={data.wildlife.subtitle} />
        <div className="grid min-w-0 gap-7 xl:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] xl:items-start">
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-forest sm:min-h-[28rem] xl:sticky xl:top-[calc(var(--navbar-height,78px)+5.5rem)]">
            <SmartImage src={data.wildlife.image} alt={data.wildlife.imageAlt} sizes="(max-width: 1280px) 100vw, 38vw" fill className="object-cover" />
          </div>
          <SightingGuide items={data.wildlife.items} />
        </div>
        <Callout variant="note" title="A note on wildlife" className="mt-7">{data.wildlife.callout}</Callout>
      </DestinationSection>

      <DestinationSection id="best-time" tone="cream">
        <SectionHeading {...data.sections.seasons} />
        <SeasonGrid data={data.seasons} />
        <SeasonCards items={data.seasons.cards} />
        <Callout variant="tip" title="Seasonal patterns, not promises" className="mt-7">{data.seasonNote}</Callout>
      </DestinationSection>

      <DestinationSection id="schedule" tone="sand">
        <SectionHeading {...data.sections.schedule} />
        <DaySchedule items={data.schedule} />
      </DestinationSection>

      <DestinationSection id="tips" tone="cream">
        <SectionHeading {...data.sections.tips} />
        <TipsGrid items={data.tips} />
      </DestinationSection>

      <DestinationSection id="getting-there" tone="sand">
        <SectionHeading {...data.sections.gettingThere} />
        <GettingThere data={data.gettingThere} />
      </DestinationSection>

      <DestinationSection id="stay" tone="cream">
        <SectionHeading {...data.sections.stay} />
        <div className="mb-8 grid min-w-0 gap-6 overflow-hidden rounded-3xl border border-sand bg-white shadow-card lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-64 bg-sand sm:min-h-80">
            <SmartImage src={data.stay.image} alt={data.stay.imageAlt} sizes="(max-width: 1024px) 100vw, 58vw" fill className="object-cover" />
          </div>
          <div className="flex items-center p-6 sm:p-8">
            <p className="max-w-xl leading-7 text-muted">{data.stay.introduction}</p>
          </div>
        </div>
        <StayTiers tiers={data.stay.tiers} footnote={data.stay.footnote} href={data.stay.href} linkLabel={data.stay.linkLabel} />
      </DestinationSection>

      <DestinationSection id="journeys" tone="sand">
        {hasVerifiedPackage ? (
          <LazyPackagesCarousel park="Serengeti" tag={data.journeys.packageTag} title={data.journeys.title} subtitle={data.journeys.subtitle} />
        ) : (
          <>
            <SectionHeading {...data.sections.journeys} />
            <article className="grid min-w-0 gap-6 overflow-hidden rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-forest text-gold"><Compass aria-hidden="true" size={26} /></span>
              <div>
                <h3 className="font-heading text-2xl text-earth">{data.journeys.fallbackTitle}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{data.journeys.fallbackDescription}</p>
              </div>
              <Button href="/plan-your-safari?type=Safari" className="w-full sm:w-auto">{data.journeys.fallbackCta}<ArrowRight aria-hidden="true" size={17} /></Button>
            </article>
          </>
        )}
      </DestinationSection>

      <DestinationSection id="faq" tone="cream">
        <SectionHeading {...data.sections.faq} />
        <FaqAccordion items={data.faqs} />
        <JsonLd data={faqJsonLd} />
      </DestinationSection>
    </SubRegionLayout>
  );
}

export function getSerengetiRegionMetadata(data: SerengetiRegionPageData, path: string): Metadata {
  return buildMetadata({ ...data.meta, path, image: data.hero.image });
}
