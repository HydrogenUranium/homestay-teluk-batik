"use client";

import { useLanguage } from "@/lib/i18n/language";

export default function ContactBand() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789";
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-14 sm:py-16">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl bg-ocean-900 px-6 py-10 text-white sm:px-10">
          <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-60 w-60 rounded-full bg-coral/30 blur-3xl" />
          <div className="relative grid gap-6 sm:grid-cols-[1.2fr_0.8fr] sm:items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                {t("contactBand.title")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-cyan-50 sm:text-base">
                {t("contactBand.description")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <a
                href="#availability"
                className="rounded-full border border-cyan-200/70 px-5 py-3 text-sm font-semibold text-cyan-50 hover:bg-white/10"
              >
                {t("common.checkAvailability")}
              </a>
              <a
                href={whatsappUrl}
                className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-[#f16652]"
              >
                {t("common.whatsappUs")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
