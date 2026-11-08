"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SerengetiPackage } from "@/types/serengeti-package";

const mealNames: Record<"B" | "L" | "D", string> = { B: "Breakfast", L: "Lunch", D: "Dinner" };

export default function SerengetiPackageItinerary({ item }: { item: SerengetiPackage }) {
  const [openDays, setOpenDays] = useState<Set<number>>(() => new Set([1]));
  const allOpen = item.itinerary.length > 0 && openDays.size === item.itinerary.length;
  const toggleDay = (day: number) => setOpenDays((current) => {
    const next = new Set(current);
    if (next.has(day)) next.delete(day);
    else next.add(day);
    return next;
  });

  if (!item.itinerary.length) {
    return (
      <div className="rounded-3xl border border-gold/40 bg-white p-6 sm:p-8">
        <p className="text-eyebrow text-terracotta">ITINERARY DETAILS PENDING</p>
        <h3 className="mt-2 font-heading text-2xl text-earth">A day-by-day schedule is not available yet.</h3>
        <p className="mt-3 leading-7 text-muted">Exact activities, time blocks, meal arrangements, overnight locations, and travel notes were not included in the available source material. TODO(CONFIRM) before publishing a detailed itinerary.</p>
        <a href={`/plan-your-safari?package=${encodeURIComponent(item.slug)}`} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Request the current itinerary</a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end print:hidden">
        <button type="button" onClick={() => setOpenDays(allOpen ? new Set() : new Set(item.itinerary.map(({ day }) => day)))} className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
          {allOpen ? "Collapse all" : "Expand all"} <ChevronDown aria-hidden="true" size={16} />
        </button>
      </div>
      {item.itinerary.map((day) => {
        const expanded = openDays.has(day.day);
        return (
          <article id={`day-${day.day}`} key={day.id} className="serengeti-itinerary-day scroll-mt-32 rounded-2xl border border-sand bg-white">
            <h3>
              <button type="button" aria-expanded={expanded} aria-controls={`day-details-${day.day}`} onClick={() => toggleDay(day.day)} className="flex min-h-16 w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                <span><span className="text-eyebrow text-terracotta">DAY {day.day}</span><span className="mt-1 block font-heading text-xl text-earth">{day.title}</span></span>
                <ChevronDown aria-hidden="true" className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={`day-details-${day.day}`} hidden={!expanded} className="space-y-4 border-t border-sand p-5">
              {day.location ? <p className="font-semibold text-earth">{day.location}</p> : null}
              {day.opening ? <p className="leading-7 text-muted">{day.opening}</p> : null}
              {day.activities.map((activity, index) => <p key={`${day.id}-${index}`} className="text-sm leading-6 text-muted">{activity.timeLabel ? <strong className="mr-2 text-earth">{activity.timeLabel}</strong> : null}{activity.description}{activity.optional ? " (Optional)" : ""}</p>)}
              {day.travelNotes.map((note) => <p key={note} className="text-sm leading-6 text-muted"><strong className="text-earth">Travel note:</strong> {note}</p>)}
              {day.meals.length ? <p className="text-sm text-muted"><strong className="text-earth">Meals:</strong> {day.meals.map((meal) => mealNames[meal]).join(", ")}</p> : null}
              {day.overnightLocation ? <p className="text-sm text-muted"><strong className="text-earth">Overnight:</strong> {day.overnightLocation}</p> : null}
              {day.warnings.map((warning) => <p key={warning} className="rounded-xl bg-sand p-3 text-sm text-earth">{warning}</p>)}
            </div>
          </article>
        );
      })}
      <style>{`@media print { .serengeti-itinerary-day [hidden] { display: block !important; } .serengeti-itinerary-day h3 button { display: block !important; } .serengeti-itinerary-day h3 svg { display: none !important; } .serengeti-itinerary-day > div { display: block !important; } }`}</style>
    </div>
  );
}
