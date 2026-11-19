import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { StickySectionNav } from "@/components/destinations/Interactive";
import AltitudeProfile from "@/components/kilimanjaro/AltitudeProfile";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import DaysChart from "@/components/kilimanjaro/DaysChart";
import FeeBreakdown from "@/components/kilimanjaro/FeeBreakdown";
import FaqAccordion from "@/components/inner/FaqAccordion";
import KilimanjaroHero from "@/components/kilimanjaro/KilimanjaroHero";
import RelatedLinks from "@/components/inner/RelatedLinks";
import RouteFinder from "@/components/kilimanjaro/RouteFinder";
import RouteProfiles from "@/components/kilimanjaro/RouteProfiles";
import RouteStatBars from "@/components/kilimanjaro/RouteStatBars";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ROUTE_FAQS, ROUTES } from "@/data/kilimanjaro";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Kilimanjaro Routes Compared | She Roars Africa Safari",
  description: "Compare Kilimanjaro routes: Machame, Lemosho, Marangu, Rongai, Northern Circuit and Umbwe. Explore days, difficulty, scenery and acclimatisation.",
  path: "/kilimanjaro/routes",
  image: "/images/kilimanjaro/routes-hero.jpg",
});

const nav = [
  { id: "overview", label: "Overview" }, { id: "route-finder", label: "Route Finder" }, { id: "compare", label: "Compare" },
  { id: "profile", label: "Profile" }, ...ROUTES.map(({ slug, name }) => ({ id: slug, label: name })),
  { id: "days", label: "Days Matter" }, { id: "park-fees", label: "Park Fees" }, { id: "variations", label: "Variations" }, { id: "faqs", label: "FAQs" },
];

const questions = [
  { title: "Days on the mountain", text: "More days means better acclimatisation and a higher chance of reaching the summit. For most first-time climbers, seven or eight days is the sweet spot." },
  { title: "The altitude profile", text: "Routes that climb high and sleep low, such as Machame, Lemosho and the Northern Circuit, help your body adapt." },
  { title: "Scenery, crowds and comfort", text: "Some routes are busy and sociable, some are remote and silent. Some use tents, one uses huts. Decide what kind of adventure you want." },
];

const SHOW_MERU_COMBO = false;
const PACKAGE_ROUTE_SLUGS = new Set(["machame", "lemosho", "marangu", "rongai", "northern-circuit", "umbwe"]);

const routeImageAlts: Record<string, string> = {
  machame: "Trekkers crossing moorland on the Machame approach to Kilimanjaro",
  lemosho: "Shira Plateau and Kibo on the Lemosho route",
  marangu: "Forest trail on Kilimanjaro's Marangu route",
  rongai: "Open northern slopes on the Rongai route",
  "northern-circuit": "Remote high-altitude landscape on the Northern Circuit",
  umbwe: "Steep forest ridge on the Umbwe route",
};

function RouteSection({ route, index }: { route: (typeof ROUTES)[number]; index: number }) {
  const image = (
    <div className="relative min-h-72 overflow-hidden rounded-3xl bg-sand sm:min-h-96">
      <SmartImage src={`/images/kilimanjaro/route-${route.slug}.jpg`} alt={routeImageAlts[route.slug]} sizes="(max-width: 1024px) 100vw, 45vw" fill className="object-cover" />
    </div>
  );
  const whatsapp = siteConfig.whatsappUrlWithMessage(`Hello She Roars, I would like to ask about the ${route.name} Kilimanjaro route.`);
  const routeStats = [
    { value: `${route.days.recommended} days`, label: "Recommended time on the mountain" },
    { value: `Approx. ${route.distanceKm} km`, label: "Route distance" },
    { value: `${route.startGate.altitudeM.toLocaleString("en-US")} m`, label: `Start altitude at ${route.startGate.name}` },
    { value: route.successLabel.replace(/\s*\(typical\)/, ""), label: "Reported summit success" },
    { value: `${route.crowds} of 5`, label: "Crowd level, relative comparison" },
    { value: route.bestSeason, label: "Typical best season" },
  ];

  return (
    <Section id={route.slug} background={index % 2 === 0 ? "cream" : "sand"} className="scroll-mt-28">
      <Container>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-eyebrow text-terracotta">{route.badge}</p>
            <h2 className="mt-2 font-heading text-4xl text-earth sm:text-5xl">{route.name}{route.nickname ? <span className="ml-3 text-xl font-normal text-muted">({route.nickname})</span> : null}</h2>
          </div>
          <span className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">{route.days.min} to {route.days.max} days, recommended {route.days.recommended}</span>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={index % 2 === 0 ? "lg:order-2" : ""}>{image}</div>
          <div className={index % 2 === 0 ? "lg:order-1" : ""}>
            <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white px-3 py-2 text-earth">Approx. {route.distanceKm} km</span>
              <span className="rounded-full bg-white px-3 py-2 text-earth">{route.stay}</span>
              <span className="rounded-full bg-white px-3 py-2 text-earth">{route.startGate.name}</span>
            </div>
            <p className="leading-7 text-muted">{route.story}</p>
            <h3 className="mt-6 font-heading text-2xl text-earth">At a glance</h3>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {routeStats.map(({ value, label }) => <div key={label} className="rounded-xl bg-white p-3"><dt className="text-xs text-muted">{label}</dt><dd className="mt-1 text-sm font-semibold text-earth">{value}</dd></div>)}
            </dl>
            <div className="mt-6 rounded-2xl border border-sand bg-white p-5"><RouteStatBars route={route} /></div>
          </div>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h3 className="font-heading text-2xl text-earth">Highlights</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">{route.highlights.map((highlight) => <li key={highlight} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-forest" />{highlight}</li>)}</ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-card"><h3 className="font-heading text-xl text-earth">Best for</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-muted">{route.bestFor.map((text) => <li key={text} className="flex gap-2"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-forest" />{text}</li>)}</ul></div>
            <div className="rounded-3xl bg-white p-6 shadow-card"><h3 className="font-heading text-xl text-earth">Think twice if</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-muted">{route.thinkTwice.map((text) => <li key={text} className="flex gap-2"><X aria-hidden="true" className="mt-1 size-4 shrink-0 text-terracotta" />{text}</li>)}</ul></div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-5 font-heading text-3xl text-earth">Day-by-day itinerary</h3>
          <ol className="space-y-3">
            {route.itinerary.map((day, dayIndex) => <li key={day.day}>
              <details open={dayIndex === 0} className="group rounded-2xl border border-sand bg-white p-5 shadow-sm">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-earth marker:hidden [&::-webkit-details-marker]:hidden">
                  <span><span className="mr-2 text-terracotta">Day {day.day}</span>{day.title}</span><span aria-hidden="true" className="text-terracotta transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid gap-2 pt-3 text-sm leading-6 text-muted sm:grid-cols-2">
                  <p><strong className="text-earth">From:</strong> {day.from}</p><p><strong className="text-earth">To:</strong> {day.to}</p>
                  <p><strong className="text-earth">Sleep:</strong> approx. {day.campAltitudeM.toLocaleString("en-US")} m</p><p><strong className="text-earth">Walking:</strong> approx. {day.hours} | {day.distanceKm} km</p>
                  <p className="sm:col-span-2">{day.text}</p>
                </div>
              </details>
            </li>)}
          </ol>
        </div>

        <div className="mt-10 grid items-start gap-8 rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div><h3 className="mb-4 font-heading text-2xl text-earth">Approximate altitude profile</h3><AltitudeProfile route={route} compact showToggle={false} /></div>
          <div>
            <h3 className="font-heading text-2xl text-earth">Plan this route</h3>
            <p className="mt-3 text-sm leading-6 text-muted">Park fees for this itinerary are about ${route.parkFeeTotalUsd.toLocaleString("en-US")} per person, included in our price. Fees are approximate and can change.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={`/book?type=kilimanjaro&route=${route.slug}`}>Request a quote</Button>
              <Button href={whatsapp} variant="secondary">Ask on WhatsApp</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function KilimanjaroRoutesPage() {
  return (
    <main>
      <KilimanjaroHero mode="routes" />
      <StickySectionNav items={nav} cta={{ label: "Plan My Climb", href: "/plan-your-safari" }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Kilimanjaro routes",
        itemListElement: ROUTES.map((route, index) => ({ "@type": "ListItem", position: index + 1, name: route.name, url: `${siteConfig.url}/kilimanjaro/routes#${route.slug}` })),
      }} />

      <Section id="overview" background="cream">
        <Container>
          <SectionHeading eyebrow="Before You Pick" title="Three Things That Matter More Than the Route Name" />
          <div className="grid gap-4 lg:grid-cols-3">
            {questions.map(({ title, text }, index) => <article key={title} className="rounded-3xl border border-sand bg-white p-6 shadow-card"><p className="font-heading text-5xl text-gold">0{index + 1}</p><h3 className="mt-3 font-heading text-2xl text-earth">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></article>)}
          </div>
          <p className="mx-auto mt-7 max-w-4xl text-center leading-7 text-muted">Most routes descend by the Mweka or Marangu trail. A well-paced itinerary, daily health attention and experienced mountain guides are important parts of planning.</p>
        </Container>
      </Section>

      <Section id="route-finder" background="sand">
        <Container>
          <SectionHeading eyebrow="Your Route, Your Way" title="Not Sure Which Route? Answer Four Questions." subtitle="Takes under a minute. No sign-up." />
          <RouteFinder />
        </Container>
      </Section>

      <Section id="route-cards" background="cream" className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Meet the Routes" title="Six Ways to Reach Uhuru Peak" />
          <div className="flex snap-x gap-4 overflow-x-auto px-1 pb-5 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
            {ROUTES.map((route) => <article key={route.slug} className="w-[86%] min-w-[17rem] snap-center overflow-hidden rounded-3xl border border-sand bg-white shadow-card transition hover:border-gold hover:shadow-lift md:w-auto md:min-w-0">
              <div className="relative aspect-[16/10]"><SmartImage src={`/images/kilimanjaro/route-${route.slug}.jpg`} alt={routeImageAlts[route.slug]} sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover" /><span className="absolute left-3 top-3 rounded-full bg-earth/85 px-3 py-1 text-xs font-semibold text-white">{route.badge}</span></div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2"><h3 className="font-heading text-2xl text-earth">{route.name}</h3>{route.nickname ? <span className="rounded-full bg-sand px-3 py-1 text-xs text-earth">{route.nickname}</span> : null}</div>
                <p className="mt-2 text-xs text-muted">{route.days.min} to {route.days.max} days | approx. {route.distanceKm} km | {route.stay}</p>
                <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-muted">{route.hook}</p>
                <RouteStatBars route={route} />
                <p className="mt-3 text-xs leading-5 text-muted"><strong className="text-earth">From the data, best for:</strong> {route.bestFor[0]}</p>
                <Link href={PACKAGE_ROUTE_SLUGS.has(route.slug) ? `/kilimanjaro/routes/${route.slug}` : `#${route.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">Explore this route <ArrowRight aria-hidden="true" size={16} /></Link>
                {PACKAGE_ROUTE_SLUGS.has(route.slug) ? <Link href={`/kilimanjaro/routes/${route.slug}`} className="mt-1 inline-flex min-h-11 items-center font-semibold text-earth underline underline-offset-4">View packages and prices</Link> : null}
              </div>
            </article>)}
          </div>
        </Container>
      </Section>

      <Section id="compare" background="sand">
        <Container>
          <SectionHeading eyebrow="Side by Side" title="Compare All Kilimanjaro Routes" subtitle="Swipe horizontally on smaller screens to compare every detail." />
          <div className="overflow-x-auto rounded-2xl border border-sand bg-white shadow-card">
            <table className="w-full min-w-[1400px] border-collapse text-sm">
              <caption className="sr-only">Comparison of the six main Kilimanjaro routes</caption>
              <thead className="sticky top-[calc(var(--navbar-height,78px)+3.5rem)] z-20 bg-forest text-left text-white">
                <tr>{["Route", "Typical days", "Distance (approx.)", "Start gate", "Stay", "Difficulty", "Scenery", "Crowds", "Acclimatisation", "Typical summit success", "Descent", "Best for", "Route details"].map((heading) => <th key={heading} scope="col" className="px-4 py-4 font-semibold">{heading}</th>)}</tr>
              </thead>
              <tbody>
                {ROUTES.map((route, index) => <tr key={route.slug} className={index % 2 === 0 ? "bg-sand/40" : "bg-white"}>
                  <th scope="row" className={`sticky left-0 z-10 px-4 py-4 text-left font-semibold text-earth ${index % 2 === 0 ? "bg-sand" : "bg-white"}`}>{route.name}</th>
                  <td className="px-4 py-4 text-muted">{route.days.min} to {route.days.max}, recommend {route.days.recommended}</td>
                  <td className="px-4 py-4 text-muted">Approx. {route.distanceKm} km</td><td className="px-4 py-4 text-muted">{route.startGate.name} ({route.startGate.altitudeM.toLocaleString("en-US")} m)</td>
                  <td className="px-4 py-4 text-muted">{route.stay}</td><td className="px-4 py-4 text-muted">{route.difficulty} of 5</td><td className="px-4 py-4 text-muted">{route.scenery} of 5</td>
                  <td className="px-4 py-4 text-muted">{route.crowds} of 5</td><td className="px-4 py-4 text-muted">{route.acclimatisation} of 5</td>
                  <td className="px-4 py-4 text-muted">{route.successLabel}</td><td className="px-4 py-4 text-muted">{route.descent}</td><td className="px-4 py-4 text-muted">{route.bestFor[0]}</td>
                  <td className="px-4 py-4"><Link className="font-semibold text-terracotta underline" href={`/kilimanjaro/routes/${route.slug}`}>View route</Link></td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs italic leading-5 text-muted">Distances and altitudes are approximate and vary slightly by source and itinerary. Success rates are typical, operator-reported and depend mostly on days and pace.</p>
          <Callout className="mt-6" variant="tip"><strong>Our pick for first-timers: Lemosho, 8 days.</strong> It combines varied scenery with a gradual profile and more time for acclimatisation.</Callout>
        </Container>
      </Section>

      <Section id="profile" background="cream">
        <Container>
          <SectionHeading eyebrow="The Shape of the Climb" title="See Every Route as an Altitude Profile" subtitle="Each line shows where you sleep (solid) and the highest point you reach that day (dashed). Notice the dips: climb high, sleep low is how your body adapts." />
          <RouteProfiles />
        </Container>
      </Section>

      {ROUTES.map((route, index) => <RouteSection key={route.slug} route={route} index={index} />)}

      <Section id="days" background="forest">
        <Container>
          <SectionHeading eyebrow="The Honest Numbers" title="Why More Days Means More Summits" tone="light" />
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white p-5 sm:p-8">
            <DaysChart />
            <p className="mt-5 text-sm leading-6 text-muted">Figures reported from Kilimanjaro National Park statistics published in the early 2000s. They cover all routes and are older numbers: current rates are generally thought to be higher, but the pattern holds. More days, more success.</p>
          </div>
          <Callout className="mx-auto mt-6 max-w-3xl" variant="tip">Our recommendation: choose seven days at the very least, and eight if you can.</Callout>
        </Container>
      </Section>

      <Section id="park-fees" background="cream">
        <Container>
          <SectionHeading eyebrow="Park Fees" title="Understand the Park Fees by Route" subtitle="These figures are approximate route totals per climber. Park fees are set by Tanzania National Parks and may change." />
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <FeeBreakdown />
            <div className="rounded-3xl border border-sand bg-white p-6 shadow-card">
              <h3 className="font-heading text-2xl text-earth">Typical itinerary totals</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[340px] text-left text-sm">
                  <thead><tr className="border-b border-sand text-muted"><th scope="col" className="py-3 pr-3">Route and days</th><th scope="col" className="py-3 text-right">Approx. fees</th></tr></thead>
                  <tbody>{ROUTES.map((route) => <tr key={route.slug} className="border-b border-sand/70"><th scope="row" className="py-3 pr-3 font-medium text-earth">{route.name}, {route.days.recommended} days</th><td className="py-3 text-right text-muted">${route.parkFeeTotalUsd.toLocaleString("en-US")}</td></tr>)}</tbody>
                </table>
              </div>
              <Link href="/kilimanjaro#cost" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">Read the full cost guide <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
          {/* TODO(CONFIRM): verify the 2026 to 2027 park-fee schedule and itinerary totals before launch. */}
        </Container>
      </Section>

      <Section id="variations" background="sand">
        <Container>
          <SectionHeading eyebrow="Know the Trade-offs" title="Variations and Routes We Do Not Recommend" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "5-day Marangu", text: "Possible, but too short for most climbers. We recommend the six-day version with an acclimatisation day." },
              { title: "Shira route", text: "It starts at about 3,600 m by vehicle, skipping the gentler early days. We recommend Lemosho for similar plateau scenery." },
              { title: "Umbwe in 6 days", text: "Fast altitude gain makes this a demanding option for experienced high-altitude trekkers. We recommend seven days." },
              { title: "Mweka route", text: "Used for descent on most southern and western routes." },
              ...(SHOW_MERU_COMBO ? [{ title: "Meru first", text: "A 2 to 3 day Mount Meru climb can be considered as acclimatisation before Kilimanjaro." }] : []),
            ].map(({ title, text }) => <article key={title} className="rounded-3xl border border-white bg-white p-6 shadow-card"><h3 className="font-heading text-xl text-earth">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></article>)}
          </div>
          {/* TODO(CONFIRM): confirm whether Mount Meru combinations are offered before enabling the related card. */}
        </Container>
      </Section>

      <Section id="faqs" background="cream">
        <Container>
          <SectionHeading eyebrow="Good to Know" title="Kilimanjaro Route FAQs" />
          <FaqAccordion items={ROUTE_FAQS.map(({ q, a }) => ({ question: q, answer: a }))} jsonLd />
        </Container>
      </Section>

      <RelatedLinks title="Keep Planning Your Tanzania Journey" limit={6} items={[
        { title: "Kilimanjaro", href: "/kilimanjaro", description: "Return to the complete mountain planning guide." },
        { title: "Safari packages", href: "/safaris/packages", description: "Browse safari journeys across Tanzania." },
        { title: "Serengeti", href: "/safaris/serengeti", description: "Explore the Serengeti's wildlife, regions and seasons." },
        { title: "Zanzibar", href: "/zanzibar", description: "Consider a beach stay after your climb." },
        { title: "Plan your safari", href: "/plan-your-safari", description: "Tell us what you have in mind for Tanzania." },
        { title: "Climb and safari", href: "/kilimanjaro/climb-and-safari", description: "Explore a Kilimanjaro and safari combination." },
      ]} />
      <CtaBanner eyebrow="Choose Your Path" title="Ready to Pick Your Route?" description="Send us your dates and experience, and we will recommend a route and send a clear quote." image={{ src: "/images/kilimanjaro/cta-bg.jpg", alt: "The summit of Kilimanjaro above the clouds" }} primaryCta={{ label: "Plan My Climb", href: "/plan-your-safari" }} secondaryCta={{ label: "WhatsApp Us", href: siteConfig.whatsappUrlWithMessage("Hello She Roars, I would like help choosing a Kilimanjaro route.") }} />
    </main>
  );
}
