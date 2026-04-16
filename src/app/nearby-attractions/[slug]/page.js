import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PublicPageLayout from "@/components/shared/PublicPageLayout";
import { attractionGuides } from "@/lib/seo/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildCanonicalUrl } from "@/lib/utils/format";
import { getBreadcrumbSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return attractionGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = attractionGuides.find((item) => item.slug === slug);
  if (!guide) {
    return createPageMetadata({
      title: "Nearby Attractions Guide | Homestay Teluk Batik",
      description: "Local travel guide around Teluk Batik and Lumut.",
      pathname: "/nearby-attractions",
    });
  }

  return createPageMetadata({
    title: `${guide.title} | Nearby Guide for Teluk Batik & Lumut Homestay Guests`,
    description: `${guide.subtitle}. Practical stay tips for visitors choosing homestay around Teluk Batik, Lumut, and Manjung.`,
    pathname: `/nearby-attractions/${guide.slug}`,
    keywords: [
      `${guide.title} lumut`,
      `homestay near ${guide.title}`,
      "teluk batik nearby attractions",
      "lumut travel stay guide",
    ],
  });
}

export default async function NearbyAttractionDetailPage({ params }) {
  const { slug } = await params;
  const guide = attractionGuides.find((item) => item.slug === slug);
  if (!guide) {
    notFound();
  }

  const related = attractionGuides.filter((item) => item.slug !== guide.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getWebsiteSchema(),
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Nearby Attractions", path: "/nearby-attractions" },
        { name: guide.title, path: `/nearby-attractions/${guide.slug}` },
      ]),
      {
        "@type": "Article",
        headline: `${guide.title} guide for Teluk Batik homestay guests`,
        description: guide.subtitle,
        mainEntityOfPage: buildCanonicalUrl(`/nearby-attractions/${guide.slug}`),
        author: {
          "@type": "Organization",
          name: "Homestay Teluk Batik",
        },
      },
    ],
  };

  return (
    <PublicPageLayout>
      <article className="py-12 sm:py-14">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Nearby Attractions", href: "/nearby-attractions" },
              { name: guide.title, href: `/nearby-attractions/${guide.slug}` },
            ]}
          />
          <h1 className="mt-6 text-3xl font-black tracking-tight text-ocean-900 sm:text-4xl">{guide.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{guide.subtitle}</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <section className="surface-card p-6">
              <h2 className="text-xl font-bold text-ocean-900">Overview</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guide.intro}</p>
            </section>
            <section className="surface-card p-6">
              <h2 className="text-xl font-bold text-ocean-900">Why visitors choose this area</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guide.whyVisit}</p>
            </section>
            <section className="surface-card p-6">
              <h2 className="text-xl font-bold text-ocean-900">Why our homestays are practical bases</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guide.practicalBase}</p>
            </section>
            <section className="surface-card p-6">
              <h2 className="text-xl font-bold text-ocean-900">Best suited for</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guide.suits}</p>
            </section>
          </div>

          <section className="surface-card mt-4 p-6">
            <h2 className="text-xl font-bold text-ocean-900">Suggested use case</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{guide.useCase}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/homestay-teluk-batik" className="rounded-full bg-ocean-700 px-4 py-2 text-sm font-semibold text-white">
                View Homestay Teluk Batik
              </Link>
              <Link
                href="/homestay-lekir-tanjung-kepah"
                className="rounded-full border border-ocean-200 px-4 py-2 text-sm font-semibold text-ocean-700"
              >
                View Homestay Lekir Tanjung Kepah
              </Link>
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789"}
                className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white"
              >
                Book via WhatsApp
              </a>
            </div>
          </section>

          <section className="mt-4">
            <h2 className="text-xl font-bold text-ocean-900">Related local guides</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/nearby-attractions/${item.slug}`} className="surface-card p-4">
                  <p className="font-semibold text-ocean-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{item.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </PublicPageLayout>
  );
}
