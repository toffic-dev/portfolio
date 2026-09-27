import { clsx, type ClassValue } from "clsx";
import type { ProjectScreenshot } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Rendered in place of any value the site owner has not filled in yet. */
export const PLACEHOLDER = "[PLACEHOLDER]";

/** True while a data field is still awaiting real content. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /^\[.*\]$/.test(value.trim());
}

/**
 * `2026-03` → `Mar 2026`. Returns `undefined` for absent or unparseable input
 * so optional metadata can simply not render.
 */
export function formatMonth(value?: string): string | undefined {
  if (!value) return undefined;
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
  if (!match) return value.trim();

  const [, year, month] = match;
  const index = Number(month) - 1;
  if (Number.isNaN(index) || index < 0 || index > 11) return value.trim();

  const label = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][index];

  return `${label} ${year}`;
}

/** `2026-03-14` → `14 Mar 2026`. */
export function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value.trim();

  const [, year, month, day] = match;
  const monthLabel = formatMonth(`${year}-${month}`);
  return monthLabel ? `${Number(day)} ${monthLabel}` : value.trim();
}

/** Two-letter monogram used when a profile image is not supplied yet. */
export function getInitials(name: string): string {
  const cleaned = name.replace(/[^A-Za-z\s]/g, "").trim();
  if (!cleaned) return "?";

  return cleaned
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Slugifies a technology name into a stable key (`Next.js` → `next-js`). */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Links still waiting on a real destination. Until the owner supplies a URL the
 * data files use `"#"`, and components render those as clearly-marked
 * placeholders rather than broken external links.
 */
export function isPendingLink(href?: string): boolean {
  if (!href) return true;
  const value = href.trim();
  return value === "#" || value === "" || isPlaceholder(value);
}

/**
 * Returns the href only when it points somewhere real, otherwise `undefined` —
 * which lets components narrow the type with a simple `&&` before handing the
 * value to a link.
 */
export function usableLink(href?: string): string | undefined {
  return isPendingLink(href) ? undefined : href;
}

/**
 * Image fit for a project screenshot inside a fixed-ratio media frame.
 *
 * `undefined` keeps `MediaFrame`'s default `object-cover`, which is correct for
 * an ordinary 16:9 capture. A `fit: "contain"` asset letterboxes instead: the
 * featured panel and gallery frames are 16:10, so a much wider capture would
 * otherwise be cropped through the UI at both edges instead of through empty
 * page margin.
 */
export function screenshotFitClass(
  asset?: ProjectScreenshot | null
): string | undefined {
  return asset?.fit === "contain" ? "object-contain" : undefined;
}