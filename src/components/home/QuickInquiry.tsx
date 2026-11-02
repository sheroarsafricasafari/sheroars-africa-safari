"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function QuickInquiry() {
  const router = useRouter();
  const [type, setType] = useState("Safari");
  const [month, setMonth] = useState(months[0]);
  const [travelers, setTravelers] = useState("1");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new URLSearchParams({ type, month, travelers });
    router.push(`/plan-your-safari?${query.toString()}`);
  }

  return (
    <form onSubmit={submit} className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 rounded-2xl bg-white p-5 text-earth shadow-2xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_auto] lg:items-end lg:gap-5 lg:px-7 lg:py-6">
      <label className="grid gap-2 text-sm font-semibold">
        I&apos;m dreaming of
        <select value={type} onChange={(event) => setType(event.target.value)} className="h-12 rounded-xl border border-sand bg-cream px-3 text-sm font-normal">
          {["Safari", "Kilimanjaro Climb", "Zanzibar Beach Escape", "Day Trip", "Not sure yet"].map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Travel month
        <select value={month} onChange={(event) => setMonth(event.target.value)} className="h-12 rounded-xl border border-sand bg-cream px-3 text-sm font-normal">
          {months.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Travelers
        <select value={travelers} onChange={(event) => setTravelers(event.target.value)} className="h-12 rounded-xl border border-sand bg-cream px-3 text-sm font-normal">
          {["1", "2", "3 to 4", "5 or more"].map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <button type="submit" className="min-h-12 rounded-full bg-terracotta px-6 text-sm font-bold text-white transition-colors hover:bg-terracotta-hover">Get My Free Quote</button>
    </form>
  );
}
