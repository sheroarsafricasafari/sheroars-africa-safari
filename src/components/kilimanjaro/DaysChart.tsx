"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SUCCESS_BY_DAYS } from "@/data/kilimanjaro";

export default function DaysChart() {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="space-y-5" aria-hidden="true">
        {SUCCESS_BY_DAYS.map(({ days, pct }, index) => (
          <div key={days} className="grid grid-cols-[4rem_1fr] items-center gap-3">
            <span className="text-sm font-semibold text-earth">{days} days</span>
            <div className="h-9 overflow-hidden rounded-full bg-sand">
              <motion.div className="flex h-full items-center justify-end rounded-full bg-forest px-3 text-sm font-bold text-white" initial={reduce ? false : { width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : 1.2, ease: "easeOut", delay: reduce ? 0 : index * 0.12 }} style={reduce ? { width: `${pct}%` } : undefined}>
                {pct}%
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <table className="sr-only">
        <caption>Reported summit success by days on Kilimanjaro</caption>
        <thead><tr><th>Days on route</th><th>Reported summit success</th></tr></thead>
        <tbody>{SUCCESS_BY_DAYS.map(({ days, pct }) => <tr key={days}><td>{days}</td><td>{pct}%</td></tr>)}</tbody>
      </table>
    </div>
  );
}
