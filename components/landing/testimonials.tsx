"use client";

import * as React from "react";

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
    <section className="testimonials" id="testimonials">
      <h2 className="stack-title lines" id="testimonials-title" data-stagger="120">
        <span className="line-clip">
          <span>Langkah</span>
        </span>
        <span className="line-clip">
          <span>Pemesanan</span>
        </span>
      </h2>

      <ul className="testi-list">
        {TESTIMONIALS.map((item) => (
          <li
            key={item.name}
            className="inview"
            data-delay={item.delay}
            style={{ "--iy": "40px" } as React.CSSProperties}
          >
            <figure className="testi-card">
              <div>
                <div className="testi-quote">&ldquo;</div>
                <blockquote>{item.quote}</blockquote>
              </div>
              <figcaption>
                <div className="testi-name">{item.name}</div>
                <div className="testi-role">{item.role}</div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
