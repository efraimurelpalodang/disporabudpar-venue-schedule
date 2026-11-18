export const WITA_TIMEZONE = "Asia/Makassar";

export interface WitaDateParts {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hour: number; // 0-23
  minute: number; // 0-59
  second: number; // 0-59
}

const witaPartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: WITA_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const tanggalLengkapFormatter = new Intl.DateTimeFormat("id-ID", {
  timeZone: WITA_TIMEZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const tanggalRingkasFormatter = new Intl.DateTimeFormat("id-ID", {
  timeZone: WITA_TIMEZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const bulanTahunFormatter = new Intl.DateTimeFormat("id-ID", {
  timeZone: WITA_TIMEZONE,
  month: "long",
  year: "numeric",
});

/**
 * Mengambil komponen tanggal & waktu saat ini (atau dari objek Date tertentu)
 * secara konsisten dalam zona waktu WITA (Asia/Makassar, UTC+8).
 */
export function getWitaDateParts(now: Date = new Date()): WitaDateParts {
  const parts = witaPartsFormatter.formatToParts(now);
  const map = new Map<string, number>();

  for (const part of parts) {
    if (part.type !== "literal") {
      map.set(part.type, Number.parseInt(part.value, 10));
    }
  }

  return {
    year: map.get("year") ?? 0,
    month: map.get("month") ?? 1,
    day: map.get("day") ?? 1,
    hour: map.get("hour") ?? 0,
    minute: map.get("minute") ?? 0,
    second: map.get("second") ?? 0,
  };
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Mengembalikan tanggal hari ini di zona waktu WITA dalam format ISO `YYYY-MM-DD`.
 */
export function getWitaTodayISO(now: Date = new Date()): string {
  const { year, month, day } = getWitaDateParts(now);
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

/**
 * Mengembalikan string bulan berjalan di WITA dalam format `YYYY-MM`.
 */
export function getWitaCurrentMonthKey(now: Date = new Date()): string {
  const { year, month } = getWitaDateParts(now);
  return `${year}-${pad2(month)}`;
}

/**
 * Memvalidasi format tanggal ISO `YYYY-MM-DD` dan mengembalikan Date pada tengah hari WITA
 * agar aman dari pergeseran tanggal antar zona waktu saat diformat.
 */
export function parseTanggalISOToWitaNoon(tanggalIso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(tanggalIso);
  if (!match) {
    throw new Error(
      `Format tanggal tidak valid: "${tanggalIso}". Gunakan format YYYY-MM-DD.`
    );
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  // 12:00:00 WITA = 04:00:00 UTC
  const date = new Date(Date.UTC(year, month - 1, day, 4, 0, 0));
  const check = getWitaDateParts(date);

  if (check.year !== year || check.month !== month || check.day !== day) {
    throw new Error(`Tanggal kalender tidak valid: "${tanggalIso}".`);
  }

  return date;
}

/**
 * Memformat tanggal ISO `YYYY-MM-DD` ke Bahasa Indonesia (contoh: "Rabu, 18 November 2026").
 */
export function formatTanggalWita(
  tanggalIso: string,
  options: { denganHari?: boolean } = { denganHari: true }
): string {
  const date = parseTanggalISOToWitaNoon(tanggalIso);
  return options.denganHari
    ? tanggalLengkapFormatter.format(date)
    : tanggalRingkasFormatter.format(date);
}

/**
 * Memformat tahun & bulan ke Bahasa Indonesia (contoh: "November 2026").
 */
export function formatBulanTahunWita(year: number, month: number): string {
  const date = new Date(Date.UTC(year, month - 1, 15, 4, 0, 0));
  return bulanTahunFormatter.format(date);
}

/**
 * Memformat timestamp (Date atau ISO string) ke tampilan WITA
 * (contoh: "18 November 2026, 12.05 WITA").
 */
export function formatTimestampWita(input: Date | string): string {
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) {
    throw new Error("Nilai waktu tidak valid.");
  }

  const { hour, minute } = getWitaDateParts(date);
  const tanggal = tanggalRingkasFormatter.format(date);
  return `${tanggal}, ${pad2(hour)}.${pad2(minute)} WITA`;
}
