import type { LessonConfig, ModuleConfig } from "@/lib/lessons/types";

import foundationsModule from "./modules/01-foundations";
import navigatingFilesystemModule from "./modules/02-navigating-filesystem";
import workingWithFilesModule from "./modules/03-working-with-files";
import keyboardShortcutsModule from "./modules/04-keyboard-shortcuts";
import pipingRedirectionModule from "./modules/05-piping-redirection";
import environmentVariablesModule from "./modules/06-environment-variables";
import powerUserModule from "./modules/07-power-user";
import customizingTerminalModule from "./modules/08-customizing-terminal";
import puttingItTogetherModule from "./modules/09-putting-it-together";

// ── Ordered curriculum ──────────────────────────────────────────────
export const modules: ModuleConfig[] = [
  foundationsModule,
  navigatingFilesystemModule,
  workingWithFilesModule,
  keyboardShortcutsModule,
  pipingRedirectionModule,
  environmentVariablesModule,
  powerUserModule,
  customizingTerminalModule,
  puttingItTogetherModule,
];

// ── Helper functions ────────────────────────────────────────────────

/** Returns a flat array of every lesson across all modules. */
export function getAllLessons(): LessonConfig[] {
  return modules.flatMap((m) => m.lessons);
}

/** Finds a single lesson by its module slug and lesson slug. */
export function getLesson(
  moduleSlug: string,
  lessonSlug: string
): LessonConfig | undefined {
  const mod = modules.find((m) => m.slug === moduleSlug);
  return mod?.lessons.find((l) => l.slug === lessonSlug);
}

/** Finds a module by its slug. */
export function getModule(slug: string): ModuleConfig | undefined {
  return modules.find((m) => m.slug === slug);
}

/** Returns the next lesson in the curriculum, or null if this is the last one. */
export function getNextLesson(
  moduleSlug: string,
  lessonSlug: string
): { moduleSlug: string; lessonSlug: string } | null {
  const moduleIndex = modules.findIndex((m) => m.slug === moduleSlug);
  if (moduleIndex === -1) return null;

  const mod = modules[moduleIndex];
  const lessonIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return null;

  // Next lesson in the same module
  if (lessonIndex < mod.lessons.length - 1) {
    return {
      moduleSlug: mod.slug,
      lessonSlug: mod.lessons[lessonIndex + 1].slug,
    };
  }

  // First lesson of the next module that has lessons
  for (let i = moduleIndex + 1; i < modules.length; i++) {
    if (modules[i].lessons.length > 0) {
      return {
        moduleSlug: modules[i].slug,
        lessonSlug: modules[i].lessons[0].slug,
      };
    }
  }

  return null;
}

/** Returns the previous lesson in the curriculum, or null if this is the first one. */
export function getPrevLesson(
  moduleSlug: string,
  lessonSlug: string
): { moduleSlug: string; lessonSlug: string } | null {
  const moduleIndex = modules.findIndex((m) => m.slug === moduleSlug);
  if (moduleIndex === -1) return null;

  const mod = modules[moduleIndex];
  const lessonIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return null;

  // Previous lesson in the same module
  if (lessonIndex > 0) {
    return {
      moduleSlug: mod.slug,
      lessonSlug: mod.lessons[lessonIndex - 1].slug,
    };
  }

  // Last lesson of the previous module that has lessons
  for (let i = moduleIndex - 1; i >= 0; i--) {
    if (modules[i].lessons.length > 0) {
      const prevMod = modules[i];
      return {
        moduleSlug: prevMod.slug,
        lessonSlug: prevMod.lessons[prevMod.lessons.length - 1].slug,
      };
    }
  }

  return null;
}

/** Returns the total number of lessons across all modules. */
export function getTotalLessonCount(): number {
  return modules.reduce((sum, m) => sum + m.lessons.length, 0);
}
