"use client";

import * as React from "react";
import Lenis from "lenis";
import { Loader } from "./loader";
import { Hero } from "./hero";
import { Trust } from "./trust";
import { Programs } from "./programs";
import { Facilities } from "./facilities";
import { Stats } from "./stats";
import { Testimonials } from "./testimonials";
import { Footer } from "./footer";
import { ContactModal } from "./contact-modal";
import { MenuOverlay } from "./menu-overlay";

export function LandingPage() {
  const lenisRef = React.useRef<Lenis | null>(null);
  const lockCountRef = React.useRef(0);

  const heroRef = React.useRef<HTMLElement | null>(null);
  const heroPlateRef = React.useRef<HTMLDivElement | null>(null);
  const trustRef = React.useRef<HTMLElement | null>(null);
  const ghostRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  const [isReady, setIsReady] = React.useState(false);
  const [taglineOn, setTaglineOn] = React.useState(false);
  const [collectionOn, setCollectionOn] = React.useState(false);
  const [membershipOn, setMembershipOn] = React.useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Scroll lock management
  const lockScroll = React.useCallback(() => {
    lockCountRef.current++;
    if (lenisRef.current) lenisRef.current.stop();
    const htmlEl = document.documentElement;
    htmlEl.style.position = "relative";
    htmlEl.style.overflow = "hidden";
    htmlEl.style.height = "100%";
  }, []);

  const unlockScroll = React.useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current > 0) return;
    if (lenisRef.current) lenisRef.current.start();
    const htmlEl = document.documentElement;
    htmlEl.style.removeProperty("position");
    htmlEl.style.removeProperty("overflow");
    htmlEl.style.removeProperty("height");
  }, []);

  // Adaptive REM scale-up
  React.useEffect(() => {
    const FONT_BASE = 16,
      BASE_W = 1920,
      COEF = 0.6666;
    const htmlEl = document.documentElement;

    function applyScaleUp() {
      const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) htmlEl.style.fontSize = size + "px";
      else htmlEl.style.removeProperty("font-size");
    }

    applyScaleUp();
    window.addEventListener("resize", applyScaleUp);
    return () => {
      window.removeEventListener("resize", applyScaleUp);
      htmlEl.style.removeProperty("font-size");
    };
  }, []);

  // Initialize Lenis smooth scroll
  React.useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;

    let rafId: number;
    function rafLoop(t: number) {
      lenis.raf(t);
      rafId = requestAnimationFrame(rafLoop);
    }
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Parallax on scroll
  React.useEffect(() => {
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ghostPairs = [
      [-3, 3],
      [3, -3],
      [-2, 4],
      [4, -3],
    ];

    let parallaxQueued = false;

    function onScrollParallax() {
      const vh = window.innerHeight;

      // Hero plate
      if (heroRef.current && heroPlateRef.current) {
        const hr = heroRef.current.getBoundingClientRect();
        const hp = clamp((vh - hr.top) / (vh + hr.height), 0, 1);
        heroPlateRef.current.style.transform = `translate3d(0, ${(hp * 12).toFixed(3)}%, 0)`;
      }

      // Ghost words
      if (trustRef.current) {
        const tr = trustRef.current.getBoundingClientRect();
        if (tr.bottom > -200 && tr.top < vh + 200) {
          const tp = clamp((vh - tr.top) / (vh + tr.height), 0, 1);
          ghostRefs.current.forEach((w, i) => {
            if (!w) return;
            const [a, b] = ghostPairs[i] || [0, 0];
            w.style.transform = `translateX(${lerp(a, b, tp).toFixed(3)}%)`;
          });
        }
      }
    }

    function queueParallax() {
      if (parallaxQueued) return;
      parallaxQueued = true;
      requestAnimationFrame(() => {
        parallaxQueued = false;
        onScrollParallax();
      });
    }

    window.addEventListener("scroll", queueParallax, { passive: true });
    window.addEventListener("resize", queueParallax);
    onScrollParallax();

    return () => {
      window.removeEventListener("scroll", queueParallax);
      window.removeEventListener("resize", queueParallax);
    };
  }, []);

  // In-view observer & Lines observer
  React.useEffect(() => {
    // Reveal inview elements
    const inviewIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseFloat(el.dataset.delay || "0");
          el.style.transitionDelay = delay + "ms";
          el.classList.add("on");
          inviewIO.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    document.querySelectorAll(".inview").forEach((el) => inviewIO.observe(el));

    // Stacked lines observer
    function primeLines(el: HTMLElement) {
      const base = parseFloat(el.dataset.delay || "0");
      const stagger = parseFloat(el.dataset.stagger || "120");
      Array.from(el.querySelectorAll(":scope > .line-clip > span")).forEach(
        (s, i) => {
          (s as HTMLElement).style.transitionDelay = base + i * stagger + "ms";
        }
      );
    }

    function playLines(el: HTMLElement) {
      if (!el) return;
      el.classList.remove("on");
      void el.offsetWidth;
      el.classList.add("on");
    }

    document.querySelectorAll<HTMLElement>(".lines").forEach(primeLines);

    const linesIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playLines(entry.target as HTMLElement);
          linesIO.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    document.querySelectorAll<HTMLElement>(".lines").forEach((el) => {
      if (el.id === "heroTagline") return; // gated by ready
      if (el.id === "modalTitle") return; // gated by modal open
      linesIO.observe(el);
    });

    return () => {
      inviewIO.disconnect();
      linesIO.disconnect();
    };
  }, []);

  // Keyboard escape
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) handleCloseModal();
        if (isMenuOpen) handleCloseMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, isMenuOpen]);

  // Navigate with smooth scroll
  const handleNavigate = React.useCallback((href: string) => {
    if (!href.startsWith("#") || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, {
        offset: 0,
        duration: 1.2,
      });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Modal open/close handlers
  const handleOpenModal = React.useCallback(() => {
    lockScroll();
    setIsModalOpen(true);
  }, [lockScroll]);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
    unlockScroll();
  }, [unlockScroll]);

  // Menu open/close handlers
  const handleOpenMenu = React.useCallback(() => {
    lockScroll();
    setIsMenuOpen(true);
  }, [lockScroll]);

  const handleCloseMenu = React.useCallback(() => {
    setIsMenuOpen(false);
    unlockScroll();
  }, [unlockScroll]);

  // When loader completes
  const handleLoaderReady = React.useCallback(() => {
    setIsReady(true);
    setTaglineOn(true);
    window.setTimeout(() => setCollectionOn(true), 650);
    window.setTimeout(() => setMembershipOn(true), 780);
  }, []);

  return (
    <>
      <Loader
        onReady={handleLoaderReady}
        lockScroll={lockScroll}
        unlockScroll={unlockScroll}
      />

      <main>
        <Hero
          heroRef={heroRef}
          heroPlateRef={heroPlateRef}
          isReady={isReady}
          taglineOn={taglineOn}
          collectionOn={collectionOn}
          membershipOn={membershipOn}
          onOpenContact={handleOpenModal}
          onOpenMenu={handleOpenMenu}
          onNavigate={handleNavigate}
        />

        <Trust trustRef={trustRef} ghostRefs={ghostRefs} />

        <Programs onNavigate={handleNavigate} />

        <Facilities />

        <Stats />

        <Testimonials />

        <Footer onOpenContact={handleOpenModal} onNavigate={handleNavigate} />
      </main>

      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onOpenContact={handleOpenModal}
        onNavigate={handleNavigate}
      />
    </>
  );
}
