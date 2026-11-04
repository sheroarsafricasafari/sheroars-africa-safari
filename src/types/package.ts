import { z } from "zod";

export const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  overnight: z.string().min(1),
  meals: z.array(z.enum(["B", "L", "D"])),
  accommodation: z.string().min(1),
});

export const highlightCardSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
});

export const safariRouteStopSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(["start", "park", "end", "beach"]),
  note: z.string().min(1),
});

export const detailedItineraryDaySchema = itineraryDaySchema.extend({
  routeId: z.string().min(1),
  driveNote: z.string().min(1),
  activities: z.array(z.string().min(1)),
  imageSrc: z.string().optional(),
});

export const accommodationTierSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  bestFor: z.string().min(1),
  askUsFor: z.string().min(1),
  recommended: z.boolean().optional(),
});

export const goodToKnowSchema = z.object({
  variant: z.enum(["tip", "note", "warning", "safety"]),
  title: z.string().min(1),
  text: z.string().min(1),
});

export const safariGalleryImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  span: z.enum(["wide", "tall", "square"]).optional(),
});

export const packageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  days: z.number().int().positive(),
  parks: z.array(z.string().min(1)),
  summary: z.string().min(1),
  highlights: z.array(z.string()),
  bestFor: z.array(z.string()),
  difficulty: z.string().min(1),
  groupSize: z.string().min(1),
  itinerary: z.array(itineraryDaySchema),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  priceFrom: z.number().nonnegative().nullable(),
  badge: z.string().optional(),
  tags: z.array(z.string()),
  image: z.string().min(1),
  related: z.array(z.string()),
  nights: z.number().int().nonnegative().optional(),
  startPoint: z.string().optional(),
  endPoint: z.string().optional(),
  pace: z.enum(["Relaxed", "Moderate", "Active"]).optional(),
  comfortLevel: z.string().optional(),
  groupSizeNote: z.string().optional(),
  overview: z.array(z.string().min(1)).length(2).optional(),
  highlightCards: z.array(highlightCardSchema).optional(),
  route: z.array(safariRouteStopSchema).optional(),
  wildlife: z.array(z.string()).optional(),
  seasonNote: z.string().optional(),
  accommodationTiers: z.array(accommodationTierSchema).optional(),
  dayByDay: z.array(detailedItineraryDaySchema).optional(),
  goodToKnow: z.array(goodToKnowSchema).optional(),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).optional(),
  gallery: z.array(safariGalleryImageSchema).optional(),
  departureInfo: z.object({ type: z.enum(["private", "group"]), datesNote: z.string().min(1) }).optional(),
});

export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type Package = z.infer<typeof packageSchema>;

export const detailedPackageSchema = packageSchema.extend({
  nights: z.number().int().nonnegative(),
  startPoint: z.string().min(1),
  endPoint: z.string().min(1),
  pace: z.enum(["Relaxed", "Moderate", "Active"]),
  comfortLevel: z.string().min(1),
  groupSizeNote: z.string().min(1),
  overview: z.array(z.string().min(1)).length(2),
  highlightCards: z.array(highlightCardSchema).min(1),
  route: z.array(safariRouteStopSchema).min(2),
  wildlife: z.array(z.string().min(1)).min(1),
  seasonNote: z.string().min(1),
  accommodationTiers: z.array(accommodationTierSchema).min(1),
  dayByDay: z.array(detailedItineraryDaySchema).min(1),
  goodToKnow: z.array(goodToKnowSchema),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).length(3),
  gallery: z.array(safariGalleryImageSchema).length(6),
  departureInfo: z.object({ type: z.enum(["private", "group"]), datesNote: z.string().min(1) }),
});

export type DetailedPackage = z.infer<typeof detailedPackageSchema>;
