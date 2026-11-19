import Link from "next/link";
import { ArrowRight, CloudSun, Compass, Footprints, Mountain, ShieldCheck, Sunrise, Users } from "lucide-react";
import { StickySectionNav } from "@/components/destinations/Interactive";
import Callout from "@/components/inner/Callout";
import CtaBanner from "@/components/inner/CtaBanner";
import FeeBreakdown from "@/components/kilimanjaro/FeeBreakdown";
import FaqAccordion from "@/components/inner/FaqAccordion";
import GearChecklist from "@/components/kilimanjaro/GearChecklist";
import KilimanjaroHero from "@/components/kilimanjaro/KilimanjaroHero";
import MountainZones from "@/components/kilimanjaro/MountainZones";
import RelatedLinks from "@/components/inner/RelatedLinks";
import RouteStatBars from "@/components/kilimanjaro/RouteStatBars";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import CountUp from "@/components/motion/CountUp";
import Parallax from "@/components/motion/Parallax";
import StatTiles from "@/components/inner/StatTiles";
import SummitNightTimeline from "@/components/kilimanjaro/SummitNightTimeline";
import { HUB_FAQS, KILI_FACTS, MONTH_LEVELS, ROUTES, SEASONS } from "@/data/kilimanjaro";
import { packagesForRoute } from "@/data/kilimanjaro-packages";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Climb Mount Kilimanjaro | She Roars Africa Safari",
  description: "Plan your Kilimanjaro climb with a women-led Tanzanian team. Compare routes, seasons, costs and practical guidance for Uhuru Peak.",
  path: "/kilimanjaro",
  image: "/images/kilimanjaro/hero-sky.jpg",
});

const nav = [
  { id: "overview", label: "Overview" }, { id: "zones", label: "Zones" }, { id: "routes", label: "Routes" },
  { id: "summit-night", label: "Summit Night" }, { id: "when-to-climb", label: "When to Climb" },
  { id: "fitness", label: "Fitness" }, { id: "safety", label: "Safety" }, { id: "cost", label: "Cost" },
  { id: "gear", label: "Gear" }, { id: "combine", label: "Combine" }, { id: "faqs", label: "FAQs" },
];

const facts = [
  { value: 5895, suffix: " m", label: "Uhuru Peak, the highest point in Africa", Icon: Mountain },
  { value: 4800, suffix: " m", label: "Rises about 4,800 m above the surrounding plains", Icon: CloudSun },
  { value: 3, suffix: "", label: "Volcanic cones: Kibo, Mawenzi and Shira, all extinct or dormant", Icon: Compass },
  { value: 5, suffix: "", label: "Climate zones from farmland to glacier", Icon: Footprints },
  { value: 1889, suffix: "", label: "First recorded summit, guided by Yohani Lauwo", Icon: Sunrise },
];

const reasons = [
  { title: "Free-standing giant", text: "A vast volcanic mountain that rises dramatically above the surrounding plains." },
  { title: "Five ecosystems in one climb", text: "Walk from warm cultivated foothills to a cold, high-altitude summit." },
  { title: "Open to everyday adventurers", text: "No technical climbing skills are needed, but altitude, preparation and patience matter." },
];

const routePreview = ROUTES.map((route) => {
  const packages = packagesForRoute(route.slug);
  const days = packages.map((pkg) => pkg.days);
  const daysLabel = days.length > 1
    ? `${days.slice(0, -1).join(", ")} and ${days[days.length - 1]}`
    : String(days[0]);
  return {
    route,
    fromUsd: Math.min(...packages.map((pkg) => pkg.fromUsd)),
    daysLabel,
  };
});
const pillars = [
  { title: "Women-led, welcoming to everyone", text: "Our company is led by women and welcomes climbers of every gender, age and background.", Icon: Users },
  { title: "Plan for altitude", text: "Compare route length and acclimatisation time before choosing your climb.", Icon: ShieldCheck },
  { title: "Pole pole pacing", text: "A steady pace and enough time on the mountain help make the journey more manageable.", Icon: Footprints },
  { title: "Mountain crews matter", text: "Guides, cooks and porters are central to every climb. Ask us how crew roles and tipping are arranged.", Icon: Users },
  { title: "A route for your priorities", text: "Choose between quieter trails, tent or hut accommodation, and different summit itineraries.", Icon: Compass },
  { title: "Know what the climb includes", text: "Review park-fee guidance and the listed inclusions before requesting a tailored itinerary.", Icon: ShieldCheck },
];

const included = [
  "Kilimanjaro National Park fees",
  "Mountain guides, assistant guides, porters and cook",
  "Meals and safe drinking water on the mountain",
  "Tents, mattresses, mess tent, toilet tent and camp equipment",
  "Airport transfers and hotel nights as listed on each package",
  "Pre-climb briefing and gear check",
];
const excluded = ["International flights", "Tanzania visa", "Travel and medical insurance", "Personal gear (rental may be available)", "Tips for the mountain crew", "Extra hotel nights, personal expenses and drinks"];

const combinedTrips = [
  { title: "Kilimanjaro plus Safari", href: "/safaris/packages", image: "/images/kilimanjaro/combine-safari.webp", alt: "Safari vehicle looking across the open Tanzanian plains", text: "Trade boots for a safari vehicle and see the wildlife of the northern circuit." },
  { title: "Kilimanjaro plus Zanzibar", href: "/zanzibar", image: "/images/kilimanjaro/combine-zanzibar.jpg", alt: "Zanzibar shoreline after a Kilimanjaro climb", text: "Rest your legs on white sand after the summit." },
  { title: "Kilimanjaro plus Serengeti", href: "/safaris/serengeti", image: "/images/kilimanjaro/combine-serengeti.jpg", alt: "Serengeti plains beneath a wide sky", text: "From the highest point in Africa to the Great Migration." },
];

export default function KilimanjaroPage() {
  return (
    <main>
      <KilimanjaroHero />
      <StickySectionNav items={nav} cta={{ label: "Plan My Climb", href: "/plan-your-safari" }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Mountain",
        name: "Mount Kilimanjaro",
        description: "Mount Kilimanjaro, Tanzania's high volcanic mountain and the location of Uhuru Peak, the highest point in Africa.",
        geo: { "@type": "GeoCoordinates", latitude: KILI_FACTS.coords.lat, longitude: KILI_FACTS.coords.lng },
        containedInPlace: { "@type": "Country", name: "Tanzania" },
      }} />

      <Section id="facts" background="cream" className="py-12 md:py-16">
        <Container>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map(({ value, suffix, label, Icon }) => (
              <div key={label} className="rounded-2xl border border-sand bg-white p-5 text-center shadow-card">
                <Icon aria-hidden="true" className="mx-auto size-6 text-terracotta" />
                <dt className="sr-only">{label}</dt>
                <dd className="mt-2 font-heading text-3xl text-earth"><CountUp value={value} label={label} />{suffix}</dd>
                <p className="mt-2 text-sm leading-5 text-muted">{label}</p>
              </div>
            ))}
          </dl>
          <Callout className="mt-7" variant="tip">The world&apos;s tallest free-standing mountain. No ropes, no ice axes, no technical skills: just time, patience and a very good team.</Callout>
        </Container>
      </Section>

      <Section id="overview" background="cream">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="The Mountain" title="A Mountain That Changes the Way You See Everything" align="left" />
              <div className="max-w-prose space-y-4 leading-7 text-muted">
                <p>Kilimanjaro does not rise from foothills. It rises from the plains of Tanzania like a single, impossible idea: a vast, snow-capped volcano floating above the heat of the savanna, almost five kilometres taller than the grass at its feet. Locals have watched it for centuries. Climbers have been drawn to it since 1889, when Hans Meyer and Ludwig Purtscheller reached the summit, guided by a young Chagga man named Yohani Lauwo.</p>
                <p>What makes this mountain extraordinary is not only the height. It is the journey. In a single week you walk out of warm farmland, through dripping cloud forest, across heather and giant lobelias, over a moonlit alpine desert, and finally onto the frozen rim of a crater at sunrise. Few places on Earth compress so many worlds into so few days.</p>
                <p>And you do not need to be a mountaineer. Kilimanjaro is a walk, not a technical climb. What it asks for is respect for altitude: a sensible route, enough days, a steady pace and a team that watches over you. That is exactly what we build every climb around.</p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {reasons.map(({ title, text }) => <article key={title} className="rounded-2xl bg-sand/60 p-4"><h3 className="font-heading text-lg text-earth">{title}</h3><p className="mt-2 text-sm leading-5 text-muted">{text}</p></article>)}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Parallax className="absolute inset-0" range={["-3%", "3%"]}>
                  <SmartImage src="/images/kilimanjaro/overview-main.jpg" alt="Mount Kilimanjaro rising above the Tanzanian plains at sunrise" sizes="(max-width: 1024px) 100vw, 50vw" fill className="object-cover" />
                </Parallax>
              </div>
              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-sand bg-white/95 p-5 shadow-card sm:left-auto sm:right-[-1rem] sm:max-w-xs">
                <p className="font-heading text-xl text-earth">Walk pole pole.</p>
                <p className="mt-1 text-sm leading-6 text-muted">In Swahili it means slowly, slowly, and it is the secret to the summit.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="zones" background="forest" className="overflow-hidden">
        <Container>
          <SectionHeading eyebrow="The Ascent" title="Five Worlds, One Mountain" subtitle="Scroll to climb from the farms at the foot of Kilimanjaro to the glaciers at the top." tone="light" />
          <MountainZones />
          <Callout className="mt-12 border-gold/40 bg-gold/15 text-cream" variant="tip">Altitude, not fitness, is the real challenge. That is why we recommend longer routes, with more days to adapt.</Callout>
        </Container>
      </Section>

      <Section id="routes" background="cream">
        <Container>
          <SectionHeading eyebrow="Choose Your Path" title="Six Classic Routes. One Right Choice for You." subtitle="Every route reaches the same summit. The difference is scenery, crowds, comfort and, most importantly, how many days your body gets to adapt." />
          <div className="grid gap-6 lg:grid-cols-3">
            {routePreview.map(({ route, fromUsd, daysLabel }) => (
              <article key={route.slug} className="group overflow-hidden rounded-3xl border border-sand bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage src={`/images/kilimanjaro/route-${route.slug}.jpg`} alt={`${route.name} route crossing a Kilimanjaro landscape`} sizes="(max-width: 1024px) 100vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
                  <span className="absolute left-4 top-4 rounded-full bg-earth/80 px-3 py-1 text-xs font-semibold text-white">{route.days.recommended} days</span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3"><h3 className="font-heading text-2xl text-earth">{route.name}</h3><span className="rounded-full bg-sand px-3 py-1 text-xs text-earth">{route.badge}</span></div>
                  <p className="mt-3 min-h-14 text-sm leading-6 text-muted">{route.hook}</p>
                  <RouteStatBars route={route} />
                  <p className="mt-3 text-sm font-semibold text-earth">{daysLabel} day packages from ${fromUsd.toLocaleString("en-US")} per person</p>
                  <Link href={`/kilimanjaro/routes/${route.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">See the route <ArrowRight aria-hidden="true" size={16} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {ROUTES.map((route) => <Link key={route.slug} href={`/kilimanjaro/routes/${route.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-sand bg-white px-4 text-sm font-semibold text-earth hover:border-gold">{route.name}</Link>)}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/kilimanjaro/routes" className="inline-flex min-h-12 items-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-hover">Compare All Routes</Link>
            <Link href="/kilimanjaro/routes#route-finder" className="inline-flex min-h-12 items-center rounded-full border border-terracotta px-6 font-semibold text-terracotta hover:bg-terracotta/10">Help me choose</Link>
          </div>
        </Container>
      </Section>

      <Section id="why-us" background="sand">
        <Container>
          <SectionHeading eyebrow="Our Way Up" title="Climb With a Team That Walks Beside You" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ title, text, Icon }) => <article key={title} className="rounded-3xl border border-white bg-white p-6 shadow-card"><Icon aria-hidden="true" className="size-7 text-terracotta" /><h3 className="mt-4 font-heading text-xl text-earth">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></article>)}
          </div>
          {/* TODO(CONFIRM): verify guide qualifications, first-aid training and routine health-check practices before making specific operational claims. */}
          {/* TODO(CONFIRM): verify crew wage and welfare commitments before describing them as a company guarantee. */}
        </Container>
      </Section>

      <Section id="summit-night" background="forest" className="relative">
        <Container>
          <SectionHeading eyebrow="The Push" title="Summit Night: Midnight to Sunrise" subtitle="Every route ends the same way: a long, quiet, star-lit climb in the dark. It is cold, it is slow and it is the most memorable few hours of your life." tone="light" />
          <SummitNightTimeline />
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-cream/75">Timings vary by route and pace. Summit night usually involves 6 to 8 hours up and 3 to 5 hours down, with the day finishing at a much lower camp.</p>
          <Callout className="mx-auto mt-5 max-w-3xl border-white/15 bg-white/5 text-cream" variant="safety">Summit decisions should be made with the guide team. If conditions or health say turn around, turn around.</Callout>
        </Container>
      </Section>

      <Section id="when-to-climb" background="cream">
        <Container>
          <SectionHeading eyebrow="Timing" title="The Best Time to Climb Kilimanjaro" subtitle="Kilimanjaro can be climbed all year, but the mountain has moods. Plan around the drier seasons for the clearest skies and the most comfortable trails." />
          <div className="grid gap-4 sm:grid-cols-2">
            {SEASONS.map((season) => <article key={season.id} className="rounded-3xl border border-sand bg-white p-6 shadow-card"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">{season.level === "best" ? "Drier window" : season.level === "wet" ? "Rainier window" : "Mixed conditions"}</p><h3 className="mt-2 font-heading text-2xl text-earth">{season.label}</h3><p className="mt-3 text-sm leading-6 text-muted">{season.text}</p></article>)}
          </div>
          <div className="mt-8 rounded-3xl border border-sand bg-white p-5 sm:p-7">
            <h3 className="font-heading text-2xl text-earth">Kilimanjaro by month</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
              {MONTH_LEVELS.map(({ m, level }) => <details key={m} className="group">
                <summary className={`flex min-h-12 cursor-pointer list-none items-center justify-center rounded-xl text-sm font-semibold text-earth marker:hidden [&::-webkit-details-marker]:hidden ${level === "best" ? "bg-forest/15" : level === "good" ? "bg-gold/30" : "bg-sand"}`} title={`${m}: ${level === "best" ? "Best conditions" : level === "good" ? "Good with showers" : "Wet season"}`}>{m}</summary>
                <p className="mt-1 text-center text-xs text-muted">{level === "best" ? "Drier" : level === "good" ? "Showers" : "Wet"}</p>
              </details>)}
            </div>
            <p className="mt-4 text-xs text-muted">Legend: Drier conditions | Good with showers | Wet season. Rongai, on the drier northern side, is a common option in wetter months.</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Callout variant="tip" title="Full moon climbs">Some climbers time their summit night for a full moon. Moonlight can light the trail and make the glaciers glow. Ask us about full moon departures.</Callout>
            <Callout variant="note">Rongai, on the drier northern side, is often preferred during wetter months.</Callout>
          </div>
        </Container>
      </Section>

      <Section id="fitness" background="sand">
        <Container>
          <SectionHeading eyebrow="Preparation" title="How Fit Do You Need to Be?" subtitle="You do not need to be an athlete. You need to be comfortably able to walk uphill for many hours on consecutive days. Good general fitness plus a steady training plan makes the climb enjoyable instead of exhausting." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Walk", "Build up to 4 to 6 hour hikes on weekends with a loaded daypack."],
              ["Climb", "Add hills, stairs or incline walking two or three times a week."],
              ["Strengthen", "Legs, core and back twice a week: squats, lunges, step-ups, planks."],
              ["Practise", "Wear your boots and clothing on long hikes so nothing surprises you on the mountain."],
            ].map(([title, text], index) => <article key={title} className="rounded-3xl bg-white p-6 shadow-card"><p className="font-heading text-5xl text-gold">0{index + 1}</p><h3 className="mt-3 font-heading text-2xl text-earth">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></article>)}
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-muted">Start training about 8 to 12 weeks before your climb. If you are new to exercise, allow more time and speak to your doctor first.</p>
          <div className="mt-4 flex flex-wrap gap-2">{["Breathing practice", "Hydration habit", "Sleep well", "Practise pole pole"].map((tip) => <span key={tip} className="rounded-full border border-terracotta/20 bg-white px-4 py-2 text-sm text-earth">{tip}</span>)}</div>
        </Container>
      </Section>

      <Section id="safety" background="forest">
        <Container>
          <SectionHeading eyebrow="Stay Well" title="Altitude, Safety and Peace of Mind" tone="light" />
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-6 sm:p-8">
              <h3 className="font-heading text-2xl text-cream">Understanding altitude sickness</h3>
              <p className="mt-4 leading-7 text-cream/80">Altitude sickness (acute mountain sickness, or AMS) can affect anyone above about 2,500 m, whatever their fitness. Mild symptoms include headache, nausea, tiredness and loss of appetite. Serious symptoms such as confusion, loss of balance or breathlessness at rest are emergencies and mean going down immediately.</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-cream/80">
                {["Choose a longer route with built-in acclimatisation", "Climb high and sleep low where the route allows", "Walk slowly and drink plenty of water", "Keep track of how you feel each day", "Speak up early about any symptoms"].map((item) => <li key={item} className="flex gap-3"><ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}
              </ul>
            </div>
            <div>
              <Callout variant="safety" title="Safety checklist">Please speak to your doctor before booking, and make sure your travel insurance covers trekking to 6,000 m and emergency evacuation.</Callout>
              <p className="mt-5 text-sm text-cream/65">This guide is general information, not medical advice.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="cost" background="cream">
        <Container>
          <SectionHeading eyebrow="The Investment" title="What a Kilimanjaro Climb Really Costs" subtitle="A responsible climb is built from park fees, crew wages, food, equipment and logistics. Park fees alone are a large part of the price, and they are set by the national park, not by us." />
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <FeeBreakdown />
            <div className="rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-heading text-2xl text-earth">What is included in our climbs</h3>
              <h4 className="mt-5 font-semibold text-earth">Included</h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">{included.map((item) => <li key={item} className="flex gap-2"><span className="text-terracotta">✓</span>{item}</li>)}</ul>
              <h4 className="mt-6 font-semibold text-earth">Not included</h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">{excluded.map((item) => <li key={item} className="flex gap-2"><span className="text-terracotta">•</span>{item}</li>)}</ul>
            </div>
          </div>
          {/* TODO(CONFIRM): verify the 2026 to 2027 park-fee schedule and itinerary totals before launch. */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-terracotta">Typical market ranges, not our prices</p>
            <StatTiles className="lg:grid-cols-3" items={[
              { value: "$2,000 to $6,000", label: "Typical quality climb costs per person, depending on days, route and comfort." },
              { value: "$200 to $300", label: "Typical additional cost for each extra day on the mountain." },
              { value: "$250 to $350", label: "Typical crew tips per climber, pooled and shared." },
            ]} />
          </div>
          <Callout className="mt-7" variant="warning">Be cautious of very cheap climbs. Prices far below park fees plus fair crew wages may mean important parts of the trip are being cut.</Callout>
          <Link href="/plan-your-safari?type=Kilimanjaro" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-hover">Request a Kilimanjaro Quote</Link>
        </Container>
      </Section>

      <Section id="gear" background="sand">
        <Container>
          <SectionHeading eyebrow="Pack Smart" title="What to Pack for the Roof of Africa" />
          <GearChecklist />
        </Container>
      </Section>

      <Section id="combine" background="forest">
        <Container>
          <SectionHeading eyebrow="More to Explore" title="Climb, Then Celebrate" subtitle="Pair your summit with a safari or a beach and make the most of your journey to Tanzania." tone="light" />
          <div className="grid gap-5 lg:grid-cols-3">
            {combinedTrips.map((trip) => <Link key={trip.href} href={trip.href} className="group overflow-hidden rounded-3xl border border-white/15 bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <div className="relative aspect-[16/10] overflow-hidden"><SmartImage src={trip.image} alt={trip.alt} sizes="(max-width: 1024px) 100vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="p-5"><h3 className="font-heading text-2xl text-cream">{trip.title}</h3><p className="mt-2 text-sm leading-6 text-cream/75">{trip.text}</p><span className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">Explore <ArrowRight aria-hidden="true" size={16} /></span></div>
            </Link>)}
          </div>
          <p className="mt-6 text-sm text-cream/75">Most climbers do the climb first, then relax with a safari or beach.</p>
        </Container>
      </Section>

      <Section id="faqs" background="cream">
        <Container>
          <SectionHeading eyebrow="Good to Know" title="Kilimanjaro Climb FAQs" />
          <FaqAccordion items={HUB_FAQS.map(({ q, a }) => ({ question: q, answer: a }))} jsonLd />
        </Container>
      </Section>

      <RelatedLinks title="Keep Planning Your Tanzania Journey" limit={6} items={[
        { title: "Kilimanjaro routes", href: "/kilimanjaro/routes", description: "Compare the six classic approaches to Uhuru Peak." },
        { title: "Safari packages", href: "/safaris/packages", description: "Browse safari journeys across Tanzania." },
        { title: "Serengeti", href: "/safaris/serengeti", description: "Explore the Serengeti's wildlife, regions and seasons." },
        { title: "Zanzibar", href: "/zanzibar", description: "Add time on the coast after your climb." },
        { title: "Plan your safari", href: "/plan-your-safari", description: "Tell us what you have in mind for Tanzania." },
        { title: "Kilimanjaro climbing guide", href: "/kilimanjaro/guide", description: "Read practical guides to preparation and the mountain." },
      ]} />
      <CtaBanner eyebrow="Your Next Step" title="Your Summit Is Waiting" description="Tell us your dates, fitness and dreams. We will recommend the right route and send you a clear, honest quote." image={{ src: "/images/kilimanjaro/cta-bg.jpg", alt: "Kilimanjaro summit in dramatic high-altitude light" }} primaryCta={{ label: "Plan My Climb", href: "/plan-your-safari" }} secondaryCta={{ label: "WhatsApp Us", href: siteConfig.whatsappUrlWithMessage("Hello She Roars, I would like help planning a Kilimanjaro climb.") }} trustChips={["Women-led", "Clear park-fee guidance", "Six routes compared", "Personalised planning"]} />
    </main>
  );
}
