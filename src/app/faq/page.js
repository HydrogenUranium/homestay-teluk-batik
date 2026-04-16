import Link from "next/link";
import FaqSection from "@/components/home/FaqSection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PublicPageLayout from "@/components/shared/PublicPageLayout";
import { faqStructuredItems } from "@/lib/seo/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFaqSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";

export const metadata = createPageMetadata({
  title: "FAQ Homestay Teluk Batik | Booking, Availability, Location & Nearby Attractions",
  description:
    "Soalan lazim untuk homestay Teluk Batik dan homestay Lumut: cara tempah, semakan tarikh, kemudahan rumah, serta maklumat kawasan berhampiran.",
  pathname: "/faq",
  keywords: [
    "faq homestay teluk batik",
    "how to book homestay teluk batik",
    "homestay lumut availability",
    "homestay booking whatsapp",
  ],
});

export default function FaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getWebsiteSchema(),
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
      getFaqSchema(faqStructuredItems),
    ],
  };

  return (
    <PublicPageLayout>
      <section className="py-12 sm:py-14">
        <div className="shell space-y-5">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
          <h1 className="text-3xl font-black tracking-tight text-ocean-900 sm:text-4xl">
            Frequently Asked Questions for Teluk Batik & Lumut Homestay Guests
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            These answers help guests compare options quickly, check availability flow, and understand whether our
            homestays are suitable for family stays, transit to Marina Island/Pangkor route, or nearby activities.
          </p>
        </div>
      </section>

      <FaqSection />

      <section className="pb-16">
        <div className="shell grid gap-4 sm:grid-cols-2">
          <article className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Need availability now?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Check the calendar on each property page and confirm with WhatsApp before finalizing your travel plan.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/homestay-teluk-batik" className="font-semibold text-ocean-700 hover:underline">
                Homestay Teluk Batik
              </Link>
              <Link href="/homestay-lekir-tanjung-kepah" className="font-semibold text-ocean-700 hover:underline">
                Homestay Lekir Tanjung Kepah
              </Link>
            </div>
          </article>
          <article className="surface-card p-6">
            <h2 className="text-xl font-bold text-ocean-900">Plan around local attractions</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review nearby guides for Pantai Teluk Batik, Marina Island, Bukit 300, and TLDM Lumut before booking.
            </p>
            <Link href="/nearby-attractions" className="mt-4 inline-flex font-semibold text-ocean-700 hover:underline">
              Browse nearby attractions guide
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
