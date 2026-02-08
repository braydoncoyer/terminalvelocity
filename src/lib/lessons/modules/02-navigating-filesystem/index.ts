import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import filesystemTreeMd from "./content/filesystem-tree.md";
import changingDirectoriesMd from "./content/changing-directories.md";
import lookingAroundMd from "./content/looking-around.md";
import absoluteVsRelativeMd from "./content/absolute-vs-relative.md";
import movingAroundMd from "./content/moving-around.md";
import tabCompletionMd from "./content/tab-completion.md";
import findingFilesMd from "./content/finding-files.md";

const navigatingFilesystemModule: ModuleConfig = {
  slug: "navigating-filesystem",
  title: "Navigating the Filesystem",
  description: "Learn to move around the filesystem with confidence",
  lessons: [
    // ── Lesson 1: The Filesystem Tree ──────────────────────────────
    {
      slug: "filesystem-tree",
      title: "The Filesystem Tree",
      description:
        "Understand the root directory, home directory, and how the filesystem is organized as a tree.",
      content: parseLessonMarkdown(filesystemTreeMd),
      fsSeed: {
        "/bin": null,
        "/usr": null,
        "/usr/local": null,
        "/usr/local/bin": null,
        "/etc": null,
        "/etc/hostname": "terminal-velocity",
        "/etc/hosts": "127.0.0.1  localhost",
        "/var": null,
        "/var/log": null,
        "/var/log/system.log": "System started successfully.",
        "/tmp": null,
        "/tmp/.cache": null,
        "projects": null,
        "documents": null,
      },
      goals: [
        {
          id: "ls-root",
          description: "Run ls / to explore the root directory",
          type: "history_contains",
          value: "ls /",
          hint: "Type: ls / and press Enter to see the top-level directories.",
        },
      ],
    },

    // ── Lesson 2: Changing Directories ─────────────────────────────
    {
      slug: "changing-directories",
      title: "Changing Directories",
      description:
        "Learn cd to move between directories and pwd to verify your location.",
      content: parseLessonMarkdown(changingDirectoriesMd),
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/webapp/index.html": "<!DOCTYPE html><html><body>Hello World</body></html>",
        "projects/webapp/style.css": "body { font-family: sans-serif; }",
        "projects/api": null,
        "projects/api/server.js": 'const express = require("express");\nconst app = express();\napp.listen(3000);',
        "projects/api/package.json": '{\n  "name": "api",\n  "version": "1.0.0"\n}',
        "Documents": null,
        "Documents/notes.txt": "Remember to review the API docs.",
      },
      goals: [
        {
          id: "navigate-to-api",
          description: "Navigate into the projects/api directory",
          type: "cwd_equals",
          value: "/home/user/projects/api",
          hint: "Type: cd projects/api and press Enter to move into that directory.",
        },
        {
          id: "verify-location",
          description: "Confirm your current location",
          type: "history_contains",
          value: "pwd",
          hint: "Type: pwd and press Enter to see your current location.",
        },
      ],
    },

    // ── Lesson 3: Looking Around ───────────────────────────────────
    {
      slug: "looking-around",
      title: "Looking Around",
      description:
        "Explore ls variations to see hidden files, file details, and human-readable sizes.",
      content: parseLessonMarkdown(lookingAroundMd),
      fsSeed: {
        ".bashrc": '# ~/.bashrc\nexport PS1="\\u@\\h:\\w $ "\nalias ll="ls -la"',
        ".gitconfig": '[user]\n  name = Terminal Student\n  email = student@example.com',
        ".config": null,
        ".config/settings.json": '{\n  "theme": "dark",\n  "fontSize": 14\n}',
        ".hidden-file": "You found the hidden file! Nice work.",
        "projects": null,
        "projects/app.js": 'console.log("Hello");',
        "readme.txt": "Welcome to the terminal.",
        "notes.md": "# Notes\n- Learn ls flags\n- Practice hidden files",
      },
      goals: [
        {
          id: "ls-hidden",
          description: "Reveal the hidden files in your home directory",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("ls -a") || cmd.includes("ls -la") || cmd.includes("ls -al") || cmd.includes("ls -lah") || cmd.includes("ls -lha")
            ),
          hint: "Type: ls -a or ls -la to see hidden files (those starting with a dot).",
        },
      ],
    },

    // ── Lesson 4: Absolute vs Relative Paths ───────────────────────
    {
      slug: "absolute-vs-relative",
      title: "Absolute vs Relative Paths",
      description:
        "Understand the difference between absolute paths (from root) and relative paths (from here).",
      content: parseLessonMarkdown(absoluteVsRelativeMd),
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/webapp/src": null,
        "projects/webapp/src/index.js": 'import App from "./App";\nReactDOM.render(<App />, document.getElementById("root"));',
        "projects/webapp/src/App.js": "function App() {\n  return <h1>Hello World</h1>;\n}",
        "projects/webapp/package.json": '{\n  "name": "webapp",\n  "version": "2.0.0"\n}',
        "projects/api": null,
        "projects/api/server.js": 'app.get("/", (req, res) => res.send("OK"));',
        "projects/api/routes": null,
        "projects/api/routes/users.js": '// GET /users\nmodule.exports = router;',
        "Documents": null,
        "Documents/todo.txt": "1. Learn absolute paths\n2. Learn relative paths\n3. Practice both",
      },
      goals: [
        {
          id: "use-absolute",
          description: "Navigate to a directory using an absolute path",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.startsWith("cd /")
            ),
          hint: "Type a cd command with a path starting from root, like: cd /home/user/projects",
        },
        {
          id: "use-relative",
          description: "Navigate somewhere using a relative path",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) =>
                cmd.startsWith("cd ") &&
                !cmd.startsWith("cd /") &&
                !cmd.startsWith("cd ~") &&
                cmd.trim() !== "cd" &&
                cmd.trim() !== "cd -"
            ),
          hint: "Type a cd command with a relative path, like: cd projects or cd ../api",
        },
      ],
    },

    // ── Lesson 5: Moving Around ────────────────────────────────────
    {
      slug: "moving-around",
      title: "Moving Around",
      description:
        "Master cd with all its shortcuts: .., ~, /, and - for jumping back.",
      content: parseLessonMarkdown(movingAroundMd),
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/webapp/src": null,
        "projects/webapp/src/components": null,
        "projects/webapp/src/components/Header.jsx": "export default function Header() {\n  return <header>Terminal Velocity</header>;\n}",
        "projects/webapp/src/components/Footer.jsx": "export default function Footer() {\n  return <footer>&copy; 2025</footer>;\n}",
        "projects/webapp/src/components/Sidebar.jsx": "export default function Sidebar() {\n  return <aside>Navigation</aside>;\n}",
        "projects/webapp/src/index.js": 'import Header from "./components/Header";',
        "projects/webapp/public": null,
        "projects/webapp/public/index.html": "<!DOCTYPE html><html><body><div id=\"root\"></div></body></html>",
        "projects/api": null,
        "projects/api/index.js": 'const app = require("express")();',
        "Documents": null,
        "Documents/journal.txt": "Day 1: Learning to navigate the filesystem.",
      },
      goals: [
        {
          id: "navigate-deep",
          description: "Find and navigate to the components directory",
          type: "cwd_equals",
          value: "/home/user/projects/webapp/src/components",
          hint: "Type: cd projects/webapp/src/components (or use the absolute path).",
        },
        {
          id: "return-home",
          description: "Return to your home directory",
          type: "cwd_equals",
          value: "/home/user",
          hint: "Type: cd ~ or just cd to go back to your home directory.",
        },
      ],
    },

    // ── Lesson 6: Tab Completion ───────────────────────────────────
    {
      slug: "tab-completion",
      title: "Tab Completion",
      description:
        "Use Tab to auto-complete file and directory names — the single biggest time-saver in the terminal.",
      informational: true,
      content: parseLessonMarkdown(tabCompletionMd),
      fsSeed: {
        "projects": null,
        "projects/webapp": null,
        "projects/website": null,
        "projects/widget-lib": null,
        "photos": null,
        "photos/vacation": null,
        "photos/vacation/beach.jpg": "(image data)",
        "Documents": null,
        "Documents/resume.pdf": "(pdf data)",
        "Downloads": null,
        "Downloads/installer.dmg": "(installer data)",
      },
      goals: [],
    },

    // ── Lesson 7: Finding Files ────────────────────────────────────
    {
      slug: "finding-files",
      title: "Finding Files",
      description:
        "Use find to search the filesystem by name, type, and other criteria.",
      content: parseLessonMarkdown(findingFilesMd),
      fsSeed: {
        "projects": null,
        "projects/frontend": null,
        "projects/frontend/src": null,
        "projects/frontend/src/index.js": 'console.log("Hello");',
        "projects/frontend/src/utils": null,
        "projects/frontend/src/utils/helpers.js": "export function capitalize(s) { return s[0].toUpperCase() + s.slice(1); }",
        "projects/frontend/README.md": "# Frontend\nA React application.",
        "projects/backend": null,
        "projects/backend/src": null,
        "projects/backend/src/server.js": "const http = require('http');",
        "projects/backend/config": null,
        "projects/backend/config/.secret-config": "DB_HOST=localhost\nDB_PORT=5432\nDB_PASSWORD=supersecret",
        "projects/backend/README.md": "# Backend\nA Node.js API server.",
        "Documents": null,
        "Documents/notes.md": "# Study Notes\n- Learn find\n- Learn which",
      },
      goals: [
        {
          id: "find-hidden-file",
          description: "Locate the hidden configuration file",
          type: "command_output_contains",
          value: ".secret-config",
          hint: 'Type: find . -name ".secret-config" to search for the hidden file.',
        },
      ],
    },
  ],
};

export default navigatingFilesystemModule;
