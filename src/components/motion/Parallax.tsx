"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: child content, optional travel range and axis for scroll-linked movement.
export default function Parallax({
  children,
  range = ["-8%", "8%"],
  axis = "y",
  className = "",
}: {
  children: ReactNode;
  range?: [string, string];
  axis?: "x" | "y";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const movement = useTransform(scrollYProgress, [0, 1], range);
  const style = axis === "x" ? { x: movement, willChange: "transform" as const } : { y: movement, willChange: "transform" as const };
  return (
    <div ref={ref} className={className}>
      <motion.div className="relative h-full" style={reducedMotion ? undefined : style}>
        {children}
      </motion.div>
    </div>
  );
}
