"use client";

/*
 * Stats
 * Purpose: Compact statistic tiles used on the homepage.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  color: string;
}

const stats: StatItem[] = [
  {
    value: "140,000+",
    numericValue: 140000,
    suffix: "+",
    label: "Startups",
    sublabel: "DPIIT-recognized startups in India (illustrative)",
    color: "#0D5C63",
  },
  {
    value: "115+",
    numericValue: 115,
    suffix: "+",
    label: "Unicorns",
    sublabel: "Billion-dollar companies built from India (illustrative)",
    color: "#D89B35",
  },
  {
    value: "₹7T+",
    numericValue: 7,
    suffix: "T+",
    prefix: "₹",
    label: "Ecosystem Value",
    sublabel: "Combined ecosystem valuation estimate (illustrative)",
    color: "#12372A",
  },
  {
    value: "3rd",
    numericValue: 3,
    suffix: "rd",
    label: "Globally",
    sublabel: "India's rank in startup ecosystems worldwide (illustrative)",
    color: "#B65E3C",
  },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const run = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, active]);

  return count;
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.numericValue, 1800, active);

  const displayValue = () => {
    if (stat.prefix === "₹") return `₹${count}${stat.suffix}`;
    if (stat.numericValue >= 1000) return `${count.toLocaleString("en-IN")}${stat.suffix}`;
    return `${count}${stat.suffix}`;
  };

  return (
    <div className="relative group p-6 sm:p-8 rounded-2xl bg-white/70 border border-ivory-sand/60 hover:border-oak-teal/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Color accent */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full transition-all duration-300 group-hover:left-4 group-hover:right-4"
        style={{ background: stat.color }}
      />

      <div
        className="stat-number leading-none"
        style={{
          color: stat.color,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.03em",
        }}
        aria-label={stat.value}
      >
        {displayValue()}
      </div>

      <div className="mt-3">
        <div className="text-sm font-semibold text-ink">{stat.label}</div>
        <div className="mt-1 text-xs text-ink-subtle leading-relaxed">{stat.sublabel}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="India startup ecosystem statistics">
      {stats.map((stat) => (
        <div key={stat.label} role="listitem">
          <StatCard stat={stat} active={visible} />
        </div>
      ))}
      <div className="col-span-2 lg:col-span-4">
        <p className="text-center text-[10px] text-ink-subtle/60 italic">
          All statistics are illustrative estimates only and are not verified real-time data. Sources and accuracy should be confirmed before publication.
        </p>
      </div>
    </div>
  );
}
