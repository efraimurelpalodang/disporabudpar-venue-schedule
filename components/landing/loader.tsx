"use client";

import * as React from "react";
import { cn } from "cn";

interface LoaderProps {
  onReady: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
}

let hasCompletedInitialLandingLoad = false;

export function Loader({ onReady, lockScroll, unlockScroll }: LoaderProps) {
  const [phase, setPhase] = React.useState<"initial" | "in" | "out" | "done">(() => {
    return hasCompletedInitialLandingLoad ? "done" : "initial";
  });

  React.useEffect(() => {
    if (hasCompletedInitialLandingLoad) {
      onReady();
      return;
    }

    lockScroll();

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const minVisible = isReduced ? 200 : 1400;
    const exitMs = isReduced ? 0 : 850;

    const frameId = requestAnimationFrame(() => {
      setPhase("in");
    });

    const readyTimer = window.setTimeout(() => {
      hasCompletedInitialLandingLoad = true;
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
      className={cn(
        "fixed inset-0 z-[200] bg-[#0f2f63] text-white flex flex-col items-center justify-center gap-8 transition-transform duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
        phase === "out" ? "-translate-y-[105%]" : "translate-y-0"
      )}
      id="loader"
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex items-center justify-center gap-5 sm:gap-9 transition-all duration-850 ease-[cubic-bezier(0.16,1,0.3,1)]",
          phase === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <img
          src="/icons/banjarbaru.webp"
          alt="Logo Kota Banjarbaru"
          className="h-[3.75rem] sm:h-[5.5rem] w-auto max-w-[5.5rem] sm:max-w-[8rem] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
        />
        <img
          src="/icons/dispora.webp"
          alt="Logo Dispora"
          className="h-[3.75rem] sm:h-[5.5rem] w-auto max-w-[5.5rem] sm:max-w-[8rem] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
        />
        <img
          src="/icons/banjarbaru-emas.webp"
          alt="Logo Banjarbaru Emas"
          className="h-[3.75rem] sm:h-[5.5rem] w-auto max-w-[5.5rem] sm:max-w-[8rem] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
        />
      </div>
      <div className="w-56 h-[2px] rounded-full bg-white/20 overflow-hidden">
        <div
          className={cn(
            "h-full w-full bg-white origin-left transition-transform duration-[1280ms] ease-[cubic-bezier(0.65,0,0.35,1)] delay-[120ms]",
            phase === "in" ? "scale-x-100" : "scale-x-0"
          )}
        />
      </div>
    </div>
  );
}
