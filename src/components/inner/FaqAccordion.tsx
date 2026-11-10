import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/seo";

// Props: FAQ entries, optional JSON-LD toggle, and className.
type FaqAccordionProps = {
  items: {
    question: string;
    answer: string;
    href?: string;
    linkLabel?: string;
    externalLink?: { label: string; href: string };
  }[];
  jsonLd?: boolean;
  className?: string;
};

export default function FaqAccordion({ items, jsonLd = false, className }: FaqAccordionProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map(({ question, answer, href, linkLabel, externalLink }) => (
        <details key={question} className="group rounded-2xl border border-sand/80 bg-white px-5 py-4 shadow-sm transition-colors open:bg-cream sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-semibold text-earth marker:hidden [&::-webkit-details-marker]:hidden">
            {question}<ChevronDown aria-hidden="true" className="size-5 shrink-0 text-terracotta transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-muted">{answer}</p>
          {href ? <Link href={href} className="inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{linkLabel ?? "Read the guide"}</Link> : null}
          {externalLink ? <a href={externalLink.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">{externalLink.label}</a> : null}
        </details>
      ))}
      {jsonLd ? <JsonLd data={buildFaqJsonLd(items)} /> : null}
    </div>
  );
}
