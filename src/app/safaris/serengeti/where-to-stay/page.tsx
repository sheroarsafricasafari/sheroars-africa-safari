import type { Metadata } from "next";
import WhereToStayPage from "@/components/destinations/WhereToStayPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Where to Stay in Serengeti National Park | Safari Camps and Lodges",
  description: "Discover where to stay in Serengeti National Park. Compare safari lodges, luxury tented camps, mobile camps and campsites. Explore the best regions and choose the right accommodation for your Tanzania safari.",
  path: "/safaris/serengeti/where-to-stay",
  image: "/images/destinations/serengeti/where-to-stay/hero.jpg",
});

export default function Page() {
  return <WhereToStayPage />;
}
