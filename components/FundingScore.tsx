"use client";

/**
 * FundingScore
 *
 * Renders the funding assessment section with responsive decorative artwork
 * and a form. The decorative images are generated into `public/decoration`
 * by `tools/generate-images.js` and mapped through `image-manifest.json`.
 *
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import FundingScoreForm from "./FundingScoreForm";
import FundingScoreResult from "./FundingScoreResult";
import {
  FundingScoreInputs,
  FundingScoreResult as ResultType,
  calculateFundingScore,
} from "@/lib/fundingScore";

const TOTAL_QUESTIONS = 5;

// Natural aspect ratios
const PORTRAIT_RATIO  = 1330 / 1183; // ~1.124  → taller than wide
const LANDSCAPE_RATIO = 941  / 1672; // ~0.563  → wider than tall

// How many px of rocket can overlap the card bottom before we consider it
// "obscuring" the card. The reference shows the rocket clouds just kissing
// the bottom ~15% of the card — that looks intentional and great on mobile.
// We only flip to "behind" when the overlap is deeper than this threshold.
const ALLOWED_OVERLAP_PX = 80;

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="flex items-center"
      style={{ width: 200 }}
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Question ${step} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i === step - 1;
        const isDone    = i < step - 1;
        return (
          <React.Fragment key={i}>
            <div
              className="flex-shrink-0 rounded-full transition-all duration-300"
              style={{
                width:     isCurrent ? 13 : 9,
                height:    isCurrent ? 13 : 9,
                background: isCurrent ? "white" : isDone ? "rgba(255,255,255,0.55)" : "transparent",
                border:    isCurrent ? "none"  : isDone ? "none" : "2px solid rgba(255,255,255,0.50)",
                boxShadow: isCurrent ? "0 0 0 3px rgba(255,255,255,0.22)" : "none",
              }}
            />
            {i < total - 1 && (
              <div
                className="flex-1 transition-all duration-300"
                style={{
                  height: 1.5,
                  margin: "0 4px",
                  background: i < step - 1 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.28)",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function FundingScore() {
  const [result,     setResult]     = useState<ResultType | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  // Dynamic state from measurements
  const [rocketInFront, setRocketInFront] = useState(true);
  const [spacerH,       setSpacerH]       = useState(300);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const card    = cardRef.current;
    if (!section || !card) return;

    const sectionW = section.offsetWidth;
    const sectionH = section.offsetHeight;
    const isLg     = sectionW >= 1024;

    // Rocket rendered height at current viewport width
    const ratio   = isLg ? LANDSCAPE_RATIO : PORTRAIT_RATIO;
    const rocketH = sectionW * ratio;

    // We want the spacer to push content up so the rocket sits at the bottom.
    // Spacer = rocketH so the section is tall enough to show the full rocket.
    // But we allow ALLOWED_OVERLAP_PX of rocket to overlap the card — looks good.
    const neededSpacerH = Math.max(60, rocketH - ALLOWED_OVERLAP_PX);
    setSpacerH(neededSpacerH);

    // Now check if the rocket truly overlaps the card *beyond* the allowed amount.
    // rocketTop (in section coords) = sectionH − rocketH
    // After setting spacerH, sectionH will change — so we must recalculate
    // using the card's actual position.
    const rocketTop  = sectionH - rocketH;
    const cardBottom = card.offsetTop + card.offsetHeight;

    // Deep overlap = rocket top is more than ALLOWED_OVERLAP_PX above card bottom
    const deepOverlap = rocketTop < (cardBottom - ALLOWED_OVERLAP_PX);
    setRocketInFront(!deepOverlap);
  }, []);

  useEffect(() => {
    // Small delay on first run to let layout settle after spacerH is applied
    const run = () => {
      measure();
      // Run again after a tick to get post-layout measurements
      requestAnimationFrame(measure);
    };

    run();
    const ro = new ResizeObserver(run);
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (cardRef.current)    ro.observe(cardRef.current);
    window.addEventListener("resize", run);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [measure, result, activeStep]);

  const handleSubmit = (inputs: FundingScoreInputs) => {
    const score = calculateFundingScore(inputs);
    setResult(score);
    setTimeout(() => {
      const el = document.getElementById("funding-score");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    }, 80);
  };

  const handleReset = () => {
    setResult(null);
    setActiveStep(1);
  };

  const rocketZ = rocketInFront ? 20 : 5;

  return (
    <section
      id="funding-score"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Know Your Funding Score"
    >
      {/* Teal gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(168deg, #0B5E68 0%, #0D7A8A 25%, #12A0B0 55%, #4ABFCC 80%, #6ED4DE 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.035,
        }}
      />

      {/* ── Rocket — z-index flips dynamically ─────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          zIndex: rocketZ,
          transition: "z-index 0s",
        }}
      >
        {/* Portrait: mobile + tablet */}
        <Image
          src="/decoration/know-your-funding-element-highRes.png"
          alt=""
          width={1183}
          height={1330}
          className="block w-full h-auto lg:hidden"
          loading="lazy"
        />
        {/* Landscape: desktop */}
        <Image
          src="/decoration/know-your-funding-element-highResLandscape.png"
          alt=""
          width={1672}
          height={941}
          className="hidden w-full h-auto lg:block"
          loading="lazy"
        />
      </div>

      {/* ── Content — z-index 10 ───────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        {/* Headline + subtitle + dots */}
        <div className="w-full max-w-xl px-6 pt-16 pb-6 flex flex-col items-center text-center">
          <h2
            className="font-bold text-white leading-[1.05]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Know Your<br />Funding Score
          </h2>

          <p
            className="mt-4 text-white/80 leading-relaxed"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              maxWidth: 320,
            }}
          >
            Answer a few questions about your business and get your funding
            readiness score.
          </p>

          {!result && (
            <div className="mt-7 flex justify-center">
              <ProgressDots step={activeStep} total={TOTAL_QUESTIONS} />
            </div>
          )}
        </div>

        {/* Card wrapper — translucent when rocket is behind it */}
        <div
          ref={cardRef}
          className="w-full max-w-md px-4 pb-4"
          style={{
            transition: "opacity 0.4s ease",
            opacity: rocketInFront ? 1 : 0.82,
          }}
        >
          {/* Inner card gets backdrop blur when translucent for a frosted look */}
          <div
            style={{
              borderRadius: 24,
              backdropFilter: rocketInFront ? "none" : "blur(2px)",
              WebkitBackdropFilter: rocketInFront ? "none" : "blur(2px)",
              transition: "backdrop-filter 0.4s ease",
            }}
          >
            {!result ? (
              <FundingScoreForm onSubmit={handleSubmit} onStepChange={setActiveStep} />
            ) : (
              <FundingScoreResult result={result} onReset={handleReset} />
            )}
          </div>
        </div>

        {/* Dynamic spacer — sized to accommodate rocket height minus allowed overlap */}
        <div style={{ height: spacerH, width: "100%" }} />
      </div>
    </section>
  );
}
