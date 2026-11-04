import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { cn } from "@/lib/cn";

// Props: two to four related link cards and optional className.
type RelatedLinksProps = {
  items: { title: string; description: string; href: string }[];
  className?: string;
};

export default function RelatedLinks({ items, className }: RelatedLinksProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="mb-7 font-heading text-h2">Continue Exploring</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
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
