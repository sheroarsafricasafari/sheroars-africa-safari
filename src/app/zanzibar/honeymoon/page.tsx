import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Zanzibar Honeymoon | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Zanzibar Honeymoon" path="/zanzibar/honeymoon" section="Zanzibar" />
  );
}
