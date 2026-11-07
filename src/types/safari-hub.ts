import { z } from "zod";

export const safariParkSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  facts: z.array(z.string().min(1)),
  bestTime: z.string().min(1),
  wildlife: z.array(z.string().min(1)),
  href: z.string().startsWith("/"),
  image: z.string().startsWith("/"),
});

export const migrationMonthSchema = z.object({
  month: z.string().min(1),
  region: z.string().min(1),
  headline: z.string().min(1),
  text: z.string().min(1),
  intensity: z.number().int().min(1).max(5),
  activeRegion: z.enum(["south", "central", "west", "north", "east"]),
});

export const safariStyleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().startsWith("/"),
  image: z.string().startsWith("/"),
});

export const scheduleStepSchema = z.object({
  title: z.string().min(1),
  timeOfDay: z.string().min(1),
  text: z.string().min(1),
});

export const wildlifeSpotlightSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  text: z.string().min(1),
  image: z.string().startsWith("/"),
});

export const safariHubSchema = z.object({
  parks: z.array(safariParkSchema).length(4),
  migration: z.array(migrationMonthSchema).length(12),
  styles: z.array(safariStyleSchema).length(5),
  daySchedule: z.array(scheduleStepSchema).length(6),
  wildlifeSpotlight: z.array(wildlifeSpotlightSchema).length(10),
  hubFaqs: z.array(z.object({ question: z.string(), answer: z.string(), href: z.string().startsWith("/").optional() })).length(6),
});

export type SafariHubData = z.infer<typeof safariHubSchema>;
