import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { buildCanonicalUrl } from "@/lib/utils/format";
import { LanguageProvider } from "@/lib/i18n/language";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.telukbatik.my"),
  title: {
    default: "Homestay Teluk Batik & Homestay Lekir Tanjung Kepah | Stay Near Teluk Batik, Lumut",
    template: "%s | Homestay Teluk Batik",
  },
  description:
    "Cari homestay Teluk Batik dan homestay Lumut yang selesa untuk family trip, mandi pantai, Marina Island, Pulau Pangkor route, dan Bukit 300. Semak availability dan book via WhatsApp.",
  applicationName: "Homestay Teluk Batik",
  alternates: {
    canonical: buildCanonicalUrl("/"),
    languages: {
      "en-MY": buildCanonicalUrl("/"),
      "ms-MY": buildCanonicalUrl("/"),
    },
  },
  openGraph: {
    title: "Homestay Teluk Batik & Homestay Lekir Tanjung Kepah",
    description:
      "Homestay near Teluk Batik, Lumut with family-friendly spaces, photo galleries, and calendar availability.",
    url: buildCanonicalUrl("/"),
    type: "website",
    siteName: "Homestay Teluk Batik",
    locale: "en_MY",
    images: [
      {
        url: buildCanonicalUrl("/branding/og-homestay-teluk-batik.svg"),
        width: 1200,
        height: 630,
        alt: "Homestay Teluk Batik and Homestay Lekir Tanjung Kepah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homestay Teluk Batik & Lekir Tanjung Kepah",
    description: "Check availability and book your Teluk Batik holiday stay via WhatsApp.",
    images: [buildCanonicalUrl("/branding/og-homestay-teluk-batik.svg")],
  },
  keywords: [
    "homestay Teluk Batik",
    "homestay Lumut",
    "Pantai Teluk Batik",
    "homestay murah",
    "Marina Island",
    "Pulau Pangkor",
    "TLDM Lumut",
    "Bukit 300 Lumut",
    "best homestay Teluk Batik",
    "homestay swimming pool",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
