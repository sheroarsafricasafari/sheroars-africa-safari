"use client";

import { useState, type KeyboardEvent } from "react";
import AltitudeProfile from "@/components/kilimanjaro/AltitudeProfile";
import { ROUTES } from "@/data/kilimanjaro";

export default function RouteProfiles() {
  const [selected, setSelected] = useState(1);
  const route = ROUTES[selected];
  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % ROUTES.length;
    else if (event.key === "ArrowLeft") next = (index + ROUTES.length - 1) % ROUTES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ROUTES.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`route-profile-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Select a route altitude profile" className="flex gap-2 overflow-x-auto pb-3">
        {ROUTES.map((item, index) => (
          <button key={item.slug} id={`route-profile-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="route-profile-panel" tabIndex={selected === index ? 0 : -1} type="button" onClick={() => setSelected(index)} onKeyDown={(event) => moveTab(event, index)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selected === index ? "bg-forest text-white" : "bg-sand text-earth"}`}>
            {item.name}
          </button>
        ))}
      </div>
      <div id="route-profile-panel" role="tabpanel" aria-labelledby={`route-profile-tab-${selected}`} className="mt-4 grid min-w-0 gap-6 rounded-3xl border border-sand bg-white p-4 shadow-card sm:p-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(15rem,0.8fr)]">
        <AltitudeProfile route={route} />
        <div>
          <h3 className="font-heading text-2xl text-earth">{route.name}, day by day</h3>
          <ol className="mt-4 space-y-3">
            {route.itinerary.map((day) => <li key={day.day} className="border-b border-sand pb-3 text-sm">
              <p className="font-semibold text-earth">Day {day.day}: {day.from} to {day.to}</p>
              <p className="mt-1 leading-5 text-muted">Approx. {day.hours} walking | sleep at {day.campAltitudeM.toLocaleString("en-US")} m</p>
            </li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
