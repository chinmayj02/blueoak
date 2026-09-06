export interface StartupCity {
  id: string;
  name: string;
  shortName: string;
  // SVG coordinate positions on India map (percentage-based from top-left)
  x: number; // percentage from left
  y: number; // percentage from top
  tier: "primary" | "secondary" | "emerging";
  tagline: string;
  sectors: string[];
  highlight: string;
  fundingNote: string; // illustrative only — not verified live data
  founderCount: string; // illustrative
}

// NOTE: All statistics and data below are illustrative/sample only.
// They are NOT verified real-time data and should be replaced with
// accurate sourced data before publication.
export const startupCities: StartupCity[] = [
  {
    id: "bangalore",
    name: "Bangalore",
    shortName: "BLR",
    x: 38,
    y: 74,
    tier: "primary",
    tagline: "India's Silicon Valley",
    sectors: ["SaaS", "Deeptech", "Fintech", "AI/ML", "Gaming"],
    highlight: "Home to India's densest concentration of tech talent and unicorns",
    fundingNote: "Largest share of Indian startup funding (illustrative)",
    founderCount: "25,000+ startups (illustrative)",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    shortName: "BOM",
    x: 27,
    y: 58,
    tier: "primary",
    tagline: "Financial Capital & Media Hub",
    sectors: ["Fintech", "Media", "D2C", "Real Estate Tech", "BFSI"],
    highlight: "India's financial powerhouse and consumer brand birthplace",
    fundingNote: "Leading fintech and media funding destination (illustrative)",
    founderCount: "18,000+ startups (illustrative)",
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR",
    shortName: "DEL",
    x: 36,
    y: 28,
    tier: "primary",
    tagline: "Policy, Platform & Scale",
    sectors: ["Edtech", "Logistics", "D2C", "Govtech", "Agritech"],
    highlight: "Proximity to policy corridors and North India's consumer base",
    fundingNote: "Strong edtech and logistics ecosystem (illustrative)",
    founderCount: "20,000+ startups (illustrative)",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    shortName: "HYD",
    x: 42,
    y: 63,
    tier: "primary",
    tagline: "Pharma, Life Sciences & Tech",
    sectors: ["Pharmatech", "Biotech", "IT Services", "Cybersecurity", "Agritech"],
    highlight: "World-class pharma infrastructure meets a rising startup culture",
    fundingNote: "Emerging biotech and cybersecurity hub (illustrative)",
    founderCount: "12,000+ startups (illustrative)",
  },
  {
    id: "chennai",
    name: "Chennai",
    shortName: "MAA",
    x: 41,
    y: 79,
    tier: "secondary",
    tagline: "Manufacturing & Hardware",
    sectors: ["Manufacturing", "Hardware", "Automotive Tech", "SaaS", "Healthtech"],
    highlight: "Deep engineering roots and a growing product startup scene",
    fundingNote: "Strong B2B SaaS and manufacturing tech base (illustrative)",
    founderCount: "8,000+ startups (illustrative)",
  },
  {
    id: "pune",
    name: "Pune",
    shortName: "PNQ",
    x: 29,
    y: 62,
    tier: "secondary",
    tagline: "Education & Engineering",
    sectors: ["Edtech", "Manufacturing", "Fintech", "IoT", "Clean Energy"],
    highlight: "Dense university ecosystem feeding a technically strong talent pool",
    fundingNote: "Growing edtech and clean energy presence (illustrative)",
    founderCount: "9,000+ startups (illustrative)",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    shortName: "AMD",
    x: 23,
    y: 44,
    tier: "secondary",
    tagline: "Trade, Textiles & Fintech",
    sectors: ["Fintech", "Textile Tech", "Agritech", "D2C", "Logistics"],
    highlight: "Entrepreneurial culture running generations deep",
    fundingNote: "Fintech and agritech growth accelerating (illustrative)",
    founderCount: "6,000+ startups (illustrative)",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    shortName: "JAI",
    x: 32,
    y: 34,
    tier: "emerging",
    tagline: "Heritage, Crafts & Emerging Tech",
    sectors: ["Fashion Tech", "Agritech", "Travel Tech", "D2C", "Edtech"],
    highlight: "Blending heritage craft industries with digital-first distribution",
    fundingNote: "Rising D2C and artisanal tech scene (illustrative)",
    founderCount: "3,000+ startups (illustrative)",
  },
  {
    id: "kochi",
    name: "Kochi",
    shortName: "COK",
    x: 35,
    y: 84,
    tier: "emerging",
    tagline: "Kerala's Startup City",
    sectors: ["Healthtech", "Tourism Tech", "Fintech", "Maritime", "Spacetech"],
    highlight: "High literacy, strong NRI investment, and emerging spacetech ambition",
    fundingNote: "Healthtech and maritime tech on the rise (illustrative)",
    founderCount: "2,500+ startups (illustrative)",
  },
  {
    id: "indore",
    name: "Indore",
    shortName: "IDR",
    x: 32,
    y: 46,
    tier: "emerging",
    tagline: "Heart of India Rising",
    sectors: ["Agritech", "Logistics", "Fintech", "Retail Tech", "Edtech"],
    highlight: "Central India's clean city becoming a clean-slate startup market",
    fundingNote: "Agritech and logistics emerging strongly (illustrative)",
    founderCount: "2,000+ startups (illustrative)",
  },
];
