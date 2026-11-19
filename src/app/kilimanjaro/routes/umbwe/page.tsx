import RoutePackagesPage from "@/components/kilimanjaro/route/RoutePackagesPage";
import { UMBWE_COPY } from "@/data/kilimanjaro-route-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: UMBWE_COPY.metadata.title,
  description: UMBWE_COPY.metadata.description,
  keywords: UMBWE_COPY.metadata.keywords,
  path: "/kilimanjaro/routes/umbwe",
  image: "/images/kilimanjaro/routes/umbwe/hero-sky.jpg",
});

export default function Page() {
  return <RoutePackagesPage route="umbwe" copy={UMBWE_COPY} />;
}
