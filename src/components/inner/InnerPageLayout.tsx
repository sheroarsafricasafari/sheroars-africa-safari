import type { ReactNode } from "react";
import PageHero, { type PageHeroProps } from "@/components/inner/PageHero";
import SectionIntro from "@/components/inner/SectionIntro";
import FaqAccordion from "@/components/inner/FaqAccordion";
import RelatedLinks from "@/components/inner/RelatedLinks";
import CtaBanner, { type CtaBannerProps } from "@/components/inner/CtaBanner";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import Prose from "@/components/inner/Prose";

// Props: hero, optional introduction/sidebar/FAQ/related links/CTA, main content, and className.
export type InnerPageLayoutProps = {
  hero: PageHeroProps;
  intro?: { eyebrow: string; title: string; paragraph: string; button?: { label: string; href: string } };
  children: ReactNode;
  sidebar?: ReactNode;
  faqs?: { question: string; answer: string }[];
  related?: { title: string; description: string; href: string }[];
  cta?: CtaBannerProps;
  className?: string;
};

export default function InnerPageLayout({ hero, intro, children, sidebar, faqs, related, cta, className }: InnerPageLayoutProps) {
  return (
    <div className={cn("bg-cream", className)}>
      <PageHero {...hero} />
      {intro ? <SectionIntro {...intro} /> : null}
      <section className="bg-cream py-12 md:py-16">
        <Container className={cn("grid gap-10", sidebar ? "lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14" : "")}>
          <div className="min-w-0">{children}</div>
          {sidebar ? <aside className="min-w-0">{sidebar}</aside> : null}
        </Container>
      </section>
      {faqs?.length ? <section className="bg-sand py-16 md:py-20"><Container><h2 className="mb-7 font-heading text-h2">Frequently Asked Questions</h2><FaqAccordion items={faqs} jsonLd /></Container></section> : null}
      {related?.length ? <RelatedLinks items={related} /> : null}
      {cta ? <CtaBanner {...cta} /> : null}
    </div>
  );
}

// Props: article metadata, plain text for reading-time estimation, prose content, optional author slot and className.
export function ArticleLayout({
  title,
  eyebrow,
  image,
  plainText,
  children,
  author,
  className,
}: {
  title: string;
  eyebrow: string;
  image: PageHeroProps["image"];
  plainText: string;
  children: ReactNode;
  author?: ReactNode;
  className?: string;
}) {
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 220));
  return (
    <article className={cn("bg-cream", className)}>
      <PageHero eyebrow={eyebrow} title={title} subtitle="" image={image} align="left" />
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-8 max-w-prose border-b border-sand pb-5 text-sm text-muted">
          <p>{readingTime} min read</p>
          <div className="mt-2">{author ?? <span>By the She Roars team <span className="sr-only">TODO(REPLACE): replace with a verified byline.</span></span>}</div>
        </div>
        <Prose className="mx-auto">{children}</Prose>
      </Container>
    </article>
  );
}
