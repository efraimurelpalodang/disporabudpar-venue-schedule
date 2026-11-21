"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRightIcon } from "./icons";
import { TRUST_SLIDES } from "@/lib/landing-data";
import { cn } from "cn";

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
    <section className="relative isolate overflow-hidden bg-white py-16 px-6 sm:py-20 sm:px-10 rounded-[2rem] mt-3" id="trust" ref={trustRef}>
      <div className="relative z-20 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start justify-between">
        <motion.div
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#f4f4f4] flex flex-col items-center justify-center text-center gap-0.5 p-4 shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <strong className="text-2xl font-medium leading-none text-[#0a0a0a]">100%</strong>
          <span className="text-[10px] text-[#717784] max-w-[7em] leading-tight">Data jadwal terpusat dan akurat</span>
        </motion.div>
        <motion.article
          className="flex gap-4 sm:gap-5 items-start max-w-md rounded-3xl bg-[#f4f4f4] p-5 sm:p-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <div className="rounded-xl bg-white px-4 py-2 text-xl font-medium leading-tight shrink-0 text-[#0a0a0a]">#01</div>
          <div>
            <h3 className="text-lg font-medium leading-tight text-[#0a0a0a]">Satu sumber data jadwal</h3>
            <p className="text-xs text-[#717784] leading-relaxed mt-1.5">
              Seluruh peminjaman lapangan tercatat terpusat sehingga ketersediaan tanggal dan jam
              dapat diperiksa secara mandiri.
            </p>
          </div>
        </motion.article>
      </div>

      <h2 className="relative z-0 pointer-events-none select-none max-w-7xl mx-auto mt-12 text-[8.2vw] font-medium uppercase leading-[1.02] tracking-[-0.02em]" id="trust-title">
        <div className="flex justify-between gap-4">
          <span
            key={`w0-${ghostTriggerKey}`}
            className="inline-block overflow-hidden pb-[0.12em] will-change-transform"
            ref={(el) => {
              ghostRefs.current[0] = el;
            }}
          >
            <span
              className={cn(
                "inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#d7dae1]",
                hasEnteredView ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "0ms" }}
            >
              {currentSlide.headline[0]}
            </span>
          </span>
          <span
            key={`w1-${ghostTriggerKey}`}
            className="inline-block overflow-hidden pb-[0.12em] will-change-transform"
            ref={(el) => {
              ghostRefs.current[1] = el;
            }}
          >
            <span
              className={cn(
                "inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#d7dae1]",
                hasEnteredView ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "70ms" }}
            >
              {currentSlide.headline[1]}
            </span>
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span
            key={`w2-${ghostTriggerKey}`}
            className="inline-block overflow-hidden pb-[0.12em] will-change-transform"
            ref={(el) => {
              ghostRefs.current[2] = el;
            }}
          >
            <span
              className={cn(
                "inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#0a0a0a]",
                hasEnteredView ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "140ms" }}
            >
              {currentSlide.headline[2]}
            </span>
          </span>
          <span
            key={`w3-${ghostTriggerKey}`}
            className="inline-block overflow-hidden pb-[0.12em] will-change-transform"
            ref={(el) => {
              ghostRefs.current[3] = el;
            }}
          >
            <span
              className={cn(
                "inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#d7dae1]",
                hasEnteredView ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              )}
              style={{ transitionDelay: "210ms" }}
            >
              {currentSlide.headline[3]}
            </span>
          </span>
        </div>
      </h2>

      <motion.figure
        className="relative z-10 w-52 sm:w-64 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:m-0 mx-auto mt-8 rotate-6 aspect-3/4 rounded-3xl bg-[#2563c9] overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -6% 0px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          id="coachImg"
          src={currentSlide.img}
          alt={currentSlide.alt}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ opacity: coachImgOpacity, transition: "opacity 0.55s cubic-bezier(.16,1,.3,1)" }}
        />
        <figcaption className="absolute left-3 right-3 bottom-3 rounded-xl bg-[#0f2f63]/40 backdrop-blur-md text-white p-2.5 px-3">
          <div className="text-sm font-medium leading-tight" id="coachName">
            {currentSlide.name}
          </div>
          <div className="text-[11px] opacity-80 leading-tight mt-0.5" id="coachRole">
            {currentSlide.role}
          </div>
        </figcaption>
      </motion.figure>

      <div className="relative z-20 mt-12 sm:mt-24 flex items-center justify-between gap-4">
        <button
          className="w-14 h-14 rounded-full border border-[#e6e8ec] bg-white text-[#0a0a0a] grid place-items-center shrink-0 hover:scale-105 hover:border-[#0a0a0a] transition-all cursor-pointer"
          type="button"
          id="trustPrev"
          aria-label="Lapangan sebelumnya"
          onClick={() => goTrust(trustIndex - 1)}
        >
          <span className="-scale-x-100 size-5 flex items-center justify-center">
            <ArrowRightIcon />
          </span>
        </button>
        <div className="flex items-center gap-2" id="trustDots">
          {TRUST_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ke slide ${i + 1}`}
              aria-current={i === trustIndex ? "true" : undefined}
              onClick={() => goTrust(i)}
              className="p-1.5 cursor-pointer"
            >
              <i
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-400",
                  i === trustIndex ? "w-5 bg-[#0a0a0a]" : "w-1.5 bg-[#d7dae1]"
                )}
              />
            </button>
          ))}
        </div>
        <button
          className="w-14 h-14 rounded-full border border-[#0a0a0a] bg-[#0a0a0a] text-white grid place-items-center shrink-0 hover:scale-105 hover:bg-[#0f2f63] hover:border-[#0f2f63] transition-all cursor-pointer"
          type="button"
          id="trustNext"
          aria-label="Lapangan berikutnya"
          onClick={() => goTrust(trustIndex + 1)}
        >
          <span className="size-5 flex items-center justify-center">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
    </section>
  );
}
