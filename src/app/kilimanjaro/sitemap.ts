import type { MetadataRoute } from "next";
import { createSectionSitemap } from "@/lib/section-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSectionSitemap(["/kilimanjaro"]);
}
