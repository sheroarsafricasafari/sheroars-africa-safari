// Compiled from the supplied November 2026 operator and expert-guide notes.
export type StayTier = "camping" | "mid-range" | "luxury" | "upgrade";
export type StayRegion = "ngorongoro-rim" | "karatu" | "highlands";
export type StayZone = "rim-west" | "rim-east" | "rim-north-west" | "karatu";

export type Stay = {
  slug: string;
  name: string;
  operator?: string;
  tier: StayTier;
  region: StayRegion;
  zone?: StayZone;
  type: string;
  description: string;
  bestFor: readonly string[];
  image: { src: string; alt: string };
  seasonNote: string;
};

export const stayTierLabels: Record<StayTier, string> = {
  camping: "Camping",
  "mid-range": "Mid-range",
  luxury: "Luxury",
  upgrade: "Upgrade",
};

export const stayZoneLabels: Record<StayZone, string> = {
  "rim-west": "Western rim",
  "rim-east": "Eastern rim",
  "rim-north-west": "North-west rim",
  karatu: "Karatu",
};

export const stayRegionLabels: Record<StayRegion, string> = {
  "ngorongoro-rim": "Ngorongoro rim",
  karatu: "Karatu",
  highlands: "Highlands",
};

export const ngorongoroStays: readonly Stay[] = [
  // TODO(CONFIRM): Confirm availability and current campsite arrangements.
  {
    slug: "simba-public-campsite",
    name: "Simba Public Campsite",
    tier: "camping",
    region: "ngorongoro-rim",
    zone: "rim-west",
    type: "Public campsite",
    description: "Camping on the crater rim itself, raw and basic. We provide tents, bedding and a cook.",
    bestFor: ["Adventurers", "Budget", "Stars"],
    image: { src: "/images/stays/simba-public-campsite.jpg", alt: "Camping beneath the night sky on the Ngorongoro rim" },
    seasonNote: "Facilities are basic. Bring a warm layer for cold nights.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "rhino-lodge",
    name: "Rhino Lodge",
    tier: "mid-range",
    region: "ngorongoro-rim",
    zone: "rim-west",
    type: "Lodge",
    description: "A simple, good-value lodge with a great location close to the rim. It is the most affordable option inside the conservation area.",
    bestFor: ["Value", "Families", "Early starts"],
    image: { src: "/images/stays/rhino-lodge.jpg", alt: "Lodge accommodation close to the Ngorongoro rim" },
    seasonNote: "An option inside the conservation area.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "ngorongoro-sopa-lodge",
    name: "Ngorongoro Sopa Lodge",
    tier: "mid-range",
    region: "ngorongoro-rim",
    zone: "rim-east",
    type: "Lodge",
    description: "A large, international-style hotel with spacious rooms and big panoramas. Somewhat dated, but comfortable.",
    bestFor: ["Families", "Groups", "Comforts"],
    image: { src: "/images/stays/ngorongoro-sopa-lodge.jpg", alt: "Panoramic lodge setting on the eastern Ngorongoro rim" },
    seasonNote: "Rim temperatures can be cold and misty.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "plantation-lodge",
    name: "Plantation Lodge",
    tier: "mid-range",
    region: "karatu",
    zone: "karatu",
    type: "Lodge",
    description: "A relaxed base between Ngorongoro and Lake Manyara, with lush grounds and a comfortable highland setting.",
    bestFor: ["Value", "Gardens", "Couples"],
    image: { src: "/images/stays/plantation-lodge.jpg", alt: "A garden path at a Karatu highlands lodge" },
    seasonNote: "A green highlands alternative to the rim.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "ngorongoro-farm-house",
    name: "Ngorongoro Farm House",
    tier: "mid-range",
    region: "karatu",
    zone: "karatu",
    type: "Working coffee plantation",
    description: "Rustic farm-style living on a coffee estate, with a relaxed pace and a sense of life on the land.",
    bestFor: ["Families", "Farm life", "Calm"],
    image: { src: "/images/stays/ngorongoro-farm-house.jpg", alt: "A farm-style lodge among the Karatu highlands" },
    seasonNote: "Set among the highland farms.",
  },
  // TODO(CONFIRM): Confirm availability, room count, facilities and views.
  {
    slug: "ngorongoro-serena-safari-lodge",
    name: "Ngorongoro Serena Safari Lodge",
    operator: "Serena Hotels",
    tier: "luxury",
    region: "ngorongoro-rim",
    zone: "rim-west",
    type: "Lodge",
    description: "Stone-built rooms sit along the rim, many with private balconies looking into the crater, alongside a spa.",
    bestFor: ["Views", "Couples", "Comfort"],
    image: { src: "/images/stays/ngorongoro-serena-safari-lodge.jpg", alt: "A lodge balcony looking across the Ngorongoro Crater" },
    seasonNote: "Ask about crater-facing room availability.",
  },
  // TODO(CONFIRM): Confirm availability and access arrangements.
  {
    slug: "lemala-ngorongoro-tented-camp",
    name: "Lemala Ngorongoro Tented Camp",
    operator: "Lemala",
    tier: "luxury",
    region: "ngorongoro-rim",
    zone: "rim-east",
    type: "Tented camp",
    description: "A small, comfortable tented camp in ancient forest with lovely walking nearby and privileged access to the crater floor.",
    bestFor: ["Bush feel", "Walkers", "Couples"],
    image: { src: "/images/stays/lemala-ngorongoro-tented-camp.jpg", alt: "A tented camp set among forest on the Ngorongoro rim" },
    seasonNote: "A forested setting near the eastern rim.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "gibbs-farm",
    name: "Gibb's Farm",
    tier: "luxury",
    region: "karatu",
    zone: "karatu",
    type: "Farm lodge",
    description: "A historic coffee estate with garden cottages, farm-to-table dining and community connections.",
    bestFor: ["Relaxation", "Food", "Honeymoons"],
    image: { src: "/images/stays/gibbs-farm.jpg", alt: "A garden cottage at a Karatu coffee estate" },
    seasonNote: "A quiet farm setting in the highlands.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "kitela-lodge",
    name: "Kitela Lodge",
    tier: "luxury",
    region: "karatu",
    zone: "karatu",
    type: "Lodge",
    description: "Thatched cottages and forest views offer a peaceful highlands stay near the crater and cultural villages.",
    bestFor: ["Boutique comfort", "Couples"],
    image: { src: "/images/stays/kitela-lodge.jpg", alt: "Thatched lodge cottages among the Karatu highlands" },
    seasonNote: "A green setting below the crater rim.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "ngorongoro-crater-lodge",
    name: "Ngorongoro Crater Lodge",
    operator: "&Beyond",
    tier: "upgrade",
    region: "ngorongoro-rim",
    zone: "rim-west",
    type: "Lodge",
    description: "One of the area's most indulgent rim lodges, suited to a special occasion and a memorable crater setting.",
    bestFor: ["Special occasions"],
    image: { src: "/images/stays/ngorongoro-crater-lodge.jpg", alt: "A luxury lodge overlooking the Ngorongoro Crater" },
    seasonNote: "Supplement applies. Quoted on request.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "entamanu-ngorongoro",
    name: "Entamanu Ngorongoro",
    operator: "Nomad",
    tier: "upgrade",
    region: "ngorongoro-rim",
    zone: "rim-north-west",
    type: "Camp",
    description: "A small, secluded camp with views toward the crater and Serengeti plains. It opened in 2016.",
    bestFor: ["Privacy", "Couples"],
    image: { src: "/images/stays/entamanu-ngorongoro.jpg", alt: "A secluded camp on the north-west Ngorongoro rim" },
    seasonNote: "Remote and secluded. Supplement applies, quoted on request.",
  },
  // TODO(CONFIRM): Confirm availability and current gate access details.
  {
    slug: "lemala-osonjoi-lodge",
    name: "Lemala Osonjoi Lodge",
    operator: "Lemala",
    tier: "upgrade",
    region: "ngorongoro-rim",
    zone: "rim-east",
    type: "Lodge",
    description: "A luxury lodge on a forested hillside just back from the rim, near the quieter Lemala gate.",
    bestFor: ["Peace and quiet", "Early access"],
    image: { src: "/images/stays/lemala-osonjoi-lodge.jpg", alt: "A forested hillside lodge near the eastern crater rim" },
    seasonNote: "Supplement applies. Quoted on request.",
  },
  // TODO(CONFIRM): Confirm current property name and availability.
  {
    slug: "ngorongoro-lodge-melia-collection",
    name: "Ngorongoro Lodge, Meliá Collection",
    operator: "Meliá",
    tier: "upgrade",
    region: "ngorongoro-rim",
    type: "Hotel",
    description: "A full-service hotel on the crater rim for travelers who appreciate familiar hotel amenities.",
    bestFor: ["Hotel amenities"],
    image: { src: "/images/stays/ngorongoro-lodge-melia-collection.jpg", alt: "A full-service hotel on the Ngorongoro rim" },
    seasonNote: "Supplement applies. Quoted on request.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "the-manor-at-ngorongoro",
    name: "The Manor at Ngorongoro",
    tier: "upgrade",
    region: "karatu",
    zone: "karatu",
    type: "Estate lodge",
    description: "Traditional estate-style luxury in a garden setting in the Karatu highlands.",
    bestFor: ["Couples", "Gardens"],
    image: { src: "/images/stays/the-manor-at-ngorongoro.jpg", alt: "A garden and estate-style lodge in the Karatu highlands" },
    seasonNote: "Supplement applies. Quoted on request.",
  },
  // TODO(CONFIRM): Confirm availability and current property details.
  {
    slug: "the-highlands",
    name: "The Highlands",
    operator: "Asilia",
    tier: "upgrade",
    region: "highlands",
    type: "Luxury domes",
    description: "Distinctive dome tents on the Olmoti slopes, with volcano and highland views rather than crater views.",
    bestFor: ["Couples", "A different setting"],
    image: { src: "/images/stays/the-highlands.jpg", alt: "Distinctive accommodation on the Olmoti highlands" },
    seasonNote: "Supplement applies. Quoted on request.",
  },
];

export const stayTierSummaries: Record<StayTier, { title: string; description: string }> = {
  camping: { title: "Comfortable camping", description: "Camp on the rim itself, with a cook, warm bedding and the loudest stars you will ever see." },
  "mid-range": { title: "Mid-range", description: "Simple, comfortable and good value, on the rim or in the highlands." },
  luxury: { title: "Luxury", description: "Generous rooms, considered service and more distinctive settings." },
  upgrade: { title: "Upgrade", description: "Ultra-luxury properties. Supplement applies, quoted on request." },
};

export const stayMatcherQuestions = [
  {
    id: "priority",
    title: "What matters most?",
    options: [
      { label: "Views from the room", weights: { rim: 3, luxury: 1 } },
      { label: "An early start at the gate", weights: { rim: 3, camping: 1 } },
      { label: "Quiet and gardens", weights: { karatu: 3, luxury: 1 } },
      { label: "Value for money", weights: { karatu: 2, camping: 2, "mid-range": 1 } },
    ],
  },
  {
    id: "travelStyle",
    title: "How do you like to travel?",
    options: [
      { label: "Couples and honeymoons", weights: { luxury: 2, upgrade: 2 } },
      { label: "Families", weights: { "mid-range": 2, karatu: 1 } },
      { label: "Small groups of friends", weights: { "mid-range": 1, rim: 1 } },
      { label: "Solo", weights: { camping: 1, karatu: 1 } },
    ],
  },
  {
    id: "comfort",
    title: "Your comfort level?",
    options: [
      { label: "Camping is fine", weights: { camping: 4 } },
      { label: "Comfortable and simple", weights: { "mid-range": 3 } },
      { label: "Luxury please", weights: { luxury: 3, upgrade: 2 } },
    ],
  },
  {
    id: "nights",
    title: "How many nights?",
    options: [
      { label: "One", weights: { rim: 2 } },
      { label: "Two", weights: { rim: 1, karatu: 1 } },
      { label: "Three or more", weights: { karatu: 2 } },
    ],
  },
] as const;
