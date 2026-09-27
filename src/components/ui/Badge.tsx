import { cn } from "@/lib/utils";
import type { ProjectState } from "@/types";

export type BadgeTone = "neutral" | "accent" | "ok" | "warn" | "muted";

const TONES: Record<BadgeTone, string> = {
  neutral: "border-line bg-surface text-ink-soft",
  accent: "border-accent/35 bg-accent/10 text-accent",
  ok: "border-ok/35 bg-ok/10 text-ok",
  warn: "border-warn/40 bg-warn/10 text-warn",
  muted: "border-line bg-[color-mix(in_oklab,var(--ink)_5%,transparent)] text-muted",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
  title?: string;
}

/** Small uppercase monospace label: statuses, categories, eyebrow text. */
export function Badge({ children, tone = "neutral", className, title }: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        "meta inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * The marker used everywhere placeholder content is rendered, so an unfinished
 * site never reads as a finished one.
 */
export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <Badge tone="warn" className={className} title="This content is placeholder data">
      Placeholder data
    </Badge>
  );
}

/** Label and tone per lifecycle state — one source, so no state can go unlabelled. */
const STATE_BADGES: Record<
  Exclude<ProjectState, "placeholder">,
  { label: string; tone: BadgeTone }
> = {
  "in-progress": { label: "In progress", tone: "accent" },
  completed: { label: "Completed", tone: "ok" },
  shipped: { label: "Shipped", tone: "ok" },
};

/** Project lifecycle chip: placeholder / in progress / completed / shipped. */
export function StateBadge({
  state,
  className,
}: {
  state: ProjectState;
  className?: string;
}) {
  if (state === "placeholder") return <PlaceholderBadge className={className} />;

  const { label, tone } = STATE_BADGES[state];

  return (
    <Badge tone={tone} className={className}>
      {label}
    </Badge>
  );
}