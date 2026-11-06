import { Award, Map, Sparkles } from "lucide-react";
import PageHero from "@/components/inner/PageHero";
import MagneticButton from "@/components/motion/MagneticButton";
import SplitReveal from "@/components/motion/SplitReveal";
import Button from "@/components/ui/Button";
import type { DestinationHeroData } from "@/types/destination";
import { DestinationScrollCue } from "@/components/destinations/Interactive";

// Props: destination hero copy, image, fact chips and the primary/secondary CTA definitions.
export default function DestinationHero({ data, breadcrumbs, className }: { data: DestinationHeroData; breadcrumbs?: { title: string; href: string }[]; className?: string }) {
  const icons = [Award, Sparkles, Map];
  return (
    <PageHero
      eyebrow={data.eyebrow}
      title={data.title}
      titleContent={<SplitReveal text={data.title} />}
      subtitle={data.subtitle}
      image={{ src: data.image, alt: `${data.title}, Tanzania` }}
      parallax
      breadcrumbs={breadcrumbs}
      id="destination-hero"
      className={className}
      afterSubtitle={
        <div className="mt-6">
          <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
            {data.chips.map((chip, index) => {
              const Icon = icons[index % icons.length];
              return <li key={chip} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white shadow-sm backdrop-blur-md"><Icon aria-hidden="true" size={15} />{chip}</li>;
            })}
          </ul>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <MagneticButton><Button href={data.primary.href} size="lg">{data.primary.label}</Button></MagneticButton>
            <Button href={data.secondary.href} variant="outline-light" size="lg">{data.secondary.label}</Button>
          </div>
          <DestinationScrollCue />
        </div>
      }
    />
  );
}
