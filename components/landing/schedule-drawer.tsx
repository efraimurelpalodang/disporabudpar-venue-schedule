"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  DAFTAR_LAPANGAN,
  SAMPLE_PEMINJAMAN,
  type LapanganDetail,
} from "@/lib/schedule-data";
import {
  hitungSlotHarian,
  formatTarifLapangan,
  buatUrlWhatsApp,
  type RentangJamTerisi,
} from "@/lib/jadwal";
import {
  getWitaTodayISO,
  formatTanggalWita,
} from "@/lib/wita";
import { cn } from "cn";

interface ScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVenueId?: string;
  onSelectVenue?: (venueId: string) => void;
}

export function ScheduleDrawer({
  isOpen,
  onClose,
  selectedVenueId = "ks-tubun",
  onSelectVenue,
}: ScheduleDrawerProps) {
  // 1. Venue state
  const [activeVenueId, setActiveVenueId] = React.useState(selectedVenueId);
  const [isVenueDropdownOpen, setIsVenueDropdownOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [openJadwal, setOpenJadwal] = React.useState(true);
  const [openPanduan, setOpenPanduan] = React.useState(false);

  // Sync prop changes
  React.useEffect(() => {
    if (selectedVenueId) {
      setActiveVenueId(selectedVenueId);
    }
  }, [selectedVenueId]);

  const activeVenue: LapanganDetail = React.useMemo(() => {
    return (
      DAFTAR_LAPANGAN.find((v) => v.id === activeVenueId) || DAFTAR_LAPANGAN[0]
    );
  }, [activeVenueId]);

  // 2. Date state
  const [selectedDateISO, setSelectedDateISO] = React.useState<string>("2026-11-21");
  const [selectedSlotLabel, setSelectedSlotLabel] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
    const today = getWitaTodayISO();
    setSelectedDateISO(today);
  }, []);

  // Reset selected slot when date or venue changes
  React.useEffect(() => {
    setSelectedSlotLabel(null);
  }, [selectedDateISO, activeVenueId]);

  // Active bookings for the selected date
  const activeBookings: RentangJamTerisi[] = React.useMemo(() => {
    const venueBookings = SAMPLE_PEMINJAMAN[activeVenue.id] || {};
    const dayNum = Number.parseInt(selectedDateISO.slice(-2), 10) || 0;
    const offsetKey = `offset_${dayNum % 7}`;
    return venueBookings[selectedDateISO] || venueBookings[offsetKey] || [];
  }, [activeVenue.id, selectedDateISO]);

  // 18 Hourly slots (06.00 - 00.00 WITA)
  const slotsHarian = React.useMemo(() => {
    if (!mounted) return [];
    return hitungSlotHarian({
      tanggal: selectedDateISO,
      jamBuka: 6,
      jamTutup: 24,
      peminjaman: activeBookings,
    });
  }, [mounted, selectedDateISO, activeBookings]);

  const hasAvailableSlots = React.useMemo(() => {
    return slotsHarian.some((slot) => slot.status === "tersedia");
  }, [slotsHarian]);

  // WhatsApp click handler
  const handleContactWhatsApp = () => {
    const waUrl = buatUrlWhatsApp(activeVenue.nomor_petugas);
    if (!waUrl) return;

    const formattedDate = formatTanggalWita(selectedDateISO, { denganHari: true });
    let text = `Halo Petugas ${activeVenue.nama}, saya ingin konfirmasi ketersediaan jadwal lapangan pada ${formattedDate}`;

    if (selectedSlotLabel) {
      text += ` untuk jam ${selectedSlotLabel} WITA`;
    }

    text += `. Apakah jadwal ini masih dapat dipinjam sesuai surat permohonan peminjaman ke Disporabudpar? Terima kasih.`;

    const fullUrl = `${waUrl}?text=${encodeURIComponent(text)}`;
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  const handleVenueChange = (venueId: string) => {
    setActiveVenueId(venueId);
    if (onSelectVenue) onSelectVenue(venueId);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-80 flex justify-end text-[#111827] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-sans",
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      )}
      id="scheduleDrawer"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-[#0f2f63]/40 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        data-close-schedule
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={cn(
          "relative w-full max-w-3xl h-full bg-white flex flex-col shadow-[-10px_0_35px_rgba(0,0,0,0.15)] overflow-y-auto overflow-x-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] scrollbar-thin [scrollbar-color:#d7dae1_transparent]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Jadwal Lapangan"
        data-lenis-prevent="true"
      >
        {/* --- Card Header (Tanpa tulisan Cek Jadwal Lapangan, Input Select Tanpa Border & Bisa Dipencet) --- */}
        <div className="flex justify-between items-center px-6 sm:px-8 py-4 border-b border-[#f3f4f6] bg-white sticky top-0 z-20 shrink-0">
          {/* Venue Selector Trigger tanpa border */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsVenueDropdownOpen(!isVenueDropdownOpen)}
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-[#111827] hover:bg-[#f3f4f6] transition-colors cursor-pointer border-none outline-none font-medium text-base sm:text-lg"
              aria-label="Pilih fasilitas lapangan"
            >
              <svg
                className="size-4 shrink-0 text-[#6b7280]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
                <line x1="11" y1="18" x2="13" y2="18"></line>
              </svg>
              <span className="truncate max-w-55 sm:max-w-none font-medium text-[#111827]">
                {activeVenue.nama}
              </span>
              <svg
                className={cn(
                  "size-4 text-[#9ca3af] transition-transform duration-200 stroke-[1.5]",
                  isVenueDropdownOpen && "rotate-180"
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Dropdown Menu Lapangan */}
            {isVenueDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-90"
                  onClick={() => setIsVenueDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#e5e7eb] shadow-2xl p-1.5 z-100 flex flex-col gap-1">
                  {DAFTAR_LAPANGAN.map((venue) => (
                    <button
                      key={venue.id}
                      type="button"
                      onClick={() => {
                        handleVenueChange(venue.id);
                        setIsVenueDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3.5 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer",
                        venue.id === activeVenue.id
                          ? "bg-[#ecfdf5] text-[#047857] font-medium"
                          : "text-[#111827] hover:bg-[#fafafa]"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-[#111827]">{venue.nama}</span>
                        <span className="text-xs text-[#6b7280]">{venue.jenis}</span>
                      </div>
                      {venue.id === activeVenue.id && (
                        <svg
                          className="size-4 text-[#10b981] shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jadwal"
            className="p-2 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded-md transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* --- Hero Image (Dikecilkan Setengahnya di Desktop: ~210px) --- */}
        <div className="relative w-full h-45 sm:h-50 md:h-52.5 bg-[#dbeafe] overflow-hidden shrink-0">
          <img
            src={activeVenue.foto || ""}
            alt={activeVenue.nama}
            className="w-full h-full object-cover object-center"
          />

          {/* Gradient Fade to White at Bottom */}
          <div
            className="absolute bottom-0 inset-x-0 h-25 sm:h-30 md:h-35 z-2 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 15%, rgba(255, 255, 255, 0.2) 35%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0.8) 80%, #ffffff 100%)",
            }}
          />

          {/* Hero Title Overlay */}
          <div className="absolute top-1/2 left-6 sm:left-8 -translate-y-1/2 z-3 text-[#111827] w-[calc(100%-48px)] sm:w-[calc(100%-64px)]">
            <h1 className="text-2xl sm:text-3xl md:text-[2.25rem] font-medium tracking-[-0.03em] leading-tight [text-shadow:0_2px_16px_rgba(255,255,255,0.9)]">
              {activeVenue.nama}
            </h1>
          </div>
        </div>

        {/* --- Field Info Section --- */}
        <div className="px-6 sm:px-8 pt-2.5 pb-5 flex flex-col gap-5 max-w-225 relative z-1">
          <p className="text-[0.9375rem] font-normal text-[#6b7280] leading-[1.6]">
            {activeVenue.deskripsi}
          </p>

          <div className="flex gap-8 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-normal text-[#9ca3af]">Tarif Sewa</span>
              <span className="text-[0.9375rem] font-normal text-[#111827]">
                {formatTarifLapangan(activeVenue.tarif)}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-normal text-[#9ca3af]">Jam Operasional</span>
              <span className="text-[0.9375rem] font-normal text-[#111827]">
                06.00 – 00.00 WITA
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-normal text-[#9ca3af]">Kategori</span>
              <span className="text-[0.9375rem] font-normal text-[#111827]">
                {activeVenue.jenis}
              </span>
            </div>
          </div>
        </div>

        {/* --- List Menu Section --- */}
        <div className="flex flex-col px-6 sm:px-8 pb-10 max-w-225">
          {/* Item 1: Lihat Jadwal */}
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setOpenJadwal(!openJadwal)}
              className="flex justify-between items-center py-5 border-b border-[#f3f4f6] cursor-pointer hover:bg-[#fafafa] transition-colors w-full text-left"
            >
              <span className="text-base font-medium text-[#111827]">
                Lihat jadwal lapangan
              </span>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-[0.9375rem] font-normal",
                    hasAvailableSlots ? "text-[#10b981]" : "text-[#6b7280]"
                  )}
                >
                  {hasAvailableSlots ? "Tersedia" : "Penuh"}
                </span>
                <svg
                  className={cn(
                    "size-5 text-[#9ca3af] transition-transform duration-300 stroke-[1.5]",
                    openJadwal && "rotate-180"
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>

            {/* Konten Dropdown 1 */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-400 ease-in-out bg-white border-b border-[#f3f4f6]",
                openJadwal ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              )}
            >
              <div className="p-4 sm:p-6 flex flex-col gap-5 bg-white">
                {/* Date Picker */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="scheduleDateInput"
                    className="text-[0.8125rem] text-[#6b7280] font-normal"
                  >
                    Pilih Tanggal
                  </label>
                  <input
                    id="scheduleDateInput"
                    type="date"
                    value={selectedDateISO}
                    min={mounted ? getWitaTodayISO() : undefined}
                    onChange={(e) => setSelectedDateISO(e.target.value)}
                    className="w-full p-3 text-[0.9375rem] font-normal text-[#111827] bg-white border border-[#e5e7eb] rounded-lg outline-none focus:border-[#3b82f6] transition-colors cursor-pointer"
                  />
                </div>

                {/* Schedule List (2 Layout / 2 Kolom di Mode Desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {slotsHarian.map((slot) => {
                    const isNight = slot.jamMulai >= 18 || slot.jamMulai === 0;
                    const isAvailable = slot.status === "tersedia";
                    const isBooked = slot.status === "terisi";
                    const isPassed = slot.status === "lewat";
                    const isSelected = selectedSlotLabel === slot.label;

                    return (
                      <div
                        key={slot.label}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedSlotLabel(isSelected ? null : slot.label);
                          }
                        }}
                        className={cn(
                          "flex items-center justify-between py-3 border-b border-[#e5e7eb] first:pt-0 last:border-b-0 last:pb-0 transition-colors",
                          isAvailable && "cursor-pointer hover:bg-[#fafafa] px-2 -mx-2 rounded-lg",
                          isSelected && "bg-[#ecfdf5] border-[#a7f3d0]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex items-center justify-center size-5 shrink-0",
                              isNight ? "text-[#64748b]" : "text-[#d97706]"
                            )}
                          >
                            {isNight ? (
                              <svg
                                className="size-4 stroke-[1.5]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                              </svg>
                            ) : (
                              <svg
                                className="size-4 stroke-[1.5]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                              </svg>
                            )}
                          </span>
                          <span className="text-[0.9375rem] font-normal text-[#111827] tabular-nums">
                            {slot.label}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "text-sm font-normal",
                            isAvailable && "text-[#10b981]",
                            isBooked && "text-[#9ca3af]",
                            isPassed && "text-[#9ca3af]"
                          )}
                        >
                          {isAvailable ? (isSelected ? "Dipilih" : "Tersedia") : isBooked ? "Terisi" : "Lewat"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Tombol Hubungi Petugas di dalam Accordion Jadwal */}
                <button
                  type="button"
                  onClick={handleContactWhatsApp}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] rounded-[30px] text-[0.9375rem] font-medium font-inherit cursor-pointer transition-colors hover:bg-[#d1fae5] mt-2"
                >
                  <svg
                    className="size-5 stroke-[1.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 0 1 2 2v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                  Hubungi petugas
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Cara Peminjaman */}
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setOpenPanduan(!openPanduan)}
              className="flex justify-between items-center py-5 border-b border-[#f3f4f6] cursor-pointer hover:bg-[#fafafa] transition-colors w-full text-left"
            >
              <span className="text-base font-medium text-[#111827]">
                Cara peminjaman lapangan
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[0.9375rem] font-normal text-[#6b7280]">
                  Panduan
                </span>
                <svg
                  className={cn(
                    "size-5 text-[#9ca3af] transition-transform duration-300 stroke-[1.5]",
                    openPanduan && "rotate-180"
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>

            {/* Konten Dropdown 2 (Timeline dengan Ikon Sesuai Konteks & Tahapan yang Benar) */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-400 ease-in-out bg-white border-b border-[#f3f4f6]",
                openPanduan ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              )}
            >
              <div className="p-4 sm:p-6 flex flex-col gap-5 bg-white">
                {/* Timeline List */}
                <div className="flex flex-col mb-6 mt-2">
                  {/* Tahap 1: Periksa jadwal lapangan (Ikon Kalender Jadwal) */}
                  <div className="flex gap-4 relative pb-6 before:content-[''] before:absolute before:top-10 before:left-4.75 before:bottom-0 before:w-px before:bg-[#e5e7eb] before:z-1">
                    <div className="size-10 rounded-full border border-dashed border-[#d1d5db] bg-white flex items-center justify-center shrink-0 z-2 text-[#6b7280]">
                      <svg
                        className="size-4.5 stroke-[1.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col pt-0.5">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[0.9375rem] font-medium text-[#111827]">
                          1. Periksa jadwal lapangan
                        </span>
                      </div>
                      <span className="text-sm text-[#9ca3af] leading-[1.4]">
                        Lihat ketersediaan jam operasional fasilitas lapangan pada tanggal yang Anda inginkan di sistem ini.
                      </span>
                    </div>
                  </div>

                  {/* Tahap 2: Buat surat pengajuan peminjaman (Ikon Dokumen Surat Resmi) */}
                  <div className="flex gap-4 relative pb-6 before:content-[''] before:absolute before:top-10 before:left-4.75 before:bottom-0 before:w-px before:bg-[#e5e7eb] before:z-1">
                    <div className="size-10 rounded-full border border-dashed border-[#d1d5db] bg-white flex items-center justify-center shrink-0 z-2 text-[#6b7280]">
                      <svg
                        className="size-4.5 stroke-[1.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col pt-0.5">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[0.9375rem] font-medium text-[#111827]">
                          2. Buat surat pengajuan peminjaman
                        </span>
                      </div>
                      <span className="text-sm text-[#9ca3af] leading-[1.4]">
                        Siapkan surat resmi permohonan peminjaman fasilitas yang ditujukan kepada Kepala Disporabudpar Kota Banjarbaru.
                      </span>
                    </div>
                  </div>

                  {/* Tahap 3: Serahkan ke kantor Disporabudpar (Ikon Kantor Pemerintah) */}
                  <div className="flex gap-4 relative pb-6 before:content-[''] before:absolute before:top-10 before:left-4.75 before:bottom-0 before:w-px before:bg-[#e5e7eb] before:z-1">
                    <div className="size-10 rounded-full border border-dashed border-[#d1d5db] bg-white flex items-center justify-center shrink-0 z-2 text-[#6b7280]">
                      <svg
                        className="size-4.5 stroke-[1.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                        <path d="M9 22v-4h6v4"></path>
                        <path d="M8 6h.01"></path>
                        <path d="M16 6h.01"></path>
                        <path d="M8 10h.01"></path>
                        <path d="M16 10h.01"></path>
                        <path d="M8 14h.01"></path>
                        <path d="M16 14h.01"></path>
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col pt-0.5">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[0.9375rem] font-medium text-[#111827]">
                          3. Serahkan ke kantor Disporabudpar
                        </span>
                      </div>
                      <span className="text-sm text-[#9ca3af] leading-[1.4]">
                        Bawa berkas fisik surat permohonan ke Bidang Olahraga Kantor Disporabudpar Banjarbaru untuk diverifikasi.
                      </span>
                    </div>
                  </div>

                  {/* Tahap 4: Penerbitan surat balasan (Ikon Surat Balasan Resmi Terverifikasi) */}
                  <div className="flex gap-4 relative">
                    <div className="size-10 rounded-full border border-dashed border-[#d1d5db] bg-white flex items-center justify-center shrink-0 z-2 text-[#6b7280]">
                      <svg
                        className="size-4.5 stroke-[1.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                        <polyline points="16 19 18 21 22 17"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col pt-0.5">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[0.9375rem] font-medium text-[#111827]">
                          4. Penerbitan surat balasan
                        </span>
                      </div>
                      <span className="text-sm text-[#9ca3af] leading-[1.4]">
                        Petugas Disporabudpar menerbitkan surat balasan resmi persetujuan atau izin pemakaian fasilitas lapangan.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol Bawah Hubungi Petugas */}
                <button
                  type="button"
                  onClick={handleContactWhatsApp}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] rounded-[30px] text-[0.9375rem] font-medium font-inherit cursor-pointer transition-colors hover:bg-[#d1fae5]"
                >
                  <svg
                    className="size-5 stroke-[1.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 0 1 2 2v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                  Hubungi petugas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
