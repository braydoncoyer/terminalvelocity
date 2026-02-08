import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import envVariablesMd from "./content/env-variables.md";
import settingVariablesMd from "./content/setting-variables.md";
import pathVariableMd from "./content/path-variable.md";

const environmentVariablesModule: ModuleConfig = {
  slug: "environment-variables",
  title: "Environment & Variables",
  description: "Understand and configure your shell environment",
  lessons: [
    // ── Lesson 1: Environment Variables ────────────────────────────
    {
      slug: "env-variables",
      title: "Environment Variables",
      description:
        "Learn what environment variables are and how to inspect them with echo.",
      content: parseLessonMarkdown(envVariablesMd),
      fsSeed: {},
      goals: [
        {
          id: "echo-env-var",
          description: "Run echo $PATH or echo $HOME to inspect an environment variable",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("echo $PATH") || cmd.includes("echo $HOME")
            ),
          hint: "Type: echo $PATH or echo $HOME and press Enter.",
        },
      ],
    },

    // ── Lesson 2: Setting Variables ────────────────────────────────
    {
      slug: "setting-variables",
      title: "Setting Variables",
      description:
        "Learn to create your own variables with export and understand the difference between shell and environment variables.",
      content: parseLessonMarkdown(settingVariablesMd),
      fsSeed: {},
      goals: [
        {
          id: "use-export",
          description: "Create a variable using export",
          type: "history_contains",
          value: "export",
          hint: 'Type something like: export MY_VAR="hello" and press Enter.',
        },
        {
          id: "read-variable",
          description: "Read your variable back with echo $",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => cmd.match(/echo \$/)),
          hint: "Type: echo $MY_VAR (using whatever variable name you exported).",
        },
      ],
    },

    // ── Lesson 3: The PATH Variable ────────────────────────────────
    {
      slug: "path-variable",
      title: "The PATH Variable",
      description:
        "Understand how PATH determines which commands your shell can find and run.",
      content: parseLessonMarkdown(pathVariableMd),
      fsSeed: {},
      goals: [
        {
          id: "use-which",
          description: "Use the which command to locate a program",
          type: "history_contains",
          value: "which",
          hint: "Type: which ls or which echo and press Enter.",
        },
        {
          id: "echo-path",
          description: "Print the PATH variable with echo $PATH",
          type: "history_contains",
          value: "echo $PATH",
          hint: "Type: echo $PATH and press Enter.",
        },
      ],
    },
  ],
};

export default environmentVariablesModule;
