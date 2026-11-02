import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Giving Back | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Giving Back" path="/giving-back" section="Main" />
  );
}
