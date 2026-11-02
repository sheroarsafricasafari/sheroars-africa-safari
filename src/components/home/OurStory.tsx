import { Check } from "lucide-react";
import { storyContent } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

export default function OurStory() {
  return (
    <Container>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-xl pb-10 pr-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
            <SmartImage src="/images/home/about-main.avif" alt="A woman guide exploring Tanzania's wild landscape" sizes="(max-width: 1024px) 90vw, 45vw" fill className="object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-[4/3] w-1/2 overflow-hidden rounded-2xl border-8 border-sand shadow-lg">
            <SmartImage src="/images/home/about-secondary.jpg" alt="A warm welcome on a Tanzanian journey" sizes="(max-width: 1024px) 45vw, 22vw" fill className="object-cover" />
          </div>
          <div className="absolute left-0 top-7 rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-wide text-forest shadow-lg">Women-Led · Tanzania-Based</div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={storyContent.eyebrow} title={storyContent.title} align="left" />
          {storyContent.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 leading-7 text-muted">{paragraph}</p>)}
          <ul className="my-6 grid gap-3">
            {storyContent.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm font-medium"><Check aria-hidden="true" className="size-5 shrink-0 text-terracotta" /><span>{highlight}</span></li>)}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button href="/team">Meet the Roarers</Button>
            <Button href="/about" variant="ghost">Read Our Story</Button>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
