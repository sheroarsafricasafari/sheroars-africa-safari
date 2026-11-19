"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function AltitudeCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, 5895, { duration: 1.6, onUpdate: (next) => setValue(Math.round(next)) });
    return () => controls.stop();
  }, [inView, reducedMotion]);

  const displayValue = reducedMotion ? 5895 : value;
  return <span ref={ref} aria-label="5,895 metres">{new Intl.NumberFormat("en-US").format(displayValue)} m</span>;
}
