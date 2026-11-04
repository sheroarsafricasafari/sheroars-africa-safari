"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CalendarDays, Camera, Check, ChevronDown, MapPin, Mountain, Plane,
  ShieldCheck, Sun, Users, X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import FaqAccordion from "@/components/inner/FaqAccordion";
import Parallax from "@/components/motion/Parallax";
import SplitReveal from "@/components/motion/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import CountUp from "@/components/motion/CountUp";
import ScrollProgressLine from "@/components/motion/ScrollProgressLine";
import HeroSignal from "@/components/layout/HeroSignal";
import DrawPath from "@/components/motion/DrawPath";
import { revealSpring } from "@/components/motion/easings";
import useReducedMotionPreference from "@/components/motion/useReducedMotionPreference";
import { siteConfig } from "@/data/site";
import type { SafariPackage } from "@/data/safaris";

const sectionLinks = [
  ["overview", "Overview"],
  ["route", "Route"],
  ["itinerary", "Itinerary"],
  ["stays", "Stays"],
  ["included", "Included"],
  ["good-to-know", "Good to Know"],
  ["faq", "FAQ"],
] as const;

const iconByName: Record<string, typeof Camera> = {
  camera: Camera,
  elephant: Camera,
  bird: Camera,
  mountain: Mountain,
  paw: Camera,
  sun: CalendarDays,
  users: Users,
  utensils: Camera,
  heart: ShieldCheck,
  plane: Plane,
};

function SectionTitle({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return <div className="mb-8 max-w-3xl"><p className="text-eyebrow text-terracotta">{eyebrow}</p><h2 id={id} className="mt-3 font-heading text-3xl leading-tight text-earth sm:text-4xl">{title}</h2></div>;
}

function BreadcrumbTrail({ title, href }: { title: string; href: string }) {
  return <nav aria-label="Breadcrumb" className="text-sm text-white/80"><ol className="flex flex-wrap gap-2"><li><Link href="/" className="underline underline-offset-4">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/safaris" className="underline underline-offset-4">Safaris</Link></li><li aria-hidden="true">/</li><li><Link href="/safaris/packages" className="underline underline-offset-4">Packages</Link></li><li aria-hidden="true">/</li><li><a href={href} aria-current="page">{title}</a></li></ol></nav>;
}

const requiredGoodToKnow = [
  { variant: "note" as const, title: "Travel documents", text: "Your passport should be valid at least six months beyond your departure from Tanzania and have a blank page. Check visa rules for your nationality. See the visa guide.", href: "/travel-guide/visas-and-entry" },
  { variant: "note" as const, title: "Health and insurance", text: "Arrange comprehensive travel insurance and talk to your doctor or travel clinic about vaccinations. Read the health guide.", href: "/travel-guide/health-and-vaccinations" },
  { variant: "tip" as const, title: "What to pack", text: "Pack light, neutral layers, a warm layer for early mornings, sun protection and comfortable shoes. See the packing guide.", href: "/travel-guide/packing-list" },
  { variant: "safety" as const, title: "Solo and women travelers", text: "Read our practical safety information for women travelers and contact us if you would like to discuss any concerns.", href: "/travel-guide/safety-for-women-travelers" },
];

type RelatedSafari = Pick<SafariPackage, "slug" | "title" | "image" | "summary">;

export default function SafariPackageExperience({ safari, relatedPackages }: { safari: SafariPackage; relatedPackages: RelatedSafari[] }) {
  const reducedMotion = useReducedMotionPreference();
  const heroRef = useRef<HTMLElement>(null);
  const itineraryListRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const navScrollerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(() => new Set([1]));
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const galleryOpen = galleryIndex !== null;
  const [heroPassed, setHeroPassed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const whatsappUrl = siteConfig.whatsappUrlWithMessage(`Hello! I'm interested in the ${safari.title}.`);
  const priceLabel = safari.priceFrom === null ? "Price on request" : `From $${safari.priceFrom.toLocaleString("en-US")} per person`;
  const faqs = useMemo(() => [
    ...safari.faqs,
    { question: "Can I customise this itinerary?", answer: "Yes. Every journey is tailor-made." },
    { question: "How do I book?", answer: "Send us an enquiry and we will confirm availability and send a written quote. See our booking page at /book." },
  ], [safari.faqs]);
  const goodToKnowItems = [
    ...requiredGoodToKnow,
    ...safari.goodToKnow
      .filter((item) => !requiredGoodToKnow.some((required) => required.title === item.title))
      .map((item) => ({ ...item, href: undefined })),
  ];

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    const footer = document.querySelector("footer");
    const footerObserver = footer ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting)) : null;
    if (footer && footerObserver) footerObserver.observe(footer);
    return () => { observer.disconnect(); footerObserver?.disconnect(); };
  }, []);

  useEffect(() => {
    const days = safari.dayByDay.map(({ day }) => document.getElementById(`day-${day}`)).filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveDay(Number(current.target.id.replace("day-", "")));
    }, { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.3, 0.7] });
    days.forEach((day) => observer.observe(day));
    return () => observer.disconnect();
  }, [safari.dayByDay]);

  useEffect(() => {
    const targets = sectionLinks.map(([id]) => document.getElementById(id)).filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.6] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = navScrollerRef.current;
    const activeLink = container?.querySelector<HTMLAnchorElement>(`[data-section="${activeSection}"]`);
    if (!container || !activeLink || window.matchMedia("(min-width: 1024px)").matches) return;
    const containerBounds = container.getBoundingClientRect();
    const linkBounds = activeLink.getBoundingClientRect();
    container.scrollTo({
      left: container.scrollLeft + linkBounds.left - containerBounds.left - (containerBounds.width - linkBounds.width) / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeSection, reducedMotion]);

  useEffect(() => {
    if (galleryIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryIndex(null);
      if (event.key === "ArrowRight") setGalleryIndex((index) => index === null ? 0 : (index + 1) % safari.gallery.length);
      if (event.key === "ArrowLeft") setGalleryIndex((index) => index === null ? 0 : (index + safari.gallery.length - 1) % safari.gallery.length);
      if (event.key === "Tab") {
        const dialog = document.getElementById("safari-lightbox");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryIndex, safari.gallery.length]);

  useEffect(() => {
    if (!galleryOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFocusRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [galleryOpen]);

  const openGallery = (index: number, event: ReactMouseEvent<HTMLElement>) => {
    triggerRef.current = event.currentTarget;
    setGalleryIndex(index);
  };
  const toggleDay = (day: number) => setOpenDays((current) => {
    const next = new Set(current);
    if (next.has(day)) next.delete(day);
    else next.add(day);
    return next;
  });
  const allDaysOpen = openDays.size === safari.dayByDay.length;
  const goToItineraryDay = (dayNumber: number) => {
    setOpenDays((current) => new Set(current).add(dayNumber));
    document.getElementById(`day-${dayNumber}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };
  const goToDay = (routeId: string) => {
    const lastRouteStop = safari.route[safari.route.length - 1];
    const day = safari.dayByDay.find((item) => item.routeId === routeId)
      ?? (routeId === safari.route[0]?.id ? safari.dayByDay[0] : undefined)
      ?? (routeId === lastRouteStop?.id ? safari.dayByDay[safari.dayByDay.length - 1] : undefined);
    if (!day) return;
    goToItineraryDay(day.day);
  };
  const galleryItem = galleryIndex === null ? null : safari.gallery[galleryIndex];
  const routeStopDelay = (index: number) => 0.1 + (index / Math.max(1, safari.route.length - 1)) * 1.6;

  return (
    <>
      <section ref={heroRef} className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-forest text-white">
        <HeroSignal />
        <Parallax className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-[6%] inset-x-0"><SmartImage src={`/images/safaris/${safari.slug}/hero.jpg`} alt={`${safari.title} landscape`} sizes="100vw" fill priority className="object-cover" /></div>
        </Parallax>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-earth/80 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/20 to-transparent" />
        <div className="relative w-full px-5 pb-24 pt-36 sm:px-8 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <BreadcrumbTrail title={safari.title} href={`/safaris/packages/${safari.slug}`} />
            <div className="max-w-4xl">
              {safari.badge ? <span className="mt-7 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-bold text-forest">{safari.badge}</span> : null}
              <h1 className="mt-7 font-heading text-5xl leading-tight text-white sm:text-6xl md:text-7xl"><SplitReveal text={safari.title} /></h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/90">{safari.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[`${safari.days} days, ${safari.nights} nights`, safari.parks.join(" · "), safari.pace, safari.departureInfo.type === "group" ? "Small group" : "Private safari"].map((item) => <span key={item} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">{item}</span>)}
              </div>
              <p className="mt-5 text-lg font-semibold text-white">{priceLabel}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/plan-your-safari?package=${encodeURIComponent(safari.slug)}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 py-3 font-semibold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Enquire About This Journey</Link>
                <a href={whatsappUrl} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/75 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Chat on WhatsApp</a>
              </div>
            </div>
            <div className="mt-14 overflow-x-auto pb-2" role="group" aria-label="Journey route">
              <div className="relative flex min-w-max items-start gap-0">
                <DrawPath d="M5 60 H995" className="absolute left-0 top-0 h-5 w-full text-gold" />
                {safari.route.map((stop, index) => <motion.div key={stop.id} initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }} whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ ...revealSpring, delay: routeStopDelay(index) }} className="relative flex w-40 flex-col items-center text-center"><span className="size-5 rounded-full border-4 border-gold bg-forest" /><span className="mt-3 text-sm font-semibold text-white">{stop.label}</span><span className="mt-1 text-xs text-cream/70">{stop.note}</span><span className="sr-only">Stop {index + 1}</span></motion.div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Journey sections" className="sticky top-[var(--navbar-height,78px)] z-30 border-b border-earth/10 bg-cream/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 sm:px-8">
          <div ref={navScrollerRef} className="flex min-w-0 flex-1 snap-x gap-6 overflow-x-auto">
            {sectionLinks.map(([id, label]) => <a key={id} data-section={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={(event) => {
              event.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
            }} className={`relative flex min-h-14 shrink-0 snap-center items-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${activeSection === id ? "text-terracotta" : "text-muted"}`}>
              {label}{activeSection === id ? <motion.span layoutId="package-nav-line" className="absolute inset-x-0 bottom-0 h-0.5 bg-terracotta" transition={reducedMotion ? { duration: 0 } : undefined} /> : null}
            </a>)}
          </div>
          <div className="hidden shrink-0 items-center gap-4 lg:flex"><span className="text-sm font-semibold">{priceLabel}</span><Link href={`/plan-your-safari?package=${safari.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-terracotta px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Enquire</Link></div>
        </div>
      </nav>

      <div className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.95fr)]">
          <div className="min-w-0 space-y-16 md:space-y-20">
            <section id="overview" className="scroll-mt-32">
              <SectionTitle eyebrow="THE JOURNEY" title={`${safari.title} at a Glance`} />
              <div className="space-y-5 text-base leading-8 text-muted">{safari.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
                {safari.highlightCards.map((item) => {
                  const Icon = iconByName[item.icon] ?? Camera;
                  return <StaggerItem key={item.title}><article className="h-full rounded-2xl border border-sand bg-white p-5 shadow-card"><span className="flex size-11 items-center justify-center rounded-full bg-gold/15 text-terracotta"><Icon aria-hidden="true" size={20} /></span><h3 className="mt-4 font-heading text-xl text-earth">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.text}</p></article></StaggerItem>;
                })}
              </StaggerGroup>
              <dl className="mt-8 grid grid-cols-3 gap-3">
                {[["Days", safari.days], ["Nights", safari.nights], ["Parks", safari.parks.length]].map(([label, value]) => <div key={label} className="rounded-2xl bg-sand p-4 text-center"><dt className="font-heading text-3xl text-terracotta"><CountUp value={Number(value)} /></dt><dd className="mt-1 text-xs font-semibold text-muted">{label}</dd></div>)}
              </dl>
              <div className="mt-7"><h3 className="font-heading text-2xl text-earth">Wildlife you may see</h3><div className="mt-4 flex flex-wrap gap-2">{safari.wildlife.map((item) => <span key={item} className="rounded-full border border-earth/15 bg-white px-4 py-2 text-sm text-earth">{item}</span>)}</div><p className="mt-3 text-sm text-muted">Wildlife is wild and sightings can never be guaranteed.</p></div>
              <aside className="mt-8 rounded-2xl border border-gold/40 bg-gold/15 p-5 text-earth"><h3 className="font-semibold">Best time to travel</h3><p className="mt-1 text-sm leading-6">{safari.seasonNote}</p>{safari.tags.includes("Great Migration") ? <Link className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold underline" href="/safaris#migration">Explore the migration calendar<ArrowRight size={16} /></Link> : null}</aside>
            </section>

            <section id="route" aria-labelledby="route-title" className="scroll-mt-32 rounded-3xl bg-sand p-5 sm:p-7">
              <SectionTitle eyebrow="THE WAY THROUGH" title="Your Route" id="route-title" />
              <div className="relative rounded-3xl border border-sand bg-white p-5 sm:p-6">
                <p className="mb-6 text-xs text-muted">Illustrative route, not to scale</p>
                <div className="overflow-x-auto">
                  <div role="group" aria-label="Illustrative route, not to scale" className="relative hidden min-w-[620px] items-start justify-between gap-3 sm:flex">
                    <svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-3 h-8 w-full text-gold">
                      <motion.path d="M20 20 H980" fill="none" stroke="currentColor" strokeWidth="3" initial={reducedMotion ? false : { pathLength: 0 }} whileInView={reducedMotion ? undefined : { pathLength: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.6 }} />
                    </svg>
                    {safari.route.map((stop, index) => <motion.button key={stop.id} type="button" initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }} whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ ...revealSpring, delay: routeStopDelay(index) }} onClick={() => goToDay(stop.id)} className="relative z-10 flex min-w-20 flex-col items-center gap-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta">
                      <span className="flex size-7 items-center justify-center rounded-full border-2 border-terracotta bg-cream text-terracotta">{stop.kind === "start" || stop.kind === "end" ? <Plane size={14} aria-hidden="true" /> : stop.kind === "beach" ? <Sun size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}</span>
                      <span className="text-xs font-bold text-earth">{stop.label}</span><span className="text-[11px] text-muted">{stop.note}</span>
                    </motion.button>)}
                  </div>
                </div>
                <div className="relative sm:hidden">
                  <DrawPath d="M500 20 V110" className="pointer-events-none absolute left-0 top-0 h-full w-8 text-gold" />
                  <ol className="relative grid gap-2">
                    {safari.route.map((stop, index) => <li key={stop.id} className="relative min-h-16 pl-12">
                      <motion.button type="button" initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }} whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ ...revealSpring, delay: routeStopDelay(index) }} onClick={() => goToDay(stop.id)} className="flex min-h-16 w-full items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
                        <span className="absolute left-0 flex size-8 items-center justify-center rounded-full border-2 border-terracotta bg-cream text-terracotta">{stop.kind === "start" || stop.kind === "end" ? <Plane size={14} aria-hidden="true" /> : stop.kind === "beach" ? <Sun size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}</span>
                        <span><span className="block text-sm font-bold text-earth">{stop.label}</span><span className="mt-1 block text-xs text-muted">{stop.note}</span></span>
                      </motion.button>
                    </li>)}
                  </ol>
                </div>
                <p className="mt-6 text-xs text-muted">Select a stop to view the first itinerary day there.</p>
              </div>
            </section>

            <section id="itinerary" aria-labelledby="itinerary-title" className="relative scroll-mt-32">
              <SectionTitle eyebrow="DAY BY DAY" title="Your Itinerary" id="itinerary-title" />
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted">A considered route with room to explore.</p>
                <button type="button" onClick={() => setOpenDays(allDaysOpen ? new Set() : new Set(safari.dayByDay.map((item) => item.day)))} className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">{allDaysOpen ? "Collapse all" : "Expand all"}<ChevronDown aria-hidden="true" size={16} /></button>
              </div>
              <div className="grid gap-6 lg:grid-cols-[110px_minmax(0,1fr)]">
                <nav aria-label="Itinerary day navigator" className="sticky top-32 hidden h-fit lg:block">
                  <p className="mb-3 text-eyebrow text-muted">DAY BY DAY</p>
                  <ol className="grid gap-1">{safari.dayByDay.map((day) => <li key={day.day}><button type="button" aria-current={activeDay === day.day ? "step" : undefined} onClick={() => goToItineraryDay(day.day)} className={`min-h-10 w-full rounded-lg px-3 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${activeDay === day.day ? "bg-terracotta text-white" : "text-muted hover:bg-sand"}`}>Day {day.day}</button></li>)}</ol>
                </nav>
                <div ref={itineraryListRef} className="relative space-y-4 pl-5 sm:pl-7">
                  <ScrollProgressLine target={itineraryListRef} className="left-0" />
                {safari.dayByDay.map((day) => {
                  const open = openDays.has(day.day);
                  return <article id={`day-${day.day}`} key={day.day} className="scroll-mt-32 rounded-2xl border border-sand bg-white shadow-sm">
                    <button type="button" onClick={() => toggleDay(day.day)} aria-expanded={open} aria-controls={`day-content-${day.day}`} className="flex min-h-16 w-full items-center gap-4 px-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta sm:px-6">
                      <span className="font-heading text-3xl text-terracotta/70">{String(day.day).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1"><span id={`day-heading-${day.day}`} className="block font-heading text-xl text-earth">{day.title}</span><span className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin aria-hidden="true" size={13} />{day.overnight}</span></span>
                      <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-terracotta transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
                    </button>
                    <div id={`day-content-${day.day}`} role={open ? "region" : undefined} aria-labelledby={open ? `day-heading-${day.day}` : undefined}>
                    <AnimatePresence initial={false}>
                      {open ? <motion.div initial={reducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="overflow-hidden">
                        <div className="space-y-4 border-t border-sand px-5 py-5 sm:px-7">
                          <p className="leading-7 text-muted">{day.description}</p>
                          {day.imageSrc ? <motion.div initial={reducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={reducedMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="relative aspect-[16/8] overflow-hidden rounded-2xl"><SmartImage src={day.imageSrc} alt={`${day.title} scenery`} sizes="(max-width: 768px) 100vw, 65vw" fill className="object-cover" /></motion.div> : null}
                          <div><h4 className="text-sm font-bold text-earth">Highlights of the day</h4><ul className="mt-2 grid gap-2 sm:grid-cols-2">{day.activities.map((activity) => <li key={activity} className="flex gap-2 text-sm text-muted"><Check aria-hidden="true" className="size-4 shrink-0 text-terracotta" />{activity}</li>)}</ul></div>
                          <div className="grid gap-3 border-t border-sand pt-4 text-xs text-muted sm:grid-cols-3">
                            <span><strong className="block text-earth">Overnight</strong>{day.overnight}</span>
                            <span><strong className="block text-earth">Meals</strong>{day.meals.map((meal) => <span key={meal} className="mr-1 inline-flex size-7 items-center justify-center rounded-full bg-sand">{meal}</span>)}</span>
                            <span><strong className="block text-earth">Drive note</strong>{day.driveNote}</span>
                          </div>
                        </div>
                      </motion.div> : null}
                    </AnimatePresence>
                    </div>
                  </article>;
                })}
              </div>
              </div>
              <p className="mt-5 text-sm italic text-muted">Every itinerary is a starting point. We tailor the route, pace and stays to you.</p>
            </section>

            <section aria-labelledby="gallery-title" className="rounded-3xl bg-sand p-5 sm:p-7">
              <SectionTitle eyebrow="THE MOMENTS" title="Moments From the Journey" id="gallery-title" />
              <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3">
                {safari.gallery.map((image, index) => <button key={image.src} type="button" onClick={(event) => openGallery(index, event)} aria-label={`Open image: ${image.alt}`} className={`group relative overflow-hidden rounded-2xl bg-sand focus-visible:outline focus-visible:outline-4 focus-visible:outline-terracotta ${image.span === "wide" ? "col-span-2" : image.span === "tall" ? "row-span-2" : ""}`}>
                  <SmartImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 50vw, 33vw" fill className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105" />
                  <span className="absolute inset-0 bg-earth/0 transition-colors motion-reduce:transition-none group-hover:bg-earth/20" />
                  <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-earth/70 text-white"><Camera aria-hidden="true" size={18} /></span>
                </button>)}
              </div>
            </section>

            <section id="stays" className="scroll-mt-32">
              <SectionTitle eyebrow="REST BETWEEN THE WILD" title="Where You Will Stay" />
              <div className="grid gap-4">
                {safari.accommodationTiers.map((tier) => <article key={tier.name} className={`rounded-2xl border bg-white p-6 ${tier.recommended ? "border-gold shadow-soft" : "border-sand"}`}>
                  {tier.recommended ? <span className="mb-4 inline-flex rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-earth">Recommended for this journey</span> : null}
                  <h3 className="font-heading text-2xl text-earth">{tier.name}</h3><p className="mt-3 leading-7 text-muted">{tier.description}</p>
                  <p className="mt-4 text-sm text-muted"><strong className="text-earth">Best for:</strong> {tier.bestFor}</p><p className="mt-2 text-sm text-muted"><strong className="text-earth">Ask us for:</strong> {tier.askUsFor}</p>
                </article>)}
              </div>
              <p className="mt-4 text-sm text-muted">Accommodation is confirmed in your personal proposal. <span className="sr-only">TODO(REPLACE): name camps and lodges after supplier confirmation.</span></p>
            </section>

            <section id="included" className="scroll-mt-32 rounded-3xl bg-sand p-5 sm:p-7">
              <SectionTitle eyebrow="THE PRACTICAL DETAILS" title="What Is Included" />
              <div className="grid gap-5 md:grid-cols-2">
                {[{ title: "What's Included", items: safari.inclusions, yes: true }, { title: "What's Not Included", items: safari.exclusions, yes: false }].map(({ title, items, yes }) => <section key={title} className="rounded-2xl bg-white p-6 shadow-card"><h3 className="font-heading text-2xl text-earth">{title}</h3><ul className="mt-5 grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${yes ? "text-forest" : "text-muted"}`} />{item}</li>)}</ul></section>)}
                <p className="text-sm leading-6 text-muted md:col-span-2">Optional extras are quoted separately and all inclusions are confirmed in your written proposal.</p>
              </div>
            </section>

            <section aria-labelledby="departures-title">
              <SectionTitle eyebrow="DATES AND PRICING" title="Departures and Pricing" />
              <div className="rounded-3xl border border-sand bg-white p-6 shadow-card sm:p-8">
                <div className="flex items-start gap-4"><CalendarDays aria-hidden="true" className="mt-1 size-6 shrink-0 text-terracotta" /><div>
                  <h3 id="departures-title" className="font-heading text-2xl text-earth">{safari.departureInfo.type === "group" ? "Group departure" : "Private departures: choose your own dates"}</h3>
                  <p className="mt-3 leading-7 text-muted">{safari.departureInfo.type === "group" ? safari.departureInfo.datesNote : "Price on request, tailored to your dates, accommodation level and group size."}</p>
                  {safari.departureInfo.type === "group" ? <p className="mt-2 text-sm text-muted">Dates will appear here once confirmed. <span className="sr-only">TODO(REPLACE): publish dates after confirmation.</span></p> : null}
                  <Link href={`/plan-your-safari?package=${safari.slug}${safari.departureInfo.type === "group" ? "&type=Safari" : ""}`} className="mt-5 inline-flex min-h-12 items-center rounded-full bg-terracotta px-6 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">{safari.departureInfo.type === "group" ? "Notify me of departure dates" : "Request a Quote"}</Link>
                </div></div>
              </div>
            </section>

            <section id="good-to-know" className="scroll-mt-32 rounded-3xl bg-sand p-5 sm:p-7">
              <SectionTitle eyebrow="BEFORE YOU GO" title="Good to Know" />
              <div className="grid gap-4 md:grid-cols-2">
                {goodToKnowItems.map((item) => <aside key={item.title} className={`rounded-2xl border p-5 ${item.variant === "safety" ? "border-forest/30 bg-forest text-cream" : item.variant === "warning" ? "border-terracotta/30 bg-terracotta/5 text-earth" : "border-sand bg-white text-earth"}`}><h3 className="font-semibold">{item.title}</h3><p className={`mt-2 text-sm leading-6 ${item.variant === "safety" ? "text-cream/85" : "text-muted"}`}>{item.title === "Where will the herds be?" ? <>Migration locations vary with rainfall. Explore the <Link href="/safaris#migration" className="font-semibold underline">monthly calendar</Link> and the <Link href="/safaris/serengeti/great-migration" className="font-semibold underline">Great Migration guide</Link>.</> : item.text}{item.href ? <> <Link href={item.href} className="font-semibold underline">Read more</Link></> : null}</p></aside>)}
              </div>
            </section>

            <section id="faq" className="scroll-mt-32">
              <SectionTitle eyebrow="YOUR QUESTIONS" title="Frequently Asked Questions" />
              <FaqAccordion items={faqs} />
              <p className="mt-4 text-sm text-muted">For booking information, visit our <Link href="/book" className="font-semibold text-terracotta underline underline-offset-4">booking page</Link>.</p>
            </section>

            <section aria-labelledby="related-title">
              <SectionTitle eyebrow="KEEP EXPLORING" title="You Might Also Love" id="related-title" />
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{relatedPackages.slice(0, 3).map((item) => <Link key={item.slug} href={`/safaris/packages/${item.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-terracotta"><div className="relative aspect-[4/3] overflow-hidden"><SmartImage src={item.image} alt={item.title} sizes="(max-width: 640px) 100vw, 33vw" fill className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105" /></div><div className="p-5"><h3 className="font-heading text-xl text-earth">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p><span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta">View Journey<ArrowRight aria-hidden="true" size={16} /></span></div></Link>)}</div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-36 rounded-2xl border-t-2 border-gold bg-white p-6 shadow-card">
              <h2 className="font-heading text-2xl text-earth">Journey at a glance</h2>
              <dl className="mt-6 grid gap-4 text-sm">
                {[["Duration", `${safari.days} days, ${safari.nights} nights`], ["Parks", safari.parks.join(", ")], ["Pace", safari.pace], ["Best time", safari.seasonNote], ["Group size", safari.groupSizeNote], ["Starts and ends", `${safari.startPoint} to ${safari.endPoint}`], ["Price", priceLabel]].map(([label, value]) => <div key={label}><dt className="text-xs font-bold uppercase tracking-wider text-muted">{label}</dt><dd className="mt-1 leading-6 text-earth">{value}</dd></div>)}
              </dl>
              <Link href={`/plan-your-safari?package=${safari.slug}`} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-terracotta px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Plan This Journey</Link>
              <a href={whatsappUrl} className="mt-3 flex min-h-12 items-center justify-center rounded-full border border-terracotta px-5 font-semibold text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Ask on WhatsApp</a>
              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted"><ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-forest" />No obligation. Reply within 24 hours. <span className="sr-only">TODO(CONFIRM): verify response-time commitment.</span></p>
              {safari.departureInfo.type === "group" ? <div className="mt-5 rounded-xl bg-sand p-4"><p className="text-xs font-bold uppercase tracking-wider text-terracotta">Group departure</p><p className="mt-2 text-sm leading-6 text-earth">{safari.departureInfo.datesNote}</p></div> : null}
            </div>
          </aside>
        </div>
      </div>

      {heroPassed && !footerVisible ? <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-earth/10 bg-cream/95 px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-soft backdrop-blur-md lg:hidden"><span className="text-sm font-semibold text-earth">{priceLabel}</span><Link href={`/plan-your-safari?package=${safari.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Enquire</Link></div> : null}

      <AnimatePresence>
        {galleryItem && galleryIndex !== null ? <motion.div id="safari-lightbox" role="dialog" aria-modal="true" aria-label="Safari photo gallery" onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = event.changedTouches[0]?.clientX ?? touchStartX.current;
          if (delta - touchStartX.current > 50) setGalleryIndex((galleryIndex + safari.gallery.length - 1) % safari.gallery.length);
          if (touchStartX.current - delta > 50) setGalleryIndex((galleryIndex + 1) % safari.gallery.length);
          touchStartX.current = null;
        }} className="fixed inset-0 z-[80] flex items-center justify-center bg-earth/95 p-4 text-white" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }}>
          <button ref={firstFocusRef} type="button" onClick={() => setGalleryIndex(null)} aria-label="Close gallery" className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/40 bg-earth/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"><X aria-hidden="true" /></button>
          <button type="button" onClick={() => setGalleryIndex((galleryIndex + safari.gallery.length - 1) % safari.gallery.length)} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-earth/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:left-6"><ArrowLeft aria-hidden="true" /></button>
          <div className="relative h-[70vh] w-full max-w-5xl">
            <SmartImage src={galleryItem.src} alt={galleryItem.alt} sizes="100vw" fill className="object-contain" />
            <p className="absolute inset-x-0 -bottom-9 text-center text-sm text-cream/80">{galleryItem.alt} · {galleryIndex + 1} of {safari.gallery.length}</p>
          </div>
          <button type="button" onClick={() => setGalleryIndex((galleryIndex + 1) % safari.gallery.length)} aria-label="Next image" className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-earth/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:right-6"><ArrowRight aria-hidden="true" /></button>
        </motion.div> : null}
      </AnimatePresence>
    </>
  );
}
