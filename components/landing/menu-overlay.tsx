"use client";

import * as React from "react";
import { ArrowRightIcon, BrandIcon, CloseIcon } from "./icons";
import { cn } from "cn";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  onNavigate: (href: string) => void;
  onOpenSchedule?: (venueId?: string) => void;
}

const MENU_LINKS = [
  { label: "Cek Jadwal", href: "#schedule" },
  { label: "Daftar Lapangan", href: "#programs" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Langkah", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

export function MenuOverlay({
  isOpen,
  onClose,
  onOpenContact,
  onNavigate,
  onOpenSchedule,
}: MenuOverlayProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    if (href === "#schedule") {
      window.setTimeout(() => {
        if (onOpenSchedule) onOpenSchedule();
      }, 260);
      return;
    }
    onNavigate(href);
  };

  const handleBookClick = () => {
    onClose();
    window.setTimeout(() => {
      onOpenContact();
    }, 260);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-all duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      )}
      id="menuOverlay"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-[#0f2f63] transition-opacity duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        data-close-menu
      />
      <div
        className={cn(
          "relative h-full p-2 sm:p-3 text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        )}
      >
        <div className="flex flex-col h-full p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <a
              className="flex items-center gap-3 text-lg font-medium text-white"
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
            >
              <BrandIcon className="h-10 w-auto shrink-0" />
              <span>Bidang Olahraga Disporabudpar Banjarbaru</span>
            </a>
            <button
              className="w-10 h-10 rounded-full grid place-items-center bg-white/15 hover:bg-white/25 transition-colors group cursor-pointer"
              type="button"
              onClick={onClose}
              data-close-menu
              aria-label="Tutup menu"
            >
              <span className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                <CloseIcon />
              </span>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-2 py-8" aria-label="Menu tambahan">
            {MENU_LINKS.map((link, i) => (
              <a
                key={link.label}
                className={cn(
                  "block text-5xl sm:text-7xl font-medium tracking-tight leading-tight text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#5790e6] w-fit",
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
                )}
                href={link.href}
                data-menu-link
                style={{
                  transitionDelay: isOpen ? `${120 + i * 70}ms` : "0ms",
                }}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/15 pt-8">
            <button
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-wider bg-white text-[#0f2f63] hover:bg-[#5790e6] hover:text-white transition-all group cursor-pointer w-fit"
              type="button"
              id="menuBook"
              onClick={handleBookClick}
            >
              <span>Hubungi Petugas</span>
              <span className="size-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </button>
            <nav className="flex gap-5 text-sm text-white/70 flex-wrap" aria-label="Sosial">
              <a href="#instagram" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#instagram")}>
                Instagram
              </a>
              <a href="#x" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#x")}>
                X
              </a>
              <a href="#youtube" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#youtube")}>
                YouTube
              </a>
              <a href="#linkedin" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#linkedin")}>
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
