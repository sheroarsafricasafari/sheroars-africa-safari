import Link from "next/link";
import { ArrowRight, Check, Clock3, ExternalLink, ShieldCheck, Sunrise } from "lucide-react";
import Callout from "@/components/inner/Callout";
import FaqAccordion from "@/components/inner/FaqAccordion";
import { DestinationSection } from "@/components/destinations/Layouts";
import BalloonRegionExplorer, { BalloonSeasonChart } from "@/components/destinations/balloon/BalloonRegionExplorer";
import SerengetiGuideLayout from "@/components/destinations/SerengetiGuideLayout";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { balloonFaqs, balloonFacts, balloonGallery, balloonHero, balloonPlanningSteps, balloonPreparation, balloonStages, balloonSuitability } from "@/data/destinations/serengeti-hot-air-balloon";
import { siteConfig } from "@/data/site";

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Serengeti", href: "/safaris/serengeti" },
  { title: "Hot-Air Balloon Safari", href: "/safaris/serengeti/hot-air-balloon" },
];

const nav = [
  { id: "experience", label: "Experience" },
  { id: "facts", label: "At a Glance" },
  { id: "launch-areas", label: "Launch Areas" },
  { id: "morning", label: "The Morning" },
  { id: "sky", label: "What You May See" },
  { id: "season", label: "Season" },
  { id: "suitability", label: "Who Can Fly" },
  { id: "safety", label: "Safety" },
  { id: "prepare", label: "What to Bring" },
  { id: "breakfast", label: "Breakfast" },
  { id: "cost", label: "Cost" },
  { id: "planning", label: "Planning" },
  { id: "faq", label: "FAQ" },
];

const related = [
  { title: "Central Serengeti", href: "/safaris/serengeti/central-seronera", description: "Explore Seronera and its central Serengeti landscape." },
  { title: "Southern Serengeti and Ndutu", href: "/safaris/serengeti/southern-ndutu", description: "Learn about the southern plains and seasonal calving period." },
  { title: "Northern Serengeti", href: "/safaris/serengeti/northern-serengeti", description: "Discover the northern region and Mara River country." },
  { title: "Western Corridor", href: "/safaris/serengeti/western-corridor", description: "Explore Grumeti and the western Serengeti." },
  { title: "Great Migration", href: "/safaris/serengeti/great-migration", description: "Follow the broad seasonal movement across the ecosystem." },
  { title: "Where to Stay", href: "/safaris/serengeti/where-to-stay", description: "Compare accommodation styles and Serengeti regions." },
  { title: "Safari Packages", href: "/safaris/packages", description: "Browse safari journeys or request a tailor-made itinerary." },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Serengeti Hot Air Balloon Safari | Sunrise Balloon Experience",
  description: "Experience the Serengeti from above on a sunrise hot air balloon safari. Discover what happens during the flight, seasonal launch areas, the Great Migration, bush breakfasts and how to plan your adventure.",
  url: new URL("/safaris/serengeti/hot-air-balloon", siteConfig.url).toString(),
};

const tcaaCircularUrl = "https://www.tcaa.go.tz/aic-documents/126";

const possibleInclusions = [
  "Pick-up from the accommodation",
  "Transfer to the launch area",
  "Safety briefing",
  "Balloon flight",
  "Landing celebration",
  "Bush breakfast",
  "Return transfer or connection with the ground safari",
];

const costItems = [
  "Park entry fees",
  "Additional transfers",
  "Beverages",
  "Photography services",
  "Private basket arrangements",
  "Passenger supplements",
  "Cancellation charges",
];

// TODO(CONFIRM): check the current text of TCAA AIC 21 of 2026 and applicable regulations before publishing any detailed legal or compliance statement.
export default function HotAirBalloonPage() {
  return (
    <SerengetiGuideLayout
      hero={balloonHero}
      breadcrumbs={breadcrumbs}
      nav={nav}
      relatedTitle="Explore More Serengeti Experiences"
      related={related}
      cta={{
        eyebrow: "A DIFFERENT VIEW OF THE WILD",
        title: "See the Serengeti in a Whole New Light",
        description: "From the first glow of sunrise to the extraordinary beauty of the plains below, a balloon safari can add a special perspective to your Tanzania adventure. Tell us when you would like to travel and we will help you explore the possibilities.",
        primary: "Ask About Balloon Availability",
      }}
      ctaImage="/images/destinations/serengeti/hot-air-balloon/cta.jpg"
      ctaImageAlt="A hot-air balloon above the Serengeti at sunrise"
      whatsappMessage="Hello She Roars Africa Safari. I would like to ask about hot-air balloon safari possibilities for my Serengeti dates."
    >
      <JsonLd data={webPageJsonLd} />

      <DestinationSection id="experience">
        <SectionHeading eyebrow="THE MAGIC OF THE MORNING SKY" title="A Different Perspective of the Serengeti" subtitle="An early start, the quiet of the launch site and the first light over a vast landscape make this a distinctive safari experience." align="left" />
        <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="max-w-3xl space-y-5 text-base leading-8 text-earth sm:text-lg">
            <p>Before sunrise, the day begins in the cool darkness. At the launch site, guests may watch the ground crew prepare and inflate the balloon as the sky begins to change. The atmosphere is unhurried, with the pilot and crew guiding the preparation and briefing.</p>
            <p>Once airborne, the view changes with the wind and the route. Grasslands, kopjes, river systems and wildlife habitats appear as a connected landscape rather than separate moments on a game drive. The light moves across the plains as morning arrives.</p>
            <p>A balloon safari can add a memorable perspective to a Tanzania journey, but it is a weather-dependent experience, not a guaranteed wildlife encounter. The actual arrangements, launch area and inclusions depend on the supplier and the travel date.</p>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-sand shadow-card sm:min-h-[30rem]">
            <SmartImage src="/images/destinations/serengeti/hot-air-balloon/overview.jpg" alt="A balloon drifting above the Serengeti at dawn" sizes="(max-width: 1024px) 100vw, 48vw" fill className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-earth/80 to-transparent p-6 pt-16 text-sm font-medium text-white">The first light reveals a landscape shaped by wind, season and place.</div>
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="facts" tone="sand">
        <SectionHeading eyebrow="A FEW DETAILS BEFORE YOU FLY" title="Everything You Need to Know Before You Fly" subtitle="Timings and inclusions below are general estimates. Confirm the full details with the chosen operator." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {balloonFacts.map(([label, value], index) => {
            const Icon = index === 1 || index === 2 ? Clock3 : index === 0 || index === 3 ? Sunrise : Check;
            return <article key={label} className="rounded-2xl border border-sand bg-white p-5 shadow-sm">
              <Icon aria-hidden="true" className="size-5 text-terracotta" />
              <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-earth">{value}</p>
            </article>;
          })}
        </div>
        <Callout variant="note" title="Supplier-specific details" className="mt-6">Flight duration, total experience, transfers, breakfast and other inclusions vary by operator, region, weather and operating conditions. Price is available on request after the supplier confirms a quotation.</Callout>
      </DestinationSection>

      <DestinationSection id="launch-areas">
        <SectionHeading eyebrow="FIND YOUR LAUNCH POINT" title="The Serengeti From Four Different Skies" subtitle="Launch areas and operating windows differ by supplier. Your accommodation location and transfer plan matter." align="left" />
        <BalloonRegionExplorer />
        <Callout variant="tip" title="Match the launch field to your stay" className="mt-6">The exact camp or lodge location matters because ground transfers to the launch field must be arranged. Verify the supplier&apos;s operating dates, launch site and collection plan for your accommodation before finalising the itinerary.</Callout>
      </DestinationSection>

      <DestinationSection id="morning" tone="forest">
        <SectionHeading eyebrow="FROM DARKNESS TO GOLDEN LIGHT" title="An Unforgettable Morning, Step by Step" subtitle="Every flight follows its own conditions. This is a general outline, not a fixed operating schedule." tone="light" align="left" />
        <div className="grid gap-9 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-gold/50 sm:before:left-6">
            <ol className="grid gap-4">
              {balloonStages.map((stage, index) => (
                <li key={stage.title} className="relative grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 sm:grid-cols-[3.5rem_9rem_1fr] sm:gap-5 sm:p-5">
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-gold/60 bg-forest font-heading text-lg text-gold sm:size-12">0{index + 1}</span>
                  <div className="relative min-h-40 overflow-hidden rounded-xl bg-forest sm:min-h-28">
                    <SmartImage src={stage.image} alt={stage.alt} sizes="(max-width: 640px) 100vw, 16vw" fill className="object-cover" />
                  </div>
                  <StaggerGroup className="min-w-0">
                    <StaggerItem>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold">{stage.time}</p>
                        <h3 className="mt-2 font-heading text-xl text-cream sm:text-2xl">{stage.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-cream/75">{stage.text}</p>
                      </div>
                    </StaggerItem>
                  </StaggerGroup>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid content-start gap-4">
            <div className="relative min-h-72 overflow-hidden rounded-3xl bg-forest sm:min-h-[26rem]">
              <SmartImage src="/images/destinations/serengeti/hot-air-balloon/in-flight.jpg" alt="A hot-air balloon above the Serengeti as morning light arrives" sizes="(max-width: 1024px) 100vw, 43vw" fill className="object-cover" />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-earth/80 to-transparent p-5 pt-16 font-heading text-xl text-white">A morning shaped by the sky and the landscape</p>
            </div>
            <p className="text-sm leading-6 text-cream/75">A flight often lasts about an hour, while the full experience is commonly described as around five hours. These estimates vary by supplier and conditions.</p>
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="sky">
        <SectionHeading eyebrow="THE WORLD BELOW" title="The Serengeti in a Different Light" subtitle="The view may include landscapes and wildlife, depending on the launch region, season, weather and flight route." />
        <StaggerGroup className="grid auto-rows-[minmax(12rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {balloonGallery.map((item, index) => (
            <StaggerItem key={item.title} className={index === 0 || index === 6 ? "sm:col-span-2" : ""}>
              <figure className={`group relative h-full min-h-60 overflow-hidden rounded-3xl bg-forest ${index === 0 || index === 6 ? "min-h-72" : ""}`}>
                <SmartImage src={item.image} alt={item.alt} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/85 via-earth/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h3 className="font-heading text-xl sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/85">{item.text}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Callout variant="note" title="A flight is more than a checklist of sightings" className="mt-6">A balloon flight is as much about seeing the scale and beauty of the Serengeti as it is about wildlife. Every morning follows its own path. No particular animal sighting or Great Migration crossing is guaranteed.</Callout>
      </DestinationSection>

      <DestinationSection id="season" tone="sand">
        <SectionHeading eyebrow="FOLLOW THE SEASONS" title="The Right Season for the Right Launch Area" subtitle="Published operating windows differ between providers and can change. Confirm the exact launch field with the supplier before choosing dates." />
        <BalloonSeasonChart />
        <p className="mt-5 max-w-4xl text-sm leading-7 text-earth">The best launch location depends on where you are staying, your safari dates and the supplier&apos;s operating calendar. Central Seronera is commonly published as a year-round area, while Ndutu, Grumeti and Kogatende are often seasonal. These are broad planning patterns, not confirmed schedules for every year or operator.</p>
      </DestinationSection>

      <DestinationSection id="suitability">
        <SectionHeading eyebrow="A FEW IMPORTANT QUESTIONS" title="Is a Balloon Safari Right for You?" subtitle="Passenger suitability requirements are set by the selected operator and must be confirmed before booking." align="left" />
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-sand bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-heading text-2xl text-earth">What to check</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
              {["Minimum age or height requirements", "Passenger weight limits or supplements", "Mobility and basket boarding requirements", "Ability to follow take-off and landing instructions", "Health and passenger suitability requirements"].map((item) => <li key={item} className="flex gap-3"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-3xl border border-gold/40 bg-gold/10 p-6 sm:p-8">
            <h3 className="font-heading text-2xl text-earth">Important before booking</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-earth">
              {balloonSuitability.map(([title, text]) => <li key={title}><strong>{title}: </strong>{text}</li>)}
            </ul>
          </article>
        </div>
        <Callout variant="safety" title="Passenger suitability comes first" className="mt-6">Every passenger must meet the chosen balloon operator&apos;s requirements. Follow the safety briefing and the pilot&apos;s decisions. Do not send sensitive medical details through a general enquiry form; ask the operator directly about suitability.</Callout>
      </DestinationSection>

      <DestinationSection id="safety" tone="forest">
        <SectionHeading eyebrow="SAFETY ABOVE ALL" title="A Beautiful Experience Built Around Safety" subtitle="The pilot and operator decide whether conditions are suitable for flight." tone="light" align="left" />
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <ShieldCheck aria-hidden="true" className="size-9 text-gold" />
            <h3 className="mt-4 font-heading text-2xl text-cream">Weather-dependent by design</h3>
            <p className="mt-3 text-sm leading-7 text-cream/75">Wind and weather can delay or cancel a flight. The pilot makes operational decisions; landing conditions can vary. Any rescheduling or refund depends on the supplier&apos;s written policy.</p>
          </div>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {["Ask the operator about passenger suitability and safety procedures.", "Attend the safety briefing and follow crew instructions.", "Confirm how weather-related delay or cancellation is handled.", "Review the supplier's written cancellation and payment terms."].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm leading-6 text-cream"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>)}
            </ul>
            <div className="mt-5 rounded-2xl border border-gold/40 bg-white/5 p-5 text-sm leading-6 text-cream/80">
              <p>The supplied official reference is Tanzania Civil Aviation Authority Aeronautical Information Circular AIC 21 of 2026, titled “Hot Air Balloon Operations in the United Republic of Tanzania.” Consult the current circular and applicable regulations; this guide does not infer specific legal requirements from its title.</p>
              <a href={tcaaCircularUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">View the TCAA circular reference <ExternalLink aria-hidden="true" size={15} /></a>
            </div>
            <p className="mt-4 text-xs leading-5 text-cream/65">She Roars Africa Safari is not presented here as a balloon operator or aviation licence holder. Confirm the selected operator meets applicable Tanzanian requirements.</p>
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="prepare">
        <SectionHeading eyebrow="A LITTLE PREPARATION" title="Preparing for Your Sunrise Flight" subtitle="Follow the selected operator&apos;s practical instructions, especially for clothing and personal items." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {balloonPreparation.map(([title, text], index) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-sand bg-white p-5 shadow-sm sm:p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracotta/10 font-heading text-lg text-terracotta">{index + 1}</span>
              <div><h3 className="font-heading text-xl text-earth">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">Confirm luggage and personal-item arrangements with the balloon operator before departure.</p>
      </DestinationSection>

      <DestinationSection id="breakfast" tone="sand">
        <div className="relative isolate min-h-[26rem] overflow-hidden rounded-[2rem] bg-earth sm:min-h-[34rem]">
          <SmartImage src="/images/destinations/serengeti/hot-air-balloon/bush-breakfast.jpg" alt="A bush breakfast in the Serengeti after a sunrise flight" sizes="(max-width: 1024px) 100vw, 90vw" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/85 via-earth/35 to-transparent" />
          <div className="relative flex min-h-[26rem] max-w-2xl flex-col justify-end p-6 text-white sm:min-h-[34rem] sm:p-10 lg:p-14">
            <p className="text-eyebrow text-gold">A CELEBRATION IN THE WILD</p>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl">A Morning to Remember</h2>
            <p className="mt-4 text-sm leading-7 text-white/90 sm:text-base">After the flight, many balloon experiences continue with a bush breakfast in the Serengeti. It is a chance to pause, celebrate the morning and take in the landscape from the ground.</p>
            <p className="mt-3 text-sm leading-6 text-white/80">Breakfast, beverages and other inclusions vary by supplier. Confirm the specific arrangements in the quotation.</p>
          </div>
        </div>
      </DestinationSection>

      <DestinationSection id="cost">
        <SectionHeading eyebrow="A CLEAR QUOTATION MATTERS" title="Understanding the Cost of a Balloon Safari" subtitle="Price on request. The supplier&apos;s written quotation should identify the exact flight and related arrangements." align="left" />
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl bg-forest p-6 text-cream sm:p-8">
            <p className="text-eyebrow text-gold">PRICE ON REQUEST</p>
            <h3 className="mt-3 font-heading text-3xl">What can affect a quotation?</h3>
            <p className="mt-3 text-sm leading-6 text-cream/75">The supplier&apos;s offer can depend on launch location, travel date, passenger numbers, ground transfers, applicable park or conservation fees and booking terms. No price or availability is implied here.</p>
            <ul className="mt-5 grid gap-2 text-sm text-cream/90">{["Launch location", "Travel date and supplier", "Passenger numbers", "Ground transfers", "Applicable fees", "Booking and cancellation terms"].map((item) => <li key={item} className="flex gap-2"><span className="text-gold">•</span>{item}</li>)}</ul>
          </article>
          <div className="grid gap-5">
            <article className="rounded-3xl border border-sand bg-white p-6">
              <h3 className="font-heading text-2xl text-earth">Possible inclusions to verify</h3>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">{possibleInclusions.map((item) => <li key={item} className="flex gap-2"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-terracotta" />{item}</li>)}</ul>
            </article>
            <article className="rounded-3xl border border-sand bg-sand/60 p-6">
              <h3 className="font-heading text-2xl text-earth">Items to confirm in writing</h3>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">{costItems.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-terracotta" />{item}</li>)}</ul>
            </article>
          </div>
        </div>
        <Callout variant="note" className="mt-6">These are items to ask about, not promised She Roars inclusions. The selected supplier&apos;s written quotation and terms govern the actual experience.</Callout>
      </DestinationSection>

      <DestinationSection id="planning" tone="sand">
        <SectionHeading eyebrow="PLAN WITH CONFIDENCE" title="Planning Your Balloon Safari" subtitle="The launch location, accommodation and operator schedule should work together before any flight is considered confirmed." />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {balloonPlanningSteps.map(([title, text], index) => <li key={title} className="rounded-2xl border border-sand bg-white p-5 shadow-sm sm:p-6">
            <span className="font-heading text-4xl text-gold">0{index + 1}</span>
            <h3 className="mt-3 font-heading text-xl text-earth">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
          </li>)}
        </ol>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/plan-your-safari?type=Safari" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest">Ask Us About Balloon Availability <ArrowRight aria-hidden="true" size={17} /></Link>
          <a href={siteConfig.whatsappUrlWithMessage("Hello She Roars Africa Safari. I would like to ask about balloon safari possibilities for my Serengeti dates.")} className="inline-flex min-h-12 items-center rounded-full border border-forest px-6 font-semibold text-forest hover:bg-forest/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Ask on WhatsApp</a>
        </div>
      </DestinationSection>

      <DestinationSection id="faq">
        <SectionHeading eyebrow="GOOD QUESTIONS BEFORE TAKE-OFF" title="Serengeti Balloon Safari FAQs" subtitle="General guidance for planning. Confirm exact arrangements with the selected operator." />
        <FaqAccordion items={[...balloonFaqs]} jsonLd />
      </DestinationSection>
    </SerengetiGuideLayout>
  );
}
