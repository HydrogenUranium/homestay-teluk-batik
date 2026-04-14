import { buildCanonicalUrl } from "@/lib/utils/format";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: buildCanonicalUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildCanonicalUrl("/admin/login"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];
}
