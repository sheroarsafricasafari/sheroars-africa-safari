import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import FaqAccordion from "@/components/inner/FaqAccordion";
import SerengetiPackageCard from "@/components/safaris/serengeti/SerengetiPackageCard";
import SerengetiPackageEstimator from "@/components/safaris/serengeti/SerengetiPackageEstimator";
import SerengetiPackageItinerary from "@/components/safaris/serengeti/SerengetiPackageItinerary";
import SerengetiPackageNavigation from "@/components/safaris/serengeti/SerengetiPackageNavigation";
import SerengetiPackageSeason from "@/components/safaris/serengeti/SerengetiPackageSeason";
import NgorongoroAccommodationTabs from "@/components/safaris/ngorongoro/NgorongoroAccommodationTabs";
import SmartImage from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/site";
import type { SerengetiPackage } from "@/types/serengeti-package";

const monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-eyebrow text-terracotta">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-heading text-3xl leading-tight text-earth sm:text-4xl">{title}</h2>
    </div>
  );
}

export default function NgorongoroPackageDetail({
  item,
  relatedPackages,
}: {
  item: SerengetiPackage;
  relatedPackages: SerengetiPackage[];
}) {
  const enquiryHref = `/plan-your-safari?package=${encodeURIComponent(item.slug)}`;
  const whatsappHref = siteConfig.whatsappUrlWithMessage(`Hello, I would like to enquire about the ${item.title}.`);

  return (
    <main className="bg-cream pb-16">
      <section id="package-hero" className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-forest text-white md:min-h-[78svh]">
        <SmartImage src={item.heroImage.src} alt={item.heroImage.alt} sizes="100vw" fill priority className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/45 to-earth/15" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/85">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Home</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/safaris" className="underline underline-offset-4">Safaris</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/safaris/packages?destination=ngorongoro" className="underline underline-offset-4">Ngorongoro Safaris</Link></li><li aria-hidden="true">/</li>
              <li aria-current="page">{item.shortTitle}</li>
            </ol>
          </nav>
          <div className="mt-8 flex flex-wrap gap-2">
            {item.badge ? <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-earth">{item.badge}</span> : null}
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">{item.style}</span>
          </div>
          <p className="mt-6 text-eyebrow text-gold">PRIVATE NGORONGORO SAFARI</p>
          <h1 className="mt-3 max-w-5xl font-heading text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{item.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-cream/90">{item.tagline ?? item.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[`${item.durationDays} days`, `${item.nights} nights`, item.regions.map(({ name }) => name).join(" · "), item.season].map((fact) => (
              <span key={fact} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">{fact}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={enquiryHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Plan this safari</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/75 px-6 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Chat on WhatsApp</a>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-5 text-cream/75">{item.pricing.unitConfirmation}</p>
        </div>
      </section>

      <SerengetiPackageNavigation shortTitle={item.shortTitle} enquiryHref={enquiryHref} />

      <div className="mx-auto max-w-7xl space-y-14 px-5 py-12 sm:px-8 md:space-y-20 md:py-16">
        <section id="overview" className="scroll-mt-36">
          <SectionHeading eyebrow="THE JOURNEY" title="At a glance" />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 text-base leading-8 text-muted">{item.overview.map((text) => <p key={text}>{text}</p>)}</div>
            <dl className="grid grid-cols-2 gap-3">
              {[
                ["Duration", `${item.durationDays} days / ${item.nights} nights`],
                ["Route", item.regions.map(({ name }) => name).join(", ")],
                ["Access", item.access.label],
                ["Pace", item.pace.label],
                ["Best months", item.bestMonths.map((month) => monthLabels[month - 1].slice(0, 3)).join(", ")],
                ["Departure", item.departureType.label],
              ].map(([label, value]) => <div key={label} className="rounded-2xl bg-sand p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-terracotta">{label}</dt><dd className="mt-2 text-sm leading-6 text-earth">{value}</dd></div>)}
            </dl>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {item.highlights.map((highlight) => <article key={highlight} className="flex min-h-20 items-start gap-3 rounded-2xl border border-sand bg-white p-5"><Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-terracotta" /><p className="font-semibold leading-6 text-earth">{highlight}</p></article>)}
          </div>
          <div className="mt-7 rounded-2xl bg-sand p-5">
            <h3 className="font-heading text-xl text-earth">This safari is a good fit for</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{item.bestFor.map((reason) => <li key={reason} className="rounded-full border border-earth/10 bg-white px-3 py-2 text-sm text-earth">{reason}</li>)}</ul>
          </div>
          <div className="mt-8"><SerengetiPackageSeason item={item} /></div>
        </section>

        <section id="journey" className="scroll-mt-36">
          <SectionHeading eyebrow="THE ROUTE" title="Your route through Tanzania" />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.route.map((stop, index) => (
              <li key={stop.id} className="rounded-2xl border border-sand bg-white p-5">
                <p className="text-eyebrow text-terracotta">STOP {index + 1}{stop.nights !== undefined ? ` · ${stop.nights} ${stop.nights === 1 ? "NIGHT" : "NIGHTS"}` : ""}</p>
                <h3 className="mt-2 font-heading text-xl text-earth">{stop.label}</h3>
                {stop.note ? <p className="mt-2 text-sm text-muted">{stop.note}</p> : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">Starts in {item.routeEndpoints.start ?? "Tanzania"} and ends in {item.routeEndpoints.end ?? "Tanzania"}.</p>
          {item.relatedLink ? <Link href={item.relatedLink.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">{item.relatedLink.label}<ArrowRight aria-hidden="true" size={16} /></Link> : null}
        </section>

        <section id="itinerary" className="scroll-mt-36">
          <SectionHeading eyebrow="DAY BY DAY" title="Your itinerary" />
          <SerengetiPackageItinerary item={item} />
        </section>

        {item.gallery?.length ? (
          <section aria-labelledby="gallery-title">
            <SectionHeading eyebrow="A CLOSER LOOK" title="The journey in pictures" id="gallery-title" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {item.gallery.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
                  <SmartImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" fill className="object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section id="accommodation" className="scroll-mt-36">
          <SectionHeading eyebrow="REST BETWEEN GAME DRIVES" title="Accommodation options" />
          <NgorongoroAccommodationTabs item={item} />
        </section>

        <section id="pricing" className="scroll-mt-36">
          <SectionHeading eyebrow="PUBLISHED PRICING" title="Per-person prices in US dollars" />
          <SerengetiPackageEstimator item={item} />
          {item.pricingNotes?.length ? <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">{item.pricingNotes.map((note) => <li key={note}>{note}</li>)}</ul> : null}
        </section>

        <section id="included" className="scroll-mt-36">
          <SectionHeading eyebrow="THE DETAILS" title="What is included and not included" />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Included", items: item.inclusions.items },
              { title: "Not included", items: item.exclusions.items },
            ].map(({ title, items }) => (
              <article key={title} className="rounded-2xl border border-sand bg-white p-6">
                <h3 className="font-heading text-2xl text-earth">{title}</h3>
                <ul className="mt-4 space-y-3">{items.map((entry) => <li key={entry} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" />{entry}</li>)}</ul>
              </article>
            ))}
          </div>
          {item.addOns.length ? (
            <div className="mt-5 rounded-2xl bg-sand p-5">
              <h3 className="font-heading text-xl text-earth">Optional activities</h3>
              <ul className="mt-3 space-y-2">{item.addOns.map((addOn) => <li key={addOn.name} className="text-sm leading-6 text-muted"><strong className="text-earth">{addOn.name}:</strong> {addOn.status.replace("-", " ")}{addOn.note ? ` · ${addOn.note}` : ""}{addOn.price ? ` · ${addOn.price}` : ""}</li>)}</ul>
            </div>
          ) : null}
        </section>

        <section id="good-to-know" className="scroll-mt-36">
          <SectionHeading eyebrow="BEFORE YOU TRAVEL" title="Good to know" />
          <div className="grid gap-4 md:grid-cols-2">
            {item.goodToKnow.map((note) => <article key={`${note.title}-${note.text}`} className="rounded-2xl border border-sand bg-white p-5"><h3 className="font-semibold text-earth">{note.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{note.text}</p></article>)}
          </div>
        </section>

        <section id="faq" className="scroll-mt-36">
          <SectionHeading eyebrow="YOUR QUESTIONS" title="Frequently asked questions" />
          <FaqAccordion items={item.faqs} />
        </section>

        {relatedPackages.length ? (
          <section aria-labelledby="related-title">
            <SectionHeading eyebrow="KEEP EXPLORING" title="Related journeys" />
            <div id="related-title" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{relatedPackages.slice(0, 3).map((related) => <SerengetiPackageCard key={related.slug} item={related} compact />)}</div>
          </section>
        ) : null}

        <section className="rounded-[2rem] bg-forest p-7 text-cream shadow-soft sm:p-10 md:p-14">
          <p className="text-eyebrow text-gold">PLAN WITH OUR TEAM</p>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl">Ready to make this safari yours?</h2>
          <p className="mt-4 max-w-2xl leading-7 text-cream/80">Share your preferred dates, group size, and accommodation tier. Our team will confirm the details in a written quote.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={enquiryHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream">Plan this safari <ArrowRight aria-hidden="true" size={16} /></Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/70 px-6 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream">Chat on WhatsApp</a>
          </div>
        </section>
      </div>
    </main>
  );
}
