"use client";

import * as React from "react";
import { ArrowRightIcon } from "./icons";
import { TRUST_SLIDES } from "./types";

interface TrustProps {
  trustRef: React.RefObject<HTMLElement | null>;
  ghostRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}

export function Trust({ trustRef, ghostRefs }: TrustProps) {
  const [trustIndex, setTrustIndex] = React.useState(0);
  const [coachImgOpacity, setCoachImgOpacity] = React.useState(1);
  const [ghostTriggerKey, setGhostTriggerKey] = React.useState(0);
  const [hasEnteredView, setHasEnteredView] = React.useState(false);

  const currentSlide = TRUST_SLIDES[trustIndex];

  const goTrust = React.useCallback((newIndex: number) => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrapped = (newIndex + TRUST_SLIDES.length) % TRUST_SLIDES.length;

    if (isReduced) {
      setTrustIndex(wrapped);
      setGhostTriggerKey((k) => k + 1);
      return;
    }

    setCoachImgOpacity(0);
    setGhostTriggerKey((k) => k + 1);

    window.setTimeout(() => {
      setTrustIndex(wrapped);
      requestAnimationFrame(() => {
        setCoachImgOpacity(1);
      });
    }, 240);
  }, []);

  // Fire ghost words once trust section enters view
  React.useEffect(() => {
    const section = trustRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setHasEnteredView(true);
            setGhostTriggerKey((k) => k + 1);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [trustRef]);

  return (
    <section className="trust" id="trust" ref={trustRef}>
      <div className="trust-top">
        <div
          className="percent-badge inview"
          style={{ "--iy": "0px", "--is": ".9" } as React.CSSProperties}
        >
          <strong>100%</strong>
          <span>Data jadwal terpusat dan akurat</span>
        </div>
        <article className="badge-card inview" data-delay="120">
          <div className="badge-index">#01</div>
          <div>
            <h3>Satu sumber data jadwal</h3>
            <p>
              Seluruh peminjaman lapangan tercatat terpusat sehingga ketersediaan tanggal dan jam
              dapat diperiksa secara mandiri.
            </p>
          </div>
        </article>
      </div>

      <h2 className="ghost-heading" id="trust-title">
        <div className="ghost-row">
          <span
            key={`w0-${ghostTriggerKey}`}
            className={`ghost-word ${hasEnteredView ? "on" : ""}`}
            ref={(el) => {
              ghostRefs.current[0] = el;
            }}
          >
            <span style={{ transitionDelay: "0ms" }}>{currentSlide.headline[0]}</span>
          </span>
          <span
            key={`w1-${ghostTriggerKey}`}
            className={`ghost-word ${hasEnteredView ? "on" : ""}`}
            ref={(el) => {
              ghostRefs.current[1] = el;
            }}
          >
            <span style={{ transitionDelay: "70ms" }}>{currentSlide.headline[1]}</span>
          </span>
        </div>
        <div className="ghost-row">
          <span
            key={`w2-${ghostTriggerKey}`}
            className={`ghost-word is-ink ${hasEnteredView ? "on" : ""}`}
            ref={(el) => {
              ghostRefs.current[2] = el;
            }}
          >
            <span style={{ transitionDelay: "140ms" }}>{currentSlide.headline[2]}</span>
          </span>
          <span
            key={`w3-${ghostTriggerKey}`}
            className={`ghost-word ${hasEnteredView ? "on" : ""}`}
            ref={(el) => {
              ghostRefs.current[3] = el;
            }}
          >
            <span style={{ transitionDelay: "210ms" }}>{currentSlide.headline[3]}</span>
          </span>
        </div>
      </h2>

      <figure
        className="coach-card inview"
        style={{ "--iy": "60px", "--is": ".92" } as React.CSSProperties}
      >
        <img
          id="coachImg"
          src={currentSlide.img}
          alt={currentSlide.alt}
          loading="lazy"
          style={{ opacity: coachImgOpacity, transition: "opacity 0.55s cubic-bezier(.16,1,.3,1)" }}
        />
        <figcaption className="coach-caption">
          <div className="coach-name" id="coachName">
            {currentSlide.name}
          </div>
          <div className="coach-role" id="coachRole">
            {currentSlide.role}
          </div>
        </figcaption>
      </figure>

      <div className="trust-controls">
        <button
          className="arrow-btn arrow-btn--outline arrow-btn--prev"
          type="button"
          id="trustPrev"
          aria-label="Lapangan sebelumnya"
          onClick={() => goTrust(trustIndex - 1)}
        >
          <ArrowRightIcon />
        </button>
        <div className="dots" id="trustDots">
          {TRUST_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ke slide ${i + 1}`}
              aria-current={i === trustIndex ? "true" : undefined}
              onClick={() => goTrust(i)}
            >
              <i />
            </button>
          ))}
        </div>
        <button
          className="arrow-btn arrow-btn--solid"
          type="button"
          id="trustNext"
          aria-label="Lapangan berikutnya"
          onClick={() => goTrust(trustIndex + 1)}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </section>
  );
}
