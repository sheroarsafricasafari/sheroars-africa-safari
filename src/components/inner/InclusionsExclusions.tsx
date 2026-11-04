import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

// Props: included/excluded lists, optional footnote, and className.
type InclusionsExclusionsProps = {
  included: string[];
  excluded: string[];
  footnote?: string;
  className?: string;
};

export default function InclusionsExclusions({ included, excluded, footnote, className }: InclusionsExclusionsProps) {
  const lists = [
    { title: "What's Included", items: included, Icon: Check, color: "text-forest" },
    { title: "What's Not Included", items: excluded, Icon: X, color: "text-muted" },
  ];
  return (
    <div className={cn("grid gap-5 md:grid-cols-2", className)}>
      {lists.map(({ title, items, Icon, color }) => (
        <section key={title} className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h3 className="font-heading text-2xl text-earth">{title}</h3>
          <ul className="mt-5 grid gap-3">
            {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted"><Icon aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", color)} />{item}</li>)}
          </ul>
        </section>
      ))}
      {footnote ? <p className="text-sm leading-6 text-muted md:col-span-2">{footnote}</p> : null}
    </div>
  );
}
