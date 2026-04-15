"use client";

import { useLanguage } from "@/lib/i18n/language";

function SocialIcon({ type }) {
  if (type === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.37h-3.4v13.44a2.9 2.9 0 1 1-2.9-2.9c.2 0 .4.02.6.06V9.48a6.33 6.33 0 1 0 5.7 6.28v-6.8a8.2 8.2 0 0 0 4.77 1.53V7.1c-.34 0-.68-.14-1-.41Z" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M13.5 8.5V6.9c0-.77.17-1.3 1.27-1.3H16V3.03c-.58-.08-1.26-.13-2.1-.13-2.08 0-3.5 1.27-3.5 3.6V8.5H8v2.92h2.4V21h3.1v-9.58H16l.37-2.92h-2.87Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.9-6.43L6.4 22H3.3l7.24-8.27L1 2h6.36l4.43 5.85L18.9 2Zm-1.1 18h1.73L6.42 3.9H4.56L17.8 20Z" />
    </svg>
  );
}

export default function Footer() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/60123456789";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@telukbatik.com.my";
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com";
  const xUrl = process.env.NEXT_PUBLIC_X_URL || "https://x.com";
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="shell grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
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
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ocean-700">{t("footer.social")}</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noreferrer"
              title="TikTok"
              aria-label="TikTok"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              <SocialIcon type="tiktok" />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              <SocialIcon type="facebook" />
            </a>
            <a
              href={xUrl}
              target="_blank"
              rel="noreferrer"
              title="X"
              aria-label="X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              <SocialIcon type="x" />
            </a>
          </div>
        </div>
      </div>
      <div className="shell mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
        © {new Date().getFullYear()} Homestay Teluk Batik. {t("footer.rights")}
      </div>
    </footer>
  );
}
