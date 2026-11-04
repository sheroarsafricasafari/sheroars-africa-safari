"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PackageCard from "@/components/inner/PackageCard";
import type { SafariPackage } from "@/data/safaris";

export default function FeaturedCarousel({ packages }: { packages: SafariPackage[] }) {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const [selectedSnap, setSelectedSnap] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelectedSnap(api.selectedScrollSnap());
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);

  const scrollSnapCount = api?.scrollSnapList().length ?? 1;
  const progress = api
    ? scrollSnapCount <= 1 ? 1 : (selectedSnap + 1) / scrollSnapCount
    : 0;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured safari journeys"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          api?.scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          api?.scrollNext();
        }
      }}
    >
      <p className="sr-only" aria-live="polite">Slide {selectedSnap + 1} of {scrollSnapCount}</p>
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="-ml-5 flex touch-pan-y">
          {packages.map((item, index) => (
            <div key={item.slug} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${packages.length}`} className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_48%] lg:flex-[0_0_32%]">
              <PackageCard
                slug={item.slug}
                title={item.title}
                days={item.days}
                parks={item.parks}
                summary={item.summary}
                priceFrom={item.priceFrom}
                image={{ src: item.image, alt: `${item.title} safari in ${item.parks.join(", ")}` }}
                badge={item.badge}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous safari" className="flex size-11 items-center justify-center rounded-full border border-earth/20 text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><ArrowLeft aria-hidden="true" size={18} /></button>
        <div role="progressbar" aria-label="Carousel position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} className="h-1 flex-1 overflow-hidden rounded-full bg-sand">
          <div className="h-full bg-terracotta transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
        </div>
        <button type="button" onClick={() => api?.scrollNext()} aria-label="Next safari" className="flex size-11 items-center justify-center rounded-full border border-earth/20 text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><ArrowRight aria-hidden="true" size={18} /></button>
      </div>
    </div>
  );
}
