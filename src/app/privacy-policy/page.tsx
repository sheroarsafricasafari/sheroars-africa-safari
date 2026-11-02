import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Privacy Policy" path="/privacy-policy" section="Main" />
  );
}
