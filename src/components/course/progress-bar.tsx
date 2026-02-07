"use client";

import { useProgressStore } from "@/lib/progress/store";
import { getTotalLessonCount } from "@/lib/lessons/curriculum";

export function ProgressBar() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const total = getTotalLessonCount();
  const completed = completedLessons.length;
  const pct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="px-4 py-3 border-b border-bg-3">
      <div className="flex items-center justify-between text-xs text-fg-muted mb-1.5">
        <span>Progress</span>
        <span>{completed}/{total} lessons</span>
      </div>
      <div
        className="h-1.5 rounded-full bg-bg-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Course progress: ${completed} of ${total} lessons completed`}
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
