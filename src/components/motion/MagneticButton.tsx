"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: button/link child and optional className; cursor pull is capped at eight pixels.
export default function MagneticButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotionPreference();
  const [finePointer, setFinePointer] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const move = (event: MouseEvent<HTMLSpanElement>) => {
    if (!finePointer || reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: Math.max(-8, Math.min(8, (event.clientX - rect.left - rect.width / 2) * 0.12)),
      y: Math.max(-8, Math.min(8, (event.clientY - rect.top - rect.height / 2) * 0.12)),
    });
  };

  return (
    <motion.span
      className={`inline-flex ${className}`}
      onMouseMove={move}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={reducedMotion ? undefined : offset}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      {children}
    </motion.span>
  );
}
