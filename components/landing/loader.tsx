"use client";

import * as React from "react";
import { BrandIcon } from "./icons";

interface LoaderProps {
  onReady: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
}

export function Loader({ onReady, lockScroll, unlockScroll }: LoaderProps) {
  const [phase, setPhase] = React.useState<"initial" | "in" | "out" | "done">("initial");

  React.useEffect(() => {
    lockScroll();

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const minVisible = isReduced ? 200 : 1400;
    const exitMs = isReduced ? 0 : 850;

    // Trigger .in transition on next animation frame
    const frameId = requestAnimationFrame(() => {
      setPhase("in");
    });

    const readyTimer = window.setTimeout(() => {
      unlockScroll();
      onReady();
      setPhase("out");

      const exitTimer = window.setTimeout(() => {
        setPhase("done");
      }, exitMs);

      return () => clearTimeout(exitTimer);
    }, minVisible);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(readyTimer);
      unlockScroll();
    };
  }, [onReady, lockScroll, unlockScroll]);

  if (phase === "done") return null;

  return (
    <div
      className={`loader ${phase === "in" ? "in" : ""} ${phase === "out" ? "out" : ""}`}
      id="loader"
      aria-hidden="true"
    >
      <div className="loader-logos">
        <img
          src="/icons/banjarbaru.webp"
          alt="Logo Kota Banjarbaru"
          className="loader-logo"
        />
        <img
          src="/icons/dispora.webp"
          alt="Logo Dispora"
          className="loader-logo"
        />
        <img
          src="/icons/banjarbaru-emas.webp"
          alt="Logo Banjarbaru Emas"
          className="loader-logo"
        />
      </div>
      <div className="loader-track">
        <div className="loader-fill" />
      </div>
    </div>
  );
}
