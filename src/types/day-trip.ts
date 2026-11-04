import { z } from "zod";

export const dayTripSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  duration: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string()),
  priceFrom: z.number().nonnegative().nullable(),
  image: z.string().min(1),
  href: z.string().min(1),
});

export type DayTrip = z.infer<typeof dayTripSchema>;
