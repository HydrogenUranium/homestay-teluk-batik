"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const sectionHref = (id) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.homestays"), href: sectionHref("homestays") },
    { label: t("nav.availability"), href: sectionHref("availability") },
    { label: t("nav.nearby"), href: "/nearby-attractions" },
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.contact"), href: sectionHref("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/80 backdrop-blur">
      <div className="shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-ocean-900">
          Homestay Teluk Batik
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-ocean-700"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789"}
            className="rounded-full bg-ocean-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-900"
          >
            {t("common.whatsappUs")}
          </a>
          <a
            href="/admin/login"
            className="rounded-full border border-ocean-700 px-4 py-2 text-sm font-semibold text-ocean-700 transition hover:bg-ocean-50"
          >
            {t("common.adminLogin")}
          </a>
          <LanguageSwitcher />
        </nav>
        <button
          aria-label={t("nav.openMenu")}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="shell border-t border-slate-200 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789"}
              className="mt-2 rounded-full bg-ocean-700 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {t("common.whatsappUs")}
            </a>
            <a
              href="/admin/login"
              className="rounded-full border border-ocean-700 px-4 py-2 text-center text-sm font-semibold text-ocean-700"
            >
              {t("common.adminLogin")}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
