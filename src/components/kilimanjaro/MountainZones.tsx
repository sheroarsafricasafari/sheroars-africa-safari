"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { ZONES } from "@/data/kilimanjaro";

const MARKER_Y = [470, 390, 305, 215, 130];
const BAND_FILLS = ["#6f8f4a", "#2f6b4a", "#8a8a52", "#8c7a63", "#dfe9f0"];

export default function MountainZones() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observers = refs.current.map((element, index) => {
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(index);
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const zone = ZONES[active] ?? ZONES[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-32 flex h-[calc(100vh-10rem)] flex-col items-center justify-center">
          <svg viewBox="0 0 400 500" className="h-full max-h-[570px] w-full" role="img" aria-label="Cross-section of Mount Kilimanjaro showing five climate zones">
            <defs><clipPath id="kili-zone-clip"><path d="M0 500 L70 430 L130 385 L180 300 L215 200 L235 120 L260 95 L285 105 L310 140 L330 250 L370 340 L400 430 L400 500 Z" /></clipPath></defs>
            <g clipPath="url(#kili-zone-clip)">
              <rect x="0" y="90" width="400" height="85" fill={BAND_FILLS[4]} />
              <rect x="0" y="175" width="400" height="90" fill={BAND_FILLS[3]} />
              <rect x="0" y="265" width="400" height="90" fill={BAND_FILLS[2]} />
              <rect x="0" y="355" width="400" height="80" fill={BAND_FILLS[1]} />
              <rect x="0" y="435" width="400" height="70" fill={BAND_FILLS[0]} />
            </g>
            <path d="M0 500 L70 430 L130 385 L180 300 L215 200 L235 120 L260 95 L285 105 L310 140 L330 250 L370 340 L400 430 L400 500 Z" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
            <motion.g animate={{ y: MARKER_Y[active] - MARKER_Y[0] }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}>
              <circle cx="200" cy={MARKER_Y[0]} r="18" fill="#d9a441" fillOpacity="0.25" />
              <circle cx="200" cy={MARKER_Y[0]} r="8" fill="#d9a441" />
            </motion.g>
          </svg>
          <div className="mt-4 w-full max-w-sm rounded-2xl border border-white/15 bg-black/30 p-5 text-center backdrop-blur" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Current altitude</p>
            <p className="font-heading text-3xl">{zone.fromM.toLocaleString("en-US")} to {zone.toM.toLocaleString("en-US")} m</p>
            <p className="mt-2 text-sm text-cream/80">Approximate oxygen vs sea level: {zone.oxygen}</p>
            <p className="text-sm text-cream/80">Typical feel: {zone.feel}</p>
          </div>
        </div>
      </div>
      <ol className="space-y-8 lg:space-y-[32vh] lg:py-[10vh]">
        {ZONES.map((item, index) => (
          <li key={item.id} ref={(element) => { refs.current[index] = element; }} className="scroll-mt-32">
            <article className={`rounded-3xl border border-white/15 bg-white/[0.04] p-5 transition-opacity duration-500 sm:p-8 ${active === index ? "opacity-100" : "lg:opacity-45"}`}>
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Zone {index + 1} of 5 | approx. {item.fromM.toLocaleString("en-US")} to {item.toM.toLocaleString("en-US")} m</p>
              <h3 className="mt-2 font-heading text-2xl text-cream sm:text-3xl">{item.name}</h3>
              <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl">
                <SmartImage src={item.image} alt={`${item.name} landscape on Mount Kilimanjaro`} sizes="(max-width: 1024px) 100vw, 45vw" fill className="object-cover" />
              </div>
              <p className="mt-4 leading-7 text-cream/85">{item.story}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.lookFor.map((lookFor) => <li key={lookFor} className="rounded-full border border-white/20 px-3 py-1 text-sm text-cream/85">{lookFor}</li>)}
              </ul>
              <div className="mt-5 lg:hidden" aria-label={`Approximate oxygen ${item.oxygen}; ${item.feel}`}>
                <div className="h-1.5 rounded-full bg-white/15"><div className="h-1.5 rounded-full bg-gold" style={{ width: `${((index + 1) / ZONES.length) * 100}%` }} /></div>
                <p className="mt-2 text-xs text-cream/70">Approx. oxygen {item.oxygen} | {item.feel}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
