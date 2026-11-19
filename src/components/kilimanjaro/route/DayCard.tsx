"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Coffee, Sandwich, UtensilsCrossed } from "lucide-react";
import type { DaySegment, TierKey } from "@/data/kilimanjaro-packages";

const MEAL_ICON = { Breakfast: Coffee, Lunch: Sandwich, Dinner: UtensilsCrossed } as const;

export default function DayCard({
  day,
  tier,
  defaultOpen = false,
  forceOpen,
}: {
  day: DaySegment & { day: number };
  tier: TierKey;
  defaultOpen?: boolean;
  forceOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const isOpen = forceOpen ?? open;
  const summit = day.label.toLowerCase().includes("summit");

  return (
    <article className={`overflow-hidden rounded-3xl border ${summit ? "border-gold bg-earth text-white" : "border-sand bg-white"}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-details`}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-20 w-full items-center gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta md:p-6"
      >
        <span className="shrink-0 font-heading text-4xl text-gold md:text-5xl" aria-hidden="true">{String(day.day).padStart(2, "0")}</span>
        <span className="min-w-0 flex-1">
          <span className={`block text-xs uppercase tracking-[0.18em] ${summit ? "text-gold" : "text-terracotta"}`}>{`Day ${day.day} | ${day.label}`}</span>
          <span id={`${id}-heading`} className={`mt-1 block font-heading text-xl md:text-2xl ${summit ? "text-white" : "text-earth"}`}>{day.title}</span>
          <span className={`mt-2 flex flex-wrap gap-2 text-xs ${summit ? "text-white/80" : "text-muted"}`}>
            <span className={`rounded-full border px-2 py-1 ${summit ? "border-white/30" : "border-sand"}`}>Sleep about {day.sleepM.toLocaleString("en-US")} m</span>
            <span className={`rounded-full border px-2 py-1 ${summit ? "border-white/30" : "border-sand"}`}>{day.hours}</span>
          </span>
        </span>
        <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-terracotta transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        id={`${id}-details`}
        role="region"
        aria-labelledby={`${id}-heading`}
        aria-hidden={!isOpen}
        className="kilimanjaro-day-content overflow-hidden"
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        <div className="space-y-6 px-5 pb-6 md:px-6">
          <p className={`max-w-[68ch] leading-relaxed ${summit ? "text-white/85" : "text-earth"}`}>{day.story}</p>
          <div>
            <p className={`text-xs uppercase tracking-[0.18em] ${summit ? "text-gold" : "text-terracotta"}`}>How the day unfolds</p>
            <ul className="mt-3 space-y-3 border-l border-gold pl-4">
              {day.activities.map((activity, index) => (
                <motion.li
                  key={activity}
                  initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.05 * index }}
                  className={`relative text-sm leading-relaxed ${summit ? "text-white/80" : "text-muted"}`}
                >
                  <span aria-hidden="true" className="absolute -left-[21px] top-2 size-2 rounded-full bg-gold" />
                  {activity}
                </motion.li>
              ))}
            </ul>
          </div>
          <ul className={`flex flex-wrap gap-4 text-sm ${summit ? "text-white" : "text-earth"}`} aria-label="Meals">
            {day.meals.map((meal) => {
              const Icon = MEAL_ICON[meal];
              return <li key={meal} className="inline-flex items-center gap-1"><Icon aria-hidden="true" className="size-4 text-terracotta" />{meal}</li>;
            })}
          </ul>
          <div className={`rounded-2xl border border-gold/40 p-4 ${summit ? "bg-white/10" : "bg-gold/10"}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta">
              {tier === "luxury" ? "On Luxury | a luxury touch" : "On Mid-range"}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${summit ? "text-white/85" : "text-earth"}`}>{tier === "luxury" ? day.luxNote : day.midNote}</p>
          </div>
          <p className={`text-xs ${summit ? "text-white/70" : "text-muted"}`}>From {day.from} to {day.to}. About {day.distanceKm} km. Altitudes and times are approximate.</p>
        </div>
      </motion.div>
    </article>
  );
}
