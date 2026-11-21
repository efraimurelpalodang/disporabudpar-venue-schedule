import { LapanganPublik } from "./index";

export interface CollectionSlide {
  img: string;
  brand: string;
  title: string;
  cta: string;
  alt: string;
}

export interface TrustSlide {
  img: string;
  name: string;
  role: string;
  alt: string;
  headline: [string, string, string, string];
}

export interface LapanganDetail extends LapanganPublik {
  slug: string;
  deskripsi: string;
}
