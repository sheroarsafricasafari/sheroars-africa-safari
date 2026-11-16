import type { Metadata } from "next";
import { TarangireElephantsPage } from "@/components/tarangire/TarangirePages";
import { tarangireElephantsPage } from "@/data/tarangire-elephants-baobabs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  ...tarangireElephantsPage.metadata,
  path: tarangireElephantsPage.path,
  absoluteTitle: true,
});

export default function Page() {
  return <TarangireElephantsPage />;
}
