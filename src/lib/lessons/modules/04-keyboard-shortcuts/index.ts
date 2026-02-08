import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import cursorBasicsMd from "./content/cursor-basics.md";
import jumpStartEndMd from "./content/jump-start-end.md";
import moveByWordMd from "./content/move-by-word.md";
import deletingTextMd from "./content/deleting-text.md";
import commandHistoryMd from "./content/command-history.md";
import reverseSearchMd from "./content/reverse-search.md";
import historyShortcutsMd from "./content/history-shortcuts.md";
import signalsControlMd from "./content/signals-control.md";
import combiningShortcutsMd from "./content/combining-shortcuts.md";
import speedChallengeMd from "./content/speed-challenge.md";

const keyboardShortcutsModule: ModuleConfig = {
  slug: "keyboard-shortcuts",
  title: "Keyboard Shortcuts",
  description: "Navigate and edit commands at lightning speed",
  lessons: [
    // ── Lesson 1: Cursor Movement Basics ───────────────────────────
    {
      slug: "cursor-basics",
      title: "Cursor Movement Basics",
      description:
        "Learn to move the cursor through a command using arrow keys, Home, and End.",
      content: parseLessonMarkdown(cursorBasicsMd),
      initialInput: "ehco The quick brown fox jumps over the lazy dog",
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/webapp/index.html": "<!DOCTYPE html><html><body>Hello World</body></html>",
        "projects/webapp/style.css": "body { margin: 0; font-family: sans-serif; }",
        "projects/api": null,
        "projects/api/server.js": 'const express = require("express");\nconst app = express();\napp.listen(3000);',
        "notes.txt": "Remember to practice terminal shortcuts every day.",
      },
      goals: [
        {
          id: "fix-typo",
          description: "Fix the typo at the beginning and run the command",
          type: "history_contains",
          value: "echo The quick brown fox jumps over the lazy dog",
          hint: "Move your cursor to the start of the line and fix 'ehco' to 'echo', then press Enter.",
        },
      ],
    },

    // ── Lesson 2: Jump to Start & End ──────────────────────────────
    {
      slug: "jump-start-end",
      title: "Jump to Start & End",
      description:
        "Use Ctrl+A and Ctrl+E to jump to the beginning and end of a command instantly.",
      content: parseLessonMarkdown(jumpStartEndMd),
      initialInput: "cat /etc/hosts",
      fsSeed: {
        "etc": null,
        "etc/hosts": "127.0.0.1   localhost\n::1         localhost\n127.0.0.1   myapp.local",
        "etc/config.yaml": "server:\n  port: 8080\n  host: 0.0.0.0\n  debug: false",
        "var": null,
        "var/log": null,
        "var/log/app.log": "[INFO] Server started on port 8080\n[INFO] Connected to database\n[WARN] Cache miss rate above threshold",
      },
      goals: [
        {
          id: "run-sudo-command",
          description: "Run a command that starts with sudo (practice Ctrl+A to prepend it)",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => cmd.startsWith("sudo")),
          hint: "Type cat /etc/hosts, then press Ctrl+A to jump to the start and type 'sudo ' before it. Press Enter.",
        },
      ],
    },

    // ── Lesson 3: Move by Word ─────────────────────────────────────
    {
      slug: "move-by-word",
      title: "Move by Word",
      description:
        "Navigate through commands word by word with Alt+F and Alt+B.",
      content: parseLessonMarkdown(moveByWordMd),
      initialInput: "ls -la projects/webapp/style.css",
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/webapp/index.html": "<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><h1>Welcome</h1></body>\n</html>",
        "projects/webapp/style.css": "body { font-family: system-ui; }\n.container { max-width: 1200px; margin: 0 auto; }",
        "projects/webapp/app.js": 'document.addEventListener("DOMContentLoaded", () => {\n  console.log("App loaded");\n});',
        "projects/mobile-app": null,
        "projects/mobile-app/App.tsx": "export default function App() {\n  return <View><Text>Hello</Text></View>;\n}",
        "documents": null,
        "documents/meeting-notes.md": "# Team Standup\n- Completed API integration\n- Starting frontend work\n- Blocker: waiting on design assets",
      },
      goals: [
        {
          id: "change-filename",
          description: "Change the filename to index.html and run the command",
          type: "history_contains",
          value: "ls -la projects/webapp/index.html",
          hint: "Use Alt+B or Alt+Left to jump back to 'style.css', delete it with Ctrl+W, type 'index.html', and press Enter.",
        },
      ],
    },

    // ── Lesson 4: Deleting Text Efficiently ────────────────────────
    {
      slug: "deleting-text",
      title: "Deleting Text Efficiently",
      description:
        "Cut words and clear lines with Ctrl+W, Ctrl+U, and Ctrl+K.",
      content: parseLessonMarkdown(deletingTextMd),
      initialInput: "cat projects/api/servre.js",
      fsSeed: {
        "projects": null,
        "projects/api": null,
        "projects/api/server.js": 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200);\n  res.end("Hello World");\n});\n\nserver.listen(3000, () => {\n  console.log("Server running on port 3000");\n});',
        "projects/api/package.json": '{\n  "name": "my-api",\n  "version": "1.0.0",\n  "main": "server.js"\n}',
        "projects/api/README.md": "# API Server\n\nRun with: node server.js",
      },
      goals: [
        {
          id: "run-corrected-command",
          description: "Fix the typo and run the corrected command",
          type: "history_contains",
          value: "cat projects/api/server.js",
          hint: "Type the command with the typo, then use Ctrl+W or arrow keys to fix 'servre.js' to 'server.js', and press Enter.",
        },
      ],
    },

    // ── Lesson 5: Command History ──────────────────────────────────
    {
      slug: "command-history",
      title: "Command History",
      description:
        "Browse and reuse past commands with arrow keys and the history command.",
      content: parseLessonMarkdown(commandHistoryMd),
      initialHistory: [
        "ls -la",
        "cd projects",
        "cat README.md",
        "mkdir src",
        "touch src/index.ts",
        "cd ..",
        "echo hello world",
        "ls documents",
      ],
      fsSeed: {
        "documents": null,
        "documents/todo.md": "# To Do\n- Review pull requests\n- Update documentation\n- Fix login bug\n- Deploy staging",
        "documents/changelog.md": "# Changelog\n\n## v1.2.0\n- Added dark mode\n- Fixed memory leak\n\n## v1.1.0\n- Added search feature\n- Improved performance",
        "scripts": null,
        "scripts/deploy.sh": "#!/bin/bash\necho 'Deploying to production...'\necho 'Build complete.'",
        "scripts/backup.sh": "#!/bin/bash\necho 'Starting backup...'\ntar -czf backup.tar.gz /data\necho 'Backup complete.'",
      },
      goals: [
        {
          id: "run-history",
          description: "Run the history command to see your command history",
          type: "history_contains",
          value: "history",
          hint: "Type: history and press Enter to see all your previous commands.",
        },
      ],
    },

    // ── Lesson 6: Reverse History Search ───────────────────────────
    {
      slug: "reverse-search",
      title: "Reverse History Search",
      description:
        "Instantly find past commands with Ctrl+R incremental search.",
      content: parseLessonMarkdown(reverseSearchMd),
      initialHistory: [
        "ls -la",
        "cd projects/frontend",
        "cat package.json",
        "cd ../backend",
        "cat package.json",
        "cd ../..",
        "ls logs",
        "cat logs/access.log",
        "echo searching is powerful",
        "grep 401 logs/access.log",
      ],
      fsSeed: {
        "projects": null,
        "projects/frontend": null,
        "projects/frontend/package.json": '{\n  "name": "frontend",\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start"\n  }\n}',
        "projects/backend": null,
        "projects/backend/package.json": '{\n  "name": "backend",\n  "scripts": {\n    "dev": "nodemon server.js",\n    "start": "node server.js"\n  }\n}',
        "logs": null,
        "logs/access.log": "GET /api/users 200 12ms\nGET /api/posts 200 45ms\nPOST /api/login 401 8ms\nGET /api/users/1 200 15ms\nGET /favicon.ico 404 2ms",
      },
      goals: [
        {
          id: "run-search-command",
          description: "Echo a phrase, then use Ctrl+R to find and rerun it",
          type: "history_contains",
          value: "echo searching is powerful",
          hint: 'Type: echo searching is powerful — or use Ctrl+R to search for it if you already ran it.',
        },
      ],
    },

    // ── Lesson 7: History Shortcuts ────────────────────────────────
    {
      slug: "history-shortcuts",
      title: "History Shortcuts",
      description:
        "Rerun and reference past commands with !!, !$, and !n bang shortcuts.",
      content: parseLessonMarkdown(historyShortcutsMd),
      initialHistory: [
        "ls -la",
        "cat etc/hosts",
        "echo hello from the terminal",
        "ls projects/webapp",
        "cat data/config.json",
      ],
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/webapp/index.html": "<!DOCTYPE html>\n<html>\n<body><h1>Welcome</h1></body>\n</html>",
        "etc": null,
        "etc/shadow": "root:$6$rounds=4096$salt$hash:18000:0:99999:7:::",
        "etc/hosts": "127.0.0.1   localhost\n::1         localhost",
        "data": null,
        "data/config.json": '{\n  "database": "postgres://localhost:5432/mydb",\n  "redis": "redis://localhost:6379"\n}',
      },
      goals: [
        {
          id: "use-bang-shortcut",
          description: "Use a bang shortcut (!!, !$, or !command) in a command",
          type: "custom",
          validate: (ctx) =>
            ctx.lastCommand.includes("!!") ||
            ctx.lastCommand.includes("!$") ||
            /![a-zA-Z]/.test(ctx.lastCommand) ||
            /!\d+/.test(ctx.lastCommand),
          hint: 'First run any command, then try: sudo !! to repeat it with sudo, or echo !$ to reuse its last argument.',
        },
      ],
    },

    // ── Lesson 8: Signals & Control ────────────────────────────────
    {
      slug: "signals-control",
      title: "Signals & Control",
      description:
        "Cancel commands, send EOF, suspend processes, and clear the screen with Ctrl shortcuts.",
      content: parseLessonMarkdown(signalsControlMd),
      initialCommands: [
        "ls -la projects/server",
        "cat projects/server/requirements.txt",
        "cat tmp/long-running.sh",
      ],
      fsSeed: {
        "projects": null,
        "projects/server": null,
        "projects/server/app.py": "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello, World!'\n\nif __name__ == '__main__':\n    app.run(debug=True, port=5000)",
        "projects/server/requirements.txt": "flask==3.0.0\nrequests==2.31.0\ngunicorn==21.2.0",
        "tmp": null,
        "tmp/long-running.sh": "#!/bin/bash\nwhile true; do\n  echo 'Still running...'\n  sleep 1\ndone",
      },
      goals: [
        {
          id: "clear-and-echo",
          description: "Clear the screen, then run an echo command",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => cmd.startsWith("echo ")),
          hint: "Clear the screen with clear or Ctrl+L, then try: echo hello",
        },
      ],
    },

    // ── Lesson 9: Combining Shortcuts ──────────────────────────────
    {
      slug: "combining-shortcuts",
      title: "Combining Shortcuts",
      description:
        "Put your shortcut skills together to edit commands in a real-world workflow.",
      content: parseLessonMarkdown(combiningShortcutsMd),
      initialInput: "echo deploy --env staging --branch dev --verbse",
      fsSeed: {
        "projects": null,
        "projects/myapp": null,
        "projects/myapp/src": null,
        "projects/myapp/src/index.ts": "import express from 'express';\nconst app = express();\napp.get('/', (req, res) => res.send('OK'));\napp.listen(3000);",
        "projects/myapp/package.json": '{\n  "name": "myapp",\n  "version": "2.1.0",\n  "scripts": {\n    "build": "tsc",\n    "deploy": "echo Deploying...",\n    "test": "jest"\n  }\n}',
        "projects/myapp/.env": "DATABASE_URL=postgres://localhost:5432/myapp\nREDIS_URL=redis://localhost:6379\nNODE_ENV=production",
        "projects/myapp/Makefile": "deploy:\n\t@echo 'Deploying to production...'\n\nbuild:\n\t@echo 'Building project...'\n\ntest:\n\t@echo 'Running tests...'",
      },
      goals: [
        {
          id: "run-deploy-command",
          description: "Run a command containing: deploy --env production --branch main --verbose",
          type: "history_contains",
          value: "deploy --env production --branch main --verbose",
          hint: "Type: echo deploy --env production --branch main --verbose",
        },
      ],
    },

    // ── Lesson 10: Speed Challenge ─────────────────────────────────
    {
      slug: "speed-challenge",
      title: "Speed Challenge",
      description:
        "Put everything together in a timed editing challenge to test your shortcut mastery.",
      content: parseLessonMarkdown(speedChallengeMd),
      fsSeed: {
        "logs": null,
        "logs/access.log": "2024-01-15 10:23:01 GET /api/users 200 12ms\n2024-01-15 10:23:05 POST /api/login 200 89ms\n2024-01-15 10:23:12 GET /api/posts 200 34ms\n2024-01-15 10:24:01 GET /api/users/5 200 8ms\n2024-01-15 10:24:15 DELETE /api/posts/3 204 15ms",
        "logs/error.log": "2024-01-15 10:25:01 ERROR [db] Connection timeout after 5000ms\n2024-01-15 10:25:02 ERROR [db] Retry attempt 1/3\n2024-01-15 10:25:04 ERROR [db] Retry attempt 2/3\n2024-01-15 10:25:06 INFO  [db] Connection restored\n2024-01-15 10:30:00 WARN  [cache] Memory usage at 85%",
        "logs/deploy.log": "Deploy started at 2024-01-14 18:00:00\nPulling latest from main...\nInstalling dependencies...\nRunning migrations...\nRestarting services...\nDeploy completed at 2024-01-14 18:02:34\nHealth check: PASSED",
        "scripts": null,
        "scripts/deploy.sh": "#!/bin/bash\nset -e\n\necho '=== Starting deployment ==='\ngit pull origin main\nnpm ci\nnpm run build\nnpm run migrate\npm2 restart all\necho '=== Deployment complete ==='",
        "scripts/backup.sh": "#!/bin/bash\nDATE=$(date +%Y%m%d)\npg_dump mydb > backup_$DATE.sql\necho 'Backup saved as backup_'$DATE'.sql'",
        "config": null,
        "config/nginx.conf": "server {\n    listen 80;\n    server_name example.com;\n\n    location / {\n        proxy_pass http://localhost:3000;\n    }\n}",
      },
      goals: [
        {
          id: "list-logs",
          description: "List the contents of the logs directory",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.startsWith("ls") && cmd.includes("logs")
            ) || (ctx.cwd.endsWith("/logs") && ctx.history.some((cmd) => cmd.startsWith("ls"))),
          hint: "Type: ls -la logs/",
        },
        {
          id: "view-error-log",
          description: "Read logs/error.log",
          type: "history_contains",
          value: "cat logs/error.log",
          hint: "Type: cat logs/error.log",
        },
        {
          id: "view-deploy-script",
          description: "Read scripts/deploy.sh",
          type: "history_contains",
          value: "cat scripts/deploy.sh",
          hint: "Type: cat scripts/deploy.sh",
        },
        {
          id: "echo-victory",
          description: "Print the phrase: keyboard shortcuts mastered",
          type: "history_contains",
          value: "keyboard shortcuts mastered",
          hint: 'Type: echo "keyboard shortcuts mastered"',
        },
      ],
    },
  ],
};

export default keyboardShortcutsModule;
