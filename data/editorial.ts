export interface EditorialArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string; // Unsplash URL or gradient fallback
  imageAlt: string;
  featured?: boolean;
}

export const editorialArticles: EditorialArticle[] = [
  {
    id: "india-next-startup-hubs",
    category: "Ecosystem",
    title: "Beyond Bangalore: India's Next Startup Hubs Are Already Building",
    excerpt:
      "Tier-2 cities are no longer incubators — they are emerging as independent innovation centres with distinct strengths and founder communities.",
    readTime: "5 min",
    date: "Aug 2026",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&q=80",
    imageAlt: "Indian city skyline with modern buildings",
    featured: true,
  },
  {
    id: "deeptech-india",
    category: "Deeptech",
    title: "India's Deeptech Moment Has Arrived",
    excerpt:
      "From semiconductors to space to biotech, Indian founders are no longer limiting ambition to software. The hard-tech revolution is quietly underway.",
    readTime: "7 min",
    date: "Jul 2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    imageAlt: "Technology research laboratory",
  },
  {
    id: "manufacturing-india",
    category: "Manufacturing",
    title: "Make in India, Sell to the World",
    excerpt:
      "A new generation of manufacturing-native startups is combining Indian production capability with global-first ambition — and investors are paying attention.",
    readTime: "6 min",
    date: "Jun 2026",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
    imageAlt: "Modern manufacturing facility",
  },
  {
    id: "ai-indian-enterprise",
    category: "AI & Enterprise",
    title: "AI Is Rewriting Indian Enterprise from the Ground Up",
    excerpt:
      "Artificial intelligence isn't arriving in India — it's being built here. Indian AI startups are moving from services to products at a pace that's surprising global observers.",
    readTime: "8 min",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    imageAlt: "AI and technology visualization",
  },
  {
    id: "bharat-consumer",
    category: "Consumer",
    title: "The Bharat Consumer: 900 Million Reasons to Build Differently",
    excerpt:
      "India's next billion users are not a market segment — they are the market. The founders who understand them will build the defining consumer companies of the decade.",
    readTime: "6 min",
    date: "Apr 2026",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    imageAlt: "Vibrant Indian marketplace",
  },
  {
    id: "global-from-india",
    category: "Global",
    title: "Why the Next Global Software Company Will Be Built in India",
    excerpt:
      "India's combination of engineering talent, cost advantage, and market complexity creates a rare training ground for companies that can compete and win anywhere.",
    readTime: "5 min",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=800&q=80",
    imageAlt: "Modern Indian tech campus",
  },
];
