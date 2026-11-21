"use client";

import * as React from "react";
import { motion } from "motion/react";
import { titleContainerVariants, titleLineVariants } from "@/lib/animation-variants";

const TESTIMONIALS = [
  {
    quote:
      "Periksa ketersediaan tanggal dan slot jam lapangan melalui kalender publik tanpa perlu membuat akun.",
    name: "Langkah 1",
    role: "Cek Jadwal",
    delay: 0,
  },
  {
    quote:
      "Ajukan surat permohonan peminjaman ke kantor Disporabudpar Bidang Olahraga.",
    name: "Langkah 2",
    role: "Ajukan Surat",
    delay: 120,
  },
  {
    quote:
      "Hubungi petugas lapangan terkait melalui WhatsApp untuk konfirmasi jadwal.",
    name: "Langkah 3",
    role: "Konfirmasi",
    delay: 240,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 px-6 sm:py-24 sm:px-10" id="testimonials">
      <motion.h2
        className="text-[3.75rem] sm:text-[5.5rem] lg:text-[7rem] font-medium leading-[0.92] tracking-[-0.02em]"
        id="testimonials-title"
        variants={titleContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={titleLineVariants}>
            Langkah
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={titleLineVariants}>
            Pemesanan
          </motion.span>
        </span>
      </motion.h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
        {TESTIMONIALS.map((item) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: item.delay / 1000 }}
          >
            <figure className="flex flex-col justify-between h-full rounded-3xl bg-[#f4f4f4] p-7 transition-transform duration-550 ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:-translate-y-2">
              <div>
                <div className="text-4xl leading-none text-[#2563c9] font-medium">&ldquo;</div>
                <blockquote className="text-lg leading-[1.55] text-[#0a0a0a] mt-4">
                  {item.quote}
                </blockquote>
              </div>
              <figcaption className="border-t border-[#e6e8ec] pt-4 mt-6">
                <div className="font-medium text-[#0a0a0a]">{item.name}</div>
                <div className="text-sm text-[#717784]">{item.role}</div>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
