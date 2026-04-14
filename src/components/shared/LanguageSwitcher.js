"use client";

import { useLanguage } from "@/lib/i18n/language";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white p-1">
      <span className="px-2 text-[11px] font-semibold text-slate-500">{t("common.language")}</span>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          language === "en" ? "bg-ocean-700 text-white" : "text-slate-600"
        }`}
        aria-label={t("common.english")}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("bm")}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          language === "bm" ? "bg-ocean-700 text-white" : "text-slate-600"
        }`}
        aria-label={t("common.malay")}
      >
        BM
      </button>
    </div>
  );
}
