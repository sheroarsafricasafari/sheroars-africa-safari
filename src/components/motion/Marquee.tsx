"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import type { ReactNode } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: ticker items rendered in a continuous, hover-pausable editorial marquee.
export default function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reducedMotion = useReducedMotionPreference();
  if (reducedMotion) {
    return <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>{items.map((item, index) => <span key={index}>{item}</span>)}</div>;
  }
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center gap-8 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]" style={{ animationPlayState: inView ? "running" : "paused" }}>
        <div className="flex items-center gap-8">{items.map((item, index) => <span key={index}>{item}</span>)}</div>
        <div aria-hidden="true" className="flex items-center gap-8">{items.map((item, index) => <span key={index}>{item}</span>)}</div>
      </div>
      <style jsx>{`
        .marquee-track { animation: safari-marquee 60s linear infinite; }
        @keyframes safari-marquee { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; width: auto; flex-wrap: wrap; }
          .marquee-track > div[aria-hidden="true"] { display: none; }
        }
      `}</style>
    </div>
  );
}
