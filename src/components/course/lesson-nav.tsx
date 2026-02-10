"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useProgressStore } from "@/lib/progress/store";

interface LessonNavProps {
  compositeSlug: string;
  prev: { moduleSlug: string; lessonSlug: string } | null;
  next: { moduleSlug: string; lessonSlug: string } | null;
  informational?: boolean;
}

const arrowRight = (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export function LessonNav({ compositeSlug, prev, next, informational }: LessonNavProps) {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const isComplete = completedLessons.includes(compositeSlug);

  const handleInformationalNext = useCallback(() => {
    completeLesson(compositeSlug);
  }, [completeLesson, compositeSlug]);

  const currentModuleSlug = compositeSlug.split("/")[0];
  const isModuleBoundary = next && next.moduleSlug !== currentModuleSlug;
  const nextLabel = isModuleBoundary ? "Next Module" : "Next Lesson";

  return (
    <nav
      aria-label="Lesson navigation"
      className="flex items-center justify-between border-t border-bg-3 pt-4"
    >
      {/* Left: Previous */}
      {prev ? (
        <Link
          href={`/learn/${prev.moduleSlug}/${prev.lessonSlug}`}
          className="flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span>Previous</span>
        </Link>
      ) : (
        <div />
      )}

      {/* Right: upgrades from plain link → CTA → course complete */}
      {!informational && isComplete ? (
        /* Interactive lesson complete — terminal success screen handles navigation */
        <div />
      ) : isComplete && !next ? (
        <span className="text-xs text-success font-medium">
          &#10003; Course Complete
        </span>
      ) : informational && next ? (
        <Link
          href={`/learn/${next.moduleSlug}/${next.lessonSlug}`}
          onClick={handleInformationalNext}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent/90"
        >
          <span>{nextLabel}</span>
          {arrowRight}
        </Link>
      ) : informational && !next ? (
        <button
          onClick={handleInformationalNext}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent/90"
        >
          <span>Complete Course</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : next ? (
        <Link
          href={`/learn/${next.moduleSlug}/${next.lessonSlug}`}
          className="flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg transition-colors"
        >
          <span>Next</span>
          {arrowRight}
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
