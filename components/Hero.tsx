"use client";

/*
 * Hero
 * Purpose: Top-of-page hero section combining image carousel and key CTA.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { heroCards } from "@/data/heroCards";

/* ── Background wave lines ──────────────────────────────────────────────── */
function WaveTexture() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ opacity: 0.04 }}>
      <defs>
        <pattern id="waves" x="0" y="0" width="140" height="70" patternUnits="userSpaceOnUse">
          <path d="M0 35 Q35 12 70 35 Q105 58 140 35" fill="none" stroke="#0D5C63" strokeWidth="0.8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#waves)"/>
    </svg>
  );
}

/* ── Dot indicators ─────────────────────────────────────────────────────── */
function Dots({ total, active, onSelect }: { total:number; active:number; onSelect:(i:number)=>void }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Select card">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i} role="tab"
          aria-selected={i === active}
          aria-label={`Card ${i + 1}`}
          onClick={() => onSelect(i)}
          className="rounded-full transition-all duration-300"
          style={{
            width:      i === active ? 22 : 7,
            height:     7,
            background: i === active ? "#0D5C63" : "rgba(13,92,99,0.22)",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted,     setMounted]     = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef     = useRef<HTMLElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  /* Card dimensions derived from the available height */
  const [cardH, setCardH] = useState(0);
  const [cardW, setCardW] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const calc = () => {
      const section = heroRef.current;
      if (!section) return;

      // On desktop the card should be ~78% of the section height
      // On mobile use a fixed portrait ratio
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw >= 1024) {
        // Desktop: card fills ~78% of viewport height
        const h = Math.round(vh * 0.78);
        const w = Math.round(h * 0.50);   // ~2:4 portrait
        setCardH(h);
        setCardW(w);
      } else {
        // Mobile/tablet: card sized by viewport width
        const w = Math.round(Math.min(vw * 0.55, 280));
        const h = Math.round(w * 1.72);
        setCardH(h);
        setCardW(w);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  const vis = mounted;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "100svh",
        background: "linear-gradient(145deg,#F9F6F0 0%,#F3EDE3 50%,#EDE5D6 100%)",
      }}
      aria-label="Hero — BLUEOAK Ventures"
    >
      <WaveTexture />

      {/* Subtle mandala top-right */}
      <svg className="absolute top-0 right-0 w-64 h-64 pointer-events-none" viewBox="0 0 280 280" fill="none" aria-hidden="true" style={{ opacity: 0.038 }}>
        <g transform="translate(240,40)">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((d,i)=>(
            <g key={i} transform={`rotate(${d})`}>
              <path d="M0 0L0-65Q4-50 0-32Q-4-50 0-65Z" fill="#12372A"/>
              <circle cx="0" cy="-69" r="3" fill="#D89B35"/>
            </g>
          ))}
          <circle cx="0" cy="0" r="8" fill="none" stroke="#12372A" strokeWidth="0.8"/>
          <circle cx="0" cy="0" r="3.5" fill="#D89B35" opacity="0.5"/>
        </g>
      </svg>

      {/*
       * ── HERO BODY ──
       *
       * Desktop: flex-row
       *   Left  38% — text content, vertically centered, with dots at bottom
       *   Right 62% — card stage, overflows visually
       *
       * Mobile: flex-col
       *   Text block on top, cards below
       */}
      <div
        className="relative z-10 flex flex-col lg:flex-row"
        style={{ minHeight: "100svh", paddingTop: "var(--navbar-height)" }}
      >

        {/* ════ LEFT COLUMN ════ */}
        <div
          className="flex flex-col justify-center w-full lg:w-[38%] xl:w-[36%] flex-shrink-0 px-6 sm:px-10 lg:px-14 xl:px-18 pt-10 pb-8 lg:py-0"
          style={{ zIndex: 2 }}
        >
          {/* Brand label */}
          <div
            style={{
              opacity:   vis ? 1 : 0,
              transform: vis ? "none" : "translateY(16px)",
              transition: "opacity .65s ease, transform .65s ease",
            }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-oak-teal" style={{ fontFamily:"var(--font-inter)" }}>
              <span className="w-5 h-px bg-oak-teal/50"/>
              BLUEOAK Ventures
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mt-4 font-bold text-ink leading-[1.03]"
            style={{
              fontFamily:    "var(--font-playfair)",
              fontSize:      "clamp(2.6rem,4.2vw,5rem)",
              letterSpacing: "-0.03em",
              opacity:       vis ? 1 : 0,
              transform:     vis ? "none" : "translateY(20px)",
              transition:    "opacity .65s .08s ease, transform .65s .08s ease",
            }}
          >
            For those{" "}
            <em className="not-italic text-oak-teal">building</em>
            <br/>
            what&apos;s next.
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 text-[15px] leading-relaxed text-ink-muted"
            style={{
              maxWidth:  340,
              fontFamily: "var(--font-inter)",
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(16px)",
              transition: "opacity .65s .18s ease, transform .65s .18s ease",
            }}
          >
            BLUEOAK Ventures partners with ambitious Indian founders building enduring companies — for India and for the world.
          </p>

          {/* CTA */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            style={{
              opacity:    vis ? 1 : 0,
              transform:  vis ? "none" : "translateY(12px)",
              transition: "opacity .65s .28s ease, transform .65s .28s ease",
            }}
          >
            <button
              onClick={() => scrollTo("funding-score")}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-oak-teal text-ivory hover:bg-oak-forest transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"/>
            </button>
          </div>

          {/* Drag hint + dots pushed to bottom on desktop */}
          <div
            className="mt-8 lg:mt-auto lg:pb-10 flex flex-col gap-3"
            style={{
              opacity:    vis ? 1 : 0,
              transition: "opacity .65s .42s ease",
            }}
          >
            <div className="flex items-center gap-2 text-[11px] text-ink-subtle/60" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M6 2L6 12L9 10L10.5 14L12 13.5L10.5 9.5L13.5 9.5L6 2Z" stroke="#7A8A84" strokeWidth="1" fill="none" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily:"var(--font-inter)", lineHeight:1.3 }}>Drag or swipe<br/>to explore</span>
            </div>
            <Dots total={heroCards.length} active={activeIndex} onSelect={setActiveIndex}/>
          </div>
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <div
          ref={rightRef}
          className="relative flex-1 w-full lg:w-[62%] xl:w-[64%]"
          style={{
            minHeight:  cardH > 0 ? cardH + 40 : "clamp(420px,60vw,780px)",
            overflow:   "visible",
            opacity:    vis ? 1 : 0,
            transform:  vis ? "none" : "translateX(24px)",
            transition: "opacity .8s .22s ease, transform .8s .22s ease",
          }}
        >
          {cardH > 0 && cardW > 0 && (
            <HeroCarousel
              cardH={cardH}
              cardW={cardW}
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
            />
          )}
        </div>
      </div>
    </section>
  );
}
