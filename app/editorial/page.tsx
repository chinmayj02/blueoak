/**
 * /editorial — India's Startup Landscape Editorial Page
 *
 * Server Component: reads articles.md at request time (ISR via next.revalidate).
 * Content is maintained by editing public/editorial/articles.md — no code changes needed.
 */

import type { Metadata } from "next";
import fs   from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { parseArticles, ParsedArticle } from "@/lib/parseArticles";
import Navbar  from "@/components/Navbar";
import Footer  from "@/components/Footer";

export const revalidate = 3600; // ISR: re-read file every hour

export const metadata: Metadata = {
  title:       "Editorial — India's Startup Landscape | BLUEOAK Ventures",
  description: "Dispatches on India's startup ecosystem — from Tier-2 cities to deeptech, AI, and the Bharat consumer.",
  openGraph: {
    title:       "Editorial — India's Startup Landscape | BLUEOAK Ventures",
    description: "Dispatches on India's startup ecosystem.",
    type:        "website",
  },
};

// ── Read + parse articles at build/request time ───────────────────────────────
function getArticles(): ParsedArticle[] {
  try {
    const filePath = path.join(process.cwd(), "public", "editorial", "articles.md");
    const raw      = fs.readFileSync(filePath, "utf-8");
    return parseArticles(raw);
  } catch {
    return [];
  }
}

// ── Category pill colour mapping ─────────────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Ecosystem:     { bg: "rgba(13,92,99,0.10)",  text: "#0D5C63" },
  Deeptech:      { bg: "rgba(13,55,42,0.10)",  text: "#12372A" },
  Manufacturing: { bg: "rgba(182,94,60,0.12)", text: "#8F4A2E" },
  "AI & Enterprise": { bg: "rgba(13,92,99,0.10)", text: "#0D5C63" },
  Consumer:      { bg: "rgba(216,155,53,0.15)", text: "#A87520" },
  Global:        { bg: "rgba(13,55,42,0.10)",  text: "#12372A" },
};
function catStyle(cat: string) {
  return CAT_COLORS[cat] ?? { bg: "rgba(13,92,99,0.10)", text: "#0D5C63" };
}

// ── Featured hero card ────────────────────────────────────────────────────────
function FeaturedCard({ article }: { article: ParsedArticle }) {
  const cs = catStyle(article.category);
  return (
    <article
      className="group relative rounded-2xl overflow-hidden bg-white border border-ivory-sand/60 hover:shadow-card-hover transition-all duration-500 cursor-pointer mb-8"
      aria-label={article.title}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        {article.image && (
          <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden flex-shrink-0">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
          </div>
        )}
        {/* Content */}
        <div className="flex-1 p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                style={{ background: cs.bg, color: cs.text }}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-subtle">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-subtle">
                <Calendar className="w-3 h-3" aria-hidden="true" />
                {article.date}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-ink leading-snug group-hover:text-oak-teal transition-colors duration-300 mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {article.title}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">{article.excerpt}</p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-oak-teal group-hover:gap-3 transition-all duration-300">
            Read article <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Regular article card ──────────────────────────────────────────────────────
function ArticleCard({ article, index }: { article: ParsedArticle; index: number }) {
  const cs = catStyle(article.category);
  return (
    <article
      className="group relative rounded-2xl overflow-hidden bg-white border border-ivory-sand/60 hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-1"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
      aria-label={article.title}
    >
      {article.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/90 backdrop-blur-sm"
              style={{ color: cs.text }}
            >
              {article.category}
            </span>
          </div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1 text-xs text-ink-subtle">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {article.readTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-ivory-sand" aria-hidden="true" />
          <span className="flex items-center gap-1 text-xs text-ink-subtle">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {article.date}
          </span>
        </div>
        <h3
          className="text-base font-bold text-ink leading-snug group-hover:text-oak-teal transition-colors duration-300 mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {article.title}
        </h3>
        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-oak-teal group-hover:gap-2.5 transition-all duration-300">
          Read article <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

// ── Category filter bar (static — no JS filter on server, just visual grouping) ─
function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10" role="list" aria-label="Categories">
      {["All", ...categories].map((cat) => (
        <span
          key={cat}
          role="listitem"
          className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-ivory-sand/80 text-ink-muted bg-white hover:border-oak-teal/40 hover:text-oak-teal transition-colors cursor-default"
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function EditorialPage() {
  const articles   = getArticles();
  const featured   = articles.find((a) => a.featured);
  const rest       = articles.filter((a) => !a.featured);
  const categories = articles.map((a) => a.category).filter((c, i, arr) => arr.indexOf(c) === i);

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        style={{ background: "#F6F1E8" }}
      >
        {/* ── Page header ────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(150deg, #0D5C63 0%, #12372A 60%, #0D1210 100%)",
            paddingTop: "calc(var(--navbar-height) + 3.5rem)",
            paddingBottom: "4rem",
          }}
        >
          {/* Decorative dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(246,241,232,0.07) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="container-site relative">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-ivory/60 hover:text-ivory text-sm font-medium transition-colors duration-200 mb-8 group"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
              Back to BLUEOAK Ventures
            </Link>

            {/* Label */}
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase mb-3"
              style={{ color: "#D89B35" }}
            >
              India&apos;s Startup Landscape
            </p>

            {/* Headline */}
            <h1
              className="text-ivory leading-[1.08] mb-4"
              style={{
                fontFamily:    "var(--font-playfair)",
                fontSize:      "clamp(2.2rem, 5vw, 4rem)",
                fontWeight:    700,
                letterSpacing: "-0.02em",
                maxWidth:      "18ch",
              }}
            >
              From the Editorial
            </h1>
            <p className="text-ivory/60 text-base leading-relaxed max-w-xl">
              Dispatches on India&apos;s startup ecosystem — the founders building it,
              the cities shaping it, and the capital flowing into it.
            </p>
          </div>
        </div>

        {/* ── Articles ───────────────────────────────────────────────── */}
        <div className="container-site py-16">

          {/* Category pills */}
          {categories.length > 0 && <CategoryList categories={categories} />}

          {/* Featured hero */}
          {featured && <FeaturedCard article={featured} />}

          {/* Article grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {articles.length === 0 && (
            <div className="text-center py-24 text-ink-subtle">
              <p className="text-lg font-medium mb-2">No articles yet</p>
              <p className="text-sm">
                Add articles to{" "}
                <code className="font-mono text-xs bg-ivory-sand/60 px-1.5 py-0.5 rounded">
                  public/editorial/articles.md
                </code>
              </p>
            </div>
          )}
        </div>

        {/* ── Back to home footer banner ─────────────────────────────── */}
        <div
          className="border-t border-ivory-sand/60"
          style={{ background: "#EDE5D4" }}
        >
          <div className="container-site py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="text-lg font-bold text-ink mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Explore more of BLUEOAK Ventures
              </p>
              <p className="text-sm text-ink-muted">
                Funding Score, Services, The Bharat Project and more.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-oak-teal text-ivory hover:bg-oak-forest transition-colors duration-300 hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
