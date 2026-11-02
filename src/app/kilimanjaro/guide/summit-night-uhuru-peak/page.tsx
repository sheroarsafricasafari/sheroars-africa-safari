import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Summit Night and Uhuru Peak | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Summit Night and Uhuru Peak" path="/kilimanjaro/guide/summit-night-uhuru-peak" section="Kilimanjaro" />
  );
}
