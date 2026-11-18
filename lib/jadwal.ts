import { getWitaDateParts, getWitaTodayISO } from "./wita";

export const JAM_BUKA_BAWAAN = 6; // 06.00 WITA
export const JAM_TUTUP_BAWAAN = 24; // 00.00 WITA (akhir hari)

export type StatusTanggal = "tersedia" | "sebagian_terisi" | "penuh" | "lewat";
export type StatusSlot = "tersedia" | "terisi" | "lewat";

export interface RentangJamTerisi {
  jamMulai: number; // 0..23
  jamSelesai: number; // 1..24 (24 merepresentasikan 00.00 akhir hari)
}

export interface SlotJamHarian {
  jamMulai: number;
  jamSelesai: number;
  label: string; // contoh: "06.00–07.00" atau "23.00–00.00"
  status: StatusSlot;
}

/**
 * Mengurai string/angka jam mulai (jam penuh `:00`) menjadi angka 0..23.
 */
export function parseJamMulai(value: string | number): number {
  if (typeof value === "number") {
    if (!Number.isInteger(value) || value < 0 || value > 23) {
      throw new Error(
        "Jam mulai harus berupa jam penuh antara 00.00 hingga 23.00."
      );
    }
    return value;
  }

  const normalized = value.trim().replace(".", ":");
  const match = /^(\d{2}):00(?::00)?$/.exec(normalized);
  if (!match) {
    throw new Error(
      "Format jam mulai harus jam penuh (contoh: 06.00 atau 06:00)."
    );
  }

  const hour = Number.parseInt(match[1], 10);
  if (hour < 0 || hour > 23) {
    throw new Error("Jam mulai harus berada di antara 00.00 hingga 23.00.");
  }
  return hour;
}

/**
 * Mengurai string/angka jam selesai/tutup (jam penuh `:00`) menjadi angka 1..24.
 * Nilai "00.00" / "00:00" / 0 / 24 dievaluasi sebagai akhir hari (24).
 */
export function parseJamSelesai(value: string | number): number {
  if (typeof value === "number") {
    if (value === 0 || value === 24) return 24;
    if (!Number.isInteger(value) || value < 1 || value > 24) {
      throw new Error(
        "Jam selesai harus berupa jam penuh antara 01.00 hingga 00.00."
      );
    }
    return value;
  }

  const normalized = value.trim().replace(".", ":");
  const match = /^(\d{2}):00(?::00)?$/.exec(normalized);
  if (!match) {
    throw new Error(
      "Format jam selesai harus jam penuh (contoh: 10.00 atau 00.00)."
    );
  }

  const hour = Number.parseInt(match[1], 10);
  if (hour === 0 || hour === 24) return 24;
  if (hour < 1 || hour > 23) {
    throw new Error("Jam selesai harus berada di antara 01.00 hingga 00.00.");
  }
  return hour;
}

/**
 * Memformat angka jam (0..24) menjadi string `HH.00` (24 dan 0 menjadi `00.00`).
 */
export function formatJam(hour: number): string {
  const displayHour = hour === 24 ? 0 : hour;
  return `${String(displayHour).padStart(2, "0")}.00`;
}

/**
 * Memformat angka jam (0..24) menjadi format standar basis data `HH:00` (24 menjadi `00:00`).
 */
export function formatJamDB(hour: number): string {
  const displayHour = hour === 24 ? 0 : hour;
  return `${String(displayHour).padStart(2, "0")}:00`;
}

/**
 * Memformat rentang jam operasional lapangan sesuai PRD FR-01 (`06.00 – 00.00 WITA`).
 */
export function formatRentangJamOperasional(
  jamBuka: string | number = JAM_BUKA_BAWAAN,
  jamTutup: string | number = JAM_TUTUP_BAWAAN
): string {
  const buka = parseJamMulai(jamBuka);
  const tutup = parseJamSelesai(jamTutup);
  return `${formatJam(buka)} – ${formatJam(tutup)} WITA`;
}

/**
 * Memformat label satu slot jam (contoh: `06.00–07.00` atau `23.00–00.00`).
 */
export function formatLabelSlot(jamMulai: number, jamSelesai: number): string {
  return `${formatJam(jamMulai)}–${formatJam(jamSelesai)}`;
}

/**
 * Memeriksa apakah dua rentang peminjaman beririsan (bentrok).
 * Jadwal yang berbatasan langsung (misal 08.00–10.00 dan 10.00–12.00) TIDAK dianggap bentrok.
 */
export function isBentrokJam(
  mulaiBaru: number,
  selesaiBaru: number,
  mulaiLama: number,
  selesaiLama: number
): boolean {
  return mulaiBaru < selesaiLama && selesaiBaru > mulaiLama;
}

/**
 * Memeriksa apakah suatu rentang peminjaman valid di dalam jam operasional lapangan.
 */
export function isDalamJamOperasional(
  jamMulai: number,
  jamSelesai: number,
  jamBuka: number,
  jamTutup: number
): boolean {
  return jamMulai >= jamBuka && jamSelesai <= jamTutup && jamSelesai > jamMulai;
}

/**
 * Menghasilkan daftar slot per 1 jam penuh beserta status (`tersedia`, `terisi`, `lewat`)
 * untuk suatu tanggal tertentu berdasarkan zona waktu WITA.
 */
export function hitungSlotHarian(params: {
  tanggal: string; // YYYY-MM-DD
  jamBuka?: number;
  jamTutup?: number;
  peminjaman: RentangJamTerisi[];
  now?: Date;
}): SlotJamHarian[] {
  const {
    tanggal,
    jamBuka = JAM_BUKA_BAWAAN,
    jamTutup = JAM_TUTUP_BAWAAN,
    peminjaman,
    now = new Date(),
  } = params;

  const todayWita = getWitaTodayISO(now);
  const witaNow = getWitaDateParts(now);
  const isPastDate = tanggal < todayWita;
  const isToday = tanggal === todayWita;

  const slots: SlotJamHarian[] = [];

  for (let jam = jamBuka; jam < jamTutup; jam += 1) {
    const jamSelesai = jam + 1;
    const isLewat = isPastDate || (isToday && witaNow.hour >= jam);

    let status: StatusSlot;
    if (isLewat) {
      status = "lewat";
    } else {
      const isTerisi = peminjaman.some((item) =>
        isBentrokJam(jam, jamSelesai, item.jamMulai, item.jamSelesai)
      );
      status = isTerisi ? "terisi" : "tersedia";
    }

    slots.push({
      jamMulai: jam,
      jamSelesai,
      label: formatLabelSlot(jam, jamSelesai),
      status,
    });
  }

  return slots;
}

/**
 * Menghitung status ketersediaan tanggal pada kalender bulanan sesuai PRD FR-02:
 * - `lewat`: tanggal sebelum hari ini, atau hari ini ketika seluruh slot jam operasional telah terlewat.
 * - `tersedia`: tidak ada slot jam terisi pada sisa slot yang belum lewat.
 * - `penuh`: seluruh sisa slot yang belum lewat telah terisi.
 * - `sebagian_terisi`: ada slot yang terisi, namun masih ada minimal 1 sisa slot yang kosong.
 */
export function hitungStatusTanggal(params: {
  tanggal: string; // YYYY-MM-DD
  jamBuka?: number;
  jamTutup?: number;
  peminjaman: RentangJamTerisi[];
  now?: Date;
}): StatusTanggal {
  const slots = hitungSlotHarian(params);
  const sisaSlot = slots.filter((slot) => slot.status !== "lewat");

  if (sisaSlot.length === 0) {
    return "lewat";
  }

  const jumlahTerisi = sisaSlot.filter((slot) => slot.status === "terisi").length;

  if (jumlahTerisi === 0) {
    return "tersedia";
  }

  if (jumlahTerisi === sisaSlot.length) {
    return "penuh";
  }

  return "sebagian_terisi";
}

/**
 * Menormalisasi input `nomor_petugas` sesuai PRD FR-07:
 * - Menghapus tanda `+`, spasi, tanda hubung, dan karakter non-angka.
 * - Mengonversi awalan `0` menjadi kode negara `62`.
 */
export function normalisasiNomorPetugas(
  input: string | null | undefined
): string | null {
  if (!input) return null;
  const digitsOnly = input.replace(/\D/g, "");
  if (!digitsOnly) return null;
  if (digitsOnly.startsWith("0")) {
    return `62${digitsOnly.slice(1)}`;
  }
  return digitsOnly;
}

/**
 * Menghasilkan URL WhatsApp petugas tanpa pesan otomatis sesuai PRD FR-04.
 */
export function buatUrlWhatsApp(
  nomorPetugas: string | null | undefined
): string | null {
  const nomor = normalisasiNomorPetugas(nomorPetugas);
  if (!nomor) return null;
  return `https://wa.me/${nomor}`;
}

const rupiahFormatter = new Intl.NumberFormat("id-ID");

/**
 * Memformat tarif lapangan per jam sesuai PRD FR-01:
 * Nominal rupiah per jam jika > 0, atau "Gratis" jika kosong / 0.
 */
export function formatTarifLapangan(tarif: number | null | undefined): string {
  if (tarif == null || tarif <= 0) {
    return "Gratis";
  }
  return `Rp ${rupiahFormatter.format(tarif)} / jam`;
}
