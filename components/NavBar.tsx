"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Packages", href: "/#packages" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#222]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-sans font-medium text-[#F5F5F5] text-lg tracking-tight"
          >
            AJM Reals
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/portfolio"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              Work
            </Link>
            <a
              href="/#packages"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              Packages
            </a>
            <Link
              href="/contact"
              className="text-sm border border-[#F5F5F5] text-[#F5F5F5] px-4 py-1.5 rounded hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-[#F5F5F5]" />
            <span className="block w-6 h-px bg-[#F5F5F5]" />
            <span className="block w-4 h-px bg-[#F5F5F5]" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#222]">
              <span className="font-sans font-medium text-[#F5F5F5] text-lg">AJM Reals</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#888] hover:text-[#F5F5F5] transition-colors"
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-6 mt-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-3xl font-medium text-[#F5F5F5] py-4 border-b border-[#222] hover:text-[#888] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
