import Link from "next/link";
import {
  FactStrip,
  GettingThere,
  SeasonCards,
  SeasonGrid,
  SightingGuide,
  StayTiers,
  TipsGrid,
  WildlifeShowcase,
} from "@/components/destinations/Editorial";
import { HowManyDays } from "@/components/destinations/Interactive";
import DestinationHero from "@/components/destinations/DestinationHero";
import { DestinationSection } from "@/components/destinations/Layouts";
import RelatedLinks from "@/components/inner/RelatedLinks";
import Callout from "@/components/inner/Callout";
import ComparisonTable from "@/components/inner/ComparisonTable";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import Marquee from "@/components/motion/Marquee";
import TrustBar from "@/components/home/TrustBar";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import { StickySectionNav } from "@/components/destinations/Interactive";
import SidebarFacts from "@/components/destinations/SidebarFacts";
import {
  LakeManyaraActivityChooser,
  LakeManyaraLandscapeExplorer,
  LakeManyaraPackageCarousel,
} from "@/components/lake-manyara/LakeManyaraInteractions";
import { lakeManyaraPackages } from "@/data/lake-manyara-packages";
import {
  lakeManyaraActivities,
  lakeManyaraAddOnLinks,
  lakeManyaraBirds,
  lakeManyaraBreadcrumbs,
  lakeManyaraComparison,
  lakeManyaraDays,
  lakeManyaraFacts,
  lakeManyaraFaqs,
  lakeManyaraGettingThere,
  lakeManyaraHero,
  lakeManyaraLionTips,
  lakeManyaraMonths,
  lakeManyaraNav,
  lakeManyaraSeasons,
  lakeManyaraSidebarFacts,
  lakeManyaraStayTiers,
  lakeManyaraStyles,
  lakeManyaraTips,
  lakeManyaraWildlife,
  lakeManyaraZones,
} from "@/data/lake-manyara";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";

const trustItems = [
  { title: "Women-led", description: "A women-led safari company in Tanzania, welcoming to everyone." },
  { title: "Private vehicle", description: "Private 4x4, pop-up roof and a window seat for every guest." },
  { title: "Clear prices", description: "Published package prices with no hidden fees." },
  { title: "Personal support", description: "We reply to trip enquiries within 24 hours." },
  { title: "Trip support", description: "24/7 support while you are travelling." },
];

const packagesComparisonRows = [
  { label: "Duration", values: lakeManyaraPackages.map((item) => item.duration) },
  { label: "Nights", values: lakeManyaraPackages.map((item) => String(item.nights)) },
  { label: "Activities", values: lakeManyaraPackages.map((item) => item.highlights.slice(0, 3).join(", ")) },
  { label: "Accommodation", values: lakeManyaraPackages.map((item) => item.accommodationSummary) },
  { label: "Pace", values: lakeManyaraPackages.map((item) => item.pace) },
  { label: "Best for", values: lakeManyaraPackages.map((item) => item.bestFor.slice(0, 3).join(", ")) },
  { label: "From price", values: lakeManyaraPackages.map((item) => `From $${item.pricing.priceFrom.toLocaleString("en-US")} per person`) },
];

const touristDestinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Lake Manyara National Park",
  description: "Plan a Lake Manyara National Park safari from Arusha, with day trips and overnight journeys through forest, lake and escarpment.",
  url: new URL("/safaris/lake-manyara", siteConfig.url).toString(),
  image: new URL(lakeManyaraHero.image, siteConfig.url).toString(),
  containedInPlace: { "@type": "Country", name: "Tanzania" },
};

const faqJsonLd = buildFaqJsonLd(lakeManyaraFaqs);
const breadcrumbJsonLd = buildBreadcrumbJsonLd(lakeManyaraBreadcrumbs);

export default function LakeManyaraPage() {
  return (
    <main>
      <JsonLd data={touristDestinationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <DestinationHero data={lakeManyaraHero} breadcrumbs={lakeManyaraBreadcrumbs} />
      <StickySectionNav items={lakeManyaraNav} cta={{ label: "Plan My Safari", href: "/plan-your-safari?type=Safari" }} />

      <DestinationSection id="facts" tone="cream">
        <FactStrip
          items={lakeManyaraFacts}
          footnote="Wildlife sightings, lake levels and travel conditions vary with the season."
          showVerificationMark={false}
        />
      </DestinationSection>
      <TrustBar items={trustItems} />

      <DestinationSection id="overview" tone="sand">
        <SectionHeading eyebrow="WHY MANYARA" title="A Small Park With a Huge Personality." subtitle="A compact introduction to the Northern Circuit, with the Rift Valley escarpment always in view." align="left" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start">
          <div className="space-y-5">
            <p className="text-lead leading-8 text-earth">Lake Manyara is Tanzania&apos;s compact masterpiece. Tucked beneath the towering wall of the Great Rift Valley escarpment, this park packs a lifetime of scenery into about 325 square kilometres. Roughly two-thirds of it is a shallow, alkaline soda lake whose shoreline shifts with the rains, while the remaining land moves from cool, dripping groundwater forest to acacia woodland, open floodplain and steaming hot springs.</p>
            <p className="leading-8 text-muted">Because the habitats change every few kilometres, a single game drive feels like crossing three different countries. You can watch elephants lift their trunks beneath mahogany and fig trees in the morning, find hippos wallowing at the Hippo Pool by lunchtime, and scan the lakeshore for pink flamingos and pelicans before the afternoon light turns the escarpment gold.</p>
            <p className="leading-8 text-muted">Manyara is also one of the more uncrowded parks on the northern circuit, especially early in the morning and in the quieter south. It is the perfect first stop, a relaxed day trip from Arusha, or a beautiful overnight stay before Ngorongoro Crater or the Serengeti.</p>
            <Callout variant="tip" title="Why guests love Manyara">Fewer vehicles, forest shade, elephants up close and a gentle introduction to safari.</Callout>
          </div>
          <SidebarFacts items={lakeManyaraSidebarFacts} message="Hello, I would like to plan a Lake Manyara safari." />
        </div>
      </DestinationSection>

      <DestinationSection id="landscape" tone="cream">
        <SectionHeading eyebrow="FIVE HABITATS, ONE PARK" title="A Lake Manyara Landscape in Five Acts" subtitle="Move from cool groundwater forest to open lake, woodland, floodplain and the Rift Valley wall." />
        <LakeManyaraLandscapeExplorer zones={lakeManyaraZones} />
      </DestinationSection>

      <DestinationSection id="wildlife" tone="sand">
        <SectionHeading eyebrow="LIFE AT THE RIFT VALLEY FLOOR" title="Wildlife, From Forest Canopy to Lakeshore" subtitle="Elephants, hippos and baboon troops are familiar faces. Tree-climbing lions and seasonal flamingos keep every drive full of possibility." />
        <WildlifeShowcase
          items={lakeManyaraWildlife}
          note="Wildlife is wild and sightings cannot be guaranteed. Flamingo numbers vary with water levels and algae, while November to April is best for birding when migrants arrive."
        />
        <p className="mt-6 rounded-2xl border border-sand bg-white p-5 leading-7 text-earth">
          No rhino here, but <Link href="/safaris/ngorongoro/crater" className="font-semibold text-terracotta underline underline-offset-4">Ngorongoro Crater next door</Link> is the place for black rhino, and we can combine both.
        </p>
        <div className="mt-12">
          <SectionHeading eyebrow="A LITTLE PATIENCE GOES A LONG WAY" title="How to Spot Tree-Climbing Lions" align="left" />
          <SightingGuide items={lakeManyaraLionTips} />
        </div>
        <div className="mt-12 overflow-hidden rounded-3xl bg-forest p-5 text-cream sm:p-8" aria-label="Lake Manyara birding species">
          <p className="text-center text-eyebrow text-gold">BIRDING AT MANYARA</p>
          <h3 className="mt-2 text-center font-heading text-2xl text-white sm:text-3xl">More than 400 bird species</h3>
          <Marquee items={lakeManyaraBirds.map((bird) => <span key={bird} className="font-heading text-xl text-gold sm:text-2xl">{bird}</span>)} className="mt-4 py-4" />
        </div>
      </DestinationSection>

      <DestinationSection id="activities" tone="cream">
        <SectionHeading eyebrow="MAKE THE DAY YOURS" title="Eight Ways to Experience Lake Manyara" subtitle="Choose the experiences that suit your pace, from a classic private game drive to a village walk, canopy path or hot-springs picnic." />
        <LakeManyaraActivityChooser activities={lakeManyaraActivities} styles={lakeManyaraStyles} />
        <Callout variant="note" title="Plan around conditions" className="mt-8">Activities depend on season, water levels and park rules. Your guide will recommend the best mix for your dates.</Callout>
      </DestinationSection>

      <DestinationSection id="when-to-go" tone="sand">
        <SectionHeading eyebrow="A YEAR IN THE WILD" title="When to Visit Lake Manyara" subtitle="The park is rewarding all year. Choose dry-season game viewing, green-season birding or the quieter long rains." />
        <SeasonGrid data={lakeManyaraSeasons} />
        <SeasonCards items={lakeManyaraSeasons.cards} />
        <div className="mt-9">
          <h3 className="font-heading text-2xl text-earth">What you may see, month by month</h3>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {lakeManyaraMonths.map((item) => <div key={item.month} className="rounded-xl border border-sand bg-white p-3 text-center">
              <p className="font-heading text-xl text-terracotta">{item.month}</p>
              <p className="mt-1 text-[11px] font-semibold leading-4 text-earth">{item.highlight}</p>
            </div>)}
          </div>
        </div>
        <Callout variant="tip" title="Package rate seasons" className="mt-8">{lakeManyaraPackages[0]?.seasonsNote}</Callout>
      </DestinationSection>

      <DestinationSection id="getting-there" tone="cream">
        <SectionHeading eyebrow="THE JOURNEY IN" title="Getting to Lake Manyara, and How Long to Stay" subtitle="The park is an easy Arusha safari and a natural stop between Tarangire and the Ngorongoro Highlands." />
        <GettingThere data={lakeManyaraGettingThere} />
        <div className="mt-12">
          <h3 className="mb-5 font-heading text-2xl text-earth">How many days in Lake Manyara?</h3>
          <HowManyDays options={lakeManyaraDays} />
        </div>
      </DestinationSection>

      <DestinationSection id="stay" tone="sand">
        <SectionHeading eyebrow="REST IN THE RIFT VALLEY" title="Where to Stay Near Lake Manyara" subtitle="Choose an immersive park stay, a lodge on the escarpment or a comfortable base in Mto wa Mbu or Karatu." />
        <StayTiers
          tiers={lakeManyaraStayTiers}
          footnote="We confirm your exact property in your written quote and always choose it to suit your dates and budget."
          href="/safaris/packages"
          linkLabel="Compare Lake Manyara package stays"
        />
      </DestinationSection>

      <DestinationSection id="packages" tone="cream">
        <SectionHeading eyebrow="OUR LAKE MANYARA JOURNEYS" title="Three Ways to Fall for Lake Manyara" subtitle="Compare a full day in the park, a comfortable overnight escape or a slower three-day wildlife and culture safari." />
        <LakeManyaraPackageCarousel packages={lakeManyaraPackages} />
        <div className="mt-12">
          <SectionHeading eyebrow="COMPARE YOUR OPTIONS" title="Lake Manyara Packages at a Glance" align="left" />
          <ComparisonTable columns={lakeManyaraPackages.map((item) => item.title)} rows={packagesComparisonRows} caption="Compare Lake Manyara safari package durations, activities, accommodation and starting prices." />
          <p className="mt-4 text-xs leading-5 text-muted">Prices are in USD per person sharing. Solo rates include a single supplement. Your written quote confirms the final amount for your dates.</p>
        </div>
        <CtaBanner
          eyebrow="WE CAN HELP YOU CHOOSE"
          title="Not sure which one?"
          description="Tell us your dates and travel style. We reply within 24 hours."
          image={{ src: "/images/lake-manyara/packages-cta.jpg", alt: "Lake Manyara landscape and the Rift Valley escarpment at golden hour" }}
          primaryCta={{ label: "Plan My Trip", href: "/plan-your-safari?type=Safari" }}
          secondaryCta={{ label: "WhatsApp Us", href: siteConfig.whatsappUrlWithMessage("Hello, I am choosing a Lake Manyara safari package. Please help me compare the options.") }}
          parallax
          className="mt-12 rounded-3xl"
        />
        <div className="mt-12">
          <RelatedLinks items={lakeManyaraAddOnLinks} title="Combine Manyara With More of Tanzania" limit={6} className="rounded-3xl bg-sand" />
        </div>
      </DestinationSection>

      <DestinationSection id="practical-tips" tone="sand">
        <SectionHeading eyebrow="BE READY FOR THE DAY" title="Practical Lake Manyara Safari Tips" subtitle="A few thoughtful essentials make game drives, walks and village visits more comfortable." />
        <TipsGrid items={lakeManyaraTips} />
      </DestinationSection>

      <DestinationSection id="manyara-vs-tarangire" tone="cream">
        <SectionHeading eyebrow="TWO DISTINCT NORTHERN CIRCUIT STOPS" title="Lake Manyara vs Tarangire" subtitle="Both parks are rewarding. The right choice depends on the landscape, wildlife and pace you want." />
        <ComparisonTable columns={lakeManyaraComparison.columns} rows={lakeManyaraComparison.rows} caption="Compare Lake Manyara and Tarangire National Parks." />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/safaris/packages/tarangire-elephant-escape" className="inline-flex min-h-11 items-center rounded-full border border-terracotta px-5 font-semibold text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">2-day Tarangire Elephant Escape</Link>
          <Link href="/safaris/packages/tarangire-lake-manyara-classic" className="inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Tarangire and Lake Manyara Classic</Link>
        </div>
      </DestinationSection>

      <DestinationSection id="faqs" tone="sand">
        <SectionHeading eyebrow="PLAN WITH CONFIDENCE" title="Lake Manyara Safari Questions" subtitle="Clear answers about travel time, wildlife, activities and combining the park with other Northern Circuit destinations." />
        <FaqAccordion items={lakeManyaraFaqs} />
      </DestinationSection>

      <CtaBanner
        eyebrow="YOUR MANYARA SAFARI STARTS HERE"
        title="Ready to Meet Manyara's Elephants and Tree-Climbing Lions?"
        description="Tell us your dates and we will design your Lake Manyara safari. We reply within 24 hours."
        image={{ src: "/images/lake-manyara/closing-cta.jpg", alt: "Elephants and forest beneath the Rift Valley escarpment at Lake Manyara" }}
        primaryCta={{ label: "Plan My Trip", href: "/plan-your-safari?type=Safari" }}
        secondaryCta={{ label: "WhatsApp Us", href: siteConfig.whatsappUrlWithMessage("Hello, I would like to plan a Lake Manyara safari.") }}
        parallax
      />
    </main>
  );
}
