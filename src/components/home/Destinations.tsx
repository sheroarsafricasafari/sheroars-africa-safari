import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { homeCopy } from "@/data/home";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

export default function Destinations() {
  return (
    <Container>
      <SectionHeading {...homeCopy.destinationHeading} />
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[230px] lg:grid-cols-6">
        {destinations.map((destination, index) => (
          <Reveal key={destination.name} className={`${index < 2 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2"} group`}>
            <Link href={destination.href} className="relative flex h-full min-h-[220px] overflow-hidden rounded-2xl bg-forest">
              <SmartImage src={destination.image} alt={`${destination.name} in Tanzania`} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/15 to-transparent" />
              <div className="relative mt-auto flex w-full items-end justify-between p-5 text-white sm:p-7">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl">{destination.name}</h3>
                  <p className="mt-1 text-sm text-white/85">{destination.teaser}</p>
                </div>
                <ArrowUpRight aria-hidden="true" className="mb-1 size-6 shrink-0 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
