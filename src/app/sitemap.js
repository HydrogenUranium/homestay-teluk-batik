import { buildCanonicalUrl } from "@/lib/utils/format";
import { attractionGuides } from "@/lib/seo/content";

export default function sitemap() {
  const now = new Date();
  const staticPublicPages = [
    "/",
    "/homestay-teluk-batik",
    "/homestay-lekir-tanjung-kepah",
    "/nearby-attractions",
    "/faq",
  ];
  const nearbyPages = attractionGuides.map((guide) => `/nearby-attractions/${guide.slug}`);
  const pages = [...staticPublicPages, ...nearbyPages];

  return [
    ...pages.map((pathname) => ({
      url: buildCanonicalUrl(pathname),
      lastModified: now,
      changeFrequency: pathname === "/" ? "weekly" : "monthly",
      priority: pathname === "/" ? 1 : 0.8,
    })),
  ];
}
