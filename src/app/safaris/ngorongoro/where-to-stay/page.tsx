import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import NgorongoroStayPageSections from "@/components/ngorongoro/NgorongoroStaySections";
import { ngorongoroStayPage, ngorongoroStays } from "@/data/ngorongoro-stays";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: ngorongoroStayPage.metadata.title,
  description: ngorongoroStayPage.metadata.description,
  path: ngorongoroStayPage.path,
  image: ngorongoroStayPage.metadata.image,
  absoluteTitle: true,
});

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: ngorongoroStayPage.metadata.title,
  description: ngorongoroStayPage.metadata.description,
  url: new URL(ngorongoroStayPage.path, siteConfig.url).toString(),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: ngorongoroStays.map((stay, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: stay.name,
    })),
  },
};

export default function NgorongoroWhereToStayPage() {
  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <NgorongoroStayPageSections />
    </>
  );
}
