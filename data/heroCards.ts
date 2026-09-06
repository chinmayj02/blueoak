export interface HeroCard {
  id: string;
  number: string;
  title: string;
  description: string;
  // Visual theme colors for the card's abstract illustration
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  // The abstract visual motif for each card
  motif: "lightbulb" | "rocket" | "globe" | "handshake" | "horizon";
}

export const heroCards: HeroCard[] = [
  {
    id: "create",
    number: "01",
    title: "CREATE",
    description: "Turn your idea into something real.",
    primaryColor: "#F6F1E8",
    secondaryColor: "#DCCEB8",
    accentColor: "#0D5C63",
    motif: "lightbulb",
  },
  {
    id: "launch",
    number: "02",
    title: "LAUNCH",
    description: "Bring your vision to the world.",
    primaryColor: "#EDE5D4",
    secondaryColor: "#C8B99A",
    accentColor: "#12372A",
    motif: "rocket",
  },
  {
    id: "scale",
    number: "03",
    title: "SCALE",
    description: "Expand your reach. Multiply your impact.",
    primaryColor: "#F6F1E8",
    secondaryColor: "#DCCEB8",
    accentColor: "#0D5C63",
    motif: "globe",
  },
  {
    id: "fund",
    number: "04",
    title: "FUND",
    description: "Get the right capital to go further.",
    primaryColor: "#EDE5D4",
    secondaryColor: "#C8B99A",
    accentColor: "#D89B35",
    motif: "handshake",
  },
  {
    id: "impact",
    number: "05",
    title: "IMPACT",
    description: "Create lasting change. Build a better tomorrow.",
    primaryColor: "#F6F1E8",
    secondaryColor: "#DCCEB8",
    accentColor: "#12372A",
    motif: "horizon",
  },
];
