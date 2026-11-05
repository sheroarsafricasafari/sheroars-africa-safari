import { z } from "zod";
import type { DestinationHubData, SubRegionData } from "@/types/destination";

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

if (process.env.NODE_ENV === "development") {
  serengetiHubSchema.parse(serengetiHub);
  centralSeroneraSchema.parse(centralSeronera);
}
