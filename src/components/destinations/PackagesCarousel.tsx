"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PackageCard from "@/components/inner/PackageCard";
import type { SafariPackage } from "@/data/safaris";

// Props: package records already filtered by the server component, plus a heading and supporting text.
export function PackagesCarouselView({ packages, title, subtitle }: { packages: SafariPackage[]; title: string; subtitle: string }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", loop: false });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);
  useEffect(() => {
    if (!embla) return;
    setSnapCount(embla.scrollSnapList().length);
    embla.on("select", onSelect);
    return () => { embla.off("select", onSelect); };
  }, [embla, onSelect, packages.length]);
  return (
    <section aria-label={title}>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div><h3 className="font-heading text-3xl text-earth">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{subtitle}</p></div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous journeys" onClick={() => embla?.scrollPrev()} className="inline-flex size-11 items-center justify-center rounded-full border border-sand text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta disabled:opacity-40" disabled={!embla?.canScrollPrev()}><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Next journeys" onClick={() => embla?.scrollNext()} className="inline-flex size-11 items-center justify-center rounded-full border border-sand text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta disabled:opacity-40" disabled={!embla?.canScrollNext()}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-5">
          {packages.map((item) => <div key={item.slug} className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_48%] xl:flex-[0_0_32%]">
            <PackageCard slug={item.slug} title={item.title} days={item.days} parks={item.parks} summary={item.summary} priceFrom={item.priceFrom} image={{ src: item.image, alt: item.title }} badge={item.badge} />
          </div>)}
        </div>
      </div>
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-sand" role="progressbar" aria-label="Journey carousel progress" aria-valuemin={0} aria-valuemax={Math.max(1, snapCount - 1)} aria-valuenow={selected}>
        <span className="block h-full rounded-full bg-terracotta transition-[width] duration-300" style={{ width: `${snapCount > 1 ? (selected / (snapCount - 1)) * 100 : 100}%` }} />
      </div>
      <Link href="/safaris/packages" className="mt-4 inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">View all safari packages</Link>
    </section>
  );
}
