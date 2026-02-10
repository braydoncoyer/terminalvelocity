"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useProgressStore } from "@/lib/progress/store";
import { getLesson } from "@/lib/lessons/curriculum";

const LessonTerminal = dynamic(
  () =>
    import("@/components/terminal/variants/lesson-terminal").then(
      (mod) => mod.LessonTerminal
    ),
  {
    ssr: false,
    loading: () => <LessonTerminalSkeleton />,
  }
);

interface LessonTerminalIslandProps {
  moduleSlug: string;
  lessonSlug: string;
  compositeSlug: string;
  lessonTitle: string;
  nextLesson: { moduleSlug: string; lessonSlug: string } | null;
}

export function LessonTerminalIsland({
  moduleSlug,
  lessonSlug,
  compositeSlug,
  lessonTitle,
  nextLesson,
}: LessonTerminalIslandProps) {
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const [showCelebration, setShowCelebration] = useState(false);

  // Look up lesson data client-side so functions (custom validate) don't
  // cross the Server Component → Client Component serialization boundary.
  const lesson = getLesson(moduleSlug, lessonSlug);

  const handleComplete = useCallback(() => {
    completeLesson(compositeSlug);
    setShowCelebration(true);
  }, [completeLesson, compositeSlug]);

  const handleReplay = useCallback(() => {
    setShowCelebration(false);
  }, []);

  if (!lesson) return null;

  return (
    <LessonTerminal
      fsSeed={lesson.fsSeed}
      goals={lesson.goals}
      onComplete={handleComplete}
      title="Terminal"
      initialInput={lesson.initialInput}
      initialHistory={lesson.initialHistory}
      initialCommands={lesson.initialCommands}
      nextLesson={nextLesson}
      lessonTitle={lessonTitle}
      showSuccess={showCelebration}
      onReplay={handleReplay}
    />
  );
}

function LessonTerminalSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-[70vh] sm:h-[60vh] lg:h-[50vh] min-h-[300px] rounded-lg bg-bg-1 border border-bg-3 animate-pulse">
        <div className="h-9 border-b border-bg-3 flex items-center px-3 gap-1.5">
          <div className="w-3 h-3 rounded-full bg-bg-3" />
          <div className="w-3 h-3 rounded-full bg-bg-3" />
          <div className="w-3 h-3 rounded-full bg-bg-3" />
        </div>
        <div className="p-4 space-y-2">
          <div className="h-3 w-48 rounded bg-bg-3" />
          <div className="h-3 w-32 rounded bg-bg-3" />
          <div className="h-3 w-56 rounded bg-bg-3" />
        </div>
      </div>
    </div>
  );
}
