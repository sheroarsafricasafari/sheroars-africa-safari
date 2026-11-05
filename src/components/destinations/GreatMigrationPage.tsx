import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { getAllPackages } from "@/data";
import type { GreatMigrationData } from "@/data/destinations/great-migration";
import { buildArticleJsonLd, buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { SubRegionLayout, DestinationSection } from "@/components/destinations/Layouts";
import { WildlifeShowcase } from "@/components/destinations/Editorial";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Callout from "@/components/inner/Callout";
import FaqAccordion from "@/components/inner/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import DrawPath from "@/components/motion/DrawPath";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import MigrationJourneyExplorer from "@/components/destinations/migration/MigrationJourneyExplorer";
import MigrationMonthExplorer from "@/components/destinations/migration/MigrationMonthExplorer";
import MigrationExperienceSelector from "@/components/destinations/migration/MigrationExperienceSelector";

const LazyPackagesCarousel = dynamic(() => import("@/components/destinations/PackagesCarouselServer"), {
  ssr: true,
  loading: () => <div className="min-h-72 rounded-3xl bg-sand" aria-hidden="true" />,
});

const path = "/safaris/serengeti/great-migration";

export default function GreatMigrationPage({ data }: { data: GreatMigrationData }) {
  const migrationPackages = getAllPackages().filter((item) =>
    item.parks.includes("Serengeti") && item.tags.includes("Great Migration"),
  );
  const articleJsonLd = buildArticleJsonLd({
    title: data.meta.title,
    excerpt: data.meta.description,
    path,
    image: data.hero.image,
  });
  const faqJsonLd = buildFaqJsonLd(data.faqs);

  return (
    <SubRegionLayout
      hero={data.hero}
      breadcrumbs={data.breadcrumbs}
      nav={data.nav}
      related={data.related}
      relatedTitle="Continue Exploring the Migration Regions"
      cta={data.cta}
      ctaImage={data.ctaImage}
      ctaImageAlt={data.ctaImageAlt}
      ctaEyebrow={data.ctaEyebrow}
      whatsappMessage={data.whatsappMessage}
    >
      <JsonLd data={articleJsonLd} />

      <DestinationSection id="overview" tone="cream">
        <SectionHeading eyebrow={data.overview.eyebrow} title={data.overview.title} align="left" />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:gap-14">
          <div className="max-w-4xl space-y-5 text-base leading-8 text-muted">
            {data.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {data.overview.facts.map((fact) => <div key={fact.label} className="border-l-2 border-gold bg-white/70 px-5 py-4">
              <dt className="font-heading text-2xl text-earth">{fact.value}</dt>
              <dd className="mt-1 text-sm leading-6 text-muted">{fact.label}</dd>
            </div>)}
          </dl>
        </div>
      </DestinationSection>

      <DestinationSection id="migration-map" tone="forest">
        <SectionHeading eyebrow="A CONNECTED ECOSYSTEM" title="Explore the Migration's Changing Regions" subtitle="Select a region to understand its part in the annual cycle and how it may fit your safari." tone="light" />
        <MigrationJourneyExplorer regions={data.regions} />
      </DestinationSection>

      <DestinationSection id="migration-calendar" tone="sand">
        <SectionHeading eyebrow="A YEAR OF NATURAL MOVEMENT" title="Follow the Great Migration Month by Month" subtitle="Use this interactive guide as a broad seasonal planning reference. It does not show live locations or guarantee where herds will be." />
        <MigrationMonthExplorer months={data.months} />
      </DestinationSection>

      <DestinationSection id="journey-stages" tone="cream">
        <SectionHeading eyebrow="THE ANNUAL CYCLE" title="The Journey Through the Seasons" subtitle="Six broad chapters describe a changing ecological journey, not a fixed route or schedule." />
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 border-l border-gold/50 md:hidden" aria-hidden="true" />
          <div className="hidden md:block" aria-hidden="true">
            <DrawPath d="M 20 60 C 180 52 260 65 360 60 S 530 54 650 60 S 830 66 980 58" className="h-14 w-full text-gold" />
          </div>
          <StaggerGroup className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {data.stages.map((stage, index) => (
              <StaggerItem key={stage.title}>
                <article className="relative h-full rounded-2xl border border-sand bg-white p-5 pl-10 shadow-sm md:p-5">
                  <span className="absolute left-3 top-6 flex size-7 items-center justify-center rounded-full border border-gold bg-cream text-xs font-bold text-earth md:static md:mb-5">{index + 1}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{stage.period}</p>
                  <h3 className="mt-2 font-heading text-xl leading-snug text-earth">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{stage.description}</p>
                  <p className="mt-4 border-t border-sand pt-3 text-xs font-semibold leading-5 text-forest">{stage.region}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </DestinationSection>

      <DestinationSection id="experiences" tone="sand">
        <SectionHeading eyebrow="SIX SIGNATURE EXPERIENCES" title="Six Extraordinary Moments of the Great Migration" subtitle="Every experience belongs to a living ecosystem. Wildlife movements and encounters are never guaranteed." />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {data.experiences.map((experience) => (
            <StaggerItem key={experience.title}>
              <article className="group h-full overflow-hidden rounded-2xl border border-sand bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                  <SmartImage src={experience.image} alt={experience.imageAlt} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-forest/85 px-3 py-1.5 text-xs font-semibold text-cream backdrop-blur">{experience.period}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{experience.region}</p>
                  <h3 className="mt-2 font-heading text-2xl text-earth">{experience.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{experience.description}</p>
                  <Link href={experience.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                    {experience.linkLabel}<ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </DestinationSection>

      <DestinationSection id="calving" tone="forest">
        <SectionHeading eyebrow={data.calvingFeature.eyebrow} title={data.calvingFeature.title} subtitle="The southern plains are an important part of the migration's annual renewal." tone="light" />
        <div className="grid min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#183c31] shadow-lift lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-80 bg-forest sm:min-h-[35rem]">
            <SmartImage src={data.calvingFeature.image} alt={data.calvingFeature.imageAlt} sizes="(max-width: 1024px) 100vw, 52vw" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-6 text-cream sm:p-10 lg:p-12">
            <p className="text-eyebrow text-gold">{data.calvingFeature.eyebrow}</p>
            <h3 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">{data.calvingFeature.title}</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-cream/80">
              {data.calvingFeature.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <aside className="mt-7 border-l border-gold pl-5">
              <p className="font-heading text-xl leading-snug text-gold">{data.calvingFeature.statistic}</p>
              <p className="mt-2 text-xs leading-5 text-cream/65">{data.calvingFeature.statisticSource}. Approximate, source-attributed figure.</p>
              <a href={data.calvingFeature.statisticSourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-gold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                Read the cited TANAPA publication
              </a>
            </aside>
            <div className="mt-7">
              <Button href={data.calvingFeature.cta.href} variant="light">{data.calvingFeature.cta.label}<ArrowRight aria-hidden="true" size={17} /></Button>
            </div>
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="rivers" tone="cream">
        <SectionHeading eyebrow="TWO RIVERS, DIFFERENT REGIONS" title="Two Rivers. Two Different Migration Experiences." subtitle="The Grumeti and Mara are part of distinct regional chapters. River crossings cannot be guaranteed." />
        <div className="grid gap-5 lg:grid-cols-2">
          {data.rivers.map((river) => (
            <article key={river.title} className="group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-forest p-6 text-cream shadow-lift sm:p-9">
              <SmartImage src={river.image} alt={river.imageAlt} sizes="(max-width: 1024px) 100vw, 50vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
              <div className="absolute inset-0 -z-0 bg-gradient-to-t from-earth/95 via-earth/45 to-transparent" />
              <div className="relative z-10">
                <p className="text-eyebrow text-gold">{river.region} · {river.period}</p>
                <h3 className="mt-3 font-heading text-3xl sm:text-4xl">{river.title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-cream/85">{river.description}</p>
                <p className="mt-3 text-sm leading-6 text-cream/75"><strong className="text-cream">River wildlife: </strong>{river.wildlife}</p>
                <Link href={river.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                  {river.linkLabel}<ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Callout variant="note" title="A natural event, never a timetable" className="mt-7">
          River crossings cannot be guaranteed. Herds may approach, pause, move away or cross somewhere outside a visitor&apos;s viewing position.
        </Callout>
      </DestinationSection>

      <DestinationSection id="wildlife" tone="sand">
        <SectionHeading eyebrow="A LIVING ECOSYSTEM" title="The Wildlife Behind the Great Migration" subtitle="Migratory grazers, resident predators and scavengers interact across a connected landscape." />
        <WildlifeShowcase items={data.wildlife} note="Not every species follows the same route. Each animal responds to habitat, prey, water and its own seasonal needs." />
      </DestinationSection>

      <DestinationSection id="choose-experience" tone="cream">
        <SectionHeading eyebrow="PLAN AROUND WHAT MATTERS TO YOU" title="Choose Your Great Migration Experience" subtitle="Start with the moments that interest you, then match the season and region to a flexible itinerary." />
        <MigrationExperienceSelector options={data.seasons} />
      </DestinationSection>

      <DestinationSection id="planning" tone="sand">
        <SectionHeading eyebrow="FROM INSPIRATION TO ITINERARY" title="Planning Your Great Migration Safari" subtitle="Thoughtful planning balances seasonal patterns with realistic logistics and room for nature to vary." />
        <div className="relative">
          <div className="absolute bottom-4 left-6 top-4 border-l border-gold/50 md:left-8" aria-hidden="true" />
          <StaggerGroup className="grid gap-4 md:grid-cols-2">
            {data.planningSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <article className="relative flex h-full gap-4 rounded-2xl border border-sand bg-white p-5 pl-4 shadow-sm sm:gap-5 sm:p-6">
                  <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-gold bg-cream font-heading text-xl text-earth sm:size-14">{index + 1}</span>
                  <div><h3 className="font-heading text-xl text-earth">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{step.text}</p></div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </DestinationSection>

      <DestinationSection id="routes" tone="cream">
        <SectionHeading eyebrow="ROUTE IDEAS, NOT PACKAGES" title="Sample Migration Safari Routes" subtitle="These illustrative concepts show how regions may be combined. They are not confirmed company itineraries." />
        <StaggerGroup className="grid gap-5 lg:grid-cols-3">
          {data.sampleRoutes.map((sample) => (
            <StaggerItem key={sample.title}>
              <article className="flex h-full flex-col rounded-3xl border border-sand bg-white p-6 shadow-sm sm:p-7">
                <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{sample.period}</p>
                <h3 className="mt-2 font-heading text-2xl text-earth">{sample.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{sample.description}</p>
                <ol className="mt-6 grid gap-2">
                  {sample.route.map((stop, index) => <li key={`${sample.title}-${stop}`} className="flex min-h-10 items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-gold">{index + 1}</span>
                    <span className="text-sm font-medium text-earth">{stop}</span>
                    {index < sample.route.length - 1 ? <ArrowRight aria-hidden="true" size={15} className="ml-auto text-terracotta" /> : null}
                  </li>)}
                </ol>
                <p className="mt-6 border-t border-sand pt-4 text-xs leading-5 text-muted">{sample.label}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-forest p-6 text-cream sm:p-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold">BUILD A JOURNEY THAT FITS YOUR DATES</p>
            <p className="mt-2 leading-7 text-cream/80">Discuss the route, camp availability, access and regions that best suit the safari experience you have in mind.</p>
          </div>
          <Button href="/plan-your-safari?type=Safari" variant="light">Build My Migration Safari<ArrowRight aria-hidden="true" size={17} /></Button>
        </div>
        {migrationPackages.length > 0 ? (
          <div className="mt-12">
            <LazyPackagesCarousel park="Serengeti" tag="Great Migration" title="Existing Great Migration Journeys" subtitle="Browse real journeys in the package data. Their seasonal routing and available camps are confirmed for your dates." />
          </div>
        ) : null}
      </DestinationSection>

      <DestinationSection id="practical" tone="sand">
        <SectionHeading eyebrow="BEFORE YOU TRAVEL" title="Everything You Should Know Before Travelling" subtitle="Practical details depend on your route and departure arrangements; confirm them before travel." />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.practicalInfo.map((item, index) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-sand bg-white p-5 sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-forest text-gold">
                  {index % 2 === 0 ? <Compass aria-hidden="true" size={18} /> : <MapPin aria-hidden="true" size={18} />}
                </span>
                <h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                {item.href && item.linkLabel ? <Link href={item.href} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{item.linkLabel}<ArrowRight aria-hidden="true" size={16} /></Link> : null}
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </DestinationSection>

      <DestinationSection id="faq" tone="cream">
        <SectionHeading eyebrow="PLAN WITH CONFIDENCE" title="Great Migration Safari Questions" subtitle="Clear answers about seasonal planning, regions and responsible wildlife viewing." />
        <FaqAccordion items={data.faqs} />
        <JsonLd data={faqJsonLd} />
      </DestinationSection>

    </SubRegionLayout>
  );
}

export function getGreatMigrationMetadata(data: GreatMigrationData): Metadata {
  return {
    ...buildMetadata({ ...data.meta, path, image: data.hero.image }),
    keywords: data.keywords,
  };
}
