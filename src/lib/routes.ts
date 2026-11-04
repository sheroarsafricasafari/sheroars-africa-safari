import { safaris } from "@/data/safaris";

export type RouteDefinition = {
  path: string;
  title: string;
  section: string;
};

const staticPaths = [
  "/", "/about", "/team", "/why-she-roars", "/giving-back", "/testimonials", "/gallery",
  "/safaris", "/safaris/packages", "/safaris/lake-manyara", "/safaris/ngorongoro",
  "/safaris/ngorongoro/crater", "/safaris/ngorongoro/highlands-empakaai",
  "/safaris/ngorongoro/maasai-cultural-visit", "/safaris/ngorongoro/olduvai-gorge",
  "/safaris/ngorongoro/where-to-stay", "/safaris/serengeti", "/safaris/serengeti/central-seronera",
  "/safaris/serengeti/great-migration", "/safaris/serengeti/hot-air-balloon",
  "/safaris/serengeti/northern-serengeti", "/safaris/serengeti/southern-ndutu",
  "/safaris/serengeti/western-corridor", "/safaris/serengeti/where-to-stay",
  "/safaris/tarangire", "/safaris/tarangire/elephants-and-baobabs", "/safaris/tarangire/where-to-stay",
  "/kilimanjaro", "/kilimanjaro/climb-and-safari", "/kilimanjaro/climb-and-zanzibar",
  "/kilimanjaro/faq", "/kilimanjaro/group-departures", "/kilimanjaro/guide",
  "/kilimanjaro/guide/altitude-sickness", "/kilimanjaro/guide/best-time-to-climb",
  "/kilimanjaro/guide/cost-of-climbing-kilimanjaro", "/kilimanjaro/guide/food-and-camping",
  "/kilimanjaro/guide/gear-rental", "/kilimanjaro/guide/how-hard-is-kilimanjaro",
  "/kilimanjaro/guide/packing-list", "/kilimanjaro/guide/permits-park-fees-and-visas",
  "/kilimanjaro/guide/success-rates", "/kilimanjaro/guide/summit-night-uhuru-peak",
  "/kilimanjaro/guide/tipping-guide", "/kilimanjaro/guide/training-and-fitness",
  "/kilimanjaro/guide/women-on-kilimanjaro", "/kilimanjaro/guides-and-porters",
  "/kilimanjaro/mount-meru", "/kilimanjaro/packages", "/kilimanjaro/private-climbs",
  "/kilimanjaro/reviews", "/kilimanjaro/routes", "/kilimanjaro/routes/lemosho",
  "/kilimanjaro/routes/machame", "/kilimanjaro/routes/marangu", "/kilimanjaro/routes/northern-circuit",
  "/kilimanjaro/routes/rongai", "/kilimanjaro/routes/shira", "/kilimanjaro/routes/umbwe",
  "/kilimanjaro/safety", "/zanzibar", "/zanzibar/activities", "/zanzibar/activities/jozani-forest",
  "/zanzibar/activities/prison-island", "/zanzibar/activities/safari-blue",
  "/zanzibar/activities/snorkeling-mnemba-atoll", "/zanzibar/activities/spice-tour",
  "/zanzibar/activities/sunset-dhow-cruise", "/zanzibar/honeymoon",
  "/zanzibar/matemwe-and-kigomani", "/zanzibar/nungwi-and-kendwa", "/zanzibar/packages",
  "/zanzibar/paje-and-jambiani", "/zanzibar/safari-and-beach", "/zanzibar/stone-town",
  "/zanzibar/where-to-stay", "/day-trips", "/day-trips/arusha-national-park",
  "/day-trips/chemka-hot-springs", "/day-trips/lake-duluti-canoeing", "/day-trips/lake-manyara",
  "/day-trips/maasai-boma-cultural-tour", "/day-trips/materuni-waterfalls-and-coffee",
  "/day-trips/mto-wa-mbu-village-tour", "/day-trips/ngorongoro-crater", "/day-trips/tarangire",
  "/experiences", "/experiences/cultural-experiences", "/experiences/family-safaris",
  "/experiences/honeymoon-and-romance", "/experiences/luxury-safaris", "/experiences/photography-safaris",
  "/travel-guide", "/travel-guide/best-time-to-visit", "/travel-guide/climate-and-seasons",
  "/travel-guide/getting-to-tanzania", "/travel-guide/health-and-vaccinations",
  "/travel-guide/packing-list", "/travel-guide/safety-for-women-travelers",
  "/travel-guide/tipping-guide", "/travel-guide/visas-and-entry",
  "/travel-guide/what-to-expect-on-safari", "/blog", "/faq", "/contact", "/book",
  "/booking-terms", "/plan-your-safari", "/privacy-policy", "/terms", "/group-departures",
  ...safaris.map(({ slug }) => `/safaris/packages/${slug}`),
];

const sections: [string, string][] = [
  ["/safaris", "Safaris"], ["/kilimanjaro", "Kilimanjaro"], ["/zanzibar", "Zanzibar"],
  ["/day-trips", "Day Trips"], ["/experiences", "Experiences"], ["/travel-guide", "Travel Guide"],
  ["/blog", "Blog"],
];

const titleOverrides: Record<string, string> = {
  "/": "Home",
  "/safaris": "Safaris",
  "/safaris/packages": "Safari Packages",
  "/kilimanjaro/packages": "Climb Packages",
  "/kilimanjaro/routes": "Kilimanjaro Routes",
  "/team": "Meet the Roarers",
  "/faq": "FAQ",
};

function humanize(path: string) {
  if (titleOverrides[path]) return titleOverrides[path];
  const packageTitle = safaris.find(({ slug }) => path === `/safaris/packages/${slug}`)?.title;
  if (packageTitle) return packageTitle;
  if (path === "/") return "Home";
  return path.split("/").filter(Boolean).at(-1)!.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function sectionFor(path: string) {
  return sections.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1] ?? "Company";
}

export const routeRegistry: RouteDefinition[] = staticPaths.map((path) => ({
  path,
  title: humanize(path),
  section: sectionFor(path),
}));

export const routeTitleMap: Record<string, string> = Object.fromEntries(
  routeRegistry.map(({ path, title }) => [path, title]),
);

export function createBreadcrumbs(path: string, titleMap: Record<string, string> = routeTitleMap) {
  const segments = path.split("/").filter(Boolean);
  const crumbs = [{ title: "Home", href: "/" }];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const title = titleMap[currentPath] ?? segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    crumbs.push({ title, href: currentPath });
  }

  return crumbs;
}
