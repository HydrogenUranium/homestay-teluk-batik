const telukBatikImages = [
  {
    id: "tb-1",
    src: "/images/homestays/teluk-batik/20250531_091350.jpg",
    alt: "Ruang tamu luas Homestay Teluk Batik dengan ruang makan keluarga",
    sortOrder: 0,
  },
  {
    id: "tb-2",
    src: "/images/homestays/teluk-batik/20250531_091242.jpg",
    alt: "Sudut ruang santai Homestay Teluk Batik dengan sofa untuk keluarga",
    sortOrder: 1,
  },
  {
    id: "tb-3",
    src: "/images/homestays/teluk-batik/20250531_091258.jpg",
    alt: "Ruang makan dalaman Homestay Teluk Batik",
    sortOrder: 2,
  },
  {
    id: "tb-4",
    src: "/images/homestays/teluk-batik/20250531_091357.jpg",
    alt: "Ruang dapur bersih untuk masakan keluarga di Homestay Teluk Batik",
    sortOrder: 3,
  },
  {
    id: "tb-5",
    src: "/images/homestays/teluk-batik/20250531_091427.jpg",
    alt: "Bilik tidur utama dengan penghawa dingin di Homestay Teluk Batik",
    sortOrder: 4,
  },
  {
    id: "tb-6",
    src: "/images/homestays/teluk-batik/20250531_091601.jpg",
    alt: "Bilik tidur tambahan sesuai untuk rombongan kecil di Homestay Teluk Batik",
    sortOrder: 5,
  },
];

const lekirImages = [
  {
    id: "lk-1",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0059.jpg",
    alt: "Pandangan luar Homestay Lekir Tanjung Kepah dengan laman parkir luas",
    sortOrder: 0,
  },
  {
    id: "lk-2",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0123.jpg",
    alt: "Ruang tamu moden Homestay Lekir Tanjung Kepah dengan TV dan sofa",
    sortOrder: 1,
  },
  {
    id: "lk-3",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0069.jpg",
    alt: "Dapur kemas dengan sinki dan meja penyediaan di Homestay Lekir",
    sortOrder: 2,
  },
  {
    id: "lk-4",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0073.jpg",
    alt: "Ruang makan terang untuk keluarga di Homestay Lekir Tanjung Kepah",
    sortOrder: 3,
  },
  {
    id: "lk-5",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0103.jpg",
    alt: "Bilik tidur dengan cahaya semula jadi di Homestay Lekir Tanjung Kepah",
    sortOrder: 4,
  },
  {
    id: "lk-6",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0109.jpg",
    alt: "Bilik tidur queen berkonsep ringkas dan bersih di Homestay Lekir",
    sortOrder: 5,
  },
  {
    id: "lk-7",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0111.jpg",
    alt: "Bilik tidur tambahan dengan hiasan minimum di Homestay Lekir",
    sortOrder: 6,
  },
  {
    id: "lk-8",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0121.jpg",
    alt: "Bilik tidur luas sesuai untuk pasangan atau keluarga kecil di Homestay Lekir",
    sortOrder: 7,
  },
  {
    id: "lk-9",
    src: "/images/homestays/lekir-tanjung-kepah/IMG-20250717-WA0083.jpg",
    alt: "Sudut hiburan dengan TV dan dekorasi moden di Homestay Lekir",
    sortOrder: 8,
  },
];

export const HOMESTAYS = [
  {
    id: "homestay-teluk-batik",
    slug: "teluk-batik",
    name: "Homestay Teluk Batik",
    pricePerNight: 250,
    shortDescription: {
      en: "Comfortable homestay near Pantai Teluk Batik for family trips, beach activities, and weekend holidays in Lumut.",
      bm: "Homestay selesa dekat Pantai Teluk Batik untuk trip keluarga, mandi pantai, dan percutian hujung minggu di Lumut.",
    },
    locationText: {
      en: "Teluk Batik area, Lumut, Perak. A practical base for Pantai Teluk Batik, Marina Island, and the Pulau Pangkor route.",
      bm: "Kawasan Teluk Batik, Lumut, Perak. Sesuai sebagai lokasi asas untuk Pantai Teluk Batik, Marina Island, dan laluan ke Pulau Pangkor.",
    },
    nearbyLabel: {
      en: "Near Pantai Teluk Batik & TLDM Lumut",
      bm: "Dekat Pantai Teluk Batik & TLDM Lumut",
    },
    bestFor: {
      en: "Large families, group holidays, and relaxed seaside trips",
      bm: "Keluarga besar, kumpulan bercuti, dan trip santai tepi laut",
    },
    amenities: {
      en: [
        "3 bedrooms",
        "2 air conditioners",
        "Kitchen with necessary appliances",
        "2 bathrooms",
        "Free parking",
        "Futon bed setup",
        "Living hall with TV",
      ],
      bm: [
        "3 bilik tidur",
        "2 unit penghawa dingin",
        "Dapur lengkap dengan peralatan asas",
        "2 bilik air",
        "Parkir percuma",
        "Katil futon",
        "Ruang tamu dengan TV",
      ],
    },
    highlight: {
      en: "A practical and affordable Teluk Batik homestay with roomy interiors and a family-friendly setup.",
      bm: "Pilihan homestay murah Teluk Batik dengan ruang dalaman luas dan suasana mesra keluarga.",
    },
    mapUrl: "https://maps.app.goo.gl/Ld826SxVmE1vFS3M6",
    mapEmbedUrl: "https://www.google.com/maps?q=Homestay+Teluk+Batik+Lumut&output=embed",
    defaultImages: telukBatikImages,
  },
  {
    id: "homestay-lekir-tanjung-kepah",
    slug: "lekir-tanjung-kepah",
    name: "Homestay Lekir Tanjung Kepah",
    pricePerNight: 200,
    shortDescription: {
      en: "Modern and tidy homestay in Lekir Tanjung Kepah, suitable for short getaways around Lumut, Marina Island, and seaside activities.",
      bm: "Homestay moden dan kemas di Lekir Tanjung Kepah, sesuai untuk short getaway ke kawasan Lumut, Marina Island, dan aktiviti laut.",
    },
    locationText: {
      en: "Lekir, Tanjung Kepah, Perak. Quiet setting with easy access to Teluk Batik, Bukit 300 Lumut, and nearby beach destinations.",
      bm: "Lekir, Tanjung Kepah, Perak. Lokasi tenang dengan akses mudah ke Teluk Batik, Bukit 300 Lumut, dan destinasi sekitar pantai.",
    },
    nearbyLabel: {
      en: "Easy access to Teluk Batik & Bukit 300",
      bm: "Akses mudah ke Teluk Batik & Bukit 300",
    },
    bestFor: {
      en: "Couples, small families, and travelers looking for privacy",
      bm: "Pasangan, keluarga kecil, dan pelancong yang mahukan suasana privasi",
    },
    amenities: {
      en: [
        "2 bedrooms",
        "2 air conditioners",
        "Kitchen with necessary appliances",
        "1 bathroom",
        "Free parking",
        "Futon bed setup",
        "Living hall with TV",
        "BBQ-friendly outdoor space",
      ],
      bm: [
        "2 bilik tidur",
        "2 unit penghawa dingin",
        "Dapur lengkap dengan peralatan asas",
        "1 bilik air",
        "Parkir percuma",
        "Katil futon",
        "Ruang tamu dengan TV",
        "Ruang luas sesuai untuk fungsi BBQ",
      ],
    },
    highlight: {
      en: "Contemporary setup for travelers searching for a premium-feel homestay near Teluk Batik and Lumut.",
      bm: "Gaya kontemporari untuk pelancong yang mencari homestay terbaik kawasan Teluk Batik dengan rasa premium.",
    },
    mapUrl: "https://maps.app.goo.gl/Zc9iAEfdXo8VdLK39",
    mapEmbedUrl: "https://www.google.com/maps?q=Homestay+Lekir+Tanjung+Kepah&output=embed",
    defaultImages: lekirImages,
  },
];

export const DEFAULT_BLOCKED_DATES = {
  "teluk-batik": ["2026-05-02", "2026-05-03", "2026-05-17", "2026-06-06"],
  "lekir-tanjung-kepah": ["2026-05-09", "2026-05-10", "2026-05-23"],
};

export function getHomestayBySlug(slug) {
  return HOMESTAYS.find((item) => item.slug === slug) ?? null;
}
