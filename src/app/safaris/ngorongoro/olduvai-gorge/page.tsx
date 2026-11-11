import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import OlduvaiPageSections from "@/components/ngorongoro/OlduvaiSections";
import { safaris } from "@/data/safaris";
import { serengetiPackages } from "@/data/serengeti-packages";
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

const packagesMentioningOlduvai = safaris.filter((safari) =>
  safari.dayByDay.some((day) =>
    [day.title, day.description, ...day.activities].join(" ").toLowerCase().includes("olduvai"),
  ),
);
const fallbackSerengetiSlugs = new Set([
  "4-day-central-serengeti-big-cat-safari",
  "5-day-western-corridor-grumeti-safari",
  "8-day-serengeti-grand-circuit",
]);
const olduvaiPackages = packagesMentioningOlduvai.length
  ? packagesMentioningOlduvai.map((safari) => ({
      slug: safari.slug,
      title: safari.title,
      days: safari.days,
      parks: safari.parks,
      summary: safari.summary,
      priceFrom: null,
      image: { src: safari.image, alt: safari.title },
      href: `/safaris/packages/${safari.slug}`,
      badge: safari.badge,
    }))
  : serengetiPackages
      .filter((safari) => fallbackSerengetiSlugs.has(safari.slug))
      .map((safari) => ({
        slug: safari.slug,
        title: safari.title,
        days: safari.durationDays,
        parks: safari.regions.map(({ name }) => name),
        summary: safari.summary,
        priceFrom: null,
        image: safari.cardImage,
        href: `/safaris/serengeti/packages/${safari.slug}`,
      }));

export default function OlduvaiGorgePage() {
  return (
    <>
      <JsonLd data={touristAttractionJsonLd} />
      <OlduvaiPageSections journeys={olduvaiPackages} />
    </>
  );
}
