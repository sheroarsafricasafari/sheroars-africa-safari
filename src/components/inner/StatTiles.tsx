import { cn } from "@/lib/cn";

// Props: fact tiles with supplied values and labels, and className.
type StatTilesProps = { items: { value: string; label: string }[]; className?: string };

export default function StatTiles({ items, className }: StatTilesProps) {
  return (
    <dl className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item) => <div key={`${item.value}-${item.label}`} className="rounded-2xl bg-white p-6 text-center shadow-card"><dt className="font-heading text-3xl text-terracotta">{item.value}</dt><dd className="mt-2 text-sm leading-5 text-muted">{item.label}</dd></div>)}
    </dl>
  );
}
