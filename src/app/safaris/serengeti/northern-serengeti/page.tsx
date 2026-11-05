import type { Metadata } from "next";
import SerengetiRegionPage, { getSerengetiRegionMetadata } from "@/components/destinations/SerengetiRegionPage";
import { northernSerengeti } from "@/data/destinations/serengeti";

const path = "/safaris/serengeti/northern-serengeti";

export const metadata: Metadata = getSerengetiRegionMetadata(northernSerengeti, path);

export default function NorthernSerengetiPage() {
  return <SerengetiRegionPage data={northernSerengeti} path={path} />;
}
