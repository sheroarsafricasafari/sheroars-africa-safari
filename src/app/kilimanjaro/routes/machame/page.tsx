import RoutePackagesPage from "@/components/kilimanjaro/route/RoutePackagesPage";
import { MACHAME_COPY } from "@/data/kilimanjaro-route-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: MACHAME_COPY.metadata.title,
  description: MACHAME_COPY.metadata.description,
  keywords: MACHAME_COPY.metadata.keywords,
  path: "/kilimanjaro/routes/machame",
  image: "/images/kilimanjaro/routes/machame/hero-sky.jpg",
});

export default function MachameRoutePage() {
  return <RoutePackagesPage route="machame" copy={MACHAME_COPY} />;
}
