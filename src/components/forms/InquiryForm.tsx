"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { DefaultValues, FieldPath, UseFormRegister } from "react-hook-form";
import type { ReactNode } from "react";
import { ArrowRight, Clock3, LoaderCircle, LockKeyhole, Plus, Minus } from "lucide-react";
import { getAllPackages } from "@/data";
import { siteConfig } from "@/data/site";
import { getAllSerengetiPackages } from "@/lib/serengeti-packages";
import { submitInquiry, type FormType, type InquiryPayload, type SubmitResult } from "@/lib/forms/submitInquiry";
import { getInquirySchema, type InquiryFormValues } from "@/types/inquiry";
import FinalStepPanel from "./FinalStepPanel";
import Field, { fieldErrorProps } from "./Field";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const packages = [
  ...getAllPackages().map(({ slug, title }) => ({ slug, title })),
  ...getAllSerengetiPackages().map(({ slug, title }) => ({ slug, title })),
];
const emptyValues: DefaultValues<InquiryFormValues> = {
  name: "", email: "", phone: "", country: "", interest: "", month: "", year: "2026",
  flexibleDates: false, tripLength: "", adults: "2", children: "0", childrenAges: "",
  travelersType: "", accommodation: "", budget: "", interests: [], message: "", referral: "",
  package: "", startDate: "", tripDuration: "", rooming: "", groupName: "", nationality: "",
  arrivalFlight: "", departureFlight: "", dietary: "", medical: "", occasion: "", subject: "",
  consent: false, bookingTermsConsent: false, website: "",
};

const inputClass = "min-h-11 w-full rounded-xl border border-earth/15 bg-white px-4 py-2.5 text-sm text-earth outline-none transition placeholder:text-muted/70 focus-visible:border-terracotta focus-visible:ring-2 focus-visible:ring-terracotta/20";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const tripTypes = ["Safari", "Kilimanjaro Climb", "Zanzibar Beach Escape", "Day Trip", "Safari and Zanzibar", "Climb and Safari", "Not sure yet"];
const interestOptions = ["Great Migration", "Big Five", "Photography", "Honeymoon or celebration", "Cultural experiences", "Beach and relaxation", "Women-only group", "Kilimanjaro summit"];
const hearOptions = ["Google", "Instagram", "Facebook", "TikTok", "Friend or family", "Travel blog", "Other"];

type Props = {
  variant?: FormType;
  initialValues?: Partial<InquiryFormValues>;
};

function SectionHeading({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-4 border-b border-sand pb-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-heading text-lg text-terracotta">{step}</span>
      <h3 className="font-heading text-2xl text-earth">{title}</h3>
    </div>
  );
}

function TextField({
  name,
  label,
  register,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  name: FieldPath<InquiryFormValues>;
  label: string;
  register: UseFormRegister<InquiryFormValues>;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `inquiry-${name}`;
  return (
    <Field id={id} label={label} error={error}>
      <TextInput id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} className={inputClass} {...register(name)} {...fieldErrorProps(id, error)} />
    </Field>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  multiple = false,
  error,
}: {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  error?: string;
}) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-earth">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => {
                if (multiple) {
                  onChange(active ? selected.filter((item) => item !== option) : [...selected, option]);
                } else {
                  onChange(active ? "" : option);
                }
              }}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${active ? "border-terracotta bg-terracotta text-white" : "border-earth/15 bg-white text-earth hover:border-terracotta/50"}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? <p role="alert" className="mt-2 text-sm text-red-700">{error}</p> : null}
    </fieldset>
  );
}

function NumberStepper({
  name,
  label,
  value,
  onChange,
  minimum,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  minimum: number;
  error?: string;
}) {
  const numeric = Math.max(minimum, Number(value) || minimum);
  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-earth">{label}</span>
      <div className="flex h-11 w-fit items-center overflow-hidden rounded-xl border border-earth/15 bg-white">
        <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} onClick={() => onChange(String(Math.max(minimum, numeric - 1)))} className="flex size-11 items-center justify-center text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><Minus aria-hidden="true" size={16} /></button>
        <input id={`inquiry-${name}`} name={name} type="number" min={minimum} value={numeric} onChange={(event) => onChange(event.target.value)} aria-label={label} className="h-11 w-14 border-x border-earth/10 text-center text-sm outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta" />
        <button type="button" aria-label={`Increase ${label.toLowerCase()}`} onClick={() => onChange(String(numeric + 1))} className="flex size-11 items-center justify-center text-earth hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"><Plus aria-hidden="true" size={16} /></button>
      </div>
      {error ? <p role="alert" className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

function Checkbox({ id, label, checked, onChange, error }: { id: string; label: ReactNode; checked: boolean; onChange: (checked: boolean) => void; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-muted">
        <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="mt-1 size-4 shrink-0 accent-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta" />
        <span>{label}</span>
      </label>
      {error ? <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}) {
  const id = `inquiry-${name}`;
  return (
    <Field id={id} label={label} error={error}>
      <SelectInput id={id} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} {...fieldErrorProps(id, error)}>
        <option value="">{placeholder ?? "Select an option"}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </SelectInput>
    </Field>
  );
}

export default function InquiryForm({ variant = "plan", initialValues }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<SubmitResult | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getFieldState,
    control,
    formState: { isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(getInquirySchema(variant)),
    defaultValues: { ...emptyValues, ...initialValues },
  });
  const values = useWatch({ control });
  const childrenCount = Number(values.children ?? 0);
  const chosenPackage = packages.find((item) => item.slug === values.package);
  const errorFor = (key: FieldPath<InquiryFormValues>) => getFieldState(key).error?.message;
  const set = (key: FieldPath<InquiryFormValues>, value: string | boolean | string[]) => setValue(key, value as never, { shouldValidate: true, shouldDirty: true });

  const submit = async (formValues: InquiryFormValues) => {
    setResult(null);
    const response = await submitInquiry(variant, formValues as InquiryPayload);
    setResult(response);
    if (response.status === "sent") router.push("/thank-you");
  };
  const submitAgain = () => void handleSubmit(submit)();

  if (result?.status === "fallback") {
    return <FinalStepPanel {...result} onEdit={() => setResult(null)} />;
  }

  if (variant === "contact") {
    return (
      <form noValidate onSubmit={handleSubmit(submit)} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="name" label="Full name" register={register} error={errorFor("name")} autoComplete="name" />
          <TextField name="email" label="Email address" type="email" register={register} error={errorFor("email")} autoComplete="email" />
          <TextField name="phone" label="Phone or WhatsApp (optional)" type="tel" register={register} error={errorFor("phone")} autoComplete="tel" />
          <SelectField name="subject" label="Subject" value={values.subject ?? ""} onChange={(value) => set("subject", value)} error={errorFor("subject")} options={["Planning a trip", "Kilimanjaro climb", "Zanzibar", "Day trip", "Existing booking", "Partnerships and media", "Something else"].map((item) => ({ value: item, label: item }))} />
        </div>
        <Field id="inquiry-message" label="Message" error={errorFor("message")}>
          <TextArea id="inquiry-message" rows={6} placeholder="How can we help?" className={inputClass} {...register("message")} {...fieldErrorProps("inquiry-message", errorFor("message"))} />
        </Field>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="inquiry-website">Leave this field empty</label>
          <input id="inquiry-website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>
        <Checkbox id="inquiry-consent" checked={Boolean(values.consent)} onChange={(value) => set("consent", value)} error={errorFor("consent")} label={<>I agree to be contacted about this message and have read the <Link className="font-semibold text-terracotta underline" href="/privacy-policy">Privacy Policy</Link>.</>} />
        <SubmitArea variant={variant} isSubmitting={isSubmitting} result={result} onRetry={submitAgain} />
      </form>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="space-y-9">
      {variant === "plan" ? (
        <>
          {chosenPackage ? <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm"><span>You are enquiring about: <strong>{chosenPackage.title}</strong></span><button type="button" onClick={() => set("package", "")} className="min-h-11 px-2 font-semibold text-terracotta underline">Clear</button></div> : null}
          <section><SectionHeading step="01" title="About you" /><div className="grid gap-5 sm:grid-cols-2">
            <TextField name="name" label="Full name" register={register} error={errorFor("name")} autoComplete="name" />
            <TextField name="email" label="Email address" type="email" register={register} error={errorFor("email")} autoComplete="email" />
            <TextField name="phone" label="Phone or WhatsApp (optional)" type="tel" register={register} error={errorFor("phone")} autoComplete="tel" />
            <TextField name="country" label="Country of residence (optional)" register={register} error={errorFor("country")} autoComplete="country-name" />
          </div></section>
          <section><SectionHeading step="02" title="Your trip" /><div className="space-y-6">
            <ChoiceGroup label="I'm dreaming of" options={tripTypes} value={values.interest ?? ""} onChange={(value) => set("interest", value as string)} error={errorFor("interest")} />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField name="month" label="Travel month (optional)" value={values.month ?? ""} onChange={(value) => set("month", value)} options={months.map((month) => ({ value: month, label: month }))} />
              <SelectField name="year" label="Travel year (optional)" value={values.year ?? ""} onChange={(value) => set("year", value)} options={["2026", "2027", "2028"].map((year) => ({ value: year, label: year }))} />
            </div>
            <Checkbox id="inquiry-flexible-dates" checked={Boolean(values.flexibleDates)} onChange={(value) => set("flexibleDates", value)} label="My dates are flexible" />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField name="tripLength" label="Trip length (optional)" value={values.tripLength ?? ""} onChange={(value) => set("tripLength", value)} options={["1 day", "2 to 3 days", "4 to 5 days", "6 to 7 days", "8 to 10 days", "11 to 14 days", "15 days or more", "Not sure yet"].map((item) => ({ value: item, label: item }))} />
              <div className="grid grid-cols-2 gap-4">
                <NumberStepper name="adults" label="Adults" value={values.adults ?? "1"} minimum={1} onChange={(value) => set("adults", value)} error={errorFor("adults")} />
                <NumberStepper name="children" label="Children" value={values.children ?? "0"} minimum={0} onChange={(value) => set("children", value)} />
              </div>
            </div>
            {childrenCount > 0 ? <TextField name="childrenAges" label="Children's ages" register={register} error={errorFor("childrenAges")} placeholder="e.g. 5 and 9" /> : null}
            <ChoiceGroup label="Who is traveling?" options={["Solo", "Couple", "Friends", "Family", "Group"]} value={values.travelersType ?? ""} onChange={(value) => set("travelersType", value as string)} />
          </div></section>
          <section><SectionHeading step="03" title="Your dream" /><div className="space-y-6">
            <ChoiceGroup label="Accommodation style" options={["Camping", "Mid-range", "Comfortable lodges", "Luxury", "Mix of styles", "Not sure yet"]} value={values.accommodation ?? ""} onChange={(value) => set("accommodation", value as string)} />
            <SelectField name="budget" label="Approximate budget per person, excluding international flights" value={values.budget ?? ""} onChange={(value) => set("budget", value)} options={["Under USD 1,500", "USD 1,500 to 3,000", "USD 3,000 to 5,000", "USD 5,000 to 8,000", "USD 8,000 or more", "Not sure yet"].map((item) => ({ value: item, label: item }))} />
            <ChoiceGroup label="Special interests (choose any)" options={interestOptions} multiple value={values.interests ?? []} onChange={(value) => set("interests", value as string[])} />
            <Field id="inquiry-message" label="Anything else to share?" error={errorFor("message")}>
              <TextArea id="inquiry-message" rows={5} placeholder="Tell us about your dream trip, celebrations, dietary needs, mobility or health considerations, or anything that matters to you." className={inputClass} {...register("message")} {...fieldErrorProps("inquiry-message", errorFor("message"))} />
            </Field>
            <SelectField name="referral" label="How did you hear about us? (optional)" value={values.referral ?? ""} onChange={(value) => set("referral", value)} options={hearOptions.map((item) => ({ value: item, label: item }))} />
          </div></section>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="inquiry-website">Leave this field empty</label>
            <input id="inquiry-website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
          <div className="space-y-4 border-t border-sand pt-6">
            <div className="flex flex-wrap gap-5 text-xs text-muted"><span className="inline-flex items-center gap-2"><LockKeyhole size={15} />Your details are private and never shared.</span><span className="inline-flex items-center gap-2"><Clock3 size={15} />We reply {siteConfig.responseTime}.</span></div>
            <Checkbox id="inquiry-consent" checked={Boolean(values.consent)} onChange={(value) => set("consent", value)} error={errorFor("consent")} label={<>I agree to be contacted about my inquiry and have read the <Link className="font-semibold text-terracotta underline" href="/privacy-policy">Privacy Policy</Link>.</>} />
            <SubmitArea variant={variant} isSubmitting={isSubmitting} result={result} onRetry={submitAgain} />
          </div>
        </>
      ) : (
        <>
          <section><SectionHeading step="01" title="Your journey" /><div className="grid gap-5 sm:grid-cols-2">
            <SelectField name="package" label="Journey" value={values.package ?? ""} onChange={(value) => set("package", value)} error={errorFor("package")} options={[
              ...packages.map((item) => ({ value: item.slug, label: item.title })),
              ...["Custom itinerary", "Kilimanjaro climb", "Zanzibar beach escape", "Day trip", "Safari and Zanzibar", "Not listed, I will explain below"].map((item) => ({ value: item, label: item })),
            ]} />
            <TextField name="startDate" label="Preferred start date" type="date" register={register} error={errorFor("startDate")} />
            <SelectField name="tripDuration" label="End date or trip length" value={values.tripDuration ?? ""} onChange={(value) => set("tripDuration", value)} options={["End date to be confirmed", "1 day", "2 to 3 days", "4 to 5 days", "6 to 7 days", "8 to 10 days", "11 to 14 days", "15 days or more"].map((item) => ({ value: item, label: item }))} />
            <Checkbox id="inquiry-flexible-dates" checked={Boolean(values.flexibleDates)} onChange={(value) => set("flexibleDates", value)} label="My dates are flexible" />
          </div></section>
          <section><SectionHeading step="02" title="Your travelers" /><div className="grid gap-5 sm:grid-cols-2">
            <NumberStepper name="adults" label="Adults" value={values.adults ?? "1"} minimum={1} onChange={(value) => set("adults", value)} />
            <NumberStepper name="children" label="Children" value={values.children ?? "0"} minimum={0} onChange={(value) => set("children", value)} />
            {childrenCount > 0 ? <TextField name="childrenAges" label="Children's ages" register={register} error={errorFor("childrenAges")} placeholder="e.g. 5 and 9" /> : null}
            <SelectField name="rooming" label="Rooming" value={values.rooming ?? ""} onChange={(value) => set("rooming", value)} options={["Double or twin", "Single", "Family room", "Mix", "Not sure"].map((item) => ({ value: item, label: item }))} />
            <TextField name="groupName" label="Group name (optional)" register={register} error={errorFor("groupName")} placeholder="Friends, celebration, or group" />
          </div></section>
          <section><SectionHeading step="03" title="Lead traveler" /><div className="grid gap-5 sm:grid-cols-2">
            <TextField name="name" label="Full name as on passport" register={register} error={errorFor("name")} autoComplete="name" />
            <TextField name="email" label="Email address" type="email" register={register} error={errorFor("email")} autoComplete="email" />
            <TextField name="phone" label="Phone or WhatsApp" type="tel" register={register} error={errorFor("phone")} autoComplete="tel" />
            <TextField name="nationality" label="Nationality" register={register} error={errorFor("nationality")} autoComplete="country-name" />
            <TextField name="country" label="Country of residence (optional)" register={register} error={errorFor("country")} />
            <TextField name="arrivalFlight" label="Arrival flight details (optional)" register={register} error={errorFor("arrivalFlight")} placeholder="Airline, flight number, date and time" />
            <TextField name="departureFlight" label="Departure flight details (optional)" register={register} error={errorFor("departureFlight")} placeholder="Airline, flight number, date and time" />
          </div></section>
          <section><SectionHeading step="04" title="Personal touches" /><div className="space-y-5">
            <TextField name="dietary" label="Dietary requirements (optional)" register={register} error={errorFor("dietary")} />
            <Field id="inquiry-medical" label="Medical or mobility considerations (optional)" error={errorFor("medical")}>
              <TextArea id="inquiry-medical" rows={3} className={inputClass} {...register("medical")} />
              <span className="text-xs text-muted">Shared only with the people planning your trip.</span>
            </Field>
            <TextField name="occasion" label="Special occasion (optional)" register={register} error={errorFor("occasion")} placeholder="Birthday, honeymoon, anniversary" />
            <Field id="inquiry-message" label="Anything else? (optional)" error={errorFor("message")}>
              <TextArea id="inquiry-message" rows={4} className={inputClass} {...register("message")} {...fieldErrorProps("inquiry-message", errorFor("message"))} />
            </Field>
            <SelectField name="referral" label="How did you hear about us? (optional)" value={values.referral ?? ""} onChange={(value) => set("referral", value)} options={hearOptions.map((item) => ({ value: item, label: item }))} />
          </div></section>
          <div className="space-y-4 border-t border-sand pt-6">
            <Checkbox id="inquiry-consent" checked={Boolean(values.consent)} onChange={(value) => set("consent", value)} error={errorFor("consent")} label={<>I agree to be contacted about this booking and have read the <Link className="font-semibold text-terracotta underline" href="/privacy-policy">Privacy Policy</Link>.</>} />
            <Checkbox id="inquiry-booking-terms" checked={Boolean(values.bookingTermsConsent)} onChange={(value) => set("bookingTermsConsent", value)} error={errorFor("bookingTermsConsent")} label={<>I have read the <Link className="font-semibold text-terracotta underline" href="/booking-terms" target="_blank" rel="noopener noreferrer">Booking Terms</Link>.</>} />
            <SubmitArea variant={variant} isSubmitting={isSubmitting} result={result} onRetry={submitAgain} />
          </div>
        </>
      )}
    </form>
  );
}

function SubmitArea({ variant, isSubmitting, result, onRetry }: { variant: FormType; isSubmitting: boolean; result: SubmitResult | null; onRetry: () => void }) {
  const error = result?.status === "error" ? result.message : null;
  return (
    <div className="space-y-3">
      {error ? (
        <div role="alert" aria-live="assertive" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <p>{error}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={onRetry} className="min-h-11 rounded-full bg-earth px-5 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Retry</button>
            <a href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-earth/20 px-5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Continue on WhatsApp</a>
          </div>
        </div>
      ) : null}
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-white transition hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        {isSubmitting ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin motion-reduce:animate-none" /> : null}
        {isSubmitting ? "Sending..." : variant === "plan" ? "Request My Free Quote" : variant === "book" ? "Send Booking Request" : "Send Message"}
        {!isSubmitting ? <ArrowRight aria-hidden="true" className="size-5" /> : null}
      </button>
    </div>
  );
}
