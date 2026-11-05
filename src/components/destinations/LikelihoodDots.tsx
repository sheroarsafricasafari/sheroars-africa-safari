"use client";

import { motion } from "framer-motion";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: accessible five-dot likelihood score with optional animation when it enters view.
export default function LikelihoodDots({ name, value }: { name: string; value: number }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <span className="inline-flex items-center gap-1.5" role="meter" aria-label={`${name} likelihood guide`} aria-valuemin={1} aria-valuemax={5} aria-valuenow={value}>
      {Array.from({ length: 5 }, (_, index) => <motion.span
        key={index}
        aria-hidden="true"
        className={`size-2.5 rounded-full ${index < value ? "bg-terracotta" : "bg-sand"}`}
        initial={reducedMotion ? false : { opacity: 0.35, scale: 0.8 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : index * 0.05 }}
      />)}
    </span>
  );
}
