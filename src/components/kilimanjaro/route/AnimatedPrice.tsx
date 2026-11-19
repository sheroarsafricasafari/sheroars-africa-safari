"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

const formatPrice = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(Math.round(value));

export default function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    if (reduceMotion) {
      previous.current = value;
      return;
    }

    const controls = animate(previous.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: setShown,
    });
    previous.current = value;
    return () => controls.stop();
  }, [reduceMotion, value]);

  return <span aria-live="polite" aria-atomic="true" className={className}>{formatPrice(reduceMotion ? value : shown)}</span>;
}
