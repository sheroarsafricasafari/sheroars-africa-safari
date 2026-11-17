import { z } from "zod";

export const packageSeasons = ["low", "high", "peak"] as const;
export const packageTiers = ["comfort", "luxury"] as const;
export const packageGroupSizes = [1, 2, 4, 6] as const;
export const packageMonths = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;

const groupPricesSchema = z.object({
  1: z.number().int().positive(),
  2: z.number().int().positive(),
  4: z.number().int().positive(),
  6: z.number().int().positive(),
});

const priceMatrixSchema = z.object({
  low: groupPricesSchema,
  high: groupPricesSchema,
  peak: groupPricesSchema,
});

export const packagePricingSchema = z.object({
  currency: z.literal("USD"),
  perPerson: z.literal(true),
  basis: z.literal("sharing"),
  standard: groupPricesSchema.optional(),
  tiers: z.object({
    comfort: priceMatrixSchema,
    luxury: priceMatrixSchema,
  }).optional(),
  priceFrom: z.number().int().positive(),
  note: z.string().min(1),
}).refine((pricing) => Boolean(pricing.standard) !== Boolean(pricing.tiers), {
  message: "Pricing must define either standard rates or comfort and luxury tiers.",
});

const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  label: z.string().min(1),
  route: z.string().optional(),
  driveTime: z.string().optional(),
  activities: z.array(z.object({
    time: z.string().min(1),
    text: z.string().min(1),
  })).min(1),
  meals: z.array(z.enum(["Breakfast", "Lunch", "Dinner"])),
  overnight: z.string().min(1),
});

export const tarangirePackageSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  duration: z.string().min(1),
  days: z.number().int().positive(),
  nights: z.number().int().nonnegative(),
  tagline: z.string().min(1),
  hook: z.string().min(1),
  bestFor: z.array(z.string().min(1)).min(1),
  style: z.string().min(1),
  accommodationSummary: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  itinerary: z.array(itineraryDaySchema).min(1),
  inclusions: z.array(z.string().min(1)).min(1),
  exclusions: z.array(z.string().min(1)).min(1),
  heroImage: z.string().min(1),
  heroAlt: z.string().min(1),
  cardImage: z.string().min(1),
  cardAlt: z.string().min(1),
  pricing: packagePricingSchema,
  seasonsNote: z.string().min(1),
  faqs: z.array(z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
  })).min(6).max(8),
  gallery: z.array(z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  })).min(3),
  related: z.array(z.string().min(1)),
  parks: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).min(1),
  pace: z.enum(["Relaxed", "Moderate", "Active"]),
  maxGuestsPerVehicle: z.number().int().positive(),
  bestMonths: z.string().min(1),
  seo: z.object({
    title: z.string().min(1).max(60),
    description: z.string().min(1).max(155),
    keywords: z.array(z.string().min(1)).min(1),
  }),
}).refine((item) => item.itinerary.length === item.days, {
  message: "Itinerary must include one entry for each package day.",
});

export type PackageSeason = typeof packageSeasons[number];
export type PackageTier = typeof packageTiers[number];
export type PackageGroupSize = typeof packageGroupSizes[number];
export type PackageMonth = typeof packageMonths[number]["value"];
export type PackagePricing = z.infer<typeof packagePricingSchema>;
export type TarangirePackage = z.infer<typeof tarangirePackageSchema>;
