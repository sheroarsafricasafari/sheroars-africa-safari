import type { SerengetiPackage } from "@/types/serengeti-package";

export type NgorongoroPackage = SerengetiPackage & {
  tagline: string;
  badge: string;
  style: string;
  destinations: string[];
  collections: string[];
};

type TimelineActivity = {
  timeLabel?: string;
  description: string;
  optional?: boolean;
};

type PackageDayInput = {
  title: string;
  intro: string;
  timeline?: string[];
  timelineOptions?: { label: string; timeline: string[] }[];
  meals: ("B" | "L" | "D")[];
  overnight: string;
  travelNote: string;
  highlights: string[];
};

type StaySegment = {
  location: string;
  nights?: number;
  properties: string[];
};

type GroupAmounts = readonly [number, number, number, number, number];

type PackageInput = {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  durationDays: number;
  nights: number;
  route: { id: string; label: string; nights?: number }[];
  routeEndpoints?: { start: string; end: string };
  destinations: string[];
  collections?: string[];
  cardImageExtension?: "jpg" | "avif";
  pace: string;
  style: string;
  badge: string;
  bestMonths: number[];
  goodMonths?: number[];
  season: string;
  seasonNote: string;
  highlights: string[];
  bestFor: string[];
  days: PackageDayInput[];
  staysByTier: {
    tier: "mid-range" | "luxury";
    segments: StaySegment[];
    note?: string;
    upgrades?: string[];
  }[];
  midRangePrices: GroupAmounts;
  luxuryPrices: GroupAmounts;
  priceNotes?: string[];
  goodToKnow: string[];
  faqs: { question: string; answer: string }[];
  addOns: SerengetiPackage["addOns"];
  relatedPackages: string[];
  relatedLink?: { label: string; href: string };
  seo: { title: string; description: string };
};

const groupSizes = [1, 2, 3, 4, 6] as const;
const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
export const ngorongoroPriceDisclaimer =
  "Prices are per person in US dollars. Your written quote confirms your exact dates, availability and any seasonal supplement.";
export const ngorongoroAccommodationNote =
  "Accommodation is confirmed in your personal proposal and depends on availability. Names are examples, not guarantees.";
export const ngorongoroItineraryFootnote =
  "Times are indicative and depend on sightings, road conditions and gate procedures.";

export const craterDayFacts = [
  "The gates open at 6:00.",
  "The Seneto descent road is for descending and the Lerai road is for ascending.",
  "The Seneto descent gate closes at 16:00.",
  "Time on the crater floor is commonly limited to about six hours.",
  "Only 4x4 vehicles descend.",
  "Guests stay in the vehicle except at designated picnic sites.",
  "Nobody sleeps on the crater floor.",
];

const inclusions = [
  "Airport pick-up and drop-off in Arusha (package J: Moshi pick-up and airport or hotel drop-off)",
  "Private 4x4 with pop-up roof and a professional driver-guide",
  "Accommodation as listed",
  "Meals as stated in the itinerary",
  "Bottled drinking water",
  "Picnic lunches",
  "All park, conservation area, crater service, concession and vehicle fees",
  "Applicable taxes",
  "24/7 support from our team",
];

const exclusions = [
  "International flights",
  "Tanzania visa",
  "Travel insurance",
  "Gratuities",
  "Alcoholic and premium drinks",
  "Optional activities not listed",
  "Personal expenses",
  "Spa treatments unless stated",
  "Hotel nights in Arusha before or after (except H and J)",
  "Photography permits for commercial use",
];

export const sharedPackageFaqs = [
  {
    question: "What is included?",
    answer: "Your private 4x4 with pop-up roof and a professional driver-guide, accommodation as listed, meals as stated, bottled water, all park, conservation area, crater and concession fees, and airport transfers. See the full lists below.",
  },
  {
    question: "How does the price change with group size and season?",
    answer: "Your price per person falls as more travelers share the vehicle, and the group-size table shows it. A seasonal supplement of about 10 percent applies in July to October and from 20 December to 10 January.",
  },
  {
    question: "How long are the drives?",
    answer: "Each itinerary lists its drive times. Most days include between 1 and 4 hours of driving, with the longest days noted in the day-by-day plan.",
  },
  {
    question: "What should I pack?",
    answer: "Warm layers for the highlands and the crater rim, sun protection, binoculars, a camera, comfortable shoes and soft luggage.",
  },
  {
    question: "What is the crater day like?",
    answer: "An early start, a descent at first light and about six hours on the floor, including a picnic lunch, then the climb out. See the crater day facts in the itinerary.",
  },
  {
    question: "How do I book?",
    answer: "Request a quote, tell us your dates and group, and we will send a written proposal with the exact price and availability.",
  },
] as const;

const timeline = (lines: string[]): TimelineActivity[] => lines.map((line) => {
  const match = /^(\d{2}:\d{2})\s+(.+)$/.exec(line);
  return match
    ? { timeLabel: match[1], description: match[2] }
    : { description: line };
});

const groupPrices = (amounts: GroupAmounts) => amounts.map((amount, index) => ({
  travellers: groupSizes[index],
  amount,
  currency: "USD" as const,
  status: "published" as const,
}));

const tierPrice = (tier: "mid-range" | "luxury", amount: number) => ({
  tier,
  amount,
  currency: "USD" as const,
  status: "published" as const,
  availability: "available" as const,
});

const route = (stops: PackageInput["route"]) => stops.map((stop) => ({
  ...stop,
  note: stop.nights === undefined ? undefined : `${stop.nights} ${stop.nights === 1 ? "night" : "nights"}`,
}));

function makeDay(input: PackageDayInput, index: number, totalDays: number): SerengetiPackage["itinerary"][number] {
  return {
    id: `day-${index + 1}`,
    day: index + 1,
    title: input.title,
    opening: input.intro,
    activities: timeline(input.timeline ?? []),
    ...(input.timelineOptions
      ? {
          timelineOptions: input.timelineOptions.map((option) => ({
            label: option.label,
            activities: timeline(option.timeline),
          })),
        }
      : {}),
    travelNotes: [input.travelNote],
    meals: input.meals,
    overnightLocation: input.overnight,
    warnings: [],
    highlights: input.highlights,
    ...(index === totalDays - 1 ? { footnote: ngorongoroItineraryFootnote } : {}),
  };
}

function makePackage(input: PackageInput): NgorongoroPackage {
  const midRangePrices = groupPrices(input.midRangePrices);
  const luxuryPrices = groupPrices(input.luxuryPrices);
  const heroImage = {
    src: `/images/safaris/ngorongoro-packages/${input.slug}-hero.jpg`,
    alt: `${input.title} in Tanzania's Ngorongoro highlands`,
  };
  const packageImage = (index: number) => ({
    src: `/images/safaris/ngorongoro-packages/${input.slug}-gallery-${index}.jpg`,
    alt: `${input.title}: ${[
      "the highland route",
      "a crater landscape",
      "a safari moment",
      "the journey's changing scenery",
    ][index - 1]}`,
  });
  const pricingNote = [
    "Rates are valid for the 2026 and 2027 seasons.",
    "Singles: the Solo column includes a single supplement and a full vehicle.",
    "A seasonal supplement of about 10 percent applies in July to October and from 20 December to 10 January.",
    "Included: conservation area, national park, crater service, concession and vehicle fees.",
    ...(input.priceNotes ?? []),
  ];

  return {
    slug: input.slug,
    title: input.title,
    shortTitle: input.title,
    subtitle: input.tagline,
    tagline: input.tagline,
    summary: input.overview,
    durationDays: input.durationDays,
    nights: input.nights,
    regions: input.route.map(({ id, label, nights }) => ({ id, name: label, nights })),
    regionSearchTerms: [...input.destinations],
    bestMonths: input.bestMonths,
    ...(input.goodMonths ? { goodMonths: input.goodMonths } : {}),
    season: input.season,
    seasonNote: input.seasonNote,
    badge: input.badge,
    style: input.style,
    destinations: input.destinations,
    collections: ["ngorongoro", ...(input.collections ?? [])],
    access: { label: "Private 4x4 with pop-up roof", status: "specified" },
    pace: { label: input.pace, status: "specified" },
    departureType: { label: "Private safari", status: "specified" },
    groupSize: {},
    highlights: input.highlights,
    bestFor: input.bestFor,
    experienceTags: [input.style.toLowerCase(), "ngorongoro"],
    overview: [input.overview],
    sellingPointTitle: input.tagline,
    sellingPoint: input.overview,
    route: route(input.route),
    routeEndpoints: input.routeEndpoints ?? { start: "Arusha", end: "Arusha" },
    itinerary: input.days.map((day, index, days) => makeDay(day, index, days.length)),
    itineraryStatus: "provided",
    accommodation: input.staysByTier.map(({ tier }) => ({
      id: `${tier}-stays`,
      tier,
      availability: "available" as const,
      propertyName: null,
      region: null,
      location: null,
      type: null,
      description: null,
      season: null,
      areaType: null,
      confirmationStatus: "proposed" as const,
    })),
    staysByTier: input.staysByTier,
    gallery: [1, 2, 3, 4].map(packageImage),
    pricing: {
      status: "published",
      currency: "USD",
      tiers: [
        tierPrice("mid-range", input.midRangePrices[1]),
        tierPrice("luxury", input.luxuryPrices[1]),
      ],
      midRangeGroupPrices: midRangePrices,
      groupPricesByTier: { "mid-range": midRangePrices, luxury: luxuryPrices },
      unitConfirmation: ngorongoroPriceDisclaimer,
    },
    pricingNotes: pricingNote,
    inclusions: {
      items: [
        ...inclusions,
        ...(input.slug === "5-day-ngorongoro-highlands-culture-walking-safari"
          ? ["Ranger fee for Empakaai and Olmoti and community visit fees"]
          : []),
        ...(input.slug === "6-day-tanzania-family-wildlife-safari" ? ["The Arusha arrival night"] : []),
      ],
      status: "provided",
    },
    exclusions: { items: exclusions, status: "provided" },
    addOns: input.addOns,
    goodToKnow: [
      ...input.goodToKnow.map((text) => ({ title: "Good to know", text, status: "provided" as const })),
      ...(input.slug === "6-day-tanzania-family-wildlife-safari"
        ? [{
            title: "Children",
            text: "Children aged 5 to 15 pay reduced park fees and share their parents' room. Children under 5 travel free of park fees. Child prices are quoted with your proposal. Lodge age policies vary and are confirmed when you book.",
            status: "provided" as const,
          }]
        : []),
      ...(input.days.some((day) => /crater/i.test(day.title) || /crater/i.test(day.intro))
        ? craterDayFacts.map((text) => ({ title: "Ngorongoro Crater facts", text, status: "provided" as const }))
        : []),
      ...pricingNote.map((text) => ({ title: "Prices", text, status: "provided" as const })),
    ],
    wildlife: input.highlights,
    faqs: input.faqs,
    relatedPackages: input.relatedPackages,
    relatedLink: input.relatedLink,
    heroImage,
    cardImage: {
      src: `/images/safaris/ngorongoro-packages/${input.slug}-card.${input.cardImageExtension ?? "jpg"}`,
      alt: `${input.title} safari tour card`,
    },
    seo: input.seo,
    status: "published",
  } as NgorongoroPackage;
}

const addOn = (
  name: string,
  status: SerengetiPackage["addOns"][number]["status"],
  note?: string,
  price?: string,
) => ({ name, status, ...(note ? { note } : {}), ...(price ? { price } : {}) });

const stay = (location: string, properties: string[], nights?: number): StaySegment => ({
  location,
  properties,
  ...(nights === undefined ? {} : { nights }),
});

const craterCommon = [
  "06:00 The gate opens. Your guide completes the formalities while the line of vehicles builds quietly in the cold.",
  "06:30 The descent along the Seneto road, about half an hour of winding track through misty forest to the crater floor.",
  "07:00 The first drive across the central plains, where lions, hyenas and grazing herds are active in the cool, soft light.",
  "08:30 Lake Magadi and the swamps, for hippos, birdlife and, when the water suits them, flamingos.",
  "10:00 The Lerai Forest, a shady woodland of fever trees and a good place to look for elephants.",
  "11:30 Picnic lunch at Ngoitokitok Springs. Eat inside or beside the vehicle, because the local kites will happily steal a sandwich.",
  "12:30 The climb out by the Lerai road, with one last search for black rhino on the way.",
];

function craterTimeline(
  start: "Karatu" | "Rim",
  end: "lodge" | "Arusha",
  endLines?: string[],
  startLines?: string[],
): string[] {
  const defaultStart = start === "Karatu"
    ? ["04:45 Wake-up with tea and coffee, and a breakfast box to eat on the move.", "05:00 Depart for the crater gate, about 45 to 60 minutes away."]
    : ["05:15 Wake-up with tea and coffee, and a breakfast box to eat on the move.", "05:40 A short drive along the rim to the gate."];
  const defaultEnd = end === "Arusha"
    ? ["13:15 Leave the rim and drive to Arusha, about 3.5 to 4 hours, arriving around 17:00. Your guide drops you at your hotel or the airport."]
    : ["13:30 Back at your rim lodge, or 14:15 back at your Karatu lodge, for a long rest, a swim or a gentle farm walk.", "19:00 Dinner at the lodge."];
  return [...(startLines ?? defaultStart), ...craterCommon, ...(endLines ?? defaultEnd)];
}

const arushaKaratuTimeline = [
  "08:00 A slow breakfast at your lodge.",
  "09:00 An optional visit to a coffee farm, about one hour, to see how the beans are grown and roasted.",
  "10:15 Check-out and depart for Arusha, about 3 hours, with a stop at Mto wa Mbu.",
  "13:30 Arrive in Arusha. Your guide drops you at your hotel or the airport.",
];

const tarangireTimeline = [
  "07:30 Hotel pick-up in Arusha, a short briefing and a check of your binoculars and cameras.",
  "08:00 Drive south-west across the Maasai steppe toward Tarangire, about 2 to 2.5 hours, with baobab-dotted country appearing as you approach.",
  "10:30 Arrive at the park gate while your guide completes the entry formalities.",
  "11:00 The game drive begins along the Tarangire River valley, the park's lifeline, looking for elephant herds, giraffe, zebra, wildebeest and buffalo.",
  "13:00 Picnic lunch at a designated picnic site in the shade of ancient baobab trees.",
  "14:00 An afternoon drive through open woodland and wetland, where lions and leopards are sometimes found resting in the trees.",
  "16:00 Leave the park and drive to Karatu, about 2 hours, as the light turns gold.",
  "18:00 Check in at your lodge, freshen up and enjoy dinner.",
];

const manyaraTimeline = [
  "07:00 Breakfast at your lodge.",
  "07:45 Drive down the escarpment to Lake Manyara National Park, about 30 to 40 minutes.",
  "08:30 Enter through the groundwater forest, where baboons and blue monkeys line the road and elephants slip between the trunks.",
  "10:00 Open woodland and floodplain, for giraffe, zebra, buffalo and impala. Look up into the branches too, because Lake Manyara's lions are famous for climbing trees, though no sighting is ever guaranteed.",
  "11:30 The hippo pool and the lakeshore, for waterbirds and, when the water suits them, flamingos.",
  "13:00 Picnic lunch at a designated site.",
  "14:00 A slow afternoon loop for wildlife and birds. Your guide adapts to what the animals are doing.",
  "15:30 Leave the park and climb back up the escarpment to Karatu, about 40 minutes.",
  "16:30 Free time at the lodge for the pool, the gardens or a walk through a coffee farm. Dinner at 19:00.",
];

const serengetiOutboundTimeline = [
  "07:00 Hotel pick-up in Arusha, a short briefing and a check of your warm layers for the highlands.",
  "07:30 Drive west across the Maasai steppe, with a coffee and fruit stop at Mto wa Mbu around 09:30.",
  "10:30 Lodoare Gate, the entrance to the Ngorongoro Conservation Area. Your guide handles the formalities, about 30 minutes.",
  "11:00 A drive along the crater rim through highland forest, with a photo stop at a viewpoint. This is a rim drive only. There is no descent today.",
  "12:30 Picnic lunch at a scenic stop.",
  "13:30 An optional 45-minute stop at Olduvai Gorge and its small museum.",
  "14:30 Naabi Hill Gate, the southern entrance to the Serengeti. Climb the hill for your first view of the plains.",
  "15:00 A game drive across the short-grass plains toward Seronera, about 1.5 hours or longer if sightings are good.",
  "17:30 Check in at your camp or lodge.",
  "19:00 Dinner.",
];

const serengetiFullTimeline = [
  "06:00 Wake-up call with tea and coffee.",
  "06:30 Sunrise game drive along the Seronera River, when big cats are often still active.",
  "09:30 Breakfast in the bush or back at camp.",
  "10:30 A late-morning loop to the kopjes, where lion prides often rest in the shade.",
  "13:00 Picnic lunch in the field, or lunch at camp and a rest through the midday heat.",
  "15:30 An afternoon drive to Retima Hippo Pool and the open grass where cheetahs scan for prey.",
  "18:00 A sundowner stop where conditions allow.",
  "19:00 Dinner at camp.",
];

const serengetiToHighlandsTimeline = [
  "06:30 One last sunrise game drive.",
  "08:30 Breakfast and check-out.",
  "09:30 Drive south across the plains toward Naabi Hill Gate with game viewing on the way, about 1.5 hours.",
  "11:00 Naabi Hill Gate and a final look at the plains.",
  "12:00 Picnic lunch.",
  "13:30 An optional stop at Olduvai Gorge and its museum.",
  "14:30 Back into the Ngorongoro Conservation Area, climbing through the highlands with views along the crater rim.",
  "16:00 Arrive at your lodge, with time for tea and a rest.",
  "19:00 Dinner.",
];

const karatuToSerengetiTimeline = [
  "06:30 Early breakfast and check-out.",
  "07:15 Drive to Lodoare Gate, about 20 to 30 minutes, and complete the formalities.",
  "08:30 A drive along the crater rim, with a photo stop at a viewpoint.",
  "09:30 Down toward the western plains, with an optional stop at Olduvai Gorge and its museum.",
  "11:00 Across the open plains toward Naabi Hill Gate, watching for wildlife.",
  "12:30 Picnic lunch at the Naabi Hill picnic site.",
  "13:30 Naabi Hill Gate formalities, then the first Serengeti game drive toward Seronera, about 1.5 hours.",
  "16:00 Check in at your camp or lodge.",
  "16:30 An afternoon game drive near camp until the light fades.",
  "19:00 Dinner.",
];

const arushaNdutuTimeline = [
  "07:00 Hotel pick-up in Arusha and a short briefing.",
  "07:30 Drive west, with a coffee and fruit stop at Mto wa Mbu around 09:30.",
  "10:30 Lodoare Gate and the formalities, about 30 minutes.",
  "11:15 A drive along the crater rim with a viewpoint stop.",
  "12:30 Picnic lunch at a viewpoint.",
  "13:15 Down through the highlands toward the southern plains, where the forest gives way to open grassland.",
  "15:00 Arrive at Ndutu, about 5 to 6 hours of driving in total, and check in.",
  "16:30 A first game drive on the short-grass plains until sunset.",
  "19:00 Dinner.",
];

const ndutuFullTimeline = [
  "06:00 Wake-up call with tea and coffee.",
  "06:30 A dawn drive on the plains, when predators are on the move and herds are restless.",
  "09:30 Breakfast in the bush or at camp.",
  "10:30 A drive through the acacia woodland around Lake Ndutu and Lake Masek, for birds, giraffe and leopard country.",
  "13:00 Picnic lunch in the field.",
  "15:30 An afternoon drive back out onto the plains.",
  "18:00 A sundowner stop where conditions allow.",
  "19:00 Dinner at camp.",
];

const returnToArushaTimeline = [
  "08:00 A slow breakfast at your lodge.",
  "09:00 An optional visit to a coffee farm, about one hour, to see how the beans are grown and roasted.",
  "10:15 Check-out and depart for Arusha, about 3 hours, with a stop at Mto wa Mbu.",
  "13:30 Arrive in Arusha. Your guide drops you at your hotel or the airport.",
];

const craterAddOns = [
  addOn("An extra night in the highlands or on the rim", "on-request", "Quoted with your proposal."),
  addOn("A Maasai cultural visit", "on-request", "Quoted on request."),
  addOn("An Empakaai hike", "on-request", "Full day, ranger-led, quoted on request."),
  addOn("An Olduvai Gorge stop", "optional", "Optional where noted in the itinerary."),
  addOn("Arusha hotel nights before or after", "on-request", "At cost."),
  addOn("Photography permits for commercial use", "on-request", "Not included."),
];
const nonCultureAddOns = [
  addOn("An extra night in the highlands or on the rim", "on-request", "Quoted with your proposal."),
  addOn("Arusha hotel nights before or after", "on-request", "At cost."),
  addOn("Photography permits for commercial use", "on-request", "Not included."),
];

export const ngorongoroPackages: NgorongoroPackage[] = [
  makePackage({
    slug: "2-day-ngorongoro-crater-escape",
    title: "2-Day Ngorongoro Crater Escape",
    tagline: "One night, one crater, one unforgettable morning.",
    overview: "A short safari with a big payoff. You drive up into the cool green highlands, sleep above the clouds or on a quiet farm, and wake before dawn for the descent into the world's largest unbroken caldera. It is the easiest way to meet the Ngorongoro Crater properly, without a rushed day trip.",
    durationDays: 2,
    nights: 1,
    route: [{ id: "highlands", label: "Ngorongoro Highlands", nights: 1 }, { id: "ngorongoro", label: "Ngorongoro Crater" }],
    destinations: ["Ngorongoro"],
    collections: ["Short stays"],
    pace: "Moderate",
    style: "Short and private",
    badge: "Short and sweet",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "The crater can be visited year-round. Wildlife sightings are never guaranteed.",
    highlights: ["A night in the highlands", "A first-light crater descent", "About six hours on the crater floor", "A picnic beside hippos", "Private 4x4 with pop-up roof", "Back in Arusha by evening."],
    bestFor: ["First-time visitors", "Couples", "A short safari after Kilimanjaro or Zanzibar"],
    days: [
      {
        title: "Arusha to the Ngorongoro Highlands",
        intro: "Today is about leaving the heat of Arusha behind and climbing into the cool green highlands. Your guide collects you after breakfast and heads west across the Maasai steppe to Mto wa Mbu, a lively farming town at the foot of the Rift Valley escarpment. From there the road climbs steeply, the air cools, and coffee farms and banana groves give way to forest. Mid-range guests arrive at a farm lodge in Karatu, while luxury guests continue to a lodge on the crater rim, where the caldera falls away at your feet. Nothing is rushed, because the point of today is to arrive rested for an early start tomorrow.",
        timeline: [
          "07:30 Hotel pick-up in Arusha, a short briefing and a check that everyone has warm layers for tomorrow.",
          "08:00 Drive west across the Maasai steppe, with the slopes of Mount Meru fading behind you.",
          "10:00 Mto wa Mbu, a coffee and fruit stop, with an optional 30 to 45 minute stroll through the market and banana farms.",
          "10:45 The climb up the Rift Valley escarpment into the highlands, with views back over Lake Manyara.",
          "12:30 Lunch at your lodge.",
          "14:00 Settle in. Mid-range guests can walk through a coffee farm or the lodge gardens. Luxury guests can enjoy the rim terrace and their first view into the caldera.",
          "17:30 Sunset tea or a drink, depending on your lodge.",
          "19:00 Dinner, and an early night for tomorrow's alarm.",
        ],
        meals: ["L", "D"],
        overnight: "Karatu farm lodge or similar (mid-range); crater rim lodge or similar (luxury).",
        travelNote: "About 3 to 4 hours of driving.",
        highlights: ["The cool, green highlands", "A relaxed first day", "An early night before the crater."],
      },
      {
        title: "Into the Ngorongoro Crater",
        intro: "This is the morning you came for. Before the sun is up, your guide collects you for the short drive to the crater gate, and by six o'clock the vehicles are queuing quietly in the cold. Then the road tips over the rim and the whole caldera opens below you, a green and gold bowl with a pale soda lake at its heart. You spend about six hours on the floor, working through the central plains, Lake Magadi, the Lerai Forest and Ngoitokitok Springs, where hippos lounge beside the picnic site. Lions are often resting in the grass and elephants drift through the fever trees. With luck and sharp eyes you may glimpse a black rhino far away. Wildlife cannot be promised, but the crater gives you better odds than almost anywhere else.",
        timelineOptions: [
          { label: "Mid-range · Karatu", timeline: craterTimeline("Karatu", "Arusha") },
          { label: "Luxury · Crater rim", timeline: craterTimeline("Rim", "Arusha") },
        ],
        meals: ["B", "L"],
        overnight: "None, return to Arusha.",
        travelNote: "About 3.5 to 4 hours to Arusha, arriving by early evening.",
        highlights: ["Six hours on the crater floor", "A picnic with hippos", "A chance of black rhino, never guaranteed."],
      },
    ],
    staysByTier: [
      { tier: "mid-range", segments: [stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 1)] },
      { tier: "luxury", segments: [stay("Crater rim", ["Ngorongoro Serena Safari Lodge", "Lemala Ngorongoro Tented Camp"], 1)] },
    ],
    midRangePrices: [1450, 850, 650, 600, 500],
    luxuryPrices: [2550, 1600, 1450, 1350, 1250],
    goodToKnow: ["The crater morning starts very early. Rim nights are cold, so pack warm layers. Sightings are never guaranteed."],
    faqs: [
      { question: "Is one night enough?", answer: "Yes. One night puts you close enough to the gate for a first-light descent, which is the best time to see the crater. If you also want Olduvai Gorge, a Maasai visit or Empakaai, add a second night." },
      { question: "Can I do the crater in one day from Arusha?", answer: "It is possible, but it is a very long day, with about 7 to 8 hours of driving and a time-limited descent. A night in the highlands is far more relaxed. See our crater day trip if you are short on time." },
    ],
    addOns: craterAddOns,
    relatedPackages: ["3-day-ngorongoro-tarangire-wildlife-safari", "3-day-tarangire-manyara-ngorongoro", "4-day-luxury-ngorongoro-rim-retreat"],
    seo: {
      title: "2-Day Ngorongoro Crater Safari from Arusha",
      description: "Sleep in the Ngorongoro highlands and descend into the crater at first light on a 2-day private safari from Arusha. Tailor-made by a women-led team.",
    },
  }),
  makePackage({
    slug: "3-day-ngorongoro-tarangire-wildlife-safari",
    title: "3-Day Ngorongoro and Tarangire Wildlife Safari",
    tagline: "Elephants and baobabs, then the crater.",
    overview: "Two very different worlds in three days. Tarangire is baobab country, with elephant herds that gather along a river. Ngorongoro is a volcanic bowl packed with wildlife. Two nights in the highlands keep the driving gentle and the evenings relaxed.",
    durationDays: 3,
    nights: 2,
    route: [
      { id: "tarangire", label: "Tarangire National Park" },
      { id: "karatu", label: "Karatu", nights: 2 },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
    ],
    destinations: ["Ngorongoro", "Tarangire"],
    collections: ["Short stays"],
    pace: "Moderate",
    style: "Two parks",
    badge: "Two parks",
    bestMonths: [6, 7, 8, 9, 10],
    goodMonths: [1, 2, 3, 11, 12],
    season: "Year-round, strongest from June to October",
    seasonNote: "Tarangire is strongest from June to October, when animals gather along the river.",
    highlights: ["A full Tarangire game drive", "Elephant herds and baobab trees", "A crater morning", "Two nights in the highlands", "Private 4x4 with pop-up roof."],
    bestFor: ["Wildlife lovers", "First-timers with three days"],
    days: [
      {
        title: "Tarangire, the land of elephants and baobabs",
        intro: "Tarangire is the perfect warm-up. The park sits in dry, golden country dotted with baobab trees that look as though they were planted upside down, and its river draws elephants in numbers that make a herd feel like a moving village. You spend most of the day in the park, with a picnic lunch in the shade of a baobab, then drive on to Karatu as the light turns amber. In the dry season, from June to October, animals gather along the river and sightings can be especially rewarding.",
        timeline: tarangireTimeline,
        meals: ["L", "D"],
        overnight: "Karatu farm lodge or similar (mid-range); Karatu luxury lodge or similar (luxury).",
        travelNote: "About 2.5 hours to the park, about 6 hours of game viewing, then about 2 hours to Karatu.",
        highlights: ["Elephant herds", "Baobab trees", "The Tarangire River."],
      },
      {
        title: "A morning in the crater",
        intro: "This is the day the whole safari builds toward. After a very early breakfast you drive up to the crater rim in the dark and join the quiet line of vehicles at the gate. At first light the road tips over the edge and you descend into a vast bowl of grassland, forest, swamp and soda lake. You spend about six hours on the floor, which is enough to see an astonishing amount. Lions, hyenas, buffalo and zebra are almost constant companions. Elephants, hippos and, with patience and luck, a black rhino are the bonus rounds. By early afternoon you are back at your lodge with sore cheeks from smiling.",
        timeline: craterTimeline("Karatu", "lodge"),
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge, same as Day 1.",
        travelNote: "About 45 to 60 minutes to the gate, about 6 hours on the floor.",
        highlights: ["A first-light descent", "Lions and hyenas on the plains", "A chance of black rhino, never guaranteed."],
      },
      {
        title: "A gentle drive back to Arusha",
        intro: "After two big days, today is deliberately gentle. Sleep a little later, enjoy a slow breakfast and, if you like, take an optional tour of a coffee farm to see how the beans on your breakfast table are grown. Then the highland road winds down the escarpment, past Mto wa Mbu, and across the steppe to Arusha, arriving in time for lunch or an afternoon flight. Your guide will drop you at your hotel or the airport.",
        timeline: returnToArushaTimeline,
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 3 hours of driving.",
        highlights: ["A slow morning", "An optional coffee farm visit", "Back in Arusha by early afternoon."],
      },
    ],
    staysByTier: [
      { tier: "mid-range", segments: [stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 2)] },
      { tier: "luxury", segments: [stay("Karatu", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge"], 2)] },
    ],
    midRangePrices: [2100, 1250, 1050, 900, 800],
    luxuryPrices: [3300, 2000, 1800, 1650, 1550],
    goodToKnow: ["Tarangire is strongest from June to October, when animals gather along the river."],
    faqs: [
      { question: "Which month is best for Tarangire?", answer: "June to October is the dry season, when animals gather along the river and sightings are strongest. Tarangire is good year-round, but it is greener and quieter from November to May." },
      { question: "Can I add Lake Manyara?", answer: "Yes. Our 3-day Tarangire, Manyara and Ngorongoro safari adds Lake Manyara, and our 6-day family safari and 7-day northern circuit include it too." },
    ],
    addOns: craterAddOns,
    relatedPackages: ["2-day-ngorongoro-crater-escape", "3-day-tarangire-manyara-ngorongoro", "6-day-tanzania-family-wildlife-safari"],
    seo: {
      title: "3-Day Tarangire and Ngorongoro Crater Safari",
      description: "Elephants and baobabs in Tarangire, then the Ngorongoro Crater at dawn. A private 3-day Tanzania safari with two nights in the highlands.",
    },
  }),
  makePackage({
    slug: "3-day-tarangire-manyara-ngorongoro",
    title: "3-Day Tarangire, Lake Manyara and Ngorongoro Safari",
    tagline: "Three ecosystems in three days.",
    overview: "Elephant country, a forest beside a lake and a volcanic crater, in one compact safari. Each day feels different, and the pace stays kind.",
    durationDays: 3,
    nights: 2,
    route: [
      { id: "tarangire", label: "Tarangire National Park" },
      { id: "karatu", label: "Karatu", nights: 2 },
      { id: "manyara", label: "Lake Manyara National Park" },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
    ],
    destinations: ["Ngorongoro", "Tarangire", "Lake Manyara"],
    collections: ["Short stays"],
    pace: "Moderate",
    style: "Three ecosystems",
    badge: "Three ecosystems",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "Tree-climbing lions at Lake Manyara are famous but never guaranteed.",
    highlights: ["Tarangire's baobabs and elephants", "Lake Manyara's forest and lakeshore", "The Ngorongoro Crater", "Private 4x4 with pop-up roof."],
    bestFor: ["Travelers who want variety on a short trip"],
    days: [
      {
        title: "Elephant country in Tarangire",
        intro: "Your safari begins in the dry, golden country of Tarangire, where baobab trees stand like ancient sculptures and elephant herds move along the river. Your guide takes you through the park's best corners, and a picnic lunch under a baobab gives you time to simply sit and watch. By late afternoon you drive up to Karatu, where a warm lodge and a good dinner are waiting.",
        timeline: tarangireTimeline,
        meals: ["L", "D"],
        overnight: "Karatu lodge.",
        travelNote: "About 2.5 hours to the park, about 6 hours of game viewing, then about 2 hours to Karatu.",
        highlights: ["Elephant herds", "Baobab trees", "A river full of wildlife."],
      },
      {
        title: "The forest and the lake at Lake Manyara",
        intro: "Lake Manyara is the quiet surprise of the northern circuit. Beneath a towering escarpment, a narrow park squeezes together a groundwater forest, open woodland, a floodplain and a shallow lake. Baboons and blue monkeys watch you from the trees, elephants slip between the trunks and hippos wallow where the lake begins. The park is famous for tree-climbing lions, a habit you may or may not witness, because the lions have not read the brochure. It is an easy, gentle day, with a free afternoon at your lodge.",
        timeline: manyaraTimeline,
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge.",
        travelNote: "About 40 minutes each way, about 5 hours in the park.",
        highlights: ["A groundwater forest", "Hippos and lakeshore birds", "A relaxed afternoon."],
      },
      {
        title: "The Ngorongoro Crater and home",
        intro: "Your final day is the grand finale. You are up before dawn, at the crater gate by six and over the rim as the light spills across the caldera. For about six hours you roam a world within a world, with lions, hyenas, buffalo, zebra and hippos in one compact bowl and, with luck, a black rhino in the distance. After a picnic lunch by the springs you climb out, and your guide drives you back to Arusha, arriving in the early evening with a camera full of the best three days of your trip.",
        timeline: craterTimeline("Karatu", "Arusha"),
        meals: ["B", "L"],
        overnight: "None.",
        travelNote: "About 45 to 60 minutes to the gate, then about 3.5 to 4 hours to Arusha.",
        highlights: ["A first-light descent", "A picnic with hippos", "A chance of black rhino, never guaranteed."],
      },
    ],
    staysByTier: [
      { tier: "mid-range", segments: [stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 2)] },
      { tier: "luxury", segments: [stay("Karatu", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge"], 2)] },
    ],
    midRangePrices: [2150, 1300, 1100, 1000, 900],
    luxuryPrices: [3350, 2050, 1850, 1750, 1650],
    goodToKnow: ["Tree-climbing lions at Lake Manyara are famous but never guaranteed."],
    faqs: [
      { question: "Will we see tree-climbing lions at Lake Manyara?", answer: "They are a local speciality, but sightings are never guaranteed. Your guide will check the likely trees, and the forest, hippos and birdlife make the day rewarding either way." },
      { question: "Is Lake Manyara worth a full day?", answer: "Yes. It is a very different habitat from Tarangire and the crater, and the pace is gentler, so it breaks up the safari beautifully." },
    ],
    addOns: craterAddOns,
    relatedPackages: ["3-day-ngorongoro-tarangire-wildlife-safari", "6-day-tanzania-family-wildlife-safari", "7-day-ultimate-northern-tanzania-safari"],
    seo: {
      title: "3-Day Tarangire, Manyara and Ngorongoro Safari",
      description: "Three ecosystems in three days: Tarangire's elephants, Lake Manyara's forest and the Ngorongoro Crater. A private northern Tanzania safari.",
    },
  }),
  makePackage({
    slug: "4-day-serengeti-ngorongoro-safari",
    title: "4-Day Serengeti and Ngorongoro Crater Safari",
    cardImageExtension: "avif",
    tagline: "The open plains and the great bowl.",
    overview: "Two of Africa's most famous wildlife landscapes in four days. Two nights on the Serengeti plains give you room to breathe, and the crater finale gives you concentration. It is a classic for good reason.",
    durationDays: 4,
    nights: 3,
    route: [
      { id: "serengeti", label: "Serengeti", nights: 2 },
      { id: "highlands", label: "Ngorongoro Highlands", nights: 1 },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
    ],
    destinations: ["Ngorongoro", "Serengeti"],
    collections: ["With the Serengeti"],
    pace: "Active",
    style: "Plains and crater",
    badge: "Plains and crater",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "The migration's location varies with the season, and no sighting can be guaranteed.",
    highlights: ["Two nights in the Serengeti", "A full Serengeti day", "A crater morning", "The scenic road through the highlands", "An optional Olduvai Gorge stop", "Private 4x4 with pop-up roof."],
    bestFor: ["Couples", "Photographers who want the plains and the crater without a week away"],
    days: [
      {
        title: "Arusha to the Serengeti",
        intro: "Today is a journey, and a good one. You leave Arusha early, climb through the Ngorongoro Highlands, drive along the crater rim and cross the southern plains, which stretch to the horizon as if someone had ironed the earth. Your guide can stop at Olduvai Gorge if you wish. By Naabi Hill Gate the scenery has become pure Serengeti, with acacias, kopjes and the first herds. You reach camp in the late afternoon with dust on your boots and a full camera.",
        timeline: serengetiOutboundTimeline,
        meals: ["L", "D"],
        overnight: "Serengeti tented camp or lodge.",
        travelNote: "About 7 to 8 hours including stops and game viewing.",
        highlights: ["The crater rim drive", "The southern plains", "Your first Serengeti sunset."],
      },
      {
        title: "A full day in the Serengeti",
        intro: "Today you do nothing but safari. The Seronera area is the best-known part of the Serengeti for resident big cats, and the plan is simple: be out at first light, return for a long breakfast or enjoy it in the bush, and go out again when the afternoon softens. Your guide reads the land as you drive, checking kopjes for lions and tall trees for leopards, and adapts to the migration if herds are nearby. Evenings end with a sundowner and dinner under an enormous sky.",
        timeline: serengetiFullTimeline,
        meals: ["B", "L", "D"],
        overnight: "Serengeti tented camp or lodge.",
        travelNote: "Game drives only. An optional sunrise balloon safari is available from $590 per person.",
        highlights: ["Big cats and kopjes", "Retima Hippo Pool", "A sundowner on the plains."],
      },
      {
        title: "From the plains to the highlands",
        intro: "You say goodbye to the Serengeti with one last morning drive, then head south. The plains slide past, the road climbs into the highlands and, by late afternoon, you reach your lodge for a quiet evening. Mid-range guests stay in Karatu among the coffee farms, while luxury guests stay on the crater rim, a perfect place to watch the sun set over the caldera and prepare for the early start tomorrow.",
        timeline: serengetiToHighlandsTimeline,
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge or similar (mid-range); crater rim lodge or similar (luxury).",
        travelNote: "About 5 to 6 hours of driving plus stops.",
        highlights: ["A final Serengeti sunrise", "The scenic highland road", "A quiet evening before the crater."],
      },
      {
        title: "The crater and home",
        intro: "The finale. An early start, a descent through the dawn into the crater, six hours of wildlife on the floor and then the long drive home. After two days of open Serengeti, the crater feels wonderfully compact, a place where you can see lions, hippos, elephants and buffalo in a single morning.",
        timelineOptions: [
          { label: "Mid-range, starting in Karatu", timeline: craterTimeline("Karatu", "Arusha") },
          { label: "Luxury, starting on the rim", timeline: craterTimeline("Rim", "Arusha") },
        ],
        meals: ["B", "L"],
        overnight: "None.",
        travelNote: "About 3.5 to 4 hours to Arusha.",
        highlights: ["A first-light descent", "Lions, hippos and elephants in one bowl", "A chance of black rhino, never guaranteed."],
      },
    ],
    staysByTier: [
      {
        tier: "mid-range",
        segments: [
          stay("Serengeti", ["Kati Kati Tented Camp", "Kubu Kubu Tented Lodge", "Serengeti Serena Safari Lodge"], 2),
          stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 1),
        ],
      },
      {
        tier: "luxury",
        segments: [
          stay("Serengeti", ["Mbuzi Mawe Serena Camp", "Lemala Ewanjan", "Serengeti Pioneer Camp"], 2),
          stay("Crater rim", ["Ngorongoro Serena Safari Lodge", "Lemala Ngorongoro Tented Camp"], 1),
        ],
      },
    ],
    midRangePrices: [3550, 2300, 2050, 1900, 1750],
    luxuryPrices: [5850, 3750, 3500, 3350, 3250],
    goodToKnow: ["Day 1 is a long drive. The migration's location varies with the season, and no sighting can be guaranteed."],
    faqs: [
      { question: "Will we see the Great Migration?", answer: "The herds move through the Serengeti ecosystem through the year, so where they are depends on the month and the rains. Your guide plans the Seronera days around the best areas for your dates, but no sighting or river crossing can be guaranteed." },
      { question: "Is the first day too long?", answer: "It is a long day, about 7 to 8 hours including stops, but it is a scenic one, with the highlands, the rim and the southern plains. Your guide stops often, and you reach camp in time for an evening drive or a drink." },
    ],
    addOns: [
      addOn("Sunrise balloon safari", "optional", "Available on Day 2.", "From $590 per person."),
      ...craterAddOns,
    ],
    relatedPackages: ["7-day-ultimate-northern-tanzania-safari", "5-day-ndutu-calving-ngorongoro-safari", "2-day-ngorongoro-crater-escape"],
    seo: {
      title: "4-Day Serengeti and Ngorongoro Crater Safari",
      description: "Two Serengeti days on the plains and a morning in the Ngorongoro Crater, in one private 4-day safari from Arusha.",
    },
  }),
  makePackage({
    slug: "5-day-ndutu-calving-ngorongoro-safari",
    title: "5-Day Ndutu Calving Season and Ngorongoro Safari",
    cardImageExtension: "avif",
    tagline: "Newborn calves on the plains, then the crater.",
    overview: "From December to March the southern plains fill with wildebeest and thousands of newborn calves, and the predators follow. This safari spends two nights at Ndutu in the middle of it, then climbs to the crater rim for a descent into the caldera.",
    durationDays: 5,
    nights: 4,
    route: [
      { id: "ndutu", label: "Ndutu", nights: 2 },
      { id: "rim", label: "Ngorongoro Crater Rim", nights: 1 },
      { id: "karatu", label: "Karatu", nights: 1 },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
    ],
    destinations: ["Ngorongoro", "Ndutu"],
    collections: ["With the Serengeti"],
    pace: "Moderate",
    style: "Calving season",
    badge: "Calving season",
    bestMonths: [1, 2, 3, 12],
    goodMonths: [11],
    season: "December to March",
    seasonNote: "Calving timing follows the rains and cannot be promised. From April to November the herds are elsewhere, and our Serengeti packages are a better fit.",
    highlights: ["Calving season on the Ndutu plains", "Lions, cheetahs and hyenas hunting", "Lake Ndutu and Lake Masek woodlands", "A night on the rim and a crater morning", "Private 4x4 with pop-up roof."],
    bestFor: ["Wildlife lovers", "Photographers traveling between December and March"],
    days: [
      {
        title: "Arusha to Ndutu",
        intro: "Today takes you from the tarmac to the edge of the migration. The road climbs through the highlands, rolls along the crater rim and then drops onto the southern plains, where the landscape flattens into short, nutritious grass. That grass is the reason the herds come here to calve. By mid-afternoon you reach Ndutu, with its acacia woodland and shallow lakes, and your first game drive begins among wildebeest and zebra.",
        timeline: arushaNdutuTimeline,
        meals: ["L", "D"],
        overnight: "Ndutu tented camp or lodge.",
        travelNote: "About 5 to 6 hours of driving plus stops.",
        highlights: ["The crater rim drive", "The southern plains", "Your first calving-season game drive."],
      },
      {
        title: "A full day on the calving plains",
        intro: "Between roughly December and March, tens of thousands of wildebeest calves are born on the Ndutu plains, many of them in a few intense weeks. Calves stand within minutes and run with the herd within the hour, and the predators know it. Lions, cheetahs and hyenas patrol the edges, so every drive tells a story. Your guide spends the day following the action, then takes you to the woodland around the lakes for a calmer change of scene, with birds and giraffe. Nothing about wildlife can be promised, but this is one of the best places on Earth to try.",
        timeline: ndutuFullTimeline,
        meals: ["B", "L", "D"],
        overnight: "Ndutu tented camp or lodge.",
        travelNote: "Game drives only.",
        highlights: ["Newborn calves", "Predators on the hunt", "Lake Ndutu and Lake Masek."],
      },
      {
        title: "Ndutu to the crater rim",
        intro: "After two days on the open plains, you climb back into the cool highlands and spend the evening on the crater rim, where the caldera lies beneath your terrace. The air is crisp, warm layers are welcome and the next morning's descent feels very close. If you like, your guide can arrange a Maasai cultural visit this afternoon, and the rest of the evening is yours to enjoy the view.",
        timeline: [
          "06:30 One last dawn drive on the plains.",
          "08:30 Breakfast and check-out.",
          "09:30 Depart toward the highlands, about 2.5 to 3 hours with game viewing on the way.",
          "12:30 Picnic lunch at a viewpoint.",
          "14:00 Arrive at your rim lodge and check in.",
          "15:00 Free time for the terrace, a short walk or an optional Maasai cultural visit.",
          "17:30 Sunset over the caldera if the weather is clear.",
          "19:00 Dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Crater rim lodge or similar.",
        travelNote: "About 2.5 to 3 hours of driving.",
        highlights: ["A last Ndutu sunrise", "A first view into the caldera", "An optional Maasai cultural visit."],
      },
      {
        title: "The crater, then Karatu",
        intro: "Time for the crater. You started this safari on open plains where animals roam widely, and now you meet a compact bowl where they are concentrated. You descend at first light and spend about six hours on the floor with lions, hyenas, buffalo, zebra, hippos and elephants, and with luck a black rhino. After a picnic lunch you climb out and drive to Karatu, where a farm lodge, a coffee farm walk and a warm dinner finish the day.",
        timeline: craterTimeline("Rim", "lodge", [
          "13:15 Leave the rim for Karatu, about 30 to 60 minutes.",
          "14:15 Check in at your Karatu lodge, then enjoy a coffee farm walk or the pool.",
          "19:00 Dinner.",
        ]),
        meals: ["B", "L", "D"],
        overnight: "Karatu farm lodge or similar.",
        travelNote: "About 6 hours on the crater floor, then 30 to 60 minutes to Karatu.",
        highlights: ["A first-light descent", "Six hours with the crater's wildlife", "A warm farm lodge."],
      },
      {
        title: "Karatu to Arusha",
        intro: "A gentle final morning. Linger over breakfast, wander through a coffee farm if you like, and then let the highland road carry you down to Arusha. Your guide stops at Mto wa Mbu for a last coffee and a last look at the escarpment, and you reach Arusha by early afternoon.",
        timeline: arushaKaratuTimeline,
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 3 hours of driving.",
        highlights: ["A slow morning", "An optional coffee farm visit", "Back in Arusha by early afternoon."],
      },
    ],
    staysByTier: [
      {
        tier: "mid-range",
        segments: [
          stay("Ndutu", ["Ndutu Kati Kati Tented Camp", "Ndutu Safari Lodge", "Lake Masek Tented Lodge"], 2),
          stay("Crater rim", ["Rhino Lodge", "Ngorongoro Sopa Lodge"], 1),
          stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 1),
        ],
      },
      {
        tier: "luxury",
        segments: [
          stay("Ndutu", ["Lemala Ndutu Tented Camp", "Taasa Migration Camp"], 2),
          stay("Crater rim", ["Ngorongoro Serena Safari Lodge", "Lemala Ngorongoro Tented Camp"], 1),
          stay("Karatu", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge"], 1),
        ],
      },
    ],
    midRangePrices: [4150, 2600, 2300, 2150, 2000],
    luxuryPrices: [6800, 4250, 3950, 3800, 3650],
    priceNotes: ["Package E is priced for December to March, with the same 10 percent applied to 20 December to 10 January."],
    goodToKnow: ["Calving timing follows the rains and cannot be promised. Ndutu camps are small and fill quickly, so book early. From April to November the herds are elsewhere, and our Serengeti packages are a better fit."],
    faqs: [
      { question: "When is calving season?", answer: "Calving takes place on the southern plains from about December to March, usually peaking in the first months of the year. The timing follows the rains, so we cannot promise exact dates or births." },
      { question: "Can I swap Ndutu for another region in other months?", answer: "From April to November the herds are in other parts of the Serengeti. Our Serengeti packages are built around those regions, and we can add a crater morning to any of them." },
    ],
    addOns: craterAddOns,
    relatedPackages: ["4-day-serengeti-ngorongoro-safari", "7-day-ultimate-northern-tanzania-safari", "2-day-ngorongoro-crater-escape"],
    seo: {
      title: "5-Day Ndutu Calving Season and Ngorongoro Safari",
      description: "Witness calving season on the Ndutu plains, then descend into the Ngorongoro Crater. A 5-day private safari for December to March.",
    },
  }),
  makePackage({
    slug: "4-day-luxury-ngorongoro-rim-retreat",
    title: "4-Day Luxury Ngorongoro Rim Retreat",
    tagline: "Three nights above the crater.",
    overview: "A slow, indulgent way to experience Ngorongoro. Three nights on the rim, a private crater safari, a gentle highland day and time to simply enjoy where you are. It is built for celebrations, honeymoons and anyone who likes their safari with a view.",
    durationDays: 4,
    nights: 3,
    route: [{ id: "rim", label: "Ngorongoro Crater Rim", nights: 3 }],
    destinations: ["Ngorongoro"],
    collections: ["Luxury"],
    pace: "Relaxed",
    style: "Luxury and romance",
    badge: "Luxury retreat",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "Rim nights are cold, so pack warm layers.",
    highlights: ["Three nights on the crater rim", "A private crater safari", "A highland day with Olmoti and a Maasai visit, or a spa day", "Sundowners looking into the caldera", "A relaxed pace throughout."],
    bestFor: ["Honeymooners", "Anniversaries", "Travelers who value comfort"],
    days: [
      {
        title: "Arrival on the rim",
        intro: "There is no schedule today beyond arriving. You leave Arusha at a civilized hour, climb into the highlands and reach your lodge in time for lunch and a long afternoon on the terrace. The caldera lies below, sometimes crisp and clear, sometimes drifting in cloud, and both versions are worth watching with a drink in hand. Dinner is long and unhurried, because tomorrow's alarm is early and tonight deserves to be savored.",
        timeline: [
          "08:30 Private pick-up from your Arusha hotel or the airport.",
          "09:00 Depart for the highlands.",
          "11:00 An optional coffee stop at Mto wa Mbu.",
          "12:00 The climb up the escarpment into the highlands.",
          "13:30 Arrive at your rim lodge, with a welcome drink, check-in and lunch.",
          "15:00 Free time on the terrace, in the gardens or at the lodge spa.",
          "17:30 A sundowner on the rim, looking into the caldera.",
          "19:30 A long, relaxed dinner.",
        ],
        meals: ["L", "D"],
        overnight: "Crater rim lodge (premium for luxury, rim mid-range lodge for mid-range).",
        travelNote: "About 4 hours of driving.",
        highlights: ["A rim terrace view", "A leisurely arrival", "A sundowner above the caldera."],
      },
      {
        title: "A private crater safari",
        intro: "Today the crater is yours. Your private vehicle and guide join the quiet line at the gate, descend at first light and spend about six hours on the floor with no one hurrying you. Because the group is yours alone, you can stop for as long as you like and choose the order of the sights. You return to the rim by early afternoon for a long rest, an optional spa treatment and a slow dinner, which is the proper way to end a crater day.",
        timeline: [
          ...craterTimeline("Rim", "lodge"),
          "15:30 An optional spa treatment, a swim or time on the terrace.",
          "19:30 A slow dinner at the lodge.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Crater rim lodge, same as Day 1.",
        travelNote: "A short drive to the gate, about 6 hours on the crater floor.",
        highlights: ["A private descent", "No rush on the crater floor", "A long, restful afternoon."],
      },
      {
        title: "A day in the highlands",
        intro: "A retreat needs a day that belongs to you. Today you choose. The active option takes you across the highlands to Olmoti Crater for a short, ranger-led walk with big views, then to a respectful, consent-based Maasai cultural visit. The slow option keeps you at the lodge for spa treatments, a garden walk and a very long lunch. Either way, you finish with another sunset over the caldera and a dinner you do not have to rush.",
        timelineOptions: [
          {
            label: "Active option",
            timeline: [
              "07:30 Breakfast.",
              "08:30 Drive across the highland track toward Olmoti Crater.",
              "09:30 Olmoti viewpoint and a short ranger-led walk, about one hour.",
              "11:00 A Maasai cultural visit at a designated boma, one to two hours.",
              "13:00 Picnic lunch.",
              "14:30 Back at the lodge for a rest.",
              "17:30 Sunset on the rim.",
              "19:30 Dinner.",
            ],
          },
          {
            label: "Slow option",
            timeline: [
              "08:30 A late breakfast.",
              "10:00 A garden walk or a spa treatment.",
              "12:30 A long lunch.",
              "15:00 Free time on the terrace.",
              "17:30 Sunset on the rim.",
              "19:30 Dinner.",
            ],
          },
        ],
        meals: ["B", "L", "D"],
        overnight: "Crater rim lodge, same as Day 1.",
        travelNote: "A short drive for the active option, none for the slow option.",
        highlights: ["Your choice of day", "A highland walk or a spa day", "A second sunset above the crater."],
      },
      {
        title: "A last sunrise and the road home",
        intro: "Set an alarm for the last sunrise, because the rim is at its best at dawn, with the first light turning the caldera gold and cloud sliding off the walls. Coffee on the terrace, a slow breakfast and then a private drive back to Arusha, with a last stop at Mto wa Mbu if you like. Your guide will drop you at your hotel or the airport.",
        timeline: [
          "06:30 Coffee on the terrace for the last sunrise.",
          "08:00 Breakfast.",
          "09:30 Check-out and depart for Arusha.",
          "10:30 An optional stop at Mto wa Mbu.",
          "13:00 Arrive in Arusha, with drops at your hotel or the airport.",
        ],
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 3.5 to 4 hours of driving.",
        highlights: ["A golden rim sunrise", "A relaxed farewell", "A comfortable drive home."],
      },
    ],
    staysByTier: [
      {
        tier: "mid-range",
        segments: [stay("Crater rim", ["Rhino Lodge", "Ngorongoro Sopa Lodge"], 3)],
        note: "The Mid-range tier is a rim mid-range lodge stay.",
      },
      {
        tier: "luxury",
        segments: [stay("Crater rim", ["Ngorongoro Serena Safari Lodge", "Lemala Ngorongoro Tented Camp"], 3)],
        note: "The Luxury tier is a premium rim lodge.",
        upgrades: ["Ngorongoro Crater Lodge", "Entamanu Ngorongoro", "Lemala Osonjoi Lodge", "Ngorongoro Lodge, Meliá Collection"],
      },
    ],
    midRangePrices: [3800, 2450, 2150, 2050, 1900],
    luxuryPrices: [6150, 3900, 3650, 3500, 3350],
    goodToKnow: ["Rim nights are cold, so pack warm layers. Spa treatments are paid separately at the lodge. Empakaai is a full-day excursion and can be swapped in for Day 3, quoted with your proposal."],
    faqs: [
      { question: "Is the spa included?", answer: "Spa treatments are paid separately at the lodge. Your proposal can include them on request." },
      { question: "Is it cold on the rim?", answer: "Yes. The rim is high, and mornings and nights are cold and often misty all year. Bring warm layers, and most lodges provide extra bedding or heating." },
    ],
    addOns: [
      addOn("Spa treatments", "optional", "Paid separately at the lodge. Your proposal can include them on request."),
      addOn("Empakaai hike", "on-request", "Full-day excursion, quoted with your proposal."),
      addOn("Maasai cultural visit", "optional", "Included as an option on the active highland day."),
      ...craterAddOns,
    ],
    relatedPackages: ["2-day-ngorongoro-crater-escape", "5-day-ngorongoro-highlands-culture-walking-safari", "7-day-ultimate-northern-tanzania-safari"],
    seo: {
      title: "4-Day Luxury Ngorongoro Safari: Crater Rim Retreat",
      description: "Three nights on the Ngorongoro crater rim, a private crater safari and a highland day, with premium lodges and an unhurried pace.",
    },
  }),
  makePackage({
    slug: "5-day-ngorongoro-highlands-culture-walking-safari",
    title: "5-Day Ngorongoro Highlands, Culture and Walking Safari",
    cardImageExtension: "avif",
    tagline: "Beyond the game drive.",
    overview: "The crater is only one chapter. This safari adds a ranger-led walk at Empakaai, a respectful Maasai cultural visit, Olduvai Gorge and a lively village walk at Mto wa Mbu, all from a comfortable base on the rim.",
    durationDays: 5,
    nights: 4,
    route: [
      { id: "mto-wa-mbu", label: "Mto wa Mbu" },
      { id: "rim", label: "Ngorongoro Crater Rim", nights: 4 },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
      { id: "empakaai", label: "Empakaai Crater" },
      { id: "olduvai", label: "Olduvai Gorge" },
    ],
    destinations: ["Ngorongoro"],
    collections: ["Culture and walking"],
    pace: "Moderate to active",
    style: "Culture and walking",
    badge: "Culture and walking",
    bestMonths: [6, 7, 8, 9, 10],
    goodMonths: [1, 2, 3, 11, 12],
    season: "Year-round, with June to October best",
    seasonNote: "The Empakaai day is long. A ranger is required and included. We recommend the walk for ages 10 and over.",
    highlights: ["A crater descent", "An Empakaai crater hike with a ranger", "A Maasai cultural visit", "Olduvai Gorge and museum", "A Mto wa Mbu village walk", "Four nights on the rim."],
    bestFor: ["Curious travelers", "Walkers", "Families with older children"],
    days: [
      {
        title: "Mto wa Mbu and the rim",
        intro: "Your safari starts with a walk, not a drive. Mto wa Mbu is a lively farming town at the foot of the Rift Valley escarpment, with a busy market, banana farms and rice fields. A local guide leads you through it, and you hear how farming families live and why so many communities have settled here. After lunch you climb into the cool highlands and reach your rim lodge by mid-afternoon, with time for the terrace and a first look into the caldera.",
        timeline: [
          "07:30 Hotel pick-up in Arusha.",
          "08:00 Drive west across the Maasai steppe.",
          "10:00 A guided village walk in Mto wa Mbu, about 1.5 hours, through the market and the farms.",
          "11:45 Climb the escarpment into the highlands.",
          "13:00 Lunch at your rim lodge.",
          "14:00 Check in and rest.",
          "15:00 A walk in the lodge grounds or time on the terrace.",
          "17:30 Sunset on the rim.",
          "19:00 Dinner.",
        ],
        meals: ["L", "D"],
        overnight: "Crater rim lodge or similar.",
        travelNote: "About 3 to 4 hours of driving.",
        highlights: ["A village walk", "The cool highlands", "A first rim sunset."],
      },
      {
        title: "The crater",
        intro: "The crater is the headline, so it comes early, while you are fresh. You are at the gate when it opens, down the Seneto road by half past six and out on the floor for about six hours. By early afternoon you are back on the rim with a story for every kind of animal on the plains. The rest of the trip builds on this day, because from here you start meeting the people and the landscapes around the crater.",
        timeline: craterTimeline("Rim", "lodge"),
        meals: ["B", "L", "D"],
        overnight: "Crater rim lodge.",
        travelNote: "A short drive to the gate, about 6 hours on the crater floor.",
        highlights: ["A first-light descent", "About six hours on the floor", "A chance of black rhino, never guaranteed."],
      },
      {
        title: "Culture and origins",
        intro: "Today is about people and deep time. In the morning you visit a Maasai community at a designated cultural boma, where you are welcomed with songs, shown inside a home and invited to ask questions. The visit is arranged on the community's terms, with the fee paid directly to them and photography only with permission. After lunch you drive to Olduvai Gorge, where your guide tells the story of the Leakey family's discoveries and the early human relatives found here, then visit the small museum. It is the most thoughtful day of the safari.",
        timeline: [
          "07:30 Breakfast.",
          "08:30 A short drive to a designated Maasai cultural boma.",
          "09:00 A welcome with songs, then a visit to a home and a conversation about daily life, about one to two hours.",
          "10:45 The craft market, where you buy directly from the makers.",
          "11:30 Drive toward Olduvai Gorge, about an hour.",
          "13:00 Picnic lunch near the museum.",
          "13:45 A guided talk at the gorge viewpoint and a visit to the small museum, about 1.5 hours.",
          "15:30 Return to the lodge.",
          "19:00 Dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Crater rim lodge.",
        travelNote: "About 2 hours of driving in total.",
        highlights: ["A consent-based Maasai visit", "Olduvai Gorge and its museum", "The story of human origins."],
      },
      {
        title: "Empakaai Crater",
        intro: "This is the long, rewarding day. After an early breakfast you drive across the highlands, a long and bumpy trip that passes Maasai herders, moorland and drifting cloud. At the ranger post an armed ranger joins you, because this is real wildlife country. At the Empakaai rim the view drops about 300 meters to a deep lake, and you walk down through forest to the shore, where flamingos feed when conditions suit them. A picnic lunch by the water, a steady climb back and a long drive home make a day you will remember for the silence as much as the scenery.",
        timeline: [
          "06:00 Wake-up call.",
          "06:30 Early breakfast.",
          "07:00 Depart on the long, rough drive across the highlands, which can take several hours depending on where you stay.",
          "09:30 Collect your armed ranger at the ranger post.",
          "10:00 An optional stop at the Olmoti viewpoint.",
          "11:00 The Empakaai rim and your first view of the lake.",
          "11:30 The walk down through forest, about 30 to 40 minutes.",
          "12:15 Lakeside time, flamingos if the water suits them, and a picnic lunch.",
          "13:30 The climb back to the rim, about 45 to 60 minutes.",
          "14:30 Depart for the lodge.",
          "17:30 Arrive back at the lodge.",
          "19:00 Dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Crater rim lodge.",
        travelNote: "A long, rough drive each way. The walk is about 5 km round trip.",
        highlights: ["A ranger-led hike", "A lake inside a crater", "A day of silence and big views."],
      },
      {
        title: "Farewell to the highlands",
        intro: "A gentle last morning. Enjoy breakfast with one last view into the caldera, check out at a relaxed pace and let the highland road take you back to Arusha. Your guide can stop at Mto wa Mbu for a last coffee, and you reach the city by early afternoon.",
        timeline: [
          "07:00 Breakfast with a last view of the caldera.",
          "08:30 Check-out.",
          "09:00 Depart for Arusha.",
          "10:30 A coffee stop at Mto wa Mbu.",
          "12:30 Arrive in Arusha, with drops at your hotel or the airport.",
        ],
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 3.5 to 4 hours of driving.",
        highlights: ["A last caldera view", "A relaxed drive home", "Back in Arusha by early afternoon."],
      },
    ],
    staysByTier: [
      { tier: "mid-range", segments: [stay("Crater rim", ["Rhino Lodge", "Ngorongoro Sopa Lodge"], 4)] },
      { tier: "luxury", segments: [stay("Crater rim", ["Ngorongoro Serena Safari Lodge", "Lemala Ngorongoro Tented Camp"], 4)] },
    ],
    midRangePrices: [4650, 2950, 2650, 2500, 2350],
    luxuryPrices: [7750, 4900, 4600, 4450, 4300],
    goodToKnow: ["The Empakaai day is long. A ranger is required and included. We recommend the walk for ages 10 and over."],
    faqs: [
      { question: "How hard is the Empakaai hike?", answer: "It is moderate. The walk is about 5 km round trip, usually one to two hours, on a steep, well-kept path, and the climb back is the hardest part. A ranger is required, and we include the fee." },
      { question: "How is the Maasai visit run?", answer: "The visit takes place at a designated cultural boma, arranged with the community. Fees are paid directly to the community, photography is by permission only and there is time for conversation, not just a performance." },
    ],
    addOns: [
      addOn("Empakaai hike and ranger", "included", "Full-day, ranger-led walk."),
      addOn("Maasai cultural visit", "included", "Community visit fees are included."),
      addOn("Olduvai Gorge stop", "included", "Including the small museum."),
      ...nonCultureAddOns,
    ],
    relatedPackages: ["4-day-luxury-ngorongoro-rim-retreat", "7-day-ultimate-northern-tanzania-safari", "4-day-serengeti-ngorongoro-safari"],
    seo: {
      title: "5-Day Ngorongoro Highlands, Culture and Walking Safari",
      description: "The crater, an Empakaai hike, Olduvai Gorge and a respectful Maasai visit in one private highlands safari with a rim base.",
    },
  }),
  makePackage({
    slug: "6-day-tanzania-family-wildlife-safari",
    title: "6-Day Tanzania Family Wildlife Safari",
    cardImageExtension: "avif",
    tagline: "A safari at a child's pace.",
    overview: "Three parks, a pool and a day of nothing at all. The drives are shorter, the lodges are family friendly and the guide turns animal spotting into a game. A private vehicle means you can stop whenever small legs need it.",
    durationDays: 6,
    nights: 5,
    route: [
      { id: "arusha", label: "Arusha", nights: 1 },
      { id: "tarangire", label: "Tarangire National Park" },
      { id: "karatu", label: "Karatu", nights: 4 },
      { id: "manyara", label: "Lake Manyara National Park" },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
    ],
    destinations: ["Ngorongoro", "Tarangire", "Lake Manyara"],
    collections: ["Family"],
    pace: "Relaxed",
    style: "Family",
    badge: "Family friendly",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "Children aged 5 to 15 pay reduced fees, and prices shown are per adult. Child seats can be requested when you book.",
    highlights: ["A private vehicle just for your family", "Tarangire elephants and baobabs", "Lake Manyara's forest and monkeys", "The Ngorongoro Crater", "A rest day in Karatu", "Family-friendly lodges."],
    bestFor: ["Families with children", "Multigenerational groups"],
    days: [
      {
        title: "Arrival and a soft landing",
        intro: "The only job today is to arrive. Your driver meets you at the airport, the transfer to Arusha takes about an hour, and a family room and a pool are waiting. In the late afternoon your guide visits to say hello, explain how the days will work and play a first round of the wildlife spotting game with the children. Dinner is early and relaxed, because tomorrow the adventure begins.",
        timeline: [
          "Arrival at Kilimanjaro or Arusha airport and a meet-and-greet with your driver.",
          "Transfer to your Arusha hotel, about 1 hour from Kilimanjaro airport.",
          "Check in to a family room and enjoy lunch, the pool or a rest.",
          "17:00 Meet your guide for a relaxed briefing and a wildlife spotting game for children.",
          "19:00 An early family dinner.",
        ],
        meals: ["D"],
        overnight: "Arusha family hotel or similar, included.",
        travelNote: "About 1 hour of transfers.",
        highlights: ["A gentle start", "A pool and a family room", "Meeting your guide."],
      },
      {
        title: "Tarangire and the elephants",
        intro: "Tarangire is a wonderful first safari for children. The elephants are big, the baobab trees are funny and the river gives everyone something to watch. Your guide turns spotting into a game, with a point for every animal and a bonus for elephants with babies. A picnic lunch under a baobab gives small legs a rest, and a long afternoon drive ends with a gentle trip to Karatu and a family lodge.",
        timeline: [
          "08:00 Hotel pick-up and a relaxed start.",
          "08:30 Drive toward Tarangire, about 2 to 2.5 hours, with a snack stop.",
          "11:00 Enter the park and begin the game drive, with the elephant family game.",
          "13:00 Picnic lunch in the shade of a baobab.",
          "14:00 A slow afternoon drive along the river.",
          "15:45 Leave the park for Karatu, about 2 hours.",
          "17:45 Check in to your family lodge.",
          "18:30 An early dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Karatu family lodge or similar.",
        travelNote: "About 2.5 hours to the park, then about 2 hours to Karatu.",
        highlights: ["Elephant families", "Baobab trees", "A picnic under a baobab."],
      },
      {
        title: "Lake Manyara, a gentler day",
        intro: "Today is shorter and softer. Lake Manyara is close to Karatu, so there is no early alarm and no long drive. Monkeys and baboons make the forest a favorite with children, hippos give the lakeshore a cartoon quality and giraffes browse beside the road. By mid-afternoon you are back at the lodge for the pool, which is exactly where most children would rather be.",
        timeline: [
          "08:00 A relaxed breakfast.",
          "08:45 Drive to Lake Manyara National Park, about 40 minutes.",
          "09:30 A forest drive, watching for baboons and blue monkeys.",
          "11:00 The hippo pool and the lakeshore.",
          "12:30 Picnic lunch.",
          "13:30 A short loop for giraffe and elephants.",
          "14:30 Return to the lodge.",
          "15:30 Pool time and play.",
          "18:30 Dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Karatu family lodge or similar.",
        travelNote: "About 40 minutes each way.",
        highlights: ["Monkeys and baboons", "Hippos at the lakeshore", "A pool afternoon."],
      },
      {
        title: "The crater at a child's pace",
        intro: "The crater is the highlight, and it asks for an early alarm. Our advice is to pack warm layers, a blanket for the car and snacks, and to tell children it is a treasure hunt. Your guide plans extra pauses, keeps the commentary lively and watches the energy levels. By late morning the children have seen lions, hippos and buffalo, and you have a long afternoon at the lodge to rest. It is the hardest day of the trip, and the one they will talk about the longest.",
        timeline: craterTimeline("Karatu", "lodge", undefined, [
          "05:15 Wake-up with tea and coffee, and a breakfast box to eat on the move.",
          "Depart for the crater gate, about 45 to 60 minutes away, with extra snack stops.",
        ]),
        meals: ["B", "L", "D"],
        overnight: "Karatu family lodge.",
        travelNote: "About 45 to 60 minutes to the gate, about 6 hours on the floor.",
        highlights: ["A treasure hunt for lions", "A picnic with hippos", "A long afternoon rest."],
      },
      {
        title: "A slow day in Karatu",
        intro: "After three big days, today is intentionally slow. Sleep in, have a long breakfast and take a family tour of a coffee farm, where children can see how coffee is grown and roasted. The rest of the day belongs to the pool, the garden and board games. It is the rest day, and it makes the rest of the trip better.",
        timeline: [
          "08:00 A slow breakfast.",
          "09:30 A family-friendly coffee farm tour, about one to one and a half hours.",
          "11:30 Return to the lodge.",
          "12:30 Lunch.",
          "14:00 Free time for the pool, the garden and games.",
          "16:30 An optional short walk on the farm.",
          "18:30 Dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Karatu family lodge.",
        travelNote: "A short local drive only.",
        highlights: ["A coffee farm tour", "A rest day", "Pool and garden time."],
      },
      {
        title: "Home",
        intro: "A relaxed final morning. Breakfast is unhurried, the drive down the escarpment is a good time for a nap and a stop at Mto wa Mbu gives everyone a stretch and a snack. Your guide drops you at your hotel or the airport in Arusha by early afternoon.",
        timeline: [
          "08:00 Breakfast.",
          "09:30 Check-out and depart for Arusha.",
          "11:00 A snack stop at Mto wa Mbu.",
          "12:30 Arrive in Arusha, with drops at your hotel or the airport.",
        ],
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 3 hours of driving.",
        highlights: ["A relaxed farewell", "A nap on the road", "Back in Arusha by lunchtime."],
      },
    ],
    staysByTier: [
      {
        tier: "mid-range",
        segments: [
          stay("Arusha", ["A family-friendly Arusha hotel with a pool, named in your proposal"], 1),
          stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House"], 4),
        ],
      },
      {
        tier: "luxury",
        segments: [
          stay("Arusha", ["A family-friendly Arusha hotel with a pool, named in your proposal"], 1),
          stay("Karatu", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge"], 4),
        ],
      },
    ],
    midRangePrices: [3550, 2100, 1800, 1650, 1500],
    luxuryPrices: [6200, 3750, 3450, 3300, 3150],
    priceNotes: ["Prices shown are per adult. As a guide, on package H a child costs roughly $1,050 against $1,650 per adult for a family of four, mid-range."],
    goodToKnow: ["Children aged 5 to 15 pay reduced fees, and prices shown are per adult. Child seats can be requested when you book. We recommend the crater day for children who can manage an early start."],
    faqs: [
      { question: "Are children welcome?", answer: "Yes. We recommend this safari for children who can enjoy game drives, and your guide adapts the pace to their ages. Lodges have their own child policies, and we will confirm them when you book." },
      { question: "Do children pay full price?", answer: "No. Children aged 5 to 15 pay reduced park fees and share their parents' room, so their price is lower. Children under 5 travel free of park fees. We quote child prices with your proposal." },
    ],
    addOns: craterAddOns,
    relatedPackages: ["2-day-ngorongoro-crater-escape", "3-day-ngorongoro-tarangire-wildlife-safari", "7-day-ultimate-northern-tanzania-safari"],
    seo: {
      title: "6-Day Tanzania Family Safari: Tarangire to Ngorongoro",
      description: "A private family safari at a gentle pace: Tarangire, Lake Manyara and the Ngorongoro Crater, with child-friendly lodges.",
    },
  }),
  makePackage({
    slug: "7-day-ultimate-northern-tanzania-safari",
    title: "7-Day Ultimate Northern Tanzania Safari",
    tagline: "The whole northern circuit, without the rush.",
    overview: "Tarangire's elephants, Lake Manyara's forest, the Serengeti's plains and the Ngorongoro Crater in one well-paced week. Every destination gets enough time, and the route flows naturally from one to the next.",
    durationDays: 7,
    nights: 6,
    route: [
      { id: "tarangire", label: "Tarangire National Park" },
      { id: "karatu", label: "Karatu", nights: 1 },
      { id: "manyara", label: "Lake Manyara National Park" },
      { id: "serengeti", label: "Serengeti", nights: 2 },
      { id: "karatu-return", label: "Karatu", nights: 2 },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
    ],
    destinations: ["Ngorongoro", "Tarangire", "Lake Manyara", "Serengeti"],
    collections: ["With the Serengeti"],
    pace: "Moderate to active",
    style: "Flagship",
    badge: "Flagship",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "The Serengeti migration's location varies by season.",
    highlights: ["Four national parks and conservation areas", "Two nights in the Serengeti", "A full Serengeti day", "A crater morning", "An optional Olduvai stop and balloon safari", "Private 4x4 with pop-up roof."],
    bestFor: ["First-time Tanzania visitors", "Couples", "Anyone who wants the classic"],
    days: [
      {
        title: "Tarangire, where the baobabs stand guard",
        intro: "Your week begins in elephant country. Tarangire's baobab trees, golden grass and winding river make a gentle, beautiful introduction to a Tanzania safari, and your guide takes the time to teach you how to spot animals, from tracks to behavior. After a picnic lunch in the shade you drive on to Karatu, settle into your lodge and sleep well, because the days ahead get bigger.",
        timeline: tarangireTimeline,
        meals: ["L", "D"],
        overnight: "Karatu lodge.",
        travelNote: "About 2.5 hours to the park, about 6 hours of game viewing, then about 2 hours to Karatu.",
        highlights: ["Elephant herds", "Baobab trees", "A first safari lesson from your guide."],
      },
      {
        title: "The forest and the lake at Lake Manyara",
        intro: "A very different day. Lake Manyara packs forest, woodland, floodplain and lake into a narrow strip beneath the Rift Valley escarpment. Monkeys and baboons are everywhere, elephants move between the trees, and hippos and birds crowd the shore. The park is famous for its tree-climbing lions, which you may or may not see. It is a softer, shorter day that lets you rest before the long drive tomorrow.",
        timeline: manyaraTimeline,
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge.",
        travelNote: "About 40 minutes each way, about 5 hours in the park.",
        highlights: ["A groundwater forest", "Hippos and lakeshore birds", "A relaxed afternoon."],
      },
      {
        title: "Karatu to the Serengeti",
        intro: "Today you cross into the heart of the safari. You leave Karatu at sunrise, drive along the crater rim and cross the Ngorongoro Conservation Area to the Serengeti, where the road opens onto plains that seem to go on forever. Your guide can stop at Olduvai Gorge on the way. After Naabi Hill Gate you begin your first Serengeti game drive, and by evening you are in camp under an enormous sky.",
        timeline: karatuToSerengetiTimeline,
        meals: ["B", "L", "D"],
        overnight: "Serengeti tented camp or lodge.",
        travelNote: "About 5 to 6 hours of driving plus stops.",
        highlights: ["The crater rim", "Olduvai Gorge", "Your first Serengeti sunset."],
      },
      {
        title: "A full day in the Serengeti",
        intro: "The Serengeti is the centerpiece of this safari, and today it is all yours. You are out at first light, when the big cats are active, and your guide reads the plains as if they were a book. Lion prides rest on kopjes, cheetahs scan the grass and leopards, if you are lucky, doze in tall trees. If the herds are in the area, your guide takes you to them. You finish with a sundowner and dinner in camp. An optional sunrise balloon safari is available at extra cost.",
        timeline: serengetiFullTimeline,
        meals: ["B", "L", "D"],
        overnight: "Serengeti tented camp or lodge.",
        travelNote: "Game drives only.",
        highlights: ["Big cats and kopjes", "A full day on the plains", "A sundowner under the stars."],
      },
      {
        title: "Serengeti to the highlands",
        intro: "You leave the plains with a last sunrise drive, then head south through the scenery you crossed two days ago, now in a different light. The road climbs into the highlands, and by late afternoon you reach your lodge for a quiet evening. It is a travel day, but a beautiful one, with plenty of time to stop for photographs and the optional Olduvai Gorge visit.",
        timeline: serengetiToHighlandsTimeline,
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge or crater rim lodge, as your proposal specifies.",
        travelNote: "About 5 to 6 hours of driving plus stops.",
        highlights: ["A last Serengeti sunrise", "The scenic highland road", "A quiet evening before the crater."],
      },
      {
        title: "The Ngorongoro Crater",
        intro: "The finale of the wildlife week. You descend into the crater at first light and spend about six hours on the floor, in a landscape that feels like a different continent from the Serengeti. After days of open plains the crater is wonderfully concentrated, with lions, hyenas, buffalo, zebra, hippos and elephants all in one bowl, and, with patience, a black rhino. You return to the lodge in the afternoon to rest, because tomorrow is the journey home.",
        timelineOptions: [
          { label: "Starting in Karatu", timeline: craterTimeline("Karatu", "lodge") },
          { label: "Starting on the rim", timeline: craterTimeline("Rim", "lodge") },
        ],
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge or crater rim lodge.",
        travelNote: "About 45 to 60 minutes to the gate, about 6 hours on the floor.",
        highlights: ["A first-light descent", "Six hours on the crater floor", "A chance of black rhino, never guaranteed."],
      },
      {
        title: "Home",
        intro: "A gentle final morning. A slow breakfast, a coffee farm if you like and then the road down the escarpment to Arusha. Your guide stops at Mto wa Mbu for a last coffee, and drops you at your hotel or the airport by early afternoon, with a week of wildlife and a lot of new friends in the form of animals.",
        timeline: returnToArushaTimeline,
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 3 hours of driving.",
        highlights: ["A slow morning", "An optional coffee farm visit", "Back in Arusha by early afternoon."],
      },
    ],
    staysByTier: [
      {
        tier: "mid-range",
        segments: [
          stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 2),
          stay("Serengeti", ["Kati Kati Tented Camp", "Kubu Kubu Tented Lodge", "Serengeti Serena Safari Lodge"], 2),
          stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 2),
        ],
      },
      {
        tier: "luxury",
        segments: [
          stay("Karatu", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge"], 2),
          stay("Serengeti", ["Mbuzi Mawe Serena Camp", "Lemala Ewanjan", "Serengeti Pioneer Camp"], 2),
          stay("Karatu or crater rim", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge", "Ngorongoro Serena Safari Lodge", "Lemala Ngorongoro Tented Camp"], 2),
        ],
      },
    ],
    midRangePrices: [5500, 3450, 3050, 2850, 2650],
    luxuryPrices: [9150, 5750, 5350, 5150, 4950],
    goodToKnow: ["The balloon safari is optional and extra, from $590 per person. The Serengeti migration's location varies by season."],
    faqs: [
      { question: "Will we see the migration?", answer: "The herds move through the Serengeti ecosystem through the year, so where they are depends on your dates. Your guide plans the two Serengeti days around the best areas for the season, but no sighting or river crossing can be guaranteed." },
      { question: "Can we add a balloon safari?", answer: "Yes. A sunrise balloon safari is available on Day 4 from $590 per person, booked in advance." },
    ],
    addOns: [
      addOn("Sunrise balloon safari", "optional", "Available on Day 4, booked in advance.", "From $590 per person."),
      ...craterAddOns,
    ],
    relatedPackages: ["4-day-serengeti-ngorongoro-safari", "3-day-tarangire-manyara-ngorongoro", "5-day-ndutu-calving-ngorongoro-safari"],
    seo: {
      title: "7-Day Northern Tanzania Safari: Serengeti and Ngorongoro",
      description: "Tarangire, Lake Manyara, the Serengeti and the Ngorongoro Crater in one 7-day private safari, planned around you.",
    },
  }),
  makePackage({
    slug: "4-day-post-kilimanjaro-recovery-safari",
    title: "4-Day Post-Kilimanjaro Recovery Safari",
    tagline: "Earn your rest. A gentle safari after the summit.",
    overview: "You have spent days walking to the roof of Africa. Now let the wildlife come to you. This four-day safari starts later in the day, spends two nights in one comfortable lodge so you can unpack once, and lets Lake Manyara, the crater and Tarangire do the work. A private vehicle with a pop-up roof, a good bed and a hot dinner are all included.",
    durationDays: 4,
    nights: 3,
    route: [
      { id: "manyara", label: "Lake Manyara National Park" },
      { id: "karatu", label: "Karatu", nights: 2 },
      { id: "ngorongoro", label: "Ngorongoro Crater" },
      { id: "tarangire", label: "Tarangire National Park" },
      { id: "arusha", label: "Arusha", nights: 1 },
    ],
    routeEndpoints: { start: "Moshi", end: "Kilimanjaro International Airport or hotel" },
    destinations: ["Ngorongoro", "Tarangire", "Lake Manyara"],
    collections: ["After Kilimanjaro"],
    pace: "Relaxed",
    style: "After the climb",
    badge: "After the climb",
    bestMonths: [...allMonths],
    season: "Year-round",
    seasonNote: "Days 1 and 4 start late. The crater morning on Day 2 starts early, so go to bed on time.",
    highlights: ["Pick-up from your Moshi hotel", "A late first-day start", "Lake Manyara's forest and lakeshore", "A crater morning", "Tarangire's elephants", "Comfortable lodges and a private vehicle."],
    bestFor: ["Climbers finishing Kilimanjaro", "Travelers with tired legs and a few days to spare"],
    days: [
      {
        title: "From the mountain to Lake Manyara",
        intro: "Your legs have just done something extraordinary, and this safari knows it. There is no early alarm today. Your driver collects you from your Moshi hotel at a civilized hour, and the drive through the countryside is a good time to sleep or scroll through summit photos. After lunch at Mto wa Mbu you drive into Lake Manyara National Park for a gentle afternoon among monkeys, hippos and birds, then climb up to your lodge in Karatu for a hot shower, a soft bed and dinner.",
        timeline: [
          "09:00 Pick-up from your Moshi or Kilimanjaro-area hotel.",
          "10:30 Arrive in Arusha for a short briefing and a stop.",
          "11:00 Depart for Mto wa Mbu.",
          "13:00 Lunch at Mto wa Mbu.",
          "14:00 Lake Manyara National Park for a gentle game drive through the forest and along the lakeshore.",
          "16:45 Leave the park and drive up the escarpment to Karatu.",
          "17:30 Check in at your lodge, with time for a hot shower and a rest.",
          "19:00 Dinner.",
        ],
        meals: ["L", "D"],
        overnight: "Karatu lodge, mid-range or luxury.",
        travelNote: "About 1.5 hours to Arusha, about 2 hours to Mto wa Mbu, then a short drive to the park.",
        highlights: ["A late, gentle start", "Monkeys, hippos and birds", "A hot shower and a soft bed."],
      },
      {
        title: "The Ngorongoro Crater",
        intro: "This is the day with an early alarm, and it is worth it. You drive to the crater gate before dawn and descend as the first light spills across the caldera. About six hours on the floor take you through lions, hyenas, buffalo, zebra and hippos, with elephants in the fever trees and, with luck, a black rhino. After a picnic lunch you climb out and spend the afternoon resting at your lodge, which your legs will thank you for.",
        timeline: craterTimeline("Karatu", "lodge"),
        meals: ["B", "L", "D"],
        overnight: "Karatu lodge, same as Day 1.",
        travelNote: "About 45 to 60 minutes to the gate, about 6 hours on the floor.",
        highlights: ["A first-light descent", "A picnic with hippos", "A long afternoon rest."],
      },
      {
        title: "Tarangire on the way back",
        intro: "Today you head back toward Arusha through Tarangire, where baobab trees and elephant herds make a gentle, beautiful finish to the safari. The game drive is long enough to enjoy and short enough to leave your legs in good shape. You finish the day at a comfortable Arusha hotel, with a shower, a proper dinner and your own bed.",
        timeline: [
          "07:30 Breakfast and check-out.",
          "08:30 Depart Karatu for Tarangire, about 2 hours.",
          "10:30 Arrive at the park gate while your guide completes the formalities.",
          "11:00 Game drive along the Tarangire River valley, for elephants, giraffe, zebra and more.",
          "13:00 Picnic lunch in the shade of a baobab.",
          "14:00 An afternoon drive through open woodland.",
          "16:00 Leave the park for Arusha, about 2 to 2.5 hours.",
          "18:00 Check in at your Arusha hotel.",
          "19:30 Dinner.",
        ],
        meals: ["B", "L", "D"],
        overnight: "Arusha hotel, mid-range or luxury boutique.",
        travelNote: "About 2 hours to the park, about 2 to 2.5 hours to Arusha.",
        highlights: ["Elephant herds", "Baobab trees", "A comfortable Arusha hotel."],
      },
      {
        title: "Home or onward",
        intro: "A slow final morning with nowhere to be. Have breakfast, repack your bags and your summit certificate and take the transfer to the airport or your hotel in Moshi, or an onward flight to Zanzibar for beach time. Your guide helps with all of it.",
        timeline: [
          "08:00 Breakfast.",
          "09:30 A free morning, with optional shopping in Arusha.",
          "11:30 Transfer to Kilimanjaro International Airport, about 1 hour, or to your Moshi hotel, about 1.5 hours.",
        ],
        meals: ["B"],
        overnight: "None.",
        travelNote: "About 1 to 1.5 hours of transfers.",
        highlights: ["A slow morning", "Easy transfers", "Time for a beach if you like."],
      },
    ],
    staysByTier: [
      {
        tier: "mid-range",
        segments: [
          stay("Karatu", ["Plantation Lodge", "Ngorongoro Farm House", "Tloma Lodge", "Country Lodge Karatu"], 2),
          stay("Arusha", ["A comfortable Arusha hotel named in your proposal"], 1),
        ],
      },
      {
        tier: "luxury",
        segments: [
          stay("Karatu", ["Gibb's Farm", "Kitela Lodge", "Neptune Ngorongoro Luxury Lodge"], 2),
          stay("Arusha", ["A boutique Arusha hotel named in your proposal"], 1),
        ],
      },
    ],
    midRangePrices: [2650, 1600, 1350, 1200, 1050],
    luxuryPrices: [4100, 2500, 2250, 2100, 1950],
    goodToKnow: ["Days 1 and 4 start late. The crater morning on Day 2 starts early, so go to bed on time. If your legs are very tired, tell us, and we will add a rest day."],
    faqs: [
      { question: "Can you collect me from Moshi?", answer: "Yes. We collect you from your Moshi or Kilimanjaro-area hotel on Day 1, and drop you at the airport or your hotel on Day 4." },
      { question: "Is this safari suitable after a Kilimanjaro climb?", answer: "Yes. The first and last days start late, you unpack once, and the days alternate between short and long drives. The crater morning starts early, so rest well on Day 1. If you are very tired, we can add a rest day." },
    ],
    addOns: [
      ...craterAddOns,
      addOn("Kilimanjaro and safari combination", "optional", "See the climb and safari option."),
    ],
    relatedPackages: ["6-day-tanzania-family-wildlife-safari", "3-day-tarangire-manyara-ngorongoro", "2-day-ngorongoro-crater-escape"],
    relatedLink: { label: "Explore the climb and safari combination", href: "/kilimanjaro/climb-and-safari" },
    seo: {
      title: "4-Day Post-Kilimanjaro Safari: Manyara, Crater, Tarangire",
      description: "A gentle 4-day safari after your Kilimanjaro climb: Lake Manyara, the Ngorongoro Crater and Tarangire, with Moshi pick-up.",
    },
  }),
];

export const ngorongoroPackageHub = {
  eyebrow: "SAFARIS WITH NGORONGORO BUILT IN",
  title: "Our Ngorongoro Safaris",
  subtitle: "From a single night on the crater rim to a seven-day northern circuit, every safari is private, tailor-made and planned around you.",
  styleChips: [
    { label: "Short stays", href: "/safaris/packages?style=Short%20stays" },
    { label: "Luxury", href: "/safaris/packages?style=Luxury" },
    { label: "Family", href: "/safaris/packages?style=Family" },
    { label: "Culture and walking", href: "/safaris/packages?style=Culture%20and%20walking" },
    { label: "After Kilimanjaro", href: "/safaris/packages?style=After%20Kilimanjaro" },
    { label: "With the Serengeti", href: "/safaris/packages?style=With%20the%20Serengeti" },
  ],
  featuredSlugs: [
    "2-day-ngorongoro-crater-escape",
    "3-day-ngorongoro-tarangire-wildlife-safari",
    "4-day-serengeti-ngorongoro-safari",
    "4-day-luxury-ngorongoro-rim-retreat",
    "7-day-ultimate-northern-tanzania-safari",
  ],
  compareTitle: "Compare all 10",
  compareCaption: "Prices are per person in US dollars, two travelers sharing, mid-range accommodation, private vehicle.",
  compareHeaders: ["Safari", "Days", "Style", "From price (2 sharing, mid-range)", "Best months", "View"],
  primaryLink: { label: "Browse all 10 Ngorongoro safaris", href: "/safaris/packages?destination=ngorongoro" },
  secondaryLink: { label: "Short on time? See the crater day trip", href: "/day-trips/ngorongoro-crater" },
  callout: {
    text: "Not sure which one fits? Tell us your dates and how you like to travel, and we will recommend one.",
    label: "Plan my safari",
    href: "/plan-your-safari?type=Safari",
  },
} as const;

export const ngorongoroRelatedPackageSlugs = {
  crater: [
    "2-day-ngorongoro-crater-escape",
    "3-day-ngorongoro-tarangire-wildlife-safari",
    "3-day-tarangire-manyara-ngorongoro",
    "4-day-luxury-ngorongoro-rim-retreat",
  ],
  empakaai: ["5-day-ngorongoro-highlands-culture-walking-safari"],
  olduvai: [
    "4-day-serengeti-ngorongoro-safari",
    "5-day-ndutu-calving-ngorongoro-safari",
    "5-day-ngorongoro-highlands-culture-walking-safari",
    "7-day-ultimate-northern-tanzania-safari",
  ],
  maasai: ["5-day-ngorongoro-highlands-culture-walking-safari"],
  stays: [
    "2-day-ngorongoro-crater-escape",
    "4-day-luxury-ngorongoro-rim-retreat",
    "5-day-ngorongoro-highlands-culture-walking-safari",
    "7-day-ultimate-northern-tanzania-safari",
  ],
} as const;

export const ngorongoroPackagesBySlug = new Map(
  ngorongoroPackages.map((item) => [item.slug, item]),
);

export function getNgorongoroRelatedPackages(collection: keyof typeof ngorongoroRelatedPackageSlugs) {
  return ngorongoroRelatedPackageSlugs[collection].flatMap((slug) => {
    const item = ngorongoroPackagesBySlug.get(slug);
    return item ? [item] : [];
  });
}

export function getNgorongoroPackageBySlug(slug: string) {
  return ngorongoroPackagesBySlug.get(slug);
}
