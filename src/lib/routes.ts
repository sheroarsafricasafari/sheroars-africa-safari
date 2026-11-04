export type RouteDefinition = {
  path: string;
  title: string;
  section: string;
};

export const routeTitleMap: Record<string, string> = {
  "/": "Home",
  "/safaris": "Safaris",
  "/safaris/packages": "Safari Packages",
  "/kilimanjaro": "Kilimanjaro",
  "/kilimanjaro/routes": "Kilimanjaro Routes",
  "/kilimanjaro/packages": "Climb Packages",
  "/zanzibar": "Zanzibar",
  "/day-trips": "Day Trips",
  "/experiences": "Experiences",
  "/about": "About",
  "/team": "Meet the Roarers",
  "/travel-guide": "Travel Guide",
  "/faq": "FAQ",
  "/contact": "Contact",
};

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
