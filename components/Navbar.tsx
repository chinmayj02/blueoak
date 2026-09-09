"use client";

/*
 * Navbar
 * Purpose: Site navigation for anchor sections and mobile menu handling.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home",              href: "#home",          page: false },
  { label: "The Bharat Project",href: "#bharat-project",page: false },
  { label: "Editorial",         href: "/editorial",     page: true  },
  { label: "Funding Score",     href: "#funding-score", page: false },
  { label: "Services",          href: "#services",      page: false },
  { label: "Contact",           href: "#contact",       page: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/92 backdrop-blur-md shadow-nav border-b border-ivory-sand/40"
            : "bg-transparent"
        }`}
        style={{ height: "var(--navbar-height)" }}
        role="banner"
      >
        <div className="container-site h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-3 group"
            aria-label="BLUEOAK Ventures — Home"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-oak-forest/10 bg-oak-teal flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="BLUEOAK Ventures logo"
                width={36}
                height={36}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-sm font-bold tracking-wide text-oak-dark"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                BLUEOAK
              </span>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold mt-0.5">
                Ventures
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive  = !link.page && activeSection === sectionId;
              return link.page ? (
                /* Page-level navigation — real href, no scroll */
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg link-underline text-ink-muted hover:text-ink"
                >
                  {link.label}
                </a>
              ) : (
                /* Scroll-to-section navigation */
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg link-underline ${
                    isActive ? "text-oak-teal" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-3 right-3 h-px bg-oak-teal/60 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#funding-score"
            onClick={(e) => { e.preventDefault(); handleNavClick("#funding-score"); }}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 bg-oak-teal text-ivory hover:bg-oak-forest hover:-translate-y-0.5 shadow-sm hover:shadow-glow-teal"
            aria-label="Know Your Funding Score"
          >
            Funding Score
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-ink hover:bg-ink/8 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

        {/* Slide-in panel */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`absolute top-0 right-0 bottom-0 w-72 bg-ivory shadow-2xl transition-transform duration-500 ease-expo flex flex-col ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between p-6 border-b border-ivory-sand/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-oak-teal">
                <Image src="/logo.jpg" alt="" width={28} height={28} className="object-cover w-full h-full" />
              </div>
              <span className="text-sm font-bold text-oak-dark" style={{ fontFamily: "var(--font-playfair)" }}>
                BLUEOAK
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-ink/8"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-ink-muted" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link, i) => {
              const sectionId = link.href.replace("#", "");
              const isActive  = !link.page && activeSection === sectionId;
              return link.page ? (
                /* Page navigation — real href */
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 text-ink hover:bg-ink/5 hover:text-oak-forest"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </a>
              ) : (
                /* Scroll navigation */
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-oak-teal/10 text-oak-teal"
                      : "text-ink hover:bg-ink/5 hover:text-oak-forest"
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-oak-teal" aria-hidden="true" />}
                </a>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="p-6 border-t border-ivory-sand/50">
            <a
              href="#funding-score"
              onClick={(e) => { e.preventDefault(); handleNavClick("#funding-score"); }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold bg-oak-teal text-ivory hover:bg-oak-forest transition-colors"
            >
              Know Your Funding Score
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-4 text-center text-xs text-ink-subtle">
              India&apos;s next generation of builders.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
