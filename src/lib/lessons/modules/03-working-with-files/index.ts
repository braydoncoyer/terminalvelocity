import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import creatingFilesMd from "./content/creating-files.md";
import creatingDirectoriesMd from "./content/creating-directories.md";
import viewingFilesMd from "./content/viewing-files.md";
import readingLongFilesMd from "./content/reading-long-files.md";
import copyingFilesMd from "./content/copying-files.md";
import movingRenamingMd from "./content/moving-renaming.md";
import deletingSafelyMd from "./content/deleting-safely.md";

const workingWithFilesModule: ModuleConfig = {
  slug: "working-with-files",
  title: "Working with Files & Directories",
  description: "Create, view, copy, move, and delete files",
  lessons: [
    // ── Lesson 1: Creating Files ───────────────────────────────────
    {
      slug: "creating-files",
      title: "Creating Files",
      description:
        "Use touch to create new empty files from the command line.",
      content: parseLessonMarkdown(creatingFilesMd),
      fsSeed: {
        "projects": null,
        "projects/README.md": "# My Projects\nA collection of coding projects.",
      },
      goals: [
        {
          id: "create-file",
          description: "Create the file projects/hello.txt",
          type: "fs_exists",
          value: "/home/user/projects/hello.txt",
          hint: "Type: touch projects/hello.txt to create the file.",
        },
      ],
    },

    // ── Lesson 2: Creating Directories ─────────────────────────────
    {
      slug: "creating-directories",
      title: "Creating Directories",
      description:
        "Use mkdir and mkdir -p to create single or deeply nested directory structures.",
      content: parseLessonMarkdown(creatingDirectoriesMd),
      fsSeed: {
        "Documents": null,
        "Documents/notes.txt": "Set up the new project today.",
      },
      goals: [
        {
          id: "create-nested-dirs",
          description: "Create the nested directory projects/webapp/src/components",
          type: "fs_is_directory",
          value: "/home/user/projects/webapp/src/components",
          hint: "Type: mkdir -p projects/webapp/src/components",
        },
      ],
    },

    // ── Lesson 3: Viewing File Contents ────────────────────────────
    {
      slug: "viewing-files",
      title: "Viewing File Contents",
      description:
        "Use cat, head, and tail to read files directly in the terminal.",
      content: parseLessonMarkdown(viewingFilesMd),
      fsSeed: {
        "projects": null,
        "projects/CHANGELOG.md":
          "# Changelog\n\n## v2.0.0 (2025-01-15)\n- Complete rewrite in TypeScript\n- Added dark mode support\n\n## v1.5.0 (2024-11-20)\n- Performance improvements\n- Fixed mobile layout bugs\n\n## v1.4.0 (2024-09-10)\n- Added search functionality\n- New user dashboard\n\n## v1.3.0 (2024-07-05)\n- API rate limiting\n- Improved error messages\n\n## v1.2.0 (2024-05-01)\n- Added export to CSV\n- Bug fixes",
        "projects/README.md": "# My Project\nA sample project for learning terminal commands.",
        "projects/config.json": '{\n  "port": 3000,\n  "debug": true,\n  "database": "postgresql://localhost:5432/myapp"\n}',
      },
      goals: [
        {
          id: "use-head",
          description: "View the first few lines of projects/CHANGELOG.md",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.startsWith("head")
            ),
          hint: "Type: head -n 5 projects/CHANGELOG.md to see the first 5 lines.",
        },
      ],
    },

    // ── Lesson 4: Reading Long Files ───────────────────────────────
    {
      slug: "reading-long-files",
      title: "Reading Long Files",
      description:
        "Use less to comfortably navigate through files that are too long for the screen.",
      content: parseLessonMarkdown(readingLongFilesMd),
      fsSeed: {
        "projects": null,
        "projects/server.log":
          "[2025-01-15 08:00:01] INFO  Server starting on port 3000\n[2025-01-15 08:00:01] INFO  Connected to database\n[2025-01-15 08:00:02] INFO  Loading middleware: cors\n[2025-01-15 08:00:02] INFO  Loading middleware: bodyParser\n[2025-01-15 08:00:02] INFO  Loading middleware: auth\n[2025-01-15 08:00:03] INFO  Registered route: GET /api/users\n[2025-01-15 08:00:03] INFO  Registered route: POST /api/users\n[2025-01-15 08:00:03] INFO  Registered route: GET /api/posts\n[2025-01-15 08:00:03] INFO  Registered route: POST /api/posts\n[2025-01-15 08:00:04] INFO  Server ready - accepting connections\n[2025-01-15 08:01:12] INFO  GET /api/users 200 45ms\n[2025-01-15 08:01:15] INFO  GET /api/posts 200 32ms\n[2025-01-15 08:02:30] WARN  Slow query detected: getUserById (230ms)\n[2025-01-15 08:03:01] INFO  POST /api/posts 201 67ms\n[2025-01-15 08:03:45] ERROR Connection timeout to database replica\n[2025-01-15 08:03:46] INFO  Retrying database connection...\n[2025-01-15 08:03:47] INFO  Database reconnected successfully\n[2025-01-15 08:04:10] INFO  GET /api/users 200 38ms\n[2025-01-15 08:05:00] INFO  Health check passed\n[2025-01-15 08:10:00] INFO  Health check passed\n[2025-01-15 08:15:00] INFO  Health check passed\n[2025-01-15 08:15:22] INFO  GET /api/posts?page=2 200 41ms\n[2025-01-15 08:16:03] WARN  Rate limit approaching for IP 192.168.1.50\n[2025-01-15 08:20:00] INFO  Health check passed\n[2025-01-15 08:21:44] INFO  POST /api/users 201 55ms\n[2025-01-15 08:25:00] INFO  Health check passed\n[2025-01-15 08:30:00] INFO  Health check passed\n[2025-01-15 08:30:12] INFO  Cache cleared for /api/posts\n[2025-01-15 08:35:00] INFO  Health check passed\n[2025-01-15 08:40:00] INFO  Health check passed",
        "projects/app.js": 'const express = require("express");\nconst app = express();\napp.listen(3000);',
      },
      goals: [
        {
          id: "use-less",
          description: "Open projects/server.log in a scrollable viewer",
          type: "history_contains",
          value: "less",
          hint: "Type: less projects/server.log to open the log file. Press q to quit.",
        },
      ],
    },

    // ── Lesson 5: Copying Files ────────────────────────────────────
    {
      slug: "copying-files",
      title: "Copying Files",
      description:
        "Use cp to duplicate files and cp -r to copy entire directories.",
      content: parseLessonMarkdown(copyingFilesMd),
      fsSeed: {
        "projects": null,
        "projects/config.json": '{\n  "appName": "Terminal Velocity",\n  "port": 8080,\n  "database": {\n    "host": "localhost",\n    "port": 5432,\n    "name": "tvdb"\n  },\n  "features": {\n    "darkMode": true,\n    "betaFeatures": false\n  }\n}',
        "projects/index.js": 'const config = require("./config.json");\nconsole.log(`Starting ${config.appName}...`);',
        "backups": null,
      },
      goals: [
        {
          id: "copy-config",
          description: "Copy projects/config.json to the backups directory",
          type: "fs_exists",
          value: "/home/user/backups/config.json",
          hint: "Type: cp projects/config.json backups/config.json",
        },
      ],
    },

    // ── Lesson 6: Moving & Renaming ────────────────────────────────
    {
      slug: "moving-renaming",
      title: "Moving & Renaming",
      description:
        "Use mv to move files between directories and rename them in place.",
      content: parseLessonMarkdown(movingRenamingMd),
      fsSeed: {
        "draft-report.txt":
          "Quarterly Report - Q4 2024\n\nRevenue: $1.2M\nGrowth: 15% YoY\nNew customers: 340\n\nKey achievements:\n- Launched mobile app\n- Expanded to 3 new markets\n- Reduced churn by 8%",
        "Documents": null,
        "Documents/archive": null,
        "Documents/archive/old-report.txt": "Quarterly Report - Q3 2024\nRevenue: $1.0M",
        "projects": null,
        "projects/todo.md": "# TODO\n- Finish the quarterly report\n- Move it to Documents",
      },
      goals: [
        {
          id: "move-file",
          description: "Move draft-report.txt to Documents/report.txt",
          type: "fs_exists",
          value: "/home/user/Documents/report.txt",
          hint: "Type: mv draft-report.txt Documents/report.txt",
        },
        {
          id: "original-gone",
          description: "Verify the original draft-report.txt no longer exists",
          type: "custom",
          validate: (ctx) => {
            try {
              ctx.fs.readFile("/home/user/draft-report.txt");
              return false;
            } catch {
              return true;
            }
          },
          hint: "The original file should be gone after using mv. Make sure you used mv, not cp.",
        },
      ],
    },

    // ── Lesson 7: Deleting Safely ──────────────────────────────────
    {
      slug: "deleting-safely",
      title: "Deleting Safely",
      description:
        "Use rm and rmdir to delete files and directories, and understand the dangers of rm -rf.",
      content: parseLessonMarkdown(deletingSafelyMd),
      fsSeed: {
        "temp-notes.txt": "These are temporary notes that can be deleted.\nNothing important here.",
        "old-builds": null,
        "projects": null,
        "projects/app.js": 'console.log("Hello from Terminal Velocity!");',
        "projects/package.json": '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "main": "app.js"\n}',
        "Documents": null,
        "Documents/important.txt": "IMPORTANT: Do NOT delete this file!",
        "keep-this.txt": "This file should survive the cleanup.",
      },
      goals: [
        {
          id: "delete-temp-file",
          description: "Delete the file temp-notes.txt",
          type: "custom",
          validate: (ctx) => {
            try {
              ctx.fs.readFile("/home/user/temp-notes.txt");
              return false;
            } catch {
              return true;
            }
          },
          hint: "Type: rm temp-notes.txt to delete the temporary file.",
        },
        {
          id: "remove-empty-dir",
          description: "Remove the empty old-builds directory",
          type: "custom",
          validate: (ctx) => {
            try {
              ctx.fs.ls("/home/user/old-builds");
              return false;
            } catch {
              return true;
            }
          },
          hint: "Type: rmdir old-builds to remove the empty directory.",
        },
      ],
    },
  ],
};

export default workingWithFilesModule;
