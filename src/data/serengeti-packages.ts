import { serengetiPackagesSchema } from "@/types/serengeti-package";
import type { SerengetiPackage } from "@/types/serengeti-package";

const serengetiImage = {
  src: "/images/destinations/serengeti/hero.webp",
  alt: "Open plains of the Serengeti",
};

const serengetiPackageImages = {
  "3-day-serengeti-fly-in-express": {
    src: "/images/destinations/serengeti/packages/3-day-serengeti-fly-in-express.jpg",
    alt: "Serengeti landscape for a fly-in safari",
  },
  "4-day-central-serengeti-big-cat-safari": {
    src: "/images/destinations/serengeti/packages/4-day-central-serengeti-big-cat-safari.avif",
    alt: "Central Serengeti landscape for a big cat safari",
  },
  "5-day-southern-serengeti-ndutu-calving-safari": {
    src: "/images/destinations/serengeti/packages/5-day-southern-serengeti-ndutu-calving-safari.jpg",
    alt: "Southern Serengeti and Ndutu landscape during calving season",
  },
  "5-day-western-corridor-grumeti-safari": {
    src: "/images/destinations/serengeti/packages/5-day-western-corridor-grumeti-safari.avif",
    alt: "Western Corridor landscape for a Grumeti safari",
  },
  "6-day-northern-serengeti-mara-river-safari": {
    src: "/images/destinations/serengeti/packages/6-day-northern-serengeti-mara-river-safari.avif",
    alt: "Northern Serengeti landscape near the Mara River",
  },
  "8-day-serengeti-grand-circuit": {
    src: "/images/destinations/serengeti/packages/8-day-serengeti-grand-circuit.avif",
    alt: "Serengeti landscape for a grand circuit safari",
  },
  "4-day-serengeti-romance-balloon-fly-in": {
    src: "/images/destinations/serengeti/packages/4-day-serengeti-romance-balloon-fly-in.avif",
    alt: "Serengeti landscape for a romantic balloon safari",
  },
} satisfies Record<string, SerengetiPackage["cardImage"]>;

function route(
  regions: SerengetiPackage["regions"],
): SerengetiPackage["route"] {
  return regions.map((region) => ({
    id: region.id,
    label: region.name,
    ...(region.nights === undefined ? {} : { nights: region.nights }),
  }));
}

function accommodation(
  availabilities: SerengetiPackage["pricing"]["tiers"],
): SerengetiPackage["accommodation"] {
  return availabilities.map((price) => ({
    id: `${price.tier}-stay`,
    tier: price.tier,
    availability: price.availability,
    propertyName: null,
    region: null,
    location: null,
    type: null,
    description: null,
    season: null,
    areaType: null,
    confirmationStatus: "todo-confirm",
  }));
}

function tier(
  name: SerengetiPackage["pricing"]["tiers"][number]["tier"],
  amount: number | null,
  availability: SerengetiPackage["pricing"]["tiers"][number]["availability"],
  note?: string,
): SerengetiPackage["pricing"]["tiers"][number] {
  return {
    tier: name,
    amount,
    currency: "USD",
    status: "proposed",
    availability,
    ...(note ? { note } : {}),
  };
}

function groupPrices(amounts: readonly [number, number, number, number, number]) {
  return [1, 2, 3, 4, 6].map((travellers, index) => ({
    travellers,
    amount: amounts[index],
    currency: "USD" as const,
    status: "proposed" as const,
  }));
}

const wildlifeNote = "Wildlife is wild, and sightings can never be guaranteed. Migration movements depend on natural conditions, including rainfall. Guides use current local knowledge to make informed decisions about where to explore.";

function unknownAccommodationNote() {
  return {
    title: "Accommodation details",
    text: "Named properties, exact locations, and accommodation descriptions were not supplied. TODO(CONFIRM) before publishing accommodation specifics.",
    status: "todo-confirm" as const,
  };
}

function itineraryTodo() {
  return {
    itinerary: [] as SerengetiPackage["itinerary"],
    itineraryStatus: "todo-confirm" as const,
  };
}

// TODO(CONFIRM): Every listed price is proposed and requires owner approval.
type PackagePricingData = {
  tiers: SerengetiPackage["pricing"]["tiers"];
  groupPrices: SerengetiPackage["pricing"]["midRangeGroupPrices"];
  singleSupplement?: SerengetiPackage["pricing"]["singleSupplement"];
};

const pricing: Record<string, PackagePricingData> = {
  "3-day-serengeti-fly-in-express": {
    tiers: [tier("camping", null, "unavailable"), tier("mid-range", 2250, "available"), tier("luxury", 3050, "available")],
    groupPrices: groupPrices([2950, 2250, 2100, 2050, 2000]),
  },
  "4-day-central-serengeti-big-cat-safari": {
    tiers: [tier("camping", 1800, "available"), tier("mid-range", 2550, "available"), tier("luxury", 3750, "available")],
    groupPrices: groupPrices([3600, 2550, 2400, 2300, 2200]),
  },
  "5-day-southern-serengeti-ndutu-calving-safari": {
    tiers: [tier("camping", 2100, "limited"), tier("mid-range", 3000, "available"), tier("luxury", 4600, "available")],
    groupPrices: groupPrices([4350, 3000, 2800, 2650, 2550]),
  },
  "5-day-western-corridor-grumeti-safari": {
    tiers: [tier("camping", 2300, "limited"), tier("mid-range", 3400, "available"), tier("luxury", 5250, "available")],
    groupPrices: groupPrices([4900, 3400, 3200, 3100, 2950]),
  },
  "6-day-northern-serengeti-mara-river-safari": {
    tiers: [tier("camping", null, "on-request", "Camping is available on request; no camping price was supplied."), tier("mid-range", 4400, "available"), tier("luxury", 6700, "available")],
    groupPrices: groupPrices([6150, 4400, 4150, 4000, 3900]),
  },
  "8-day-serengeti-grand-circuit": {
    tiers: [tier("camping", null, "unavailable"), tier("mid-range", 5900, "available"), tier("luxury", 9100, "available")],
    groupPrices: groupPrices([8450, 5900, 5500, 5300, 5150]),
  },
  "4-day-serengeti-romance-balloon-fly-in": {
    tiers: [tier("camping", null, "unavailable"), tier("mid-range", 3700, "available", "Hot-air balloon experience included in the proposed price."), tier("luxury", 4900, "available", "Hot-air balloon experience included in the proposed price.")],
    groupPrices: groupPrices([4800, 3700, 3550, 3450, 3350]),
  },
};

const packageFacts: Omit<SerengetiPackage, "pricing" | "accommodation">[] = [
  {
    slug: "3-day-serengeti-fly-in-express",
    title: "Three-Day Serengeti Fly-In Express Safari",
    shortTitle: "Fly-In Express",
    subtitle: "A short, direct journey into Central Serengeti.",
    summary: "A three-day Central Serengeti safari with fly-in and fly-out access, designed for a limited travel window.",
    durationDays: 3,
    nights: 2,
    regions: [{ id: "central-serengeti", name: "Central Serengeti", nights: 2 }],
    regionSearchTerms: ["Central Serengeti"],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: "All year",
    seasonNote: "Listed as available all year. Wildlife sightings and conditions vary.",
    access: { label: "Fly in and fly out", status: "specified" },
    pace: { label: "Relaxed", status: "specified" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["Fly directly into Central Serengeti", "Two nights in the Serengeti", "A short safari for limited time"],
    bestFor: ["Limited time", "Fly-in safari", "Central Serengeti"],
    experienceTags: ["fly-in", "short-safari"],
    overview: [
      "This three-day safari flies directly into Central Serengeti and returns by air, keeping a compact journey focused on the destination.",
      "The brief lists two nights, a relaxed pace, and year-round availability. Flight schedules, operators, and baggage limits are not specified.",
    ],
    sellingPointTitle: "The Advantage of a Fly-In Safari",
    sellingPoint: "Flying directly into the Serengeti can make a short trip more convenient and leave more of its limited time for the destination instead of long road transfers. Specific flight schedules, operators, durations, and baggage limits must be confirmed for the chosen dates.",
    route: route([{ id: "central-serengeti", name: "Central Serengeti", nights: 2 }]),
    routeEndpoints: { start: "Fly-in access (arrival point not specified)", end: "Fly-out access (destination not specified)" },
    ...itineraryTodo(),
    inclusions: { items: [], status: "todo-confirm" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "Air access", text: "Flight details and baggage limits were not supplied. TODO(CONFIRM) for the selected dates.", status: "todo-confirm" }],
    wildlife: [],
    faqs: [
      { question: "How do I travel to Central Serengeti?", answer: "The proposed package is fly-in and fly-out. Flight operator, schedule, duration, and baggage limits require confirmation." },
      { question: "What is included in the proposed price?", answer: "Package inclusions were not supplied. Request a written quote confirming all inclusions and exclusions." },
    ],
    relatedPackages: ["4-day-central-serengeti-big-cat-safari", "4-day-serengeti-romance-balloon-fly-in", "8-day-serengeti-grand-circuit"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["3-day-serengeti-fly-in-express"],
    seo: { title: "3-Day Serengeti Fly-In Express Safari", description: "Explore the proposed three-day Central Serengeti fly-in safari, including season, access, and indicative pricing." },
    status: "proposed",
  },
  {
    slug: "4-day-central-serengeti-big-cat-safari",
    title: "Four-Day Central Serengeti Big Cat Safari",
    shortTitle: "Central Serengeti Big Cat Safari",
    subtitle: "A focused four-day journey through Central Serengeti.",
    summary: "Four days in Central Serengeti, driving in via Ngorongoro and flying out.",
    durationDays: 4,
    nights: 3,
    regions: [{ id: "central-serengeti", name: "Central Serengeti", nights: 3 }],
    regionSearchTerms: ["Central Serengeti"],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: "All year",
    seasonNote: "Listed as available all year. Wildlife sightings vary, and the migration moves with natural conditions.",
    access: { label: "Drive in via Ngorongoro and fly out", status: "specified" },
    pace: { label: "Moderate", status: "specified" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["Central Serengeti", "Three nights", "Drive in via Ngorongoro and fly out"],
    bestFor: ["Central Serengeti", "Focused safari", "Big cat country"],
    experienceTags: ["big-cat", "central-serengeti"],
    overview: [
      "This focused four-day journey is based in Central Serengeti, with three nights in the region.",
      "The stated access is a drive in via Ngorongoro and a flight out. The package describes big cat country, not guaranteed sightings of any animal.",
    ],
    sellingPointTitle: "Discover Serengeti Big Cat Country",
    sellingPoint: "Central Serengeti's varied wildlife habitats make it a compelling focus for a short safari. Time in the region offers opportunities to explore, but animal sightings remain unpredictable and are never guaranteed.",
    route: route([{ id: "central-serengeti", name: "Central Serengeti", nights: 3 }]),
    routeEndpoints: { start: "Drive in via Ngorongoro", end: "Fly-out destination not specified" },
    ...itineraryTodo(),
    inclusions: { items: [], status: "todo-confirm" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "Wildlife is unpredictable", text: wildlifeNote, status: "provided" }],
    wildlife: [],
    faqs: [
      { question: "Is a big cat sighting guaranteed?", answer: "No. Wildlife is wild, and sightings cannot be guaranteed." },
      { question: "How does the route begin and end?", answer: "The brief describes driving in via Ngorongoro and flying out. Detailed transfers and flight arrangements require confirmation." },
    ],
    relatedPackages: ["3-day-serengeti-fly-in-express", "5-day-southern-serengeti-ndutu-calving-safari", "8-day-serengeti-grand-circuit"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["4-day-central-serengeti-big-cat-safari"],
    seo: { title: "4-Day Central Serengeti Big Cat Safari", description: "Discover the proposed four-day Central Serengeti itinerary, with drive-in via Ngorongoro and fly-out access." },
    status: "proposed",
  },
  {
    slug: "5-day-southern-serengeti-ndutu-calving-safari",
    title: "Five-Day Southern Serengeti and Ndutu Calving Safari",
    shortTitle: "Ndutu Calving Safari",
    subtitle: "A seasonal five-day journey through Ndutu and Central Serengeti.",
    summary: "Five days with two nights in Ndutu and two in Central Serengeti, available December to March.",
    durationDays: 5,
    nights: 4,
    regions: [{ id: "ndutu", name: "Ndutu", nights: 2 }, { id: "central-serengeti", name: "Central Serengeti", nights: 2 }],
    regionSearchTerms: ["Southern Serengeti", "Ndutu", "Central Serengeti"],
    bestMonths: [12, 1, 2, 3],
    season: "December to March",
    seasonNote: "The itinerary is listed for December to March. Wildlife movements and calving events remain subject to natural conditions.",
    access: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    pace: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["Two nights in Ndutu", "Two nights in Central Serengeti", "Seasonal calving-period travel"],
    bestFor: ["December to March travel", "Ndutu", "Seasonal migration"],
    experienceTags: ["calving-season", "great-migration"],
    overview: [
      "This five-day seasonal package combines two nights in Ndutu with two nights in Central Serengeti.",
      "Its December-to-March timing is intended to align with the calving season. Individual births, predator interactions, and animal numbers cannot be promised.",
    ],
    sellingPointTitle: "Experience the Great Migration Calving Season",
    sellingPoint: "Ndutu's seasonal setting is the reason to travel during the listed December-to-March window. Timing and location matter, but rainfall and wildlife movement vary, and specific events are never guaranteed.",
    route: route([{ id: "ndutu", name: "Ndutu", nights: 2 }, { id: "central-serengeti", name: "Central Serengeti", nights: 2 }]),
    routeEndpoints: { start: null, end: null },
    ...itineraryTodo(),
    inclusions: { items: [], status: "todo-confirm" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "Calving season", text: "The itinerary is seasonal guidance, not a promise of births, predator interactions, or specific wildlife numbers.", status: "provided" }],
    wildlife: [],
    faqs: [
      { question: "When is this safari offered?", answer: "The proposed season is December to March." },
      { question: "Will I see a birth or a specific wildlife event?", answer: "No specific wildlife event can be guaranteed. Movements depend on natural conditions, including rainfall." },
    ],
    relatedPackages: ["4-day-central-serengeti-big-cat-safari", "8-day-serengeti-grand-circuit", "3-day-serengeti-fly-in-express"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["5-day-southern-serengeti-ndutu-calving-safari"],
    seo: { title: "5-Day Ndutu Calving Season Safari", description: "Explore a proposed December-to-March safari with two nights in Ndutu and two in Central Serengeti." },
    status: "proposed",
  },
  {
    slug: "5-day-western-corridor-grumeti-safari",
    title: "Five-Day Western Corridor and Grumeti Safari",
    shortTitle: "Western Corridor and Grumeti",
    subtitle: "A seasonal five-day route across Central Serengeti and the Western Corridor.",
    summary: "One night in Central Serengeti followed by three nights in the Western Corridor, listed for May to July.",
    durationDays: 5,
    nights: 4,
    regions: [{ id: "central-serengeti", name: "Central Serengeti", nights: 1 }, { id: "western-corridor", name: "Western Corridor", nights: 3 }],
    regionSearchTerms: ["Central Serengeti", "Western Corridor", "Grumeti"],
    bestMonths: [5, 6, 7],
    season: "May to July",
    seasonNote: "The proposed availability is May to July. Herd movement and wildlife activity vary with natural conditions.",
    access: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    pace: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["One night in Central Serengeti", "Three nights in the Western Corridor", "Seasonal Grumeti region"],
    bestFor: ["May to July travel", "Western Corridor", "Seasonal migration"],
    experienceTags: ["western-corridor", "great-migration", "grumeti"],
    overview: [
      "This five-day package moves from one night in Central Serengeti to three nights in the Western Corridor.",
      "It is listed for May to July, when the seasonal movement of herds is one reason to explore this part of the ecosystem. River crossings and wildlife activity are not guaranteed.",
    ],
    sellingPointTitle: "Explore the Wild Western Corridor",
    sellingPoint: "The Western Corridor and Grumeti region offer a distinct setting for a seasonal safari. The proposed itinerary spends three nights in the corridor, while herd movements and any river activity remain dependent on natural conditions.",
    route: route([{ id: "central-serengeti", name: "Central Serengeti", nights: 1 }, { id: "western-corridor", name: "Western Corridor", nights: 3 }]),
    routeEndpoints: { start: null, end: null },
    ...itineraryTodo(),
    inclusions: { items: [], status: "todo-confirm" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "Seasonal wildlife movement", text: "The travel window is May to July. Herd movement and river activity cannot be guaranteed.", status: "provided" }],
    wildlife: [],
    faqs: [
      { question: "When is this safari listed to operate?", answer: "The proposed season is May to July." },
      { question: "Are Grumeti river crossings guaranteed?", answer: "No. River crossings and wildlife activity depend on natural conditions and cannot be guaranteed." },
    ],
    relatedPackages: ["6-day-northern-serengeti-mara-river-safari", "8-day-serengeti-grand-circuit", "4-day-central-serengeti-big-cat-safari"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["5-day-western-corridor-grumeti-safari"],
    seo: { title: "5-Day Western Corridor and Grumeti Safari", description: "Explore the proposed May-to-July Western Corridor safari with three nights in the Grumeti region." },
    status: "proposed",
  },
  {
    slug: "6-day-northern-serengeti-mara-river-safari",
    title: "Six-Day Northern Serengeti Mara River Safari",
    shortTitle: "Northern Serengeti and Mara River",
    subtitle: "A July-to-October journey through Northern and Central Serengeti.",
    summary: "Three nights in Northern Serengeti and two in Central Serengeti, listed for July to October.",
    durationDays: 6,
    nights: 5,
    regions: [{ id: "northern-serengeti", name: "Northern Serengeti", nights: 3 }, { id: "central-serengeti", name: "Central Serengeti", nights: 2 }],
    regionSearchTerms: ["Northern Serengeti", "Central Serengeti", "Mara River region"],
    bestMonths: [7, 8, 9, 10],
    season: "July to October",
    seasonNote: "The listed season is July to October. The timing is guidance and does not guarantee a migration location or river crossing.",
    access: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    pace: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["Three nights in Northern Serengeti", "Two nights in Central Serengeti", "Seasonal Mara River region"],
    bestFor: ["July to October travel", "Northern Serengeti", "Mara River region"],
    experienceTags: ["mara-river", "great-migration", "northern-serengeti"],
    overview: [
      "This six-day route allocates three nights to Northern Serengeti and two to Central Serengeti.",
      "The Mara River region is a seasonal attraction. River crossings depend on herd behaviour, water levels, weather, and other natural conditions, and are never guaranteed.",
    ],
    sellingPointTitle: "Follow the Migration to the Mara River",
    sellingPoint: "Northern Serengeti is the focus of this July-to-October journey. Migration movements and crossings depend on the herds, water levels, weather, and other natural conditions. The route offers a seasonal opportunity, not a guarantee of a crossing.",
    route: route([{ id: "northern-serengeti", name: "Northern Serengeti", nights: 3 }, { id: "central-serengeti", name: "Central Serengeti", nights: 2 }]),
    routeEndpoints: { start: null, end: null },
    ...itineraryTodo(),
    inclusions: { items: [], status: "todo-confirm" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "River crossings are not guaranteed", text: "Crossings depend on herd behaviour, water levels, weather, and other natural conditions.", status: "provided" }],
    wildlife: [],
    faqs: [
      { question: "When is this safari listed to operate?", answer: "The proposed travel window is July to October." },
      { question: "Can a Mara River crossing be guaranteed?", answer: "No. Herd movements, water levels, weather, and other natural conditions affect whether crossings occur." },
    ],
    relatedPackages: ["5-day-western-corridor-grumeti-safari", "8-day-serengeti-grand-circuit", "5-day-southern-serengeti-ndutu-calving-safari"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["6-day-northern-serengeti-mara-river-safari"],
    seo: { title: "6-Day Northern Serengeti Mara River Safari", description: "Explore the proposed July-to-October safari with three nights in Northern Serengeti and two in Central Serengeti." },
    status: "proposed",
  },
  {
    slug: "8-day-serengeti-grand-circuit",
    title: "Eight-Day Serengeti Grand Circuit",
    shortTitle: "Serengeti Grand Circuit",
    subtitle: "A longer journey through three Serengeti regions.",
    summary: "Two nights in Central Serengeti, two in the Western Corridor, and three in Northern Serengeti.",
    durationDays: 8,
    nights: 7,
    regions: [{ id: "central-serengeti", name: "Central Serengeti", nights: 2 }, { id: "western-corridor", name: "Western Corridor", nights: 2 }, { id: "northern-serengeti", name: "Northern Serengeti", nights: 3 }],
    regionSearchTerms: ["Central Serengeti", "Western Corridor", "Northern Serengeti"],
    bestMonths: [6, 7, 8],
    season: "Late June to August",
    seasonNote: "The proposed availability is late June to August. June availability is limited to late June. Wildlife and migration sightings vary.",
    access: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    pace: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["Three Serengeti regions", "Seven nights", "Camping not available"],
    bestFor: ["Longer stays", "Multi-region safari", "Late June to August travel"],
    experienceTags: ["multi-region", "great-migration"],
    overview: [
      "This eight-day journey covers Central Serengeti, the Western Corridor, and Northern Serengeti over seven nights.",
      "Travelling through several regions allows more time in the ecosystem. The package is listed for late June to August; wildlife sightings at each stop are not guaranteed.",
    ],
    sellingPointTitle: "The Ultimate Serengeti Migration Journey",
    sellingPoint: "With seven nights across three regions, the Grand Circuit offers a broader Serengeti experience and more time in the ecosystem. Seasonal wildlife movements remain natural and unpredictable, rather than guaranteed at each stop.",
    route: route([{ id: "central-serengeti", name: "Central Serengeti", nights: 2 }, { id: "western-corridor", name: "Western Corridor", nights: 2 }, { id: "northern-serengeti", name: "Northern Serengeti", nights: 3 }]),
    routeEndpoints: { start: null, end: null },
    ...itineraryTodo(),
    inclusions: { items: [], status: "todo-confirm" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "A multi-region journey", text: "Specific day-by-day travel sequence and transfer details were not supplied. TODO(CONFIRM) before publishing the itinerary.", status: "todo-confirm" }],
    wildlife: [],
    faqs: [
      { question: "Which regions are included?", answer: "The proposed route includes Central Serengeti, the Western Corridor, and Northern Serengeti." },
      { question: "Is camping available?", answer: "No. Camping is not available for this package." },
    ],
    relatedPackages: ["6-day-northern-serengeti-mara-river-safari", "5-day-western-corridor-grumeti-safari", "3-day-serengeti-fly-in-express"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["8-day-serengeti-grand-circuit"],
    seo: { title: "8-Day Serengeti Grand Circuit Safari", description: "Explore the proposed eight-day Serengeti circuit through Central, Western Corridor, and Northern regions." },
    status: "proposed",
  },
  {
    slug: "4-day-serengeti-romance-balloon-fly-in",
    title: "Four-Day Serengeti Romance and Balloon Fly-In Safari",
    shortTitle: "Romance and Balloon Fly-In",
    subtitle: "A fly-in Central Serengeti stay with a balloon experience included in the proposed prices.",
    summary: "Four days and three nights in Central Serengeti, with the hot-air balloon experience included in both listed tiers.",
    durationDays: 4,
    nights: 3,
    regions: [{ id: "central-serengeti", name: "Central Serengeti", nights: 3 }],
    regionSearchTerms: ["Central Serengeti"],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    season: "All year",
    seasonNote: "Listed as available all year. Balloon operation remains subject to conditions and confirmation.",
    access: { label: "Fly in and fly out", status: "specified" },
    pace: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    departureType: { label: "Not specified (TODO(CONFIRM))", status: "todo-confirm" },
    groupSize: {},
    highlights: ["Fly in and fly out", "Three nights in Central Serengeti", "Balloon experience included in both proposed tiers"],
    bestFor: ["Romance", "Balloon safari", "Central Serengeti"],
    experienceTags: ["romance", "balloon", "fly-in"],
    overview: [
      "This four-day fly-in package is based in Central Serengeti for three nights and is presented as a romantic safari.",
      "The hot-air balloon experience is included in both listed proposed price tiers. Operator, schedule, flight duration, and operating conditions require confirmation.",
    ],
    sellingPointTitle: "A Romantic Safari Above the Serengeti",
    sellingPoint: "A balloon experience adds an aerial perspective to time in Central Serengeti. It is included in the proposed mid-range and luxury prices, while the operator and operating details remain to be confirmed.",
    route: route([{ id: "central-serengeti", name: "Central Serengeti", nights: 3 }]),
    routeEndpoints: { start: "Fly-in access (arrival point not specified)", end: "Fly-out access (destination not specified)" },
    ...itineraryTodo(),
    inclusions: { items: ["Hot-air balloon experience is included in the proposed mid-range and luxury prices."], status: "provided" },
    exclusions: { items: [], status: "todo-confirm" },
    addOns: [],
    goodToKnow: [unknownAccommodationNote(), { title: "Balloon operation", text: "The balloon experience is included in both proposed price tiers. Operation details and conditions require confirmation.", status: "todo-confirm" }],
    wildlife: [],
    faqs: [
      { question: "Is the balloon experience included?", answer: "Yes. It is included in both proposed price tiers for this package." },
      { question: "When does the balloon flight operate?", answer: "The operator, launch time, flight duration, and operating conditions were not supplied. TODO(CONFIRM) before publishing those details." },
    ],
    relatedPackages: ["3-day-serengeti-fly-in-express", "4-day-central-serengeti-big-cat-safari", "8-day-serengeti-grand-circuit"],
    heroImage: serengetiImage,
    cardImage: serengetiPackageImages["4-day-serengeti-romance-balloon-fly-in"],
    seo: { title: "4-Day Serengeti Romance and Balloon Safari", description: "Explore the proposed four-day fly-in safari with three Central Serengeti nights and a balloon experience included in both listed tiers." },
    status: "proposed",
  },
];

export const serengetiPackages: SerengetiPackage[] = serengetiPackagesSchema.parse(
  packageFacts.map((item) => {
    const price = pricing[item.slug as keyof typeof pricing];
    return {
      ...item,
      pricing: {
        status: "proposed",
        currency: "USD",
        tiers: price.tiers,
        midRangeGroupPrices: price.groupPrices,
        ...(price.singleSupplement ? { singleSupplement: price.singleSupplement } : {}),
        unitConfirmation: "The pricing unit for the supplied amounts is not defined. TODO(CONFIRM) before publishing a per-person or trip-total claim.",
        ...(item.slug === "4-day-serengeti-romance-balloon-fly-in" ? { balloonIncluded: true } : {}),
      },
      accommodation: accommodation(price.tiers),
    };
  }),
);
