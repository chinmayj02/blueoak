"use client";

/*
 * Editorial list & article cards
 * Purpose: Render editorial articles and related stats.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Stats from "./Stats";
import IndiaStartupMap from "./IndiaStartupMap";
import { editorialArticles } from "@/data/editorial";

function ArticleCard({
  article,
  featured = false,
  index = 0,
}: {
  article: (typeof editorialArticles)[0];
  featured?: boolean;
  index?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (featured) {
    return (
      <article
        ref={ref}
        className="group relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden bg-white border border-ivory-sand/60 hover:shadow-card-hover transition-all duration-500 cursor-pointer"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease, box-shadow 0.3s ease`,
        }}
        aria-label={article.title}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
          </div>

          {/* Content */}
          <div className="flex-1 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-oak-teal/10 text-oak-teal uppercase tracking-wide">
                  {article.category}
                </span>
                <span className="text-xs text-ink-subtle">{article.readTime} read</span>
                <span className="text-xs text-ink-subtle">{article.date}</span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold text-ink leading-snug group-hover:text-oak-teal transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {article.title}
              </h3>

              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{article.excerpt}</p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-oak-teal group-hover:gap-2.5 transition-all duration-300">
              Read article
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      className="group relative rounded-2xl overflow-hidden bg-white border border-ivory-sand/60 hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease, box-shadow 0.3s ease`,
      }}
      aria-label={article.title}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Category pill overlay */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-oak-teal uppercase tracking-wider">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-ink-subtle">{article.readTime} read</span>
          <span className="w-1 h-1 rounded-full bg-ivory-sand" />
          <span className="text-xs text-ink-subtle">{article.date}</span>
        </div>

        <h3
          className="text-base font-bold text-ink leading-snug group-hover:text-oak-teal transition-colors duration-300"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {article.title}
        </h3>

        <p className="mt-2 text-xs text-ink-muted leading-relaxed line-clamp-2">{article.excerpt}</p>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-oak-teal group-hover:gap-2 transition-all duration-300">
          Read article
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </article>
  );
}

export default function Editorial() {
  return (
    <section
      id="editorial"
      className="py-section bg-ivory-warm relative overflow-hidden"
      aria-label="Editorial — The India Startup Landscape"
    >
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="container-site relative">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-14">
          <SectionHeading
            label="The India Startup Landscape"
            title="Where India's"
            titleHighlight=" builders"
            subtitle="A living map of India's startup ecosystem — from established hubs to cities building their first generation of founders."
            titleClassName="text-display-lg"
          />
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-oak-teal hover:text-oak-forest transition-colors whitespace-nowrap link-underline"
            aria-label="View all editorial articles"
          >
            View all
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <Stats />
        </div>

        {/* Map + context */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3
              className="text-xl font-bold text-ink mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              India Startup Map — 2026
            </h3>
            <p className="text-sm text-ink-muted mb-8 leading-relaxed">
              Click any city to explore its startup ecosystem. From Bangalore to Kochi,
              India&apos;s innovation is no longer concentrated — it&apos;s distributed.
            </p>
            <IndiaStartupMap />
          </div>

          {/* Ecosystem insight panel */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-white border border-ivory-sand/60 p-6">
              <h4 className="text-sm font-semibold text-oak-teal uppercase tracking-wider mb-1">
                The Tier-2 Opportunity
              </h4>
              <h3
                className="text-xl font-bold text-ink mt-2 mb-3 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                India&apos;s next builders aren&apos;t just in Bangalore
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Cities like Jaipur, Indore, and Kochi are developing distinct startup
                identities rooted in their natural advantages — crafts, agriculture,
                health, and regional languages. The infrastructure of ambition is being
                built everywhere now.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Agritech", "Healthtech", "Climate", "D2C", "Regional SaaS"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full bg-oak-forest/8 text-oak-forest font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-oak-dark text-ivory p-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold/70">
                By the numbers
              </span>
              <p
                className="mt-3 text-3xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-playfair)", color: "#F6F1E8" }}
              >
                28 states.<br />
                <span style={{ color: "#D89B35" }}>One ambition.</span>
              </p>
              <p className="mt-3 text-sm text-ivory/60 leading-relaxed">
                India&apos;s startup ecosystem has become truly federal — each state developing
                its own regulatory framework, investment climate, and founder community.
              </p>
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div>
          <h3
            className="text-xl font-bold text-ink mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            From the Editorial
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorialArticles.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={false}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
