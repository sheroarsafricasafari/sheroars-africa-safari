import { KILI_FACTS, PARK_FEE_TOTALS } from "@/data/kilimanjaro";

const fees = [
  ["Conservation fee", KILI_FACTS.parkFeesUsd.conservationPerDay, "per day"],
  ["Camping fee", KILI_FACTS.parkFeesUsd.campingPerNight, "per night"],
  ["Hut fee (Marangu only)", KILI_FACTS.parkFeesUsd.hutPerNight, "per night"],
  ["Rescue fee", KILI_FACTS.parkFeesUsd.rescueOnce, "once per climb"],
] as const;

export default function FeeBreakdown() {
  return (
    <div className="rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
      <h3 className="font-heading text-2xl text-earth">Kilimanjaro National Park fees</h3>
      <p className="mt-2 text-sm leading-6 text-muted">Per adult international climber, 2026 to 2027, including 18% VAT.</p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead><tr className="border-b border-sand text-muted"><th scope="col" className="py-3 pr-3">Fee</th><th scope="col" className="py-3 pr-3">USD</th><th scope="col" className="py-3">Basis</th></tr></thead>
          <tbody>{fees.map(([label, value, basis]) => <tr key={label} className="border-b border-sand/70"><th scope="row" className="py-3 pr-3 font-medium text-earth">{label}</th><td className="py-3 pr-3">${value.toFixed(2)}</td><td className="py-3">{basis}</td></tr>)}</tbody>
        </table>
      </div>
      <h4 className="mt-7 font-semibold text-earth">Typical park-fee totals per climber</h4>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <tbody>{PARK_FEE_TOTALS.map(({ label, usd }) => <tr key={label} className="border-b border-sand/70"><th scope="row" className="py-2.5 pr-3 font-medium text-muted">{label}</th><td className="py-2.5 text-right font-semibold text-earth">${usd.toLocaleString("en-US")}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">Park fees are set by Tanzania National Parks and can change. They are included in our climb prices.</p>
    </div>
  );
}
