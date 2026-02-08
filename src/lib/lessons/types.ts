import { FSSeed } from "@/lib/terminal/filesystem/types";
import { Goal } from "@/lib/terminal/validation/types";

export type ContentBlockType =
  | "text"
  | "code"
  | "tip"
  | "warning"
  | "windows-callout"
  | "power-tip";

export interface ContentSection {
  type: ContentBlockType;
  content: string;
  language?: string;
}

export interface LessonConfig {
  slug: string;
  title: string;
  description: string;
  content: ContentSection[];
  fsSeed: FSSeed;
  goals: Goal[];
  /** If true, lesson has no interactive terminal (informational only) */
  informational?: boolean;
  /** Pre-populate the terminal input with this value when the lesson loads */
  initialInput?: string;
  /** Seed the terminal history so commands appear in Up arrow and `history` */
  initialHistory?: string[];
  /** Commands to execute on load — produces visible output and history entries */
  initialCommands?: string[];
}

export interface ModuleConfig {
  slug: string;
  title: string;
  description: string;
  lessons: LessonConfig[];
}
