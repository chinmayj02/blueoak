"use client";

/*
 * PartnershipCta
 * Purpose: Pre-footer CTA — text top-left, rocket absolutely overlaid right-bottom.
 * Single image (rocket-launch.png). Width clamp drives size across all breakpoints.
 */

const pills = [
  {
    label: "Dream\nBig",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke="#0D5C63" strokeWidth="2" />
        <circle cx="16" cy="16" r="2.5" fill="#0D5C63" />
        <path d="M16 7v3M16 22v3M7 16h3M22 16h3" stroke="#0D5C63" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 12l-5.5 3.5-2 5.5 5.5-3.5 2-5.5z" fill="#0D5C63" opacity="0.85" />
      </svg>
    ),
  },
  {
    label: "Build\nFearlessly",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M16 28V14" stroke="#0D5C63" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 14c0 0-7-2-7-8 0 0 6 0 7 8z" fill="#0D5C63" opacity="0.7" />
        <path d="M16 18c0 0 6-2 6-7 0 0-5 0-6 7z" fill="#0D5C63" opacity="0.85" />
        <path d="M10 28h12" stroke="#0D5C63" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Scale\nImpact",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M6 24l7-8 5 4 8-11" stroke="#0D5C63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 9h5v5" stroke="#0D5C63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 28h20" stroke="#0D5C63" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

export default function PartnershipCta() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Start your journey"
      style={{
        background:
          "linear-gradient(160deg, #FFFFFF 0%, #E8F4F8 35%, #C5DFE8 70%, #A8CDD8 100%)",
        overflow: "hidden",
      }}
    >
      {/* ── Hero block ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          /*
           * Mobile  : tall portrait rocket drives height (~63vw for a 55vw-wide image)
           * Desktop : landscape rocket is shorter — cap keeps it from being too tall
           */
          minHeight: "clamp(360px, 63vw, 680px)",
        }}
      >

        {/*
          <picture> swaps sources at the CSS breakpoint:
            ≥ 768px  → landscape desktop image, width = 65% of section (clouds fill base)
            < 768px  → portrait mobile image,   width = 68vw (fills right side of phone)
          Both anchor bottom-right so clouds always kiss the floor.
        */}
        <picture
          aria-hidden="true"
          className="rocket-picture"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {/* Desktop: landscape image — switched in at 768px+ */}
          <source
            srcSet="/rocket-launch-desktop.png"
            media="(min-width: 768px)"
          />
          {/* Mobile: portrait image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rocket-launch.png"
            alt=""
            style={{
              display: "block",
              /*
               * Mobile (<768px) : 68vw — fills right ~2/3 of phone, clouds hug the base
               * Desktop (≥768px): 65%  — landscape image spans right 65% of section
               * The media query below overrides the mobile default.
               */
              width: "98vw",
              height: "auto",
            }}
          />
        </picture>
        <style>{`
          @media (min-width: 768px) {
            .rocket-picture img { width: 98vw; }
          }
        `}</style>

        {/* ── Text — layered above rocket ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "clamp(2.25rem, 6vw, 5rem)",
            paddingBottom: "clamp(2rem, 4vw, 3rem)",
            paddingLeft: "clamp(1.25rem, 5vw, 5rem)",
            /*
             * Constrain text width so it doesn't bleed into the rocket.
             * Mobile: text in left ~45% (rocket is 68vw from right, slight overlap is fine)
             * Desktop: text in left ~35% (rocket is 65% wide from right)
             */
            maxWidth: "clamp(180px, 42%, 480px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.85rem, 4.5vw, 3.4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#0D1210",
              fontWeight: 700,
              marginBottom: "0.85rem",
            }}
          >
            Your next<br />chapter starts<br />here.
          </h2>

          <p
            style={{
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              lineHeight: 1.6,
              color: "#2E4040",
              marginBottom: "1.75rem",
            }}
          >
            Let&apos;s build the future<br />of Bharat together.
          </p>

          <button
            onClick={() => scrollTo("contact")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.12)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.filter = "";
              (e.currentTarget as HTMLButtonElement).style.transform = "";
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#0D5C63",
              color: "#F6F1E8",
              padding: "0.75rem 1.6rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(13,92,99,0.30)",
              transition: "filter 0.2s, transform 0.2s",
            }}
          >
            Start Your Journey
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Three icon pills ─────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            height: "1px",
            background: "rgba(13,92,99,0.15)",
            margin: "0 clamp(1.25rem, 5vw, 5rem)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "1.5rem clamp(1.25rem, 5vw, 2rem) 1.75rem",
          }}
        >
          {pills.map((pill) => (
            <div
              key={pill.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.875rem",
                  background: "rgba(13,92,99,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {pill.icon}
              </div>
              <span
                style={{
                  whiteSpace: "pre-line",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  lineHeight: 1.4,
                  color: "#1C2420",
                }}
              >
                {pill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
