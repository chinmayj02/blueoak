"use client";

/*
 * Footer
 * Purpose: Site footer matching reference design.
 * Design: Dark teal (#0D3D44) background, Bharat Project logo + tagline,
 *         2-column nav links, social icons row, bottom bar with copyright + legal.
 */

import React, { useState } from "react";
import Image from "next/image";
import LegalModal from "./LegalModal";

// ── Nav columns ────────────────────────────────────────────────────
const col1 = [
  { label: "Mission",         href: "#bharat-project" },
  { label: "Solutions",       href: "#services" },
  { label: "Funding Score",   href: "#funding-score" },
  { label: "India's Insights",href: "#editorial" },
];

const col2 = [
  { label: "Contact",  href: "#contact" },
  { label: "Careers",  href: "#" },
];

// ── Social icons (SVG inline, matches reference: LinkedIn X Instagram YouTube) ──
const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.13h.05C12.93 9.15 14.62 8 16.77 8c4.08 0 4.84 2.69 4.84 6.19V24h-4v-8.81c0-2.1-.04-4.8-2.93-4.8-2.94 0-3.39 2.3-3.39 4.67V24h-4V8.5z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState<null | "privacy" | "terms">(null);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{ background: "#0D3D44" }}
      className="relative overflow-hidden"
    >
      {/* Subtle wavy top edge — matches reference */}
      <div aria-hidden="true" className="w-full overflow-hidden leading-[0]" style={{ marginTop: -1 }}>
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: 40, display: "block" }}
          fill="#EDE5D4"
        >
          <path d="M0,48 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="container-site pt-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-10 sm:gap-8">

          {/* Left — brand + description */}
          <div className="max-w-xs">
            {/* Logo row */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="inline-flex items-center gap-3 mb-4 group"
              aria-label="The Bharat Project — back to top"
            >
              {/* Circular logo with decorative ring matching reference */}
              <div
                className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: "2px solid rgba(246,241,232,0.25)",
                  background: "rgba(246,241,232,0.08)",
                }}
              >
                <Image
                  src="/logo.jpg"
                  alt="The Bharat Project"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className="text-base font-semibold"
                style={{ color: "#F6F1E8", fontFamily: "var(--font-playfair)" }}
              >
                The Bharat Project
              </span>
            </a>

            <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(246,241,232,0.65)" }}>
              Empowering 1000+ Indian startups<br />from ambition to impact.
            </p>

            {/* Nav col 1 */}
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5 mb-5">
                {col1.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          scrollTo(link.href);
                        }
                      }}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(246,241,232,0.70)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F6F1E8")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.70)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social icons row */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold tracking-widest uppercase mr-2" style={{ color: "rgba(246,241,232,0.45)" }}>
                Connect
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`The Bharat Project on ${s.label}`}
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200"
                  style={{
                    border: "1.5px solid rgba(246,241,232,0.20)",
                    color: "rgba(246,241,232,0.65)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#F6F1E8";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(246,241,232,0.50)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(246,241,232,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(246,241,232,0.65)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(246,241,232,0.20)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — second nav column */}
          <nav aria-label="Company links" className="pt-1">
            <ul className="space-y-2.5">
              {col2.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(link.href);
                      }
                    }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(246,241,232,0.70)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F6F1E8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.70)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(246,241,232,0.10)" }}>
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs" style={{ color: "rgba(246,241,232,0.35)" }}>
            © 2025 The Bharat Project. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(246,241,232,0.35)" }}>
            <button
              onClick={() => setLegalOpen("privacy")}
              className="hover:text-ivory/70 transition-colors px-1"
              style={{ color: "rgba(246,241,232,0.40)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.40)")}
            >
              Privacy Policy
            </button>
            <span style={{ color: "rgba(246,241,232,0.20)" }}>|</span>
            <button
              onClick={() => setLegalOpen("terms")}
              className="transition-colors px-1"
              style={{ color: "rgba(246,241,232,0.40)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.40)")}
            >
              Terms
            </button>
            <span style={{ color: "rgba(246,241,232,0.20)" }}>|</span>
            <a
              href="#"
              className="transition-colors px-1"
              style={{ color: "rgba(246,241,232,0.40)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,241,232,0.40)")}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {legalOpen && (
        <LegalModal
          open={!!legalOpen}
          slug={legalOpen === "privacy" ? "privacy" : "terms"}
          onClose={() => setLegalOpen(null)}
        />
      )}
    </footer>
  );
}
