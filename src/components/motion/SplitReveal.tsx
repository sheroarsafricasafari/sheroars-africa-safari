"use client";

import { motion } from "framer-motion";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: heading text and optional className for the animated heading.
export default function SplitReveal({ text, className = "", eager = false }: { text: string; className?: string; eager?: boolean }) {
  const reducedMotion = useReducedMotionPreference();
  if (reducedMotion) return <span className={className}>{text}</span>;

  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em]">
        {text.split(/\s+/).map((word, index) => (
          <span key={`${word}-${index}`} className="overflow-hidden pb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={eager ? false : { y: "105%" }}
              animate={eager ? { y: 0 } : undefined}
              whileInView={eager ? undefined : { y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
