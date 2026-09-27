import { Cloud, Code2, Database, Server, Sparkles } from "lucide-react";
import type { ArchitectureLayer, ArchitectureNode } from "@/types";
import { cn } from "@/lib/utils";

const NODE_STYLE: Record<
  ArchitectureNode["kind"],
  { icon: typeof Code2; label: string; className: string }
> = {
  client: {
    icon: Code2,
    label: "Client",
    className: "text-accent",
  },
  service: {
    icon: Server,
    label: "Service",
    className: "text-accent-2",
  },
  data: {
    icon: Database,
    label: "Data",
    className: "text-ok",
  },
  ai: {
    icon: Sparkles,
    label: "AI",
    className: "text-warn",
  },
  external: {
    icon: Cloud,
    label: "External",
    className: "text-muted",
  },
};

/**
 * System architecture renderer.
 *
 * Layers come straight from the project data, so a new diagram is a data change
 * only. Nodes lift and glow on hover; the connectors between layers carry a slow
 * downward dash animation to suggest flow direction (both stop under
 * `prefers-reduced-motion`).
 */
export function ArchitectureDiagram({
  layers,
  className,
}: {
  layers: ArchitectureLayer[];
  className?: string;
}) {
  const kinds = Array.from(new Set(layers.flatMap((layer) => layer.nodes.map((node) => node.kind))));

  return (
    <div className={cn("rounded-xl border border-line bg-[color-mix(in_oklab,var(--canvas)_60%,transparent)] p-5 sm:p-6", className)}>
      <ol className="space-y-0">
        {layers.map((layer, layerIndex) => (
          <li key={layer.label}>
            {layerIndex > 0 && (
              <div aria-hidden="true" className="flex items-center gap-3 py-2 lg:pl-[8.5rem]">
                <span className="connector h-8 w-px" />
                <span className="meta-sm text-muted">flows to</span>
              </div>
            )}

            <div className="grid gap-3 lg:grid-cols-[8.5rem_1fr] lg:items-center">
              <span className="meta text-muted">{layer.label}</span>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {layer.nodes.map((node) => {
                  const style = NODE_STYLE[node.kind];
                  const Icon = style.icon;
                  return (
                    <div
                      key={node.id}
                      className="diagram-node flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-3"
                    >
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line bg-[color-mix(in_oklab,var(--ink)_4%,transparent)]",
                          style.className
                        )}
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="meta-sm block font-medium text-ink">
                          {node.label}
                        </span>
                        {node.detail && (
                          <span className="meta-sm block text-muted">
                            {node.detail}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        {kinds.map((kind) => {
          const style = NODE_STYLE[kind];
          const Icon = style.icon;
          return (
            <li key={kind} className="flex items-center gap-2">
              <Icon aria-hidden="true" className={cn("h-3.5 w-3.5", style.className)} />
              <span className="meta text-muted">{style.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}