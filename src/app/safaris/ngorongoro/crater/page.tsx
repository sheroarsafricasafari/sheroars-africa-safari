import type { Metadata } from "next";
import CtaBanner from "@/components/inner/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import {
  CraterCrossSection,
  CraterDay,
  CraterFacts,
  CraterFloorMap,
  CraterJourneys,
  CraterRespect,
  CraterRules,
  CraterSeasonsPacking,
  CraterStayTeaser,
  CraterWays,
  CraterWildlife,
} from "@/components/ngorongoro/CraterSections";
import NgHero from "@/components/ngorongoro/NgHero";
import {
  NgFaqSection,
  NgQuickFacts,
  NgStory,
} from "@/components/ngorongoro/HubSections";
import {
  craterBreadcrumbs,
  ngorongoroCrater,
} from "@/data/ngorongoro";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import { getExistingPublicImage } from "@/lib/ngorongoro-images";
import { buildMetadata, buildTouristTripJsonLd } from "@/lib/seo";

const craterHeroImage = getExistingPublicImage(ngorongoroCrater.metadata.image);

export const metadata: Metadata = buildMetadata({
  title: ngorongoroCrater.metadata.title,
  description: ngorongoroCrater.metadata.description,
  path: "/safaris/ngorongoro/crater",
  image: craterHeroImage,
});

const touristTripJsonLd = buildTouristTripJsonLd({
  title: ngorongoroCrater.metadata.title,
  description: ngorongoroCrater.metadata.description,
  path: "/safaris/ngorongoro/crater",
  image: craterHeroImage,
});

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

export default function NgorongoroCraterPage() {
  return (
    <main>
      <JsonLd data={touristTripJsonLd} />
      <NgHero data={ngorongoroCrater.hero} breadcrumbs={craterBreadcrumbs} />
      <NgQuickFacts items={ngorongoroCrater.quickFacts} />
      <NgStory
        story={ngorongoroCrater.story}
        pullQuote={ngorongoroCrater.story.pullQuote}
      />
      <CraterFacts data={ngorongoroCrater.facts} />
      <CraterCrossSection data={ngorongoroCrater.anatomy} />
      <CraterFloorMap data={ngorongoroCrater.floorMap} places={ngorongoroCrater.floorPlaces} />
      <CraterWildlife data={ngorongoroCrater.wildlife} />
      <CraterDay data={ngorongoroCrater.day} />
      <CraterRules data={ngorongoroCrater.rules} />
      <CraterWays data={ngorongoroCrater.ways} />
      <CraterSeasonsPacking data={ngorongoroCrater.seasonsAndPacking} />
      <CraterRespect data={ngorongoroCrater.respect} />
      <CraterStayTeaser data={ngorongoroCrater.stay} />
      <CraterJourneys data={ngorongoroCrater.journeys} packages={ngorongoroPackages} />
      <NgFaqSection
        eyebrow={ngorongoroCrater.faqSection.eyebrow}
        title={ngorongoroCrater.faqSection.title}
        items={ngorongoroCrater.faq}
      />
      <CtaBanner
        eyebrow={ngorongoroCrater.cta.eyebrow}
        title={ngorongoroCrater.cta.title}
        description={ngorongoroCrater.cta.description}
        image={{ src: ngorongoroCrater.cta.image, alt: ngorongoroCrater.cta.imageAlt }}
        primaryCta={ngorongoroCrater.cta.primary}
        secondaryCta={{
          label: ngorongoroCrater.cta.secondary.label,
          href: siteConfig.whatsappUrlWithMessage(ngorongoroCrater.cta.whatsappMessage),
        }}
      />
    </main>
  );
}
