"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRightIcon, BrandIcon } from "./icons";
import { titleContainerVariants, titleLineVariants } from "@/lib/animation-variants";

interface FooterProps {
  onOpenContact: () => void;
  onNavigate: (href: string) => void;
  onOpenSchedule?: (venueId?: string) => void;
}

export function Footer({ onOpenContact, onNavigate, onOpenSchedule }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#membership" || href === "#club") {
      if (onOpenSchedule) onOpenSchedule();
      return;
    }
    if (href === "#junior") {
      if (onOpenSchedule) onOpenSchedule("ks-tubun");
      return;
    }
    if (href === "#performance") {
      if (onOpenSchedule) onOpenSchedule("dr-mardjani");
      return;
    }
    if (href === "#adult") {
      if (onOpenSchedule) onOpenSchedule("tenis-idaman");
      return;
    }
    if (href === "#private") {
      if (onOpenSchedule) onOpenSchedule("gor-rudy");
      return;
    }
    if (href === "#shop") {
      onOpenContact();
      return;
    }
    onNavigate(href);
  };

  return (
    <footer className="bg-[#0f2f63] text-white rounded-[2rem] mt-3 py-14 px-6 sm:py-16 sm:px-10" id="contact">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-b border-white/15 pb-14">
        <div>
          <motion.p
            className="text-[3.75rem] sm:text-[5.5rem] lg:text-[7rem] font-medium leading-[0.92] tracking-[-0.02em] mt-4"
            id="footer-title"
            variants={titleContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span className="block" variants={titleLineVariants}>
                Cek Jadwal
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span className="block" variants={titleLineVariants}>
                Sekarang?
              </motion.span>
            </span>
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <button
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-wider bg-white text-[#0f2f63] hover:bg-[#5790e6] hover:text-white transition-all group cursor-pointer"
            type="button"
            onClick={onOpenContact}
          >
            <span>Hubungi Petugas</span>
            <span className="size-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 py-14">
        <div className="max-w-xs flex flex-col gap-4">
          <a
            className="flex items-center gap-3 text-lg font-medium text-white"
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
          >
            <BrandIcon className="h-10 w-auto shrink-0" />
            <span>Bidang Olahraga Disporabudpar Banjarbaru</span>
          </a>
          <p className="text-sm text-white/65 leading-relaxed">
            Sistem pencatatan dan informasi jadwal lapangan Disporabudpar, Bidang Olahraga.
          </p>
          <address className="not-italic text-sm text-white/80 flex flex-col gap-1 mt-2">
            <a href="mailto:info@disporabudpar.go.id" className="hover:text-white transition-colors">
              info@disporabudpar.go.id
            </a>
            <a href="tel:+6281200000000" className="hover:text-white transition-colors">
              +62 812-0000-0000
            </a>
            <span className="text-white/55">Kantor Disporabudpar, Bidang Olahraga</span>
          </address>
        </div>

        <nav className="pt-0 md:pt-13" aria-label="Lapangan">
          <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Lapangan</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <li>
              <a href="#junior" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#junior")}>
                Lapangan K.S Tubun
              </a>
            </li>
            <li>
              <a
                href="#performance"
                className="hover:text-white transition-colors"
                onClick={(e) => handleLinkClick(e, "#performance")}
              >
                Lapangan Dr. Mardjani
              </a>
            </li>
            <li>
              <a href="#adult" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#adult")}>
                Lapangan Tenis Idaman
              </a>
            </li>
            <li>
              <a href="#private" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#private")}>
                GOR Rudy Resnawan
              </a>
            </li>
          </ul>
        </nav>

        <nav className="pt-0 md:pt-13" aria-label="Navigasi">
          <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Navigasi</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <li>
              <a
                href="#membership"
                className="hover:text-white transition-colors"
                onClick={(e) => handleLinkClick(e, "#membership")}
              >
                Kalender
              </a>
            </li>
            <li>
              <a
                href="#facilities"
                className="hover:text-white transition-colors"
                onClick={(e) => handleLinkClick(e, "#facilities")}
              >
                Fasilitas
              </a>
            </li>
            <li>
              <a href="#club" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#club")}>
                Slot Jam
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#shop")}>
                Kontak Petugas
              </a>
            </li>
          </ul>
        </nav>

        <nav className="pt-0 md:pt-13" aria-label="Tautan">
          <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Tautan</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <li>
              <a href="#about" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#about")}>
                Tentang
              </a>
            </li>
            <li>
              <a
                href="#programs"
                className="hover:text-white transition-colors"
                onClick={(e) => handleLinkClick(e, "#programs")}
              >
                Daftar Lapangan
              </a>
            </li>
            <li>
              <a href="#careers" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#careers")}>
                Panduan
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#contact")}>
                Kontak
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/15 pt-8 text-sm text-white/60">
        <span>© Disporabudpar, Bidang Olahraga</span>
        <nav className="flex gap-5 flex-wrap" aria-label="Sosial">
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
        <nav className="flex gap-5 flex-wrap" aria-label="Legal">
          <a href="#privacy" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#privacy")}>
            Privasi
          </a>
          <a href="#terms" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, "#terms")}>
            Ketentuan
          </a>
        </nav>
      </div>
    </footer>
  );
}
