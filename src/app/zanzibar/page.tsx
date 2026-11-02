import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Zanzibar Beach Escapes | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Zanzibar Beach Escapes" path="/zanzibar" section="Zanzibar" />
  );
}
