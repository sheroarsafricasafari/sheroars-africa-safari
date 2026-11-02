import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="She Roars Africa Safari home" className={`inline-flex flex-col leading-none ${light ? "text-cream" : "text-earth"}`}>
      <span className="font-heading text-2xl font-semibold tracking-tight">She Roars</span>
      <span className="mt-1 text-[9px] font-bold tracking-[0.3em]">AFRICA SAFARI</span>
    </Link>
  );
}
