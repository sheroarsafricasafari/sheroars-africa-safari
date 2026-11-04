import { detailedPackageSchema, packageSchema } from "../types/package";
import type { DetailedPackage, ItineraryDay } from "../types/package";

export type SafariPackage = DetailedPackage & {
  duration: string;
  highlight: string;
};

const startPoint = "Arusha / Kilimanjaro International Airport"; // TODO(CONFIRM): verify the standard start and end point for every itinerary.
const exclusions = [
  "International flights",
  "Tanzania visa fees",
  "Travel insurance",
  "Gratuities for guides and staff",
  "Alcoholic drinks and personal items",
  "Optional activities such as hot-air ballooning",
  "Any items not listed under inclusions",
];
const sharedInclusions = [
  "Airport pick-up and drop-off", // TODO(CONFIRM): confirm service on all packages.
  "Accommodation as listed", // TODO(CONFIRM): confirm accommodation arrangements.
  "Park and conservation fees", // TODO(CONFIRM): confirm fees included.
  "A private 4x4 safari vehicle with pop-up roof and a professional driver-guide", // TODO(CONFIRM): confirm vehicle and guide service.
  "Meals as specified in the itinerary", // TODO(CONFIRM): confirm meal plans.
  "Bottled drinking water on game drives", // TODO(CONFIRM): confirm provision.
  "24/7 support from our team", // TODO(CONFIRM): confirm support commitment.
];

const accommodationTiers = [
  {
    name: "Comfortable Camping",
    description: "A practical, close-to-nature stay with a comfortable place to rest between game drives.",
    bestFor: "Travelers who value time in the wild and a simpler camp style.",
    askUsFor: "The available camp facilities and sleeping arrangements.",
  },
  {
    name: "Mid-Range Lodges and Tented Camps",
    description: "Welcoming stays with private rooms or tents, en-suite facilities and a relaxed setting.",
    bestFor: "A balance of comfort, setting and value.",
    askUsFor: "Options and locations available for your travel dates.",
    recommended: true,
  },
  {
    name: "Luxury Lodges and Camps",
    description: "A more elevated stay with considered service, generous rooms and distinctive surroundings.",
    bestFor: "Travelers seeking extra comfort and memorable settings.",
    askUsFor: "A tailored selection to match your route and budget.",
  },
]; // TODO(REPLACE): name your preferred lodges and camps after confirming partnerships.

type DayInput = {
  title: string;
  routeId: string;
  overnight: string;
  description: string;
  activities: string[];
  driveNote: string;
  meals?: ("B" | "L" | "D")[];
};

function routeStop(id: string, label: string, kind: "start" | "park" | "end" | "beach", note: string) {
  return { id, label, kind, note };
}

function itinerary(days: DayInput[]): DetailedPackage["dayByDay"] {
  return days.map((item, index) => ({
    day: index + 1,
    title: item.title,
    routeId: item.routeId,
    overnight: item.overnight,
    accommodation: item.overnight,
    description: item.description,
    activities: item.activities,
    driveNote: item.driveNote,
    meals: item.meals ?? ["B", "L", "D"],
  }));
}

function makeGallery(slug: string, title: string): DetailedPackage["gallery"] {
  return Array.from({ length: 6 }, (_, index) => ({
    src: `/images/safaris/${slug}/gallery-${index + 1}.jpg`,
    alt: `${title}, safari moment ${index + 1}`,
    span: (index === 0 || index === 5 ? "wide" : index === 2 ? "tall" : "square") as "wide" | "tall" | "square",
  }));
}

type SafariCore = Pick<DetailedPackage,
  | "slug" | "title" | "days" | "parks" | "summary" | "highlights" | "bestFor"
  | "difficulty" | "groupSize" | "badge" | "tags" | "image"
> & { duration: string; highlight: string };

type SafariDetails = Pick<DetailedPackage,
  | "nights" | "startPoint" | "endPoint" | "pace" | "comfortLevel" | "groupSizeNote"
  | "overview" | "highlightCards" | "route" | "wildlife" | "seasonNote"
  | "accommodationTiers" | "dayByDay" | "goodToKnow" | "faqs" | "gallery" | "departureInfo"
> & {
  extraInclusions: string[];
  related: string[];
};

type SafariPackageInput = SafariCore & SafariDetails & {
  extraInclusions: string[];
  related: string[];
};

function makePackage(input: SafariPackageInput): SafariPackage {
  const { extraInclusions, related, ...packageData } = input;
  const record = {
    ...packageData,
    itinerary: input.dayByDay.map(({ day, title, description, overnight, meals, accommodation }) => ({
      day, title, description, overnight, meals, accommodation,
    })) satisfies ItineraryDay[],
    inclusions: [...sharedInclusions, ...extraInclusions],
    exclusions,
    priceFrom: null,
    related,
  };
  if (process.env.NODE_ENV === "development") {
    detailedPackageSchema.parse(record);
    packageSchema.parse(record);
  }
  return record as SafariPackage;
}

export const safaris: SafariPackage[] = [
  makePackage({
    slug: "3-day-tarangire-manyara-ngorongoro",
    title: "3-Day Classic Safari",
    duration: "3 days",
    days: 3,
    parks: ["Tarangire", "Lake Manyara", "Ngorongoro"],
    summary: "Elephants among baobabs, flamingo shores and a descent into the crater.",
    highlight: "Elephants among baobabs, flamingo shores and a descent into the crater.",
    highlights: ["Elephants among baobabs", "Flamingo shores", "Ngorongoro Crater"],
    bestFor: ["Wildlife viewing", "Northern Circuit", "Limited time"],
    difficulty: "Easy",
    groupSize: "Private safari",
    tags: ["Classic", "Northern Circuit", "Short Safari"],
    image: "/images/safaris/3-day-tarangire-manyara-ngorongoro.webp",
    nights: 2,
    startPoint,
    endPoint: startPoint,
    pace: "Relaxed",
    comfortLevel: "Mid-range stays, with camping and luxury options available.",
    groupSizeNote: "Private vehicle and guide for your party.",
    overview: [
      "A short, easy introduction to Tanzania's Northern Circuit, ideal for travelers with limited time.",
      "Visit Tarangire, Lake Manyara and Ngorongoro at a thoughtful pace, with time for game drives and the changing landscapes between parks.",
    ],
    highlightCards: [
      { icon: "elephant", title: "Tarangire's elephants", text: "Look for elephant herds among baobabs and along the river." },
      { icon: "bird", title: "Rift Valley birdlife", text: "Explore Lake Manyara's varied habitats and seasonal waterbirds." },
      { icon: "mountain", title: "Crater game drive", text: "Descend into Ngorongoro for a day among remarkable scenery." },
    ],
    route: [
      routeStop("arusha", "Arusha", "start", "Journey begins"),
      routeStop("tarangire", "Tarangire", "park", "1 night"),
      routeStop("manyara", "Lake Manyara", "park", "Game drive"),
      routeStop("ngorongoro", "Ngorongoro", "park", "1 night"),
      routeStop("return", "Arusha", "end", "Journey ends"),
    ],
    wildlife: ["Elephant", "Lion", "Giraffe", "Zebra", "Buffalo", "Flamingo (seasonal)", "Waterbirds"],
    seasonNote: "Wildlife viewing is possible year-round. The dry season can make animals easier to spot around water, while the green season brings lush scenery and birdlife.",
    accommodationTiers,
    dayByDay: itinerary([
      { title: "Arusha to Tarangire National Park", routeId: "tarangire", overnight: "Tarangire area or Karatu", description: "Morning pick-up and drive to Tarangire for a full-day game drive among elephant herds and baobabs.", activities: ["Game drive in Tarangire", "Look for wildlife along the Tarangire River"], driveNote: "Drive from Arusha to Tarangire; duration depends on traffic and conditions.", meals: ["L", "D"] },
      { title: "Lake Manyara and the Ngorongoro Highlands", routeId: "manyara", overnight: "Near the crater rim or in Karatu", description: "Enjoy a morning game drive in Lake Manyara National Park before continuing into the Ngorongoro Highlands.", activities: ["Lake Manyara game drive", "Rift Valley scenery and birdlife"], driveNote: "Drive between Lake Manyara and the Ngorongoro Highlands." },
      { title: "Ngorongoro Crater and return to Arusha", routeId: "ngorongoro", overnight: "End of safari", description: "Descend to the crater floor for a game drive and picnic lunch before returning to Arusha for onward travel.", activities: ["Early crater descent", "Crater floor game drive", "Picnic lunch"], driveNote: "Return drive to Arusha after the crater visit." },
    ]),
    extraInclusions: [],
    goodToKnow: [],
    faqs: [
      { question: "Is this three-day safari rushed?", answer: "It is a compact introduction with three destinations. Expect driving between parks; we can tailor the route if you prefer a slower pace." },
      { question: "When is the best time to travel?", answer: "Wildlife viewing is possible year-round. Share your dates and we will advise on seasonal conditions." },
      { question: "What is included?", answer: "The proposal will itemise accommodation, park fees, transport and meals. Meal plans and inclusions are confirmed with your quote." },
    ],
    gallery: makeGallery("3-day-tarangire-manyara-ngorongoro", "3-Day Classic Safari"),
    related: ["4-day-tarangire-serengeti-ngorongoro", "5-day-northern-circuit-classic", "8-day-safari-and-zanzibar"],
    departureInfo: { type: "private", datesNote: "Choose your preferred travel dates." },
  }),
  makePackage({
    slug: "4-day-tarangire-serengeti-ngorongoro",
    title: "4-Day Serengeti Escape",
    duration: "4 days",
    days: 4,
    parks: ["Tarangire", "Serengeti", "Ngorongoro"],
    summary: "A short, powerful taste of the great plains.",
    highlight: "A short, powerful taste of the great plains.",
    highlights: ["Tarangire", "Serengeti", "Ngorongoro"],
    bestFor: ["Short safaris", "Northern Circuit"],
    difficulty: "Moderate",
    groupSize: "Private safari",
    tags: ["Serengeti", "Northern Circuit", "Short Safari"],
    image: "/images/safaris/4-day-tarangire-serengeti-ngorongoro.jpg",
    nights: 3,
    startPoint,
    endPoint: startPoint,
    pace: "Moderate",
    comfortLevel: "Mid-range stays, with camping and luxury options available.",
    groupSizeNote: "Private vehicle and guide for your party.",
    overview: [
      "A four-day route brings together Tarangire, the Serengeti and Ngorongoro for travelers seeking a short taste of the Northern Circuit.",
      "The drives are longer to fit three distinct areas into a few days. Consider a fly-in option if you would like to save driving time.",
    ],
    highlightCards: [
      { icon: "elephant", title: "Tarangire wildlife", text: "Begin among baobabs and the park's elephant country." },
      { icon: "paw", title: "Serengeti plains", text: "Spend time in the great plains with a guide." },
      { icon: "mountain", title: "Ngorongoro", text: "Finish with a crater game drive before returning to Arusha." },
    ],
    route: [
      routeStop("arusha", "Arusha", "start", "Journey begins"),
      routeStop("tarangire", "Tarangire", "park", "1 night"),
      routeStop("serengeti", "Serengeti", "park", "1 night"),
      routeStop("ngorongoro", "Ngorongoro", "park", "1 night"),
      routeStop("return", "Arusha", "end", "Journey ends"),
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Cheetah", "Giraffe", "Wildebeest", "Zebra", "Buffalo", "Hippo"],
    seasonNote: "The Serengeti is a year-round wildlife destination. The Great Migration moves with the rains, so sightings and locations vary by month.",
    accommodationTiers,
    dayByDay: itinerary([
      { title: "Arusha to Tarangire", routeId: "tarangire", overnight: "Tarangire area", description: "Travel to Tarangire for a game drive among baobabs and wildlife.", activities: ["Tarangire game drive", "Wildlife viewing"], driveNote: "Drive from Arusha to Tarangire." },
      { title: "Tarangire to the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Cross the Ngorongoro Highlands with game viewing en route and arrive for an evening game drive.", activities: ["Scenic highlands drive", "Game viewing en route", "Evening Serengeti game drive"], driveNote: "A long scenic drive via the Ngorongoro Highlands." },
      { title: "A morning in the Serengeti", routeId: "serengeti", overnight: "Near the Ngorongoro rim", description: "Enjoy an early game drive before travelling toward the crater rim.", activities: ["Sunrise or early game drive", "Travel to the Ngorongoro rim"], driveNote: "Drive from the Serengeti to the Ngorongoro area." },
      { title: "Ngorongoro Crater and return to Arusha", routeId: "ngorongoro", overnight: "End of safari", description: "Visit the crater for a game drive, then return to Arusha.", activities: ["Ngorongoro Crater game drive", "Return to Arusha"], driveNote: "Return drive to Arusha after the crater visit." },
    ]),
    extraInclusions: [],
    goodToKnow: [{ variant: "warning", title: "A short Serengeti visit", text: "This is a short Serengeti visit. Fly-in options can save driving time and add game-viewing hours; ask us." }], // TODO(CONFIRM): verify fly-in availability and logistics.
    faqs: [
      { question: "How much driving is involved?", answer: "This short route includes a long drive to the Serengeti and road travel between parks. A fly-in option may be possible on request." },
      { question: "When should I travel?", answer: "The parks can be visited year-round. The migration shifts by season, so we match your route to your travel month." },
      { question: "Are meals and accommodation included?", answer: "Your written proposal will confirm the accommodation level, meal plan, fees and other inclusions." },
    ],
    gallery: makeGallery("4-day-tarangire-serengeti-ngorongoro", "4-Day Serengeti Escape"),
    related: ["3-day-tarangire-manyara-ngorongoro", "5-day-northern-circuit-classic", "6-day-serengeti-great-migration"],
    departureInfo: { type: "private", datesNote: "Choose your preferred travel dates." },
  }),
  makePackage({
    slug: "5-day-northern-circuit-classic",
    title: "5-Day Northern Circuit Classic",
    duration: "5 days",
    days: 5,
    parks: ["Tarangire", "Serengeti", "Ngorongoro"],
    summary: "Tanzania's iconic safari route, perfectly paced.",
    highlight: "Tanzania's iconic safari route, perfectly paced.",
    highlights: ["Tarangire", "Serengeti", "Ngorongoro"],
    bestFor: ["First-time safari", "Northern Circuit"],
    difficulty: "Moderate",
    groupSize: "Private safari",
    badge: "Most Popular",
    tags: ["Classic", "Northern Circuit"],
    image: "/images/safaris/5-day-northern-circuit-classic.webp",
    nights: 4,
    startPoint,
    endPoint: startPoint,
    pace: "Moderate",
    comfortLevel: "Mid-range stays, with camping and luxury options available.",
    groupSizeNote: "Private vehicle and guide for your party.",
    overview: [
      "A five-day Northern Circuit safari gives you time to experience Tarangire, the Serengeti and Ngorongoro.",
      "Spend two nights in the Serengeti, with a full day for game viewing and a final night near the crater rim.",
    ],
    highlightCards: [
      { icon: "elephant", title: "Tarangire start", text: "Explore elephant country beneath baobabs." },
      { icon: "paw", title: "Two Serengeti nights", text: "Settle into the plains and make room for a full game-drive day." },
      { icon: "mountain", title: "Crater finale", text: "End with a game drive in Ngorongoro Crater." },
    ],
    route: [
      routeStop("arusha", "Arusha", "start", "Journey begins"),
      routeStop("tarangire", "Tarangire", "park", "1 night"),
      routeStop("serengeti", "Serengeti", "park", "2 nights"),
      routeStop("ngorongoro", "Ngorongoro", "park", "1 night"),
      routeStop("return", "Arusha", "end", "Journey ends"),
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Cheetah", "Giraffe", "Wildebeest", "Zebra", "Buffalo", "Hippo"],
    seasonNote: "This route works across the year. Serengeti wildlife and migration locations change seasonally; your planner can recommend where to focus for your dates.",
    accommodationTiers,
    dayByDay: itinerary([
      { title: "Arusha to Tarangire", routeId: "tarangire", overnight: "Tarangire area", description: "Travel to Tarangire and enjoy a game drive.", activities: ["Tarangire game drive", "Look for elephants and baobabs"], driveNote: "Drive from Arusha to Tarangire." },
      { title: "Tarangire to the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Continue to the Serengeti and arrive for an evening game drive.", activities: ["Scenic drive", "Evening game drive"], driveNote: "Drive across the highlands toward the Serengeti." },
      { title: "A full day in the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Spend a full day exploring the Serengeti with a picnic lunch.", activities: ["Full-day game drive", "Picnic lunch", "Optional hot-air balloon at sunrise"], driveNote: "Game-drive route follows wildlife conditions.", meals: ["B", "L", "D"] }, // TODO(CONFIRM): optional activity, subject to availability and extra cost.
      { title: "Serengeti to the Ngorongoro rim", routeId: "ngorongoro", overnight: "Near the Ngorongoro rim", description: "Enjoy a morning game drive, then travel to the crater rim for sunset views.", activities: ["Morning game drive", "Travel to the crater rim"], driveNote: "Drive from the Serengeti to the Ngorongoro rim." },
      { title: "Ngorongoro Crater and return to Arusha", routeId: "ngorongoro", overnight: "End of safari", description: "Explore the crater floor on a game drive before returning to Arusha.", activities: ["Crater game drive", "Return to Arusha"], driveNote: "Return drive to Arusha after the crater visit." },
    ]),
    extraInclusions: [],
    goodToKnow: [],
    faqs: [
      { question: "Is there time for a full Serengeti day?", answer: "Yes. This itinerary includes two Serengeti nights and a full game-drive day, subject to the final route and accommodation." },
      { question: "When is the best time for this route?", answer: "The Northern Circuit is a year-round option. Migration locations change by season and rainfall." },
      { question: "Can I add a balloon safari?", answer: "A hot-air balloon safari may be available at extra cost and is subject to operator availability." },
    ],
    gallery: makeGallery("5-day-northern-circuit-classic", "5-Day Northern Circuit Classic"),
    related: ["4-day-tarangire-serengeti-ngorongoro", "6-day-serengeti-great-migration", "7-day-women-only-group-safari"],
    departureInfo: { type: "private", datesNote: "Choose your preferred travel dates." },
  }),
  makePackage({
    slug: "6-day-serengeti-great-migration",
    title: "6-Day Great Migration Safari",
    duration: "6 days",
    days: 6,
    parks: ["Ngorongoro Highlands", "Serengeti"],
    summary: "Follow the herds to where the action is, season by season.",
    highlight: "Follow the herds to where the action is, season by season.",
    highlights: ["Serengeti wildlife", "Seasonal migration"],
    bestFor: ["Wildlife viewing", "Great Migration"],
    difficulty: "Active",
    groupSize: "Private safari",
    tags: ["Great Migration", "Serengeti"],
    image: "/images/safaris/6-day-serengeti-great-migration.jpeg",
    nights: 5,
    startPoint,
    endPoint: startPoint,
    pace: "Active",
    comfortLevel: "Seasonally positioned camps and lodges, subject to availability.",
    groupSizeNote: "Private vehicle and guide for your party.",
    overview: [
      "A six-day journey gives you extended time in the Serengeti, with the route shaped around the herds and the season.",
      "The migration is a natural movement, not a scheduled event. We discuss the likely region for your dates and keep expectations realistic.",
    ],
    highlightCards: [
      { icon: "paw", title: "Follow the herds", text: "Plan the Serengeti portion around their seasonal movement." },
      { icon: "mountain", title: "Ngorongoro Highlands", text: "Begin with highland scenery and a crater visit." },
      { icon: "sun", title: "More time outside", text: "Enjoy several full days for game drives and unhurried wildlife watching." },
    ],
    route: [
      routeStop("arusha", "Arusha", "start", "Journey begins"),
      routeStop("highlands", "Ngorongoro Highlands", "park", "1 night"),
      routeStop("serengeti", "Serengeti", "park", "4 nights"),
      routeStop("return", "Arusha", "end", "Journey ends"),
    ],
    wildlife: ["Wildebeest", "Zebra", "Lion", "Leopard", "Cheetah", "Elephant", "Giraffe", "Buffalo", "Hippo"],
    seasonNote: "The Great Migration moves throughout the year. The best region for your dates depends on rainfall; no river crossing or wildlife sighting can be guaranteed.",
    accommodationTiers,
    dayByDay: itinerary([
      { title: "Arusha to the Ngorongoro Highlands", routeId: "highlands", overnight: "Karatu or near the rim", description: "Travel into the Ngorongoro Highlands and settle in before the next day's route.", activities: ["Highlands drive", "Rest and prepare for the journey"], driveNote: "Drive from Arusha to Karatu or the crater area." },
      { title: "Ngorongoro Crater and onward to the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Descend into Ngorongoro Crater, then travel across to the Serengeti.", activities: ["Crater game drive", "Optional Olduvai Gorge stop"], driveNote: "Long drive across the conservation area toward the Serengeti." }, // TODO(CONFIRM): optional Olduvai Gorge visit and operating arrangements.
      { title: "Following the herds", routeId: "serengeti", overnight: "Serengeti", description: "Spend the day on game drives in the region where the herds are moving, depending on the month.", activities: ["Full-day game drives", "Wildlife viewing with your guide"], driveNote: "Daily location depends on the seasonal migration." },
      { title: "Following the herds", routeId: "serengeti", overnight: "Serengeti", description: "Continue exploring the seasonal migration region. Camps may move seasonally.", activities: ["Full-day game drives", "Picnic in the bush"], driveNote: "Daily location depends on the seasonal migration." },
      { title: "Another day with the herds", routeId: "serengeti", overnight: "Serengeti", description: "Enjoy another day in the Serengeti, with a balloon safari as an optional extra.", activities: ["Game drives", "Optional hot-air balloon"], driveNote: "Game-drive route follows wildlife conditions." }, // TODO(CONFIRM): optional balloon activity and extra cost.
      { title: "Serengeti to Arusha", routeId: "return", overnight: "End of safari", description: "Return to Arusha by road or ask about a possible fly-out option.", activities: ["Morning transfer", "Optional fly-out"], driveNote: "Long drive to Arusha; optional flights are subject to schedules and availability." }, // TODO(CONFIRM): fly-out availability.
    ]),
    extraInclusions: [],
    goodToKnow: [{ variant: "note", title: "Where will the herds be?", text: "Migration locations vary with rainfall. Explore the monthly calendar and Great Migration guide." }],
    faqs: [
      { question: "Will I see a river crossing?", answer: "River crossings are unpredictable and cannot be guaranteed. The itinerary follows the herds' likely seasonal location." },
      { question: "When should I travel to see the migration?", answer: "The migration moves year-round. Share your dates and we will advise which Serengeti region is most suitable." },
      { question: "What is included in the safari?", answer: "Your written quote confirms accommodation, meals, park fees and transport. Optional activities are listed separately." },
    ],
    gallery: makeGallery("6-day-serengeti-great-migration", "6-Day Great Migration Safari"),
    related: ["5-day-northern-circuit-classic", "7-day-women-only-group-safari", "8-day-safari-and-zanzibar"],
    departureInfo: { type: "private", datesNote: "Choose your preferred travel dates." },
  }),
  makePackage({
    slug: "7-day-women-only-group-safari",
    title: "7-Day Women-Only Group Safari",
    duration: "7 days",
    days: 7,
    parks: ["Tarangire", "Serengeti", "Ngorongoro"],
    summary: "A women-only group departure through Tanzania's Northern Circuit, with time to share the journey.",
    highlight: "A small-group journey through Tanzania's iconic northern parks.",
    highlights: ["Travel with like-minded women", "Welcome and farewell dinners", "A small group with room to breathe", "Shared game drives and unhurried moments"],
    bestFor: ["Women travelers", "Solo travelers", "Small-group safari"],
    difficulty: "Moderate",
    groupSize: "Small women-only group",
    badge: "Women-Only Departure",
    tags: ["Women-Only", "Northern Circuit", "Great Migration"],
    image: "/images/safaris/7-day-women-only-group-safari.jpg",
    nights: 6,
    startPoint,
    endPoint: startPoint,
    pace: "Moderate",
    comfortLevel: "Mid-range stays, with accommodation details confirmed in the proposal.",
    groupSizeNote: "Small group. Maximum group size", // TODO(CONFIRM): confirm maximum group size.
    overview: [
      "A scheduled women-only group journey through Tarangire, the Serengeti and Ngorongoro, designed to balance shared experiences with space to enjoy the wildlife.",
      "Solo travelers are welcome. Our team supports the group from arrival through departure; individual guides and hosts are not guaranteed to be women.",
    ],
    highlightCards: [
      { icon: "users", title: "Travel with like-minded women", text: "Share the journey with other women travelers." },
      { icon: "utensils", title: "Welcome and farewell dinners", text: "Gather with the group at the beginning and end of the safari." },
      { icon: "heart", title: "Room to breathe", text: "A small-group pace makes space for unhurried moments." }, // TODO(CONFIRM): verify group experience details.
      { icon: "camera", title: "Shared game drives", text: "Enjoy wildlife encounters and shared time on safari." },
    ],
    route: [
      routeStop("arusha", "Arusha", "start", "Arrival"),
      routeStop("tarangire", "Tarangire", "park", "1 night"),
      routeStop("serengeti", "Serengeti", "park", "3 nights"),
      routeStop("ngorongoro", "Ngorongoro", "park", "1 night"),
      routeStop("return", "Arusha", "end", "Departure"),
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Cheetah", "Giraffe", "Wildebeest", "Zebra", "Buffalo", "Hippo"],
    seasonNote: "The itinerary can be offered at different times of year. Serengeti wildlife locations vary seasonally; departure dates will be published after confirmation.",
    accommodationTiers,
    dayByDay: itinerary([
      { title: "Welcome to Tanzania", routeId: "arusha", overnight: "Arusha", description: "Arrive in Arusha, meet your group and hosts, and gather for a welcome dinner.", activities: ["Arrival and transfer", "Meet your group", "Welcome dinner"], driveNote: "Airport transfer, subject to arrival details." },
      { title: "Arusha to Tarangire", routeId: "tarangire", overnight: "Tarangire area", description: "Travel to Tarangire for a game drive among elephants and baobabs.", activities: ["Tarangire game drive", "Group wildlife viewing"], driveNote: "Drive from Arusha to Tarangire." },
      { title: "Tarangire to the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Continue toward the Serengeti with game viewing along the way.", activities: ["Scenic drive", "Evening game drive"], driveNote: "Drive across the highlands toward the Serengeti." },
      { title: "A full day in the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Enjoy a full day of game drives in the Serengeti.", activities: ["Full-day game drives", "Picnic lunch"], driveNote: "Game-drive route follows wildlife conditions." },
      { title: "Another day in the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Take a morning drive, optional balloon safari and afternoon game drive, followed by a group sundowner.", activities: ["Morning game drive", "Optional balloon safari", "Afternoon game drive", "Group sundowner"], driveNote: "Optional activity and sundowner arrangements to be confirmed." }, // TODO(CONFIRM): balloon extra cost and group sundowner arrangement.
      { title: "Serengeti to the Ngorongoro rim", routeId: "ngorongoro", overnight: "Near the Ngorongoro rim", description: "Travel to the Ngorongoro rim and gather for a farewell dinner.", activities: ["Morning game viewing", "Travel to the rim", "Farewell dinner"], driveNote: "Drive from the Serengeti to the Ngorongoro area." },
      { title: "Crater game drive and departure", routeId: "ngorongoro", overnight: "End of safari", description: "Enjoy a crater game drive, return to Arusha and continue to your departure.", activities: ["Ngorongoro Crater game drive", "Return to Arusha", "Departure transfer"], driveNote: "Return drive to Arusha after the crater visit." },
    ]),
    extraInclusions: [],
    goodToKnow: [{ variant: "safety", title: "Solo travelers are welcome", text: "Solo travelers are welcome. You will be looked after by our team from arrival to departure." }], // TODO(CONFIRM): verify group support services.
    faqs: [
      { question: "Can I join as a solo traveler?", answer: "Yes. Solo travelers are welcome on the women-only group departure. Ask us about rooming arrangements." },
      { question: "When are the group dates?", answer: "Scheduled departure dates will appear here. Tell us when you would like to travel and we will notify you." }, // TODO(REPLACE): add confirmed departure dates.
      { question: "What is included in the group safari?", answer: "The final proposal will confirm accommodation, meals, park fees, transport and the group arrangements." },
    ],
    gallery: makeGallery("7-day-women-only-group-safari", "7-Day Women-Only Group Safari"),
    related: ["5-day-northern-circuit-classic", "6-day-serengeti-great-migration", "8-day-safari-and-zanzibar"],
    departureInfo: { type: "group", datesNote: "Scheduled departure dates will appear here. Tell us when you would like to travel and we will notify you." }, // TODO(REPLACE): publish dates after confirmation.
  }),
  makePackage({
    slug: "8-day-safari-and-zanzibar",
    title: "8-Day Safari and Zanzibar Escape",
    duration: "8 days",
    days: 8,
    parks: ["Tarangire", "Serengeti", "Ngorongoro", "Zanzibar"],
    summary: "Savanna sundowners, then barefoot on white sand.",
    highlight: "Savanna sundowners, then barefoot on white sand.",
    highlights: ["Northern Circuit safari", "Zanzibar beach stay"],
    bestFor: ["Safari and beach", "Relaxed itineraries"],
    difficulty: "Moderate",
    groupSize: "Private safari",
    tags: ["Safari and Beach", "Zanzibar"],
    image: "/images/safaris/8-day-safari-and-zanzibar.jpeg",
    nights: 7,
    startPoint,
    endPoint: "Zanzibar Airport",
    pace: "Moderate",
    comfortLevel: "Mid-range safari stays and a Zanzibar beach hotel, with options by request.",
    groupSizeNote: "Private safari vehicle; Zanzibar arrangements tailored to your party.",
    overview: [
      "Combine a Northern Circuit safari with time on Zanzibar's coast for a varied eight-day Tanzania journey.",
      "The transition from crater to coast depends on domestic flight schedules. An additional Arusha night may be needed before travelling to Zanzibar.",
    ],
    highlightCards: [
      { icon: "paw", title: "Northern Circuit safari", text: "Explore Tarangire, the Serengeti and Ngorongoro." },
      { icon: "plane", title: "Crater to coast", text: "Connect the safari route with Zanzibar, subject to flight schedules." },
      { icon: "sun", title: "Time by the sea", text: "Enjoy a Stone Town visit and relaxing beach time." },
    ],
    route: [
      routeStop("arusha", "Arusha", "start", "Arrival"),
      routeStop("tarangire", "Tarangire", "park", "1 night"),
      routeStop("serengeti", "Serengeti", "park", "2 nights"),
      routeStop("ngorongoro", "Ngorongoro", "park", "1 night"),
      routeStop("zanzibar", "Zanzibar", "beach", "2 nights"),
      routeStop("departure", "Zanzibar Airport", "end", "Departure"),
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Cheetah", "Giraffe", "Wildebeest", "Zebra", "Buffalo", "Hippo", "Flamingo (seasonal)"],
    seasonNote: "The safari portion is available year-round, with wildlife and migration locations changing by season. Zanzibar weather is seasonal; ask us to plan around your travel month.",
    accommodationTiers,
    dayByDay: itinerary([
      { title: "Arrival in Arusha", routeId: "arusha", overnight: "Arusha", description: "Arrive in Arusha and settle in before the safari begins.", activities: ["Airport pick-up", "Time to rest"], driveNote: "Airport transfer based on flight details." },
      { title: "Arusha to Tarangire", routeId: "tarangire", overnight: "Tarangire area", description: "Travel to Tarangire for a game drive among elephants and baobabs.", activities: ["Tarangire game drive"], driveNote: "Drive from Arusha to Tarangire." },
      { title: "Tarangire to the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Continue to the Serengeti and enjoy an evening game drive.", activities: ["Scenic drive", "Evening game drive"], driveNote: "Drive across the highlands toward the Serengeti." },
      { title: "A full day in the Serengeti", routeId: "serengeti", overnight: "Serengeti", description: "Explore the Serengeti on a full day of game drives.", activities: ["Full-day game drives", "Picnic lunch"], driveNote: "Game-drive route follows wildlife conditions." },
      { title: "Serengeti to the Ngorongoro rim", routeId: "ngorongoro", overnight: "Near the Ngorongoro rim", description: "Enjoy morning game viewing and continue to the crater rim.", activities: ["Morning game drive", "Travel to the crater rim"], driveNote: "Drive from the Serengeti to the Ngorongoro area." },
      { title: "From crater to coast", routeId: "zanzibar", overnight: "Zanzibar", description: "Visit Ngorongoro Crater, travel to Arusha and fly to Zanzibar, depending on flight schedules. An Arusha night may be needed.", activities: ["Ngorongoro Crater game drive", "Transfer to Arusha", "Domestic flight to Zanzibar"], driveNote: "Flight timing and same-day transfers depend on schedules and availability." }, // TODO(CONFIRM): domestic flight and connection details.
      { title: "Stone Town and the beach", routeId: "zanzibar", overnight: "Zanzibar", description: "Enjoy a guided Stone Town walk before relaxing by the sea.", activities: ["Guided Stone Town walk", "Beach time"], driveNote: "Island transfers arranged around the chosen accommodation." },
      { title: "Barefoot morning and departure", routeId: "departure", overnight: "End of journey", description: "Enjoy a free morning before transferring to Zanzibar Airport.", activities: ["Free morning", "Transfer to Zanzibar Airport"], driveNote: "Airport transfer based on flight details." },
    ]),
    extraInclusions: [
      "Domestic flight from Arusha to Zanzibar", // TODO(CONFIRM): confirm route, baggage allowance and fare inclusion.
      "Zanzibar accommodation at a beach hotel", // TODO(CONFIRM): confirm number of nights, room type and meal plan.
    ],
    goodToKnow: [{ variant: "warning", title: "Flight schedule dependency", text: "The crater-to-coast connection depends on domestic flight schedules. An additional night in Arusha may be needed." }],
    faqs: [
      { question: "Can I have more time on Zanzibar?", answer: "Yes. The itinerary is a starting point and the beach stay can be extended on request." },
      { question: "Does the safari-to-Zanzibar flight operate every day?", answer: "Domestic flight schedules vary. We confirm the connection for your dates and may recommend an additional Arusha night." },
      { question: "What is included in the beach stay?", answer: "Your proposal will confirm Zanzibar accommodation, meal plan, transfers and domestic flight details." },
    ],
    gallery: makeGallery("8-day-safari-and-zanzibar", "8-Day Safari and Zanzibar Escape"),
    related: ["5-day-northern-circuit-classic", "6-day-serengeti-great-migration", "7-day-women-only-group-safari"],
    departureInfo: { type: "private", datesNote: "Choose your preferred travel dates." },
  }),
];

if (process.env.NODE_ENV === "development") safaris.forEach((safari) => detailedPackageSchema.parse(safari));

export function getSafariBySlug(slug: string) {
  return safaris.find((safari) => safari.slug === slug);
}
