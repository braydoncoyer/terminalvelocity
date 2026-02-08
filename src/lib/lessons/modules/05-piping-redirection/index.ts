import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import standardStreamsMd from "./content/standard-streams.md";
import outputRedirectionMd from "./content/output-redirection.md";
import pipeOperatorMd from "./content/pipe-operator.md";
import pipeChainsMd from "./content/pipe-chains.md";
import textProcessingMd from "./content/text-processing.md";
import buildingPipelinesMd from "./content/building-pipelines.md";

const pipingRedirectionModule: ModuleConfig = {
  slug: "piping-redirection",
  title: "Piping & Redirection",
  description: "Chain commands together and redirect output",
  lessons: [
    // ── Lesson 1: Standard Streams ──────────────────────────────────
    {
      slug: "standard-streams",
      title: "Standard Streams",
      description:
        "Understand stdin, stdout, and stderr — the three channels every command uses to communicate.",
      content: parseLessonMarkdown(standardStreamsMd),
      fsSeed: {
        "message.txt":
          "This text is stored in a file.\nWhen you run cat, it reads this file\nand sends each line to stdout (your screen).",
        "notes.txt":
          "Streams are like plumbing for data.\nstdin = input, stdout = output, stderr = errors.",
      },
      goals: [
        {
          id: "use-echo-or-cat",
          description: "Run echo or cat to see standard output in action",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.startsWith("echo") || cmd.startsWith("cat")
            ),
          hint: 'Type: echo "Hello from stdout!" or cat message.txt and press Enter.',
        },
      ],
    },

    // ── Lesson 2: Output Redirection ────────────────────────────────
    {
      slug: "output-redirection",
      title: "Output Redirection",
      description:
        "Use > to write command output to a file and >> to append without overwriting.",
      content: parseLessonMarkdown(outputRedirectionMd),
      fsSeed: {
        "notes.txt":
          "Redirection lets you save command output to files.\nThis is incredibly useful for logging and data processing.",
      },
      goals: [
        {
          id: "create-output-file",
          description: "Create greeting.txt using output redirection (>)",
          type: "fs_exists",
          value: "/home/user/greeting.txt",
          hint: 'Type: echo "Hello, world!" > greeting.txt to redirect output to a file.',
        },
      ],
    },

    // ── Lesson 3: The Pipe Operator ─────────────────────────────────
    {
      slug: "pipe-operator",
      title: "The Pipe Operator",
      description:
        "Use the | operator to send one command's output directly into another command's input.",
      content: parseLessonMarkdown(pipeOperatorMd),
      fsSeed: {
        "project": null,
        "project/index.html":
          '<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><div id="root"></div></body>\n</html>',
        "project/app.js":
          'import React from "react";\nconst App = () => <h1>Hello</h1>;\nexport default App;',
        "project/utils.js":
          "export const formatDate = (d) => d.toLocaleDateString();\nexport const capitalize = (s) => s[0].toUpperCase() + s.slice(1);",
        "project/styles.css":
          "body { margin: 0; font-family: sans-serif; }\n.container { max-width: 800px; margin: 0 auto; }",
        "project/README.md":
          "# My Project\nA sample web application for learning piping.",
        "project/config.json":
          '{\n  "name": "my-project",\n  "version": "1.0.0"\n}',
        "project/helpers.js":
          "export function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}",
        "project/theme.css":
          ":root {\n  --primary: #3b82f6;\n  --bg: #0f172a;\n  --text: #e2e8f0;\n}",
        "project/api.js":
          'const BASE_URL = "https://api.example.com";\nexport const fetchUsers = () => fetch(`${BASE_URL}/users`);',
        "project/logo.svg":
          '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>',
        "project/data.txt":
          "user1,Alice,admin\nuser2,Bob,editor\nuser3,Charlie,viewer",
        "project/notes.md": "# Dev Notes\n- Fix the login bug\n- Add dark mode",
      },
      goals: [
        {
          id: "use-pipe",
          description: "Use the pipe operator (|) to chain two commands together",
          type: "history_contains",
          value: "|",
          hint: 'Type: ls project/ | grep ".js" to filter the file listing.',
        },
      ],
    },

    // ── Lesson 4: Useful Pipe Chains ────────────────────────────────
    {
      slug: "pipe-chains",
      title: "Useful Pipe Chains",
      description:
        "Learn common pipe combinations: cat | grep, ls | wc, and sort | uniq.",
      content: parseLessonMarkdown(pipeChainsMd),
      fsSeed: {
        "reports": null,
        "reports/q1-sales.csv":
          "month,revenue\nJan,45000\nFeb,52000\nMar,48000",
        "reports/q2-sales.csv":
          "month,revenue\nApr,51000\nMay,63000\nJun,59000",
        "reports/q3-sales.csv":
          "month,revenue\nJul,61000\nAug,67000\nSep,64000",
        "reports/q4-sales.csv":
          "month,revenue\nOct,70000\nNov,82000\nDec,95000",
        "reports/annual-summary.txt":
          "Total Revenue: $757,000\nGrowth: 23% YoY\nBest Month: December ($95,000)",
        "reports/team-notes.md":
          "# Team Notes\n- Q4 exceeded expectations\n- Plan expansion for next year",
        "reports/expenses.csv":
          "category,amount\nSalaries,320000\nOffice,45000\nMarketing,89000\nInfra,62000",
        "reports/projections.txt":
          "2026 Projected Revenue: $930,000\n2026 Projected Growth: 22%",
        "server.log":
          "[2025-06-01 10:00:01] INFO  Server started\n[2025-06-01 10:01:15] INFO  GET /api/users 200 42ms\n[2025-06-01 10:02:30] ERROR Database connection timeout\n[2025-06-01 10:02:31] INFO  Retrying connection...\n[2025-06-01 10:02:32] INFO  Database reconnected\n[2025-06-01 10:05:00] INFO  GET /api/posts 200 38ms\n[2025-06-01 10:06:22] WARN  Slow query: getComments (450ms)\n[2025-06-01 10:07:00] ERROR Failed to send email notification\n[2025-06-01 10:08:15] INFO  POST /api/users 201 55ms\n[2025-06-01 10:10:00] INFO  Health check passed\n[2025-06-01 10:15:00] INFO  Health check passed\n[2025-06-01 10:20:00] ERROR Disk space warning: 92% used\n[2025-06-01 10:25:00] INFO  Health check passed",
        "names.txt":
          "Charlie\nAlice\nBob\nAlice\nDave\nBob\nEve\nCharlie\nAlice\nBob\nDave\nEve\nAlice",
      },
      goals: [
        {
          id: "use-pipe-chain",
          description:
            "Use a pipe chain with wc or grep (e.g., ls | wc -l or cat | grep)",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) =>
                (cmd.includes("|") && cmd.includes("wc")) ||
                (cmd.includes("|") && cmd.includes("grep"))
            ),
          hint: "Type: ls reports/ | wc -l to count the files in the reports directory.",
        },
      ],
    },

    // ── Lesson 5: Text Processing Commands ──────────────────────────
    {
      slug: "text-processing",
      title: "Text Processing Commands",
      description:
        "Master grep, wc, sort, and uniq — the essential toolkit for processing text data.",
      content: parseLessonMarkdown(textProcessingMd),
      fsSeed: {
        "visitors.txt":
          "alice@example.com\nbob@example.com\ncharlie@example.com\nalice@example.com\ndave@example.com\nbob@example.com\neve@example.com\nalice@example.com\ncharlie@example.com\nbob@example.com\nfrank@example.com\nalice@example.com\ndave@example.com\neve@example.com\nbob@example.com\ncharlie@example.com\nalice@example.com\ngrace@example.com\nbob@example.com\nalice@example.com",
        "log.txt":
          "[INFO] Page loaded in 120ms\n[ERROR] Failed to fetch user profile\n[INFO] User logged in: alice\n[WARN] Deprecated API call detected\n[INFO] Page loaded in 95ms\n[ERROR] Database query timeout after 5000ms\n[INFO] User logged in: bob\n[INFO] Cache hit for /api/posts\n[ERROR] 404 Not Found: /api/legacy/users\n[INFO] User logged out: alice\n[WARN] Memory usage above 80%\n[INFO] Batch job completed in 3200ms\n[ERROR] SSL certificate expires in 7 days",
      },
      goals: [
        {
          id: "use-sort-or-uniq",
          description:
            "Use sort or uniq to process the visitors list",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("sort") || cmd.includes("uniq")
            ),
          hint: "Type: sort visitors.txt | uniq to see the unique visitors.",
        },
      ],
    },

    // ── Lesson 6: Building Pipelines ────────────────────────────────
    {
      slug: "building-pipelines",
      title: "Building Pipelines",
      description:
        "Combine three or more commands into multi-stage pipelines to process data in a single line.",
      content: parseLessonMarkdown(buildingPipelinesMd),
      fsSeed: {
        "sales.csv":
          "date,product,amount\n2025-01-15,Widget,29.99\n2025-01-15,Gadget,49.99\n2025-01-16,Widget,29.99\n2025-01-16,Doohickey,19.99\n2025-01-17,Gadget,49.99\n2025-01-17,Widget,29.99\n2025-01-17,Thingamajig,39.99\n2025-01-18,Doohickey,19.99\n2025-01-18,Widget,29.99\n2025-01-18,Gadget,49.99\n2025-01-19,Thingamajig,39.99\n2025-01-19,Widget,29.99\n2025-01-19,Doohickey,19.99\n2025-01-20,Gadget,49.99\n2025-01-20,Widget,29.99\n2025-01-20,Widget,29.99\n2025-01-21,Doohickey,19.99\n2025-01-21,Thingamajig,39.99\n2025-01-21,Gadget,49.99",
        "visitors.csv":
          "alice@example.com\nbob@example.com\nalice@example.com\ncharlie@example.com\nbob@example.com\nalice@example.com\ndave@example.com\nalice@example.com\nbob@example.com\ncharlie@example.com",
        "server.log":
          "[2025-06-01 08:00:01] INFO  Server started on port 3000\n[2025-06-01 08:01:12] INFO  GET /api/users 200 45ms\n[2025-06-01 08:02:30] ERROR Database connection timeout\n[2025-06-01 08:02:45] ERROR Retry failed: connection refused\n[2025-06-01 08:03:00] INFO  Database reconnected\n[2025-06-01 08:05:10] WARN  Slow query: listPosts (890ms)\n[2025-06-01 08:06:22] INFO  GET /api/posts 200 38ms\n[2025-06-01 08:07:00] ERROR Failed to send notification email\n[2025-06-01 08:08:15] INFO  POST /api/users 201 55ms\n[2025-06-01 08:10:00] INFO  Health check passed\n[2025-06-01 08:12:30] ERROR Rate limit exceeded for IP 10.0.0.5\n[2025-06-01 08:15:00] INFO  Health check passed",
        "contacts.csv":
          "Alice Johnson,Marketing,alice@company.com\nBob Smith,Engineering,bob@company.com\nCharlie Brown,Marketing,charlie@company.com\nDiana Prince,Engineering,diana@company.com\nEdward Norton,Sales,edward@company.com\nFiona Apple,Marketing,fiona@company.com",
      },
      goals: [
        {
          id: "multi-pipe",
          description:
            "Build a pipeline with 3 or more commands (at least 2 pipe characters)",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => {
              const pipeCount = (cmd.match(/\|/g) || []).length;
              return pipeCount >= 2;
            }),
          hint: 'Try: cat sales.csv | grep -v "product" | sort | uniq -c | sort -rn',
        },
      ],
    },
  ],
};

export default pipingRedirectionModule;
