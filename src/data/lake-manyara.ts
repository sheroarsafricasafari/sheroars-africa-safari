import type {
  DestinationFact,
  DestinationHeroData,
  DestinationNavItem,
  ExperienceData,
  GettingThereData,
  SeasonData,
  SightingData,
  StayTierData,
  TipData,
  WildlifeTileData,
  ZoneData,
} from "@/types/destination";

export const lakeManyaraHero: DestinationHeroData = {
  image: "/images/lake-manyara/hero.jpg",
  eyebrow: "TANZANIA NORTHERN CIRCUIT",
  title: "Lake Manyara National Park Safari",
  subtitle: "Where the Great Rift Valley escarpment meets a shimmering soda lake, a groundwater forest and some of the biggest elephant families in Tanzania.",
  chips: ["About 2 hours from Arusha", "Day trip or overnight", "Tree-climbing lions", "400+ bird species"],
  primary: { label: "View Manyara Safaris", href: "#packages" },
  secondary: { label: "Plan My Trip", href: "/plan-your-safari?type=Safari" },
};

export const lakeManyaraBreadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Lake Manyara", href: "/safaris/lake-manyara" },
];

export const lakeManyaraNav: DestinationNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "landscape", label: "Landscape" },
  { id: "wildlife", label: "Wildlife" },
  { id: "activities", label: "Activities" },
  { id: "when-to-go", label: "When to go" },
  { id: "getting-there", label: "Getting there" },
  { id: "stay", label: "Stay" },
  { id: "packages", label: "Packages" },
  { id: "faqs", label: "FAQs" },
];

export const lakeManyaraFacts: DestinationFact[] = [
  { value: "About 325", numericValue: 325, prefix: "About ", suffix: " km2", label: "of park, roughly two-thirds lake" },
  { value: "400+", numericValue: 400, suffix: "+", label: "bird species" },
  { value: "126", numericValue: 126, suffix: " km", label: "from Arusha, about 1.5 to 2 hours" },
  { value: "600", numericValue: 600, suffix: " m", label: "Rift Valley escarpment wall" },
  { value: "June to October", label: "for game, November to April for birds" },
];

export const lakeManyaraSidebarFacts = [
  { label: "Size", value: "About 325 km2", icon: "map" },
  { label: "Location", value: "Rift Valley floor, near Mto wa Mbu", icon: "map" },
  { label: "Distance", value: "126 km from Arusha", icon: "clock" },
  { label: "Park type", value: "National park", icon: "compass" },
  { label: "Lake type", value: "Shallow alkaline soda lake", icon: "sun" },
  { label: "Time needed", value: "Half a day to 2 days", icon: "clock" },
  { label: "Famous for", value: "Tree-climbing lions, elephants and birdlife", icon: "paw" },
];

export const lakeManyaraZones: ZoneData[] = [
  {
    title: "Groundwater Forest",
    image: "/images/lake-manyara/groundwater-forest.jpg",
    description: "Near the main gate, underground springs from the escarpment feed a cool, green forest of tall mahogany, fig and sycamore trees. Blue monkeys and olive baboons move through the canopy, while silvery-cheeked hornbills call above the road. Elephants often pass quietly between the trunks, making this shaded opening to the park feel very different from the open lake beyond.",
    bullets: ["Fed by groundwater springs", "A cool, shaded first stop", "Forest wildlife in the canopy and below"],
    lookFor: ["Blue monkeys", "Hornbills", "Bushbuck"],
    bestTime: "Early morning, when the forest is cool and active.",
  },
  {
    title: "The Soda Lake",
    image: "/images/lake-manyara/soda-lake.jpg",
    description: "This shallow alkaline lake has no outlet, so its shoreline expands and contracts with the seasons. When water, algae and other conditions suit, lesser flamingos gather in large numbers and tint the shallows pink. Pelicans, storks and spoonbills may forage nearby, while hippos use the water and its edges. The lake is beautiful in every season, but its birdlife changes with conditions.",
    bullets: ["A seasonal shoreline", "Birdlife changes with water and algae", "Flamingos are a bonus, not a promise"],
    lookFor: ["Flamingos", "Pelicans", "Hippos"],
    bestTime: "November to April for birding, with sightings depending on conditions.",
  },
  {
    title: "Acacia Woodland and the Quiet South",
    image: "/images/lake-manyara/acacia-woodland.jpg",
    description: "Spreading acacias and open glades create a very different search from the forest and lake. This woodland is the place to scan the horizontal branches for the park's famous tree-climbing lions, often resting in the southern sector. Giraffe browse above the smaller shrubs, while buffalo and impala move through the clearings. The south is also the park's quietest area.",
    bullets: ["Open glades and spreading acacias", "Quiet southern sector", "Look up as well as across the road"],
    lookFor: ["Tree-climbing lions", "Giraffe", "Buffalo", "Impala"],
    bestTime: "Early or late in the day, with time for an unhurried scan.",
  },
  {
    title: "Floodplain and Hippo Pool",
    image: "/images/lake-manyara/floodplain-hippo-pool.jpg",
    description: "Open grassy flats along the lake draw zebra, wildebeest, buffalo and waterbuck. At the Hippo Pool viewpoint, a safe boardwalk lets visitors watch hippos resting in the water without leaving the designated area. Cranes and other waterbirds work the wet edges, while the escarpment rises beyond the plain. It is an easy place to pause, stretch your legs and watch.",
    bullets: ["Open grazing beside the lake", "A safe boardwalk viewpoint", "A good pause between game drives"],
    lookFor: ["Hippos", "Zebra", "Waterbuck", "Cranes"],
    bestTime: "Midday at the viewpoint, or early and late on the surrounding plains.",
  },
  {
    title: "Maji Moto Hot Springs and the Escarpment",
    image: "/images/lake-manyara/maji-moto-escarpment.jpg",
    description: "Near the lakeshore, natural hot springs bubble at temperatures above 60 degrees Celsius and feed small streams that attract birds. The water is not for bathing, and visitors should stay on designated paths. Above the lake, the Great Rift Valley escarpment rises about 600 metres, adding a dramatic wall of green and gold to photographs across the park.",
    bullets: ["Hot springs above 60 degrees Celsius", "Birdlife around the streams", "A striking escarpment backdrop"],
    lookFor: ["Hot springs", "Klipspringer", "Birds of prey"],
    bestTime: "When the light is soft and the escarpment is clearly visible.",
  },
];

export const lakeManyaraWildlife: WildlifeTileData[] = [
  { name: "Elephants", description: "Some of Tanzania's densest elephant populations move through the forest and along the lake edge all year.", likelihood: "Best chance: very high", image: "/images/lake-manyara/wildlife-elephants.jpg", imageAlt: "Lake Manyara elephants walking between groundwater forest trees", featured: true },
  { name: "Tree-climbing lions", description: "Manyara's headline act. Prides rest in acacia branches, usually in the southern woodland. They are rare and unforgettable, but elusive, so we plan unhurried drives.", likelihood: "Best chance: possible, never guaranteed", image: "/images/lake-manyara/wildlife-tree-climbing-lions.jpg", imageAlt: "Acacia branches in Lake Manyara woodland where tree-climbing lions may rest" },
  { name: "Hippos", description: "The Hippo Pool is a reliable place to watch hippos from the designated viewpoint.", likelihood: "Best chance: very high", image: "/images/lake-manyara/wildlife-hippos.jpg", imageAlt: "Hippos resting in the Lake Manyara Hippo Pool" },
  { name: "Olive baboons", description: "Large troops, sometimes over a hundred, make the forest roads lively.", likelihood: "Best chance: very high", image: "/images/lake-manyara/wildlife-baboons.jpg", imageAlt: "Olive baboons moving through the Lake Manyara groundwater forest" },
  { name: "Giraffe, buffalo and plains wildlife", description: "Giraffe, buffalo, zebra, wildebeest, impala and waterbuck make easy sightings across woodland and open plains.", likelihood: "Best chance: high", image: "/images/lake-manyara/wildlife-plains.jpg", imageAlt: "Giraffe and plains wildlife beneath the Lake Manyara escarpment" },
  { name: "Forest and escarpment residents", description: "Blue monkeys, vervets, dik-dik and klipspringer live among the forest edges and rocky slopes.", likelihood: "Best chance: high to moderate", image: "/images/lake-manyara/wildlife-forest-species.jpg", imageAlt: "Blue monkey among the trees of Lake Manyara National Park" },
  { name: "Leopard", description: "Leopard are present but very secretive, so every sighting is a rare bonus.", likelihood: "Best chance: low", image: "/images/lake-manyara/wildlife-leopard.jpg", imageAlt: "Shaded woodland habitat where secretive Lake Manyara leopard may be found" },
  { name: "Flamingos and waterbirds", description: "Lesser and greater flamingos, pelicans, storks, spoonbills and cranes depend on water and algae conditions.", likelihood: "Best chance: seasonal", image: "/images/lake-manyara/wildlife-waterbirds.jpg", imageAlt: "Seasonal waterbirds on the shallow Lake Manyara soda lake" },
  { name: "Birds of prey and forest birds", description: "More than 400 species have been recorded, including silvery-cheeked hornbills, crowned eagles, trogons and kingfishers. November to April is best for birding when migrants arrive.", likelihood: "Best chance: excellent year-round, with migrants November to April", image: "/images/lake-manyara/wildlife-forest-birds.jpg", imageAlt: "Silvery-cheeked hornbill in Lake Manyara forest canopy" },
];

export const lakeManyaraLionTips: SightingData[] = [
  { name: "Search the southern acacias", where: "Scan the spreading branches in the southern woodland, where tree-climbing lions are sometimes seen.", bestTime: "Include the quieter south in your route." },
  { name: "Go early or late", where: "Ask your guide to allow enough time for a slow search rather than rushing between habitats.", bestTime: "Early morning or late afternoon." },
  { name: "Scan horizontal branches", where: "Look along thick, level limbs and into the shade, not only at the ground below the trees.", bestTime: "Pause and scan from more than one angle." },
  { name: "Let your guide choose the route", where: "Your guide can adjust the drive to current conditions and recent wildlife movement.", bestTime: "Stay flexible throughout the day." },
];

export type LakeManyaraActivity = ExperienceData & { styles: string[] };

export const lakeManyaraActivities: LakeManyaraActivity[] = [
  { title: "Day game drive", tags: ["Classic safari", "Wildlife"], text: "A private 4x4 safari through forest, floodplain and lakeshore, with a pop-up roof for photos and a window seat for every guest.", image: "/images/lake-manyara/activity-game-drive.jpg", imageAlt: "Private 4x4 game drive among elephants and forest in Lake Manyara", href: "/safaris/packages/lake-manyara-day-safari", styles: ["Wildlife", "Birds"] },
  { title: "Night game drive", tags: ["After dark", "Luxury tier"], text: "One of the few Tanzanian parks where after-dark drives are allowed, offered with in-park accommodation. Look for genets, civets, bush babies and hyena. Included in the Luxury tier of Packages 2 and 3.", image: "/images/lake-manyara/activity-night-drive.jpg", imageAlt: "Guided night game drive in Lake Manyara National Park", href: "/safaris/packages/lake-manyara-overnight-escape", styles: ["Wildlife", "Adventure"] },
  { title: "Tree Top Canopy Walkway", tags: ["About 370 metres", "Extra fee included in overnight packages"], text: "Walk a suspended route through the forest canopy, with brilliant views of birds and monkeys. The fee is included in our overnight packages.", image: "/images/lake-manyara/activity-canopy-walk.jpg", imageAlt: "Suspended canopy walkway passing through Lake Manyara forest", href: "/safaris/packages/lake-manyara-overnight-escape", styles: ["Birds", "Adventure"] },
  { title: "Canoe safari", tags: ["Seasonal", "Water levels permitting"], text: "Paddle the lake when water levels allow, with hippos and waterbirds for company. Availability depends on the season and water conditions.", image: "/images/lake-manyara/activity-canoe.jpg", imageAlt: "Canoe on the calm waters of Lake Manyara with birds nearby", href: "/plan-your-safari?type=Safari", styles: ["Birds", "Adventure"] },
  { title: "Guided walking safari", tags: ["Armed ranger", "Designated trails"], text: "Leave the vehicle for a short guided walk led by an armed ranger along a designated trail.", image: "/images/lake-manyara/activity-guided-walk.jpg", imageAlt: "Guided walking safari on a designated Lake Manyara trail", href: "/safaris/packages/lake-manyara-adventure-culture-safari", styles: ["Adventure", "Wildlife"] },
  { title: "Mto wa Mbu cultural tour", tags: ["Local guide", "Village life"], text: "Walk or cycle with a local guide through banana plantations, rice fields, the craft market, a local kitchen and community stops, with lunch in a banana plantation.", image: "/images/lake-manyara/activity-mto-wa-mbu.jpg", imageAlt: "Local guide leading a cultural walk through Mto wa Mbu village", href: "/safaris/packages/lake-manyara-day-safari", styles: ["Culture"] },
  { title: "Maji Moto hot springs and bush picnic", tags: ["Maji Moto", "Birdlife"], text: "Enjoy a picnic beside the hot springs and watch the birdlife around the water. Stay on designated paths and follow your guide's directions.", image: "/images/lake-manyara/activity-hot-springs.jpg", imageAlt: "Warm water and bird habitat beside Maji Moto hot springs", href: "/safaris/packages/lake-manyara-adventure-culture-safari", styles: ["Birds", "Adventure"] },
  { title: "Maasai boma visit and escarpment forest walk", tags: ["Local host", "Rift Valley rim"], text: "Meet a Maasai family on the Rift Valley rim and take a forest walk above the escarpment with a local host.", image: "/images/lake-manyara/activity-maasai-boma.jpg", imageAlt: "Forest path above Lake Manyara near the Rift Valley escarpment", href: "/safaris/packages/lake-manyara-adventure-culture-safari", styles: ["Culture", "Adventure"] },
];

export const lakeManyaraStyles = [
  { label: "Wildlife", packageSlug: "lake-manyara-day-safari", packageName: "Lake Manyara Day Safari and Mto wa Mbu Culture", description: "Choose the day safari for forest wildlife, the Hippo Pool and a lakeshore game drive.", activities: ["Day game drive", "Night game drive", "Guided walking safari"] },
  { label: "Birds", packageSlug: "lake-manyara-overnight-escape", packageName: "Lake Manyara Overnight Escape", description: "Choose an overnight stay for early forest birding, the canopy walkway and more time by the lake.", activities: ["Day game drive", "Tree Top Canopy Walkway", "Canoe safari", "Maji Moto hot springs and bush picnic"] },
  { label: "Culture", packageSlug: "lake-manyara-adventure-culture-safari", packageName: "Lake Manyara Adventure and Culture Safari", description: "Choose three days for Mto wa Mbu, a Maasai family visit and a slower pace.", activities: ["Mto wa Mbu cultural tour", "Maasai boma visit and escarpment forest walk"] },
  { label: "Adventure", packageSlug: "lake-manyara-adventure-culture-safari", packageName: "Lake Manyara Adventure and Culture Safari", description: "Choose three days to add the canopy, a ranger-led walk and a picnic beside Maji Moto.", activities: ["Night game drive", "Tree Top Canopy Walkway", "Canoe safari", "Guided walking safari", "Maji Moto hot springs and bush picnic", "Maasai boma visit and escarpment forest walk"] },
];

export const lakeManyaraSeasons: SeasonData = {
  caption: "Lake Manyara wildlife and birding by month",
  rows: [
    { label: "Game viewing", months: ["good", "good", "quiet", "quiet", "quiet", "good", "peak", "peak", "peak", "peak", "good", "good"] },
    { label: "Birding", months: ["peak", "peak", "good", "good", "good", "good", "good", "good", "good", "good", "peak", "peak"] },
  ],
  cards: [
    { range: "June to October", title: "Dry season", text: "Best for game viewing. Animals gather near water, the vegetation thins and elephants are everywhere. These are peak visitor months, but Manyara is still quieter than the Serengeti.", icon: "sun" },
    { range: "November to April", title: "Green season", text: "Best for birding as migrants arrive and the lake becomes more dramatic. Enjoy lush scenery and good value. Short rains usually fall November to December, with long rains from mid-March to May.", icon: "bird" },
    { range: "Mid-March to May", title: "Long rains", text: "The quietest period with lower prices, good potential for canoeing and waterfalls, and some muddy tracks.", icon: "leaf" },
    { range: "Every month", title: "Year-round safari", text: "Lake Manyara rewards a visit in every month, with changing water levels and wildlife patterns adding a different feel to each trip.", icon: "compass" },
  ],
};

export const lakeManyaraMonths = [
  { month: "Jan", highlight: "Green and birdy" },
  { month: "Feb", highlight: "Green and birdy" },
  { month: "Mar", highlight: "Waterfalls, quiet" },
  { month: "Apr", highlight: "Waterfalls, quiet" },
  { month: "May", highlight: "Waterfalls, quiet" },
  { month: "Jun", highlight: "Game viewing peak" },
  { month: "Jul", highlight: "Game viewing peak" },
  { month: "Aug", highlight: "Game viewing peak" },
  { month: "Sep", highlight: "Game viewing peak" },
  { month: "Oct", highlight: "Game viewing peak" },
  { month: "Nov", highlight: "Migrant birds" },
  { month: "Dec", highlight: "Migrant birds" },
];

export const lakeManyaraGettingThere: GettingThereData = {
  road: {
    title: "By road from Arusha",
    description: "Travel about 126 km on a good tarmac road to Mto wa Mbu, the gateway village. The park gate is only minutes beyond.",
    times: ["About 1.5 to 2 hours", "About 2.5 to 3 hours from JRO"],
    steps: ["Leave Arusha with your private guide", "Pause above the Rift Valley if the light is good", "Reach Mto wa Mbu and continue to the gate"],
  },
  air: {
    title: "From Kilimanjaro Airport",
    description: "Kilimanjaro International Airport is about 2.5 to 3 hours away by road. Your private transfer can be arranged around your arrival details.",
    times: ["Kilimanjaro Airport (JRO)", "Private road transfer"],
    steps: ["Share your flight details", "Meet your driver at the airport", "Continue to Arusha, Mto wa Mbu or your lodge"],
  },
  note: "Tarangire is about 1.5 hours away. Ngorongoro Crater is about 1 to 1.5 hours via Karatu. The Serengeti is about a day's drive or a short flight.",
};

export const lakeManyaraDays = [
  { label: "Half day", headline: "Add a game drive en route", suits: "Travellers crossing the Northern Circuit toward Ngorongoro.", experience: "Take a focused drive through the forest or along the lake before continuing onward.", href: "/safaris/packages/lake-manyara-day-safari" },
  { label: "1 day", headline: "A complete day trip from Arusha", suits: "Guests based in Arusha, climbers and first-time safari visitors.", experience: "Combine forest wildlife, the Hippo Pool, lakeshore birding and a village walk.", href: "/safaris/packages/lake-manyara-day-safari" },
  { label: "1 night", headline: "Stay for the quiet hours", suits: "Couples, photographers and travellers wanting an early start.", experience: "Add the canopy walkway, Mto wa Mbu and, in the Luxury tier, a night game drive.", href: "/safaris/packages/lake-manyara-overnight-escape" },
  { label: "2 nights", headline: "Slow down and explore more", suits: "Families, nature lovers and cultural travellers.", experience: "Add a full park day, Maji Moto picnic, ranger-led walk and Maasai family visit.", href: "/safaris/packages/lake-manyara-adventure-culture-safari" },
];

export const lakeManyaraStayTiers: StayTierData[] = [
  { title: "Inside the park", description: "A small handful of properties offer immersive stays, quiet mornings and access to night drives and the southern sector.", bestFor: "Guests who want more time in the park.", recommendedFor: "Night drives and an early start." },
  { title: "Escarpment lodges", description: "Rift Valley rim stays bring sweeping views over the lake and plains, strong value and a short drive to the gate.", bestFor: "Travellers who value views and easy park access.", recommendedFor: "A relaxed overnight escape." },
  { title: "Mto wa Mbu and Karatu", description: "Comfortable lodges and tented camps bring a cultural feel and easy access to the park and nearby highlands.", bestFor: "Guests combining several Northern Circuit stops.", recommendedFor: "A flexible base for a longer safari." },
];

export const lakeManyaraTips: TipData[] = [
  { title: "Bring the essentials", text: "Pack a hat, sunscreen and binoculars for bright lakeshore drives and birding.", icon: "sun" },
  { title: "Wear neutral colours", text: "Choose comfortable, neutral layers for game drives and village visits.", icon: "compass" },
  { title: "Pack for rain", text: "Carry a light rain jacket in the green season.", icon: "cloud" },
  { title: "Bring a warm layer", text: "The forest can feel cool in the morning.", icon: "leaf" },
  { title: "Book activities early", text: "Reserve the canopy walk and night drive early for your dates.", icon: "clock" },
  { title: "Give wildlife space", text: "Keep hands inside the vehicle near baboons and follow your guide's instructions.", icon: "paw" },
  { title: "Plan small purchases", text: "Carry small cash for the Mto wa Mbu village market.", icon: "map" },
  { title: "Ask your guide", text: "Ask your guide for current tipping guidance and a route suited to your interests.", icon: "heart" },
];

export const lakeManyaraComparison = {
  columns: ["Lake Manyara", "Tarangire"],
  rows: [
    { label: "Size", values: ["325 km2", "About 2,850 km2"] },
    { label: "Signature", values: ["Tree-climbing lions and a soda lake", "Elephant herds and baobabs"] },
    { label: "Best months", values: ["June to October for game, November to April for birds", "June to October"] },
    { label: "Landscape", values: ["Forest, lake and escarpment", "Open plains, river and baobabs"] },
    { label: "Crowds", values: ["Quiet", "Quiet to moderate"] },
    { label: "Ideal stay", values: ["Day to 2 days", "1 to 3 days"] },
    { label: "Activities", values: ["Night drives, canopy walk and canoe", "Walking and night drives in the WMAs"] },
    { label: "Do both", values: ["See the 2-day Elephant Escape or 3-day Tarangire and Lake Manyara Classic", "Combine both parks on a Northern Circuit safari"] },
  ],
};

export const lakeManyaraFaqs = [
  { question: "How far is Lake Manyara from Arusha?", answer: "About 126 km, around 1.5 to 2 hours by road." },
  { question: "How long should I spend at Lake Manyara?", answer: "A day trip is enough for the highlights, one night adds a night drive or the canopy walk, and two nights lets you add culture and a slower pace." },
  { question: "Will I see tree-climbing lions?", answer: "They are the park's celebrity and have been seen resting in acacias, usually in the south, but sightings are never guaranteed. We give you time and the best guide to look." },
  { question: "Are there flamingos all year?", answer: "Numbers vary with water levels and algae. They are best seen when conditions suit, so treat them as a seasonal bonus." },
  { question: "When is the best time to visit?", answer: "June to October for game viewing; November to April for birdlife and green scenery. The park is lovely all year." },
  { question: "Can I do a night game drive?", answer: "Night drives are allowed in the park and are offered with in-park accommodation, so we include one in our Luxury tier." },
  { question: "What is the canopy walk?", answer: "A suspended walkway of about 370 metres through the forest canopy, ideal for birds and monkeys. An extra fee applies and is included in our overnight packages." },
  { question: "Can I combine Lake Manyara with other parks?", answer: "Yes. Tarangire, Ngorongoro Crater and the Serengeti are all within easy reach, and we build combined itineraries." },
  { question: "Is Lake Manyara good for families?", answer: "Absolutely. Distances are short, elephants and baboons are easy to see, and the Mto wa Mbu village tour is a hit with children." },
  { question: "Is Lake Manyara safe?", answer: "Yes. All game viewing is done in a private 4x4 with an experienced guide and walking activities are led by armed rangers." },
];

export const lakeManyaraBirds = [
  "Silvery-cheeked hornbill",
  "Pink-backed pelican",
  "Lesser flamingo",
  "Crowned eagle",
  "Palm-nut vulture",
  "African spoonbill",
  "Trogon",
  "Kingfisher",
];

export const lakeManyaraAddOnLinks = [
  { title: "Add Tarangire", href: "/safaris/tarangire", description: "Continue to elephant country, baobabs and the Tarangire River." },
  { title: "Add Ngorongoro Crater", href: "/safaris/ngorongoro", description: "Pair the Rift Valley floor with a crater-floor game drive." },
  { title: "Extend to the Serengeti", href: "/safaris/serengeti", description: "Add open plains, big cats and a longer Northern Circuit route." },
  { title: "Continue to Zanzibar", href: "/zanzibar", description: "Finish your Tanzania trip with time on the coast." },
  { title: "Add Kilimanjaro", href: "/kilimanjaro", description: "Pair your safari with a climb or a mountain day trip." },
  { title: "5-Day Northern Circuit Classic", href: "/safaris/packages/5-day-northern-circuit-classic", description: "Combine Tarangire, Lake Manyara and Ngorongoro Crater." },
];
