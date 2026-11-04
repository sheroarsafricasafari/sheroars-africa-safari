import { z } from "zod";
import type { FormType } from "@/lib/forms/submitInquiry";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().max(40, "Phone number is too long."),
  country: z.string(),
  interest: z.string(),
  month: z.string(),
  year: z.string(),
  flexibleDates: z.boolean(),
  tripLength: z.string(),
  adults: z.string(),
  children: z.string(),
  childrenAges: z.string(),
  travelersType: z.string(),
  accommodation: z.string(),
  budget: z.string(),
  interests: z.array(z.string()),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters."),
  referral: z.string(),
  package: z.string(),
  startDate: z.string(),
  tripDuration: z.string(),
  rooming: z.string(),
  groupName: z.string(),
  nationality: z.string(),
  arrivalFlight: z.string(),
  departureFlight: z.string(),
  dietary: z.string(),
  medical: z.string(),
  occasion: z.string(),
  subject: z.string(),
  consent: z.boolean(),
  bookingTermsConsent: z.boolean(),
  website: z.string(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export function getInquirySchema(variant: FormType) {
  return inquirySchema.superRefine((values, context) => {
    const requireValue = (key: keyof InquiryFormValues, message: string) => {
      if (!values[key] || (typeof values[key] === "string" && !values[key].trim())) {
        context.addIssue({ code: "custom", path: [key], message });
      }
    };

    if (variant === "plan") {
      requireValue("interest", "Choose the journey you are dreaming of.");
      if (!values.consent) context.addIssue({ code: "custom", path: ["consent"], message: "Please agree to be contacted about your inquiry." });
      if (Number(values.adults) < 1) context.addIssue({ code: "custom", path: ["adults"], message: "At least one adult is required." });
    }

    if (variant === "book") {
      requireValue("package", "Choose a journey.");
      requireValue("startDate", "Choose a preferred start date.");
      requireValue("phone", "Please enter a phone or WhatsApp number.");
      requireValue("nationality", "Please enter the lead traveler's nationality.");
      if (!values.consent) context.addIssue({ code: "custom", path: ["consent"], message: "Please agree to the privacy policy." });
      if (!values.bookingTermsConsent) context.addIssue({ code: "custom", path: ["bookingTermsConsent"], message: "Please confirm you have read the Booking Terms." });
    }

    if (variant === "contact") {
      requireValue("subject", "Choose a subject.");
      if (values.message.trim().length < 10) context.addIssue({ code: "custom", path: ["message"], message: "Please share a little more about your message." });
      if (!values.consent) context.addIssue({ code: "custom", path: ["consent"], message: "Please agree to be contacted about your message." });
    }
  });
}
