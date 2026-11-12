import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { SerengetiPackage } from "@/types/serengeti-package";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function priceSummary(item: SerengetiPackage) {
  return item.pricing.tiers
    .filter((price) => price.amount !== null && price.availability !== "unavailable")
    .map((price) => `${price.tier === "mid-range" ? "Mid-range" : price.tier === "luxury" ? "Luxury" : "Camping"} $${price.amount?.toLocaleString("en-US")}${price.twinShare ? " twin share" : ""}`)
    .join(" · ");
}

function PublishedPackageCard({ item, compact }: { item: SerengetiPackage; compact: boolean }) {
  const href = `/safaris/packages/${item.slug}`;
  const basePrice = item.pricing.tiers.find((price) => price.tier === "mid-range")?.amount;
  const bestMonths = item.bestMonths.length === 12
    ? "Year-round"
    : item.bestMonths.map((month) => monthLabels[month - 1]).join(", ");

  return (
    <article className="h-full">
      <Link
        href={href}
        className={`group relative flex overflow-hidden rounded-3xl bg-forest text-white shadow-card transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold ${compact ? "min-h-[25rem]" : "min-h-[34rem]"}`}
      >
        <SmartImage
          src={item.cardImage.src}
          alt={item.cardImage.alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
          className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-earth/65 via-earth/10 to-earth/95" />

        <div className={`relative flex w-full flex-col ${compact ? "p-5" : "p-6 sm:p-7"}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            {item.badge && (
              <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-earth">
                {item.badge}
              </span>
            )}
            <span className="ml-auto rounded-full bg-cream/95 px-3 py-1.5 text-xs font-bold text-earth">
              {item.durationDays} days · {item.nights} nights
            </span>
          </div>

          <div className="mt-auto">
            <p className="text-eyebrow text-gold">NGORONGORO SAFARI</p>
            <h3 className={`mt-2 font-heading leading-tight text-white ${compact ? "text-2xl" : "text-3xl"}`}>
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/90">{item.tagline ?? item.subtitle}</p>
            <p className="mt-3 line-clamp-1 text-sm font-semibold text-cream">
              {item.regions.map(({ name }) => name).join(" · ")}
            </p>

            {!compact && (
              <>
                <div className="mt-4 flex gap-1" aria-hidden="true">
                  {monthLabels.map((month, index) => {
                    const number = index + 1;
                    const isBest = item.bestMonths.includes(number);
                    const isGood = item.goodMonths?.includes(number) ?? false;
                    return (
                      <span
                        key={month}
                        className={`h-1.5 flex-1 rounded-full ${isBest ? "bg-gold" : isGood ? "bg-cream/70" : "bg-white/25"}`}
                      />
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-white/80">
                  <span className="font-semibold text-white">Best months:</span> {bestMonths || item.season}
                </p>
                <p className="mt-2 text-xs text-white/80">
                  <span className="font-semibold text-white">Pace:</span> {item.pace.label}
                  <span className="mx-2 text-white/50">·</span>
                  <span className="font-semibold text-white">Access:</span> {item.access.label}
                </p>
                {item.highlights[0] && <p className="mt-2 line-clamp-1 text-xs text-white/80">{item.highlights[0]}</p>}
              </>
            )}

            <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/25 pt-4">
              <p className="text-sm font-semibold text-white">
                {basePrice ? (
                  <>
                    <span className="text-xs font-normal text-white/80">From </span>
                    ${basePrice.toLocaleString("en-US")}
                    <span className="ml-1 text-xs font-normal text-white/80">per person</span>
                  </>
                ) : (
                  "Price on request"
                )}
              </p>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-gold">
                View itinerary <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            {!compact && <p className="mt-1 text-[11px] text-white/70">2 sharing, mid-range accommodation</p>}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function SerengetiPackageCard({ item, compact = false }: { item: SerengetiPackage; compact?: boolean }) {
  if (item.status === "published") {
    return <PublishedPackageCard item={item} compact={compact} />;
  }

  const prices = priceSummary(item);

  return (
    <article className="h-full">
      <Link
        href={`/safaris/serengeti/packages/${item.slug}`}
        className="group relative flex h-[36rem] flex-col overflow-hidden rounded-3xl bg-forest text-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-terracotta sm:h-[34rem]"
      >
        <SmartImage
          src={item.cardImage.src}
          alt={item.cardImage.alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
          className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-earth/55 via-transparent to-earth/95" />

        <div className="relative flex h-full flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="rounded-full bg-forest/85 px-3 py-2 text-xs font-semibold text-cream backdrop-blur-sm">
              {item.season}
            </span>
            <span className="rounded-full bg-cream/95 px-3 py-2 text-xs font-bold text-earth">
              {item.durationDays} days · {item.nights} nights
            </span>
          </div>

          <div className="mt-auto">
            <p className="text-eyebrow text-gold">SERENGETI SAFARI</p>
            <h3 className="mt-2 font-heading text-2xl leading-tight text-white sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/90">{item.summary}</p>
            <p className="mt-3 text-sm font-semibold text-cream">{item.regions.map(({ name }) => name).join(" · ")}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/80">{item.highlights[0]}</p>
            <p className="mt-3 line-clamp-2 text-sm font-semibold text-white">
              Proposed: {prices || "Quote on request"}
            </p>
            <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold">
              View safari <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
