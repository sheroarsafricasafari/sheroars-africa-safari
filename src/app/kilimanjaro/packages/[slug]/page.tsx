import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import { kilimanjaroPackages } from "@/data";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return kilimanjaroPackages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const climb = kilimanjaroPackages.find((item) => item.slug === slug);
  return buildMetadata({
    title: climb?.title ?? `Kilimanjaro Package: ${slug}`,
    description: climb?.summary ?? "Explore a Kilimanjaro climb itinerary.",
    path: `/kilimanjaro/packages/${slug}`,
    image: climb?.image,
    noIndex: !climb || climb.sample,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const climb = kilimanjaroPackages.find((item) => item.slug === slug);
  if (!climb) notFound();

  return (
    <PagePlaceholder
      title={`Kilimanjaro Package: ${slug}`}
      path={`/kilimanjaro/packages/${slug}`}
      section="Kilimanjaro"
    />
  );
}
