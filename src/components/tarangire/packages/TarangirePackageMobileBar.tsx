"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TarangirePackageMobileBar({
  item,
  targetId = "package-book",
}: {
  item: { pricing: { priceFrom: number } };
  targetId?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-earth/10 bg-cream/95 p-3 shadow-soft backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <p className="text-sm font-bold text-earth">From ${item.pricing.priceFrom.toLocaleString("en-US")} <span className="font-normal text-muted">per person</span></p>
        <Link href="#prices" className="inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 text-sm font-bold text-white hover:bg-terracotta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-earth">Enquire</Link>
      </div>
    </div>
  );
}
