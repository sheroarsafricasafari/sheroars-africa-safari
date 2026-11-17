import type { Metadata } from "next";
import LakeManyaraPage from "@/components/lake-manyara/LakeManyaraPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lake Manyara Safari: Lions, Wildlife and Packages",
  description: "Plan a Lake Manyara National Park safari from Arusha. Compare day trips and overnight packages with private 4x4 and full itineraries.",
  path: "/safaris/lake-manyara",
  image: "/images/lake-manyara/hero.jpg",
});

export default function LakeManyaraDestinationPage() {
  return <LakeManyaraPage />;
}
