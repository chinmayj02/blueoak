"use client";

/*
 * BharatProject
 * Purpose: Showcase the Bharat-focused projects with animated background.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";

// Animated background: layered SVG elements that float/drift
function BharatBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-oak-dark via-oak-forest to-[#1A4D38]" />

      {/* Animated grain layer */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          animation: "grain 0.3s steps(1) infinite",
        }}
      />

      {/* Geometric Indian-inspired SVG layer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
        fill="none"
      >
        {/* Large mandala top-right */}
        <g transform="translate(1050, 100)" opacity="0.8">
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
            <g key={i} transform={`rotate(${deg})`}>
              <path d="M0 0 L0 -120 Q8 -90 0 -55 Q-8 -90 0 -120 Z" fill="#D89B35" />
              <path d="M0 0 L0 -140 Q4 -125 0 -110 Q-4 -125 0 -140 Z" fill="#F6F1E8" opacity="0.6" />
            </g>
          ))}
          <circle cx="0" cy="0" r="20" fill="none" stroke="#D89B35" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="8" fill="#D89B35" opacity="0.6" />
        </g>

        {/* Lotus bottom-left */}
        <g transform="translate(120, 500)" opacity="0.6">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
            <g key={i} transform={`rotate(${deg})`}>
              <ellipse cx="0" cy="-45" rx="14" ry="28" fill="#F6F1E8" />
            </g>
          ))}
          <circle cx="0" cy="0" r="12" fill="#D89B35" opacity="0.5" />
        </g>

        {/* Grid lines */}
        <defs>
          <pattern id="bharatGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F6F1E8" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bharatGrid)" />

        {/* Diagonal accent lines */}
        <line x1="0" y1="600" x2="400" y2="0" stroke="#D89B35" strokeWidth="0.5" opacity="0.3" />
        <line x1="200" y1="600" x2="600" y2="0" stroke="#D89B35" strokeWidth="0.5" opacity="0.2" />
        <line x1="800" y1="600" x2="1200" y2="0" stroke="#F6F1E8" strokeWidth="0.3" opacity="0.2" />
      </svg>

      {/* Floating light blobs — parallax feel */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "400px",
          height: "400px",
          top: "-100px",
          right: "-50px",
          background: "radial-gradient(circle, rgba(216,155,53,0.15) 0%, transparent 70%)",
          animation: "floatLeaf 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "300px",
          height: "300px",
          bottom: "-50px",
          left: "10%",
          background: "radial-gradient(circle, rgba(27,122,132,0.2) 0%, transparent 70%)",
          animation: "floatLeaf 15s ease-in-out infinite reverse",
          animationDelay: "3s",
        }}
      />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-oak-dark/80 via-oak-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-oak-dark/60 via-transparent to-transparent" />
    </div>
  );
}

// Stat item for Bharat Project
function BharatStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-left">
      <div
        className="text-3xl sm:text-4xl font-bold text-gold"
        style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-ivory/60 uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
}

export default function BharatProject() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleCTA = () => {
    const el = document.getElementById("editorial");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="bharat-project"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="The Bharat Project — India in motion"
    >
      <BharatBackground />

      <div className="relative z-10 container-site py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-gold/60" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold/80">
              Flagship Initiative
            </span>
          </div>

          {/* Main title */}
          <h2
            className="font-bold text-ivory leading-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            The{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #D89B35 0%, #F0C060 50%, #D89B35 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bharat
            </span>
            <br />
            Project
          </h2>

          {/* Tagline */}
          <p className="mt-3 text-lg text-gold/70 font-medium tracking-wide" style={{ fontFamily: "var(--font-playfair)" }}>
            India in motion — tradition meeting technology.
          </p>

          {/* Description */}
          <p className="mt-6 text-base leading-relaxed text-ivory/75 max-w-lg">
            The Bharat Project is our commitment to India&apos;s builders. A platform for stories,
            data, and ideas at the intersection of Indian heritage, entrepreneurship, and
            technological ambition. Because India is not just a market — it is a source.
          </p>

          {/* Stats — illustrative */}
          <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-8 border-t border-ivory/10 pt-8">
            <BharatStat value="1.4B+" label="People. One market." />
            <BharatStat value="₹7T+" label="Startup ecosystem (illustrative)" />
            <BharatStat value="100+" label="Emerging cities" />
          </div>

          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={handleCTA}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #D89B35 0%, #E8B555 100%)",
                color: "#0D1210",
                boxShadow: "0 4px 20px rgba(216,155,53,0.35)",
              }}
              aria-label="Explore The Bharat Project"
            >
              Explore The Bharat Project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Right side — decorative India outline */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center justify-center pointer-events-none"
        style={{ width: "42%" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 400"
          fill="none"
          className="h-full max-h-[480px] w-auto opacity-[0.12]"
          style={{ filter: "drop-shadow(0 0 30px rgba(216,155,53,0.3))" }}
        >
          {/* Simplified India map outline */}
          <path
            d="M150 10 C160 12 175 15 188 25 C200 35 205 48 210 60
               C215 72 218 82 215 92 C212 102 205 108 210 118
               C215 128 225 132 228 142 C231 152 228 162 225 170
               C222 178 215 182 212 192 C209 202 212 212 208 222
               C204 232 195 238 190 248 C185 258 185 270 180 280
               C175 290 168 298 162 308 C156 318 152 328 148 340
               C144 352 142 362 140 368 C138 374 138 380 136 384
               C134 388 130 392 128 392 C126 392 122 388 118 382
               C114 376 112 368 110 360 C108 352 108 342 105 332
               C102 322 96 314 92 304 C88 294 85 282 80 272
               C75 262 68 254 64 244 C60 234 58 222 55 212
               C52 202 48 192 48 180 C48 168 52 158 55 148
               C58 138 62 128 68 120 C74 112 82 108 86 98
               C90 88 88 76 92 66 C96 56 105 50 115 40
               C125 30 138 8 150 10 Z"
            stroke="#D89B35"
            strokeWidth="1.5"
            fill="rgba(216,155,53,0.05)"
          />
          {/* Major city dots */}
          {[
            { cx: 118, cy: 220 }, // Bangalore
            { cx: 105, cy: 172 }, // Mumbai
            { cx: 138, cy: 95 },  // Delhi
            { cx: 130, cy: 200 }, // Hyderabad
          ].map((d, i) => (
            <g key={i}>
              <circle cx={d.cx} cy={d.cy} r="4" fill="#D89B35" opacity="0.7" />
              <circle cx={d.cx} cy={d.cy} r="8" fill="none" stroke="#D89B35" strokeWidth="0.8" opacity="0.3" />
            </g>
          ))}
          {/* Connection lines between cities */}
          <path d="M118 220 L105 172 L138 95 L130 200 L118 220" stroke="#D89B35" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.25" fill="none" />
        </svg>
      </div>
    </section>
  );
}
