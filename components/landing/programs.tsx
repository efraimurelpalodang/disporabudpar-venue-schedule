"use client";

import * as React from "react";
import { ArrowRightIcon } from "./icons";

const PROGRAMS = [
  {
    index: "01",
    name: "Lapangan K.S Tubun",
    desc: "Lapangan serbaguna untuk kegiatan olahraga masyarakat.",
    href: "#junior",
    delay: 0,
  },
  {
    index: "02",
    name: "Lapangan Sepak Bola Dr. Mardjani",
    desc: "Lapangan sepak bola untuk latihan dan pertandingan.",
    href: "#performance",
    delay: 90,
  },
  {
    index: "03",
    name: "Lapangan Tenis Idaman",
    desc: "Lapangan tenis untuk latihan dan rekreasi.",
    href: "#adult",
    delay: 180,
  },
  {
    index: "04",
    name: "GOR Rudy Resnawan",
    desc: "Gedung olahraga serbaguna untuk berbagai kegiatan.",
    href: "#private",
    delay: 270,
  },
];

interface ProgramsProps {
  onNavigate?: (href: string) => void;
}

export function Programs({ onNavigate }: ProgramsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) onNavigate(href);
  };

  return (
    <section className="programs" id="programs">
      <h2 className="stack-title lines" id="programs-title" data-stagger="120">
        <span className="line-clip">
          <span>Daftar Lapangan</span>
        </span>
        <span className="line-clip">
          <span>Tersedia</span>
        </span>
      </h2>

      <ul className="program-list">
        {PROGRAMS.map((item) => (
          <li key={item.index} className="program-row">
            <a
              href={item.href}
              className="inview"
              data-delay={item.delay}
              style={{ "--iy": "26px" } as React.CSSProperties}
              onClick={(e) => handleClick(e, item.href)}
            >
              <span className="p-index">{item.index}</span>
              <span className="p-main">
                <span className="p-name">{item.name}</span>
                <span className="p-desc">{item.desc}</span>
              </span>
              <span className="p-arrow">
                <ArrowRightIcon />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
