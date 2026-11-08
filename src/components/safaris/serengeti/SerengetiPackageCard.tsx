import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { SerengetiPackage } from "@/types/serengeti-package";

function priceSummary(item: SerengetiPackage) {
  return item.pricing.tiers
    .filter((price) => price.amount !== null && price.availability !== "unavailable")
    .map((price) => `${price.tier === "mid-range" ? "Mid-range" : price.tier === "luxury" ? "Luxury" : "Camping"} $${price.amount?.toLocaleString("en-US")}${price.twinShare ? " twin share" : ""}`)
    .join(" · ");
}

export default function SerengetiPackageCard({ item }: { item: SerengetiPackage }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
      <Link
        href={`/safaris/serengeti/packages/${item.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-sand focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-terracotta"
      >
        <SmartImage
          src={item.cardImage.src}
          alt={item.cardImage.alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
          className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-2 text-xs font-semibold text-cream">
          {item.season}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-cream px-3 py-2 text-xs font-bold text-earth">
          {item.durationDays} days · {item.nights} nights
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-eyebrow text-terracotta">SERENGETI SAFARI</p>
        <h3 className="mt-2 font-heading text-2xl leading-tight text-earth">
          <Link href={`/safaris/serengeti/packages/${item.slug}`} className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
        <p className="mt-4 text-sm font-semibold text-earth">{item.regions.map(({ name }) => name).join(" · ")}</p>
        <p className="mt-3 text-sm leading-6 text-muted">{item.highlights[0]}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.pricing.tiers.filter((price) => price.availability === "available" || price.availability === "limited")
            .map((price) => <span key={price.tier} className="rounded-full bg-sand px-3 py-1 text-xs font-medium capitalize text-earth">{price.tier.replace("-", " ")}</span>)}
          {item.departureType.status === "specified" ? <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-earth">{item.departureType.label}</span> : null}
        </div>
        <p className="mt-4 text-sm font-semibold text-earth">Proposed: {priceSummary(item) || "Quote on request"}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
          <span className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta">
            View Safari <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
          </span>
          <Link href={`/plan-your-safari?package=${encodeURIComponent(item.slug)}`} className="inline-flex min-h-11 items-center font-semibold text-earth underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}
