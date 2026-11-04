"use client";

import { motion, useScroll } from "framer-motion";
import type { RefObject } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: observed section ref and optional className for a top-origin vertical progress line.
export default function ScrollProgressLine({
  target,
  className = "",
}: {
  target: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target, offset: ["start 0.8", "end 0.6"] });
  return (
    <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-px bg-earth/10 ${className}`}>
      <motion.span
        className="block h-full w-full origin-top bg-terracotta"
        style={reducedMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
      />
    </span>
  );
}
