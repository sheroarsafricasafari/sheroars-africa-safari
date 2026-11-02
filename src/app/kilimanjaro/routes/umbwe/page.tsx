import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Umbwe Route | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Umbwe Route" path="/kilimanjaro/routes/umbwe" section="Kilimanjaro" />
  );
}
