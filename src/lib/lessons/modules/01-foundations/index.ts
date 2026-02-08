import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import whatIsATerminalMd from "./content/what-is-a-terminal.md";
import anatomyOfACommandMd from "./content/anatomy-of-a-command.md";
import yourFirstCommandsMd from "./content/your-first-commands.md";
import gettingHelpMd from "./content/getting-help.md";
import understandingThePromptMd from "./content/understanding-the-prompt.md";

const foundationsModule: ModuleConfig = {
  slug: "terminal-foundations",
  title: "Terminal Foundations",
  description: "Get comfortable with the terminal and learn the core concepts",
  lessons: [
    // ── Lesson 1: What is a Terminal? ──────────────────────────────
    {
      slug: "what-is-a-terminal",
      title: "What is a Terminal?",
      description:
        "Understand what a terminal is, how it differs from a shell, and why it still matters in the age of AI.",
      content: parseLessonMarkdown(whatIsATerminalMd),
      fsSeed: {},
      goals: [
        {
          id: "echo-hello",
          description: 'Run echo "hello terminal"',
          type: "command_output_contains",
          value: "hello terminal",
          hint: 'Type: echo "hello terminal" and press Enter.',
        },
      ],
    },

    // ── Lesson 2: Anatomy of a Command ─────────────────────────────
    {
      slug: "anatomy-of-a-command",
      title: "Anatomy of a Command",
      description:
        "Learn the three building blocks of every terminal command: the command name, flags, and arguments.",
      content: parseLessonMarkdown(anatomyOfACommandMd),
      fsSeed: {
        "projects": null,
        "projects/website": null,
        "projects/website/index.html": "<!DOCTYPE html><html><body>Hello</body></html>",
        "projects/notes.txt": "My project notes",
        "documents": null,
        "documents/readme.md": "# Welcome\nThis is a readme file.",
      },
      goals: [
        {
          id: "ls-la-command",
          description: "Run ls -la /home to see a detailed file listing",
          type: "history_contains",
          value: "ls -la",
          hint: "Type: ls -la /home and press Enter to see all files in long format.",
        },
      ],
    },

    // ── Lesson 3: Your First Commands ──────────────────────────────
    {
      slug: "your-first-commands",
      title: "Your First Commands",
      description:
        "Practice the essential starter commands: pwd, whoami, echo, and clear.",
      content: parseLessonMarkdown(yourFirstCommandsMd),
      fsSeed: {},
      goals: [
        {
          id: "run-pwd",
          description: "Check your current directory",
          type: "history_contains",
          value: "pwd",
          hint: "Type: pwd and press Enter.",
        },
        {
          id: "run-whoami",
          description: "Find out which user you are",
          type: "history_contains",
          value: "whoami",
          hint: "Type: whoami and press Enter.",
        },
        {
          id: "run-echo",
          description: "Print a message to the screen",
          type: "history_contains",
          value: "echo",
          hint: 'Type something like: echo "hello world" and press Enter.',
        },
        {
          id: "run-clear",
          description: "Clean up the terminal",
          type: "history_contains",
          value: "clear",
          hint: "Type: clear and press Enter (or try Ctrl+L).",
        },
      ],
    },

    // ── Lesson 4: Getting Help ─────────────────────────────────────
    {
      slug: "getting-help",
      title: "Getting Help",
      description:
        "Learn how to look up what any command does without leaving the terminal.",
      content: parseLessonMarkdown(gettingHelpMd),
      fsSeed: {},
      goals: [
        {
          id: "get-help",
          description: "Look up how a command works",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("--help") || cmd.includes("man")
            ),
          hint: "Type: ls --help or man ls and press Enter.",
        },
      ],
    },

    // ── Lesson 5: Understanding the Prompt ─────────────────────────
    {
      slug: "understanding-the-prompt",
      title: "Understanding the Prompt",
      description:
        "Read the information your terminal prompt gives you before every command.",
      content: parseLessonMarkdown(understandingThePromptMd),
      fsSeed: {},
      goals: [
        {
          id: "verify-directory",
          description: "Verify your current directory",
          type: "history_contains",
          value: "pwd",
          hint: "Type: pwd and press Enter to see your current directory.",
        },
      ],
    },
  ],
};

export default foundationsModule;
