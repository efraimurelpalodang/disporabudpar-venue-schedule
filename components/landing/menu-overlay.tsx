"use client";

import * as React from "react";
import { ArrowRightIcon, BrandIcon, CloseIcon } from "./icons";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  onNavigate: (href: string) => void;
}

const MENU_LINKS = [
  { label: "Lapangan", href: "#programs" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Langkah", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

export function MenuOverlay({
  isOpen,
  onClose,
  onOpenContact,
  onNavigate,
}: MenuOverlayProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
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
      className={`menu ${isOpen ? "open" : ""}`}
      id="menuOverlay"
      aria-hidden={!isOpen}
    >
      <div className="menu-backdrop" onClick={onClose} data-close-menu />
      <div className="menu-panel">
        <div className="menu-inner">
          <div className="menu-top">
            <a
              className="brand"
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
            >
              <BrandIcon />
              <span>Bidang Olahraga Disporabudpar Banjarbaru</span>
            </a>
            <button
              className="icon-btn"
              type="button"
              onClick={onClose}
              data-close-menu
              aria-label="Tutup menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="menu-nav" aria-label="Menu tambahan">
            {MENU_LINKS.map((link, i) => (
              <a
                key={link.label}
                className="menu-link"
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

          <div className="menu-bottom">
            <button
              className="pill pill--light"
              type="button"
              id="menuBook"
              onClick={handleBookClick}
            >
              Hubungi Petugas
              <ArrowRightIcon />
            </button>
            <nav className="menu-social" aria-label="Sosial">
              <a href="#instagram" onClick={(e) => handleLinkClick(e, "#instagram")}>
                Instagram
              </a>
              <a href="#x" onClick={(e) => handleLinkClick(e, "#x")}>
                X
              </a>
              <a href="#youtube" onClick={(e) => handleLinkClick(e, "#youtube")}>
                YouTube
              </a>
              <a href="#linkedin" onClick={(e) => handleLinkClick(e, "#linkedin")}>
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
