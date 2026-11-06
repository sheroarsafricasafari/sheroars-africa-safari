import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CtaBanner from "@/components/inner/CtaBanner";
import DestinationHero from "@/components/destinations/DestinationHero";
import { StickySectionNav } from "@/components/destinations/Interactive";
import { siteConfig } from "@/data/site";
import type { DestinationHeroData, DestinationNavItem } from "@/types/destination";

type GuideLink = { title: string; href: string; description: string };

export default function SerengetiGuideLayout({
  hero,
  breadcrumbs,
  nav,
  relatedTitle,
  related,
  cta,
  ctaImage,
  ctaImageAlt,
  whatsappMessage,
  children,
}: {
  hero: DestinationHeroData;
  breadcrumbs: { title: string; href: string }[];
  nav: DestinationNavItem[];
  relatedTitle: string;
  related: GuideLink[];
  cta: { eyebrow: string; title: string; description: string; primary: string };
  ctaImage: string;
  ctaImageAlt: string;
  whatsappMessage: string;
  children: ReactNode;
}) {
  return (
    <>
      <DestinationHero data={hero} breadcrumbs={breadcrumbs} className="min-h-[68svh] md:min-h-[80svh]" />
      <StickySectionNav items={nav} cta={{ label: "Plan My Safari", href: "/plan-your-safari?type=Safari" }} />
      {children}
      <section className="bg-sand py-16 sm:py-20" aria-labelledby="related-guides-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="related-guides-title" className="font-heading text-3xl text-earth sm:text-4xl">{relatedTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="group flex min-h-40 flex-col rounded-2xl border border-sand bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                <span className="font-heading text-xl text-earth">{item.title}</span>
                <span className="mt-2 flex-1 text-sm leading-6 text-muted">{item.description}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">Explore <ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        eyebrow={cta.eyebrow}
        title={cta.title}
        description={cta.description}
        image={{ src: ctaImage, alt: ctaImageAlt }}
        primaryCta={{ label: cta.primary, href: "/plan-your-safari?type=Safari" }}
        secondaryCta={{ label: "Chat on WhatsApp", href: siteConfig.whatsappUrlWithMessage(whatsappMessage) }}
        parallax
      />
    </>
  );
}
