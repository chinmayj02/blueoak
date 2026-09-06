"use client";

/*
 * Footer
 * Purpose: Site footer, legal links and micro-copy.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LegalModal from "./LegalModal";

const footerLinks = {
  explore: [
    { label: "The Bharat Project", href: "#bharat-project" },
    { label: "Editorial", href: "#editorial" },
    { label: "Funding Score", href: "#funding-score" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Approach", href: "#" },
    { label: "Portfolio", href: "#" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "X / Twitter", href: "#", icon: "𝕏" },
  { label: "Instagram", href: "#", icon: "ig" },
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
      className="relative overflow-hidden"
      style={{ background: "#0D1210" }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top decorative border */}
      <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(216,155,53,0.4), transparent)" }} />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.04]" viewBox="0 0 300 300" fill="none">
          <g transform="translate(200, 200)">
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
              <g key={i} transform={`rotate(${deg})`}>
                <path d="M0 0 L0 -130 Q8 -100 0 -65 Q-8 -100 0 -130 Z" fill="#D89B35" />
              </g>
            ))}
            <circle cx="0" cy="0" r="15" fill="#D89B35" opacity="0.5" />
          </g>
        </svg>

        <svg className="absolute top-0 left-0 w-64 h-64 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <g transform="translate(40, 180)">
            <rect x="-5" y="-80" width="10" height="80" fill="#F6F1E8" />
            <ellipse cx="0" cy="-90" rx="55" ry="70" fill="#F6F1E8" />
            <ellipse cx="-38" cy="-68" rx="38" ry="48" fill="#F6F1E8" />
            <ellipse cx="38" cy="-68" rx="38" ry="48" fill="#F6F1E8" />
          </g>
        </svg>
      </div>

      <div className="container-site relative py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="inline-flex items-center gap-3 mb-5 group"
              aria-label="BLUEOAK Ventures — back to top"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-oak-teal">
                <Image src="/logo.jpg" alt="BLUEOAK Ventures" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div>
                <span className="block text-sm font-bold text-ivory" style={{ fontFamily: "var(--font-playfair)" }}>
                  BLUEOAK
                </span>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-gold">Ventures</span>
              </div>
            </a>

            <p className="text-sm text-ivory/50 leading-relaxed max-w-xs mb-6">
              Backing India&apos;s next generation of builders. Partnering with ambitious
              founders at the intersection of heritage, technology, and global ambition.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-xs text-ivory/40 hover:text-ivory hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                  aria-label={`BLUEOAK Ventures on ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-ivory/30 mb-5">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { if (link.href.startsWith("#")) { e.preventDefault(); scrollTo(link.href); } }}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-ivory/30 mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-ivory/30 mb-5">Get started</h3>
            <a
              href="#funding-score"
              onClick={(e) => { e.preventDefault(); scrollTo("#funding-score"); }}
              className="group flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors duration-200 mb-4"
            >
              Know Your Funding Score
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="group flex items-center gap-1.5 text-sm text-ivory/60 hover:text-ivory transition-colors duration-200 mb-6"
            >
              Start a conversation
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="mt-6 p-4 rounded-xl border border-white/8 bg-white/4">
              <p className="text-xs text-ivory/50 mb-3 leading-relaxed">
                Editorial dispatches on Indian startups and innovation.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/8 border border-white/10 text-xs text-ivory placeholder-ivory/30 focus:outline-none focus:border-oak-teal/50"
                  aria-label="Subscribe to newsletter"
                />
                <button
                  className="px-3 py-2 rounded-lg bg-gold/90 hover:bg-gold text-[10px] font-semibold text-oak-dark transition-colors whitespace-nowrap"
                  aria-label="Subscribe"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/30 text-center sm:text-left">© 2026 BLUEOAK Ventures. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalOpen("privacy")}
              className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => setLegalOpen("terms")}
              className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {legalOpen && (
        <LegalModal open={!!legalOpen} slug={legalOpen === "privacy" ? "privacy" : "terms"} onClose={() => setLegalOpen(null)} />
      )}
    </footer>
  );
}
