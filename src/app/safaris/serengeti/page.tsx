import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Callout from "@/components/inner/Callout";
import ComparisonTable from "@/components/inner/ComparisonTable";
import FaqAccordion from "@/components/inner/FaqAccordion";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/motion/Marquee";
import { DestinationHubLayout, DestinationSection } from "@/components/destinations/Layouts";
import {
  ExperienceCards, FactStrip, GettingThere, PullQuote, SeasonCards, SeasonGrid,
  StayTiers, WildlifeShowcase,
} from "@/components/destinations/Editorial";
import PackagesCarousel from "@/components/destinations/PackagesCarouselServer";
import JsonLd from "@/components/seo/JsonLd";
import { safariHub } from "@/data/safariHub";
import { serengetiHub } from "@/data/destinations/serengeti";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  ...serengetiHub.meta,
  path: "/safaris/serengeti",
  image: serengetiHub.hero.image,
});

const LazyRegionExplorer = dynamic(
  () => import("@/components/destinations/Interactive").then((module) => module.RegionExplorer),
  { ssr: true, loading: () => <div className="min-h-[28rem] rounded-3xl bg-sand" aria-hidden="true" /> },
);
const LazyHowManyDays = dynamic(
  () => import("@/components/destinations/Interactive").then((module) => module.HowManyDays),
  { ssr: true, loading: () => <div className="min-h-64 rounded-3xl bg-sand" aria-hidden="true" /> },
);
const LazyMigrationExplorer = dynamic(() => import("@/components/safaris/MigrationExplorer"), {
  ssr: true, loading: () => <div className="min-h-96 rounded-3xl bg-white/10" aria-hidden="true" />,
});

const touristDestinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Serengeti National Park",
  description: serengetiHub.meta.description,
  url: new URL("/safaris/serengeti", siteConfig.url).toString(),
  image: new URL(serengetiHub.hero.image, siteConfig.url).toString(),
  containedInPlace: { "@type": "Country", name: "Tanzania" },
};

const faqJsonLd = buildFaqJsonLd(serengetiHub.faqs);

export default function SerengetiPage() {
  return (
    <DestinationHubLayout
      hero={serengetiHub.hero}
      breadcrumbs={serengetiHub.breadcrumbs}
      nav={serengetiHub.nav}
      related={serengetiHub.related}
      cta={serengetiHub.cta}
      ctaImage="/images/destinations/serengeti/cta.jpg"
    >
      <JsonLd data={touristDestinationJsonLd} />
      <DestinationSection id="overview" tone="cream">
        <SectionHeading eyebrow={serengetiHub.overview.eyebrow} title={serengetiHub.overview.title} subtitle="Begin with the scale of this wilderness, then find the regions and seasons that make it your own." align="left" />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <p className="text-lead leading-8">{serengetiHub.overview.lead}</p>
          <p className="text-base leading-8 text-muted">{serengetiHub.overview.body}</p>
        </div>
        <div className="mt-14"><FactStrip items={serengetiHub.facts} footnote={serengetiHub.factFootnote} /></div>
        <div className="mt-16"><PullQuote quote={serengetiHub.pullQuote} /></div>
      </DestinationSection>

      <DestinationSection id="regions" tone="sand">
        <SectionHeading eyebrow="FIND YOUR SERENGETI" title="Four Regions, One Great Wilderness" subtitle="Each part of the Serengeti has its own character and season. Explore the map to find yours." />
        <Suspense fallback={<div className="min-h-[28rem] rounded-3xl bg-white" />}>
          <LazyRegionExplorer regions={serengetiHub.regions} pins={serengetiHub.pins} note={serengetiHub.regionNote} />
        </Suspense>
        <div className="mt-12">
          <ComparisonTable caption="Compare Serengeti regions by wildlife, season, crowds and access" columns={serengetiHub.regionComparison.columns.slice(1)} rows={serengetiHub.regionComparison.rows.map(({ label, values }) => ({ label, values }))} />
          <p className="mt-3 text-xs leading-5 text-muted">{serengetiHub.regionComparison.note}</p>
        </div>
      </DestinationSection>

      <DestinationSection id="migration" tone="forest">
        <SectionHeading eyebrow={serengetiHub.migration.eyebrow} title={serengetiHub.migration.title} subtitle={serengetiHub.migration.subtitle} tone="light" />
        <Suspense fallback={<div className="min-h-96 rounded-3xl bg-white/10" />}>
          <LazyMigrationExplorer migration={safariHub.migration} initialMonth="July" />
        </Suspense>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="text-sm text-cream/75">{serengetiHub.migration.note} {/* TODO(CONFIRM): verify migration timing. */}</p>
          <a href="/safaris/serengeti/great-migration" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream">Read the Great Migration Guide<ArrowRight size={17} /></a>
        </div>
      </DestinationSection>

      <DestinationSection id="wildlife" tone="cream">
        <SectionHeading eyebrow="LIFE ON THE PLAINS" title="Wildlife, Without a Script" subtitle="The drama changes by the hour, so let the landscape set the pace." />
        <Marquee items={serengetiHub.wildlife.map(({ name }) => <span key={name} className="font-heading text-2xl text-terracotta/80">{name}</span>)} className="mb-8 py-4" />
        <WildlifeShowcase items={serengetiHub.wildlife} note={serengetiHub.wildlifeNote} />
      </DestinationSection>

      <DestinationSection id="when-to-go" tone="sand">
        <SectionHeading eyebrow="A YEAR IN THE WILD" title="When to Visit the Serengeti" subtitle="Once you have chosen a region, the seasons help shape what each day may hold." />
        <SeasonGrid data={serengetiHub.seasons} />
        <SeasonCards items={serengetiHub.seasons.cards} />
        <Callout variant="tip" title="What to pack" className="mt-7">{serengetiHub.packingNote}</Callout>
      </DestinationSection>

      <DestinationSection id="getting-there" tone="cream">
        <SectionHeading eyebrow="THE JOURNEY IN" title="Getting to the Serengeti" subtitle="Choose the route that gives your itinerary the right balance of time, scenery and game viewing." />
        <GettingThere data={serengetiHub.gettingThere} />
      </DestinationSection>

      <DestinationSection id="experiences" tone="sand">
        <SectionHeading eyebrow="MAKE IT YOURS" title="Experiences Across the Plains" subtitle="From the road to the sky, thoughtful experiences add texture to your days." />
        <ExperienceCards items={serengetiHub.experiences} variant="overlay" />
      </DestinationSection>

      <DestinationSection id="stay" tone="cream">
        <SectionHeading eyebrow="REST IN THE WILD" title="A Stay That Suits Your Safari" subtitle="Your base shapes the rhythm of each day, and the right choice begins with how you like to travel." />
        <StayTiers {...serengetiHub.stay} />
      </DestinationSection>

      <DestinationSection id="plan" tone="sand">
        <SectionHeading eyebrow="FIND YOUR PACE" title="How Many Days in the Serengeti?" subtitle="A little more time opens up more of the landscape, but even a short stay can be meaningful." />
        <LazyHowManyDays options={serengetiHub.days} />
      </DestinationSection>

      <DestinationSection id="journeys" tone="cream">
        <SectionHeading eyebrow="A STARTING POINT" title={serengetiHub.journeys.title} subtitle={serengetiHub.journeys.subtitle} />
        <PackagesCarousel {...serengetiHub.journeys} />
      </DestinationSection>

      <DestinationSection id="faq" tone="sand">
        <SectionHeading eyebrow="PLAN WITH CONFIDENCE" title="Serengeti Safari Questions" subtitle="A few clear answers can make the first decisions feel easier." />
        <FaqAccordion items={serengetiHub.faqs} />
        <JsonLd data={faqJsonLd} />
      </DestinationSection>
    </DestinationHubLayout>
  );
}
