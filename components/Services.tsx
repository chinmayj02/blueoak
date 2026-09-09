"use client";

/*
 * Services — "Our Solutions"
 * Design: S-curve journey layout with 4 steps alternating left/right,
 *         connected by a dashed SVG path. Matches Our_solutions.png reference.
 */

import React, { useEffect, useRef, useState } from "react";

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    title:  "Acquire Customers",
    desc:   "Find and win the right customers for your business.",
    icon: (
      // People / customer acquisition icon
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }} aria-hidden="true">
        <circle cx="24" cy="20" r="9" fill="#0D5C63" opacity="0.9" />
        <ellipse cx="24" cy="42" rx="14" ry="9" fill="#0D5C63" opacity="0.75" />
        <circle cx="42" cy="24" r="7" fill="#1B7A84" opacity="0.85" />
        <ellipse cx="42" cy="43" rx="10" ry="7" fill="#1B7A84" opacity="0.65" />
        {/* + badge */}
        <circle cx="50" cy="42" r="8" fill="#D89B35" />
        <path d="M50 38v8M46 42h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title:  "Accelerate Growth",
    desc:   "Scale faster with strategy, partnerships and market access.",
    icon: (
      // Bar chart + arrow icon
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }} aria-hidden="true">
        <rect x="8"  y="38" width="10" height="16" rx="2" fill="#0D5C63" opacity="0.7" />
        <rect x="22" y="28" width="10" height="26" rx="2" fill="#0D5C63" opacity="0.85" />
        <rect x="36" y="18" width="10" height="36" rx="2" fill="#0D5C63" />
        {/* upward arrow */}
        <path d="M14 24 Q28 8 50 12" stroke="#D89B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M44 8 L50 12 L46 18" stroke="#D89B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    number: "03",
    title:  "Prepare for Funding",
    desc:   "Get investment ready with the right strategy, positioning and materials.",
    icon: (
      // Document + checkmark icon
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }} aria-hidden="true">
        <rect x="14" y="8" width="32" height="40" rx="4" fill="#0D5C63" opacity="0.12" stroke="#0D5C63" strokeWidth="1.5" />
        <path d="M22 20h16M22 28h16M22 36h10" stroke="#0D5C63" strokeWidth="2" strokeLinecap="round" />
        {/* checkmark badge */}
        <circle cx="44" cy="46" r="10" fill="#0D5C63" />
        <path d="M39 46 L42.5 50 L49 42" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title:  "Secure Capital",
    desc:   "Connect with the right investors and close funding opportunities.",
    icon: (
      // Coin stack + rupee icon
      <svg viewBox="0 0 64 64" fill="none" style={{ width: 52, height: 52 }} aria-hidden="true">
        {/* stacked discs */}
        <ellipse cx="32" cy="50" rx="18" ry="6"  fill="#0D5C63" opacity="0.3" />
        <ellipse cx="32" cy="44" rx="18" ry="6"  fill="#0D5C63" opacity="0.55" />
        <ellipse cx="32" cy="38" rx="18" ry="6"  fill="#0D5C63" opacity="0.8" />
        <rect x="14" y="32" width="36" height="6" fill="#0D5C63" opacity="0.8" />
        <ellipse cx="32" cy="32" rx="18" ry="6"  fill="#1B7A84" />
        {/* ₹ coin */}
        <circle cx="46" cy="20" r="13" fill="#D89B35" />
        <text x="46" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">₹</text>
      </svg>
    ),
  },
];

// ── Step card ─────────────────────────────────────────────────────────────────
function StepCard({
  step,
  index,
  visible,
}: {
  step: typeof STEPS[0];
  index: number;
  visible: boolean;
}) {
  // Odd index (0, 2) → left; Even index (1, 3) → right
  const isLeft = index % 2 === 0;

  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "row",
        alignItems:     "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        gap:            0,
        opacity:        visible ? 1 : 0,
        transform:      visible ? "none" : `translateY(28px)`,
        transition:     `opacity 0.65s ${index * 0.15}s ease, transform 0.65s ${index * 0.15}s ease`,
        position:       "relative",
        zIndex:         2,
      }}
    >
      {/* Card */}
      <div
        style={{
          background:   "white",
          borderRadius: 20,
          padding:      "clamp(1.25rem, 3vw, 2rem)",
          boxShadow:    "0 4px 32px rgba(13,18,16,0.07), 0 1px 6px rgba(13,18,16,0.04)",
          border:       "1px solid rgba(220,206,184,0.5)",
          width:        "clamp(220px, 52%, 380px)",
          order:        isLeft ? 1 : 2,
          flexShrink:   0,
        }}
      >
        {/* Number + dash */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
          <span style={{
            fontFamily:    "var(--font-playfair)",
            fontSize:      "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight:    700,
            color:         "#D89B35",
            letterSpacing: "-0.01em",
          }}>
            {step.number}
          </span>
          <span style={{ display: "block", width: 24, height: 1.5, background: "#D89B35", borderRadius: 2 }} />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    "var(--font-playfair)",
          fontSize:      "clamp(1.2rem, 2.5vw, 1.65rem)",
          fontWeight:    700,
          color:         "#0D1F2D",
          lineHeight:    1.15,
          letterSpacing: "-0.015em",
          marginBottom:  "0.6rem",
        }}>
          {step.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize:   "clamp(0.82rem, 1.4vw, 0.95rem)",
          color:      "#4A5868",
          lineHeight: 1.6,
        }}>
          {step.desc}
        </p>
      </div>

      {/* Icon circle — opposite side of card */}
      <div
        style={{
          order:      isLeft ? 2 : 1,
          flexShrink: 0,
          /*
           * Negative margin pulls the icon into the gap between card and path,
           * overlapping slightly for the "floating disc" look from the reference.
           */
          marginLeft:  isLeft  ? "clamp(-2.5rem, -5vw, -3rem)" : "0",
          marginRight: !isLeft ? "clamp(-2.5rem, -5vw, -3rem)" : "0",
          position:    "relative",
          zIndex:      3,
        }}
      >
        {/* Outer shadow disc */}
        <div style={{
          width:        "clamp(90px, 14vw, 130px)",
          height:       "clamp(90px, 14vw, 130px)",
          borderRadius: "50%",
          background:   "linear-gradient(145deg, #f0f8fa 0%, #e0eff3 100%)",
          boxShadow:    "0 8px 28px rgba(13,92,99,0.18), 0 2px 8px rgba(13,92,99,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          border:       "1.5px solid rgba(13,92,99,0.10)",
        }}>
          {step.icon}
        </div>

        {/* Small dot accent — matches reference */}
        <div style={{
          position:     "absolute",
          top:          4,
          right:        isLeft ? -8 : "auto",
          left:         !isLeft ? -8 : "auto",
          width:        10,
          height:       10,
          borderRadius: "50%",
          background:   "#0D5C63",
          boxShadow:    "0 0 0 3px rgba(13,92,99,0.15)",
        }} />
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Services() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#F8F5EF" }}
      aria-label="Our Solutions"
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(13,92,99,0.06) 1px, transparent 1px)",
          backgroundSize:  "26px 26px",
        }}
      />

      <div className="container-site relative" style={{ paddingTop: "4.5rem", paddingBottom: "5rem" }}>

        {/* ── Header row ──────────────────────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "flex-start",
            justifyContent: "space-between",
            gap:            "2rem",
            marginBottom:   "clamp(3rem, 6vw, 5rem)",
            opacity:        visible ? 1 : 0,
            transform:      visible ? "none" : "translateY(16px)",
            transition:     "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Left: label + headline + subtitle */}
          <div style={{ maxWidth: 580 }}>
            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <p style={{
                fontSize:      "0.65rem",
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "#0D5C63",
              }}>
                Our Solutions
              </p>
              {/* Underline bar */}
              <div style={{ flex: 1, maxWidth: 48, height: 2, background: "#0D5C63", borderRadius: 2 }} />
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily:    "var(--font-playfair)",
              fontSize:      "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
              color:         "#0D1F2D",
              marginBottom:  "0.9rem",
            }}>
              Your Growth<br />Journey. Our Expertise.
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize:   "clamp(0.9rem, 1.5vw, 1.05rem)",
              color:      "#4A5868",
              lineHeight: 1.6,
            }}>
              End-to-end business development<br />services for bold founders.
            </p>
          </div>

          {/* Right: vertical keyword pill */}
          <div
            style={{
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "flex-start",
              gap:            "0.35rem",
              paddingLeft:    "1.5rem",
              borderLeft:     "1.5px solid rgba(13,92,99,0.18)",
              flexShrink:     0,
            }}
            aria-hidden="true"
          >
            {["STRATEGY", "CONNECTIONS", "CAPITAL", "IMPACT"].map((kw) => (
              <span key={kw} style={{
                fontSize:      "0.62rem",
                fontWeight:    700,
                letterSpacing: "0.16em",
                color:         "#7A8A98",
              }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* ── S-curve steps ────────────────────────────────────────────── */}
        <div style={{ position: "relative" }}>

          {/* Dashed S-curve SVG path — decorative, absolutely positioned behind steps */}
          <svg
            viewBox="0 0 800 900"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position:      "absolute",
              top:           0,
              left:          0,
              width:         "100%",
              height:        "100%",
              pointerEvents: "none",
              zIndex:        1,
            }}
          >
            <path
              d="M 500 80 C 650 80, 700 220, 550 280 C 400 340, 200 400, 280 520 C 360 640, 650 660, 520 780 C 440 850, 300 870, 280 900"
              fill="none"
              stroke="rgba(13,92,99,0.20)"
              strokeWidth="3"
              strokeDasharray="10 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Step cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 5vw, 3.5rem)" }}>
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
