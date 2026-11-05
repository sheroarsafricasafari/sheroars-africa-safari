import dynamic from "next/dynamic";
import { getAllPackages } from "@/data";

const PackagesCarouselView = dynamic(
  () => import("@/components/destinations/PackagesCarousel").then((module) => module.PackagesCarouselView),
  { ssr: true, loading: () => <div className="min-h-72 rounded-3xl bg-sand" aria-hidden="true" /> },
);

// Props: park/tag filter and the heading and subtitle shown above the matching package carousel.
export default function PackagesCarousel({ park, tag, title, subtitle }: { park?: string; tag?: string; title: string; subtitle: string }) {
  const packages = getAllPackages().filter((item) => (!park || item.parks.includes(park)) && (!tag || item.tags.includes(tag)));
  if (packages.length === 0) return null;
  return <PackagesCarouselView packages={packages} title={title} subtitle={subtitle} />;
}
