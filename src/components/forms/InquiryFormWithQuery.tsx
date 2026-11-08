"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getAllSerengetiPackages } from "@/lib/serengeti-packages";
import { getAllPackages } from "@/data";
import type { InquiryFormValues } from "@/types/inquiry";
import InquiryForm from "./InquiryForm";

const monthNames = new Set([
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]);
const packageSlugs = new Set([
  ...getAllPackages().map(({ slug }) => slug),
  ...getAllSerengetiPackages().map(({ slug }) => slug),
]);

export default function InquiryFormWithQuery() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const initialValues = useMemo<Partial<InquiryFormValues>>(() => {
    const params = new URLSearchParams(query);
    const slug = params.get("package") ?? "";
    const travellers = Number(params.get("adults"));
    const month = params.get("month") ?? "";
    const travelersType = params.get("travelersType") ?? "";
    const accommodation = params.get("accommodation") ?? "";

    return {
      ...(packageSlugs.has(slug) ? { package: slug, interest: "Safari" } : {}),
      ...(Number.isInteger(travellers) && travellers > 0 && travellers <= 8 ? { adults: String(travellers) } : {}),
      ...(monthNames.has(month) ? { month } : {}),
      ...(new Set(["Solo", "Couple", "Friends", "Family", "Group"]).has(travelersType) ? { travelersType } : {}),
      ...(new Set(["Camping", "Mid-range", "Comfortable lodges", "Luxury"]).has(accommodation) ? { accommodation } : {}),
      ...(params.get("type") === "Safari" ? { interest: "Safari" } : {}),
    };
  }, [query]);

  return <InquiryForm key={query} variant="plan" initialValues={initialValues} />;
}
