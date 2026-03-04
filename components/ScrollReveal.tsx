"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "fade-up" | "fade-in" | "scale" | "slide-up-3d";

const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";

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
      { rootMargin: DEFAULT_ROOT_MARGIN, threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [disabled, reduceMotion]);

  const show = disabled || reduceMotion || inView;
  const styleDelay = show ? delay : 0;
  const is3d = variant === "slide-up-3d";

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        variant === "fade-up" && (show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"),
        variant === "fade-in" && (show ? "opacity-100" : "opacity-0"),
        variant === "scale" && (show ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"),
        is3d && (show ? "opacity-100" : "opacity-0"),
        className
      )}
      style={{
        transitionDelay: `${styleDelay}ms`,
        ...(is3d && {
          transform: show
            ? "perspective(900px) translateY(0) rotateX(0deg)"
            : "perspective(900px) translateY(20px) rotateX(8deg)",
        }),
      }}
    >
      {children}
    </div>
  );
}
