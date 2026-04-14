"use client";

import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language";

export default function AvailabilityCalendar({ blockedDates = [], homestayName }) {
  const [viewDate, setViewDate] = useState(new Date());
  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates]);
  const { t } = useLanguage();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [viewDate]);

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-semibold text-ocean-900">{t("calendar.title")}</h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewDate((prev) => subMonths(prev, 1))}
            aria-label={`${t("calendar.prevMonth")} ${homestayName}`}
            className="rounded-full border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
          >
            <ChevronLeft size={16} />
          </button>
          <p className="min-w-24 text-center text-sm font-semibold text-slate-700">
            {format(viewDate, "MMMM yyyy")}
          </p>
          <button
            type="button"
            onClick={() => setViewDate((prev) => addMonths(prev, 1))}
            aria-label={`${t("calendar.nextMonth")} ${homestayName}`}
            className="rounded-full border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t("calendar.days").map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((date) => {
          const iso = format(date, "yyyy-MM-dd");
          const isBlocked = blockedSet.has(iso);
          const inMonth = isSameMonth(date, viewDate);

          return (
            <div
              key={iso}
              className={`rounded-xl p-2 text-center text-xs sm:text-sm ${
                !inMonth
                  ? "text-slate-300"
                  : isBlocked
                    ? "bg-rose-100 font-semibold text-rose-700"
                    : "bg-emerald-50 text-emerald-700"
              }`}
              title={isBlocked ? t("common.unavailable") : t("common.available")}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs sm:text-sm">
        <span className="inline-flex items-center gap-2 text-slate-600">
          <span className="h-3 w-3 rounded bg-emerald-100" /> {t("common.available")}
        </span>
        <span className="inline-flex items-center gap-2 text-slate-600">
          <span className="h-3 w-3 rounded bg-rose-100" /> {t("common.unavailable")}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        {t("calendar.hint")}
      </p>
    </div>
  );
}
