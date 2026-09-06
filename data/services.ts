export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: string; // emoji or short text symbol
}

export const services: Service[] = [
  {
    id: "investment",
    number: "01",
    title: "Investment",
    description: "Capital for ambitious founders building scalable businesses.",
    detail:
      "We back early and growth-stage founders with conviction capital — not just a cheque, but a committed partner who understands the Indian market and global ambitions.",
    icon: "◈",
  },
  {
    id: "strategic-advisory",
    number: "02",
    title: "Strategic Advisory",
    description: "Hands-on guidance across growth, positioning, fundraising, and operations.",
    detail:
      "Our team brings deep operational experience across sectors. We work alongside founders on strategy, not just from the boardroom.",
    icon: "◎",
  },
  {
    id: "founder-network",
    number: "03",
    title: "Founder Network",
    description: "Access to a curated ecosystem of founders, operators, and domain experts.",
    detail:
      "The BlueOak network spans successful founders, senior operators, and specialists across technology, finance, and policy — available to our portfolio.",
    icon: "◉",
  },
  {
    id: "market-access",
    number: "04",
    title: "Market Access",
    description: "Support for entering new markets and building strategic partnerships.",
    detail:
      "Whether expanding within India or going global, we open doors that take years to build — connections, introductions, and the trust that comes with the BlueOak relationship.",
    icon: "◍",
  },
  {
    id: "fundraising-support",
    number: "05",
    title: "Fundraising Support",
    description: "Preparation, positioning, investor strategy, and fundraising readiness.",
    detail:
      "We help founders tell their story with clarity and confidence. From pitch architecture to investor targeting, we navigate the fundraising process together.",
    icon: "◐",
  },
  {
    id: "talent-hiring",
    number: "06",
    title: "Talent & Hiring",
    description: "Connecting startups with the exceptional talent that drives growth.",
    detail:
      "Great companies are built by great teams. We leverage our network to help portfolio companies attract engineers, operators, and leaders who are as ambitious as the founders.",
    icon: "◑",
  },
];
