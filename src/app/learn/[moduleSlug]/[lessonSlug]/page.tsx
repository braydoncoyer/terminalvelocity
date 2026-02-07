import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLesson,
  getModule,
  getNextLesson,
  getPrevLesson,
} from "@/lib/lessons/curriculum";
import { LessonContent } from "@/components/course/lesson-content";
import { LessonTerminalIsland } from "@/components/course/lesson-terminal-island";
import { NextLessonButton } from "@/components/course/next-lesson-button";
import { CheatSheetDownload } from "@/components/course/cheat-sheet-download";
import { LessonCurrentSetter } from "./lesson-current-setter";

interface LessonPageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params;

  const lesson = getLesson(moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const mod = getModule(moduleSlug);
  const prev = getPrevLesson(moduleSlug, lessonSlug);
  const next = getNextLesson(moduleSlug, lessonSlug);

  const compositeSlug = `${moduleSlug}/${lessonSlug}`;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-14 pb-8 sm:px-6 sm:pt-8 lg:py-12 space-y-8">
      {/* Set current lesson in progress store */}
      <LessonCurrentSetter slug={compositeSlug} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-fg-muted">
        <Link
          href="/learn"
          className="hover:text-fg transition-colors"
        >
          Course
        </Link>
        <span>/</span>
        <span>{mod?.title}</span>
        <span>/</span>
        <span className="text-fg">{lesson.title}</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-fg">{lesson.title}</h1>
        <p className="text-sm text-fg-muted">{lesson.description}</p>
      </div>

      {/* Content sections */}
      <LessonContent sections={lesson.content} />

      {/* Terminal (only for interactive lessons) */}
      {!lesson.informational && (
        <div className="mt-8">
          <div className="text-xs font-medium text-fg-muted mb-3 uppercase tracking-wider">
            Practice
          </div>
          <LessonTerminalIsland
            moduleSlug={moduleSlug}
            lessonSlug={lessonSlug}
            compositeSlug={compositeSlug}
            lessonTitle={lesson.title}
          />
        </div>
      )}

      {/* Cheat sheet download for the final lesson */}
      {lessonSlug === "cheat-sheet" && (
        <div className="mt-8">
          <CheatSheetDownload />
        </div>
      )}

      {/* Next lesson button */}
      <div className="pt-4">
        <NextLessonButton moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
      </div>

      {/* Prev / Next navigation */}
      <nav aria-label="Lesson navigation" className="flex items-center justify-between border-t border-bg-3 pt-6">
        {prev ? (
          <Link
            href={`/learn/${prev.moduleSlug}/${prev.lessonSlug}`}
            className="flex items-center gap-2 text-xs text-fg-muted hover:text-fg transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            <span>Previous</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/learn/${next.moduleSlug}/${next.lessonSlug}`}
            className="flex items-center gap-2 text-xs text-fg-muted hover:text-fg transition-colors"
          >
            <span>Next</span>
            <svg
              className="w-3 h-3"
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
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
