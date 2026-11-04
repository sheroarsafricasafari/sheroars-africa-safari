import Link from "next/link";
import { MapPin } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: lodge name, location, tier, note, href, image, and className.
type LodgeCardProps = {
  name: string;
  location: string;
  tier: "Luxury" | "Mid-range" | "Budget";
  note: string;
  href: string;
  image: { src: string; alt: string };
  className?: string;
};

export default function LodgeCard({ name, location, tier, note, href, image, className }: LodgeCardProps) {
  return (
    <Link href={href} className={cn("group block overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="img-zoom relative aspect-[4/3] bg-sand"><SmartImage src={image.src} alt={image.alt} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover" /></div>
      <div className="p-5"><div className="flex items-center justify-between gap-3"><h3 className="font-heading text-h3">{name}</h3><span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-earth">{tier}</span></div><p className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-terracotta"><MapPin aria-hidden="true" size={14} />{location}</p><p className="mt-3 text-sm leading-6 text-muted">{note}</p></div>
    </Link>
  );
}
