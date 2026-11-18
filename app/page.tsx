import { Suspense } from "react";
import { connection } from "next/server";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRentangJamOperasional } from "@/lib/jadwal";
import { formatTimestampWita, getWitaTodayISO } from "@/lib/wita";

async function InfoWaktuWita() {
  await connection();
  const sekarang = new Date();
  const waktuWita = formatTimestampWita(sekarang);
  const hariIni = getWitaTodayISO(sekarang);

  return (
    <div className="space-y-1">
      <p className="font-medium text-foreground">
        Verifikasi Zona Waktu WITA (Asia/Makassar)
      </p>
      <p>Tanggal sistem: {hariIni}</p>
      <p>Waktu saat ini: {waktuWita}</p>
      <p>Jam operasional bawaan: {formatRentangJamOperasional()}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-12">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Disporabudpar, Bidang Olahraga</Badge>
            <Badge variant="outline">Tahap 1 — Fondasi Proyek</Badge>
          </div>
          <CardTitle className="text-2xl">Aplikasi Jadwal Lapangan</CardTitle>
          <CardDescription>
            Fondasi Next.js 16, Tailwind CSS v4, shadcn/ui (Radix UI
            Primitives), TanStack Ecosystem, dan utilitas zona waktu WITA telah
            siap digunakan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <Suspense
              fallback={
                <p className="text-muted-foreground">Memuat waktu WITA...</p>
              }
            >
              <InfoWaktuWita />
            </Suspense>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>
              Siap dilanjutkan ke Tahap 2 (Skema Basis Data, Drizzle ORM &amp;
              Supabase).
            </span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
