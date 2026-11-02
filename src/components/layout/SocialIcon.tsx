import type { SVGProps } from "react";

type SocialName = "instagram" | "facebook" | "tiktok" | "youtube" | "whatsapp";

export default function SocialIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: SocialName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><rect {...common} x="3" y="3" width="18" height="18" rx="5" /><circle {...common} cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  }
  if (name === "facebook") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z" /></svg>;
  }
  if (name === "tiktok") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M19.6 8.3a7.2 7.2 0 0 1-4.4-1.5v7.1a5.6 5.6 0 1 1-4.8-5.5v3.6a2.1 2.1 0 1 0 1.3 2V2.5h3.5c.2 2 1.8 3.6 4.4 3.8z" /></svg>;
  }
  if (name === "youtube") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1a31 31 0 0 0-.5 4.9 31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.6V8.4l6.1 3.6z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M20 3.9A11.8 11.8 0 0 0 12 1C5.9 1 1 5.9 1 12c0 1.9.5 3.8 1.4 5.4L1 23l5.8-1.5a11 11 0 0 0 5.2 1.3h.1c6.1 0 11-4.9 11-11 0-2.9-1.1-5.7-3.1-7.9ZM12.1 21a9.1 9.1 0 0 1-4.6-1.2l-.3-.2-3.4.9.9-3.3-.2-.3A9.1 9.1 0 1 1 12.1 21Zm5-6.8c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.3 0-.4.1-.5l.4-.5.3-.4c.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.2s1 2.5 1.1 2.6c.1.2 1.9 2.9 4.6 4.1.6.3 1.1.5 1.4.6.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3Z" /></svg>;
}
