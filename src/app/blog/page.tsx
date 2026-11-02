import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Blog | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Blog" path="/blog" section="Blog" />
  );
}
