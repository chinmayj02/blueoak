"use client";

/*
 * FundingScoreResult
 * Purpose: Display the computed funding score and recommendations.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useEffect, useRef, useState } from "react";
import { FundingScoreResult as Result } from "@/lib/fundingScore";
import { CheckCircle, TrendingUp, ArrowRight, RotateCcw } from "lucide-react";

interface Props {
  result: Result;
  onReset: () => void;
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [animated, setAnimated] = useState(false);
  const rafRef = useRef<number>(0);

  // SVG ring params
  const r = 54;
  const circumference = 2 * Math.PI * r; // ~339.3
  const targetOffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimated(true);
      const start = performance.now();
      const duration = 1500;
      const run = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(eased * score));
        if (progress < 1) rafRef.current = requestAnimationFrame(run);
      };
      rafRef.current = requestAnimationFrame(run);
    }, 200);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, [score]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
        {/* Track */}
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="rgba(220,206,184,0.4)"
          strokeWidth="10"
        />
        {/* Fill */}
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? targetOffset : circumference}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
        {/* Glow */}
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? targetOffset : circumference}
          transform="rotate(-90 70 70)"
          opacity="0.3"
          filter="blur(4px)"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold leading-none"
          style={{
            fontFamily: "var(--font-playfair)",
            color,
            letterSpacing: "-0.03em",
          }}
        >
          {displayScore}
        </span>
        <span className="text-xs text-ink-subtle mt-1">/100</span>
      </div>
    </div>
  );
}

function BreakdownBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 400);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-ink-muted">{label}</span>
        <span className="text-xs font-bold text-ink">{value}/{max}</span>
      </div>
      <div className="h-1.5 bg-ivory-sand rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1.2s] ease-out"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

const breakdownColors: Record<string, string> = {
  traction: "#0D5C63",
  team: "#12372A",
  market: "#D89B35",
  business: "#B65E3C",
  readiness: "#1B7A84",
};

export default function FundingScoreResult({ result, onReset }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={ref}
      className="w-full max-w-xl mx-auto"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      role="region"
      aria-label="Your funding score results"
    >
      {/* Score hero */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 p-6 rounded-2xl"
        style={{ background: `${result.categoryColor}0A`, border: `1px solid ${result.categoryColor}20` }}>
        <ScoreRing score={result.score} color={result.categoryColor} />

        <div className="text-center sm:text-left">
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-widest mb-3"
            style={{ background: result.categoryColor }}
          >
            {result.category}
          </span>
          <h3
            className="text-xl font-bold text-ink leading-snug"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {result.score >= 80
              ? "You're investment-ready."
              : result.score >= 60
              ? "Strong foundation in place."
              : result.score >= 40
              ? "Momentum is building."
              : "Early stages — keep going."}
          </h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="mb-6 p-5 rounded-2xl bg-white border border-ivory-sand/60">
        <h4 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-4">Score Breakdown</h4>
        <div className="space-y-3">
          <BreakdownBar label="Traction & Revenue" value={result.breakdown.traction} max={25} color={breakdownColors.traction} />
          <BreakdownBar label="Team" value={result.breakdown.team} max={20} color={breakdownColors.team} />
          <BreakdownBar label="Market Opportunity" value={result.breakdown.market} max={20} color={breakdownColors.market} />
          <BreakdownBar label="Business Model" value={result.breakdown.business} max={20} color={breakdownColors.business} />
          <BreakdownBar label="Fundraising Readiness" value={result.breakdown.readiness} max={15} color={breakdownColors.readiness} />
        </div>
      </div>

      {/* Strengths & Improvements in 2-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-white border border-ivory-sand/60">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-oak-forest uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            Strengths
          </h4>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-ink-muted leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-oak-forest mt-1.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to improve */}
        <div className="p-5 rounded-2xl bg-white border border-ivory-sand/60">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Areas to improve
          </h4>
          <ul className="space-y-2">
            {result.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-ink-muted leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next steps */}
      <div className="p-5 rounded-2xl bg-oak-dark text-ivory mb-6">
        <h4 className="text-xs font-semibold text-gold/70 uppercase tracking-wider mb-3">Suggested next steps</h4>
        <ol className="space-y-2">
          {result.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ivory/80">
              <span
                className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(216,155,53,0.2)", color: "#D89B35" }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Demo disclaimer */}
      <div className="p-4 rounded-xl bg-ivory-warm/80 border border-ivory-sand/60 mb-6">
        <p className="text-[11px] text-ink-subtle/70 text-center leading-relaxed italic">
          This score is a <strong>demo assessment</strong> based on a simplified model.
          It is not an investment offer, commitment, or funding recommendation from BLUEOAK Ventures.
          Actual investment decisions involve comprehensive due diligence.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleContact}
          className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-oak-teal text-ivory hover:bg-oak-forest transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
        >
          Start a conversation
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-ivory-sand text-ink-muted hover:border-oak-teal/30 hover:text-ink transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Try again
        </button>
      </div>
    </div>
  );
}
