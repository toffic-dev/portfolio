import { Activity } from "lucide-react";
import { site } from "@/data/site";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/utils";

/**
 * "Currently building" panel.
 *
 * The bar is decorative — it communicates momentum, not a completion
 * percentage, so no number is claimed anywhere. Content lives in `site.ts`.
 */
export function CurrentlyBuilding({ className }: { className?: string }) {
  const { currentlyBuilding } = site;

  return (
    <div
      className={cn(
        "card sheen-top relative overflow-hidden rounded-xl p-5 shadow-card backdrop-blur-sm",
        "bg-[color-mix(in_oklab,var(--surface)_92%,transparent)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="meta flex items-center gap-2 text-muted">
          <Activity aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
          {currentlyBuilding.title}
        </span>
        <span className="meta flex items-center gap-2 text-ok">
          <StatusDot tone="ok" pulse />
          {currentlyBuilding.status}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="mt-4 flex h-1.5 w-full gap-1 overflow-hidden rounded-full"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-full flex-1 rounded-full",
              index < 13 ? "bg-accent/70" : "bg-line-strong/60"
            )}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {currentlyBuilding.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-ink-soft"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            <span className="meta-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}