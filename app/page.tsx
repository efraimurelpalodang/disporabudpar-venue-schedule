import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Bidang Olahraga Disporabudpar — Jadwal Lapangan",
  description:
    "Sistem pencatatan dan informasi jadwal lapangan Disporabudpar, Bidang Olahraga.",
};

export default function HomePage() {
  return <LandingPage />;
}
