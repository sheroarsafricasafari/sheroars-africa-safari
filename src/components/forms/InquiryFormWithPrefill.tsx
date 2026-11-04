"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllPackages } from "@/data";
import type { FormType } from "@/lib/forms/submitInquiry";
import InquiryForm from "./InquiryForm";
import type { InquiryFormValues } from "@/types/inquiry";

const packages = getAllPackages();

function PrefilledForm({ variant }: { variant: FormType }) {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type")?.trim().toLowerCase();
  const mappedType = [
    "Safari", "Kilimanjaro Climb", "Zanzibar Beach Escape", "Day Trip",
    "Safari and Zanzibar", "Climb and Safari", "Not sure yet",
  ].find((item) => item.toLowerCase() === requestedType);
  const travelers = searchParams.get("travelers")?.trim().toLowerCase();
  const adults = travelers === "3 to 4" ? "3" : travelers === "5 or more" ? "5" : /^\d+$/.test(travelers ?? "") ? travelers : undefined;
  const rawPackage = searchParams.get("package") ?? "";
  const packageSlug = packages.some((item) => item.slug === rawPackage) ? rawPackage : "";
  const initialValues: Partial<InquiryFormValues> = {
    interest: mappedType,
    month: searchParams.get("month") ?? "",
    adults,
    package: packageSlug,
  };

  return <InquiryForm variant={variant} initialValues={initialValues} />;
}

export default function InquiryFormWithPrefill({ variant }: { variant: FormType }) {
  return (
    <Suspense fallback={<div className="min-h-48 animate-pulse rounded-3xl bg-white/70" aria-busy="true" aria-label="Loading inquiry form" />}>
      <PrefilledForm variant={variant} />
    </Suspense>
  );
}
