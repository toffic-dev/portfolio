import { cn } from "@/lib/utils";

export type DotTone = "ok" | "accent" | "muted" | "warn";

const DOT_TONES: Record<DotTone, string> = {
  ok: "bg-ok",
  accent: "bg-accent",
  muted: "bg-muted",
  warn: "bg-warn",
};

/** Status indicator used for availability, system state and experiment rows. */
export function StatusDot({
  tone = "ok",
  pulse = false,
  className,
}: {
  tone?: DotTone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
        DOT_TONES[tone],
        pulse && "animate-pulse-dot",
        className
      )}
    />
  );
}

interface StatusPillProps {
  label: string;
  tone?: DotTone;
  pulse?: boolean;
  detail?: string;
  className?: string;
}

/**
 * The "available for opportunities" style indicator: a dotted outline pill with
 * a live dot in front of the label.
 */
export function StatusPill({
  label,
  tone = "ok",
  pulse = true,
  detail,
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 backdrop-blur-sm",
        className
      )}
    >
      <StatusDot tone={tone} pulse={pulse} />
      <span className="meta text-ink-soft">{label}</span>
      {detail && <span className="meta-sm text-muted">{detail}</span>}
    </span>
  );
}