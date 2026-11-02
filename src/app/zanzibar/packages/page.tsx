import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Zanzibar Beach Packages | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Zanzibar Beach Packages" path="/zanzibar/packages" section="Zanzibar" />
  );
}
