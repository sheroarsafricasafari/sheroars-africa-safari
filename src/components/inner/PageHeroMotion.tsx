"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function PageHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } } }}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHeroMotionItem({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reducedMotion ? {} : { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.7 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
