import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mithilgala.is-a.dev";
  const currentDate = new Date();

  const caseStudyUrls: MetadataRoute.Sitemap = featuredProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...caseStudyUrls,
  ];
}
