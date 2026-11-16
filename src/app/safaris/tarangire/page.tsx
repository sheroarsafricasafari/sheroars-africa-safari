import type { Metadata } from "next";
import { TarangireHubPage } from "@/components/tarangire/TarangirePages";
import { tarangirePage } from "@/data/tarangire";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  ...tarangirePage.metadata,
  path: tarangirePage.path,
  absoluteTitle: true,
});

export default function Page() {
  return <TarangireHubPage />;
}
