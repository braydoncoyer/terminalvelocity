"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { TerminalProvider } from "./terminal-provider";
import { VirtualFileSystem } from "@/lib/terminal/filesystem/virtual-fs";
import { FSSeed } from "@/lib/terminal/filesystem/types";
import { Goal, GoalState } from "@/lib/terminal/validation/types";
import {
  validateGoals,
  allGoalsCompleted,
  createGoalStates,
} from "@/lib/terminal/validation/engine";

interface LessonTerminalProviderProps {
  fsSeed: FSSeed;
  goals: Goal[];
  onComplete: () => void;
  children: (props: {
    fs: VirtualFileSystem;
    goalStates: GoalState[];
    isComplete: boolean;
    resetLesson: () => void;
  }) => React.ReactNode;
}

export function LessonTerminalProvider({
  fsSeed,
  goals,
  onComplete,
  children,
}: LessonTerminalProviderProps) {
  const [fs, setFs] = useState(() => VirtualFileSystem.fromSeed(fsSeed));
  const [goalStates, setGoalStates] = useState(() =>
    createGoalStates(goals)
  );
  const [isComplete, setIsComplete] = useState(false);
  const completedRef = useRef(false);

  const handleCommand = useCallback(
    (raw: string, output: string, error: string, history: string[]) => {
      if (completedRef.current) return;

      setGoalStates((prev) => {
        const updated = validateGoals(prev, {
          fs,
          cwd: fs.cwd,
          history,
          lastOutput: output,
          lastError: error,
          lastCommand: raw,
        });

        if (allGoalsCompleted(updated) && !completedRef.current) {
          completedRef.current = true;
          setIsComplete(true);
          onComplete();
        }

        return updated;
      });
    },
    [fs, onComplete]
  );

  const resetLesson = useCallback(() => {
    const newFs = VirtualFileSystem.fromSeed(fsSeed);
    setFs(newFs);
    setGoalStates(createGoalStates(goals));
    setIsComplete(false);
    completedRef.current = false;
  }, [fsSeed, goals]);

  return (
    <TerminalProvider fs={fs} onCommand={handleCommand}>
      {children({ fs, goalStates, isComplete, resetLesson })}
    </TerminalProvider>
  );
}
