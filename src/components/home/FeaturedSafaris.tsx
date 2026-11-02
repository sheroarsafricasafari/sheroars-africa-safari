import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeCopy } from "@/data/home";
import { safaris } from "@/data/safaris";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

export default function FeaturedSafaris() {
  return (
    <Container>
      <SectionHeading {...homeCopy.safariHeading} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {safaris.map((safari) => (
          <Reveal key={safari.slug} className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(42,31,23,0.08)]">
            <Link href={`/safaris/packages/${safari.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage src={safari.image} alt={`${safari.title} safari in ${safari.parks}`} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                {safari.badge ? <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-forest">{safari.badge}</span> : null}
                <span className="absolute bottom-4 right-4 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-earth">{safari.duration}</span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-2xl">{safari.title}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-terracotta">{safari.parks}</p>
                <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{safari.highlight}</p>
                <div className="mt-5 flex items-center justify-between border-t border-sand pt-4">
                  <span className="text-sm font-bold">{safari.priceFrom === null ? "Price on request" : `From $${safari.priceFrom.toLocaleString()} per person`}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-terracotta">View Journey <ArrowRight size={16} /></span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center"><Button href="/safaris/packages" variant="secondary">View All Safaris</Button></div>
    </Container>
  );
}
