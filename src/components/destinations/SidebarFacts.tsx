"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Binoculars, Clock, Compass, MapPin, PawPrint, Plane, Sun, Trees } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import type { SubRegionData } from "@/types/destination";

// Props: labeled quick facts with icon keys and the destination-specific enquiry message.
const iconMap: Record<string, LucideIcon> = { binoculars: Binoculars, clock: Clock, compass: Compass, map: MapPin, paw: PawPrint, plane: Plane, sun: Sun, trees: Trees, people: Binoculars };

export default function SidebarFacts({ items, message = "Hello, I would like to plan a Seronera safari." }: { items: SubRegionData["sidebarFacts"]; message?: string }) {
  const [showMobileBar, setShowMobileBar] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("destination-hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setShowMobileBar(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return <>
    <aside className="sticky top-[calc(var(--navbar-height,78px)+1.5rem)] hidden rounded-3xl border border-sand bg-white p-6 shadow-card lg:block">
      <h2 className="font-heading text-2xl text-earth">At a glance</h2>
      <dl className="mt-5 divide-y divide-sand">
        {items.map((item) => { const Icon = iconMap[item.icon] ?? Compass; return <div key={item.label} className="flex gap-3 py-3 first:pt-0 last:pb-0">
          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" />
          <div><dt className="text-xs font-bold uppercase tracking-wider text-terracotta">{item.label}</dt><dd className="mt-1 text-sm leading-6 text-earth">{item.value}</dd></div>
        </div>; })}
      </dl>
      <Button href="/plan-your-safari?type=Safari" className="mt-6 w-full">Plan This Journey</Button>
      <Link href={siteConfig.whatsappUrlWithMessage(message)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-forest px-5 text-sm font-semibold text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Chat on WhatsApp</Link>
      <p className="mt-3 text-center text-xs text-muted">No obligation. Reply within 24 hours. {/* TODO(CONFIRM): verify the response-time commitment. */}</p>
    </aside>
    {showMobileBar ? <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-sand bg-cream/95 p-3 shadow-[0_-8px_24px_rgba(42,31,23,.12)] backdrop-blur-md lg:hidden">
      <Button href="/plan-your-safari?type=Safari" className="flex-1">Plan This Journey</Button>
      <Link href={siteConfig.whatsappUrlWithMessage(message)} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-forest px-4 text-sm font-semibold text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">WhatsApp</Link>
    </div> : null}
  </>;
}
