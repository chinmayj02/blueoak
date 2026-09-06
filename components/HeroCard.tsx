"use client";

/*
 * HeroCard
 * Purpose: Visual card used inside the hero carousel.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React from "react";
import Image from "next/image";

// ─── Card image map ───────────────────────────────────────────────────────────
const CARD_IMAGES: Record<string, { src: string; alt: string; objectPosition: string }> = {
  create: { src: "/cards/create.jpg",  alt: "Lightbulb with plant sapling",       objectPosition: "center 35%" },
  launch: { src: "/cards/launch.jpg",  alt: "Rocket launching from laptop",        objectPosition: "center 40%" },
  scale:  { src: "/cards/scale.jpg",   alt: "Globe with orbit ring and bar chart", objectPosition: "center 40%" },
  fund:   { src: "/cards/fund.jpg",    alt: "Business handshake with term sheet",  objectPosition: "center top" },
  impact: { src: "/cards/impact.jpg",  alt: "People watching sunset, wind farms",  objectPosition: "center 45%" },
};

// ─── CREATE card UI badge overlay ────────────────────────────────────────────
function CreateBadgeOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute flex flex-col items-center gap-1" style={{ left:"8%", top:"48%" }}>
        <div className="flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm shadow-sm" style={{ width:36, height:36 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C8.5 3 6 5.5 6 8.5C6 10 6.5 11.3 7.5 12.2C7.2 12.8 7 13.5 7 14.2C7 16.3 8.5 18 10.5 18.4V20H13.5V18.4C15.5 18 17 16.3 17 14.2C17 13.5 16.8 12.8 16.5 12.2C17.5 11.3 18 10 18 8.5C18 5.5 15.5 3 12 3Z" stroke="#0D5C63" strokeWidth="1.4" fill="none"/>
          </svg>
        </div>
        <span className="text-[7px] font-bold tracking-wider text-ink" style={{ fontFamily:"var(--font-inter)" }}>IDEA</span>
      </div>
      <div className="absolute flex flex-col items-center gap-1" style={{ right:"8%", top:"42%" }}>
        <div className="flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm shadow-sm" style={{ width:36, height:36 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" rx="2" stroke="#0D5C63" strokeWidth="1.4"/>
            <line x1="8" y1="8" x2="16" y2="8" stroke="#0D5C63" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="8" y1="11" x2="16" y2="11" stroke="#0D5C63" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="8" y1="14" x2="13" y2="14" stroke="#0D5C63" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-[7px] font-bold tracking-wider text-ink" style={{ fontFamily:"var(--font-inter)" }}>PLAN</span>
      </div>
      <div className="absolute" style={{ left:"10%", top:"64%" }}>
        <div className="flex items-center justify-center rounded-full bg-white/75 backdrop-blur-sm shadow-sm" style={{ width:40, height:40 }}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <path d="M16 6 A10 10 0 1 1 6 16" stroke="#0D5C63" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <path d="M13.5 5.2 L16 7 L18.5 5.2" stroke="#0D5C63" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>
      <div className="absolute flex flex-col items-center gap-1" style={{ right:"8%", top:"63%" }}>
        <div className="flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm shadow-sm" style={{ width:36, height:36 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#0D5C63" strokeWidth="1.4"/>
            <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="#0D5C63" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-[7px] font-bold tracking-wider text-ink" style={{ fontFamily:"var(--font-inter)" }}>ITERATE</span>
      </div>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 400" fill="none" preserveAspectRatio="none">
        <line x1="52" y1="212" x2="90" y2="238" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6"/>
        <line x1="168" y1="196" x2="128" y2="232" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6"/>
        <line x1="70" y1="280" x2="108" y2="280" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6"/>
        <line x1="168" y1="278" x2="138" y2="278" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6"/>
      </svg>
    </div>
  );
}

// ─── Slot transform config ────────────────────────────────────────────────────
function getSlot(pos: number) {
  const map: Record<number, {
    rotY: number; tx: number; ty: number;
    scale: number; opacity: number; brightness: number; zIndex: number;
  }> = {
    [-1]: { rotY:  30, tx: -62, ty: 0, scale: 0.88, opacity: 0.75, brightness: 0.82, zIndex:  8 },
    [ 0]: { rotY:   0, tx:   0, ty: 0, scale: 1.00, opacity: 1.00, brightness: 1.00, zIndex: 20 },
    [ 1]: { rotY: -22, tx:  44, ty: 0, scale: 0.90, opacity: 0.95, brightness: 0.88, zIndex: 15 },
    [ 2]: { rotY: -38, tx:  76, ty: 0, scale: 0.80, opacity: 0.82, brightness: 0.78, zIndex: 12 },
    [ 3]: { rotY: -50, tx: 100, ty: 0, scale: 0.72, opacity: 0.68, brightness: 0.70, zIndex:  9 },
    [ 4]: { rotY: -60, tx: 118, ty: 0, scale: 0.65, opacity: 0.52, brightness: 0.62, zIndex:  6 },
  };
  return map[Math.max(-1, Math.min(4, pos))] ?? map[4];
}

// ─── Side edge thickness strip ────────────────────────────────────────────────
//
// Rendered as an SVG that sits flush outside the card face div.
// The SVG path follows the card's border-radius at top & bottom corners,
// making the thickness blend seamlessly into the card geometry.
//
// side="left"  — flush against the LEFT edge of the card face (right-fan cards)
// side="right" — flush against the RIGHT edge (left card, pos -1)
function CardEdge({
  cardH, depth, side, rotY,
}: {
  cardH: number; depth: number; side: "left" | "right"; rotY: number;
}) {
  const r = 20; // must match card face border-radius
  // More rotation = more opacity (edge becomes more visible)
  const opacity = Math.min(0.95, Math.abs(rotY) / 30);

  // Gradient: lighter at top (light hits), darker at bottom
  const gradId = side === "left" ? "edgeLG" : "edgeRG";

  const path = side === "right"
    // RIGHT edge: starts at top-right corner of card, runs down right side
    ? `M 0 ${r} Q 0 0 ${Math.min(r, depth)} 0 L ${depth} 0 L ${depth} ${cardH} L ${Math.min(r, depth)} ${cardH} Q 0 ${cardH} 0 ${cardH - r} Z`
    // LEFT edge: starts at top-left corner, runs down left side
    : `M ${depth} ${r} Q ${depth} 0 ${Math.max(0, depth - r)} 0 L 0 0 L 0 ${cardH} L ${Math.max(0, depth - r)} ${cardH} Q ${depth} ${cardH} ${depth} ${cardH - r} Z`;

  const posStyle: React.CSSProperties = side === "right"
    ? { position: "absolute", top: 0, right: -depth, width: depth, height: cardH, zIndex: 1, pointerEvents: "none" }
    : { position: "absolute", top: 0, left: -depth,  width: depth, height: cardH, zIndex: 1, pointerEvents: "none" };

  return (
    <svg
      aria-hidden="true"
      style={{ ...posStyle, opacity, overflow: "visible" }}
      viewBox={`0 0 ${depth} ${cardH}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(245,238,226,1)" />
          <stop offset="30%"  stopColor="rgba(228,218,204,1)" />
          <stop offset="70%"  stopColor="rgba(210,200,185,1)" />
          <stop offset="100%" stopColor="rgba(190,178,162,1)" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gradId})`} />
      {/* Thin sheen line where edge meets card face */}
      {side === "right" && (
        <line x1="0.8" y1={r} x2="0.8" y2={cardH - r}
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      )}
      {side === "left" && (
        <line x1={depth - 0.8} y1={r} x2={depth - 0.8} y2={cardH - r}
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      )}
    </svg>
  );
}

// ─── Floating ground shadow ───────────────────────────────────────────────────
// Soft elliptical blur below every card — gives the whole stack a hovering feel.
function FloatShadow({ cardW, cardH, position }: {
  cardW: number; cardH: number; position: number;
}) {
  const absPos = Math.abs(position);
  // All cards get shadow, active card is most prominent
  const w       = cardW  * (1.05 - absPos * 0.05);
  const h       = Math.max(18, 44 - absPos * 5);
  const opacity = Math.max(0.06, 0.26 - absPos * 0.04);
  const blur    = Math.max(8, 18 - absPos * 2);
  // Slight lateral offset for non-front cards (shadow follows the lean)
  const offsetX = position === 0 ? 0 : position < 0 ? -cardW * 0.03 : cardW * 0.03;

  return (
    <div
      aria-hidden="true"
      style={{
        position:   "absolute",
        bottom:     -(h * 0.55),
        left:       "50%",
        width:      w,
        height:     h,
        transform:  `translateX(calc(-50% + ${offsetX}px))`,
        background: `radial-gradient(ellipse at 50% 35%,
          rgba(10,14,12,${opacity * 2.2}) 0%,
          rgba(10,14,12,${opacity}) 40%,
          transparent 72%)`,
        filter:     `blur(${blur}px)`,
        pointerEvents: "none",
        zIndex:     -2,
      }}
    />
  );
}

// ─── Props & component ────────────────────────────────────────────────────────
export interface HeroCardProps {
  id: string;
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  position: number;
  cardH: number;
  cardW: number;
  onClick: () => void;
  tabIndex?: number;
}

export default function HeroCard({
  id, number, title, description,
  isActive, position, cardH, cardW,
  onClick, tabIndex = 0,
}: HeroCardProps) {
  const img  = CARD_IMAGES[id];
  const slot = getSlot(position);
  if (Math.abs(position) > 4) return null;

  const txPx = (slot.tx / 100) * cardW;
  const tyPx = (slot.ty / 100) * cardH;

  // Which edge is visible?
  // pos  0: rotY=0, face-on → no edge
  // pos -1: rotY=+30 → right face visible → show RIGHT edge
  // pos +1..+4: rotY<0 → left face visible → show LEFT edge
  const showRightEdge = position === -1;
  const showLeftEdge  = position > 0 && slot.rotY < 0;
  // Depth proportional to rotation: 22°→~8px, 38°→~14px, 60°→~22px
  const edgeDepth = Math.round(Math.min(22, Math.abs(slot.rotY) * 0.38));

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      aria-label={`${title} — ${description}`}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      className="absolute cursor-pointer select-none"
      style={{
        width:           cardW,
        height:          cardH,
        top:             0,
        left:            "50%",
        marginLeft:      -cardW / 2,
        transformOrigin: "top center",
        transform:       `translateX(${txPx}px) translateY(${tyPx}px) rotateY(${slot.rotY}deg) scale(${slot.scale})`,
        zIndex:          slot.zIndex,
        opacity:         slot.opacity,
        filter:          `brightness(${slot.brightness})`,
        transition:      "all 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange:      "transform, opacity",
        overflow:        "visible",  // MUST be visible so edge strips render outside
      }}
    >
      {/* ── Ground floating shadow (every card) ── */}
      <FloatShadow cardW={cardW} cardH={cardH} position={position} />

      {/* ── LEFT edge strip — right-fan cards (pos +1..+4) ── */}
      {showLeftEdge && edgeDepth > 0 && (
        <CardEdge cardH={cardH} depth={edgeDepth} side="left" rotY={slot.rotY} />
      )}

      {/* ── RIGHT edge strip — left card (pos -1) ── */}
      {showRightEdge && edgeDepth > 0 && (
        <CardEdge cardH={cardH} depth={edgeDepth} side="right" rotY={slot.rotY} />
      )}

      {/* ── Card face (overflow:hidden clips photo to rounded corners) ── */}
      <div
        style={{
          position:     "absolute",
          inset:        0,
          borderRadius: 20,
          overflow:     "hidden",
          border:       "1.5px solid rgba(255,255,255,0.78)",
          boxShadow:    isActive
            ? "0 20px 60px rgba(13,18,16,0.18), 0 6px 18px rgba(13,18,16,0.10), inset 0 1px 0 rgba(255,255,255,0.9)"
            : "0 8px 28px rgba(13,18,16,0.12), 0 2px 6px rgba(13,18,16,0.07), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        {/* Photo */}
        <Image
          src={img.src} alt={img.alt} fill
          className="object-cover"
          style={{ objectPosition: img.objectPosition }}
          sizes="(max-width: 768px) 60vw, 28vw"
          priority={isActive}
          loading={isActive ? "eager" : "lazy"}
        />

        {/* Top scrim for text legibility */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "50%",
            background: "linear-gradient(to bottom,rgba(252,249,244,0.90) 0%,rgba(252,249,244,0.62) 45%,rgba(252,249,244,0) 100%)",
          }}
        />

        {/* Text */}
        <div className="absolute inset-x-0 top-0 z-10 px-4 pt-4">
          <span className="block font-bold tracking-[0.22em] text-oak-teal"
            style={{ fontFamily:"var(--font-inter)", fontSize:"clamp(8px,1vw,11px)" }}>
            {number}
          </span>
          <h3 className="mt-0.5 font-bold text-oak-dark leading-tight"
            style={{ fontFamily:"var(--font-playfair)", fontSize:"clamp(0.95rem,1.8vw,1.45rem)", letterSpacing:"-0.02em" }}>
            {title}
          </h3>
          <p className="mt-1 text-ink leading-snug"
            style={{ fontFamily:"var(--font-inter)", fontSize:"clamp(0.58rem,0.85vw,0.72rem)", opacity:0.75 }}>
            {description}
          </p>
        </div>

        {id === "create" && <CreateBadgeOverlay />}

        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 z-20"
            style={{ height:3, background:"linear-gradient(90deg,#0D5C63,#1B7A84,#0D5C63)" }}/>
        )}
        {isActive && (
          <div className="absolute inset-0 z-20 pointer-events-none"
            style={{ borderRadius:20, boxShadow:"inset 0 0 0 1.5px rgba(13,92,99,0.20), inset 0 1px 0 rgba(255,255,255,0.80)" }}/>
        )}
      </div>
    </div>
  );
}
