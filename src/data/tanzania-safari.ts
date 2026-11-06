export type SeasonRating = "best" | "good" | "mixed" | "low";

export type DestinationCard = {
  slug: "ngorongoro" | "serengeti" | "tarangire";
  index: "01" | "02" | "03";
  eyebrow: string;
  title: string;
  description: string;
  tags: [string, string, string];
  href: string;
  image: string;
  imageAlt: string;
};

export type FaqPart = { text: string; href?: string };
export type FaqItem = { question: string; answer: FaqPart[] };

export const tanzaniaSafariMeta = {
  title: "Tanzania Safari | Serengeti, Ngorongoro and Tarangire",
  description: "Plan a Tanzania safari with a women-led team. Explore the Serengeti, Ngorongoro Crater and Tarangire, with tailor-made itineraries for every travel style.",
  path: "/tanzania-safari",
  image: "/images/tanzania-safari/hero.jpg",
};

export const sectionCopy = {
  destinations: {
    eyebrow: "EXPLORE TANZANIA'S ICONIC SAFARI DESTINATIONS",
    title: "Three Extraordinary Places. One Unforgettable Safari.",
    subtitle: "Discover the landscapes that make northern Tanzania so extraordinary. From the Great Migration to the wildlife-rich crater floor and the ancient baobab trees, each destination offers a different way to experience Africa.",
  },
  comparison: {
    eyebrow: "THE PERFECT NORTHERN CIRCUIT",
    title: "Three Destinations, Three Different Worlds",
    subtitle: "Compare a Serengeti safari, Ngorongoro safari and Tarangire safari across Tanzania's northern national parks and conservation areas.",
  },
  whenToGo: {
    eyebrow: "PLAN YOUR JOURNEY",
    title: "Every Season Has Its Own Story",
    subtitle: "Tanzania is a year-round safari destination, and each season tells a different story. These are broad patterns, not guarantees, and every park behaves differently.",
  },
  routeDiagram: {
    title: "Illustrative northern circuit route",
    description: "A suggested route from Arusha to Tarangire, Ngorongoro and the Serengeti, with Lake Manyara as an optional stop and a return to Arusha.",
  },
  route: {
    eyebrow: "FROM ONE LANDSCAPE TO ANOTHER",
    title: "A Journey Through Tanzania's Northern Circuit",
    disclaimer: "Illustrative route only. The final route, order and duration depend on your travel dates, selected accommodation and safari preferences.",
  },
  dayOnSafari: {
    eyebrow: "LIFE IN THE WILD",
    title: "From First Light to the Last Golden Hour",
    disclaimer: "Exact schedules depend on your safari and camp arrangements.",
  },
  migration: {
    eyebrow: "FOLLOW THE HERDS",
    title: "A Migration That Moves With the Seasons",
    disclaimer: "General pattern only. Timing varies from year to year.",
  },
  seasonGrid: {
    eyebrow: "A SIMPLE SEASONAL GUIDE",
    title: "When to Visit Each Destination",
    caption: "A general guide, not a forecast. No numerical scores.",
  },
  wildlife: {
    eyebrow: "MEET THE WILD RESIDENTS",
    title: "A Land Alive With Extraordinary Wildlife",
    subtitle: "Tanzania's mix of plains, woodland, wetlands and volcanic highlands supports an unusually wide range of wildlife. Different places favor different animals, and what you see depends on the season, the location and a little luck.",
    supportingText: "A Tanzania wildlife safari can reveal very different habitats from one region to the next.",
    bigFive: "The Big Five",
    others: "More to look for",
  },
  approach: { eyebrow: "THE SHE ROARS APPROACH", title: "Your Journey, Thoughtfully Designed Around You" },
  travelStyles: { eyebrow: "TRAVEL YOUR WAY", title: "Find a Safari That Feels Like Yours" },
  planning: { eyebrow: "LET'S BEGIN YOUR JOURNEY", title: "Planning a Safari Should Feel Exciting, Not Complicated" },
  practical: { eyebrow: "GOOD TO KNOW", title: "Everything You Should Know Before Travelling" },
  faq: { eyebrow: "YOUR QUESTIONS, ANSWERED", title: "Tanzania Safari Questions, Answered" },
};

export const safariHero = {
  eyebrow: "THE WILD HEART OF AFRICA",
  title: "Discover the Magic of Tanzania Safaris",
  subtitle: "From the endless plains of the Serengeti to the vast volcanic Ngorongoro Crater and the ancient baobabs of Tarangire, Tanzania offers some of Africa's most extraordinary wildlife experiences. We plan every journey around you.",
  image: "/images/tanzania-safari/hero.jpg",
  imageAlt: "A wide Serengeti plain at golden hour with acacia trees and grazing wildlife",
  badges: ["Extraordinary Wildlife", "Iconic National Parks", "Tailor-Made Journeys"],
};

export const quickFacts = [
  { label: "Best known for", text: "The Serengeti, the Great Migration, Ngorongoro Crater and Tarangire's elephants", icon: "binoculars" },
  { label: "When to go", text: "Year-round, with June to October as the main dry season", icon: "sun" },
  { label: "Getting there", text: "Fly into Kilimanjaro (JRO) or Arusha (ARK) for the northern circuit", icon: "plane" },
  // TODO(CONFIRM): Confirm the light-aircraft and vehicle arrangements actually offered.
  { label: "Getting around", text: "Safari vehicles on the northern circuit, with light aircraft used on some itineraries", icon: "route" },
  { label: "Pairs with", text: "Extend your trip with", icon: "mountain", links: [{ label: "Kilimanjaro", href: "/kilimanjaro" }, { label: "Zanzibar", href: "/zanzibar" }] },
] as const;

export const intro = {
  eyebrow: "WELCOME TO TANZANIA",
  title: "A World of Wilderness, Wonder and Discovery",
  image: "/images/tanzania-safari/intro.jpg",
  imageAlt: "Safari landscape in northern Tanzania with open plains and soft light",
  caption: "Explore some of the best places to visit in Tanzania for safari, each with its own character.",
  paragraphs: [
    "A Tanzania safari is a journey into some of the world's most celebrated wildlife landscapes. Across the north of the country, open plains, volcanic highlands, river valleys and ancient baobab forests are home to lions, elephants, leopards, buffalo, giraffes, zebras, cheetahs, hippos and many more species, alongside an exceptional variety of birdlife.",
    "The Northern Tanzania safari circuit makes it possible to experience several of these landscapes in a single journey. Safari vehicles, expert guides and carefully chosen lodges and camps connect national parks and conservation areas that each offer something different. Wildlife is wild, so sightings can never be guaranteed, but the variety of habitats gives every safari a real chance of memorable encounters.",
    "Every destination has its own personality. Some offer endless open horizons, others reveal dramatic volcanic landscapes or ancient baobab forests. Together, Ngorongoro, the Serengeti and Tarangire create an extraordinary safari journey through northern Tanzania.",
  ],
};

export const destinationCards: DestinationCard[] = [
  {
    slug: "ngorongoro",
    index: "01",
    eyebrow: "THE WORLD WITHIN A CRATER",
    title: "Ngorongoro",
    description: "Descend into the world's largest unbroken caldera, where volcanic walls frame open grasslands and remarkable concentrations of wildlife. Ngorongoro is a place of both natural and cultural heritage, shared by wildlife and Maasai pastoralists.",
    tags: ["The Great Crater", "Dense Wildlife", "UNESCO World Heritage"],
    href: "/safaris/ngorongoro",
    image: "/images/tanzania-safari/ngorongoro.jpg",
    imageAlt: "Ngorongoro Crater floor seen from the rim with grasslands and wildlife",
  },
  {
    slug: "serengeti",
    index: "02",
    eyebrow: "THE ENDLESS PLAINS",
    title: "Serengeti",
    description: "Enter a vast wilderness of golden plains, kopjes and rivers, home to iconic predators and the annual Great Migration. The Serengeti is a World Heritage Site and a landscape that stays with you long after the journey ends.",
    tags: ["Great Migration", "Big Cats", "Endless Plains"],
    href: "/safaris/serengeti",
    image: "/images/tanzania-safari/serengeti.jpg",
    imageAlt: "Golden Serengeti grassland with a lone acacia tree and open sky",
  },
  {
    slug: "tarangire",
    index: "03",
    eyebrow: "THE LAND OF GIANTS",
    title: "Tarangire",
    description: "Discover a landscape shaped by ancient baobab trees, the Tarangire River and large elephant herds, especially in the dry season. A quieter, beautiful side of Tanzania's northern safari circuit.",
    tags: ["Elephant Country", "Ancient Baobabs", "Dry Season Wildlife"],
    href: "/safaris/tarangire",
    image: "/images/tanzania-safari/tarangire.jpg",
    imageAlt: "Elephants walking beneath ancient baobab trees in Tarangire National Park",
  },
];

export const comparisonRows = [
  {
    label: "Landscape",
    values: ["Baobab-dotted savanna, termite mounds and a river valley", "A huge volcanic caldera, crater floor and highland forest", "Vast open plains, rocky kopjes, rivers and woodland"],
  },
  {
    label: "Best known for",
    values: ["Elephants and ancient baobab trees", "Dramatic scenery and wildlife concentrations on the crater floor", "The Great Migration and big cats"],
  },
  // TODO(CONFIRM): Review destination wildlife summaries with the team.
  {
    label: "You may see",
    values: ["Elephant, giraffe, zebra, wildebeest, buffalo, lion", "Lion, elephant, buffalo, hippo, hyena, and a rare chance of black rhino", "Lion, leopard, cheetah, elephant, buffalo, zebra, wildebeest"],
  },
  // TODO(CONFIRM): Review seasonal summaries with the team.
  {
    label: "Seasonal note",
    values: ["Especially rewarding in the dry season, June to October", "Wildlife viewing is possible through the year", "Year-round wildlife, with the migration moving through the park"],
  },
  {
    label: "Pairs well with",
    values: ["Lake Manyara and Ngorongoro", "Tarangire and the Serengeti", "Ngorongoro, and Zanzibar for a beach finish"],
  },
] as const;

export const comparisonIntro = "Bringing these destinations together can create a wonderfully varied safari. You move from the baobab landscapes of Tarangire to the dramatic Ngorongoro highlands and then into the vast Serengeti ecosystem, discovering a different side of Tanzania along the way.";
export const comparisonCallout = "Combining all three is not the right choice for every traveler. Your route, travel dates and the number of days you have all matter, and we will help you decide.";

export const journeyCopy = {
  eyebrow: "SAMPLE JOURNEYS",
  title: "Start With a Journey, Then Make It Yours",
  subtitle: "These itineraries show how the northern circuit can come together. Every one can be adjusted to your dates, pace and budget.",
  discoveryLine: "Explore Tanzania safari tours and compare a sample Tanzania safari itinerary, then talk with us about making the route your own.",
  empty: "We are refining our sample journeys. Tell us what you have in mind and we can discuss an itinerary for your dates.",
};

export const routeStops = [
  // TODO(CONFIRM): Confirm Arusha is the common start and end point for the routes described.
  { name: "Arusha", description: "Your gateway. Most northern circuit journeys begin and end here.", href: undefined, image: "/images/tanzania-safari/intro.jpg", alt: "Safari landscape in northern Tanzania with open plains and soft light" },
  { name: "Tarangire", description: "Elephants, baobabs and river landscapes.", href: "/safaris/tarangire", image: "/images/tanzania-safari/tarangire.jpg", alt: "Elephants walking beneath ancient baobab trees in Tarangire National Park" },
  { name: "Lake Manyara (optional)", description: "A popular add-on between Tarangire and Ngorongoro.", href: "/safaris/lake-manyara", image: "/images/tanzania-safari/intro.jpg", alt: "Safari landscape in northern Tanzania with open plains and soft light" },
  { name: "Ngorongoro", description: "Crater-floor wildlife and highland views.", href: "/safaris/ngorongoro", image: "/images/tanzania-safari/ngorongoro.jpg", alt: "Ngorongoro Crater floor seen from the rim with grasslands and wildlife" },
  { name: "Serengeti", description: "Open plains, big cats and the migration.", href: "/safaris/serengeti", image: "/images/tanzania-safari/serengeti.jpg", alt: "Golden Serengeti grassland with a lone acacia tree and open sky" },
] as const;

export const safariExperience = {
  eyebrow: "YOUR SAFARI EXPERIENCE",
  title: "More Than a Journey. An Immersion in the Wild.",
  image: "/images/tanzania-safari/safari-experience.jpg",
  imageAlt: "A safari vehicle on an open African plain at sunrise",
  paragraphs: [
    "A typical Tanzania safari revolves around game drives in a safari vehicle with an expert guide, usually in the early morning and again in the afternoon, when wildlife is often most active and the light is at its best. Between drives you might enjoy a relaxed lunch, time at camp, or a quiet moment with a view across the plains.",
    "Your guide does far more than drive. They read tracks, explain animal behavior and help you understand the habitats you travel through, from grassland to woodland to river valley. You may stay in lodges, tented camps or other accommodation depending on your itinerary, with services, meals, vehicles and activities all confirmed in your proposal.",
  ],
  quote: "Some of Africa's most extraordinary moments happen when you slow down and let the wilderness reveal itself.",
};

export const dayOnSafari = [
  { time: "Sunrise", title: "The landscape wakes", text: "An early start as the landscape wakes up and the light turns gold.", icon: "sunrise" },
  { time: "Morning", title: "Morning game drive", text: "Explore wildlife habitats while many animals are active.", icon: "binoculars" },
  { time: "Late morning", title: "Bush breakfast or return to camp", text: "Breakfast depends on your itinerary and camp arrangements.", icon: "coffee" },
  { time: "Midday", title: "A slower moment", text: "Lunch, a break from the heat and time to enjoy your lodge or camp.", icon: "sun" },
  { time: "Afternoon", title: "Afternoon game drive", text: "Back out into the landscape as the day cools and the light softens.", icon: "camera" },
  { time: "Evening", title: "Under the stars", text: "Sundowners where arranged, dinner and a night in Tanzania.", icon: "moon" },
] as const;

export const wildlife = [
  { name: "Lion", slug: "lion", description: "Africa's great social predator, often resting in the shade by day and more active at dawn and dusk.", destinations: "Serengeti, Ngorongoro, Tarangire", alt: "A lion resting in the grass on the Serengeti", size: "large" },
  { name: "Elephant", slug: "elephant", description: "Tarangire is especially known for its elephant herds, particularly in the dry season.", destinations: "Tarangire", alt: "An African elephant herd walking across the savanna", size: "large" },
  { name: "Leopard", slug: "leopard", description: "Secretive and solitary, leopards are often glimpsed in trees or among rocks, and are never guaranteed.", destinations: "Serengeti", alt: "A leopard resting on a tree branch", size: "large" },
  { name: "Buffalo", slug: "buffalo", description: "Large herds graze plains and wetlands across the northern circuit.", destinations: "Serengeti, Ngorongoro, Tarangire", alt: "A large African buffalo standing in tall grass", size: "large" },
  { name: "Rhino", slug: "rhino", description: "The black rhino is a globally threatened species and sightings are rare, but Ngorongoro Crater is one place where visitors may occasionally see one.", destinations: "Ngorongoro", alt: "A black rhino grazing in Ngorongoro Crater", size: "large" },
  { name: "Cheetah", slug: "cheetah", description: "Cheetahs favor open grassland where they can spot prey, which makes the Serengeti plains a classic setting.", destinations: "Serengeti", alt: "A cheetah scanning the plains from a termite mound", size: "small" },
  { name: "Giraffe", slug: "giraffe", description: "The tallest animal on Earth, often seen browsing acacia woodland.", destinations: "Serengeti, Tarangire", alt: "A giraffe browsing an acacia tree", size: "small" },
  { name: "Zebra", slug: "zebra", description: "Plains zebra travel alongside the wildebeest in the Serengeti ecosystem.", destinations: "Serengeti", alt: "A herd of plains zebra on open grassland", size: "small" },
  // The wildlife-count wording was removed to honor the brief's rule against publishing wildlife counts.
  { name: "Wildebeest", slug: "wildebeest", description: "Wildebeest take part in the annual migration across the Serengeti ecosystem, though their exact location shifts through the year.", destinations: "Serengeti", alt: "Wildebeest crossing the Serengeti plains", size: "small" },
  { name: "Hippo", slug: "hippo", description: "Hippos spend the day in water and come ashore at dusk to graze.", destinations: "Serengeti", alt: "Hippos resting in a river pool", size: "small" },
  { name: "Hyena", slug: "hyena", description: "Spotted hyenas are skilled hunters as well as scavengers, and are often heard before they are seen.", destinations: "Serengeti, Ngorongoro", alt: "A spotted hyena standing on the savanna", size: "small" },
  { name: "Crocodile", slug: "crocodile", description: "Nile crocodiles gather along rivers, including the Mara River in the northern Serengeti.", destinations: "Serengeti", alt: "A Nile crocodile resting beside a river", size: "small" },
] as const; // TODO(CONFIRM): Review all wildlife destination tags with the team.

export const wildlifeCallout = "Every safari is different. Wildlife is wild, and no animal sighting can be guaranteed. Our itineraries are designed around the landscapes, seasons and opportunities that give you the best possible experience.";
export const dayOnSafariDisclaimer = sectionCopy.dayOnSafari.disclaimer;

export const seasonCards = [
  { months: "June to October", name: "The dry season", description: "Drier conditions tend to concentrate wildlife near reliable water, and game viewing is generally good. In the Serengeti this is a key period for the migration, and Tarangire is especially rewarding." },
  { months: "November to December", name: "The short rains", description: "Landscapes begin to turn green and wildlife shifts as the rains arrive. Conditions vary from year to year." },
  { months: "January to March", name: "Green season and calving", description: "The southern Serengeti and the Ndutu region become important for the migration, with calving and active predators. Landscapes can be lush and beautiful." },
  { months: "March to May", name: "The long rains", description: "More rainfall across many northern safari areas. Landscapes are lush and quieter, though some roads can be difficult and some seasonal camps close." },
];

export const migrationStages = [
  { months: "December to March", place: "Southern Serengeti and the Ndutu plains", note: "Calving typically takes place early in the year." },
  { months: "April to June", place: "Central and western Serengeti", note: "Herds travel north and west through the ecosystem." },
  { months: "July to October", place: "Northern Serengeti and the Mara River region", note: "Herds move through the northern regions." },
  { months: "November to December", place: "Moving south", note: "Herds drift back south as the short rains arrive." },
]; // TODO(CONFIRM): Review these general migration patterns with the team.

export const seasonGrid = [
  { destination: "Serengeti", ratings: ["best", "low", "best", "best", "good"] },
  { destination: "Ngorongoro", ratings: ["good", "mixed", "best", "best", "good"] },
  { destination: "Tarangire", ratings: ["mixed", "low", "best", "best", "mixed"] },
] satisfies { destination: string; ratings: SeasonRating[] }[]; // TODO(CONFIRM): Editorial guide values require review.

export const seasonColumns = ["Jan to Mar", "Apr to May", "Jun to Jul", "Aug to Oct", "Nov to Dec"];
export const seasonNotes = [
  { destination: "Serengeti", text: "Year-round wildlife, with the migration moving through different regions across the year." },
  { destination: "Ngorongoro", text: "Varied wildlife viewing through the year, with the long rains the least predictable time." },
  { destination: "Tarangire", text: "Particularly notable for dry-season wildlife concentrations along the river." },
];

export const approachCards = [
  { title: "Women-Led Company", text: "She Roars Africa Safari is a women-led travel company based in Tanzania. Our team brings together women and men who share one goal: safaris that feel personal, safe and well looked after.", icon: "heart" },
  { title: "Tailor-Made Journeys", text: "Your dates, interests, pace and budget shape every itinerary, so no two journeys are the same.", icon: "compass" },
  { title: "Local Knowledge", text: "Planning with a Tanzania-based team means practical advice on routes, seasons, parks and logistics from people who know them well.", icon: "map" },
  { title: "Personal Support", text: "Talk to a real person about your plans before you book, and get help choosing accommodation, timing and itinerary.", icon: "message" },
] as const; // TODO(CONFIRM): Confirm the company description and service claims before publication.

export const travelStyles = [
  { title: "Private Safaris", text: "A private itinerary gives you flexibility over pace, timing and the way you spend each day. Ask us about a private Tanzania safari for your dates.", href: "/plan-your-safari?type=Safari", image: "/images/tanzania-safari/styles/private.jpg", alt: "A private safari vehicle with a guide overlooking the plains" },
  { title: "Family Safaris", text: "Pace, accommodation and activities can be shaped around the ages and interests of your family.", href: "/experiences/family-safaris", image: "/images/tanzania-safari/styles/family.jpg", alt: "A family watching wildlife from a safari vehicle" },
  { title: "Luxury Safaris", text: "Premium lodges and camps, greater comfort and carefully arranged experiences.", href: "/experiences/luxury-safaris", image: "/images/tanzania-safari/styles/luxury.jpg", alt: "A luxury safari tent overlooking the savanna" },
  { title: "Women-Only Safari Experiences", text: "Travel alongside like-minded women on women-only departures where these are available.", href: "/safaris/packages/7-day-women-only-group-safari", image: "/images/tanzania-safari/styles/women-only.jpg", alt: "Women travelers enjoying a sunset game drive" },
] as const; // TODO(CONFIRM): Confirm private safari flexibility, luxury arrangements and women-only departures.

export const planSteps = [
  { title: "Tell us your travel dates", text: "Share the month you would like to travel and roughly how long you can be away." },
  { title: "Choose your destinations", text: "Explore the Serengeti, Ngorongoro and Tarangire, and tell us what draws you most." },
  { title: "Select your travel style", text: "Decide on comfort level, private or shared travel and any special interests." },
  { title: "Receive your tailor-made proposal", text: "We prepare a suggested itinerary and quotation, subject to availability." },
  { title: "Refine and confirm", text: "Final details, costs, terms and availability are confirmed before you book." },
];

export const travelMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const travelerOptions = ["1", "2", "3 to 4", "5 or more"];
export const interestOptions = ["Serengeti", "Ngorongoro", "Tarangire"];

export const practicalCards = [
  { title: "When to arrive", text: "Kilimanjaro International Airport is a common entry point for northern circuit journeys, and Arusha Airport may also be relevant depending on your itinerary. Transfers are only included when your proposal says so.", icon: "plane" },
  { title: "Travel documents", text: "Check your passport validity and the current visa requirements for your nationality before you book.", href: "/travel-guide/visas-and-entry", linkLabel: "Travel documents guide", icon: "passport" },
  { title: "Health and insurance", text: "We recommend comprehensive travel insurance and a visit to a qualified health professional or travel clinic before you travel.", href: "/travel-guide/health-and-vaccinations", linkLabel: "Health and vaccinations guide", icon: "shield" },
  { title: "What to pack", text: "Neutral clothing, comfortable shoes, warm layers for early mornings, binoculars, sun protection and soft luggage are a good start.", href: "/travel-guide/packing-list", linkLabel: "Safari packing list", icon: "backpack" },
  { title: "Wildlife safety", text: "Follow your guide's instructions, stay in the vehicle except in permitted areas, and respect park rules. They exist to protect you and the animals.", icon: "paw" },
  { title: "Park and conservation fees", text: "Fees vary by visitor category, age, destination, activity and current policy, so we do not list them here. Check the official TANAPA and Ngorongoro Conservation Area Authority websites for current information.", externalLinks: [{ label: "TANAPA", href: "https://tanzaniaparks.go.tz" }, { label: "Ngorongoro Conservation Area Authority", href: "https://www.ncaa.go.tz" }], icon: "info" },
] as const;

export const practicalCallout = "Every proposal states clearly what is and is not included."; // TODO(CONFIRM): Confirm proposal wording.
export const responsibleTravel = {
  eyebrow: "TRAVEL WITH CARE",
  title: "Safari Travel That Supports the Places It Visits",
  text: "Thoughtful tourism can support conservation and local communities, and we are committed to travelling responsibly.",
}; // TODO(CONFIRM): Confirm the responsible-travel commitment.

export const faqItems: FaqItem[] = [
  {
    question: "What is the best time to visit Tanzania for a safari?",
    answer: [
      { text: "Tanzania is a year-round safari destination. The dry season from June to October is the most popular period, with good wildlife viewing and, in parts of the Serengeti, important migration activity. From roughly January to March, the southern Serengeti and the Ndutu area are known for calving season. Each destination has its own seasonal pattern, so the best time depends on what you most want to see. See our " },
      { text: "best time to visit guide.", href: "/travel-guide/best-time-to-visit" },
    ],
  },
  {
    question: "Which are the best safari destinations in Northern Tanzania?",
    answer: [{ text: "The Serengeti is known for vast plains, big cats and the Great Migration. Ngorongoro Crater offers dramatic scenery and remarkable wildlife concentrations inside a volcanic caldera. Tarangire is celebrated for its elephants, baobab trees and dry-season wildlife along the Tarangire River. Many travelers also add Lake Manyara." }],
  },
  {
    question: "Can I visit the Serengeti, Ngorongoro and Tarangire on one safari?",
    answer: [{ text: "Yes. Tarangire, Ngorongoro and the Serengeti are commonly combined on a northern circuit itinerary. How well it works depends on the number of days you have, the route and the accommodation available, so we plan the order and pace with you." }],
  },
  {
    question: "What animals can I see on a Tanzania safari?",
    answer: [{ text: "Many visitors hope to see the Big Five (lion, leopard, elephant, buffalo and rhino) along with giraffe, zebra, wildebeest, cheetah, hippo, hyena and a wide range of birds. What you see varies by location, season and luck. Rhino sightings in particular are rare, and no sighting can be guaranteed." }],
  },
  {
    question: "How many days do I need for a Tanzania safari?",
    answer: [{ text: "It depends on which destinations you want and how much time you want to spend in each. Visiting all three major destinations generally needs more days than focusing on one or two, and a slower pace usually means a richer experience. Tell us your dates and we will suggest a realistic itinerary." }],
  },
  {
    question: "Is Tanzania suitable for first-time safari travelers?",
    answer: [{ text: "Yes. Northern Tanzania offers a wide range of safari styles and is well suited to first-time visitors. A good itinerary balances travel time with time watching wildlife, and your guide helps you learn as you go." }],
  },
  {
    question: "What is the difference between the Serengeti and Ngorongoro?",
    answer: [{ text: "The Serengeti is a vast national park of plains, woodland and rivers, and the setting of the annual wildebeest migration. Ngorongoro is a conservation area built around a huge volcanic caldera, where wildlife concentrates on the crater floor, and where Maasai pastoralists also live and graze livestock in parts of the wider area. Many itineraries include both because they feel so different." }],
  },
  {
    question: "What makes Tarangire special?",
    answer: [{ text: "Tarangire is known for its elephants, its ancient baobab trees and the Tarangire River, which draws wildlife during the dry season. It is often a gentle and rewarding start to a northern circuit safari." }],
  },
  {
    question: "Are private safaris available?",
    answer: [{ text: "Private arrangements can be discussed for many itineraries. Share your dates, group size and preferences through our " }, { text: "Plan Your Safari page", href: "/plan-your-safari" }, { text: " and we will tell you what is available." }],
  },
  {
    question: "What accommodation can I choose?",
    answer: [{ text: "Depending on your itinerary and budget, you may stay in lodges, permanent tented camps, seasonal camps or other types of accommodation. See our guide to " }, { text: "where to stay in the Serengeti", href: "/safaris/serengeti/where-to-stay" }, { text: "." }],
  },
  {
    question: "Can I combine a safari with Kilimanjaro or Zanzibar?",
    answer: [{ text: "Yes. Safari, mountain and beach experiences can often be combined, depending on the days available and the logistics. Many travelers finish a safari with a few days on Zanzibar. Explore " }, { text: "Kilimanjaro", href: "/kilimanjaro" }, { text: ", " }, { text: "Zanzibar", href: "/zanzibar" }, { text: " and " }, { text: "Safari and Beach", href: "/zanzibar/safari-and-beach" }, { text: "." }],
  },
  {
    question: "How can I plan my Tanzania safari?",
    answer: [{ text: "Send us your travel dates, the destinations that interest you and your travel style through our " }, { text: "Plan Your Safari page", href: "/plan-your-safari" }, { text: ", or message us on WhatsApp. We will come back to you with a suggested itinerary and quotation, subject to availability." }],
  },
];

export function faqPlainText(item: FaqItem) {
  return item.answer.map(({ text }) => text).join("");
}

export const relatedLinks = [
  { title: "The Great Migration", description: "Follow the herds across the Serengeti ecosystem.", href: "/safaris/serengeti/great-migration" },
  { title: "Where to Stay in the Serengeti", description: "Explore accommodation styles and locations.", href: "/safaris/serengeti/where-to-stay" },
  { title: "Kilimanjaro Climbs", description: "Plan a mountain journey to pair with your safari.", href: "/kilimanjaro" },
  { title: "Zanzibar Beach Escapes", description: "Add time on the coast to your Tanzania trip.", href: "/zanzibar" },
  { title: "Tanzania Travel Guide", description: "Find practical guidance for your visit.", href: "/travel-guide" },
  { title: "All Safari Packages", description: "Browse the available safari journeys.", href: "/safaris/packages" },
];

export const finalCta = {
  eyebrow: "YOUR TANZANIA STORY STARTS HERE",
  title: "Let the Adventure Begin",
  description: "The extraordinary landscapes of Tanzania are waiting to be explored. Whether you dream of the Serengeti's endless plains, the wildlife-rich Ngorongoro Crater or the elephants and baobabs of Tarangire, we would love to help shape a journey that feels entirely yours.",
  image: "/images/tanzania-safari/cta.jpg",
  imageAlt: "A silhouette of acacia trees against a Tanzanian sunset",
};
