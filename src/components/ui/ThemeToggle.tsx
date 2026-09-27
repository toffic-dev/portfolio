"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Dark / light switch.
 *
 * Which glyph is visible is decided by CSS (`dark:` variant) rather than React
 * state, so the icon matches the theme the bootstrap script already painted —
 * no flash, and nothing to hydrate incorrectly. The button stays a plain
 * button with a stable accessible name.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark and light theme"
      title="Toggle dark and light theme"
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent",
        className
      )}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Moon
          aria-hidden="true"
          className="absolute inset-0 h-[18px] w-[18px] transition-opacity duration-300 dark:opacity-0"
        />
        <Sun
          aria-hidden="true"
          className="absolute inset-0 h-[18px] w-[18px] opacity-0 transition-opacity duration-300 dark:opacity-100"
        />
      </span>
    </button>
  );
}