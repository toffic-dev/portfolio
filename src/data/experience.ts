import type { ExperienceEntry } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * EXPERIENCE
 * ---------------------------------------------------------------------------
 * Real entries only, in two groups: employment (`kind: "role"`) renders in the
 * main timeline, while education and training (`kind: "education"` /
 * `"program"`) render under "Education & credentials" so neither a degree nor a
 * completed course is ever read as a job.
 *
 * All employment dates are now confirmed. The degree is presented as in progress
 * and claims no completion date, matching how the owner describes themselves.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "springer-capital",
    kind: "role",
    role: "DevOps Intern",
    organization: "Springer Capital (Acumen Track)",
    period: "Aug 2026 – Present",
    marker: "2026",
    location: "Remote",
    summary:
      "Hands-on DevOps work across cloud infrastructure, containerised development environments, CI/CD, databases, monitoring and deployment workflows.",
    technologies: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Terraform",
      "HashiCorp Nomad",
      "PostgreSQL",
      "MLflow",
      "Grafana",
      "Grafana Loki",
      "Linux",
    ],
    /* No achievements were supplied, so none are claimed — the built/handled
       work is described in `summary` instead. */
    achievements: [],
  },
  {
    id: "next-path-ghana",
    kind: "role",
    role: "Campus Ambassador",
    organization: "Next Path Ghana (NPG), KNUST",
    period: "Aug 2026 – Dec 2026",
    marker: "2026",
    summary: "Campus ambassador at KNUST.",
    technologies: [],
    achievements: [
      "Recruited students for the programme",
      "Organised campus events",
      "Represented the Next Path Ghana brand on campus",
    ],
  },
  {
    id: "knust",
    kind: "education",
    role: "Bachelor's degree in Computer Science",
    organization:
      "Kwame Nkrumah University of Science and Technology (KNUST)",
    period: "In progress",
    location: "Kumasi, Ghana",
    /* No dates or coursework were supplied, so none are claimed. */
    summary: "Undergraduate Computer Science degree programme.",
    technologies: [],
    achievements: [],
  },
  {
    id: "aws-restart",
    kind: "program",
    role: "AWS re/Start Graduate",
    organization: "AWS Training & Certification",
    period: "2026",
    marker: "2026",
    summary: "Completed the AWS re/Start program.",
    technologies: ["AWS"],
    achievements: [
      "Earned the AWS re/Start Graduate credential in August 2026.",
    ],
  },
];