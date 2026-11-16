export type TarangireIcon =
  | "elephant"
  | "baobab"
  | "river"
  | "bird"
  | "antelope"
  | "compass"
  | "landscape"
  | "wildlife"
  | "season"
  | "location"
  | "sun"
  | "clock";

export const tarangireBreadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Tarangire", href: "/safaris/tarangire" },
] as const;

export const tarangirePage = {
  path: "/safaris/tarangire",
  quickFactsLabel: "Quick facts",
  metadata: {
    title: "Tarangire Safari: Elephants, Baobabs and Big Skies",
    description: "Plan a Tarangire National Park safari: huge elephant herds, ancient baobabs and a river that draws the wildlife in the dry season. Tailor-made for you.",
    image: "/images/safaris/tarangire/hub/hero.jpg",
  },
  hero: {
    image: "/images/safaris/tarangire/hub/hero.jpg",
    imageAlt: "An elephant herd walking beneath baobab trees in Tarangire at golden hour",
    eyebrow: "TARANGIRE NATIONAL PARK",
    title: "Tarangire Safari: Where Elephants Gather Beneath the Baobabs",
    subtitle: "A river that never quite runs dry, baobab trees that look as if they were planted upside down and elephant herds that arrive like a family reunion. Tarangire is northern Tanzania's most underrated safari, and it is only a morning's drive from Arusha.",
    primaryCta: { label: "Plan My Tarangire Safari", href: "/plan-your-safari?type=Safari" },
    secondaryCta: { label: "See Tarangire journeys", href: "#journeys" },
    badges: [
      { icon: "elephant", label: "Elephant Herds" },
      { icon: "baobab", label: "Ancient Baobabs" },
      { icon: "bird", label: "Over 550 Bird Species" },
    ],
  },
  quickFacts: [
    { label: "Where", text: "Northern Tanzania, about 2 to 2.5 hours by road from Arusha", icon: "location" },
    { label: "Size", text: "About 2,850 square kilometers of baobab savanna, river valley and swamp", icon: "landscape" },
    { label: "Known for", text: "Elephant herds, baobab trees, the Tarangire River and birdlife", icon: "wildlife" },
    { label: "Best time", text: "June to October for wildlife, and November to May for birds and green landscapes", icon: "season" },
    {
      label: "Pairs with",
      text: "Lake Manyara, the Ngorongoro Crater and the Serengeti",
      icon: "compass",
      links: [
        { label: "Lake Manyara", href: "/safaris/lake-manyara" },
        { label: "Ngorongoro", href: "/safaris/ngorongoro" },
        { label: "Serengeti", href: "/safaris/serengeti" },
      ],
    },
  ],
  story: {
    image: "/images/safaris/tarangire/hub/story.jpg",
    imageAlt: "Elephants crossing the road beneath baobabs in Tarangire",
    eyebrow: "WELCOME TO TARANGIRE",
    title: "The Park That Puts on a Show When the Rivers Run Dry",
    paragraphs: [
      "Some safari parks announce themselves with sheer size. Tarangire does it with trees. As you roll through the gate, the landscape is dotted with baobabs, wide, wrinkled giants that look as though someone planted them upside down, and between them move elephants, in family groups so large that a single herd can take a full minute to cross the road.",
      "The secret of Tarangire is water. Through the dry season, from about June to October, the Tarangire River is the one dependable drink for miles. Wildlife that scattered across the Maasai steppe during the rains returns to the river, and the park fills with elephants, buffalo, zebra, wildebeest, giraffe and the predators that follow them. It is a smaller cousin of the great migrations further west, and it plays out in a park that is easy to reach and usually quieter than the northern circuit's headline destinations.",
      "When the rains come, Tarangire changes character entirely. The grass turns green, the animals spread out and the park becomes a birdwatcher's paradise, with more than 550 species recorded. Come in the dry season for elephants. Come in the green season for birds and solitude. Either way, bring a camera and a hat.",
      "A word of advice: give the baobabs a chance. They look like trees, but the elephants treat them like vending machines.",
    ],
    pullQuote: "Most parks have one great animal. Tarangire has a great animal and a great tree, and they cannot stop bumping into each other.",
  },
  why: {
    eyebrow: "WHY IT WINS HEARTS",
    title: "Six Reasons to Choose Tarangire",
    subtitle: "It is the park that surprises first-time visitors and delights returning ones.",
    cards: [
      { icon: "elephant" as const, title: "Elephant herds", text: "In the dry season, family groups of a hundred or more gather along the river, calves, matriarchs and teenagers all sharing one very busy bathtub." },
      { icon: "baobab" as const, title: "Baobab country", text: "Hundreds of ancient baobab trees stand across the park, and Tarangire has earned the unofficial title of baobab capital of the world." },
      { icon: "river" as const, title: "A river that draws everyone", text: "The Tarangire River is the park's lifeline. When the grass turns gold, wildlife returns to it from across the Maasai steppe." },
      { icon: "bird" as const, title: "A birder's park", text: "More than 550 recorded species, including the yellow-collared lovebird, ostriches, kori bustards, hornbills and eagles." },
      { icon: "antelope" as const, title: "Dry-country rarities", text: "The fringe-eared oryx and the long-necked gerenuk are dry-country antelope, and Tarangire is one of the best places in northern Tanzania to look for them." },
      { icon: "compass" as const, title: "Easy and unhurried", text: "A comfortable drive from Arusha, a park that often feels quieter than its headline neighbors and a perfect first stop on the northern circuit." },
    ],
  },
  explore: {
    eyebrow: "GO DEEPER",
    title: "Three Ways to Explore Tarangire",
    pairsWellLabel: "Pairs well with",
    tiles: [
      { title: "Elephants and Baobabs", text: "The park's great double act, how they live together and where to find them.", href: "/safaris/tarangire/elephants-and-baobabs", image: "/images/safaris/tarangire/hub/tile-elephants.jpg", alt: "An elephant herd walking beneath baobabs in Tarangire" },
      { title: "Where to Stay", text: "Sleep inside the park, on its edge or on the Karatu side.", href: "/safaris/tarangire/where-to-stay", image: "/images/safaris/tarangire/hub/tile-stay.jpg", alt: "A tented camp overlooking the Tarangire landscape" },
      { title: "The Tarangire Day Trip", text: "Short on time? See Tarangire in a single day from Arusha.", href: "/day-trips/tarangire", image: "/images/safaris/tarangire/hub/tile-daytrip.jpg", alt: "A safari vehicle travelling through Tarangire National Park" },
    ],
    pairsWell: [
      { label: "Lake Manyara", href: "/safaris/lake-manyara" },
      { label: "Ngorongoro", href: "/safaris/ngorongoro" },
      { label: "Serengeti", href: "/safaris/serengeti" },
    ],
  },
  wildlife: {
    eyebrow: "WHO LIVES HERE",
    title: "Meet the Residents of Tarangire",
    intro: "Tarangire's mix of river valley, baobab savanna and seasonal swamp supports an unusually wide cast. What you see depends on the season, the location and a little luck, so nothing is promised, but the odds of a memorable moment are high.",
    items: [
      { name: "African elephant", frequency: "Often seen in the dry season", text: "The park's headline act. Herds gather along the river and move between the baobabs.", image: "/images/safaris/wildlife/elephant.jpeg", alt: "An elephant herd walking beneath baobab trees in Tarangire" },
      { name: "Zebra and wildebeest", frequency: "Often seen", text: "They return to the river in the dry season, part of the park's smaller seasonal migration.", image: "/images/safaris/wildlife/wildebeest.jpeg", alt: "Wildebeest in the Tarangire dry-season grassland" },
      { name: "Giraffe", frequency: "Often seen", text: "Tall, calm and everywhere, especially among the acacias.", image: "/images/safaris/wildlife/giraffe.jpeg", alt: "A giraffe among acacia trees in Tanzania" },
      { name: "African buffalo", frequency: "Often seen", text: "Heavy, watchful and usually in large herds.", image: "/images/safaris/wildlife/buffalo.jpeg", alt: "African buffalo in a Tanzania grassland" },
      { name: "Lion", frequency: "Regularly seen", text: "Prides hunt along the river and around the swamps, especially in the dry season.", image: "/images/safaris/wildlife/lion.jpg", alt: "A lion resting in the shade in Tanzania" },
      { name: "Leopard", frequency: "Sometimes seen", text: "Present but secretive, often resting in trees.", image: "/images/safaris/wildlife/leopard.jpeg", alt: "A leopard resting in a tree in Tanzania" },
      { name: "Cheetah", frequency: "Sometimes seen", text: "Look for them on open ground, watching for gazelles.", image: "/images/safaris/wildlife/cheetah.jpeg", alt: "A cheetah in open grassland in Tanzania" },
      { name: "Fringe-eared oryx and gerenuk", frequency: "A Tarangire specialty", text: "Dry-country antelope that are hard to find elsewhere on the northern circuit.", image: "/images/safaris/tarangire/hub/oryx.jpg", alt: "A fringe-eared oryx in the Tarangire dry country" },
      { name: "Greater and lesser kudu", frequency: "Sometimes seen", text: "Elegant antelope with spiral horns, shy and well camouflaged.", image: "/images/safaris/tarangire/hub/kudu.jpg", alt: "Greater and lesser kudu in Tarangire woodland" },
      { name: "Python", frequency: "Occasionally seen", text: "Sometimes found draped in trees, especially around the swamps.", image: "/images/safaris/tarangire/hub/python.jpg", alt: "A python resting on a branch near a swamp" },
      { name: "Wild dog", frequency: "Rare", text: "A lucky, unforgettable sighting that cannot be planned.", image: "/images/safaris/tarangire/hub/wild-dog.jpg", alt: "African wild dogs in their natural habitat" },
      { name: "Birds", frequency: "More than 550 species", text: "Yellow-collared lovebirds, ostriches, kori bustards, hornbills, bee-eaters and eagles, with migrants arriving in the green season.", image: "/images/safaris/tarangire/hub/birds.jpg", alt: "Birdlife in Tarangire National Park" },
    ],
    callout: "Every safari is different. Wildlife is wild, and no sighting can be guaranteed. We plan around the seasons and times of day that give you the best chances.",
  },
  year: {
    id: "year",
    monthRangeLabel: "Select month",
    monthGroupLabel: "Select a month",
    eyebrow: "WHEN TO GO",
    title: "Tarangire Through the Year",
    intro: "Tarangire is open all year, and each season has its own mood. Slide along the months, or tap a season, to see what the park is doing.",
    months: [
      { name: "Jan", fullName: "January", label: "Good", season: "green-bright" },
      { name: "Feb", fullName: "February", label: "Good", season: "green-bright" },
      { name: "Mar", fullName: "March", label: "Quiet", season: "long-rains" },
      { name: "Apr", fullName: "April", label: "Quiet", season: "long-rains" },
      { name: "May", fullName: "May", label: "Quiet", season: "long-rains" },
      { name: "Jun", fullName: "June", label: "Peak", season: "dry" },
      { name: "Jul", fullName: "July", label: "Peak", season: "dry" },
      { name: "Aug", fullName: "August", label: "Peak", season: "dry" },
      { name: "Sep", fullName: "September", label: "Peak", season: "dry" },
      { name: "Oct", fullName: "October", label: "Peak", season: "dry" },
      { name: "Nov", fullName: "November", label: "Good", season: "short-rains" },
      { name: "Dec", fullName: "December", label: "Good", season: "short-rains" },
    ],
    seasons: [
      { id: "dry", title: "June to October, the dry season", label: "Peak", text: "The prime time for wildlife. The river is the main water source, and elephants, buffalo, zebra, wildebeest and giraffe gather along it. The grass is short, the sightings are easy and the golden light is spectacular. It is also the busiest time of year." },
      { id: "short-rains", title: "November to December, the short rains", label: "Good", text: "Light showers bring green to the landscape. Animals begin to spread out, migrant birds arrive and the park feels hushed." },
      { id: "green-bright", title: "January to February, green and bright", label: "Good", text: "A lush, quiet time with dramatic skies, good birdlife and fewer visitors. Wildlife is more scattered, so patience pays." },
      { id: "long-rains", title: "March to May, the long rains", label: "Quiet", text: "Very green and very quiet. Some tracks are muddy and a few camps close, but the park rewards patient travelers with empty roads and rich birdlife." },
    ],
    advice: "Our advice: choose June to October for elephants and sightings, and November to May for birds, green scenery and quiet. We plan every itinerary around the season you choose.",
  },
  duration: {
    eyebrow: "PLAN YOUR TIME",
    title: "Day Trip, One Night or Two?",
    cards: [
      { title: "A day trip from Arusha", text: "Leave early, spend about six hours in the park and drive back by evening. It is a long day, but a rewarding one if time is short.", link: { label: "See the Tarangire day trip", href: "/day-trips/tarangire" } },
      { title: "One night on your way", text: "The classic rhythm is a full game drive in Tarangire, then on to Karatu, with the Ngorongoro Crater the next morning.", link: { label: "See journeys", href: "#journeys" } },
      { title: "Two nights in or beside the park", text: "Stay inside or on the edge for sunrise and sunset drives and, at some camps, walking safaris and night drives. It suits photographers and birders.", link: { label: "See where to stay", href: "/safaris/tarangire/where-to-stay" } },
    ],
  },
  compare: {
    eyebrow: "HOW IT COMPARES",
    title: "Tarangire, Lake Manyara, Ngorongoro and the Serengeti",
    rowHeader: "Feature",
    columns: ["Tarangire", "Lake Manyara", "Ngorongoro Crater", "Serengeti"],
    rows: [
      { label: "Landscape", values: ["Baobab savanna, river valley and swamp", "Groundwater forest, lakeshore and escarpment", "A volcanic caldera", "Open plains, kopjes and rivers"] },
      { label: "Best known for", values: ["Elephant herds, baobabs and birds", "Monkeys, hippos and lakeshore birds", "Dense resident wildlife and a chance of black rhino", "The Great Migration and big cats"] },
      { label: "Best months", values: ["June to October", "All year", "All year", "All year, with regions that vary"] },
      { label: "Pace", values: ["Relaxed, a short drive from Arusha", "Gentle, a half day", "One early morning", "Longer days with long drives"] },
      { label: "Typical time", values: ["Half a day to two days", "Half a day to a day", "One morning", "Two or more days"] },
    ],
    closing: "Most northern circuit safaris combine several of these, and we will help you choose the order.",
  },
  journeys: {
    id: "journeys",
    eyebrow: "BUILD IT INTO YOUR SAFARI",
    title: "Safaris That Include Tarangire",
    subtitle: "Every itinerary can be tailored to your dates and pace.",
    callout: "Tarangire fits beautifully before the Ngorongoro Crater or after a Kilimanjaro climb. Tell us your dates and we will suggest the best order.",
    browse: { label: "Browse all Tarangire safaris", href: "/safaris/packages?destination=tarangire" },
    secondary: { label: "Plan my safari", href: "/plan-your-safari?type=Safari" },
    empty: "Tell us your dates and we will plan a Tarangire safari for you.",
    emptyLinkLabel: "Plan your safari",
    emptyLinkHref: "/plan-your-safari",
    packageSlugs: [
      "3-day-ngorongoro-tarangire-wildlife-safari",
      "3-day-tarangire-manyara-ngorongoro",
      "4-day-tarangire-serengeti-ngorongoro",
      "5-day-northern-circuit-classic",
      "6-day-tanzania-family-wildlife-safari",
      "7-day-ultimate-northern-tanzania-safari",
      "4-day-post-kilimanjaro-recovery-safari",
    ],
  },
  practical: {
    eyebrow: "BEFORE YOU GO",
    title: "Practical Things Worth Knowing",
    items: [
      { title: "Getting there", text: "Tarangire is about 2 to 2.5 hours by road from Arusha, and about 2 hours from Karatu." },
      { title: "What to pack", text: "Neutral clothing, a hat, sunscreen, binoculars and a warm layer for early mornings. Dust is part of the experience." },
      { title: "Park rules", text: "Guests stay in the vehicle except at designated picnic sites, and elephants always have right of way." },
      { title: "Fees", text: "Park fees are included in our itinerary prices. See the official park authority site for the current schedule.", link: { label: "Tanzania National Parks", href: "https://www.tanzaniaparks.go.tz/" } },
      { title: "Walks and night drives", text: "These are not offered everywhere. They are available at some camps on and beyond the park boundary. Ask us if you would like one." },
      { title: "Families", text: "Tarangire suits families because the drives are shorter and the wildlife is big and easy to spot. Children aged 5 to 15 pay reduced park fees." },
    ],
  },
  faqSection: { eyebrow: "GOOD TO KNOW", title: "Tarangire Safari Questions, Answered" },
  faq: [
    { question: "Is Tarangire worth visiting?", answer: "Yes. It offers some of the best elephant viewing in northern Tanzania, a landscape of baobab trees found almost nowhere else on the circuit and a quieter atmosphere than the larger parks. It works as a day trip, a night on the way to Ngorongoro or the start of a longer safari." },
    { question: "How many days do I need in Tarangire?", answer: "One full day is enough to see the highlights. A night in or beside the park lets you add sunrise and sunset drives and, at some camps, walks and night drives." },
    { question: "When is the best time to visit Tarangire?", answer: "June to October is the dry season, when wildlife gathers along the river and sightings are strongest. November to May is greener and quieter, and it is the best time for birds." },
    { question: "Is Tarangire good for elephants?", answer: "It is one of the best places in northern Tanzania to see elephants in large herds, especially from June to October when they gather along the river." },
    { question: "What is the difference between Tarangire and the Serengeti?", answer: "Tarangire is a smaller, quieter park of baobab savanna and a river, best known for elephants. The Serengeti is a vast open ecosystem built around the Great Migration. Many safaris include both." },
    { question: "Is Tarangire a good first safari?", answer: "Yes. It is close to Arusha, the drives are manageable and the wildlife is big and easy to spot, which makes it a gentle, rewarding introduction to safari." },
    { question: "Can I visit Tarangire as a day trip?", answer: "Yes, from Arusha, though it is a long day. Our Tarangire day trip is built for it, and a night near the park is more relaxed." },
    { question: "Can I do a walking safari or a night drive?", answer: "Some camps on and beyond the park boundary offer walks and night drives. Ask us when you plan, and we will tell you which stays offer them." },
    { question: "Is Tarangire crowded?", answer: "It is usually quieter than the northern circuit's headline destinations, though the dry months are the busiest. Early starts and a flexible guide help." },
    { question: "Can I combine Tarangire with Lake Manyara, Ngorongoro and the Serengeti?", answer: "Absolutely. Tarangire sits naturally at the start of the northern circuit, and many of our safaris continue to Lake Manyara, the Ngorongoro Crater and the Serengeti." },
  ],
  cta: {
    eyebrow: "YOUR TARANGIRE STORY STARTS HERE",
    title: "Ready to Meet the Elephants Beneath the Baobabs?",
    description: "Tell us your dates and what you hope to see, and we will shape a Tarangire safari that fits you, from the first gold light on the river to the last elephant silhouetted against the sunset.",
    image: "/images/safaris/tarangire/hub/cta.jpg",
    imageAlt: "A baobab silhouetted against a Tarangire sunset",
    primary: { label: "Plan My Tarangire Safari", href: "/plan-your-safari?type=Safari" },
    secondaryLabel: "Chat With Our Team",
    whatsappMessage: "Hello, I would like to plan a Tarangire safari.",
  },
} as const;
