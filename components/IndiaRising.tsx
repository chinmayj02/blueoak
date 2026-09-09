"use client";

/*
 * IndiaRising
 * Purpose: "India is Rising" section.
 * Data: fetched live from /api/india-vc-stats (24-hr cached, auto-updates yearly).
 * Colors: match reference — warm white bg, teal label, dark navy headline,
 *         white cards with teal/ink values.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";

// ── Design tokens (matched to reference image) ────────────────────────────────
const BG          = "#FAF8F4";   // very light warm white
const TEAL        = "#0D5C63";   // label, arcs, highlighted values
const NAVY        = "#0D1F2D";   // headline, primary text
const INK_MUTED   = "#4A5868";   // sublabels, secondary text
const INK_SUBTLE  = "#8A9AA8";   // year labels, note text
const CARD_BORDER = "rgba(13,92,99,0.15)";
const CARD_BG     = "#FFFFFF";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const INDIA: [number, number]       = [78.9, 22.5];
const DESTINATIONS: { name: string; coords: [number, number] }[] = [
  { name: "New York",  coords: [-74.0,  40.7] },
  { name: "London",    coords: [  -0.1,  51.5] },
  { name: "Singapore", coords: [ 103.8,   1.3] },
  { name: "Dubai",     coords: [  55.3,  25.2] },
  { name: "Tokyo",     coords: [ 139.7,  35.7] },
  { name: "Sydney",    coords: [ 151.2, -33.9] },
];

// ── API response shape ────────────────────────────────────────────────────────
interface VCStats {
  year:          number;
  annualUSD:     number;
  ytdUSD:        number;
  annualINR:     number;
  ytdINR:        number;
  usdInrRate:    number;
  yoyGrowth:     number;
  elapsedMonths: number;
  startups:      number;
  investors:     number;
  unicorns:      number;
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    setCount(0);
    const start = performance.now();
    const tick  = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, active, duration]);
  return count;
}

// ── Animated arc ─────────────────────────────────────────────────────────────
function AnimatedArc({
  from, to, delay, active,
}: {
  from: [number, number]; to: [number, number]; delay: number; active: boolean;
}) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setDrawn(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  const L = 700;
  return (
    <>
      <Line from={from} to={to} stroke={`rgba(13,92,99,0.12)`} strokeWidth={0.9} strokeLinecap="round" />
      <Line
        from={from} to={to}
        stroke={TEAL} strokeWidth={1.5} strokeLinecap="round"
        style={{
          strokeDasharray: L,
          strokeDashoffset: drawn ? 0 : L,
          opacity: drawn ? 0.78 : 0,
          transition: `stroke-dashoffset 1.6s ease, opacity 0.4s ease`,
          transitionDelay: `${delay}ms`,
        }}
      />
    </>
  );
}

// ── Pill icon ─────────────────────────────────────────────────────────────────
const icons = {
  startups: (
    <svg viewBox="0 0 28 28" fill="none" style={{ width: 28, height: 28 }} aria-hidden="true">
      <rect x="2"    y="14" width="6.5" height="11" rx="1.2" stroke={TEAL} strokeWidth="1.6" />
      <rect x="10.5" y="9"  width="6.5" height="16" rx="1.2" stroke={TEAL} strokeWidth="1.6" />
      <rect x="19"   y="4"  width="6.5" height="21" rx="1.2" stroke={TEAL} strokeWidth="1.6" />
    </svg>
  ),
  investors: (
    <svg viewBox="0 0 28 28" fill="none" style={{ width: 28, height: 28 }} aria-hidden="true">
      <circle cx="10" cy="9"  r="4.2" stroke={TEAL} strokeWidth="1.6" />
      <path   d="M3 23c0-3.866 3.134-7 7-7" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="19" cy="9"  r="4.2" stroke={TEAL} strokeWidth="1.6" />
      <path   d="M18 16c3.866 0 7 3.134 7 7" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  unicorns: (
    <svg viewBox="0 0 28 28" fill="none" style={{ width: 28, height: 28 }} aria-hidden="true">
      <path d="M3 9 Q7 3 13 8" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 8 Q16 4 20 7" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="17" cy="18" rx="7.5" ry="5" stroke={TEAL} strokeWidth="1.6" />
      <path d="M9.5 18 Q7 24 11 24" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24.5 18 Q27 24 23 24" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

// ── Main component ────────────────────────────────────────────────────────────
export default function IndiaRising() {
  const [visible,      setVisible]      = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [data,         setData]         = useState<VCStats | null>(null);
  const [loading,      setLoading]      = useState(true);
  const rootRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // ── Fetch live stats ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/india-vc-stats")
      .then((r) => r.json())
      .then((d: VCStats) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  // ── Scroll visibility ─────────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Count-up targets (use live data or fallback) ──────────────────────────
  const annualTarget  = data ? Math.round(data.annualUSD * 10) : 167; // tenths
  const ytdTarget     = data ? Math.round(data.ytdUSD    * 10) : 198;
  const startupTarget = data?.startups  ?? 140000;
  const investorTarget= data?.investors ?? 1300;
  const unicornTarget = data?.unicorns  ?? 116;

  const cAnnual   = useCountUp(annualTarget,   statsVisible);
  const cYtd      = useCountUp(ytdTarget,      statsVisible);
  const cStartups = useCountUp(startupTarget,  statsVisible);
  const cInvestors= useCountUp(investorTarget, statsVisible);
  const cUnicorns = useCountUp(unicornTarget,  statsVisible);

  const year     = data?.year         ?? new Date().getFullYear();
  const yoyGrowth= data?.yoyGrowth    ?? 19;
  const inrRate  = data?.usdInrRate   ?? 84.5;

  // INR display: $xB × rate × 100 = ₹ Cr
  const annualINR_Cr = Math.round((cAnnual  / 10) * inrRate * 100);
  const ytdINR_Cr    = Math.round((cYtd     / 10) * inrRate * 100);

  return (
    <div ref={rootRef} className="relative overflow-hidden" style={{ background: BG }}>

      {/* Dot grid — very faint, matches reference */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(13,92,99,0.07) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── 1. Headline ───────────────────────────────────────────────── */}
      <div
        style={{
          padding: "3rem clamp(1.25rem, 5vw, 5rem) 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* "India is Rising" label — teal, small caps */}
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: TEAL, marginBottom: "0.65rem",
        }}>
          India is Rising
        </p>

        {/* Bold navy headline */}
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
          fontWeight: 700, lineHeight: 1.1,
          letterSpacing: "-0.02em", color: NAVY,
        }}>
          Capital is moving.<br />
          Founders are building.<br />
          India is scaling.
        </h2>
      </div>

      {/* ── 2. World map ──────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative", width: "100%", marginTop: "0",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s 0.25s ease",
        }}
        aria-label="World map showing India's global capital reach"
        role="img"
      >
        <ComposableMap
          projectionConfig={{ scale: 147, center: [20, 20] }}
          viewBox="0 100 800 500"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <radialGradient id="ig" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={TEAL} stopOpacity="0.55" />
              <stop offset="100%" stopColor={TEAL} stopOpacity="0"    />
            </radialGradient>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isIndia = geo.properties.name === "India";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill:        isIndia ? TEAL : "#C8C0B2",
                        stroke:      BG,
                        strokeWidth: 0.4,
                        outline:     "none",
                      },
                      hover:   { fill: isIndia ? "#1B7A84" : "#B8B0A2", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Arcs FROM India */}
          {DESTINATIONS.map((dest, i) => (
            <AnimatedArc
              key={dest.name}
              from={INDIA} to={dest.coords}
              delay={500 + i * 160} active={visible}
            />
          ))}

          {/* Destination dots */}
          {DESTINATIONS.map((dest) => (
            <Marker key={dest.name} coordinates={dest.coords}>
              <circle r="2.5" fill={`rgba(13,92,99,0.4)`} />
            </Marker>
          ))}

          {/* India glow */}
          <Marker coordinates={INDIA}>
            <circle r="22" fill="url(#ig)" />
            <circle r="6" fill={TEAL} style={{ filter: "drop-shadow(0 0 5px rgba(13,92,99,0.9))" }} />
          </Marker>
        </ComposableMap>
      </div>

      {/* ── 3. Stats ──────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        style={{
          padding: "0.5rem clamp(1.25rem, 5vw, 5rem) 1.75rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(14px)",
          transition: "opacity 0.7s 0.45s ease, transform 0.7s 0.45s ease",
        }}
      >
        {/* Centred on desktop */}
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          {/* Section label */}
          <p style={{
            fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: NAVY, marginBottom: "0.7rem",
          }}>
            VC Funding into India
          </p>

          {/* Funding cards */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.7rem", marginBottom: "0.85rem",
          }}>
            {/* Annual card */}
            <div style={{
              background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
              borderRadius: 14, padding: "1rem 1.25rem",
            }}>
              <p style={{ fontSize: "0.65rem", color: INK_SUBTLE, marginBottom: "0.3rem", fontWeight: 500 }}>
                {year}
              </p>
              <p style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700, color: NAVY,
                letterSpacing: "-0.025em", lineHeight: 1,
              }}>
                ${loading ? "—" : (cAnnual / 10).toFixed(1)}B
              </p>
              <p style={{ fontSize: "0.58rem", color: INK_SUBTLE, marginTop: "0.3rem" }}>
                ≈ ₹{loading ? "—" : annualINR_Cr.toLocaleString("en-IN")} Cr
              </p>
            </div>

            {/* YTD card — teal highlight */}
            <div style={{
              background: CARD_BG,
              border: `1.5px solid rgba(13,92,99,0.28)`,
              borderRadius: 14, padding: "1rem 1.25rem",
            }}>
              <p style={{ fontSize: "0.65rem", color: INK_SUBTLE, marginBottom: "0.3rem", fontWeight: 500 }}>
                {year} YTD
              </p>
              <p style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700, color: TEAL,
                letterSpacing: "-0.025em", lineHeight: 1,
              }}>
                ${loading ? "—" : (cYtd / 10).toFixed(1)}B
              </p>
              <p style={{ fontSize: "0.58rem", color: INK_SUBTLE, marginTop: "0.2rem" }}>
                ≈ ₹{loading ? "—" : ytdINR_Cr.toLocaleString("en-IN")} Cr
              </p>
              <p style={{ fontSize: "0.62rem", color: TEAL, fontWeight: 700, marginTop: "0.2rem" }}>
                {loading ? "" : `+${yoyGrowth}% YoY Growth ↑`}
              </p>
            </div>
          </div>

          {/* Ecosystem pills */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem",
          }}>
            {[
              { icon: icons.startups,  num: loading ? "—" : cStartups.toLocaleString("en-IN") + "+", label: "Startups\nFunded"        },
              { icon: icons.investors, num: loading ? "—" : cInvestors.toLocaleString("en-IN") + "+", label: "Active\nInvestors"      },
              { icon: icons.unicorns,  num: loading ? "—" : String(cUnicorns),                         label: "Unicorns\nand Growing" },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: 14,
                  padding: "0.9rem 0.5rem",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "0.45rem", textAlign: "center",
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "none" : "translateY(10px)",
                  transition: `opacity 0.5s ${0.1 + i * 0.1}s ease, transform 0.5s ${0.1 + i * 0.1}s ease`,
                }}
              >
                {item.icon}
                <p style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  fontWeight: 700, color: NAVY,
                  lineHeight: 1, letterSpacing: "-0.01em",
                }}>
                  {item.num}
                </p>
                <p style={{
                  fontSize: "0.62rem", fontWeight: 600,
                  color: INK_MUTED, lineHeight: 1.35, whiteSpace: "pre-line",
                }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── 4. Founder Stories overlaid on city skyline ───────────────── */}
      <div
        style={{
          position: "relative", width: "100%",
          minHeight: "clamp(300px, 42vw, 520px)",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s 0.7s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/india-rising-city.png"
          alt="Mumbai city skyline at dusk"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center bottom",
            display: "block",
          }}
        />

        {/* Left scrim — readable text on top of city */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right,
            ${BG}F7 0%,
            ${BG}E0 35%,
            rgba(250,248,244,0.45) 60%,
            rgba(250,248,244,0) 80%)`,
        }} />
        {/* Top fade — blends into stats above */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "30%",
          background: `linear-gradient(to bottom, ${BG} 0%, rgba(250,248,244,0) 100%)`,
        }} />

        {/* Overlaid text */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "clamp(1.75rem, 5vw, 3rem) clamp(1.25rem, 5vw, 5rem)",
          maxWidth: "clamp(240px, 48%, 440px)",
        }}>
          <h3 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
            fontWeight: 700, color: NAVY,
            lineHeight: 1.15, marginBottom: "0.5rem",
          }}>
            Founder Stories
          </h3>
          <p style={{
            fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
            color: INK_MUTED, lineHeight: 1.6, marginBottom: "1.25rem",
          }}>
            Real founders. Real journeys.<br />Real impact.
          </p>
          <a
            href="/editorial"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.1)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.filter = "";
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: TEAL, color: "#F6F1E8",
              padding: "0.7rem 1.5rem", borderRadius: "9999px",
              fontSize: "0.875rem", fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(13,92,99,0.3)",
              transition: "filter 0.2s, transform 0.2s",
            }}
          >
            Read Stories
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
