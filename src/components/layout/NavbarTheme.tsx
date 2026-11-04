"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type NavbarThemeValue = {
  hasHero: boolean;
  setHasHero: (value: boolean) => void;
};

const NavbarThemeContext = createContext<NavbarThemeValue | null>(null);

// Props: children is the shared application shell.
export function NavbarThemeProvider({ children }: { children: ReactNode }) {
  const [hasHero, setHeroState] = useState(false);
  const setHasHero = useCallback((value: boolean) => setHeroState(value), []);
  const value = useMemo(() => ({ hasHero, setHasHero }), [hasHero, setHasHero]);
  return <NavbarThemeContext.Provider value={value}>{children}</NavbarThemeContext.Provider>;
}

export function useNavbarTheme() {
  const context = useContext(NavbarThemeContext);
  if (!context) throw new Error("useNavbarTheme must be used within NavbarThemeProvider.");
  return context;
}

