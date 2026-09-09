"use client";

/*
 * Editorial
 * Purpose: "India is Rising" section on the home page.
 * The article grid has moved to /editorial (app/editorial/page.tsx).
 * Content is maintained via public/editorial/articles.md.
 */

import IndiaRising from "./IndiaRising";

export default function Editorial() {
  return (
    <section
      id="editorial"
      className="relative overflow-hidden"
      aria-label="India is Rising"
    >
      <IndiaRising />
    </section>
  );
}
