import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Northern Circuit Route | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Northern Circuit Route" path="/kilimanjaro/routes/northern-circuit" section="Kilimanjaro" />
  );
}
