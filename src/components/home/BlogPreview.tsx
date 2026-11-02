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
          <Reveal key={article.href} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
            <Link href={article.href}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage src={article.image} alt={article.title} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta">{article.category}</span>
                <h3 className="mt-2 font-heading text-2xl">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-terracotta">Read more <ArrowRight size={16} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/travel-guide" variant="secondary">More Travel Guides</Button></div>
    </Container>
  );
}
