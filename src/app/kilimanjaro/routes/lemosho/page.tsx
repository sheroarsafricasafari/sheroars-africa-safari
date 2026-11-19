import RoutePackagesPage from "@/components/kilimanjaro/route/RoutePackagesPage";
import { LEMOSHO_COPY } from "@/data/kilimanjaro-route-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: LEMOSHO_COPY.metadata.title,
  description: LEMOSHO_COPY.metadata.description,
  keywords: LEMOSHO_COPY.metadata.keywords,
  path: "/kilimanjaro/routes/lemosho",
  image: "/images/kilimanjaro/routes/lemosho/hero-sky.jpg",
});

export default function LemoshoRoutePage() {
  return <RoutePackagesPage route="lemosho" copy={LEMOSHO_COPY} />;
}
