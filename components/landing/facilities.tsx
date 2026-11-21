"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "cn";
import { titleContainerVariants, titleLineVariants } from "@/lib/animation-variants";

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
    <section className="relative bg-white rounded-[2rem] -mt-10 py-16 px-6 sm:py-20 sm:px-10" id="facilities">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
        <div className="w-full max-w-xl">
          <motion.div
            className="w-16 h-16 rounded-2xl overflow-hidden bg-[#f4f4f4]"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/3.webp"
              alt="Foto fasilitas lapangan"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.h2
            className="text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] xl:text-[5.5rem] font-medium leading-[0.95] tracking-[-0.02em] mt-6"
            id="facilities-title"
            variants={titleContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span className="block" variants={titleLineVariants}>
                Lihat
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span className="block" variants={titleLineVariants}>
                Fasilitas
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span className="block" variants={titleLineVariants}>
                Lapangan
              </motion.span>
            </span>
          </motion.h2>
          <p
            ref={wordsRef}
            className="text-sm text-[#717784] max-w-md mt-6 leading-relaxed"
            data-words
            data-delay="250"
            data-stagger="28"
          >
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className={cn(
                    "inline-block transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    wordsOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${baseDelay + i * stagger}ms` }}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="flex items-end gap-5">
          <motion.figure
            className="flex-1 relative aspect-3/4 rounded-3xl overflow-hidden bg-[#f4f4f4] min-w-0 group"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            <img
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp"
              alt="Foto Lapangan K.S Tubun"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:scale-105"
            />
          </motion.figure>

          <motion.figure
            className="flex-1 relative aspect-3/4 rounded-3xl overflow-hidden bg-[#f4f4f4] min-w-0 mb-8 group"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            <img
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/4.webp"
              alt="Foto GOR Rudy Resnawan"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:scale-105"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
