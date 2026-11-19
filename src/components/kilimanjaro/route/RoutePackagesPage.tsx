import { Suspense } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Compass, Mountain, ShieldCheck, Tent, Users } from "lucide-react";
import AltitudeProfile from "@/components/kilimanjaro/AltitudeProfile";
import DaysChart from "@/components/kilimanjaro/DaysChart";
import RouteStatBars from "@/components/kilimanjaro/RouteStatBars";
import { StickySectionNav } from "@/components/destinations/Interactive";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import Callout from "@/components/inner/Callout";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import DrawPath from "@/components/motion/DrawPath";
import Parallax from "@/components/motion/Parallax";
import SplitReveal from "@/components/motion/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import CountUp from "@/components/motion/CountUp";
import JsonLd from "@/components/seo/JsonLd";
import PackageExplorer from "./PackageExplorer";
import TierCompare from "./TierCompare";
import CircuitMap from "./CircuitMap";
import RainShadowPanel from "./RainShadowPanel";
import UmbweFitCheck from "./UmbweFitCheck";
import { ROUTES, SEASONS, MONTH_LEVELS } from "@/data/kilimanjaro";
import { getRouteFaqs, type RouteCopy } from "@/data/kilimanjaro-route-copy";
import { DAY_LIBRARY, packagesForRoute, profileOf, SEASON_LABELS, type KiliPackage, type RouteSlug } from "@/data/kilimanjaro-packages";
import { siteConfig } from "@/data/site";
import { buildFaqJsonLd } from "@/lib/seo";

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "packages", label: "Packages" },
  { id: "itinerary", label: "Itinerary" },
  { id: "mid-vs-luxury", label: "Mid-range vs Luxury" },
  { id: "lengths", label: "Lengths" },
  { id: "when-to-climb", label: "When to Climb" },
  { id: "safety", label: "Safety" },
  { id: "booking", label: "Booking" },
  { id: "faqs", label: "FAQs" },
];

const routeImages = (route: RouteSlug) => `/images/kilimanjaro/routes/${route}`;

function RouteHero({ route, copy }: { route: RouteSlug; copy: RouteCopy }) {
  const data = ROUTES.find((item) => item.slug === route);
  const packages = packagesForRoute(route);
  const days = packages.map((pkg) => pkg.days).sort((a, b) => a - b);
  const daysLabel = `${days[0]} to ${days[days.length - 1]} days`;
  const subtitle = copy.hero.sub.replace(/Choose .*? days, in/, `Choose ${daysLabel}, in`);
  const recommended = packages.find((pkg) => pkg.recommended) ?? packages[0];
  if (!data || !recommended) throw new Error(`Missing route data for ${route}`);
  const base = routeImages(route);
  const wa = siteConfig.whatsappUrlWithMessage(`Hello She Roars, I would like help choosing a ${data.name} climb.`);

  return (
    <section id="top" className="relative isolate min-h-[88svh] overflow-hidden bg-forest text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#172e24_0%,#1f3d2b_47%,#2a1f17_100%)]" />
      <SmartImage src={`${base}/hero-sky.jpg`} alt={copy.hero.imageAlt} sizes="100vw" fill priority className="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/30 to-forest/20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-16 h-28 text-gold/90" aria-hidden="true">
        <DrawPath d="M0 104 C110 98 110 67 220 70 S350 20 475 53 S625 91 730 38 S880 48 1000 8" className="h-full w-full" duration={1.8}>
          <circle className="kilimanjaro-camp-dot" cx="220" cy="70" r="5" fill="currentColor" />
          <circle className="kilimanjaro-camp-dot" cx="475" cy="53" r="5" fill="currentColor" />
          <circle className="kilimanjaro-camp-dot" cx="730" cy="38" r="5" fill="currentColor" />
          <circle className="kilimanjaro-camp-dot" cx="1000" cy="8" r="6" fill="currentColor" />
        </DrawPath>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-earth to-transparent" aria-hidden="true" />
      <Container className="relative flex min-h-[88svh] w-full flex-col justify-end pb-12 pt-28 md:pb-20">
        <Breadcrumbs items={[
          { title: "Home", href: "/" },
          { title: "Kilimanjaro", href: "/kilimanjaro" },
          { title: "Routes", href: "/kilimanjaro/routes" },
          { title: data.name, href: `/kilimanjaro/routes/${route}` },
        ]} tone="light" />
        <p className="mt-8 text-eyebrow text-gold">{copy.hero.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-heading text-display text-white"><SplitReveal text={copy.hero.h1} /></h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">{subtitle}</p>
        <ul className="mt-6 flex flex-wrap gap-2 text-sm">
          {[data.nickname ?? data.name, daysLabel, data.stay, `Approx. ${data.distanceKm} km`, data.startGate.name].map((item) => <li key={item} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur">{item}</li>)}
        </ul>
        {route === "umbwe" ? <div className="mt-6 max-w-3xl"><UmbweFitCheck /></div> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#packages" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Choose Your Package <ArrowDown aria-hidden="true" size={17} /></a>
          <a href={wa} className="inline-flex min-h-12 items-center rounded-full border border-white/50 px-6 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">WhatsApp Us</a>
        </div>
        <a href="#packages" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-earth/75 px-4 py-2 text-sm font-medium text-white">
          Our recommendation: {recommended.days}-day {data.name}
          <ArrowRight aria-hidden="true" size={15} />
        </a>
      </Container>
    </section>
  );
}

export default function RoutePackagesPage({ route, copy }: { route: RouteSlug; copy: RouteCopy }) {
  const routeData = ROUTES.find((item) => item.slug === route);
  const packages = packagesForRoute(route);
  const recommended = packages.find((pkg) => pkg.recommended) ?? packages[0];
  if (!routeData || !recommended) throw new Error(`Missing Kilimanjaro package data for ${route}`);

  const routeName = routeData.name;
  const pagePath = `/kilimanjaro/routes/${route}`;
  const dayNumbers = packages.map((pkg) => pkg.days).sort((a, b) => a - b);
  const daysLabel = dayNumbers.length > 1
    ? `${dayNumbers.slice(0, -1).join(", ")} or ${dayNumbers[dayNumbers.length - 1]}`
    : String(dayNumbers[0]);
  const faqs = getRouteFaqs(route);
  return (
    <main className="pb-20 md:pb-0">
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${routeName} Kilimanjaro packages`,
        itemListElement: packages.map((pkg, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "TouristTrip",
            name: pkg.name,
            description: pkg.tagline,
            url: `${siteConfig.url}${pagePath}?days=${pkg.days}`,
            itinerary: {
              "@type": "ItemList",
              itemListElement: pkg.dayIds.map((id, dayIndex) => ({
                "@type": "ListItem",
                position: dayIndex + 1,
                name: resolvePackageTitle(pkg, id),
              })),
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              lowPrice: pkg.fromUsd,
              highPrice: pkg.pricing.luxury.peak[1],
              url: `${siteConfig.url}${pagePath}?days=${pkg.days}`,
              availability: "https://schema.org/InStock",
            },
          },
        })),
      }} />

      <RouteHero route={route} copy={copy} />
      <StickySectionNav items={sectionNav} cta={{ label: "Plan My Climb", href: `/book?type=kilimanjaro&route=${route}` }} />

      <Section id="overview" background="cream">
        <Container>
          <SectionHeading eyebrow="THE ROUTE AT A GLANCE" title={`${routeName}, in a few numbers`} />
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Distance", value: <>Approx. <CountUp value={routeData.distanceKm} label="Approximate route distance" /> km</>, Icon: Compass },
                { label: "Start gate", value: `${routeData.startGate.name}, ${routeData.startGate.altitudeM.toLocaleString("en-US")} m`, Icon: ArrowRight },
                { label: "Stay", value: routeData.stay, Icon: Tent },
                { label: "Typical summit success", value: routeData.successLabel, Icon: Check },
                { label: "Descent route", value: routeData.descent, Icon: Mountain },
                { label: "Best season", value: routeData.bestSeason, Icon: ShieldCheck },
              ].map(({ label, value, Icon }) => (
                <article key={label} className="rounded-2xl border border-sand bg-white p-5 shadow-card">
                  <Icon aria-hidden="true" className="size-5 text-terracotta" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
                  <p className="mt-1 leading-6 text-earth">{value}</p>
                </article>
              ))}
            </div>
            <div className="rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
              <h3 className="font-heading text-2xl text-earth">Route profile</h3>
              <div className="mt-4"><RouteStatBars route={routeData} /></div>
              <h4 className="mt-7 font-heading text-xl text-earth">Altitude profile: recommended {recommended.days}-day climb</h4>
              <AltitudeProfile profile={profileOf(recommended)} routeName={`${routeName} ${recommended.days}-day package`} compact />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="story" background="forest" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <p className="text-eyebrow text-gold">{copy.story.eyebrow}</p>
              <h2 className="mt-4 font-heading text-h2 text-white">{copy.story.heading}</h2>
              <div className="mt-6 max-w-[68ch] space-y-4 text-base leading-7 text-cream/85">
                {copy.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {copy.whyChoose.map((item) => <li key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4"><h3 className="font-semibold text-gold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-cream/80">{item.text}</p></li>)}
              </ul>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4"><h3 className="font-semibold text-white">Best for</h3><p className="mt-2 text-sm leading-6 text-cream/80">{routeData.bestFor.join(", ")}</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><h3 className="font-semibold text-white">Think twice if</h3><p className="mt-2 text-sm leading-6 text-cream/80">{routeData.thinkTwice.join(", ")}</p></div>
              </div>
            </div>
            <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-earth">
              <Parallax className="absolute inset-0" range={["-3%", "4%"]}>
                <SmartImage src={`${routeImages(route)}/story.jpg`} alt={copy.hero.imageAlt} sizes="(max-width: 1024px) 100vw, 45vw" fill className="object-cover" />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </Container>
      </Section>

      {route === "rongai" ? <Section id="rain-shadow" background="cream"><Container><RainShadowPanel /></Container></Section> : null}
      {route === "northern-circuit" ? <Section id="circuit-map" background="cream"><Container><CircuitMap /></Container></Section> : null}

      <Section id="packages" background="cream" className="scroll-mt-32">
        <Container>
          <SectionHeading eyebrow="YOUR CLIMB, YOUR WAY" title={`Choose Your ${routeName} Package`} subtitle="Pick the number of days, then the level of comfort. See the full explained itinerary and your price instantly." />
          {route === "umbwe" ? <div className="mb-6"><UmbweFitCheck /></div> : null}
          <Suspense fallback={<div role="status" className="min-h-96 animate-pulse rounded-3xl bg-sand motion-reduce:animate-none">Loading climb packages…</div>}>
            <PackageExplorer route={route} packages={packages} routeName={routeName} whatsappHref={siteConfig.whatsappUrl} />
          </Suspense>
        </Container>
      </Section>

      <Section id="itinerary" background="sand">
        <Container>
          <SectionHeading eyebrow="THE JOURNEY" title="What Each Day on the Mountain Feels Like" subtitle="Select a package above to explore every day's route, pace, altitude, meals and notes." />
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((pkg) => (
              <Link key={pkg.slug} href={`${pagePath}?days=${pkg.days}#packages`} className="rounded-2xl border border-white bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
                <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">{pkg.days} days | {pkg.pace} pace</p>
                <h3 className="mt-2 font-heading text-xl text-earth">{pkg.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{pkg.tagline}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta">Explore itinerary <ArrowRight aria-hidden="true" size={16} /></span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="mid-vs-luxury" background="forest">
        <Container>
          <SectionHeading
            eyebrow="COMFORT ON THE MOUNTAIN"
            title="Mid-range or Luxury? What the Difference Really Is"
            subtitle="Both levels reach the same summit with the same park fees and the same route. The difference is how you live on the mountain: space, warmth, rest, and how much personal attention you get on the hardest night."
            tone="light"
          />
          <TierCompare route={route} />
          <Callout className="mt-8 border-gold/40 bg-gold/10 text-cream" variant="tip">
            Not sure? Choose Mid-range on a longer route. An extra day on the mountain does more for your summit chances than any upgrade. If comfort matters to you as much as the summit, choose Luxury.
          </Callout>
        </Container>
      </Section>

      <Section id="lengths" background="cream">
        <Container>
          <SectionHeading eyebrow="PLAN YOUR PACE" title={`${daysLabel} Days: Which Is Right for You?`} />
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.slug} className="relative rounded-3xl border border-sand bg-white p-6 shadow-card">
                {pkg.recommended ? <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-earth">Recommended</span> : null}
                <p className="text-eyebrow text-terracotta">{pkg.days} days</p>
                <h3 className="mt-3 font-heading text-2xl text-earth">{pkg.pace} pace</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{pkg.successNote}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">{pkg.bestFor.map((item) => <li key={item} className="flex gap-2"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-terracotta" />{item}</li>)}</ul>
                <p className="mt-5 border-t border-sand pt-4 text-sm font-semibold text-earth">From {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(pkg.fromUsd)} per person</p>
                <Link href={`${pagePath}?days=${pkg.days}#packages`} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">Choose {pkg.days} days <ArrowRight aria-hidden="true" size={16} /></Link>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-sand/60 p-5 sm:p-8">
            <h3 className="font-heading text-2xl text-earth">Published success figures by days on the mountain</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Older published figures for all routes. They illustrate the relationship between more time and reported summit success, not a guarantee for an individual climb.</p>
            <div className="mt-5"><DaysChart /></div>
          </div>
          <Callout className="mt-6" variant="tip">
            {route === "northern-circuit" ? "Our advice: nine days is the classic. Choose ten if you want an additional rest day at Moir." : null}
            {route === "rongai" ? "Our advice: choose seven days at the least, or eight for the most gradual profile." : null}
            {route === "umbwe" ? "Our advice: choose seven days at the least. Eight adds another rest day for a more careful climb." : null}
            {route !== "northern-circuit" && route !== "rongai" && route !== "umbwe" ? "Our advice: seven days at the least, eight if you can." : null}
          </Callout>
        </Container>
      </Section>

      <Section id="when-to-climb" background="forest">
        <Container>
          <SectionHeading eyebrow="SEASONS ON THE MOUNTAIN" title="When to Climb" subtitle={copy.seasonNote} tone="light" />
          <div className="grid gap-4 md:grid-cols-2">
            {SEASONS.map((season) => <article key={season.id} className="rounded-2xl border border-white/15 bg-white/5 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-gold">{season.label}</p><p className="mt-2 leading-6 text-cream/85">{season.text}</p></article>)}
          </div>
          <div className="mt-8 grid grid-cols-6 gap-2 sm:grid-cols-12">
            {MONTH_LEVELS.map(({ m, level }) => <div key={m} className="rounded-xl border border-white/15 bg-white/5 p-2 text-center">
              <span className="block text-xs font-semibold text-white">{m}</span>
              <span className={`mt-2 block h-2 rounded-full ${level === "best" ? "bg-gold" : level === "good" ? "bg-lime-300" : "bg-sky-300"}`} aria-label={level} />
            </div>)}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(["peak", "green"] as const).map((seasonKey) => <article key={seasonKey} className="rounded-2xl border border-white/15 bg-white/5 p-5"><h3 className="font-semibold text-white">{SEASON_LABELS[seasonKey].name}</h3><p className="mt-2 text-sm leading-6 text-cream/80">{SEASON_LABELS[seasonKey].when}. {SEASON_LABELS[seasonKey].note}</p></article>)}
          </div>
          <p className="mt-5 text-sm text-cream/80">Green season prices are about 8 percent lower.</p>
        </Container>
      </Section>

      <Section id="safety" background="cream">
        <Container>
          <SectionHeading eyebrow="PREPARATION AND SAFETY" title="A Better Climb Starts Before the Trailhead" />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Train", text: "Build steady cardiovascular fitness and spend time walking on hills with a pack.", Icon: Users },
              { title: "Acclimatise", text: "Allow enough days on the mountain and walk slowly. Altitude affects people differently.", Icon: Mountain },
              { title: "Pack", text: "Layer for changing temperatures, wind and cold, and check your gear before departure.", Icon: Tent },
              { title: "Stay safe", text: "Discuss your health and route plan before travel. Follow professional medical advice and the mountain team's instructions.", Icon: ShieldCheck },
            ].map(({ title, text, Icon }) => <StaggerItem key={title} className="rounded-2xl border border-sand bg-white p-5 shadow-card"><Icon aria-hidden="true" className="size-6 text-terracotta" /><h3 className="mt-4 font-heading text-xl text-earth">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></StaggerItem>)}
          </StaggerGroup>
          <div className="mt-8 rounded-3xl border border-terracotta/20 bg-sand/50 p-6">
            <p className="leading-7 text-earth">Altitude sickness can affect anyone above about 2,500 m, whatever their fitness. Choose an itinerary with time to adapt, and discuss altitude and emergency arrangements with your climb provider before booking. Serious symptoms mean going down immediately.</p>
            <p className="mt-3 text-sm text-muted">General information, not medical advice. Please speak to your doctor before booking.</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/kilimanjaro#fitness" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">Training and fitness <ArrowRight aria-hidden="true" size={16} /></Link>
            <Link href="/kilimanjaro#safety" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">Kilimanjaro safety <ArrowRight aria-hidden="true" size={16} /></Link>
            <Link href="/kilimanjaro#gear" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">Gear checklist <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </Container>
      </Section>

      <Section id="booking" background="sand">
        <Container>
          <SectionHeading eyebrow="FROM ENQUIRY TO SUMMIT" title="How Booking Works" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Tell us your dates and group",
              "We confirm your route, length and comfort level",
              "Secure your dates with a deposit",
              "Pre-trip briefing, then climb",
            ].map((step, index) => <article key={step} className="relative rounded-2xl border border-white bg-white p-5 shadow-card"><p className="font-heading text-4xl text-gold">0{index + 1}</p><h3 className="mt-3 font-semibold leading-6 text-earth">{step}</h3></article>)}
          </div>
          <p className="mt-6 rounded-2xl bg-white p-5 text-center leading-7 text-muted">Your written quote confirms every price, inclusion and detail before you pay anything.</p>
        </Container>
      </Section>

      <Section id="faqs" background="cream">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-eyebrow text-terracotta">GOOD TO KNOW</p>
            <h2 className="mt-3 font-heading text-h2 text-earth">Questions About the {routeName} Route?</h2>
            <p className="mt-4 leading-7 text-muted">Explore the common questions climbers ask before choosing a Kilimanjaro package.</p>
          </div>
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      <Section id="other-routes" background="sand">
        <Container>
          <SectionHeading eyebrow="COMPARE YOUR OPTIONS" title="Other Ways Up Kilimanjaro" />
          <div className="grid gap-4 md:grid-cols-3">
            {ROUTES.filter((item) => item.slug !== route).map((item) => {
              const href = `/kilimanjaro/routes/${item.slug}`;
              return <Link key={item.slug} href={href} className="rounded-2xl border border-white bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"><p className="text-xs font-semibold uppercase tracking-wider text-terracotta">{item.badge}</p><h3 className="mt-2 font-heading text-2xl text-earth">{item.name}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.hook}</p><span className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta">Compare packages <ArrowRight aria-hidden="true" size={16} /></span></Link>;
            })}
          </div>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="YOUR NEXT STEP"
        title="Ready to Stand on the Roof of Africa?"
        description={`Tell us your dates and we will confirm the best ${routeName} package for you.`}
        image={{ src: `${routeImages(route)}/hero-sky.jpg`, alt: copy.hero.imageAlt }}
        primaryCta={{ label: "Request a Quote", href: `/book?type=kilimanjaro&route=${route}` }}
        secondaryCta={{ label: "WhatsApp Us", href: siteConfig.whatsappUrlWithMessage(`Hello She Roars, I would like a quote for the ${routeName} route.`) }}
      />
      <Container className="py-10">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/kilimanjaro" className="font-semibold text-terracotta underline">Kilimanjaro</Link>
          <Link href="/kilimanjaro/routes" className="font-semibold text-terracotta underline">Kilimanjaro routes</Link>
          <Link href="/safaris/packages" className="font-semibold text-terracotta underline">Safari</Link>
          <Link href="/zanzibar" className="font-semibold text-terracotta underline">Zanzibar</Link>
          <Link href="/plan-your-safari" className="font-semibold text-terracotta underline">Plan your safari</Link>
        </div>
      </Container>
    </main>
  );
}

function resolvePackageTitle(pkg: KiliPackage, id: string) {
  return DAY_LIBRARY[id]?.title ?? `${pkg.name} day ${id}`;
}
