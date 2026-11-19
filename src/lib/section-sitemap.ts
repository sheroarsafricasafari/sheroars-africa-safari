import type { MetadataRoute } from "next";
import { routeRegistry } from "@/lib/routes";
import { siteConfig } from "@/data/site";

export function createSectionSitemap(prefixes: readonly string[]): MetadataRoute.Sitemap {
  const paths = routeRegistry
    .map(({ path }) => path)
    .filter((path) => prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)))
    .filter((path) => path !== "/dev-preview" && path !== "/thank-you");

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
