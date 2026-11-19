import type { KiliRoute } from "@/data/kilimanjaro";

const labels = [
  ["Difficulty", "difficulty"],
  ["Scenery", "scenery"],
  ["Crowd level", "crowds"],
  ["Acclimatisation", "acclimatisation"],
] as const;

export default function RouteStatBars({ route }: { route: KiliRoute }) {
  const stats = [
    ...labels.map(([label, key]) => ({ label, value: route[key] })),
    { label: "Summit success", value: Math.min(5, Math.round(route.successPct / 20)) },
  ];

  return (
    <dl className="space-y-3">
      {stats.map(({ label, value }) => (
        <div key={label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 text-sm">
          <dt className="text-muted">{label}</dt>
          <dd className="flex items-center gap-1.5" aria-label={`${label} ${value} out of 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} aria-hidden="true" className={`size-2.5 rounded-full ${index < value ? "bg-gold" : "border border-sand bg-transparent"}`} />
            ))}
            <span className="sr-only">{value} out of 5</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
