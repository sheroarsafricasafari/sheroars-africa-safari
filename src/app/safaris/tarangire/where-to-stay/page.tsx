import type { Metadata } from "next";
import { TarangireStayPage } from "@/components/tarangire/TarangirePages";
import { tarangireStayPage } from "@/data/tarangire-stays";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  ...tarangireStayPage.metadata,
  path: tarangireStayPage.path,
  absoluteTitle: true,
});

export default function Page() {
  return <TarangireStayPage />;
}
