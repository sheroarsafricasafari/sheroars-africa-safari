"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ email: z.email("Enter a valid email address.") });
type FormValues = z.infer<typeof schema>;

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit(() => {
    // TODO(CONNECT): connect this UI-only form to the newsletter service.
    setSubmitted(true);
  });
  if (submitted) return <p role="status" className="text-sm text-gold">Thank you for subscribing.</p>;
  return (
    <form onSubmit={onSubmit} noValidate className="mt-5">
      <label htmlFor="newsletter-email" className="mb-2 block text-sm font-semibold">Get travel inspiration in your inbox</label>
      <div className="flex gap-2">
        <input id="newsletter-email" type="email" autoComplete="email" placeholder="Email address" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "newsletter-error" : undefined} {...register("email")} className="min-w-0 flex-1 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60" />
        <button className="rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-forest hover:bg-cream">Subscribe</button>
      </div>
      {errors.email ? <p id="newsletter-error" className="mt-2 text-xs text-rose-200">{errors.email.message}</p> : null}
    </form>
  );
}
