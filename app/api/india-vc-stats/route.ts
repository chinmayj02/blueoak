/**
 * GET /api/india-vc-stats
 *
 * Returns current-year India VC funding stats with live USD→INR conversion.
 *
 * Data strategy:
 *  - USD figures are curated from IVCA/Bain India VC Report 2024-25 baseline.
 *  - We fetch a live USD→INR exchange rate from exchangerate-api.com (free tier,
 *    no key required for the open endpoint).
 *  - The year-to-date figure is estimated as: annual_figure × (elapsed_months / 12).
 *  - YoY growth is calculated vs the prior year's figure.
 *  - Results are cached for 24 hours (revalidate: 86400) so we don't hammer the
 *    exchange-rate API on every request.
 *
 * Response shape:
 * {
 *   year: number,            // current year e.g. 2026
 *   annualUSD: number,       // full-year forecast in $B (e.g. 18.2)
 *   ytdUSD: number,          // YTD figure in $B
 *   annualINR: number,       // full-year in ₹ Cr (rounded)
 *   ytdINR: number,          // YTD in ₹ Cr (rounded)
 *   usdInrRate: number,      // live exchange rate
 *   yoyGrowth: number,       // % growth vs prior year
 *   elapsedMonths: number,   // months elapsed in current year
 *   startups: number,        // DPIIT recognized startups (illustrative)
 *   investors: number,       // active VC/PE investors (illustrative)
 *   unicorns: number,        // Indian unicorns count (illustrative)
 * }
 */

import { NextResponse } from "next/server";

// ── Historical annual India VC funding ($B) ───────────────────────────────────
// Source: IVCA-EY / Bain India VC/PE reports
const HISTORICAL: Record<number, number> = {
  2020: 11.1,
  2021: 38.5,
  2022: 25.7,
  2023: 9.6,
  2024: 16.8,
  2025: 19.8,  // latest full-year estimate (IVCA 2025 report)
};

// Projected growth rate for years beyond our data (conservative 12%)
const PROJECTED_GROWTH = 0.12;

// Ecosystem stats (updated annually from DPIIT / Tracxn / Hurun)
const ECOSYSTEM = {
  startups: 140000,   // DPIIT recognised startups (2025)
  investors: 1300,    // active VC/PE/angel investors
  unicorns: 116,      // Indian unicorn count (2025, Hurun India)
};

async function getLiveRate(): Promise<number> {
  try {
    // Open endpoint — no API key needed, 1500 req/month free
    const res = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      { next: { revalidate: 86400 } }  // cache 24 hrs
    );
    if (!res.ok) throw new Error("rate fetch failed");
    const data = await res.json();
    return typeof data?.rates?.INR === "number" ? data.rates.INR : 84.5;
  } catch {
    return 84.5; // fallback rate
  }
}

export async function GET() {
  const now          = new Date();
  const year         = now.getFullYear();
  const elapsedMonths = now.getMonth() + 1; // 1-based

  // Determine annual figure for current year
  let annualUSD: number;
  let priorYearUSD: number;

  if (HISTORICAL[year]) {
    annualUSD   = HISTORICAL[year];
    priorYearUSD = HISTORICAL[year - 1] ?? annualUSD / (1 + PROJECTED_GROWTH);
  } else {
    // Project forward from last known year
    const lastKnownYear = Math.max(...Object.keys(HISTORICAL).map(Number));
    const lastKnown     = HISTORICAL[lastKnownYear];
    const yearsAhead    = year - lastKnownYear;
    annualUSD   = lastKnown * Math.pow(1 + PROJECTED_GROWTH, yearsAhead);
    priorYearUSD = lastKnown * Math.pow(1 + PROJECTED_GROWTH, yearsAhead - 1);
  }

  // YTD = annual × fraction of year elapsed
  const ytdUSD = annualUSD * (elapsedMonths / 12);

  // YoY growth
  const yoyGrowth = Math.round(((annualUSD - priorYearUSD) / priorYearUSD) * 100);

  // Live INR rate
  const usdInrRate = await getLiveRate();

  // Convert to ₹ Cr (1 USD = usdInrRate INR; 1 Cr = 10M INR; $1B = 100 Cr × rate)
  // $1B × usdInrRate × 1e9 / 1e7 = $1B × usdInrRate × 100 Cr
  const annualINR = Math.round(annualUSD * usdInrRate * 100);  // in ₹ Cr
  const ytdINR    = Math.round(ytdUSD    * usdInrRate * 100);

  return NextResponse.json(
    {
      year,
      annualUSD:     +annualUSD.toFixed(1),
      ytdUSD:        +ytdUSD.toFixed(1),
      annualINR,
      ytdINR,
      usdInrRate:    +usdInrRate.toFixed(2),
      yoyGrowth,
      elapsedMonths,
      ...ECOSYSTEM,
    },
    {
      headers: {
        // Cache at CDN/browser level too
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    }
  );
}
