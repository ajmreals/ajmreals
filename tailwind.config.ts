import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        charcoal: {
          DEFAULT: "#1C1C1C",
          mid: "#2A2A2A",
          light: "#3A3A3A",
        },
        green: {
          DEFAULT: "#2D5A3D",
          bright: "#3A7A52",
          muted: "#1E3D2A",
          sage: "#6DBF8A",
        },
        sand: {
          DEFAULT: "#BDB5A0",
        },
        accent: "#6DBF8A",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
