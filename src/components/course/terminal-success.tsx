"use client";

import { useEffect } from "react";
import Link from "next/link";

interface TerminalSuccessProps {
  lessonTitle: string;
  nextLesson: { moduleSlug: string; lessonSlug: string } | null;
  onReplay: () => void;
}

export function TerminalSuccess({
  lessonTitle,
  nextLesson,
  onReplay,
}: TerminalSuccessProps) {
  useEffect(() => {
    // Fire enhanced confetti
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#22c55e", "#f59e0b", "#e0e0e0"],
        disableForReducedMotion: true,
      });

      // Staggered second burst
      setTimeout(() => {
        confetti.default({
          particleCount: 40,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#3b82f6", "#22c55e", "#f59e0b", "#e0e0e0"],
          disableForReducedMotion: true,
        });
      }, 300);
    });
  }, []);

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set(
      "text",
      `I just completed "${lessonTitle}" on Terminal Velocity!\n\nA free, interactive course for learning terminal fundamentals.`
    );
    params.set("url", "https://terminalvelocitycourse.com");
    window.open(
      `https://x.com/intent/tweet?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="animate-success-in flex flex-1 flex-col items-center justify-center p-6">
      {/* Green radial glow atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34, 197, 94, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Prompt icon */}
      <div className="animate-glow-pulse mb-4 font-mono text-3xl font-bold text-success">
        {">_"}
      </div>

      {/* Typed heading */}
      <h2 className="animate-typewriter mb-2 font-mono text-xl font-bold text-fg">
        Lesson Complete!
      </h2>

      {/* Lesson title */}
      <p className="mb-6 text-sm text-fg-muted">{lessonTitle}</p>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
            className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-accent/90"
          >
            Next Lesson
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 rounded bg-success px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-success/90"
          >
            Course Complete!
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Link>
        )}

        <button
          onClick={handleShare}
          className="rounded border border-bg-3 px-3 py-2 text-xs text-fg-muted transition-colors duration-150 hover:border-fg-muted hover:text-fg"
        >
          Share on X
        </button>

        <button
          onClick={onReplay}
          className="rounded border border-bg-3 px-3 py-2 text-xs text-fg-muted transition-colors duration-150 hover:border-fg-muted hover:text-fg"
        >
          Replay
        </button>
      </div>

    </div>
  );
}
