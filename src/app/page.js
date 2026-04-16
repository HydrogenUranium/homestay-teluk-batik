import Hero from "@/components/home/Hero";
import HomestaySection from "@/components/home/HomestaySection";
import NearbyAttractions from "@/components/home/NearbyAttractions";
import FaqSection from "@/components/home/FaqSection";
import ContactBand from "@/components/home/ContactBand";
import { getHomestayContent } from "@/lib/data/provider";
import { buildCanonicalUrl } from "@/lib/utils/format";
import PublicPageLayout from "@/components/shared/PublicPageLayout";
import { faqStructuredItems } from "@/lib/seo/content";
import { getBreadcrumbSchema, getFaqSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";
export const metadata = createPageMetadata({
  title: "Homestay Teluk Batik & Lumut | Family Stay Near Pantai Teluk Batik",
  description:
    "Website rasmi Homestay Teluk Batik dan Homestay Lekir Tanjung Kepah. Semak ketersediaan tarikh, harga semalam, kemudahan rumah, dan tempah melalui WhatsApp.",
  pathname: "/",
  keywords: [
    "homestay teluk batik",
    "homestay teluk batik lumut",
    "homestay murah teluk batik",
    "homestay lumut dekat pantai",
    "family homestay lumut",
  ],
});

export default async function HomePage() {
  const homestays = await getHomestayContent();
  const socialLinks = [
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com",
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com",
    process.env.NEXT_PUBLIC_X_URL || "https://x.com",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getWebsiteSchema(),
      {
        ...getOrganizationSchema(),
        sameAs: socialLinks,
      },
      getBreadcrumbSchema([{ name: "Home", path: "/" }]),
      getFaqSchema(faqStructuredItems),
      ...homestays.map((home) => ({
        "@type": "LodgingBusiness",
        "@id": `${buildCanonicalUrl(home.detailPath || "/")}#lodging`,
        name: home.name,
        description: home.shortDescription?.en || home.shortDescription,
        sameAs: socialLinks,
        areaServed: ["Teluk Batik", "Lumut", "Lekir", "Manjung", "Perak"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lumut",
          addressRegion: "Perak",
          addressCountry: "MY",
        },
        hasMap: home.mapUrl,
        amenityFeature: (home.amenities?.en || home.amenities || []).map((item) => ({
          "@type": "LocationFeatureSpecification",
          name: item,
        })),
        offers: {
          "@type": "Offer",
          url: buildCanonicalUrl(home.detailPath || "/"),
          price: home.pricePerNight,
          priceCurrency: "MYR",
          unitText: "night",
          availability:
            (home.blockedDates || []).length >= 365
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Unavailable dates",
            value: (home.blockedDates || []).join(", "),
          },
        ],
        url: buildCanonicalUrl(home.detailPath || "/"),
      })),
    ],
  };

  return (
    <PublicPageLayout>
      <Hero homestays={homestays} />
      <section id="homestays">
        {homestays.map((homestay, index) => (
          <HomestaySection key={homestay.slug} homestay={homestay} index={index} />
        ))}
      </section>
      <NearbyAttractions />
      <FaqSection />
      <ContactBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </PublicPageLayout>
  );
}
