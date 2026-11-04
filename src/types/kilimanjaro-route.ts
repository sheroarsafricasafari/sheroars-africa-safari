import { z } from "zod";

export const kilimanjaroRouteSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  days: z.object({ min: z.number().int().positive(), max: z.number().int().positive() }),
  difficulty: z.number().int().min(1).max(5),
  scenery: z.number().int().min(1).max(5),
  crowds: z.number().int().min(1).max(5),
  accommodationType: z.enum(["camping", "hut"]),
  successRate: z.number().min(0).max(100).nullable(),
  summary: z.string().min(1),
  highlights: z.array(z.string()),
  image: z.string().min(1),
});

export type KilimanjaroRoute = z.infer<typeof kilimanjaroRouteSchema>;
