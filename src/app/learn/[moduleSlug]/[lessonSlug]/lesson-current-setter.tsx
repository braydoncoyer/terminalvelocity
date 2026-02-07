"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/lib/progress/store";

interface LessonCurrentSetterProps {
  slug: string;
}

/**
 * Thin client boundary that syncs the current lesson slug to the
 * progress store so the sidebar highlights the active lesson and
 * /learn can redirect back on return.
 */
export function LessonCurrentSetter({ slug }: LessonCurrentSetterProps) {
  const setCurrentLesson = useProgressStore((s) => s.setCurrentLesson);

  useEffect(() => {
    setCurrentLesson(slug);
  }, [slug, setCurrentLesson]);

  return null;
}
