"use client";

import * as React from "react";
import { ArrowRightIcon, BrandIcon } from "./icons";

interface FooterProps {
  onOpenContact: () => void;
  onNavigate: (href: string) => void;
}

export function Footer({ onOpenContact, onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-cta">
        <div>
          <p className="footer-title lines" id="footer-title" data-stagger="120">
            <span className="line-clip">
              <span>Cek Jadwal</span>
            </span>
            <span className="line-clip">
              <span>Sekarang?</span>
            </span>
          </p>
        </div>
        <div
          className="inview"
          data-delay="150"
          style={{ "--iy": "20px" } as React.CSSProperties}
        >
          <button
            className="pill pill--light"
            type="button"
            onClick={onOpenContact}
          >
            Hubungi Petugas
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div className="footer-cols">
        <div className="footer-brand">
          <a
            className="brand"
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
          >
            <BrandIcon />
            <span>Bidang Olahraga Disporabudpar Banjarbaru</span>
          </a>
          <p className="footer-blurb">
            Sistem pencatatan dan informasi jadwal lapangan Disporabudpar, Bidang Olahraga.
          </p>
          <address>
            <a href="mailto:info@disporabudpar.go.id">info@disporabudpar.go.id</a>
            <a href="tel:+6281200000000">+62 812-0000-0000</a>
            <span>Kantor Disporabudpar, Bidang Olahraga</span>
          </address>
        </div>

        <nav className="footer-nav" aria-label="Lapangan">
          <h4>Lapangan</h4>
          <ul>
            <li>
              <a href="#junior" onClick={(e) => handleLinkClick(e, "#junior")}>
                Lapangan K.S Tubun
              </a>
            </li>
            <li>
              <a
                href="#performance"
                onClick={(e) => handleLinkClick(e, "#performance")}
              >
                Lapangan Dr. Mardjani
              </a>
            </li>
            <li>
              <a href="#adult" onClick={(e) => handleLinkClick(e, "#adult")}>
                Lapangan Tenis Idaman
              </a>
            </li>
            <li>
              <a href="#private" onClick={(e) => handleLinkClick(e, "#private")}>
                GOR Rudy Resnawan
              </a>
            </li>
          </ul>
        </nav>
        <nav className="footer-nav" aria-label="Navigasi">
          <h4>Navigasi</h4>
          <ul>
            <li>
              <a
                href="#membership"
                onClick={(e) => handleLinkClick(e, "#membership")}
              >
                Kalender
              </a>
            </li>
            <li>
              <a
                href="#facilities"
                onClick={(e) => handleLinkClick(e, "#facilities")}
              >
                Fasilitas
              </a>
            </li>
            <li>
              <a href="#club" onClick={(e) => handleLinkClick(e, "#club")}>
                Slot Jam
              </a>
            </li>
            <li>
              <a href="#shop" onClick={(e) => handleLinkClick(e, "#shop")}>
                Kontak Petugas
              </a>
            </li>
          </ul>
        </nav>
        <nav className="footer-nav" aria-label="Tautan">
          <h4>Tautan</h4>
          <ul>
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, "#about")}>
                Tentang
              </a>
            </li>
            <li>
              <a
                href="#programs"
                onClick={(e) => handleLinkClick(e, "#programs")}
              >
                Daftar Lapangan
              </a>
            </li>
            <li>
              <a href="#careers" onClick={(e) => handleLinkClick(e, "#careers")}>
                Panduan
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>
                Kontak
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© Disporabudpar, Bidang Olahraga</span>
        <nav className="footer-social" aria-label="Sosial">
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
        <nav className="footer-legal" aria-label="Legal">
          <a href="#privacy" onClick={(e) => handleLinkClick(e, "#privacy")}>
            Privasi
          </a>
          <a href="#terms" onClick={(e) => handleLinkClick(e, "#terms")}>
            Ketentuan
          </a>
        </nav>
      </div>
    </footer>
  );
}
