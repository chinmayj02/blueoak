import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        oak: {
          black: "#0D1210",
          dark: "#101512",
          forest: "#12372A",
          "forest-mid": "#1A4D38",
          teal: "#0D5C63",
          "teal-light": "#1B7A84",
        },
        ivory: {
          DEFAULT: "#F6F1E8",
          warm: "#EDE5D4",
          sand: "#DCCEB8",
          muted: "#C8B99A",
        },
        terracotta: {
          DEFAULT: "#B65E3C",
          light: "#C97355",
          dark: "#8F4A2E",
        },
        gold: {
          DEFAULT: "#D89B35",
          light: "#E8B555",
          dark: "#A87520",
          pale: "#F0D090",
        },
        // Utility
        ink: "#1C2420",
        "ink-muted": "#4A5550",
        "ink-subtle": "#7A8A84",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "7rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "card": "20px",
        "card-sm": "14px",
        "xl2": "1.25rem",
      },
      boxShadow: {
        "card": "0 8px 40px rgba(13, 18, 16, 0.10), 0 2px 8px rgba(13, 18, 16, 0.06)",
        "card-hover": "0 20px 60px rgba(13, 18, 16, 0.18), 0 4px 16px rgba(13, 18, 16, 0.10)",
        "card-active": "0 30px 80px rgba(13, 18, 16, 0.22), 0 8px 24px rgba(13, 18, 16, 0.14)",
        "nav": "0 2px 20px rgba(13, 18, 16, 0.08)",
        "glow-teal": "0 0 40px rgba(13, 92, 99, 0.25)",
        "glow-gold": "0 0 30px rgba(216, 155, 53, 0.20)",
      },
      backgroundImage: {
        "grain": "url('/grain.svg')",
        "hero-gradient": "radial-gradient(ellipse at 60% 50%, rgba(246,241,232,1) 0%, rgba(237,229,212,0.9) 60%, rgba(220,206,184,0.7) 100%)",
        "forest-gradient": "linear-gradient(135deg, #0D1210 0%, #12372A 50%, #1A4D38 100%)",
        "gold-gradient": "linear-gradient(135deg, #D89B35 0%, #E8B555 50%, #A87520 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-up-delay": "fadeUp 0.6s 0.2s ease-out forwards",
        "score-ring": "scoreRing 1.5s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "drift": "drift 20s ease-in-out infinite",
        "grain": "grain 0.2s steps(1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scoreRing: {
          "0%": { "stroke-dashoffset": "340" },
          "100%": { "stroke-dashoffset": "var(--dash-offset)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -15px) rotate(5deg)" },
          "50%": { transform: "translate(20px, 5px) rotate(-3deg)" },
          "75%": { transform: "translate(-10px, 10px) rotate(8deg)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -2%)" },
          "20%": { transform: "translate(2%, 2%)" },
          "30%": { transform: "translate(-1%, 1%)" },
          "40%": { transform: "translate(1%, -1%)" },
          "50%": { transform: "translate(-2%, 1%)" },
          "60%": { transform: "translate(2%, -2%)" },
          "70%": { transform: "translate(-1%, -1%)" },
          "80%": { transform: "translate(1%, 2%)" },
          "90%": { transform: "translate(-2%, 2%)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [typography()],
};
export default config;
