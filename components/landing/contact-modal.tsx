"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { CheckIcon, CloseIcon } from "./icons";
import { cn } from "cn";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [titleKey, setTitleKey] = React.useState(0);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successName, setSuccessName] = React.useState("there");
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);

  const mutation = useMutation({
    mutationFn: async (payload: { name: string; email: string; message: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return payload;
    },
    onSuccess: (data) => {
      const firstName = data.name.trim().split(/\s+/)[0] || "there";
      setSuccessName(firstName);
      setIsSuccess(true);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  // When modal opens, replay title animation and focus first field
  React.useEffect(() => {
    if (isOpen) {
      setTitleKey((k) => k + 1);
      const timer = window.setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus({ preventScroll: true });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      const timer = window.setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, form]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-90 flex items-end sm:items-center justify-center p-3 sm:p-6 text-[#0a0a0a] transition-all duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      )}
      id="contactModal"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-[#0f2f63]/40 backdrop-blur-md transition-opacity duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        data-close-modal
      />
      <div
        className={cn(
          "relative w-full sm:max-w-lg max-h-[92svh] overflow-y-auto rounded-[2rem] bg-white p-6 sm:p-8 shadow-[0_2rem_4rem_rgba(15,47,99,0.3)] transition-all duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-7 scale-95"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Hubungi petugas"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[#717784]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563c9] shrink-0" />
              Kontak petugas
            </div>
            <h2
              key={`modal-title-${titleKey}`}
              className="text-4xl sm:text-5xl font-medium leading-[0.95] tracking-[-0.02em] mt-3"
              id="modalTitle"
            >
              <span className="block overflow-hidden pb-[0.14em]">
                <motion.span
                  className="block"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={isOpen ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                >
                  Hubungi
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.14em]">
                <motion.span
                  className="block"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={isOpen ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
                >
                  Petugas
                </motion.span>
              </span>
            </h2>
          </div>
          <button
            className="w-10 h-10 rounded-full grid place-items-center bg-[#f4f4f4] hover:bg-[#e6e8ec] transition-colors shrink-0 group cursor-pointer"
            type="button"
            onClick={onClose}
            data-close-modal
            aria-label="Tutup dialog"
          >
            <span className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90 text-[#0a0a0a]">
              <CloseIcon />
            </span>
          </button>
        </div>

        {!isSuccess && (
          <form
            className="mt-7 flex flex-col gap-4"
            id="contactForm"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="name"
              children={(field) => (
                <label className="block">
                  <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#717784] mb-2">
                    Nama lengkap
                  </span>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name={field.name}
                    id="fieldName"
                    placeholder="Nama Anda"
                    autoComplete="name"
                    className="w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm transition-all focus:outline-hidden focus:border-[#5790e6] focus:ring-2 focus:ring-[#5790e6]/25"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <label className="block">
                  <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#717784] mb-2">
                    Email
                  </span>
                  <input
                    type="email"
                    name={field.name}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm transition-all focus:outline-hidden focus:border-[#5790e6] focus:ring-2 focus:ring-[#5790e6]/25"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            />

            <form.Field
              name="message"
              children={(field) => (
                <label className="block">
                  <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#717784] mb-2">
                    Pesan
                  </span>
                  <textarea
                    name={field.name}
                    rows={3}
                    placeholder="Tulis pertanyaan atau kebutuhan Anda…"
                    className="w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm transition-all focus:outline-hidden focus:border-[#5790e6] focus:ring-2 focus:ring-[#5790e6]/25 resize-y"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            />

            <button
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-wider bg-[#0a0a0a] text-white hover:bg-[#0f2f63] transition-all cursor-pointer disabled:opacity-60 disabled:pointer-events-none mt-1"
              type="submit"
              id="submitBtn"
              disabled={mutation.isPending}
            >
              <span id="submitLabel">
                {mutation.isPending ? "Mengirim…" : "Kirim pesan"}
              </span>
            </button>
          </form>
        )}

        {isSuccess && (
          <div className="mt-8 rounded-3xl bg-[#f4f4f4] p-6 text-center" id="successPanel">
            <div className="w-12 h-12 rounded-full bg-[#2563c9] grid place-items-center mx-auto text-white">
              <CheckIcon />
            </div>
            <h3 className="text-lg font-medium mt-4 text-[#0a0a0a]">Pesan terkirim</h3>
            <p className="text-sm text-[#717784] mt-2 leading-relaxed" id="successText">
              Terima kasih, {successName} — petugas kami akan segera menghubungi Anda.
            </p>
            <button
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-wider bg-[#0a0a0a] text-white hover:bg-[#0f2f63] transition-all cursor-pointer"
              type="button"
              onClick={onClose}
              data-close-modal
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
