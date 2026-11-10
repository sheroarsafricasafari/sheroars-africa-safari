import { existsSync } from "node:fs";
import path from "node:path";

export function resolvePublicImage(src: string, fallback?: string) {
  const imagePath = path.join(process.cwd(), "public", src.replace(/^\/+/, ""));
  if (existsSync(imagePath)) return src;
  return fallback ?? src;
}

export function getExistingPublicImage(src: string) {
  const imagePath = path.join(process.cwd(), "public", src.replace(/^\/+/, ""));
  return existsSync(imagePath) ? src : undefined;
}
