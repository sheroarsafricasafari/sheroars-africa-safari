import { z } from "zod";

export const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  overnight: z.string().min(1),
  meals: z.array(z.enum(["B", "L", "D"])),
  accommodation: z.string().min(1),
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
});

export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type Package = z.infer<typeof packageSchema>;

