"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeChoice = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-theme";

interface ThemeContextValue {
  /** What the visitor picked (`system` until they choose explicitly). */
  choice: ThemeChoice;
  /** What is actually on screen right now. */
  resolved: ResolvedTheme;
  setChoice: (choice: ThemeChoice) => void;
  /** Flips to the opposite of the currently rendered theme. */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** The stored preference, or `system` when nothing has been chosen yet. */
function readStoredChoice(): ThemeChoice {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    /* Storage can be unavailable (private mode); fall back to the system. */
    return "system";
  }
}

function resolveChoice(choice: ThemeChoice): ResolvedTheme {
  return choice === "system" ? readSystemTheme() : choice;
}

/**
 * Applies a theme to <html> exactly the way the inline bootstrap script in
 * `app/layout.tsx` does — class, `data-theme` and `color-scheme` together, so
 * the stylesheet keeps working even if one of them is stripped.
 */
function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

/**
 * Client-side theme state.
 *
 * The *initial* paint is handled by the inline script in the root layout (that
 * is what prevents a flash of the wrong theme). The state below is initialised
 * lazily from exactly the same sources — stored choice, otherwise the operating
 * system — so it agrees with the DOM from the very first render without an
 * effect that would cause a second render pass.
 *
 * Nothing in the tree renders different markup per theme (the toggle's icons are
 * switched by CSS), so this cannot produce a hydration mismatch.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(readStoredChoice);
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    resolveChoice(readStoredChoice())
  );

  /* Follow the operating system while the choice is still "system". */
  useEffect(() => {
    if (choice !== "system") return;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      const next: ResolvedTheme = event.matches ? "dark" : "light";
      setResolved(next);
      applyTheme(next);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [choice]);

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next);

    if (next === "system") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      const systemTheme = readSystemTheme();
      setResolved(systemTheme);
      applyTheme(systemTheme);
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    setResolved(next);
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    // Read from the DOM rather than state: the bootstrap script may have set a
    // theme before this component ever mounted.
    const isDark = document.documentElement.classList.contains("dark");
    setChoice(isDark ? "light" : "dark");
  }, [setChoice]);

  const value = useMemo<ThemeContextValue>(
    () => ({ choice, resolved, setChoice, toggle }),
    [choice, resolved, setChoice, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}