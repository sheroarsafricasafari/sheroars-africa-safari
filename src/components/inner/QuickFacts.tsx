import { CalendarDays, Clock3, MapPin, Mountain, ShieldCheck, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

// Props: trip facts, package slug, optional group/route details, and className.
export type QuickFactsProps = {
  duration?: string;
  difficulty?: string;
  bestTime?: string;
  groupSize?: string;
  location?: string;
  priceFrom: number | null;
  packageSlug: string;
  className?: string;
};

const icons = [Clock3, Mountain, CalendarDays, Users, MapPin] as const;

export default function QuickFacts({ duration, difficulty, bestTime, groupSize, location, priceFrom, packageSlug, className }: QuickFactsProps) {
  const rows = [
    duration ? ["Duration", duration] : null,
    difficulty ? ["Difficulty", difficulty] : null,
    bestTime ? ["Best time", bestTime] : null,
    groupSize ? ["Group size", groupSize] : null,
    location ? ["Parks or route", location] : null,
    ["Starting from", priceFrom === null ? "Price on request" : `From $${priceFrom.toLocaleString()} per person`],
  ].filter((row): row is [string, string] => row !== null);

  return (
    <aside className={cn("sticky top-28 rounded-2xl border-t-2 border-gold bg-white p-6 shadow-card sm:p-8", className)}>
      <h2 className="font-heading text-2xl text-earth">Journey at a glance</h2>
      <dl className="mt-6 grid gap-5">
        {rows.map(([label, value], index) => {
          const Icon = icons[Math.min(index, icons.length - 1)];
          return (
            <div key={label} className="flex gap-3">
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-terracotta" />
              <div><dt className="text-eyebrow text-muted">{label}</dt><dd className="mt-1 font-semibold text-earth">{value}</dd></div>
            </div>
          );
        })}
      </dl>
      <div className="mt-7 grid gap-3">
        <Button href={`/plan-your-safari?package=${encodeURIComponent(packageSlug)}`} className="w-full">Plan This Journey</Button>
        <Button href={`https://wa.me/${siteConfig.whatsappNumber}`} variant="secondary" className="w-full">Ask on WhatsApp</Button>
      </div>
      <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted"><ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" />No obligation. Reply within 24 hours. <span className="sr-only">TODO(CONFIRM): verify response-time promise.</span></p>
    </aside>
  );
}
