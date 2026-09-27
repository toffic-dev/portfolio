import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";
import { siteOrigin } from "@/lib/seo";

/** Sitemap includes the home page, the projects index and every case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${siteOrigin}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteOrigin}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const caseStudies: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${siteOrigin}/projects/${slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...caseStudies];
}