import RoutePackagesPage from "@/components/kilimanjaro/route/RoutePackagesPage";
import { MARANGU_COPY } from "@/data/kilimanjaro-route-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: MARANGU_COPY.metadata.title,
  description: MARANGU_COPY.metadata.description,
  keywords: MARANGU_COPY.metadata.keywords,
  path: "/kilimanjaro/routes/marangu",
  image: "/images/kilimanjaro/routes/marangu/hero-sky.jpg",
});

export default function MaranguRoutePage() {
  return <RoutePackagesPage route="marangu" copy={MARANGU_COPY} />;
}
