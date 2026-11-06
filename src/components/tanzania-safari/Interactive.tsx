"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {
  interestOptions,
  travelMonths,
  travelerOptions,
} from "@/data/tanzania-safari";

const sectionLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Destinations", href: "#destinations" },
  { label: "Journeys", href: "#journeys" },
  { label: "Experience", href: "#experience" },
  { label: "Wildlife", href: "#wildlife" },
  { label: "When to go", href: "#when-to-go" },
  { label: "Plan", href: "#plan" },
  { label: "FAQ", href: "#faq" },
];

export function StickySubnav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const hero = document.getElementById("overview");
    const sections = sectionLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    if (!hero) return;

    const heroObserver = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    }, { rootMargin: "-78px 0px 0px 0px" });
    heroObserver.observe(hero);

    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];
      if (current?.target instanceof HTMLElement) setActive(current.target.id);
    }, { rootMargin: "-110px 0px -68% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const activeLink = document.querySelector<HTMLElement>(`[data-subnav-link="${active}"]`);
    if (activeLink && window.matchMedia("(max-width: 767px)").matches) {
      activeLink.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  }, [active, visible]);

  return (
    <div className={`sticky top-[78px] z-40 border-y border-sand/80 bg-cream/95 shadow-sm backdrop-blur-md transition-[transform,opacity] duration-300 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-hidden={!visible}>
      <Container className="flex items-center gap-4">
        <nav aria-label="On this page" className="min-w-0 flex-1 overflow-x-auto py-2">
          <ul className="flex min-w-max items-center gap-2">
            {sectionLinks.map(({ label, href }) => {
              const id = href.slice(1);
              return (
                <li key={id}>
                  <a
                    data-subnav-link={id}
                    href={href}
                    aria-current={active === id ? "location" : undefined}
                    tabIndex={visible ? 0 : -1}
                    className={`inline-flex min-h-11 items-center rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta sm:px-4 sm:text-sm ${active === id ? "bg-forest text-cream" : "text-earth hover:bg-sand"}`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button href="/plan-your-safari?type=Safari" tabIndex={visible ? 0 : -1} size="sm" className="hidden shrink-0 lg:inline-flex">Plan Your Safari</Button>
      </Container>
    </div>
  );
}

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("overview");
    const final = document.getElementById("start");
    if (!hero || !final) return;

    let heroVisible = true;
    let finalVisible = false;
    const update = () => setVisible(!heroVisible && !finalVisible);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === final) finalVisible = entry.isIntersecting;
      });
      update();
    }, { threshold: 0.05 });
    observer.observe(hero);
    observer.observe(final);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none md:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))", right: "80px" }}
      aria-hidden={!visible}
    >
      <Button href="/plan-your-safari?type=Safari" tabIndex={visible ? 0 : -1} className="w-full">Plan Your Safari</Button>
    </div>
  );
}

export function EnquiryModule() {
  const router = useRouter();
  const [month, setMonth] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!month) {
      setError("Choose the month you would like to travel.");
      return;
    }
    if (interests.length === 0) {
      setError("Choose at least one destination that interests you.");
      return;
    }
    setError("");
    const query = new URLSearchParams({ type: "Safari", month, travelers, interests: interests.join(",") });
    router.push(`/plan-your-safari?${query.toString()}`);
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-sand bg-white p-5 shadow-soft sm:p-7" noValidate>
      <div className="mb-5">
        <p className="text-eyebrow text-terracotta">A FEW DETAILS TO BEGIN</p>
        <h3 className="mt-2 font-heading text-2xl text-earth">Tell us about your trip</h3>
      </div>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-earth">
          Travel month
          <select required value={month} onChange={(event) => setMonth(event.target.value)} aria-invalid={Boolean(error && !month)} aria-describedby={error && !month ? "enquiry-error" : undefined} className="min-h-12 rounded-xl border border-sand bg-cream px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            <option value="">Select a month</option>
            {travelMonths.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-earth">
          Number of travelers
          <select value={travelers} onChange={(event) => setTravelers(event.target.value)} className="min-h-12 rounded-xl border border-sand bg-cream px-3 font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            {travelerOptions.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <fieldset aria-describedby={error && interests.length === 0 ? "enquiry-error" : undefined} className="grid gap-2">
          <legend className="mb-2 text-sm font-semibold text-earth">Destinations that interest you</legend>
          {interestOptions.map((item) => (
            <label key={item} className="flex min-h-11 items-center gap-3 rounded-xl border border-sand px-3 text-sm text-earth">
              <input
                type="checkbox"
                checked={interests.includes(item)}
                onChange={(event) => setInterests((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item))}
                className="size-4 accent-terracotta"
              />
              {item}
            </label>
          ))}
        </fieldset>
      </div>
      {error ? <p id="enquiry-error" role="alert" className="mt-3 text-sm font-medium text-terracotta">{error}</p> : null}
      <Button type="submit" className="mt-5 w-full">Continue Planning <ArrowRight aria-hidden="true" size={17} /></Button>
    </form>
  );
}
