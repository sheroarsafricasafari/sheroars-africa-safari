import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import { NavbarThemeProvider } from "@/components/layout/NavbarTheme";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const bodyFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | SheRoarsAfricaSafari",
  },
  description: "Women-led safaris, Kilimanjaro climbs and Zanzibar escapes across Tanzania, thoughtfully crafted by a local team.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Script id="google-tag-manager-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});`}
        </Script>
        <Script
          id="google-tag-manager"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-P5FLXHXF"
          strategy="afterInteractive"
        />
        <a href="#main-content" className="sr-only z-[100] rounded bg-cream px-4 py-3 text-earth focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <NavbarThemeProvider>
          <JsonLd data={buildOrganizationJsonLd()} />
          <JsonLd data={buildWebsiteJsonLd()} />
          <Navbar />
          <div id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</div>
          <Footer />
          <WhatsAppButton />
        </NavbarThemeProvider>
      </body>
    </html>
  );
}
