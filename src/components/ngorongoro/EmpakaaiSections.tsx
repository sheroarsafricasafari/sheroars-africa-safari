import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Bird,
  Clock3,
  Footprints,
  Mountain,
  ShieldCheck,
  Sun,
  ThermometerSun,
  Trees,
  Wind,
} from "lucide-react";
import Callout from "@/components/inner/Callout";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { EmpakaaiCrossSection, EmpakaaiDayTimeline, HikeProfile } from "@/components/ngorongoro/EmpakaaiOlduvaiInteractive";
import { NgFaqSection, NgJourneys, NgQuickFacts, NgStory } from "@/components/ngorongoro/HubSections";
import { empakaaiBreadcrumbs, empakaaiPage } from "@/data/ngorongoro-empakaai";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import CtaBanner from "@/components/inner/CtaBanner";
import NgHero from "@/components/ngorongoro/NgHero";
import type { PackageCardProps } from "@/components/inner/PackageCard";

const hikeStepIcons = [ShieldCheck, Mountain, Trees, Bird, ArrowUp];
const ruleIcons = [ShieldCheck, Wind, ThermometerSun, Sun, Footprints, Clock3, Bird, Mountain];

const journeys: PackageCardProps[] = safaris
  .filter((safari) => safari.parks.includes("Ngorongoro"))
  .map((safari) => ({
    slug: safari.slug,
    title: safari.title,
    days: safari.days,
    parks: safari.parks,
    summary: safari.summary,
    priceFrom: null,
    image: { src: safari.image, alt: safari.title },
    badge: safari.badge,
  }));

export default function EmpakaaiPageContent() {
  return (
    <main>
      <NgHero data={empakaaiPage.hero} breadcrumbs={empakaaiBreadcrumbs} />
      <NgQuickFacts items={empakaaiPage.quickFacts} />
      <NgStory story={empakaaiPage.story} pullQuote={empakaaiPage.story.pullQuote} imageSide="right" headingId="empakaai-story-heading" />

      <section aria-labelledby="empakaai-neighbors-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="empakaai-neighbors-heading" eyebrow={empakaaiPage.craterCompare.eyebrow} title={empakaaiPage.craterCompare.title} subtitle={empakaaiPage.craterCompare.subtitle} />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {empakaaiPage.craterCompare.cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className={`flex min-h-64 flex-col rounded-3xl border p-6 shadow-card ${"highlight" in card ? "border-terracotta bg-terracotta/10" : "border-sand bg-white"}`}>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{"highlight" in card ? card.highlight : `0${index + 1}`}</span>
                  <h3 className="mt-4 font-heading text-2xl text-earth">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{card.text}</p>
                  {"href" in card ? <Link href={card.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">{card.linkLabel}<ArrowRight aria-hidden="true" size={16} /></Link> : null}
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-7 text-muted">{empakaaiPage.craterCompare.closing}</p>
        </Container>
      </section>

      <EmpakaaiCrossSection data={empakaaiPage.crossSection} />

      <section aria-labelledby="empakaai-wildlife-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="empakaai-wildlife-heading" eyebrow={empakaaiPage.wildlife.eyebrow} title={empakaaiPage.wildlife.title} subtitle={empakaaiPage.wildlife.intro} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {empakaaiPage.wildlife.animals.map((animal, index) => (
              <Reveal key={animal.name} delay={index * 0.05} className={index === 0 ? "lg:col-span-2" : ""}>
              <article className={`group relative isolate min-h-[300px] overflow-hidden rounded-3xl bg-earth ${animal.image ? "" : "flex items-end bg-gradient-to-br from-terracotta/80 via-earth to-forest p-6"}`}>
                {animal.image ? (
                  <>
                    <SmartImage src={animal.image} alt={animal.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/25 to-transparent" />
                  </>
                ) : <Bird aria-hidden="true" className="absolute right-8 top-8 size-16 text-gold/50" />}
                <div className={`absolute inset-x-0 bottom-0 p-6 ${animal.image ? "" : "relative"}`}>
                  <span className="inline-flex min-h-8 items-center rounded-full bg-white/15 px-3 text-xs font-bold uppercase tracking-wider text-gold">{animal.status}</span>
                  <h3 className="mt-3 font-heading text-2xl text-white">{animal.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">{animal.text}</p>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
          <Callout variant="note" className="mt-6">{empakaaiPage.wildlife.callout}</Callout>
        </Container>
      </section>

      <section id={empakaaiPage.hike.id} aria-labelledby="empakaai-hike-heading" className="scroll-mt-24 bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="empakaai-hike-heading" eyebrow={empakaaiPage.hike.eyebrow} title={empakaaiPage.hike.title} />
          <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {empakaaiPage.hike.steps.map((step, index) => {
              const Icon = hikeStepIcons[index] ?? Footprints;
              return (
                <li key={step.title}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <article className="h-full rounded-2xl border border-sand bg-white p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-gold"><Icon aria-hidden="true" size={22} /></span>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Step {index + 1}</span>
                          <h3 className="mt-1 font-heading text-xl text-earth">{step.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <HikeProfile data={empakaaiPage.hike.profile} />
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {empakaaiPage.hike.facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm">
                  <dt className="text-sm font-semibold text-muted">{fact.label}</dt>
                  <dd className="text-right text-sm font-bold text-earth">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <EmpakaaiDayTimeline data={empakaaiPage.day} />

      <section aria-labelledby="empakaai-rules-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="empakaai-rules-heading" eyebrow={empakaaiPage.rules.eyebrow} title={empakaaiPage.rules.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {empakaaiPage.rules.items.map((item, index) => {
              const Icon = ruleIcons[index] ?? Mountain;
              return (
                <article key={item.title} className="rounded-2xl border border-sand bg-white p-5 shadow-sm">
                  <Icon aria-hidden="true" className="size-6 text-terracotta" />
                  <h3 className="mt-4 font-heading text-lg text-earth">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                  {"link" in item && item.link ? <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-terracotta underline underline-offset-4">{item.link.label}</a> : null}
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="empakaai-extension-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="empakaai-extension-heading" eyebrow={empakaaiPage.extension.eyebrow} title={empakaaiPage.extension.title} />
          <p className="mx-auto max-w-[65ch] text-center text-lg leading-8 text-muted">{empakaaiPage.extension.text}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {empakaaiPage.extension.links.map((link, index) => (
              <Link key={link.href} href={link.href} className="group flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-sand bg-white p-5 font-heading text-xl text-earth shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                <span>{link.label}</span>
                <ArrowRight aria-hidden="true" className="shrink-0 text-terracotta transition-transform group-hover:translate-x-1" />
                <span className="sr-only">Link {index + 1}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <NgJourneys data={empakaaiPage.journeys} packages={journeys} />
      <NgFaqSection eyebrow={empakaaiPage.faqSection.eyebrow} title={empakaaiPage.faqSection.title} items={empakaaiPage.faq} />
      <CtaBanner
        eyebrow={empakaaiPage.cta.eyebrow}
        title={empakaaiPage.cta.title}
        description={empakaaiPage.cta.description}
        image={{ src: empakaaiPage.cta.image, alt: empakaaiPage.cta.imageAlt }}
        primaryCta={empakaaiPage.cta.primary}
        secondaryCta={{ label: empakaaiPage.cta.secondary.label, href: siteConfig.whatsappUrlWithMessage(empakaaiPage.cta.whatsappMessage) }}
      />
    </main>
  );
}
