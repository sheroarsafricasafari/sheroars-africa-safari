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
