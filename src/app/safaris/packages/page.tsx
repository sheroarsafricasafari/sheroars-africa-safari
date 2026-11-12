import Link from "next/link";
import { Clock3, MapPin, Waves, ArrowRight, MessageCircle } from "lucide-react";
import PackagesExplorer from "@/components/safaris/PackagesExplorer";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import ComparisonTable from "@/components/inner/ComparisonTable";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import InclusionsExclusions from "@/components/inner/InclusionsExclusions";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import SplitReveal from "@/components/motion/SplitReveal";
import HeroSignal from "@/components/layout/HeroSignal";
import { safaris } from "@/data/safaris";
import { ngorongoroPackages } from "@/data/ngorongoro-packages";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const description = "Browse tailor-made Tanzania safari packages, including ten Ngorongoro journeys. Filter by length, destination and travel style.";
const packageCatalog = Array.from(
  new Map([...safaris, ...ngorongoroPackages].map((item) => [item.slug, item])).values(),
);
const sharedInclusions = [
  "Airport pick-up and drop-off", // TODO(CONFIRM): confirm service on all packages.
  "Accommodation as listed", // TODO(CONFIRM): confirm accommodation arrangements.
  "Park and conservation fees", // TODO(CONFIRM): confirm which fees are included.
  "A 4x4 safari vehicle and professional driver-guide", // TODO(CONFIRM): confirm service and vehicle details.
  "Meals as specified in the itinerary", // TODO(CONFIRM): confirm meal plans.
  "Bottled drinking water on game drives", // TODO(CONFIRM): confirm provision.
  "24/7 support from our team", // TODO(CONFIRM): confirm support commitment.
];
const sharedExclusions = [
  "International flights",
  "Tanzania visa fees",
  "Travel insurance",
  "Gratuities for guides and staff",
  "Alcoholic drinks and personal items",
  "Optional activities such as hot-air ballooning",
  "Any items not listed under inclusions",
];
const faqItems = [
  { question: "Are safari prices fixed?", answer: "Prices depend on dates, accommodation level and group size. We send a clear, transparent quote." },
  { question: "Can I change a package?", answer: "Yes. Every package is a starting point." },
  { question: "Private or group?", answer: "A private safari gives you flexibility and your own vehicle. Group departures are friendlier on budget and a lovely way to meet like-minded travelers." },
  { question: "How far ahead should I book?", answer: "As early as you can for peak months." }, // TODO(CONFIRM): confirm booking lead-time guidance.
];

export const metadata = buildMetadata({
  title: "Tanzania Safari Packages",
  description,
  path: "/safaris/packages",
  image: "/images/safaris/hub/packages-hero.jpg",
});

export default function SafariPackagesPage() {
  const breadcrumbs = [{ title: "Home", href: "/" }, { title: "Safaris", href: "/safaris" }, { title: "Packages", href: "/safaris/packages" }];
  const packageDays = (item: (typeof packageCatalog)[number]) => "durationDays" in item ? item.durationDays : item.days;
  const packageParks = (item: (typeof packageCatalog)[number]) => "destinations" in item ? item.destinations : item.parks;
  const packagePace = (item: (typeof packageCatalog)[number]) => "durationDays" in item ? item.pace.label : item.pace;
  const comparisonRows = [
    { label: "Days", values: packageCatalog.map((item) => `${packageDays(item)} days`) },
    { label: "Parks", values: packageCatalog.map((item) => packageParks(item).join(", ")) },
    { label: "Pace", values: packageCatalog.map(packagePace) },
    { label: "Best for", values: packageCatalog.map((item) => item.bestFor.join(", ")) },
    { label: "Great Migration potential", values: packageCatalog.map((item) => "durationDays" in item ? item.collections.includes("With the Serengeti") : item.tags.includes("Great Migration") ? "Seasonal" : item.parks.includes("Serengeti") ? true : false) }, // TODO(CONFIRM): confirm migration potential by package and season.
  ];

  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Tanzania Safari Packages",
        itemListElement: packageCatalog.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `${siteConfig.url}/safaris/packages/${item.slug}`,
        })),
      }} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <section className="relative isolate flex min-h-[52svh] items-end overflow-hidden bg-forest text-white">
        <HeroSignal />
        <SmartImage src="/images/safaris/hub/packages-hero.jpg" alt="Safari vehicle on the open plains of Tanzania" sizes="100vw" fill priority className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/85 via-earth/25 to-earth/35" />
        <Container className="relative w-full pb-14 pt-32 md:pb-20">
          <Breadcrumbs items={breadcrumbs} tone="light" />
          <p className="mt-7 text-eyebrow text-gold">SAFARI PACKAGES</p>
          <h1 className="mt-3 max-w-4xl font-heading text-5xl leading-tight text-white sm:text-6xl"><SplitReveal text="Find Your Perfect Safari" /></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/90">Every package is a starting point. We tailor dates, pace, accommodation and activities to you.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["Private and group options", "Tailor-made"].map((item) => <span key={item} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">{item}</span>)}</div>
        </Container>
      </section>

      <section className="bg-cream py-10 md:py-14">
        <Container>
          <h2 className="sr-only">How to choose a safari</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { Icon: Clock3, text: "Short on time? Start with 3 to 5 days." },
              { Icon: MapPin, text: "Want the Serengeti at a relaxed pace? Choose 5 to 7 days." },
              { Icon: Waves, text: "Dreaming of safari and beach? See our Zanzibar combination." },
            ].map(({ Icon, text }) => <div key={text} className="flex items-center gap-4 rounded-2xl border border-sand bg-white p-5"><Icon aria-hidden="true" className="size-6 shrink-0 text-terracotta" /><p className="font-semibold leading-6 text-earth">{text}</p></div>)}
          </div>
        </Container>
      </section>

      <section id="safari-results" className="bg-cream pb-16 md:pb-24">
        <Container className="mb-8"><SectionHeading eyebrow="YOUR NEXT JOURNEY" title="Explore the Safari Collection" align="left" /></Container>
        <PackagesExplorer packages={packageCatalog} />
      </section>

      <section className="bg-sand py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="AT A GLANCE" title="Compare Our Safaris at a Glance" />
          <ComparisonTable columns={packageCatalog.map((item) => item.title)} rows={comparisonRows} caption="Compare safari duration, destinations, pace, travel style and seasonal migration potential." />
          <p className="mt-4 text-xs leading-5 text-muted">Migration movement is seasonal and cannot be guaranteed. Ask us to discuss your dates. <span className="sr-only">TODO(CONFIRM): confirm comparison guidance.</span></p>
        </Container>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest p-7 text-cream shadow-soft sm:p-10 md:p-14">
            <div aria-hidden="true" className="absolute -right-12 -top-20 size-64 rounded-full border border-gold/20" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div><p className="text-eyebrow text-gold">MADE FOR YOU</p><h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl">Not Seeing Your Perfect Safari?</h2><p className="mt-4 max-w-2xl leading-7 text-cream/80">Every journey can be tailored. Tell us your dates, interests and budget and we will design it for you.</p></div>
              <div className="flex flex-wrap gap-3"><Button href="/plan-your-safari" variant="light" size="lg">Plan a Custom Safari</Button><Button href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} variant="outline-light" size="lg"><MessageCircle aria-hidden="true" size={18} />Chat on WhatsApp</Button></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="THE DETAILS" title="What's Usually Included" />
          <InclusionsExclusions included={sharedInclusions} excluded={sharedExclusions} footnote="Inclusions vary by package and are confirmed in your written proposal." />
          <p className="mt-5 text-center"><Link href="#safari-results" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">See each package for details<ArrowRight aria-hidden="true" size={16} /></Link><span className="sr-only"> TODO(CONFIRM): verify shared inclusions and exclusions.</span></p>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="text-eyebrow text-terracotta">GOOD TO KNOW</p><h2 className="mt-3 font-heading text-4xl text-earth">Questions Before You Go?</h2><p className="mt-4 leading-7 text-muted">We can help you find the right route, season and pace.</p></div>
          <FaqAccordion items={faqItems} jsonLd />
        </Container>
      </section>

      <CtaBanner
        title="Let's Find Your Perfect Safari"
        description="Share a little about your trip and our team will help shape the next steps."
        image={{ src: "/images/safaris/hub/cta.jpg", alt: "The sun setting over Tanzania's savanna" }}
        primaryCta={{ label: "Plan My Safari", href: "/plan-your-safari" }}
        secondaryCta={{ label: "Chat on WhatsApp", href: siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage) }}
        parallax
      />
    </main>
  );
}
