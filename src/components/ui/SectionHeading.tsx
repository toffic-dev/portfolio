import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Editorial section number, e.g. "02". */
  index?: string;
  /** Monospace eyebrow, e.g. "SKILLS". */
  label: string;
  title?: ReactNode;
  description?: ReactNode;
  /** Optional trailing content (buttons, counters) placed on the right. */
  actions?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

/**
 * The shared heading block every section uses: number → label → display title
 * → description. Keeping it in one component is what makes the page read as a
 * single editorial document rather than stitched-together panels.
 */
export function SectionHeading({
  index,
  label,
  title,
  description,
  actions,
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="meta flex items-center gap-3 text-accent">
          {index && <span>{index}</span>}
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span className="text-muted">{label}</span>
        </span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {title && (
            <h2
              className={cn(
                "font-semibold text-ink",
                size === "lg"
                  ? "text-3xl leading-[1.05] sm:text-4xl lg:text-[2.875rem]"
                  : "text-2xl leading-tight sm:text-3xl"
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}