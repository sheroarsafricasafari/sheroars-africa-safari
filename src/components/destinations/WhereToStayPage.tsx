import { ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import Callout from "@/components/inner/Callout";
import ComparisonTable from "@/components/inner/ComparisonTable";
import FaqAccordion from "@/components/inner/FaqAccordion";
import { DestinationSection } from "@/components/destinations/Layouts";
import SerengetiGuideLayout from "@/components/destinations/SerengetiGuideLayout";
import { AccommodationRegionExplorer, AccommodationSeasonCalendar, SerengetiStayPlanner } from "@/components/destinations/accommodation/AccommodationExplorers";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { accommodationBookingSteps, accommodationComparison, accommodationFaqs, accommodationStyles, comfortLevels, stayConsiderations, whereToStayHero } from "@/data/destinations/serengeti-where-to-stay";
import { siteConfig } from "@/data/site";

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Serengeti", href: "/safaris/serengeti" },
  { title: "Where to Stay", href: "/safaris/serengeti/where-to-stay" },
];

const nav = [
  { id: "overview", label: "Overview" },
  { id: "regions", label: "Regions" },
  { id: "accommodation-styles", label: "Stay Styles" },
  { id: "compare", label: "Compare" },
  { id: "comfort", label: "Comfort" },
  { id: "location-season", label: "Season" },
  { id: "choose", label: "How to Choose" },
  { id: "stay-planner", label: "Stay Planner" },
  { id: "booking", label: "Booking Process" },
  { id: "important", label: "Before Booking" },
  { id: "faq", label: "FAQ" },
];

const related = [
  { title: "Central Serengeti", href: "/safaris/serengeti/central-seronera", description: "Explore the Seronera region and its year-round safari character." },
  { title: "Northern Serengeti", href: "/safaris/serengeti/northern-serengeti", description: "Learn about the north, its river country and seasonal movement." },
  { title: "Western Corridor", href: "/safaris/serengeti/western-corridor", description: "Discover the Grumeti region and western Serengeti landscapes." },
  { title: "Southern Serengeti and Ndutu", href: "/safaris/serengeti/southern-ndutu", description: "Explore the southern plains and seasonal calving period." },
  { title: "Great Migration", href: "/safaris/serengeti/great-migration", description: "Follow broad seasonal patterns across the ecosystem." },
  { title: "Safari Packages", href: "/safaris/packages", description: "Browse safari journeys and request a route tailored to you." },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Where to Stay in Serengeti National Park | Safari Camps and Lodges",
  description: "Discover where to stay in Serengeti National Park. Compare safari lodges, luxury tented camps, mobile camps and campsites. Explore the best regions and choose the right accommodation for your Tanzania safari.",
  url: new URL("/safaris/serengeti/where-to-stay", siteConfig.url).toString(),
};

const officialAccommodationUrl = "https://www.tanzaniaparks.go.tz/tourism/visitor-information/accommodation";

export default function WhereToStayPage() {
  return (
    <SerengetiGuideLayout
      hero={whereToStayHero}
      breadcrumbs={breadcrumbs}
      nav={nav}
      relatedTitle="Continue Planning Your Serengeti Journey"
      related={related}
      cta={{
        eyebrow: "LET'S FIND YOUR PLACE IN THE WILD",
        title: "Your Perfect Serengeti Stay Starts Here",
        description: "Whether you dream of an intimate tented camp, a comfortable safari lodge or a beautiful luxury retreat, we can help you compare styles and locations for your Serengeti journey.",
        primary: "Find My Perfect Stay",
      }}
      ctaImage="/images/destinations/serengeti/where-to-stay/cta.jpg"
      ctaImageAlt="Evening light over the Serengeti landscape"
      whatsappMessage="Hello She Roars Africa Safari. I would like help choosing Serengeti accommodation for my safari dates."
    >
      <JsonLd data={webPageJsonLd} />

      <DestinationSection id="overview">
        <SectionHeading eyebrow="THE ART OF STAYING IN THE WILD" title="Your Safari Begins With Where You Stay" subtitle="In the Serengeti, your base shapes how you experience the landscape." align="left" />
        <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-earth sm:text-lg">
            <p>The Serengeti is an enormous and diverse safari ecosystem, with accommodation distributed across different regions and protected areas. Each region has its own atmosphere, access considerations and seasonal wildlife experience.</p>
            <p>Lodges, permanent tented camps, mobile camps and official campsites offer different ways to stay. Begin by choosing the region that best fits your dates and interests, then decide which accommodation style suits you, and only then compare comfort, facilities and specific properties.</p>
            <p className="border-l-2 border-gold pl-5 font-heading text-xl leading-8 text-earth sm:text-2xl">The most beautiful place to stay is not always the best place for your safari dates. Location, season and the wildlife experience you hope for should guide your choice.</p>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-sand shadow-card sm:min-h-[30rem]">
            <SmartImage src="/images/destinations/serengeti/where-to-stay/overview.jpg" alt="A safari camp looking out across the Serengeti" sizes="(max-width: 1024px) 100vw, 46vw" fill className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-earth/80 to-transparent p-6 pt-16 text-sm font-medium text-white">Choose the landscape first. Then find the stay that belongs in your journey.</div>
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="regions" tone="sand">
        <SectionHeading eyebrow="FIRST, FIND YOUR REGION" title="Where Would You Love to Wake Up?" subtitle="The Serengeti is a collection of extraordinary landscapes. Explore the broad regional differences before comparing accommodation." />
        <AccommodationRegionExplorer />
        <Callout variant="note" title="About Ndutu" className="mt-6">Ndutu is within the Ngorongoro Conservation Area, adjoining the southern Serengeti ecosystem. Accommodation in the Ndutu area is not necessarily inside Serengeti National Park. Check the precise protected-area location and applicable fees for each itinerary.</Callout>
      </DestinationSection>

      <DestinationSection id="accommodation-styles">
        <SectionHeading eyebrow="CHOOSE YOUR STYLE" title="Find the Stay That Feels Right for You" subtitle="Compare accommodation categories rather than choosing from an unverified directory of properties." align="left" />
        <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accommodationStyles.map((style) => (
            <StaggerItem key={style.title}>
              <article className="group h-full overflow-hidden rounded-3xl border border-sand bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <SmartImage src={style.image} alt={style.alt} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-earth/65 px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-white backdrop-blur">{style.category}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-2xl text-earth">{style.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{style.description}</p>
                  <p className="mt-4 border-t border-sand pt-4 text-sm leading-6 text-earth"><strong>Best suited to:</strong> {style.bestFor}</p>
                  {"link" in style ? <a href={style.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Official TANAPA directory <ExternalLink aria-hidden="true" size={15} /></a> : null}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </DestinationSection>

      <DestinationSection id="compare" tone="sand">
        <SectionHeading eyebrow="A PRACTICAL COMPARISON" title="Which Safari Stay Is Right for You?" subtitle="Typical characteristics can help you narrow your options. Actual facilities and conditions depend on the site or property." align="left" />
        <ComparisonTable caption="Comparison of Serengeti accommodation categories" columns={["Accommodation style", "Typical setting", "Comfort approach", "Location flexibility", "Facilities", "Best suited to"]} rows={accommodationComparison.map(({ label, values }) => ({ label, values: [...values] }))} />
        <p className="mt-3 text-xs leading-5 text-muted">On smaller screens, scroll horizontally to compare all categories. Descriptions are general and are not guarantees about individual properties.</p>
      </DestinationSection>

      <DestinationSection id="comfort">
        <SectionHeading eyebrow="TRAVEL YOUR WAY" title="From Simple Comfort to Exceptional Luxury" subtitle="These are broad accommodation styles, not formal ratings of individual properties." />
        <div className="grid gap-5 md:grid-cols-3">
          {comfortLevels.map((level, index) => (
            <article key={level.title} className={`relative overflow-hidden rounded-3xl p-6 shadow-card sm:p-8 ${index === 2 ? "bg-forest text-cream" : "border border-sand bg-white text-earth"}`}>
              <span aria-hidden="true" className={`absolute right-5 top-2 font-heading text-7xl ${index === 2 ? "text-white/10" : "text-terracotta/10"}`}>0{index + 1}</span>
              <p className={`text-eyebrow ${index === 2 ? "text-gold" : "text-terracotta"}`}>COMFORT STYLE</p>
              <h3 className="relative mt-3 font-heading text-3xl">{level.title}</h3>
              <p className={`mt-4 text-sm leading-7 ${index === 2 ? "text-cream/80" : "text-muted"}`}>{level.text}</p>
              <p className={`mt-5 border-t pt-4 text-sm leading-6 ${index === 2 ? "border-white/20 text-cream" : "border-sand text-earth"}`}><strong>May suit:</strong> {level.bestFor}</p>
            </article>
          ))}
        </div>
      </DestinationSection>

      <DestinationSection id="location-season" tone="sand">
        <SectionHeading eyebrow="LOCATION CHANGES EVERYTHING" title="Choose Your Camp Around the Season" subtitle="Use this month-by-month selector as a broad accommodation-planning aid, not a prediction of where wildlife will be." />
        <AccommodationSeasonCalendar />
      </DestinationSection>

      <DestinationSection id="choose">
        <SectionHeading eyebrow="BEFORE YOU CHOOSE" title="Seven Things to Consider Before Choosing Your Camp" subtitle="The right stay balances location, logistics, comfort and the needs of everyone travelling." align="left" />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stayConsiderations.map(([title, text], index) => (
            <StaggerItem key={title}>
              <article className="h-full rounded-2xl border border-sand bg-white p-5 shadow-sm sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-terracotta/10 font-heading text-lg text-terracotta">{index + 1}</span>
                <h3 className="mt-4 font-heading text-xl text-earth">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </DestinationSection>

      <DestinationSection id="stay-planner" tone="sand">
        <SectionHeading eyebrow="A SIMPLE PLACE TO START" title="Find a Stay Style to Discuss" subtitle="Answer four questions for a broad regional starting point. This educational planner does not check properties, rooms, prices or availability." />
        <SerengetiStayPlanner />
      </DestinationSection>

      <DestinationSection id="booking">
        <SectionHeading eyebrow="FROM IDEAS TO AN ITINERARY" title="How We Help You Find the Right Place to Stay" subtitle="A considered proposal starts with your dates and the experience you want." align="left" />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {accommodationBookingSteps.map(([title, text], index) => (
            <li key={title} className="relative rounded-2xl border border-sand bg-white p-5 shadow-sm sm:p-6">
              <span className="font-heading text-4xl text-gold">0{index + 1}</span>
              <h3 className="mt-3 font-heading text-xl text-earth">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              {index < accommodationBookingSteps.length - 1 ? <ArrowRight aria-hidden="true" className="absolute right-4 top-6 hidden text-terracotta xl:block" size={18} /> : null}
            </li>
          ))}
        </ol>
      </DestinationSection>

      <DestinationSection id="important" tone="forest">
        <SectionHeading eyebrow="DETAILS WORTH CONFIRMING" title="Before You Confirm a Booking" subtitle="A clear written itinerary helps you understand where you are staying and what the arrangements include." tone="light" align="left" />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <ShieldCheck aria-hidden="true" className="size-8 text-gold" />
            <h3 className="mt-4 font-heading text-2xl text-cream">Confirm the practical details</h3>
            <p className="mt-3 text-sm leading-6 text-cream/75">Before confirming, review the property&apos;s exact location, route, fees, dates and terms in your proposal.</p>
            <a href={officialAccommodationUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 font-semibold text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Visit the official TANAPA accommodation directory <ExternalLink aria-hidden="true" size={15} /></a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {["Exact location and protected-area status", "Applicable park or conservation-area fees", "Opening dates for the property", "Meal plan and included services", "Cancellation and amendment conditions", "Transfers and light-aircraft luggage limits", "Children's policies and room arrangements", "Accessibility and personal requirements"].map((item) => (
              <li key={item} className="flex min-h-14 items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm leading-6 text-cream"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>
            ))}
          </ul>
        </div>
      </DestinationSection>

      <DestinationSection id="faq" tone="sand">
        <SectionHeading eyebrow="GOOD QUESTIONS TO ASK" title="Serengeti Accommodation FAQs" subtitle="Straightforward guidance for comparing accommodation and planning a route." />
        <FaqAccordion items={[...accommodationFaqs]} jsonLd />
        <p className="mt-6 text-center text-sm text-muted">For current official park accommodation information, visit the <a href={officialAccommodationUrl} target="_blank" rel="noreferrer" className="font-semibold text-terracotta underline underline-offset-4">TANAPA accommodation directory</a>.</p>
      </DestinationSection>
    </SerengetiGuideLayout>
  );
}
