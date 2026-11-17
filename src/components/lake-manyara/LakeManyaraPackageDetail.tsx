import Link from "next/link";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import InclusionsExclusions from "@/components/inner/InclusionsExclusions";
import RelatedLinks from "@/components/inner/RelatedLinks";
import PackagePriceCalculator from "@/components/tarangire/packages/PackagePriceCalculator";
import TarangirePackageItinerary from "@/components/tarangire/packages/TarangirePackageItinerary";
import TarangirePackageMobileBar from "@/components/tarangire/packages/TarangirePackageMobileBar";
import { StayTiers } from "@/components/destinations/Editorial";
import Parallax from "@/components/motion/Parallax";
import SplitReveal from "@/components/motion/SplitReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import StatTiles from "@/components/inner/StatTiles";
import { lakeManyaraMonthSeasons, lakeManyaraPackages, type LakeManyaraPackage } from "@/data/lake-manyara-packages";
import { siteConfig } from "@/data/site";

const trustItems = [
  { title: "Women-led", description: "Women-led and welcoming to everyone." },
  { title: "Private 4x4", description: "A private vehicle with a window seat for every guest." },
  { title: "Clear pricing", description: "Published rates with no hidden fees." },
  { title: "Quick response", description: "We reply to trip enquiries within 24 hours." },
  { title: "Trip support", description: "24/7 support while you are travelling." },
];

export default function LakeManyaraPackageDetail({ item }: { item: LakeManyaraPackage }) {
  const related = item.related.flatMap((slug) => {
    const candidate = lakeManyaraPackages.find((packageItem) => packageItem.slug === slug);
    return candidate ? [{
      title: candidate.title,
      href: `/safaris/packages/${candidate.slug}`,
      description: candidate.tagline,
    }] : [];
  });

  const facts = [
    { value: `${item.days} ${item.days === 1 ? "day" : "days"}`, label: "Duration" },
    { value: String(item.nights), label: "Nights" },
    { value: "Lake Manyara", label: "National park" },
    { value: item.pace, label: "Pace" },
    { value: "Private 4x4", label: "Group style" },
    { value: "Arusha", label: "Start and end" },
  ];

  const stayTiers = item.nights === 0
    ? [{
        title: "Return to Arusha",
        description: item.accommodationSummary,
        bestFor: "Guests based in Arusha with one day available.",
        recommendedFor: "A full day of safari without an overnight stay.",
      }]
    : [
        {
          title: "Comfort",
          description: "A Comfort lodge or tented camp near or inside Lake Manyara, with full-board meals.",
          bestFor: "Travellers seeking a comfortable stay and considered value.",
          recommendedFor: "A restful base near the park.",
        },
        {
          title: "Luxury",
          description: "A Luxury lodge or tented camp near or inside Lake Manyara, with full-board meals.",
          bestFor: "Travellers seeking a more elevated stay.",
          recommendedFor: "Add the Luxury-tier night game drive.",
        },
      ];

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-forest text-white">
        <Parallax className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-[6%] inset-x-0">
            <SmartImage src={item.heroImage} alt={item.heroAlt} sizes="100vw" fill priority className="object-cover" />
          </div>
        </Parallax>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-earth/90 via-earth/60 to-forest/35" />
        <Container className="relative flex min-h-[68svh] flex-col justify-end py-16 sm:min-h-[75svh] sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-auto pt-3 text-sm text-white/80">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/safaris" className="underline underline-offset-4">Safaris</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/safaris/lake-manyara" className="underline underline-offset-4">Lake Manyara</Link></li>
            </ol>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Lake Manyara safari package</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"><SplitReveal text={item.title} /></h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">{item.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-earth">From ${item.pricing.priceFrom.toLocaleString("en-US")} per person</span>
            <span className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm text-white">Published 2026 to 2027 rates</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/book?package=${encodeURIComponent(item.slug)}`} variant="light" size="lg">Request this safari</Button>
            <Button href="#itinerary" variant="outline-light" size="lg">View full itinerary</Button>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 -mt-7">
        <StatTiles items={facts} className="rounded-3xl border border-sand bg-sand p-4 shadow-soft sm:p-5" />
      </Container>

      <section className="border-y border-gold/40 bg-white">
        <Container className="grid gap-3 py-5 text-sm font-semibold text-earth sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((trust) => <p key={trust.title}><span className="text-terracotta">{trust.title}: </span>{trust.description}</p>)}
        </Container>
      </section>

      <section id="overview" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="YOUR MANYARA JOURNEY" title="What This Safari Feels Like" subtitle={item.hook} align="left" />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl bg-sand p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-earth">Journey highlights</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {item.highlights.map((highlight, index) => <li key={highlight} className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-muted">
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-gold">{index + 1}</span>
                  {highlight}
                </li>)}
              </ul>
            </div>
            <aside className="rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-heading text-2xl text-earth">Best for</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.bestFor.map((audience) => <li key={audience} className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-earth">{audience}</li>)}
              </ul>
              <p className="mt-7 text-sm leading-6 text-muted">{item.accommodationSummary}</p>
              <Link href="/safaris/lake-manyara" className="mt-6 inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4">Explore the Lake Manyara guide</Link>
            </aside>
          </div>
        </Container>
      </section>

      <section id="itinerary" className="scroll-mt-24 bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="DAY BY DAY" title="Your Lake Manyara Itinerary" subtitle="Times are a guide and may be adjusted with your guide to suit park conditions, activities and travel dates." align="left" />
          <TarangirePackageItinerary item={item} idPrefix={item.slug} />
        </Container>
      </section>

      <section id="prices" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="PUBLISHED 2026 TO 2027 RATES" title="Check Your Lake Manyara Price" subtitle="Choose your travel month, accommodation style and group size to see the per-person price." align="left" />
          <PackagePriceCalculator item={item} finalRates seasonByMonth={lakeManyaraMonthSeasons} />
          <Callout variant="note" title="Season dates" className="mt-6">{item.seasonsNote}</Callout>
        </Container>
      </section>

      <section id="included" className="scroll-mt-24 bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="CLEAR FROM THE START" title="What's Included and Not Included" align="left" />
          <InclusionsExclusions
            included={item.inclusions}
            excluded={item.exclusions}
            footnote="All prices are in USD per person sharing. Solo prices include the single supplement."
          />
        </Container>
      </section>

      <section id="stay" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="WHERE YOU REST" title="Stay Near Lake Manyara" subtitle="Your package confirms the accommodation style, with the exact property matched to your dates and budget." align="left" />
          <StayTiers
            tiers={stayTiers}
            footnote="We confirm your exact property in your written quote and always choose it to suit your dates and budget."
            href="/safaris/lake-manyara#stay"
            linkLabel="Read about Manyara stay areas"
          />
        </Container>
      </section>

      <section id="details" className="scroll-mt-24 bg-sand py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="PRACTICAL DETAILS" title="Travel Well Prepared" align="left" />
            <p className="leading-7 text-muted">Your private safari includes a 4x4 with pop-up roof and a guaranteed window seat for every guest, an experienced English-speaking driver-guide, the park and activity fees named in the itinerary, bottled water, taxes and Arusha pick-up and drop-off.</p>
            <p className="mt-4 leading-7 text-muted">Share your travel dates, group size and preferred accommodation tier when you enquire. We confirm availability, exact property, seasonal rate and transfer details in your written quote.</p>
          </div>
          <div className="rounded-3xl bg-forest p-6 text-cream sm:p-8">
            <h2 className="font-heading text-2xl text-white">Route at a glance</h2>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {item.routeStops.map((stop, index) => <li key={`${stop}-${index}`} className="flex items-center gap-2 text-sm font-semibold">
                <span className="rounded-full bg-white/10 px-3 py-2">{stop}</span>
                {index < item.routeStops.length - 1 ? <span aria-hidden="true" className="text-gold">→</span> : null}
              </li>)}
            </ol>
            <p className="mt-6 text-sm leading-6 text-cream/75">{item.pricing.note}</p>
          </div>
        </Container>
      </section>

      <section id="faqs" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="GOOD TO KNOW" title="Questions About This Package" align="left" />
          <FaqAccordion items={item.faqs} />
        </Container>
      </section>

      {related.length ? (
        <div className="bg-sand">
          <RelatedLinks items={related} title="Related Lake Manyara Journeys" limit={3} />
        </div>
      ) : null}

      <CtaBanner
        eyebrow="LET'S PLAN YOUR MANYARA SAFARI"
        title="Ready to Make This Journey Yours?"
        description="Send us your dates and group size. We will confirm availability and the final amount in a written quote."
        image={{ src: "/images/lake-manyara/package-cta.jpg", alt: "Lake Manyara escarpment and forest in late-afternoon light" }}
        primaryCta={{ label: "Enquire About This Safari", href: `/plan-your-safari?package=${encodeURIComponent(item.slug)}` }}
        secondaryCta={{ label: "WhatsApp Us", href: siteConfig.whatsappUrlWithMessage(`Hello, I am interested in the ${item.name}.`) }}
        parallax
      />
      <TarangirePackageMobileBar item={item} targetId="prices" />
    </main>
  );
}
