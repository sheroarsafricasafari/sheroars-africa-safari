import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";

// Props: eyebrow, title, lead paragraph, optional CTA, and className.
type SectionIntroProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  button?: { label: string; href: string };
  className?: string;
};

export default function SectionIntro({ eyebrow, title, paragraph, button, className }: SectionIntroProps) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <SectionHeading eyebrow={eyebrow} title={title} align="left" />
        <div className="max-w-2xl">
          <p className="text-lead">{paragraph}</p>
          {button ? <Button href={button.href} className="mt-6">{button.label}</Button> : null}
        </div>
      </Container>
    </section>
  );
}
