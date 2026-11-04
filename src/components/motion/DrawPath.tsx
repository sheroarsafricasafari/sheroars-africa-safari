"use client";

import { motion } from "framer-motion";
import { Children } from "react";
import type { ReactNode } from "react";
import { revealSpring } from "@/components/motion/easings";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: SVG path data, optional SVG child nodes, and className for the SVG.
export default function DrawPath({
  d,
  children,
  className = "",
}: {
  d: string;
  children?: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={reducedMotion ? false : { pathLength: 0 }}
        whileInView={reducedMotion ? undefined : { pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {Children.toArray(children).map((child, index, nodes) => (
        <motion.g
          key={index}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...revealSpring, delay: 0.1 + (index / Math.max(1, nodes.length - 1)) * 1.6 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {child}
        </motion.g>
      ))}
    </svg>
  );
}
