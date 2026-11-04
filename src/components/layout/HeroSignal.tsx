"use client";

import { useEffect } from "react";
import { useNavbarTheme } from "@/components/layout/NavbarTheme";

// Props: none; signals that the current route includes a dark PageHero.
export default function HeroSignal() {
  const { setHasHero } = useNavbarTheme();
  useEffect(() => {
    setHasHero(true);
    return () => setHasHero(false);
  }, [setHasHero]);
  return null;
}
