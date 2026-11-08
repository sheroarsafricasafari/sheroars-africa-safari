import { serengetiPackages } from "@/data/serengeti-packages";

export function getAllSerengetiPackages() {
  return serengetiPackages;
}

export function getSerengetiPackageBySlug(slug: string) {
  return serengetiPackages.find((item) => item.slug === slug);
}

export function getRelatedSerengetiPackages(slug: string) {
  const selected = getSerengetiPackageBySlug(slug);
  if (!selected) return [];
  return selected.relatedPackages.flatMap((relatedSlug) => {
    const related = getSerengetiPackageBySlug(relatedSlug);
    return related ? [related] : [];
  });
}

export function getPackagePricing(slug: string) {
  return getSerengetiPackageBySlug(slug)?.pricing;
}

export function getPackageItinerary(slug: string) {
  return getSerengetiPackageBySlug(slug)?.itinerary;
}
