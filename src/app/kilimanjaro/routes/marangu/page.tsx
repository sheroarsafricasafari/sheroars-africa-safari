import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Marangu Route | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Marangu Route" path="/kilimanjaro/routes/marangu" section="Kilimanjaro" />
  );
}
