"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

type SmartImageProps = {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function SmartImage({
  src,
  alt,
  sizes,
  fill = false,
  width = 900,
  height = 650,
  className = "",
  priority = false,
}: SmartImageProps) {
  const [unavailable, setUnavailable] = useState(false);

  if (!unavailable) {
    return fill ? (
      <Image src={src} alt={alt} fill sizes={sizes} className={className} priority={priority} onError={() => setUnavailable(true)} />
    ) : (
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className={className} priority={priority} onError={() => setUnavailable(true)} />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-terracotta via-gold to-forest text-white ${fill ? "absolute inset-0" : "aspect-[4/3]"} ${className}`}
    >
      <div className="flex max-w-[85%] flex-col items-center gap-2 text-center">
        <Camera aria-hidden="true" size={28} />
        <span className="font-heading text-lg">{alt}</span>
        <span className="break-all text-[10px] text-white/75">{src}</span>
      </div>
    </div>
  );
}
