import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Sample slugs for now. These will come from the data files later.
export function generateStaticParams() {
  return ["sample-one", "sample-two", "sample-three"].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Kilimanjaro Package: ${slug} | SheRoarsAfricaSafari` };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <PagePlaceholder
      title={`Kilimanjaro Package: ${slug}`}
      path={`/kilimanjaro/packages/${slug}`}
      section="Kilimanjaro"
    />
  );
}
