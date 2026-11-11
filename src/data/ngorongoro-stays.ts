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

export const ngorongoroStayBreadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Ngorongoro", href: "/safaris/ngorongoro" },
  { title: "Where to Stay", href: "/safaris/ngorongoro/where-to-stay" },
] as const;

export const ngorongoroStayPage = {
  path: "/safaris/ngorongoro/where-to-stay",
  metadata: {
    title: "Where to Stay in Ngorongoro: Rim Lodges and Karatu",
    description: "Compare Ngorongoro Crater rim lodges, tented camps and Karatu stays. Find the best place to stay near the crater for your budget and style.",
    image: "/images/safaris/ngorongoro/stay/hero.jpg",
  },
  hero: {
    image: "/images/safaris/ngorongoro/stay/hero.jpg",
    imageAlt: "Mist over the Ngorongoro Crater rim at sunrise with a lodge terrace",
    eyebrow: "WHERE TO STAY IN NGORONGORO",
    title: "Sleep on the Edge of a Volcano",
    subtitle: "Wake above the clouds on the crater rim, or settle into a farm lodge in the green highlands. Either way, the crater is on your doorstep, and we will match the stay to your pace, your budget and your idea of a perfect morning.",
    primaryCta: { label: "Plan My Ngorongoro Stay", href: "/plan-your-safari?type=Safari" },
    secondaryCta: { label: "Rim or Karatu?", href: "#choose" },
    badges: [
      { icon: "landscape", label: "Crater-Rim Views" },
      { icon: "garden", label: "Farm-Lodge Calm" },
      { icon: "compass", label: "Every Budget" },
    ],
  },
  // TODO(CONFIRM): Confirm climate, route planning and stay-duration details.
  quickFacts: [
    { label: "Two choices", text: "The crater rim, or the Karatu highlands below", icon: "landscape" },
    { label: "Rim", text: "Cool and often misty, with crater views and the shortest start to the descent", icon: "mountain" },
    { label: "Karatu", text: "Farms, gardens and coffee estates, with more choice and gentler prices", icon: "garden" },
    { label: "Nights", text: "One is enough for the crater. Two lets you add Empakaai, Olduvai and a Maasai visit", icon: "clock" },
    { label: "Climate", text: "Cold nights and misty mornings on the rim, so pack a warm layer", icon: "weather" },
  ],
  // TODO(CONFIRM): Confirm rim elevation descriptions, weather and property/price comparisons.
  story: {
    image: "/images/safaris/ngorongoro/stay/story.jpg",
    imageAlt: "A rim lodge balcony looking into the crater",
    eyebrow: "THE STORY",
    title: "Why Where You Sleep Matters More Here",
    paragraphs: [
      "At most safari destinations, the lodge is where you rest between game drives. At Ngorongoro, it can be part of the show. The rim sits high above the crater floor, and the lodges perched along it look straight into a caldera that is one of the largest unbroken volcanic bowls on Earth.",
      "But the rim is not the only good answer. A short drive down, the Karatu highlands are a quilt of coffee estates, flower farms and gardens, with lodges that feel more like a country house than a safari camp, and a gentler price.",
      "Choose the rim for the view and the early start. Choose Karatu for the comfort, the choice and the farm-fresh dinners. Choose well, and the one thing everyone remembers is not the bed, it is the morning you woke up and looked out.",
      "A tip from experience: the rim is high, and the nights are cold. The people who pack a warm layer remember the view. The people who do not, remember the cold.",
    ],
    pullQuote: "At Ngorongoro, the best alarm clock is the view.",
  },
  // TODO(CONFIRM): Confirm access, drive, price-comparison and gate details by property.
  decision: {
    id: "choose",
    eyebrow: "THE BIG DECISION",
    title: "Rim or Karatu? Here Is How to Choose",
    rimLabel: "Rim",
    karatuLabel: "Karatu",
    diagramLabel: "Illustrative elevation, not to scale",
    diagramText: "The crater floor lies below the rim. Rim lodges sit high beside the gate, while Karatu's farms and lodges are lower in the highlands. A road connects Karatu to the gate.",
    rim: [
      "Crater views from your room or the lodge",
      "The earliest, easiest start through the gate",
      "Cool, misty nights, with heating and blankets",
      "Fewer places, usually higher prices",
      "Wilderness feel, forest around you",
    ],
    categories: ["Views", "Start", "Climate", "Choice", "Setting"],
    karatu: [
      "A quieter, greener and slightly warmer setting",
      "More choice and generally lower prices",
      "Coffee farms, gardens, farm-to-table meals and walks",
      "A longer drive to the gate, so an earlier alarm",
      "Easy to combine with Lake Manyara",
    ],
    tableHeader: "Compare",
    note: "Drive times to the gate depend on the lodge. We check them for you.",
    callout: "Not sure? Most first-time visitors choose one night on the rim. If you want to stretch your budget, choose Karatu and enjoy the farm.",
  },
  // TODO(CONFIRM): Confirm the lodge location and view details by current property.
  rimGuide: {
    eyebrow: "WHICH PART OF THE RIM",
    title: "Not All Rim Views Are the Same",
    intro: "The crater rim is a big circle, and where you sleep changes the experience. This is a simple guide. Details differ by lodge.",
    zones: [
      { title: "Western rim", text: "Close to the main descent road, with some of the most famous crater views. Lodges here include rim-facing rooms and balconies." },
      { title: "Eastern rim", text: "Quieter, forested and close to the less-used Lemala gate, with more walking and a bush feel." },
      { title: "North-west rim", text: "Remote and secluded, with views toward both the crater and the Serengeti plains." },
      { title: "Karatu below", text: "Farms and gardens, an hour or so from the gate." },
    ],
  },
  stayGrid: {
    eyebrow: "OUR SHORTLIST",
    title: "Where You Might Stay",
    intro: "These are examples of the kinds of places we use, grouped by style. Your proposal confirms the exact lodge, and similar properties may be offered, depending on availability.",
    note: "Accommodation is confirmed in your personal proposal and depends on availability. Names are examples, not guarantees. No rates are shown. Your written quote is final.",
    bestForLabel: "Best for",
    orSimilarCaption: "This property or similar, subject to availability.",
    filter: {
      tierLabel: "Tier",
      zoneLabel: "Zone",
      allLabel: "All",
      clearLabel: "Clear filters",
      countOne: "example",
      countMany: "examples",
      empty: "No example stays match these filters. Clear filters to see all examples.",
      rimLabel: "Rim",
      karatuLabel: "Karatu",
    },
  },
  matcher: {
    resultEyebrow: "Your starting point",
    recommendationLabel: "A {tier} fit, based on your answers. This is a starting point, not a booking.",
    orSimilarCaption: "This property or similar, subject to availability.",
    rimLabel: "Crater rim",
    karatuLabel: "Karatu",
    eitherLabel: "Either works",
    askButton: "Ask us about these stays",
    askHref: "/plan-your-safari?type=Safari",
    restartButton: "Start again",
    incomplete: "Answer all four questions to see a stay suggestion.",
  },
  activities: {
    eyebrow: "MAKE THE MOST OF IT",
    title: "Your Rim Stay, Beyond the Descent",
    items: [
      { title: "The crater descent", text: "Be among the first vehicles through the gate.", href: "/safaris/ngorongoro/crater" },
      { title: "Empakaai Crater hike", text: "A full day of forest, flamingos and silence.", href: "/safaris/ngorongoro/highlands-empakaai" },
      { title: "Olduvai Gorge", text: "Where human origins come into focus.", href: "/safaris/ngorongoro/olduvai-gorge" },
      { title: "A Maasai cultural visit", text: "A conversation, not a show.", href: "/safaris/ngorongoro/maasai-cultural-visit" },
    ],
  },
  activityLinkLabel: "Explore",
  // TODO(CONFIRM): Confirm seasonality, check-in guidance, gate access, fees and itinerary inclusion.
  practical: {
    eyebrow: "BEFORE YOU BOOK",
    title: "Practical Tips for Staying Near the Crater",
    items: [
      { title: "Pack for cold", text: "Nights on the rim are cold and misty at any time of year. Bring a warm layer, a jacket and warm socks." },
      { title: "Book early", text: "Rim lodges are few and fill up in the dry months, roughly June to October, and around the holidays." },
      { title: "Ask about the view", text: "Not every rim room faces the crater. If views matter, ask for crater-facing rooms." },
      { title: "Arrive in daylight", text: "Reach your lodge by mid-afternoon to enjoy the view and settle in before dark and cold." },
      { title: "Plan an early start", text: "The descent gate opens at dawn, and vehicles line up. Staying on the rim puts you near the front of the line." },
      { title: "Karatu is easy to combine", text: "It sits between the crater and Lake Manyara, so it suits a loop through the Northern Circuit." },
      { title: "Fees", text: "Conservation area fees apply to nights on the rim, are set by the authority and change over time. They are included in our itinerary prices. See the NCAA website for the current schedule.", link: { label: "Check the current schedule on the NCAA website", href: "https://www.ncaa.go.tz/" } },
      { title: "Tell us your plans", text: "Celebrating a birthday, a honeymoon or an anniversary? Let us know, and we will tell the lodge." },
    ],
  },
  journeys: {
    id: "journeys",
    eyebrow: "BUILD IT INTO YOUR SAFARI",
    title: "Journeys That Include a Ngorongoro Stay",
    subtitle: "Every itinerary can be tailored to your dates and pace.",
    // TODO(CONFIRM): Confirm this itinerary extension can be arranged.
    callout: "Already planning a Serengeti safari? Add a night on the rim and a crater morning to any road-in itinerary, and we will arrange it.",
    noPackages: "Tell us what you have in mind, and we will help shape your Ngorongoro journey.",
    links: [
      { label: "View All Safari Packages", href: "/safaris/packages" },
      { label: "Back to Ngorongoro", href: "/safaris/ngorongoro" },
    ],
  },
  faqSection: {
    eyebrow: "GOOD TO KNOW",
    title: "Where to Stay in Ngorongoro, Questions Answered",
  },
  // TODO(CONFIRM): Confirm drive timing, camping services, room views, family details and wildlife statements.
  faq: [
    { question: "Where is the best place to stay for the Ngorongoro Crater?", answer: "For crater views and the earliest start, the rim. For comfort, value and more choice, the Karatu highlands. Many first-time visitors choose one night on the rim." },
    { question: "Is it worth staying on the crater rim?", answer: "If you want views and the earliest descent, yes. Rim stays tend to cost more and the nights are cold, so some travelers prefer Karatu." },
    { question: "How far is Karatu from the crater?", answer: "It depends on the lodge, but expect a drive of roughly 30 to 60 minutes to the gate, so an earlier start." },
    { question: "How many nights do I need near Ngorongoro?", answer: "One night is enough for the crater descent. Add a second night if you want to see Empakaai, Olduvai Gorge and a Maasai community without rushing.", href: "/safaris/ngorongoro/maasai-cultural-visit", linkLabel: "Plan a Maasai cultural visit" },
    { question: "Is it cold on the crater rim?", answer: "Yes. The rim is high, and nights and mornings are cold and often misty all year. Bring a warm layer, and most lodges provide extra bedding or heating." },
    { question: "Can I camp on the crater rim?", answer: "Yes, at public campsites on the rim. We provide the tents, bedding and a cook. Facilities are basic." },
    { question: "Which rim lodges have crater views?", answer: "Many rim lodges look into the crater, though not every room faces it. Tell us if the view matters, and we will ask for crater-facing rooms." },
    { question: "What is the difference between the Ngorongoro Crater and the Karatu area?", answer: "The crater is the volcanic bowl and the main wildlife attraction. Karatu is a town and farming area below the rim, with lodges, coffee estates and gardens." },
    { question: "Are there family-friendly options?", answer: "Yes. Larger lodges on the rim and farm lodges in Karatu both suit families. Tell us the ages of your children, and we will suggest the best fit." },
    { question: "Can I see wildlife from my lodge?", answer: "Sometimes. Rim lodges sit in forest and may see birds, monkeys and the occasional visiting animal. The real wildlife is on the crater floor." },
    { question: "How do I choose between lodges?", answer: "Tell us your budget, your travel style and what matters most. We will recommend a short list and confirm availability." },
  ],
  cta: {
    eyebrow: "YOUR NGORONGORO NIGHT AWAITS",
    title: "Ready to Wake Up Above the Clouds?",
    description: "Tell us your dates, your budget and how you like to travel, and we will choose the right side of the crater for you, from a cold, clear morning on the rim to a warm dinner on a highland farm.",
    image: "/images/safaris/ngorongoro/stay/cta.jpg",
    imageAlt: "A farm lodge garden in the Karatu highlands",
    primary: { label: "Plan My Ngorongoro Stay", href: "/plan-your-safari?type=Safari" },
    secondaryLabel: "Chat With Our Team",
    whatsappMessage: "Hello She Roars Africa Safari! I would like to plan Ngorongoro stays for my Tanzania safari.",
  },
} as const;
