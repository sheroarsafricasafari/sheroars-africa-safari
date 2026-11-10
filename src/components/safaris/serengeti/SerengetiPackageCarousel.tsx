"use client";

import { useCallback, useEffect, useState } from "react";
import type { FocusEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SerengetiPackageCard from "@/components/safaris/serengeti/SerengetiPackageCard";
import type { SerengetiPackage } from "@/types/serengeti-package";

const AUTOPLAY_DELAY = 6500;

export default function SerengetiPackageCarousel({ packages }: { packages: SerengetiPackage[] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", loop: true, slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const paused = hovered || focused;

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!embla || paused || reducedMotion || packages.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") embla.scrollNext();
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [embla, packages.length, paused, reducedMotion]);

  const pauseWhenFocused = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(true);
  };
  const resumeWhenFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Serengeti safari packages"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={pauseWhenFocused}
      onBlur={resumeWhenFocusLeaves}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          embla?.scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          embla?.scrollNext();
        }
      }}
    >
      <p className="sr-only" aria-live={paused || reducedMotion ? "polite" : "off"}>
        Package {selected + 1} of {packages.length}
      </p>
      <div className="overflow-hidden px-1 py-2" ref={viewportRef}>
        <div className="-ml-4 flex touch-pan-y">
          {packages.map((item, index) => (
            <div
              key={item.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${packages.length}`}
              className="min-w-0 flex-[0_0_90%] pl-4 sm:flex-[0_0_54%] lg:flex-[0_0_36%]"
            >
              <SerengetiPackageCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={() => embla?.scrollPrev()}
          aria-label="Previous Serengeti package"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-earth/20 text-earth transition-colors hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          <ArrowLeft aria-hidden="true" size={18} />
        </button>
        <div
          role="progressbar"
          aria-label="Serengeti package carousel position"
          aria-valuemin={1}
          aria-valuemax={packages.length}
          aria-valuenow={selected + 1}
          className="h-1 flex-1 overflow-hidden rounded-full bg-sand"
        >
          <span
            className="block h-full rounded-full bg-terracotta transition-[width] duration-500"
            style={{ width: `${((selected + 1) / packages.length) * 100}%` }}
          />
        </div>
        <button
          type="button"
          onClick={() => embla?.scrollNext()}
          aria-label="Next Serengeti package"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-earth/20 text-earth transition-colors hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        {reducedMotion ? "Use the arrows or swipe to explore all packages." : "Slides automatically · Hover or focus to pause"}
      </p>
    </div>
  );
}
