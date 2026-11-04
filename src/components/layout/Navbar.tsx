"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";
import { useNavbarTheme } from "@/components/layout/NavbarTheme";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(pathname !== "/");
  const { hasHero } = useNavbarTheme();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpenAt, setMobileOpenAt] = useState<string | null>(null);
  const mobileOpen = mobileOpenAt === pathname;
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, hasHero]);

  useEffect(() => {
    const closeOnHistoryNavigation = () => setMobileOpenAt(null);
    window.addEventListener("popstate", closeOnHistoryNavigation);
    return () => window.removeEventListener("popstate", closeOnHistoryNavigation);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>("a, button, summary");
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpenAt(null);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const hasTransparentHero = pathname === "/" || hasHero;
  const solid = !hasTransparentHero || scrolled;

  return (
    <nav aria-label="Main navigation" className={`sticky top-0 z-50 -mb-[78px] transition-colors duration-300 ${solid ? "bg-cream/95 text-earth shadow-sm backdrop-blur-md" : "bg-transparent text-white"}`}>
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo light={!solid} />
        <div className="hidden items-center gap-4 lg:flex">
          {navigation.map((item) => item.children ? (
            <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.label)} onMouseLeave={() => setOpenMenu(null)}>
              <button
                type="button"
                aria-expanded={openMenu === item.label}
                aria-haspopup="true"
                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                onFocus={() => setOpenMenu(item.label)}
                className={`inline-flex items-center gap-1 py-3 text-[13px] font-semibold hover:text-terracotta ${isActive(item.href) ? "text-terracotta" : ""}`}
              >
                {item.label}<ChevronDown size={14} />
              </button>
              {openMenu === item.label ? (
                <div className="absolute left-0 top-full min-w-56 rounded-xl border border-sand bg-cream p-2 text-earth shadow-xl" role="menu">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} role="menuitem" aria-current={isActive(child.href) ? "page" : undefined} onClick={() => setOpenMenu(null)} className={`block rounded-lg px-3 py-2.5 text-sm hover:bg-sand ${isActive(child.href) ? "font-bold text-terracotta" : ""}`}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`text-[13px] font-semibold hover:text-terracotta ${isActive(item.href) ? "text-terracotta" : ""}`}>{item.label}</Link>
          ))}
          <Button href="/plan-your-safari" size="sm">Plan Your Safari</Button>
        </div>
        <button
          ref={triggerRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-current lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpenAt(mobileOpen ? null : pathname)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-earth/50 lg:hidden" onClick={(event) => {
          if (event.target === event.currentTarget) setMobileOpenAt(null);
        }}>
          <div id="mobile-navigation" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" className="ml-auto flex h-full w-[min(90%,420px)] flex-col overflow-y-auto bg-cream px-6 pb-8 pt-5 text-earth shadow-2xl">
            <div className="mb-7 flex items-center justify-between">
              <Logo />
              <button type="button" className="rounded-full p-2" aria-label="Close menu" onClick={() => setMobileOpenAt(null)}><X /></button>
            </div>
            <div className="divide-y divide-sand">
              {navigation.map((item) => (
                <div key={item.label} className="py-2">
                  {item.children ? (
                    <details>
                      <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-semibold">{item.label}<ChevronDown size={16} /></summary>
                      <div className="grid gap-1 pb-2 pl-4">
                        {item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setMobileOpenAt(null)} className={`rounded-md py-2 text-sm ${isActive(child.href) ? "font-bold text-terracotta" : "text-muted"}`}>{child.label}</Link>)}
                      </div>
                    </details>
                  ) : <Link href={item.href} onClick={() => setMobileOpenAt(null)} className={`block py-2 font-semibold ${isActive(item.href) ? "text-terracotta" : ""}`}>{item.label}</Link>}
                </div>
              ))}
            </div>
            <Button href="/plan-your-safari" className="mt-6 w-full" onClick={() => setMobileOpenAt(null)}>Plan Your Safari</Button>
            <div className="mt-auto grid gap-3 border-t border-sand pt-6 text-sm">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
              <a href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)}>WhatsApp</a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
