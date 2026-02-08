import { generateOgImage } from "@/lib/og/og-template";
import { getLesson, getModule, modules } from "@/lib/lessons/curriculum";

export const alt = "Terminal Velocity — Lesson";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = getLesson(moduleSlug, lessonSlug);
  const mod = getModule(moduleSlug);
  const moduleIndex = modules.findIndex((m) => m.slug === moduleSlug);

  return generateOgImage({
    title: lesson?.title ?? "Terminal Velocity",
    subtitle:
      lesson?.description ?? "Master the terminal. Command your AI.",
    moduleNumber: moduleIndex !== -1 ? moduleIndex + 1 : undefined,
  });
}
