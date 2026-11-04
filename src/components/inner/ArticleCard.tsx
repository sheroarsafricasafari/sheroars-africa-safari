import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: article title, category, excerpt, href, image, and className.
type ArticleCardProps = {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image: { src: string; alt: string };
  className?: string;
};

export default function ArticleCard({ title, category, excerpt, href, image, className }: ArticleCardProps) {
  return (
    <Link href={href} className={cn("group block overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="img-zoom relative aspect-[16/10] bg-sand"><SmartImage src={image.src} alt={image.alt} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover" /></div>
      <div className="p-5">
        <p className="text-eyebrow text-terracotta">{category}</p>
        <h3 className="mt-2 line-clamp-2 font-heading text-h3 text-earth">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-terracotta">Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
