"use client";

import React from "react";

/**
 * High-fidelity card illustrations matching the reference image exactly.
 * Each illustration is a self-contained SVG with the same warm cream/ivory
 * background, same objects, same editorial CGI-render aesthetic.
 */

// ─── CARD 1: CREATE ──────────────────────────────────────────────────────────
// Glowing lightbulb with plant sapling inside, on marble pedestal, green bokeh
export function CreateIllustration() {
  return (
    <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        {/* Warm ivory background */}
        <linearGradient id="c-bg" x1="0" y1="0" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8F4ED" />
          <stop offset="100%" stopColor="#EDE5D4" />
        </linearGradient>
        {/* Glass bulb gradient — transparent, slightly warm */}
        <radialGradient id="c-glass" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
          <stop offset="45%" stopColor="rgba(248,244,234,0.75)" />
          <stop offset="100%" stopColor="rgba(230,220,200,0.55)" />
        </radialGradient>
        {/* Inner glow */}
        <radialGradient id="c-glow" cx="50%" cy="58%" r="45%">
          <stop offset="0%" stopColor="#FFF5C8" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FFE580" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
        </radialGradient>
        {/* Pedestal gradient */}
        <linearGradient id="c-ped" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D8D0C4" />
          <stop offset="40%" stopColor="#EDE8DF" />
          <stop offset="100%" stopColor="#C8C0B4" />
        </linearGradient>
        {/* Soil */}
        <radialGradient id="c-soil" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#6B4C2A" />
          <stop offset="100%" stopColor="#3E2810" />
        </radialGradient>
        {/* Bokeh greens */}
        <radialGradient id="c-bokeh1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5A9A48" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3D7A30" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="c-bokeh2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8BC47A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#5A9A48" stopOpacity="0" />
        </radialGradient>
        <filter id="c-blur1"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="c-blur2"><feGaussianBlur stdDeviation="12" /></filter>
        <filter id="c-bulb-shadow">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#8B7355" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="300" height="360" fill="url(#c-bg)" />

      {/* Background bokeh circles — out-of-focus leaves */}
      <circle cx="30" cy="100" r="55" fill="url(#c-bokeh1)" filter="url(#c-blur2)" />
      <circle cx="270" cy="80" r="45" fill="url(#c-bokeh2)" filter="url(#c-blur2)" />
      <circle cx="50" cy="250" r="60" fill="url(#c-bokeh1)" filter="url(#c-blur2)" />
      <circle cx="260" cy="220" r="50" fill="url(#c-bokeh2)" filter="url(#c-blur2)" />
      <circle cx="150" cy="20" r="40" fill="url(#c-bokeh2)" filter="url(#c-blur2)" />

      {/* Soft ground shadow */}
      <ellipse cx="150" cy="320" rx="65" ry="12" fill="#B8A890" opacity="0.3" filter="url(#c-blur1)" />

      {/* Marble pedestal */}
      <g transform="translate(150, 290)">
        {/* Base disc */}
        <ellipse cx="0" cy="6" rx="50" ry="12" fill="#C8C0B4" opacity="0.5" />
        {/* Cylinder body */}
        <rect x="-38" y="-18" width="76" height="28" rx="4" fill="url(#c-ped)" />
        {/* Top highlight */}
        <ellipse cx="0" cy="-18" rx="38" ry="8" fill="#F0ECE4" />
        <ellipse cx="-8" cy="-20" rx="20" ry="4" fill="white" opacity="0.5" />
        {/* Marble veining */}
        <path d="M-30 -10 Q-10 -14 10 -8 Q25 -4 35 -10" stroke="white" strokeWidth="0.8" opacity="0.4" fill="none" />
        <path d="M-25 -4 Q0 -8 20 -2" stroke="white" strokeWidth="0.5" opacity="0.3" fill="none" />
      </g>

      {/* Bulb screw base (threaded metal cap) */}
      <g transform="translate(150, 270)" filter="url(#c-bulb-shadow)">
        <rect x="-16" y="0" width="32" height="24" rx="3" fill="#C8C4BC" />
        {/* Threads */}
        {[4,9,14,19].map(y => (
          <rect key={y} x="-16" y={y} width="32" height="2.5" rx="1" fill="#B0ACA4" opacity="0.7" />
        ))}
        <rect x="-14" y="0" width="28" height="3" rx="1.5" fill="#D8D4CC" />
      </g>

      {/* === LIGHTBULB GLASS === */}
      <g transform="translate(150, 148)">
        {/* Main glow bloom */}
        <ellipse cx="0" cy="20" rx="55" ry="55" fill="url(#c-glow)" filter="url(#c-blur1)" />

        {/* Glass bulb body — pear shape */}
        <path
          d="M0 -115 C45 -115 78 -82 78 -42 C78 -10 62 18 40 38 C28 48 22 58 20 72 L-20 72 C-22 58 -28 48 -40 38 C-62 18 -78 -10 -78 -42 C-78 -82 -45 -115 0 -115 Z"
          fill="url(#c-glass)"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1.5"
        />

        {/* Glass highlight — top left specular */}
        <path
          d="M-30 -105 Q-10 -115 10 -110 Q-5 -95 -25 -88 Z"
          fill="white"
          opacity="0.55"
        />
        <path
          d="M-55 -75 Q-65 -55 -68 -35 Q-60 -52 -48 -68 Z"
          fill="white"
          opacity="0.3"
        />

        {/* Inner warm glow core */}
        <ellipse cx="0" cy="15" rx="30" ry="35" fill="#FFF0A0" opacity="0.45" />

        {/* SOIL at base of bulb */}
        <ellipse cx="0" cy="62" rx="16" ry="6" fill="url(#c-soil)" />
        <ellipse cx="0" cy="60" rx="16" ry="5" fill="#5A3818" />

        {/* Plant stem */}
        <path d="M0 60 Q1 30 0 0" stroke="#2D6B1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Leaf 1 — left */}
        <path d="M0 25 Q-22 18 -28 5 Q-18 3 -8 12 Q-4 18 0 22 Z" fill="#4CAF50" />
        <path d="M0 25 Q-22 18 -28 5" stroke="#3A8C3A" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* Leaf 2 — right */}
        <path d="M0 18 Q22 8 30 -5 Q20 -8 10 2 Q4 8 0 15 Z" fill="#5DC455" />
        <path d="M0 18 Q22 8 30 -5" stroke="#3A8C3A" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* Leaf 3 — top center, largest */}
        <path d="M0 5 Q-8 -18 -4 -38 Q4 -38 8 -18 Q4 -5 0 2 Z" fill="#6DD460" />
        <path d="M0 5 L0 -38" stroke="#3A8C3A" strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* Filament glow threads */}
        <path d="M-12 35 Q-6 28 0 32 Q6 28 12 35" stroke="#FFD700" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M-8 40 Q0 34 8 40" stroke="#FFE566" strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* Bulb base connector */}
        <rect x="-16" y="68" width="32" height="6" rx="2" fill="#D8D0C0" />
      </g>

      {/* Small floating concept badges */}
      {/* IDEA badge — top left */}
      <g transform="translate(42, 130)">
        <rect x="0" y="0" width="48" height="28" rx="8" fill="white" opacity="0.92" />
        <rect x="0" y="0" width="48" height="28" rx="8" fill="none" stroke="#E0D8C8" strokeWidth="1" />
        {/* Brain icon simplified */}
        <circle cx="13" cy="14" r="7" fill="none" stroke="#0D5C63" strokeWidth="1.3" />
        <path d="M10 11 Q13 8 16 11" stroke="#0D5C63" strokeWidth="1" fill="none" />
        <text x="24" y="17" fontSize="7.5" fill="#1C3A30" fontFamily="Inter,sans-serif" fontWeight="600">IDEA</text>
      </g>
      {/* Dashed line from badge to bulb */}
      <line x1="90" y1="144" x2="112" y2="160" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* PLAN badge — top right */}
      <g transform="translate(208, 118)">
        <rect x="0" y="0" width="50" height="28" rx="8" fill="white" opacity="0.92" />
        <rect x="0" y="0" width="50" height="28" rx="8" fill="none" stroke="#E0D8C8" strokeWidth="1" />
        <rect x="8" y="7" width="10" height="14" rx="2" fill="none" stroke="#0D5C63" strokeWidth="1.2" />
        <line x1="10" y1="11" x2="16" y2="11" stroke="#0D5C63" strokeWidth="0.8" />
        <line x1="10" y1="14" x2="16" y2="14" stroke="#0D5C63" strokeWidth="0.8" />
        <text x="24" y="17" fontSize="7.5" fill="#1C3A30" fontFamily="Inter,sans-serif" fontWeight="600">PLAN</text>
      </g>
      <line x1="208" y1="132" x2="188" y2="152" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* ITERATE badge — bottom left */}
      <g transform="translate(36, 238)">
        <rect x="0" y="0" width="56" height="28" rx="8" fill="white" opacity="0.92" />
        <rect x="0" y="0" width="56" height="28" rx="8" fill="none" stroke="#E0D8C8" strokeWidth="1" />
        <path d="M9 18 Q9 8 14 8 Q19 8 19 14 Q19 20 14 20" stroke="#0D5C63" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M12 18 L9 21 L6 18" stroke="#0D5C63" strokeWidth="1" fill="none" />
        <text x="25" y="17" fontSize="7.5" fill="#1C3A30" fontFamily="Inter,sans-serif" fontWeight="600">ITERATE</text>
      </g>
      <line x1="92" y1="252" x2="112" y2="248" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* BUILD badge — bottom right */}
      <g transform="translate(212, 232)">
        <rect x="0" y="0" width="52" height="28" rx="8" fill="white" opacity="0.92" />
        <rect x="0" y="0" width="52" height="28" rx="8" fill="none" stroke="#E0D8C8" strokeWidth="1" />
        <path d="M8 18 L8 10 L12 8 L16 10 L16 18 Z" stroke="#0D5C63" strokeWidth="1.2" fill="none" />
        <text x="23" y="17" fontSize="7.5" fill="#1C3A30" fontFamily="Inter,sans-serif" fontWeight="600">BUILD</text>
      </g>
      <line x1="212" y1="246" x2="192" y2="252" stroke="#C8B99A" strokeWidth="0.8" strokeDasharray="3 3" />
    </svg>
  );
}

// ─── CARD 2: LAUNCH ──────────────────────────────────────────────────────────
// Open laptop, rocket blasting from screen, white clouds, bright sky
export function LaunchIllustration() {
  return (
    <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="l-bg" x1="0" y1="0" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8EEF4" />
          <stop offset="40%" stopColor="#F0EDE6" />
          <stop offset="100%" stopColor="#EDE5D4" />
        </linearGradient>
        <linearGradient id="l-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8DFF0" />
          <stop offset="60%" stopColor="#E8F2F8" />
          <stop offset="100%" stopColor="#F4F0E8" />
        </linearGradient>
        <radialGradient id="l-screen" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2A3E48" />
          <stop offset="100%" stopColor="#1A2830" />
        </radialGradient>
        <linearGradient id="l-laptop-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8D4CC" />
          <stop offset="50%" stopColor="#E8E4DC" />
          <stop offset="100%" stopColor="#C4C0B8" />
        </linearGradient>
        <radialGradient id="l-exhaust" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#FF6B20" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#FF9944" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFD080" stopOpacity="0" />
        </radialGradient>
        <filter id="l-cloud-blur"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="l-glow"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="l-shadow"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8B7355" floodOpacity="0.2" /></filter>
      </defs>

      {/* Background */}
      <rect width="300" height="360" fill="url(#l-bg)" />
      {/* Sky area behind clouds */}
      <rect x="0" y="0" width="300" height="200" fill="url(#l-sky)" opacity="0.7" />

      {/* === CLOUDS === */}
      {/* Cloud cluster behind rocket — main large */}
      <g opacity="0.95">
        <ellipse cx="150" cy="95" rx="70" ry="32" fill="white" />
        <ellipse cx="118" cy="90" rx="42" ry="28" fill="white" />
        <ellipse cx="182" cy="88" rx="45" ry="26" fill="white" />
        <ellipse cx="150" cy="78" rx="50" ry="22" fill="white" />
        <ellipse cx="130" cy="72" rx="30" ry="18" fill="white" />
        <ellipse cx="168" cy="70" rx="32" ry="18" fill="white" />
        <ellipse cx="150" cy="62" rx="28" ry="16" fill="white" />
      </g>
      {/* Cloud left smaller */}
      <g opacity="0.85">
        <ellipse cx="48" cy="140" rx="38" ry="18" fill="white" />
        <ellipse cx="35" cy="135" rx="24" ry="16" fill="white" />
        <ellipse cx="62" cy="132" rx="26" ry="14" fill="white" />
      </g>
      {/* Cloud right */}
      <g opacity="0.8">
        <ellipse cx="255" cy="125" rx="42" ry="20" fill="white" />
        <ellipse cx="238" cy="120" rx="28" ry="17" fill="white" />
        <ellipse cx="272" cy="118" rx="30" ry="16" fill="white" />
      </g>

      {/* Ground shadow */}
      <ellipse cx="150" cy="335" rx="80" ry="10" fill="#A89878" opacity="0.2" filter="url(#l-cloud-blur)" />

      {/* === LAPTOP === */}
      <g transform="translate(150, 255)" filter="url(#l-shadow)">
        {/* Screen back panel */}
        <rect x="-88" y="-90" width="176" height="112" rx="8" fill="#C8C4BC" />
        <rect x="-85" y="-87" width="170" height="106" rx="6" fill="url(#l-screen)" />

        {/* Screen bezel */}
        <rect x="-82" y="-84" width="164" height="100" rx="4" fill="#1E2E38" />

        {/* Screen content — dark with text */}
        <rect x="-78" y="-80" width="156" height="92" rx="3" fill="#1A2830" />
        {/* Decorative screen code lines */}
        <line x1="-60" y1="-68" x2="20" y2="-68" stroke="#3A5A68" strokeWidth="2" />
        <line x1="-60" y1="-60" x2="30" y2="-60" stroke="#2E4858" strokeWidth="1.5" />
        <line x1="-60" y1="-52" x2="10" y2="-52" stroke="#3A5A68" strokeWidth="1.5" />
        {/* "Ideas Create Change" text */}
        <text x="-55" y="-35" fontSize="8" fill="#F6F1E8" fontFamily="Georgia,serif" fontWeight="700" opacity="0.9">Ideas</text>
        <text x="-55" y="-24" fontSize="8" fill="#D89B35" fontFamily="Georgia,serif" fontWeight="700">Create</text>
        <text x="-55" y="-13" fontSize="8" fill="#D89B35" fontFamily="Georgia,serif" fontWeight="700">Change</text>

        {/* Laptop hinge */}
        <rect x="-88" y="20" width="176" height="5" rx="2" fill="#B8B4AC" />

        {/* Keyboard base */}
        <path d="M-95 22 Q-100 22 -102 28 L-95 60 Q-92 68 -85 68 L85 68 Q92 68 95 60 L102 28 Q100 22 95 22 Z" fill="url(#l-laptop-body)" />
        {/* Keyboard surface */}
        <rect x="-82" y="28" width="164" height="32" rx="3" fill="#C0BCB4" />
        {/* Key rows */}
        {[-12, -2, 8].map((y, ri) => (
          Array.from({length: 10}, (_, i) => (
            <rect key={`${ri}-${i}`} x={-75 + i * 16} y={32 + ri * 10} width="13" height="7" rx="1.5" fill="#D8D4CC" opacity="0.8" />
          ))
        ))}
        {/* Trackpad */}
        <rect x="-25" y="50" width="50" height="14" rx="3" fill="#B8B4AC" />
      </g>

      {/* === ROCKET === */}
      <g transform="translate(150, 82) rotate(-5)">
        {/* Exhaust glow bloom */}
        <ellipse cx="0" cy="80" rx="18" ry="35" fill="url(#l-exhaust)" filter="url(#l-glow)" />
        <ellipse cx="0" cy="70" rx="10" ry="22" fill="#FF8030" opacity="0.8" />

        {/* Smoke trail */}
        <ellipse cx="-5" cy="95" rx="12" ry="18" fill="#E8E4DC" opacity="0.6" filter="url(#l-cloud-blur)" />
        <ellipse cx="5" cy="110" rx="14" ry="16" fill="#F0EDE6" opacity="0.5" filter="url(#l-cloud-blur)" />
        <ellipse cx="-3" cy="125" rx="16" ry="14" fill="#F4F0E8" opacity="0.4" filter="url(#l-cloud-blur)" />

        {/* Rocket body */}
        <path d="M0 -72 C12 -60 18 -30 18 0 L18 52 L-18 52 L-18 0 C-18 -30 -12 -60 0 -72 Z"
          fill="#F8F4F0" stroke="#E0D8CC" strokeWidth="1" />
        {/* Body shading */}
        <path d="M0 -72 C8 -60 12 -30 12 0 L12 52 L18 52 L18 0 C18 -30 12 -60 0 -72 Z"
          fill="#EDE8E0" opacity="0.5" />

        {/* Nose cone */}
        <path d="M0 -95 C6 -82 12 -70 18 -52 L-18 -52 C-12 -70 -6 -82 0 -95 Z"
          fill="#E8E0D4" stroke="#D8D0C4" strokeWidth="1" />
        <path d="M0 -95 C4 -82 8 -70 12 -52 L18 -52 C12 -70 6 -82 0 -95 Z"
          fill="rgba(255,255,255,0.3)" />

        {/* Window porthole */}
        <circle cx="0" cy="-12" r="10" fill="#1A3A48" stroke="#D8D0C4" strokeWidth="1.5" />
        <circle cx="0" cy="-12" r="8" fill="#0D5C63" />
        <circle cx="-3" cy="-15" r="2.5" fill="rgba(255,255,255,0.5)" />

        {/* Fins */}
        <path d="M-18 30 L-32 58 L-18 52 Z" fill="#DCCEB8" stroke="#C8B99A" strokeWidth="0.8" />
        <path d="M18 30 L32 58 L18 52 Z" fill="#DCCEB8" stroke="#C8B99A" strokeWidth="0.8" />

        {/* Detail lines on body */}
        <line x1="-18" y1="-10" x2="18" y2="-10" stroke="#D8D0C4" strokeWidth="0.8" />
        <line x1="-18" y1="15" x2="18" y2="15" stroke="#D8D0C4" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

// ─── CARD 3: SCALE ───────────────────────────────────────────────────────────
// Earth globe on pedestal, golden orbit ring, rising bar chart
export function ScaleIllustration() {
  return (
    <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="s-bg" x1="0" y1="0" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4F0E8" />
          <stop offset="100%" stopColor="#EAE2D0" />
        </linearGradient>
        <radialGradient id="s-globe" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#4AADA8" />
          <stop offset="30%" stopColor="#1B8080" />
          <stop offset="65%" stopColor="#0D5C63" />
          <stop offset="100%" stopColor="#083844" />
        </radialGradient>
        <radialGradient id="s-globe-shine" cx="25%" cy="22%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="s-ped" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8C4BC" />
          <stop offset="45%" stopColor="#E8E4DC" />
          <stop offset="100%" stopColor="#B8B4AC" />
        </linearGradient>
        <linearGradient id="s-orbit" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D89B35" stopOpacity="0.1" />
          <stop offset="30%" stopColor="#E8B555" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#F0C840" stopOpacity="1" />
          <stop offset="80%" stopColor="#D89B35" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D89B35" stopOpacity="0.1" />
        </linearGradient>
        <filter id="s-glow"><feGaussianBlur stdDeviation="4" /></filter>
        <filter id="s-shadow"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#6B5A40" floodOpacity="0.22" /></filter>
        <filter id="s-blur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <rect width="300" height="360" fill="url(#s-bg)" />

      {/* Ambient glow behind globe */}
      <ellipse cx="150" cy="158" rx="90" ry="90" fill="#1B8080" opacity="0.07" filter="url(#s-blur)" />

      {/* Ground shadow */}
      <ellipse cx="150" cy="330" rx="90" ry="12" fill="#A89878" opacity="0.2" filter="url(#s-blur)" />

      {/* === PEDESTAL === */}
      <g transform="translate(150, 288)">
        <ellipse cx="0" cy="8" rx="52" ry="12" fill="#B8B4AC" opacity="0.4" />
        <rect x="-40" y="-22" width="80" height="32" rx="5" fill="url(#s-ped)" />
        <ellipse cx="0" cy="-22" rx="40" ry="9" fill="#F0EDE8" />
        <ellipse cx="-8" cy="-24" rx="22" ry="4.5" fill="white" opacity="0.45" />
        <path d="M-32 -14 Q-10 -18 12 -12 Q28 -8 38 -14" stroke="white" strokeWidth="0.7" opacity="0.35" fill="none" />
      </g>

      {/* === GLOBE === */}
      <g transform="translate(150, 170)" filter="url(#s-shadow)">
        {/* Ocean base */}
        <circle cx="0" cy="0" r="88" fill="url(#s-globe)" />

        {/* Latitude/longitude lines */}
        <ellipse cx="0" cy="0" rx="88" ry="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
        <ellipse cx="0" cy="-30" rx="82" ry="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        <ellipse cx="0" cy="30" rx="82" ry="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        <line x1="0" y1="-88" x2="0" y2="88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        <path d="M0 -88 Q40 -44 0 88" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none" />
        <path d="M0 -88 Q-40 -44 0 88" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none" />

        {/* Landmasses — stylized continents */}
        {/* Europe/Asia */}
        <path d="M10 -52 Q30 -55 52 -40 Q68 -28 72 -10 Q68 5 55 10 Q40 15 28 8 Q14 0 8 -15 Q4 -35 10 -52 Z"
          fill="#1A4D38" opacity="0.85" />
        {/* Africa */}
        <path d="M20 15 Q35 10 45 20 Q52 35 48 55 Q42 68 30 65 Q18 60 14 45 Q10 30 20 15 Z"
          fill="#1A4D38" opacity="0.8" />
        {/* Americas */}
        <path d="M-55 -35 Q-42 -42 -32 -30 Q-25 -18 -28 5 Q-32 22 -42 28 Q-55 30 -62 15 Q-68 0 -62 -18 Q-60 -30 -55 -35 Z"
          fill="#12372A" opacity="0.8" />
        {/* Australia */}
        <path d="M48 38 Q60 35 66 45 Q68 55 62 60 Q54 62 48 55 Q44 48 48 38 Z"
          fill="#12372A" opacity="0.75" />
        {/* India */}
        <path d="M42 8 Q50 5 54 15 Q54 28 48 34 Q42 30 38 20 Q38 12 42 8 Z"
          fill="#1A4D38" opacity="0.7" />

        {/* Globe highlight / atmosphere */}
        <circle cx="0" cy="0" r="88" fill="url(#s-globe-shine)" />
        <circle cx="0" cy="0" r="88" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </g>

      {/* === ORBIT RING === */}
      {/* Behind globe portion */}
      <ellipse cx="150" cy="150" rx="112" ry="32"
        fill="none" stroke="#D89B35" strokeWidth="2.5" opacity="0.25"
        transform="rotate(-22 150 150)" strokeDasharray="180 190" strokeDashoffset="0" />
      {/* In front of globe — bright */}
      <ellipse cx="150" cy="170" rx="112" ry="32"
        fill="none" stroke="url(#s-orbit)" strokeWidth="3"
        transform="rotate(-22 150 170)" strokeDasharray="200 170" strokeDashoffset="0"
        strokeLinecap="round" />
      {/* Orbit glow */}
      <ellipse cx="150" cy="170" rx="112" ry="32"
        fill="none" stroke="#E8B555" strokeWidth="6" opacity="0.15"
        transform="rotate(-22 150 170)" strokeDasharray="200 170"
        filter="url(#s-glow)" />
      {/* Gold ball on orbit */}
      <circle cx="246" cy="148" r="9" fill="#D89B35" />
      <circle cx="246" cy="148" r="7" fill="#E8B555" />
      <circle cx="243" cy="145" r="2.5" fill="white" opacity="0.5" />

      {/* === BAR CHART === */}
      <g transform="translate(48, 308)">
        {/* Base line */}
        <line x1="0" y1="0" x2="204" y2="0" stroke="#C8B99A" strokeWidth="1" opacity="0.6" />
        {/* Bars — ascending */}
        {[
          { h: 22, c: "#C8B99A" },
          { h: 34, c: "#B8A888" },
          { h: 48, c: "#A89878" },
          { h: 62, c: "#0D5C63" },
          { h: 76, c: "#0A4A50" },
          { h: 90, c: "#D89B35" },
        ].map((b, i) => (
          <g key={i} transform={`translate(${i * 34}, 0)`}>
            <rect x="4" y={-b.h} width="26" height={b.h} rx="4" fill={b.c} opacity="0.9" />
            {/* Top highlight */}
            <rect x="4" y={-b.h} width="26" height="4" rx="2" fill="white" opacity="0.2" />
            {/* Side shadow */}
            <rect x="26" y={-b.h + 4} width="4" height={b.h - 4} rx="0" fill="black" opacity="0.1" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// ─── CARD 4: FUND ────────────────────────────────────────────────────────────
// Business handshake, gold coins stack, term sheet with pen
export function FundIllustration() {
  return (
    <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="f-bg" x1="0" y1="0" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0EDE6" />
          <stop offset="100%" stopColor="#E8E0D0" />
        </linearGradient>
        {/* City skyline gradient bg — blurred bokeh */}
        <linearGradient id="f-city-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8D8E8" />
          <stop offset="60%" stopColor="#E0CCA0" />
          <stop offset="100%" stopColor="#D4B870" />
        </linearGradient>
        {/* Coin gold */}
        <radialGradient id="f-coin-top" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#F8E080" />
          <stop offset="50%" stopColor="#D89B35" />
          <stop offset="100%" stopColor="#A87020" />
        </radialGradient>
        {/* Table wood */}
        <linearGradient id="f-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A870" />
          <stop offset="100%" stopColor="#A07840" />
        </linearGradient>
        {/* Skin tone */}
        <linearGradient id="f-skin1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A070" />
          <stop offset="100%" stopColor="#C08858" />
        </linearGradient>
        <linearGradient id="f-skin2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B87848" />
          <stop offset="100%" stopColor="#C88858" />
        </linearGradient>
        <filter id="f-blur-bg"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="f-blur-sm"><feGaussianBlur stdDeviation="4" /></filter>
        <filter id="f-shadow"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#6B4A20" floodOpacity="0.2" /></filter>
      </defs>

      <rect width="300" height="360" fill="url(#f-bg)" />

      {/* Blurred city skyline background */}
      <rect x="0" y="0" width="300" height="230" fill="url(#f-city-bg)" opacity="0.55" />
      {/* City buildings silhouette — very blurred */}
      <g filter="url(#f-blur-bg)" opacity="0.35">
        {[
          [20, 180, 30, 80], [55, 160, 25, 100], [82, 170, 20, 90], [105, 145, 28, 115],
          [136, 130, 22, 130], [162, 155, 25, 105], [190, 140, 30, 120], [222, 158, 22, 102],
          [248, 148, 26, 112], [276, 168, 28, 92],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#4A6080" />
        ))}
        {/* Golden light glow low horizon */}
        <ellipse cx="220" cy="220" rx="120" ry="50" fill="#E8B040" opacity="0.7" />
      </g>

      {/* Table surface */}
      <path d="M0 238 Q150 228 300 238 L300 360 L0 360 Z" fill="url(#f-table)" />
      <path d="M0 238 Q150 228 300 238 L300 245 Q150 235 0 245 Z" fill="#A88040" opacity="0.5" />
      {/* Wood grain */}
      <path d="M0 260 Q100 255 300 265" stroke="#B88A4A" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M0 280 Q150 275 300 285" stroke="#B88A4A" strokeWidth="0.6" opacity="0.2" fill="none" />

      {/* === HANDSHAKE === */}
      <g transform="translate(150, 130)">
        {/* Left arm — suit sleeve dark */}
        <path d="M-120 -15 Q-80 -30 -40 -10 L-20 5 Q-50 -8 -90 0 Z"
          fill="#2A3038" />
        <path d="M-120 -15 Q-80 -28 -40 -8 L-40 -4 Q-80 -24 -120 -10 Z"
          fill="#3A4048" />
        {/* Left shirt cuff */}
        <rect x="-42" y="-14" width="22" height="22" rx="3" fill="#F8F4EC" />

        {/* Right arm — suit sleeve */}
        <path d="M120 -15 Q80 -30 40 -10 L20 5 Q50 -8 90 0 Z"
          fill="#1A2028" />
        <path d="M120 -15 Q80 -28 40 -8 L40 -4 Q80 -24 120 -10 Z"
          fill="#2A3038" />
        {/* Right shirt cuff */}
        <rect x="20" y="-14" width="22" height="22" rx="3" fill="#F0EBE3" />

        {/* Left hand */}
        <path d="M-22 -4 Q-8 -18 8 -12 Q18 -6 20 4 Q16 14 4 16 Q-10 16 -20 8 Z"
          fill="url(#f-skin1)" />
        {/* Fingers left */}
        <path d="M-8 -16 Q-4 -26 2 -24 Q6 -22 4 -14" stroke="#C89060" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M2 -18 Q6 -28 12 -26 Q15 -23 12 -15" stroke="#C89060" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M10 -14 Q14 -24 19 -22 Q22 -19 19 -12" stroke="#C09058" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Right hand */}
        <path d="M22 -4 Q8 -18 -8 -12 Q-18 -6 -20 4 Q-16 14 -4 16 Q10 16 20 8 Z"
          fill="url(#f-skin2)" />
        {/* Fingers right */}
        <path d="M8 -16 Q4 -26 -2 -24 Q-6 -22 -4 -14" stroke="#B07848" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M-2 -18 Q-6 -28 -12 -26 Q-15 -23 -12 -15" stroke="#B07848" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M-10 -14 Q-14 -24 -19 -22 Q-22 -19 -19 -12" stroke="#B07848" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Knuckle highlights */}
        <path d="M-4 -8 Q0 -12 4 -8" stroke="rgba(255,220,180,0.5)" strokeWidth="1.5" fill="none" />
      </g>

      {/* === GOLD COINS STACK === */}
      <g transform="translate(70, 265)" filter="url(#f-shadow)">
        {[0,1,2,3,4,5].map(i => (
          <g key={i} transform={`translate(0, ${-i * 11})`}>
            <ellipse cx="0" cy="0" rx="28" ry="9" fill={i === 5 ? "#A87020" : "#906018"} />
            <rect x="-28" y="-11" width="56" height="11" fill={i % 2 === 0 ? "#C89030" : "#B88020"} />
            <ellipse cx="0" cy="-11" rx="28" ry="9" fill="url(#f-coin-top)" />
            {/* Coin rim detail */}
            <ellipse cx="0" cy="-11" rx="28" ry="9" fill="none" stroke="#E8C040" strokeWidth="0.6" />
            {/* Shine */}
            <ellipse cx="-8" cy="-14" rx="10" ry="3.5" fill="rgba(255,248,160,0.4)" />
          </g>
        ))}
      </g>

      {/* === TERM SHEET === */}
      <g transform="translate(155, 252)" filter="url(#f-shadow)">
        {/* Paper shadow */}
        <rect x="4" y="4" width="122" height="92" rx="3" fill="#A89878" opacity="0.2" filter="url(#f-blur-sm)" />
        {/* Paper */}
        <rect x="0" y="0" width="122" height="92" rx="3" fill="#FEFCF8" />
        <rect x="0" y="0" width="122" height="92" rx="3" fill="none" stroke="#E8E0D0" strokeWidth="1" />
        {/* Folded corner */}
        <path d="M106 0 L122 16 L106 16 Z" fill="#EDE5D4" />
        <path d="M106 0 L122 16" stroke="#D8D0C0" strokeWidth="0.8" />

        {/* TERM SHEET title */}
        <text x="61" y="22" textAnchor="middle" fontSize="9.5" fill="#1C2420" fontFamily="Georgia,serif" fontWeight="700">TERM SHEET</text>
        <line x1="10" y1="28" x2="112" y2="28" stroke="#D8D0C0" strokeWidth="0.8" />

        {/* Content lines */}
        {[36, 44, 52, 60, 68, 76].map((y, i) => (
          <line key={i} x1="10" y1={y} x2={i % 3 === 2 ? 80 : 112} y2={y} stroke="#D0C8B8" strokeWidth={i === 0 ? 1 : 0.7} />
        ))}

        {/* Pen */}
        <g transform="translate(20, 84) rotate(-28)">
          <rect x="-3" y="-38" width="6" height="38" rx="2" fill="#1C2420" />
          <rect x="-3" y="-38" width="6" height="6" rx="2" fill="#D89B35" />
          <polygon points="-3,0 3,0 0,10" fill="#D4C090" />
          <rect x="-2" y="-32" width="4" height="1" fill="#D89B35" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

// ─── CARD 5: IMPACT ──────────────────────────────────────────────────────────
// Golden sunset, wind turbines, river, 4 people silhouetted on hilltop
export function ImpactIllustration() {
  return (
    <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="i-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BA8D8" />
          <stop offset="25%" stopColor="#88C4E0" />
          <stop offset="55%" stopColor="#F0C860" />
          <stop offset="75%" stopColor="#F09040" />
          <stop offset="100%" stopColor="#E06828" />
        </linearGradient>
        <radialGradient id="i-sun" cx="62%" cy="52%" r="25%">
          <stop offset="0%" stopColor="#FFF8C0" />
          <stop offset="30%" stopColor="#FFD840" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#FF9820" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF7010" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="i-hills1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A7A28" />
          <stop offset="100%" stopColor="#2A5A18" />
        </linearGradient>
        <linearGradient id="i-hills2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A8A32" />
          <stop offset="100%" stopColor="#2E6018" />
        </linearGradient>
        <linearGradient id="i-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0C050" />
          <stop offset="100%" stopColor="#C09030" />
        </linearGradient>
        <filter id="i-blur-sm"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="i-blur-sun"><feGaussianBlur stdDeviation="18" /></filter>
        <filter id="i-blur-cloud"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      {/* Sky */}
      <rect width="300" height="360" fill="url(#i-sky)" />

      {/* Sun glow bloom */}
      <ellipse cx="186" cy="185" rx="80" ry="70" fill="url(#i-sun)" filter="url(#i-blur-sun)" />
      <ellipse cx="186" cy="185" rx="28" ry="28" fill="#FFF8A0" opacity="0.9" />
      <ellipse cx="186" cy="185" rx="18" ry="18" fill="#FFFDE0" />

      {/* Clouds — soft orange-tinted */}
      <g opacity="0.7">
        <ellipse cx="60" cy="90" rx="50" ry="22" fill="#F8E0A0" filter="url(#i-blur-cloud)" />
        <ellipse cx="45" cy="84" rx="32" ry="18" fill="#F8D890" filter="url(#i-blur-cloud)" />
        <ellipse cx="78" cy="82" rx="34" ry="16" fill="#FAE4A8" filter="url(#i-blur-cloud)" />
      </g>
      <g opacity="0.6">
        <ellipse cx="240" cy="70" rx="45" ry="18" fill="#F0D488" filter="url(#i-blur-cloud)" />
        <ellipse cx="260" cy="65" rx="30" ry="14" fill="#F0D880" filter="url(#i-blur-cloud)" />
      </g>

      {/* Far hills — distant, lighter */}
      <path d="M0 220 Q80 180 160 200 Q220 215 300 190 L300 360 L0 360 Z" fill="#3D6E28" opacity="0.5" />

      {/* Mid hills — main terrain */}
      <path d="M0 245 Q60 215 130 230 Q190 240 260 215 Q280 208 300 218 L300 360 L0 360 Z" fill="url(#i-hills1)" />
      <path d="M0 260 Q50 240 110 252 Q170 262 240 245 Q268 238 300 248 L300 360 L0 360 Z" fill="url(#i-hills2)" />

      {/* River — winding golden reflection */}
      <path d="M90 360 Q100 320 115 300 Q128 285 138 265 Q148 248 155 235 Q162 222 175 215"
        stroke="url(#i-river)" strokeWidth="14" fill="none" opacity="0.75" strokeLinecap="round" />
      <path d="M90 360 Q100 320 115 300 Q128 285 138 265 Q148 248 155 235 Q162 222 175 215"
        stroke="#FFD860" strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" />

      {/* Foreground hill — darkest */}
      <path d="M0 290 Q40 270 90 280 Q150 292 200 275 Q250 260 300 272 L300 360 L0 360 Z" fill="#1E4A0E" />

      {/* === WIND TURBINES === */}
      {/* Turbine 1 — left, farther */}
      <g transform="translate(72, 220)" opacity="0.88">
        <line x1="0" y1="0" x2="0" y2="52" stroke="#E8E4DC" strokeWidth="2.5" />
        {/* Blades */}
        <g transform="rotate(20)">
          <path d="M0 0 Q3 -28 1 -40 Q-1 -28 0 0 Z" fill="#EDE8E0" />
        </g>
        <g transform="rotate(140)">
          <path d="M0 0 Q3 -28 1 -40 Q-1 -28 0 0 Z" fill="#E0DCD4" />
        </g>
        <g transform="rotate(260)">
          <path d="M0 0 Q3 -28 1 -40 Q-1 -28 0 0 Z" fill="#E8E4DC" />
        </g>
        <circle cx="0" cy="0" r="3.5" fill="#D0CCC4" />
        <circle cx="0" cy="0" r="2" fill="#C0BCB4" />
      </g>

      {/* Turbine 2 — center, closest and tallest */}
      <g transform="translate(152, 195)">
        <line x1="0" y1="0" x2="0" y2="72" stroke="#F0EDE8" strokeWidth="3.5" />
        <g transform="rotate(-15)">
          <path d="M0 0 Q4 -38 2 -56 Q-2 -38 0 0 Z" fill="#F0EDE8" />
        </g>
        <g transform="rotate(105)">
          <path d="M0 0 Q4 -38 2 -56 Q-2 -38 0 0 Z" fill="#E4E0D8" />
        </g>
        <g transform="rotate(225)">
          <path d="M0 0 Q4 -38 2 -56 Q-2 -38 0 0 Z" fill="#E8E4DC" />
        </g>
        <circle cx="0" cy="0" r="5" fill="#D8D4CC" />
        <circle cx="0" cy="0" r="3" fill="#C8C4BC" />
      </g>

      {/* Turbine 3 — right */}
      <g transform="translate(228, 232)" opacity="0.82">
        <line x1="0" y1="0" x2="0" y2="48" stroke="#E8E4DC" strokeWidth="2.5" />
        <g transform="rotate(35)">
          <path d="M0 0 Q3 -26 1 -38 Q-1 -26 0 0 Z" fill="#EDE8E0" />
        </g>
        <g transform="rotate(155)">
          <path d="M0 0 Q3 -26 1 -38 Q-1 -26 0 0 Z" fill="#E0DCD4" />
        </g>
        <g transform="rotate(275)">
          <path d="M0 0 Q3 -26 1 -38 Q-1 -26 0 0 Z" fill="#E8E4DC" />
        </g>
        <circle cx="0" cy="0" r="3" fill="#D0CCC4" />
      </g>

      {/* === PEOPLE SILHOUETTES === */}
      <g transform="translate(100, 288)">
        {/* 4 people sitting/standing close together on hill */}
        {/* Person 1 */}
        <g transform="translate(0, 0)">
          <circle cx="0" cy="-26" r="7" fill="#1A2818" />
          <path d="M-7 -18 Q-10 -4 -8 0 Q-4 -2 0 -4 Q4 -2 8 0 Q10 -4 7 -18 Z" fill="#1A2818" />
        </g>
        {/* Person 2 — slightly taller */}
        <g transform="translate(22, -3)">
          <circle cx="0" cy="-30" r="7.5" fill="#222E20" />
          <path d="M-8 -22 Q-12 -6 -9 0 Q-4 -2 0 -4 Q4 -2 9 0 Q12 -6 8 -22 Z" fill="#222E20" />
        </g>
        {/* Person 3 */}
        <g transform="translate(44, -2)">
          <circle cx="0" cy="-25" r="6.5" fill="#1A2818" />
          <path d="M-6.5 -18 Q-9 -4 -7 0 Q-3 -2 0 -3 Q3 -2 7 0 Q9 -4 6.5 -18 Z" fill="#1A2818" />
        </g>
        {/* Person 4 */}
        <g transform="translate(64, -1)">
          <circle cx="0" cy="-24" r="7" fill="#222E20" />
          <path d="M-7 -17 Q-10 -3 -8 1 Q-3 -1 0 -3 Q3 -1 8 1 Q10 -3 7 -17 Z" fill="#222E20" />
        </g>
      </g>

      {/* Foreground grass details */}
      {[20, 45, 75, 110, 145, 175, 205, 235, 265, 290].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${300 + (i % 3) * 5})`}>
          <path d={`M0 0 Q${-2 + (i%3)} -${8 + i%4} ${1+i%2} -${12+i%3}`} stroke="#2A5018" strokeWidth="1.5" fill="none" />
          <path d={`M3 0 Q${5+i%2} -${7+i%3} ${4} -${10+i%4}`} stroke="#325A18" strokeWidth="1.2" fill="none" />
        </g>
      ))}
    </svg>
  );
}
