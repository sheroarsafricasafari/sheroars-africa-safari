import Link from "next/link";
import { ArrowRight, CarFront, Clock3, MapPin } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { TarangirePackage } from "@/types/tarangire-package";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

export default function TarangirePackageCard({ item }: { item: TarangirePackage }) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-card transition-shadow hover:shadow-lift">
      <Link href={`/safaris/packages/${item.slug}`} className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
        <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-forest">
          <SmartImage
            src={item.cardImage}
            alt={item.cardAlt}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 88vw"
            fill
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-1.5 text-xs font-semibold text-cream backdrop-blur">
            {item.duration}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-earth">
            From {formatPrice(item.pricing.priceFrom)} pp
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full bg-sand px-3 py-1 text-[11px] font-semibold text-earth">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-4 font-heading text-2xl leading-tight text-earth">{item.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-muted">{item.tagline}</p>
          <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-earth/10 pt-4 text-xs text-muted">
            <div>
              <dt className="sr-only">Nights</dt>
              <dd className="flex items-center gap-1.5"><Clock3 aria-hidden="true" size={14} className="text-terracotta" />{item.nights === 0 ? "Day trip" : `${item.nights} nights`}</dd>
            </div>
            <div>
              <dt className="sr-only">Parks</dt>
              <dd className="flex items-center gap-1.5"><MapPin aria-hidden="true" size={14} className="text-terracotta" />{item.parks.length} {item.parks.length === 1 ? "park" : "parks"}</dd>
            </div>
            <div>
              <dt className="sr-only">Vehicle</dt>
              <dd className="flex items-center gap-1.5"><CarFront aria-hidden="true" size={14} className="text-terracotta" />Private 4x4</dd>
            </div>
          </dl>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-terracotta">
            View itinerary <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
