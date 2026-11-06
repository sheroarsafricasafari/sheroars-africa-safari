import Link from "next/link";
import {
  ArrowDown, ArrowRight, Binoculars, Camera, Coffee, Heart, Moon, ShieldCheck, Sun, Sunrise, Users,
} from "lucide-react";
import FeaturedCarousel from "@/components/safaris/FeaturedCarousel";
import MigrationExplorer from "@/components/safaris/MigrationExplorer";
import ParkSelector from "@/components/safaris/ParkSelector";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import CtaBanner from "@/components/inner/CtaBanner";
import FaqAccordion from "@/components/inner/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import TiltCard from "@/components/motion/TiltCard";
import MagneticButton from "@/components/motion/MagneticButton";
import Marquee from "@/components/motion/Marquee";
import Parallax from "@/components/motion/Parallax";
import SplitReveal from "@/components/motion/SplitReveal";
import DrawPath from "@/components/motion/DrawPath";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import HeroSignal from "@/components/layout/HeroSignal";
import { safariHub } from "@/data/safariHub";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const description = "Tailor-made Tanzania safaris to the Serengeti, Ngorongoro Crater, Tarangire and Lake Manyara. Explore our journeys, the Great Migration calendar and plan your trip with a women-led team.";

export const metadata = buildMetadata({
  title: "Tanzania Safaris: Serengeti, Ngorongoro, Tarangire and Lake Manyara",
  description,
  path: "/safaris",
  image: "/images/safaris/hub/hero.jpg",
});

const wildlifeIcons = [Sunrise, Coffee, Sun, Binoculars, Camera, Moon];
const wildlifeOneLiners = [
  "Women-led, welcoming to all",
  "Safety-conscious planning",
  "Itineraries shaped around you",
  "Responsible and ethical travel",
];
const chooseUsIcons = [Heart, ShieldCheck, Camera, Users];

export default function SafarisPage() {
  const breadcrumbItems = [{ title: "Home", href: "/" }, { title: "Safaris", href: "/safaris" }];
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Tanzania Safaris",
        description,
        url: `${siteConfig.url}/safaris`,
        mainEntity: { "@type": "ItemList", itemListElement: safariHub.parks.map((park, index) => ({ "@type": "ListItem", position: index + 1, name: park.name, url: new URL(park.href, siteConfig.url).toString() })) },
      }} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: safariHub.hubFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      }} />

      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-forest text-white">
        <HeroSignal />
        <Parallax className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-[6%] inset-x-0">
            <SmartImage src="/images/safaris/hub/hero.jpg" alt="Golden evening light across the Serengeti plains" sizes="100vw" fill priority className="object-cover" />
          </div>
        </Parallax>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-earth/80 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/85 via-earth/20 to-transparent" />
        <Container className="relative w-full pb-20 pt-36 md:pb-28">
          <div className="mx-auto max-w-4xl text-center md:mx-0 md:text-left">
            <Breadcrumbs items={breadcrumbItems} tone="light" />
            <p className="mt-8 text-eyebrow text-gold">THE NORTHERN CIRCUIT</p>
            <h1 className="mt-4 font-heading text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl"><SplitReveal text="Tanzania Safaris, Beautifully Tailor-Made" /></h1>
            <div className="gold-rule mx-auto mb-5 mt-6 md:mx-0" />
            <p className="mx-auto max-w-2xl text-lg leading-8 text-cream/90 md:mx-0">From the endless plains of the Serengeti to the floor of Ngorongoro Crater, we shape every journey around you: your pace, your interests, your dream.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <MagneticButton><Button href="/safaris/packages" size="lg">View Safari Packages</Button></MagneticButton>
              <MagneticButton><Button href="/plan-your-safari" variant="outline-light" size="lg">Plan My Safari</Button></MagneticButton>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
              {["Tailor-made", "Private vehicles", "Led by women, welcoming to all"].map((item) => <span key={item} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">{item}{item === "Private vehicles" ? <span className="sr-only"> TODO(CONFIRM): verify private vehicles are available on all journeys.</span> : null}</span>)}
            </div>
          </div>
        </Container>
        <a href="#why-tanzania" aria-label="Scroll to explore Tanzania safaris" className="absolute bottom-7 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/60 text-white motion-safe:animate-bounce motion-reduce:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
          <ArrowDown aria-hidden="true" size={18} />
        </a>
      </section>

      <section id="why-tanzania" className="overflow-hidden bg-cream py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div><p className="text-eyebrow text-terracotta">WHY TANZANIA</p><h2 className="mt-3 font-heading text-4xl leading-tight text-earth sm:text-5xl">The Greatest Show on Earth, Planned Around You</h2></div>
            <div><p className="text-lg leading-8 text-muted">Tanzania&apos;s Northern Circuit brings together four extraordinary places: the Serengeti, the Ngorongoro Crater, Tarangire and Lake Manyara. Each is different, and together they offer some of the best wildlife viewing on the planet. Our team designs your route, pace and stays so that you see the best of each without feeling rushed.</p><p className="mt-4 text-sm text-muted">New to Tanzania? <Link href="/tanzania-safari" className="font-semibold text-terracotta underline underline-offset-4">Start with our Tanzania safari overview</Link>.</p><Link href="/plan-your-safari" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4">Talk to a safari planner<ArrowRight aria-hidden="true" size={17} /></Link></div>
          </div>
          <Marquee className="mt-16 border-y border-earth/10 py-5" items={["Lion", "Elephant", "Leopard", "Buffalo", "Cheetah", "Giraffe", "Zebra", "Wildebeest", "Hippo", "Flamingo"].flatMap((animal) => [
            <span key={animal} className="font-heading text-3xl text-earth/40 sm:text-4xl">{animal}</span>,
            <span key={`${animal}-diamond`} aria-hidden="true" className="text-gold">◆</span>,
          ])} />
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="FOUR ICONIC PLACES" title="Where Would You Like to Roam?" />
          <ParkSelector parks={safariHub.parks} />
        </Container>
      </section>

      <section id="migration" className="bg-forest py-20 text-cream md:py-28">
        <Container>
          <SectionHeading eyebrow="THE GREAT MIGRATION" title="Where Are the Herds, Month by Month?" subtitle="The herds move year-round with the rains. Choose a month to see where the action is likely to be." tone="light" />
          <MigrationExplorer migration={safariHub.migration} />
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="SIGNATURE JOURNEYS" title="Safaris Designed to Make You Roar" />
          <FeaturedCarousel packages={safaris} />
          <div className="mt-10 text-center"><Button href="/safaris/packages" variant="secondary">View All Safari Packages</Button></div>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="TRAVEL YOUR WAY" title="A Safari for Every Kind of Traveler" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {safariHub.styles.map((style) => (
              <TiltCard key={style.title} className="group">
                <Link href={style.href} className="relative block min-h-72 overflow-hidden rounded-3xl bg-forest text-white shadow-card focus-visible:outline focus-visible:outline-4 focus-visible:outline-terracotta">
                  <SmartImage src={style.image} alt={style.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6"><span className="block font-heading text-2xl">{style.title}</span><span className="mt-2 block text-sm leading-6 text-white/85">{style.description}</span><span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold">Explore<ArrowRight aria-hidden="true" size={17} /></span></span>
                </Link>
              </TiltCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="WHAT TO EXPECT" title="A Day in the Wild" />
          <div className="relative hidden lg:block">
            <DrawPath d="M83 60 H917" className="absolute left-0 top-4 h-5 w-full text-gold" />
            <StaggerGroup className="relative grid grid-cols-6 gap-5" staggerChildren={0}>
              {safariHub.daySchedule.map((step, index) => {
                const Icon = wildlifeIcons[index];
                return <StaggerItem key={step.title} delay={0.12 + index * 0.32} spring><article className="h-full">
                  <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-gold bg-cream text-terracotta"><Icon aria-hidden="true" size={22} /></span>
                  <p className="mt-5 text-eyebrow text-terracotta">{step.timeOfDay}</p>
                  <h3 className="mt-2 font-heading text-xl text-earth">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
                </article></StaggerItem>;
              })}
            </StaggerGroup>
          </div>
          <div className="relative lg:hidden">
            <DrawPath d="M500 0 V120" className="absolute left-0 top-0 h-full w-8 text-gold" />
            <StaggerGroup className="relative grid gap-5 pl-12" staggerChildren={0}>
              {safariHub.daySchedule.map((step, index) => {
                const Icon = wildlifeIcons[index];
                return <StaggerItem key={step.title} delay={0.12 + index * 0.32} spring><article className="relative rounded-2xl border border-sand bg-white p-5 shadow-card">
                  <span aria-hidden="true" className="absolute -left-12 top-5 flex size-8 items-center justify-center rounded-full border-2 border-gold bg-cream text-terracotta"><Icon size={17} /></span>
                  <p className="text-eyebrow text-terracotta">{step.timeOfDay}</p>
                  <h3 className="mt-2 font-heading text-xl text-earth">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
                </article></StaggerItem>;
              })}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section className="bg-forest py-20 text-cream md:py-28">
        <Container>
          <SectionHeading eyebrow="WHO YOU MAY MEET" title="The Residents of the Savanna" tone="light" />
          <div className="grid auto-rows-[180px] gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {safariHub.wildlifeSpotlight.map((animal, index) => (
              <article key={animal.slug} tabIndex={0} className={`group relative isolate overflow-hidden rounded-2xl bg-earth focus-visible:outline focus-visible:outline-4 focus-visible:outline-gold ${index === 0 || index === 4 ? "sm:row-span-2" : ""}`}>
                <SmartImage src={animal.image} alt={animal.name} sizes="(max-width: 640px) 50vw, 20vw" fill className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4"><h3 className="font-heading text-2xl text-white">{animal.name}</h3><p className="mt-1 text-sm leading-5 text-white/85 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:max-h-20 sm:group-hover:opacity-100 sm:group-focus-within:max-h-20 sm:group-focus-within:opacity-100 motion-reduce:transition-none">{animal.text}</p></div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-cream/75">Wildlife is wild. We can never guarantee a sighting, but we do everything to give you the best chances.</p>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="WHY SHE ROARS" title="A Team That Makes Every Journey Matter" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wildlifeOneLiners.map((text, index) => {
              const Icon = chooseUsIcons[index];
              return <article key={text} className="rounded-2xl border border-sand bg-white p-6 shadow-card"><span className="flex size-11 items-center justify-center rounded-full bg-gold/15 text-terracotta"><Icon aria-hidden="true" size={20} /></span><h3 className="mt-4 font-heading text-xl text-earth">{text}</h3><p className="mt-2 text-sm leading-6 text-muted">{index === 0 ? "A company led by women, with a team that welcomes every traveler." : index === 1 ? "We plan with care and share practical guidance before you travel." : index === 2 ? "Your route, pace and stays are shaped around your priorities." : "We aim to support thoughtful travel and respectful wildlife viewing."}</p></article>;
            })}
          </div>
          <div className="mt-8 text-center"><Link href="/why-she-roars" className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline">Discover Why She Roars<ArrowRight aria-hidden="true" size={17} /></Link></div>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div><p className="text-eyebrow text-terracotta">GOOD TO KNOW</p><h2 className="mt-3 font-heading text-4xl text-earth sm:text-5xl">Safari Questions, Answered</h2><p className="mt-4 leading-7 text-muted">A few practical details to help you start planning with confidence.</p><Button href="/travel-guide" variant="secondary" className="mt-6">Read the Travel Guide</Button></div>
          <FaqAccordion items={safariHub.hubFaqs} />
        </Container>
      </section>

      <CtaBanner
        eyebrow="YOUR NEXT CHAPTER"
        title="Ready to Hear the Roar of the Serengeti?"
        description="Tell us your dates and dreams and we will design a safari that is entirely yours."
        image={{ src: "/images/safaris/hub/cta.jpg", alt: "The Serengeti at sunset" }}
        primaryCta={{ label: "Plan My Safari", href: "/plan-your-safari" }}
        secondaryCta={{ label: "Chat on WhatsApp", href: siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage) }}
        parallax
      />
    </main>
  );
}
