import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import JsonLd from "@/components/seo/JsonLd";
import { getAllPackageSlugs, getPackageBySlug } from "@/data";
import { buildMetadata, buildTouristTripJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPackageSlugs();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const safari = getPackageBySlug(slug);
  return buildMetadata({
    title: safari?.title ?? `Safari Package: ${slug}`,
    description: safari?.summary ?? "Explore a safari journey in Tanzania.",
    path: `/safaris/packages/${slug}`,
    image: safari?.image,
    noIndex: !safari || safari.sample === true,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const safari = getPackageBySlug(slug);
  if (!safari || slug === "7-day-women-only-group-safari") {
    notFound();
  }

  return (
    <>
      {safari.sample ? null : (
        <JsonLd data={buildTouristTripJsonLd({
          title: safari.title,
          description: safari.summary,
          path: `/safaris/packages/${slug}`,
          image: safari.image,
        })} />
      )}
      <PagePlaceholder
        title={`Safari Package: ${slug}`}
        path={`/safaris/packages/${slug}`}
        section="Safaris"
      />
    </>
  );
}
