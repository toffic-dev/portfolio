import { cn } from "@/lib/utils";

interface TagListProps {
  items: readonly string[];
  className?: string;
  /** Shows every tag on one clipped row instead of wrapping. */
  clamp?: boolean;
  max?: number;
}

/**
 * Monospace technology chips. Purely presentational — no proficiency claims,
 * no logos required.
 */
export function TagList({ items, className, clamp = false, max }: TagListProps) {
  const visible = max ? items.slice(0, max) : items;
  const hidden = max ? items.length - visible.length : 0;

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-1.5",
        clamp && "overflow-hidden",
        className
      )}
    >
      {visible.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
      {hidden > 0 && <li className="tag">+{hidden}</li>}
    </ul>
  );
}