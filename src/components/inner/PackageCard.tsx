import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: package summary fields, destination href, and className.
export type PackageCardProps = {
  slug: string;
  title: string;
  days: number;
  parks: string[];
  summary: string;
  priceFrom: number | null;
  image: { src: string; alt: string };
  badge?: string;
  href?: string;
  className?: string;
  hidePrice?: boolean;
};

export default function PackageCard({ slug, title, days, parks, summary, priceFrom, image, badge, href, className, hidePrice = false }: PackageCardProps) {
  return (
    <Link href={href ?? `/safaris/packages/${slug}`} className={cn("group block overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta motion-reduce:transition-none motion-reduce:hover:translate-y-0", className)}>
      <div className="img-zoom relative aspect-[4/3] bg-sand">
        <SmartImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover motion-reduce:group-hover:scale-100" />
        {badge ? <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-gold">{badge}</span> : null}
        <span className="absolute bottom-4 right-4 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-earth">{days} days</span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-h3 text-earth">{title}</h3>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-terracotta">{parks.join(", ")}</p>
        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-muted">{summary}</p>
        <div className={`mt-5 flex items-center gap-3 border-t border-sand pt-4 ${hidePrice ? "justify-end" : "justify-between"}`}>
          {hidePrice ? null : <span className="text-sm font-bold">{priceFrom === null ? "Price on request" : `From $${priceFrom.toLocaleString()} per person`}</span>}
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-terracotta">View Journey <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
        </div>
      </div>
    </Link>
  );
}
