"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: verified numeric value, optional label, duration and className.
export default function CountUp({
  value,
  label,
  duration = 1.2,
  className = "",
}: {
  value: number;
  label?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotionPreference();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      setCount(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, inView, reducedMotion, value]);

  const displayCount = reducedMotion ? value : count;
  return <span ref={ref} className={className} aria-label={label ? `${value} ${label}` : String(value)}>{displayCount}</span>;
}
