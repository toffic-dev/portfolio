import { site } from "@/data/site";

/**
 * ---------------------------------------------------------------------------
 * HERO TERMINAL
 * ---------------------------------------------------------------------------
 * The script the hero terminal runs on load. Values are derived from `site.ts`
 * wherever possible, so filling in the real name, role and disciplines updates
 * both the headline and the terminal at once.
 */
export interface TerminalCommand {
  command: string;
  lines: string[];
}

export const terminalChrome = {
  title: "toffic@dev — zsh",
  path: "~/portfolio",
};

export const terminalCommands: TerminalCommand[] = [
  {
    command: "whoami",
    lines: [`${site.name.toLowerCase()}`, site.role.toLowerCase()],
  },
  {
    command: "stack",
    lines: [site.disciplines.join(" • ").toLowerCase()],
  },
  {
    command: "status",
    lines: [site.availability.label.toLowerCase()],
  },
];

/**
 * Areas reported as "online" in `system.status`. Kept to short labels: each one
 * has to fit a fixed-width column inside the panel.
 */
export const terminalStatusRows: { label: string; state: string }[] = [
  { label: "Backend", state: "online" },
  { label: "Frontend", state: "online" },
  { label: "Cloud", state: "online" },
  { label: "DevOps", state: "online" },
  { label: "AI", state: "online" },
];