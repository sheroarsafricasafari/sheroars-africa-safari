// DELETE BEFORE LAUNCH
import type { Metadata } from "next";
import ArticleCard from "@/components/inner/ArticleCard";
import Callout from "@/components/inner/Callout";
import ComparisonTable from "@/components/inner/ComparisonTable";
import DayTripCard from "@/components/inner/DayTripCard";
import DestinationCard from "@/components/inner/DestinationCard";
import GalleryStrip from "@/components/inner/GalleryStrip";
import InclusionsExclusions from "@/components/inner/InclusionsExclusions";
import InnerPageLayout, { ArticleLayout } from "@/components/inner/InnerPageLayout";
import ItineraryTimeline from "@/components/inner/ItineraryTimeline";
import LodgeCard from "@/components/inner/LodgeCard";
import PackageCard from "@/components/inner/PackageCard";
import Prose from "@/components/inner/Prose";
import QuickFacts from "@/components/inner/QuickFacts";
import RouteCard from "@/components/inner/RouteCard";
import StatTiles from "@/components/inner/StatTiles";
import StepsStrip from "@/components/inner/StepsStrip";
import InquiryForm from "@/components/forms/InquiryFormWithPrefill";
import InquirySubmissionProvider from "@/components/forms/InquirySubmissionProvider";
import { sampleData } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Component Preview",
  description: "Temporary design-system and component preview.",
  path: "/dev-preview",
  noIndex: true,
});

const photos = [
  { src: "/images/safaris/3-day-tarangire-manyara-ngorongoro.webp", alt: "Safari landscape in northern Tanzania" },
  { src: "/images/destinations/serengeti.jpeg", alt: "Wide Serengeti landscape" },
  { src: "/images/home/about-main.avif", alt: "Tanzania scenery" },
  { src: "/images/home/zanzibar.jpg", alt: "Zanzibar shoreline" },
];

export default function DevPreviewPage() {
  const packageOne = sampleData.packages[0];
  const destinationOne = sampleData.destinations[0];
  const routeOne = sampleData.routes[0];
  const dayTripOne = sampleData.dayTrips[0];
  const lodgeOne = sampleData.lodges[0];
  const articleOne = sampleData.guideArticles[0];

  return (
    <>
      <InnerPageLayout
        hero={{
          eyebrow: "Temporary component preview",
          title: "A foundation for every journey",
          subtitle: "Reusable page components, typed sample content and responsive patterns for the She Roars Africa Safari site.",
          image: { src: "/images/home/cta-banner.webp", alt: "Warm evening light across Tanzania" },
          breadcrumbs: [{ title: "Home", href: "/" }, { title: "Preview", href: "/dev-preview" }],
          badges: ["Tanzania-based", "Sample content"],
        }}
        intro={{
          eyebrow: "Phase one",
          title: "Built to grow with the site",
          paragraph: "This private preview brings together the shared inner-page components. All sample records are placeholders and must be replaced with confirmed content.",
        }}
        sidebar={
          <QuickFacts
            duration={`${packageOne.days} days`}
            difficulty={packageOne.difficulty}
            groupSize={packageOne.groupSize}
            location={packageOne.parks.join(", ")}
            priceFrom={packageOne.priceFrom}
            packageSlug={packageOne.slug}
          />
        }
        faqs={[
          { question: "Is this sample travel content?", answer: "Yes. The sample copy and itinerary are placeholders for component review only." },
          { question: "Are inquiries delivered?", answer: "No. Form submission is simulated until a booking or inquiry service is connected." },
        ]}
        related={[
          { title: "Safari packages", description: "Browse the current safari collection.", href: "/safaris/packages" },
          { title: "Kilimanjaro", description: "Explore route and climb content.", href: "/kilimanjaro" },
        ]}
        cta={{
          title: "Plan a journey",
          description: "This preview CTA uses the existing planning route.",
          primaryCta: { label: "Plan your safari", href: "/plan-your-safari" },
          secondaryCta: { label: "Contact us", href: "/contact" },
        }}
      >
        <div className="space-y-12">
          <section aria-labelledby="preview-facts">
            <h2 id="preview-facts" className="mb-5 font-heading text-h2">Stat tiles and planning steps</h2>
            <StatTiles items={[
              { value: "Sample", label: "All figures are placeholders" },
              { value: "Typed", label: "Structured content records" },
              { value: "Flexible", label: "Reusable responsive components" },
              { value: "Ready", label: "SEO building blocks included" },
            ]} />
            <StepsStrip className="mt-8" steps={[
              { number: "01", title: "Share your idea", description: "Start with the kind of journey you have in mind." },
              { number: "02", title: "Shape the route", description: "Review a sample route and practical details." },
              { number: "03", title: "Confirm the plan", description: "Replace these steps with verified booking information." },
              { number: "04", title: "Travel", description: "Sample copy only, not a confirmed service promise." },
            ]} />
          </section>

          <section aria-labelledby="preview-cards">
            <h2 id="preview-cards" className="mb-5 font-heading text-h2">Content cards</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <PackageCard
                {...packageOne}
                image={{ ...photos[0], alt: packageOne.title }}
              />
              <DestinationCard
                title={destinationOne.name}
                description={destinationOne.summary}
                href="/safaris"
                image={{ ...photos[1], alt: destinationOne.name }}
              />
              <RouteCard
                name={routeOne.name}
                href="/kilimanjaro/routes"
                image={{ src: "/images/destinations/kilimanjaro.jpg", alt: routeOne.name }}
                days={`${routeOne.days.min}-${routeOne.days.max}`}
                difficulty={routeOne.difficulty}
                scenery={`${routeOne.scenery}/5 scenery`}
                crowds={`${routeOne.crowds}/5 crowds`}
                summary={routeOne.summary}
              />
              <DayTripCard
                title={dayTripOne.title}
                summary={dayTripOne.summary}
                duration={dayTripOne.duration}
                priceFrom={dayTripOne.priceFrom}
                href={dayTripOne.href}
                image={{ src: "/images/destinations/lake-manyara.jpeg", alt: dayTripOne.title }}
              />
              <LodgeCard
                name={lodgeOne.name}
                location={lodgeOne.location}
                tier={lodgeOne.tier}
                note={lodgeOne.note}
                href={lodgeOne.href}
                image={{ src: "/images/home/about-secondary.jpg", alt: lodgeOne.name }}
              />
              <ArticleCard
                title={articleOne.title}
                category={articleOne.category}
                excerpt={articleOne.excerpt}
                href={`/blog/${articleOne.slug}`}
                image={{ src: "/images/home/about-main.avif", alt: articleOne.title }}
              />
            </div>
          </section>

          <section aria-labelledby="preview-details">
            <h2 id="preview-details" className="mb-5 font-heading text-h2">Journey details</h2>
            <Callout variant="note" title="Sample content">
              Replace all placeholder records with approved travel details before using these components on public pages.
            </Callout>
            <div className="mt-8">
              <ItineraryTimeline days={[
                { day: 1, title: "Sample arrival day", description: "Placeholder itinerary copy for layout review.", overnight: "Sample location", meals: ["D"], accommodation: "To be confirmed" },
                { day: 2, title: "Sample journey day", description: "No travel details here should be treated as confirmed.", overnight: "Sample location", meals: ["B", "L"], accommodation: "To be confirmed" },
              ]} />
            </div>
            <div className="mt-8">
              <InclusionsExclusions
                included={["Sample inclusion", "To be replaced with confirmed details"]}
                excluded={["Sample exclusion"]}
                footnote="Placeholder list for component review."
              />
            </div>
            <div className="mt-8">
              <ComparisonTable
                caption="Sample route comparison"
                columns={["Sample route one", "Sample route two"]}
                rows={[
                  { label: "Duration", values: ["To be confirmed", "To be confirmed"] },
                  { label: "Scenery rating", values: [4, 5] },
                  { label: "Sample feature", values: [true, false] },
                ]}
              />
            </div>
          </section>

          <section aria-labelledby="preview-gallery">
            <h2 id="preview-gallery" className="mb-5 font-heading text-h2">Gallery strip</h2>
            <GalleryStrip images={photos} />
          </section>

          <section aria-labelledby="preview-prose">
            <h2 id="preview-prose" className="mb-5 font-heading text-h2">Prose styles</h2>
            <Prose dropCap>
              <p>This sample paragraph demonstrates the shared editorial typography and spacing.</p>
              <h3>Sample subheading</h3>
              <p>Use approved, fact-checked content on published destination and travel guide pages.</p>
            </Prose>
          </section>
        </div>
      </InnerPageLayout>

      <ArticleLayout
        eyebrow="Article layout preview"
        title="A reusable editorial template"
        image={{ src: "/images/home/about-main.avif", alt: "Tanzania landscape for the sample article" }}
        plainText={articleOne.excerpt}
      >
        <p>{articleOne.excerpt}</p>
      </ArticleLayout>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-eyebrow text-terracotta">Sample interaction</p>
          <h2 className="mt-3 font-heading text-h2 text-earth">Inquiry form</h2>
          <p className="mb-8 mt-3 text-muted">Submission is simulated in this preview and is not sent to a service.</p>
          <InquirySubmissionProvider>
            <InquiryForm />
          </InquirySubmissionProvider>
        </div>
      </section>
    </>
  );
}
