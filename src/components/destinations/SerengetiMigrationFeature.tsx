import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import type { MigrationFeatureData } from "@/types/destination";

export default function SerengetiMigrationFeature({
  eyebrow,
  title,
  subtitle,
  feature,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  feature: MigrationFeatureData;
}) {
  return (
    <section className="border-y border-gold/20 bg-forest py-16 text-cream sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} tone="light" />
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lift">
            <SmartImage src={feature.image} alt={feature.imageAlt} sizes="(max-width: 1024px) 100vw, 52vw" fill className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/50 via-transparent to-transparent" />
          </div>
          <StaggerGroup className="grid gap-3 sm:grid-cols-2">
            {feature.points.map((point) => (
              <StaggerItem key={point.title}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="flex size-8 items-center justify-center rounded-full bg-gold/15 text-gold"><Check aria-hidden="true" size={16} /></span>
                  <h3 className="mt-4 font-heading text-xl text-cream">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-cream/75">{point.text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {feature.moment.image ? (
            <div className="relative min-h-64 overflow-hidden rounded-3xl bg-white/5 sm:min-h-80">
              <SmartImage src={feature.moment.image} alt={feature.moment.imageAlt ?? feature.moment.title} sizes="(max-width: 1024px) 100vw, 42vw" fill className="object-cover" />
            </div>
          ) : null}
          <article className="flex min-w-0 flex-col justify-center rounded-3xl border border-gold/25 bg-[#183c31] p-6 sm:p-9">
            <p className="text-eyebrow text-gold">FIELD NOTES</p>
            <h3 className="mt-3 font-heading text-3xl text-cream">{feature.moment.title}</h3>
            <p className="mt-4 max-w-2xl leading-7 text-cream/80">{feature.moment.text}</p>
            {feature.moment.cards ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {feature.moment.cards.map((card) => (
                  <article key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h4 className="font-semibold text-gold">{card.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-cream/75">{card.text}</p>
                  </article>
                ))}
              </div>
            ) : null}
            {feature.moment.noteTitle && feature.moment.noteText ? (
              <aside className="mt-6 border-l border-gold pl-5">
                <h4 className="font-heading text-xl text-gold">{feature.moment.noteTitle}</h4>
                <p className="mt-2 text-sm leading-6 text-cream/75">{feature.moment.noteText}</p>
              </aside>
            ) : null}
            {feature.comparison ? (
              <div className="mt-7 border-t border-white/10 pt-6">
                <h4 className="font-heading text-2xl text-cream">{feature.comparison.title}</h4>
                <p className="mt-3 text-sm leading-6 text-cream/75">{feature.comparison.text}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {feature.comparison.regions.map((region) => (
                    <Link key={region.title} href={region.href} className="group rounded-2xl border border-white/15 p-4 transition-colors hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                      <span className="flex items-center justify-between gap-3 font-semibold text-cream">{region.title}<ArrowRight aria-hidden="true" size={16} className="shrink-0 text-gold transition-transform group-hover:translate-x-1" /></span>
                      <span className="mt-2 block text-sm leading-6 text-cream/70">{region.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-7">
              <Button href={feature.cta.href} variant="light">{feature.cta.label}</Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
