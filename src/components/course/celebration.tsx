"use client";

import { useEffect, useState } from "react";

interface CelebrationProps {
  show: boolean;
  lessonTitle: string;
  onDismiss: () => void;
}

export function Celebration({ show, lessonTitle, onDismiss }: CelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;

    setVisible(true);

    // Fire confetti
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#3b82f6", "#22c55e", "#f59e0b", "#e0e0e0"],
        disableForReducedMotion: true,
      });
    });

    // Auto-dismiss after 1.5s
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 1500);

    return () => clearTimeout(timer);
  }, [show, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      onClick={() => {
        setVisible(false);
        onDismiss();
      }}
    >
      <div className="rounded-lg border border-bg-3 bg-bg-1 px-8 py-6 text-center shadow-lg">
        <div className="mb-2 text-2xl font-bold text-fg">
          Lesson Complete!
        </div>
        <div className="text-sm text-fg-muted">{lessonTitle}</div>
      </div>
    </div>
  );
}
