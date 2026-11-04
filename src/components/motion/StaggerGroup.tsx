"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { editorialEase, revealSpring } from "@/components/motion/easings";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: children, className and optional child stagger interval.
export function StaggerGroup({ children, className = "", staggerChildren = 0.08 }: { children: ReactNode; className?: string; staggerChildren?: number }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren } } }}
    >
      {children}
    </motion.div>
  );
}

// Props: child content, optional className, delay and spring-based entrance.
export function StaggerItem({ children, className = "", delay = 0, spring = false }: { children: ReactNode; className?: string; delay?: number; spring?: boolean }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <motion.div
      className={className}
      variants={reducedMotion ? undefined : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
      transition={spring ? { ...revealSpring, delay } : { duration: 0.5, delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
