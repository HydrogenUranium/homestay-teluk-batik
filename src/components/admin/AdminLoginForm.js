"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

export default function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message || t("admin.errors.loginFailed"));
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card w-full max-w-md p-6 sm:p-8">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher />
      </div>
      <h1 className="text-2xl font-bold text-ocean-900">{t("admin.loginTitle")}</h1>
      <p className="mt-2 text-sm text-slate-600">{t("admin.loginSubtitle")}</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">{t("admin.username")}</span>
          <input
            name="username"
            type="text"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ocean-700"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">{t("admin.password")}</span>
          <input
            name="password"
            type="password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ocean-700"
            required
          />
        </label>
      </div>
      {error && <p className="mt-3 rounded-lg bg-rose-50 p-2 text-sm text-rose-700">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-ocean-700 px-4 py-3 text-sm font-semibold text-white hover:bg-ocean-900 disabled:opacity-60"
      >
        {loading ? t("admin.signingIn") : t("admin.login")}
      </button>
    </form>
  );
}
