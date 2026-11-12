import type { Metadata } from "next";
import CtaBanner from "@/components/inner/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import {
  CraterCrossSection,
  CraterFloorMap,
} from "@/components/ngorongoro/CraterDiagrams";
import DescentRail from "@/components/ngorongoro/DescentRail";
import {
  CraterDay,
  CraterFacts,
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
  NgorongoroRelatedPackages,
  NgQuickFacts,
  NgStory,
} from "@/components/ngorongoro/HubSections";
import {
  craterBreadcrumbs,
  ngorongoroCrater,
} from "@/data/ngorongoro";
import { getNgorongoroRelatedPackages } from "@/data/ngorongoro-packages";
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

export default function NgorongoroCraterPage() {
  return (
    <main>
      <JsonLd data={touristTripJsonLd} />
      <DescentRail stops={ngorongoroCrater.descentRail} />
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
      <NgorongoroRelatedPackages data={ngorongoroCrater.journeys} packages={getNgorongoroRelatedPackages("crater")} />
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
