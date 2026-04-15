import Header from "@/components/shared/Header";
import Hero from "@/components/home/Hero";
import HomestaySection from "@/components/home/HomestaySection";
import NearbyAttractions from "@/components/home/NearbyAttractions";
import FaqSection from "@/components/home/FaqSection";
import ContactBand from "@/components/home/ContactBand";
import Footer from "@/components/shared/Footer";
import { getHomestayContent } from "@/lib/data/provider";
import { buildCanonicalUrl } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const homestays = await getHomestayContent();
  const socialLinks = [
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com",
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com",
    process.env.NEXT_PUBLIC_X_URL || "https://x.com",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": homestays.map((home) => ({
      "@type": "LodgingBusiness",
      name: home.name,
      description: home.shortDescription?.en || home.shortDescription,
      sameAs: socialLinks,
      areaServed: ["Teluk Batik", "Lumut", "Lekir", "Perak"],
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
      url: buildCanonicalUrl(`/#${home.slug}`),
    })),
  };

  return (
    <>
      <Header />
      <main>
        <Hero homestays={homestays} />
        <section id="homestays">
          {homestays.map((homestay, index) => (
            <HomestaySection key={homestay.slug} homestay={homestay} index={index} />
          ))}
        </section>
        <NearbyAttractions />
        <FaqSection />
        <ContactBand />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
