import type { Metadata } from "next";
import { LoginView } from "@/components/auth/login-view";

export const metadata: Metadata = {
  title: "Login — Portal Administrasi Sarpras Disporabudpar Banjarbaru",
  description:
    "Masuk ke portal administrasi pencatatan dan verifikasi jadwal lapangan Disporabudpar Kota Banjarbaru.",
};

export default function LoginPage() {
  return <LoginView />;
}
