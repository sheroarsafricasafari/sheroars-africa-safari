import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Where to Stay in Zanzibar | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Where to Stay in Zanzibar" path="/zanzibar/where-to-stay" section="Zanzibar" />
  );
}
