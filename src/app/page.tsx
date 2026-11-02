import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Home | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Home" path="/" section="Home" />
  );
}
