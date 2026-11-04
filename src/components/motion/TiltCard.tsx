"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

// Props: card content with optional className; tilt is limited to fine pointers.
export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotionPreference();
  const [finePointer, setFinePointer] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!finePointer || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setRotation({ x: y * -8, y: x * 8 });
  };

  return (
    <motion.div
      className={`group relative transform-gpu ${className}`}
      onMouseMove={move}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      animate={reducedMotion ? undefined : { rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {finePointer && !reducedMotion ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" /> : null}
    </motion.div>
  );
}
