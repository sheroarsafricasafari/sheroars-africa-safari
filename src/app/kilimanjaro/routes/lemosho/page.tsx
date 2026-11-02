import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Lemosho Route | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Lemosho Route" path="/kilimanjaro/routes/lemosho" section="Kilimanjaro" />
  );
}
