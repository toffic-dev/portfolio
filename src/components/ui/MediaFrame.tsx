import Image from "next/image";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type Aspect = "video" | "wide" | "square" | "portrait" | "tall";

const ASPECTS: Record<Aspect, string> = {
  video: "aspect-video",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
};

interface MediaFrameProps {
  /** `null` / `undefined` renders the "asset pending" placeholder frame. */
  src?: string | null;
  alt: string;
  /** Monospace caption shown in the placeholder state. */
  label?: string;
  /** Secondary line explaining where to put the real file. */
  hint?: string;
  aspect?: Aspect;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Scales the image slightly on hover (the parent needs `group`). */
  zoom?: boolean;
}

/**
 * One component for every screenshot, certificate scan and profile photo.
 *
 * When an asset exists it renders an optimised `next/image`; when it does not,
 * it renders the designed dashed frame so the layout never collapses and it is
 * obvious which assets are still missing.
 */
export function MediaFrame({
  src,
  alt,
  label = "[ASSET PENDING]",
  hint,
  aspect = "video",
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  zoom = true,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        ASPECTS[aspect],
        src ? "border border-line bg-elevated" : "media-frame scan-sweep",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-[900ms] ease-out-soft",
            zoom && "group-hover:scale-[1.03]",
            imageClassName
          )}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface/70 text-muted">
            <Layers className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="meta text-muted">{label}</span>
          {hint && <span className="meta-sm max-w-xs text-muted">{hint}</span>}
        </div>
      )}
    </div>
  );
}