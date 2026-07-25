"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { requestChecklist } from "@/app/checklist/actions";

const PDF_PATH = "/ajm-reals-pre-shoot-checklist.pdf";

export default function ChecklistForm() {
  const [form, setForm] = useState({ name: "", email: "", brokerage: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await requestChecklist(form);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141414] border border-accent/40 shadow-card-accent rounded-xl p-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
          Ready
        </p>
        <h3 className="text-xl font-heading font-semibold text-[#F5F5F5] mb-2">
          {"Here's your checklist."}
        </h3>
        <p className="text-[#888] text-sm mb-6">
          Two pages, print-ready. Keep it in your listing folder and hand it to
          sellers before every shoot.
        </p>
        <a
          href={PDF_PATH}
          download
          className="inline-block bg-accent text-white px-6 py-3.5 rounded text-sm hover:bg-accent-light transition-all"
        >
          Download the PDF
        </a>
        <p className="text-[#555] text-xs mt-5">
          Trouble downloading? Email{" "}
          <a
            href="mailto:acruz928@gmail.com"
            className="text-[#888] underline underline-offset-4 hover:text-[#F5F5F5]"
          >
            acruz928@gmail.com
          </a>{" "}
          and we&apos;ll send it over.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#222] shadow-card rounded-xl p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
        Free download
      </p>
      <h3 className="text-xl font-heading font-semibold text-[#F5F5F5] mb-2">
        Get the checklist.
      </h3>
      <p className="text-[#888] text-sm mb-7">
        Tell us where to credit it and the download unlocks right here — no
        waiting on an email.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <ChecklistField
          id="cl-name"
          label="Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          placeholder="Your name"
          required
        />
        <ChecklistField
          id="cl-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          placeholder="you@brokerage.com"
          required
        />
        <ChecklistField
          id="cl-brokerage"
          label="Brokerage"
          value={form.brokerage}
          onChange={(v) => setForm({ ...form, brokerage: v })}
          placeholder="Where you work"
          optional
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-accent text-white py-3.5 rounded text-sm hover:bg-accent-light transition-all mt-1 disabled:opacity-60"
        >
          {status === "sending" ? "One moment…" : "Send me the checklist"}
        </button>

        <p className="text-[#555] text-xs leading-relaxed">
          We&apos;ll only use this to send you the checklist and the occasional
          note about our work. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}

function ChecklistField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  optional,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]"
      >
        {label}
        {optional && (
          <span className="ml-2 normal-case text-[#555]">(optional)</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-[#0A0A0A] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors placeholder:text-[#555]"
      />
    </div>
  );
}
