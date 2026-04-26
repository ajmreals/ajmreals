"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

// TODO: Replace with real portfolio items — swap src, width, height, title, category, type
const portfolioItems = [
  {
    id: 1,
    title: "Maple Grove Residence",
    category: "Photography",
    type: "Real Estate",
    src: "https://picsum.photos/800/600?random=1",
    width: 800,
    height: 600,
    isVideo: false,
  },
  {
    id: 2,
    title: "Downtown Condo Tower",
    category: "Video",
    type: "Real Estate",
    src: "https://picsum.photos/800/450?random=2",
    width: 800,
    height: 450,
    isVideo: true,
  },
  {
    id: 3,
    title: "Coastal Estate Aerial",
    category: "Drone",
    type: "Real Estate",
    src: "https://picsum.photos/800/500?random=3",
    width: 800,
    height: 500,
    isVideo: false,
  },
  {
    id: 4,
    title: "Lakefront Build Progress",
    category: "Photography",
    type: "Construction",
    src: "https://picsum.photos/800/1000?random=4",
    width: 800,
    height: 1000,
    isVideo: false,
  },
  {
    id: 5,
    title: "Heritage Commercial Block",
    category: "Drone",
    type: "Real Estate",
    src: "https://picsum.photos/800/600?random=5",
    width: 800,
    height: 600,
    isVideo: false,
  },
  {
    id: 6,
    title: "New Subdivision Reveal",
    category: "Video",
    type: "Construction",
    src: "https://picsum.photos/800/450?random=6",
    width: 800,
    height: 450,
    isVideo: true,
  },
  {
    id: 7,
    title: "Penthouse Suite",
    category: "Photography",
    type: "Real Estate",
    src: "https://picsum.photos/800/600?random=7",
    width: 800,
    height: 600,
    isVideo: false,
  },
  {
    id: 8,
    title: "Warehouse Conversion",
    category: "Photography",
    type: "Construction",
    src: "https://picsum.photos/800/800?random=8",
    width: 800,
    height: 800,
    isVideo: false,
  },
  {
    id: 9,
    title: "Hilltop Estate",
    category: "Drone",
    type: "Real Estate",
    src: "https://picsum.photos/800/500?random=9",
    width: 800,
    height: 500,
    isVideo: false,
  },
];

type PortfolioItem = (typeof portfolioItems)[0];
const filters = ["All", "Video", "Drone", "Photography", "Real Estate", "Construction"];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filtered = portfolioItems.filter((item) => {
    if (activeFilter === "All") return true;
    return item.category === activeFilter || item.type === activeFilter;
  });

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-12">
          <SectionHeader
            label="Portfolio"
            title="Our work."
            subtitle="A selection of projects across video, drone, and photography for real estate and construction clients."
          />
        </FadeIn>

        {/* Filter tabs */}
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

        {/* Masonry grid — key on activeFilter forces re-entrance animation on filter change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {filtered.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl bg-[#141414] border border-[#222]"
                onClick={() => setLightboxItem(item)}
              >
                {/* TODO: Replace Image src with real media (hosted video thumbnails or photos) */}
                <div className="relative overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#0A0A0A]/70 border border-[#F5F5F5]/30 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5F5F5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/60 transition-all duration-300 flex items-end p-5">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mb-1">
                        {item.category} / {item.type}
                      </p>
                      <p className="text-sm font-medium text-[#F5F5F5]">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-[#0A0A0A]/95 flex items-center justify-center p-6"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute -top-10 right-0 text-[#888] hover:text-[#F5F5F5] transition-colors"
                aria-label="Close lightbox"
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

              {lightboxItem.isVideo ? (
                // TODO: Replace src with real video URL (YouTube embed, Vimeo, or hosted .mp4)
                <video
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  controls
                  autoPlay
                  className="w-full rounded-xl"
                />
              ) : (
                // TODO: Replace with real photo src
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  width={lightboxItem.width}
                  height={lightboxItem.height}
                  className="w-full rounded-xl"
                />
              )}

              <div className="mt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-1">
                  {lightboxItem.category} / {lightboxItem.type}
                </p>
                <p className="text-[#F5F5F5] font-medium">{lightboxItem.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
