import type { Metadata } from "next";
import HotAirBalloonPage from "@/components/destinations/HotAirBalloonPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Serengeti Hot Air Balloon Safari | Sunrise Balloon Experience",
  description: "Experience the Serengeti from above on a sunrise hot air balloon safari. Discover what happens during the flight, seasonal launch areas, the Great Migration, bush breakfasts and how to plan your adventure.",
  path: "/safaris/serengeti/hot-air-balloon",
  image: "/images/destinations/serengeti/hot-air-balloon/hero.jpg",
});

export default function Page() {
  return <HotAirBalloonPage />;
}
