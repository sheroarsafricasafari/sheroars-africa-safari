"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const checks = [
  "I have trekked above 4,000 m before and felt well.",
  "I am well-conditioned for steep, consecutive hiking days.",
  "I enjoy steep, rugged trails and narrow ridges.",
];

export default function UmbweFitCheck() {
  const id = useId();
  const [selected, setSelected] = useState<boolean[]>(checks.map(() => false));
  const details = checks.map((item, index) => `${selected[index] ? "Yes" : "Not yet"}: ${item}`).join("\n");
  const whatsapp = siteConfig.whatsappUrlWithMessage(`Hello She Roars, I am considering the Umbwe route. Could you help me decide if it is suitable for my experience?\n\n${details}`);

  return (
    <section aria-labelledby={`${id}-heading`} className="rounded-3xl border border-gold/40 bg-earth/90 p-5 text-white shadow-card sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Umbwe fit check</p>
      <h2 id={`${id}-heading`} className="mt-2 font-heading text-2xl text-white">Is Umbwe Right for You?</h2>
      <p className="mt-2 text-sm leading-6 text-white/80">Umbwe is steep and demanding. It is intended for experienced, well-conditioned trekkers who are comfortable on rugged trails.</p>
      <fieldset className="mt-4 space-y-3">
        <legend className="sr-only">Check your Umbwe experience and preferences</legend>
        {checks.map((label, index) => (
          <label key={label} className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-white/90">
            <input
              type="checkbox"
              checked={selected[index]}
              onChange={(event) => setSelected((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))}
              className="mt-1 size-4 shrink-0 accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            />
            {label}
          </label>
        ))}
      </fieldset>
      <a href={whatsapp} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 font-semibold text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        Ask us if Umbwe fits <ArrowRight aria-hidden="true" size={16} />
      </a>
    </section>
  );
}
