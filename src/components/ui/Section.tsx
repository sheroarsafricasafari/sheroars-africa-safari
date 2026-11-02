import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  background?: "cream" | "sand" | "forest";
  children: ReactNode;
  className?: string;
};

const backgrounds = {
  cream: "bg-cream text-earth",
  sand: "bg-sand text-earth",
  forest: "bg-forest text-cream",
};

export default function Section({ id, background = "cream", children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}>
      {children}
    </section>
  );
}
