"use client";

import { LessonTerminalProvider } from "../providers/lesson-terminal-provider";
import { TerminalFrame } from "../terminal-frame";
import { ValidationFeedback } from "../validation-feedback";
import { TerminalSuccess } from "@/components/course/terminal-success";
import { FSSeed } from "@/lib/terminal/filesystem/types";
import { Goal } from "@/lib/terminal/validation/types";

interface LessonTerminalProps {
  fsSeed: FSSeed;
  goals: Goal[];
  onComplete: () => void;
  title?: string;
  initialInput?: string;
  initialHistory?: string[];
  initialCommands?: string[];
  nextLesson: { moduleSlug: string; lessonSlug: string } | null;
  lessonTitle: string;
  showSuccess: boolean;
  onReplay: () => void;
}

export function LessonTerminal({
  fsSeed,
  goals,
  onComplete,
  title,
  initialInput,
  initialHistory,
  initialCommands,
  nextLesson,
  lessonTitle,
  showSuccess,
  onReplay,
}: LessonTerminalProps) {
  return (
    <LessonTerminalProvider
      fsSeed={fsSeed}
      goals={goals}
      onComplete={onComplete}
      initialInput={initialInput}
      initialHistory={initialHistory}
      initialCommands={initialCommands}
    >
      {({ fs, goalStates, resetLesson }) => {
        const takeoverContent = showSuccess ? (
          <TerminalSuccess
            lessonTitle={lessonTitle}
            nextLesson={nextLesson}
            onReplay={() => {
              onReplay();
              resetLesson();
            }}
          />
        ) : undefined;

        return (
          <div className="h-[70vh] sm:h-[60vh] lg:h-[50vh] min-h-[300px] flex flex-col">
            <TerminalFrame
              fs={fs}
              title={showSuccess ? "Lesson Complete" : title}
              takeoverContent={takeoverContent}
            >
              <ValidationFeedback goalStates={goalStates} />
            </TerminalFrame>
          </div>
        );
      }}
    </LessonTerminalProvider>
  );
}
