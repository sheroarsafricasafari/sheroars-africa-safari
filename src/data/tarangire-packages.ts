import {
  packageMonths,
  packageGroupSizes,
  packageSeasons,
  tarangirePackageSchema,
  type PackageGroupSize,
  type PackageMonth,
  type PackagePricing,
  type PackageSeason,
  type PackageTier,
  type TarangirePackage,
} from "@/types/tarangire-package";

const actions = (...items: [string, string][]) =>
  items.map(([time, text]) => ({ time, text }));

const day = (
  dayNumber: number,
  title: string,
  label: string,
  activities: ReturnType<typeof actions>,
  meals: ("Breakfast" | "Lunch" | "Dinner")[],
  overnight: string,
  route?: string,
  driveTime?: string,
) => ({ day: dayNumber, title, label, activities, meals, overnight, route, driveTime });

const commonInclusions = [
  "Pick-up and drop-off at Kilimanjaro International Airport or an Arusha hotel",
  "Private 4x4 safari vehicle with pop-up roof and a window seat for every guest",
  "Professional English-speaking driver-guide",
  "Park, concession and entry fees listed in the itinerary",
  "Accommodation as stated, with full board where included",
  "Bottled drinking water during game drives",
  "Government taxes, VAT, fuel and vehicle costs",
];

const commonExclusions = [
  "International and domestic flights",
  "Tanzania visa",
  "Travel and medical insurance",
  "Guide and camp crew tips",
  "Alcoholic and soft drinks at lodges",
  "Laundry and personal items",
  "Optional activities not listed in the itinerary",
  "Government fee increases after booking",
];

const seasonsNote =
  "Low season runs from 16 March to 15 May and 1 November to 19 December. High season runs from 16 May to 30 June and 6 January to 15 March. Peak season runs from 1 July to 31 October and 20 December to 5 January. Tarangire is at its best from July to October, when wildlife gathers around the river and swamps.";

const faqBase = [
  {
    question: "When is the best time to visit Tarangire?",
    answer:
      "June to October is the dry season, when elephants and other wildlife gather near the Tarangire River. The green season is quieter and rewarding for birding. Wildlife sightings vary, and no sighting can be guaranteed.",
  },
  {
    question: "How far is Tarangire from Arusha?",
    answer: "The park is about 140 km from Arusha, roughly 2.5 to 3 hours by road.",
  },
  {
    question: "Will we see elephants?",
    answer:
      "Tarangire is known for its elephant herds, especially in the dry season. Wildlife is free-roaming, so sightings cannot be guaranteed.",
  },
  {
    question: "Are the safari vehicles private?",
    answer:
      "These journeys are planned with a private 4x4, a pop-up roof and a window seat for each guest.",
  },
  {
    question: "What is included in the price?",
    answer:
      "The price includes the listed park fees, private vehicle and guide, transfers, meals, accommodation where shown, and drinking water. See the Included section for the full list.",
  },
  {
    question: "Can children join a Tarangire safari?",
    answer:
      "Children can join many game drives, but the best itinerary depends on their ages and the camp's rules. Tell us their ages when you enquire so we can confirm a suitable plan.",
  },
  {
    question: "Do you offer hot-air balloon safaris in Tarangire?",
    answer:
      "Hot-air balloon safaris operate in the Serengeti, not Tarangire. Ask us about adding a Serengeti extension to your Tanzania safari.",
  },
];

const makeFaqs = (question: string, answer: string) => [
  ...faqBase,
  { question, answer },
];

const galleryImages = [
  { src: "/images/safaris/hub/tarangire.jpeg", alt: "Elephants beneath baobab trees in golden light." },
  { src: "/images/destinations/tarangire.jpeg", alt: "An elephant herd walking along a Tarangire track." },
  { src: "/images/safaris/4-day-tarangire-serengeti-ngorongoro.jpg", alt: "A safari guest photographing an elephant from a vehicle." },
  { src: "/images/safaris/3-day-tarangire-manyara-ngorongoro.webp", alt: "A lion resting in a tree during a safari." },
];

const galleryFor = (slug: string) => {
  const start = slug.length % galleryImages.length;
  return Array.from({ length: 3 }, (_, index) => galleryImages[(start + index) % galleryImages.length]);
};

const estimateNote =
  "Estimated 2026 to 2027 rates per person sharing in USD. Your written quote confirms the final price.";

const standardPricing = (
  priceFrom: number,
  standard: Record<PackageGroupSize, number>,
): PackagePricing => ({
  currency: "USD",
  perPerson: true,
  basis: "sharing",
  standard,
  priceFrom,
  note: estimateNote,
});

const tieredPricing = (
  priceFrom: number,
  tiers: NonNullable<PackagePricing["tiers"]>,
): PackagePricing => ({
  currency: "USD",
  perPerson: true,
  basis: "sharing",
  tiers,
  priceFrom,
  note: estimateNote,
});

const packages: TarangirePackage[] = [
  {
    slug: "tarangire-day-safari",
    name: "Tarangire Day Safari",
    shortName: "Day Safari",
    duration: "1 Day",
    days: 1,
    nights: 0,
    tagline: "One unforgettable day among Tanzania's great elephant herds.",
    hook:
      "Short on time but not willing to miss the wild? Leave Arusha at sunrise, spend a full day under the baobabs with elephants, and be back for dinner. It is an easy way to experience a real African safari.",
    bestFor: [
      "Travellers staying in Arusha",
      "Cruise or Kilimanjaro-climb extensions",
      "A first taste of safari",
      "Families with limited time",
    ],
    style: "Day trip, private 4x4",
    accommodationSummary: "No overnight stay. Return to Arusha the same evening.",
    highlights: [
      "Private 4x4 with pop-up roof and a guide who knows the park",
      "Giant baobabs and the Tarangire River",
      "Elephants, zebra, wildebeest, giraffe and other wildlife",
      "Picnic lunch at a designated scenic site",
      "Return to Arusha by early evening",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire and back", "Day trip", actions(
        ["06:30-07:00", "Pick-up from your Arusha hotel by your guide in a private 4x4. Cold water is on board."],
        ["07:00-09:45", "Scenic drive southwest through Maasai steppe, with photo stops in baobab-studded country, about 140 km and 2.5 to 3 hours."],
        ["09:45", "Reach Tarangire main gate. Your guide completes park formalities while you enjoy a first look at the landscape."],
        ["10:00-13:00", "Morning game drive along the Tarangire River loop, looking for elephants, giraffe, buffalo, impala, eland and birds."],
        ["13:00-14:00", "Picnic lunch at a designated site with views over the swamps."],
        ["14:00-16:00", "Afternoon game drive across open plains and baobab woodland, looking for lions, leopard and raptors."],
        ["16:00", "Depart through the gate for the return drive to Arusha."],
        ["18:30-19:00", "Drop-off at your hotel. End of safari."],
      ), ["Lunch"], "Arusha, own accommodation", "Arusha to Tarangire and return", "About 2.5 to 3 hours each way"),
    ],
    inclusions: [
      ...commonInclusions,
      "Tarangire park entry fee for one day",
      "Picnic lunch box and bottled water",
    ],
    exclusions: [...commonExclusions, "Dinner and overnight accommodation in Arusha"],
    heroImage: "/images/safaris/hub/tarangire.jpeg",
    heroAlt: "Elephants beneath baobab trees in golden light",
    cardImage: "/images/destinations/tarangire.jpeg",
    cardAlt: "An elephant herd walking along a Tarangire track",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: standardPricing(160, { 1: 390, 2: 250, 4: 180, 6: 160 }),
    seasonsNote,
    faqs: makeFaqs(
      "Can I do this safari as a day trip from Arusha?",
      "Yes. This private day trip leaves Arusha early and returns in the evening. Road and park conditions can affect the schedule.",
    ),
    gallery: galleryFor("tarangire-day-safari"),
    related: ["tarangire-elephant-escape", "tarangire-lake-manyara-classic"],
    parks: ["Tarangire National Park"],
    tags: ["Day trip", "First safari", "Family"],
    pace: "Active",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire Day Safari from Arusha",
      description: "Take a private Tarangire day safari from Arusha with a guide, park entry, picnic lunch and a full day among baobabs and wildlife.",
      keywords: ["Tarangire day trip from Arusha", "Tarangire safari", "private safari Tanzania"],
    },
  },
  {
    slug: "tarangire-elephant-escape",
    name: "Tarangire Elephant Escape",
    shortName: "Elephant Escape",
    duration: "2 Days / 1 Night",
    days: 2,
    nights: 1,
    tagline: "Sleep in the elephants' neighbourhood and wake to the sounds of the bush.",
    hook:
      "One night changes everything. Stay close to the park, watch the light turn the baobabs gold at sunset, hear the bush after dark, and enter the park at first light. This short escape gives you more time to enjoy Tarangire at a gentler pace.",
    bestFor: ["Couples", "First-time safari travellers", "Short stays", "Kilimanjaro or Zanzibar add-ons"],
    style: "Private 4x4, lodge or tented camp",
    accommodationSummary: "One night in Tarangire, with Comfort and Luxury styles.",
    highlights: [
      "Overnight close to the park for early and late wildlife light",
      "Game drives before dusk and at sunrise",
      "Elephant herds, baobab sunsets and sundowner views",
      "Time to relax at camp between drives",
      "Hot dinner beneath the evening sky",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire National Park", "Arrival day", actions(
        ["07:30", "Pick-up from your Arusha hotel. Meet your guide for a briefing, with bottled water and snacks on board."],
        ["07:30-10:30", "Drive to Tarangire, about 3 hours, passing Maasai villages and baobab country. Stop for photos and comfort breaks."],
        ["10:30", "Enter the park and begin a game drive along the Tarangire River."],
        ["13:00", "Lunch at your lodge or camp, followed by rest and a swim or terrace time where available."],
        ["16:00", "Afternoon game drive, looking for elephants, lions, giraffe and other wildlife."],
        ["18:30", "Return for sundowners. Dinner and overnight."],
      ), ["Lunch", "Dinner"], "Tarangire lodge or tented camp", "Arusha to Tarangire", "About 3 hours"),
      day(2, "Tarangire game drive and return to Arusha", "Departure day", actions(
        ["06:15", "Wake-up call with tea and coffee."],
        ["06:45-09:45", "Early-morning game drive in the cool light."],
        ["10:00", "Breakfast, or a bush breakfast if confirmed with the camp, then check-out."],
        ["10:45", "Final short game drive on the way out of the park."],
        ["11:30", "Depart Tarangire for Arusha."],
        ["14:30", "Lunch stop at a roadside restaurant, at own cost."],
        ["15:30-16:00", "Drop-off at your Arusha hotel or Kilimanjaro International Airport. End of safari."],
      ), ["Breakfast"], "None", "Tarangire to Arusha", "About 3 hours"),
    ],
    inclusions: [...commonInclusions, "One night full board at the selected accommodation style", "Three game drives"],
    exclusions: [...commonExclusions, "Roadside lunch on day two"],
    heroImage: "/images/destinations/tarangire.jpeg",
    heroAlt: "An elephant herd walking along a Tarangire track",
    cardImage: "/images/safaris/hub/tarangire.jpeg",
    cardAlt: "Elephants beneath baobab trees in golden light",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: tieredPricing(470, {
      comfort: {
        low: { 1: 1000, 2: 650, 4: 520, 6: 470 },
        high: { 1: 1120, 2: 730, 4: 590, 6: 550 },
        peak: { 1: 1190, 2: 780, 4: 640, 6: 590 },
      },
      luxury: {
        low: { 1: 1380, 2: 910, 4: 770, 6: 720 },
        high: { 1: 1620, 2: 1070, 4: 930, 6: 880 },
        peak: { 1: 1830, 2: 1200, 4: 1070, 6: 1020 },
      },
    }),
    seasonsNote,
    faqs: makeFaqs(
      "Can I add a special celebration?",
      "Tell us what you are celebrating when you enquire. We can discuss suitable arrangements and confirm what is available for your dates.",
    ),
    gallery: galleryFor("tarangire-elephant-escape"),
    related: ["tarangire-day-safari", "tarangire-silale-baobab-photography-safari"],
    parks: ["Tarangire National Park"],
    tags: ["Short escape", "Couples", "First safari", "Honeymoon-friendly"],
    pace: "Relaxed",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire Elephant Escape, 2-Day Safari",
      description: "Stay one night near Tarangire and enjoy early and late game drives, full-board accommodation and a private 4x4 safari from Arusha.",
      keywords: ["2 day Tarangire safari", "Tarangire elephant safari", "private safari Tanzania"],
    },
  },
  {
    slug: "tarangire-budget-camping-safari",
    name: "Tarangire Budget Camping Adventure",
    shortName: "Budget Camping",
    duration: "3 Days / 2 Nights",
    days: 3,
    nights: 2,
    tagline: "Real bush, real value. Sleep under the stars for a fraction of the cost.",
    hook:
      "Camping inside Tarangire puts you close to the sounds and rhythms of the bush. Our camping safari is fully catered, with a private cook, comfortable mattresses and a camp crew, so you can enjoy the adventure without managing the camp yourself.",
    bestFor: ["Budget-minded travellers", "Young adventurers", "Backpackers", "Small groups and photographers"],
    style: "Private 4x4, mobile camping",
    accommodationSummary: "Two nights in fully equipped tents at a public campsite.",
    highlights: [
      "Camp inside the national park",
      "Private cook, camp crew, dome tents and bedding",
      "Three days of game viewing, including quieter southern areas when conditions allow",
      "Campfire dinners and stargazing",
      "A value-focused Tarangire safari with a private vehicle",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire National Park", "Arrival day", actions(
        ["07:30", "Pick-up from your Arusha hotel. Meet your guide and camp crew, and load supplies."],
        ["10:30", "Reach Tarangire gate. Game drive through baobab country toward camp."],
        ["13:00", "Hot lunch prepared by your cook at a scenic picnic stop or camp."],
        ["15:30", "Afternoon game drive along the river."],
        ["18:00", "Arrive at camp. Tents and hot water are ready, and the campfire is lit."],
        ["19:30", "Three-course dinner by lantern, with time for stargazing."],
      ), ["Lunch", "Dinner"], "Tarangire public campsite, dome tents", "Arusha to Tarangire", "About 3 hours"),
      day(2, "Full day exploring Tarangire", "Full safari day", actions(
        ["06:00", "Wake-up with hot coffee and tea at the campfire."],
        ["06:30-10:30", "Early game drive in the golden light."],
        ["10:30", "Cooked breakfast at camp, then rest in the shade."],
        ["13:00", "Lunch at camp or a picnic site in the park."],
        ["15:00-18:00", "Afternoon game drive through different habitats. The route depends on current conditions."],
        ["19:30", "Campfire dinner and stories from your guide."],
      ), ["Breakfast", "Lunch", "Dinner"], "Tarangire public campsite"),
      day(3, "Last game drive and return to Arusha", "Departure day", actions(
        ["06:00", "Wake-up call and coffee."],
        ["06:30-09:30", "Final sunrise game drive."],
        ["09:30", "Breakfast and break camp."],
        ["10:30", "Depart the park for Arusha."],
        ["14:00-14:30", "Drop-off at your Arusha hotel or the airport. End of safari."],
      ), ["Breakfast"], "None", "Tarangire to Arusha", "About 3 hours"),
    ],
    inclusions: [
      ...commonInclusions,
      "Two nights camping with tents, mattresses, bedding, chairs and tables",
      "Private cook and camp crew",
      "Public campsite fees",
    ],
    exclusions: [...commonExclusions, "Sleeping bags if not provided by the camp"],
    heroImage: "/images/safaris/hub/tarangire.jpeg",
    heroAlt: "Elephants beneath baobab trees in golden light",
    cardImage: "/images/destinations/tarangire.jpeg",
    cardAlt: "An elephant herd walking along a Tarangire track",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: standardPricing(600, { 1: 1350, 2: 870, 4: 660, 6: 600 }),
    seasonsNote,
    faqs: makeFaqs(
      "What is provided at the campsite?",
      "The package includes two nights of camping with tents, mattresses, bedding, chairs, tables, a cook and camp crew. Confirm any personal sleeping equipment needs before travel.",
    ),
    gallery: galleryFor("tarangire-budget-camping"),
    related: ["tarangire-day-safari", "tarangire-elephant-escape"],
    parks: ["Tarangire National Park"],
    tags: ["Budget", "Camping", "Photography"],
    pace: "Active",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire Camping Safari, 3 Days",
      description: "Explore Tarangire on a private 3-day camping safari with a cook, camp crew, two nights in the park and game drives in varied habitats.",
      keywords: ["Tarangire camping safari", "3 day Tarangire safari", "Tarangire safari"],
    },
  },
  {
    slug: "tarangire-lake-manyara-classic",
    name: "Tarangire and Lake Manyara Classic",
    shortName: "Tarangire and Manyara",
    duration: "3 Days / 2 Nights",
    days: 3,
    nights: 2,
    tagline: "Elephants, baobabs, tree-climbing lions and a soda lake, all in three days.",
    hook:
      "Two parks, two different worlds. Spend your first day with Tarangire's elephant herds, then travel to Lake Manyara, where forest, hippo pools and seasonal flamingos make a striking contrast. It is a classic introduction to safari and a useful start before Ngorongoro or the Serengeti.",
    bestFor: ["First-time visitors", "Couples", "Families with older children", "Northern circuit travellers"],
    style: "Private 4x4, lodges and tented camps",
    accommodationSummary: "One night in Tarangire and one night in the Lake Manyara area.",
    highlights: [
      "Elephant herds and baobabs in Tarangire",
      "Hippo pools, forest and seasonal flamingos at Lake Manyara",
      "Two distinct park ecosystems",
      "Birdlife across the route",
      "A private journey with listed park fees included",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire National Park", "Arrival day", actions(
        ["07:30", "Pick-up from your Arusha hotel and meet your guide."],
        ["10:30", "Enter Tarangire and begin a game drive along the river."],
        ["13:00", "Lunch at your lodge or tented camp."],
        ["16:00", "Afternoon game drive among elephants, giraffe, zebra, lions and baobabs."],
        ["18:30", "Return to camp. Dinner and overnight."],
      ), ["Lunch", "Dinner"], "Tarangire lodge or camp", "Arusha to Tarangire", "About 3 hours"),
      day(2, "Tarangire to Lake Manyara National Park", "Transfer and game drive", actions(
        ["06:30-09:30", "Early game drive in Tarangire."],
        ["09:30", "Breakfast at camp and check-out."],
        ["10:15", "Depart for Lake Manyara, about 1.5 hours. Stop at Mto wa Mbu for photos."],
        ["13:00", "Lunch at your Manyara-area lodge."],
        ["14:30-17:30", "Afternoon game drive for hippo, baboons, blue monkeys, buffalo, giraffe and seasonal flamingos."],
        ["18:30", "Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Lake Manyara area, Mto wa Mbu or escarpment", "Tarangire to Lake Manyara", "About 1.5 hours"),
      day(3, "Lake Manyara morning and return to Arusha", "Departure day", actions(
        ["07:00", "Breakfast."],
        ["08:00", "Optional extra game drive or cultural tour in Mto wa Mbu, quoted separately if available."],
        ["10:00", "Depart for Arusha, about 2.5 hours."],
        ["13:00", "Lunch en route at a roadside restaurant, at own cost."],
        ["13:30-14:00", "Drop-off at your Arusha hotel or JRO. End of safari."],
      ), ["Breakfast"], "None", "Lake Manyara to Arusha", "About 2.5 hours"),
    ],
    inclusions: [...commonInclusions, "Two nights full board", "Tarangire and Lake Manyara park fees"],
    exclusions: [...commonExclusions, "Optional Mto wa Mbu tour and roadside lunch on day three"],
    heroImage: "/images/safaris/3-day-tarangire-manyara-ngorongoro.webp",
    heroAlt: "A lion resting in a tree during a safari",
    cardImage: "/images/destinations/tarangire.jpeg",
    cardAlt: "An elephant herd walking along a Tarangire track",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: tieredPricing(690, {
      comfort: {
        low: { 1: 1500, 2: 960, 4: 760, 6: 690 },
        high: { 1: 1650, 2: 1060, 4: 860, 6: 790 },
        peak: { 1: 1750, 2: 1130, 4: 920, 6: 850 },
      },
      luxury: {
        low: { 1: 2060, 2: 1330, 4: 1120, 6: 1050 },
        high: { 1: 2360, 2: 1540, 4: 1330, 6: 1260 },
        peak: { 1: 2630, 2: 1720, 4: 1510, 6: 1440 },
      },
    }),
    seasonsNote,
    faqs: makeFaqs(
      "Can I add Ngorongoro Crater?",
      "Yes. This route can be extended to Ngorongoro Crater or the Serengeti. Ask us to adjust the duration and accommodation.",
    ),
    gallery: galleryFor("tarangire-lake-manyara-classic"),
    related: ["tarangire-family-adventure-safari", "tarangire-manyara-ngorongoro-circuit"],
    parks: ["Tarangire National Park", "Lake Manyara National Park"],
    tags: ["Short escape", "First safari", "Couples", "Family"],
    pace: "Moderate",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire and Lake Manyara Safari, 3 Days",
      description: "Combine Tarangire elephants and baobabs with Lake Manyara forest and wildlife on a 3-day private Tanzania safari.",
      keywords: ["Tarangire and Lake Manyara safari", "3 day Tarangire safari", "Tanzania safari packages"],
    },
  },
  {
    slug: "tarangire-walking-night-safari",
    name: "Tarangire Walking and Night Safari",
    shortName: "Walking and Night Safari",
    duration: "3 Days / 2 Nights",
    days: 3,
    nights: 2,
    tagline: "Step out of the vehicle. Hear the bush. Meet it on foot.",
    hook:
      "Some experiences happen outside a car. On this safari, follow animal signs with a ranger and guide, learn to read tracks and termite mounds, and take a night drive in a community wildlife area. Staying near the park allows time for activities that are not permitted inside Tarangire itself.",
    bestFor: ["Return safari-goers", "Nature lovers", "Photographers", "Adventurous couples"],
    style: "Private 4x4, camp in a Wildlife Management Area",
    accommodationSummary: "Two nights in a tented camp in the Burunge or Randilen area.",
    highlights: [
      "Guided bush walks with a ranger and expert guide",
      "Night game drive in a Wildlife Management Area",
      "Two game drives inside Tarangire National Park",
      "Quiet camps with bush views",
      "Community conservation fees included as listed",
    ],
    itinerary: [
      day(1, "Arusha to your Burunge bush camp", "Arrival day", actions(
        ["07:30", "Pick-up from your Arusha hotel."],
        ["10:30", "Arrive at camp in the Wildlife Management Area. Welcome drinks and lunch."],
        ["12:30", "Rest or optional swim, where available."],
        ["15:30", "Guided bush walk with a ranger, about 2 to 3 hours, to learn about tracks, birds, trees and small wildlife."],
        ["18:30", "Sundowners on the plains. Dinner and overnight."],
      ), ["Lunch", "Dinner"], "Bush camp in Burunge or Randilen WMA", "Arusha to Burunge or Randilen", "About 3 hours"),
      day(2, "Full day in Tarangire and a night drive", "Full safari day", actions(
        ["06:00", "Wake-up and light breakfast."],
        ["06:30", "Enter Tarangire National Park for a full-day game drive with picnic breakfast and lunch."],
        ["16:30", "Depart the park."],
        ["17:30", "Rest, shower and refresh at camp."],
        ["19:30", "Dinner by the campfire."],
        ["21:00", "Night game drive in the WMA, about 1.5 hours, looking for nocturnal wildlife."],
      ), ["Breakfast", "Lunch", "Dinner"], "Bush camp"),
      day(3, "Morning walk and return to Arusha", "Departure day", actions(
        ["06:30", "Optional sunrise walk, subject to availability."],
        ["09:00", "Breakfast and check-out."],
        ["09:45", "Depart for Arusha."],
        ["12:45-13:30", "Drop-off in Arusha or JRO. End of safari."],
      ), ["Breakfast"], "None", "Bush camp to Arusha", "About 3 hours"),
    ],
    inclusions: [
      ...commonInclusions,
      "Two nights full board at a tented camp",
      "Walking and night-drive activities with the confirmed camp ranger",
      "Wildlife Management Area and conservation fees as listed",
    ],
    exclusions: [...commonExclusions, "Activities not confirmed by the selected camp"],
    heroImage: "/images/safaris/hub/tarangire.jpeg",
    heroAlt: "Elephants beneath baobab trees in golden light",
    cardImage: "/images/destinations/tarangire.jpeg",
    cardAlt: "An elephant herd walking along a Tarangire track",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: tieredPricing(790, {
      comfort: {
        low: { 1: 1640, 2: 1070, 4: 860, 6: 790 },
        high: { 1: 1820, 2: 1180, 4: 980, 6: 910 },
        peak: { 1: 1950, 2: 1280, 4: 1070, 6: 1000 },
      },
      luxury: {
        low: { 1: 2300, 2: 1510, 4: 1300, 6: 1230 },
        high: { 1: 2680, 2: 1760, 4: 1550, 6: 1480 },
        peak: { 1: 2960, 2: 1940, 4: 1740, 6: 1670 },
      },
    }),
    seasonsNote,
    faqs: makeFaqs(
      "Where do the walking and night activities take place?",
      "These activities take place in the selected Wildlife Management Area, not inside Tarangire National Park. Availability and operating rules are confirmed with the camp.",
    ),
    gallery: galleryFor("tarangire-walking-night"),
    related: ["tarangire-elephant-escape", "tarangire-silale-baobab-photography-safari"],
    parks: ["Tarangire National Park", "Burunge or Randilen Wildlife Management Area"],
    tags: ["Walking", "Night drive", "Active", "Photography"],
    pace: "Active",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire Walking and Night Safari, 3 Days",
      description: "Explore Tarangire and a nearby Wildlife Management Area on foot and after dark with a private guide and confirmed camp activities.",
      keywords: ["Tarangire walking safari", "Tarangire night game drive", "private safari Tanzania"],
    },
  },
  {
    slug: "tarangire-silale-baobab-photography-safari",
    name: "Silale Swamp and Baobab Photography Safari",
    shortName: "Silale Photography",
    duration: "4 Days / 3 Nights",
    days: 4,
    nights: 3,
    tagline: "Where the elephants outnumber the vehicles.",
    hook:
      "Most visitors stay on the northern loop. This journey heads south toward Silale Swamp and Lake Burunge, where open landscapes and wildlife create rewarding photographic opportunities. The photo-focused vehicle includes window seats and bean bags, with a guide briefed on positioning for the light.",
    bestFor: ["Photographers", "Wildlife enthusiasts", "Repeat visitors", "Travellers seeking quieter circuits"],
    style: "Photographic 4x4 with window seats and bean bags",
    accommodationSummary: "Three nights in a southern Tarangire camp or lodge.",
    highlights: [
      "Silale Swamp and quieter southern circuits, conditions permitting",
      "Dawn and dusk drives for changing light",
      "Baobab silhouettes, elephants and birdlife",
      "A guide briefed in photography positioning",
      "Maximum four guests per vehicle",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire South", "Arrival day", actions(
        ["07:30", "Pick-up from your Arusha hotel. Meet your photography guide and discuss your goals."],
        ["10:30", "Enter Tarangire and take a slow game drive south through baobab woodland."],
        ["13:00", "Lunch at camp."],
        ["15:30", "Afternoon drive toward golden hour by the Tarangire River."],
        ["18:30", "Dinner and overnight."],
      ), ["Lunch", "Dinner"], "Southern Tarangire camp or lodge", "Arusha to Tarangire South", "About 3 hours"),
      day(2, "Silale Swamp full-day photography drive", "Full safari day", actions(
        ["05:45", "Early wake-up for a pre-sunrise departure."],
        ["06:00-10:00", "Dawn drive, positioning for backlit elephants and wildlife activity."],
        ["10:00", "Brunch in the bush."],
        ["11:00-15:00", "Rest at camp, back up images and join an optional workshop session if arranged."],
        ["15:30-18:30", "Explore Silale Swamp in the late-afternoon light, with wildlife sightings depending on conditions."],
        ["19:30", "Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Southern Tarangire"),
      day(3, "Baobab landscapes and the river", "Full safari day", actions(
        ["06:00", "Sunrise drive over the open plains."],
        ["10:00", "Brunch and rest."],
        ["15:30", "Afternoon drive for baobab landscapes at sunset."],
        ["19:30", "Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Southern Tarangire"),
      day(4, "Final dawn drive and return to Arusha", "Departure day", actions(
        ["06:00", "Final dawn drive."],
        ["09:30", "Breakfast and check-out."],
        ["10:30", "Depart for Arusha."],
        ["14:00", "Drop-off at your hotel or JRO. End of safari."],
      ), ["Breakfast"], "None", "Tarangire to Arusha", "About 3 hours"),
    ],
    inclusions: [
      ...commonInclusions,
      "Three nights full board",
      "Photo-optimised 4x4 for up to four guests",
      "Bean bags, 12V charging and a camera-friendly guide",
    ],
    exclusions: [...commonExclusions, "Personal camera equipment and memory cards"],
    heroImage: "/images/safaris/4-day-tarangire-serengeti-ngorongoro.jpg",
    heroAlt: "A safari guest photographing an elephant from a vehicle",
    cardImage: "/images/destinations/tarangire.jpeg",
    cardAlt: "An elephant herd walking along a Tarangire track",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: tieredPricing(1200, {
      comfort: {
        low: { 1: 2450, 2: 1590, 4: 1290, 6: 1200 },
        high: { 1: 2790, 2: 1830, 4: 1530, 6: 1430 },
        peak: { 1: 3000, 2: 1970, 4: 1670, 6: 1570 },
      },
      luxury: {
        low: { 1: 3640, 2: 2390, 4: 2090, 6: 1990 },
        high: { 1: 4400, 2: 2900, 4: 2600, 6: 2500 },
        peak: { 1: 5020, 2: 3320, 4: 3020, 6: 2920 },
      },
    }),
    seasonsNote,
    faqs: makeFaqs(
      "How many guests travel in the photography vehicle?",
      "The listed photo-focused setup is planned for up to four guests per vehicle. Confirm vehicle and equipment details for your dates before booking.",
    ),
    gallery: galleryFor("tarangire-silale-photography"),
    related: ["tarangire-walking-night-safari", "tarangire-elephant-escape"],
    parks: ["Tarangire National Park"],
    tags: ["Photography", "Wildlife", "Active"],
    pace: "Moderate",
    maxGuestsPerVehicle: 4,
    bestMonths: "July to October",
    seo: {
      title: "Tarangire Photography Safari, 4 Days",
      description: "Spend four days photographing Tarangire, Silale Swamp and baobab country with a private photo-focused vehicle and guide.",
      keywords: ["Tarangire photography safari", "Silale Swamp", "Tarangire safari"],
    },
  },
  {
    slug: "tarangire-family-adventure-safari",
    name: "Tarangire Family Adventure Safari",
    shortName: "Family Adventure",
    duration: "4 Days / 3 Nights",
    days: 4,
    nights: 3,
    tagline: "A first safari your children will talk about for the rest of their lives.",
    hook:
      "Elephants beside the car, baobabs to marvel at, and time for a village visit and cooking experience. This family safari uses a gentler pace, regular breaks and family-friendly activities, with room arrangements confirmed for each stay.",
    bestFor: ["Families with children aged 5 to 15", "Multi-generational groups", "Safari beginners"],
    style: "Private family 4x4, family-friendly lodges",
    accommodationSummary: "Two nights in Tarangire and one night in the Lake Manyara area.",
    highlights: [
      "A child-friendly pace with breaks and activity cards",
      "Mto wa Mbu village cycling or banana-farm visit, subject to availability",
      "Family or interconnecting rooms, where available",
      "Junior Ranger activity booklet and animal-spotting game",
      "Flexible days shaped around young travellers",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire", "Arrival day", actions(
        ["08:00", "Pick-up from your Arusha hotel. Child-friendly briefing with your guide and the children."],
        ["08:00-11:00", "Scenic drive with snack stops, short breaks and spot-the-animal games."],
        ["11:00", "Enter Tarangire for a gentle first game drive."],
        ["13:30", "Lunch at your lodge and pool time where available."],
        ["16:00", "Afternoon game drive to look for elephants, zebra and giraffe."],
        ["18:30", "Early family dinner and overnight."],
      ), ["Lunch", "Dinner"], "Tarangire family-friendly lodge", "Arusha to Tarangire", "About 3 hours"),
      day(2, "Full day in Tarangire", "Full safari day", actions(
        ["07:00", "Breakfast."],
        ["08:00", "Game drive with the Junior Ranger activity booklet."],
        ["12:30", "Picnic lunch or lodge lunch with a pool break."],
        ["15:30", "Afternoon game drive."],
        ["18:30", "Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Tarangire family-friendly lodge"),
      day(3, "Tarangire to Lake Manyara and Mto wa Mbu", "Transfer day", actions(
        ["08:00", "Breakfast and check-out."],
        ["09:00", "Depart for Mto wa Mbu, about 1.5 hours."],
        ["11:00", "Mto wa Mbu cultural tour by bicycle or on foot, subject to availability and cost confirmation."],
        ["13:30", "Lunch at your lodge."],
        ["15:00", "Lake Manyara game drive for hippos, baboons, monkeys and seasonal flamingos."],
        ["18:30", "Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Lake Manyara area", "Tarangire to Mto wa Mbu", "About 1.5 hours"),
      day(4, "Return to Arusha", "Departure day", actions(
        ["08:00", "Breakfast."],
        ["09:30", "Depart for Arusha, about 2.5 hours."],
        ["12:30-13:00", "Drop-off at your Arusha hotel or JRO. End of safari."],
      ), ["Breakfast"], "None", "Lake Manyara to Arusha", "About 2.5 hours"),
    ],
    inclusions: [
      ...commonInclusions,
      "Three nights full board",
      "Children's activity booklet",
      "Family room where available",
      "Child seat on request, subject to confirmation",
    ],
    exclusions: [...commonExclusions, "Mto wa Mbu activities unless included in the written quote"],
    heroImage: "/images/destinations/tarangire.jpeg",
    heroAlt: "An elephant herd walking along a Tarangire track",
    cardImage: "/images/safaris/hub/tarangire.jpeg",
    cardAlt: "Elephants beneath baobab trees in golden light",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: tieredPricing(1050, {
      comfort: {
        low: { 1: 2170, 2: 1420, 4: 1150, 6: 1050 },
        high: { 1: 2440, 2: 1600, 4: 1330, 6: 1240 },
        peak: { 1: 2600, 2: 1710, 4: 1440, 6: 1340 },
      },
      luxury: {
        low: { 1: 3110, 2: 2040, 4: 1770, 6: 1670 },
        high: { 1: 3640, 2: 2410, 4: 2130, 6: 2040 },
        peak: { 1: 4130, 2: 2730, 4: 2450, 6: 2360 },
      },
    }),
    seasonsNote,
    faqs: makeFaqs(
      "Are the activities suitable for children?",
      "The itinerary is designed with children aged five and older in mind. We confirm age guidance, room arrangements, child seats and optional activities for your specific trip.",
    ),
    gallery: galleryFor("tarangire-family-adventure"),
    related: ["tarangire-lake-manyara-classic", "tarangire-manyara-ngorongoro-circuit"],
    parks: ["Tarangire National Park", "Lake Manyara National Park"],
    tags: ["Family", "Short escape", "First safari"],
    pace: "Relaxed",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire Family Safari, 4 Days",
      description: "Plan a 4-day Tarangire family safari with a child-friendly pace, wildlife drives, family accommodation and Lake Manyara.",
      keywords: ["Tarangire family safari", "Tanzania safari packages", "private safari Tanzania"],
    },
  },
  {
    slug: "tarangire-manyara-ngorongoro-circuit",
    name: "Tarangire, Manyara and Ngorongoro Crater Circuit",
    shortName: "Northern Circuit",
    duration: "5 Days / 4 Nights",
    days: 5,
    nights: 4,
    tagline: "Three wildlife wonders, one beautifully paced safari.",
    hook:
      "Explore northern Tanzania in five days. Start with elephants and baobabs in Tarangire, continue to Lake Manyara's forest and lake, then descend into Ngorongoro Crater for a chance to see black rhino, lions, hippo and other wildlife. This journey brings variety without rushing.",
    bestFor: ["First-time visitors", "Honeymooners", "Couples and friends", "Travellers seeking a northern circuit"],
    style: "Private 4x4, lodges and tented camps",
    accommodationSummary: "Two nights in Tarangire and two nights in Karatu.",
    highlights: [
      "Tarangire elephants and baobabs",
      "Lake Manyara forest and seasonal flamingos",
      "Ngorongoro Crater descent for a chance to see black rhino and other wildlife",
      "Karatu lodge nights, with views depending on the property",
      "Three distinct destinations in five days",
    ],
    itinerary: [
      day(1, "Arusha to Tarangire", "Arrival day", actions(
        ["07:30", "Pick-up from your Arusha hotel."],
        ["10:30", "Enter Tarangire and begin a game drive along the river."],
        ["13:00", "Lunch at your lodge."],
        ["16:00", "Afternoon game drive."],
        ["18:30", "Dinner and overnight."],
      ), ["Lunch", "Dinner"], "Tarangire lodge", "Arusha to Tarangire", "About 3 hours"),
      day(2, "Full day in Tarangire", "Full safari day", actions(
        ["06:30", "Early game drive."],
        ["10:00", "Breakfast at the lodge."],
        ["12:30", "Picnic lunch in the park."],
        ["15:30", "Game drive toward Silale or the river loops, depending on conditions."],
        ["18:30", "Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Tarangire lodge"),
      day(3, "Tarangire to Lake Manyara and Karatu", "Transfer and game drive", actions(
        ["07:30", "Breakfast and check-out."],
        ["08:30", "Depart for Lake Manyara, about 1.5 hours."],
        ["10:30", "Game drive in Lake Manyara National Park."],
        ["13:00", "Picnic lunch."],
        ["15:00", "Drive up the escarpment to Karatu, about 1 hour."],
        ["17:30", "Check-in at your Karatu lodge. Dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Karatu", "Tarangire to Lake Manyara and Karatu", "About 2.5 hours driving"),
      day(4, "Ngorongoro Crater descent", "Full safari day", actions(
        ["06:30", "Early breakfast."],
        ["07:00", "Depart for the crater rim, about 40 minutes."],
        ["08:00-14:00", "Crater game drive, up to six hours, with a chance to see lions, black rhino, hippos and other wildlife."],
        ["12:00", "Picnic lunch at Hippo Pool."],
        ["14:30", "Ascend and return to Karatu."],
        ["16:00", "Rest, dinner and overnight."],
      ), ["Breakfast", "Lunch", "Dinner"], "Karatu"),
      day(5, "Return to Arusha", "Departure day", actions(
        ["08:00", "Breakfast."],
        ["09:00", "Depart for Arusha, about 3.5 hours."],
        ["12:30-13:00", "Drop-off at your hotel or JRO. End of safari."],
      ), ["Breakfast"], "None", "Karatu to Arusha", "About 3.5 hours"),
    ],
    inclusions: [
      ...commonInclusions,
      "Four nights full board",
      "Ngorongoro Conservation Area entry and crater service fees",
      "Tarangire and Lake Manyara park fees",
    ],
    exclusions: commonExclusions,
    heroImage: "/images/safaris/3-day-tarangire-manyara-ngorongoro.webp",
    heroAlt: "A lion resting in a tree during a safari",
    cardImage: "/images/destinations/tarangire.jpeg",
    cardAlt: "An elephant herd walking along a Tarangire track",
    // TODO(CONFIRM): Estimate with a margin of about 15 percent and replace with real supplier costs.
    pricing: tieredPricing(1310, {
      comfort: {
        low: { 1: 3000, 2: 1880, 4: 1450, 6: 1310 },
        high: { 1: 3290, 2: 2080, 4: 1650, 6: 1510 },
        peak: { 1: 3480, 2: 2210, 4: 1780, 6: 1640 },
      },
      luxury: {
        low: { 1: 4120, 2: 2630, 4: 2200, 6: 2050 },
        high: { 1: 4730, 2: 3040, 4: 2610, 6: 2470 },
        peak: { 1: 5280, 2: 3410, 4: 2980, 6: 2830 },
      },
    }),
    seasonsNote,
    faqs: makeFaqs(
      "Can this safari include the Big Five?",
      "Tarangire has no rhino. This circuit adds Ngorongoro Crater, where black rhino live, but wildlife sightings are never guaranteed.",
    ),
    gallery: galleryFor("tarangire-manyara-ngorongoro"),
    related: ["tarangire-lake-manyara-classic", "tarangire-family-adventure-safari"],
    parks: ["Tarangire National Park", "Lake Manyara National Park", "Ngorongoro Crater"],
    tags: ["Circuit", "First safari", "Honeymoon-friendly"],
    pace: "Moderate",
    maxGuestsPerVehicle: 6,
    bestMonths: "June to October",
    seo: {
      title: "Tarangire, Manyara and Ngorongoro, 5 Days",
      description: "Explore Tarangire, Lake Manyara and Ngorongoro Crater on a 5-day private northern Tanzania safari with full-board stays.",
      keywords: ["northern circuit safari", "Tanzania safari packages", "Tarangire safari"],
    },
  },
];

export const tarangirePackages = packages.map((item) => tarangirePackageSchema.parse(item));

export function getTarangirePackageBySlug(slug: string): TarangirePackage | undefined {
  return tarangirePackages.find((item) => item.slug === slug);
}

export const tarangirePackageSlugs = tarangirePackages.map((item) => item.slug);

const monthSeasons: Record<PackageMonth, PackageSeason> = {
  1: "peak",
  2: "high",
  3: "high",
  4: "low",
  5: "low",
  6: "high",
  7: "peak",
  8: "peak",
  9: "peak",
  10: "peak",
  11: "low",
  12: "peak",
};

// TODO(CONFIRM): Month-only estimates use a representative season when a month crosses a rate boundary.
export function getPackageSeason(month: PackageMonth): PackageSeason {
  return monthSeasons[month];
}

export function getPackagePrice(
  item: { slug: string; pricing: PackagePricing },
  tier: PackageTier,
  season: PackageSeason,
  group: PackageGroupSize,
): number {
  if (item.pricing.standard) return item.pricing.standard[group];
  if (item.pricing.tiers) return item.pricing.tiers[tier][season][group];
  throw new Error(`Missing pricing table for ${item.slug}`);
}

export function parsePackageMonth(value: string | null): PackageMonth | undefined {
  return packageMonths.find((month) => String(month.value) === value)?.value;
}

export function parsePackageGroupSize(value: string): PackageGroupSize | undefined {
  return packageGroupSizes.find((group) => String(group) === value);
}

export { packageSeasons };
