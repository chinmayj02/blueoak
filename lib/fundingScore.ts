/**
 * BLUEOAK Ventures — Funding Score Calculator
 *
 * IMPORTANT: This is a DEMO/INDICATIVE scoring model only.
 * It is NOT a real investment assessment or funding recommendation.
 * The algorithm is a placeholder designed to be replaced with
 * a real methodology when available.
 *
 * To replace: implement a new version of `calculateFundingScore(inputs)`
 * with the same signature — no UI changes required.
 */

export type StartupStage = "idea" | "mvp" | "early-revenue" | "growth" | "scale";
export type RevenueStatus = "pre-revenue" | "early-revenue" | "growing" | "profitable";
export type BusinessModel = "b2b-saas" | "b2c" | "marketplace" | "d2c" | "enterprise" | "other";
export type MarketSize = "niche" | "mid" | "large" | "massive";
export type FounderExperience = "first-time" | "domain-expert" | "serial" | "exited";

export interface FundingScoreInputs {
  stage: StartupStage;
  revenueStatus: RevenueStatus;
  annualRevenue: number; // INR lakhs
  monthlyGrowth: number; // percentage
  fundingRaised: number; // INR lakhs
  runway: number; // months
  teamSize: number;
  marketSize: MarketSize;
  businessModel: BusinessModel;
  founderExperience: FounderExperience;
}

export interface ScoreBreakdown {
  traction: number; // 0–25
  team: number; // 0–20
  market: number; // 0–20
  business: number; // 0–20
  readiness: number; // 0–15
}

export interface FundingScoreResult {
  score: number; // 0–100
  category: "Investor Ready" | "Funding Ready" | "Building Momentum" | "Early Stage";
  categoryColor: string;
  breakdown: ScoreBreakdown;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  summary: string;
}

// ─── Weights ────────────────────────────────────────────────────────────────
const STAGE_SCORES: Record<StartupStage, number> = {
  idea: 2,
  mvp: 5,
  "early-revenue": 10,
  growth: 16,
  scale: 20,
};

const REVENUE_STATUS_SCORES: Record<RevenueStatus, number> = {
  "pre-revenue": 2,
  "early-revenue": 6,
  growing: 12,
  profitable: 18,
};

const MARKET_SIZE_SCORES: Record<MarketSize, number> = {
  niche: 5,
  mid: 10,
  large: 15,
  massive: 20,
};

const BUSINESS_MODEL_SCORES: Record<BusinessModel, number> = {
  "b2b-saas": 20,
  enterprise: 18,
  marketplace: 16,
  d2c: 14,
  b2c: 12,
  other: 10,
};

const FOUNDER_EXPERIENCE_SCORES: Record<FounderExperience, number> = {
  "first-time": 5,
  "domain-expert": 10,
  serial: 15,
  exited: 20,
};

// ─── Main scorer ─────────────────────────────────────────────────────────────

export function calculateFundingScore(inputs: FundingScoreInputs): FundingScoreResult {
  // --- Traction score (0–25) ---
  let tractionScore = 0;
  tractionScore += Math.min(8, STAGE_SCORES[inputs.stage] * 0.4);

  // Revenue score: normalize INR lakhs
  if (inputs.annualRevenue >= 5000) tractionScore += 8;
  else if (inputs.annualRevenue >= 1000) tractionScore += 6;
  else if (inputs.annualRevenue >= 200) tractionScore += 4;
  else if (inputs.annualRevenue >= 50) tractionScore += 2;
  else tractionScore += 0;

  // Growth score
  if (inputs.monthlyGrowth >= 20) tractionScore += 9;
  else if (inputs.monthlyGrowth >= 10) tractionScore += 7;
  else if (inputs.monthlyGrowth >= 5) tractionScore += 4;
  else if (inputs.monthlyGrowth >= 2) tractionScore += 2;
  else tractionScore += 0;

  tractionScore = Math.min(25, tractionScore);

  // --- Team score (0–20) ---
  let teamScore = 0;
  teamScore += FOUNDER_EXPERIENCE_SCORES[inputs.founderExperience];
  // Team size bonus (early stage efficiency vs scale)
  if (inputs.teamSize >= 2 && inputs.teamSize <= 10) teamScore = Math.min(20, teamScore);
  else if (inputs.teamSize > 10 && inputs.teamSize <= 50) teamScore = Math.min(20, teamScore + 0);
  else if (inputs.teamSize > 50) teamScore = Math.min(20, teamScore + 0);
  teamScore = Math.min(20, teamScore);

  // --- Market score (0–20) ---
  const marketScore = MARKET_SIZE_SCORES[inputs.marketSize];

  // --- Business model score (0–20) ---
  const businessScore = Math.round(BUSINESS_MODEL_SCORES[inputs.businessModel]);

  // --- Readiness score (0–15) ---
  let readinessScore = 0;

  // Runway
  if (inputs.runway >= 18) readinessScore += 6;
  else if (inputs.runway >= 12) readinessScore += 4;
  else if (inputs.runway >= 6) readinessScore += 2;
  else readinessScore += 0;

  // Revenue status
  readinessScore += Math.min(5, REVENUE_STATUS_SCORES[inputs.revenueStatus] * 0.3);

  // Funding raised (signals prior investor conviction)
  if (inputs.fundingRaised >= 500) readinessScore += 4;
  else if (inputs.fundingRaised >= 100) readinessScore += 2;
  else if (inputs.fundingRaised >= 10) readinessScore += 1;

  readinessScore = Math.min(15, readinessScore);

  const totalScore = Math.round(
    tractionScore + teamScore + marketScore + businessScore + readinessScore
  );

  const score = Math.min(100, Math.max(0, totalScore));

  // --- Category ---
  let category: FundingScoreResult["category"];
  let categoryColor: string;
  if (score >= 80) {
    category = "Investor Ready";
    categoryColor = "#12372A";
  } else if (score >= 60) {
    category = "Funding Ready";
    categoryColor = "#0D5C63";
  } else if (score >= 40) {
    category = "Building Momentum";
    categoryColor = "#D89B35";
  } else {
    category = "Early Stage";
    categoryColor = "#B65E3C";
  }

  // --- Strengths & Improvements ---
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (inputs.monthlyGrowth >= 10) strengths.push("Strong month-on-month growth trajectory");
  if (inputs.founderExperience === "exited" || inputs.founderExperience === "serial") strengths.push("Proven founder track record");
  if (inputs.marketSize === "massive" || inputs.marketSize === "large") strengths.push("Large addressable market opportunity");
  if (inputs.businessModel === "b2b-saas" || inputs.businessModel === "enterprise") strengths.push("High-quality, recurring business model");
  if (inputs.runway >= 18) strengths.push("Healthy runway giving time to execute");
  if (inputs.annualRevenue >= 1000) strengths.push("Meaningful revenue base established");
  if (inputs.revenueStatus === "profitable") strengths.push("Capital efficiency and profitability demonstrated");
  if (inputs.fundingRaised >= 500) strengths.push("Prior investor validation in place");

  if (inputs.monthlyGrowth < 5) improvements.push("Accelerate monthly growth rate — investors want to see momentum");
  if (inputs.runway < 12) improvements.push("Extend runway before entering a fundraise process");
  if (inputs.founderExperience === "first-time") improvements.push("Bring on domain advisors or experienced co-founders");
  if (inputs.annualRevenue < 200 && inputs.stage !== "idea" && inputs.stage !== "mvp") improvements.push("Focus on reaching meaningful revenue milestones");
  if (inputs.marketSize === "niche") improvements.push("Articulate the path to a larger addressable market");
  if (inputs.teamSize < 3) improvements.push("Strengthen the core team before institutional fundraising");
  if (inputs.revenueStatus === "pre-revenue") improvements.push("Achieve early revenue validation to de-risk for investors");

  // Ensure we always have at least one of each
  if (strengths.length === 0) strengths.push("Clear vision and early-stage commitment");
  if (improvements.length === 0) improvements.push("Continue building product–market fit evidence");

  // --- Next Steps ---
  const nextSteps: string[] = [];
  if (score >= 80) {
    nextSteps.push("Prepare your data room and investment materials");
    nextSteps.push("Target Series A or growth-stage funds aligned to your sector");
    nextSteps.push("Engage advisors to optimise your cap table before the raise");
  } else if (score >= 60) {
    nextSteps.push("Build a targeted list of seed and pre-series A investors");
    nextSteps.push("Sharpen your pitch with a clear narrative around traction");
    nextSteps.push("Strengthen your 18-month roadmap and hiring plan");
  } else if (score >= 40) {
    nextSteps.push("Focus on 2–3 core growth levers before approaching investors");
    nextSteps.push("Establish product–market fit with 10–20 reference customers");
    nextSteps.push("Consider angel funding to extend runway and build credibility");
  } else {
    nextSteps.push("Validate your core hypothesis with real users before fundraising");
    nextSteps.push("Build an MVP and gather early customer feedback");
    nextSteps.push("Explore grants, accelerators, and founder communities for support");
  }

  // --- Summary ---
  const summaries: Record<FundingScoreResult["category"], string> = {
    "Investor Ready":
      "Your startup shows strong signals across traction, team, and market opportunity. You are well-positioned to approach institutional investors. Focus on narrative sharpness and a clean data room.",
    "Funding Ready":
      "You have a solid foundation with clear market potential. A few targeted improvements in traction or readiness will meaningfully strengthen your fundraising story.",
    "Building Momentum":
      "You are making real progress. Prioritise growth milestones and product–market fit before entering a formal fundraising process.",
    "Early Stage":
      "You are in the exciting, demanding early phase. This is the right time to validate and build — funding will follow the evidence.",
  };

  return {
    score,
    category,
    categoryColor,
    breakdown: {
      traction: Math.round(tractionScore),
      team: Math.round(teamScore),
      market: Math.round(marketScore),
      business: Math.round(businessScore),
      readiness: Math.round(readinessScore),
    },
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 3),
    nextSteps,
    summary: summaries[category],
  };
}
