import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        // Dark base
        void: "#080B10",
        surface: "#0D1117",
        panel: "#111827",
        border: "#1F2937",
        // Accent
        acid: "#00FF94",
        "acid-dim": "#00CC76",
        plasma: "#7C3AED",
        "plasma-light": "#A78BFA",
        ember: "#F59E0B",
        danger: "#EF4444",
        // Text
        "text-primary": "#F0F6FC",
        "text-secondary": "#8B949E",
        "text-muted": "#484F58",
      },
      boxShadow: {
        "acid-glow": "0 0 20px rgba(0, 255, 148, 0.15)",
        "plasma-glow": "0 0 20px rgba(124, 58, 237, 0.2)",
        "panel": "0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
