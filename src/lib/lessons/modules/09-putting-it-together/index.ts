import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import realWorldWorkflowMd from "./content/real-world-workflow.md";
import confidenceCheckMd from "./content/confidence-check.md";
import cheatSheetMd from "./content/cheat-sheet.md";

const puttingItTogetherModule: ModuleConfig = {
  slug: "putting-it-together",
  title: "Putting It All Together",
  description: "Apply everything in real-world scenarios",
  lessons: [
    // ── Lesson 1: Real-World Workflow ────────────────────────────────
    {
      slug: "real-world-workflow",
      title: "Real-World Workflow",
      description:
        "Simulate a multi-step developer workflow: navigate a project, investigate logs, and extract data.",
      content: parseLessonMarkdown(realWorldWorkflowMd),
      fsSeed: {
        "webapp": null,
        "webapp/src": null,
        "webapp/src/index.js":
          'const express = require("express");\nconst app = express();\nconst port = process.env.PORT || 3000;\n\napp.get("/", (req, res) => {\n  res.send("Welcome to the webapp!");\n});\n\napp.get("/api/users", (req, res) => {\n  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);\n});\n\napp.listen(port, () => {\n  console.log(`Server running on port ${port}`);\n});',
        "webapp/src/database.js":
          'const { Pool } = require("pg");\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\n\nmodule.exports = {\n  query: (text, params) => pool.query(text, params),\n};',
        "webapp/src/auth.js":
          'const jwt = require("jsonwebtoken");\nconst SECRET = process.env.JWT_SECRET || "dev-secret";\n\nfunction verifyToken(req, res, next) {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).json({ error: "No token" });\n  try {\n    req.user = jwt.verify(token, SECRET);\n    next();\n  } catch (err) {\n    res.status(403).json({ error: "Invalid token" });\n  }\n}',
        "webapp/logs": null,
        "webapp/logs/access.log":
          "[2025-08-10 06:00:01] INFO  Server started on port 3000\n[2025-08-10 06:00:02] INFO  Database connected\n[2025-08-10 06:01:15] INFO  GET /api/users 200 32ms\n[2025-08-10 06:02:30] ERROR TypeError: Cannot read property 'id' of undefined at /src/routes/orders.js:42\n[2025-08-10 06:02:31] WARN  Unhandled promise rejection detected\n[2025-08-10 06:03:00] INFO  GET / 200 8ms\n[2025-08-10 06:04:22] INFO  GET /api/users 200 28ms\n[2025-08-10 06:05:10] ERROR ECONNREFUSED: Connection refused to payment service at 10.0.3.12:443\n[2025-08-10 06:05:11] WARN  Payment service circuit breaker opened\n[2025-08-10 06:06:00] INFO  POST /api/orders 201 142ms\n[2025-08-10 06:07:45] INFO  GET /api/products 200 55ms\n[2025-08-10 06:08:30] ERROR ENOMEM: JavaScript heap out of memory during bulk export\n[2025-08-10 06:08:31] ERROR Process exited with code 137 (OOM killed)\n[2025-08-10 06:09:00] INFO  Server restarted by process manager\n[2025-08-10 06:09:01] INFO  Database reconnected\n[2025-08-10 06:10:00] INFO  Health check passed\n[2025-08-10 06:12:15] WARN  Slow query: getOrderHistory took 1200ms\n[2025-08-10 06:15:00] INFO  Health check passed\n[2025-08-10 06:16:30] ERROR ETIMEDOUT: Database query timed out after 30000ms\n[2025-08-10 06:16:31] WARN  Returning cached data for /api/orders\n[2025-08-10 06:20:00] INFO  Health check passed\n[2025-08-10 06:22:10] INFO  GET /api/products 200 48ms\n[2025-08-10 06:25:00] INFO  Health check passed\n[2025-08-10 06:28:45] ERROR ENOSPC: No space left on device — failed to write to /tmp/export.csv\n[2025-08-10 06:30:00] INFO  Health check passed",
        "webapp/package.json":
          '{\n  "name": "webapp",\n  "version": "2.1.0",\n  "description": "Production web application",\n  "main": "src/index.js",\n  "scripts": {\n    "start": "node src/index.js",\n    "dev": "nodemon src/index.js",\n    "test": "jest"\n  },\n  "dependencies": {\n    "express": "^4.18.2",\n    "pg": "^8.11.3",\n    "jsonwebtoken": "^9.0.2"\n  }\n}',
        "webapp/README.md":
          "# Webapp\n\nProduction web application.\n\n## Setup\n\n```\nnpm install\nnpm run dev\n```\n\n## Logs\n\nAccess logs are in `logs/access.log`. Use `grep` to filter by level:\n\n```\ngrep ERROR logs/access.log\ngrep WARN logs/access.log\n```",
      },
      goals: [
        {
          id: "navigate-to-project",
          description: "Navigate to the webapp directory",
          type: "cwd_equals",
          value: "/home/user/webapp",
          hint: "Type: cd webapp to enter the project directory.",
        },
        {
          id: "search-logs",
          description: "Search the logs for errors using grep",
          type: "history_contains",
          value: "grep",
          hint: 'Type: grep "ERROR" logs/access.log to find all error lines.',
        },
        {
          id: "save-errors",
          description: "Save errors to an errors.txt file using redirection",
          type: "fs_exists",
          value: "/home/user/webapp/errors.txt",
          hint: 'Type: grep "ERROR" logs/access.log > errors.txt to save errors to a file.',
        },
        {
          id: "count-errors",
          description: "Count the number of errors using wc",
          type: "history_contains",
          value: "wc",
          hint: "Type: wc -l errors.txt to count the error lines.",
        },
      ],
    },

    // ── Lesson 2: Terminal Confidence Check ──────────────────────────
    {
      slug: "confidence-check",
      title: "Terminal Confidence Check",
      description:
        "Final challenge: find hidden files, organize data, create directories, and build pipelines.",
      content: parseLessonMarkdown(confidenceCheckMd),
      fsSeed: {
        "challenge": null,
        "challenge/data.csv":
          "name,score,grade\nAlice,92,A\nBob,78,C\nCharlie,95,A\nDiana,88,B\nEdward,72,C\nFiona,91,A\nGeorge,85,B\nHannah,97,A\nIvan,68,D\nJulia,82,B\nKevin,90,A\nLaura,76,C\nMike,94,A\nNina,81,B\nOscar,71,C",
        "challenge/README.md":
          "# Challenge Directory\n\nThis is the final challenge. Explore the structure, find hidden files,\norganize data, and demonstrate your terminal skills.\n\nGood luck!",
        "challenge/notes.txt":
          "Hints:\n- Hidden files start with a dot (.)\n- Use ls -a to see hidden files\n- The secret key is buried in a nested directory\n- Use find to search recursively",
        "challenge/docs": null,
        "challenge/docs/guide.md":
          "# User Guide\n\nWelcome to the application. This guide covers the basics\nof getting started with the platform.",
        "challenge/docs/api.md":
          "# API Reference\n\n## GET /api/users\nReturns a list of users.\n\n## POST /api/users\nCreates a new user.\n\n## GET /api/scores\nReturns all scores.",
        "challenge/docs/changelog.md":
          "# Changelog\n\n## v3.0.0\n- Complete redesign\n- New scoring algorithm\n\n## v2.5.0\n- Added grade calculation\n- Performance improvements\n\n## v2.0.0\n- Initial public release",
        "challenge/config": null,
        "challenge/config/app.json":
          '{\n  "name": "challenge-app",\n  "version": "3.0.0",\n  "port": 8080,\n  "features": {\n    "scoring": true,\n    "grading": true,\n    "export": false\n  }\n}',
        "challenge/config/settings": null,
        "challenge/config/settings/defaults.json":
          '{\n  "theme": "dark",\n  "language": "en",\n  "timezone": "UTC",\n  "pageSize": 25\n}',
        "challenge/config/settings/.secret-key":
          "sk_live_a1b2c3d4e5f6g7h8i9j0_terminal_velocity_2025",
        "challenge/src": null,
        "challenge/src/index.js":
          'const app = require("./app");\nconst port = process.env.PORT || 8080;\napp.listen(port, () => console.log(`Running on ${port}`));',
        "challenge/src/app.js":
          'const express = require("express");\nconst app = express();\napp.get("/", (req, res) => res.send("Challenge App"));\nmodule.exports = app;',
        "challenge/src/utils.js":
          "export function average(arr) {\n  return arr.reduce((sum, n) => sum + n, 0) / arr.length;\n}\n\nexport function letterGrade(score) {\n  if (score >= 90) return 'A';\n  if (score >= 80) return 'B';\n  if (score >= 70) return 'C';\n  if (score >= 60) return 'D';\n  return 'F';\n}",
        "challenge/assets": null,
        "challenge/assets/logo.svg":
          '<svg viewBox="0 0 200 200">\n  <circle cx="100" cy="100" r="80" fill="#3b82f6"/>\n  <text x="100" y="115" text-anchor="middle" fill="white" font-size="48">TV</text>\n</svg>',
        "challenge/assets/banner.txt":
          "  _____ _           _ _\n |_   _| |__   __ _| | | ___ _ __   __ _  ___ \n   | | | '_ \\ / _` | | |/ _ \\ '_ \\ / _` |/ _ \\\n   | | | | | | (_| | | |  __/ | | | (_| |  __/\n   |_| |_| |_|\\__,_|_|_|\\___|_| |_|\\__, |\\___|\n                                    |___/",
      },
      goals: [
        {
          id: "find-hidden-file",
          description:
            "Find the hidden .secret-key file (use ls -a or find)",
          type: "command_output_contains",
          value: ".secret",
          hint: 'Try: ls -a challenge/config/settings/ or find challenge/ -name ".*" to locate hidden files.',
        },
        {
          id: "create-results-dir",
          description: "Create the challenge/results directory",
          type: "fs_is_directory",
          value: "/home/user/challenge/results",
          hint: "Type: mkdir challenge/results to create the directory.",
        },
        {
          id: "copy-data-file",
          description: "Copy data.csv into the challenge/results directory",
          type: "fs_exists",
          value: "/home/user/challenge/results/data.csv",
          hint: "Type: cp challenge/data.csv challenge/results/data.csv",
        },
        {
          id: "use-piping",
          description: "Use a pipe (|) to process some data",
          type: "history_contains",
          value: "|",
          hint: 'Try: cat challenge/data.csv | grep "A" or cat challenge/data.csv | sort',
        },
        {
          id: "navigate-deep",
          description: "Navigate to the challenge/config/settings directory",
          type: "cwd_equals",
          value: "/home/user/challenge/config/settings",
          hint: "Type: cd challenge/config/settings (or cd /home/user/challenge/config/settings for the absolute path).",
        },
      ],
    },

    // ── Lesson 3: Your Cheat Sheet ──────────────────────────────────
    {
      slug: "cheat-sheet",
      title: "Your Cheat Sheet",
      description:
        "A comprehensive reference card for every command and shortcut you've learned.",
      informational: true,
      content: parseLessonMarkdown(cheatSheetMd),
      fsSeed: {},
      goals: [
        {
          id: "cheat-sheet-read",
          description: "Review the cheat sheet",
          type: "custom",
          validate: () => true,
          hint: "This is a reference page. You've already completed it!",
        },
      ],
    },
  ],
};

export default puttingItTogetherModule;
