import Image from "next/image";
import type { IssuerLogo } from "@/types";
import { cn } from "@/lib/utils";

type MarkSize = "sm" | "md";

const BOX: Record<MarkSize, string> = {
  sm: "h-9 w-9 rounded-md",
  md: "h-12 w-12 rounded-lg",
};

const PIXELS: Record<MarkSize, string> = { sm: "36px", md: "48px" };

/**
 * Issuing organisation's mark.
 *
 * Brand badges are drawn for one specific background, so the chip behind the
 * mark does **not** follow dark/light mode (see `--badge-on-light` /
 * `--badge-on-dark`): a coloured badge stays legible in either theme. `tone`
 * states which background the artwork was made for.
 *
 * The chip is marked decorative because the issuer name is always rendered
 * beside it — the `alt` text stays available as a hover title instead of being
 * announced twice.
 *
 * Renders nothing at all when no mark is supplied, so cards without one simply
 * show the issuer name.
 */
export function IssuerMark({
  logo,
  size = "sm",
  className,
}: {
  logo?: IssuerLogo | null;
  size?: MarkSize;
  className?: string;
}) {
  if (!logo) return null;

  return (
    <span
      aria-hidden="true"
      title={logo.alt}
      className={cn(
        "grid shrink-0 place-items-center border",
        BOX[size],
        logo.tone === "on-dark"
          ? "border-white/15 bg-[var(--badge-on-dark)]"
          : "border-line bg-[var(--badge-on-light)]",
        className
      )}
    >
      <Image
        src={logo.src}
        alt=""
        width={48}
        height={48}
        sizes={PIXELS[size]}
        className="h-[64%] w-[64%] object-contain"
      />
    </span>
  );
}