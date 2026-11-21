"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const COURT_BACKGROUNDS = [
  "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp",
  "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/2.webp",
  "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/3.webp",
  "https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/4.webp",
];

const EXPO_EASE = [0.16, 1, 0.3, 1] as const;

export function LoginView() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);

  // Animasi pergantian gambar latar otomatis setiap 5.5 detik
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % COURT_BACKGROUNDS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Silakan isi email admin dan password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.info("Fitur login administrator sedang dalam tahap integrasi.");
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col min-[901px]:flex-row overflow-hidden bg-[#0a0a0a]">
      {/* Background Slideshow Layer murni crossfade gelap tanpa efek putih */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentBgIndex}
            src={COURT_BACKGROUNDS[currentBgIndex]}
            alt="Foto Fasilitas Lapangan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Gelap Desktop: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%) */}
        <div className="absolute inset-0 max-[900px]:hidden bg-linear-to-r from-black/85 via-black/55 to-black/25" />

        {/* Overlay Gelap Mobile untuk area atas (45vh) */}
        <div className="absolute inset-0 min-[901px]:hidden bg-linear-to-b from-black/40 via-black/60 to-black/80" />
      </div>

      {/* Left Panel: Branding & Text Info */}
      <div className="relative z-10 text-white flex flex-col max-[900px]:flex-none max-[900px]:h-[45vh] max-[900px]:justify-end max-[900px]:p-[30px_30px_80px_30px] min-[901px]:flex-1 min-[901px]:justify-center min-[901px]:p-[5%_8%]">
        {/* Logo Container dengan Animasi Masuk */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EXPO_EASE }}
          className="flex items-center gap-3 max-[900px]:absolute max-[900px]:top-7.5 max-[900px]:left-7.5 max-[900px]:mb-5 min-[901px]:mb-15"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <img
              src="/icons/banjarbaru.webp"
              alt="Logo Kota Banjarbaru"
              className="h-10 w-auto object-contain shrink-0 drop-shadow-md"
            />
          </div>
          <span className="text-[1.75rem] font-medium tracking-[-0.5px] drop-shadow-sm">
            Sarpras Banjarbaru
          </span>
        </motion.div>

        {/* Hero Text dengan Animasi Slide-Up & Stagger Smooth */}
        <div className="hero-text">
          <div className="overflow-hidden pb-1">
            <motion.h1
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.95, ease: EXPO_EASE, delay: 0.1 }}
              className="text-[2.5rem] font-semibold mb-2 tracking-[-1px] leading-tight min-[901px]:text-[3.5rem] min-[901px]:mb-5 drop-shadow-md"
            >
              Selamat Datang
            </motion.h1>
          </div>

          <div className="overflow-hidden pb-1">
            <motion.h2
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.95, ease: EXPO_EASE, delay: 0.22 }}
              className="text-base font-normal mb-0 min-[901px]:text-[1.125rem] min-[901px]:mb-8 text-white/90 drop-shadow-sm"
            >
              Sistem Informasi Sarana & Prasarana Olahraga
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EXPO_EASE, delay: 0.34 }}
            className="hidden min-[901px]:block text-base text-white/80 leading-[1.6] max-w-[80%] drop-shadow-sm"
          >
            Layanan informasi ketersediaan jadwal dan pencatatan peminjaman lapangan olahraga Disporabudpar Kota Banjarbaru.
          </motion.p>
        </div>
      </div>

      {/* Right Panel: Login Form Card */}
      <div className="relative z-10 flex-1 flex justify-center items-start max-[900px]:p-0 max-[900px]:-mt-8 min-[901px]:items-end min-[901px]:px-10 min-[901px]:pt-10 min-[901px]:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: EXPO_EASE, delay: 0.15 }}
          className="bg-white w-full rounded-t-[32px] rounded-b-none flex flex-col max-[900px]:max-w-full max-[900px]:p-[32px_24px] max-[900px]:shadow-none max-[900px]:min-h-[55vh] min-[901px]:max-w-120 min-[901px]:p-[40px_30px] min-[901px]:shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
        >
          {/* Form Header dengan Animasi Masuk */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EXPO_EASE, delay: 0.28 }}
            className="mb-6 text-left min-[901px]:text-center"
          >
            <h2 className="text-2xl font-semibold text-[#111827] mb-2">
              Masuk
            </h2>
            <p className="text-sm min-[901px]:text-[0.8125rem] text-[#6b7280]">
              Silakan masukkan username dan password akun Anda.
            </p>
          </motion.div>

          {/* Form Fields dengan Floating Animated Placeholder & Animasi Stagger */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO_EASE, delay: 0.38 }}
              className="relative"
            >
              <Input
                id="email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full h-12 py-3 px-5 border border-[#e5e7eb] rounded-[50px] text-sm text-[#111827] outline-none transition-all focus-visible:border-[#2563c9] focus-visible:ring-3 focus-visible:ring-[#2563c9]/15 bg-white shadow-none"
              />
              <label
                htmlFor="email"
                className={`absolute left-5 transition-all duration-200 pointer-events-none select-none ${
                  emailFocused || email.length > 0
                    ? `-top-2.5 text-xs font-medium bg-white px-2 rounded-full ${
                        emailFocused ? "text-[#2563c9]" : "text-[#717784]"
                      }`
                    : "top-3.5 text-sm text-[#9ca3af]"
                }`}
              >
                Email Admin
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO_EASE, delay: 0.46 }}
              className="relative"
            >
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full h-12 py-3 pl-5 pr-12 border border-[#e5e7eb] rounded-[50px] text-sm text-[#111827] outline-none transition-all focus-visible:border-[#2563c9] focus-visible:ring-3 focus-visible:ring-[#2563c9]/15 bg-white shadow-none"
              />
              <label
                htmlFor="password"
                className={`absolute left-5 transition-all duration-200 pointer-events-none select-none ${
                  passwordFocused || password.length > 0
                    ? `-top-2.5 text-xs font-medium bg-white px-2 rounded-full ${
                        passwordFocused ? "text-[#2563c9]" : "text-[#717784]"
                      }`
                    : "top-3.5 text-sm text-[#9ca3af]"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#111827] transition-colors cursor-pointer p-0.5"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO_EASE, delay: 0.54 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-auto py-3 bg-[#2563c9] hover:bg-[#1d4ed8] text-white border-none rounded-[50px] text-sm font-medium cursor-pointer mt-2 transition-colors shadow-none"
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="pt-4 text-center"
            >
              <a
                href="/"
                className="text-xs text-[#6b7280] hover:text-[#2563c9] transition-colors"
              >
                ← Kembali ke Beranda
              </a>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
