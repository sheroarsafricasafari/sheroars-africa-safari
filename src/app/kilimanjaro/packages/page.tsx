import Breadcrumbs from "@/components/inner/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import KilimanjaroPackageBrowser from "@/components/kilimanjaro/route/KilimanjaroPackageBrowser";
import { PACKAGES } from "@/data/kilimanjaro-packages";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Kilimanjaro", href: "/kilimanjaro" },
  { title: "Climb Packages", href: "/kilimanjaro/packages" },
];

export const metadata = buildMetadata({
  title: "Kilimanjaro Climb Packages: Compare All Routes and Prices",
  description: "Compare 18 Kilimanjaro climb packages across six routes, from 6 to 10 days. Filter by route, duration and comfort, then explore itineraries and prices.",
  path: "/kilimanjaro/packages",
  image: "/images/kilimanjaro/hero-sky.jpg",
});

export default function KilimanjaroPackagesPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Kilimanjaro climb packages",
        itemListElement: PACKAGES.map((pkg, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: pkg.name,
          url: `${siteConfig.url}/kilimanjaro/routes/${pkg.route}?days=${pkg.days}`,
        })),
      }} />
      <section className="bg-forest py-16 text-white md:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbs} tone="light" />
          <p className="mt-8 text-eyebrow text-gold">PLAN YOUR CLIMB</p>
          <h1 className="mt-3 max-w-4xl font-heading text-display">Kilimanjaro Climb Packages</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">Compare 18 packages across all six routes. Choose the itinerary length and comfort level that suit your climb, then open a route page to see every day and its price.</p>
        </Container>
      </section>
      <section className="bg-cream py-16 md:py-20">
        <Container className="mb-8">
          <SectionHeading eyebrow="FIND YOUR CLIMB" title="Filter by Route, Days and Comfort" />
        </Container>
        <KilimanjaroPackageBrowser />
      </section>
    </main>
  );
}
