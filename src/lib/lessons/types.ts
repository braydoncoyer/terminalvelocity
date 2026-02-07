import { FSSeed } from "@/lib/terminal/filesystem/types";
import { Goal } from "@/lib/terminal/validation/types";

export type ContentBlockType =
  | "text"
  | "code"
  | "tip"
  | "warning"
  | "windows-callout";

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
}

export interface ModuleConfig {
  slug: string;
  title: string;
  description: string;
  lessons: LessonConfig[];
}
