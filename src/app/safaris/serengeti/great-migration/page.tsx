import type { Metadata } from "next";
import GreatMigrationPage, { getGreatMigrationMetadata } from "@/components/destinations/GreatMigrationPage";
import { greatMigration } from "@/data/destinations/great-migration";

export const metadata: Metadata = getGreatMigrationMetadata(greatMigration);

export default function GreatMigrationRoute() {
  return <GreatMigrationPage data={greatMigration} />;
}
