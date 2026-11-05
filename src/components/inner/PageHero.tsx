import Breadcrumbs from "@/components/inner/Breadcrumbs";
import { PageHeroMotion, PageHeroMotionItem } from "@/components/inner/PageHeroMotion";
import HeroSignal from "@/components/layout/HeroSignal";
import Button from "@/components/ui/Button";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import Parallax from "@/components/motion/Parallax";

// Props: editorial hero copy, image, optional breadcrumbs/badges/CTAs, alignment and className.
export type HeroCta = { label: string; href: string };
export type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  breadcrumbs?: { title: string; href: string }[];
  badges?: string[];
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  align?: "left" | "center";
  className?: string;
  titleContent?: ReactNode;
  afterSubtitle?: ReactNode;
  parallax?: boolean;
  id?: string;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  breadcrumbs,
  badges = [],
  primaryCta,
  secondaryCta,
  align = "left",
  className,
  titleContent,
  afterSubtitle,
  parallax = false,
  id,
}: PageHeroProps) {
  return (
    <section id={id} className={cn("relative isolate flex min-h-[62svh] items-end overflow-hidden bg-forest text-white md:min-h-[72svh]", className)}>
      {parallax ? (
        <Parallax className="absolute -inset-y-[8%] inset-x-0 overflow-hidden">
          <SmartImage src={image.src} alt={image.alt} sizes="100vw" fill priority className="object-cover motion-safe:animate-[page-ken-burns_24s_ease-out_forwards] motion-reduce:animate-none" />
        </Parallax>
      ) : <SmartImage src={image.src} alt={image.alt} sizes="100vw" fill priority className="object-cover motion-safe:animate-[page-ken-burns_24s_ease-out_forwards] motion-reduce:animate-none" />}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-earth/80 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/[0.78] via-earth/15 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-forest/10" />
      <Container className={cn("relative w-full pb-16 pt-36 md:pb-24", align === "center" ? "text-center" : "text-center md:text-left")}>
        <PageHeroMotion className={cn("mx-auto max-w-3xl", align === "left" ? "md:mx-0" : "")}>
          <HeroSignal />
          {breadcrumbs ? <PageHeroMotionItem className={cn("mb-7", align === "left" ? "md:text-left" : "")}><Breadcrumbs items={breadcrumbs} tone="light" /></PageHeroMotionItem> : null}
          <PageHeroMotionItem><p className="text-eyebrow mb-4 text-gold">{eyebrow}</p></PageHeroMotionItem>
          <PageHeroMotionItem><h1 className="text-display text-white">{titleContent ?? title}</h1></PageHeroMotionItem>
          <PageHeroMotionItem><div className={cn("gold-rule mb-5 mt-6", align === "left" ? "mx-auto md:mx-0" : "mx-auto")} /></PageHeroMotionItem>
          <PageHeroMotionItem><p className="text-lead mx-auto max-w-2xl text-cream/90">{subtitle}</p></PageHeroMotionItem>
          {afterSubtitle ? <PageHeroMotionItem>{afterSubtitle}</PageHeroMotionItem> : null}
          {badges.length > 0 ? (
            <PageHeroMotionItem className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {badges.map((badge) => <span key={badge} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">{badge}</span>)}
            </PageHeroMotionItem>
          ) : null}
          {primaryCta || secondaryCta ? (
            <PageHeroMotionItem className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              {primaryCta ? <Button href={primaryCta.href} size="lg">{primaryCta.label}</Button> : null}
              {secondaryCta ? <Button href={secondaryCta.href} variant="outline-light" size="lg">{secondaryCta.label}</Button> : null}
            </PageHeroMotionItem>
          ) : null}
        </PageHeroMotion>
      </Container>
    </section>
  );
}
