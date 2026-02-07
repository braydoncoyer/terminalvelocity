"use client";

import { LessonTerminalProvider } from "../providers/lesson-terminal-provider";
import { TerminalFrame } from "../terminal-frame";
import { ValidationFeedback } from "../validation-feedback";
import { FSSeed } from "@/lib/terminal/filesystem/types";
import { Goal } from "@/lib/terminal/validation/types";

interface LessonTerminalProps {
  fsSeed: FSSeed;
  goals: Goal[];
  onComplete: () => void;
  title?: string;
}

export function LessonTerminal({
  fsSeed,
  goals,
  onComplete,
  title,
}: LessonTerminalProps) {
  return (
    <LessonTerminalProvider
      fsSeed={fsSeed}
      goals={goals}
      onComplete={onComplete}
    >
      {({ fs, goalStates, isComplete, resetLesson }) => (
        <div className="flex flex-col gap-3">
          <div className="h-[70vh] sm:h-[60vh] lg:h-[50vh] min-h-[300px] flex flex-col">
            <TerminalFrame fs={fs} title={title}>
              <ValidationFeedback goalStates={goalStates} />
            </TerminalFrame>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={resetLesson}
              className="rounded border border-bg-3 px-3 py-1.5 text-xs text-fg-muted transition-colors duration-150 hover:border-fg-muted hover:text-fg"
            >
              Reset
            </button>
            {isComplete && (
              <span className="text-sm text-success font-medium">
                &#10003; Lesson Complete!
              </span>
            )}
          </div>
        </div>
      )}
    </LessonTerminalProvider>
  );
}
