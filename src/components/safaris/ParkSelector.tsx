"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { SafariHubData } from "@/types/safari-hub";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

export default function ParkSelector({ parks }: { parks: SafariHubData["parks"] }) {
  const [active, setActive] = useState(0);
  const cardLinks = useRef<Array<HTMLAnchorElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();
  const activateWithArrow = (index: number, event: KeyboardEvent<HTMLAnchorElement>) => {
    const nextIndex = event.key === "ArrowRight" || event.key === "ArrowDown"
      ? (index + 1) % parks.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp"
        ? (index + parks.length - 1) % parks.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? parks.length - 1
            : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    setActive(nextIndex);
    cardLinks.current[nextIndex]?.focus();
  };

  return (
    <>
      <div role="group" aria-label="Explore Tanzania's national parks" className="hidden h-[640px] gap-3 md:flex">
        {parks.map((park, index) => {
          const expanded = active === index;
          return (
            <div
              key={park.name}
              className={`group relative isolate overflow-hidden rounded-3xl ${reducedMotion ? "transition-none" : "transition-[flex-grow] duration-700"} ${expanded ? "flex-[3]" : "flex-1"}`}
            >
              <SmartImage src={park.image} alt={`${park.name} landscape`} sizes="(max-width: 1200px) 25vw, 30vw" fill className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/20 to-earth/10" />
              <Link
                ref={(element) => { cardLinks.current[index] = element; }}
                href={park.href}
                tabIndex={expanded ? 0 : -1}
                aria-label={`Explore ${park.name}: ${park.tagline}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onKeyDown={(event) => activateWithArrow(index, event)}
                className="absolute inset-0 z-10 cursor-pointer rounded-3xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-gold"
              />
              {!expanded ? (
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                  <span className="origin-center -rotate-90 whitespace-nowrap font-heading text-3xl text-white">{park.name}</span>
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={park.name}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-7 text-white"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  >
                    <p className="text-eyebrow text-gold">Northern Circuit</p>
                    <h3 className="mt-2 font-heading text-4xl">{park.name}</h3>
                    <p className="mt-2 max-w-md text-cream/90">{park.tagline}</p>
                    <ul className="mt-4 grid gap-2 text-sm text-cream/90">
                      {park.facts.slice(0, 3).map((fact) => <li key={fact} className="flex items-start gap-2"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />{fact}</li>)}
                    </ul>
                    <p className="mt-4 text-sm"><strong>Best time:</strong> {park.bestTime}</p>
                    <div className="mt-3 flex flex-wrap gap-2">{park.wildlife.slice(0, 6).map((animal) => <span key={animal} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs">{animal}</span>)}</div>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-gold">
                      Explore {park.name}<ArrowRight aria-hidden="true" size={17} />
                    </span>
                  </motion.div>
                </AnimatePresence>
              )}
              <div className="sr-only">
                <h3>{park.name}</h3><p>{park.tagline}</p>
                <ul>{park.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                <p>Best time: {park.bestTime}</p><p>Wildlife: {park.wildlife.join(", ")}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:hidden">
        {parks.map((park) => (
          <Link
            key={park.name}
            href={park.href}
            className="group block overflow-hidden rounded-3xl bg-white shadow-card transition-shadow hover:shadow-lift focus-visible:outline focus-visible:outline-4 focus-visible:outline-terracotta"
          >
            <div className="relative min-h-64 text-white">
              <SmartImage src={park.image} alt={`${park.name} landscape`} sizes="100vw" fill className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/90 to-transparent" />
              <span className="absolute inset-x-6 bottom-6">
                <span className="block font-heading text-3xl">{park.name}</span>
                <span className="mt-1 block text-sm text-white/85">{park.tagline}</span>
              </span>
            </div>
            <div className="space-y-4 p-5 text-sm text-muted">
              <ul className="grid gap-2">{park.facts.slice(0, 3).map((fact) => <li key={fact} className="flex gap-2"><Check aria-hidden="true" className="size-4 shrink-0 text-terracotta" />{fact}</li>)}</ul>
              <p><strong className="text-earth">Best time:</strong> {park.bestTime}</p>
              <p>{park.wildlife.join(" · ")}</p>
              <span className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">Explore {park.name}<ArrowRight aria-hidden="true" size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
