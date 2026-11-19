"use client";

import * as React from "react";
import { BrandIcon } from "./icons";
import { COLLECTION_SLIDES } from "./types";

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
    <section className={`hero ${isReady ? "ready" : ""}`} id="hero" ref={heroRef}>
      <div className="hero-plate">
        <div className="hero-plate-inner" id="heroPlate" ref={heroPlateRef}>
          <img
            src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/hero/hero-court.webp"
            alt="Foto lapangan olahraga"
            fetchPriority="high"
          />
        </div>
        <div className="hero-overlay" />
      </div>

      <header className="site-header">
        <nav className="nav-left" aria-label="Navigasi utama">
          <a href="#programs" onClick={(e) => handleLinkClick(e, "#programs")}>
            Daftar Lapangan
          </a>
          <a href="#facilities" onClick={(e) => handleLinkClick(e, "#facilities")}>
            Fasilitas
          </a>
        </nav>
        <a
          className="brand"
          href="#hero"
          aria-label="Beranda Bidang Olahraga Disporabudpar Banjarbaru"
          onClick={(e) => handleLinkClick(e, "#hero")}
        >
          <span>Bidang Olahraga Disporabudpar Banjarbaru</span>
        </a>
        <div className="header-right">
          <button className="link-btn" type="button" onClick={onOpenContact}>
            Hubungi Petugas
          </button>
          <button
            className="burger"
            type="button"
            id="burger"
            aria-label="Buka menu"
            onClick={onOpenMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <h1 className="hero-title" id="hero-title">
        <span className="hero-title-line">
          <span className="word-clip">
            <span style={{ transitionDelay: "0ms" }}>Cek</span>
          </span>{" "}
          <span className="word-clip">
            <span style={{ transitionDelay: "120ms" }}>Jadwal</span>
          </span>
        </span>
        <span className="hero-title-line hero-title-line--bottom">
          <span className="word-clip">
            <span style={{ transitionDelay: "240ms" }}>Lapangan</span>
          </span>
        </span>
      </h1>

      <div className="hero-bottom">
        <p className={`hero-tagline lines ${taglineOn ? "on" : ""}`} id="heroTagline">
          <span className="line-clip">
            <span style={{ transitionDelay: "350ms" }}>Cek Jadwal,</span>
          </span>
          <span className="line-clip">
            <span style={{ transitionDelay: "460ms" }}>Ajukan Surat</span>
          </span>
        </p>

        <div className="hero-cluster">
          <div className={`collection ${collectionOn ? "on" : ""}`} id="collection">
            <div
              className={`collection-card ${collFading ? "is-fading" : ""}`}
              id="collectionCard"
            >
              <div className="collection-thumb">
                <img
                  id="collImg"
                  src={currentSlide.img}
                  alt={currentSlide.alt}
                  loading="lazy"
                />
              </div>
              <div className="collection-info">
                <span className="coll-brand" id="collBrand">
                  {currentSlide.brand}
                </span>
                <span className="coll-title" id="collTitle">
                  {currentSlide.title}
                </span>
                <a
                  className="coll-cta"
                  id="collCta"
                  href="#shop"
                  onClick={(e) => handleLinkClick(e, "#shop")}
                >
                  {currentSlide.cta} &rarr;
                </a>
              </div>
            </div>
            <div className="dots dots--light" id="collectionDots">
              {COLLECTION_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ke slide ${i + 1}`}
                  aria-current={i === collIndex ? "true" : undefined}
                  onClick={() => goCollection(i)}
                >
                  <i />
                </button>
              ))}
            </div>
          </div>

          <article
            className={`membership ${membershipOn ? "on" : ""}`}
            id="membership"
          >
            <div className="membership-left">
              <div className="membership-value">4</div>
              <div className="avatars" aria-hidden="true">
                <span style={{ background: "#5790e6" }} />
                <span style={{ background: "#c2e029" }} />
                <span style={{ background: "#0b6e97" }} />
                <span style={{ background: "#ffffff" }} />
              </div>
              <div className="membership-caption">Lapangan terdaftar</div>
            </div>
            <div className="membership-img">
              <img
                src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp"
                alt="Foto lapangan olahraga"
                loading="lazy"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
