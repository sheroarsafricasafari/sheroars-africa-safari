import Link from "next/link";
import { ArrowRight, Coffee, Mountain, Trees } from "lucide-react";
import type { PackageCardProps } from "@/components/inner/PackageCard";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import { NgJourneys, NgStory } from "@/components/ngorongoro/HubSections";
import NgEditorialHero from "@/components/ngorongoro/NgEditorialHero";
import { NgorongoroStayFilters, NgorongoroStayMatcher, StayElevationDiagram } from "@/components/ngorongoro/NgorongoroStayTools";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ngorongoroStays } from "@/data/ngorongoro-stays";
import { ngorongoroStayBreadcrumbs, ngorongoroStayPage } from "@/data/ngorongoro-stay-page";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";

const journeys: PackageCardProps[] = safaris
  .filter((safari) => safari.slug !== "7-day-women-only-group-safari" && safari.parks.includes("Ngorongoro"))
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

export default function NgorongoroStayPageSections() {
  return (
    <main>
      <NgEditorialHero data={ngorongoroStayPage.hero} breadcrumbs={ngorongoroStayBreadcrumbs} mood="mist" />

      <section aria-label="Quick facts" className="relative z-20 -mt-7 pb-10 sm:-mt-12">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-sand bg-sand shadow-lift sm:grid-cols-2 lg:grid-cols-5">
            {ngorongoroStayPage.quickFacts.map((fact) => (
              <div key={fact.label} className="bg-white p-5 sm:p-6">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">{fact.label}</dt>
                <dd className="mt-3 text-sm leading-6 text-earth">{fact.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <NgStory story={ngorongoroStayPage.story} pullQuote={ngorongoroStayPage.story.pullQuote} imageSide="right" headingId="ngorongoro-stay-story-heading" />

      <section id={ngorongoroStayPage.decision.id} aria-labelledby="ngorongoro-stay-decision-heading" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="ngorongoro-stay-decision-heading" eyebrow={ngorongoroStayPage.decision.eyebrow} title={ngorongoroStayPage.decision.title} tone="light" />
          <StayElevationDiagram label={ngorongoroStayPage.decision.diagramLabel} description={ngorongoroStayPage.decision.diagramText} />
          <div className="mt-8 hidden overflow-hidden rounded-3xl border border-white/15 md:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-white/10">
                <tr>
                  <th scope="col" className="w-40 p-5 text-xs uppercase tracking-[0.18em] text-gold">{ngorongoroStayPage.decision.tableHeader}</th>
                  <th scope="col" className="p-5 font-heading text-2xl text-white">{ngorongoroStayPage.decision.rimLabel}</th>
                  <th scope="col" className="p-5 font-heading text-2xl text-white">{ngorongoroStayPage.decision.karatuLabel}</th>
                </tr>
              </thead>
              <tbody>
                {ngorongoroStayPage.decision.rim.map((item, index) => (
                  <tr key={item} className="border-t border-white/15">
                    <th scope="row" className="p-5 text-sm font-semibold text-gold">{ngorongoroStayPage.decision.categories[index]}</th>
                    <td className="p-5 text-sm leading-6 text-cream/85">{item}</td>
                    <td className="p-5 text-sm leading-6 text-cream/85">{ngorongoroStayPage.decision.karatu[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-4 md:hidden">
            {[
              { title: ngorongoroStayPage.decision.rimLabel, items: ngorongoroStayPage.decision.rim },
              { title: ngorongoroStayPage.decision.karatuLabel, items: ngorongoroStayPage.decision.karatu },
            ].map((area) => (
              <article key={area.title} className="rounded-3xl border border-white/15 bg-white/10 p-6">
                <h3 className="font-heading text-2xl text-white">{area.title}</h3>
                <ul className="mt-4 space-y-3">
                  {area.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-cream/85"><span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-gold" />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-cream/75">{ngorongoroStayPage.decision.note}</p>
          <Callout variant="tip" className="mx-auto mt-6 max-w-4xl">{ngorongoroStayPage.decision.callout}</Callout>
        </Container>
      </section>

      <section aria-labelledby="stay-matcher-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="stay-matcher-heading" eyebrow="A QUICK QUIZ" title="Find Your Stay in Four Taps" subtitle="Tell us what matters, and we will point you to the right side of the crater. This is a starting point, not a booking." />
          <NgorongoroStayMatcher stays={ngorongoroStays} copy={ngorongoroStayPage.matcher} />
        </Container>
      </section>

      <section aria-labelledby="stay-rim-guide-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="stay-rim-guide-heading" eyebrow={ngorongoroStayPage.rimGuide.eyebrow} title={ngorongoroStayPage.rimGuide.title} subtitle={ngorongoroStayPage.rimGuide.intro} />
          <div className="grid gap-4 sm:grid-cols-2">
            {ngorongoroStayPage.rimGuide.zones.map((zone, index) => {
              const Icon = index === 3 ? Coffee : index === 1 ? Trees : Mountain;
              return (
                <Reveal key={zone.title} delay={index * 0.05}>
                  <article className="h-full rounded-3xl border border-white bg-white p-6 shadow-card sm:p-8">
                    <Icon aria-hidden="true" className="size-7 text-terracotta" />
                    <h3 className="mt-4 font-heading text-2xl text-earth">{zone.title}</h3>
                    <p className="mt-3 leading-7 text-muted">{zone.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="stay-shortlist-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="stay-shortlist-heading" eyebrow={ngorongoroStayPage.stayGrid.eyebrow} title={ngorongoroStayPage.stayGrid.title} subtitle={ngorongoroStayPage.stayGrid.intro} />
          <NgorongoroStayFilters stays={ngorongoroStays} copy={ngorongoroStayPage.stayGrid} />
          <p className="mt-6 text-center text-sm leading-6 text-muted">{ngorongoroStayPage.stayGrid.note}</p>
        </Container>
      </section>

      <section aria-labelledby="stay-activities-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="stay-activities-heading" eyebrow={ngorongoroStayPage.activities.eyebrow} title={ngorongoroStayPage.activities.title} />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {ngorongoroStayPage.activities.items.map((item, index) => (
              <Link key={item.href} href={item.href} className="group rounded-3xl border border-white bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="font-heading text-3xl text-terracotta">0{index + 1}</span>
                <h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-terracotta">{ngorongoroStayPage.activityLinkLabel} <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="stay-practical-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="stay-practical-heading" eyebrow={ngorongoroStayPage.practical.eyebrow} title={ngorongoroStayPage.practical.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ngorongoroStayPage.practical.items.map((tip, index) => (
              <Reveal key={tip.title} delay={index * 0.035}>
                <article className="h-full rounded-2xl border border-sand bg-white p-5 shadow-sm">
                  <span className="font-heading text-3xl text-gold">0{index + 1}</span>
                  <h3 className="mt-3 font-heading text-xl text-earth">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{tip.text}</p>
                  {"link" in tip && tip.link ? <a href={tip.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{tip.link.label}</a> : null}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="bg-sand/60">
        <NgJourneys data={ngorongoroStayPage.journeys} packages={journeys} hidePrices />
      </div>

      <section aria-labelledby="ngorongoro-stay-faq-heading" className="bg-cream py-16 md:py-24">
        <Container className="max-w-5xl">
          <SectionHeading id="ngorongoro-stay-faq-heading" eyebrow={ngorongoroStayPage.faqSection.eyebrow} title={ngorongoroStayPage.faqSection.title} />
          <FaqAccordion items={[...ngorongoroStayPage.faq]} jsonLd />
        </Container>
      </section>

      <CtaBanner
        eyebrow={ngorongoroStayPage.cta.eyebrow}
        title={ngorongoroStayPage.cta.title}
        description={ngorongoroStayPage.cta.description}
        image={{ src: ngorongoroStayPage.cta.image, alt: ngorongoroStayPage.cta.imageAlt }}
        primaryCta={ngorongoroStayPage.cta.primary}
        secondaryCta={{ label: ngorongoroStayPage.cta.secondaryLabel, href: siteConfig.whatsappUrlWithMessage(ngorongoroStayPage.cta.whatsappMessage) }}
      />
    </main>
  );
}
