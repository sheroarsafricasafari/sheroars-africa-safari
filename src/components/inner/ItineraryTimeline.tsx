"use client";

import { useState } from "react";
import { BedDouble, MapPin, Utensils } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: itinerary day list with optional image and className.
export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  overnight: string;
  meals: string[];
  accommodation: string;
  image?: { src: string; alt: string };
};
type ItineraryTimelineProps = { days: ItineraryDay[]; className?: string };

export default function ItineraryTimeline({ days, className }: ItineraryTimelineProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <section className={cn("relative", className)}>
      <div className="mb-6 hidden justify-end md:flex">
        <button type="button" onClick={() => setExpanded(!expanded)} className="text-sm font-semibold text-terracotta underline underline-offset-4">
          {expanded ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div className="absolute bottom-5 left-6 top-5 border-l border-dashed border-gold md:left-7" aria-hidden="true" />
      <ol className="grid gap-5">
        {days.map((item, index) => (
          <li key={item.day} className="relative pl-16 md:pl-[4.5rem]">
            <span className="absolute left-0 top-5 z-10 flex size-12 items-center justify-center rounded-full bg-terracotta font-heading text-lg text-cream shadow-card md:size-14">{item.day}</span>
            <details open={index === 0 || expanded} className="group rounded-2xl bg-white p-5 shadow-card md:p-7">
              <summary className="cursor-pointer list-none font-heading text-xl text-earth marker:hidden [&::-webkit-details-marker]:hidden">{item.title}</summary>
              <div className="pt-4">
                <p className="leading-7 text-muted">{item.description}</p>
                {item.image ? <div className="img-zoom group relative mt-5 aspect-[16/8] rounded-2xl"><SmartImage src={item.image.src} alt={item.image.alt} sizes="(max-width: 768px) 100vw, 60vw" fill className="object-cover" /></div> : null}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4 text-terracotta" />{item.overnight}</span>
                  <span className="inline-flex items-center gap-1.5"><Utensils aria-hidden="true" className="size-4 text-terracotta" />{item.meals.map((meal) => <i key={meal} className="rounded bg-sand px-1.5 py-0.5 not-italic">{meal}</i>)}</span>
                  <span className="inline-flex items-center gap-1.5"><BedDouble aria-hidden="true" className="size-4 text-terracotta" />{item.accommodation}</span>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
