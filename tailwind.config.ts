import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        border: "#222222",
        "text-primary": "#F5F5F5",
        "text-muted": "#888888",
        accent: "#2A9D8F",
        "accent-light": "#3AAFA0",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.5)",
        "card-hover": "0 1px 0 0 rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.65)",
        "card-accent": "0 0 40px rgba(42,157,143,0.12), 0 1px 0 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
