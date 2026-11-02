import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import { safaris } from "@/data/safaris";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return safaris.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Safari Package: ${slug} | SheRoarsAfricaSafari` };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <PagePlaceholder
      title={`Safari Package: ${slug}`}
      path={`/safaris/packages/${slug}`}
      section="Safaris"
    />
  );
}
