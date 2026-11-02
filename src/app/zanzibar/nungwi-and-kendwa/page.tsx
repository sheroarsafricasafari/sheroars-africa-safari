import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Nungwi and Kendwa | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Nungwi and Kendwa" path="/zanzibar/nungwi-and-kendwa" section="Zanzibar" />
  );
}
