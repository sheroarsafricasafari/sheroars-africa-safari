"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
