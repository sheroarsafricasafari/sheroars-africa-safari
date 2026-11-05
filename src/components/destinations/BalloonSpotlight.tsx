import { ArrowRight, Clock3, Sun, Utensils } from "lucide-react";
import Link from "next/link";
import Parallax from "@/components/motion/Parallax";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import type { SubRegionData } from "@/types/destination";

// Props: cinematic balloon experience content, background image, timeline steps, facts and two links.
export default function BalloonSpotlight({ data }: { data: SubRegionData["balloon"] }) {
  const icons = [Clock3, Sun, Utensils, ArrowRight];
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-forest text-cream">
      <Parallax className="absolute -inset-y-[8%] inset-x-0 overflow-hidden"><SmartImage src={data.image} alt="A balloon over the Serengeti at sunrise" sizes="100vw" fill className="object-cover opacity-45" /></Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/45" />
      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:p-14">
        <div><p className="text-eyebrow text-gold">{data.eyebrow}</p><h2 className="mt-4 max-w-xl font-heading text-4xl leading-tight sm:text-5xl">{data.title}</h2><p className="mt-5 max-w-2xl leading-7 text-cream/85">{data.description}</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button href={data.primary.href} variant="light">{data.primary.label}</Button><Link href={data.secondary.href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/50 px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">{data.secondary.label}<ArrowRight size={16} /></Link></div>
        </div>
        <div className="rounded-3xl border border-white/15 bg-forest/50 p-5 backdrop-blur-sm sm:p-7">
          <ol className="grid gap-4">{data.steps.map((step, index) => { const Icon = icons[index % icons.length]; return <li key={step} className="flex items-center gap-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Icon size={18} /></span><span className="font-medium">{step}</span></li>; })}</ol>
          <ul className="mt-6 grid gap-3 border-t border-white/15 pt-5 text-sm leading-6 text-cream/80">{data.facts.map((fact) => <li key={fact} className="flex gap-2"><span className="text-gold">*</span>{fact}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
