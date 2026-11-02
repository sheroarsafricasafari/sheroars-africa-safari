import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Machame Route | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Machame Route" path="/kilimanjaro/routes/machame" section="Kilimanjaro" />
  );
}
