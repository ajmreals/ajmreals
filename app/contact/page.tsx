"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const packages = ["Starter", "Growth", "Partner", "Not sure"];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to a real form handler — Resend, Formspree, or a Next.js server action
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <FadeIn className="mb-12">
            <SectionHeader
              label="Contact"
              title="Let's talk."
              subtitle="Tell us about your project and we'll get back to you within 24 hours."
            />
          </FadeIn>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#141414] border border-[#222] rounded-xl p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-3">
                Message sent
              </p>
              <h3 className="text-xl font-medium text-[#F5F5F5] mb-2">
                {"We'll be in touch."}
              </h3>
              <p className="text-[#888] text-sm">
                Thanks for reaching out. Expect a reply within 24 hours.
              </p>
            </motion.div>
          ) : (
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
                  <label htmlFor="package-interest" className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
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
                  <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your listings, goals, or any questions…"
                    rows={5}
                    className="bg-[#141414] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors resize-none placeholder:text-[#555]"
                  />
                </div>
                <button
                  type="submit"
                  className="border border-[#F5F5F5] text-[#F5F5F5] py-3.5 rounded text-sm hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-all mt-2"
                >
                  Send message
                </button>
              </form>
            </FadeIn>
          )}

          <FadeIn delay={0.2} className="mt-10 pt-10 border-t border-[#222]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Email
                </p>
                <a
                  href="mailto:acruz928@gmail.com"
                  className="text-[#F5F5F5] text-sm hover:text-[#888] transition-colors"
                >
                  acruz928@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Phone
                </p>
                <a
                  href="tel:+13477887898"
                  className="text-[#F5F5F5] text-sm hover:text-[#888] transition-colors"
                >
                  347-788-7898
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/ajmreals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F5] text-sm hover:text-[#888] transition-colors"
                >
                  @ajmreals
                </a>
              </div>
              <p className="text-[#888] text-xs">We respond within 24 hours.</p>
            </div>
          </FadeIn>

          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
              Cinematic video, drone &amp; photography — built for real estate.
            </p>
          </div>
        </div>
      </div>
    </main>
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
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
        {label}
        {optional && <span className="ml-2 normal-case text-[#555]">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-[#141414] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors placeholder:text-[#555]"
      />
    </div>
  );
}
