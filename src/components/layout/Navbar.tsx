"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, siteConfig, type NavItem } from "@/data/site";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";
import { useNavbarTheme } from "@/components/layout/NavbarTheme";

function getNestedMenu(item: NavItem, isActive: (href: string) => boolean) {
  return item.children?.find((child) => child.children && isActive(child.href))
    ?? item.children?.find((child) => child.children)
    ?? null;
}

function groupNavigation(items: NavItem[]) {
  return items.reduce<Array<{ title: string; items: NavItem[] }>>((groups, item) => {
    const title = item.group ?? "Explore";
    const current = groups.find((group) => group.title === title);
    if (current) current.items.push(item);
    else groups.push({ title, items: [item] });
    return groups;
  }, []);
}

function MobileNavItem({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  if (!item.children?.length) {
    return (
      <Link href={item.href} onClick={onNavigate} className={`block min-h-11 rounded-md py-2 text-sm ${isActive(item.href) ? "font-bold text-terracotta" : "text-muted"}`}>
        {item.label}
      </Link>
    );
  }

  const groupedChildren = item.children.some((child) => child.group);
  return (
    <details className="group/nav-item">
      <summary className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 font-semibold marker:hidden [&::-webkit-details-marker]:hidden ${isActive(item.href) ? "text-terracotta" : "text-earth"}`}>
        <span>{item.label}</span>
        <ChevronDown aria-hidden="true" size={16} className="shrink-0 transition-transform group-open/nav-item:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="grid gap-1 pb-3 pl-4">
        {groupedChildren
          ? groupNavigation(item.children).map((group) => (
            <div key={group.title} className="pt-2">
              <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-terracotta">{group.title}</p>
              {group.items.map((child) => (
                <MobileNavItem key={child.href} item={child} isActive={isActive} onNavigate={onNavigate} />
              ))}
            </div>
          ))
          : item.children.map((child) => (
            <MobileNavItem key={child.href} item={child} isActive={isActive} onNavigate={onNavigate} />
          ))}
      </div>
    </details>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { hasHero } = useNavbarTheme();
  const hasTransparentHero = pathname === "/" || pathname === "/tanzania-safari" || hasHero;
  const [scrolled, setScrolled] = useState(pathname !== "/" && pathname !== "/tanzania-safari");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileOpenAt, setMobileOpenAt] = useState<string | null>(null);
  const mobileOpen = mobileOpenAt === pathname;
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const desktopTriggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const desktopMenuRef = useRef<HTMLDivElement>(null);

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
    const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a, button, summary") ?? [])
      .filter((element) => {
        const closedParent = element.closest("details:not([open])");
        return !closedParent || element === closedParent.querySelector("summary");
      });
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
  const solid = !hasTransparentHero || scrolled;
  const openDesktopMenu = (item: NavItem) => {
    setOpenMenu(item.label);
    setActiveSubmenu(getNestedMenu(item, isActive)?.label ?? null);
  };

  return (
    <nav aria-label="Main navigation" className={`sticky top-0 z-50 -mb-[78px] transition-colors duration-300 ${solid ? "bg-cream/95 text-earth shadow-sm backdrop-blur-md" : "bg-transparent text-white"}`}>
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo light={!solid} />
        <div className="hidden items-center gap-4 lg:flex">
          {navigation.map((item) => item.children ? (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => openDesktopMenu(item)}
              onMouseLeave={() => setOpenMenu(null)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpenMenu(null);
                  desktopTriggerRefs.current.get(item.label)?.focus();
                }
                if (event.key === "ArrowDown" && event.target === desktopTriggerRefs.current.get(item.label)) {
                  event.preventDefault();
                  desktopMenuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
                }
              }}
            >
              <button
                ref={(node) => {
                  if (node) desktopTriggerRefs.current.set(item.label, node);
                  else desktopTriggerRefs.current.delete(item.label);
                }}
                type="button"
                aria-expanded={openMenu === item.label}
                aria-haspopup="true"
                aria-controls={`desktop-menu-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => openDesktopMenu(item)}
                onFocus={() => openDesktopMenu(item)}
                className={`inline-flex items-center gap-1 py-3 text-[13px] font-semibold hover:text-terracotta ${isActive(item.href) ? "text-terracotta" : ""}`}
              >
                {item.label}<ChevronDown size={14} />
              </button>
              {openMenu === item.label ? (
                item.children.some((child) => child.children?.length) ? (
                  <div
                    id={`desktop-menu-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                    ref={desktopMenuRef}
                    className="absolute left-0 top-full z-50 grid w-[min(680px,calc(100vw-2rem))] grid-cols-[190px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-sand/70 bg-cream/80 text-earth shadow-2xl backdrop-blur-xl"
                  >
                    <div className="border-r border-sand/70 bg-white/35 p-3">
                      <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">Explore Tanzania</p>
                      <ul className="grid gap-1">
                        {item.children.map((child) => {
                          const nested = Boolean(child.children?.length);
                          const selected = nested && activeSubmenu === child.label;
                          return (
                            <li key={child.href}>
                              {nested ? (
                                <button
                                  type="button"
                                  aria-expanded={selected}
                                  aria-controls="serengeti-pages-menu"
                                  onMouseEnter={() => setActiveSubmenu(child.label)}
                                  onFocus={() => setActiveSubmenu(child.label)}
                                  onClick={() => setActiveSubmenu(child.label)}
                                  className={`flex min-h-10 w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${selected ? "bg-forest text-cream" : "text-earth hover:bg-sand"}`}
                                >
                                  <span>{child.label}</span>
                                  <ChevronDown aria-hidden="true" size={15} className="-rotate-90 shrink-0" />
                                </button>
                              ) : (
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className={`block min-h-10 rounded-xl px-2.5 py-2 text-sm font-semibold transition-colors hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${isActive(child.href) ? "text-terracotta" : "text-earth"}`}
                                >
                                  {child.label}
                                  {child.description ? <span className="mt-1 block text-xs font-normal leading-5 text-muted">{child.description}</span> : null}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div id="serengeti-pages-menu" className="min-w-0 p-4 sm:p-5">
                      {item.children.filter((child) => child.children?.length).map((child) => {
                        if (child.label !== activeSubmenu || !child.children) return null;
                        return (
                          <section key={child.href} aria-label={`${child.label} pages`}>
                            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-sand/70 pb-3">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">Discover</p>
                                <h2 className="mt-1 font-heading text-xl text-earth">{child.label}</h2>
                                <p className="mt-1 max-w-md text-xs leading-4 text-muted">{child.description}</p>
                              </div>
                              <Link href={child.href} onClick={() => setOpenMenu(null)} className="inline-flex min-h-10 items-center rounded-full border border-forest px-3 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
                                Serengeti overview
                              </Link>
                            </div>
                            <div className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                              {groupNavigation(child.children).map((group) => (
                                <div key={group.title}>
                                  <h3 className="mb-0.5 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-terracotta">{group.title}</h3>
                                  <ul className="grid">
                                    {group.items.map((page) => (
                                      <li key={page.href}>
                                        <Link
                                          href={page.href}
                                          aria-current={isActive(page.href) ? "page" : undefined}
                                          onClick={() => setOpenMenu(null)}
                                          className={`flex min-h-9 items-center rounded-lg px-2 text-sm transition-colors hover:bg-sand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${isActive(page.href) ? "font-semibold text-terracotta" : "text-earth"}`}
                                        >
                                          {page.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </section>
                        );
                      })}
                      {!item.children.some((child) => child.label === activeSubmenu && child.children?.length) ? (
                        <div className="flex h-full min-h-40 flex-col justify-center rounded-xl bg-sand/45 p-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">Thoughtful journeys, across Tanzania</p>
                          <p className="mt-2 max-w-md font-heading text-2xl text-earth">Find the landscape that feels like yours.</p>
                          <Link href="/safaris/packages" onClick={() => setOpenMenu(null)} className="mt-4 inline-flex min-h-11 w-fit items-center rounded-full bg-forest px-4 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">Browse safari packages</Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div id={`desktop-menu-${item.label.toLowerCase().replaceAll(" ", "-")}`} className="absolute left-0 top-full min-w-56 rounded-xl border border-sand/70 bg-cream/80 p-2 text-earth shadow-xl backdrop-blur-xl">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} aria-current={isActive(child.href) ? "page" : undefined} onClick={() => setOpenMenu(null)} className={`block min-h-11 rounded-lg px-3 py-2.5 text-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta ${isActive(child.href) ? "font-bold text-terracotta" : ""}`}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )
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
                  <MobileNavItem item={item} isActive={isActive} onNavigate={() => setMobileOpenAt(null)} />
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
