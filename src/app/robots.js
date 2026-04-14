import { buildCanonicalUrl } from "@/lib/utils/format";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin/*"],
      },
    ],
    sitemap: buildCanonicalUrl("/sitemap.xml"),
  };
}
