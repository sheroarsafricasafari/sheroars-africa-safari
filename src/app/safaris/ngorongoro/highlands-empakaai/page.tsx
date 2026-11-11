import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import EmpakaaiPageContent from "@/components/ngorongoro/EmpakaaiSections";
import { empakaaiPage } from "@/data/ngorongoro-empakaai";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: empakaaiPage.metadata.title,
  description: empakaaiPage.metadata.description,
  path: empakaaiPage.path,
  image: empakaaiPage.metadata.image,
  absoluteTitle: true,
});

const touristAttractionJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Empakaai Crater",
  description: empakaaiPage.metadata.description,
  url: new URL(empakaaiPage.path, siteConfig.url).toString(),
  image: new URL(empakaaiPage.metadata.image, siteConfig.url).toString(),
  containedInPlace: {
    "@type": "TouristDestination",
    name: "Ngorongoro Conservation Area",
    url: new URL("/safaris/ngorongoro", siteConfig.url).toString(),
  },
};

export default function EmpakaaiHighlandsPage() {
  return (
    <>
      <JsonLd data={touristAttractionJsonLd} />
      <EmpakaaiPageContent />
    </>
  );
}
