import { dayTripSchema } from "../types/day-trip";
import { destinationSchema, parkSchema } from "../types/destination";
import { experienceSchema } from "../types/experience";
import { guideArticleSchema } from "../types/guide-article";
import { kilimanjaroPackageSchema } from "../types/kilimanjaro-package";
import { kilimanjaroRouteSchema } from "../types/kilimanjaro-route";
import { lodgeSchema } from "../types/lodge";
import { packageSchema } from "../types/package";
import { zanzibarActivitySchema, zanzibarAreaSchema } from "../types/zanzibar";
import { safaris } from "./safaris";
import {
  sampleDayTrips,
  sampleDestinations,
  sampleExperiences,
  sampleGuideArticles,
  sampleKilimanjaroPackages,
  sampleLodges,
  samplePackages,
  sampleParks,
  sampleRoutes,
  sampleZanzibarActivities,
  sampleZanzibarAreas,
} from "./sampleData";

const collections = [
  ["Safari packages", packageSchema, safaris],
  ["Sample packages", packageSchema, samplePackages],
  ["Destinations", destinationSchema, sampleDestinations],
  ["Parks", parkSchema, sampleParks],
  ["Kilimanjaro routes", kilimanjaroRouteSchema, sampleRoutes],
  ["Kilimanjaro packages", kilimanjaroPackageSchema, sampleKilimanjaroPackages],
  ["Day trips", dayTripSchema, sampleDayTrips],
  ["Zanzibar areas", zanzibarAreaSchema, sampleZanzibarAreas],
  ["Zanzibar activities", zanzibarActivitySchema, sampleZanzibarActivities],
  ["Experiences", experienceSchema, sampleExperiences],
  ["Lodges", lodgeSchema, sampleLodges],
  ["Guide articles", guideArticleSchema, sampleGuideArticles],
] as const;

for (const [label, schema, entries] of collections) {
  entries.forEach((entry, index) => {
    const result = schema.safeParse(entry);
    if (!result.success) {
      throw new Error(`${label}[${index}] failed validation: ${JSON.stringify(result.error.issues)}`);
    }
  });
}

console.info(`Validated ${collections.reduce((total, [, , entries]) => total + entries.length, 0)} records.`);
