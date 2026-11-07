"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { SafariHubData } from "@/types/safari-hub";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";

export default function ParkSelector({ parks }: { parks: SafariHubData["parks"] }) {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [mobileViewportRef, mobileApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", loop: false });
  const cardLinks = useRef<Array<HTMLAnchorElement | null>>([]);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!mobileApi) return;
    const updateMobileActive = () => setMobileActive(mobileApi.selectedScrollSnap());
    updateMobileActive();
    mobileApi.on("select", updateMobileActive);
    mobileApi.on("reInit", updateMobileActive);
    return () => {
      mobileApi.off("select", updateMobileActive);
      mobileApi.off("reInit", updateMobileActive);
    };
  }, [mobileApi]);

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

  const scrollMobile = (direction: "previous" | "next") => {
    if (direction === "previous") mobileApi?.scrollPrev();
    else mobileApi?.scrollNext();
  };

  const selectMobile = (index: number) => {
    mobileApi?.scrollTo(index);
    setMobileActive(index);
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

      <div className="md:hidden">
        <div ref={mobileViewportRef} className="overflow-hidden">
          <div className="-ml-3 flex touch-pan-y sm:-ml-4">
            {parks.map((park, index) => (
              <div key={park.name} className="min-w-0 flex-[0_0_88%] pl-3 sm:flex-[0_0_76%] sm:pl-4">
                <Link
                  href={park.href}
                  onFocus={() => setMobileActive(index)}
                  onClick={() => setMobileActive(index)}
                  className="group relative block h-[min(74svh,560px)] min-h-[440px] overflow-hidden rounded-3xl bg-earth text-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                >
                  <SmartImage src={park.image} alt={`${park.name} landscape`} sizes="(max-width: 640px) 88vw, 76vw" fill className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/45 to-transparent" />
                  <span className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                    <span className="text-eyebrow text-gold">Northern Circuit</span>
                    <span className="mt-2 block font-heading text-3xl sm:text-4xl">{park.name}</span>
                    <span className="mt-2 block text-sm leading-6 text-cream/90 sm:text-base">{park.tagline}</span>
                    <span className="mt-4 grid gap-2 text-xs leading-5 text-cream/90 sm:text-sm">
                      {park.facts.slice(0, 3).map((fact) => (
                        <span key={fact} className="flex items-start gap-2">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                          {fact}
                        </span>
                      ))}
                    </span>
                    <span className="mt-4 block text-xs leading-5 text-cream/85 sm:text-sm">
                      <strong className="text-white">Best time:</strong> {park.bestTime}
                    </span>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline underline-offset-4">
                      Explore {park.name}<ArrowRight aria-hidden="true" size={17} />
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button type="button" onClick={() => scrollMobile("previous")} aria-label="Previous destination" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-earth/20 text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2" role="group" aria-label="Select a destination">
            {parks.map((park, index) => (
              <button
                key={park.name}
                type="button"
                onClick={() => selectMobile(index)}
                aria-label={`Show ${park.name}`}
                aria-current={mobileActive === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-[width,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta motion-reduce:transition-none ${mobileActive === index ? "w-8 bg-terracotta" : "w-2.5 bg-earth/25 hover:bg-earth/50"}`}
              />
            ))}
          </div>
          <span className="shrink-0 text-xs font-semibold tabular-nums text-muted">{mobileActive + 1} / {parks.length}</span>
          <button type="button" onClick={() => scrollMobile("next")} aria-label="Next destination" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-earth/20 text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
