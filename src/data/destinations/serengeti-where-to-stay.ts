export const whereToStayHero = {
  image: "/images/destinations/serengeti/where-to-stay/hero.jpg",
  eyebrow: "YOUR PLACE IN THE WILD",
  title: "Where to Stay in the Serengeti",
  subtitle: "From elegant lodges overlooking the plains to intimate tented camps close to seasonal wildlife routes, discover the different ways to experience the Serengeti. Find a stay that suits your style, the season and the journey you have in mind.",
  chips: ["Luxury Lodges", "Intimate Tented Camps", "Seasonal Safari Camps"],
  primary: { label: "Explore Accommodation Styles", href: "#accommodation-styles" },
  secondary: { label: "Find Your Perfect Stay", href: "#stay-planner" },
};

export const accommodationRegions = [
  {
    id: "central",
    name: "Central Serengeti: Seronera",
    shortName: "Central",
    href: "/safaris/serengeti/central-seronera",
    image: "/images/destinations/serengeti/where-to-stay/central-region.jpg",
    description: "A popular year-round safari base, known for resident wildlife, river valleys, kopjes and access to the wider park.",
    bestFor: ["First-time visitors", "Year-round wildlife", "Big-cat encounters", "A central base"],
    accommodation: "Different accommodation styles are available in the wider region. Check the precise property location and availability for your dates.",
    season: "A versatile base through the year; wildlife and conditions vary by season.",
  },
  {
    id: "north",
    name: "Northern Serengeti: Kogatende and Lamai",
    shortName: "Northern",
    href: "/safaris/serengeti/northern-serengeti",
    image: "/images/destinations/serengeti/where-to-stay/northern-region.jpg",
    description: "A remote region of rolling hills, open plains and Mara River country, associated with seasonal migration movements.",
    bestFor: ["Northern migration season", "Photography", "Remote wilderness", "Seasonal camp choices"],
    accommodation: "Choose according to the camp's precise location and your travel dates. Availability and operating periods require confirmation.",
    season: "Migration movement is seasonal and influenced by rainfall; no fixed timing is guaranteed.",
  },
  {
    id: "west",
    name: "Western Serengeti: Grumeti and Kirawira",
    shortName: "Western",
    href: "/safaris/serengeti/western-corridor",
    image: "/images/destinations/serengeti/where-to-stay/western-region.jpg",
    description: "A varied landscape of riverine woodland and open plains along the seasonal Grumeti passage.",
    bestFor: ["Grumeti migration period", "Riverine landscapes", "Combining central and western areas"],
    accommodation: "Camp position and seasonal operation differ. Confirm the location and travel logistics for the itinerary.",
    season: "Seasonal wildlife movement changes with rainfall and grazing conditions.",
  },
  {
    id: "south",
    name: "Southern Serengeti: Ndutu and the southern plains",
    shortName: "Southern",
    href: "/safaris/serengeti/southern-ndutu",
    image: "/images/destinations/serengeti/where-to-stay/southern-region.jpg",
    description: "The southern plains are especially important during the calving season, when migratory wildebeest gather across grasslands.",
    bestFor: ["Calving season", "Large herds", "Predator activity", "Green-season scenery"],
    accommodation: "Ndutu is within the Ngorongoro Conservation Area, adjacent to the Serengeti ecosystem. Confirm the protected-area location of each stay.",
    season: "The calving period is commonly associated with the early months of the year, but timing and herd locations vary.",
  },
  {
    id: "east",
    name: "Eastern Serengeti",
    shortName: "Eastern",
    href: "/safaris/serengeti",
    image: "/images/destinations/serengeti/where-to-stay/eastern-region.jpg",
    description: "An area to consider as part of a broader Serengeti itinerary, with its own seasonal character and accommodation considerations.",
    bestFor: ["Travelers planning a tailored route", "Exploring a different part of the ecosystem"],
    accommodation: "Specific accommodation, access and operating periods vary. Confirm current details before choosing this area.",
    season: "Seasonal characteristics and property availability need to be checked for the proposed dates.",
  },
] as const;

// TODO(CONFIRM): verify eastern Serengeti accommodation, access and seasonal descriptions before naming specific properties or operating periods.
export const accommodationStyles = [
  {
    category: "PERMANENT LODGES",
    title: "Classic Safari Lodges",
    description: "Permanent lodges offer a more conventional hospitality experience in or around safari areas. Depending on the property, they may have built rooms or suites, dining areas, lounges and other amenities.",
    bestFor: "Travelers who prefer an established hotel-style environment and a fixed base.",
    image: "/images/destinations/serengeti/where-to-stay/lodge.jpg",
    alt: "An architectural safari lodge in a Serengeti landscape",
  },
  {
    category: "PERMANENT TENTED CAMPS",
    title: "The Art of Luxury Under Canvas",
    description: "Permanent tented camps combine a canvas setting with the facilities of an established safari property. Depending on the camp, this may include private bathrooms, comfortable beds, decks and dining facilities.",
    bestFor: "Travelers seeking an immersive safari atmosphere with a considered level of comfort.",
    image: "/images/destinations/serengeti/where-to-stay/permanent-tented-camp.jpg",
    alt: "A permanent tented camp set among the Serengeti trees",
  },
  {
    category: "MOBILE AND SEASONAL CAMPS",
    title: "Follow the Rhythm of the Migration",
    description: "Some camps operate seasonally or relocate to follow changing wildlife patterns. They can suit travelers who place location and time in the field ahead of extensive facilities.",
    bestFor: "Migration-focused itineraries and travelers seeking a seasonal camp experience.",
    image: "/images/destinations/serengeti/where-to-stay/mobile-camp.jpg",
    alt: "A seasonal mobile safari camp beneath a wide sky",
  },
  {
    category: "PUBLIC AND SPECIAL CAMPSITES",
    title: "Closer to the Land",
    description: "Tanzania National Parks provides designated campsite categories. Public and special campsites have different booking arrangements, facilities and conditions.",
    bestFor: "Camping-focused travelers looking for a simpler way to experience the wilderness.",
    image: "/images/destinations/serengeti/where-to-stay/campsite.jpg",
    alt: "A simple campsite in a natural safari setting",
  },
  {
    category: "OTHER OFFICIAL PARK ACCOMMODATION",
    title: "Additional Park Accommodation",
    description: "Park cottages, rest houses and other official facilities may be available in some locations. The categories and facilities are not the same in every park or region.",
    bestFor: "Travelers comparing official park accommodation and simpler stay options.",
    image: "/images/destinations/serengeti/where-to-stay/luxury-suite.jpg",
    alt: "A comfortable safari accommodation interior",
    link: "https://www.tanzaniaparks.go.tz/tourism/visitor-information/accommodation",
  },
] as const;

export const accommodationComparison = [
  { label: "Permanent lodge", values: ["Built rooms or suites", "Fixed property", "Often established facilities; verify individually", "Low", "May include dining and guest amenities", "Guests wanting a conventional lodge stay"] },
  { label: "Permanent tented camp", values: ["Canvas accommodation", "Fixed camp", "Comfort and facilities vary by camp", "Low", "May include private bathrooms and dining", "Guests seeking a more immersive tented stay"] },
  { label: "Seasonal or mobile camp", values: ["Canvas accommodation", "Seasonal area or relocated camp", "Facilities vary by supplier and camp", "Can be seasonal; schedule differs", "Confirm the current operating dates and services", "Travelers aligning a stay with a wildlife season"] },
  { label: "Public campsite", values: ["Camping", "Designated campsite", "Simpler facilities; confirm what is provided", "Fixed site", "Facilities and services differ by site", "Camping-focused safari travelers"] },
  { label: "Special campsite", values: ["Camping", "Designated campsite with separate arrangements", "Conditions differ by site", "Fixed site", "Confirm the official booking and service arrangements", "Travelers whose itinerary supports this camping style"] },
] as const;

export const comfortLevels = [
  { title: "Comfortable", text: "Practical accommodation with essential safari comforts. The right choice when your priority is time in the landscape and a straightforward place to rest.", bestFor: "Wildlife-focused travelers, camping trips and guests seeking practical accommodation." },
  { title: "Mid-range", text: "Comfortable, well-appointed accommodation that balances useful facilities with a strong sense of place. Individual room arrangements and amenities vary.", bestFor: "Couples, friends and families when the property's facilities and policies suit their needs." },
  { title: "Luxury", text: "Premium accommodation may offer more space, refined dining and a higher level of personal comfort, depending on the property and itinerary.", bestFor: "Special occasions, honeymoons and travelers seeking an especially considered stay." },
] as const;

export const accommodationMonths = [
  { month: "Jan", season: "January", region: "Southern Serengeti and Ndutu", note: "Travelers interested in the calving period may consider accommodation positioned near the southern plains." },
  { month: "Feb", season: "February", region: "Southern Serengeti and Ndutu", note: "The southern plains are commonly associated with calving season; herd distribution and timing vary." },
  { month: "Mar", season: "March", region: "Southern Serengeti and Ndutu", note: "Consider location and current conditions rather than assuming herds remain in one place." },
  { month: "Apr", season: "April", region: "Central and western movement routes", note: "Seasonal weather can affect access. Confirm camp opening dates and route conditions." },
  { month: "May", season: "May", region: "Central and western movement routes", note: "Check seasonal operation, road conditions and the actual itinerary before selecting a camp." },
  { month: "Jun", season: "June", region: "Western or northern Serengeti", note: "Choose between a Grumeti or northern experience based on dates, current conditions and camp position." },
  { month: "Jul", season: "July", region: "Western or northern Serengeti", note: "Migration movement varies. Match your preferred region to camp location and verified operating dates." },
  { month: "Aug", season: "August", region: "Northern Serengeti", note: "The northern region is a common planning focus, but wildlife movements and river activity are unpredictable." },
  { month: "Sep", season: "September", region: "Northern Serengeti", note: "Consider the precise camp location and allow flexibility in your expectations." },
  { month: "Oct", season: "October", region: "Northern Serengeti", note: "Seasonal patterns can shift. Confirm current camp availability and conditions for your dates." },
  { month: "Nov", season: "November", region: "Central and southern return routes", note: "As rainfall and grazing change, accommodation choices may follow broad southward movement." },
  { month: "Dec", season: "December", region: "Central and southern return routes", note: "Plan around the route and operating property, not a guaranteed herd position." },
] as const;

export const stayConsiderations = [
  ["Location and wildlife season", "Confirm the camp's precise location and how it relates to your travel dates and intended wildlife experience."],
  ["Travel time", "Consider distances between your accommodation, airstrips, park gates and the areas you hope to explore."],
  ["Facilities", "Check bathrooms, hot water, power, charging, Wi-Fi and other amenities directly with the property."],
  ["Dining and meal arrangements", "Meal plans vary. Share dietary needs in advance and confirm what is included in writing."],
  ["Family and group suitability", "Ask about family rooms, room configurations, minimum ages, child policies and activity restrictions."],
  ["Accessibility and personal requirements", "Confirm step-free access, mobility needs, medical arrangements and other personal requirements before booking."],
  ["Sustainability and responsible tourism", "Ask the supplier about local employment, environmental practices, waste management and conservation contributions."],
] as const;

export const accommodationBookingSteps = [
  ["Tell us when you want to travel", "Your dates help identify the relevant region, season and route considerations."],
  ["Choose your safari style", "Share your preferred comfort level, facilities and the kind of experience you value."],
  ["Compare suitable accommodation", "Options, locations and availability need to be checked against the actual itinerary."],
  ["Receive a tailor-made proposal", "Your proposal should set out accommodation options, costs and relevant terms before confirmation."],
] as const;

export const accommodationFaqs = [
  { question: "What types of accommodation are available in the Serengeti?", answer: "Options include lodges, permanent tented camps, seasonal or mobile camps, public campsites, special campsites and other official park accommodation categories where available. Facilities and booking arrangements differ." },
  { question: "Where is the best place to stay in the Serengeti?", answer: "It depends on your dates and intended wildlife experience. Central Serengeti is a popular year-round base, while other regions have distinct seasonal attractions. Choose the region first, then compare accommodation styles." },
  { question: "Are there luxury lodges in the Serengeti?", answer: "Premium accommodation is available in the wider Serengeti ecosystem. The suitable property, its precise location and facilities should be selected for your itinerary and verified before booking." },
  { question: "What is the difference between a safari lodge and a tented camp?", answer: "A lodge generally uses built rooms or suites, while a tented camp uses canvas accommodation. Atmosphere, services and facilities vary by property, so check the details of the specific stay." },
  { question: "What are mobile safari camps?", answer: "Some camps operate seasonally or relocate in response to safari seasons. They do not all follow the same schedule, so confirm the camp's location and operating dates with the supplier." },
  { question: "Where should I stay to see the Great Migration?", answer: "Broad planning patterns associate Ndutu with the calving season, the western Serengeti with the Grumeti passage and the Northern Serengeti with the Mara River season. Rainfall affects movement, and sightings or crossings are never guaranteed." },
  { question: "Is it better to stay inside or outside Serengeti National Park?", answer: "Either may fit a Serengeti safari. The choice affects access, route planning and applicable park or conservation-area fees. Confirm the accommodation's exact location and fees for the proposed itinerary." },
  { question: "Are there family-friendly lodges in the Serengeti?", answer: "Family policies, room arrangements, minimum ages and activities differ by property. Confirm the details directly with the selected supplier before booking." },
  { question: "Can I camp inside Serengeti National Park?", answer: "Designated public and special campsites are among the official campsite categories. Booking requirements, facilities and safari logistics differ, so confirm arrangements through the relevant authority and itinerary planner." },
  { question: "How many nights should I spend in the Serengeti?", answer: "Several nights can allow time to explore an area at a considered pace, but the ideal duration depends on your route, interests and available travel time." },
  { question: "Do Serengeti lodges include meals?", answer: "Meal plans vary by property and proposal. Confirm which meals, drinks and additional services are included in writing." },
  { question: "How do I book accommodation in the Serengeti?", answer: "Request a tailor-made proposal and confirm the selected accommodation subject to actual availability and the applicable booking terms." },
] as const;
