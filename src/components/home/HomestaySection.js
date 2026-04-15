"use client";

import { MapPin } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { pickLocalized, useLanguage } from "@/lib/i18n/language";

export default function HomestaySection({ homestay, index }) {
  const { t, language } = useLanguage();
  const amenities = pickLocalized(homestay.amenities, language) || [];
  const blockedPreview = [...(homestay.blockedDates || [])]
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 12);

  return (
    <section id={homestay.slug} className="py-12 sm:py-16">
      <div className="shell">
        <article className="surface-card overflow-hidden p-5 sm:p-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ocean-600">
                {t("homestay.label")} {index + 1}
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-ocean-900 sm:text-3xl">
                {homestay.name}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {pickLocalized(homestay.shortDescription, language)}
              </p>
              <p className="mt-3 text-sm font-semibold text-coral sm:text-base">
                {t("homestay.price")}: RM {homestay.pricePerNight} / {t("homestay.perNight")}
              </p>
            </div>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789"}
              className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-[#f16652]"
            >
              {t("common.bookViaWhatsApp")}
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <ImageCarousel images={homestay.images} label={homestay.name} />
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-ocean-800">
                  <MapPin size={16} />
                  {t("homestay.location")}
                </div>
                <p className="text-sm text-slate-700">{pickLocalized(homestay.locationText, language)}</p>
                <a
                  href={homestay.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex rounded-full border border-ocean-700 px-4 py-2 text-xs font-semibold text-ocean-700 hover:bg-ocean-50"
                >
                  {t("homestay.openMap")}
                </a>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-sm font-semibold text-ocean-800">{t("homestay.bestFor")}</h4>
                <p className="mt-1 text-sm text-slate-700">{pickLocalized(homestay.bestFor, language)}</p>
                <h4 className="mt-4 text-sm font-semibold text-ocean-800">{t("homestay.highlights")}</h4>
                <p className="mt-1 text-sm text-slate-700">{pickLocalized(homestay.highlight, language)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-sm font-semibold text-ocean-800">{t("homestay.amenities")}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {amenities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {t("homestay.mapPreview")}
                </p>
                <iframe
                  title={`${homestay.name} map`}
                  src={homestay.mapEmbedUrl}
                  className="h-56 w-full rounded-xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div id={index === 0 ? "availability" : undefined}>
                <AvailabilityCalendar blockedDates={homestay.blockedDates} homestayName={homestay.name} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-ocean-800">
                  {t("homestay.price")}: RM {homestay.pricePerNight} / {t("homestay.perNight")}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-ocean-800">{t("homestay.unavailableDates")}:</span>{" "}
                  {blockedPreview.length > 0 ? blockedPreview.join(", ") : t("homestay.none")}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
