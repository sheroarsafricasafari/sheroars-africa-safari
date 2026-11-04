"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { DefaultValues } from "react-hook-form";
import { inquirySchema, type InquiryFormValues } from "@/types/inquiry";
import { useInquirySubmission } from "./InquirySubmissionProvider";
import Field, { fieldErrorProps } from "./Field";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const defaults: DefaultValues<InquiryFormValues> = {
  name: "",
  email: "",
  phone: "",
  packageSlug: "",
  interest: "safari",
  travelDate: "",
  travelers: "2",
  budget: "",
  message: "",
  consent: false,
};

type InquiryFormProps = {
  initialValues?: Partial<InquiryFormValues>;
};

export default function InquiryForm({ initialValues }: InquiryFormProps) {
  const { submitInquiry } = useInquirySubmission();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { ...defaults, ...initialValues },
  });

  const onSubmit = async (values: InquiryFormValues) => {
    await submitInquiry(values);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-sage/30 bg-sage/10 p-6 text-earth">
        <h3 className="font-heading text-2xl">Thank you for your inquiry</h3>
        <p className="mt-2 text-sm leading-6">Your details have been recorded for this preview. Our team will be in touch once inquiry delivery is connected.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <input type="hidden" {...register("packageSlug")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inquiry-name" label="Your name" error={errors.name?.message}>
          <TextInput id="inquiry-name" autoComplete="name" {...register("name")} {...fieldErrorProps("inquiry-name", errors.name?.message)} />
        </Field>
        <Field id="inquiry-email" label="Email address" error={errors.email?.message}>
          <TextInput id="inquiry-email" type="email" autoComplete="email" {...register("email")} {...fieldErrorProps("inquiry-email", errors.email?.message)} />
        </Field>
        <Field id="inquiry-phone" label="Phone / WhatsApp (optional)" error={errors.phone?.message}>
          <TextInput id="inquiry-phone" type="tel" autoComplete="tel" {...register("phone")} {...fieldErrorProps("inquiry-phone", errors.phone?.message)} />
        </Field>
        <Field id="inquiry-interest" label="What are you interested in?" error={errors.interest?.message}>
          <SelectInput id="inquiry-interest" {...register("interest")} {...fieldErrorProps("inquiry-interest", errors.interest?.message)}>
            <option value="safari">Safari</option>
            <option value="kilimanjaro">Kilimanjaro climb</option>
            <option value="zanzibar">Zanzibar</option>
            <option value="safari-and-beach">Safari and beach</option>
            <option value="day-trip">Day trip</option>
            <option value="family">Family journey</option>
            <option value="honeymoon">Honeymoon</option>
            <option value="private-journey">Private journey</option>
            <option value="other">Other</option>
          </SelectInput>
        </Field>
        <Field id="inquiry-date" label="Preferred travel date (optional)" error={errors.travelDate?.message}>
          <TextInput id="inquiry-date" type="date" {...register("travelDate")} {...fieldErrorProps("inquiry-date", errors.travelDate?.message)} />
        </Field>
        <Field id="inquiry-travelers" label="Number of travelers" error={errors.travelers?.message}>
          <SelectInput id="inquiry-travelers" {...register("travelers")} {...fieldErrorProps("inquiry-travelers", errors.travelers?.message)}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={String(count)}>{count}{count === 10 ? "+" : ""}</option>
            ))}
          </SelectInput>
        </Field>
        <Field id="inquiry-budget" label="Approximate budget per person (optional)" error={errors.budget?.message}>
          <TextInput id="inquiry-budget" placeholder="e.g. USD 2,000-3,000" {...register("budget")} {...fieldErrorProps("inquiry-budget", errors.budget?.message)} />
        </Field>
      </div>
      <Field id="inquiry-message" label="Tell us about your plans" error={errors.message?.message}>
        <TextArea id="inquiry-message" rows={5} {...register("message")} {...fieldErrorProps("inquiry-message", errors.message?.message)} />
      </Field>
      <div>
        <label htmlFor="inquiry-consent" className="flex items-start gap-3 text-sm leading-6 text-muted">
          <input id="inquiry-consent" type="checkbox" className="mt-1 size-4 accent-gold" {...register("consent")} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "inquiry-consent-error" : undefined} />
          <span>I agree to be contacted about this travel inquiry.</span>
        </label>
        {errors.consent?.message ? <p id="inquiry-consent-error" role="alert" className="mt-2 text-sm text-red-700">{errors.consent.message}</p> : null}
      </div>
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center rounded-full bg-earth px-7 py-3 text-sm font-semibold text-white transition hover:bg-earth/90 disabled:cursor-wait disabled:opacity-60">
        {isSubmitting ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
