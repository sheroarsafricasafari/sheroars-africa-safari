// TODO(REPLACE): sample records only. Replace with confirmed company offerings and approved content.
import type { Package } from "@/types/package";
import type { Destination, Park } from "@/types/destination";
import type { KilimanjaroRoute } from "@/types/kilimanjaro-route";
import type { KilimanjaroPackage } from "@/types/kilimanjaro-package";
import type { DayTrip } from "@/types/day-trip";
import type { ZanzibarActivity, ZanzibarArea } from "@/types/zanzibar";
import type { Experience } from "@/types/experience";
import type { Lodge } from "@/types/lodge";
import type { GuideArticle } from "@/types/guide-article";

type Sample<T> = T & { sample: true };

export const samplePackages: Sample<Package>[] = [
  {
    sample: true, slug: "sample-northern-circuit", title: "Sample Northern Circuit Journey", days: 5,
    parks: ["Sample Park One", "Sample Park Two"], summary: "Sample itinerary for layout and template review only.",
    highlights: ["Sample highlight one", "Sample highlight two"], bestFor: ["Sample interest"],
    difficulty: "Sample difficulty", groupSize: "To be confirmed", itinerary: [],
    inclusions: [], exclusions: [], priceFrom: null, tags: ["Sample"], image: "/images/samples/package-one.jpg", related: [],
  },
  {
    sample: true, slug: "sample-coast-escape", title: "Sample Coast Escape", days: 4,
    parks: ["Sample destination"], summary: "Sample itinerary for layout and template review only.",
    highlights: ["Sample highlight"], bestFor: ["Sample interest"],
    difficulty: "Sample difficulty", groupSize: "To be confirmed", itinerary: [],
    inclusions: [], exclusions: [], priceFrom: null, tags: ["Sample"], image: "/images/samples/package-two.jpg", related: [],
  },
];

export const sampleDestinations: Sample<Destination>[] = [
  { sample: true, slug: "sample-destination-one", name: "Sample Destination One", region: "Sample region", summary: "Sample destination summary.", wildlifeHighlights: ["Sample wildlife"], bestMonths: ["To be confirmed"], image: "/images/samples/destination-one.jpg", subPages: [] },
  { sample: true, slug: "sample-destination-two", name: "Sample Destination Two", region: "Sample region", summary: "Sample destination summary.", wildlifeHighlights: ["Sample wildlife"], bestMonths: ["To be confirmed"], image: "/images/samples/destination-two.jpg", subPages: [] },
];

export const sampleParks: Sample<Park>[] = [
  { sample: true, name: "Sample Park One", region: "Sample region", summary: "Sample park summary.", wildlifeHighlights: ["Sample wildlife"], bestMonths: ["To be confirmed"], image: "/images/samples/park-one.jpg", subPages: [] },
  { sample: true, name: "Sample Park Two", region: "Sample region", summary: "Sample park summary.", wildlifeHighlights: ["Sample wildlife"], bestMonths: ["To be confirmed"], image: "/images/samples/park-two.jpg", subPages: [] },
];

export const sampleRoutes: Sample<KilimanjaroRoute>[] = [
  { sample: true, slug: "sample-route-one", name: "Sample Route One", days: { min: 6, max: 8 }, difficulty: 3, scenery: 4, crowds: 3, accommodationType: "camping", successRate: null, summary: "Sample route summary.", highlights: ["Sample highlight"], image: "/images/samples/route-one.jpg" },
  { sample: true, slug: "sample-route-two", name: "Sample Route Two", days: { min: 7, max: 9 }, difficulty: 4, scenery: 5, crowds: 2, accommodationType: "hut", successRate: null, summary: "Sample route summary.", highlights: ["Sample highlight"], image: "/images/samples/route-two.jpg" },
];

export const sampleKilimanjaroPackages: Sample<KilimanjaroPackage>[] = [
  { ...samplePackages[0], sample: true, slug: "sample-climb-one", route: "sample-route-one", altitudeProfile: [] },
  { ...samplePackages[1], sample: true, slug: "sample-climb-two", route: "sample-route-two", altitudeProfile: [] },
];

export const sampleDayTrips: Sample<DayTrip>[] = [
  { sample: true, slug: "sample-day-trip-one", title: "Sample Day Trip One", duration: "To be confirmed", summary: "Sample day-trip description.", highlights: ["Sample activity"], priceFrom: null, image: "/images/samples/day-trip-one.jpg", href: "/day-trips" },
  { sample: true, slug: "sample-day-trip-two", title: "Sample Day Trip Two", duration: "To be confirmed", summary: "Sample day-trip description.", highlights: ["Sample activity"], priceFrom: null, image: "/images/samples/day-trip-two.jpg", href: "/day-trips" },
];

export const sampleZanzibarAreas: Sample<ZanzibarArea>[] = [
  { sample: true, slug: "sample-area-one", name: "Sample Zanzibar Area One", summary: "Sample area description.", bestFor: ["Sample interest"], image: "/images/samples/area-one.jpg" },
  { sample: true, slug: "sample-area-two", name: "Sample Zanzibar Area Two", summary: "Sample area description.", bestFor: ["Sample interest"], image: "/images/samples/area-two.jpg" },
];

export const sampleZanzibarActivities: Sample<ZanzibarActivity>[] = [
  { sample: true, slug: "sample-activity-one", name: "Sample Zanzibar Activity One", summary: "Sample activity description.", duration: "To be confirmed", priceFrom: null, image: "/images/samples/activity-one.jpg" },
  { sample: true, slug: "sample-activity-two", name: "Sample Zanzibar Activity Two", summary: "Sample activity description.", duration: "To be confirmed", priceFrom: null, image: "/images/samples/activity-two.jpg" },
];

export const sampleExperiences: Sample<Experience>[] = [
  { sample: true, slug: "sample-experience-one", title: "Sample Experience One", summary: "Sample experience description.", href: "/experiences", image: "/images/samples/experience-one.jpg", bestFor: ["Sample interest"] },
  { sample: true, slug: "sample-experience-two", title: "Sample Experience Two", summary: "Sample experience description.", href: "/experiences", image: "/images/samples/experience-two.jpg", bestFor: ["Sample interest"] },
];

export const sampleLodges: Sample<Lodge>[] = [
  { sample: true, slug: "sample-lodge-one", name: "Sample Lodge One", location: "Sample location", tier: "Mid-range", note: "Sample accommodation description.", image: "/images/samples/lodge-one.jpg", href: "/safaris" },
  { sample: true, slug: "sample-lodge-two", name: "Sample Lodge Two", location: "Sample location", tier: "Luxury", note: "Sample accommodation description.", image: "/images/samples/lodge-two.jpg", href: "/safaris" },
];

const articleText = "Sample guide content for visual review. This placeholder copy is not factual travel advice.";
const readingTimeFor = (text: string) => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220));

export const sampleGuideArticles: Sample<GuideArticle>[] = [
  {
    sample: true, slug: "sample-guide-one", title: "Sample Guide One", excerpt: "Sample article excerpt.", category: "Sample",
    readingTime: readingTimeFor(articleText), blocks: [{ type: "paragraph", text: articleText }], related: [],
    image: "/images/samples/guide-one.jpg", faqs: [],
  },
  {
    sample: true, slug: "sample-guide-two", title: "Sample Guide Two", excerpt: "Sample article excerpt.", category: "Sample",
    readingTime: readingTimeFor(articleText), blocks: [{ type: "paragraph", text: articleText }], related: [],
    image: "/images/samples/guide-two.jpg", faqs: [],
  },
];
