import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Plan Your Safari | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Plan Your Safari" path="/plan-your-safari" section="Main" />
  );
}
