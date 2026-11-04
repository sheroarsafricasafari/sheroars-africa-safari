import { z } from "zod";

export const destinationSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  region: z.string().min(1),
  summary: z.string().min(1),
  wildlifeHighlights: z.array(z.string()),
  bestMonths: z.array(z.string()),
  image: z.string().min(1),
  subPages: z.array(z.object({ title: z.string(), href: z.string() })),
});

export const parkSchema = z.object({
  name: z.string().min(1),
  region: z.string().min(1),
  summary: z.string().min(1),
  wildlifeHighlights: z.array(z.string()),
  bestMonths: z.array(z.string()),
  image: z.string().min(1),
  subPages: z.array(z.object({ title: z.string(), href: z.string() })),
});

export type Destination = z.infer<typeof destinationSchema>;
export type Park = z.infer<typeof parkSchema>;
