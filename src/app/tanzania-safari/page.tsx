import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import {
  Approach, CompareDestinations, DestinationCards, FinalSafariCta, HeroAndFacts,
  PlanSafari, PracticalInformation, RelatedSafariLinks, ResponsibleTravel,
  RouteSchematic, SampleJourneys, SafariExperience, TanzaniaSafariFaq, TravelStyles,
  WhenToGo, WhyTanzania, WildlifeBento,
} from "@/components/tanzania-safari/Sections";
import { MobileStickyCta, StickySubnav } from "@/components/tanzania-safari/Interactive";
import { destinationCards, faqItems, faqPlainText, tanzaniaSafariMeta } from "@/data/tanzania-safari";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: tanzaniaSafariMeta.title,
  description: tanzaniaSafariMeta.description,
  path: tanzaniaSafariMeta.path,
  image: tanzaniaSafariMeta.image,
  absoluteTitle: true,
});

export default function TanzaniaSafariPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: faqPlainText(item) },
    })),
  };
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tanzania Safari",
    description: tanzaniaSafariMeta.description,
    url: new URL(tanzaniaSafariMeta.path, siteConfig.url).toString(),
    about: {
      "@type": "TouristDestination",
      name: "Northern Tanzania safari circuit",
      containsPlace: destinationCards.map((destination) => ({
        "@type": "TouristDestination",
        name: destination.title,
        url: new URL(destination.href, siteConfig.url).toString(),
      })),
    },
  };

  return (
    <main className="pb-24 md:pb-0">
      <JsonLd data={collectionPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <HeroAndFacts />
      <StickySubnav />
      <WhyTanzania />
      <DestinationCards />
      <CompareDestinations />
      <SampleJourneys />
      <RouteSchematic />
      <SafariExperience />
      <WildlifeBento />
      <WhenToGo />
      <Approach />
      <TravelStyles />
      <PlanSafari />
      <PracticalInformation />
      <ResponsibleTravel />
      <TanzaniaSafariFaq />
      <RelatedSafariLinks />
      <FinalSafariCta />
      <MobileStickyCta />
    </main>
  );
}
