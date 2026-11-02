import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Matemwe and Kigomani | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Matemwe and Kigomani" path="/zanzibar/matemwe-and-kigomani" section="Zanzibar" />
  );
}
