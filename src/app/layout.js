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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.telukbatik.com.my"),
  title: "Homestay Teluk Batik & Homestay Lekir Tanjung Kepah | Stay Near Teluk Batik, Lumut",
  description:
    "Cari homestay Teluk Batik dan homestay Lumut yang selesa untuk family trip, mandi pantai, Marina Island, Pulau Pangkor route, dan Bukit 300. Semak availability dan book via WhatsApp.",
  alternates: {
    canonical: buildCanonicalUrl("/"),
  },
  openGraph: {
    title: "Homestay Teluk Batik & Homestay Lekir Tanjung Kepah",
    description:
      "Homestay near Teluk Batik, Lumut with family-friendly spaces, photo galleries, and calendar availability.",
    url: buildCanonicalUrl("/"),
    type: "website",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homestay Teluk Batik & Lekir Tanjung Kepah",
    description: "Check availability and book your Teluk Batik holiday stay via WhatsApp.",
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
