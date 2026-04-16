import Link from "next/link";
import { notFound } from "next/navigation";
import HomestaySection from "@/components/home/HomestaySection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PublicPageLayout from "@/components/shared/PublicPageLayout";
import { getHomestayContent } from "@/lib/data/provider";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildCanonicalUrl } from "@/lib/utils/format";
import { getBreadcrumbSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Homestay Teluk Batik | Stay Near Pantai Teluk Batik, Marina Island & Lumut",
  description:
    "Homestay Teluk Batik untuk family stay berhampiran Pantai Teluk Batik, Lumut, Marina Island dan laluan Pulau Pangkor. Semak harga dan ketersediaan semasa.",
  pathname: "/homestay-teluk-batik",
  keywords: [
    "homestay teluk batik",
    "homestay teluk batik lumut",
    "homestay pantai teluk batik",
    "family homestay lumut",
  ],
});

export default async function HomestayTelukBatikPage() {
  const homestays = await getHomestayContent();
  const home = homestays.find((item) => item.slug === "teluk-batik");
  if (!home) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getWebsiteSchema(),
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Homestay Teluk Batik", path: "/homestay-teluk-batik" },
      ]),
      {
        "@type": "LodgingBusiness",
        "@id": `${buildCanonicalUrl("/homestay-teluk-batik")}#lodging`,
        name: home.name,
        description: home.shortDescription?.en || home.shortDescription,
        url: buildCanonicalUrl("/homestay-teluk-batik"),
        hasMap: home.mapUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lumut",
          addressRegion: "Perak",
          addressCountry: "MY",
        },
        offers: {
          "@type": "Offer",
          price: home.pricePerNight,
          priceCurrency: "MYR",
          availability:
            (home.blockedDates || []).length >= 365
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <PublicPageLayout>
      <section className="py-10">
        <div className="shell space-y-5">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Homestay Teluk Batik", href: "/homestay-teluk-batik" }]} />
          <h1 className="text-3xl font-black tracking-tight text-ocean-900 sm:text-4xl">
            Homestay Teluk Batik in Lumut for Family Beach Stay
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            This page is focused on guests searching for homestay near Pantai Teluk Batik with practical access to
            Lumut town, Marina Island, and nearby routes used for Pulau Pangkor trips.
          </p>
        </div>
      </section>

      <HomestaySection homestay={home} index={0} />

      <section className="pb-16">
        <div className="shell grid gap-4 sm:grid-cols-2">
          <article className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Nearby guides for your trip plan</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore local guides for Pantai Teluk Batik, Marina Island, Bukit 300, TLDM Lumut, and Pangkor route
              planning before you confirm dates.
            </p>
            <Link href="/nearby-attractions" className="mt-4 inline-flex font-semibold text-ocean-700 hover:underline">
              View nearby attractions guide
            </Link>
          </article>
          <article className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Compare both homestays</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Need a second option? Check Homestay Lekir Tanjung Kepah for a compact layout and BBQ-friendly outdoor
              space.
            </p>
            <Link
              href="/homestay-lekir-tanjung-kepah"
              className="mt-4 inline-flex font-semibold text-ocean-700 hover:underline"
            >
              View Homestay Lekir Tanjung Kepah
            </Link>
          </article>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </PublicPageLayout>
  );
}
