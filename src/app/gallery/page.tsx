import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Gallery | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Gallery" path="/gallery" section="Main" />
  );
}
