import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buatUrlWhatsApp,
  formatJam,
  formatRentangJamOperasional,
  formatTarifLapangan,
  hitungSlotHarian,
  hitungStatusTanggal,
  isBentrokJam,
  isDalamJamOperasional,
  normalisasiNomorPetugas,
  parseJamMulai,
  parseJamSelesai,
} from "../jadwal";
import {
  formatTanggalWita,
  formatTimestampWita,
  getWitaDateParts,
  getWitaTodayISO,
} from "../wita";

describe("Utilitas Zona Waktu WITA", () => {
  it("menghitung tanggal & jam WITA secara akurat lintas pergantian hari UTC", () => {
    // 2026-11-18 17:30:00 UTC = 2026-11-19 01:30:00 WITA (UTC+8)
    const waktuUtc = new Date("2026-11-18T17:30:00.000Z");
    assert.equal(getWitaTodayISO(waktuUtc), "2026-11-19");
    const parts = getWitaDateParts(waktuUtc);
    assert.equal(parts.year, 2026);
    assert.equal(parts.month, 11);
    assert.equal(parts.day, 19);
    assert.equal(parts.hour, 1);
    assert.equal(parts.minute, 30);
  });

  it("memformat tanggal & timestamp ke Bahasa Indonesia WITA", () => {
    assert.equal(
      formatTanggalWita("2026-11-18", { denganHari: false }),
      "18 November 2026"
    );
    const waktuUtc = new Date("2026-11-18T04:05:00.000Z"); // 12:05 WITA
    assert.equal(formatTimestampWita(waktuUtc), "18 November 2026, 12.05 WITA");
  });
});

describe("Utilitas Jam, Slot, dan Anti-Bentrok", () => {
  it("mengurai jam mulai dan jam selesai termasuk 00.00 sebagai 24.00", () => {
    assert.equal(parseJamMulai("06.00"), 6);
    assert.equal(parseJamMulai("23:00"), 23);
    assert.equal(parseJamSelesai("00.00"), 24);
    assert.equal(parseJamSelesai("00:00"), 24);
    assert.equal(formatJam(6), "06.00");
    assert.equal(formatJam(24), "00.00");
    assert.equal(
      formatRentangJamOperasional("06:00", "00:00"),
      "06.00 – 00.00 WITA"
    );
  });

  it("mendeteksi bentrok jadwal dan mengizinkan jadwal yang berbatasan langsung", () => {
    assert.equal(isBentrokJam(10, 12, 8, 10), false);
    assert.equal(isBentrokJam(6, 8, 8, 10), false);
    assert.equal(isBentrokJam(9, 11, 8, 10), true);
    assert.equal(isBentrokJam(8, 10, 8, 10), true);
    assert.equal(isBentrokJam(22, 24, 23, 24), true);
  });

  it("memvalidasi rentang jam di dalam jam operasional", () => {
    assert.equal(isDalamJamOperasional(6, 24, 6, 24), true);
    assert.equal(isDalamJamOperasional(5, 8, 6, 24), false);
    assert.equal(isDalamJamOperasional(10, 10, 6, 24), false);
  });

  it("membagi jam operasional 06.00-00.00 menjadi 18 slot dan menandai status sesuai FR-03", () => {
    const nowWita = new Date("2026-11-18T01:30:00.000Z"); // 09:30 WITA
    const slots = hitungSlotHarian({
      tanggal: "2026-11-18",
      jamBuka: 6,
      jamTutup: 24,
      peminjaman: [{ jamMulai: 10, jamSelesai: 12 }],
      now: nowWita,
    });

    assert.equal(slots.length, 18);
    assert.equal(slots[0].label, "06.00–07.00");
    assert.equal(slots[17].label, "23.00–00.00");
    assert.equal(slots.find((s) => s.jamMulai === 9)?.status, "lewat");
    assert.equal(slots.find((s) => s.jamMulai === 10)?.status, "terisi");
    assert.equal(slots.find((s) => s.jamMulai === 11)?.status, "terisi");
    assert.equal(slots.find((s) => s.jamMulai === 12)?.status, "tersedia");
  });

  it("menghitung 4 status tanggal kalender sesuai FR-02", () => {
    // 2026-11-18 20:15 WITA = 12:15 UTC
    const nowWita = new Date("2026-11-18T12:15:00.000Z");

    assert.equal(
      hitungStatusTanggal({
        tanggal: "2026-11-17",
        peminjaman: [],
        now: nowWita,
      }),
      "lewat"
    );

    // Peminjaman pagi (08-10) sudah lewat; sisa slot (21, 22, 23) kosong -> tersedia
    assert.equal(
      hitungStatusTanggal({
        tanggal: "2026-11-18",
        peminjaman: [{ jamMulai: 8, jamSelesai: 10 }],
        now: nowWita,
      }),
      "tersedia"
    );

    assert.equal(
      hitungStatusTanggal({
        tanggal: "2026-11-18",
        peminjaman: [{ jamMulai: 21, jamSelesai: 22 }],
        now: nowWita,
      }),
      "sebagian_terisi"
    );

    assert.equal(
      hitungStatusTanggal({
        tanggal: "2026-11-18",
        peminjaman: [{ jamMulai: 21, jamSelesai: 24 }],
        now: nowWita,
      }),
      "penuh"
    );

    const lewatSemua = new Date("2026-11-18T15:05:00.000Z"); // 23:05 WITA
    assert.equal(
      hitungStatusTanggal({
        tanggal: "2026-11-18",
        peminjaman: [],
        now: lewatSemua,
      }),
      "lewat"
    );

    assert.equal(
      hitungStatusTanggal({
        tanggal: "2026-11-19",
        peminjaman: [{ jamMulai: 6, jamSelesai: 24 }],
        now: nowWita,
      }),
      "penuh"
    );
  });

  it("menormalisasi nomor petugas dan memformat tarif lapangan", () => {
    assert.equal(normalisasiNomorPetugas("0812-3456-7890"), "6281234567890");
    assert.equal(
      normalisasiNomorPetugas("+62 812 3456 7890"),
      "6281234567890"
    );
    assert.equal(
      buatUrlWhatsApp("0812-3456-7890"),
      "https://wa.me/6281234567890"
    );
    assert.equal(buatUrlWhatsApp(""), null);
    assert.equal(formatTarifLapangan(0), "Gratis");
    assert.equal(formatTarifLapangan(null), "Gratis");
    assert.equal(formatTarifLapangan(150000), "Rp 150.000 / jam");
  });
});
