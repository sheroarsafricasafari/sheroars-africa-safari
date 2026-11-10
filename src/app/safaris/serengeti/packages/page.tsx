import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/inner/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import SerengetiPackageExplorer from "@/components/safaris/serengeti/SerengetiPackageExplorer";
import PageHero from "@/components/inner/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAllSerengetiPackages } from "@/lib/serengeti-packages";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const packages = getAllSerengetiPackages();
const description = "Compare seven proposed Serengeti safari journeys by region, season, length, access, and accommodation preference. Prices are indicative and confirmed in your written quote.";
const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Serengeti", href: "/safaris/serengeti" },
  { title: "Serengeti Safari Packages", href: "/safaris/serengeti/packages" },
];

export const metadata: Metadata = buildMetadata({
  title: "Serengeti Safari Packages",
  description,
  path: "/safaris/serengeti/packages",
  image: "/images/destinations/serengeti/hero.webp",
});

export default function SerengetiPackagesPage() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Serengeti Safari Packages",
        itemListElement: packages.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `${siteConfig.url}/safaris/serengeti/packages/${item.slug}`,
        })),
      }} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <PageHero
        eyebrow="SERENGETI SAFARI COLLECTION"
        title="Find Your Serengeti Safari"
        subtitle="Seven proposed journeys through the Serengeti, shaped by the region, season, time available, and style of travel that suits you."
        image={{ src: "/images/destinations/serengeti/hero.webp", alt: "Open plains of the Serengeti" }}
        breadcrumbs={breadcrumbs}
        primaryCta={{ label: "Explore the packages", href: "#packages" }}
        secondaryCta={{ label: "Ask us to help you choose", href: "/plan-your-safari?type=Safari" }}
      />

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-eyebrow text-terracotta">A JOURNEY FOR YOUR SEASON</p>
              <h2 className="mt-3 max-w-3xl font-heading text-3xl leading-tight text-earth sm:text-4xl">Start with where, when, and how you want to travel.</h2>
            </div>
            <p className="leading-7 text-muted">The journeys differ in regions visited, seasonal windows, length, access arrangements, and proposed accommodation tiers. Use the filters to narrow the collection, then compare up to three options or enquire for a written quote.</p>
          </div>
          <p className="mt-6 rounded-xl border border-gold/50 bg-gold/15 p-4 text-sm font-semibold text-earth">Prices are indicative and confirmed in your written quote.</p>
        </Container>
      </section>

      <section id="packages" aria-label="Explore Serengeti safari packages" className="scroll-mt-32 bg-cream pb-10">
        <Container className="mb-6">
          <SectionHeading eyebrow="THE SERENGETI COLLECTION" title="Explore seven proposed journeys" align="left" />
        </Container>
        <SerengetiPackageExplorer items={packages} />
      </section>

      <section className="bg-sand py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="CHOOSE YOUR REGION" title="Four ways to experience the Serengeti" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Central Serengeti", text: "The brief lists Central Serengeti packages year-round, including fly-in and focused big cat journeys.", href: "/safaris/serengeti/central-seronera" },
              { title: "Southern Serengeti and Ndutu", text: "Ndutu features in the proposed December-to-March calving-season journeys.", href: "/safaris/serengeti/southern-ndutu" },
              { title: "Western Corridor and Grumeti", text: "The proposed Western Corridor journey is listed for May to July.", href: "/safaris/serengeti/western-corridor" },
              { title: "Northern Serengeti", text: "The Mara River region features in the proposed July-to-October journey.", href: "/safaris/serengeti/northern-serengeti" },
            ].map((region) => (
              <article key={region.title} className="rounded-2xl border border-sand bg-white p-5">
                <h3 className="font-heading text-xl text-earth">{region.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{region.text}</p>
                <Link href={region.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Explore region</Link>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-eyebrow text-terracotta">TRAVEL WITH THE SEASONS</p>
              <h2 className="mt-2 font-heading text-3xl text-earth">Migration timing is guidance, not a promise.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-muted">Rainfall and other natural conditions influence wildlife movement. River crossings, calving events, and particular sightings cannot be guaranteed.</p>
            </div>
            <Link href="/safaris/serengeti/great-migration" className="inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Read the Great Migration guide</Link>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="A THOUGHTFUL NEXT STEP"
        title="Need help choosing a Serengeti journey?"
        description="Share your travel month, preferred regions, group size, and accommodation interests. The team can discuss the options and prepare a written quotation."
        image={{ src: "/images/destinations/serengeti/cta.jpg", alt: "Serengeti landscape in warm evening light" }}
        primaryCta={{ label: "Plan My Serengeti Safari", href: "/plan-your-safari?type=Safari" }}
        secondaryCta={{ label: "Chat on WhatsApp", href: siteConfig.whatsappUrlWithMessage("Hello, I would like help choosing a Serengeti safari package.") }}
        parallax
      />
    </main>
  );
}
