import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";
type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-white hover:bg-terracotta-hover",
  secondary: "border border-terracotta text-terracotta hover:bg-terracotta hover:text-white",
  light: "bg-cream text-forest hover:bg-white",
  "outline-light": "border border-white/75 text-white hover:bg-white/10",
  ghost: "text-terracotta hover:bg-terracotta/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: ButtonProps) {
  const classes = twMerge(
    clsx("inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200", variants[variant], sizes[size], className),
  );
  if (href) {
    return <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</Link>;
  }
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
