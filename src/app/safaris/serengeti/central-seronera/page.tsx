import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Binoculars, Bird, Camera, Compass, Mountain, PawPrint,
} from "lucide-react";
import BalloonSpotlight from "@/components/destinations/BalloonSpotlight";
import DaySchedule from "@/components/destinations/DaySchedule";
import { DestinationSection, SubRegionLayout } from "@/components/destinations/Layouts";
import {
  GettingThere, SeasonCards, SeasonGrid, SightingGuide,
  StayTiers, TipsGrid,
} from "@/components/destinations/Editorial";
import PackagesCarousel from "@/components/destinations/PackagesCarouselServer";
import SidebarFacts from "@/components/destinations/SidebarFacts";
import Callout from "@/components/inner/Callout";
import FaqAccordion from "@/components/inner/FaqAccordion";
import Prose from "@/components/inner/Prose";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import JsonLd from "@/components/seo/JsonLd";
import { centralSeronera } from "@/data/destinations/serengeti";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  ...centralSeronera.meta,
  path: "/safaris/serengeti/central-seronera",
  image: centralSeronera.hero.image,
});

const LazyZoneExplorer = dynamic(
  () => import("@/components/destinations/Interactive").then((module) => module.ZoneExplorer),
  { ssr: true, loading: () => <div className="min-h-[28rem] rounded-3xl bg-sand" aria-hidden="true" /> },
);

const touristDestinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Central Serengeti and Seronera Valley",
  description: centralSeronera.meta.description,
  url: new URL("/safaris/serengeti/central-seronera", siteConfig.url).toString(),
  image: new URL(centralSeronera.hero.image, siteConfig.url).toString(),
  containedInPlace: { "@type": "TouristDestination", name: "Serengeti National Park" },
};

const faqJsonLd = buildFaqJsonLd(centralSeronera.faqs);
const highlightIcons = [PawPrint, Bird, Mountain, Compass, Binoculars, Camera];

export default function CentralSeroneraPage() {
  return (
    <SubRegionLayout
      hero={centralSeronera.hero}
      breadcrumbs={centralSeronera.breadcrumbs}
      nav={centralSeronera.nav}
      related={centralSeronera.related}
      relatedTitle="Explore More of the Serengeti"
      cta={centralSeronera.cta}
      ctaImage="/images/destinations/serengeti/seronera/cta.jpg"
    >
      <JsonLd data={touristDestinationJsonLd} />

      <DestinationSection id="overview" tone="cream">
        <SectionHeading eyebrow={centralSeronera.overview.eyebrow} title={centralSeronera.overview.title} subtitle="Start with the valley's character, then follow its water, landscapes and wildlife into the details." align="left" />
        <div className="grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <Prose>
            <p>{centralSeronera.overview.lead}</p>
            <p>{centralSeronera.overview.body}</p>
          </Prose>
          <SidebarFacts items={centralSeronera.sidebarFacts} />
        </div>
      </DestinationSection>

      <DestinationSection id="highlights" tone="sand">
        <SectionHeading eyebrow="THE SERONERA DIFFERENCE" title="A Valley Full of Character" subtitle="These are the details that make a few days here feel distinct." />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {centralSeronera.highlights.map((item, index) => {
            const Icon = highlightIcons[index % highlightIcons.length];
            return <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-sand bg-white p-6 shadow-sm">
                <Icon aria-hidden="true" className="size-6 text-terracotta" />
                <h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            </StaggerItem>;
          })}
        </StaggerGroup>
      </DestinationSection>

      <DestinationSection id="landscape" tone="cream">
        <SectionHeading eyebrow="READ THE LANDSCAPE" title="Four Ways to See the Valley" subtitle="Each habitat rewards a different pace, light and kind of attention." />
        <Suspense fallback={<div className="min-h-[28rem] rounded-3xl bg-sand" />}>
          <LazyZoneExplorer zones={centralSeronera.zones} />
        </Suspense>
      </DestinationSection>

      <DestinationSection id="wildlife" tone="sand">
        <SectionHeading eyebrow="WHO YOU MAY MEET" title="A Patient Guide to Sightings" subtitle="Wildlife moves on its own terms, and knowing where to look is only part of the story." />
        <SightingGuide items={centralSeronera.sightings} />
        <Callout variant="note" title="Keep expectations honest" className="mt-6">Wildlife is wild. Sightings are never guaranteed. The likelihood guide reflects general patterns, not a promise.</Callout>
      </DestinationSection>

      <DestinationSection id="best-time" tone="cream">
        <SectionHeading eyebrow="SEASON BY SEASON" title="When to Visit Seronera" subtitle="The resident wildlife offers a reason to come in every season, with changing light and movement." />
        <SeasonGrid data={centralSeronera.seasons} />
        <SeasonCards items={centralSeronera.seasons.cards} />
        <Callout variant="tip" title="Make space for quiet" className="mt-7">{centralSeronera.crowdNote}</Callout>
      </DestinationSection>

      <DestinationSection id="a-day-here" tone="sand">
        <SectionHeading eyebrow="A DAY IN THE VALLEY" title="Follow the Light" subtitle="The day has a natural rhythm, with time to watch, rest and return to the plains." />
        <DaySchedule items={centralSeronera.schedule} />
        <div className="mt-12"><SectionHeading eyebrow="A FEW THOUGHTFUL DETAILS" title="Make the Most of Every Drive" subtitle="Simple habits help you settle into the landscape." align="left" /></div>
        <TipsGrid items={centralSeronera.tips} />
      </DestinationSection>

      <DestinationSection id="balloon" tone="forest">
        <BalloonSpotlight data={centralSeronera.balloon} />
      </DestinationSection>

      <DestinationSection id="getting-there" tone="cream">
        <SectionHeading eyebrow="ARRIVING IN SERONERA" title="Getting to the Central Valley" subtitle="Road and air both bring you here, with different ways to experience the journey." />
        <GettingThere data={centralSeronera.gettingThere} />
      </DestinationSection>

      <DestinationSection id="stay" tone="sand">
        <SectionHeading eyebrow="WHERE TO REST" title="Choose Your Kind of Camp" subtitle="Stay close to the river and kopjes, and choose the level of comfort that suits your time in the valley." />
        <StayTiers {...centralSeronera.stay} />
      </DestinationSection>

      <DestinationSection id="journeys" tone="cream">
        <SectionHeading eyebrow="BUILD YOUR ROUTE" title={centralSeronera.journeys.title} subtitle={centralSeronera.journeys.subtitle} />
        <PackagesCarousel {...centralSeronera.journeys} />
      </DestinationSection>

      <DestinationSection id="faq" tone="sand">
        <SectionHeading eyebrow="SERONERA, MADE CLEAR" title="Questions About the Central Serengeti" subtitle="Use these practical answers as a starting point for your own plans." />
        <FaqAccordion items={centralSeronera.faqs} />
        <JsonLd data={faqJsonLd} />
      </DestinationSection>
    </SubRegionLayout>
  );
}
