import type { MetadataRoute } from "next";
import { routeRegistry } from "@/lib/routes";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...routeRegistry.map(({ path }) => path),
    ...safaris.map(({ slug }) => `/safaris/packages/${slug}`),
  ];

  return [...new Set(paths)]
    .filter((path) => path !== "/dev-preview" && path !== "/thank-you")
    .map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
