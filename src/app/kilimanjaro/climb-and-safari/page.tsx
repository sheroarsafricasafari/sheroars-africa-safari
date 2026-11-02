import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Climb and Safari | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Climb and Safari" path="/kilimanjaro/climb-and-safari" section="Kilimanjaro" />
  );
}
