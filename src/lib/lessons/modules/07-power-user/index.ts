import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import wildcardsMd from "./content/wildcards.md";
import braceExpansionMd from "./content/brace-expansion.md";
import commandSubstitutionMd from "./content/command-substitution.md";
import chainingCommandsMd from "./content/chaining-commands.md";
import aliasesMd from "./content/aliases.md";

const powerUserModule: ModuleConfig = {
  slug: "power-user",
  title: "Power User Techniques",
  description: "Wildcards, brace expansion, and command chaining",
  lessons: [
    // ── Lesson 1: Wildcards & Globbing ─────────────────────────────
    {
      slug: "wildcards",
      title: "Wildcards & Globbing",
      description:
        "Use wildcard patterns to match multiple files at once instead of typing each name.",
      content: parseLessonMarkdown(wildcardsMd),
      fsSeed: {
        "notes.txt": "Some quick notes for the project.",
        "readme.md": "# Project Readme\nWelcome to the project.",
        "app.js": 'console.log("Hello from the app");',
        "utils.js": "function add(a, b) { return a + b; }",
        "data.py": "import pandas as pd\nprint('Loading data...')",
        "todo.txt": "- Buy groceries\n- Finish homework",
        "style.css": "body { margin: 0; }",
        "report.txt": "Quarterly report: all metrics up.",
        "config.json": '{ "debug": true }',
        "helper.py": "def greet(name):\n    return f'Hello, {name}'",
      },
      goals: [
        {
          id: "use-wildcard",
          description: "Use a *.txt wildcard pattern to find text files",
          type: "history_contains",
          value: "*.txt",
          hint: 'Type: find . -name "*.txt" and press Enter.',
        },
      ],
    },

    // ── Lesson 2: Brace Expansion ──────────────────────────────────
    {
      slug: "brace-expansion",
      title: "Brace Expansion",
      description:
        "Learn how brace expansion generates multiple arguments from a compact pattern.",
      content: parseLessonMarkdown(braceExpansionMd),
      fsSeed: {},
      goals: [
        {
          id: "create-file-a",
          description: "Create file_a.txt",
          type: "fs_exists",
          value: "/home/user/file_a.txt",
          hint: "Type: touch file_a.txt and press Enter.",
        },
        {
          id: "create-file-b",
          description: "Create file_b.txt",
          type: "fs_exists",
          value: "/home/user/file_b.txt",
          hint: "Type: touch file_b.txt and press Enter.",
        },
        {
          id: "create-file-c",
          description: "Create file_c.txt",
          type: "fs_exists",
          value: "/home/user/file_c.txt",
          hint: "Type: touch file_c.txt and press Enter.",
        },
      ],
    },

    // ── Lesson 3: Command Substitution ─────────────────────────────
    {
      slug: "command-substitution",
      title: "Command Substitution",
      description:
        "Understand how to use the output of one command as part of another.",
      content: parseLessonMarkdown(commandSubstitutionMd),
      fsSeed: {},
      goals: [
        {
          id: "use-echo",
          description: "Use echo to print a message",
          type: "history_contains",
          value: "echo",
          hint: 'Type: echo "hello from the terminal" and press Enter.',
        },
      ],
    },

    // ── Lesson 4: Chaining Commands ────────────────────────────────
    {
      slug: "chaining-commands",
      title: "Chaining Commands",
      description:
        "Learn to run multiple commands in sequence using &&, ||, and ; operators.",
      content: parseLessonMarkdown(chainingCommandsMd),
      fsSeed: {},
      goals: [
        {
          id: "create-directory",
          description: "Create the my-project directory",
          type: "fs_is_directory",
          value: "/home/user/my-project",
          hint: "Type: mkdir my-project and press Enter.",
        },
        {
          id: "enter-directory",
          description: "Navigate into the my-project directory",
          type: "cwd_equals",
          value: "/home/user/my-project",
          hint: "Type: cd my-project and press Enter.",
        },
      ],
    },

    // ── Lesson 5: Aliases ──────────────────────────────────────────
    {
      slug: "aliases",
      title: "Aliases",
      description:
        "Create shortcuts for long or frequently used commands with alias.",
      content: parseLessonMarkdown(aliasesMd),
      fsSeed: {},
      goals: [
        {
          id: "create-alias",
          description: "Create an alias using the alias command",
          type: "history_contains",
          value: "alias",
          hint: "Type: alias ll='ls -la' and press Enter.",
        },
      ],
    },
  ],
};

export default powerUserModule;
