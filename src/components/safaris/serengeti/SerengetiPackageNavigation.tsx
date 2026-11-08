"use client";

import { useEffect, useState } from "react";

const links = [
  ["overview", "Overview"],
  ["journey", "Journey"],
  ["itinerary", "Itinerary"],
  ["accommodation", "Accommodation"],
  ["pricing", "Pricing"],
  ["included", "Included"],
  ["good-to-know", "Good to Know"],
  ["faq", "FAQs"],
] as const;

export default function SerengetiPackageNavigation({ shortTitle, enquiryHref }: { shortTitle: string; enquiryHref: string }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [heroPassed, setHeroPassed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const targets = links.map(([id]) => document.getElementById(id)).filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.6] });
    targets.forEach((target) => observer.observe(target));

    const hero = document.getElementById("package-hero");
    const footer = document.querySelector("footer");
    const heroObserver = hero ? new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), { threshold: 0 }) : null;
    const footerObserver = footer ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0 }) : null;
    if (hero && heroObserver) heroObserver.observe(hero);
    if (footer && footerObserver) footerObserver.observe(footer);

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  return (
    <>
      <nav aria-label="Package sections" className="sticky top-[var(--navbar-height,78px)] z-30 border-b border-earth/10 bg-cream/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center px-5 sm:px-8">
          <div className="flex min-w-0 flex-1 snap-x gap-6 overflow-x-auto" role="list">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                className={`relative flex min-h-14 shrink-0 snap-center items-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${activeSection === id ? "text-terracotta" : "text-muted"}`}
              >
                {label}
                {activeSection === id ? <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-terracotta" /> : null}
              </a>
            ))}
          </div>
          <a href={enquiryHref} className="ml-4 hidden min-h-10 shrink-0 items-center rounded-full bg-terracotta px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta lg:inline-flex">
            Enquire
          </a>
        </div>
      </nav>
      {heroPassed && !footerVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-earth/10 bg-cream/95 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-[0_-8px_24px_rgba(27,39,29,0.12)] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-semibold text-earth">{shortTitle}</p>
            <a href={enquiryHref} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-terracotta px-5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Enquire</a>
          </div>
        </div>
      ) : null}
    </>
  );
}
