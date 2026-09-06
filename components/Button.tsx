"use client";

/*
 * Button component
 * Purpose: Reusable button used across the application.
 * Authors: Shreya Joshi, Chinmay Joshi
 * Notes: Keep variants and sizes centralized for consistency.
 */

import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  as: Tag = "button",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none";

  const variants = {
    primary:
      "bg-oak-teal text-ivory hover:bg-oak-forest focus-visible:ring-oak-teal shadow-sm hover:shadow-glow-teal hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "border border-oak-teal/30 text-oak-teal hover:border-oak-teal hover:bg-oak-teal/8 focus-visible:ring-oak-teal hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "text-ink hover:text-oak-forest hover:bg-oak-forest/6 focus-visible:ring-oak-forest",
    gold:
      "bg-gold text-oak-dark hover:bg-gold-dark focus-visible:ring-gold shadow-sm hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-wide",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (Tag === "a") {
    return (
      <a href={href} className={classes}>
        {children}
        {arrow && (
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </a>
    );
  }

  return (
    <button className={`group ${classes}`} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
