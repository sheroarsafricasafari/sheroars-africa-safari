import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Thank You | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Thank You" path="/thank-you" section="Main" />
  );
}
