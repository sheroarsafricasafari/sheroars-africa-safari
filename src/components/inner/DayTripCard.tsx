import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: day-trip title, summary, duration, optional starting price, href, image, and className.
type DayTripCardProps = {
  title: string;
  summary: string;
  duration: string;
  priceFrom?: number | null;
  href: string;
  image: { src: string; alt: string };
  className?: string;
};

export default function DayTripCard({ title, summary, duration, priceFrom = null, href, image, className }: DayTripCardProps) {
  return (
    <Link href={href} className={cn("group grid overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift md:grid-cols-[0.85fr_1.15fr]", className)}>
      <div className="img-zoom relative aspect-[4/3] bg-sand md:aspect-auto"><SmartImage src={image.src} alt={image.alt} sizes="(max-width: 768px) 100vw, 35vw" fill className="object-cover" /></div>
      <div className="flex flex-col justify-center p-5 sm:p-7">
        <div className="flex flex-wrap gap-2"><span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold">{duration}</span>{priceFrom !== undefined ? <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">{priceFrom === null ? "Price on request" : `From $${priceFrom.toLocaleString()}`}</span> : null}</div>
        <h3 className="mt-4 font-heading text-h3">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-terracotta">Explore day trip <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
