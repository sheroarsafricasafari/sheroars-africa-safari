import Link from "next/link";
import { ArrowRight, Check, CircleHelp, ShieldAlert } from "lucide-react";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import { NgJourneys, NgStory } from "@/components/ngorongoro/HubSections";
import NgEditorialHero from "@/components/ngorongoro/NgEditorialHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { maasaiBreadcrumbs, maasaiPage } from "@/data/ngorongoro-maasai";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import type { PackageCardProps } from "@/components/inner/PackageCard";

const visits = safaris
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
  })) satisfies PackageCardProps[];

export default function MaasaiPageSections() {
  const fee = maasaiPage.feeTransparency;
  const showFeeTransparency = fee.feePerPerson !== null
    && Boolean(fee.recipient && fee.communityShare && fee.craftPayment);

  return (
    <main>
      <NgEditorialHero data={maasaiPage.hero} breadcrumbs={maasaiBreadcrumbs} mood="sunrise" />

      <section aria-label="Quick facts" className="relative z-20 -mt-7 pb-10 sm:-mt-12">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-sand bg-sand shadow-lift sm:grid-cols-2 lg:grid-cols-5">
            {maasaiPage.quickFacts.map((fact) => (
              <div key={fact.label} className="bg-white p-5 sm:p-6">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">{fact.label}</dt>
                <dd className="mt-3 text-sm leading-6 text-earth">{fact.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <NgStory story={maasaiPage.story} pullQuote={maasaiPage.story.pullQuote} imageSide="right" headingId="maasai-story-heading" />

      <section id={maasaiPage.visit.id} aria-labelledby="maasai-visit-heading" className="scroll-mt-24 bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="maasai-visit-heading" eyebrow={maasaiPage.visit.eyebrow} title={maasaiPage.visit.title} subtitle={maasaiPage.visit.intro} />
          <div className="relative">
            <div aria-hidden="true" className="absolute bottom-5 left-5 top-5 w-px bg-terracotta/40 xl:hidden" />
            <svg aria-hidden="true" viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-0 top-5 hidden h-10 w-full xl:block">
              <path d="M75 20H925" stroke="#b5532f" strokeWidth="2" strokeDasharray="4 7" opacity=".55" />
              {[75, 358, 642, 925].map((x) => <circle key={x} cx={x} cy="20" r="5" fill="#d9a441" />)}
            </svg>
            <ol className="relative grid gap-4 xl:grid-cols-4 xl:gap-4">
              {maasaiPage.visit.steps.map((step, index) => (
                <li key={step.title} className="relative">
                  <Reveal delay={index * 0.045} className="h-full">
                    <article className="relative h-full rounded-3xl border border-white bg-cream p-6 shadow-card">
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-forest text-sm font-bold text-gold">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-4 font-heading text-xl text-earth">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-5 text-center text-sm text-muted">{maasaiPage.visit.footnote}</p>
        </Container>
      </section>

      <section aria-labelledby="maasai-comparison-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="maasai-comparison-heading" eyebrow={maasaiPage.comparison.eyebrow} title={maasaiPage.comparison.title} />
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-forest/15 bg-white p-6 shadow-card sm:p-8">
              <h3 className="flex items-center gap-3 font-heading text-2xl text-earth"><Check aria-hidden="true" className="text-forest" />{maasaiPage.comparison.goodTitle}</h3>
              <ul className="mt-6 space-y-4">
                {maasaiPage.comparison.good.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" />{line}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-terracotta/20 bg-sand/50 p-6 shadow-card sm:p-8">
              <h3 className="flex items-center gap-3 font-heading text-2xl text-earth"><ShieldAlert aria-hidden="true" className="text-terracotta" />{maasaiPage.comparison.warningTitle}</h3>
              <ul className="mt-6 space-y-4">
                {maasaiPage.comparison.warnings.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-6 text-muted"><span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-terracotta" />{line}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mx-auto mt-7 max-w-4xl text-center text-base leading-7 text-earth">{maasaiPage.comparison.closing}</p>
        </Container>
      </section>

      <section aria-labelledby="maasai-etiquette-heading" className="bg-sand/50 py-16 md:py-24">
        <Container>
          <SectionHeading id="maasai-etiquette-heading" eyebrow={maasaiPage.etiquette.eyebrow} title={maasaiPage.etiquette.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {maasaiPage.etiquette.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full rounded-2xl border border-white bg-white p-5 shadow-sm">
                  <span className="font-heading text-3xl text-terracotta">0{index + 1}</span>
                  <h3 className="mt-3 font-heading text-xl text-earth">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="maasai-questions-heading" className="bg-forest py-16 text-cream md:py-24">
        <Container>
          <SectionHeading id="maasai-questions-heading" eyebrow={maasaiPage.questions.eyebrow} title={maasaiPage.questions.title} subtitle={maasaiPage.questions.intro} tone="light" />
          <div className="rounded-[2rem] border border-white/15 bg-white/5 p-6 sm:p-9">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {maasaiPage.questions.items.map((question) => (
                <li key={question} className="flex min-h-16 items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-cream">
                  <CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {showFeeTransparency ? (
        <section aria-labelledby="maasai-fees-heading" className="py-16 md:py-24">
          <Container>
            <SectionHeading id="maasai-fees-heading" eyebrow="FAIR EXCHANGE" title="Where Your Money Goes" />
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-sand bg-sand shadow-card sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6"><dt className="text-sm text-muted">{fee.labels.fee}</dt><dd className="mt-2 font-heading text-2xl text-earth">{fee.feePerPerson}</dd></div>
              <div className="bg-white p-6"><dt className="text-sm text-muted">{fee.labels.recipient}</dt><dd className="mt-2 font-heading text-xl text-earth">{fee.recipient}</dd></div>
              <div className="bg-white p-6"><dt className="text-sm text-muted">{fee.labels.share}</dt><dd className="mt-2 font-heading text-xl text-earth">{fee.communityShare}</dd></div>
              <div className="bg-white p-6"><dt className="text-sm text-muted">{fee.labels.crafts}</dt><dd className="mt-2 font-heading text-xl text-earth">{fee.craftPayment}</dd></div>
            </dl>
            <p className="mt-5 text-center text-sm text-muted">Fees are agreed with the community and paid directly to them.</p>
          </Container>
        </section>
      ) : null}

      {maasaiPage.showContextNote ? (
        <section aria-labelledby="maasai-context-heading" className="bg-cream py-12">
          <Container className="max-w-4xl">
            <article className="rounded-3xl border border-sand bg-white p-7">
              <h2 id="maasai-context-heading" className="font-heading text-2xl text-earth">{maasaiPage.contextNote.title}</h2>
              <p className="mt-3 leading-7 text-muted">{maasaiPage.contextNote.text}</p>
            </article>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="maasai-fit-heading" className="bg-sand/60 py-16 md:py-24">
        <Container>
          <SectionHeading id="maasai-fit-heading" eyebrow={maasaiPage.fitting.eyebrow} title={maasaiPage.fitting.title} />
          <div className="grid gap-5 md:grid-cols-2">
            {maasaiPage.fitting.cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-white bg-white p-7 shadow-card sm:p-8">
                <h3 className="font-heading text-2xl text-earth">{card.title}</h3>
                <p className="mt-4 leading-7 text-muted">{card.text}</p>
                {"links" in card ? (
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {card.links.map((link) => <li key={link.href}><Link className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta" href={link.href}>{link.label}<ArrowRight aria-hidden="true" size={16} /></Link></li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <Callout variant="tip" className="mx-auto mt-6 max-w-4xl">{maasaiPage.fitting.callout}</Callout>
        </Container>
      </section>

      <NgJourneys data={maasaiPage.journeys} packages={visits} hidePrices />

      <section aria-labelledby="maasai-faq-heading" className="bg-cream py-16 md:py-24">
        <Container className="max-w-5xl">
          <SectionHeading id="maasai-faq-heading" eyebrow={maasaiPage.faqSection.eyebrow} title={maasaiPage.faqSection.title} />
          <FaqAccordion items={[...maasaiPage.faq]} jsonLd />
        </Container>
      </section>

      <CtaBanner
        eyebrow={maasaiPage.cta.eyebrow}
        title={maasaiPage.cta.title}
        description={maasaiPage.cta.description}
        image={{ src: maasaiPage.cta.image, alt: maasaiPage.cta.imageAlt }}
        primaryCta={maasaiPage.cta.primary}
        secondaryCta={{ label: maasaiPage.cta.secondaryLabel, href: siteConfig.whatsappUrlWithMessage(maasaiPage.cta.whatsappMessage) }}
        id="maasai-final-cta"
      />
    </main>
  );
}
