type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  id,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${tone === "light" ? "text-gold" : "text-terracotta"}`}>
        {eyebrow}
      </p>
      <h2 id={id} className={`text-3xl leading-tight sm:text-4xl md:text-5xl ${tone === "light" ? "text-cream" : "text-earth"}`}>
        {title}
      </h2>
      {subtitle ? <p className={`mt-4 text-base leading-7 md:text-lg ${tone === "light" ? "text-cream/80" : "text-muted"}`}>{subtitle}</p> : null}
    </div>
  );
}
