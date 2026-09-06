/**
 * Root application layout and metadata
 * Purpose: App-level metadata, fonts and root HTML structure.
 * Authors: Shreya Joshi, Chinmay Joshi
 */
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blueoakventures.com"),
  title: "BLUEOAK Ventures — Backing India's Next Generation of Builders",
  description:
    "BLUEOAK Ventures is an Indian venture capital firm partnering with ambitious founders building enduring companies at the intersection of heritage, technology, and global ambition.",
  keywords: [
    "venture capital India",
    "Indian startup investment",
    "Bharat startup ecosystem",
    "Indian founders",
    "VC firm India",
    "BLUEOAK Ventures",
    "startup funding India",
  ],
  authors: [{ name: "BLUEOAK Ventures" }],
  creator: "BLUEOAK Ventures",
  publisher: "BLUEOAK Ventures",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://blueoakventures.com",
    siteName: "BLUEOAK Ventures",
    title: "BLUEOAK Ventures — Backing India's Next Generation of Builders",
    description:
      "Partnering with ambitious Indian founders building enduring companies for India and the world.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "BLUEOAK Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLUEOAK Ventures — Backing India's Next Generation of Builders",
    description:
      "Partnering with ambitious Indian founders building enduring companies for India and the world.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    apple: "/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F1E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1210" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-ivory text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
