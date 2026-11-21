"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRightIcon } from "./icons";
import { titleContainerVariants, titleLineVariants } from "@/lib/animation-variants";

const PROGRAMS = [
  {
    index: "01",
    id: "ks-tubun",
    name: "Lapangan K.S Tubun",
    desc: "Lapangan serbaguna untuk kegiatan olahraga masyarakat.",
    href: "#programs",
    delay: 0,
  },
  {
    index: "02",
    id: "dr-mardjani",
    name: "Lapangan Sepak Bola Dr. Mardjani",
    desc: "Lapangan sepak bola untuk latihan dan pertandingan.",
    href: "#programs",
    delay: 90,
  },
  {
    index: "03",
    id: "tenis-idaman",
    name: "Lapangan Tenis Idaman",
    desc: "Lapangan tenis untuk latihan dan rekreasi.",
    href: "#programs",
    delay: 180,
  },
  {
    index: "04",
    id: "gor-rudy",
    name: "GOR Rudy Resnawan",
    desc: "Gedung olahraga serbaguna untuk berbagai kegiatan.",
    href: "#programs",
    delay: 270,
  },
];

interface ProgramsProps {
  onNavigate?: (href: string) => void;
  onOpenSchedule?: (venueId: string) => void;
}

export function Programs({ onNavigate, onOpenSchedule }: ProgramsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    if (onOpenSchedule) {
      onOpenSchedule(id);
    } else if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <section className="bg-[#f4f4f4] py-24 px-6 sm:px-10 rounded-[2rem] mt-3" id="programs">
      <motion.h2
        className="text-[3.75rem] sm:text-[5.5rem] lg:text-[7rem] font-medium leading-[0.92] tracking-[-0.02em]"
        id="programs-title"
        variants={titleContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={titleLineVariants}>
            Daftar Lapangan
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={titleLineVariants}>
            Tersedia
          </motion.span>
        </span>
      </motion.h2>

      <ul className="mt-14">
        {PROGRAMS.map((item) => (
          <li key={item.index} className="border-t border-[#e6e8ec] last:border-b">
            <motion.a
              href={item.href}
              className="flex items-center gap-6 py-7 px-2 transition-colors hover:bg-white/60 rounded-xl group"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: item.delay / 1000 }}
              onClick={(e) => handleClick(e, item.id, item.href)}
            >
              <span className="w-10 shrink-0 text-sm font-medium text-[#717784]">{item.index}</span>
              <span className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-[#0a0a0a]">
                  {item.name}
                </span>
                <span className="text-sm text-[#717784]">{item.desc}</span>
              </span>
              <span className="w-11 h-11 shrink-0 rounded-full border border-[#e6e8ec] grid place-items-center bg-white group-hover:border-[#0a0a0a] transition-colors">
                <span className="w-5 h-5 flex items-center justify-center opacity-55 transition-all duration-450 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5 group-hover:opacity-100">
                  <ArrowRightIcon />
                </span>
              </span>
            </motion.a>
          </li>
        ))}
      </ul>
    </section>
  );
}
