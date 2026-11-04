import { AlertTriangle, Info, Lightbulb, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Props: callout content, one of four visual variants, optional title and className.
type CalloutProps = {
  children: ReactNode;
  variant?: "tip" | "note" | "warning" | "safety";
  title?: string;
  className?: string;
};

const variants = {
  tip: { Icon: Lightbulb, style: "border-gold/40 bg-gold/15 text-earth" },
  note: { Icon: Info, style: "border-sand bg-sand/60 text-earth" },
  warning: { Icon: AlertTriangle, style: "border-terracotta/30 bg-terracotta/10 text-earth" },
  safety: { Icon: ShieldCheck, style: "border-forest/30 bg-forest text-cream" },
};

export default function Callout({ children, variant = "note", title, className }: CalloutProps) {
  const { Icon, style } = variants[variant];
  return (
    <aside className={cn("flex gap-4 rounded-2xl border p-5 sm:p-6", style, className)}>
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <div>{title ? <h3 className="font-semibold">{title}</h3> : null}<div className={cn("text-sm leading-6", title ? "mt-1" : "")}>{children}</div></div>
    </aside>
  );
}
