"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language";

export default function NearbyAttractions() {
  const { t } = useLanguage();
  const attractions = t("nearby.items");
  const guidePaths = [
    "/nearby-attractions/teluk-batik",
    "/nearby-attractions/marina-island",
    "/nearby-attractions/pulau-pangkor-route",
    "/nearby-attractions/bukit-300-lumut",
    "/nearby-attractions/tldm-lumut",
  ];

  return (
    <section id="nearby" className="py-14 sm:py-16">
      <div className="shell">
        <h2 className="section-title">{t("nearby.title")}</h2>
        <p className="section-subtitle">
          {t("nearby.subtitle")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((item, index) => (
            <article key={item.title} className="surface-card p-5">
              <h3 className="text-lg font-bold text-ocean-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              <Link href={guidePaths[index] || "/nearby-attractions"} className="mt-4 inline-flex text-sm font-semibold text-ocean-700 hover:underline">
                Read local guide
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/nearby-attractions" className="inline-flex rounded-full border border-ocean-200 px-4 py-2 text-sm font-semibold text-ocean-700 hover:bg-ocean-50">
            Explore all nearby attraction guides
          </Link>
        </div>
      </div>
    </section>
  );
}
