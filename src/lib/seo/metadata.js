import { buildCanonicalUrl } from "@/lib/utils/format";
import { getDefaultOpenGraph } from "./schema";

export function createPageMetadata({ title, description, pathname, keywords = [] }) {
  const canonical = buildCanonicalUrl(pathname);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: "en_MY",
      images: getDefaultOpenGraph(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [buildCanonicalUrl("/branding/og-homestay-teluk-batik.svg")],
    },
  };
}
