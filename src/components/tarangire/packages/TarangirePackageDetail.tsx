import Link from "next/link";
import {
  ArrowRight, Backpack, Binoculars, CalendarDays, CarFront, Check, Clock3, Heart,
  MapPin, ShieldCheck, Users,
} from "lucide-react";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import HeroSignal from "@/components/layout/HeroSignal";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/motion/CountUp";
import Parallax from "@/components/motion/Parallax";
import SplitReveal from "@/components/motion/SplitReveal";
import PackagePriceCalculator from "@/components/tarangire/packages/PackagePriceCalculator";
import TarangirePackageCard from "@/components/tarangire/packages/TarangirePackageCard";
import TarangirePackageItinerary from "@/components/tarangire/packages/TarangirePackageItinerary";
import TarangirePackageMobileBar from "@/components/tarangire/packages/TarangirePackageMobileBar";
import { tarangirePackages } from "@/data/tarangire-packages";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import type { TarangirePackage } from "@/types/tarangire-package";

const seasonalNotes = [
  "Late peak and high season dates; confirm the exact rate for your travel dates.",
  "High season. Wildlife movement changes with rainfall and water.",
  "High through 15 March, then low season begins.",
  "Low season, with greener landscapes and good birding.",
  "Low season, with fewer vehicles and good birding.",
  "Low season through 15 May, then high season begins.",
  "Peak season and the start of the dry-season wildlife concentrations.",
  "Peak season, with wildlife gathering around water sources.",
  "Peak season. Tarangire is often rewarding for elephant viewing.",
  "Peak season, with dry-season wildlife concentrations.",
  "Low season begins; rainfall and wildlife locations vary.",
  "Low through 19 December, then peak season begins.",
];

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

const breadcrumbItems = (item: TarangirePackage) => [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Packages", href: "/safaris/packages" },
  { title: item.name, href: `/safaris/packages/${item.slug}` },
];

function packageStructuredData(item: TarangirePackage) {
  const url = `${siteConfig.url}/safaris/packages/${item.slug}`;
  const crumbs = breadcrumbItems(item);
  return [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: item.name,
      description: item.seo.description,
      touristType: item.bestFor,
      itinerary: {
        "@type": "ItemList",
        itemListElement: item.itinerary.map((entry) => ({
          "@type": "ListItem",
          position: entry.day,
          name: `Day ${entry.day}: ${entry.title}`,
          description: entry.activities.map((activity) => `${activity.time} ${activity.text}`).join(" "),
        })),
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        lowPrice: item.pricing.priceFrom,
        url,
      },
    },
    buildBreadcrumbJsonLd(crumbs),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: item.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];
}

function StickySectionNav() {
  const sections = [
    ["Overview", "#overview"],
    ["Itinerary", "#itinerary"],
    ["Prices", "#prices"],
    ["Included", "#included"],
    ["Stay", "#stay"],
    ["FAQs", "#faqs"],
    ["Book", "#package-book"],
  ];

  return (
    <nav aria-label="On this page" className="sticky top-0 z-30 border-y border-earth/10 bg-cream/95 backdrop-blur print:hidden">
      <Container className="overflow-x-auto">
        <ul className="flex min-w-max gap-5 py-3 text-xs font-semibold text-earth sm:gap-8">
          {sections.map(([label, href]) => (
            <li key={href}><a className="hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta" href={href}>{label}</a></li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

function TrustStrip() {
  const items = [
    { label: "Women-led team", icon: Heart },
    { label: "Private safari vehicle", icon: CarFront },
    { label: "Clear, itemised quotes", icon: Check },
  ];

  return (
    <div className="border-y border-earth/10 bg-white">
      <Container>
        <ul className="grid gap-3 py-5 text-sm font-semibold text-earth sm:grid-cols-3">
          {items.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-2"><Icon aria-hidden="true" size={17} className="shrink-0 text-terracotta" />{label}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function FactStrip({ item }: { item: TarangirePackage }) {
  const facts = [
    { label: "Days", value: item.days, prefix: "", icon: CalendarDays },
    { label: "Nights", value: item.nights, prefix: "", icon: Clock3 },
    { label: "Parks", value: item.parks.length, prefix: "", icon: MapPin },
    { label: "Guests per vehicle", value: item.maxGuestsPerVehicle, prefix: "Up to ", icon: Users },
    { label: "Start and end", value: "Arusha", prefix: "", icon: CarFront },
    { label: "Best months", value: item.bestMonths, prefix: "", icon: Binoculars },
  ];
  return (
    <Container className="relative z-10 -mt-7 sm:-mt-10">
      <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-sand bg-sand shadow-soft sm:grid-cols-3 lg:grid-cols-6">
        {facts.map(({ label, value, prefix, icon: Icon }) => (
          <div key={label} className="min-h-28 bg-cream p-4 sm:p-5">
            <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-terracotta"><Icon aria-hidden="true" size={15} />{label}</dt>
            <dd className="mt-3 text-sm font-semibold leading-5 text-earth">{typeof value === "number" ? <>{prefix}<CountUp value={value} label={label.toLowerCase()} /></> : value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

function PriceTable({ item }: { item: TarangirePackage }) {
  const tiers = item.pricing.tiers ? ["comfort", "luxury"] as const : ["standard"] as const;
  const seasons = ["low", "high", "peak"] as const;
  const groups = [1, 2, 4, 6] as const;
  return (
    <div className="mt-8 space-y-6">
      {tiers.map((tier) => (
        <div key={tier} className="overflow-x-auto rounded-2xl border border-earth/10 bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="px-4 py-3 text-left font-semibold capitalize text-earth">{tier} tier, estimated USD per person sharing</caption>
            <thead className="bg-sand text-earth">
              <tr><th scope="col" className="px-4 py-3">Season</th>{groups.map((group) => <th key={group} scope="col" className="px-4 py-3">{group === 1 ? "Solo" : `${group} travellers`}</th>)}</tr>
            </thead>
            <tbody>
              {seasons.map((season) => (
                <tr key={season} className="border-t border-earth/10">
                  <th scope="row" className="px-4 py-3 font-semibold capitalize text-earth">{season}</th>
                  {groups.map((group) => {
                    const amount = item.pricing.standard
                      ? item.pricing.standard[group]
                      : item.pricing.tiers?.[tier === "standard" ? "comfort" : tier][season][group];
                    return <td key={group} className="px-4 py-3 text-muted">{amount === undefined ? "Ask us" : formatPrice(amount)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function SeasonGrid() {
  const seasons = [
    { name: "Low season", dates: "16 Mar to 15 May, 1 Nov to 19 Dec", detail: "Fewer vehicles, good lodge value and strong birding." },
    { name: "High season", dates: "6 Jan to 15 Mar, 16 May to 30 Jun", detail: "A transition between the green and dry-season travel periods." },
    { name: "Peak season", dates: "1 Jul to 31 Oct, 20 Dec to 5 Jan", detail: "Dry-season wildlife concentrations around water." },
  ];
  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-2xl text-earth">Tarangire seasons</h3>
        <span className="rounded-full bg-forest px-4 py-2 text-xs font-bold text-gold">Tarangire at its best: July to October</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {seasons.map((season) => (
          <article key={season.name} className="rounded-2xl border border-earth/10 bg-white p-5">
            <h4 className="font-semibold text-earth">{season.name}</h4>
            <p className="mt-2 text-xs font-semibold text-terracotta">{season.dates}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{season.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function StaySection({ item }: { item: TarangirePackage }) {
  if (!item.pricing.tiers) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-heading text-2xl text-earth">{item.nights === 0 ? "Day trip accommodation" : "Your stay"}</h3>
        <p className="mt-3 max-w-3xl leading-7 text-muted">{item.accommodationSummary}</p>
        <p className="mt-3 text-sm leading-6 text-muted">Any property and availability are confirmed in writing before you book.</p>
      </div>
    );
  }

  const styles = [
    {
      name: "Comfort",
      text: "A tented lodge or camp with an en-suite room and full board, subject to availability.",
      bestFor: "A comfortable stay close to the route.",
    },
    {
      name: "Luxury",
      text: "A boutique tented camp or lodge. Private terrace, pool or river views may be available depending on the property.",
      bestFor: "A more private stay with additional space and amenities.",
    },
  ];
  return (
    <>
      <p className="max-w-3xl text-sm leading-6 text-muted">{item.accommodationSummary}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {styles.map((style) => (
          <article key={style.name} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <p className="text-eyebrow text-terracotta">{style.name} style</p>
            <h3 className="mt-3 font-heading text-2xl text-earth">{style.name}</h3>
            <p className="mt-3 leading-7 text-muted">{style.text}</p>
            <p className="mt-4 text-sm text-earth"><span className="font-semibold">Best for:</span> {style.bestFor}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-muted">We will confirm your exact property in writing before you book.</p>
    </>
  );
}

function AddOnLinks() {
  const links = [
    { title: "Add Lake Manyara", href: "/safaris/lake-manyara" },
    { title: "Add Ngorongoro Crater", href: "/safaris/ngorongoro/crater" },
    { title: "Extend to the Serengeti", href: "/safaris/serengeti" },
    { title: "Add Zanzibar beach time", href: "/zanzibar" },
    { title: "Climb Kilimanjaro before your safari", href: "/kilimanjaro" },
  ];
  return (
    <div className="mt-8 rounded-3xl bg-sand p-6 sm:p-8">
      <h3 className="font-heading text-2xl text-earth">Add this to your trip</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}><Link href={link.href} className="flex min-h-12 items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-earth hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{link.title}<ArrowRight aria-hidden="true" size={16} className="shrink-0" /></Link></li>
        ))}
      </ul>
    </div>
  );
}

export default function TarangirePackageDetail({ item }: { item: TarangirePackage }) {
  const related = tarangirePackages.filter((candidate) => item.related.includes(candidate.slug));
  const schema = packageStructuredData(item);
  const crumbItems = breadcrumbItems(item);

  return (
    <main className="pb-20 md:pb-0">
      {schema.map((data, index) => <JsonLd key={index} data={data} />)}
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-forest text-white">
        <HeroSignal />
        <Parallax className="absolute -inset-y-[8%] inset-x-0 overflow-hidden">
          <SmartImage src={item.heroImage} alt={item.heroAlt} sizes="100vw" fill priority className="object-cover" />
        </Parallax>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/35 to-earth/15" />
        <Container className="relative w-full pb-20 pt-32 md:pb-28">
          <Breadcrumbs items={crumbItems} tone="light" />
          <p className="mt-8 text-eyebrow text-gold">TARANGIRE SAFARI PACKAGE</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl"><SplitReveal text={item.name} eager /></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/90">{item.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[item.duration, item.style, "Private 4x4", item.pace].map((chip) => <span key={chip} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">{chip}</span>)}
          </div>
          <p className="mt-7 font-heading text-3xl text-white">From {formatPrice(item.pricing.priceFrom)} <span className="font-sans text-base font-normal text-cream/80">per person sharing</span></p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#prices" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-bold text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Check your price</a>
            <a href={siteConfig.whatsappUrlWithMessage(`Hello, I am interested in the ${item.name}. Please help me plan my dates.`)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/50 px-6 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Chat on WhatsApp</a>
          </div>
        </Container>
      </section>
      <StickySectionNav />
      <FactStrip item={item} />
      <TrustStrip />

      <section id="overview" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="The journey" title="Why you will love it" subtitle={item.hook} align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.highlights.map((highlight, index) => (
              <article key={highlight} className="rounded-2xl border border-earth/10 bg-white p-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-sand text-terracotta"><Check aria-hidden="true" size={19} /></span>
                <h3 className="mt-4 font-heading text-xl text-earth">{highlight}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{index === 0 ? item.style : item.parks.join(", ")}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-earth">Best for</span>
            {item.bestFor.map((tag) => <span key={tag} className="rounded-full bg-sand px-4 py-2 text-xs font-semibold text-earth">{tag}</span>)}
          </div>
          {["tarangire-elephant-escape", "tarangire-manyara-ngorongoro-circuit"].includes(item.slug) ? (
            <div className="mt-8 grid gap-5 rounded-3xl bg-white p-6 shadow-card md:grid-cols-[1fr_auto] md:items-center sm:p-8">
              <div>
                <p className="text-eyebrow text-terracotta">A small celebration?</p>
                <h3 className="mt-2 font-heading text-2xl text-earth">Tell us what makes your trip special.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Share your occasion when you enquire. We can discuss private sundowner or dinner arrangements and confirm what is available for your dates.</p>
              </div>
              <Link href={`/book?package=${item.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-terracotta px-5 text-sm font-semibold text-terracotta hover:bg-terracotta hover:text-white">Ask about an occasion</Link>
            </div>
          ) : null}
        </Container>
      </section>

      <section id="itinerary" className="scroll-mt-24 bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Day by day" title="Your Tarangire itinerary" subtitle="Times are a guide and may shift with road conditions, park rules and wildlife activity." align="left" />
          <div className="mt-8"><TarangirePackageItinerary item={item} /></div>
        </Container>
      </section>

      <section id="prices" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Transparent pricing" title="Check your safari price" subtitle="Choose your travel month, accommodation style and group size to see an estimate." align="left" />
          <div className="mt-8"><PackagePriceCalculator item={item} /></div>
          <SeasonGrid />
          <PriceTable item={item} />
          <div className="mt-6 rounded-2xl border-l-4 border-gold bg-white p-5 text-sm leading-6 text-earth">
            <p className="font-semibold">How we price</p>
            <p className="mt-1">Prices are per person sharing. The quote lists the private vehicle, guide, park fees, accommodation and meals included for your route. No hidden extras.</p>
          </div>
        </Container>
      </section>

      <section id="included" className="scroll-mt-24 bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Clear from the start" title="Included and not included" align="left" />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-2xl text-earth"><Check aria-hidden="true" className="text-terracotta" />Included</h3>
              <ul className="mt-5 space-y-3">
                {item.inclusions.map((entry) => <li key={entry} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" size={17} className="mt-1 shrink-0 text-terracotta" />{entry}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-2xl text-earth"><ArrowRight aria-hidden="true" className="text-terracotta" />Not included</h3>
              <ul className="mt-5 space-y-3">
                {item.exclusions.map((entry) => <li key={entry} className="flex gap-3 text-sm leading-6 text-muted"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-terracotta" />{entry}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="stay" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Sleep well in the bush" title="Where you stay" subtitle="Accommodation is described by style. We confirm the exact property and availability in writing." align="left" />
          <div className="mt-8"><StaySection item={item} /></div>
        </Container>
      </section>

      <section className="bg-forest py-16 text-cream sm:py-20">
        <Container>
          <SectionHeading eyebrow="Plan with confidence" title="Practical details" subtitle="Your guide and written itinerary confirm the final details for your dates." tone="light" align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Best time", text: item.bestMonths, icon: CalendarDays },
              { title: "What to pack", text: "Sun hat, sunscreen, comfortable closed shoes, binoculars and a light layer for early starts.", icon: Backpack },
              { title: "Health and safety", text: "Follow your guide's advice, bring personal medication and arrange travel and medical insurance.", icon: ShieldCheck },
              { title: "Fitness and children", text: `${item.pace} pace. Tell us the ages of children so we can confirm suitability and current park rules.`, icon: Users },
            ].map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <Icon aria-hidden="true" size={22} className="text-gold" />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/75">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <h3 className="font-heading text-2xl text-white">What you may see this month</h3>
            <p className="mt-2 text-sm leading-6 text-cream/75">Wildlife is free-roaming and seasonal conditions vary. Use this guide for planning, not as a sighting guarantee.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {monthLabels.map((month, index) => (
                <div key={month} className="rounded-xl bg-white/10 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold">{month}</p>
                  <p className="mt-2 text-xs leading-5 text-cream/80">{seasonalNotes[index]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <AddOnLinks />
          </div>
          <details className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
            <summary className="cursor-pointer font-semibold text-white">Booking, children and activity policies</summary>
            <div className="mt-4 space-y-3 text-sm leading-6 text-cream/75">
              <p>Deposit, balance due date and cancellation terms are provided in your written booking terms before you confirm.</p>
              <p>Child rates and room arrangements depend on age, property and current park rules. We confirm them in your quote. Child seats can be requested.</p>
              <p>Private vehicles are planned for up to six guests, with a second vehicle arranged for larger groups. Some photography journeys are planned for a maximum of four guests per vehicle.</p>
              <p>Walking activities are offered only where permitted and are confirmed with the selected camp.</p>
            </div>
          </details>
        </Container>
      </section>

      <section id="faqs" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <Container className="max-w-5xl">
          <SectionHeading eyebrow="Good to know" title="Tarangire safari FAQs" align="left" />
          <div className="mt-8 space-y-3">
            {item.faqs.map(({ question, answer }) => (
              <details key={question} className="group rounded-2xl border border-earth/10 bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-earth marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-muted">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="Related Tarangire journeys" align="left" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((candidate) => <TarangirePackageCard key={candidate.slug} item={candidate} />)}
          </div>
          <nav aria-label="Related destinations" className="mt-8">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Explore Tarangire", "/safaris/tarangire"],
                ["Lake Manyara safaris", "/safaris/lake-manyara"],
                ["Ngorongoro safaris", "/safaris/ngorongoro"],
                ["Plan your safari", "/plan-your-safari"],
              ].map(([label, href]) => <li key={href}><Link href={href} className="flex min-h-12 items-center justify-between rounded-xl bg-white px-4 text-sm font-semibold text-earth hover:text-terracotta">{label}<ArrowRight aria-hidden="true" size={16} /></Link></li>)}
            </ul>
          </nav>
        </Container>
      </section>

      <section id="package-book" className="scroll-mt-24 bg-forest py-16 text-center text-cream sm:py-20">
        <Container>
          <p className="text-eyebrow text-gold">Your Tarangire story starts here</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-heading text-4xl text-white sm:text-5xl">Ready to meet Tarangire&apos;s elephants?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cream/80">Tell us your dates and travel style. We will help shape the right route and confirm your written quote.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={`/book?package=${item.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-earth hover:bg-cream">Request this safari <ArrowRight aria-hidden="true" size={16} /></Link>
            <a href={siteConfig.whatsappUrlWithMessage(`Hello, I would like to enquire about the ${item.name}.`)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white hover:bg-white/10">WhatsApp us</a>
          </div>
          <p className="mt-5 text-sm text-cream/70"><a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">{siteConfig.email}</a> | <a href={`tel:${siteConfig.phoneTel}`} className="underline underline-offset-4">{siteConfig.phoneDisplay}</a></p>
        </Container>
      </section>
      <TarangirePackageMobileBar item={item} />
    </main>
  );
}
