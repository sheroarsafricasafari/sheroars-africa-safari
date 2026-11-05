import type { Metadata } from "next";
import SouthernNdutuPage, { getSouthernNdutuMetadata } from "@/components/destinations/SouthernNdutuPage";
import { southernNdutu } from "@/data/destinations/serengeti";

export const metadata: Metadata = getSouthernNdutuMetadata(southernNdutu);

export default function SouthernNdutuRoute() {
  return <SouthernNdutuPage data={southernNdutu} />;
}
