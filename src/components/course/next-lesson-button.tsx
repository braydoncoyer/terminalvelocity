"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/progress/store";
import { getNextLesson } from "@/lib/lessons/curriculum";

interface NextLessonButtonProps {
  moduleSlug: string;
  lessonSlug: string;
}

export function NextLessonButton({
  moduleSlug,
  lessonSlug,
}: NextLessonButtonProps) {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const isComplete = completedLessons.includes(`${moduleSlug}/${lessonSlug}`);

  if (!isComplete) return null;

  const next = getNextLesson(moduleSlug, lessonSlug);

  if (!next) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-success/20 bg-success/5 px-6 py-4">
        <span className="text-success font-medium text-sm">
          &#10003; Course Complete! Congratulations!
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/learn/${next.moduleSlug}/${next.lessonSlug}`}
      className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
    >
      <span>Next Lesson</span>
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </Link>
  );
}
