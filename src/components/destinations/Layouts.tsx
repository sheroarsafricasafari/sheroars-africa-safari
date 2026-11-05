import type { ReactNode } from "react";
import CtaBanner from "@/components/inner/CtaBanner";
import RelatedLinks from "@/components/inner/RelatedLinks";
import DestinationHero from "@/components/destinations/DestinationHero";
import { StickySectionNav } from "@/components/destinations/Interactive";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import type { DestinationHeroData, DestinationNavItem, RelatedDestination } from "@/types/destination";

// Props: DestinationHubLayout and SubRegionLayout compose destination heroes, sticky navigation, page sections, related links and CTAs; DestinationSection takes an id, tone and children.
export function DestinationHubLayout({ hero, breadcrumbs, nav, children, related, relatedTitle = "Continue Exploring", cta, ctaImage }: {
  hero: DestinationHeroData;
  breadcrumbs: { title: string; href: string }[];
  nav: DestinationNavItem[];
  children: ReactNode;
  related: RelatedDestination[];
  relatedTitle?: string;
  cta: { title: string; description: string; primary: string; secondary: string };
  ctaImage: string;
}) {
  return <>
    <DestinationHero data={hero} breadcrumbs={breadcrumbs} />
    <StickySectionNav items={nav} cta={{ label: "Plan My Safari", href: "/plan-your-safari?type=Safari" }} />
    {children}
    <div className="bg-sand"><RelatedLinks title={relatedTitle} items={related.map((item) => ({ title: item.title, href: item.href, description: item.description ?? "Continue planning your Tanzania journey." }))} /></div>
    <CtaBanner eyebrow="LET'S PLAN YOUR SERENGETI JOURNEY" title={cta.title} description={cta.description} image={{ src: ctaImage, alt: "The Serengeti beneath a wide sky" }} primaryCta={{ label: cta.primary, href: "/plan-your-safari?type=Safari" }} secondaryCta={{ label: cta.secondary, href: siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage) }} parallax />
  </>;
}

// Props: SubRegionLayout composes the sub-region hero, navigation, ordered sections, related links and final CTA.
export function SubRegionLayout({ hero, breadcrumbs, nav, children, related, relatedTitle = "Continue Exploring", cta, ctaImage }: {
  hero: DestinationHeroData;
  breadcrumbs: { title: string; href: string }[];
  nav: DestinationNavItem[];
  children: ReactNode;
  related: RelatedDestination[];
  relatedTitle?: string;
  cta: { title: string; description: string; primary: string; secondary: string };
  ctaImage: string;
}) {
  return <>
    <DestinationHero data={hero} breadcrumbs={breadcrumbs} />
    <StickySectionNav items={nav} cta={{ label: "Plan My Safari", href: "/plan-your-safari?type=Safari" }} />
    {children}
    <div className="bg-sand"><RelatedLinks title={relatedTitle} items={related.map((item) => ({ title: item.title, href: item.href, description: item.description ?? "Discover another part of the Serengeti." }))} /></div>
    <CtaBanner eyebrow="LET'S PLAN YOUR SERONERA JOURNEY" title={cta.title} description={cta.description} image={{ src: ctaImage, alt: "Seronera Valley in the Serengeti" }} primaryCta={{ label: cta.primary, href: "/plan-your-safari?type=Safari" }} secondaryCta={{ label: cta.secondary, href: siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage) }} parallax />
  </>;
}

export function DestinationSection({ id, tone = "cream", children, className = "" }: {
  id: string;
  tone?: "cream" | "sand" | "forest";
  children: ReactNode;
  className?: string;
}) {
  const tones = { cream: "bg-cream text-earth", sand: "bg-sand text-earth", forest: "bg-forest text-cream" };
  return <section id={id} className={`scroll-mt-[calc(var(--navbar-height,78px)+4rem)] py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
    <Container>{children}</Container>
  </section>;
}
