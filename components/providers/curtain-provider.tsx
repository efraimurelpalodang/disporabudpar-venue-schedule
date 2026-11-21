"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type TransitionDirection = "to-login" | "to-home";

interface CurtainContextType {
  navigateWithCurtain: (href: string) => void;
  phase: "idle" | "entering" | "exiting";
  direction: TransitionDirection;
}

const CurtainContext = React.createContext<CurtainContextType>({
  navigateWithCurtain: () => {},
  phase: "idle",
  direction: "to-login",
});

export function useCurtain() {
  return React.useContext(CurtainContext);
}

const TRANSITION_EASE = [0.76, 0, 0.24, 1] as const;

export function CurtainProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = React.useState<"idle" | "entering" | "exiting">("idle");
  const [direction, setDirection] = React.useState<TransitionDirection>("to-login");
  const isTransitioningRef = React.useRef(false);

  // Navigasi dengan animasi transisi:
  // - Ke /login: tirai masuk dari kanan, keluar ke kiri
  // - Ke / (Kembali ke Beranda): animasi halaman geser (slide dari kiri ke kanan)
  const navigateWithCurtain = React.useCallback(
    (href: string) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // Beritahu overlay / modal yang terbuka agar segera ditutup
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("page-curtain-start"));
      }

      const targetDir: TransitionDirection = href === "/" ? "to-home" : "to-login";
      setDirection(targetDir);

      // 1. Panel transisi masuk menutupi layar
      setPhase("entering");

      const enterDuration = targetDir === "to-home" ? 380 : 420;
      const exitDuration = targetDir === "to-home" ? 440 : 500;

      // 2. Saat layar tertutup penuh, pindahkan rute halaman
      window.setTimeout(() => {
        router.push(href);

        // 3. Jeda singkat agar halaman baru siap di balik layar
        window.setTimeout(() => {
          // 4. Panel transisi keluar menyingkap halaman baru
          setPhase("exiting");

          // 5. Setelah selesai keluar, kembalikan ke idle
          window.setTimeout(() => {
            setPhase("idle");
            isTransitioningRef.current = false;
          }, exitDuration);
        }, 50);
      }, enterDuration);
    },
    [router]
  );

  // Posisi awal, masuk, dan keluar berdasarkan arah
  const isToHome = direction === "to-home";
  const startX = isToHome ? "-100%" : "100%";
  const exitX = isToHome ? "100%" : "-100%";

  return (
    <CurtainContext.Provider value={{ navigateWithCurtain, phase, direction }}>
      {children}

      {/* Panel Animasi Transisi Halaman */}
      {phase !== "idle" && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden"
          aria-hidden="true"
        >
          {/* Layer 1: Aksen Biru Terang (Royal Blue Ribbon) */}
          <motion.div
            key={`slide-accent-${direction}`}
            initial={{ x: startX }}
            animate={
              phase === "entering"
                ? { x: "0%" }
                : { x: exitX }
            }
            transition={{
              duration: isToHome ? 0.38 : 0.42,
              delay: phase === "entering" ? 0 : 0.05,
              ease: TRANSITION_EASE,
            }}
            className="absolute inset-0 bg-[#2563c9] will-change-transform"
          />

          {/* Layer 2: Panel Utama Biru Dispora (Navy Slide Curtain) */}
          <motion.div
            key={`slide-main-${direction}`}
            initial={{ x: startX }}
            animate={
              phase === "entering"
                ? { x: "0%" }
                : { x: exitX }
            }
            transition={{
              duration: isToHome ? 0.38 : 0.42,
              delay: phase === "entering" ? 0.05 : 0,
              ease: TRANSITION_EASE,
            }}
            className="absolute inset-0 bg-[#0f2f63] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] will-change-transform flex items-center justify-center"
          >
            {/* Logo hanya ditampilkan saat menuju halaman login */}
            {!isToHome && (
              <div className="flex items-center gap-3.5 opacity-90 scale-95 select-none pointer-events-none">
                <img
                  src="/icons/banjarbaru.webp"
                  alt="Logo Kota Banjarbaru"
                  className="h-11 w-auto object-contain drop-shadow-md"
                />
                <span className="text-white text-xl font-medium tracking-tight drop-shadow-sm">
                  Sarpras Banjarbaru
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </CurtainContext.Provider>
  );
}
