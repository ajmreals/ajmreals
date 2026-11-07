"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import VimeoEmbed from "@/components/VimeoEmbed";
import { work } from "@/lib/work";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Only offer filters that actually match something.
  const filters = [
    "All",
    ...Array.from(new Set(work.flatMap((w) => [w.category, w.type]))),
  ];

  const filtered = work.filter(
    (item) =>
      activeFilter === "All" ||
      item.category === activeFilter ||
      item.type === activeFilter
  );

  return (
    <main id="main-content" className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-12">
          <SectionHeader
            label="Portfolio"
            title="Our work."
            subtitle="Listing films for real estate agents, developers, and builders."
          />
        </FadeIn>

        {work.length === 0 ? (
          <div className="bg-[#141414] border border-[#222] rounded-xl p-10 text-center">
            <p className="text-[#F5F5F5] mb-1">Work coming soon.</p>
            <p className="text-[#888] text-sm">
              New projects are added here as they&apos;re delivered.
            </p>
          </div>
        ) : (
          <>
            {filters.length > 2 && (
              <FadeIn delay={0.1} className="mb-12">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2 rounded border transition-all ${
                        activeFilter === filter
                          ? "border-accent text-accent bg-accent/5"
                          : "border-[#222] text-[#888] hover:border-[#444] hover:text-[#F5F5F5]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12"
              >
                {filtered.map((item) => (
                  <figure key={item.vimeoId}>
                    <VimeoEmbed vimeoId={item.vimeoId} title={item.title} />
                    <figcaption className="mt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                        {item.category} / {item.type}
                      </p>
                      <p className="font-heading font-semibold text-[#F5F5F5] leading-tight">
                        {item.title}
                      </p>
                      {item.location && (
                        <p className="text-[#888] text-sm mt-1">
                          {item.location}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </main>
  );
}
