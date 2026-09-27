/**
 * "What I build" cards.
 *
 * `icon` is a key into the component's icon map (`code` | `cloud` | `ai`) — data
 * files stay free of JSX, and adding a fourth card is a data-only change.
 */
export interface BuildCard {
  id: string;
  index: string;
  icon: "code" | "cloud" | "ai";
  title: string;
  description: string;
  technologies: string[];
}

/** PLACEHOLDER — generic capability descriptions, no client work claimed. */
export const buildCards: BuildCard[] = [
  {
    id: "full-stack",
    index: "01",
    icon: "code",
    title: "Full-Stack Development",
    description:
      "Building modern frontend applications and backend APIs.",
    technologies: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
  },
  {
    id: "cloud-devops",
    index: "02",
    icon: "cloud",
    title: "Cloud & DevOps",
    description:
      "Containerizing, deploying and maintaining applications.",
    technologies: ["Docker", "CI/CD", "Linux", "Cloud hosting"],
  },
  {
    id: "ai-automation",
    index: "03",
    icon: "ai",
    title: "AI & Automation",
    description:
      "Integrating AI services, automation workflows and intelligent systems.",
    technologies: ["LLM APIs", "Retrieval", "Workflows", "Python"],
  },
];