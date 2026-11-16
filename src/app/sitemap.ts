import type { MetadataRoute } from "next";
import { featuredProjects, isComprehensiveCaseStudy } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mithilgala.is-a.dev";
  const currentDate = new Date();

  // Only index case studies that have verified content in Problem, Architecture, and Key Decision
  const caseStudyUrls: MetadataRoute.Sitemap = featuredProjects
    .filter(isComprehensiveCaseStudy)
    .map((project) => ({
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
