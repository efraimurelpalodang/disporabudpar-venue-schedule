"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { CheckIcon, CloseIcon } from "./icons";

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
      // Simulate network latency matching original 700ms
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
      // Reset after closing transition
      const timer = window.setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, form]);

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      id="contactModal"
      aria-hidden={!isOpen}
    >
      <div className="modal-backdrop" onClick={onClose} data-close-modal />
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Hubungi petugas"
      >
        <div className="modal-head">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              Kontak petugas
            </div>
            <h2
              key={`modal-title-${titleKey}`}
              className="modal-title lines on"
              id="modalTitle"
              data-stagger="90"
            >
              <span className="line-clip">
                <span style={{ transitionDelay: "0ms" }}>Hubungi</span>
              </span>
              <span className="line-clip">
                <span style={{ transitionDelay: "90ms" }}>Petugas</span>
              </span>
            </h2>
          </div>
          <button
            className="icon-btn dark"
            type="button"
            onClick={onClose}
            data-close-modal
            aria-label="Tutup dialog"
          >
            <CloseIcon />
          </button>
        </div>

        {!isSuccess && (
          <form
            className="modal-form"
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
                <label className="field">
                  <span>Nama lengkap</span>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name={field.name}
                    id="fieldName"
                    placeholder="Nama Anda"
                    autoComplete="name"
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
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    name={field.name}
                    placeholder="nama@email.com"
                    autoComplete="email"
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
                <label className="field">
                  <span>Pesan</span>
                  <textarea
                    name={field.name}
                    rows={3}
                    placeholder="Tulis pertanyaan atau kebutuhan Anda…"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            />

            <button
              className="pill pill--solid"
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
          <div className="success" id="successPanel">
            <div className="success-icon">
              <CheckIcon />
            </div>
            <h3>Pesan terkirim</h3>
            <p id="successText">
              Terima kasih, {successName} — petugas kami akan segera menghubungi Anda.
            </p>
            <button
              className="pill pill--solid"
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
