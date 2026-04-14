"use client";

import Image from "next/image";
import { pickLocalized, useLanguage } from "@/lib/i18n/language";

export default function Hero({ homestays }) {
  const [first, second] = homestays;
  const { t, language } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden py-14 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-shoreline-gradient" />
      <div className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-cyan-200/60 blur-3xl" />
      <div className="absolute -right-28 bottom-0 -z-10 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />

      <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ocean-700">
            Teluk Batik • Lumut • Lekir
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-ocean-900 sm:text-5xl">
            Homestay Teluk Batik &amp; Lekir
            <span className="block text-coral">{t("hero.subtitle")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#availability"
              className="rounded-full bg-ocean-700 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-900"
            >
              {t("common.checkAvailability")}
            </a>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789"}
              className="rounded-full border border-ocean-700 px-6 py-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-50"
            >
              {t("common.bookViaWhatsApp")}
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            {t("hero.chips").map((item) => (
              <span key={item} className="rounded-full border border-white/80 bg-white/80 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[first, second].map((home) => (
            <article key={home.slug} className="surface-card overflow-hidden p-3">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image
                  src={home.images[0]?.src}
                  alt={home.images[0]?.alt || home.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="p-2">
                <h2 className="text-base font-bold text-ocean-900">{home.name}</h2>
                <p className="mt-1 text-xs text-slate-600">{pickLocalized(home.nearbyLabel, language)}</p>
                <a
                  href={`#${home.slug}`}
                  className="mt-3 inline-flex text-sm font-semibold text-ocean-700 hover:text-ocean-900"
                >
                  {t("common.viewHomestay")}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
