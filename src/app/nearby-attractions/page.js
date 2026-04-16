import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PublicPageLayout from "@/components/shared/PublicPageLayout";
import { attractionGuides } from "@/lib/seo/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildCanonicalUrl } from "@/lib/utils/format";
import { getBreadcrumbSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";

export const metadata = createPageMetadata({
  title: "Nearby Attractions from Teluk Batik Homestay | Lumut, Marina Island, Bukit 300 & Pangkor Route",
  description:
    "Panduan tempat menarik berhampiran Teluk Batik dan Lumut termasuk Marina Island, laluan Pulau Pangkor, Bukit 300, serta kawasan sekitar TLDM Lumut.",
  pathname: "/nearby-attractions",
  keywords: [
    "things to do near teluk batik",
    "nearby attractions lumut",
    "marina island lumut",
    "bukit 300 lumut",
    "tldm lumut area",
  ],
});

export default function NearbyAttractionsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getWebsiteSchema(),
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Nearby Attractions", path: "/nearby-attractions" },
      ]),
      {
        "@type": "ItemList",
        itemListElement: attractionGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: buildCanonicalUrl(`/nearby-attractions/${guide.slug}`),
          name: guide.title,
        })),
      },
    ],
  };

  return (
    <PublicPageLayout>
      <section className="py-12 sm:py-14">
        <div className="shell space-y-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Nearby Attractions", href: "/nearby-attractions" }]} />
          <h1 className="text-3xl font-black tracking-tight text-ocean-900 sm:text-4xl">
            Nearby Attractions Around Teluk Batik, Lumut & Manjung
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Use this guide to plan a more practical stay. We cover local attractions and landmarks often searched by
            travelers looking for a homestay in Teluk Batik/Lumut, including Marina Island, Bukit 300, Pulau Pangkor
            route planning, and TLDM Lumut surroundings.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attractionGuides.map((guide) => (
              <article key={guide.slug} className="surface-card p-6">
                <h2 className="text-lg font-bold text-ocean-900">{guide.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{guide.subtitle}</p>
                <Link
                  href={`/nearby-attractions/${guide.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-ocean-700 hover:text-ocean-900"
                >
                  Read local guide
                </Link>
              </article>
            ))}
          </div>
          <div className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Book your stay after planning</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              After reviewing the local guides, compare both homestays and confirm dates via WhatsApp.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/homestay-teluk-batik" className="rounded-full bg-ocean-700 px-4 py-2 text-sm font-semibold text-white">
                Homestay Teluk Batik
              </Link>
              <Link
                href="/homestay-lekir-tanjung-kepah"
                className="rounded-full border border-ocean-200 px-4 py-2 text-sm font-semibold text-ocean-700"
              >
                Homestay Lekir Tanjung Kepah
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </PublicPageLayout>
  );
}
