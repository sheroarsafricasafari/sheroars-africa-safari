import Link from "next/link";
import { Expand } from "lucide-react";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

const galleryImages = [
  { src: "/images/gallery/serengeti-plains.webp", alt: "Wildlife on the Serengeti plains", layout: "md:col-span-2 md:row-span-2" },
  { src: "/images/gallery/ngorongoro-landscape.jpg", alt: "A view across the Ngorongoro landscape", layout: "" },
  { src: "/images/gallery/tanzania-savanna.jpg", alt: "A close view of Tanzania's savanna", layout: "" },
  { src: "/images/gallery/mountain-sunrise.jpeg", alt: "Sunrise over the mountains", layout: "md:row-span-2" },
  { src: "/images/gallery/elephant.jpeg", alt: "An elephant in its natural habitat", layout: "" },
  { src: "/images/gallery/zanzibar-coast.avif", alt: "A quiet moment by the ocean", layout: "" },
  { src: "/images/gallery/highland-trail.jpg", alt: "A trail through Tanzania's highlands", layout: "md:col-span-2" },
  { src: "/images/gallery/golden-savanna.jpg", alt: "Golden evening light across the landscape", layout: "" },
];

export default function GalleryPreview() {
  return (
    <Container>
      <SectionHeading {...homeCopy.galleryHeading} />
      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4">
        {galleryImages.map((image) => (
          <Reveal key={image.src} className={`group relative overflow-hidden rounded-xl bg-sand ${image.layout}`}>
            <Link href="/gallery" aria-label={`View gallery: ${image.alt}`} className="absolute inset-0">
              <SmartImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 50vw, 25vw" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-earth/0 transition-colors group-hover:bg-earth/35"><Expand aria-hidden="true" className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" /><span className="sr-only">Open the full gallery</span></span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-9 text-center"><Button href="/gallery" variant="secondary">View Full Gallery</Button></div>
    </Container>
  );
}
