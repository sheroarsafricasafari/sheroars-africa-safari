import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

// Props: local image list with meaningful alt text, and className.
type GalleryStripProps = {
  images: { src: string; alt: string }[];
  className?: string;
};

export default function GalleryStrip({ images, className }: GalleryStripProps) {
  return (
    <div className={cn("flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:overflow-visible", className)}>
      {images.map((image) => (
        <div key={image.src} className="img-zoom relative aspect-[4/3] min-w-[78%] snap-start rounded-xl bg-sand md:min-w-0">
          <SmartImage src={image.src} alt={image.alt} sizes="(max-width: 768px) 80vw, 25vw" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
