import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Props: article children, optional first-paragraph drop cap, and className.
type ProseProps = { children: ReactNode; dropCap?: boolean; className?: string };

export default function Prose({ children, dropCap = false, className }: ProseProps) {
  return (
    <article className={cn("prose max-w-prose text-[1.0625rem] leading-[1.8] text-earth sm:text-lg [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-h2 [&_h2]:leading-tight [&_h2]:text-earth [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-h3 [&_h3]:text-earth [&_p]:my-6 [&_ul]:my-6 [&_ol]:my-6 [&_li::marker]:text-terracotta [&_a]:text-terracotta [&_a]:underline [&_a]:decoration-terracotta/40 [&_a]:underline-offset-4 [&_a:hover]:text-terracotta-hover [&_blockquote]:my-8 [&_blockquote]:border-l-[3px] [&_blockquote]:border-gold [&_blockquote]:pl-6 [&_blockquote]:font-heading [&_blockquote]:text-xl [&_blockquote]:italic [&_hr]:mx-auto [&_hr]:my-12 [&_hr]:h-0.5 [&_hr]:w-14 [&_hr]:border-0 [&_hr]:bg-gold [&_figure]:my-8 [&_figure_img]:rounded-2xl [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted [&_table]:w-full [&_table]:border-collapse [&_th]:bg-forest [&_th]:p-3 [&_th]:text-left [&_th]:text-cream [&_td]:border-b [&_td]:border-sand [&_td]:p-3", dropCap ? "[&>p:first-of-type:first-letter]:float-left [&>p:first-of-type:first-letter]:mr-3 [&>p:first-of-type:first-letter]:mt-1 [&>p:first-of-type:first-letter]:font-heading [&>p:first-of-type:first-letter]:text-6xl [&>p:first-of-type:first-letter]:leading-none [&>p:first-of-type:first-letter]:text-terracotta" : "", className)}>
      {children}
    </article>
  );
}
