"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { KiliRoute, ProfilePoint } from "@/data/kilimanjaro";

interface Props {
  route?: KiliRoute;
  profile?: ProfilePoint[];
  routeName?: string;
  compact?: boolean;
  showToggle?: boolean;
}

const W = 800;
const H = 340;
const PAD = { l: 56, r: 24, t: 24, b: 64 };
const MIN = 1500;
const MAX = 6000;

export default function AltitudeProfile({ route, profile, routeName, compact = false, showToggle = true }: Props) {
  const [showHigh, setShowHigh] = useState(true);
  const reduce = useReducedMotion();
  const id = useId();
  const points = profile ?? route?.profile;
  const name = routeName ?? route?.name;
  if (!points || !name) throw new Error("AltitudeProfile requires a route or both profile and routeName.");
  const x = (index: number) => PAD.l + (index / Math.max(1, points.length - 1)) * (W - PAD.l - PAD.r);
  const y = (metres: number) => PAD.t + (1 - (metres - MIN) / (MAX - MIN)) * (H - PAD.t - PAD.b);
  const path = (key: "sleepM" | "highM") => points.map((point, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)} ${y(point[key]).toFixed(1)}`).join(" ");
  const grid = [2000, 3000, 4000, 5000, 5895];
  const transition = reduce ? { duration: 0 } : { duration: 1.6, ease: "easeInOut" as const };

  return (
    <figure className="w-full min-w-0">
      {showToggle && !compact ? (
        <label className="mb-3 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-earth">
          <input type="checkbox" checked={showHigh} onChange={(event) => setShowHigh(event.target.checked)} className="size-4 accent-terracotta" />
          Show daily high points
        </label>
      ) : null}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto min-w-[560px] w-full" role="img" aria-labelledby={`${id}-title`}>
          <title id={`${id}-title`}>{`Altitude profile of the ${name} route`}</title>
          {grid.map((altitude) => (
            <g key={altitude}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(altitude)} y2={y(altitude)} stroke="currentColor" strokeOpacity={altitude === 5895 ? 0.45 : 0.12} strokeDasharray={altitude === 5895 ? "4 4" : undefined} />
              <text x={PAD.l - 8} y={y(altitude) + 4} textAnchor="end" fontSize="11" fill="currentColor" opacity="0.7">{altitude === 5895 ? "5,895" : altitude.toLocaleString("en-US")}</text>
            </g>
          ))}
          <text x={PAD.l} y={y(5895) - 6} fontSize="11" fill="currentColor" opacity="0.8">Uhuru Peak</text>
          {showHigh ? <motion.path d={path("highM")} fill="none" stroke="#d9a441" strokeWidth="2" strokeDasharray="6 6" initial={reduce ? false : { pathLength: 0 }} whileInView={reduce ? undefined : { pathLength: 1 }} viewport={{ once: true }} transition={transition} /> : null}
          <motion.path d={path("sleepM")} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" initial={reduce ? false : { pathLength: 0 }} whileInView={reduce ? undefined : { pathLength: 1 }} viewport={{ once: true }} transition={transition} />
          {points.map((point, index) => (
            <g key={point.day}>
              <circle cx={x(index)} cy={y(point.sleepM)} r={5} fill="#d9a441" />
              <text x={x(index)} y={H - 40} textAnchor="middle" fontSize="11" fill="currentColor">Day {point.day}</text>
              {!compact && points.length <= 7 ? <text className="hidden sm:block" x={x(index)} y={H - 24} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">{point.label}</text> : null}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-xs leading-5 text-muted">Altitudes are approximate. Solid line: where you sleep. Dashed line: highest point each day.</figcaption>
      <table className="sr-only">
        <caption>{`Altitude profile data for the ${name} route`}</caption>
        <thead><tr><th>Day</th><th>Camp</th><th>Sleeping altitude (m)</th><th>Highest point (m)</th></tr></thead>
        <tbody>{points.map((point) => <tr key={point.day}><td>{point.day}</td><td>{point.label}</td><td>{point.sleepM}</td><td>{point.highM}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}
