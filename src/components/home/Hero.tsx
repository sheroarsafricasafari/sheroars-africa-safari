import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import QuickInquiry from "@/components/home/QuickInquiry";

export default function Hero() {
  return (
    <div className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest px-5 pb-8 pt-28 text-white sm:px-8 md:pb-10">
      <SmartImage src="/images/home/hero.jpg" alt="Golden light over Tanzania's open savanna" sizes="100vw" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-forest/45 to-forest/20" aria-hidden="true" />
      <Container className="relative z-10 mb-9 w-full">
        <div className="max-w-3xl md:mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">{homeCopy.hero.eyebrow}</p>
          <h1 className="max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl md:text-7xl">{homeCopy.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{homeCopy.hero.description}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button href="/safaris" size="lg">Explore Safaris</Button>
            <Button href="/plan-your-safari" variant="outline-light" size="lg">Plan My Trip</Button>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/80 md:block">
        <Link href="#trust" aria-label="Scroll to discover" className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em]">
          Discover <ArrowDown className="size-4 motion-safe:animate-bounce" />
        </Link>
      </div>
      <Container className="relative z-20 w-full translate-y-12">
        <QuickInquiry />
      </Container>
    </div>
  );
}
