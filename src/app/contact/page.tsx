import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact Us | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Contact Us" path="/contact" section="Main" />
  );
}
