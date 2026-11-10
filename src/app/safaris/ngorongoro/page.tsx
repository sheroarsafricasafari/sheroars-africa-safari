import type { Metadata } from "next";
import CtaBanner from "@/components/inner/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import NgHero from "@/components/ngorongoro/NgHero";
import {
  NgCompare,
  NgExploreTiles,
  NgFactsGrid,
  NgFaqSection,
  NgJourneys,
  NgLogistics,
  NgPeopleBand,
  NgQuickFacts,
  NgSeasons,
  NgStayTeaser,
  NgStory,
} from "@/components/ngorongoro/HubSections";
import { ngorongoroBreadcrumbs, ngorongoroHub } from "@/data/ngorongoro";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import { resolvePublicImage } from "@/lib/ngorongoro-images";
import { buildMetadata } from "@/lib/seo";

const hubHeroImage = resolvePublicImage(
  ngorongoroHub.hero.image,
  ngorongoroHub.metadata.fallbackImage,
);

export const metadata: Metadata = buildMetadata({
  title: ngorongoroHub.metadata.title,
  description: ngorongoroHub.metadata.description,
  path: "/safaris/ngorongoro",
  image: hubHeroImage,
});

const touristDestinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Ngorongoro Conservation Area",
  description: ngorongoroHub.metadata.description,
  url: new URL("/safaris/ngorongoro", siteConfig.url).toString(),
  image: new URL(hubHeroImage, siteConfig.url).toString(),
  containedInPlace: { "@type": "Country", name: "Tanzania" },
};

const ngorongoroPackages = safaris
  .filter((safari) => safari.parks.includes("Ngorongoro"))
  .map((safari) => ({
    slug: safari.slug,
    title: safari.title,
    days: safari.days,
    parks: safari.parks,
    summary: safari.summary,
    priceFrom: null,
    image: { src: safari.image, alt: safari.title },
    badge: safari.badge,
  }));

export default function NgorongoroHubPage() {
  return (
    <main>
      <JsonLd data={touristDestinationJsonLd} />
      <NgHero
        data={ngorongoroHub.hero}
        breadcrumbs={ngorongoroBreadcrumbs}
        fallbackImage={ngorongoroHub.metadata.fallbackImage}
      />
      <NgQuickFacts items={ngorongoroHub.quickFacts} />
      <NgStory story={ngorongoroHub.story} />
      <NgExploreTiles data={ngorongoroHub.explore} />
      <NgFactsGrid data={ngorongoroHub.facts} />
      <NgPeopleBand data={ngorongoroHub.people} />
      <NgCompare data={ngorongoroHub.compare} />
      <NgSeasons data={ngorongoroHub.seasons} />
      <NgLogistics data={ngorongoroHub.logistics} />
      <NgJourneys data={ngorongoroHub.journeys} packages={ngorongoroPackages} />
      <NgStayTeaser data={ngorongoroHub.stay} />
      <NgFaqSection
        eyebrow={ngorongoroHub.faqSection.eyebrow}
        title={ngorongoroHub.faqSection.title}
        items={ngorongoroHub.faq}
      />
      <CtaBanner
        eyebrow={ngorongoroHub.cta.eyebrow}
        title={ngorongoroHub.cta.title}
        description={ngorongoroHub.cta.description}
        image={{ src: ngorongoroHub.cta.image, alt: ngorongoroHub.cta.imageAlt }}
        primaryCta={ngorongoroHub.cta.primary}
        secondaryCta={{
          label: ngorongoroHub.cta.secondary.label,
          href: siteConfig.whatsappUrlWithMessage(ngorongoroHub.cta.whatsappMessage),
        }}
      />
    </main>
  );
}
