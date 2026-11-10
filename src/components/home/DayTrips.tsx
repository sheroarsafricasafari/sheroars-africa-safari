import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dayTrips } from "@/data/dayTrips";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

export default function DayTrips() {
  return (
    <Container>
      <SectionHeading {...homeCopy.dayTripsHeading} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dayTrips.map((trip) => (
          <Reveal key={trip.title} className="h-full">
            <Link
              href={trip.href}
              className="group relative flex aspect-[3/4] min-h-[25rem] h-full flex-col overflow-hidden rounded-2xl bg-forest text-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <SmartImage
                src={trip.image}
                alt={trip.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                fill
                className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/25 to-transparent" />
              <span className="relative mt-auto p-5 sm:p-6">
                <h3 className="font-heading text-2xl text-white">{trip.title}</h3>
                <span className="mt-2 block text-sm leading-6 text-white/90">{trip.description}</span>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold">
                  Explore day trip <ArrowRight aria-hidden="true" size={16} />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/day-trips" variant="secondary">View All Day Trips</Button></div>
    </Container>
  );
}
