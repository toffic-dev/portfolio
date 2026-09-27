"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset for sibling blocks, in milliseconds. */
  delay?: number;
  /** `x` slides in from the left instead of rising. */
  axis?: "y" | "x";
}

/**
 * Fades (and lifts) its children into view the first time they scroll on
 * screen.
 *
 * The hidden "before" state lives in the stylesheet behind
 * `html[data-reveal="ready"]`, which the root layout only sets when
 * IntersectionObserver exists — so visitors without JavaScript, or with
 * `prefers-reduced-motion`, get plain visible content.
 */
export function Reveal({ children, className, delay = 0, axis = "y" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setIsVisible(true);
          observer.disconnect();
          return;
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-axis={axis}
      className={cn("reveal", isVisible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}