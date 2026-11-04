import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: Kilimanjaro route facts and href, and className.
export type RouteCardProps = {
  name: string;
  href: string;
  image: { src: string; alt: string };
  days: string;
  difficulty: number;
  scenery: string;
  crowds: string;
  summary: string;
  className?: string;
};

export default function RouteCard({ name, href, image, days, difficulty, scenery, crowds, summary, className }: RouteCardProps) {
  return (
    <Link href={href} className={cn("group block overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="img-zoom relative aspect-[4/3] bg-sand"><SmartImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 100vw, 40vw" fill className="object-cover" /></div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3"><h3 className="font-heading text-h3">{name}</h3><span className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs font-semibold">{days} days</span></div>
        <div className="mt-3 flex items-center gap-1" aria-label={`Difficulty ${difficulty} out of 5`}>{[1, 2, 3, 4, 5].map((dot) => <span key={dot} className={cn("size-2 rounded-full", dot <= difficulty ? "bg-terracotta" : "bg-sand")} />)}<span className="ml-2 text-xs text-muted">Difficulty</span></div>
        <p className="mt-3 text-sm leading-6 text-muted">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full bg-forest/10 px-3 py-1 text-xs text-forest">{scenery}</span><span className="rounded-full bg-sand px-3 py-1 text-xs text-muted">{crowds}</span></div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-terracotta">Explore route <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
