import type { Experiment } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * LAB / EXPERIMENTS — PLACEHOLDER DATA
 * ---------------------------------------------------------------------------
 * Small, unfinished work: spikes, prototypes and technical rabbit holes. This
 * is what makes the site read as an active developer's site rather than a
 * static résumé. Everything here is a stand-in.
 */
export const experiments: Experiment[] = [
  {
    id: "experiment-01",
    name: "[EXPERIMENT — LOCAL AI PLAYGROUND]",
    summary:
      "Placeholder — running a small model locally to compare response quality against a hosted API.",
    status: "exploring",
    technologies: ["Python", "Local inference"],
    links: { github: "#" },
  },
  {
    id: "experiment-02",
    name: "[EXPERIMENT — SELF-HOSTED STACK]",
    summary:
      "Placeholder — a container-based stack covering database, API and reverse proxy on a single host.",
    status: "prototyping",
    technologies: ["Docker", "Linux", "PostgreSQL"],
    links: { github: "#" },
  },
  {
    id: "experiment-03",
    name: "[EXPERIMENT — BROWSER AUTOMATION]",
    summary:
      "Placeholder — automating a repetitive browser workflow and reporting the results.",
    status: "exploring",
    technologies: ["Python", "Automation"],
  },
  {
    id: "experiment-04",
    name: "[EXPERIMENT — UI MOTION NOTES]",
    summary:
      "Placeholder — a scratch space for testing scroll and interaction patterns before they land in real work.",
    status: "paused",
    technologies: ["React", "CSS"],
  },
];

export const experimentStatusLabel: Record<Experiment["status"], string> = {
  exploring: "Exploring",
  prototyping: "Prototyping",
  paused: "Paused",
  placeholder: "Placeholder",
};