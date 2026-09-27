"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Tracks which section currently owns the viewport, for the navbar's active
 * item. A single observer watches a horizontal band across the middle of the
 * screen: whichever section crosses it is "current", which behaves better than
 * comparing scroll offsets when sections have very different heights.
 *
 * Returns `null` when none of the ids exist on the page (e.g. on /projects),
 * so the navbar simply shows no active item there.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  /** Lets a nav click highlight its target immediately, before scrolling ends. */
  const markActive = useCallback((id: string) => setActiveSection(id), []);

  return { activeSection, markActive };
}