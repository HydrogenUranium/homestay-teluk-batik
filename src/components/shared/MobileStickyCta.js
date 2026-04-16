"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language";

export default function MobileStickyCta() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789";
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
      <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-soft backdrop-blur">
        <Link
          href="/#availability"
          className="flex-1 rounded-xl border border-ocean-200 px-3 py-2 text-center text-xs font-semibold text-ocean-700"
        >
          {t("common.checkAvailability")}
        </Link>
        <a
          href={whatsappUrl}
          className="flex-1 rounded-xl bg-coral px-3 py-2 text-center text-xs font-semibold text-white"
        >
          {t("common.bookViaWhatsApp")}
        </a>
      </div>
    </div>
  );
}
