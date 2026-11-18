export type JenisLapangan = "Umum" | "Non-umum";

export type HariPertamaPekan = "senin" | "minggu";

export interface LapanganPublik {
  id: string;
  nama: string;
  jenis: JenisLapangan;
  tarif: number | null;
  jam_buka: string;
  jam_tutup: string;
  nomor_petugas: string | null;
  foto: string | null;
}

/**
 * Representasi slot peminjaman untuk respons publik.
 * DILARANG menyertakan nama_peminjam, nomor_surat, atau catatan (PRD NFR 2).
 */
export interface PeminjamanPublikSlot {
  tanggal: string; // YYYY-MM-DD
  jam_mulai: string; // HH:00
  jam_selesai: string; // HH:00
}
