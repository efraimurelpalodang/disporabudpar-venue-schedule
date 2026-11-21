import { LapanganDetail } from "@/types/landing";
import { RentangJamTerisi } from "@/lib/jadwal";

export type { LapanganDetail };

export const DAFTAR_LAPANGAN: LapanganDetail[] = [
  {
    id: "ks-tubun",
    slug: "ks-tubun",
    nama: "Lapangan K.S Tubun",
    jenis: "Umum",
    tarif: 0,
    jam_buka: "06:00",
    jam_tutup: "00:00",
    nomor_petugas: "081255501001",
    foto: "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp",
    deskripsi: "Lapangan serbaguna luar ruangan yang terletak di kawasan strategis K.S Tubun untuk berbagai cabang olahraga masyarakat.",
  },
  {
    id: "dr-mardjani",
    slug: "dr-mardjani",
    nama: "Lapangan Sepak Bola Dr. Mardjani",
    jenis: "Umum",
    tarif: 0,
    jam_buka: "06:00",
    jam_tutup: "00:00",
    nomor_petugas: "081255501002",
    foto: "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/2.webp",
    deskripsi: "Lapangan sepak bola rumput alami berstandar pertandingan untuk kegiatan latihan klub lokal dan kompetisi resmi.",
  },
  {
    id: "tenis-idaman",
    slug: "tenis-idaman",
    nama: "Lapangan Tenis Idaman",
    jenis: "Umum",
    tarif: 50000,
    jam_buka: "06:00",
    jam_tutup: "00:00",
    nomor_petugas: "081255501003",
    foto: "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/3.webp",
    deskripsi: "Fasilitas lapangan tenis hard court dengan pencahayaan malam untuk latihan komunitas dan rekreasi.",
  },
  {
    id: "gor-rudy",
    slug: "gor-rudy",
    nama: "GOR Rudy Resnawan",
    jenis: "Non-umum",
    tarif: 100000,
    jam_buka: "06:00",
    jam_tutup: "00:00",
    nomor_petugas: "081255501004",
    foto: "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/4.webp",
    deskripsi: "Gedung olahraga indoor multifungsi berkapasitas besar untuk kejuaraan bulutangkis, futsal, dan perhelatan olahraga daerah.",
  },
];

/**
 * Data simulasi peminjaman terdaftar (single source of truth publik).
 * Hanya memuat tanggal & rentang jam operasional (tanpa data sensitif peminjam).
 */
export const SAMPLE_PEMINJAMAN: Record<string, Record<string, RentangJamTerisi[]>> = {
  "ks-tubun": {
    // Hari ini & hari-hari berikutnya
    offset_0: [
      { jamMulai: 8, jamSelesai: 10 },
      { jamMulai: 16, jamSelesai: 18 },
    ],
    offset_1: [
      { jamMulai: 19, jamSelesai: 22 },
    ],
    offset_2: [
      { jamMulai: 6, jamSelesai: 8 },
      { jamMulai: 15, jamSelesai: 17 },
      { jamMulai: 20, jamSelesai: 22 },
    ],
    offset_3: [
      { jamMulai: 6, jamSelesai: 24 }, // Penuh seharian
    ],
    offset_5: [
      { jamMulai: 7, jamSelesai: 11 },
    ],
  },
  "dr-mardjani": {
    offset_0: [
      { jamMulai: 15, jamSelesai: 18 },
    ],
    offset_1: [
      { jamMulai: 7, jamSelesai: 10 },
      { jamMulai: 15, jamSelesai: 18 },
    ],
    offset_3: [
      { jamMulai: 14, jamSelesai: 18 },
    ],
    offset_6: [
      { jamMulai: 6, jamSelesai: 12 },
    ],
  },
  "tenis-idaman": {
    offset_0: [
      { jamMulai: 18, jamSelesai: 21 },
    ],
    offset_1: [
      { jamMulai: 6, jamSelesai: 9 },
      { jamMulai: 19, jamSelesai: 22 },
    ],
    offset_2: [
      { jamMulai: 16, jamSelesai: 20 },
    ],
    offset_4: [
      { jamMulai: 19, jamSelesai: 23 },
    ],
  },
  "gor-rudy": {
    offset_0: [
      { jamMulai: 9, jamSelesai: 12 },
      { jamMulai: 19, jamSelesai: 23 },
    ],
    offset_2: [
      { jamMulai: 13, jamSelesai: 17 },
    ],
    offset_4: [
      { jamMulai: 6, jamSelesai: 24 }, // Penuh turnamen
    ],
  },
};
