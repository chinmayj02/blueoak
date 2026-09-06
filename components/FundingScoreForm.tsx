"use client";

/**
 * FundingScoreForm
 *
 * Client component implementing the multi-step funding assessment form.
 * - Mobile: one question per page (keeps card compact and centered)
 * - Desktop: grouped into four steps
 * Synchronizes step state with parent via `onStepChange` and `fundingStepChange` events.
 *
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useState } from "react";
import { Check } from "lucide-react";
import {
  FundingScoreInputs,
  StartupStage,
  RevenueStatus,
  BusinessModel,
  MarketSize,
  FounderExperience,
} from "@/lib/fundingScore";

interface FundingScoreFormProps {
  onSubmit: (inputs: FundingScoreInputs) => void;
  /** Called whenever the active step index (1-based) changes */
  onStepChange?: (step: number) => void;
}

// ─── Each question is a discrete radio-pill list, exactly like the reference ─

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
  field: keyof FundingScoreInputs;
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "How long has your business been operational?",
    field: "stage",
    options: [
      { value: "idea",          label: "Less than 1 year" },
      { value: "mvp",           label: "1 – 3 years" },
      { value: "early-revenue", label: "3 – 5 years" },
      { value: "growth",        label: "5+ years" },
    ],
  },
  {
    id: "q2",
    question: "What is your current revenue status?",
    field: "revenueStatus",
    options: [
      { value: "pre-revenue",   label: "Pre-revenue" },
      { value: "early-revenue", label: "Early revenue (< ₹50L / yr)" },
      { value: "growing",       label: "Growing revenue (₹50L – ₹5Cr)" },
      { value: "profitable",    label: "Profitable / ₹5Cr+" },
    ],
  },
  {
    id: "q3",
    question: "How would you describe your market opportunity?",
    field: "marketSize",
    options: [
      { value: "niche",   label: "Niche market (< $100M)" },
      { value: "mid",     label: "Mid-size market ($100M – $1B)" },
      { value: "large",   label: "Large market ($1B – $10B)" },
      { value: "massive", label: "Massive market ($10B+)" },
    ],
  },
  {
    id: "q4",
    question: "What is your primary business model?",
    field: "businessModel",
    options: [
      { value: "b2b-saas",    label: "B2B SaaS / Subscription" },
      { value: "marketplace", label: "Marketplace / Platform" },
      { value: "d2c",         label: "D2C / Consumer" },
      { value: "enterprise",  label: "Enterprise / Services" },
    ],
  },
  {
    id: "q5",
    question: "What best describes your founding team?",
    field: "founderExperience",
    options: [
      { value: "first-time",    label: "First-time founders" },
      { value: "domain-expert", label: "Deep domain experts" },
      { value: "serial",        label: "Serial entrepreneurs" },
      { value: "exited",        label: "Previously exited founders" },
    ],
  },
];

const TOTAL = QUESTIONS.length;

// Sensible defaults that will produce a mid-range score
const DEFAULT_INPUTS: FundingScoreInputs = {
  stage:             "mvp",
  revenueStatus:     "pre-revenue",
  annualRevenue:     0,
  monthlyGrowth:     5,
  fundingRaised:     0,
  runway:            12,
  teamSize:          3,
  marketSize:        "large",
  businessModel:     "b2b-saas",
  founderExperience: "first-time",
};

// ─── Radio pill option ────────────────────────────────────────────────────────
function RadioPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-600"
      style={{
        background: selected ? "#0D5C63" : "white",
        color:      selected ? "white"   : "#1C2420",
        border:     selected ? "none"    : "1.5px solid #E0D9CC",
        boxShadow:  selected
          ? "0 4px 14px rgba(13,92,99,0.35)"
          : "none",
      }}
    >
      <span>{label}</span>
      {selected && (
        <Check className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
      )}
    </button>
  );
}

export default function FundingScoreForm({
  onSubmit,
  onStepChange,
}: FundingScoreFormProps) {
  const [step, setStep]     = useState(0); // 0-indexed
  const [inputs, setInputs] = useState<FundingScoreInputs>(DEFAULT_INPUTS);

  const q       = QUESTIONS[step];
  const current = String(inputs[q.field]);

  const select = (value: string) => {
    setInputs((prev) => ({ ...prev, [q.field]: value as never }));
  };

  const goNext = () => {
    if (step < TOTAL - 1) {
      const next = step + 1;
      setStep(next);
      onStepChange?.(next + 1);
    } else {
      // Final question answered — build full inputs and submit
      // Fill in the remaining numeric fields with sensible defaults
      // (they were set in DEFAULT_INPUTS above)
      onSubmit(inputs);
    }
  };

  const goBack = () => {
    if (step > 0) {
      const prev = step - 1;
      setStep(prev);
      onStepChange?.(prev + 1);
    }
  };

  // Notify parent on mount and when step changes
  React.useEffect(() => {
    onStepChange?.(step + 1);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasSelection = !!current;

  return (
    /*
     * White card matching the reference:
     * - "Question X of Y" small label, top-left
     * - Bold dark question
     * - Radio pill list
     * - Next button (teal, full-width, rounded-full)
     */
    <div
      className="w-full rounded-3xl bg-white p-6"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
      role="form"
      aria-label="Funding readiness assessment"
    >
      {/* Question counter */}
      <p
        className="text-xs font-semibold tracking-wide mb-3"
        style={{ color: "#0D5C63" }}
      >
        Question {step + 1} of {TOTAL}
      </p>

      {/* Question text */}
      <h3
        className="text-lg font-bold leading-snug mb-5"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "#1C2420",
          letterSpacing: "-0.01em",
        }}
      >
        {q.question}
      </h3>

      {/* Options */}
      <div className="flex flex-col gap-2.5 mb-6" role="radiogroup" aria-label={q.question}>
        {q.options.map((opt) => (
          <RadioPill
            key={opt.value}
            label={opt.label}
            selected={current === opt.value}
            onClick={() => select(opt.value)}
          />
        ))}
      </div>

      {/* Next / Submit button */}
      <button
        type="button"
        onClick={goNext}
        disabled={!hasSelection}
        className="w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: hasSelection
            ? "linear-gradient(135deg, #0D5C63 0%, #1B7A84 100%)"
            : "#C8D8D8",
          color: "white",
          boxShadow: hasSelection ? "0 4px 16px rgba(13,92,99,0.3)" : "none",
        }}
      >
        {step < TOTAL - 1 ? "Next →" : "Calculate My Score →"}
      </button>

      {/* Back link */}
      {step > 0 && (
        <button
          type="button"
          onClick={goBack}
          className="w-full mt-3 py-2 text-xs font-medium transition-colors"
          style={{ color: "#7A8A84" }}
        >
          ← Back
        </button>
      )}

      {/* Disclaimer */}
      <p className="mt-4 text-center text-[10px] italic" style={{ color: "#A8B8B4" }}>
        Indicative demo assessment — not an investment offer or commitment.
      </p>
    </div>
  );
}
