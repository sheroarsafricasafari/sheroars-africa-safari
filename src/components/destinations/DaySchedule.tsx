"use client";

import { useRef } from "react";
import { Clock, Sunrise, Sun, Sunset, Moon, Coffee } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollProgressLine from "@/components/motion/ScrollProgressLine";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import type { DayScheduleData } from "@/types/destination";

// Props: ordered moments from a typical destination day, each with a time, title, sentence and icon key.
const iconMap: Record<string, LucideIcon> = { sunrise: Sunrise, sun: Sun, sunset: Sunset, moon: Moon, coffee: Coffee, clock: Clock };

export default function DaySchedule({ items }: { items: DayScheduleData[] }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} aria-label="A typical day" className="relative">
      <ScrollProgressLine target={ref} className="left-1/2 hidden -translate-x-1/2 md:block" />
      <StaggerGroup className="grid gap-4 md:grid-cols-2 md:gap-x-16">
        {items.map((item, index) => { const Icon = iconMap[item.icon] ?? Clock; return <StaggerItem key={item.time} className={index % 2 === 0 ? "md:pr-10" : "md:col-start-2 md:pl-10"}>
          <article className="relative rounded-2xl border border-sand bg-white p-5 shadow-sm">
            <span className="absolute -left-[1.4rem] top-6 hidden size-3 rounded-full border-2 border-cream bg-terracotta md:block" />
            <div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-gold"><Icon aria-hidden="true" size={20} /></span><div><p className="text-xs font-bold uppercase tracking-wider text-terracotta">{item.time}</p><h3 className="mt-1 font-heading text-xl text-earth">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.text}</p></div></div>
          </article>
        </StaggerItem>; })}
      </StaggerGroup>
    </section>
  );
}
