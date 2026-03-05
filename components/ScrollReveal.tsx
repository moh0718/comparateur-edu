"use client";

import React, { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "fade-up" | "fade-up-strong" | "fade-in" | "scale" | "slide-up-3d" | "card-3d";

const DEFAULT_ROOT_MARGIN = "0px 0px -5% 0px";
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)"; // ease-out-expo, très fluide

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  delay?: number;
  disabled?: boolean;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  className,
  delay = 0,
  disabled = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (disabled || reduceMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: DEFAULT_ROOT_MARGIN, threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [disabled, reduceMotion]);

  const show = disabled || reduceMotion || inView;
  const styleDelay = show ? delay : 0;
  const is3d = variant === "slide-up-3d";
  const isCard3d = variant === "card-3d";

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000",
        variant === "fade-up" && (show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"),
        variant === "fade-up-strong" && (show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"),
        variant === "fade-in" && (show ? "opacity-100" : "opacity-0"),
        variant === "scale" && (show ? "scale-100 opacity-100" : "scale-95 opacity-0"),
        (is3d || isCard3d) && (show ? "opacity-100" : "opacity-0"),
        className
      )}
      style={{
        transitionDelay: `${styleDelay}ms`,
        transitionTimingFunction: EASING,
        ...(is3d && {
          transform: show
            ? "perspective(1200px) translateZ(0) translateY(0) rotateX(0deg)"
            : "perspective(1200px) translateZ(-40px) translateY(60px) rotateX(18deg)",
        }),
        ...(isCard3d && {
          transform: show
            ? "perspective(1000px) translateZ(0) translateY(0) rotateX(0deg) scale(1)"
            : "perspective(1000px) translateZ(-60px) translateY(80px) rotateX(22deg) scale(0.92)",
        }),
      }}
    >
      {children}
    </div>
  );
}

/** Enveloppe des enfants et les révèle en cascade (stagger). */
interface ScrollRevealStaggerProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
  disabled?: boolean;
}

export function ScrollRevealStagger({
  children,
  className,
  staggerMs = 120,
  disabled = false,
}: ScrollRevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (disabled || reduceMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: DEFAULT_ROOT_MARGIN, threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [disabled, reduceMotion]);

  const show = disabled || reduceMotion || inView;
  const childArray = React.Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <div
          key={i}
          className="transition-all duration-700"
          style={{
            transitionTimingFunction: EASING,
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(24px)",
            transitionDelay: show ? `${i * staggerMs}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
