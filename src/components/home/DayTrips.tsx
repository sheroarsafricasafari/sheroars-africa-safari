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
      <div className="grid gap-5 md:grid-cols-2">
        {dayTrips.map((trip) => (
          <Reveal key={trip.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <Link href={trip.href} className="group grid h-full sm:grid-cols-[0.85fr_1.15fr]">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                <SmartImage src={trip.image} alt={trip.title} sizes="(max-width: 640px) 100vw, 35vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-5 sm:p-6">
                <h3 className="font-heading text-xl">{trip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{trip.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-terracotta">Explore day trip <ArrowRight size={16} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/day-trips" variant="secondary">View All Day Trips</Button></div>
    </Container>
  );
}
