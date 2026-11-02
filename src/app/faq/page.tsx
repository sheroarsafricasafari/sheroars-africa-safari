import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Frequently Asked Questions" path="/faq" section="Main" />
  );
}
