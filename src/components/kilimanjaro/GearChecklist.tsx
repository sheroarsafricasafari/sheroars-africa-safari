"use client";

import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";

const GROUPS = [
  { name: "Clothing layers", items: ["Moisture-wicking base layers", "Insulated mid-layer", "Down jacket", "Waterproof shell jacket", "Waterproof trousers", "Warm hat", "Warm gloves", "Sun hat", "Buff or neck gaiter"] },
  { name: "Footwear", items: ["Broken-in waterproof hiking boots", "Hiking socks", "Spare warm socks", "Gaiters", "Camp shoes", "Blister care"] },
  { name: "Sleeping and camp", items: ["Four-season sleeping bag, rated to about -15 C", "Sleeping bag liner", "Inflatable pillow", "Headlamp with spare batteries", "Earplugs", "Small quick-dry towel"] },
  { name: "Day pack and accessories", items: ["30 to 40 L day pack", "Trekking poles", "3 L hydration system", "Water bottles", "Sunscreen", "Sunglasses", "Lip balm", "Snacks"] },
  { name: "Health and documents", items: ["Passport and visa", "Travel insurance details", "Personal medication", "Blister kit", "Hand sanitiser", "Water purification backup", "Small first-aid kit"] },
] as const;

export default function GearChecklist() {
  const [selected, setSelected] = useState(0);
  const tabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? GROUPS.length - 1 : (index + (event.key === "ArrowRight" ? 1 : GROUPS.length - 1)) % GROUPS.length;
    setSelected(next);
    document.getElementById(`gear-tab-${next}`)?.focus();
  };

  return (
    <div className="kilimanjaro-printable rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-8">
      <style>{`@media print { body * { visibility: hidden !important; } .kilimanjaro-printable, .kilimanjaro-printable * { visibility: visible !important; } .kilimanjaro-printable { position: absolute !important; inset: 0 !important; width: 100% !important; border: 0 !important; box-shadow: none !important; } .kilimanjaro-interactive { display: none !important; } .kilimanjaro-print-only { display: block !important; } }`}</style>
      <div className="kilimanjaro-interactive">
        <div role="tablist" aria-label="Packing list category" className="flex gap-2 overflow-x-auto pb-2">
          {GROUPS.map((group, index) => (
            <button key={group.name} id={`gear-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="gear-panel" tabIndex={selected === index ? 0 : -1} type="button" onClick={() => setSelected(index)} onKeyDown={(event) => tabKeyDown(event, index)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selected === index ? "bg-forest text-white" : "bg-sand text-earth"}`}>
              {group.name}
            </button>
          ))}
        </div>
        <div id="gear-panel" role="tabpanel" aria-labelledby={`gear-tab-${selected}`} className="mt-5">
          <h3 className="font-heading text-2xl text-earth">{GROUPS[selected].name}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {GROUPS[selected].items.map((item) => <li key={item} className="flex min-h-11 items-start gap-3 text-sm leading-6 text-muted"><input type="checkbox" aria-label={item} className="mt-1 size-4 accent-terracotta" /><span>{item}</span></li>)}
          </ul>
        </div>
        <p className="mt-5 text-sm text-muted">Sleeping bags, jackets and poles may be available to rent. Ask us what is currently available.</p>
        {/* TODO(CONFIRM): confirm rental availability before presenting any specific rental commitment. */}
        <Button type="button" variant="secondary" className="mt-5" onClick={() => window.print()}>Download packing list</Button>
      </div>
      <div className="kilimanjaro-print-only hidden">
        <h2 className="mb-5 text-2xl font-bold">Kilimanjaro packing list</h2>
        {GROUPS.map((group) => <section key={group.name} className="mb-5 break-inside-avoid">
          <h3 className="font-bold">{group.name}</h3>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">{group.items.map((item) => <li key={item}>[ ] {item}</li>)}</ul>
        </section>)}
      </div>
    </div>
  );
}
