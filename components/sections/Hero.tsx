"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* TODO: Replace with real video reel — looping, muted .mp4 hosted on CDN or similar */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/55" />

      {/* Grain texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-8"
        >
          Real estate &bull; Drone &bull; Photography
        </motion.p>

        {/* TODO: Confirm headline — options: "Content that closes." or "Every listing deserves to be seen." */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F5F5F5] leading-[1.05] mb-6"
        >
          Content that closes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#888] text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
        >
          Monthly video, drone, and photography retainers for real estate and construction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/#packages"
            className="border border-[#F5F5F5] text-[#F5F5F5] px-7 py-3.5 rounded text-sm hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-all"
          >
            View packages
          </a>
          <Link
            href="/portfolio"
            className="border border-[#444] text-[#888] px-7 py-3.5 rounded text-sm hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all"
          >
            See our work
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-[#F5F5F5]/20 to-transparent" />
      </motion.div>
    </section>
  );
}
