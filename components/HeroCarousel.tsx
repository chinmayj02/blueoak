"use client";

/*
 * HeroCarousel
 * Purpose: Horizontal carousel of hero cards with autoplay and drag support.
 * Authors: Shreya Joshi, Chinmay Joshi
 * Notes: Keeps focus/keyboard accessibility and pauses on interaction.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import HeroCard from "./HeroCard";
import { heroCards } from "@/data/heroCards";

interface HeroCarouselProps {
  cardH: number;
  cardW: number;
  activeIndex: number;
  onActiveChange: (i: number) => void;
}

export default function HeroCarousel({ cardH, cardW, activeIndex, onActiveChange }: HeroCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX   = useRef(0);
  const dragDelta    = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef    = useRef(false);
  const total        = heroCards.length;

  const goTo = useCallback((i: number) => onActiveChange(((i % total) + total) % total), [total, onActiveChange]);
  const next  = useCallback(() => { pausedRef.current = true; goTo(activeIndex + 1); }, [activeIndex, goTo]);
  const prev  = useCallback(() => { pausedRef.current = true; goTo(activeIndex - 1); }, [activeIndex, goTo]);

  useEffect(() => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    autoplayRef.current = setTimeout(() => {
      if (!pausedRef.current) goTo(activeIndex + 1);
      pausedRef.current = false;
    }, 5000);
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current); };
  }, [activeIndex, goTo]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const onDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX; dragDelta.current = 0;
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => { if (isDragging) dragDelta.current = e.clientX - dragStartX.current; };
  const onUp   = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDelta.current < -40) next();
    else if (dragDelta.current > 40) prev();
  };

  const getPos = (i: number) => {
    let pos = i - activeIndex;
    if (pos < -1) pos += total;
    return pos;
  };

  return (
    /*
     * Perspective container — shared vanishing point at top-center.
     * perspectiveOrigin: "50% 0%" means the VP is at the horizontal center
     * and the very top of the container. Cards rotate away from the viewer
     * downward, matching the reference where farther cards recede toward the
     * bottom-right.
     *
     * Width is wide enough so the rightmost card (pos +3) doesn't clip.
     * We give the stage extra horizontal space beyond cardW.
     */
    <div
      ref={containerRef}
      className={`relative w-full h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        perspective:       "1200px",
        perspectiveOrigin: "50% 25%",
        overflow:          "visible",
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="region"
      aria-label="Startup journey cards"
      aria-roledescription="carousel"
    >
      {heroCards.map((card, i) => {
        const pos = getPos(i);
        if (Math.abs(pos) > 4) return null;
        return (
          <HeroCard
            key={card.id}
            id={card.id}
            number={card.number}
            title={card.title}
            description={card.description}
            isActive={i === activeIndex}
            position={pos}
            cardH={cardH}
            cardW={cardW}
            onClick={() => { pausedRef.current = true; goTo(i); }}
            tabIndex={i === activeIndex ? 0 : -1}
          />
        );
      })}
    </div>
  );
}
