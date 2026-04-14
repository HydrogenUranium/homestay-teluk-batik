"use client";

import { useLanguage } from "@/lib/i18n/language";

export default function Footer() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@telukbatik.com.my";
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="shell grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-ocean-900">Homestay Teluk Batik</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {t("footer.description")}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ocean-700">{t("footer.quickLinks")}</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href="#homestays" className="text-slate-600 hover:text-ocean-800">
              {t("footer.viewHomestays")}
            </a>
            <a href="#availability" className="text-slate-600 hover:text-ocean-800">
              {t("footer.availabilityCalendar")}
            </a>
            <a href="#faq" className="text-slate-600 hover:text-ocean-800">
              FAQ
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ocean-700">{t("footer.contact")}</h3>
          <div className="mt-3 space-y-2 text-sm">
            <a href={whatsappUrl} className="block font-semibold text-coral hover:underline">
              {t("footer.whatsappBooking")}
            </a>
            <a href={`mailto:${email}`} className="block text-slate-600 hover:text-ocean-800">
              {email}
            </a>
            <p className="text-slate-500">{t("footer.location")}</p>
          </div>
        </div>
      </div>
      <div className="shell mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
        © {new Date().getFullYear()} Homestay Teluk Batik. {t("footer.rights")}
      </div>
    </footer>
  );
}
