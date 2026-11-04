import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: destination name, description, href, image, and className.
type DestinationCardProps = {
  title: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
  className?: string;
};

export default function DestinationCard({ title, description, href, image, className }: DestinationCardProps) {
  return (
    <Link href={href} className={cn("group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-forest text-white shadow-card", className)}>
      <div className="img-zoom absolute inset-0"><SmartImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 90vw, 30vw" fill className="object-cover" /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div><h3 className="font-heading text-2xl">{title}</h3><p className="mt-2 text-sm leading-5 text-white/85">{description}</p></div>
        <ArrowUpRight aria-hidden="true" className="mb-1 size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </Link>
  );
}
