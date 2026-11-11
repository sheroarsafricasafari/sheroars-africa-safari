import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import MaasaiPageSections from "@/components/ngorongoro/MaasaiSections";
import { maasaiPage } from "@/data/ngorongoro-maasai";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: maasaiPage.metadata.title,
  description: maasaiPage.metadata.description,
  path: maasaiPage.path,
  image: maasaiPage.metadata.image,
  absoluteTitle: true,
});

const touristAttractionJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Maasai cultural visit, Ngorongoro",
  description: maasaiPage.metadata.description,
  url: new URL(maasaiPage.path, siteConfig.url).toString(),
  image: new URL(maasaiPage.metadata.image, siteConfig.url).toString(),
  containedInPlace: {
    "@type": "TouristDestination",
    name: "Ngorongoro Conservation Area",
    url: new URL("/safaris/ngorongoro", siteConfig.url).toString(),
  },
};

export default function MaasaiCulturalVisitPage() {
  return (
    <>
      <JsonLd data={touristAttractionJsonLd} />
      <MaasaiPageSections />
    </>
  );
}
