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
  title: "Homestay Lekir Tanjung Kepah | Easy Access to Teluk Batik, Lumut & Bukit 300",
  description:
    "Homestay Lekir Tanjung Kepah untuk trip santai sekitar Lumut, Teluk Batik dan Bukit 300. Sesuai untuk keluarga kecil, pasangan, dan tetamu transit.",
  pathname: "/homestay-lekir-tanjung-kepah",
  keywords: [
    "homestay lekir tanjung kepah",
    "homestay lumut dekat teluk batik",
    "homestay bukit 300 lumut",
    "homestay murah lumut",
  ],
});

export default async function HomestayLekirPage() {
  const homestays = await getHomestayContent();
  const home = homestays.find((item) => item.slug === "lekir-tanjung-kepah");
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
        { name: "Homestay Lekir Tanjung Kepah", path: "/homestay-lekir-tanjung-kepah" },
      ]),
      {
        "@type": "LodgingBusiness",
        "@id": `${buildCanonicalUrl("/homestay-lekir-tanjung-kepah")}#lodging`,
        name: home.name,
        description: home.shortDescription?.en || home.shortDescription,
        url: buildCanonicalUrl("/homestay-lekir-tanjung-kepah"),
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
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Homestay Lekir Tanjung Kepah", href: "/homestay-lekir-tanjung-kepah" },
            ]}
          />
          <h1 className="text-3xl font-black tracking-tight text-ocean-900 sm:text-4xl">
            Homestay Lekir Tanjung Kepah for Lumut Weekend and Transit Stay
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            A practical option for visitors searching for a homestay near Lumut attractions, Teluk Batik beach trips,
            Bukit 300 activity weekends, and transit-friendly access around Manjung.
          </p>
        </div>
      </section>

      <HomestaySection homestay={home} index={1} />

      <section className="pb-16">
        <div className="shell grid gap-4 sm:grid-cols-2">
          <article className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Plan around nearby landmarks</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use our local pages to plan Marina Island transit, TLDM Lumut visits, and Pulau Pangkor route timing.
            </p>
            <Link href="/nearby-attractions" className="mt-4 inline-flex font-semibold text-ocean-700 hover:underline">
              Explore nearby attractions
            </Link>
          </article>
          <article className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Need a larger layout?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Compare with Homestay Teluk Batik if you need more bedrooms and larger indoor space for bigger groups.
            </p>
            <Link href="/homestay-teluk-batik" className="mt-4 inline-flex font-semibold text-ocean-700 hover:underline">
              View Homestay Teluk Batik
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
