import type { MetadataRoute } from "next";
import { modules } from "@/lib/lessons/curriculum";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://terminalvelocitycourse.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/learn`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sandbox`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${baseUrl}/cheat-sheet`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const lessonRoutes: MetadataRoute.Sitemap = modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      url: `${baseUrl}/learn/${mod.slug}/${lesson.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...lessonRoutes];
}
