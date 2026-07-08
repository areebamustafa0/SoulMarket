import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { UIProvider } from "@/components/ui-context";
import { Toaster } from "@/components/toaster";
import { CartDrawer } from "@/components/cart-drawer";
import { BackToTop } from "@/components/back-to-top";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://soulmarket.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SoulMarket — Smart Shopping. Beautifully Simple.",
    template: "%s · SoulMarket",
  },
  description:
    "SoulMarket is a premium AI-powered shopping experience. Find products faster through intelligent, human-friendly recommendations.",
  keywords: [
    "e-commerce",
    "AI shopping assistant",
    "premium store",
    "sustainable shopping",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "SoulMarket" }],
  creator: "SoulMarket",
  publisher: "SoulMarket",
  applicationName: "SoulMarket",
  category: "Shopping",
  openGraph: {
    type: "website",
    siteName: "SoulMarket",
    title: "SoulMarket — Smart Shopping. Beautifully Simple.",
    description:
      "Premium AI-powered e-commerce. Curated products, calm design, intelligent recommendations.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SoulMarket — Smart Shopping. Beautifully Simple.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulMarket — Smart Shopping. Beautifully Simple.",
    description:
      "Premium AI-powered e-commerce. Curated products, calm design, intelligent recommendations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-ink antialiased">
        <UIProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <Toaster />
            <BackToTop />
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
