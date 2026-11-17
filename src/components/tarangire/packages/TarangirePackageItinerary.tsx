"use client";

import { useState } from "react";
import { Coffee, Printer, Share2, Utensils } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/site";

type ItineraryPackage = {
  slug: string;
  name: string;
  parks: string[];
  gallery: { src: string; alt: string }[];
  routeStops?: string[];
  itinerary: {
    day: number;
    title: string;
    label: string;
    story?: string;
    activities: { time: string; text: string }[];
    meals: string[];
    overnight: string;
    route?: string;
    driveTime?: string;
  }[];
};

export default function TarangirePackageItinerary({
  item,
  initialOpenDays = [1],
  idPrefix = item.slug,
}: {
  item: ItineraryPackage;
  initialOpenDays?: number[];
  idPrefix?: string;
}) {
  const [openDays, setOpenDays] = useState<number[]>(() => initialOpenDays);
  const allOpen = openDays.length === item.itinerary.length;

  const toggleDay = (day: number) => {
    setOpenDays((current) =>
      current.includes(day) ? current.filter((value) => value !== day) : [...current, day],
    );
  };

  const shareItinerary = () => {
    const url = siteConfig.whatsappUrlWithMessage(
      `Here is the ${item.name} itinerary: ${window.location.href}`,
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="safari-itinerary-print-area">
      <div className="mb-6 flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={() => setOpenDays(allOpen ? initialOpenDays : item.itinerary.map((entry) => entry.day))}
          className="min-h-11 rounded-full border border-earth/20 px-4 text-sm font-semibold text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-earth/20 px-4 text-sm font-semibold text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          <Printer aria-hidden="true" size={16} /> Print / download itinerary
        </button>
        <button
          type="button"
          onClick={shareItinerary}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-earth/20 px-4 text-sm font-semibold text-earth hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          <Share2 aria-hidden="true" size={16} /> Share on WhatsApp
        </button>
      </div>
      <ol className="space-y-4">
        {item.itinerary.map((entry, index) => {
          const isOpen = openDays.includes(entry.day);
          const image = item.gallery[index % item.gallery.length];
          return (
            <li key={entry.day} className="tarangire-itinerary-day overflow-hidden rounded-3xl border border-earth/10 bg-white shadow-card">
              <button
                type="button"
                id={`${idPrefix}-itinerary-day-${entry.day}-toggle`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-itinerary-day-${entry.day}-content`}
                onClick={() => toggleDay(entry.day)}
                className="flex min-h-20 w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left sm:px-7"
              >
                <span className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest font-bold text-gold">0{entry.day}</span>
                  <span>
                    <span className="block font-heading text-xl text-earth sm:text-2xl">{entry.title}</span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-terracotta">{entry.label}</span>
                  </span>
                </span>
                <span className="text-sm font-semibold text-terracotta">{isOpen ? "Close" : "View day"}</span>
              </button>
              <div
                id={`${idPrefix}-itinerary-day-${entry.day}-content`}
                aria-labelledby={`${idPrefix}-itinerary-day-${entry.day}-toggle`}
                className="safari-itinerary-day-content border-t border-earth/10 px-5 py-5 sm:px-7"
                hidden={!isOpen}
              >
                {entry.story ? <p className="mb-5 max-w-4xl leading-7 text-muted">{entry.story}</p> : null}
                {entry.route || entry.driveTime ? (
                  <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
                    {entry.route ? <span className="rounded-full bg-sand px-3 py-1.5">{entry.route}</span> : null}
                    {entry.driveTime ? <span className="rounded-full bg-sand px-3 py-1.5">Drive: {entry.driveTime}</span> : null}
                  </div>
                ) : null}
                <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
                  <ol className="relative space-y-4 border-l border-gold/60 pl-5">
                    {entry.activities.map((activity, activityIndex) => (
                      <li key={`${activity.time}-${activityIndex}`} className="relative grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                        <span className="absolute -left-[1.57rem] top-1.5 size-2.5 rounded-full border-2 border-cream bg-terracotta" aria-hidden="true" />
                        <time className="text-xs font-bold text-terracotta">{activity.time}</time>
                        <p className="text-sm leading-6 text-earth">{activity.text}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-forest">
                      <SmartImage src={image.src} alt={image.alt} sizes="(min-width: 1024px) 30vw, 100vw" fill className="object-cover" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.meals.map((meal) => (
                        <span key={meal} className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-earth">
                          {meal === "Breakfast" ? <Coffee aria-hidden="true" size={14} /> : <Utensils aria-hidden="true" size={14} />}
                          {meal}
                        </span>
                      ))}
                    </div>
                    <p className="rounded-xl bg-sand px-4 py-3 text-sm text-earth"><span className="font-semibold">Overnight:</span> {entry.overnight}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 rounded-2xl bg-sand px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-terracotta">Route at a glance</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-earth">
          {(item.routeStops ?? ["Arusha", ...item.parks, "Arusha"]).map((stop, index, stops) => (
            <span key={`${stop}-${index}`} className="inline-flex items-center gap-2">
              <span className="rounded-full bg-white px-3 py-2">{stop}</span>
              {index < stops.length - 1 ? <span aria-hidden="true" className="h-px w-5 bg-terracotta" /> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
