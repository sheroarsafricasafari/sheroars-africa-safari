"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import SplitReveal from "@/components/motion/SplitReveal";
import AltitudeCounter from "@/components/kilimanjaro/AltitudeCounter";
import { siteConfig } from "@/data/site";

const routePaths = [
  { name: "Machame", color: "#d9a441", d: "M80 420 C180 380 265 345 350 280 S470 160 500 70" },
  { name: "Lemosho", color: "#d98059", d: "M95 440 C145 360 205 330 275 290 S380 190 500 70" },
  { name: "Marangu", color: "#a9c8b3", d: "M820 440 C730 390 650 330 600 270 S540 150 500 70" },
  { name: "Rongai", color: "#92b8d3", d: "M800 390 C700 340 650 300 610 230 S550 140 500 70" },
  { name: "Northern Circuit", color: "#c3a9d8", d: "M115 400 C220 290 310 300 365 225 S440 120 500 70" },
  { name: "Umbwe", color: "#e5a36d", d: "M170 445 C260 390 310 340 360 270 S440 155 500 70" },
];

export default function KilimanjaroHero({ mode = "hub" }: { mode?: "hub" | "routes" }) {
  const reduce = useReducedMotion();
  const isHub = mode === "hub";
  const title = isHub ? "Stand on the Roof of Africa" : "Six Roads to the Roof of Africa";
  const subtitle = isHub
    ? "Five climate zones. One summit. 5,895 metres of sunrise. Climb Kilimanjaro with a women-led Tanzanian team that walks beside you every slow, steady step."
    : "Every route reaches the same summit. The right one for you depends on your time, your comfort and how kindly you want to treat your lungs. Here is everything you need to choose with confidence.";
  const whatsapp = siteConfig.whatsappUrlWithMessage("Hello She Roars, I would like help planning a Kilimanjaro climb.");

  return (
    <section id="top" className={`relative isolate flex min-h-[78svh] items-end overflow-hidden bg-earth text-white ${isHub ? "md:min-h-[92svh]" : "md:min-h-[72svh]"}`}>
      {isHub ? (
        <>
          <SmartImage src="/images/kilimanjaro/hero-sky.jpg" alt="" sizes="100vw" fill priority className="object-cover" />
          <video
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/kilimanjaro/hero-sky.jpg"
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
          >
            <source src="/videos/kilimanjaro/kilimanjaro-hero.webm" type="video/webm" />
          </video>
        </>
      ) : (
        <>
          <SmartImage src="/images/kilimanjaro/routes-hero.jpg" alt="Kilimanjaro route approaches converging on the summit" sizes="100vw" fill priority className="object-cover" />
          <svg viewBox="0 0 900 500" className="absolute inset-0 h-full w-full opacity-90" aria-label="Illustration of six Kilimanjaro routes converging at Uhuru Peak" role="img">
            <title>Six Kilimanjaro routes to Uhuru Peak</title>
            {routePaths.map((route, index) => (
              <motion.path key={route.name} d={route.d} fill="none" stroke={route.color} strokeWidth="3" strokeLinecap="round" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : index * 0.15, ease: "easeInOut" }} />
            ))}
            <circle cx="500" cy="70" r="8" fill="#d9a441" />
          </svg>
        </>
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/50 to-earth/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-forest/15" />
      <Container className="relative z-10 w-full pb-14 pt-36 md:pb-20">
        <div className="max-w-3xl">
          <Breadcrumbs items={isHub
            ? [{ title: "Home", href: "/" }, { title: "Kilimanjaro", href: "/kilimanjaro" }]
            : [{ title: "Home", href: "/" }, { title: "Kilimanjaro", href: "/kilimanjaro" }, { title: "Routes", href: "/kilimanjaro/routes" }]} tone="light" className="mb-7" />
          <p className="text-eyebrow text-gold">{isHub ? "Kilimanjaro National Park, Tanzania" : "Kilimanjaro routes"}</p>
          <h1 className="mt-4 font-heading text-display text-white"><SplitReveal text={title} eager /></h1>
          <div className="gold-rule mb-5 mt-6" />
          <p className="max-w-2xl text-lg leading-8 text-cream/90">{subtitle}</p>
          {isHub ? (
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-white">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2"><AltitudeCounter /> Uhuru Peak</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">5 climate zones</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">6 classic routes</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">No technical climbing</span>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/90">
              {routePaths.map(({ name, color }) => <span key={name} className="inline-flex items-center gap-2"><i className="size-2.5 rounded-full" style={{ backgroundColor: color }} />{name}</span>)}
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={isHub ? "/kilimanjaro/routes" : "#route-finder"} variant="light" size="lg">{isHub ? "Choose Your Route" : "Find My Route"}</Button>
            <Button href={isHub ? "/plan-your-safari" : "#compare"} variant="outline-light" size="lg">{isHub ? "Plan My Climb" : "Compare All Routes"}</Button>
            {isHub ? <Link href={whatsapp} className="inline-flex min-h-11 items-center px-3 font-semibold text-white underline underline-offset-4">Chat on WhatsApp</Link> : null}
          </div>
          {isHub ? <a href="#overview" className="mt-9 inline-flex min-h-11 items-center gap-3 text-sm text-white/80"><span aria-hidden="true" className="h-8 w-px bg-gold" />Scroll to begin the ascent</a> : null}
        </div>
      </Container>
      {isHub ? <div className="pointer-events-none absolute bottom-0 right-5 top-1/3 hidden flex-col items-center gap-3 text-[10px] text-white/70 lg:flex" aria-hidden="true"><span>5,895 m</span><span className="h-full w-px bg-gradient-to-b from-gold via-white/50 to-transparent" /><span>0 m</span></div> : null}
    </section>
  );
}
