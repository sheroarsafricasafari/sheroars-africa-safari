"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { packagesForRoute, profileOf } from "@/data/kilimanjaro-packages";

const routePoints = [
  { x: 66, y: 170, label: "Lemosho Gate" },
  { x: 145, y: 137, label: "Shira 1" },
  { x: 230, y: 118, label: "Shira 2" },
  { x: 316, y: 139, label: "Moir Hut" },
  { x: 403, y: 155, label: "Buffalo Camp" },
  { x: 490, y: 137, label: "Third Cave" },
  { x: 575, y: 103, label: "School Hut" },
  { x: 670, y: 43, label: "Uhuru Peak" },
  { x: 765, y: 165, label: "Mweka Gate" },
];

export default function CircuitMap() {
  const reducedMotion = useReducedMotion();
  const [day, setDay] = useState(1);
  const packageData = packagesForRoute("northern-circuit").find((item) => item.days === 9);
  if (!packageData) throw new Error("Missing the 9-day Northern Circuit package");
  const profile = profileOf(packageData);
  const selected = profile[day - 1];
  const mapPoint = routePoints[Math.round(((day - 1) / Math.max(profile.length - 1, 1)) * (routePoints.length - 1))];
  const stop = mapPoint;

  return (
    <section aria-labelledby="northern-circuit-map-heading" className="overflow-hidden rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
        <div>
          <p className="text-eyebrow text-terracotta">The grand circuit</p>
          <h2 id="northern-circuit-map-heading" className="mt-3 font-heading text-3xl text-earth">A Full Circle Around Kibo</h2>
          <p className="mt-4 max-w-prose leading-7 text-muted">Trace the nine-day Northern Circuit from the western rainforest, around the quiet northern slopes, to the summit and down the southern side. Use the slider to follow the recommended itinerary day by day.</p>
          <label htmlFor="northern-circuit-day" className="mt-7 block text-sm font-semibold text-earth">Explore day {day} of {profile.length}</label>
          <input
            id="northern-circuit-day"
            type="range"
            min="1"
            max={profile.length}
            value={day}
            onChange={(event) => setDay(Number(event.target.value))}
            className="mt-3 min-h-11 w-full accent-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
          />
          <div className="mt-2 flex justify-between text-xs text-muted"><span>Start</span><span>Summit and descent</span></div>
          <div aria-live="polite" className="mt-5 rounded-2xl bg-sand/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">Day {selected.day}</p>
            <h3 className="mt-1 font-heading text-2xl text-earth">{selected.label}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Sleep at approximately {selected.sleepM.toLocaleString("en-US")} m; the high point for the day is approximately {selected.highM.toLocaleString("en-US")} m.</p>
          </div>
        </div>
        <figure>
          <svg viewBox="0 0 820 240" role="img" aria-labelledby="circuit-svg-title circuit-svg-description" className="w-full overflow-visible">
            <title id="circuit-svg-title">Illustrated Northern Circuit route around Kilimanjaro</title>
            <desc id="circuit-svg-description">A nine-day route diagram from the western approach around the northern slopes, to Uhuru Peak and down to Mweka Gate.</desc>
            <path d="M55 180 C100 145 125 135 160 135 S215 115 245 116 S285 123 320 140 S380 153 410 155 S463 138 495 138 S545 120 580 104 S635 65 670 44 S722 101 770 171" fill="none" stroke="#d9c99e" strokeWidth="16" strokeLinecap="round" />
            <motion.path
              d="M55 180 C100 145 125 135 160 135 S215 115 245 116 S285 123 320 140 S380 153 410 155 S463 138 495 138 S545 120 580 104 S635 65 670 44 S722 101 770 171"
              fill="none"
              stroke="#b65c3a"
              strokeWidth="5"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 2.4, ease: "easeInOut" }}
            />
            {routePoints.map((point, index) => (
              <g key={point.label}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={point.label === "Uhuru Peak" ? 7 : 5}
                  fill={index === Math.round(((day - 1) / Math.max(profile.length - 1, 1)) * (routePoints.length - 1)) ? "#e4b548" : "#34513e"}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.12, duration: reducedMotion ? 0 : 0.3 }}
                />
                <text className="circuit-stop-label" x={point.x} y={point.y + (index % 2 === 0 ? 25 : -13)} textAnchor="middle" fill="#382f25" fontWeight="600">{point.label}</text>
              </g>
            ))}
            <motion.circle cx={mapPoint.x} cy={mapPoint.y} r="12" fill="none" stroke="#e4b548" strokeWidth="3" animate={reducedMotion ? undefined : { scale: [1, 1.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
          </svg>
          <figcaption className="mt-3 text-center text-xs leading-5 text-muted">Illustrative route diagram, not a navigational map. Each stop is approximate.</figcaption>
          <p className="sr-only" aria-live="polite">Day {day}: {stop.label}; camp {selected.sleepM.toLocaleString("en-US")} metres, daily high {selected.highM.toLocaleString("en-US")} metres.</p>
        </figure>
      </div>
    </section>
  );
}
