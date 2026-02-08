"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules } from "@/lib/lessons/curriculum";
import { useProgressStore } from "@/lib/progress/store";
import { formatStreak } from "@/lib/progress/streak";
import { ProgressBar } from "./progress-bar";

function getModuleForPath(pathname: string): string | null {
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      if (pathname === `/learn/${mod.slug}/${lesson.slug}`) {
        return mod.slug;
      }
    }
  }
  return null;
}

export function Sidebar() {
  const pathname = usePathname();
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const streak = useProgressStore((s) => s.streak);
  const [open, setOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    // Auto-expand the module that contains the current lesson
    const slug = getModuleForPath(pathname);
    if (slug) return new Set([slug]);
    // If nothing matched, expand the first module
    if (modules.length > 0) return new Set([modules[0].slug]);
    return new Set();
  });

  // When navigating to a lesson, collapse other modules and expand the active one
  useEffect(() => {
    const slug = getModuleForPath(pathname);
    if (slug) {
      setExpandedModules((prev) => {
        if (prev.size === 1 && prev.has(slug)) return prev;
        return new Set([slug]);
      });
    }
  }, [pathname]);

  function toggleModule(slug: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-bg-1 border-r border-bg-3">
      {/* Logo / Title */}
      <div className="px-4 py-4 border-b border-bg-3">
        <Link
          href="/learn"
          className="flex items-center gap-2 text-fg hover:text-accent transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent font-mono text-lg font-bold">&gt;_</span>
          <span className="font-semibold text-sm tracking-tight">
            Terminal Velocity
          </span>
        </Link>
      </div>

      {/* Progress */}
      <ProgressBar />

      {/* Streak */}
      {streak.currentCount > 0 && (
        <div className="px-4 py-2 text-xs text-fg-muted border-b border-bg-3">
          {formatStreak(streak.currentCount)}
        </div>
      )}

      {/* Module list */}
      <nav aria-label="Course modules" className="flex-1 overflow-y-auto py-2">
        {modules.map((mod, moduleIndex) => {
          const isExpanded = expandedModules.has(mod.slug);
          const moduleCompleted = mod.lessons.every((l) =>
            completedLessons.includes(`${mod.slug}/${l.slug}`)
          );

          return (
            <div key={mod.slug}>
              <button
                onClick={() => toggleModule(mod.slug)}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-xs font-medium text-fg-muted hover:text-fg hover:bg-bg-2 transition-colors"
              >
                <svg
                  className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-fg-muted font-mono text-[10px] shrink-0">
                  {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{mod.title}</span>
                {moduleCompleted && mod.lessons.length > 0 && (
                  <span className="ml-auto text-success text-[10px]">
                    &#10003;
                  </span>
                )}
              </button>

              {isExpanded && (
                <div className="pb-1">
                  {mod.lessons.map((lesson) => {
                    const lessonPath = `/learn/${mod.slug}/${lesson.slug}`;
                    const isCurrent = pathname === lessonPath;
                    const isCompleted = completedLessons.includes(
                      `${mod.slug}/${lesson.slug}`
                    );

                    return (
                      <Link
                        key={lesson.slug}
                        href={lessonPath}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-2 pl-10 pr-4 py-1.5 text-xs transition-colors ${
                          isCurrent
                            ? "bg-accent/10 text-accent border-r-2 border-accent"
                            : "text-fg-muted hover:text-fg hover:bg-bg-2"
                        }`}
                      >
                        {isCompleted ? (
                          <span className="text-success text-[10px] shrink-0 w-3 text-center">
                            &#10003;
                          </span>
                        ) : (
                          <span className="w-3 h-3 shrink-0 rounded-full border border-bg-3" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sandbox link */}
      <div className="border-t border-bg-3 px-4 py-3">
        <Link
          href="/sandbox"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-xs text-fg-muted hover:text-fg transition-colors"
        >
          <span className="font-mono text-accent">&gt;_</span>
          <span>Sandbox</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3 left-3 z-50 lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-bg-2 border border-bg-3 text-fg-muted hover:text-fg transition-colors"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        {open ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - mobile: slide in, desktop: always visible */}
      <aside
        className={`fixed top-0 left-0 z-40 h-dvh w-[280px] transition-transform duration-200 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
