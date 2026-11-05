import type { Metadata } from "next";
import SerengetiRegionPage, { getSerengetiRegionMetadata } from "@/components/destinations/SerengetiRegionPage";
import { westernCorridor } from "@/data/destinations/serengeti";

const path = "/safaris/serengeti/western-corridor";

export const metadata: Metadata = getSerengetiRegionMetadata(westernCorridor, path);

export default function WesternCorridorPage() {
  return <SerengetiRegionPage data={westernCorridor} path={path} />;
}
