import { ArrowRight, CheckCircle2, Map, MessageCircle, Plane } from "lucide-react";
import { cn } from "@/lib/cn";

// Props: numbered steps with titles/descriptions, and className.
type StepsStripProps = {
  steps: { number: string; title: string; description: string; icon?: string }[];
  className?: string;
};

const icons = [MessageCircle, Map, CheckCircle2, Plane];

export default function StepsStrip({ steps, className }: StepsStripProps) {
  return (
    <ol className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((step, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li key={step.number} className="relative rounded-2xl bg-cream p-6 text-center">
            {index < steps.length - 1 ? <ArrowRight aria-hidden="true" className="absolute -right-4 top-8 hidden size-5 text-gold lg:block" /> : null}
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold font-heading text-xl text-forest">{step.number}</span>
            <Icon aria-hidden="true" className="mx-auto mt-5 size-6 text-terracotta" />
            <h3 className="mt-3 font-heading text-xl">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
