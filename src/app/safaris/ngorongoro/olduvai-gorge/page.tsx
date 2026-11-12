import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import OlduvaiPageSections from "@/components/ngorongoro/OlduvaiSections";
import { getNgorongoroRelatedPackages } from "@/data/ngorongoro-packages";
import { siteConfig } from "@/data/site";
import { olduvaiPage } from "@/data/ngorongoro-olduvai";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: olduvaiPage.metadata.title,
  description: olduvaiPage.metadata.description,
  path: olduvaiPage.path,
  image: olduvaiPage.metadata.image,
  absoluteTitle: true,
});

const touristAttractionJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Olduvai Gorge",
  description: olduvaiPage.metadata.description,
  url: new URL(olduvaiPage.path, siteConfig.url).toString(),
  image: new URL(olduvaiPage.metadata.image, siteConfig.url).toString(),
  containedInPlace: {
    "@type": "TouristDestination",
    name: "Ngorongoro Conservation Area",
    url: new URL("/safaris/ngorongoro", siteConfig.url).toString(),
  },
};

export default function OlduvaiGorgePage() {
  return (
    <>
      <JsonLd data={touristAttractionJsonLd} />
      <OlduvaiPageSections journeys={getNgorongoroRelatedPackages("olduvai")} />
    </>
  );
}
