"use client";

import * as React from "react";
import { motion } from "motion/react";
import { titleContainerVariants, titleLineVariants } from "@/lib/animation-variants";

const STAT_ITEMS = [
  { value: "4", label: "Lapangan terdaftar", delay: 0 },
  { value: "18", label: "Slot jam per hari", delay: 110 },
  { value: "12", label: "Bulan jangkauan kalender", delay: 220 },
  { value: "7", label: "Hari kesegaran data", delay: 330 },
];

export function Stats() {
  return (
    <section className="bg-[#2563c9] text-white rounded-[2rem] mt-3 py-20 px-6 sm:px-10">
      <motion.h2
        className="text-[3.75rem] sm:text-[5.5rem] lg:text-[7rem] font-medium leading-[0.92] tracking-[-0.02em]"
        id="stats-title"
        variants={titleContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={titleLineVariants}>
            Data yang
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.14em]">
          <motion.span className="block" variants={titleLineVariants}>
            terpercaya
          </motion.span>
        </span>
      </motion.h2>

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16">
        {STAT_ITEMS.map((item) => (
          <motion.div
            key={item.label}
            className="border-t border-white/20 pt-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: item.delay / 1000 }}
          >
            <dt className="sr-only">{item.label}</dt>
            <dd className="flex flex-col">
              <span className="text-6xl sm:text-7xl font-medium leading-none tracking-[-0.02em]">
                {item.value}
              </span>
              <span className="text-sm text-white/65 mt-3">{item.label}</span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
