import RoutePackagesPage from "@/components/kilimanjaro/route/RoutePackagesPage";
import { NORTHERN_CIRCUIT_COPY } from "@/data/kilimanjaro-route-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: NORTHERN_CIRCUIT_COPY.metadata.title,
  description: NORTHERN_CIRCUIT_COPY.metadata.description,
  keywords: NORTHERN_CIRCUIT_COPY.metadata.keywords,
  path: "/kilimanjaro/routes/northern-circuit",
  image: "/images/kilimanjaro/routes/northern-circuit/hero-sky.jpg",
});

export default function Page() {
  return <RoutePackagesPage route="northern-circuit" copy={NORTHERN_CIRCUIT_COPY} />;
}
