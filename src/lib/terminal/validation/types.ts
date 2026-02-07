import { VirtualFileSystem } from "../filesystem/virtual-fs";

export type GoalType =
  | "fs_exists"
  | "fs_is_directory"
  | "cwd_equals"
  | "fs_content_contains"
  | "history_contains"
  | "command_output_contains"
  | "custom";

export interface Goal {
  id: string;
  description: string;
  type: GoalType;
  /** The value to check against (path, string, etc.) */
  value?: string;
  /** For custom goals */
  validate?: (ctx: ValidationContext) => boolean;
  /** Hint shown after repeated failures */
  hint?: string;
  /** Feedback when completed via different method than intended */
  altFeedback?: string;
}

export interface ValidationContext {
  fs: VirtualFileSystem;
  cwd: string;
  history: string[];
  lastOutput: string;
  lastError: string;
  lastCommand: string;
}

export type GoalStatus = "pending" | "completed";

export interface GoalState {
  goal: Goal;
  status: GoalStatus;
  attempts: number;
}
