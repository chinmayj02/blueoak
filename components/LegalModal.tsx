"use client";

import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type LegalSlug = "privacy" | "terms";

const TITLE_MAP: Record<LegalSlug, string> = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
};

// Use a proper markdown parser (marked) and sanitize output with DOMPurify.
// This avoids rendering raw markdown as plain text and helps prevent XSS.

export default function LegalModal({
  open,
  slug,
  onClose,
}: {
  open: boolean;
  slug: LegalSlug;
  onClose: () => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`/legal/${slug}.md`).then((r) => r.text()).then((t) => {
      setContent(t);
      setLoading(false);
    }).catch(() => { setContent("Failed to load document."); setLoading(false); });
  }, [open, slug]);

  useEffect(() => {
    if (!content) { setHtml(null); return; }
    try {
      const raw = marked.parse(content);
      const clean = DOMPurify.sanitize(raw);
      setHtml(clean);
    } catch (e) {
      setHtml("<p>Failed to parse document.</p>");
    }
  }, [content]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // extract dates if present: look for line like 'Effective: 21 May 2025  |  Last Reviewed: 21 May 2026'
  let effective = "";
  let lastReviewed = "";
  if (content) {
    const m = content.match(/Effective:\s*(.*?)\s*\|\s*Last Reviewed:\s*(.*)/i);
    if (m) { effective = m[1].trim(); lastReviewed = m[2].trim(); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl mx-4 sm:mx-6 lg:mx-0 bg-ivory text-ink rounded-2xl shadow-2xl overflow-hidden border border-ivory-sand" style={{ maxHeight: '90vh' }}>
        <header className="relative p-5 border-b border-ivory-sand/30">
          <div className="absolute right-5 top-5">
            <button aria-label="Close" onClick={onClose} className="rounded-full p-2 hover:bg-white/60 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="#0D1210" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="text-center">
            <div className="text-xs text-oak-teal font-semibold">BlueOak Ventures</div>
            <h2 className="text-lg font-semibold mt-1">{TITLE_MAP[slug]}</h2>
            <div className="text-xs text-ink-subtle mt-1">Effective Date: <span className="font-medium">{effective || '—'}</span>  |  Last Reviewed Date: <span className="font-medium">{lastReviewed || '—'}</span></div>
          </div>
        </header>

        <div className="p-6 overflow-auto max-h-[65vh] text-sm">
          <div className="mx-auto max-w-3xl prose prose-lg">
          {loading && <div className="text-center text-ink-subtle">Loading…</div>}
            {!loading && html && (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            )}
            {!loading && !html && !content && (
              <div className="text-center text-ink-subtle">No content available.</div>
            )}
            {!loading && content && !html && (
              <div className="text-center text-ink-subtle">Preview unavailable.</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-ivory-sand/30">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gold text-oak-dark font-semibold hover:brightness-95">Close</button>
        </div>
      </div>
    </div>
  );
}
