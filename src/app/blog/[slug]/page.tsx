import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import { guideArticles } from "@/data";
import JsonLd from "@/components/seo/JsonLd";
import { buildArticleJsonLd, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = guideArticles.find((item) => item.slug === slug);
  return buildMetadata({
    title: article?.title ?? `Blog Post: ${slug}`,
    description: article?.excerpt ?? "Read travel guidance for Tanzania.",
    path: `/blog/${slug}`,
    image: article?.image,
    noIndex: !article || article.sample,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = guideArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <>
      {article.sample ? null : (
        <JsonLd data={buildArticleJsonLd({
          title: article.title,
          excerpt: article.excerpt,
          path: `/blog/${slug}`,
          image: article.image,
        })} />
      )}
      <PagePlaceholder
        title={`Blog Post: ${slug}`}
        path={`/blog/${slug}`}
        section="Blog"
      />
    </>
  );
}
