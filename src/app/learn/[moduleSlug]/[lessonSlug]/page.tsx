import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLesson,
  getModule,
  getNextLesson,
  getPrevLesson,
  modules,
} from "@/lib/lessons/curriculum";
import { LessonContent } from "@/components/course/lesson-content";
import { LessonTerminalIsland } from "@/components/course/lesson-terminal-island";
import { LessonNav } from "@/components/course/lesson-nav";
import { CheatSheetDownload } from "@/components/course/cheat-sheet-download";
import { LessonCurrentSetter } from "./lesson-current-setter";

interface LessonPageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = getLesson(moduleSlug, lessonSlug);
  const mod = getModule(moduleSlug);

  if (!lesson) return {};

  const title = `${lesson.title} — ${mod?.title ?? "Terminal Velocity"}`;

  return {
    title,
    description: lesson.description,
  };
}

export function generateStaticParams() {
  return modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      moduleSlug: mod.slug,
      lessonSlug: lesson.slug,
    }))
  );
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params;

  const lesson = getLesson(moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const mod = getModule(moduleSlug);
  const prev = getPrevLesson(moduleSlug, lessonSlug);
  const next = getNextLesson(moduleSlug, lessonSlug);

  const compositeSlug = `${moduleSlug}/${lessonSlug}`;

  const baseUrl = "https://terminalvelocitycourse.com";
  const lessonUrl = `${baseUrl}/learn/${moduleSlug}/${lessonSlug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: lesson.title,
      description: lesson.description,
      url: lessonUrl,
      isPartOf: {
        "@type": "Course",
        name: "Terminal Velocity",
        url: `${baseUrl}/learn`,
      },
      educationalLevel: "Beginner",
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Course",
          item: `${baseUrl}/learn`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: mod?.title ?? moduleSlug,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: lesson.title,
          item: lessonUrl,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-14 pb-8 sm:px-6 sm:pt-8 lg:py-12 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      {/* Lesson navigation */}
      <div className="pt-4">
        <LessonNav
          compositeSlug={compositeSlug}
          prev={prev}
          next={next}
          informational={lesson.informational}
        />
      </div>
    </div>
  );
}
