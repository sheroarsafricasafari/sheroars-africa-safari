import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// Props: optional eyebrow/title/description/background and two CTA labels/links plus className.
export type CtaBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: { src: string; alt: string };
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export default function CtaBanner({
  eyebrow = "LET'S PLAN YOUR JOURNEY",
  title = "Your Roar Starts Here",
  description = "Tell us where you dream of going, and we will shape it into a journey that is entirely yours.",
  image = { src: "/images/home/cta-banner.webp", alt: "Warm evening light across Tanzania" },
  primaryCta = { label: "Plan My Safari", href: "/plan-your-safari" },
  secondaryCta = { label: "Chat on WhatsApp", href: `https://wa.me/${siteConfig.whatsappNumber}` },
  className,
}: CtaBannerProps) {
  return (
    <section className={cn("relative isolate flex min-h-[420px] items-center justify-center overflow-hidden border-t border-gold py-20 text-center text-white", className)}>
      <SmartImage src={image.src} alt={image.alt} sizes="100vw" fill className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-terracotta/85 via-earth/80 to-forest/85" />
      <div className="relative mx-auto max-w-3xl px-5">
        <p className="text-eyebrow text-gold">{eyebrow}</p>
        <h2 className="mt-4 font-heading text-h2 text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primaryCta.href} variant="light" size="lg">{primaryCta.label}</Button>
          <Button href={secondaryCta.href} variant="outline-light" size="lg"><MessageCircle aria-hidden="true" size={18} />{secondaryCta.label}</Button>
        </div>
      </div>
    </section>
  );
}
