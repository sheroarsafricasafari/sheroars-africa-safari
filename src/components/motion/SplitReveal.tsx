"use client";

import { motion } from "framer-motion";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: heading text and optional className for the animated heading.
export default function SplitReveal({ text, className = "" }: { text: string; className?: string }) {
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
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
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
