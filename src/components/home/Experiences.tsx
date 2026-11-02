import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

export default function Experiences() {
  return (
    <Container>
      <SectionHeading {...homeCopy.experiencesHeading} />
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {experiences.map((experience) => (
          <Reveal key={experience.title} className="min-w-[78%] snap-start sm:min-w-0">
            <Link href={experience.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-forest text-white shadow-lg">
              <SmartImage src={experience.image} alt={experience.title} sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 20vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/15 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-heading text-2xl">{experience.title}</h3>
                <p className="mt-2 text-sm leading-5 text-white/85">{experience.description}</p>
                <ArrowUpRight aria-hidden="true" className="mt-4 size-5 text-gold" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center"><Button href="/experiences" variant="secondary">See All Experiences</Button></div>
    </Container>
  );
}
