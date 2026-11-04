"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Mail, MessageCircle, Pencil } from "lucide-react";
import type { SubmitResult } from "@/lib/forms/submitInquiry";

type Props = Extract<SubmitResult, { status: "fallback" }> & {
  onEdit: () => void;
};

export default function FinalStepPanel({ whatsappUrl, mailtoUrl, summary, onEdit }: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby="final-step-title"
      className="rounded-3xl border border-sand bg-white p-6 shadow-soft sm:p-9"
    >
      <div className="flex size-14 items-center justify-center rounded-full border border-gold bg-gold/15 text-terracotta">
        <Check aria-hidden="true" className="size-7" />
      </div>
      <p className="mt-6 text-eyebrow text-terracotta">Final step</p>
      <h2 id="final-step-title" className="mt-2 font-heading text-3xl text-earth">One last step to send your request</h2>
      <p className="mt-3 max-w-xl leading-7 text-muted">Your details are ready. Choose how you would like to send them to our team and we will reply as soon as we can.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 font-semibold text-white transition hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
          <MessageCircle aria-hidden="true" className="size-5" /> Send via WhatsApp
        </a>
        <a href={mailtoUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-earth/20 px-6 py-3 font-semibold text-earth transition hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
          <Mail aria-hidden="true" className="size-5" /> Send via Email
        </a>
      </div>
      <details className="group mt-7 rounded-2xl bg-cream px-5 py-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-earth [&::-webkit-details-marker]:hidden">
          Review what you are sending
          <ChevronDown aria-hidden="true" className="size-5 transition-transform group-open:rotate-180" />
        </summary>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words pt-3 font-sans text-sm leading-6 text-muted">{summary}</pre>
      </details>
      <button type="button" onClick={onEdit} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted hover:text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
        <Pencil aria-hidden="true" className="size-4" /> Edit my details
      </button>
      {/* TODO(CONNECT): remove this mode once NEXT_PUBLIC_FORM_ENDPOINT is set. */}
    </motion.section>
  );
}
