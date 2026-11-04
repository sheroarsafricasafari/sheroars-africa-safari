import { safaris } from "@/data/safaris";
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
} from "@/data/sampleData";
import type { Package } from "@/types/package";
import type { KilimanjaroRoute } from "@/types/kilimanjaro-route";

export const guideArticles = sampleGuideArticles;
export const kilimanjaroPackages = sampleKilimanjaroPackages;
export const kilimanjaroRoutes = sampleRoutes;

export function getPackageBySlug(slug: string): (Package & { sample?: true }) | undefined {
  return safaris.find((item) => item.slug === slug) ?? samplePackages.find((item) => item.slug === slug);
}

export function getAllPackageSlugs() {
  return [...safaris, ...samplePackages].map(({ slug }) => ({ slug }));
}

export function getAllPackages() {
  return safaris;
}

export function getRouteBySlug(slug: string): KilimanjaroRoute | undefined {
  return sampleRoutes.find((route) => route.slug === slug);
}

export function getRelated<T extends { slug: string }>(items: readonly T[], slugs: readonly string[]): T[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  return slugs.flatMap((slug) => {
    const item = bySlug.get(slug);
    return item ? [item] : [];
  });
}

export const sampleData = {
  packages: samplePackages,
  destinations: sampleDestinations,
  parks: sampleParks,
  routes: sampleRoutes,
  kilimanjaroPackages,
  dayTrips: sampleDayTrips,
  zanzibarAreas: sampleZanzibarAreas,
  zanzibarActivities: sampleZanzibarActivities,
  experiences: sampleExperiences,
  lodges: sampleLodges,
  guideArticles,
};
