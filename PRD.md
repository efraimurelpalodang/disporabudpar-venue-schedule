# PRD — Aplikasi Jadwal Lapangan Disporabudpar

| Atribut | Detail | 
| ----- | ----- | 
| **Pemilik Produk** | Disporabudpar, Bidang Olahraga | 
| **Versi** | 2.1 | 
| **Zona Waktu Sistem** | WITA (`Asia/Makassar`) | 
| **Bahasa Antarmuka & Basis Data** | Bahasa Indonesia | 

## 1. Problem Statement

1. Disporabudpar Bidang Olahraga mengelola beberapa fasilitas lapangan olahraga (saat ini mencakup Lapangan K.S Tubun, Lapangan Sepak Bola Dr. Mardjani, Lapangan Tenis Idaman, dan GOR Rudy Resnawan).

2. Proses pengajuan peminjaman lapangan dilakukan melalui surat fisik yang diantar langsung ke kantor, namun saat ini belum ada sistem pencatatan jadwal terpusat.

3. Dampak dari ketiadaan sistem pencatatan tersebut meliputi:

   * Masyarakat umum tidak dapat memeriksa ketersediaan tanggal dan jam lapangan secara mandiri tanpa harus menghubungi petugas atau datang langsung ke kantor.

   * Petugas dan staf administrasi tidak memiliki satu sumber data terpusat (*single source of truth*) untuk mendeteksi dan mencegah bentrok jadwal peminjaman.

## 2. Goals

1. **Transparansi Informasi Publik:** Menyediakan akses informasi ketersediaan lapangan per tanggal dan per slot jam (06.00–00.00 WITA), informasi tarif, jam operasional, serta kontak WhatsApp petugas secara langsung tanpa memerlukan akun pengguna.

2. **Sentralisasi Pencatatan Jadwal:** Menyediakan sistem bagi admin pusat untuk mendokumentasikan peminjaman berdasarkan surat yang telah diproses.

3. **Pencegahan Bentrok Otomatis:** Memastikan sistem menolak secara otomatis setiap input jadwal peminjaman baru yang bertumpuk pada lapangan, tanggal, dan slot jam yang sama.

4. **Efisiensi dan Keamanan Operasional:** Memenuhi target kinerja dan kualitas operasional berikut:

   * **Kelengkapan Data:** 100% surat peminjaman yang telah diproses diinput ke dalam sistem dalam waktu maksimal 1 hari kerja.

   * **Waktu Input:** Admin dapat menyelesaikan pencatatan satu data peminjaman (tanpa kondisi bentrok) dalam waktu $\le 1$ menit.

   * **Akurasi & Integritas Jadwal:** 0 kejadian bentrok jam peminjaman yang tersimpan di basis data dan 0 laporan ketidaksesuaian status ketersediaan.

   * **Ketersegaran Data:** Selisih waktu pembaruan terakhir $\le 7$ hari selama terdapat aktivitas peminjaman.

   * **Privasi Data:** 0 kejadian kebocoran data internal (nama peminjam, nomor surat, dan catatan) pada halaman maupun respons API publik.

## 3. Target Users

| Kategori Pengguna | Deskripsi & Karakteristik | Perangkat Akses | 
| ----- | ----- | ----- | 
| **Pengunjung (Primer)** | Masyarakat umum, pembina olahraga, atau pengurus kelompok yang ingin memeriksa jadwal lapangan sebelum mengajukan surat permohonan peminjaman. Mengakses sistem tanpa autentikasi/login. | Perangkat seluler / HP (utama) dan komputer desktop. | 
| **Admin Pusat (Sekunder)** | Satu staf resmi Disporabudpar Bidang Olahraga yang ditugaskan untuk mengelola data peminjaman, data lapangan, dan pengaturan sistem. Mengakses sistem menggunakan autentikasi akun tunggal. | Komputer kantor (utama) dan perangkat seluler / HP. | 

## 4. User Stories

### Pengunjung Publik

* **US-01:** Sebagai pengunjung, saya ingin memilih lapangan dari daftar yang tersedia agar saya dapat melihat informasi dan jadwal spesifik untuk lapangan tersebut.

* **US-02:** Sebagai pengunjung, saya ingin melihat detail lapangan (nama, jenis penggunaan, tarif per jam atau gratis, foto, dan jam operasional dalam WITA) agar saya mengetahui ketentuan dasar penggunaan lapangan.

* **US-03:** Sebagai pengunjung, saya ingin melihat status ketersediaan tanggal pada kalender bulanan (*Tersedia*, *Sebagian terisi*, *Penuh*, atau *Lewat*) agar saya dapat segera mengidentifikasi hari yang masih memiliki slot kosong.

* **US-04:** Sebagai pengunjung, saya ingin memilih suatu tanggal yang masih tersedia untuk melihat rincian slot per jam (06.00–00.00 WITA) sehingga saya mengetahui jam mana saja yang masih kosong atau sudah terisi.

* **US-05:** Sebagai pengunjung, saya ingin melihat informasi waktu pembaruan data terakhir ("Terakhir diperbarui") agar saya mengetahui tingkat kebaruan data jadwal yang ditampilkan.

* **US-06:** Sebagai pengunjung, saya ingin menghubungi petugas lapangan terkait secara langsung melalui tautan WhatsApp agar saya dapat berkonsultasi sebelum mengirimkan surat permohonan ke kantor.

### Admin Pusat

* **US-07:** Sebagai admin, saya ingin masuk (*login*) dan keluar (*logout*) dari sistem menggunakan akun resmi agar hanya pihak berwenang yang dapat mengubah data.

* **US-08:** Sebagai admin, saya ingin menambahkan, mencari, memfilter, mengubah, dan menghapus catatan peminjaman lapangan beserta informasi peminjam, nomor surat, dan catatan agar seluruh jadwal terdokumentasi dengan rapi.

* **US-09:** Sebagai admin, saya ingin sistem menolak secara otomatis jadwal yang bentrok pada lapangan dan jam yang sama beserta rincian jadwal yang berbenturan agar tidak terjadi jadwal ganda (*double booking*).

* **US-10:** Sebagai admin, saya ingin menambah, mengubah, dan menghapus data lapangan beserta foto dan jam operasionalnya agar daftar fasilitas selalu sesuai dengan kondisi aktual di lapangan.

* **US-11:** Sebagai admin, saya ingin memperbarui teks informasi halaman publik, parameter kalender, info kontak, dan parameter kompresi foto melalui menu pengaturan tanpa harus mengubah kode sumber aplikasi.

## 5. Functional Requirements

### FR-01. Pemilihan dan Informasi Lapangan (Publik)

1. Sistem menampilkan seluruh data dari tabel `lapangan` yang diurutkan berdasarkan waktu penambahan (data paling lama berada di urutan pertama).

2. Saat halaman publik diakses pertama kali, lapangan pertama dipilih secara otomatis. Jika tabel `lapangan` kosong, sistem menampilkan pesan bahwa belum ada lapangan tanpa menghasilkan error.

3. Pergantian pilihan lapangan akan memperbarui data informasi lapangan, kalender ketersediaan, dan tautan WhatsApp petugas secara dinamis tanpa memuat ulang halaman penuh, serta mereset tanggal yang sedang dipilih.

4. Informasi lapangan yang ditampilkan meliputi:

   * **Nama lapangan** dan **Jenis lapangan** (`Umum` atau `Non-umum`).

   * **Tarif:** Menampilkan nominal rupiah per jam jika nilai $> 0$, atau menampilkan teks `Gratis` jika nilai kosong atau $0$.

   * **Jam Operasional:** Ditampilkan dalam format `HH.mm – HH.mm WITA` (bawaan: `06.00 – 00.00 WITA`).

   * **Foto Lapangan:** Menampilkan foto lapangan atau gambar bawaan (*default fallback*) apabila lapangan tidak memiliki foto atau tautan foto gagal dimuat.

### FR-02. Kalender Ketersediaan Bulanan (Publik)

1. Menampilkan kalender dari bulan berjalan hingga $N$ bulan ke depan sesuai nilai `kalender_jangkauan_bulan` (bawaan: 12 bulan). Navigasi ke bulan sebelum bulan berjalan dinonaktifkan.

2. Hari pertama dalam sepekan mengikuti pengaturan `kalender_hari_pertama_pekan` (`senin` atau `minggu`, bawaan: `senin`).

3. Setiap tanggal memiliki salah satu dari empat status logika berikut (dihitung berdasarkan zona waktu WITA):

   * **Tersedia:** Tidak ada slot jam yang terisi pada tanggal tersebut (atau pada sisa slot jam yang belum lewat untuk hari ini). Tanggal dapat dipilih.

   * **Sebagian terisi:** Terdapat peminjaman, namun masih ada minimal satu slot jam operasional (yang belum lewat) yang kosong. Tanggal dapat dipilih.

   * **Penuh:** Seluruh slot jam operasional pada tanggal tersebut (atau seluruh sisa slot yang belum lewat untuk hari ini) telah terisi. Tanggal dinonaktifkan (tidak dapat dipilih).

   * **Lewat:** Tanggal sebelum hari ini, atau hari ini ketika seluruh slot jam operasional telah terlewat. Tanggal dinonaktifkan (tidak dapat dipilih).

4. Berpindah bulan pada navigasi kalender tidak mereset tanggal yang sedang aktif dipilih.

5. Penutupan lapangan seharian penuh ditangani dengan mencatat peminjaman dari jam buka hingga jam tutup (`06.00–00.00`) disertai keterangan pada kolom catatan, sehingga status tanggal otomatis menjadi **Penuh**.

### FR-03. Daftar Slot Jam Harian (Publik)

1. Rincian daftar slot jam hanya dimuat dan ditampilkan setelah pengunjung memilih tanggal berstatus **Tersedia** atau **Sebagian terisi**.

2. Sistem membagi waktu operasional menjadi slot berdurasi 1 jam penuh (untuk jam operasional 06.00–00.00 terdapat 18 slot: `06.00–07.00` hingga `23.00–00.00`).

3. Setiap slot jam memiliki status teks eksplisit:

   * **Tersedia:** Tidak ada data peminjaman yang mencakup rentang slot jam tersebut.

   * **Terisi:** Terdapat data peminjaman yang mencakup rentang slot jam tersebut (contoh: peminjaman `08.00–10.00` mengubah status slot `08.00–09.00` dan `09.00–10.00` menjadi **Terisi**, sedangkan `10.00–11.00` tetap **Tersedia**).

   * **Lewat:** Berlaku khusus pada tanggal hari ini untuk slot yang waktu mulainya telah terlewati menurut waktu WITA.

4. Slot jam bersifat informatif satu arah (tidak memiliki aksi klik/interaksi transaksi).

### FR-04. Kontak WhatsApp Petugas & Keterangan Pembaruan Data

1. Tombol kontak petugas mengarahkan pengguna ke URL `https://wa.me/<nomor_petugas>` sesuai lapangan yang aktif dipilih, tanpa pesan otomatis bawaan.

2. Apabila lapangan tidak memiliki nomor petugas, aksi kontak dinonaktifkan.

3. Sistem menampilkan keterangan waktu `terakhir_diperbarui` dalam zona waktu WITA di halaman publik.

4. Nilai `terakhir_diperbarui` diperbarui secara otomatis oleh sistem setiap kali terdapat aksi tambah, ubah, atau hapus pada data `peminjaman` maupun `lapangan`. Perubahan pada tabel `pengaturan` tidak mengubah nilai `terakhir_diperbarui`.

### FR-05. Autentikasi Admin

1. Autentikasi menggunakan email dan kata sandi melalui sistem autentikasi terpusat untuk satu akun admin pusat.

2. Pendaftaran akun publik dinonaktifkan; pembuatan akun hanya dilakukan secara manual pada layanan basis data/autentikasi.

3. Seluruh rute halaman dan aksi server (*server actions* / API) khusus admin wajib memverifikasi sesi aktif. Pengguna tanpa sesi aktif ditolak dan diarahkan ke halaman login.

4. Apabila sesi kedaluwarsa saat admin mengirim form, sistem menolak penyimpanan data secara utuh dan mengembalikan pesan bahwa sesi telah berakhir.

### FR-06. Manajemen Peminjaman & Pencegahan Bentrok (Admin)

1. Satu entri peminjaman mewakili satu lapangan pada satu tanggal tertentu. Kegiatan multi-hari diinput per tanggal.

2. Aturan atribut pada tabel `peminjaman`:

   * `lapangan` (Wajib): Referensi ke data lapangan yang terdaftar.

   * `tanggal` (Wajib): Tanggal valid (diizinkan memilih tanggal lampau maupun tanggal di luar batas rentang bulan kalender publik).

   * `jam_mulai` (Wajib): Jam penuh (`:00`) di dalam rentang jam operasional lapangan (contoh: `06.00` s/d `23.00`).

   * `jam_selesai` (Wajib): Jam penuh (`:00`) di dalam rentang jam operasional lapangan; nilainya harus lebih besar daripada `jam_mulai`. Nilai `00.00` diizinkan dan dievaluasi sebagai akhir hari ($24.00$). Peminjaman tidak boleh melewati `00.00`.

   * `nama_peminjam` (Wajib), `nomor_surat` (Opsional), `catatan` (Opsional): Hanya dapat diakses oleh admin.

3. **Aturan Pencegahan Bentrok:**

   * Server memvalidasi setiap aksi tambah dan ubah peminjaman.

   * Penyimpanan ditolak apabila pada `lapangan` dan `tanggal` yang sama sudah terdapat peminjaman lain yang beririsan minimal satu slot jam ($\text{jam\_mulai\_baru} < \text{jam\_selesai\_lama}$ dan $\text{jam\_selesai\_baru} > \text{jam\_mulai\_lama}$).

   * Jadwal yang berbatasan langsung (misal peminjaman A berakhir `10.00` dan peminjaman B dimulai `10.00`) diizinkan dan tidak dianggap bentrok.

   * Saat mengubah data peminjaman yang sudah ada, rekaman itu sendiri dikecualikan dari pemeriksaan bentrok terhadap dirinya sendiri.

   * Tidak ada fitur timpa paksa (*override*); pesan penolakan wajib menampilkan rincian jam dan `nama_peminjam` dari jadwal yang bentrok.

4. **Daftar, Pencarian, dan Penghapusan:**

   * Daftar peminjaman diurutkan berdasarkan tanggal terbaru lebih dulu, kemudian `jam_mulai` paling awal.

   * Mendukung filter berdasarkan lapangan serta pencarian teks berdasarkan `nama_peminjam` atau `nomor_surat`.

   * Penghapusan bersifat permanen (*hard delete*), wajib melalui konfirmasi pengguna, serta langsung menyegarkan cache halaman publik.

### FR-07. Manajemen Lapangan & Penyimpanan Foto (Admin)

1. Admin dapat menambah, melihat, mengubah, dan menghapus data pada tabel `lapangan` dengan atribut: `nama` (Wajib), `jenis` (Wajib: `Umum` / `Non-umum`), `tarif` (Opsional), `jam_buka` (Wajib, bawaan `06.00`), `jam_tutup` (Wajib, bawaan `00.00`, harus $>$ `jam_buka`), `nomor_petugas` (Opsional), dan `foto` (Opsional).

2. Input `nomor_petugas` disimpan tanpa tanda `+`, spasi, atau tanda hubung. Nomor dengan awalan `0` dikonversi otomatis ke kode negara `62` (contoh: `0812...` menjadi `62812...`).

3. **Validasi Perubahan Jam Operasional:** Perubahan `jam_buka` atau `jam_tutup` ditolak apabila terdapat data peminjaman pada lapangan tersebut yang berada di luar jam operasional baru. Pesan penolakan menyebutkan data peminjaman yang terdampak.

4. **Pengelolaan Foto:**

   * Format yang diterima hanya PNG, JPG, dan JPEG dengan ukuran berkas awal maksimal sesuai pengaturan `foto_batas_ukuran_mb` (bawaan: 5 MB).

   * Sebelum dikirim ke server, berkas dikompresi di sisi klien (*browser*) menjadi format JPEG menggunakan parameter `foto_kualitas_kompres` (bawaan: 75) dan `foto_lebar_maksimal_px` (bawaan: 1280 px).

   * Pengunggahan ke penyimpanan awan (*Storage*) hanya dieksekusi saat form disimpan. Server memvalidasi ulang tipe dan ukuran berkas.

   * Saat mengganti foto, sistem menghapus foto lama dari *Storage*. Jika penghapusan foto lama gagal, seluruh transaksi penggantian dibatalkan (*rollback*) dan foto baru ditarik kembali.

5. **Penghapusan Lapangan:**

   * Konfirmasi penghapusan wajib menampilkan jumlah data peminjaman terkait yang akan ikut terhapus secara permanen.

   * Jika disetujui, seluruh data peminjaman terkait, foto di *Storage*, dan data lapangan dihapus. Apabila penghapusan foto di *Storage* gagal, seluruh penghapusan lapangan dan peminjamannya dibatalkan.

### FR-08. Manajemen Pengaturan Sistem (Admin)

1. Pengaturan disimpan pada tabel `pengaturan` dengan skema kunci-nilai (*key-value*) yang memuat kolom: `kunci`, `nilai`, `tipe`, `kelompok`, `label`, dan `keterangan`.

2. Definisi kunci, nilai bawaan (*default*), dan aturan validasi disimpan di dalam kode aplikasi. Jika nilai pada basis data kosong atau tidak valid, sistem otomatis menggunakan nilai bawaan agar halaman publik tidak mengalami kegagalan.

3. Menyimpan perubahan pengaturan langsung menyegarkan cache halaman publik tanpa mengubah nilai `terakhir_diperbarui`.

4. Daftar kunci pengaturan yang didukung:

   * **Umum:** `nama_situs` ("Jadwal Lapangan"), `nama_dinas` ("Disporabudpar, Bidang Olahraga"), `teks_footer` ("© Disporabudpar, Bidang Olahraga").

   * **Halaman Depan:** `hero_judul`, `hero_subjudul`, `hero_badge`.

   * **Kalender:** `kalender_jangkauan_bulan` (angka 1–24, bawaan: 12), `kalender_hari_pertama_pekan` (`senin` / `minggu`, bawaan: `senin`).

   * **Kontak:** `kontak_alamat_kantor` (opsional, disembunyikan di publik jika kosong), `kontak_email` (opsional, disembunyikan di publik jika kosong), `kontak_teks_bantuan`.

   * **Foto:** `foto_batas_ukuran_mb` (bawaan: 5), `foto_kualitas_kompres` (angka 10–100, bawaan: 75), `foto_lebar_maksimal_px` (bawaan: 1280).

   * **Sistem:** `terakhir_diperbarui` (diperbarui otomatis oleh sistem dan disembunyikan dari form pengaturan admin).

## 6. Non-Functional Requirements

1. **Performa & Kecepatan Akses:**

   * Halaman publik memiliki waktu muat *Largest Contentful Paint* (LCP) $\le 2,5$ detik pada jaringan seluler.

   * **Client-Side Caching & Prefetching:** Menggunakan mekanisme *caching* dan *prefetching* di sisi klien (melalui TanStack Query) saat pengguna berpindah pilihan lapangan, mengganti bulan pada kalender, atau membuka slot jam, sehingga perpindahan data yang sudah pernah diakses terjadi secara instan tanpa menunggu *request* ulang ke server.

   * **Optimasi Ukuran Bundle & DOM (Radix UI Primitives):** Seluruh komponen interaktif menggunakan komponen *headless/unstyled* dari Radix UI dengan penerapan *lazy mounting* (komponen seperti dialog konfirmasi, form modal, dan *popover* hanya di-render ke dalam DOM ketika dibuka) serta *modular tree-shaking* agar ukuran JavaScript awal sangat ringan dan cepat diakses.

   * **Virtualisasi Data:** Apabila daftar data peminjaman di halaman admin tumbuh menjadi ratusan atau ribuan baris, sistem merender baris yang tampak di layar saja (melalui TanStack Virtual) agar halaman tetap responsif.

   * Kompresi foto dilakukan di sisi klien sebelum diunggah agar ukuran muatan (*payload*) permintaan selalu berada di bawah batas fungsi *serverless* ($\approx 4,5\text{ MB}$).

2. **Keamanan & Privasi Data:**

   * Respons data untuk halaman publik hanya boleh mengirimkan daftar slot jam yang terisi per lapangan dan tanggal. Kolom `nama_peminjam`, `nomor_surat`, dan `catatan` dilarang dikirimkan ke klien publik.

   * Seluruh kredensial rahasia dan kunci API disimpan di variabel lingkungan (*environment variables*) server, bukan di dalam tabel `pengaturan`.

3. **Keandalan & Penanganan Kegagalan (*Error Handling*):**

   * Apabila basis data tidak dapat dijangkau (termasuk saat layanan basis data sedang dijeda/*paused*), halaman publik harus menampilkan pesan pemberitahuan yang ramah pengguna tanpa menampilkan pesan *error* sistem mentah dan tanpa menampilkan data *cache* yang berpotensi kedaluwarsa.

   * Operasi tulis yang melibatkan basis data dan *Storage* menjaga konsistensi tingkat aplikasi (membatalkan perubahan basis data jika operasi penghapusan berkas di *Storage* gagal).

4. **Konsistensi Zona Waktu:**

   * Seluruh kalkulasi penentuan "hari ini", "jam sekarang", status slot **Lewat**, serta pencatatan `terakhir_diperbarui` wajib dievaluasi menggunakan zona waktu WITA (`Asia/Makassar`, $\text{UTC}+8$), terlepas dari lokasi zona waktu server.

5. **Konvensi Penamaan & Bahasa:**

   * Seluruh teks antarmuka pengguna dan pesan validasi menggunakan Bahasa Indonesia.

   * Seluruh nama tabel (`lapangan`, `peminjaman`, `pengaturan`) dan nama kolom pada basis data menggunakan Bahasa Indonesia, kecuali kolom kunci primer `id`.

6. **Kompatibilitas Perangkat:**

   * Seluruh fungsi pada halaman publik dan halaman admin dapat dioperasikan secara penuh baik melalui peramban perangkat seluler (HP) maupun komputer desktop.

## 7. Scope

### In Scope (Versi 1.0)

* Halaman informasi publik untuk melihat daftar lapangan, detail lapangan, kalender ketersediaan bulanan, rincian slot jam harian (06.00–00.00 WITA), waktu pembaruan terakhir, dan tombol kontak WhatsApp petugas.

* Autentikasi login dan logout untuk satu akun admin pusat.

* Manajemen peminjaman (tambah, lihat, cari, filter per lapangan, ubah, hapus permanen) dengan validasi anti-bentrok jam di sisi server.

* Manajemen lapangan (tambah, lihat, ubah, hapus permanen beserta peminjaman terkait) dan pengelolaan foto lapangan dengan kompresi di sisi klien.

* Manajemen pengaturan sistem berbasis *key-value* untuk teks informasi publik, parameter kalender, info kontak, dan parameter kompresi foto.

### Out of Scope (Tidak Dikerjakan di Versi 1.0)

* Fitur pemesanan (*booking*) mandiri oleh pengunjung, pembayaran, atau transaksi daring.

* Pengajuan atau pengunggahan surat permohonan peminjaman secara digital.

* Pengiriman notifikasi otomatis (melalui email, WhatsApp, atau saluran lainnya).

* Pelacakan analitik penggunaan pengunjung.

* Interaksi klik pada slot jam di halaman publik.

* Pencatatan satu entri peminjaman yang melintasi pergantian hari (melewati jam `00.00`) atau penggunaan satuan waktu selain jam penuh (misal menit `:30`).

* Fitur timpa paksa (*override*) untuk menyimpan jadwal yang bentrok.

* Fitur khusus hari libur/penutupan terpisah (penutupan menggunakan mekanisme input peminjaman penuh `06.00–00.00`).

* Manajemen banyak akun admin (*multi-admin*), pembagian peran (*role-based access control*), atau pendaftaran pengguna baru.

* Pengaturan elemen visual/desain melalui tabel `pengaturan` serta pembersihan berkas terjadwal (*cron job*) di *Storage*.

### Rencana Pengembangan Lanjutan (V2 & Later)

* **Tahap V2:** Fitur lupa kata sandi admin, teks pesan WhatsApp otomatis yang menyertakan nama lapangan, dan filter jenis lapangan pada halaman publik.

* **Tahap Later:** Dukungan jadwal peminjaman berulang (*recurring schedules* menggunakan tabel terpisah) dan migrasi ke infrastruktur hosting produksi permanen.

## 8. Teknologi yang Digunakan

| Komponen | Teknologi / Pustaka | Keterangan Penggunaan | 
| ----- | ----- | ----- | 
| **Framework Aplikasi** | Next.js | Kerangka kerja utama aplikasi web (mendukung *Server Rendering*, *Server Actions*, dan manajemen *cache*). | 
| **Komponen Primitif Interaktif (Akses Cepat)** | **Radix UI Primitives** | Digunakan secara menyeluruh untuk komponen interaktif tanpa beban *runtime* berlebih (*zero-runtime overhead*): `@radix-ui/react-tabs` (pemilih lapangan instan di halaman publik), `@radix-ui/react-select` (pilihan jam operasional `06.00–00.00` dan filter lapangan), `@radix-ui/react-dialog` & `@radix-ui/react-alert-dialog` (form modal dan dialog konfirmasi hapus yang hanya di-render ke DOM saat dibuka), `@radix-ui/react-popover` (pemilih tanggal di form admin), serta `@radix-ui/react-slot` (penggabungan elemen DOM tanpa pembungkus berlebih). | 
| **Sistem Komponen & Styling** | Tailwind CSS, shadcn/ui, ReUI | Utilitas pembangunan antarmuka yang dibangun langsung di atas pondasi Radix UI Primitives untuk halaman publik serta admin. | 
| **Ekosistem Manajemen Data & State (TanStack)** | **TanStack Ecosystem** | 1. **TanStack Query (`@tanstack/react-query`):** *Caching* status ketersediaan kalender dan slot jam di sisi klien, *prefetching* bulan berikutnya, serta sinkronisasi dan *invalidation* data instan saat admin menambah/mengubah/menghapus peminjaman.<br>2. **TanStack Table (`@tanstack/react-table`):** Pengelolaan daftar, pengurutan, pencarian, dan filter data peminjaman di admin secara *headless*.<br>3. **TanStack Virtual (`@tanstack/react-virtual`):** Virtualisasi daftar data peminjaman berjumlah besar agar performa render halaman admin tetap ringan.<br>4. **TanStack Form (`@tanstack/react-form`):** Alternatif/pendukung pengelolaan *state* dan validasi form yang ringan dan bertipe aman (*type-safe*). | 
| **Ikon Antarmuka** | Lucide Icons (`lucide-react`) | Pustaka ikon ringan (*tree-shakeable*) untuk mendukung navigasi dan penanda elemen fungsional. | 
| **Basis Data, Autentikasi & Storage** | Supabase | PostgreSQL (basis data dengan *connection pooler* `prepare: false`), Supabase Auth (autentikasi admin), dan Supabase Storage (penyimpanan berkas foto lapangan). | 
| **ORM** | Drizzle ORM | Pengelolaan skema, kueri basis data bertipe aman (*type-safe*), dan indeks komposit pada `(lapangan_id, tanggal)` di tabel `peminjaman`. | 
| **Validasi & Form** | `zod`, `react-hook-form` | Validasi skema data ketat di sisi klien maupun server. | 
| **Utilitas Kalender, Tanggal & Waktu** | `react-day-picker`, `date-fns` | Fungsionalitas pemilihan tanggal kalender serta manipulasi waktu dengan lokalisasi Bahasa Indonesia dan zona waktu WITA. | 
| **Pemrosesan Gambar & Notifikasi** | `browser-image-compression`, `sonner` | Kompresi berkas foto ke format JPEG di peramban sebelum diunggah, serta umpan balik notifikasi aksi sistem. | 
| **Infrastruktur Hosting** | Vercel | Platform *deployment* dan *hosting* aplikasi web. | 