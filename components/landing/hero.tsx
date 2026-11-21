"use client";

import * as React from "react";
import { motion } from "motion/react";
import { BrandIcon } from "./icons";
import { COLLECTION_SLIDES } from "@/lib/landing-data";
import { cn } from "cn";

interface HeroProps {
  heroRef: React.RefObject<HTMLElement | null>;
  heroPlateRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
  taglineOn: boolean;
  collectionOn: boolean;
  membershipOn: boolean;
  onOpenContact: () => void;
  onOpenMenu: () => void;
  onNavigate: (href: string) => void;
  onOpenSchedule?: (venueId?: string) => void;
}

export function Hero({
  heroRef,
  heroPlateRef,
  isReady,
  taglineOn,
  collectionOn,
  membershipOn,
  onOpenContact,
  onOpenMenu,
  onNavigate,
  onOpenSchedule,
}: HeroProps) {
  const [collIndex, setCollIndex] = React.useState(0);
  const [collFading, setCollFading] = React.useState(false);
  const collTimerRef = React.useRef<number | null>(null);

  const currentSlide = COLLECTION_SLIDES[collIndex];

  const goCollection = React.useCallback(
    (index: number) => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        setCollIndex((index + COLLECTION_SLIDES.length) % COLLECTION_SLIDES.length);
        return;
      }

      setCollFading(true);
      window.setTimeout(() => {
        setCollIndex((index + COLLECTION_SLIDES.length) % COLLECTION_SLIDES.length);
        setCollFading(false);
      }, 280);
    },
    []
  );

  // Auto rotation
  React.useEffect(() => {
    if (!collectionOn) return;

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    collTimerRef.current = window.setInterval(() => {
      goCollection(collIndex + 1);
    }, 3800);

    return () => {
      if (collTimerRef.current) clearInterval(collTimerRef.current);
    };
  }, [collectionOn, collIndex, goCollection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#0f2f63] text-white rounded-[2rem] h-[calc(100svh-1rem)] sm:h-[calc(100svh-1.5rem)] min-h-144 flex flex-col"
      id="hero"
      ref={heroRef}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 right-0 top-[-16%] h-[132%] w-full will-change-transform" id="heroPlate" ref={heroPlateRef}>
          <img
            src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/hero/hero-court.webp"
            alt="Foto lapangan olahraga"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-[#0f2f63]/65 via-[#0f2f63]/35 to-[#0f2f63]/75" />
      </div>

      <header className="relative z-10 flex items-center gap-4 px-6 sm:px-10 pt-6 sm:pt-8 text-xs text-white">
        <nav className="hidden lg:flex flex-1 gap-8" aria-label="Navigasi utama">
          <a href="#programs" className="text-white/90 hover:text-white transition-colors whitespace-nowrap" onClick={(e) => handleLinkClick(e, "#programs")}>
            Daftar Lapangan
          </a>
          <a href="#facilities" className="text-white/90 hover:text-white transition-colors whitespace-nowrap" onClick={(e) => handleLinkClick(e, "#facilities")}>
            Fasilitas
          </a>
        </nav>
        <a
          className="flex items-center gap-2 flex-1 justify-start lg:justify-center text-base font-medium uppercase tracking-[0.2em] text-white whitespace-nowrap"
          href="#hero"
          aria-label="Beranda Bidang Olahraga Disporabudpar Banjarbaru"
          onClick={(e) => handleLinkClick(e, "#hero")}
        >
          <span>Bidang Olahraga Disporabudpar Banjarbaru</span>
        </a>
        <div className="flex items-center justify-end gap-4 sm:gap-5 flex-1">
          <button
            className="hidden sm:inline-block text-xs uppercase tracking-wider text-white relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-white after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform cursor-pointer"
            type="button"
            onClick={onOpenContact}
          >
            Hubungi Petugas
          </button>
          <button
            className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.25 bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors cursor-pointer"
            type="button"
            id="burger"
            aria-label="Buka menu"
            onClick={onOpenMenu}
          >
            <span className="block w-4 h-[1.5px] bg-white rounded-full" />
            <span className="block w-4 h-[1.5px] bg-white rounded-full" />
            <span className="block w-4 h-[1.5px] bg-white rounded-full" />
          </button>
        </div>
      </header>

      <h1 className="px-6 sm:px-10 pt-6 sm:pt-7 text-[8.5vw] sm:text-[9.5vw] xl:text-[9vw] font-medium uppercase leading-[0.95] sm:leading-[0.92] xl:leading-[0.9] tracking-[-0.02em] text-white flex flex-col" id="hero-title">
        <span className="block whitespace-nowrap">
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
            <span
              className={cn(
                "inline-block transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isReady ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "0ms" }}
            >
              Cek
            </span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
            <span
              className={cn(
                "inline-block transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isReady ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "120ms" }}
            >
              Jadwal
            </span>
          </span>
        </span>
        <span className="block whitespace-nowrap mt-[0.22em]">
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
            <span
              className={cn(
                "inline-block transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isReady ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "240ms" }}
            >
              Lapangan
            </span>
          </span>
        </span>
      </h1>

      <div className="mt-auto px-6 pb-8 sm:px-10 sm:pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <p className="text-3xl sm:text-[2.4rem] font-medium uppercase leading-[0.95] tracking-[-0.02em] text-white/85" id="heroTagline">
          <span className="block overflow-hidden pb-[0.14em]">
            <motion.span
              className="block"
              initial={{ y: "115%", opacity: 0 }}
              animate={taglineOn ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              Cek Jadwal,
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <motion.span
              className="block"
              initial={{ y: "115%", opacity: 0 }}
              animate={taglineOn ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
            >
              Ajukan Surat
            </motion.span>
          </span>
        </p>

        <div className="flex items-end gap-4 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          <div className={cn("hidden md:flex w-64 flex-col gap-3 transition-all duration-850 ease-[cubic-bezier(0.16,1,0.3,1)]", collectionOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7")} id="collection">
            <div
              className={cn(
                "flex gap-3 p-3 rounded-3xl border border-white/15 bg-white/10 shadow-[0_1rem_2rem_rgba(15,47,99,0.2)] backdrop-blur-md transition-all duration-300",
                collFading ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
              )}
              id="collectionCard"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-white/10">
                <img
                  id="collImg"
                  src={currentSlide.img}
                  alt={currentSlide.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-0.5 min-w-0">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white" id="collBrand">
                  {currentSlide.brand}
                </span>
                <span className="text-[11px] uppercase opacity-80 text-white" id="collTitle">
                  {currentSlide.title}
                </span>
                <a
                  className="text-[10px] underline underline-offset-2 mt-0.5 w-fit opacity-90 hover:opacity-100 transition-opacity text-white"
                  id="collCta"
                  href="#schedule"
                  onClick={(e) => {
                    e.preventDefault();
                    if (collIndex === 0 || collIndex === 1) {
                      if (onOpenSchedule) onOpenSchedule();
                    } else {
                      onOpenContact();
                    }
                  }}
                >
                  {currentSlide.cta} &rarr;
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2" id="collectionDots">
              {COLLECTION_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ke slide ${i + 1}`}
                  aria-current={i === collIndex ? "true" : undefined}
                  onClick={() => goCollection(i)}
                  className="p-1.5 cursor-pointer"
                >
                  <i
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-400",
                      i === collIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <article
            className={cn(
              "flex gap-3 items-stretch w-full sm:max-w-60 p-3 rounded-3xl border border-white/15 bg-white/10 shadow-[0_1rem_2rem_rgba(15,47,99,0.2)] backdrop-blur-md transition-all duration-850 ease-[cubic-bezier(0.16,1,0.3,1)]",
              membershipOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
            )}
            id="membership"
          >
            <div className="flex flex-col justify-between gap-2 min-w-0">
              <div className="text-3xl font-medium leading-none text-white">4</div>
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="w-5 h-5 rounded-full border border-[#0f2f63]/40 shrink-0 bg-[#5790e6]" />
                <span className="w-5 h-5 rounded-full border border-[#0f2f63]/40 shrink-0 bg-[#c2e029]" />
                <span className="w-5 h-5 rounded-full border border-[#0f2f63]/40 shrink-0 bg-[#0b6e97]" />
                <span className="w-5 h-5 rounded-full border border-[#0f2f63]/40 shrink-0 bg-white" />
              </div>
              <div className="text-[10px] opacity-80 leading-tight text-white">Lapangan terdaftar</div>
            </div>
            <div className="w-16 shrink-0 aspect-3/4 rounded-xl overflow-hidden bg-white/10">
              <img
                src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp"
                alt="Foto lapangan olahraga"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
