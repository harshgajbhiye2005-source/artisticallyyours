import type { Metadata } from "next";
import { Poppins, Instrument_Serif } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "Artistically Yours — Branding & Design Studio";
const description =
  "We co-create brands with founders who think beyond the ordinary. Brand strategy, identity, packaging, socials, and UI/UX design.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  // Preview card shown when the site is shared on WhatsApp, Instagram,
  // LinkedIn, X, etc. Absolute URL so it resolves under the Pages basePath.
  openGraph: {
    type: "website",
    siteName: "Artistically Yours",
    url: SITE_URL,
    title,
    description,
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Artistically Yours — build what you're proud of.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
