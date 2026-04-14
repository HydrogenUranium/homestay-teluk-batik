"use client";

import { useLanguage } from "@/lib/i18n/language";

export default function FaqSection() {
  const { t } = useLanguage();
  const faqs = t("faq.items");

  return (
    <section id="faq" className="py-14 sm:py-16">
      <div className="shell">
        <h2 className="section-title">{t("faq.title")}</h2>
        <p className="section-subtitle">{t("faq.subtitle")}</p>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="surface-card p-5">
              <summary className="cursor-pointer list-none text-sm font-semibold text-ocean-900 sm:text-base">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
