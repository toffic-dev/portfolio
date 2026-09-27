import type { CSSProperties } from "react";
import {
  terminalChrome,
  terminalCommands,
  terminalStatusRows,
} from "@/data/terminal";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/utils";

/**
 * Hero terminal panel.
 *
 * A server component: the whole typing sequence is a staggered CSS animation
 * (stepped width on a monospace run, plus faded output lines), so it ships zero
 * client JavaScript, never shifts the layout, and collapses to a fully expanded
 * panel for `prefers-reduced-motion` visitors.
 *
 * Content comes from `src/data/terminal.ts`.
 */

const START_DELAY = 500;
const MS_PER_CHAR = 42;
const AFTER_COMMAND = 300;
const PER_OUTPUT_LINE = 90;
const AFTER_OUTPUT = 280;

interface ScheduledCommand {
  command: string;
  typingDelay: number;
  typingDuration: number;
  steps: number;
  lines: { text: string; delay: number }[];
}

/** Walks the script once and assigns a deterministic offset to every element. */
function schedule(): { commands: ScheduledCommand[]; statusDelay: number } {
  let clock = START_DELAY;

  const commands = terminalCommands.map<ScheduledCommand>((entry) => {
    const typingDuration = Math.min(
      1600,
      Math.max(560, entry.command.length * MS_PER_CHAR)
    );
    const typingDelay = clock;
    clock += typingDuration + AFTER_COMMAND;

    const lines = entry.lines.map((text, index) => ({
      text,
      delay: clock + index * PER_OUTPUT_LINE,
    }));
    clock += entry.lines.length * PER_OUTPUT_LINE + AFTER_OUTPUT;

    return {
      command: entry.command,
      typingDelay,
      typingDuration,
      steps: Math.max(6, entry.command.length),
      lines,
    };
  });

  return { commands, statusDelay: clock };
}

export function TerminalPanel({ className }: { className?: string }) {
  const { commands, statusDelay } = schedule();

  return (
    <div
      className={cn(
        "card glass sheen-top relative overflow-hidden rounded-2xl shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <span className="terminal-dots" aria-hidden="true" />
        <span className="meta text-muted">{terminalChrome.title}</span>
        <span className="meta hidden text-muted sm:inline">
          {terminalChrome.path}
        </span>
      </div>

      <div className="space-y-3 px-4 py-5 font-mono text-[12.5px] leading-6 sm:px-5">
        {commands.map((entry) => (
          <div key={entry.command} className="space-y-1">
            <p className="flex items-baseline gap-2">
              <span className="text-accent" aria-hidden="true">
                $
              </span>
              <span className="relative inline-flex">
                {/* Width reservation — keeps the panel height fixed. */}
                <span aria-hidden="true" className="invisible">
                  {entry.command}
                </span>
                <span
                  className="terminal-type absolute inset-y-0 left-0 text-ink"
                  style={
                    {
                      animationDelay: `${entry.typingDelay}ms`,
                      animationDuration: `${entry.typingDuration}ms`,
                      "--type-steps": entry.steps,
                    } as CSSProperties
                  }
                >
                  {entry.command}
                </span>
              </span>
            </p>

            <ul className="space-y-0.5 pl-4">
              {entry.lines.map((line) => (
                <li
                  key={line.text}
                  className="terminal-line text-muted"
                  style={{ animationDelay: `${line.delay}ms` }}
                >
                  {line.text}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-1 pt-1">
          <p
            className="terminal-line flex items-baseline gap-2"
            style={{ animationDelay: `${statusDelay}ms` }}
          >
            <span className="text-accent" aria-hidden="true">
              $
            </span>
            <span className="text-ink">system.status</span>
          </p>

          {/* One column until `sm`: each row needs about 140px (a 4.5rem label,
              the dot and the state), and two tracks on a 360px phone leave only
              ~127px each — the state text then overflows its cell and is clipped
              by the panel's `overflow-hidden`. */}
          <ul className="grid grid-cols-1 gap-x-4 gap-y-1 pl-4 sm:grid-cols-2">
            {terminalStatusRows.map((row, index) => (
              <li
                key={row.label}
                className="terminal-line flex items-center gap-2"
                style={{ animationDelay: `${statusDelay + 180 + index * 80}ms` }}
              >
                <span className="w-[4.5rem] shrink-0 text-muted">{row.label}</span>
                <StatusDot tone="ok" />
                <span className="text-ok">{row.state}</span>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="terminal-line flex items-center gap-2 pt-1"
          style={{ animationDelay: `${statusDelay + 560}ms` }}
        >
          <span className="text-accent" aria-hidden="true">
            $
          </span>
          <span aria-hidden="true" className="animate-blink h-4 w-[7px] bg-accent/80" />
        </p>
      </div>
    </div>
  );
}