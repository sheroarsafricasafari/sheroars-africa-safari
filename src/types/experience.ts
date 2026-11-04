import { z } from "zod";

export const experienceSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  href: z.string().min(1),
  image: z.string().min(1),
  bestFor: z.array(z.string()),
});

export type Experience = z.infer<typeof experienceSchema>;
