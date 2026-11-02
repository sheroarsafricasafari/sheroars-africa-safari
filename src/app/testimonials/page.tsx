import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Testimonials | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Testimonials" path="/testimonials" section="Main" />
  );
}
