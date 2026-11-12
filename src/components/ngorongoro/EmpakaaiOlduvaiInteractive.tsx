"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Footprints, Mountain, Trees } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import type { empakaaiPage } from "@/data/ngorongoro-empakaai";
import type { olduvaiPage } from "@/data/ngorongoro-olduvai";

type CrossData = typeof empakaaiPage.crossSection;
type TimelineData = typeof olduvaiPage.timeline;

export function EmpakaaiCrossSection({ data }: { data: CrossData }) {
  const [selectedId, setSelectedId] = useState<string>(data.hotspots[0].id);
  const selected = data.hotspots.find(({ id }) => id === selectedId) ?? data.hotspots[0];
  const reducedMotion = useReducedMotionPreference();

  return (
    <section id="descent" aria-labelledby="empakaai-cross-heading" className="bg-forest py-16 text-cream md:py-24">
      <Container>
        <SectionHeading id="empakaai-cross-heading" eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} tone="light" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[310px] overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-slate-300/30 via-forest to-earth p-4 sm:min-h-[420px]">
            <svg role="group" aria-label="Interactive schematic cross-section of Empakaai Crater" viewBox="0 0 900 440" className="absolute inset-0 size-full">
              <defs>
                <linearGradient id="empakaaiWall" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#829078" />
                  <stop offset="1" stopColor="#344a35" />
                </linearGradient>
              </defs>
              <motion.path
                d="M25 35C95 62 142 154 216 218C276 270 315 314 379 326C452 341 531 330 596 311C676 287 721 231 783 172C827 130 851 78 875 35"
                fill="none"
                stroke="url(#empakaaiWall)"
                strokeWidth="95"
                strokeLinecap="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                whileInView={reducedMotion ? undefined : { pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              <path d="M319 321C384 292 526 292 600 315C572 359 373 365 319 321Z" fill="#6d9da2" />
              <path d="M347 323C359 309 367 309 379 323M521 318C533 303 541 304 553 319M570 316C581 303 589 305 600 318" fill="none" stroke="#f0bfd0" strokeWidth="6" strokeLinecap="round" />
              <path d="M91 96C202 201 231 281 324 315M806 95C706 200 671 267 602 308" fill="none" stroke="#d7a24a" strokeWidth="5" strokeDasharray="9 10" opacity=".8" />
              {data.hotspots.map((point, index) => (
                <g key={point.id}>
                  <circle cx={point.x * 9} cy={point.y * 4.4} r={selectedId === point.id ? 17 : 12} fill={selectedId === point.id ? "#e1a8b8" : "#b5532f"} stroke="#fffaf2" strokeWidth="4" />
                  <foreignObject x={point.x * 9 - 23} y={point.y * 4.4 - 23} width="46" height="46">
                    <button
                      type="button"
                      aria-label={point.title}
                      aria-pressed={selectedId === point.id}
                      onClick={() => setSelectedId(point.id)}
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-transparent focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {index + 1}
                    </button>
                  </foreignObject>
                </g>
              ))}
            </svg>
            <p className="absolute bottom-3 left-4 rounded-full bg-earth/90 px-3 py-1 text-xs font-semibold text-cream">{data.schematicLabel}</p>
          </div>
          <div>
            <article aria-live="polite" className="rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{data.selectedLabel}</p>
              <h3 className="mt-3 font-heading text-2xl text-white">{selected.title}</h3>
              <p className="mt-4 leading-7 text-cream/85">{selected.text}</p>
            </article>
            <ol aria-label="Empakaai cross-section locations" className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {data.hotspots.map((point, index) => (
                <li key={point.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === point.id}
                    onClick={() => setSelectedId(point.id)}
                    className="flex min-h-11 w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm leading-6 text-cream/90 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold aria-pressed:bg-white/10"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">{index + 1}</span>
                    <span><strong className="block text-white">{point.title}</strong>{point.text}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {data.facts.map((fact) => (
            <div key={fact.label} className="bg-forest p-5 text-center">
              <dt className="font-heading text-2xl text-gold">{fact.value}</dt>
              <dd className="mt-1 text-sm text-cream/80">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function HikeProfile({ data }: { data: typeof empakaaiPage.hike.profile }) {
  const [active, setActive] = useState(0);
  const labels = data.places;
  const reducedMotion = useReducedMotionPreference();

  return (
    <div className="rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-7">
      <h3 className="font-heading text-xl text-earth">Hike elevation profile</h3>
      <svg role="group" aria-label="Interactive illustrative Empakaai hike elevation profile" viewBox="0 0 800 240" className="mt-4 w-full">
        <motion.path
          d="M35 42C103 47 128 94 203 147C267 188 334 195 414 195C496 195 550 190 606 151C685 95 706 47 765 42"
          fill="none"
          stroke="#b5532f"
          strokeWidth="8"
          strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0 }}
          whileInView={reducedMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {[35, 203, 414, 606].map((x, index) => (
          <foreignObject key={`${labels[index]}-${index}`} x={x - 23} y={[19, 124, 172, 124][index] - 23} width="46" height="46">
            <button
              type="button"
              aria-label={labels[index]}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className="flex size-11 items-center justify-center rounded-full border-2 border-white bg-terracotta text-xs font-bold text-white shadow focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold aria-pressed:bg-forest"
            >
              {index === 0 || index === 3 ? <Mountain aria-hidden="true" size={16} /> : index === 1 ? <Trees aria-hidden="true" size={16} /> : <ArrowDown aria-hidden="true" size={16} />}
            </button>
          </foreignObject>
        ))}
      </svg>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Hike profile locations">
        {labels.map((label, index) => (
          <li key={`${label}-${index}`}>
            <button
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className="min-h-11 w-full rounded-xl px-3 text-sm font-semibold text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta aria-pressed:bg-cream aria-pressed:text-terracotta"
            >
              {label}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center text-xs leading-5 text-muted">{data.label}</p>
    </div>
  );
}

export function EmpakaaiDayTimeline({
  data,
}: {
  data: typeof empakaaiPage.day;
}) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section aria-labelledby="empakaai-day-heading" className="overflow-hidden bg-forest py-16 text-cream md:py-24">
      <Container>
        <SectionHeading id="empakaai-day-heading" eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} tone="light" />
        <div className="relative">
          <svg aria-hidden="true" viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute left-0 top-10 hidden h-16 w-full text-gold lg:block">
            <motion.path d="M25 50C150 12 205 87 330 50S510 12 625 50S815 87 975 50" fill="none" stroke="currentColor" strokeWidth="3" initial={reducedMotion ? false : { pathLength: 0 }} whileInView={reducedMotion ? undefined : { pathLength: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.8 }} />
          </svg>
          <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.events.map((event, index) => (
              <li key={event.time} className="relative min-h-40 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <span className="inline-flex min-h-11 items-center rounded-full bg-gold px-4 text-sm font-bold tabular-nums text-earth">{event.time}</span>
                <h3 className="mt-4 font-heading text-xl text-white">{event.title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/80">{event.text}</p>
                <span className="absolute right-4 top-4 font-heading text-2xl text-white/20">{String(index + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function OlduvaiTimeline({ data }: { data: TimelineData }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotionPreference();
  const activeEvent = data.events[selected];

  return (
    <section id={data.id} aria-labelledby="olduvai-timeline-heading" className="scroll-mt-24 bg-forest py-16 text-cream md:py-24">
      <Container>
        <SectionHeading id="olduvai-timeline-heading" eyebrow={data.eyebrow} title={data.title} subtitle={data.intro} tone="light" />
        <div aria-live="polite" className="mx-auto mb-8 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{activeEvent.time}</p>
          <h3 className="mt-2 font-heading text-2xl text-white">{activeEvent.title}</h3>
          <p className="mt-3 leading-7 text-cream/85">{activeEvent.text}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {data.tracks.map((track) => {
            const events = data.events
              .map((event, index) => ({ ...event, index }))
              .filter((event) => event.track === track);
            return (
              <section key={track} aria-label={`${track} timeline`} className="min-w-0">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-2xl text-white">
                  <Footprints aria-hidden="true" className="text-gold" size={21} />
                  {track}
                </h3>
                <ol className="flex flex-col gap-3 pb-4 lg:flex-row lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:overscroll-x-contain">
                  {events.map((event) => (
                    <li key={event.title} className="w-full lg:w-[min(82vw,18rem)] lg:shrink-0 lg:snap-start">
                      <button
                        type="button"
                        aria-current={selected === event.index ? "step" : undefined}
                        onClick={() => setSelected(event.index)}
                        className="h-full min-h-36 w-full rounded-2xl border border-white/15 bg-white/5 p-5 text-left hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold aria-[current=step]:border-gold aria-[current=step]:bg-white/10"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-gold">{event.time}</span>
                        <span className="mt-2 block font-heading text-xl text-white">{event.title}</span>
                        <span className="mt-2 block text-sm leading-6 text-cream/80">{event.text}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
        <svg aria-hidden="true" viewBox="0 0 1000 90" preserveAspectRatio="none" className="mt-3 h-12 w-full text-gold">
          <motion.path d="M10 45C110 5 205 85 310 45S510 5 610 45S810 85 990 45" fill="none" stroke="currentColor" strokeWidth="3" initial={reducedMotion ? false : { pathLength: 0 }} whileInView={reducedMotion ? undefined : { pathLength: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.6 }} />
        </svg>
        <ol className="sr-only" aria-label="Full Olduvai timeline in chronological order">
          {data.events.map((event) => <li key={`${event.time}-${event.title}`}><strong>{event.time}, {event.title}.</strong> {event.text}</li>)}
        </ol>
      </Container>
    </section>
  );
}
