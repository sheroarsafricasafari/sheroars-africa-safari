import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "About Us | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="About Us" path="/about" section="Main" />
  );
}
