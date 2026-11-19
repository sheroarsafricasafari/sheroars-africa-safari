"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ROUTES, type KiliRoute } from "@/data/kilimanjaro";

type Answers = {
  experience?: "first" | "some" | "expert";
  days?: 6 | 7 | 8 | 9 | 10;
  priority?: "scenery" | "quiet" | "success" | "budget";
  stay?: "tent" | "huts" | "either";
};

const QUESTIONS = [
  { key: "experience", title: "How much hiking or altitude experience do you have?", options: [{ v: "first", label: "I am new to trekking" }, { v: "some", label: "I hike regularly" }, { v: "expert", label: "I have trekked at high altitude" }] },
  { key: "days", title: "How many days can you spend on the mountain?", options: [{ v: 6, label: "Up to 6 days" }, { v: 7, label: "7 days" }, { v: 8, label: "8 days" }, { v: 9, label: "9 days" }, { v: 10, label: "10 days or more" }] },
  { key: "priority", title: "What matters most to you?", options: [{ v: "scenery", label: "The best scenery" }, { v: "quiet", label: "Quiet trails" }, { v: "success", label: "The best chance of the summit" }, { v: "budget", label: "Keeping the cost down" }] },
  { key: "stay", title: "Where would you like to sleep?", options: [{ v: "tent", label: "In a tent" }, { v: "huts", label: "In a hut" }, { v: "either", label: "No preference" }] },
] as const;

function score(route: KiliRoute, answers: Answers) {
  let total = 0;
  const days = answers.days ?? 7;
  if (days >= route.days.recommended) total += 3;
  else if (days === route.days.recommended - 1) total += 0.5;
  else total -= 4;
  if (answers.experience === "first") total += route.acclimatisation - route.difficulty * 0.6;
  if (answers.experience === "some") total += route.acclimatisation * 0.5 - route.difficulty * 0.2;
  if (answers.experience === "expert") total += route.difficulty * 0.4 + (route.slug === "umbwe" ? 1.5 : 0);
  if (answers.priority === "scenery") total += route.scenery * 1.3;
  if (answers.priority === "quiet") total += (6 - route.crowds) * 1.3;
  if (answers.priority === "success") total += (route.successPct / 100) * 6;
  if (answers.priority === "budget") total += (10 - route.days.recommended) * 0.9;
  if (answers.stay === "huts") total += route.stay === "Huts" ? 6 : -3;
  if (answers.stay === "tent" && route.stay === "Huts") total -= 2;
  return total;
}

function reason(route: KiliRoute, answers: Answers) {
  if (answers.stay === "huts" && route.stay === "Huts") return "It is the only route with sleeping huts.";
  if (answers.priority === "scenery") return `Scenery rated ${route.scenery} out of 5. ${route.hook}`;
  if (answers.priority === "quiet") return route.crowds <= 2 ? "One of the quieter trails on the mountain." : "Busier than average, but with other strengths.";
  if (answers.priority === "success") return `${route.successLabel}.`;
  if (answers.priority === "budget") return `A ${route.days.recommended}-day route keeps time on the mountain, and cost, lower.`;
  return route.hook;
}

export default function RouteFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const reduce = useReducedMotion();
  const done = step >= QUESTIONS.length;
  const ranked = useMemo(() => done ? [...ROUTES].map((route) => ({ route, score: score(route, answers) })).sort((a, b) => b.score - a.score).slice(0, 3) : [], [answers, done]);
  const question = QUESTIONS[step];
  const progress = Math.min(step, QUESTIONS.length) / QUESTIONS.length;

  function choose(key: keyof Answers, value: string | number) {
    setAnswers((previous) => ({ ...previous, [key]: value } as Answers));
    setStep((current) => current + 1);
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-sand bg-white p-5 shadow-card sm:p-9">
      <div className="mb-6 h-1.5 w-full rounded-full bg-sand" role="progressbar" aria-label="Route finder progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <motion.div className="h-full rounded-full bg-gold" animate={{ width: `${progress * 100}%` }} transition={{ duration: reduce ? 0 : 0.25 }} />
      </div>
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          {!done && question ? (
            <motion.div key={question.key} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -12 }} transition={{ duration: reduce ? 0 : 0.2 }}>
              <p className="text-xs uppercase tracking-[0.18em] text-terracotta">Question {step + 1} of {QUESTIONS.length}</p>
              <h3 className="mt-2 font-heading text-2xl text-earth sm:text-3xl">{question.title}</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button key={String(option.v)} type="button" onClick={() => choose(question.key, option.v)} className="min-h-12 rounded-2xl border border-sand px-5 py-3 text-left transition hover:border-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                    {option.label}
                  </button>
                ))}
              </div>
              {step > 0 ? <button type="button" className="mt-5 min-h-11 text-sm font-semibold text-terracotta underline underline-offset-4" onClick={() => setStep((current) => current - 1)}>Back</button> : null}
            </motion.div>
          ) : (
            <motion.div key="results" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.2 }}>
              <p className="text-xs uppercase tracking-[0.18em] text-terracotta">Your best match</p>
              {ranked.map(({ route, score: routeScore }, index) => (
                <article key={route.slug} className={`mt-4 rounded-2xl border p-5 ${index === 0 ? "border-gold bg-gold/10" : "border-sand"}`}>
                  <h3 className={`font-heading text-earth ${index === 0 ? "text-3xl" : "text-xl"}`}>{index === 0 ? "" : "Also consider: "}{route.name}, {route.days.recommended} days</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{reason(route, answers)}</p>
                  <p className="mt-2 text-xs text-muted">Approx. {route.distanceKm} km | {route.stay} | {route.successLabel}</p>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <a href={`/kilimanjaro/routes/${route.slug}`} className="inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4">View this route</a>
                    <Link href={`/plan-your-safari?route=${route.slug}`} className="inline-flex min-h-11 items-center font-semibold text-terracotta underline underline-offset-4">Ask about this route</Link>
                  </div>
                  {index === 0 ? <span className="sr-only">Top match score {routeScore.toFixed(1)}</span> : null}
                </article>
              ))}
              <Button type="button" variant="ghost" className="mt-5" onClick={() => { setStep(0); setAnswers({}); }}>Start over</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
