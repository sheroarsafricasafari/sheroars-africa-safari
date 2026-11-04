import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { createBreadcrumbs } from "@/lib/routes";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

// Props: path is the current route; items may override generated crumbs; tone controls foreground contrast.
type BreadcrumbsProps = {
  path?: string;
  items?: { title: string; href: string }[];
  tone?: "light" | "dark";
  className?: string;
};

export default function Breadcrumbs({ path, items, tone = "dark", className }: BreadcrumbsProps) {
  const crumbs = items ?? createBreadcrumbs(path ?? "/");
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", tone === "light" ? "text-white/80" : "text-muted", className)}>
        <ol className="flex min-w-0 flex-wrap items-center gap-1.5">
          {crumbs.map((crumb, index) => {
            const current = index === crumbs.length - 1;
            return (
              <li key={`${crumb.href}-${index}`} className="flex min-w-0 items-center gap-1.5">
                {index > 0 ? <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 opacity-60" /> : null}
                {current ? (
                  <span aria-current="page" className="max-w-40 truncate font-medium sm:max-w-none">{crumb.title}</span>
                ) : (
                  <Link href={crumb.href} className="max-w-32 truncate hover:underline sm:max-w-none">{crumb.title}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
