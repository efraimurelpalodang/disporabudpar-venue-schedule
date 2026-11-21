import { CollectionSlide, TrustSlide } from "@/types/landing";

export const ASSET_BASE =
  "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000";

export const COLLECTION_SLIDES: CollectionSlide[] = [
  {
    img: `${ASSET_BASE}/2.webp`,
    brand: "Kalender",
    title: "Ketersediaan",
    cta: "Lihat kalender",
    alt: "Ilustrasi kalender ketersediaan lapangan",
  },
  {
    img: `${ASSET_BASE}/3.webp`,
    brand: "Slot Jam",
    title: "06.00–00.00",
    cta: "Lihat slot",
    alt: "Ilustrasi daftar slot jam per lapangan",
  },
  {
    img: `${ASSET_BASE}/5.webp`,
    brand: "Kontak",
    title: "Petugas Lapangan",
    cta: "Hubungi petugas",
    alt: "Ilustrasi kontak petugas lapangan",
  },
];

export const TRUST_SLIDES: TrustSlide[] = [
  {
    img: `${ASSET_BASE}/5.webp`,
    name: "Lapangan K.S Tubun",
    role: "Fasilitas Olahraga",
    alt: "Foto Lapangan K.S Tubun",
    headline: ["Jadwal", "Akurat", "Data", "Terpusat"],
  },
  {
    img: `${ASSET_BASE}/4.webp`,
    name: "Lapangan Dr. Mardjani",
    role: "Fasilitas Olahraga",
    alt: "Foto Lapangan Dr. Mardjani",
    headline: ["Slot", "Tersedia", "Pilih", "Tanggal"],
  },
  {
    img: `${ASSET_BASE}/1.webp`,
    name: "Lapangan Tenis Idaman",
    role: "Fasilitas Olahraga",
    alt: "Foto Lapangan Tenis Idaman",
    headline: ["Empat", "Lapangan", "Siap", "Digunakan"],
  },
];
