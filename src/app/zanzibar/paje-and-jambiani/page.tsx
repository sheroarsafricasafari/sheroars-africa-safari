import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Paje and Jambiani | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Paje and Jambiani" path="/zanzibar/paje-and-jambiani" section="Zanzibar" />
  );
}
