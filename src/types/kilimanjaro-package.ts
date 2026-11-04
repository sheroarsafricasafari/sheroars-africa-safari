import { z } from "zod";
import { packageSchema } from "./package";

export const kilimanjaroPackageSchema = packageSchema.extend({
  route: z.string().min(1),
  altitudeProfile: z.array(z.object({ day: z.number().int().positive(), altitudeMetres: z.number().positive() })).optional(),
});

export type KilimanjaroPackage = z.infer<typeof kilimanjaroPackageSchema>;
