import { z } from "zod";
import type { DestinationHeroData, DestinationMeta, DestinationNavItem, RelatedDestination, WildlifeTileData } from "@/types/destination";

export type MigrationMonth = {
  month: string;
  herdLocation: string;
  stage: string;
  experience: string;
  wildlife: string[];
  landscapeWeather: string;
  destination: string;
  destinationHref: string;
  confidence: "Approximate seasonal pattern" | "Highly variable";
  image: string;
  imageAlt: string;
};

export type MigrationRegion = {
  id: string;
  name: string;
  shortName: string;
  whatHappens: string;
  approximateSeason: string;
  wildlifeExperience: string;
  visitorExperience: string;
  href: string;
  linkLabel: string;
  position: { x: number; y: number };
};

export type MigrationStage = {
  title: string;
  period: string;
  description: string;
  region: string;
};

export type MigrationExperience = {
  title: string;
  description: string;
  period: string;
  region: string;
  href: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
};

export type MigrationSeason = {
  id: string;
  label: string;
  months: string;
  region: string;
  reason: string;
  href: string;
  linkLabel: string;
};

export type MigrationFAQ = { question: string; answer: string };

export type GreatMigrationData = {
  meta: DestinationMeta;
  keywords: string[];
  hero: DestinationHeroData;
  breadcrumbs: { title: string; href: string }[];
  nav: DestinationNavItem[];
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { value: string; label: string }[];
  };
  regions: MigrationRegion[];
  months: MigrationMonth[];
  stages: MigrationStage[];
  experiences: MigrationExperience[];
  calvingFeature: {
    eyebrow: string;
    title: string;
    description: string[];
    image: string;
    imageAlt: string;
    statistic: string;
    statisticSource: string;
    statisticSourceUrl: string;
    cta: { label: string; href: string };
  };
  rivers: {
    title: string;
    period: string;
    description: string;
    wildlife: string;
    region: string;
    href: string;
    linkLabel: string;
    image: string;
    imageAlt: string;
  }[];
  wildlife: WildlifeTileData[];
  seasons: MigrationSeason[];
  planningSteps: { title: string; text: string }[];
  sampleRoutes: { title: string; period: string; route: string[]; description: string; label: string }[];
  practicalInfo: { title: string; text: string; href?: string; linkLabel?: string }[];
  faqs: MigrationFAQ[];
  related: RelatedDestination[];
  cta: { title: string; description: string; primary: string; secondary: string };
  ctaEyebrow: string;
  ctaImage: string;
  ctaImageAlt: string;
  whatsappMessage: string;
};

const migrationHeroSchema = z.object({
  image: z.string().startsWith("/"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  chips: z.array(z.string().min(1)).min(3),
  primary: z.object({ label: z.string().min(1), href: z.string().startsWith("#") }),
  secondary: z.object({ label: z.string().min(1), href: z.string().startsWith("/") }),
});

export const greatMigrationSchema = z.object({
  meta: z.object({ title: z.string().min(1), description: z.string().min(1) }),
  hero: migrationHeroSchema,
  nav: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
  regions: z.array(z.object({ id: z.string(), name: z.string(), href: z.string().startsWith("/") })).min(5),
  months: z.array(z.object({
    month: z.string(),
    herdLocation: z.string(),
    stage: z.string(),
    experience: z.string(),
    wildlife: z.array(z.string()).min(1),
    landscapeWeather: z.string(),
    destination: z.string(),
    destinationHref: z.string().startsWith("/"),
    confidence: z.enum(["Approximate seasonal pattern", "Highly variable"]),
    image: z.string().startsWith("/"),
    imageAlt: z.string(),
  })).length(12),
  stages: z.array(z.object({ title: z.string(), period: z.string(), description: z.string(), region: z.string() })).length(6),
  experiences: z.array(z.object({ title: z.string(), description: z.string(), period: z.string(), href: z.string().startsWith("/"), image: z.string().startsWith("/") })).length(6),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).length(12),
}).passthrough();

const southernPath = "/safaris/serengeti/southern-ndutu";
const centralPath = "/safaris/serengeti/central-seronera";
const westernPath = "/safaris/serengeti/western-corridor";
const northernPath = "/safaris/serengeti/northern-serengeti";
const imageRoot = "/images/destinations/serengeti/great-migration";

export const greatMigration: GreatMigrationData = {
  meta: {
    title: "The Great Migration Tanzania | Month-by-Month Serengeti Safari Guide",
    description: "Discover Tanzania's Great Migration month by month. Explore wildebeest calving in Ndutu, Grumeti River crossings, Mara River crossings, the best time to visit and how to plan your Serengeti migration safari.",
  },
  keywords: [
    "Great Migration Tanzania", "Serengeti Great Migration", "Wildebeest Migration Tanzania",
    "Great Migration safari", "Serengeti migration by month", "Best time to see Great Migration",
    "Wildebeest calving season", "Ndutu calving safari", "Mara River crossings",
    "Grumeti River crossings", "Great Migration calendar", "Tanzania migration safari",
    "Serengeti migration route", "Luxury Great Migration safari", "Great Migration photography safari",
  ],
  hero: {
    image: `${imageRoot}/hero.jpg`,
    eyebrow: "THE GREAT MIGRATION",
    title: "The Great Migration of Tanzania",
    subtitle: "A remarkable journey through the Serengeti-Mara ecosystem, where millions of wildebeest and other migratory animals follow the seasons, the rains and the promise of fresh grazing.",
    chips: ["Annual Wildlife Movement", "Tanzania and Kenya", "Twelve Months of Natural Drama"],
    primary: { label: "Explore the Migration Calendar", href: "#migration-calendar" },
    secondary: { label: "Plan Your Great Migration Safari", href: "/plan-your-safari?type=Safari" },
  },
  breadcrumbs: [
    { title: "Home", href: "/" },
    { title: "Safaris", href: "/safaris" },
    { title: "Serengeti", href: "/safaris/serengeti" },
    { title: "The Great Migration", href: "/safaris/serengeti/great-migration" },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "migration-map", label: "Migration Map" },
    { id: "migration-calendar", label: "Month by Month" },
    { id: "journey-stages", label: "The Journey" },
    { id: "experiences", label: "Experiences" },
    { id: "calving", label: "Calving Season" },
    { id: "rivers", label: "The Rivers" },
    { id: "wildlife", label: "Wildlife" },
    { id: "choose-experience", label: "Choose an Experience" },
    { id: "planning", label: "Planning" },
    { id: "routes", label: "Sample Routes" },
    { id: "practical", label: "Travel Information" },
    { id: "faq", label: "FAQ" },
  ],
  overview: {
    eyebrow: "THE GREATEST WILDLIFE JOURNEY",
    title: "One Extraordinary Journey. A Changing Landscape.",
    paragraphs: [
      "The Great Migration is the annual movement of wildebeest across the Greater Serengeti ecosystem, accompanied in parts of the journey by zebra and gazelles. The herds move between grazing areas in Tanzania and Kenya as seasonal rainfall changes the availability of fresh grass. Their route is circular in broad outline, but the timing and location vary from year to year.",
      "The southern plains and Ndutu are associated with calving, followed by movement through central and western Serengeti routes and later into the northern Serengeti and Maasai Mara. These are ecological patterns, not fixed appointments. Rainfall, grazing and local conditions shape the herds' decisions; no map or monthly calendar can promise where they will be on a particular date.",
      "The migration connects countries, habitats and species. Grazers alter the grassland through their movement, while predators and scavengers respond to a changing food source. For visitors, each season has a different character—from green-season plains and newborn calves to large moving herds and possible river activity. The best destination depends on which experience matters most and on the conditions near your travel dates.",
    ],
    facts: [
      { value: "Serengeti-Mara", label: "The connected ecosystem" },
      { value: "Seasonal and circular", label: "Broad annual movement" },
      { value: "January to March", label: "General calving period" },
      { value: "July to October", label: "General northern river-crossing planning period" },
    ],
  },
  regions: [
    {
      id: "south",
      name: "Southern Serengeti and Ndutu",
      shortName: "Southern plains",
      whatHappens: "Migratory herds generally gather on the southern plains, where the calving season takes place.",
      approximateSeason: "Generally December to March; rainfall and herds vary.",
      wildlifeExperience: "Seasonal wildebeest and zebra, newborn calves during the calving period, and resident predators.",
      visitorExperience: "Explore open grazing country and varied habitats with time for patient wildlife observation.",
      href: southernPath,
      linkLabel: "Explore Southern Serengeti and Ndutu",
      position: { x: 49, y: 73 },
    },
    {
      id: "central",
      name: "Central Serengeti and Seronera",
      shortName: "Central",
      whatHappens: "The central region forms part of the wider year-round ecosystem and can be a route through which herds move.",
      approximateSeason: "Resident wildlife year-round; migration timing varies.",
      wildlifeExperience: "Resident wildlife and seasonal movement through central grassland and river habitats.",
      visitorExperience: "Combine the central region with other areas according to the route and dates.",
      href: centralPath,
      linkLabel: "Explore Central Serengeti and Seronera",
      position: { x: 47, y: 48 },
    },
    {
      id: "west",
      name: "Western Corridor and Grumeti",
      shortName: "Western",
      whatHappens: "Herds may move through the Western Corridor as grazing conditions change; river activity is unpredictable.",
      approximateSeason: "Generally May to July as a broad planning period.",
      wildlifeExperience: "Seasonal migration movement, riverine habitat and resident wildlife.",
      visitorExperience: "Explore Grumeti river country and surrounding landscapes without expecting a scheduled crossing.",
      href: westernPath,
      linkLabel: "Explore Western Corridor and Grumeti",
      position: { x: 20, y: 41 },
    },
    {
      id: "north",
      name: "Northern Serengeti and Kogatende",
      shortName: "Northern",
      whatHappens: "Herds may move through northern Tanzania, where the Mara River is one part of a larger seasonal landscape.",
      approximateSeason: "Generally July to October for northern migration planning.",
      wildlifeExperience: "Seasonal herds, river habitat and resident wildlife; crossings cannot be predicted.",
      visitorExperience: "Spend flexible time in the northern region and follow responsible guidance on the ground.",
      href: northernPath,
      linkLabel: "Explore Northern Serengeti",
      position: { x: 57, y: 19 },
    },
    {
      id: "mara",
      name: "Maasai Mara, Kenya",
      shortName: "Maasai Mara",
      whatHappens: "The wider ecosystem extends across the border; herds may use the Maasai Mara as part of the annual movement.",
      approximateSeason: "Seasonal presence varies and cannot be fixed to exact dates.",
      wildlifeExperience: "Migratory herds and resident wildlife in a different national reserve and travel jurisdiction.",
      visitorExperience: "Ask about cross-border planning if a Kenya extension is of interest.",
      href: "/plan-your-safari?type=Safari",
      linkLabel: "Discuss a cross-border safari",
      position: { x: 82, y: 14 },
    },
  ],
  months: [
    { month: "January", herdLocation: "Southern Serengeti and Ndutu", stage: "Southern gathering and calving season", experience: "Large herds gather on the southern plains. Calving activity may begin, depending on seasonal conditions.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Predators"], landscapeWeather: "Green-season conditions and grazing are influenced by rainfall; local weather varies.", destination: "Southern Serengeti and Ndutu", destinationHref: southernPath, confidence: "Approximate seasonal pattern", image: `${imageRoot}/calving.jpg`, imageAlt: "Wildebeest calves on the southern Serengeti plains" },
    { month: "February", herdLocation: "Ndutu and Southern Serengeti", stage: "Calving season", experience: "A commonly recognised peak calving period, with large herds and newborn calves possible across the southern plains.", wildlife: ["Wildebeest", "Newborn calves", "Zebra", "Predators"], landscapeWeather: "Fresh grazing and seasonal rain shape the landscape and herd distribution.", destination: "Southern Serengeti and Ndutu", destinationHref: southernPath, confidence: "Approximate seasonal pattern", image: `${imageRoot}/wildebeest.jpg`, imageAlt: "Migratory wildebeest moving across the southern plains" },
    { month: "March", herdLocation: "Southern Serengeti and surrounding plains", stage: "Calving season continues", experience: "Calving may continue while rainfall and grass conditions influence the herds' distribution.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Predators"], landscapeWeather: "Green landscapes may persist; conditions and herd movement differ year to year.", destination: "Southern Serengeti and Ndutu", destinationHref: southernPath, confidence: "Approximate seasonal pattern", image: `${imageRoot}/herds.jpg`, imageAlt: "Seasonal herds grazing on the southern plains" },
    { month: "April", herdLocation: "Southern, Central and Western movement routes", stage: "Movement with changing grazing", experience: "Herds begin moving as grazing conditions change. Green landscapes and seasonal rains are important features.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Resident wildlife"], landscapeWeather: "Seasonal rains and road conditions can affect travel and local landscapes.", destination: "Southern or Central Serengeti", destinationHref: centralPath, confidence: "Highly variable", image: `${imageRoot}/central-herds.jpg`, imageAlt: "Herds moving across a Serengeti grassland" },
    { month: "May", herdLocation: "Central and Western Serengeti routes", stage: "North-westward movement", experience: "Large moving herds may approach the Western Corridor as grazing patterns shift.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Predators"], landscapeWeather: "Seasonal rainfall and changing access conditions shape the safari experience.", destination: "Western Corridor", destinationHref: westernPath, confidence: "Highly variable", image: `${imageRoot}/herds.jpg`, imageAlt: "Wildebeest herd moving through the Serengeti" },
    { month: "June", herdLocation: "Western Corridor and Grumeti", stage: "Western passage", experience: "Migration movement and possible Grumeti River crossings; rutting activity may also occur.", wildlife: ["Wildebeest", "Zebra", "Hippos", "Crocodiles"], landscapeWeather: "The landscape changes with rainfall; river levels and crossing opportunities are not predictable.", destination: "Western Corridor and Grumeti", destinationHref: westernPath, confidence: "Highly variable", image: `${imageRoot}/grumeti-crossing.jpg`, imageAlt: "The Grumeti River corridor in the Western Serengeti" },
    { month: "July", herdLocation: "Western to Northern Serengeti transition", stage: "Northward movement", experience: "Herds may continue north. Early Mara River activity is possible but cannot be scheduled.", wildlife: ["Wildebeest", "Zebra", "Predators", "River wildlife"], landscapeWeather: "Local conditions and herd position vary across the transition between regions.", destination: "Western or Northern Serengeti", destinationHref: northernPath, confidence: "Highly variable", image: `${imageRoot}/northern-plains.jpg`, imageAlt: "Open plains of the northern Serengeti" },
    { month: "August", herdLocation: "Northern Serengeti and Mara River region", stage: "Northern journey", experience: "A popular northern migration-planning period with possible river-crossing opportunities.", wildlife: ["Wildebeest", "Zebra", "Crocodiles", "Predators"], landscapeWeather: "Dry-season patterns are broad; local weather and river conditions vary.", destination: "Northern Serengeti and Kogatende", destinationHref: northernPath, confidence: "Highly variable", image: `${imageRoot}/mara-crossing.jpg`, imageAlt: "Mara River country in the northern Serengeti" },
    { month: "September", herdLocation: "Northern Serengeti and Mara River region", stage: "Northern journey", experience: "Large herds may remain in the north and river-crossing activity may continue, without guarantees.", wildlife: ["Wildebeest", "Zebra", "Crocodiles", "Resident wildlife"], landscapeWeather: "Conditions and herd distribution shift within the wider northern ecosystem.", destination: "Northern Serengeti and Kogatende", destinationHref: northernPath, confidence: "Highly variable", image: `${imageRoot}/mara-crossing.jpg`, imageAlt: "The Mara River landscape in northern Tanzania" },
    { month: "October", herdLocation: "Northern and eastern migration routes", stage: "Late northern movement and changing routes", experience: "Northern migration activity may continue as herds respond to changing conditions.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Predators"], landscapeWeather: "Rainfall and grazing changes influence the timing of movement.", destination: "Northern Serengeti", destinationHref: northernPath, confidence: "Highly variable", image: `${imageRoot}/northern-plains.jpg`, imageAlt: "Seasonal landscape in the northern Serengeti" },
    { month: "November", herdLocation: "Northern, central and eastern return routes", stage: "Return movement", experience: "Seasonal rainfall can encourage movement towards greener grazing areas in the south.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Resident wildlife"], landscapeWeather: "Rainfall onset and local conditions vary from year to year.", destination: "Central Serengeti", destinationHref: centralPath, confidence: "Highly variable", image: `${imageRoot}/central-herds.jpg`, imageAlt: "Herds across the central Serengeti landscape" },
    { month: "December", herdLocation: "Southern Serengeti and Ndutu", stage: "Southern gathering", experience: "Herds generally return towards the southern plains as the calving season approaches.", wildlife: ["Wildebeest", "Zebra", "Gazelle", "Predators"], landscapeWeather: "Seasonal rain and new grazing shape the transition; timing is not fixed.", destination: "Southern Serengeti and Ndutu", destinationHref: southernPath, confidence: "Approximate seasonal pattern", image: `${imageRoot}/wildebeest.jpg`, imageAlt: "Migratory wildebeest on the southern Serengeti plains" },
  ],
  stages: [
    { title: "The Southern Gathering", period: "December to January", description: "Herds generally move towards southern grazing areas as seasonal rain and fresh growth develop. The timing varies with conditions.", region: "Southern Serengeti and Ndutu" },
    { title: "Calving Season", period: "January to March", description: "Many wildebeest calves are born across the southern plains during a concentrated period. Births and sightings cannot be guaranteed.", region: "Southern Serengeti and Ndutu" },
    { title: "The Great Movement North-West", period: "April to May", description: "As grazing changes, herds may begin moving through central and western routes. The precise route shifts with rainfall.", region: "Southern, Central and Western Serengeti" },
    { title: "The Western Passage", period: "May to July", description: "The Western Corridor and Grumeti form part of the broad westward passage. River activity is natural and unpredictable.", region: "Western Corridor and Grumeti" },
    { title: "The Northern Journey", period: "July to October", description: "Herds may move into northern Serengeti and the Mara ecosystem. River crossings may occur, but not on a visitor's timetable.", region: "Northern Serengeti and Maasai Mara" },
    { title: "The Return South", period: "October to December", description: "Changing rainfall and grazing conditions shape the gradual return towards southern feeding areas and the next calving season.", region: "Northern, Central and Southern routes" },
  ],
  experiences: [
    { title: "Wildebeest Calving", description: "The southern plains become an important calving area during the green season. The best time is a broad seasonal guide, not a promise of births.", period: "Generally January to March", region: "Southern Serengeti and Ndutu", href: southernPath, linkLabel: "Explore Southern Serengeti and Ndutu", image: `${imageRoot}/calving.jpg`, imageAlt: "Wildebeest mother and calf during the southern calving season" },
    { title: "Newborn Calves on the Plains", description: "New calves are part of the migration's annual renewal. Observe quietly and allow the herd to move naturally.", period: "Generally January to March", region: "Southern Serengeti and Ndutu", href: southernPath, linkLabel: "Explore the calving grounds", image: `${imageRoot}/wildebeest.jpg`, imageAlt: "Wildebeest among the seasonal herds in the south" },
    { title: "Predator Activity", description: "Predators and scavengers respond to changing prey availability across the ecosystem. Their presence and behaviour are never a scheduled spectacle.", period: "Throughout the year; seasonal context varies", region: "Across the Serengeti ecosystem", href: "/safaris/serengeti", linkLabel: "Explore the Serengeti", image: `${imageRoot}/predators.jpg`, imageAlt: "Predators in the Serengeti ecosystem" },
    { title: "Rutting Season", description: "Wildebeest breeding behaviour is one phase of the annual cycle, associated with herd movement and competition among males.", period: "Often associated with the western migration period; timing varies", region: "Western Serengeti routes", href: westernPath, linkLabel: "Explore the Western Corridor", image: `${imageRoot}/rutting.jpg`, imageAlt: "Wildebeest herd during the seasonal migration" },
    { title: "Grumeti River Crossings", description: "Herds may approach or cross river sections as they move through the west. A crossing may not occur during any particular visit.", period: "Generally May to July for planning", region: "Western Corridor and Grumeti", href: westernPath, linkLabel: "Explore Grumeti", image: `${imageRoot}/grumeti-crossing.jpg`, imageAlt: "Grumeti River country in western Serengeti" },
    { title: "Mara River Crossings", description: "The Mara River is part of the northern seasonal story. Herds may cross, wait or move elsewhere; no crossing can be guaranteed.", period: "Generally July to October for planning", region: "Northern Serengeti and Mara River", href: northernPath, linkLabel: "Explore Northern Serengeti", image: `${imageRoot}/mara-crossing.jpg`, imageAlt: "Mara River landscape in the Northern Serengeti" },
  ],
  calvingFeature: {
    eyebrow: "THE SEASON OF NEW LIFE",
    title: "When the Southern Plains Become a Nursery",
    description: [
      "Rain-fed short grass draws migratory wildebeest to southern grazing areas, including the Ndutu landscape. The open plains support a concentrated calving period, while the wider herd remains connected to the seasonal movement across the ecosystem.",
      "Many calves arrive within a relatively short window. Their ability to stand and follow their mothers soon after birth is part of the species' adaptation to life among moving herds. Predators also respond to the concentration of prey, illustrating the ecological relationships that continue beyond any single wildlife encounter.",
      "This is a natural season, not a performance. Rainfall can shift the herds' timing and distribution, and visitors should plan with flexibility and observe wildlife responsibly.",
    ],
    image: `${imageRoot}/calving.jpg`,
    imageAlt: "Newborn wildebeest calf with its mother on the southern plains",
    statistic: "More than half a million wildebeest calves are reported as born within a few weeks.",
    // TODO(CONFIRM): verify the figure, exact wording, timeframe and source context before publication.
    statisticSource: "TANAPA Tourism Splash, Issue 2 (January–March 2026)",
    statisticSourceUrl: "https://www.tanzaniaparks.go.tz/uploads/publications/en-1771310361-TANAPA%20Tourism%20Splash_Issue%20no%202%202026.pdf",
    cta: { label: "Explore Southern Serengeti and Ndutu", href: southernPath },
  },
  rivers: [
    {
      title: "Grumeti River",
      period: "May to July, generally",
      description: "The Grumeti River is associated with the western migration passage. Herds may travel through river country as grazing changes, but a crossing is not predictable.",
      wildlife: "Crocodiles and hippos inhabit the river system; other wildlife depends on habitat and season.",
      region: "Western Corridor",
      href: westernPath,
      linkLabel: "Explore Western Corridor",
      image: `${imageRoot}/grumeti-crossing.jpg`,
      imageAlt: "The Grumeti River landscape in the Western Corridor",
    },
    {
      title: "Mara River",
      period: "July to October, generally",
      description: "The Mara River is part of the northern migration story. Herds may approach, pause, cross or move to another location entirely.",
      wildlife: "Crocodiles inhabit the river; wildlife sightings and crossing activity vary.",
      region: "Northern Serengeti",
      href: northernPath,
      linkLabel: "Explore Northern Serengeti",
      image: `${imageRoot}/mara-crossing.jpg`,
      imageAlt: "The Mara River landscape in the Northern Serengeti",
    },
  ],
  wildlife: [
    { name: "Wildebeest", description: "The principal migratory grazer moves between seasonal feeding areas across the Serengeti-Mara ecosystem.", likelihood: "Migration presence varies by season", image: `${imageRoot}/wildebeest.jpg`, featured: true },
    { name: "Plains zebra", description: "Zebra often travel alongside wildebeest but do not necessarily follow identical routes or timing.", likelihood: "Seasonal and resident presence", image: `${imageRoot}/zebra.jpg` },
    { name: "Thomson's gazelle", description: "A grazer of open country whose movements and habitat use differ from those of wildebeest.", likelihood: "Habitat and season dependent", image: `${imageRoot}/herds.jpg` },
    { name: "Lions", description: "Resident predators respond to prey, habitat and territory across the wider ecosystem.", likelihood: "Resident; sightings vary", image: `${imageRoot}/predators.jpg` },
    { name: "Cheetahs", description: "Cheetahs use open habitats and may hunt smaller grazers; encounters depend on natural conditions.", likelihood: "Sightings vary", image: `${imageRoot}/predators.jpg` },
    { name: "Hyenas", description: "Hyenas are both hunters and scavengers and form part of the ecosystem throughout the annual cycle.", likelihood: "Sightings vary", image: `${imageRoot}/predators.jpg` },
    { name: "Leopards", description: "Elusive cats use cover and wooded habitat; they are not followers of the migration in the same way as grazers.", likelihood: "Elusive; sightings vary", image: `${imageRoot}/central-herds.jpg` },
    { name: "Crocodiles", description: "Crocodiles inhabit river systems such as the Grumeti and Mara; their presence does not make crossings predictable.", likelihood: "River habitat; sightings vary", image: `${imageRoot}/grumeti-crossing.jpg` },
    { name: "Vultures", description: "Scavenging birds may benefit from carrion and play a role in nutrient cycling.", likelihood: "Habitat and conditions vary", image: `${imageRoot}/northern-plains.jpg` },
    { name: "Jackals", description: "Jackals are opportunistic predators and scavengers whose routes are not identical to those of migratory herds.", likelihood: "Sightings vary", image: `${imageRoot}/central-herds.jpg` },
  ],
  seasons: [
    { id: "calves", label: "Watching newborn wildebeest calves", months: "Generally January to March", region: "Southern Serengeti and Ndutu", reason: "The southern plains are associated with the main calving period and seasonal herds.", href: southernPath, linkLabel: "Explore the southern plains" },
    { id: "herds", label: "Seeing large herds on open plains", months: "Seasonal; broad movement can span much of the year", region: "Choose a region based on your dates", reason: "The migration moves across the ecosystem, so the likely region changes through the seasons.", href: "/safaris/serengeti", linkLabel: "Compare Serengeti regions" },
    { id: "predators", label: "Photographing predators and wildlife interactions", months: "Throughout the year; context varies", region: "Central or Southern Serengeti, depending on dates", reason: "Resident predators and shifting prey concentrations create varied opportunities, never guaranteed encounters.", href: centralPath, linkLabel: "Explore Central Serengeti" },
    { id: "grumeti", label: "Experiencing the Grumeti River", months: "Generally May to July for migration planning", region: "Western Corridor", reason: "The western passage is associated with Grumeti river country, but crossings cannot be timed.", href: westernPath, linkLabel: "Explore Western Corridor" },
    { id: "mara", label: "Watching possible Mara River crossings", months: "Generally July to October for migration planning", region: "Northern Serengeti", reason: "The north is associated with later migration movement and the Mara River; crossings are not guaranteed.", href: northernPath, linkLabel: "Explore Northern Serengeti" },
    { id: "green", label: "Exploring green-season landscapes", months: "Often November to May; conditions vary", region: "Southern and Central Serengeti", reason: "Rainfall changes the landscape and grazing, while access and local conditions can vary.", href: southernPath, linkLabel: "Explore Southern Serengeti and Ndutu" },
  ],
  planningSteps: [
    { title: "Choose your experience", text: "Decide whether calving, predator activity, river country, large herds or general wildlife viewing matters most." },
    { title: "Select your travel period", text: "Use broad seasonal patterns to identify regions to discuss, not exact herd locations or guaranteed wildlife events." },
    { title: "Choose the right safari region", text: "Match your preferences to Ndutu, Central Serengeti, the Western Corridor or Northern Serengeti." },
    { title: "Choose accommodation", text: "Camp location influences daily access. Availability and seasonal positioning must be confirmed for your dates." },
    { title: "Allow enough flexibility", text: "Extra time in the appropriate region can create more opportunities to explore, although it cannot guarantee a sighting or crossing." },
    { title: "Design your route", text: "Combine Serengeti regions and, where appropriate, Ngorongoro or other destinations after checking logistics, access and applicable fees." },
  ],
  sampleRoutes: [
    { title: "Calving Season Safari", period: "January to March", route: ["Arusha", "Southern Serengeti and Ndutu", "Central Serengeti", "Ngorongoro"], description: "A possible route focused on the southern calving landscape, with other regions added according to available time, access and the wider itinerary.", label: "Illustrative route. Your final itinerary depends on availability, season and travel preferences." },
    { title: "Western and Northern Migration", period: "June to August", route: ["Arusha", "Central Serengeti", "Western Corridor", "Northern Serengeti"], description: "A broad seasonal transition concept linking central routes with western and northern areas. Actual movement and road or flight logistics must be confirmed.", label: "Illustrative route. Your final itinerary depends on availability, season and travel preferences." },
    { title: "Northern River-Country Safari", period: "August to October", route: ["Arusha", "Central Serengeti", "Northern Serengeti", "Kogatende"], description: "A concept allowing flexible time in the north, where migration planning may include Mara River country without promising a crossing.", label: "Illustrative route. Your final itinerary depends on availability, season and travel preferences." },
  ],
  practicalInfo: [
    { title: "Choosing the Right Month", text: "Choose dates around the kind of landscape or wildlife experience you hope for, then account for annual variation.", href: "/travel-guide/best-time-to-visit", linkLabel: "Read the best-time guide" },
    { title: "Safari Accommodation", text: "Camp location affects time in the field. Check seasonal position, comfort and availability before confirming a route.", href: "/safaris/serengeti/where-to-stay", linkLabel: "Explore Serengeti stays" },
    { title: "Road Transfers and Safari Flights", text: "Routes depend on the exact camps, available flights, road conditions and the areas included in the itinerary.", href: "/travel-guide/getting-to-tanzania", linkLabel: "Read about getting to Tanzania" },
    { title: "Clothing and Photography Equipment", text: "Pack comfortable neutral clothing, early-morning layers and equipment suited to your interests and travel plans.", href: "/travel-guide/packing-list", linkLabel: "Review the packing guide" },
    { title: "Wildlife Safety and Responsible Viewing", text: "Follow your guide's instructions, keep a respectful distance and allow wildlife to behave naturally.", href: "/travel-guide/what-to-expect-on-safari", linkLabel: "Learn what to expect on safari" },
    { title: "Travel Insurance and Documents", text: "Confirm documentation and insurance arrangements with the relevant providers before departure.", href: "/travel-guide/visas-and-entry", linkLabel: "Read the entry information guide" },
  ],
  faqs: [
    { question: "What is the Great Migration?", answer: "It is the annual movement of migratory wildebeest and other grazers across the Serengeti-Mara ecosystem in search of seasonal grazing. Herd movements are influenced by rainfall and are not fixed to a calendar." },
    { question: "When is the best time to see the Great Migration in Tanzania?", answer: "The best time depends on the experience. Calving is generally associated with December to March in the south, while northern river-crossing opportunities are generally planned for July to October. Neither locations nor crossings are guaranteed." },
    { question: "Where is the Great Migration in January?", answer: "The broad seasonal pattern often places many herds on the Southern Serengeti and Ndutu plains in January, when the calving period may begin. Rainfall can shift the timing and distribution." },
    { question: "When is the wildebeest calving season?", answer: "The general calving period is January to March, and February is commonly an important planning month. Exact timing varies with ecological conditions." },
    { question: "When can I see the Grumeti River crossings?", answer: "May to July is a broad planning period for the Western Corridor and Grumeti River area. A crossing may not happen during your visit and cannot be scheduled." },
    { question: "When can I see the Mara River crossings?", answer: "July to October is a broad planning period for Northern Serengeti and Mara River country. Herds may cross, wait or move elsewhere; sightings are never guaranteed." },
    { question: "Are river crossings guaranteed?", answer: "No. Herds may approach, pause, turn back or cross at a location outside a visitor's position. No operator can promise a crossing." },
    { question: "How many days do I need for a migration safari?", answer: "The right duration depends on your region, route and intended experience. Allowing flexible time in the appropriate area can create more opportunities, but cannot ensure a wildlife sighting." },
    { question: "Can I combine different Serengeti regions?", answer: "Yes, depending on available time, access, camp locations, flights and the final itinerary. Combining regions should be planned around practical transfers and your interests." },
    { question: "Can I visit the Great Migration outside the peak season?", answer: "Yes. Resident wildlife and changing landscapes remain part of the Serengeti experience throughout the year, while migration activity and locations differ by season." },
    { question: "Is the Great Migration in Tanzania or Kenya?", answer: "The greater Serengeti-Mara ecosystem spans northern Tanzania and southern Kenya. Herds move seasonally across this wider ecosystem, including national borders." },
    { question: "What should I pack for a Great Migration safari?", answer: "Consider neutral clothing, comfortable shoes, warm layers, binoculars, sun protection and photography equipment suited to your plans. Adjust your packing to the season and itinerary." },
  ],
  related: [
    { title: "Southern Serengeti and Ndutu", href: southernPath, description: "Explore the seasonal calving landscape in the south." },
    { title: "Central Serengeti and Seronera", href: centralPath, description: "Discover the central valley and year-round wildlife." },
    { title: "Western Corridor", href: westernPath, description: "Learn about the Grumeti and western migration movement." },
    { title: "Northern Serengeti", href: northernPath, description: "Explore northern plains and Mara River country." },
    { title: "Ngorongoro", href: "/safaris/ngorongoro", description: "Consider Ngorongoro in a route that suits your dates." },
    { title: "Tanzania Safari Packages", href: "/safaris/packages", description: "Review existing journeys and ask about a tailor-made route." },
  ],
  cta: {
    title: "Find Yourself in the Heart of the Great Migration",
    description: "Every month brings a different chapter in the Serengeti's extraordinary wildlife journey. Tell us when you would like to travel and which experiences matter most to you. Together, we will shape a safari around the season and the places you want to discover.",
    primary: "Plan My Great Migration Safari",
    secondary: "Chat on WhatsApp",
  },
  ctaEyebrow: "PLAN YOUR GREAT MIGRATION SAFARI",
  ctaImage: `${imageRoot}/cta.jpg`,
  ctaImageAlt: "Wildebeest herds beneath a wide Serengeti sky",
  whatsappMessage: "Hello, I would like to plan a Great Migration safari in Tanzania.",
};

if (process.env.NODE_ENV === "development") {
  greatMigrationSchema.parse(greatMigration);
}
