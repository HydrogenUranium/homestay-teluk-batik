"use client";

import Image from "next/image";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { formatDateLabel } from "@/lib/utils/format";
import { useEffect, useRef, useState } from "react";
import { pickLocalized, useLanguage } from "@/lib/i18n/language";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

export default function AdminDashboard({ initialHomestays, adminName }) {
  const [homestays, setHomestays] = useState(initialHomestays);
  const [notice, setNotice] = useState(null);
  const noticeTimerRef = useRef(null);
  const { t, language } = useLanguage();

  function showNotice(type, message) {
    setNotice({ type, message });
    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current);
    }
    noticeTimerRef.current = setTimeout(() => setNotice(null), 4200);
  }

  useEffect(
    () => () => {
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }
    },
    [],
  );

  async function refreshData() {
    const response = await fetch("/api/homestays", { cache: "no-store" });
    const data = await response.json();
    setHomestays(data.homestays || []);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function handleUpload(event, homestaySlug) {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    formData.set("homestaySlug", homestaySlug);
    const response = await fetch("/api/admin/images", { method: "POST", body: formData });
    if (!response.ok) {
      const data = await response.json();
      showNotice("error", data.message || t("admin.errors.uploadFailed"));
      return;
    }
    showNotice("success", t("admin.status.imageUploaded"));
    form?.reset();
    await refreshData();
  }

  async function handleDeleteImage(homestaySlug, imageId) {
    const response = await fetch(`/api/admin/images/${imageId}?homestaySlug=${homestaySlug}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      showNotice("error", t("admin.errors.deleteImageFailed"));
      return;
    }
    showNotice("success", t("admin.status.imageDeleted"));
    await refreshData();
  }

  async function handleReorder(homestaySlug, imageId, direction) {
    const home = homestays.find((item) => item.slug === homestaySlug);
    const imageIds = [...(home?.images || [])].sort((a, b) => a.sortOrder - b.sortOrder).map((item) => item.id);
    const currentIndex = imageIds.indexOf(imageId);
    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= imageIds.length) {
      return;
    }

    [imageIds[currentIndex], imageIds[nextIndex]] = [imageIds[nextIndex], imageIds[currentIndex]];

    const previousHomestays = homestays;
    setHomestays((current) =>
      current.map((item) => {
        if (item.slug !== homestaySlug) {
          return item;
        }
        const reordered = imageIds
          .map((id, index) => {
            const image = item.images.find((entry) => entry.id === id);
            if (!image) {
              return null;
            }
            return { ...image, sortOrder: index };
          })
          .filter(Boolean);

        return {
          ...item,
          images: reordered,
        };
      }),
    );

    const response = await fetch("/api/admin/images/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ homestaySlug, imageIds }),
    });
    if (!response.ok) {
      setHomestays(previousHomestays);
      showNotice("error", t("admin.errors.reorderFailed"));
      return;
    }
    showNotice("success", t("admin.status.imageOrder"));
  }

  async function handleBlockDate(event, homestaySlug) {
    event.preventDefault();
    const form = event.currentTarget;
    const date = new FormData(form).get("date");
    if (!date) {
      return;
    }
    const response = await fetch("/api/admin/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ homestaySlug, date }),
    });
    if (!response.ok) {
      const data = await response.json();
      showNotice("error", data.message || t("admin.errors.blockDateFailed"));
      return;
    }
    showNotice("success", t("admin.status.dateBlocked"));
    form?.reset();
    await refreshData();
  }

  async function handleDeleteBlockedDate(homestaySlug, blockedId) {
    const response = await fetch(
      `/api/admin/blocked-dates/${blockedId}?homestaySlug=${homestaySlug}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      showNotice("error", t("admin.errors.removeDateFailed"));
      return;
    }
    showNotice("success", t("admin.status.dateRemoved"));
    await refreshData();
  }

  return (
    <div className="min-h-screen bg-shoreline-gradient pb-16">
      <header className="border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="shell flex items-center justify-between py-5">
          <div>
            <h1 className="text-2xl font-bold text-ocean-900">{t("admin.dashboard")}</h1>
            <p className="text-sm text-slate-600">
              {t("admin.loggedInAs")} {adminName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              {t("common.logout")}
            </button>
          </div>
        </div>
      </header>

      <main className="shell mt-6 space-y-4">
        {homestays.map((home) => (
          <section key={home.slug} className="surface-card p-5 sm:p-6" data-testid={`admin-${home.slug}`}>
            <h2 className="text-xl font-bold text-ocean-900">{home.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{pickLocalized(home.locationText, language)}</p>

            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ocean-700">
                  {t("admin.imageManagement")}
                </h3>
                <form className="mt-3 flex flex-col gap-3" onSubmit={(event) => handleUpload(event, home.slug)}>
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    required
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                  <input
                    name="altText"
                    type="text"
                    placeholder={t("admin.altText")}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-fit rounded-xl bg-ocean-700 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {t("admin.uploadImage")}
                  </button>
                </form>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[...home.images].sort((a, b) => a.sortOrder - b.sortOrder).map((image) => (
                    <div key={image.id} className="rounded-xl border border-slate-200 bg-white p-2">
                      <div className="relative h-24 overflow-hidden rounded-lg">
                        <Image src={image.src} alt={image.alt || home.name} fill className="object-cover" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                        {image.alt || t("admin.noAltText")}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-md border border-slate-300 p-1"
                          onClick={() => handleReorder(home.slug, image.id, "up")}
                          aria-label={`${t("admin.moveImageUp")} (${home.name})`}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-slate-300 p-1"
                          onClick={() => handleReorder(home.slug, image.id, "down")}
                          aria-label={`${t("admin.moveImageDown")} (${home.name})`}
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="ml-auto rounded-md border border-rose-200 p-1 text-rose-600"
                          onClick={() => handleDeleteImage(home.slug, image.id)}
                          aria-label={`${t("admin.deleteImage")} (${home.name})`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ocean-700">
                  {t("admin.blockedDateManagement")}
                </h3>
                <form className="mt-3 flex items-end gap-3" onSubmit={(event) => handleBlockDate(event, home.slug)}>
                  <label className="flex-1">
                    <span className="mb-1 block text-xs font-medium text-slate-600">{t("common.date")}</span>
                    <input
                      name="date"
                      type="date"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <button
                    type="submit"
                    className="rounded-xl bg-coral px-4 py-2 text-sm font-semibold text-white"
                  >
                    {t("admin.blockDate")}
                  </button>
                </form>

                <div className="mt-4 space-y-2">
                  {home.blockedEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-3 py-2"
                    >
                      <span className="text-sm font-medium text-rose-700">{formatDateLabel(entry.date)}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlockedDate(home.slug, entry.id)}
                        className="text-xs font-semibold text-rose-700 hover:underline"
                      >
                        {t("common.remove")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      {notice && (
        <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
          <p
            className={`rounded-full px-5 py-3 text-sm font-semibold shadow-soft ${
              notice.type === "error" ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
            }`}
          >
            {notice.message}
          </p>
        </div>
      )}
    </div>
  );
}
