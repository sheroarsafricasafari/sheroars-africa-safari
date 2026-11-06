export const balloonHero = {
  image: "/images/destinations/serengeti/hot-air-balloon/hero.jpg",
  eyebrow: "ABOVE THE ENDLESS PLAINS",
  title: "A Serengeti Safari From Above",
  subtitle: "As first light touches the plains, rise above the Serengeti and discover its landscapes from a different perspective. A sunrise balloon experience offers a quiet view of the wilderness below.",
  chips: ["Sunrise Experience", "A View Beyond the Ordinary", "The Serengeti From Above"],
  primary: { label: "Explore the Experience", href: "#experience" },
  secondary: { label: "Ask About Balloon Availability", href: "/plan-your-safari?type=Safari" },
};

export const balloonRegions = [
  {
    id: "central",
    name: "Central Serengeti: Seronera",
    shortName: "Seronera",
    href: "/safaris/serengeti/central-seronera",
    image: "/images/destinations/serengeti/hot-air-balloon/seronera.jpg",
    description: "Central plains, kopjes, river valleys and resident wildlife make this a broad Serengeti landscape to experience from above.",
    season: "Commonly published as a year-round ballooning area, weather permitting and subject to operator confirmation.",
  },
  {
    id: "south",
    name: "Southern Serengeti: Ndutu",
    shortName: "Ndutu",
    href: "/safaris/serengeti/southern-ndutu",
    image: "/images/destinations/serengeti/hot-air-balloon/ndutu.jpg",
    description: "Open southern plains, seasonal herds, calving landscapes, lakes and surrounding habitats.",
    season: "Seasonal flights are commonly advertised around December to March, depending on the operator. Ndutu is within the Ngorongoro Conservation Area, adjacent to the Serengeti ecosystem.",
  },
  {
    id: "west",
    name: "Western Serengeti: Grumeti and Kirawira",
    shortName: "Grumeti",
    href: "/safaris/serengeti/western-corridor",
    image: "/images/destinations/serengeti/hot-air-balloon/grumeti.jpg",
    description: "The Grumeti River, open plains and riverine woodland create a different regional view of the Serengeti.",
    season: "Some operators offer seasonal flights during the western migration period. The operating window varies by supplier.",
  },
  {
    id: "north",
    name: "Northern Serengeti: Kogatende",
    shortName: "Kogatende",
    href: "/safaris/serengeti/northern-serengeti",
    image: "/images/destinations/serengeti/hot-air-balloon/kogatende.jpg",
    description: "Northern grasslands and Mara River country offer a distinctive setting for landscape and wildlife photography.",
    season: "Seasonal flights may be offered during the northern migration season. Dates depend on the supplier's calendar.",
  },
] as const;

export const balloonFacts = [
  ["Experience", "Sunrise hot-air balloon safari"],
  ["Flight time", "Often around one hour, subject to wind and operating conditions"],
  ["Total experience", "Around five hours is a commonly published estimate; actual timings vary"],
  ["Start", "Before sunrise; collection time depends on accommodation and launch field"],
  ["Launch locations", "Region-specific and dependent on the operator's current schedule"],
  ["Breakfast", "A bush breakfast or landing refreshments may be included, depending on the offer"],
  ["Availability", "Weather and operator dependent"],
  ["Price", "Price on request, subject to a confirmed supplier quotation"],
] as const;

export const balloonStages = [
  {
    title: "The pre-dawn pick-up",
    time: "Before sunrise",
    image: "/images/destinations/serengeti/hot-air-balloon/inflation.jpg",
    alt: "Balloon crew preparing before dawn on the Serengeti plains",
    text: "The experience generally begins before sunrise. Collection follows the operator's transfer arrangement and depends on where you are staying and which launch field is in use. Some operators publish early collection times, but there is no universal schedule.",
  },
  {
    title: "Arriving at the launch site",
    time: "First preparations",
    image: "/images/destinations/serengeti/hot-air-balloon/takeoff.jpg",
    alt: "A hot-air balloon being prepared at a Serengeti launch site",
    text: "At the launch site, guests may have the chance to watch the ground crew prepare the balloon. Tea, coffee or light refreshments may be offered according to the operator's arrangements.",
  },
  {
    title: "Safety briefing and inflation",
    time: "Meet the pilot and crew",
    image: "/images/destinations/serengeti/hot-air-balloon/inflation.jpg",
    alt: "The crew inflating a hot-air balloon before sunrise",
    text: "The pilot and crew explain the safety instructions and boarding process while the balloon envelope is prepared. Listen carefully, follow the crew's directions and ask the operator about passenger suitability before confirming.",
  },
  {
    title: "The flight",
    time: "Often about one hour",
    image: "/images/destinations/serengeti/hot-air-balloon/in-flight.jpg",
    alt: "A balloon floating above the Serengeti in the early morning",
    text: "The basket lifts into the morning air as the sunrise reveals the plains, kopjes, rivers and habitats below. Your view depends on the wind, launch location and flight path. Airborne time is often around an hour, but weather and the pilot's decisions determine the actual flight.",
  },
  {
    title: "Landing and celebration",
    time: "A landing shaped by conditions",
    image: "/images/destinations/serengeti/hot-air-balloon/landing.jpg",
    alt: "A hot-air balloon landing in the Serengeti landscape",
    text: "Wind and operational conditions influence the landing location. A celebratory drink or post-flight gathering may be included in some suppliers' packages, but the exact arrangements vary.",
  },
  {
    title: "Bush breakfast and return",
    time: "Continue the morning",
    image: "/images/destinations/serengeti/hot-air-balloon/bush-breakfast.jpg",
    alt: "A bush breakfast set in the Serengeti after a sunrise balloon flight",
    text: "Many balloon experiences finish with a bush breakfast, followed by a ground transfer or a connection with the safari guide. Confirm the meal and return arrangements with the operator.",
  },
] as const;

export const balloonGallery = [
  { title: "Endless golden grasslands", text: "The plains open into a wide horizon as morning light changes.", image: "/images/destinations/serengeti/hot-air-balloon/in-flight.jpg", alt: "Golden grasslands viewed from above" },
  { title: "Herds of wildebeest", text: "Herds may be visible when season, location and flight path align.", image: "/images/destinations/serengeti/hot-air-balloon/migration.jpg", alt: "Wildebeest herds on the plains" },
  { title: "Zebra and plains grazers", text: "Plains wildlife may be seen from above, without any sighting being assured.", image: "/images/destinations/serengeti/hot-air-balloon/ndutu.jpg", alt: "Plains grazers in a Serengeti landscape" },
  { title: "Granite kopjes", text: "Rocky outcrops punctuate the broad grassland landscape.", image: "/images/destinations/serengeti/hot-air-balloon/seronera.jpg", alt: "Granite kopjes among the Serengeti grasslands" },
  { title: "Rivers and woodland", text: "River systems and tree-lined corridors appear as patterns across the land.", image: "/images/destinations/serengeti/hot-air-balloon/grumeti.jpg", alt: "A river and riverine woodland in the Serengeti" },
  { title: "Wildlife below", text: "Elephants, giraffes and other animals may be seen where present along the flight route.", image: "/images/destinations/serengeti/hot-air-balloon/kogatende.jpg", alt: "A northern Serengeti landscape seen from a balloon" },
  { title: "The colours of sunrise", text: "The first light and changing shadows are part of the experience in their own right.", image: "/images/destinations/serengeti/hot-air-balloon/takeoff.jpg", alt: "Sunrise colours above the Serengeti" },
] as const;

export const balloonSeasons = [
  { region: "Central Serengeti: Seronera", months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], href: "/safaris/serengeti/central-seronera" },
  { region: "Southern Serengeti: Ndutu", months: ["Jan", "Feb", "Mar", "Dec"], href: "/safaris/serengeti/southern-ndutu" },
  { region: "Western Corridor: Grumeti", months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], href: "/safaris/serengeti/western-corridor" },
  { region: "Northern Serengeti: Kogatende", months: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"], href: "/safaris/serengeti/northern-serengeti" },
] as const;

export const balloonSuitability = [
  ["Check before booking", "Operators may set minimum age or height requirements, passenger weight limits or supplements, mobility requirements and health or medical suitability conditions."],
  ["Confirm in writing", "Age and weight policies vary by operator and balloon capacity. Guests should discuss pregnancy, mobility limitations or relevant health concerns directly with the selected operator."],
  ["Follow the pilot", "Passengers need to be able to board and exit the basket, follow take-off and landing instructions and comply with the pilot's directions."],
] as const;

export const balloonPreparation = [
  ["Warm layers", "Early mornings can be cool. Dress in comfortable layers."],
  ["Comfortable shoes", "Choose secure footwear suitable for getting in and out of the basket."],
  ["Camera", "Bring equipment suited to landscape and wildlife photography."],
  ["Binoculars", "Useful where appropriate and permitted by the operator."],
  ["Sun protection", "Sunglasses and sun protection may be useful after sunrise."],
  ["Follow instructions", "Keep equipment secure and listen to the pilot and crew."],
] as const;

export const balloonPlanningSteps = [
  ["Share your travel details", "Tell us your Serengeti dates, preferred region and accommodation location."],
  ["Check the correct launch area", "The launch site needs to be accessible from your accommodation, with suitable ground transfers arranged."],
  ["Confirm the operator and availability", "The supplier must verify operational dates, passenger suitability, inclusions and price."],
  ["Receive written confirmation", "Flight arrangements, payment and cancellation terms must be confirmed before the experience is considered booked."],
] as const;

export const balloonFaqs = [
  { question: "How long does a Serengeti hot-air balloon safari last?", answer: "The flight is commonly around one hour, while the full experience is often described as approximately five hours including early collection, preparation, briefing, landing and post-flight arrangements. Actual timing varies by operator and conditions." },
  { question: "What time does the balloon safari begin?", answer: "Collection normally takes place before sunrise. The exact time depends on your accommodation, the launch site and the operator's transfer plan." },
  { question: "Where can I take a hot-air balloon safari in the Serengeti?", answer: "Seronera, Ndutu, Grumeti or Kirawira, and Kogatende are commonly discussed launch areas where operationally available. Confirm the launch area for your dates with the selected operator." },
  { question: "Can I see the Great Migration from a balloon?", answer: "A flight may offer aerial views of migratory herds when the location, season and flight path align. Wildlife sightings and river crossings cannot be guaranteed." },
  { question: "Is a bush breakfast included?", answer: "Many operators offer a breakfast or post-flight hospitality experience, but the menu, beverages and inclusions must be confirmed for the specific offer." },
  { question: "Is a Serengeti balloon safari safe?", answer: "Balloon flights depend on the operator's procedures, pilot decisions and suitable weather. Ask the chosen operator about safety procedures and applicable Tanzanian aviation requirements. No flight can be described as risk-free." },
  { question: "Can children fly in a hot-air balloon?", answer: "Age and height requirements vary by provider and must be confirmed directly with the selected operator." },
  { question: "Is there a weight limit?", answer: "Passenger limits or supplements depend on the operator, balloon and passenger capacity. Confirm requirements directly before booking." },
  { question: "Can pregnant travelers participate?", answer: "Prospective passengers should discuss this directly with the operator before booking because health and suitability restrictions may apply." },
  { question: "What happens if the weather is not suitable?", answer: "The pilot or operator may delay or cancel a flight if conditions are unsuitable. Rescheduling and refund terms depend on the supplier's written policy." },
  { question: "What should I wear for the flight?", answer: "Warm layers, comfortable shoes, sun protection and secure camera equipment are useful. Follow any instructions from the operator." },
  { question: "Should I book in advance?", answer: "Planning ahead is sensible, especially during busy migration or calving periods, because seats and launch areas may be limited. Availability still needs confirmation." },
  { question: "Can I add a balloon safari to my existing Serengeti package?", answer: "It may be possible depending on your route, accommodation, launch site and supplier availability. The addition must be confirmed in the final itinerary." },
] as const;

// TODO(CONFIRM): confirm whether She Roars books through a contracted supplier, refers guests to an independent operator, or only assists with enquiries.
// TODO(CONFIRM): verify current balloon operator schedules, package inclusions and passenger requirements before presenting them as available services.
