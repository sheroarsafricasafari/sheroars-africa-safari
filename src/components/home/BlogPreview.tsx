import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPreview } from "@/data/blogPreview";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

export default function BlogPreview() {
  return (
    <Container>
      <SectionHeading {...homeCopy.blogHeading} />
      <div className="grid gap-6 md:grid-cols-3">
        {blogPreview.map((article) => (
          <Reveal key={article.href} className="h-full">
            <Link
              href={article.href}
              className="group relative flex aspect-[4/5] min-h-[28rem] h-full flex-col overflow-hidden rounded-2xl bg-forest text-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <SmartImage
                src={article.image}
                alt={article.title}
                sizes="(max-width: 768px) 100vw, 33vw"
                fill
                className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/25 to-transparent" />
              <span className="relative mt-auto p-5 sm:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">{article.category}</span>
                <h3 className="mt-2 font-heading text-2xl text-white">{article.title}</h3>
                <span className="mt-2 block text-sm leading-6 text-white/90">{article.excerpt}</span>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold">Read more <ArrowRight aria-hidden="true" size={16} /></span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/travel-guide" variant="secondary">More Travel Guides</Button></div>
    </Container>
  );
}
