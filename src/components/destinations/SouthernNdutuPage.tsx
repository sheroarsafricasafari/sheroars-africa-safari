import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ArrowRight, Compass } from "lucide-react";
import { getAllPackages } from "@/data";
import { siteConfig } from "@/data/site";
import type { SouthernNdutuData } from "@/types/destination";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { SubRegionLayout, DestinationSection } from "@/components/destinations/Layouts";
import SidebarFacts from "@/components/destinations/SidebarFacts";
import DaySchedule from "@/components/destinations/DaySchedule";
import { ExperienceCards, GettingThere, SeasonCards, SeasonGrid, SightingGuide, StayTiers, TipsGrid, WildlifeShowcase } from "@/components/destinations/Editorial";
import { ZoneExplorer } from "@/components/destinations/Interactive";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Prose from "@/components/inner/Prose";
import Callout from "@/components/inner/Callout";
import FaqAccordion from "@/components/inner/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const LazyPackagesCarousel = dynamic(() => import("@/components/destinations/PackagesCarouselServer"), {
  ssr: true,
  loading: () => <div className="min-h-72 rounded-3xl bg-sand" aria-hidden="true" />,
});

const path = "/safaris/serengeti/southern-ndutu";

export default function SouthernNdutuPage({ data }: { data: SouthernNdutuData }) {
  const hasVerifiedPackage = getAllPackages().some((item) =>
    item.parks.includes("Serengeti")
    && (item.tags.includes("Ndutu") || item.tags.includes("Southern Serengeti")),
  );
  const destinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Southern Serengeti and Ndutu",
    description: data.meta.description,
    url: new URL(path, siteConfig.url).toString(),
    image: new URL(data.hero.image, siteConfig.url).toString(),
    containedInPlace: [
      { "@type": "Place", name: "Ngorongoro Conservation Area" },
      { "@type": "TouristDestination", name: "Southern Serengeti ecosystem" },
    ],
  };
  const faqJsonLd = buildFaqJsonLd(data.faqs);

  return (
    <SubRegionLayout
      hero={data.hero}
      breadcrumbs={data.breadcrumbs}
      nav={data.nav}
      related={data.related}
      relatedTitle="Continue Exploring the Serengeti"
      cta={data.cta}
      ctaImage={data.ctaImage}
      ctaImageAlt={data.ctaImageAlt}
      ctaEyebrow={data.ctaEyebrow}
      whatsappMessage={data.whatsappMessage}
    >
      <JsonLd data={destinationJsonLd} />

      <DestinationSection id="overview" tone="cream">
        <SectionHeading eyebrow={data.overview.eyebrow} title={data.overview.title} align="left" />
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
          <Prose><p>{data.overview.lead}</p><p>{data.overview.body}</p></Prose>
          <div className="min-w-0">
            <dl className="grid gap-3 sm:grid-cols-2 lg:hidden">
              {data.sidebarFacts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-sand bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-terracotta">{fact.label}</dt>
                  <dd className="mt-1 text-sm leading-6 text-earth">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <SidebarFacts items={data.sidebarFacts} message={data.whatsappMessage} />
          </div>
        </div>
        <Callout variant="note" title="One ecosystem, different jurisdictions" className="mt-8">
          Ndutu lies within the Ngorongoro Conservation Area, alongside the southern Serengeti ecosystem. Applicable conservation-area and national-park fees depend on the exact route and itinerary.
        </Callout>
      </DestinationSection>

      <DestinationSection id="highlights" tone="sand">
        <SectionHeading eyebrow="THE SOUTHERN WILDERNESS" title="What Makes Southern Serengeti So Special?" subtitle="A changing seasonal landscape brings together open grazing country, lakes and woodland." />
        <TipsGrid items={data.highlights} />
      </DestinationSection>

      <DestinationSection id="landscape" tone="cream">
        <SectionHeading eyebrow="EXPLORE THE LANDSCAPE" title="Four Ways to Experience Ndutu" subtitle="Move between open plains, lakes and woodlands, each with a different seasonal character." />
        <ZoneExplorer zones={data.zones} label="Ndutu landscapes" />
      </DestinationSection>

      <DestinationSection id="calving" tone="forest">
        <SectionHeading eyebrow={data.calving.eyebrow} title={data.calving.title} tone="light" />
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#183c31] shadow-lift">
          <div className="absolute inset-0 -z-10">
            <SmartImage src={data.calving.image} alt={data.calving.imageAlt} sizes="100vw" fill className="object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/45" />
          </div>
          <div className="grid min-h-[30rem] items-end gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
            <div className="max-w-3xl">
              <p className="text-eyebrow text-gold">JANUARY TO MARCH, GENERALLY</p>
              <h3 className="mt-4 font-heading text-3xl text-cream sm:text-5xl">A season shaped by grazing, rain and new life</h3>
              <p className="mt-5 max-w-2xl leading-7 text-cream/85">{data.calving.introduction}</p>
            </div>
            <dl className="grid gap-3 rounded-2xl border border-white/15 bg-forest/85 p-5 text-cream backdrop-blur-md sm:grid-cols-2 lg:w-[21rem] lg:grid-cols-1">
              {data.calving.facts.map((fact) => <div key={fact.label}>
                <dt className="text-xs font-bold uppercase tracking-wider text-gold">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-6">{fact.value}</dd>
              </div>)}
            </dl>
          </div>
        </div>

        <div className="mt-8 grid min-w-0 gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#183c31] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-72 sm:min-h-[30rem]">
            <SmartImage src="/images/destinations/serengeti/southern-ndutu/newborn-calves.jpg" alt="Wildebeest mother and newborn calf on the southern plains" sizes="(max-width: 1024px) 100vw, 52vw" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-6 text-cream sm:p-10">
            <p className="text-eyebrow text-gold">A QUIET MOMENT IN A MOVING HERD</p>
            <h3 className="mt-3 font-heading text-3xl">The First Moments of Life</h3>
            <p className="mt-4 leading-7 text-cream/80">{data.calving.momentText}</p>
            <p className="mt-6 border-l border-gold pl-4 text-sm leading-6 text-cream/70">
              {data.calving.sourceNote}{" "}
              <a href="https://www.tanzaniaparks.go.tz/uploads/publications/en-1771310361-TANAPA%20Tourism%20Splash_Issue%20no%202%202026.pdf" className="font-semibold text-gold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" target="_blank" rel="noreferrer">
                View TANAPA Tourism Splash
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="A LIVING ECOSYSTEM" title={data.calving.predatorTitle} subtitle="Predators are part of the ecology of the migration. Their behaviour and presence follow natural conditions." tone="light" />
          <StaggerGroup className="grid gap-5 md:grid-cols-3">
            {data.calving.predators.map((animal) => (
              <StaggerItem key={animal.name}>
                <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="relative aspect-[4/3] bg-[#183c31]">
                    <SmartImage src={animal.image} alt={animal.name} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transform-none" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-gold">{animal.likelihood}</p>
                    <h3 className="mt-2 font-heading text-2xl text-cream">{animal.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-cream/75">{animal.description}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
        <Callout variant="note" title="Wildlife follows its own rhythm" className="mt-8">
          {data.calving.wildlifeStatement}
        </Callout>
      </DestinationSection>

      <DestinationSection id="wildlife" tone="sand">
        <SectionHeading eyebrow="MEET THE WILD RESIDENTS" title="A Remarkable Collection of Wildlife" subtitle="Seasonal herds share the southern landscape with resident wildlife and birds across a range of habitats." />
        <WildlifeShowcase items={data.wildlife.showcase} note={data.wildlife.note} />
        <div className="mt-10">
          <h3 className="mb-5 font-heading text-2xl text-earth">Where to Look and When</h3>
          <SightingGuide items={data.wildlife.sightings} />
        </div>
      </DestinationSection>

      <DestinationSection id="best-time" tone="cream">
        <SectionHeading eyebrow="PLAN AROUND THE SEASONS" title="When Is the Best Time to Visit Southern Serengeti?" subtitle="Use this broad calendar to compare migration, calving and landscape patterns. It is not a forecast." />
        <SeasonGrid data={data.seasons} />
        <SeasonCards items={data.seasons.cards} />
        <p className="mt-7 max-w-4xl leading-7 text-muted">{data.aprilNote}</p>
        <Callout variant="tip" title="Seasonal patterns, not promises" className="mt-7">{data.seasonNote}</Callout>
      </DestinationSection>

      <DestinationSection id="experiences" tone="sand">
        <SectionHeading eyebrow="MAKE SPACE FOR THE MOMENT" title="Experience Southern Serengeti Beyond the Ordinary" subtitle="Choose experiences according to the route, camp arrangements and conditions, with responsible wildlife viewing at the centre." />
        <ExperienceCards items={data.experiences} />
      </DestinationSection>

      <DestinationSection id="schedule" tone="cream">
        <SectionHeading eyebrow="A DAY IN NDUTU" title="A Day in the Southern Serengeti" subtitle="A flexible rhythm shaped by the safari arrangements, wildlife activity and accommodation." />
        <DaySchedule items={data.schedule} />
      </DestinationSection>

      <DestinationSection id="getting-there" tone="sand">
        <SectionHeading eyebrow="PLAN YOUR ROUTE" title="How to Reach the Southern Serengeti" subtitle="Road and air connections depend on your camp, dates and the wider Northern Circuit itinerary." />
        <GettingThere data={data.gettingThere} />
      </DestinationSection>

      <DestinationSection id="stay" tone="cream">
        <SectionHeading eyebrow="A PLACE TO REST" title="Find Your Perfect Place in the Wilderness" subtitle="Proximity to seasonal migration areas can influence where you stay; confirm locations and availability for your dates." />
        <div className="mb-8 grid min-w-0 overflow-hidden rounded-3xl border border-sand bg-white shadow-card lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-64 bg-sand sm:min-h-80">
            <SmartImage src="/images/destinations/serengeti/southern-ndutu/camp.jpg" alt="Safari camp in the Southern Serengeti landscape" sizes="(max-width: 1024px) 100vw, 58vw" fill className="object-cover" />
          </div>
          <div className="flex items-center p-6 sm:p-8">
            <p className="max-w-xl leading-7 text-muted">The right base depends on your travel dates, preferred comfort level and access to the landscapes you hope to explore. Camp locations and availability must be confirmed for each itinerary.</p>
          </div>
        </div>
        <StayTiers tiers={data.stay.tiers} footnote={data.stay.footnote} href={data.stay.href} linkLabel={data.stay.linkLabel} />
      </DestinationSection>

      <DestinationSection id="journeys" tone="sand">
        {hasVerifiedPackage ? (
          <LazyPackagesCarousel park="Serengeti" tag={data.journeys.packageTag} title={data.journeys.title} subtitle={data.journeys.subtitle} />
        ) : (
          <>
            <SectionHeading eyebrow="BUILD YOUR ROUTE" title={data.journeys.title} subtitle={data.journeys.subtitle} />
            <article className="grid min-w-0 gap-6 overflow-hidden rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-forest text-gold"><Compass aria-hidden="true" size={26} /></span>
            <div>
              <h3 className="font-heading text-2xl text-earth">{data.journeys.fallbackTitle}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{data.journeys.fallbackDescription}</p>
            </div>
            <Button href="/plan-your-safari?type=Safari" className="w-full sm:w-auto">{data.journeys.fallbackCta}<ArrowRight aria-hidden="true" size={17} /></Button>
            </article>
          </>
        )}
      </DestinationSection>

      <DestinationSection id="faq" tone="cream">
        <SectionHeading eyebrow="PLAN WITH CONFIDENCE" title="Southern Serengeti and Ndutu Safari Questions" subtitle="Clear answers about seasonal planning, the Ndutu area and responsible wildlife viewing." />
        <FaqAccordion items={data.faqs} />
        <JsonLd data={faqJsonLd} />
      </DestinationSection>
    </SubRegionLayout>
  );
}

export function getSouthernNdutuMetadata(data: SouthernNdutuData): Metadata {
  return {
    ...buildMetadata({ ...data.meta, path, image: data.hero.image }),
    keywords: [
      "Southern Serengeti safari", "Ndutu safari Tanzania", "Ndutu calving season",
      "Southern Serengeti Tanzania", "Wildebeest calving safari", "Great Migration Ndutu",
      "Best time to visit Ndutu", "Ndutu wildlife safari", "Serengeti calving season",
      "Ndutu migration safari", "Southern Serengeti wildlife", "Luxury Ndutu safari",
      "Private Southern Serengeti safari",
    ],
  };
}
