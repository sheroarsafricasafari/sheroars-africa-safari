import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

// Props: FAQ entries, optional JSON-LD toggle, and className.
type FaqAccordionProps = {
  items: { question: string; answer: string }[];
  jsonLd?: boolean;
  className?: string;
};

export default function FaqAccordion({ items, jsonLd = false, className }: FaqAccordionProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map(({ question, answer }) => (
        <details key={question} className="group rounded-2xl border border-sand/80 bg-white px-5 py-4 shadow-sm transition-colors open:bg-cream sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-semibold text-earth marker:hidden [&::-webkit-details-marker]:hidden">
            {question}<ChevronDown aria-hidden="true" className="size-5 shrink-0 text-terracotta transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-muted">{answer}</p>
        </details>
      ))}
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /> : null}
    </div>
  );
}
