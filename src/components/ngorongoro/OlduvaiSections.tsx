import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Footprints,
  Landmark,
  MapPin,
  Route,
  Sun,
  Wind,
} from "lucide-react";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import NgHero from "@/components/ngorongoro/NgHero";
import {
  NgFaqSection,
  NgJourneys,
  NgQuickFacts,
  NgStory,
} from "@/components/ngorongoro/HubSections";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/site";
import { olduvaiBreadcrumbs, olduvaiPage } from "@/data/ngorongoro-olduvai";
import type { PackageCardProps } from "@/components/inner/PackageCard";
import { OlduvaiTimeline } from "@/components/ngorongoro/EmpakaaiOlduvaiInteractive";

const visitIcons = [MapPin, Landmark, Wind, Route];
const ruleIcons = [MapPin, Landmark, Sun, BookOpen, Route, Footprints];

export default function OlduvaiPageSections({ journeys }: { journeys: PackageCardProps[] }) {
  return (
    <main>
      <NgHero data={olduvaiPage.hero} breadcrumbs={olduvaiBreadcrumbs} divider="strata" />
      <NgQuickFacts items={olduvaiPage.quickFacts} />
      <NgStory story={olduvaiPage.story} pullQuote={olduvaiPage.story.pullQuote} imageSide="right" headingId="olduvai-story-heading" />

      <OlduvaiTimeline data={olduvaiPage.timeline} />

      <section aria-labelledby="olduvai-cast-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="olduvai-cast-heading" eyebrow={olduvaiPage.cast.eyebrow} title={olduvaiPage.cast.title} />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {olduvaiPage.cast.cards.map((person, index) => {
              const Icon = [Footprints, BookOpen, Footprints, Landmark][index] ?? BookOpen;
              return (
                <Reveal key={person.title} delay={index * 0.06}>
                  <article className="flex min-h-[280px] flex-col rounded-3xl border border-sand bg-white p-6 shadow-card">
                    <span className="flex size-12 items-center justify-center rounded-full bg-sand text-terracotta"><Icon aria-hidden="true" size={23} /></span>
                    <h3 className="mt-5 font-heading text-xl leading-snug text-earth">{person.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">{person.text}</p>
                    <p className="mt-5 border-t border-sand pt-4 text-xs font-semibold text-terracotta">{olduvaiPage.cast.footer}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="olduvai-gorge-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="olduvai-gorge-heading" eyebrow={olduvaiPage.gorge.eyebrow} title={olduvaiPage.gorge.title} align="left" />
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="max-w-[65ch] text-base leading-8 text-muted">{olduvaiPage.gorge.text}</p>
              <Callout variant="tip" className="mt-6">{olduvaiPage.gorge.spellingNote}</Callout>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {olduvaiPage.gorge.strata.map((label, index) => (
                  <div key={label} className="flex min-h-12 items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-earth">
                    <span aria-hidden="true" className={`size-3 rounded-full ${["bg-terracotta", "bg-sand", "bg-earth", "bg-gold"][index]}`} />
                    {label}
                  </div>
                ))}
              </div>
              <p className="sr-only">What&apos;s in the layers: {olduvaiPage.gorge.strata.join(", ")}.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
              <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] bg-earth sm:min-h-[450px]">
                <SmartImage src={olduvaiPage.gorge.image} alt={olduvaiPage.gorge.imageAlt} sizes="(max-width: 1024px) 100vw, 40vw" fill className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/40 to-transparent" />
              </div>
              <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] bg-cream p-5 sm:min-h-[450px]">
                <svg aria-hidden="true" viewBox="0 0 300 500" preserveAspectRatio="none" className="absolute inset-0 size-full">
                  <path d="M0 30C80 10 174 51 300 25V140C195 165 100 118 0 147Z" fill="#d9a441" />
                  <path d="M0 155C106 130 187 179 300 149V268C193 290 94 252 0 278Z" fill="#b5532f" />
                  <path d="M0 288C93 266 199 312 300 278V410C198 437 97 393 0 421Z" fill="#2a1f17" />
                </svg>
                <div className="relative z-10 rounded-2xl bg-cream/90 p-4 shadow-sm">
                  <h3 className="font-heading text-lg text-earth">What is in the layers</h3>
                  <ul className="mt-3 space-y-3 text-sm font-semibold text-earth">
                    {olduvaiPage.gorge.strata.map((label, index) => (
                      <li key={label} className="flex items-center gap-2">
                        <span aria-hidden="true" className={`size-3 rounded-full ${["bg-terracotta", "bg-sand", "bg-earth", "bg-gold"][index]}`} />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="olduvai-visit-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="olduvai-visit-heading" eyebrow={olduvaiPage.visit.eyebrow} title={olduvaiPage.visit.title} />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <ol className="space-y-4">
              {olduvaiPage.visit.steps.map((step, index) => {
                const Icon = visitIcons[index] ?? Route;
                return (
                  <li key={step.title}>
                    <Reveal delay={index * 0.06}>
                      <article className="rounded-2xl border border-sand bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex gap-4">
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-gold"><Icon aria-hidden="true" size={22} /></span>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Stop {index + 1}</span>
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
            <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-sand lg:min-h-full">
              <SmartImage src={olduvaiPage.visit.museumImage} alt={olduvaiPage.visit.museumImageAlt} sizes="(max-width: 1024px) 100vw, 40vw" fill className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">What you will see</p>
                <h3 className="mt-2 font-heading text-2xl text-white">The site museum</h3>
                <p className="mt-2 max-w-[48ch] text-sm leading-6 text-white/85">{olduvaiPage.visit.steps[1].text}</p>
              </div>
            </div>
          </div>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:grid-cols-3">
            {olduvaiPage.visit.facts.map((fact) => (
              <div key={fact.label} className="bg-cream p-5 text-center">
                <dt className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta">{fact.label}</dt>
                <dd className="mt-2 font-heading text-xl text-earth">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="olduvai-laetoli-heading" className="bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="olduvai-laetoli-heading" eyebrow={olduvaiPage.laetoli.eyebrow} title={olduvaiPage.laetoli.title} tone="light" />
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-5 text-base leading-8 text-cream/85">
              {olduvaiPage.laetoli.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-earth sm:min-h-[400px]">
              <SmartImage src={olduvaiPage.laetoli.image} alt={olduvaiPage.laetoli.imageAlt} sizes="(max-width: 768px) 100vw, 50vw" fill className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/55 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="olduvai-route-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="olduvai-route-heading" eyebrow={olduvaiPage.route.eyebrow} title={olduvaiPage.route.title} align="left" />
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <div className="flex size-16 items-center justify-center rounded-full bg-forest text-gold"><Route aria-hidden="true" size={28} /></div>
            <p className="max-w-[65ch] leading-8 text-muted">{olduvaiPage.route.text}</p>
            <div className="flex flex-col items-start gap-2">
              <Link href="/safaris/serengeti" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">Explore the Serengeti<ArrowRight aria-hidden="true" size={16} /></Link>
              <Link href="/safaris/ngorongoro" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">Explore Ngorongoro<ArrowRight aria-hidden="true" size={16} /></Link>
              <Link href="/safaris/ngorongoro/crater" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">Explore the crater<ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
        </Container>
      </section>

      <NgJourneys
        data={olduvaiPage.journeys}
        packages={journeys}
      />

      <section aria-labelledby="olduvai-rules-heading" className="bg-cream py-16 md:py-24">
        <Container>
          <SectionHeading id="olduvai-rules-heading" eyebrow={olduvaiPage.rules.eyebrow} title={olduvaiPage.rules.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {olduvaiPage.rules.items.map((item, index) => {
              const Icon = ruleIcons[index] ?? BookOpen;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-2xl border border-sand bg-white p-6 shadow-sm">
                    <Icon aria-hidden="true" className="size-6 text-terracotta" />
                    <h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                    {"link" in item && item.link ? (
                      <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-terracotta underline underline-offset-4">{item.link.label}</a>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <NgFaqSection eyebrow={olduvaiPage.faqSection.eyebrow} title={olduvaiPage.faqSection.title} items={olduvaiPage.faq} />
      <CtaBanner
        eyebrow={olduvaiPage.cta.eyebrow}
        title={olduvaiPage.cta.title}
        description={olduvaiPage.cta.description}
        image={{ src: olduvaiPage.cta.image, alt: olduvaiPage.cta.imageAlt }}
        primaryCta={olduvaiPage.cta.primary}
        secondaryCta={{ label: olduvaiPage.cta.secondary.label, href: siteConfig.whatsappUrlWithMessage(olduvaiPage.cta.whatsappMessage) }}
      />
    </main>
  );
}
