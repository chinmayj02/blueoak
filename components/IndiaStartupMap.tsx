"use client";

/*
 * IndiaStartupMap
 * Purpose: Interactive map showing startup city clusters and tooltips.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useState } from "react";
import { startupCities, type StartupCity } from "@/data/startupCities";
import { X } from "lucide-react";

// Simplified but recognizable SVG outline of India
function IndiaOutline() {
  return (
    <path
      d="
        M 200 28
        C 215 30 230 36 244 46
        C 258 56 265 70 270 85
        C 275 100 276 116 272 130
        C 268 144 258 154 262 168
        C 266 182 278 188 280 202
        C 282 216 278 230 274 242
        C 270 254 262 262 258 275
        C 254 288 256 303 252 316
        C 248 329 238 338 232 351
        C 226 364 224 378 218 390
        C 212 402 204 412 198 424
        C 192 436 188 448 184 458
        C 180 468 178 477 174 483
        C 170 489 164 493 160 492
        C 156 491 150 485 145 477
        C 140 469 136 459 132 449
        C 128 439 125 427 120 416
        C 115 405 108 395 102 383
        C 96 371 90 357 84 344
        C 78 331 70 319 64 305
        C 58 291 52 275 48 260
        C 44 245 42 229 40 214
        C 38 199 37 183 38 168
        C 39 153 44 139 48 125
        C 52 111 58 99 65 88
        C 72 77 82 70 88 59
        C 94 48 95 35 104 26
        C 113 17 126 14 140 12
        C 154 10 175 22 200 28 Z
      "
      fill="none"
      stroke="#12372A"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

// Tooltip for city info
function CityTooltip({ city, onClose }: { city: StartupCity; onClose: () => void }) {
  const tierColors = {
    primary: "#0D5C63",
    secondary: "#12372A",
    emerging: "#D89B35",
  };

  return (
    <div
      className="absolute z-30 bg-white rounded-2xl shadow-card-active border border-ivory-sand/60 p-5 w-64"
      style={{
        left: `${Math.min(city.x, 62)}%`,
        top: `${Math.min(city.y - 10, 75)}%`,
        transform: "translate(-50%, -100%)",
      }}
      role="dialog"
      aria-label={`${city.name} startup ecosystem`}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-ivory-warm transition-colors"
        aria-label="Close"
      >
        <X className="w-3.5 h-3.5 text-ink-subtle" />
      </button>

      <div className="flex items-start gap-2 mb-3">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wide"
          style={{ background: tierColors[city.tier] }}
        >
          {city.tier}
        </span>
      </div>

      <h3
        className="text-base font-bold text-ink"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {city.name}
      </h3>
      <p className="text-xs text-oak-teal font-medium mt-0.5">{city.tagline}</p>
      <p className="text-xs text-ink-muted mt-2 leading-relaxed">{city.highlight}</p>

      <div className="mt-3 pt-3 border-t border-ivory-sand/60">
        <p className="text-[10px] text-ink-subtle mb-1.5">{city.founderCount}</p>
        <div className="flex flex-wrap gap-1">
          {city.sectors.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[10px] px-2 py-0.5 rounded-full bg-oak-teal/8 text-oak-teal font-medium"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="text-[9px] text-ink-subtle/60 mt-2 italic">* Illustrative data only</p>
      </div>
    </div>
  );
}

export default function IndiaStartupMap() {
  const [activeCity, setActiveCity] = useState<StartupCity | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const tierConfig = {
    primary: { r: 7, color: "#0D5C63", pulseColor: "rgba(13,92,99,0.3)" },
    secondary: { r: 5.5, color: "#12372A", pulseColor: "rgba(18,55,42,0.25)" },
    emerging: { r: 4.5, color: "#D89B35", pulseColor: "rgba(216,155,53,0.25)" },
  };

  const handleCityClick = (city: StartupCity) => {
    setActiveCity(activeCity?.id === city.id ? null : city);
  };

  return (
    <div className="relative w-full" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Map SVG */}
      <svg
        viewBox="0 0 340 520"
        className="w-full h-auto"
        role="img"
        aria-label="India startup ecosystem map"
        style={{ overflow: "visible" }}
      >
        {/* Background */}
        <rect width="340" height="520" fill="transparent" />

        {/* India outline — centered and scaled */}
        <g transform="translate(10, 4) scale(1.08)">
          <IndiaOutline />
          {/* Subtle fill */}
          <path
            d="
              M 200 28 C 215 30 230 36 244 46 C 258 56 265 70 270 85
              C 275 100 276 116 272 130 C 268 144 258 154 262 168
              C 266 182 278 188 280 202 C 282 216 278 230 274 242
              C 270 254 262 262 258 275 C 254 288 256 303 252 316
              C 248 329 238 338 232 351 C 226 364 224 378 218 390
              C 212 402 204 412 198 424 C 192 436 188 448 184 458
              C 180 468 178 477 174 483 C 170 489 164 493 160 492
              C 156 491 150 485 145 477 C 140 469 136 459 132 449
              C 128 439 125 427 120 416 C 115 405 108 395 102 383
              C 96 371 90 357 84 344 C 78 331 70 319 64 305
              C 58 291 52 275 48 260 C 44 245 42 229 40 214
              C 38 199 37 183 38 168 C 39 153 44 139 48 125
              C 52 111 58 99 65 88 C 72 77 82 70 88 59
              C 94 48 95 35 104 26 C 113 17 126 14 140 12
              C 154 10 175 22 200 28 Z
            "
            fill="rgba(18,55,42,0.04)"
          />
        </g>

        {/* Sri Lanka */}
        <ellipse cx="218" cy="460" rx="10" ry="15" fill="none" stroke="#12372A" strokeWidth="1" opacity="0.4" />

        {/* Andaman & Nicobar suggestion */}
        <g opacity="0.4">
          <circle cx="300" cy="280" r="3" fill="none" stroke="#12372A" strokeWidth="0.8" />
          <circle cx="302" cy="295" r="2" fill="none" stroke="#12372A" strokeWidth="0.8" />
          <circle cx="303" cy="308" r="2" fill="none" stroke="#12372A" strokeWidth="0.8" />
        </g>

        {/* City markers */}
        {startupCities.map((city) => {
          const cfg = tierConfig[city.tier];
          const isActive = activeCity?.id === city.id;
          const isHovered = hoveredCity === city.id;
          // Convert percentage positions to SVG coords (SVG is 340 wide, 520 tall)
          const cx = (city.x / 100) * 340;
          const cy = (city.y / 100) * 520;

          return (
            <g
              key={city.id}
              className="map-city-dot"
              transform={`translate(${cx}, ${cy})`}
              onClick={() => handleCityClick(city)}
              onMouseEnter={() => setHoveredCity(city.id)}
              onMouseLeave={() => setHoveredCity(null)}
              role="button"
              tabIndex={0}
              aria-label={`${city.name} — ${city.tagline}`}
              onKeyDown={(e) => { if (e.key === "Enter") handleCityClick(city); }}
              style={{ cursor: "pointer" }}
            >
              {/* Pulse ring */}
              {(isActive || isHovered) && (
                <circle
                  r={cfg.r + 8}
                  fill={cfg.pulseColor}
                  style={{
                    animation: "pulseSoft 2s ease-in-out infinite",
                  }}
                />
              )}
              {/* Outer ring */}
              <circle
                r={cfg.r + 3}
                fill="none"
                stroke={cfg.color}
                strokeWidth="1"
                opacity={isActive || isHovered ? 0.6 : 0.2}
              />
              {/* Main dot */}
              <circle
                r={cfg.r}
                fill={cfg.color}
                opacity={isActive ? 1 : isHovered ? 0.9 : 0.7}
                style={{
                  transform: isActive || isHovered ? "scale(1.2)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 0.2s ease",
                }}
              />
              {/* Center highlight */}
              <circle r={2} fill="white" opacity={isActive ? 0.9 : 0.5} />
              {/* Label */}
              <text
                y={cfg.r + 14}
                textAnchor="middle"
                fontSize="9"
                fill="#1C2420"
                fontFamily="Inter, sans-serif"
                fontWeight={isActive ? "700" : "600"}
                opacity={isActive || isHovered ? 1 : 0.7}
              >
                {city.shortName}
              </text>
            </g>
          );
        })}
      </svg>

      {/* City tooltip */}
      {activeCity && (
        <CityTooltip
          city={activeCity}
          onClose={() => setActiveCity(null)}
        />
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-5 justify-center">
        {(["primary", "secondary", "emerging"] as const).map((tier) => (
          <div key={tier} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: tierConfig[tier].color }}
            />
            <span className="text-xs text-ink-muted capitalize">{tier}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-ink-subtle/60 italic">
        Click any city for ecosystem details · Illustrative data only
      </p>
    </div>
  );
}
