import { z } from "zod";

export const zanzibarAreaSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  bestFor: z.array(z.string()),
  image: z.string().min(1),
});

export const zanzibarActivitySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  duration: z.string().min(1),
  priceFrom: z.number().nonnegative().nullable(),
  image: z.string().min(1),
});

export type ZanzibarArea = z.infer<typeof zanzibarAreaSchema>;
export type ZanzibarActivity = z.infer<typeof zanzibarActivitySchema>;
