import { steps, homeCopy } from "@/data/home";
import Icon from "@/components/home/Icon";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HowItWorks() {
  return (
    <Container>
      <SectionHeading {...homeCopy.howHeading} />
      <div className="relative grid gap-7 md:grid-cols-2 lg:grid-cols-4">
        <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-gold lg:block" />
        {steps.map((step) => (
          <Reveal key={step.number} className="relative rounded-2xl bg-cream p-5 text-center sm:p-6">
            <span className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full border-4 border-cream bg-gold font-heading text-2xl text-forest shadow-sm">{step.number}</span>
            <Icon name={step.icon} className="mx-auto mt-5 size-6 text-terracotta" aria-hidden={true} />
            <h3 className="mt-3 font-heading text-xl">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/plan-your-safari">Start Planning</Button></div>
    </Container>
  );
}
