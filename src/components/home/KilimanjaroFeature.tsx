import Link from "next/link";
import { Check } from "lucide-react";
import { homeCopy, kilimanjaro } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";

export default function KilimanjaroFeature() {
  return (
    <div className="relative isolate overflow-hidden bg-forest">
      <SmartImage src="/images/home/kilimanjaro-banner.jpg" alt="Mount Kilimanjaro rising above the landscape" sizes="100vw" fill className="object-cover" />
      <div className="absolute inset-0 bg-forest/80" />
      <Container className="relative grid min-h-[700px] items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gold">{homeCopy.kilimanjaroHeading.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl leading-tight text-cream sm:text-5xl">{homeCopy.kilimanjaroHeading.title}</h2>
          <p className="mt-5 max-w-2xl leading-7 text-cream/85">{kilimanjaro.paragraph}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {kilimanjaro.routes.map((route) => <Link key={route.href} href={route.href} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">{route.label}</Link>)}
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-cream/90">
            {kilimanjaro.highlights.map((highlight) => <li key={highlight} className="flex gap-2"><Check aria-hidden="true" className="size-5 shrink-0 text-gold" />{highlight}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/kilimanjaro" variant="light">Explore Kilimanjaro Climbs</Button>
            <Button href="/kilimanjaro/women-only-climbs" variant="outline-light">Women-Only Climbs</Button>
          </div>
        </Reveal>
        <Reveal className="rounded-3xl border border-white/25 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-md md:p-9">
          <h3 className="mb-6 font-heading text-2xl">The mountain, at a glance</h3>
          <div className="grid gap-5">
            {kilimanjaro.facts.map((fact) => {
              const [title, description] = fact.split("|");
              return <div key={fact} className="border-b border-white/20 pb-5 last:border-0 last:pb-0"><p className="font-heading text-3xl text-gold">{title}</p><p className="mt-1 text-sm text-white/80">{description}</p></div>;
            })}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
