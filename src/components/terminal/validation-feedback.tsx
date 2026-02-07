"use client";

import { GoalState } from "@/lib/terminal/validation/types";

interface ValidationFeedbackProps {
  goalStates: GoalState[];
}

export function ValidationFeedback({ goalStates }: ValidationFeedbackProps) {
  return (
    <div className="border-t border-bg-3 px-3 py-2">
      <div className="mb-1 text-xs font-medium text-fg-muted uppercase tracking-wider">
        Objectives
      </div>
      <ul className="space-y-1" aria-label="Lesson objectives">
        {goalStates.map((gs) => (
          <li
            key={gs.goal.id}
            className="flex items-center gap-2 text-sm font-mono"
            aria-label={`${gs.goal.description}: ${gs.status === "completed" ? "completed" : "pending"}`}
          >
            {gs.status === "completed" ? (
              <span className="text-success" aria-hidden="true">&#10003;</span>
            ) : (
              <span className="text-fg-muted" aria-hidden="true">&#9675;</span>
            )}
            <span
              className={
                gs.status === "completed"
                  ? "text-fg-muted line-through"
                  : "text-fg"
              }
            >
              {gs.goal.description}
            </span>
            {gs.status === "pending" &&
              gs.attempts >= 3 &&
              gs.goal.hint && (
                <span className="text-xs text-warning italic ml-2">
                  Hint: {gs.goal.hint}
                </span>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
