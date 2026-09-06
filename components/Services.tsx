"use client";

/*
 * Services
 * Purpose: List of services offered with cards and CTAs.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { services } from "@/data/services";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="group relative rounded-2xl border p-6 sm:p-7 transition-all duration-400 cursor-default overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ${index * 0.08}s ease, transform 0.6s ${index * 0.08}s ease`,
        borderColor: hovered ? "rgba(13,92,99,0.3)" : "rgba(220,206,184,0.7)",
        background: hovered
          ? "linear-gradient(135deg, #ffffff 0%, rgba(13,92,99,0.03) 100%)"
          : "white",
        boxShadow: hovered
          ? "0 12px 40px rgba(13,18,16,0.10), 0 2px 8px rgba(13,18,16,0.04)"
          : "none",
      }}
      aria-label={service.title}
    >
      {/* Number */}
      <div className="flex items-start justify-between mb-5">
        <span
          className="text-4xl font-bold transition-colors duration-300"
          style={{
            fontFamily: "var(--font-playfair)",
            color: hovered ? "#0D5C63" : "rgba(220,206,184,0.8)",
            letterSpacing: "-0.03em",
          }}
          aria-hidden="true"
        >
          {service.number}
        </span>
        {/* Icon/symbol */}
        <span
          className="text-2xl transition-all duration-300"
          style={{
            color: hovered ? "#0D5C63" : "#C8B99A",
            transform: hovered ? "scale(1.1) rotate(10deg)" : "scale(1) rotate(0deg)",
          }}
          aria-hidden="true"
        >
          {service.icon}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold text-ink mb-2 transition-colors duration-300 group-hover:text-oak-teal"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {service.title}
      </h3>

      {/* Short description */}
      <p className="text-sm text-ink-muted leading-relaxed mb-4">{service.description}</p>

      {/* Extended detail — revealed on hover */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: hovered ? "80px" : "0px",
          opacity: hovered ? 1 : 0,
        }}
      >
        <p className="text-xs text-ink-subtle leading-relaxed border-t border-ivory-sand/60 pt-4">
          {service.detail}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl transition-all duration-400"
        style={{
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(to right, #0D5C63, #1B7A84)",
        }}
        aria-hidden="true"
      />
    </article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-section bg-ivory-warm relative overflow-hidden"
      aria-label="Our Services"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 oak-pattern opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading
            label="What we offer"
            title="More than capital."
            titleHighlight=" Partnership."
            subtitle="We work alongside founders at every stage — from first cheque to global scale."
            titleClassName="text-display-lg"
          />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 rounded-2xl bg-oak-dark px-8 py-8 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3
              className="text-xl font-bold text-ivory"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to explore a partnership?
            </h3>
            <p className="mt-1 text-sm text-ivory/60">
              We back founders who think differently and build with conviction.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="flex-shrink-0 group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #D89B35 0%, #E8B555 100%)",
              color: "#0D1210",
              boxShadow: "0 4px 16px rgba(216,155,53,0.3)",
            }}
          >
            Start a conversation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
