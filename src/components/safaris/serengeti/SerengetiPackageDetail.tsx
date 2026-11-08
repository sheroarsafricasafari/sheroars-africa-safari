import Link from "next/link";
import { ArrowRight, Check, CircleHelp } from "lucide-react";
import FaqAccordion from "@/components/inner/FaqAccordion";
import SerengetiPackageCard from "@/components/safaris/serengeti/SerengetiPackageCard";
import SerengetiPackageEstimator from "@/components/safaris/serengeti/SerengetiPackageEstimator";
import SerengetiPackageItinerary from "@/components/safaris/serengeti/SerengetiPackageItinerary";
import SerengetiPackageNavigation from "@/components/safaris/serengeti/SerengetiPackageNavigation";
import SerengetiPackageRoute from "@/components/safaris/serengeti/SerengetiPackageRoute";
import SerengetiPackageSeason from "@/components/safaris/serengeti/SerengetiPackageSeason";
import SmartImage from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/site";
import type { SerengetiPackage } from "@/types/serengeti-package";

const priceDisclaimer = "Prices are indicative and confirmed in your written quote.";
const tierNames = { camping: "Camping", "mid-range": "Mid-range", luxury: "Luxury" } as const;

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-7 max-w-3xl"><p className="text-eyebrow text-terracotta">{eyebrow}</p><h2 className="mt-2 font-heading text-3xl leading-tight text-earth sm:text-4xl">{title}</h2></div>;
}

function tierPrice(tier: SerengetiPackage["pricing"]["tiers"][number]) {
  if (tier.availability === "unavailable") return "Not available";
  if (tier.amount === null) return "On request";
  return `$${tier.amount.toLocaleString("en-US")} USD${tier.twinShare ? " twin share" : ""}`;
}

export default function SerengetiPackageDetail({ item, relatedPackages }: { item: SerengetiPackage; relatedPackages: SerengetiPackage[] }) {
  const enquiryHref = `/plan-your-safari?package=${encodeURIComponent(item.slug)}`;
  const whatsappHref = siteConfig.whatsappUrlWithMessage(`Hello, I would like to enquire about the ${item.title}.`);

  return (
    <main className="bg-cream pb-16">
      <section id="package-hero" className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-forest text-white md:min-h-[78svh]">
        <SmartImage src={item.heroImage.src} alt={item.heroImage.alt} sizes="100vw" fill priority className="object-cover" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-earth/80 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/40 to-earth/15" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/85">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Home</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/safaris" className="underline underline-offset-4">Safaris</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/safaris/serengeti" className="underline underline-offset-4">Serengeti</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/safaris/serengeti/packages" className="underline underline-offset-4">Packages</Link></li><li aria-hidden="true">/</li>
              <li aria-current="page">{item.shortTitle}</li>
            </ol>
          </nav>
          <p className="mt-8 text-eyebrow text-gold">SERENGETI SAFARI · PROPOSED PACKAGE</p>
          <h1 className="mt-3 max-w-5xl font-heading text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{item.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cream/90">{item.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[`${item.durationDays} days`, `${item.nights} nights`, item.regions.map(({ name }) => name).join(" · "), item.season].map((fact) => <span key={fact} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">{fact}</span>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={enquiryHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Enquire about this journey</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/75 px-6 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Chat on WhatsApp</a>
          </div>
          <p className="mt-4 text-xs text-cream/75">Proposed prices only. No booking or availability is confirmed by this page.</p>
        </div>
      </section>

      <SerengetiPackageNavigation shortTitle={item.shortTitle} enquiryHref={enquiryHref} />

      <div className="mx-auto max-w-7xl space-y-14 px-5 py-12 sm:px-8 md:space-y-20 md:py-16">
        <section id="overview" className="scroll-mt-32">
          <SectionHeading eyebrow="THE JOURNEY" title={`${item.shortTitle} at a glance`} />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 text-base leading-8 text-muted">{item.overview.map((text) => <p key={text}>{text}</p>)}</div>
            <dl className="grid grid-cols-2 gap-3">
              {[
                ["Duration", `${item.durationDays} days / ${item.nights} nights`],
                ["Regions", item.regions.map(({ name }) => name).join(", ")],
                ["Access", item.access.label],
                ["Pace", item.pace.label],
                ["Travel period", item.season],
                ["Departure", item.departureType.label],
              ].map(([label, value]) => <div key={label} className="rounded-2xl bg-sand p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-terracotta">{label}</dt><dd className="mt-2 text-sm leading-6 text-earth">{value}</dd></div>)}
            </dl>
          </div>
          <div className="mt-8 rounded-3xl border border-sand bg-white p-6 sm:p-8">
            <p className="text-eyebrow text-terracotta">{item.sellingPointTitle}</p>
            <p className="mt-3 max-w-4xl font-heading text-xl leading-8 text-earth sm:text-2xl">{item.sellingPoint}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {item.highlights.map((highlight) => <article key={highlight} className="flex min-h-20 items-start gap-3 rounded-2xl border border-sand bg-white p-5"><Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-terracotta" /><p className="font-semibold leading-6 text-earth">{highlight}</p></article>)}
          </div>
          <div className="mt-8"><SerengetiPackageSeason item={item} /></div>
        </section>

        <section id="journey" className="scroll-mt-32">
          <SectionHeading eyebrow="THE ROUTE" title="Regions on this journey" />
          <SerengetiPackageRoute stops={item.route} />
          <p className="mt-4 text-sm leading-6 text-muted">The route is schematic and not a navigation map. Travel order is based only on the supplied region sequence; unlisted transfer details are not implied.</p>
          <div className="mt-8 rounded-2xl border border-gold/40 bg-white p-5">
            <h3 className="font-semibold text-earth">Wildlife and migration</h3>
            <p className="mt-2 text-sm leading-7 text-muted">Wildlife is wild, and sightings can never be guaranteed. Migration movements depend on natural conditions, including rainfall. River crossings cannot be guaranteed. Seasonal recommendations are guidance, not promises; guides make decisions based on local conditions.</p>
          </div>
        </section>

        <section id="itinerary" className="scroll-mt-32">
          <SectionHeading eyebrow="DAY BY DAY" title="Your itinerary" />
          <SerengetiPackageItinerary item={item} />
        </section>

        <section id="accommodation" className="scroll-mt-32">
          <SectionHeading eyebrow="REST BETWEEN GAME DRIVES" title="Accommodation options" />
          <div className="grid gap-4 md:grid-cols-3">
            {item.accommodation.map((stay) => (
              <article key={stay.id} className={`rounded-2xl border bg-white p-5 ${stay.availability === "unavailable" ? "border-sand opacity-75" : "border-sand"}`}>
                <p className="text-eyebrow text-terracotta">{tierNames[stay.tier]}</p>
                <h3 className="mt-2 font-heading text-xl text-earth">{stay.availability === "unavailable" ? "Not available for this package" : stay.availability === "on-request" ? "Available on request" : stay.availability === "limited" ? "Limited availability" : "Listed tier"}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{stay.description ?? "Property names, exact locations, accommodation types, and facilities were not supplied. TODO(CONFIRM) before publishing these details."}</p>
                <p className="mt-3 text-xs leading-5 text-muted">Any final property, location, and availability must be confirmed in a written proposal.</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Examples of where you may stay (or similar) will be listed only after property and location details are verified.</p>
        </section>

        <section id="pricing" className="scroll-mt-32">
          <SectionHeading eyebrow="INDICATIVE PRICING" title="Proposed prices in USD" />
          <div className="grid gap-4 md:grid-cols-3">
            {item.pricing.tiers.map((price) => (
              <article key={price.tier} className="rounded-2xl border border-sand bg-white p-5">
                <p className="text-eyebrow capitalize text-terracotta">{tierNames[price.tier]}</p>
                <p className="mt-3 font-heading text-3xl text-earth">{tierPrice(price)}</p>
                {price.note ? <p className="mt-2 text-sm leading-6 text-muted">{price.note}</p> : null}
                {price.availability === "limited" || price.availability === "on-request" ? <p className="mt-2 text-sm text-muted">{price.availability === "limited" ? "Availability is limited." : "Price and availability require a tailored quote."}</p> : null}
                {(price.tier === "luxury" || price.tier === "camping") && price.amount !== null ? <p className="mt-2 text-xs leading-5 text-muted">The final amount depends on group size, travel dates, and accommodation availability.</p> : null}
              </article>
            ))}
          </div>
          {item.pricing.balloonIncluded ? <p className="mt-4 rounded-xl bg-gold/15 p-4 text-sm font-semibold text-earth">The hot-air balloon experience is included in both proposed mid-range and luxury prices.</p> : null}
          {item.pricing.singleSupplement ? <p className="mt-4 rounded-xl bg-sand p-4 text-sm text-earth">Single supplement: {item.pricing.singleSupplement.prefix} ${item.pricing.singleSupplement.amount.toLocaleString("en-US")} USD. This is separate from the twin-share price.</p> : null}
          <p className="mt-4 rounded-xl border border-gold/50 bg-gold/15 p-4 text-sm font-semibold text-earth">{priceDisclaimer}</p>
          <p className="mt-3 text-xs leading-5 text-muted">{item.pricing.unitConfirmation}</p>
          <div className="mt-7"><SerengetiPackageEstimator item={item} /></div>
        </section>

        <section id="included" className="scroll-mt-32">
          <SectionHeading eyebrow="THE DETAILS" title="Inclusions, exclusions and add-ons" />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Inclusions", data: item.inclusions },
              { title: "Exclusions", data: item.exclusions },
            ].map(({ title, data }) => (
              <article key={title} className="rounded-2xl border border-sand bg-white p-6">
                <h3 className="font-heading text-2xl text-earth">{title}</h3>
                {data.items.length ? <ul className="mt-4 space-y-3">{data.items.map((entry) => <li key={entry} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" />{entry}</li>)}</ul> : <p className="mt-4 text-sm leading-6 text-muted">Package-specific {title.toLowerCase()} were not supplied. TODO(CONFIRM) before publishing.</p>}
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-sand p-5">
            <h3 className="font-heading text-xl text-earth">Optional add-ons</h3>
            {item.addOns.length ? <ul className="mt-3 space-y-2">{item.addOns.map((addOn) => <li key={addOn.name} className="text-sm leading-6 text-muted"><strong className="text-earth">{addOn.name}:</strong> {addOn.status.replace("-", " ")}{addOn.note ? ` · ${addOn.note}` : ""}{addOn.price ? ` · ${addOn.price}` : ""}</li>)}</ul> : <p className="mt-2 text-sm leading-6 text-muted">No package-specific add-ons were supplied. TODO(CONFIRM) before publishing optional activities or prices.</p>}
          </div>
        </section>

        <section id="good-to-know" className="scroll-mt-32">
          <SectionHeading eyebrow="BEFORE YOU TRAVEL" title="Good to know" />
          <div className="grid gap-4 md:grid-cols-2">
            {item.goodToKnow.map((note) => <article key={note.title} className="rounded-2xl border border-sand bg-white p-5"><div className="flex items-start gap-3"><CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-terracotta" /><div><h3 className="font-semibold text-earth">{note.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{note.text}</p></div></div></article>)}
          </div>
        </section>

        <section id="faq" className="scroll-mt-32">
          <SectionHeading eyebrow="YOUR QUESTIONS" title="Frequently asked questions" />
          <FaqAccordion items={item.faqs} />
        </section>

        {relatedPackages.length ? (
          <section aria-labelledby="related-title">
            <SectionHeading eyebrow="KEEP EXPLORING" title="Related journeys" />
            <div id="related-title" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{relatedPackages.slice(0, 3).map((related) => <SerengetiPackageCard key={related.slug} item={related} />)}</div>
          </section>
        ) : null}

        <section className="rounded-[2rem] bg-forest p-7 text-cream shadow-soft sm:p-10 md:p-14">
          <p className="text-eyebrow text-gold">PLAN WITH OUR TEAM</p>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl">Ready to Make This Journey Yours?</h2>
          <p className="mt-4 max-w-2xl leading-7 text-cream/80">Share your preferred dates, group size, and accommodation tier. The team can discuss this journey and prepare a written quotation.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={enquiryHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream">Enquire about this safari <ArrowRight aria-hidden="true" size={16} /></Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/70 px-6 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Chat on WhatsApp</a>
          </div>
        </section>
      </div>
    </main>
  );
}
