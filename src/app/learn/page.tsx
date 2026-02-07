"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProgressStore } from "@/lib/progress/store";
import { modules } from "@/lib/lessons/curriculum";

export default function LearnPage() {
  const router = useRouter();
  const currentLesson = useProgressStore((s) => s.currentLesson);

  useEffect(() => {
    if (currentLesson) {
      router.replace(`/learn/${currentLesson}`);
    }
  }, [currentLesson, router]);

  // If there's a current lesson, show nothing while redirecting
  if (currentLesson) {
    return null;
  }

  // Find the first lesson to link to
  const firstModule = modules[0];
  const firstLesson = firstModule?.lessons[0];
  const firstLessonHref = firstModule && firstLesson
    ? `/learn/${firstModule.slug}/${firstLesson.slug}`
    : "/learn";

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 pt-14 pb-16 sm:px-6 sm:pt-16">
      <div className="max-w-md text-center space-y-6">
        <div className="text-accent font-mono text-4xl font-bold">&gt;_</div>
        <h1 className="text-2xl font-bold text-fg">
          Welcome to Terminal Velocity
        </h1>
        <p className="text-sm text-fg-muted leading-relaxed">
          Master the terminal through interactive lessons. Each lesson includes
          a real terminal where you practice commands and build muscle memory.
          No installs needed -- everything runs right in your browser.
        </p>
        <Link
          href={firstLessonHref}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          <span>Start Learning</span>
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
      </div>
    </div>
  );
}
