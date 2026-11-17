import PackageCard from "@/components/inner/PackageCard";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { lakeManyaraPackages } from "@/data/lake-manyara-packages";

export default function LakeManyaraPackageLinks({ title = "Add a Lake Manyara safari" }: { title?: string }) {
  return (
    <section className="bg-sand py-16 sm:py-20" aria-labelledby="manyara-package-links-heading">
      <Container>
        <SectionHeading id="manyara-package-links-heading" eyebrow="LAKE MANYARA JOURNEYS" title={title} subtitle="Choose a day trip, an overnight escape or a slower wildlife and culture itinerary." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lakeManyaraPackages.map((item) => <PackageCard
            key={item.slug}
            slug={item.slug}
            title={item.title}
            days={item.days}
            parks={item.parks}
            summary={item.summary}
            priceFrom={item.pricing.priceFrom}
            image={{ src: item.cardImage, alt: item.cardAlt }}
            badge={item.badge}
          />)}
        </div>
      </Container>
    </section>
  );
}
