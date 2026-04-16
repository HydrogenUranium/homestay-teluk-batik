import { buildCanonicalUrl } from "@/lib/utils/format";

export function getSiteSocialLinks() {
  return [
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com",
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com",
    process.env.NEXT_PUBLIC_X_URL || "https://x.com",
  ];
}

export function getWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${buildCanonicalUrl("/")}#website`,
    url: buildCanonicalUrl("/"),
    name: "Homestay Teluk Batik",
    inLanguage: ["en-MY", "ms-MY"],
  };
}

export function getOrganizationSchema() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@telukbatik.my";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789";

  return {
    "@type": "Organization",
    "@id": `${buildCanonicalUrl("/")}#organization`,
    name: "Homestay Teluk Batik",
    url: buildCanonicalUrl("/"),
    email,
    sameAs: getSiteSocialLinks(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        availableLanguage: ["English", "Malay"],
        url: whatsapp,
      },
    ],
  };
}

export function getBreadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function getFaqSchema(faqItems) {
  return {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getDefaultOpenGraph() {
  return [
    {
      url: buildCanonicalUrl("/branding/og-homestay-teluk-batik.svg"),
      width: 1200,
      height: 630,
      alt: "Homestay Teluk Batik and Homestay Lekir Tanjung Kepah",
    },
  ];
}
