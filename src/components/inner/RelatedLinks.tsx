import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/cn";

// Props: related link cards, an optional title, item limit and className.
type RelatedLinksProps = {
  items: { title: string; description: string; href: string }[];
  title?: string;
  className?: string;
  limit?: number;
};

export default function RelatedLinks({ items, title = "Continue Exploring", className, limit = 4 }: RelatedLinksProps) {
  return (
    <section aria-labelledby="related-links-heading" className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="related-links-heading" className="mb-7 font-heading text-h2">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, limit).map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <Compass aria-hidden="true" className="size-5 text-terracotta" />
              <h3 className="mt-4 font-heading text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              <ArrowRight aria-hidden="true" className="mt-4 size-4 text-terracotta transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
