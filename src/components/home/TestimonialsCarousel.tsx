"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { homeCopy } from "@/data/home";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <Container>
      <SectionHeading {...homeCopy.testimonialHeading} />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {testimonials.map((testimonial) => (
            <article key={testimonial.firstName} className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(42,31,23,0.07)]">
                <span className="mb-3 inline-flex w-fit rounded-full bg-sand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">Sample review</span>
                <div className="mb-4 flex gap-1" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-gold text-gold" />)}</div>
                <blockquote className="flex-1 font-heading text-lg leading-7 text-earth">“{testimonial.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-sand pt-5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-forest font-heading text-lg text-gold">{testimonial.initial}</span>
                  <div>
                    <p className="text-sm font-bold">{testimonial.firstName}</p>
                    <p className="text-xs text-muted">{testimonial.country} · {testimonial.trip}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-7 flex items-center justify-center gap-3">
        <button type="button" aria-label="Previous traveler story" onClick={() => emblaApi?.scrollPrev()} className="flex size-10 items-center justify-center rounded-full border border-earth/20 hover:bg-sand"><ArrowLeft size={17} /></button>
        <div className="flex items-center gap-2" aria-label="Choose traveler story">
          {testimonials.map((testimonial, index) => <button key={testimonial.firstName} type="button" aria-label={`Go to story ${index + 1}`} aria-current={selectedIndex === index ? "true" : undefined} onClick={() => emblaApi?.scrollTo(index)} className={`h-2.5 rounded-full transition-all ${selectedIndex === index ? "w-7 bg-terracotta" : "w-2.5 bg-earth/25"}`} />)}
        </div>
        <button type="button" aria-label="Next traveler story" onClick={() => emblaApi?.scrollNext()} className="flex size-10 items-center justify-center rounded-full border border-earth/20 hover:bg-sand"><ArrowRight size={17} /></button>
      </div>
    </Container>
  );
}
