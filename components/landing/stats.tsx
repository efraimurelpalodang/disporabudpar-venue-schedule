"use client";

import * as React from "react";

const STAT_ITEMS = [
  { value: "4", label: "Lapangan terdaftar", delay: 0 },
  { value: "18", label: "Slot jam per hari", delay: 110 },
  { value: "12", label: "Bulan jangkauan kalender", delay: 220 },
  { value: "7", label: "Hari kesegaran data", delay: 330 },
];

export function Stats() {
  return (
    <section className="stats">
      <h2 className="stack-title lines" id="stats-title" data-stagger="120">
        <span className="line-clip">
          <span>Data yang</span>
        </span>
        <span className="line-clip">
          <span>terpercaya</span>
        </span>
      </h2>

      <dl>
        {STAT_ITEMS.map((item) => (
          <div
            key={item.label}
            className="stat inview"
            data-delay={item.delay}
            style={{ "--iy": "30px" } as React.CSSProperties}
          >
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="stat-value">{item.value}</span>
              <span className="stat-label">{item.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
