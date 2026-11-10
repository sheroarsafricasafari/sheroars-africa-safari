"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ngorongoroCrater } from "@/data/ngorongoro";

type Hotspot = (typeof ngorongoroCrater.anatomy.hotspots)[number];
type FloorPlace = (typeof ngorongoroCrater.floorPlaces)[number];

export function CraterCrossSection({
  data,
}: {
  data: typeof ngorongoroCrater.anatomy;
}) {
  const [selectedId, setSelectedId] = useState<string>(data.hotspots[0]?.id ?? "");
  const selected = data.hotspots.find((item) => item.id === selectedId) ?? data.hotspots[0];

  return (
    <section id="anatomy" className="scroll-mt-24 bg-cream py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-sand bg-gradient-to-b from-sky-100 via-cream to-sand p-5 sm:min-h-[440px] sm:p-8">
            <svg aria-hidden="true" viewBox="0 0 900 410" className="absolute inset-0 size-full">
              <defs>
                <linearGradient id="craterWall" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#526b48" />
                  <stop offset="1" stopColor="#354b32" />
                </linearGradient>
              </defs>
              <path d="M25 25C95 60 124 157 205 210C264 249 292 275 332 289C398 311 488 311 554 289C598 274 630 244 689 208C770 158 810 58 875 25L875 368H25Z" fill="url(#craterWall)" opacity=".92" />
              <path d="M190 220C270 265 315 327 446 335C575 327 624 264 708 218L708 368H190Z" fill="#caa36b" />
              <path d="M362 326C397 311 470 311 512 328C484 352 398 355 362 326Z" fill="#74a8aa" />
              <path d="M125 83C225 150 245 264 338 291M777 83C672 154 654 257 555 291" fill="none" stroke="#f8f2e7" strokeDasharray="9 10" strokeWidth="5" opacity=".8" />
            </svg>
            <div role="group" aria-label="Interactive crater cross-section" className="absolute inset-0">
              {data.hotspots.map((item: Hotspot) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.title}
                  aria-pressed={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className="absolute z-10 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-terracotta shadow-lg transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold aria-pressed:scale-125 aria-pressed:bg-gold sm:size-8"
                >
                  <span className="sr-only">{item.title}</span>
                </button>
              ))}
            </div>
            <p className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-earth sm:bottom-5 sm:left-6">
              {data.schematicLabel}
            </p>
          </div>
          <div>
            {selected ? (
              <article aria-live="polite" className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">{data.selectedLabel}</p>
                <h3 className="mt-3 font-heading text-2xl text-earth">{selected.title}</h3>
                <p className="mt-4 leading-7 text-muted">{selected.text}</p>
              </article>
            ) : null}
            <ul aria-label="Crater cross-section locations" className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {data.hotspots.map((item: Hotspot) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === item.id}
                    onClick={() => setSelectedId(item.id)}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-earth hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:bg-white aria-pressed:text-terracotta"
                  >
                    <span aria-hidden="true" className="size-2 rounded-full bg-terracotta" />
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CraterFloorMap({
  data,
  places,
}: {
  data: typeof ngorongoroCrater.floorMap;
  places: typeof ngorongoroCrater.floorPlaces;
}) {
  const [selectedId, setSelectedId] = useState<string>(places[0]?.id ?? "");
  const selected = places.find((item) => item.id === selectedId) ?? places[0];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative min-h-[350px] overflow-hidden rounded-[2rem] border border-sand bg-[#e7dfc9] sm:min-h-[460px]">
            <svg aria-hidden="true" viewBox="0 0 900 520" className="absolute inset-0 size-full">
              <path d="M450 28C660 28 845 158 842 284C839 403 664 492 449 492C232 492 57 403 58 282C59 157 240 28 450 28Z" fill="#d2bd8d" stroke="#59734a" strokeWidth="22" />
              <path d="M450 81C620 81 778 169 780 282C782 379 632 438 449 438C266 438 122 377 120 282C118 169 279 81 450 81Z" fill="#c6a968" />
              <path d="M283 286C325 219 440 196 511 217C578 236 637 298 624 346C609 400 501 414 411 386C330 361 255 333 283 286Z" fill="#80b4b1" />
              <path d="M143 265C218 240 247 249 296 265M673 176C634 224 627 247 630 291M220 381C270 346 304 333 340 333" fill="none" stroke="#506c3e" strokeWidth="18" strokeLinecap="round" />
              <path d="M312 309C405 285 502 285 599 324" fill="none" stroke="#e9ddc0" strokeWidth="7" strokeDasharray="10 10" />
            </svg>
            <div role="group" aria-label="Interactive crater floor schematic" className="absolute inset-0">
              {places.map((place: FloorPlace) => (
                <button
                  key={place.id}
                  type="button"
                  aria-label={place.title}
                  aria-pressed={selectedId === place.id}
                  onClick={() => setSelectedId(place.id)}
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  className="absolute z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-terracotta text-xs font-bold text-white shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold aria-pressed:scale-125 aria-pressed:bg-forest"
                >
                  <span className="sr-only">{place.title}</span>
                  <span aria-hidden="true">{places.indexOf(place) + 1}</span>
                </button>
              ))}
            </div>
            <p className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-earth sm:bottom-5 sm:left-6">
              {data.schematicLabel}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {selected ? (
              <article aria-live="polite" className="rounded-3xl bg-forest p-6 text-cream">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{data.selectedLabel}</p>
                <h3 className="mt-2 font-heading text-2xl text-white">{selected.title}</h3>
                <p className="mt-3 text-sm leading-6 text-cream/85">{selected.text}</p>
              </article>
            ) : null}
            <ol aria-label="Crater floor places" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {places.map((place: FloorPlace, index) => (
                <li key={place.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === place.id}
                    onClick={() => setSelectedId(place.id)}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl bg-cream px-4 py-2 text-left text-sm font-medium text-earth hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:bg-sand"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">{index + 1}</span>
                    {place.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
