import { z } from "zod";

export const lodgeSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  tier: z.enum(["Luxury", "Mid-range", "Budget"]),
  note: z.string().min(1),
  image: z.string().min(1),
  href: z.string().min(1),
});

export type Lodge = z.infer<typeof lodgeSchema>;
