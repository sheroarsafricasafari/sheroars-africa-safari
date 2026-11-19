"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SUMMIT_NIGHT } from "@/data/kilimanjaro";

const STARS = [
  [5, 8, 2], [12, 24, 1], [18, 12, 2], [25, 34, 1], [32, 7, 1], [39, 20, 2], [46, 10, 1], [53, 29, 2], [60, 6, 1], [67, 18, 2],
  [74, 9, 1], [81, 31, 2], [89, 15, 1], [96, 7, 2], [8, 48, 1], [16, 63, 2], [23, 55, 1], [31, 76, 2], [38, 48, 1], [45, 70, 2],
  [52, 57, 1], [59, 82, 2], [66, 47, 1], [73, 68, 2], [80, 52, 1], [87, 74, 2], [94, 58, 1], [4, 88, 2], [14, 93, 1], [27, 91, 2],
  [35, 96, 1], [48, 91, 2], [57, 96, 1], [69, 90, 2], [77, 97, 1], [85, 88, 2], [92, 95, 1], [99, 86, 2], [21, 43, 1], [42, 37, 2],
];

export default function SummitNightTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const altitude = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [4650, 4700, 5300, 5756, 5895, 4650]);
  const [currentAltitude, setCurrentAltitude] = useState(4650);

  useMotionValueEvent(altitude, "change", (value) => setCurrentAltitude(Math.round(value)));

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map(([top, left, size], index) => (
          <motion.span key={index} className="absolute rounded-full bg-white" style={{ top: `${top}%`, left: `${left}%`, width: size, height: size }} animate={reduce ? { opacity: 0.5 } : { opacity: [0.3, 1, 0.3] }} transition={reduce ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: (index % 8) * 0.2 }} />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-8 left-[1.125rem] top-8 w-px bg-white/15" aria-hidden="true" />
        <motion.div className="absolute left-[1.125rem] top-8 w-px origin-top bg-gold" aria-hidden="true" style={{ height: "calc(100% - 4rem)", scaleY: reduce ? 1 : scaleY }} />
        <ol className="space-y-3">
          {SUMMIT_NIGHT.map((step) => (
            <li key={step.time} className="relative pl-14">
              <span className="absolute left-2 top-7 size-3 rounded-full border-2 border-gold bg-earth" aria-hidden="true" />
              <article className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{step.time} | approx. {step.altitudeM.toLocaleString("en-US")} m</p>
                <h3 className="mt-2 font-heading text-2xl text-cream">{step.title}</h3>
                <p className="mt-2 leading-7 text-cream/80">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <p className="relative mt-8 text-center text-sm text-cream/75" aria-live="polite">Approx. altitude: {reduce ? "5,895" : currentAltitude.toLocaleString("en-US")} m</p>
    </div>
  );
}
