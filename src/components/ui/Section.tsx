import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  background?: "cream" | "sand" | "forest";
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
};

const backgrounds = {
  cream: "bg-cream text-earth",
  sand: "bg-sand text-earth",
  forest: "bg-forest text-cream",
};

export default function Section({ id, background = "cream", children, className = "", ariaLabelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}>
      {children}
    </section>
  );
}
