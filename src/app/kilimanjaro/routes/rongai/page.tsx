import RoutePackagesPage from "@/components/kilimanjaro/route/RoutePackagesPage";
import { RONGAI_COPY } from "@/data/kilimanjaro-route-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: RONGAI_COPY.metadata.title,
  description: RONGAI_COPY.metadata.description,
  keywords: RONGAI_COPY.metadata.keywords,
  path: "/kilimanjaro/routes/rongai",
  image: "/images/kilimanjaro/routes/rongai/hero-sky.jpg",
});

export default function Page() {
  return <RoutePackagesPage route="rongai" copy={RONGAI_COPY} />;
}
