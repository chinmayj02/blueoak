/**
 * parseArticles
 * Parses the custom ---article---/---end--- markdown format from
 * public/editorial/articles.md into a typed array of articles.
 *
 * Format per article block:
 *   ---article---
 *   id: some-slug
 *   category: Ecosystem
 *   title: Full title text
 *   excerpt: Short excerpt text
 *   readTime: 5 min
 *   date: Aug 2026
 *   image: https://...
 *   imageAlt: Alt text
 *   featured: true          ← optional, omit for false
 *
 *   ## Optional markdown body
 *   Full article body in markdown...
 *   ---end---
 */

export interface ParsedArticle {
  id:        string;
  category:  string;
  title:     string;
  excerpt:   string;
  readTime:  string;
  date:      string;
  image:     string;
  imageAlt:  string;
  featured:  boolean;
  bodyMd:    string;   // raw markdown body (everything after the blank line following fields)
}

export function parseArticles(raw: string): ParsedArticle[] {
  const articles: ParsedArticle[] = [];

  // Split on ---article--- delimiters
  const blocks = raw.split(/^---article---/m).slice(1); // first chunk is preamble

  for (const block of blocks) {
    const endIdx = block.indexOf("---end---");
    const content = endIdx >= 0 ? block.slice(0, endIdx) : block;

    // Split fields from body: fields are the leading lines before a blank line
    const lines      = content.split("\n");
    const fields: Record<string, string> = {};
    let bodyStart    = lines.length;

    // Read key: value lines until we hit a blank line or a markdown heading
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const kv   = line.match(/^([a-zA-Z]+)\s*:\s*(.*)/);
      if (kv) {
        fields[kv[1].trim().toLowerCase()] = kv[2].trim();
      } else if (line.trim() === "" && Object.keys(fields).length > 0) {
        bodyStart = i + 1;
        break;
      }
    }

    const bodyMd = lines.slice(bodyStart).join("\n").trim();

    // Only include if we got at minimum id + title
    if (fields.id && fields.title) {
      articles.push({
        id:       fields.id       || "",
        category: fields.category || "Editorial",
        title:    fields.title    || "",
        excerpt:  fields.excerpt  || "",
        readTime: fields.readtime || fields.readTime || "5 min",
        date:     fields.date     || "",
        image:    fields.image    || "",
        imageAlt: fields.imagealt || fields.imageAlt || "",
        featured: fields.featured === "true",
        bodyMd,
      });
    }
  }

  return articles;
}
