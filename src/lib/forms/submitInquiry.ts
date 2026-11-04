"use client";

import { siteConfig } from "@/data/site";

export type FormType = "plan" | "book" | "contact";
export type InquiryPayload = Record<string, string | string[] | number | boolean | undefined>;

export type SubmitResult =
  | { status: "sent" }
  | { status: "fallback"; whatsappUrl: string; mailtoUrl: string; summary: string }
  | { status: "error"; message: string };

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone or WhatsApp",
  country: "Country of residence",
  interest: "Journey",
  month: "Travel month",
  year: "Travel year",
  flexibleDates: "Flexible dates",
  tripLength: "Trip length",
  adults: "Adults",
  children: "Children",
  childrenAges: "Children's ages",
  travelersType: "Traveling as",
  accommodation: "Accommodation style",
  budget: "Approximate budget per person",
  interests: "Special interests",
  message: "Message",
  referral: "How they heard about us",
  package: "Selected journey",
  startDate: "Preferred start date",
  tripDuration: "End date or trip length",
  rooming: "Rooming",
  groupName: "Group name",
  nationality: "Nationality",
  arrivalFlight: "Arrival flight details",
  departureFlight: "Departure flight details",
  dietary: "Dietary requirements",
  medical: "Medical or mobility considerations",
  occasion: "Special occasion",
  subject: "Subject",
};

function createSummary(payload: InquiryPayload) {
  return Object.entries(payload)
    .filter(([key, value]) => value !== undefined && value !== "" && !["consent", "bookingTermsConsent", "website"].includes(key))
    .map(([key, value]) => `${labels[key] ?? key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
    .join("\n");
}

export async function submitInquiry(
  formType: FormType,
  payload: InquiryPayload,
): Promise<SubmitResult> {
  const summary = createSummary(payload);
  if (payload.website) {
    return { status: "error", message: "We could not submit your request. Please try again or contact us directly." };
  }

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) {
    const subject = `${formType === "book" ? "Booking request" : formType === "contact" ? "Contact message" : "Trip enquiry"} from ${String(payload.name ?? "website visitor")}`;
    const message = `${subject}\n\n${summary}`;
    return {
      status: "fallback",
      summary,
      whatsappUrl: siteConfig.whatsappUrlWithMessage(message),
      mailtoUrl: `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        formType,
        ...payload,
        pageUrl: window.location.href,
        subject: `New trip enquiry from ${String(payload.name ?? "website visitor")}`,
      }),
    });
    if (!response.ok) {
      return { status: "error", message: `Your request could not be sent (server returned ${response.status}). Please try again.` };
    }
    return { status: "sent" };
  } catch (error) {
    const message = error instanceof DOMException && error.name === "AbortError"
      ? "The request timed out. Please try again or send it using WhatsApp."
      : "We could not reach the form service. Please try again or send your request using WhatsApp.";
    return { status: "error", message };
  } finally {
    window.clearTimeout(timeout);
  }
}
