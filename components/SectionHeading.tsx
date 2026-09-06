"use client";

/*
 * SectionHeading
 * Purpose: Reusable section heading with optional eyebrow and CTA.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleHighlight?: string; // word/phrase to render in teal
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean; // for dark backgrounds
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  label,
  title,
  titleHighlight,
  subtitle,
  align = "left",
  light = false,
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const labelColor = light ? "text-gold/80" : "text-oak-teal";
  const titleColor = light ? "text-ivory" : "text-ink";
  const subtitleColor = light ? "text-ivory/70" : "text-ink-muted";
  const lineColor = light ? "bg-gold/60" : "bg-oak-teal/40";

  // Split title to inject highlight
  const renderTitle = () => {
    if (!titleHighlight) return title;
    const idx = title.indexOf(titleHighlight);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span className={light ? "text-gold" : "gradient-text"}>{titleHighlight}</span>
        {title.slice(idx + titleHighlight.length)}
      </>
    );
  };

  return (
    <div className={`${alignClass} ${className}`}>
      {label && (
        <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`w-6 h-px ${lineColor}`} aria-hidden="true" />
          <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${labelColor}`}>
            {label}
          </span>
        </div>
      )}
      <h2
        className={`font-display font-bold leading-tight ${titleColor} ${titleClassName}`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={`mt-4 leading-relaxed ${subtitleColor} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
