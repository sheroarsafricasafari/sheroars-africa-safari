import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().max(40, "Phone number is too long.").optional(),
  packageSlug: z.string().max(120).optional(),
  interest: z.enum([
    "safari",
    "kilimanjaro",
    "zanzibar",
    "safari-and-beach",
    "day-trip",
    "family",
    "honeymoon",
    "private-journey",
    "other",
  ]),
  travelDate: z.string().optional(),
  travelers: z.string().min(1, "Please select the number of travelers."),
  budget: z.string().optional(),
  message: z.string().trim().min(10, "Please share a little more about your plans.").max(2000),
  consent: z.boolean().refine((value) => value, "Please agree to be contacted about your inquiry."),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
