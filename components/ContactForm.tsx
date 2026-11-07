"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { trackLead } from "@/lib/analytics";
import { submitLead } from "@/app/(site)/contact/actions";

const packages = [
  "Starter",
  "Growth",
  "Partner",
  "Single listing (one-off)",
  "Not sure",
  "Other business (not real estate)",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
    website: "", // honeypot — real people never see or fill this
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const res = await submitLead(form);

    setSending(false);
    if (!res.success) {
      setError(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    trackLead("contact");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141414] border border-[#222] rounded-xl p-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-3">
          Message sent
        </p>
        <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">
          {"We'll be in touch."}
        </h2>
        <p className="text-[#888] text-sm">
          Thanks for reaching out. Expect a reply within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <FadeIn delay={0.1}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Name"
            required
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Your name"
          />
          <Field
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="you@example.com"
          />
        </div>
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
          placeholder="+1 (000) 000-0000"
          optional
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="package-interest"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]"
          >
            Package interest
          </label>
          <select
            id="package-interest"
            value={form.package}
            onChange={(e) => setForm({ ...form, package: e.target.value })}
            className="bg-[#141414] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select a package
            </option>
            {packages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]"
          >
            Message
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us about your listings, goals, or any questions…"
            rows={5}
            className="bg-[#141414] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors resize-none placeholder:text-[#888]"
          />
        </div>

        {/* Honeypot: off-screen, not tabbable, hidden from screen readers.
            Bots fill every input they find. */}
        <div
          aria-hidden
          className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="text-sm text-[#E8756B] bg-[#E8756B]/10 border border-[#E8756B]/25 rounded-lg px-4 py-3"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="border border-[#F5F5F5] text-[#F5F5F5] py-3.5 rounded text-sm hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-all mt-2 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </form>
    </FadeIn>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  optional,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]"
      >
        {label}
        {optional && (
          <span className="ml-2 normal-case text-[#888]">(optional)</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-[#141414] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors placeholder:text-[#888]"
      />
    </div>
  );
}
