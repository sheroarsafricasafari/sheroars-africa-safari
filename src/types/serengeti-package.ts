import { z } from "zod";

export const serengetiMonthSchema = z.number().int().min(1).max(12);
export const accommodationTierSchema = z.enum(["camping", "mid-range", "luxury"]);

export const serengetiRegionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  nights: z.number().int().nonnegative().optional(),
});

export const serengetiPriceSchema = z.object({
  tier: accommodationTierSchema,
  amount: z.number().int().positive().nullable(),
  currency: z.literal("USD"),
  status: z.literal("proposed"),
  availability: z.enum(["available", "limited", "on-request", "unavailable"]),
  twinShare: z.boolean().optional(),
  note: z.string().optional(),
});

export const serengetiPackageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  subtitle: z.string().min(1),
  summary: z.string().min(1),
  durationDays: z.number().int().positive(),
  nights: z.number().int().nonnegative(),
  regions: z.array(serengetiRegionSchema).min(1),
  regionSearchTerms: z.array(z.string().min(1)),
  bestMonths: z.array(serengetiMonthSchema),
  season: z.string().min(1),
  seasonNote: z.string().min(1),
  access: z.object({
    label: z.string().min(1),
    status: z.enum(["specified", "todo-confirm"]),
  }),
  pace: z.object({
    label: z.string().min(1),
    status: z.enum(["specified", "todo-confirm"]),
  }),
  departureType: z.object({
    label: z.string().min(1),
    status: z.enum(["specified", "todo-confirm"]),
  }),
  groupSize: z.object({
    minimum: z.number().int().positive().optional(),
    maximum: z.number().int().positive().optional(),
  }),
  highlights: z.array(z.string().min(1)).min(1),
  bestFor: z.array(z.string().min(1)).min(1),
  experienceTags: z.array(z.string().min(1)).min(1),
  overview: z.array(z.string().min(1)).min(1),
  sellingPointTitle: z.string().min(1),
  sellingPoint: z.string().min(1),
  route: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    nights: z.number().int().nonnegative().optional(),
    note: z.string().optional(),
  })).min(1),
  routeEndpoints: z.object({
    start: z.string().nullable(),
    end: z.string().nullable(),
  }),
  itinerary: z.array(z.object({
    id: z.string().min(1),
    day: z.number().int().positive(),
    title: z.string().min(1),
    location: z.string().min(1).optional(),
    opening: z.string().optional(),
    activities: z.array(z.object({
      timeLabel: z.string().optional(),
      description: z.string().min(1),
      optional: z.boolean().optional(),
    })),
    travelNotes: z.array(z.string().min(1)),
    meals: z.array(z.enum(["B", "L", "D"])),
    overnightLocation: z.string().optional(),
    accommodationId: z.string().optional(),
    warnings: z.array(z.string().min(1)),
  })),
  itineraryStatus: z.enum(["provided", "todo-confirm"]),
  accommodation: z.array(z.object({
    id: z.string().min(1),
    tier: accommodationTierSchema,
    availability: z.enum(["available", "limited", "on-request", "unavailable"]),
    propertyName: z.string().nullable(),
    region: z.string().nullable(),
    location: z.string().nullable(),
    type: z.string().nullable(),
    description: z.string().nullable(),
    season: z.string().nullable(),
    areaType: z.enum(["national-park", "conservation-area", "private-reserve", "outside-park"]).nullable(),
    confirmationStatus: z.enum(["confirmed", "proposed", "todo-confirm"]),
  })),
  pricing: z.object({
    status: z.literal("proposed"),
    currency: z.literal("USD"),
    tiers: z.array(serengetiPriceSchema).length(3),
    midRangeGroupPrices: z.array(z.object({
      travellers: z.number().int().positive(),
      amount: z.number().int().positive(),
      currency: z.literal("USD"),
      status: z.literal("proposed"),
    })),
    singleSupplement: z.object({
      amount: z.number().int().positive(),
      currency: z.literal("USD"),
      prefix: z.string().min(1),
      status: z.literal("proposed"),
    }).optional(),
    unitConfirmation: z.string().min(1),
    balloonIncluded: z.boolean().optional(),
  }),
  inclusions: z.object({
    items: z.array(z.string().min(1)),
    status: z.enum(["provided", "todo-confirm"]),
  }),
  exclusions: z.object({
    items: z.array(z.string().min(1)),
    status: z.enum(["provided", "todo-confirm"]),
  }),
  addOns: z.array(z.object({
    name: z.string().min(1),
    status: z.enum(["included", "optional", "on-request", "todo-confirm"]),
    price: z.string().optional(),
    note: z.string().optional(),
  })),
  goodToKnow: z.array(z.object({
    title: z.string().min(1),
    text: z.string().min(1),
    status: z.enum(["provided", "todo-confirm"]),
  })),
  wildlife: z.array(z.string().min(1)),
  faqs: z.array(z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
  })),
  relatedPackages: z.array(z.string().min(1)),
  heroImage: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(1),
  }),
  cardImage: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(1),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  status: z.literal("proposed"),
});

export const serengetiPackagesSchema = z.array(serengetiPackageSchema).length(8);

export type SerengetiMonth = z.infer<typeof serengetiMonthSchema>;
export type AccommodationTier = z.infer<typeof accommodationTierSchema>;
export type SerengetiPackage = z.infer<typeof serengetiPackageSchema>;
export type SerengetiPrice = z.infer<typeof serengetiPriceSchema>;
