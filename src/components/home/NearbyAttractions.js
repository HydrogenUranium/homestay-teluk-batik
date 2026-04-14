"use client";

import { useLanguage } from "@/lib/i18n/language";

export default function NearbyAttractions() {
  const { t } = useLanguage();
  const attractions = t("nearby.items");

  return (
    <section id="nearby" className="py-14 sm:py-16">
      <div className="shell">
        <h2 className="section-title">{t("nearby.title")}</h2>
        <p className="section-subtitle">
          {t("nearby.subtitle")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((item) => (
            <article key={item.title} className="surface-card p-5">
              <h3 className="text-lg font-bold text-ocean-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
