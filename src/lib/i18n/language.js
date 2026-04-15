"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LANGUAGE_OPTIONS = ["en", "bm"];
const STORAGE_KEY = "htb_language";

const translations = {
  en: {
    common: {
      language: "Language",
      english: "English",
      malay: "Bahasa Melayu",
      whatsappUs: "WhatsApp Us",
      adminLogin: "Admin Login",
      checkAvailability: "Check Availability",
      viewHomestay: "View Homestay",
      bookViaWhatsApp: "Book via WhatsApp",
      available: "Available",
      unavailable: "Unavailable",
      remove: "Remove",
      logout: "Logout",
      date: "Date",
      loading: "Loading...",
    },
    nav: {
      home: "Home",
      homestays: "Homestays",
      availability: "Availability",
      nearby: "Nearby",
      faq: "FAQ",
      contact: "Contact",
      openMenu: "Open menu",
    },
    hero: {
      subtitle: "Holiday Stay Near the Beach",
      description:
        "Family-friendly homestays for beach trips, seaside getaways, and exploring Lumut, Marina Island, Pulau Pangkor route, and Bukit 300.",
      chips: ["Near Teluk Batik", "Family Friendly", "Easy Parking", "Admin-Managed Availability"],
    },
    homestay: {
      label: "Homestay",
      location: "Location",
      bestFor: "Best For",
      highlights: "Highlights",
      amenities: "Amenities",
      price: "Price",
      perNight: "per night",
      unavailableDates: "Unavailable dates",
      none: "None",
      openMap: "Open in Google Maps",
      mapPreview: "Location Map Preview",
    },
    calendar: {
      title: "Availability Calendar",
      hint: "This calendar is updated by admin. WhatsApp us to confirm the latest slot.",
      prevMonth: "Previous month for",
      nextMonth: "Next month for",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    nearby: {
      title: "Nearby Places Around Teluk Batik & Lumut",
      subtitle:
        "Our homestays are a practical base to explore beaches, seaside attractions, and local points of interest around Teluk Batik, Lumut, and Lekir.",
      items: [
        {
          title: "Pantai Teluk Batik",
          desc: "Popular beach in Lumut for family day trips, sunset walks, and relaxing by the sea.",
        },
        {
          title: "Marina Island",
          desc: "Marina area with boat access, suitable for leisure and transit around the district.",
        },
        {
          title: "Pulau Pangkor Route",
          desc: "A convenient overnight base before or after your trip to Pulau Pangkor.",
        },
        {
          title: "Bukit 300 Lumut",
          desc: "Light hiking spot for travelers who want views around Lumut and Teluk Batik.",
        },
        {
          title: "TLDM Lumut Area",
          desc: "Practical stay option for visits or work around TLDM Lumut.",
        },
      ],
    },
    faq: {
      title: "FAQ",
      subtitle: "Frequently asked questions to help you choose the right stay in Teluk Batik and Lumut.",
      items: [
        {
          q: "Are these homestays near Pantai Teluk Batik?",
          a: "Yes. Both properties are suitable for travelers planning to stay around Teluk Batik and Lumut.",
        },
        {
          q: "How do I check availability?",
          a: "Use the availability calendar in each homestay section. Red dates are unavailable.",
        },
        {
          q: "Can I book directly online?",
          a: "For V1, booking is handled via WhatsApp after checking availability.",
        },
        {
          q: "Are these homestays suitable for families?",
          a: "Yes, both properties are designed for comfort with living space, bedrooms, and basic facilities.",
        },
        {
          q: "Is there access to Marina Island, Pulau Pangkor route, or Bukit 300?",
          a: "Yes. These homestays are a practical base for those nearby attractions around Lumut.",
        },
        {
          q: "Do you have a Teluk Batik homestay with pool?",
          a: "Currently we focus on comfortable stays near beach attractions. Contact us for current options.",
        },
      ],
    },
    contactBand: {
      title: "Plan Your Teluk Batik Holiday Stay Today",
      description:
        "Looking for a homestay near the beach, sea, and Lumut attractions? Check available dates and confirm booking quickly via WhatsApp.",
    },
    footer: {
      description:
        "Homestay Teluk Batik & Homestay Lekir Tanjung Kepah for family holidays and beach-side stays around Lumut.",
      quickLinks: "Quick Links",
      contact: "Contact",
      social: "Social Media",
      viewHomestays: "View Homestays",
      availabilityCalendar: "Availability Calendar",
      whatsappBooking: "WhatsApp Booking",
      location: "Teluk Batik / Lumut / Lekir, Perak, Malaysia",
      rights: "All rights reserved.",
    },
    admin: {
      loginTitle: "Admin Login",
      loginSubtitle: "Sign in to manage homestay photos and blocked dates.",
      username: "Username / Email",
      password: "Password",
      login: "Login",
      signingIn: "Signing in...",
      dashboard: "Admin Dashboard",
      loggedInAs: "Logged in as",
      imageManagement: "Image Management",
      blockedDateManagement: "Blocked Date Management",
      uploadImage: "Upload Image",
      altText: "Alt text (optional)",
      noAltText: "No alt text",
      blockDate: "Block Date",
      status: {
        imageUploaded: "Image uploaded successfully.",
        imageDeleted: "Image deleted.",
        imageOrder: "Image order updated.",
        dateBlocked: "Date marked as unavailable.",
        dateRemoved: "Blocked date removed.",
      },
      errors: {
        loginFailed: "Login failed.",
        uploadFailed: "Upload failed.",
        deleteImageFailed: "Failed to delete image.",
        reorderFailed: "Failed to reorder images.",
        blockDateFailed: "Failed to block date.",
        removeDateFailed: "Failed to remove blocked date.",
      },
      moveImageUp: "Move image up",
      moveImageDown: "Move image down",
      deleteImage: "Delete image",
    },
  },
  bm: {
    common: {
      language: "Bahasa",
      english: "English",
      malay: "Bahasa Melayu",
      whatsappUs: "WhatsApp Kami",
      adminLogin: "Log Masuk Admin",
      checkAvailability: "Semak Ketersediaan",
      viewHomestay: "Lihat Homestay",
      bookViaWhatsApp: "Tempah Melalui WhatsApp",
      available: "Tersedia",
      unavailable: "Tidak Tersedia",
      remove: "Buang",
      logout: "Log Keluar",
      date: "Tarikh",
      loading: "Memuatkan...",
    },
    nav: {
      home: "Utama",
      homestays: "Homestay",
      availability: "Ketersediaan",
      nearby: "Tempat Berdekatan",
      faq: "FAQ",
      contact: "Hubungi",
      openMenu: "Buka menu",
    },
    hero: {
      subtitle: "Penginapan Cuti Dekat Pantai",
      description:
        "Pilihan homestay mesra keluarga untuk mandi pantai, bercuti tepi laut, dan jelajah Lumut termasuk Marina Island, laluan Pulau Pangkor, serta Bukit 300.",
      chips: ["Dekat Teluk Batik", "Mesra Keluarga", "Parkir Mudah", "Ketersediaan Diurus Admin"],
    },
    homestay: {
      label: "Homestay",
      location: "Lokasi",
      bestFor: "Sesuai Untuk",
      highlights: "Kelebihan",
      amenities: "Kemudahan",
      price: "Harga",
      perNight: "semalam",
      unavailableDates: "Tarikh tidak tersedia",
      none: "Tiada",
      openMap: "Buka di Google Maps",
      mapPreview: "Pratonton Peta Lokasi",
    },
    calendar: {
      title: "Kalendar Ketersediaan",
      hint: "Kalendar ini dikemaskini oleh admin. WhatsApp kami untuk sahkan slot terkini.",
      prevMonth: "Bulan sebelumnya untuk",
      nextMonth: "Bulan seterusnya untuk",
      days: ["Aha", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],
    },
    nearby: {
      title: "Tempat Menarik Sekitar Teluk Batik & Lumut",
      subtitle:
        "Homestay kami sesuai dijadikan lokasi asas untuk jelajah pantai, aktiviti laut, dan tarikan tempatan sekitar Teluk Batik, Lumut, dan Lekir.",
      items: [
        {
          title: "Pantai Teluk Batik",
          desc: "Pantai popular di Lumut untuk hari keluarga, jalan petang, dan santai tepi laut.",
        },
        {
          title: "Marina Island",
          desc: "Kawasan marina dengan akses bot, sesuai untuk aktiviti santai dan transit tempatan.",
        },
        {
          title: "Laluan Pulau Pangkor",
          desc: "Sesuai untuk menginap sebelum atau selepas perjalanan ke Pulau Pangkor.",
        },
        {
          title: "Bukit 300 Lumut",
          desc: "Lokasi hiking ringan untuk pengunjung yang mahukan pemandangan sekitar Lumut dan Teluk Batik.",
        },
        {
          title: "Kawasan TLDM Lumut",
          desc: "Pilihan penginapan praktikal untuk urusan kerja atau lawatan sekitar TLDM Lumut.",
        },
      ],
    },
    faq: {
      title: "FAQ",
      subtitle: "Soalan lazim untuk bantu anda pilih penginapan terbaik di Teluk Batik dan Lumut.",
      items: [
        {
          q: "Adakah homestay ini dekat Pantai Teluk Batik?",
          a: "Ya. Kedua-dua homestay sesuai untuk pengunjung yang mahu menginap di kawasan Teluk Batik dan Lumut.",
        },
        {
          q: "Bagaimana nak semak ketersediaan?",
          a: "Gunakan kalendar ketersediaan pada setiap bahagian homestay. Tarikh merah menunjukkan slot tidak tersedia.",
        },
        {
          q: "Boleh tempah terus secara online?",
          a: "Untuk V1, tempahan dibuat melalui WhatsApp selepas semakan ketersediaan.",
        },
        {
          q: "Sesuai untuk keluarga?",
          a: "Ya, kedua-dua homestay direka untuk keselesaan keluarga dengan ruang tamu, bilik tidur, dan kemudahan asas.",
        },
        {
          q: "Ada akses ke Marina Island, laluan Pulau Pangkor, atau Bukit 300?",
          a: "Ya. Homestay ini sesuai dijadikan tempat penginapan untuk akses ke tarikan tersebut di sekitar Lumut.",
        },
        {
          q: "Ada homestay Teluk Batik dengan kolam?",
          a: "Buat masa ini kami fokus pada penginapan selesa berhampiran tarikan pantai. Hubungi kami untuk pilihan semasa.",
        },
      ],
    },
    contactBand: {
      title: "Rancang Cuti Anda di Teluk Batik Sekarang",
      description:
        "Mahu homestay dekat pantai, laut, dan tarikan Lumut? Semak tarikh kosong dan sahkan tempahan melalui WhatsApp.",
    },
    footer: {
      description:
        "Homestay Teluk Batik & Homestay Lekir Tanjung Kepah untuk percutian keluarga dan penginapan santai sekitar Lumut.",
      quickLinks: "Pautan Pantas",
      contact: "Hubungi",
      social: "Media Sosial",
      viewHomestays: "Lihat Homestay",
      availabilityCalendar: "Kalendar Ketersediaan",
      whatsappBooking: "Tempahan WhatsApp",
      location: "Teluk Batik / Lumut / Lekir, Perak, Malaysia",
      rights: "Hak cipta terpelihara.",
    },
    admin: {
      loginTitle: "Log Masuk Admin",
      loginSubtitle: "Log masuk untuk urus gambar homestay dan tarikh tidak tersedia.",
      username: "Nama Pengguna / Emel",
      password: "Kata Laluan",
      login: "Log Masuk",
      signingIn: "Sedang log masuk...",
      dashboard: "Panel Admin",
      loggedInAs: "Log masuk sebagai",
      imageManagement: "Pengurusan Gambar",
      blockedDateManagement: "Pengurusan Tarikh Tidak Tersedia",
      uploadImage: "Muat Naik Gambar",
      altText: "Teks alt (pilihan)",
      noAltText: "Tiada teks alt",
      blockDate: "Sekat Tarikh",
      status: {
        imageUploaded: "Gambar berjaya dimuat naik.",
        imageDeleted: "Gambar berjaya dibuang.",
        imageOrder: "Susunan gambar berjaya dikemaskini.",
        dateBlocked: "Tarikh ditanda sebagai tidak tersedia.",
        dateRemoved: "Tarikh tidak tersedia berjaya dibuang.",
      },
      errors: {
        loginFailed: "Log masuk gagal.",
        uploadFailed: "Muat naik gagal.",
        deleteImageFailed: "Gagal buang gambar.",
        reorderFailed: "Gagal kemaskini susunan gambar.",
        blockDateFailed: "Gagal sekat tarikh.",
        removeDateFailed: "Gagal buang tarikh tidak tersedia.",
      },
      moveImageUp: "Naikkan gambar",
      moveImageDown: "Turunkan gambar",
      deleteImage: "Buang gambar",
    },
  },
};

function getByPath(source, key) {
  return key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), source);
}

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGE_OPTIONS.includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute("lang", language === "bm" ? "ms" : "en");
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key) => getByPath(translations[language], key) ?? getByPath(translations.en, key) ?? key,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function pickLocalized(value, language) {
  if (!value || typeof value === "string") {
    return value || "";
  }
  if (Array.isArray(value)) {
    return value;
  }
  return value[language] ?? value.en ?? "";
}
