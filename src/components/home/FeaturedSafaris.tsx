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
          <Reveal key={safari.slug} className="group">
            <Link
              href={`/safaris/packages/${safari.slug}`}
              className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-forest text-white shadow-[0_12px_35px_rgba(42,31,23,0.18)]"
            >
              <SmartImage
                src={safari.image}
                alt={`${safari.title} safari in ${safari.parks}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/30 to-earth/10" aria-hidden="true" />
              {safari.badge ? <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-forest">{safari.badge}</span> : null}
              <span className="absolute right-4 top-4 rounded-full border border-white/50 bg-earth/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{safari.duration}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-heading text-2xl text-white">{safari.title}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gold">{safari.parks}</p>
                <p className="mt-3 text-sm leading-6 text-white/90">{safari.highlight}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/30 pt-4">
                  <span className="text-sm font-bold text-white">{safari.priceFrom === null ? "Price on request" : `From $${safari.priceFrom.toLocaleString()} per person`}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-gold">View Journey <ArrowRight size={16} /></span>
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
