import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

// Props: column labels, row labels and values, optional caption and className.
export type ComparisonRow = { label: string; values: (string | number | boolean)[] };
type ComparisonTableProps = { columns: string[]; rows: ComparisonRow[]; caption: string; className?: string };

export default function ComparisonTable({ columns, rows, caption, className }: ComparisonTableProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl shadow-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-forest text-left text-cream">
            <tr><th scope="col" className="sticky left-0 z-10 bg-forest px-4 py-4 font-semibold">Feature</th>{columns.map((column) => <th key={column} scope="col" className="px-4 py-4 font-semibold">{column}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.label} className={cn(rowIndex % 2 === 0 ? "bg-sand/40" : "bg-white")}>
                <th scope="row" className={cn("sticky left-0 z-10 px-4 py-4 text-left font-semibold text-earth", rowIndex % 2 === 0 ? "bg-sand" : "bg-white")}>{row.label}</th>
                {row.values.map((value, index) => <td key={`${row.label}-${index}`} className="px-4 py-4 text-muted">{typeof value === "boolean" ? value ? <Check aria-label="Yes" className="size-4 text-forest" /> : <Minus aria-label="Not available" className="size-4 text-muted" /> : typeof value === "number" ? <RatingDots value={value} /> : value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l from-earth/10 to-transparent md:hidden" aria-hidden="true" />
    </div>
  );
}

function RatingDots({ value }: { value: number }) {
  return <span className="inline-flex gap-1" aria-label={`${value} out of 5`} role="img">{[1, 2, 3, 4, 5].map((dot) => <i key={dot} className={cn("size-2 rounded-full", dot <= value ? "bg-terracotta" : "bg-sand")} />)}</span>;
}
