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

export type DestinationMeta = { title: string; description: string };
export type DestinationHeroData = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};
export type DestinationNavItem = { id: string; label: string };
export type DestinationFact = { value: string; numericValue?: number; suffix?: string; label: string };
export type SeasonRating = "peak" | "good" | "quiet";
export type SeasonRow = { label: string; months: SeasonRating[] };
export type SeasonCardData = { range: string; title: string; text: string; icon: string };
export type RegionData = {
  id: string; name: string; shortName: string; character: string; bestFor: string;
  bestMonths: string; wildlife: string; feel: string; crowd: number; href: string;
  path: string; labelPosition: { x: number; y: number };
};
export type DestinationPin = { label: string; x: number; y: number; kind: "gate" | "airstrip" };
export type WildlifeTileData = { name: string; description: string; likelihood: string; image: string; featured?: boolean };
export type SightingData = { name: string; likelihood: number; where: string; bestTime: string };
export type SeasonData = { rows: SeasonRow[]; cards: SeasonCardData[] };
export type TravelModeData = { title: string; description: string; times: string[]; steps: string[] };
export type GettingThereData = { road: TravelModeData; air: TravelModeData; note: string };
export type ExperienceData = { title: string; tags: string[]; text: string; image: string; href: string };
export type StayTierData = { title: string; description: string; bestFor: string; recommendedFor: string };
export type DayOptionData = { label: string; headline: string; suits: string; experience: string; href: string };
export type ZoneData = { title: string; image: string; description: string; bullets: string[]; lookFor: string[]; bestTime: string };
export type DayScheduleData = { time: string; title: string; text: string; icon: string };
export type TipData = { title: string; text: string; icon: string };
export type HighlightData = TipData;
export type DestinationFaq = { question: string; answer: string; href?: string };
export type RelatedDestination = { title: string; href: string; description?: string };

export type DestinationHubData = {
  meta: DestinationMeta; hero: DestinationHeroData; breadcrumbs: { title: string; href: string }[];
  nav: DestinationNavItem[]; overview: { eyebrow: string; title: string; lead: string; body: string };
  facts: DestinationFact[]; factFootnote: string; pullQuote: string; regions: RegionData[];
  pins: DestinationPin[]; regionNote: string;
  regionComparison: { columns: string[]; rows: { label: string; values: string[] }[]; note: string };
  migration: { eyebrow: string; title: string; subtitle: string; note: string };
  wildlife: WildlifeTileData[]; wildlifeNote: string; seasons: SeasonData; packingNote: string;
  gettingThere: GettingThereData; experiences: ExperienceData[];
  stay: { tiers: StayTierData[]; footnote: string; href: string; linkLabel: string };
  days: DayOptionData[]; journeys: { title: string; subtitle: string; park: string };
  faqs: DestinationFaq[]; related: RelatedDestination[];
  cta: { title: string; description: string; primary: string; secondary: string };
};

export type SubRegionData = {
  meta: DestinationMeta; hero: DestinationHeroData; breadcrumbs: { title: string; href: string }[];
  nav: DestinationNavItem[]; overview: { eyebrow: string; title: string; lead: string; body: string };
  sidebarFacts: { label: string; value: string; icon: string }[]; highlights: HighlightData[];
  zones: ZoneData[]; sightings: SightingData[]; seasons: SeasonData; crowdNote: string;
  schedule: DayScheduleData[]; tips: TipData[];
  balloon: {
    image: string; eyebrow: string; title: string; description: string; steps: string[]; facts: string[];
    primary: { label: string; href: string }; secondary: { label: string; href: string };
  };
  gettingThere: GettingThereData;
  stay: { tiers: StayTierData[]; footnote: string; href: string; linkLabel: string };
  journeys: { title: string; subtitle: string; park: string }; faqs: DestinationFaq[];
  related: RelatedDestination[]; cta: { title: string; description: string; primary: string; secondary: string };
};
