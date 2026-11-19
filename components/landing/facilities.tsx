"use client";

import * as React from "react";

const FAC_TEXT =
  "Periksa jadwal dan ketersediaan lapangan sebelum mengajukan surat permohonan peminjaman ke kantor Disporabudpar.";

export function Facilities() {
  const wordsRef = React.useRef<HTMLParagraphElement | null>(null);
  const [wordsOn, setWordsOn] = React.useState(false);

  React.useEffect(() => {
    const el = wordsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWordsOn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = React.useMemo(() => FAC_TEXT.split(/\s+/), []);
  const baseDelay = 250;
  const stagger = 28;

  return (
    <section className="facilities" id="facilities">
      <div className="fac-grid">
        <div className="fac-intro">
          <div
            className="fac-icon inview"
            style={{ "--iy": "0px", "--is": ".85" } as React.CSSProperties}
          >
            <img
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/3.webp"
              alt="Foto fasilitas lapangan"
              loading="lazy"
            />
          </div>
          <h2 className="stack-title lines fac-title" id="facilities-title" data-stagger="120">
            <span className="line-clip">
              <span>Lihat</span>
            </span>
            <span className="line-clip">
              <span>Fasilitas</span>
            </span>
            <span className="line-clip">
              <span>Lapangan</span>
            </span>
          </h2>
          <p
            ref={wordsRef}
            className={`fac-body ${wordsOn ? "on" : ""}`}
            data-words
            data-delay="250"
            data-stagger="28"
          >
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className="w"
                  style={{ transitionDelay: `${baseDelay + i * stagger}ms` }}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="court-cards">
          <figure
            className="court-tile inview"
            data-delay="0"
            style={{ "--iy": "48px" } as React.CSSProperties}
          >
            <img
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp"
              alt="Foto Lapangan K.S Tubun"
              loading="lazy"
            />
          </figure>

          <figure
            className="court-tile inview"
            data-delay="140"
            style={{ "--iy": "48px" } as React.CSSProperties}
          >
            <img
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/4.webp"
              alt="Foto GOR Rudy Resnawan"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
