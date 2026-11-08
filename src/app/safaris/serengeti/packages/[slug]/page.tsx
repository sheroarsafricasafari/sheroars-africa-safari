import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import SerengetiPackageDetail from "@/components/safaris/serengeti/SerengetiPackageDetail";
import { getAllSerengetiPackages, getRelatedSerengetiPackages, getSerengetiPackageBySlug } from "@/lib/serengeti-packages";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildTouristTripJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSerengetiPackages().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getSerengetiPackageBySlug(slug);
  if (!item) notFound();
  return buildMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/safaris/serengeti/packages/${item.slug}`,
    image: item.heroImage.src,
  });
}

export default async function SerengetiPackagePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getSerengetiPackageBySlug(slug);
  if (!item) notFound();

  const pagePath = `/safaris/serengeti/packages/${item.slug}`;
  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Safaris", href: "/safaris" },
    { title: "Serengeti", href: "/safaris/serengeti" },
    { title: "Packages", href: "/safaris/serengeti/packages" },
    { title: item.title, href: pagePath },
  ];

  return (
    <>
      <JsonLd data={buildTouristTripJsonLd({
        title: item.title,
        description: item.seo.description,
        path: pagePath,
        image: item.heroImage.src,
      })} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={buildFaqJsonLd(item.faqs)} />
      <SerengetiPackageDetail item={item} relatedPackages={getRelatedSerengetiPackages(item.slug)} />
    </>
  );
}
