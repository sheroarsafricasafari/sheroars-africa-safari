import { z } from "zod";
import type { DestinationHubData, SerengetiRegionPageData, SouthernNdutuData, SubRegionData } from "@/types/destination";

const metadataSchema = z.object({ title: z.string().min(1), description: z.string().min(1) });
const heroSchema = z.object({
  image: z.string().startsWith("/"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  chips: z.array(z.string().min(1)).min(1),
  primary: z.object({ label: z.string().min(1), href: z.string().regex(/^(\/|#)/) }),
  secondary: z.object({ label: z.string().min(1), href: z.string().regex(/^(\/|#)/) }),
});

export const serengetiHubSchema = z.object({
  meta: metadataSchema,
  hero: heroSchema,
  nav: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
  facts: z.array(z.object({ value: z.string(), label: z.string() })).min(3),
  regions: z.array(z.object({ id: z.string(), path: z.string(), href: z.string().startsWith("/") })).min(4),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
}).passthrough();

export const centralSeroneraSchema = z.object({
  meta: metadataSchema,
  hero: heroSchema,
  nav: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
  zones: z.array(z.object({ title: z.string(), image: z.string().startsWith("/") })).min(4),
  sightings: z.array(z.object({ name: z.string(), likelihood: z.number().int().min(1).max(5) })).min(1),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
}).passthrough();

export const serengetiRegionPageSchema = z.object({
  meta: metadataSchema,
  hero: heroSchema,
  breadcrumbs: z.array(z.object({ title: z.string(), href: z.string().startsWith("/") })),
  nav: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
  zones: z.array(z.object({ title: z.string(), image: z.string().startsWith("/") })).min(4),
  migration: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    feature: z.object({
      image: z.string().startsWith("/"),
      imageAlt: z.string(),
      points: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
      moment: z.object({ title: z.string(), text: z.string() }),
      cta: z.object({ label: z.string(), href: z.string().startsWith("/") }),
    }),
  }),
  wildlife: z.object({
    items: z.array(z.object({ name: z.string(), outlook: z.string(), where: z.string(), bestTime: z.string() })).min(1),
  }),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
}).passthrough();

export const southernNdutuSchema = z.object({
  meta: metadataSchema,
  hero: heroSchema,
  breadcrumbs: z.array(z.object({ title: z.string(), href: z.string().startsWith("/") })),
  nav: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
  overview: z.object({ eyebrow: z.string(), title: z.string(), lead: z.string(), body: z.string() }),
  sidebarFacts: z.array(z.object({ label: z.string(), value: z.string(), icon: z.string() })).min(6),
  highlights: z.array(z.object({ title: z.string(), text: z.string(), icon: z.string() })).min(6),
  zones: z.array(z.object({ title: z.string(), image: z.string().startsWith("/") })).min(4),
  calving: z.object({
    image: z.string().startsWith("/"),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).min(4),
    predators: z.array(z.object({ name: z.string(), image: z.string().startsWith("/") })).min(3),
  }),
  wildlife: z.object({
    showcase: z.array(z.object({ name: z.string(), image: z.string().startsWith("/") })).min(12),
    sightings: z.array(z.object({ name: z.string(), where: z.string(), bestTime: z.string() })).min(12),
  }),
  seasons: z.object({
    rows: z.array(z.object({ label: z.string(), months: z.array(z.enum(["peak", "good", "quiet"])).length(12) })).min(4),
    cards: z.array(z.object({ range: z.string(), title: z.string(), text: z.string(), icon: z.string() })).min(4),
  }),
  experiences: z.array(z.object({ title: z.string(), text: z.string(), image: z.string().startsWith("/") })).min(5),
  schedule: z.array(z.object({ time: z.string(), title: z.string(), text: z.string(), icon: z.string() })).min(6),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(10),
}).passthrough();

export const serengetiHub: DestinationHubData = {
  meta: {
    title: "Serengeti National Park Safaris: Great Migration, Big Cats and More",
    description: "Plan a Serengeti safari with a women-led Tanzania team. Explore the four regions, the Great Migration, wildlife, the best time to visit and how to get there.",
  },
  hero: {
    image: "/images/destinations/serengeti/hero.jpg",
    eyebrow: "SERENGETI NATIONAL PARK",
    title: "The Serengeti",
    subtitle: "Endless golden plains, the Great Migration and Africa's most dramatic wildlife, explored by a team that knows every kopje and river crossing.",
    chips: ["UNESCO World Heritage Site", "All of the Big Five", "Year-round safaris"],
    primary: { label: "View Serengeti Journeys", href: "#journeys" },
    secondary: { label: "Plan My Serengeti Safari", href: "/plan-your-safari?type=Safari" },
  },
  breadcrumbs: [
    { title: "Home", href: "/" }, { title: "Safaris", href: "/safaris" }, { title: "Serengeti", href: "/safaris/serengeti" },
  ],
  nav: [
    { id: "overview", label: "Overview" }, { id: "regions", label: "Regions" },
    { id: "migration", label: "Migration" }, { id: "wildlife", label: "Wildlife" },
    { id: "when-to-go", label: "When to Go" }, { id: "getting-there", label: "Getting There" },
    { id: "experiences", label: "Experiences" }, { id: "stay", label: "Stay" },
    { id: "journeys", label: "Journeys" }, { id: "faq", label: "FAQ" },
  ],
  overview: {
    eyebrow: "WELCOME TO THE SERENGETI",
    title: "The Greatest Wildlife Show on Earth",
    lead: "The Serengeti is one of the last great wilderness areas on the planet: a vast ecosystem of open plains, granite kopjes, river valleys and woodland where the cycle of nature plays out every day. It is a place of scale and silence, where a single game drive can bring you lions at dawn, a leopard at noon and a river of wildebeest at sunset.",
    body: "Whether you come for the Great Migration, the big cats or simply the endless horizon, the Serengeti rewards slow, unhurried travel. We design every journey around the regions and seasons that suit your dreams, so you are in the right place at the right time.",
  },
  facts: [
    { value: "14,750", numericValue: 14750, suffix: " km2", label: "Park area, about" }, // TODO(CONFIRM): verify official park area.
    { value: "1951", numericValue: 1951, label: "Established as a national park" }, // TODO(CONFIRM): verify year.
    { value: "1981", numericValue: 1981, label: "UNESCO World Heritage listing" }, // TODO(CONFIRM): verify year.
    { value: "500+", numericValue: 500, suffix: "+", label: "Bird species recorded" }, // TODO(CONFIRM): verify species count.
    { value: "1.5M+", label: "Wildebeest in the migration, approximately" }, // TODO(CONFIRM): verify approximate herd count.
  ],
  factFootnote: "Figures are approximate and come from public sources.",
  pullQuote: "In the Serengeti, the horizon is never the end of the story.",
  regions: [
    {
      id: "central", name: "Central (Seronera)", shortName: "Central",
      character: "The beating heart of the park and the best year-round game viewing",
      bestFor: "Big cats and first-time safaris",
      bestMonths: "All year, herds often pass through April to June and November to December",
      wildlife: "Lion, leopard, cheetah, elephant, buffalo, hippo", feel: "Busiest sector, the most reliable sightings", crowd: 4,
      href: "/safaris/serengeti/central-seronera",
      path: "M250 183 C285 151 352 157 374 201 C394 240 363 281 320 278 C275 276 230 226 250 183Z",
      labelPosition: { x: 305, y: 210 },
    },
    {
      id: "south", name: "Southern (Ndutu and the plains)", shortName: "Southern",
      character: "Open short-grass plains and the calving season",
      bestFor: "Calving season and predators", bestMonths: "December to March",
      wildlife: "Wildebeest, zebra, gazelle, lion, cheetah, hyena", feel: "Wide open, seasonal and dramatic", crowd: 3,
      href: "/safaris/serengeti/southern-ndutu",
      path: "M92 288 C120 248 207 245 236 283 C263 318 220 359 162 352 C113 347 75 319 92 288Z",
      labelPosition: { x: 157, y: 300 },
    },
    {
      id: "west", name: "Western Corridor (Grumeti)", shortName: "Western",
      character: "River woodland and the first big crossings",
      bestFor: "Grumeti River crossings and a remote feel", bestMonths: "May to July",
      wildlife: "Wildebeest, zebra, crocodile, hippo, colobus monkey", // TODO(CONFIRM): confirm wildlife and seasonal locations.
      feel: "Greener, quieter and more remote", crowd: 2,
      href: "/safaris/serengeti/western-corridor",
      path: "M139 140 C186 103 255 118 264 160 C274 201 231 222 183 204 C144 189 112 164 139 140Z",
      labelPosition: { x: 195, y: 152 },
    },
    {
      id: "north", name: "Northern (Kogatende and Lobo)", shortName: "Northern",
      character: "Rolling hills and the Mara River crossings",
      bestFor: "Mara River crossings and fewer vehicles", bestMonths: "July to October",
      wildlife: "Wildebeest, zebra, elephant, lion, leopard", feel: "Remote, wild and beautiful", crowd: 2,
      href: "/safaris/serengeti/northern-serengeti",
      path: "M326 60 C372 35 434 57 438 101 C442 144 399 163 356 146 C318 130 293 84 326 60Z",
      labelPosition: { x: 370, y: 83 },
    },
  ],
  pins: [
    { label: "Naabi Hill Gate", x: 47, y: 83, kind: "gate" },
    { label: "Ndabaka Gate", x: 12, y: 39, kind: "gate" },
    { label: "Klein's Gate", x: 78, y: 46, kind: "gate" },
    { label: "Bologonja Gate", x: 82, y: 12, kind: "gate" },
    { label: "Seronera Airstrip", x: 53, y: 57, kind: "airstrip" },
    { label: "Ndutu Airstrip", x: 31, y: 81, kind: "airstrip" },
    { label: "Grumeti Airstrip", x: 27, y: 41, kind: "airstrip" },
    { label: "Lobo Airstrip", x: 60, y: 28, kind: "airstrip" },
    { label: "Kogatende Airstrip", x: 72, y: 14, kind: "airstrip" },
    { label: "Serengeti Kusini Airstrip", x: 49, y: 91, kind: "airstrip" },
  ],
  regionNote: "Four regions, one connected ecosystem. Your itinerary can combine two or more.",
  regionComparison: {
    columns: ["Region", "Best for", "Best months", "Crowds", "How to reach"],
    rows: [
      { label: "Central Seronera", values: ["Big cats and first-time safaris", "Year-round", "Busiest", "Road or Seronera airstrip"] },
      { label: "Southern plains", values: ["Calving season and predators", "December to March", "Seasonal", "Road or Ndutu airstrip"] },
      { label: "Western Corridor", values: ["River crossings and a remote feel", "May to July", "Quieter", "Road or Grumeti airstrip"] },
      { label: "Northern Serengeti", values: ["Mara River crossings", "July to October", "Quieter", "Road or Kogatende airstrip"] },
    ],
    note: "Always check the latest guidance for your travel dates. Herds follow the rains.", // TODO(CONFIRM): verify regional timing and access details.
  },
  migration: {
    eyebrow: "THE GREAT MIGRATION",
    title: "A Year With the Herds",
    subtitle: "Over a million wildebeest, along with zebra and gazelle, travel in a great circle following the rains. Every month tells a different story.",
    note: "Movements vary with the rains.",
  },
  wildlife: [
    { name: "Lion", description: "Lions are the Serengeti's signature predator, often seen resting on kopjes.", likelihood: "Very likely", image: "/images/destinations/serengeti/wildlife/lion.jpg", featured: true }, // TODO(CONFIRM): verify likelihood.
    { name: "Leopard", description: "Look for leopards resting in the trees along riverbeds.", likelihood: "Good chance", image: "/images/destinations/serengeti/wildlife/leopard.jpg" }, // TODO(CONFIRM): verify likelihood.
    { name: "Cheetah", description: "Open plains give cheetahs room to run and you room to watch.", likelihood: "Good chance", image: "/images/destinations/serengeti/wildlife/cheetah.jpg" }, // TODO(CONFIRM): verify likelihood.
    { name: "Elephant", description: "Family herds roam the woodlands and river valleys.", likelihood: "Good chance", image: "/images/destinations/serengeti/wildlife/elephant.jpg" }, // TODO(CONFIRM): verify likelihood.
    { name: "Buffalo", description: "Large herds graze across the central and western plains.", likelihood: "Very likely", image: "/images/destinations/serengeti/wildlife/buffalo.jpg" }, // TODO(CONFIRM): verify likelihood.
    { name: "Hippo and Crocodile", description: "Pools along the rivers hold hippo and crocodile.", likelihood: "Very likely", image: "/images/destinations/serengeti/wildlife/hippo-crocodile.jpg" }, // TODO(CONFIRM): verify likelihood.
    { name: "Giraffe", description: "Tall and elegant against the acacias.", likelihood: "Very likely", image: "/images/destinations/serengeti/wildlife/giraffe.jpg" }, // TODO(CONFIRM): verify likelihood.
    { name: "Wildebeest and Zebra", description: "The stars of the migration, present in large numbers for much of the year.", likelihood: "Very likely, seasonal movement", image: "/images/destinations/serengeti/wildlife/wildebeest-zebra.jpg" }, // TODO(CONFIRM): verify likelihood and seasonal distribution.
    { name: "Black Rhino", description: "Rare and carefully protected, mostly around Moru Kopjes.", likelihood: "Rare", image: "/images/destinations/serengeti/wildlife/black-rhino.jpg" }, // TODO(CONFIRM): verify likelihood and location.
    { name: "Birds", description: "More than 500 species, from ostrich and secretary bird to vultures and crowned cranes.", likelihood: "Very likely", image: "/images/destinations/serengeti/wildlife/birds.jpg" }, // TODO(CONFIRM): verify species count and likelihood.
  ],
  wildlifeNote: "All of the Big Five live in the Serengeti, but black rhino are rare and sightings are never guaranteed.",
  seasons: {
    rows: [
      { label: "Resident wildlife (big cats, elephant, buffalo)", months: ["good", "good", "good", "good", "good", "peak", "peak", "peak", "peak", "peak", "good", "good"] },
      { label: "Great Migration", months: ["peak", "peak", "peak", "good", "good", "peak", "peak", "peak", "peak", "peak", "good", "good"] },
      { label: "Weather", months: ["good", "good", "quiet", "quiet", "quiet", "peak", "peak", "peak", "peak", "peak", "good", "good"] },
    ], // TODO(CONFIRM): verify the seasonal calendar and migration regions.
    cards: [
      { range: "June to October", title: "Dry season", text: "Clear skies, cool mornings and wildlife gathered around water. The most popular time to visit.", icon: "sun" },
      { range: "November to December", title: "Short rains", text: "Fresh green landscapes and herds heading south. Afternoon showers are possible.", icon: "leaf" },
      { range: "January to March", title: "Calving season", text: "Thousands of calves are born on the southern plains, and predators follow.", icon: "paw" },
      { range: "March to May", title: "Long rains", text: "The park turns lush and quiet with fewer vehicles and good value. Some roads can be slow.", icon: "trees" },
    ],
  },
  packingNote: "Mornings and evenings can be cold on open vehicles, even in the dry season. Pack warm layers, a hat and sun protection. Afternoons are usually around the mid-twenties Celsius and nights can drop to the mid-teens or lower.", // TODO(CONFIRM): verify temperatures and packing guidance.
  gettingThere: {
    road: {
      title: "By road",
      description: "From Arusha, the drive to Naabi Hill Gate takes around six hours, and Seronera is roughly seven to eight hours by road, including a stop at Ngorongoro.",
      times: ["About 6 hrs to Naabi Hill Gate", "7 to 8 hrs to Seronera"],
      steps: ["Arusha to Karatu and the Ngorongoro Highlands", "Across the Ngorongoro Conservation Area, with an optional stop at Olduvai Gorge", "Naabi Hill Gate and onward to Seronera, about an hour and a half"],
    },
    air: {
      title: "By air",
      description: "Scheduled and charter flights from Arusha or Kilimanjaro International Airport reach airstrips across the park in about one to one and a half hours.",
      times: ["1 to 1.5 hrs flight"],
      steps: ["Fly from Arusha or JRO", "Land at the airstrip nearest your camp (Seronera, Ndutu, Grumeti, Lobo, Kogatende)", "Your guide meets you for a game drive"],
    },
    note: "Many travelers combine the two: drive in through Ngorongoro and fly out, or the reverse. We will suggest the best combination for your dates.", // TODO(CONFIRM): verify all drive and flight times.
  },
  experiences: [
    { title: "Game Drives", tags: ["Dawn", "Dusk", "Full-day"], text: "Dawn and dusk drives in a private 4x4 with a pop-up roof, led by a guide who reads the landscape.", image: "/images/destinations/serengeti/experiences/game-drives.jpg", href: "/safaris/packages" },
    { title: "Hot-Air Balloon Safari", tags: ["Sunrise", "Bucket list"], text: "Float over the plains at sunrise, followed by a bush breakfast.", image: "/images/destinations/serengeti/experiences/balloon-safari.jpg", href: "/safaris/serengeti/hot-air-balloon" },
    { title: "Bush Breakfasts and Sundowners", tags: ["Romance", "Celebrations"], text: "Breakfast in the bush or a sundowner on a kopje.", image: "/images/destinations/serengeti/experiences/bush-breakfast.jpg", href: "/plan-your-safari?type=Safari" }, // TODO(CONFIRM): verify availability.
    { title: "Photography Safaris", tags: ["Golden hour"], text: "Positioning, patience and golden light.", image: "/images/destinations/serengeti/experiences/photography.jpg", href: "/experiences/photography-safaris" },
    { title: "Cultural Encounters", tags: ["Culture", "Near Ngorongoro"], text: "Combine your safari with a Maasai cultural visit near Ngorongoro.", image: "/images/destinations/serengeti/experiences/cultural-encounters.jpg", href: "/safaris/ngorongoro/maasai-cultural-visit" },
  ],
  stay: {
    tiers: [
      { title: "Camping Safari", description: "A simple, close-to-nature stay.", bestFor: "Adventurous, budget-conscious travelers", recommendedFor: "Travelers who want a straightforward safari base" },
      { title: "Lodges and Tented Camps", description: "Comfortable, full-service stays.", bestFor: "A balanced safari experience", recommendedFor: "Most styles of Serengeti journey" },
      { title: "Luxury Lodges and Camps", description: "Spacious tents or suites, private touches and memorable settings.", bestFor: "Travelers seeking extra comfort", recommendedFor: "Special occasions and elevated stays" },
    ],
    footnote: "Accommodation is confirmed in your personal proposal.", // TODO(REPLACE): add verified accommodation partners and availability.
    href: "/safaris/serengeti/where-to-stay",
    linkLabel: "Where to Stay in the Serengeti",
  },
  days: [
    { label: "2 days", headline: "A short taste of the Serengeti", suits: "Travelers with limited time who can fly in.", experience: "Focus on one region and spend more of your short stay with wildlife than on the road.", href: "/plan-your-safari?type=Safari" },
    { label: "3 days", headline: "Time for the central plains", suits: "First-time visitors who want a focused safari.", experience: "Explore the central plains and look for big cats at an unhurried pace.", href: "/safaris/packages" },
    { label: "4 days", headline: "A full day in the wilderness", suits: "Travelers who want room for a relaxed pace.", experience: "Settle into one region and make time for a full day of game drives.", href: "/safaris/packages" },
    { label: "5 days or more", headline: "Follow the herds and slow down", suits: "Travelers who want to explore beyond one region.", experience: "Add a second region, follow seasonal wildlife and savour the silence.", href: "/plan-your-safari?type=Safari" },
  ],
  journeys: { title: "Journeys That Include the Serengeti", subtitle: "Every journey is a starting point. We tailor it to your dates and dreams.", park: "Serengeti" },
  faqs: [
    { question: "When is the best time to visit the Serengeti?", answer: "The Serengeti is rewarding all year. The dry season from June to October is the most popular for wildlife viewing, January to March is calving season in the south, and the herds are in the north from roughly July to October." },
    { question: "How many days do I need in the Serengeti?", answer: "We recommend at least three nights. Four to six nights allows you to explore more than one region and follow the herds." },
    { question: "Can I see the Great Migration all year?", answer: "The herds are always somewhere in the ecosystem, but their location changes with the rains. We plan your route around where they are likely to be on your dates." },
    { question: "Is the Serengeti suitable for solo women and families?", answer: "Yes. We tailor pace, accommodation and activities for every traveler and look after you from arrival to departure." },
    { question: "Should I drive or fly into the Serengeti?", answer: "Driving through Ngorongoro is scenic but long. Flying saves time and adds game-viewing hours. Many travelers combine both." },
    { question: "Will I see the Big Five?", answer: "Lion, leopard, elephant and buffalo are regularly seen. Black rhino are rare and sightings are never guaranteed." },
    { question: "What should I pack?", answer: "Light neutral layers, warm clothing for early mornings, a hat, sunglasses and sunscreen. See our packing guide.", href: "/travel-guide/packing-list" },
    { question: "Do you offer private and group safaris?", answer: "Yes. Private safaris offer the most flexibility, and group departures are a lovely way to travel with like-minded people." },
  ],
  related: [
    { title: "Ngorongoro", href: "/safaris/ngorongoro", description: "Pair the open plains with the Ngorongoro Highlands." },
    { title: "Tarangire", href: "/safaris/tarangire", description: "Explore baobab country and its elephant herds." },
    { title: "Lake Manyara", href: "/safaris/lake-manyara", description: "Add Rift Valley scenery and varied habitats." },
    { title: "The Great Migration", href: "/safaris/serengeti/great-migration", description: "Follow the herds through the seasons." },
  ],
  cta: { title: "Ready to Meet the Serengeti?", description: "Tell us your dates and dreams and we will design a safari that is entirely yours.", primary: "Plan My Serengeti Safari", secondary: "Chat on WhatsApp" },
};

export const centralSeronera: SubRegionData = {
  meta: {
    title: "Central Serengeti and Seronera Valley: Big Cats and Year-Round Wildlife",
    description: "Discover the Seronera Valley in the heart of the Serengeti: leopards, lions and cheetahs all year, the Seronera River, kopjes and sunrise balloon safaris. Plan your trip with a women-led Tanzania team.",
  },
  hero: {
    image: "/images/destinations/serengeti/seronera/hero.jpg",
    eyebrow: "CENTRAL SERENGETI",
    title: "Seronera Valley",
    subtitle: "The beating heart of the Serengeti, where big cats are at home all year, whatever the herds are doing.",
    chips: ["Year-round wildlife", "Big cat country", "The most popular region"],
    primary: { label: "Plan a Seronera Safari", href: "/plan-your-safari?type=Safari" },
    secondary: { label: "View Serengeti Journeys", href: "#journeys" },
  },
  breadcrumbs: [
    { title: "Home", href: "/" }, { title: "Safaris", href: "/safaris" },
    { title: "Serengeti", href: "/safaris/serengeti" }, { title: "Central Serengeti (Seronera)", href: "/safaris/serengeti/central-seronera" },
  ],
  nav: [
    { id: "overview", label: "Overview" }, { id: "highlights", label: "Highlights" },
    { id: "landscape", label: "Landscape" }, { id: "wildlife", label: "Wildlife" },
    { id: "best-time", label: "Best Time" }, { id: "a-day-here", label: "A Day Here" },
    { id: "balloon", label: "Balloon" }, { id: "getting-there", label: "Getting There" },
    { id: "stay", label: "Stay" }, { id: "journeys", label: "Journeys" }, { id: "faq", label: "FAQ" },
  ],
  overview: {
    eyebrow: "WHY SERONERA",
    title: "The Big Cat Capital of Africa",
    lead: "Seronera is the central valley of the Serengeti, and the reason so many first journeys start here. The Seronera River holds water through the year, so resident wildlife stays close, and with it come some of the densest populations of lion, leopard and cheetah on the continent.", // TODO(CONFIRM): verify factual wording.
    body: "While much of the Serengeti is seasonal, Seronera is constant. Whether the herds are here or hundreds of kilometres away, a game drive in the valley rewards you with wildlife, drama and space to breathe.", // TODO(CONFIRM): verify factual wording.
  },
  sidebarFacts: [
    { label: "Region", value: "Central Serengeti", icon: "map" },
    { label: "Best for", value: "Big cats and first-time safaris", icon: "paw" },
    { label: "Best time", value: "All year, with peak game viewing in the dry season", icon: "sun" },
    { label: "Herds", value: "Often pass through around April to June and November to December", icon: "route" }, // TODO(CONFIRM): verify migration dates.
    { label: "Suggested stay", value: "2 to 3 nights", icon: "clock" }, // TODO(CONFIRM): verify suggested stay.
    { label: "Crowds", value: "The busiest region, so we plan around the quiet hours", icon: "people" },
    { label: "Access", value: "Road via Naabi Hill Gate or flight to Seronera airstrip", icon: "plane" },
    { label: "Climate", value: "Cool mornings and evenings, warm days", icon: "sun" },
  ],
  highlights: [
    { title: "Big Cat Capital", text: "Lion, leopard and cheetah are all regularly seen, often on the same day.", icon: "paw" }, // TODO(CONFIRM): verify wildlife frequency.
    { title: "The Seronera River", text: "Permanent water draws wildlife in every season and lines the valley with riverine forest.", icon: "trees" }, // TODO(CONFIRM): verify seasonal detail.
    { title: "Kopjes and Lookouts", text: "Granite outcrops where lions rest, survey their territory and cubs play.", icon: "mountain" }, // TODO(CONFIRM): verify wildlife observations.
    { title: "Resident Wildlife All Year", text: "Elephant, buffalo, giraffe, hippo and many antelope live here whatever the month.", icon: "paw" }, // TODO(CONFIRM): verify species and year-round locations.
    { title: "A Central Base", text: "Seronera sits at the crossroads of the park, easy to combine with the north, south or west.", icon: "compass" },
    { title: "Sunrise Balloon Flights", text: "One of the Serengeti's most loved experiences launches from the valley.", icon: "sun" }, // TODO(CONFIRM): verify availability and wording.
  ],
  zones: [
    { title: "The Seronera River and riverine forest", image: "/images/destinations/serengeti/seronera/riverine-forest.jpg", description: "A green ribbon of fig, sausage and acacia trees through the plains.", bullets: ["Leopards often rest in the branches", "Hippo pools and waterbuck along the banks", "Superb birdlife"], lookFor: ["Leopard", "Hippo", "Waterbuck", "Monkeys", "Kingfishers"], bestTime: "Early morning and late afternoon" }, // TODO(CONFIRM): verify wildlife and habitat guidance.
    { title: "The Kopjes", image: "/images/destinations/serengeti/seronera/kopjes.jpg", description: "Ancient granite outcrops rising from the grass.", bullets: ["Lions use them as lookouts", "Hyrax and agama lizards sun on the rocks", "Great vantage points for photography"], lookFor: ["Lion", "Hyrax", "Agama lizards", "Klipspringer"], bestTime: "Morning and golden hour" }, // TODO(CONFIRM): verify species and sightings.
    { title: "The Open Plains", image: "/images/destinations/serengeti/seronera/open-plains.jpg", description: "Wide, golden grassland stretching toward the horizon.", bullets: ["Cheetahs scan for gazelle from termite mounds", "Zebra, topi and gazelle graze in the open", "Big skies and sunsets"], lookFor: ["Cheetah", "Topi", "Zebra", "Thomson's gazelle", "Secretary bird"], bestTime: "Late afternoon" },
    { title: "Moru Kopjes and the south", image: "/images/destinations/serengeti/seronera/moru-kopjes.jpg", description: "A cluster of kopjes south of Seronera with rock paintings and a rare chance of rhino.", bullets: ["Black rhino are rare and sightings are never guaranteed", "Ancient Maasai rock art", "Quieter drives"], lookFor: ["Black rhino (rare)", "Lion", "Cheetah", "Rock art"], bestTime: "Early morning" }, // TODO(CONFIRM): verify location, access and sightings.
  ],
  sightings: [
    { name: "Lion", likelihood: 5, where: "Kopjes and open plains", bestTime: "Early and late" },
    { name: "Leopard", likelihood: 4, where: "Trees along the Seronera River; patience helps", bestTime: "Early morning and late afternoon" },
    { name: "Cheetah", likelihood: 4, where: "Open plains, often on termite mounds", bestTime: "Morning and late afternoon" },
    { name: "Elephant", likelihood: 3, where: "Woodland and river edges", bestTime: "Morning and afternoon" },
    { name: "Buffalo", likelihood: 5, where: "Plains and river valleys", bestTime: "Throughout the day" },
    { name: "Hippo", likelihood: 4, where: "River pools", bestTime: "At the pools during the day" },
    { name: "Giraffe", likelihood: 5, where: "Acacia woodland", bestTime: "Throughout the day" },
    { name: "Spotted hyena", likelihood: 4, where: "Dens and open plains", bestTime: "Early and late" },
    { name: "Black rhino", likelihood: 1, where: "Moru Kopjes area, rarely seen", bestTime: "Early morning" },
  ], // TODO(CONFIRM): verify all likelihood levels and sighting locations.
  seasons: {
    rows: [
      { label: "Resident big cats", months: ["good", "good", "good", "good", "good", "peak", "peak", "peak", "peak", "peak", "good", "good"] },
      { label: "Herds passing through", months: ["good", "good", "good", "peak", "peak", "peak", "good", "good", "good", "good", "peak", "peak"] },
      { label: "Weather", months: ["good", "good", "quiet", "quiet", "quiet", "peak", "peak", "peak", "peak", "peak", "good", "good"] },
    ], // TODO(CONFIRM): verify seasonal wildlife, migration and weather information.
    cards: [
      { range: "June to October", title: "Dry season", text: "Wildlife gathers around permanent water, making sightings easier.", icon: "sun" },
      { range: "April to June and November to December", title: "Herds pass through", text: "When the migration moves through the valley, the plains fill with life.", icon: "paw" }, // TODO(CONFIRM): verify migration timing.
      { range: "November to December", title: "Short rains", text: "Green and fresh with dramatic skies.", icon: "leaf" },
      { range: "March to May", title: "Long rains", text: "Lush, quiet and good value, with fewer vehicles.", icon: "trees" },
    ],
  },
  crowdNote: "Seronera is the busiest part of the park. Ask your guide to plan early starts and quieter routes so you share fewer sightings.",
  schedule: [
    { time: "Early morning", title: "First light", text: "Set out as the light turns gold. Big cats are often still active and the air is cool.", icon: "sunrise" },
    { time: "Mid-morning", title: "A gentle pause", text: "Breakfast in the bush or a slow drive along the river.", icon: "coffee" },
    { time: "Midday", title: "Rest and reset", text: "Rest at camp or lodge while the heat builds, or enjoy a long picnic lunch in the shade.", icon: "sun" },
    { time: "Afternoon", title: "Back on the plains", text: "Head out again as animals stir. Lions, elephants and herds often move to water.", icon: "sun" },
    { time: "Golden hour", title: "Soft light", text: "Soft light, long shadows and some of the best photography of the day.", icon: "sunset" },
    { time: "Evening", title: "Under a huge sky", text: "Return for a sundowner and dinner under a huge sky.", icon: "moon" },
  ],
  tips: [
    { title: "Start early", text: "The first and last hours of light are the best for big cats.", icon: "sunrise" },
    { title: "Be patient", text: "Leopards are masters of camouflage. Sit quietly and scan the branches.", icon: "binoculars" },
    { title: "Ask your guide", text: "Guides share sightings by radio and know the territories.", icon: "compass" },
    { title: "Bring binoculars", text: "They bring distant sightings to life.", icon: "binoculars" },
    { title: "Respect the wildlife", text: "Keep voices low and give animals space.", icon: "paw" },
    { title: "Pack layers", text: "Mornings are cold on an open vehicle.", icon: "leaf" },
  ],
  balloon: {
    image: "/images/destinations/serengeti/seronera/balloon.jpg",
    eyebrow: "THE ULTIMATE SUNRISE",
    title: "Float Above the Seronera Valley",
    description: "A pre-dawn start, a drift above the plains as the sun rises and a bush breakfast on landing. A balloon flight is one of the most memorable ways to see the Serengeti.",
    steps: ["Pre-dawn pick-up", "About an hour in the air", "Landing and a bush breakfast", "Return to your game drive"],
    facts: [
      "Flight time about one hour, the whole experience about five hours", // TODO(CONFIRM): verify flight and total experience times.
      "Available year-round, weather permitting", // TODO(CONFIRM): verify availability.
      "Age and health restrictions apply", // TODO(CONFIRM): verify operator requirements.
      "Additional cost and park fees apply", // TODO(CONFIRM): verify fees.
    ],
    primary: { label: "Add a Balloon Safari", href: "/plan-your-safari?type=Safari" },
    secondary: { label: "Read the Balloon Safari Guide", href: "/safaris/serengeti/hot-air-balloon" },
  },
  gettingThere: {
    road: {
      title: "By road",
      description: "Seronera is roughly seven to eight hours from Arusha by road, entering through Naabi Hill Gate, about 45 kilometres and an hour and a half from Seronera.",
      times: ["7 to 8 hrs from Arusha", "About 45 km from Naabi Hill Gate"],
      steps: ["Drive from Arusha toward the Ngorongoro Conservation Area", "Enter the Serengeti at Naabi Hill Gate", "Continue to Seronera through the park"],
    },
    air: {
      title: "By air",
      description: "Fly to Seronera airstrip from Arusha or Kilimanjaro International Airport in around one to one and a half hours.",
      times: ["1 to 1.5 hrs flight"],
      steps: ["Fly from Arusha or Kilimanjaro International Airport", "Land at Seronera airstrip", "Meet your guide and continue by safari vehicle"],
    },
    note: "Seronera also has the park's main visitor centre, a good stop to learn more about the ecosystem.", // TODO(CONFIRM): verify visitor-centre information and all travel times.
  },
  stay: {
    tiers: [
      { title: "Camping Safari", description: "A simple, close-to-nature base within reach of the valley.", bestFor: "Adventurous travelers", recommendedFor: "Travelers who want a practical safari stay" },
      { title: "Lodges and Tented Camps", description: "Comfortable full-service stays around the river and kopjes.", bestFor: "A balance of comfort and location", recommendedFor: "Most Seronera journeys" },
      { title: "Luxury Lodges and Camps", description: "Spacious stays with thoughtful service and a strong sense of place.", bestFor: "Travelers seeking extra comfort", recommendedFor: "Special occasions and slower stays" },
    ],
    footnote: "Accommodation is confirmed in your personal proposal.", // TODO(REPLACE): add verified accommodation partners and availability.
    href: "/safaris/serengeti/where-to-stay",
    linkLabel: "Where to Stay in the Serengeti",
  },
  journeys: { title: "Journeys That Include Seronera", subtitle: "Make the central valley part of a longer, thoughtfully paced Serengeti journey.", park: "Serengeti" },
  faqs: [
    { question: "Is Seronera good all year?", answer: "Yes. The Seronera River provides water all year, so resident wildlife is always present." }, // TODO(CONFIRM): verify factual wording.
    { question: "Will I see leopards?", answer: "Seronera is one of the best places in Africa to look for leopards, but they are shy and sightings are never guaranteed. Patience and a good guide help." }, // TODO(CONFIRM): verify comparative claim.
    { question: "How many nights should I spend in Seronera?", answer: "Two to three nights gives you time for several game drives and a possible balloon flight." }, // TODO(CONFIRM): verify recommended stay and experience.
    { question: "Is Seronera crowded?", answer: "It is the busiest region, especially around popular sightings. Early starts and an experienced guide help you find quieter moments." }, // TODO(CONFIRM): verify comparative statement.
    { question: "Can I combine Seronera with the north or south?", answer: "Absolutely. Seronera is a natural base and works well with the northern, southern or western regions." },
    { question: "Is a balloon safari worth it?", answer: "Many travelers call it the highlight of their trip. It is an early start, but the views are extraordinary." }, // TODO(CONFIRM): verify experience and availability.
  ],
  related: [
    { title: "Southern Serengeti and Ndutu", href: "/safaris/serengeti/southern-ndutu", description: "Open plains and the seasonal calving grounds." },
    { title: "Northern Serengeti", href: "/safaris/serengeti/northern-serengeti", description: "Rolling country and the Mara River." },
    { title: "Western Corridor", href: "/safaris/serengeti/western-corridor", description: "River woodland and the Grumeti." },
    { title: "The Great Migration", href: "/safaris/serengeti/great-migration", description: "A seasonal journey across the ecosystem." },
    { title: "Hot-Air Balloon", href: "/safaris/serengeti/hot-air-balloon", description: "See the plains from above at first light." },
    { title: "Where to Stay", href: "/safaris/serengeti/where-to-stay", description: "Find the right style of camp for your trip." },
  ],
  cta: { title: "Ready for the Big Cat Capital?", description: "Tell us when you would like to travel and we will plan your Seronera safari.", primary: "Plan a Seronera Safari", secondary: "Chat on WhatsApp" },
};

export const northernSerengeti: SerengetiRegionPageData = {
  meta: {
    title: "Northern Serengeti Safari: Mara River Crossings and the Great Migration",
    description: "Explore the Northern Serengeti in Tanzania. Discover Kogatende, the Lamai Triangle, Mara River crossings, incredible wildlife, the best time to visit and tailor-made safari experiences.",
  },
  hero: {
    image: "/images/destinations/serengeti/northern/hero.jpg",
    eyebrow: "NORTHERN SERENGETI",
    title: "Northern Serengeti",
    subtitle: "Travel to the wild northern reaches of the Serengeti, where rolling hills, open plains and the Mara River create one of Tanzania's most remarkable safari landscapes. Follow the story of the Great Migration and discover a quieter side of the Serengeti beyond its famous river crossings.",
    chips: ["Mara River Country", "Great Migration Region", "Kogatende Access"],
    primary: { label: "Explore Northern Serengeti Safaris", href: "#journeys" },
    secondary: { label: "Plan Your Northern Serengeti Safari", href: "/plan-your-safari?type=Safari" },
  },
  breadcrumbs: [
    { title: "Home", href: "/" },
    { title: "Safaris", href: "/safaris" },
    { title: "Serengeti", href: "/safaris/serengeti" },
    { title: "Northern Serengeti", href: "/safaris/serengeti/northern-serengeti" },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "landscape", label: "Landscape" },
    { id: "migration", label: "Migration" },
    { id: "wildlife", label: "Wildlife" },
    { id: "best-time", label: "Best Time" },
    { id: "schedule", label: "A Safari Day" },
    { id: "tips", label: "Safari Tips" },
    { id: "getting-there", label: "Getting There" },
    { id: "stay", label: "Where to Stay" },
    { id: "journeys", label: "Journeys" },
    { id: "faq", label: "FAQ" },
  ],
  overview: {
    eyebrow: "THE WILD NORTH",
    title: "Where the Serengeti Meets the Mara River",
    subtitle: "The far north is a place of open horizons, changing river light and wildlife moving on its own terms.",
    lead: "At the northern edge of Serengeti National Park, close to the Kenyan border, the landscape opens into rolling hills, broad grasslands and woodland that follows the rivers. Kogatende is a principal fly-in access point, while the Lamai area offers a quieter sense of distance within this remarkable wilderness.",
    body: "The Mara River gives this region its best-known seasonal story as wildebeest and zebra move through the wider Serengeti-Mara ecosystem. Their movements change with rainfall and grazing, and river crossings are never a daily spectacle. Beyond the migration, resident wildlife and varied habitats continue to reward patient game drives, making the north especially compelling for photographers and travelers seeking a northern wilderness experience.",
  },
  sections: {
    highlights: { eyebrow: "A REGION OF CONTRASTS", title: "What Makes the Northern Serengeti Distinct", subtitle: "Explore the defining features of the far north before seeing how its river, plains and woodland create different safari experiences." },
    landscape: { eyebrow: "READ THE LANDSCAPE", title: "Explore Northern Serengeti Habitats", subtitle: "Each habitat offers a different way to experience the wildlife and changing scenery." },
    seasons: { eyebrow: "PLAN YOUR SEASON", title: "When Is the Best Time to Visit Northern Serengeti?", subtitle: "Use broad seasonal patterns as a guide, then plan around rainfall and the conditions for your dates." },
    schedule: { eyebrow: "A DAY IN THE NORTH", title: "A Safari Day, Shaped by the Light", subtitle: "A flexible rhythm leaves room to explore, pause and respond to the landscape." },
    tips: { eyebrow: "TRAVEL THOUGHTFULLY", title: "Northern Serengeti Safari Tips", subtitle: "A little preparation helps keep the focus on the experience and the wildlife." },
    gettingThere: { eyebrow: "PLAN YOUR ROUTE", title: "Getting to Northern Serengeti", subtitle: "Choose your connections around the season, camp location and the time you want to spend in the field." },
    stay: { eyebrow: "A PLACE TO REST", title: "Where to Stay in Northern Serengeti", subtitle: "The right base depends on seasonal location, access to safari areas, comfort and budget." },
    journeys: { eyebrow: "BUILD YOUR ROUTE", title: "Northern Serengeti Safari Journeys", subtitle: "Choose a journey only after its route and seasonal camp locations are confirmed for your dates." },
    faq: { eyebrow: "PLAN WITH CONFIDENCE", title: "Northern Serengeti Safari Questions", subtitle: "Practical answers can help you choose the region, season and route that fit your plans." },
  },
  sidebarFacts: [
    { label: "Region", value: "Northern Serengeti", icon: "map" },
    { label: "Known for", value: "Mara River country and seasonal migration movement", icon: "route" },
    { label: "Main safari areas", value: "Kogatende and Lamai", icon: "compass" },
    { label: "Migration period", value: "Generally July to October, subject to rainfall", icon: "sun" }, // TODO(CONFIRM): verify annual timing for current travel guidance.
    { label: "Nearest major safari airstrip", value: "Kogatende", icon: "plane" },
    { label: "Wildlife", value: "Wildebeest, zebra, lion, leopard, cheetah, elephant, buffalo, giraffe, hippo and crocodile", icon: "paw" },
    { label: "Suggested stay", value: "Several nights allow flexibility; the exact recommendation depends on route and season.", icon: "clock" }, // TODO(CONFIRM): confirm suggested length of stay.
    { label: "Access", value: "Scheduled safari flights and overland routes, depending on itinerary", icon: "binoculars" },
  ],
  highlights: [
    { title: "The Mara River", text: "A vital water source and a natural corridor for wildlife, with an important role in the migration story.", icon: "route" },
    { title: "The Great Migration", text: "Wildebeest and zebra move through the north as part of a much larger seasonal journey.", icon: "paw" },
    { title: "Kogatende", text: "A main fly-in access point and a practical base for exploring northern safari areas.", icon: "plane" },
    { title: "The Lamai Triangle", text: "Remote country between the Mara River and the Kenyan border, shaped by hills and open grassland.", icon: "mountain" },
    { title: "Wildlife Beyond the Migration", text: "Resident lion, leopard, cheetah, elephant, buffalo and giraffe offer reasons to explore beyond the main migration period.", icon: "binoculars" },
    { title: "Wild Landscapes", text: "Rolling hills, open grasslands and riverine woodland bring variety to each drive.", icon: "trees" },
  ],
  zones: [
    { title: "Mara River Country", image: "/images/destinations/serengeti/northern/mara-river.jpg", description: "The Mara River cuts through the northern landscape, creating an important source of water and a natural corridor for wildlife.", bullets: ["Wildebeest and zebra may gather along the riverbanks", "Nile crocodiles inhabit the river", "River crossings depend on natural animal movement"], lookFor: ["Wildebeest", "Zebra", "Crocodiles", "Hippos"], bestTime: "Morning and late afternoon" }, // TODO(CONFIRM): verify local wildlife and habitat descriptions.
    { title: "Lamai Triangle", image: "/images/destinations/serengeti/northern/lamai-hills.jpg", description: "A remote landscape between the Mara River and the Kenyan border.", bullets: ["Rolling grassland and open views", "Seasonal migration movement", "Resident wildlife through the year"], lookFor: ["Lion", "Elephant", "Giraffe", "Plains game"], bestTime: "Early morning and golden hour" },
    { title: "Open Northern Plains", image: "/images/destinations/serengeti/northern/open-plains.jpg", description: "Wide grasslands and expansive horizons create a classic northern Serengeti atmosphere.", bullets: ["Open wildlife-viewing landscapes", "Grassland grazers and predator activity", "Broad photographic vistas"], lookFor: ["Zebra", "Wildebeest", "Gazelle", "Cheetah", "Lion"], bestTime: "Morning and late afternoon" },
    { title: "Riverine Forest and Woodlands", image: "/images/destinations/serengeti/northern/riverine-forest.jpg", description: "Woodland and vegetation along the river create a striking contrast with the open plains.", bullets: ["Shaded vegetation and wildlife corridors", "Birdlife along the water", "Habitat for river-associated animals"], lookFor: ["Elephant", "Buffalo", "Giraffe", "Hippo", "Birds"], bestTime: "Morning and late afternoon" },
  ],
  migration: {
    eyebrow: "THE GREAT MIGRATION",
    title: "The Extraordinary Journey of the Herds",
    subtitle: "The Northern Serengeti is one of the best-known regions for the Mara River migration season. Wildebeest and zebra move through the area as they follow grazing and water across the wider Serengeti-Mara ecosystem. Herd movements change with rainfall, and a crossing may not take place during any particular visit.",
    feature: {
      image: "/images/destinations/serengeti/northern/mara-river.jpg",
      imageAlt: "The Mara River winding through northern Serengeti woodland",
      points: [
        { title: "Plan broadly", text: "July to October is the general northern migration-planning period; rainfall influences where herds move." },
        { title: "Popular months", text: "August and September are often selected for migration travel, but crossings remain unpredictable." },
        { title: "Explore the north", text: "Kogatende and Lamai are important northern safari areas." },
        { title: "A living ecosystem", text: "Predators and crocodiles are part of the river ecosystem, alongside resident wildlife." },
      ],
      moment: {
        title: "The Art of Waiting for the Wild",
        text: "Riverbank photography rewards patience, careful observation and the guidance of an experienced guide. Watch wildlife respectfully from permitted areas, and let the changing early-morning and late-afternoon light shape the images you make.",
        noteTitle: "A Moment You Cannot Schedule",
        noteText: "A river crossing is one of nature's most unpredictable moments. Herds may gather, wait, approach the water and change direction before crossing. There is no timetable and no guarantee, which is part of the wild experience.",
        image: "/images/destinations/serengeti/northern/wildlife.jpg",
        imageAlt: "Wildebeest and zebra moving through a northern Serengeti landscape",
      },
      cta: { label: "Explore the Great Migration Guide", href: "/safaris/serengeti/great-migration" },
    },
  },
  wildlife: {
    eyebrow: "WILDLIFE OF THE NORTH",
    title: "Life Along the Northern Plains",
    subtitle: "Migration adds a seasonal chapter, while resident wildlife and river habitats shape the region throughout the year.",
    items: [
      { name: "Wildebeest", outlook: "Seasonal movement", where: "Northern plains and river corridors as herds move through the wider ecosystem", bestTime: "Varies with rainfall and migration" },
      { name: "Zebra", outlook: "Seasonal movement", where: "Open grasslands and migration routes, often alongside wildebeest", bestTime: "Varies with herd movement" },
      { name: "Lion", outlook: "Resident wildlife", where: "Across suitable grassland and woodland habitat", bestTime: "Early morning and late afternoon" },
      { name: "Leopard", outlook: "Riverine and woodland habitat", where: "Suitable cover along riverine and wooded areas", bestTime: "Early morning and late afternoon" },
      { name: "Cheetah", outlook: "Open grassland", where: "Open country where visibility allows", bestTime: "Morning and late afternoon" },
      { name: "Elephant", outlook: "Resident wildlife", where: "Woodland, plains and river-associated habitat", bestTime: "Conditions vary" },
      { name: "Buffalo", outlook: "Resident wildlife", where: "Grassland and woodland", bestTime: "Conditions vary" },
      { name: "Giraffe", outlook: "Resident wildlife", where: "Across suitable browsing habitat", bestTime: "Throughout the day" },
      { name: "Hippo", outlook: "River habitat", where: "Pools along the Mara River", bestTime: "Often seen resting in pools during the day" },
      { name: "Nile crocodile", outlook: "River habitat", where: "The Mara River", bestTime: "Sightings depend on location and conditions" },
    ], // TODO(CONFIRM): verify species distribution and habitat wording for the Northern Serengeti.
    callout: "Wildlife is wild. Animal movements and sightings are never guaranteed. The best safari experience comes from allowing time, remaining patient and working with knowledgeable guides.",
    image: "/images/destinations/serengeti/northern/wildlife.jpg",
    imageAlt: "Wildlife in the open northern Serengeti",
  },
  seasons: {
    caption: "Northern Serengeti general guide to migration movement, resident wildlife and river activity by month",
    rows: [
      { label: "Migration in the north", months: ["quiet", "quiet", "quiet", "quiet", "quiet", "good", "peak", "peak", "peak", "good", "good", "good"] },
      { label: "Resident wildlife", months: ["good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good"] },
      { label: "River crossing activity", months: ["quiet", "quiet", "quiet", "quiet", "quiet", "good", "good", "peak", "peak", "good", "quiet", "quiet"] },
    ], // TODO(CONFIRM): verify this illustrative seasonal calendar; migration and crossings vary with rainfall.
    cards: [
      { range: "July to October", title: "Northern migration season", text: "This is the general period associated with migration movement through the north and Mara River crossing activity. Crossings are never guaranteed.", icon: "paw" },
      { range: "August to September", title: "Popular planning months", text: "Travelers often choose these months when planning for the northern migration. Herd locations and river activity remain unpredictable.", icon: "route" },
      { range: "November to December", title: "Return movement", text: "As rainfall and grazing patterns change, herds generally begin moving southward.", icon: "leaf" },
      { range: "Other months", title: "A different northern Serengeti", text: "Resident wildlife, quieter safari drives and landscape photography can make other months rewarding too.", icon: "camera" },
    ],
  },
  seasonNote: "These are general seasonal patterns, not guaranteed dates. Rainfall affects the location and movement of wildlife every year.",
  schedule: [
    { time: "Early morning", title: "Into first light", text: "Depart as light breaks over the northern landscape.", icon: "sunrise" },
    { time: "Morning", title: "Wildlife corridors", text: "Explore river corridors and open plains with your guide.", icon: "binoculars" },
    { time: "Mid-morning", title: "A planned breakfast stop", text: "Enjoy breakfast according to the arrangements for your safari.", icon: "coffee" },
    { time: "Afternoon", title: "Follow the day", text: "Continue game viewing and respond to promising wildlife activity.", icon: "sun" },
    { time: "Golden hour", title: "Warm northern light", text: "Photograph the landscape as the light softens toward evening.", icon: "sunset" },
    { time: "Evening", title: "Return to camp", text: "Head back to camp or lodge for dinner and rest.", icon: "moon" },
  ],
  tips: [
    { title: "Allow enough time", text: "Extra flexibility gives you room to explore at a patient pace." , icon: "clock" },
    { title: "Choose your camp location carefully", text: "Discuss seasonal location and access to the areas you hope to explore.", icon: "map" },
    { title: "Bring binoculars", text: "They make distant wildlife easier to observe without disturbing it.", icon: "binoculars" },
    { title: "Carry camera equipment", text: "Bring the equipment that suits your interests and travel plans.", icon: "camera" },
    { title: "Dress in comfortable layers", text: "Layers help you adjust as the day changes.", icon: "leaf" },
    { title: "Be patient and respectful", text: "Follow your guide's advice and observe wildlife from permitted areas.", icon: "paw" },
  ],
  gettingThere: {
    road: {
      title: "By road",
      description: "The northern region can be reached overland from other parts of the Serengeti. The journey from Central Serengeti is long and road conditions vary.",
      times: [],
      steps: ["Plan the route around your camp location", "Allow for changing road and seasonal conditions", "Confirm the overland connection with your safari planner"],
    },
    air: {
      title: "By air",
      description: "Kogatende is a key airstrip for the northern region. Scheduled safari flights and connections from other Serengeti airstrips are commonly used.",
      times: [],
      steps: ["Review flight options for your dates", "Confirm routing and baggage details with the operator", "Arrange the onward transfer to your camp"],
    },
    note: "Combining the Northern and Central Serengeti can create a varied itinerary. A fly-in or fly-out arrangement may reduce long transfers. Choose your route around travel dates, camp location, available flights and the experience you want.",
  },
  stay: {
    tiers: [
      { title: "Comfortable safari camps", description: "Practical stays that keep you close to the landscape and the day's game drives.", bestFor: "Travelers prioritizing time in the wild", recommendedFor: "Flexible itineraries with a focus on exploration" },
      { title: "Mid-range tented camps and lodges", description: "A balance of comfort, setting and access to northern safari areas.", bestFor: "Travelers seeking comfort and location", recommendedFor: "A considered balance of experience and budget" },
      { title: "Luxury safari camps and lodges", description: "Elevated comfort in a setting chosen to suit the route and season.", bestFor: "Travelers seeking an enhanced stay", recommendedFor: "Special occasions and tailored journeys" },
    ],
    footnote: "Accommodation options and availability are confirmed in your personal proposal.", // TODO(REPLACE): confirm available accommodation partners and seasonal locations.
    href: "/safaris/serengeti/where-to-stay",
    linkLabel: "Explore Where to Stay in the Serengeti",
    introduction: "Choose a base according to its seasonal location, access to northern safari areas, comfort and the budget that suits your journey.",
    image: "/images/destinations/serengeti/northern/camp.jpg",
    imageAlt: "A safari camp set in the northern Serengeti landscape",
  },
  journeys: {
    title: "Northern Serengeti Safari Journeys",
    subtitle: "Choose a journey only after its route and seasonal camp locations are confirmed for your dates.",
    packageTag: "Northern Serengeti",
    fallbackTitle: "A tailor-made journey to the north",
    fallbackDescription: "The Northern Serengeti can be included in a tailor-made safari. Tell us your preferred travel dates and we will help design a suitable journey.",
    fallbackCta: "Plan a Northern Serengeti Safari",
  },
  faqs: [
    { question: "When is the best time to visit Northern Serengeti?", answer: "July to October is the general period associated with migration viewing in the north. Rainfall influences where the herds move, so timing and locations vary." },
    { question: "Can I see the Mara River crossings?", answer: "Crossings are possible during the migration season, but they are unpredictable and cannot be guaranteed during a visit." },
    { question: "How do I get to Northern Serengeti?", answer: "Kogatende is a key airstrip for safari flights. Overland connections from other Serengeti areas may also be arranged, depending on your itinerary." },
    { question: "What animals can I see?", answer: "Wildlife may include wildebeest, zebra, lion, leopard, elephant, giraffe, cheetah, buffalo, hippo, crocodile and many other species. Sightings vary." },
    { question: "Is Northern Serengeti worth visiting outside migration season?", answer: "Resident wildlife, river habitats and broad northern landscapes can make the region rewarding outside the main migration period." },
    { question: "How many nights should I stay?", answer: "Additional nights allow more flexibility for game drives and changing wildlife activity. The right length depends on your route and travel plans." },
    { question: "Is Northern Serengeti good for photography?", answer: "The river landscapes, wildlife, seasonal movement and changing light offer varied photographic opportunities. Wildlife activity cannot be scheduled." },
    { question: "Can I combine Northern and Central Serengeti?", answer: "Yes. Itineraries can combine the regions depending on your available time, budget, camp locations and flight logistics." },
  ],
  related: [
    { title: "Explore Serengeti National Park", href: "/safaris/serengeti", description: "Compare the regions and plan around the wider ecosystem." },
    { title: "Central Serengeti and Seronera", href: "/safaris/serengeti/central-seronera", description: "Explore the central valley and its year-round wildlife." },
    { title: "Western Corridor and Grumeti", href: "/safaris/serengeti/western-corridor", description: "Discover river country along the migration's western passage." },
    { title: "Southern Serengeti and Ndutu", href: "/safaris/serengeti/southern-ndutu", description: "Learn about the southern plains and seasonal calving period." },
    { title: "Great Migration Guide", href: "/safaris/serengeti/great-migration", description: "Understand the herds' seasonal movement across the ecosystem." },
    { title: "Where to Stay in the Serengeti", href: "/safaris/serengeti/where-to-stay", description: "Explore accommodation styles and locations." },
    { title: "Safari Packages", href: "/safaris/packages", description: "Browse safari journeys and discuss a route that fits your dates." },
  ],
  cta: {
    title: "Discover the Wild Beauty of Northern Serengeti",
    description: "Tell us when you would like to travel and what you dream of seeing. Our women-led, Tanzania-based team will help design a safari around the northern landscapes and experiences that interest you.",
    primary: "Plan My Northern Serengeti Safari",
    secondary: "Chat on WhatsApp",
  },
  ctaEyebrow: "PLAN YOUR NORTHERN SERENGETI SAFARI",
  ctaImage: "/images/destinations/serengeti/northern/cta.jpg",
  ctaImageAlt: "Evening light over the northern Serengeti",
  whatsappMessage: "Hello, I would like to plan a Northern Serengeti safari.",
};

export const westernCorridor: SerengetiRegionPageData = {
  meta: {
    title: "Western Serengeti Safari: Grumeti River and Great Migration",
    description: "Discover the Western Serengeti and Grumeti River. Explore the Great Migration, crocodile-filled river crossings, resident wildlife, riverine forests and the best time to visit Tanzania's Western Corridor.",
  },
  hero: {
    image: "/images/destinations/serengeti/western/hero.jpg",
    eyebrow: "WESTERN SERENGETI",
    title: "Western Serengeti",
    subtitle: "Discover the quieter western reaches of the Serengeti, where riverine forests, rolling landscapes and the Grumeti River create a remarkable setting for wildlife encounters and the seasonal movement of the Great Migration.",
    chips: ["Grumeti River Country", "Western Migration Region", "Wildlife All Year"],
    primary: { label: "Explore Western Serengeti Safaris", href: "#journeys" },
    secondary: { label: "Plan Your Western Serengeti Safari", href: "/plan-your-safari?type=Safari" },
  },
  breadcrumbs: [
    { title: "Home", href: "/" },
    { title: "Safaris", href: "/safaris" },
    { title: "Serengeti", href: "/safaris/serengeti" },
    { title: "Western Corridor", href: "/safaris/serengeti/western-corridor" },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "landscape", label: "Landscape" },
    { id: "migration", label: "Grumeti Migration" },
    { id: "wildlife", label: "Wildlife" },
    { id: "best-time", label: "Best Time" },
    { id: "schedule", label: "A Safari Day" },
    { id: "tips", label: "Safari Tips" },
    { id: "getting-there", label: "Getting There" },
    { id: "stay", label: "Where to Stay" },
    { id: "journeys", label: "Journeys" },
    { id: "faq", label: "FAQ" },
  ],
  overview: {
    eyebrow: "THE WESTERN WILDERNESS",
    title: "Discover the Untamed Beauty of the Western Corridor",
    subtitle: "Follow the river west, where woodland, hills and open country give the Serengeti a different rhythm.",
    lead: "The Western Corridor extends toward Lake Victoria, where open grasslands meet wooded hills and riverine forest. The Grumeti River is its defining waterway, shaping habitats and providing a natural route through this less-travelled part of Serengeti National Park.",
    body: "As the Great Migration moves west and north, wildebeest and zebra pass through the corridor, with river activity depending on rainfall and the herds' changing decisions. Resident wildlife and varied habitats remain part of the region beyond that seasonal passage. For travelers who want a different atmosphere from the central and northern areas, the west offers its own mix of river country, quiet drives and broad landscapes.",
  },
  sections: {
    highlights: { eyebrow: "A REGION OF CONTRASTS", title: "What Makes the Western Corridor Distinct", subtitle: "From the Grumeti River to wooded hills, each feature brings a different character to the western Serengeti." },
    landscape: { eyebrow: "READ THE LANDSCAPE", title: "Explore the Western Corridor", subtitle: "Move between riverine habitat, open plains and wooded valleys to see the region from several perspectives." },
    seasons: { eyebrow: "WHEN TO EXPLORE", title: "Choose the Right Season for Your Western Serengeti Safari", subtitle: "Use these broad patterns to begin planning, while allowing rainfall and wildlife movement to guide the final timing." },
    schedule: { eyebrow: "A DAY IN THE WEST", title: "A Day in the Western Corridor", subtitle: "Set a gentle rhythm for the day, with room to explore different habitats and respond to wildlife activity." },
    tips: { eyebrow: "PHOTOGRAPHY AND SAFARI TIPS", title: "Prepare for a Thoughtful Safari", subtitle: "Small practical choices can make time in the corridor more comfortable and rewarding." },
    gettingThere: { eyebrow: "PLAN YOUR ROUTE", title: "How to Reach the Western Serengeti", subtitle: "Compare road and air connections around your dates, camp location and wider Serengeti itinerary." },
    stay: { eyebrow: "A PLACE TO REST", title: "Where to Stay in the Western Serengeti", subtitle: "Consider location, comfort, access and the kind of safari experience you want." },
    journeys: { eyebrow: "BUILD YOUR ROUTE", title: "Western Serengeti Safari Journeys", subtitle: "Review route details carefully so every itinerary matches its season, camps and access arrangements." },
    faq: { eyebrow: "PLAN WITH CONFIDENCE", title: "Western Serengeti Safari Questions", subtitle: "Find practical guidance on seasonal timing, river crossings, access and planning your stay." },
  },
  sidebarFacts: [
    { label: "Region", value: "Western Serengeti", icon: "map" },
    { label: "Main attraction", value: "The Grumeti River and its surrounding habitats", icon: "route" },
    { label: "General migration period", value: "May to July, with timing affected by rainfall", icon: "sun" }, // TODO(CONFIRM): verify annual timing for current travel guidance.
    { label: "Crossing planning period", value: "June is often important to migration planning; crossings are not guaranteed.", icon: "paw" }, // TODO(CONFIRM): verify seasonal guidance.
    { label: "Access airstrips", value: "Grumeti and Kirawira", icon: "plane" },
    { label: "Wildlife", value: "Wildebeest, zebra, lion, leopard, elephant, buffalo, giraffe, hippo, crocodile, colobus monkeys and birds", icon: "binoculars" },
    { label: "Landscapes", value: "Riverine forest, open plains and wooded hills", icon: "trees" },
    { label: "Suggested stay", value: "Choose a flexible stay to suit the route and seasonal wildlife activity.", icon: "clock" }, // TODO(CONFIRM): confirm recommended length of stay.
    { label: "Access", value: "Safari flights and overland connections, depending on itinerary", icon: "compass" },
  ],
  highlights: [
    { title: "The Grumeti River", text: "An important water source and wildlife corridor in the western Serengeti.", icon: "route" },
    { title: "Grumeti River Crossings", text: "Wildebeest and zebra may pass through the river corridor during the westward migration.", icon: "paw" },
    { title: "Nile Crocodiles", text: "Crocodiles are part of the river ecosystem, alongside hippos and other wildlife.", icon: "binoculars" },
    { title: "Riverine Forests", text: "Vegetation along the river creates varied habitat and opportunities to notice birdlife.", icon: "trees" },
    { title: "A Quieter Wilderness", text: "The corridor is often less visited than central areas, though activity varies by season and location.", icon: "compass" },
    { title: "Wildlife Beyond Migration", text: "Resident animals and varied habitats remain important reasons to explore after the herds move on.", icon: "paw" },
  ],
  zones: [
    { title: "The Grumeti River", image: "/images/destinations/serengeti/western/grumeti-river.jpg", description: "The Grumeti River is one of the defining features of the Western Corridor. Its pools and riverbanks support a variety of wildlife.", bullets: ["An important water source", "Hippos and crocodiles", "Seasonal migration crossings"], lookFor: ["Hippos", "Crocodiles", "Wildebeest", "Birds"], bestTime: "Early morning and late afternoon" }, // TODO(CONFIRM): verify habitat and seasonal wildlife descriptions.
    { title: "Riverine Forest", image: "/images/destinations/serengeti/western/riverine-forest.jpg", description: "Vegetation follows the river, creating a contrasting landscape of trees, shaded habitat and open grassland.", bullets: ["Habitat for diverse wildlife", "Birdwatching opportunities", "Woodland photography"], lookFor: ["Colobus monkeys where present", "Birds", "Woodland species"], bestTime: "Morning" },
    { title: "Open Plains", image: "/images/destinations/serengeti/western/open-plains.jpg", description: "Wide grassland areas provide space for herbivores and the predators that follow them.", bullets: ["Wildebeest and zebra movement", "Predator-prey activity", "Expansive landscapes"], lookFor: ["Lion", "Zebra", "Wildebeest", "Giraffe", "Plains game"], bestTime: "Morning and late afternoon" },
    { title: "Wooded Hills and Valleys", image: "/images/destinations/serengeti/western/wooded-hills.jpg", description: "A more textured landscape, combining open country with rolling hills and scattered trees.", bullets: ["Scenic safari drives", "Changing terrain", "Wildlife corridors"], lookFor: ["Elephant", "Buffalo", "Giraffe", "Antelope"], bestTime: "Golden hour" },
  ],
  migration: {
    eyebrow: "THE GRUMETI RIVER MIGRATION",
    title: "Where the Great Migration Meets the Grumeti",
    subtitle: "From May to July, the western Serengeti is part of the migration's passage through the ecosystem. Wildebeest and zebra move through the landscape, while rainfall, grazing and natural animal movement shape where the herds travel. River crossings are unpredictable, and resident wildlife makes the region worth considering beyond migration season.",
    feature: {
      image: "/images/destinations/serengeti/western/grumeti-river.jpg",
      imageAlt: "A stretch of the Grumeti River bordered by western Serengeti vegetation",
      points: [
        { title: "A broad planning window", text: "May to July is the general period associated with migration movement in the western corridor." },
        { title: "A frequently important month", text: "June is often chosen for Grumeti migration planning, but a crossing cannot be promised." },
        { title: "River ecosystem", text: "Nile crocodiles and other wildlife are part of the Grumeti River habitat." },
        { title: "Beyond the herds", text: "The western corridor continues to offer resident wildlife and varied habitats through the year." },
      ],
      moment: {
        title: "A Different Kind of River Crossing",
        text: "The Grumeti is an important part of the Great Migration's western journey. Watching the herds approach the water, pause and decide when to cross can be an extraordinary wildlife experience. It is a natural event, never a scheduled performance.",
        image: "/images/destinations/serengeti/western/grumeti-crossing.jpg",
        imageAlt: "Wildebeest approaching the Grumeti River during a seasonal migration",
        cards: [
          { title: "The River Ecosystem", text: "Crocodiles, hippos and aquatic habitat form part of this living river system." },
          { title: "The Migration", text: "Wildebeest and zebra move through the west as rainfall and grazing patterns shift." },
          { title: "The Waiting", text: "Patience, experienced guiding and responsible observation matter more than a timetable." },
        ],
      },
      cta: { label: "Explore the Great Migration Guide", href: "/safaris/serengeti/great-migration" },
      comparison: {
        title: "Grumeti Versus Mara",
        text: "The Grumeti is generally associated with the earlier western movement, while Mara River crossings are associated with the Northern Serengeti later in the year. Both depend on natural migration patterns and rainfall.",
        regions: [
          { title: "Grumeti River", text: "Western Corridor, generally May to July.", href: "/safaris/serengeti/western-corridor" },
          { title: "Mara River", text: "Northern Serengeti, generally July to October.", href: "/safaris/serengeti/northern-serengeti" },
        ],
      },
    },
  },
  wildlife: {
    eyebrow: "WILDLIFE OF THE WEST",
    title: "Meet the Residents of the Western Corridor",
    subtitle: "The river, woodland and open plains support a range of wildlife in every season, with migration adding another layer at certain times of year.",
    items: [
      { name: "Wildebeest", outlook: "Seasonal herds", where: "Western grasslands and migration routes", bestTime: "Varies with rainfall and herd movement" },
      { name: "Zebra", outlook: "Seasonal herds", where: "Open grassland and areas shared with migrating wildebeest", bestTime: "Varies with herd movement" },
      { name: "Lion", outlook: "Resident wildlife", where: "Suitable grassland and woodland habitats", bestTime: "Early morning and late afternoon" },
      { name: "Leopard", outlook: "Woodland habitat", where: "Suitable riverine and wooded areas", bestTime: "Early morning and late afternoon" },
      { name: "Elephant", outlook: "Resident wildlife", where: "Woodland, river edges and open country", bestTime: "Conditions vary" },
      { name: "Buffalo", outlook: "Resident wildlife", where: "Grassland and woodland", bestTime: "Conditions vary" },
      { name: "Giraffe", outlook: "Resident wildlife", where: "Across suitable browsing habitat", bestTime: "Throughout the day" },
      { name: "Hippo", outlook: "River habitat", where: "Pools along the Grumeti River", bestTime: "Often seen resting in pools during the day" },
      { name: "Nile crocodile", outlook: "River habitat", where: "The Grumeti River", bestTime: "Sightings depend on location and conditions" },
      { name: "Colobus monkeys", outlook: "Where present", where: "Woodland habitat along the river", bestTime: "Conditions vary" },
      { name: "Birds", outlook: "River and woodland habitat", where: "Riverine forest, woodland and open country", bestTime: "Throughout the day" },
    ], // TODO(CONFIRM): verify species distribution and habitat wording for the Western Corridor.
    callout: "The Western Corridor offers more than migration viewing. Its river system and varied habitats continue to support wildlife throughout the year.",
    image: "/images/destinations/serengeti/western/wildlife.jpg",
    imageAlt: "Wildlife among the riverine and grassland habitats of the Western Corridor",
  },
  seasons: {
    caption: "Western Corridor general guide to migration movement, resident wildlife and river activity by month",
    rows: [
      { label: "Migration in the west", months: ["quiet", "quiet", "quiet", "quiet", "good", "peak", "good", "quiet", "quiet", "quiet", "quiet", "quiet"] },
      { label: "Resident wildlife", months: ["good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good"] },
      { label: "River crossing activity", months: ["quiet", "quiet", "quiet", "quiet", "good", "peak", "good", "quiet", "quiet", "quiet", "quiet", "quiet"] },
    ], // TODO(CONFIRM): verify this illustrative seasonal calendar; migration and crossings vary with rainfall.
    cards: [
      { range: "May", title: "The migration arrives", text: "Herds generally begin moving into the western corridor. The landscape may be lush as the long rains end.", icon: "paw" },
      { range: "June", title: "An important Grumeti planning window", text: "The river can become an important crossing area as the migration moves through the west. Crossings remain unpredictable.", icon: "route" },
      { range: "July", title: "The herds move north", text: "Some herds continue northward toward the Northern Serengeti.", icon: "compass" },
      { range: "August to October", title: "Beyond the main migration window", text: "The main migration movement is generally farther north, while resident wildlife and river habitats remain.", icon: "trees" },
      { range: "November to April", title: "A different seasonal experience", text: "Greener vegetation and changing rainfall conditions can shape a different visit. Conditions vary from year to year.", icon: "leaf" },
    ],
  },
  seasonNote: "These are approximate seasonal patterns. The migration follows rainfall, grazing and natural animal movement, not a fixed calendar.",
  schedule: [
    { time: "Early morning", title: "Into the first light", text: "Set out as the western landscape begins to glow.", icon: "sunrise" },
    { time: "Morning", title: "River and plains", text: "Explore riverine habitat and surrounding grasslands.", icon: "binoculars" },
    { time: "Mid-morning", title: "A planned breakfast stop", text: "Enjoy a planned bush breakfast or return to camp, according to your arrangements.", icon: "coffee" },
    { time: "Afternoon", title: "A new wildlife area", text: "Continue exploring and look for changing activity across the corridor.", icon: "sun" },
    { time: "Golden hour", title: "Warm western light", text: "Experience the hills and open country in softer evening light.", icon: "sunset" },
    { time: "Evening", title: "Return to camp", text: "Head back for dinner and rest after a day outdoors.", icon: "moon" },
  ],
  tips: [
    { title: "Bring binoculars", text: "Use them to observe distant wildlife while keeping a respectful distance.", icon: "binoculars" },
    { title: "Carry suitable camera equipment", text: "Choose equipment suited to your interests and travel plans.", icon: "camera" },
    { title: "Allow flexibility around migration dates", text: "Rainfall and wildlife movement vary, so keep expectations open.", icon: "clock" },
    { title: "Dress in comfortable layers", text: "Layers make it easier to adjust throughout the day.", icon: "leaf" },
    { title: "Respect wildlife distances", text: "Follow guide instructions and observe from permitted areas.", icon: "paw" },
    { title: "Choose a suitable camp location", text: "Discuss route, seasonal access and comfort with your safari planner.", icon: "map" },
  ],
  gettingThere: {
    road: {
      title: "By road",
      description: "The Western Corridor can be combined with Central Serengeti through an overland safari route. Driving time depends on the selected camp, season and road conditions.",
      times: [],
      steps: ["Review overland connections with your planner", "Choose a route suited to your camp location", "Allow for seasonal road conditions"],
    },
    air: {
      title: "By air",
      description: "Grumeti and Kirawira are important airstrip access points for the western region. Safari flights may connect with Arusha and other Serengeti airstrips, depending on operator schedules and routing.",
      times: [],
      steps: ["Check flight options for your travel dates", "Confirm operator routing and baggage details", "Arrange the transfer from the airstrip to camp"],
    },
    note: "The Western Corridor and Central Serengeti may be combined in one itinerary. A Northern Serengeti extension can also be considered when time allows. Confirm arrangements against your travel dates, camp location and available connections.",
  },
  stay: {
    tiers: [
      { title: "Comfortable safari camps", description: "A practical base for days exploring the river, plains and surrounding country.", bestFor: "Travelers focused on time outdoors", recommendedFor: "A straightforward stay shaped around the route" },
      { title: "Mid-range tented camps and lodges", description: "Comfortable stays that balance setting, access and value.", bestFor: "Travelers seeking comfort and location", recommendedFor: "A considered balance of experience and budget" },
      { title: "Luxury safari camps and lodges", description: "Elevated comfort with a location chosen to suit the season and itinerary.", bestFor: "Travelers seeking an enhanced stay", recommendedFor: "Special occasions and tailored journeys" },
    ],
    footnote: "Accommodation options and availability are confirmed in your personal proposal.", // TODO(REPLACE): confirm available accommodation partners and seasonal locations.
    href: "/safaris/serengeti/where-to-stay",
    linkLabel: "Explore Where to Stay in the Serengeti",
    introduction: "Choose a base according to its access to the Grumeti River, surrounding habitats, seasonal route, comfort and budget.",
    image: "/images/destinations/serengeti/western/camp.jpg",
    imageAlt: "A safari camp set among the Western Serengeti landscape",
  },
  journeys: {
    title: "Western Serengeti Safari Journeys",
    subtitle: "Review route details carefully so every itinerary matches its season, camps and access arrangements.",
    packageTag: "Western Corridor",
    fallbackTitle: "A custom journey through the west",
    fallbackDescription: "The Western Corridor can be included in a tailor-made safari. Share your preferred dates and interests, and the team can help shape a suitable itinerary.",
    fallbackCta: "Plan a Western Serengeti Safari",
  },
  faqs: [
    { question: "When is the best time to visit the Western Serengeti?", answer: "May to July is the approximate migration window for the western corridor, and June is often an important planning period. Rainfall affects herd movement, and sightings cannot be guaranteed." },
    { question: "What is the Grumeti River crossing?", answer: "It describes wildebeest and zebra crossing the Grumeti River as part of the Great Migration. Whether and when a crossing happens depends on natural animal movement." },
    { question: "What animals live in the Western Corridor?", answer: "Wildlife may include lion, leopard, elephant, buffalo, giraffe, hippo, crocodile, colobus monkeys where present, and a variety of birds." },
    { question: "Can I visit outside migration season?", answer: "Yes. Resident wildlife, riverine forest, open plains and wooded hills provide reasons to consider the region beyond the migration period." },
    { question: "How do I get to the Western Corridor?", answer: "Grumeti and Kirawira are access airstrips for the region. Overland routes can connect the Western Corridor with other Serengeti areas." },
    { question: "What is the difference between Grumeti and Mara River crossings?", answer: "Grumeti crossings are generally associated with the earlier westward movement, while Mara River crossings are associated with the Northern Serengeti later in the year. Both depend on natural migration patterns." },
    { question: "Is the Western Corridor quieter than Central Serengeti?", answer: "It is often less visited than central areas, but crowd levels vary with season, location and wildlife activity." },
    { question: "How many nights should I spend here?", answer: "A flexible itinerary allows more time to explore and respond to wildlife activity. The right length depends on your route, travel dates and confirmed package." },
  ],
  related: [
    { title: "Explore Serengeti National Park", href: "/safaris/serengeti", description: "Compare regions and explore the wider ecosystem." },
    { title: "Central Serengeti and Seronera", href: "/safaris/serengeti/central-seronera", description: "Discover the central valley and year-round wildlife." },
    { title: "Northern Serengeti", href: "/safaris/serengeti/northern-serengeti", description: "Explore Mara River country and the northern migration region." },
    { title: "Southern Serengeti and Ndutu", href: "/safaris/serengeti/southern-ndutu", description: "Learn about the southern plains and seasonal calving." },
    { title: "Great Migration Guide", href: "/safaris/serengeti/great-migration", description: "Follow the seasonal movement across the Serengeti ecosystem." },
    { title: "Where to Stay in the Serengeti", href: "/safaris/serengeti/where-to-stay", description: "Explore accommodation styles and locations." },
    { title: "Safari Packages", href: "/safaris/packages", description: "Browse available journeys and discuss a route that fits your dates." },
  ],
  cta: {
    title: "Experience the Wild Beauty of the Western Corridor",
    description: "Discover a different side of the Serengeti, from the Grumeti River to the open plains and beautiful woodland. Tell us your travel dates and our women-led, Tanzania-based team will help create a journey around your interests.",
    primary: "Plan My Western Serengeti Safari",
    secondary: "Chat on WhatsApp",
  },
  ctaEyebrow: "PLAN YOUR WESTERN SERENGETI SAFARI",
  ctaImage: "/images/destinations/serengeti/western/cta.jpg",
  ctaImageAlt: "Golden light settling over the Western Serengeti",
  whatsappMessage: "Hello, I would like to plan a Western Serengeti safari.",
};

export const southernNdutu: SouthernNdutuData = {
  meta: {
    title: "Southern Serengeti and Ndutu Safari | Wildebeest Calving Season",
    description: "Discover the Southern Serengeti and Ndutu plains in Tanzania. Experience wildebeest calving season, remarkable wildlife, predator activity and tailor-made safaris. Find the best time to visit and plan your journey.",
  },
  hero: {
    image: "/images/destinations/serengeti/southern-ndutu/hero.jpg",
    eyebrow: "SOUTHERN SERENGETI AND NDUTU",
    title: "Southern Serengeti and Ndutu",
    subtitle: "Discover the southern plains of the Serengeti ecosystem, where fresh green grass, immense wildebeest herds and the arrival of thousands of newborn calves create one of Africa's most extraordinary wildlife seasons.",
    chips: ["Great Migration Calving Grounds", "Big Cat Country", "Beautiful Green-Season Landscapes"],
    primary: { label: "Explore Southern Serengeti Safaris", href: "#landscape" },
    secondary: { label: "Plan Your Ndutu Safari", href: "/plan-your-safari?type=Safari" },
  },
  breadcrumbs: [
    { title: "Home", href: "/" },
    { title: "Safaris", href: "/safaris" },
    { title: "Serengeti", href: "/safaris/serengeti" },
    { title: "Southern Serengeti and Ndutu", href: "/safaris/serengeti/southern-ndutu" },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "landscape", label: "Landscape" },
    { id: "calving", label: "Calving Season" },
    { id: "wildlife", label: "Wildlife" },
    { id: "best-time", label: "Best Time" },
    { id: "experiences", label: "Experiences" },
    { id: "schedule", label: "A Safari Day" },
    { id: "getting-there", label: "Getting There" },
    { id: "stay", label: "Where to Stay" },
    { id: "journeys", label: "Journeys" },
    { id: "faq", label: "FAQ" },
  ],
  overview: {
    eyebrow: "THE SOUTHERN WILDERNESS",
    title: "A Landscape Filled With Life",
    lead: "A Southern Serengeti safari follows a changing landscape of open grassland, marshes, woodland and seasonal lakes. The southern plains are especially important to the wider Serengeti ecosystem when rain-fed grazing draws migratory wildebeest and zebra south. Short grasses provide a seasonal pasture, and between January and March the region is widely associated with the wildebeest calving period. Herds, new calves and resident predators shape a living landscape, while the open horizons and changing light reward patient observation and photography.",
    body: "Ndutu is a distinct part of this broader southern ecosystem: the Ndutu area lies within the Ngorongoro Conservation Area, alongside the southern Serengeti plains, rather than wholly inside Serengeti National Park. Lake Ndutu, Lake Masek, marshes and acacia country add variety to the open grazing areas. Because a safari route can pass through land managed by different authorities, the applicable conservation-area and national-park fees depend on the exact route and itinerary. Rainfall influences where the herds gather and how long they remain, so the experience is seasonal rather than fixed.",
  },
  sidebarFacts: [
    { label: "Region", value: "Southern Serengeti ecosystem", icon: "map" },
    { label: "Featured area", value: "Ndutu, within the Ngorongoro Conservation Area", icon: "compass" },
    { label: "Famous for", value: "Wildebeest calving season", icon: "paw" },
    { label: "Main viewing period", value: "Generally December to March; rainfall and herds vary", icon: "sun" },
    { label: "Peak calving period", value: "January to February is commonly important, particularly February", icon: "clock" },
    { label: "Wildlife", value: "Wildebeest, zebra, gazelle, predators, elephant, giraffe and birdlife", icon: "binoculars" },
    { label: "Landscapes", value: "Short-grass plains, lakes, marshes and woodlands", icon: "trees" },
    { label: "Suggested stay", value: "Allow flexibility; the best length depends on the route and season.", icon: "clock" }, // TODO(CONFIRM): verify a typical recommended stay.
    { label: "Access", value: "Safari vehicles and regional airstrip connections, subject to routing and availability", icon: "plane" },
  ],
  highlights: [
    { title: "The Great Migration", text: "During the green season, migratory wildebeest and zebra use the southern grazing areas as part of a much wider journey shaped by rainfall and fresh grass.", icon: "route" },
    { title: "Wildebeest Calving Season", text: "A concentrated period of births generally takes place across the southern plains from January to March, forming an important chapter in the annual migration.", icon: "paw" },
    { title: "Predator Activity", text: "Large herds attract the attention of lions, cheetahs and hyenas. Their presence is part of the ecosystem, but animal encounters remain unpredictable.", icon: "binoculars" },
    { title: "Ndutu Lakes", text: "Lake Ndutu and Lake Masek sit among wetlands, grassland and woodland. Water and birdlife add another dimension to the seasonal landscape.", icon: "map" },
    { title: "Short-Grass Plains", text: "Volcanic soils and open short grass support seasonal grazing. Herd locations still vary with rain, grazing conditions and natural movement.", icon: "leaf" },
    { title: "Green-Season Landscapes", text: "Seasonal growth can bring fresh colour, dramatic skies and open photographic views across a landscape that changes through the year.", icon: "camera" },
  ],
  zones: [
    {
      title: "The Short-Grass Plains",
      image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg",
      description: "The open short-grass plains form an important seasonal grazing area for migratory wildebeest. The grazing landscape supports the herds during the calving period, while remaining a broad, open place for wildlife observation.",
      bullets: ["Seasonal grazing", "Wildebeest calving period", "Open wildlife-viewing landscapes"],
      lookFor: ["Wildebeest", "Zebra", "Gazelle", "Cheetah", "Lion"],
      bestTime: "Early morning and late afternoon",
    },
    {
      title: "Lake Ndutu and Lake Masek",
      image: "/images/destinations/serengeti/southern-ndutu/lakes.jpg",
      description: "The lakes and their surrounding wetlands add water, birdlife and a distinctive visual character to the southern landscape. Water conditions and wildlife activity change with the season.",
      bullets: ["Seasonal water and wetlands", "Birdwatching", "Wildlife using surrounding habitats"],
      lookFor: ["Waterbirds", "Hippos where present", "Wildlife around lake habitats"],
      bestTime: "Conditions vary with season",
    },
    {
      title: "Woodlands and Acacia Country",
      image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg",
      description: "Wooded areas surrounding the plains offer a contrast to the open grasslands and provide habitat for resident animals, birds and wildlife moving between feeding areas.",
      bullets: ["Scattered acacia trees", "Woodland wildlife", "Contrasting photographic settings"],
      lookFor: ["Giraffe", "Elephant", "Antelope", "Birds", "Predators"],
      bestTime: "Morning and late afternoon",
    },
    {
      title: "The Open Migration Plains",
      image: "/images/destinations/serengeti/southern-ndutu/newborn-calves.jpg",
      description: "Vast groups of wildebeest and zebra can gather across the wider southern plains during the migration season. Their position and timing shift with the rains and grazing.",
      bullets: ["Seasonal migration movement", "Calving period", "Predator-prey relationships"],
      lookFor: ["Wildebeest", "Zebra", "Newborn calves", "Cheetah", "Lion", "Hyena"],
      bestTime: "Season and herd movement vary",
    },
  ],
  calving: {
    eyebrow: "A SEASON OF NEW LIFE",
    title: "Witness the Wildebeest Calving Season",
    introduction: "The southern plains offer seasonal grazing that draws migratory wildebeest into the wider Ndutu and Serengeti ecosystem. A large concentration of animals gives birth over a relatively short period, a natural synchrony that helps many calves arrive while grazing is available and the herds are together. Newborn calves are able to stand and follow their mothers soon after birth, helping them remain with the moving group. The resulting abundance also draws predators and scavengers, connecting births, grazing and survival across the ecosystem. This is a powerful natural process, not a scheduled encounter: rainfall influences the timing and location, and no birth or predator sighting can be promised.",
    image: "/images/destinations/serengeti/southern-ndutu/calving.jpg",
    imageAlt: "Wildebeest mother and newborn calf on the southern Serengeti plains",
    momentTitle: "The First Moments of Life",
    momentText: "The southern plains become a remarkable nursery during calving season. Newborn wildebeest must find their feet quickly, while their mothers remain close and the surrounding herds continue their seasonal cycle.",
    facts: [
      { label: "Calving season", value: "January to March, generally" },
      { label: "Peak planning period", value: "February, generally" },
      { label: "Main location", value: "Southern Serengeti and Ndutu plains" },
      { label: "Wildlife", value: "Newborn calves, wildebeest herds and predators" },
    ],
    predatorTitle: "Where New Life Brings the Predators",
    predators: [
      { name: "Lions", description: "Lions are among the large predators of the southern ecosystem. Their movements respond to prey, territory and conditions, and sightings are never certain.", likelihood: "Resident predator; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/lions.jpg" },
      { name: "Cheetahs", description: "Open grassland can provide hunting habitat for cheetahs. Observe from a respectful distance and allow the animals to behave naturally.", likelihood: "Habitat-dependent; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/cheetah.jpg" },
      { name: "Spotted hyenas", description: "Hyenas are both hunters and scavengers and play an important role in the ecosystem. Their activity follows natural conditions, not visitor schedules.", likelihood: "Wildlife presence varies", image: "/images/destinations/serengeti/southern-ndutu/predators.jpg" },
    ],
    wildlifeStatement: "Nature follows its own rhythm. Predator activity can be dramatic, but sightings are never guaranteed and every animal encounter deserves respect.",
    sourceNote: "A 2026 TANAPA tourism publication reports an estimate of more than half a million calves born within a few weeks. This is an approximate, source-attributed figure rather than a forecast.", // TODO(CONFIRM): verify the exact wording, timeframe and source context before publication.
  },
  wildlife: {
    showcase: [
      { name: "Wildebeest", description: "A migratory grazer whose seasonal movement connects the southern plains with the wider Serengeti-Mara ecosystem.", likelihood: "Seasonal herds; timing varies", image: "/images/destinations/serengeti/southern-ndutu/newborn-calves.jpg", featured: true },
      { name: "Plains zebra", description: "Zebra travel alongside wildebeest in parts of the migration and graze across open country.", likelihood: "Seasonal and resident presence", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg" },
      { name: "Thomson's gazelle", description: "A small antelope of the open grasslands, sharing grazing habitat with larger herds.", likelihood: "Habitat-dependent sightings", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg" },
      { name: "Lion", description: "Lions range across the ecosystem and may be seen near suitable cover or prey concentrations.", likelihood: "Resident; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/lions.jpg" },
      { name: "Cheetah", description: "Open plains can offer the visibility and space cheetahs use while hunting or resting.", likelihood: "Habitat-dependent sightings", image: "/images/destinations/serengeti/southern-ndutu/cheetah.jpg" },
      { name: "Leopard", description: "A more elusive cat associated with cover, woodland and riverine habitat.", likelihood: "Elusive; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/predators.jpg" },
      { name: "Spotted hyena", description: "A social carnivore and scavenger that contributes to the balance of the ecosystem.", likelihood: "Wildlife presence varies", image: "/images/destinations/serengeti/southern-ndutu/predators.jpg" },
      { name: "Black-backed jackal", description: "Jackals use varied habitats and may be noticed near open ground or the edges of cover.", likelihood: "Wildlife presence varies", image: "/images/destinations/serengeti/southern-ndutu/predators.jpg" },
      { name: "Elephant", description: "Elephants move through the broader landscape and use woodland and other suitable habitat.", likelihood: "Resident; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg" },
      { name: "Giraffe", description: "Giraffes browse among trees and shrubs, adding another scale to the open plains and acacia country.", likelihood: "Resident; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg" },
      { name: "Bat-eared fox", description: "This small canid is associated with open country and is more often active during cooler parts of the day.", likelihood: "Uncommon; sightings vary", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg" },
      { name: "Birdlife", description: "Lakes, wetlands, grassland and woodland support varied birdlife throughout the changing seasons.", likelihood: "Varies by habitat and season", image: "/images/destinations/serengeti/southern-ndutu/birdlife.jpg" },
    ],
    sightings: [
      { name: "Wildebeest", outlook: "Seasonal migration herds", where: "Open grazing plains as herds move through the southern ecosystem", bestTime: "Seasonal; movement varies with rainfall" },
      { name: "Plains zebra", outlook: "Seasonal and resident presence", where: "Grasslands and areas used by mixed grazing herds", bestTime: "Morning and late afternoon" },
      { name: "Thomson's gazelle", outlook: "Open-plains habitat", where: "Short-grass plains and other suitable open country", bestTime: "Early morning and late afternoon" },
      { name: "Lion", outlook: "Resident; sightings vary", where: "Suitable grassland, woodland edges and areas with prey", bestTime: "Early morning and late afternoon" },
      { name: "Cheetah", outlook: "Open-country habitat", where: "Open plains where visibility is good", bestTime: "Cooler parts of the day" },
      { name: "Leopard", outlook: "Elusive; sightings vary", where: "Woodland, thicker cover and riverine habitat", bestTime: "Early morning and late afternoon" },
      { name: "Spotted hyena", outlook: "Wildlife presence varies", where: "Across suitable habitat and areas used by grazing herds", bestTime: "Conditions vary" },
      { name: "Black-backed jackal", outlook: "Wildlife presence varies", where: "Open country and the edges of suitable cover", bestTime: "Cooler parts of the day" },
      { name: "Elephant", outlook: "Resident; sightings vary", where: "Woodland and other suitable habitat", bestTime: "Conditions vary" },
      { name: "Giraffe", outlook: "Resident; sightings vary", where: "Acacia country and suitable browsing habitat", bestTime: "Throughout the day" },
      { name: "Bat-eared fox", outlook: "Uncommon; sightings vary", where: "Open grassland and suitable foraging areas", bestTime: "Cooler parts of the day" },
      { name: "Birdlife", outlook: "Varies by habitat and season", where: "Lakes, marshes, grasslands and woodland", bestTime: "Throughout the day" },
    ],
    note: "The Ndutu ecosystem supports wildlife throughout the year. Seasonal movements create different viewing opportunities, and no sighting can ever be guaranteed.",
  },
  seasons: {
    caption: "Approximate Southern Serengeti and Ndutu seasonal patterns. Rainfall and herd movements vary; these are planning guides, not wildlife forecasts.",
    rows: [
      { label: "Wildebeest migration", months: ["peak", "peak", "peak", "good", "quiet", "quiet", "quiet", "quiet", "quiet", "quiet", "good", "good"] },
      { label: "Calving season", months: ["peak", "peak", "good", "quiet", "quiet", "quiet", "quiet", "quiet", "quiet", "quiet", "quiet", "good"] },
      { label: "Predator activity", months: ["good", "peak", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good"] },
      { label: "Landscape and rainfall", months: ["good", "good", "good", "peak", "peak", "quiet", "quiet", "quiet", "quiet", "quiet", "good", "good"] },
    ],
    cards: [
      { range: "DECEMBER", title: "The Herds Return", text: "As seasonal rain and fresh grazing develop, herds generally move back towards the southern plains. Their timing and distribution vary each year.", icon: "route" },
      { range: "JANUARY", title: "The Calving Season Begins", text: "Wildebeest gather on the southern plains and the general calving period begins. Wildlife activity depends on rainfall and herd movement.", icon: "paw" },
      { range: "FEBRUARY", title: "The Heart of Calving Season", text: "February is commonly an important period for newborn calves, large herds and predator activity, though no encounter is guaranteed.", icon: "sun" },
      { range: "MARCH", title: "The Season Continues", text: "Calving may continue while changing grazing and rainfall influence where the herds move next.", icon: "leaf" },
    ],
  },
  seasonNote: "Migration timing changes with rainfall. These months are useful planning guides, not guaranteed wildlife schedules.",
  aprilNote: "April may still bring migration-related wildlife experiences across the southern plains and adjoining movement routes. Seasonal conditions and herd distribution can change, so use the month as a broad guide rather than a fixed forecast.",
  experiences: [
    { title: "Guided Game Drives", tags: ["Morning", "Afternoon", "Full day"], text: "Choose morning, afternoon or full-day game drives according to the itinerary, camp arrangements and conditions. A knowledgeable guide helps read the landscape without disturbing wildlife.", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg", href: "/safaris/serengeti/central-seronera" },
    { title: "Migration Photography", tags: ["Open plains", "Seasonal herds"], text: "Wide horizons and large herds create memorable photographic opportunities. Patience, respectful distance and the right light matter more than a guaranteed encounter.", image: "/images/destinations/serengeti/southern-ndutu/newborn-calves.jpg", href: "/experiences/photography-safaris" },
    { title: "Birdwatching", tags: ["Lakes", "Wetlands", "Woodland"], text: "Explore the variety of birdlife associated with the lakes, wetlands, woodlands and grasslands. Species and activity vary with habitat and season.", image: "/images/destinations/serengeti/southern-ndutu/birdlife.jpg", href: "/safaris/serengeti" },
    { title: "Landscape Photography", tags: ["Green season", "Changing light"], text: "Seasonal grass, broad skies and the contrast between open plains and acacia country offer a rich landscape for photography.", image: "/images/destinations/serengeti/southern-ndutu/landscape.jpg", href: "/experiences/photography-safaris" },
    { title: "Responsible Wildlife Observation", tags: ["Patience", "Respect"], text: "Allow time to watch wildlife behaving naturally, follow the guide's advice and keep a respectful distance from animals and their habitat.", image: "/images/destinations/serengeti/southern-ndutu/predators.jpg", href: "/travel-guide/what-to-expect-on-safari" },
  ],
  schedule: [
    { time: "Early morning", title: "First light over the plains", text: "Depart as the first light spreads across the landscape, according to your camp and itinerary.", icon: "sunrise" },
    { time: "Morning", title: "Game drive", text: "Search for herds, predators and wildlife moving through the grasslands with your guide.", icon: "binoculars" },
    { time: "Breakfast", title: "A planned pause", text: "Enjoy a planned breakfast stop or return to camp, depending on the safari arrangements.", icon: "coffee" },
    { time: "Midday", title: "Rest and take in the landscape", text: "Rest, enjoy lunch and take in the surroundings according to your accommodation and schedule.", icon: "sun" },
    { time: "Afternoon", title: "Explore another habitat", text: "Continue the safari across the plains and surrounding habitats as conditions allow.", icon: "route" },
    { time: "Evening", title: "Return to camp", text: "Return to camp or lodge for dinner and relaxation, following the day's arrangements.", icon: "moon" },
  ],
  gettingThere: {
    road: {
      title: "By road",
      description: "Southern Serengeti and Ndutu can be reached through Northern Circuit routes connecting Ngorongoro and the southern plains. The best route depends on the exact camp location, season and places included in the itinerary.",
      times: [],
      steps: ["Plan the route around your actual camp and travel dates", "Review connections through Ngorongoro and the southern plains", "Allow for weather and changing road conditions"],
    },
    air: {
      title: "By air",
      description: "Ndutu has a regional airstrip. Access may be arranged through scheduled or charter safari flights, subject to operator routing, availability and the onward transfer to camp.",
      times: [],
      steps: ["Check flight availability for your dates", "Confirm routing and baggage arrangements with the operator", "Arrange the onward transfer with your camp or safari team"],
    },
    note: "Ndutu may be combined with Central Serengeti, Ngorongoro Crater or Tarangire. The exact route and applicable protected-area fees depend on the itinerary and the authorities managing the areas visited. We plan the route around the season, your accommodation, available flights and the wildlife experience you want.",
  },
  stay: {
    tiers: [
      { title: "Comfortable safari camps", description: "A practical base for spending time on the plains and following the route that suits the season.", bestFor: "Travelers focused on time outdoors", recommendedFor: "Flexible itineraries with a practical comfort level" },
      { title: "Mid-range tented camps and lodges", description: "A considered balance of comfort and location, chosen around the route and seasonal wildlife areas.", bestFor: "Travelers seeking comfort and location", recommendedFor: "A balanced stay shaped around travel dates" },
      { title: "Luxury safari camps and lodges", description: "Elevated comfort with location and transfers matched to the wider safari plan.", bestFor: "Travelers seeking an enhanced stay", recommendedFor: "Special occasions and tailored journeys" },
    ],
    footnote: "Your accommodation will be selected according to availability, your preferred comfort level and the location best suited to your travel dates.",
    href: "/safaris/serengeti/where-to-stay",
    linkLabel: "Explore Where to Stay in the Serengeti",
  },
  journeys: {
    title: "Journeys Into the Southern Serengeti",
    subtitle: "Whether you dream of spending time on the calving plains or combining the south with other iconic Tanzania destinations, we can help shape a journey around your travel dates and interests.",
    packageTag: "Southern Serengeti",
    fallbackTitle: "A tailor-made Ndutu safari",
    fallbackDescription: "We do not list a confirmed package specifically for Ndutu. Tell us your dates and interests and our team can discuss a route, seasonal location and available accommodation without assuming herd positions or availability.",
    fallbackCta: "Plan Your Southern Serengeti Safari",
  },
  faqs: [
    { question: "When is the best time to visit Southern Serengeti and Ndutu?", answer: "January to March is the general calving window, with February commonly an important period. Seasonal rainfall influences where the herds gather, so timing is a guide rather than a guarantee." },
    { question: "What is the Ndutu calving season?", answer: "It is the annual period when migratory wildebeest gather across the southern plains and many calves are born, generally from January to March. Herd numbers and timing vary with seasonal conditions." },
    { question: "Can I see newborn wildebeest calves?", answer: "You may see newborn calves during the calving period, but births and sightings cannot be guaranteed. Wildlife moves and behaves on its own terms." },
    { question: "What animals can I see in Ndutu?", answer: "Wildlife includes wildebeest, zebra, gazelle, lion, cheetah, leopard, hyena, elephant and varied birdlife. Sightings depend on season, habitat and natural movement." },
    { question: "Is Ndutu inside Serengeti National Park?", answer: "Ndutu lies within the Ngorongoro Conservation Area, alongside the southern Serengeti ecosystem. A route may cross areas managed by different authorities, and applicable fees depend on the itinerary." },
    { question: "Can I combine Ndutu with Ngorongoro Crater?", answer: "Yes. Ndutu and Ngorongoro Crater can be combined, subject to your available time, route, camp locations and the arrangements for your safari." },
    { question: "How many nights should I spend in Ndutu?", answer: "Several nights can provide more flexibility for exploring the area, but the right recommendation depends on your route, travel dates and accommodation." }, // TODO(CONFIRM): provide a verified, itinerary-specific stay recommendation.
    { question: "Is Ndutu good for photography?", answer: "Open plains, seasonal herds, young calves, predators and changing light offer varied photographic opportunities. Encounters are not scheduled, and respectful wildlife viewing comes first." },
    { question: "Can I visit Ndutu outside calving season?", answer: "Yes. Resident wildlife, varied landscapes and birdlife can make the area worth considering at other times. The migration experience and seasonal conditions will differ." },
    { question: "What should I pack for a Ndutu safari?", answer: "Consider neutral, comfortable clothing, warm early-morning layers, sunscreen, sunglasses, a hat and binoculars. Your final packing list should suit the season and itinerary." },
  ],
  related: [
    { title: "The Great Migration", href: "/safaris/serengeti/great-migration", description: "Follow the broader seasonal journey across the Serengeti-Mara ecosystem." },
    { title: "Central Serengeti and Seronera", href: "/safaris/serengeti/central-seronera", description: "Explore the central valley and its resident wildlife." },
    { title: "Western Corridor and Grumeti", href: "/safaris/serengeti/western-corridor", description: "Discover western river country and seasonal movement." },
    { title: "Northern Serengeti", href: "/safaris/serengeti/northern-serengeti", description: "Learn about the northern plains and Mara River region." },
    { title: "Ngorongoro Crater", href: "/safaris/ngorongoro/crater", description: "Add the crater to a route shaped around your dates." },
    { title: "Safari Packages", href: "/safaris/packages", description: "Review existing journeys and ask about a tailor-made route." },
  ],
  cta: {
    title: "Your Southern Serengeti Story Starts Here",
    description: "From the first light over the Ndutu plains to the extraordinary beauty of the calving season, let us help you discover one of Tanzania's most remarkable wildlife landscapes.",
    primary: "Plan My Ndutu Safari",
    secondary: "Chat on WhatsApp",
  },
  ctaEyebrow: "PLAN YOUR SOUTHERN SERENGETI SAFARI",
  ctaImage: "/images/destinations/serengeti/southern-ndutu/cta.jpg",
  ctaImageAlt: "Evening light over the Southern Serengeti and Ndutu plains",
  whatsappMessage: "Hello, I would like to plan a Southern Serengeti and Ndutu safari.",
};

if (process.env.NODE_ENV === "development") {
  serengetiHubSchema.parse(serengetiHub);
  centralSeroneraSchema.parse(centralSeronera);
  serengetiRegionPageSchema.parse(northernSerengeti);
  serengetiRegionPageSchema.parse(westernCorridor);
  southernNdutuSchema.parse(southernNdutu);
}
