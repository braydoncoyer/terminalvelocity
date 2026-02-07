import type { ModuleConfig } from "@/lib/lessons/types";

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
      content: [
        {
          type: "text",
          content:
            "Everything you've learned — navigation, file operations, piping, redirection — comes together in real developer workflows. In this lesson you'll step into a realistic scenario: you've just joined a project and need to investigate a production issue. A user reported errors, and your job is to find out what's going wrong.",
        },
        {
          type: "text",
          content:
            "The project directory contains source code, configuration, and a `logs/` folder with an `access.log` file. The log is filled with INFO, WARN, and ERROR lines. Your mission: navigate to the project, search the logs for errors, save those errors to a file, and count how many there are. This is exactly how developers debug production issues every day.",
        },
        {
          type: "code",
          content:
            '# Step 1: Navigate to the project\ncd webapp\n\n# Step 2: Search the logs for errors\ngrep "ERROR" logs/access.log\n\n# Step 3: Save errors to a file\ngrep "ERROR" logs/access.log > errors.txt\n\n# Step 4: Count the errors\nwc -l errors.txt',
          language: "bash",
        },
        {
          type: "text",
          content:
            "Notice how each step builds on skills from a different module. Navigation from Module 2. Reading files and `grep` from Modules 3 and 5. Redirection from Module 5. Counting with `wc` from Module 5 again. None of these steps are complicated on their own — the power is in combining them into a coherent workflow.",
        },
        {
          type: "tip",
          content:
            "In real life, you'd often pipe these together: `grep \"ERROR\" logs/access.log | tee errors.txt | wc -l`. The `tee` command saves to a file AND passes output through the pipe. But don't worry about doing everything in one line — clarity beats cleverness.",
        },
        {
          type: "text",
          content:
            "Complete all four goals below: navigate to the project, search the logs, save the errors to a file, and count them. Take it step by step, just like you would on the job.",
        },
        {
          type: "windows-callout",
          content:
            "This workflow translates directly to Windows. In PowerShell: `Set-Location webapp`, `Select-String 'ERROR' logs/access.log`, `Select-String 'ERROR' logs/access.log | Out-File errors.txt`, and `(Get-Content errors.txt).Count`. Same logic, different syntax.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "This is the final challenge. You have a `challenge/` directory with a realistic project structure — nested folders, hidden files, data files, and more. Your mission has five objectives that draw from everything you've learned across all modules. There are no step-by-step instructions this time. You know enough to figure it out.",
        },
        {
          type: "text",
          content:
            "Here's what you need to accomplish:\n\n1. **Find the hidden file** — There's a file called `.secret-key` buried somewhere in the nested directories. Use `ls -a` or `find` to track it down.\n2. **Create a new directory** — Create a directory called `challenge/results` to store your work.\n3. **Copy a file** — Copy `challenge/data.csv` into your new `challenge/results` directory.\n4. **Use piping** — Use a pipe to process some data (for example, `cat` the CSV and `grep` for specific entries, or `sort` and `uniq` the data).\n5. **Navigate deep** — `cd` into the `challenge/config/settings` directory.",
        },
        {
          type: "code",
          content:
            '# Some commands that might help:\nls -la challenge/               # see what\'s inside (including hidden)\nls -aR challenge/               # recursive listing to find hidden files\nfind challenge/ -name ".*"      # find hidden files\nmkdir challenge/results         # create a new directory\ncp challenge/data.csv challenge/results/data.csv\ncat challenge/data.csv | sort\ncd challenge/config/settings',
          language: "bash",
        },
        {
          type: "text",
          content:
            "The five goals can be completed in any order. Take your time, explore the filesystem, and use everything you've learned. If you get stuck, try `ls` to look around, `pwd` to check where you are, and `cd ..` to back up.",
        },
        {
          type: "tip",
          content:
            "Remember: hidden files start with a dot (.) and only show up when you use `ls -a`. The `find` command with `-name \".*\"` is a quick way to locate hidden files in a directory tree. Don't forget `ls -aR` for a recursive listing that includes hidden files.",
        },
        {
          type: "windows-callout",
          content:
            "On Windows, hidden files have a \"hidden\" attribute rather than a dot prefix. In PowerShell, `Get-ChildItem -Force -Recurse` reveals hidden items. In WSL, hidden files follow the Linux dot convention.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "Congratulations on completing Terminal Velocity! Below is a comprehensive reference of everything you've learned. Bookmark this page, print it out, or screenshot it. This is your terminal cheat sheet -- the commands and patterns that will serve you every day as a developer.",
        },

        // ── Navigation ──
        {
          type: "text",
          content: "## Navigation",
        },
        {
          type: "code",
          content:
            "pwd                         # Print working directory (where am I?)\ncd dirname                  # Change into a directory\ncd ..                       # Go up one level\ncd ../..                    # Go up two levels\ncd ~                        # Go to home directory\ncd -                        # Go to previous directory\ncd /                        # Go to root directory\nls                          # List files in current directory\nls -l                       # Long format (permissions, size, date)\nls -a                       # Show hidden files (dotfiles)\nls -la                      # Long format + hidden files\nls -R                       # List recursively (all subdirectories)",
          language: "bash",
        },

        // ── File Operations ──
        {
          type: "text",
          content: "## File Operations",
        },
        {
          type: "code",
          content:
            "touch file.txt              # Create an empty file\nmkdir dirname               # Create a directory\nmkdir -p a/b/c              # Create nested directories\ncp source dest              # Copy a file\ncp -r srcdir/ destdir/      # Copy a directory recursively\nmv oldname newname          # Rename (or move) a file\nmv file.txt dir/            # Move file into a directory\nrm file.txt                 # Delete a file (permanent!)\nrm -r dirname/              # Delete a directory and contents\nrmdir empty-dir/            # Delete an empty directory only",
          language: "bash",
        },

        // ── Viewing Files ──
        {
          type: "text",
          content: "## Viewing Files",
        },
        {
          type: "code",
          content:
            "cat file.txt                # Print entire file\nhead file.txt               # Print first 10 lines\nhead -n 5 file.txt          # Print first 5 lines\ntail file.txt               # Print last 10 lines\ntail -n 5 file.txt          # Print last 5 lines\ntail -f logfile.log         # Follow a file (live updates)\nless file.txt               # Scrollable file viewer (q to quit)",
          language: "bash",
        },

        // ── Keyboard Shortcuts ──
        {
          type: "text",
          content: "## Keyboard Shortcuts",
        },
        {
          type: "code",
          content:
            "Tab                         # Autocomplete file/command names\nUp Arrow                    # Previous command from history\nDown Arrow                  # Next command from history\nCtrl + C                    # Cancel current command\nCtrl + L                    # Clear the screen\nCtrl + A                    # Jump to beginning of line\nCtrl + E                    # Jump to end of line\nCtrl + W                    # Delete word before cursor\nCtrl + U                    # Delete from cursor to start of line\nCtrl + K                    # Delete from cursor to end of line\nCtrl + R                    # Reverse search command history",
          language: "bash",
        },

        // ── Piping & Redirection ──
        {
          type: "text",
          content: "## Piping & Redirection",
        },
        {
          type: "code",
          content:
            'command > file.txt          # Redirect output to file (overwrite)\ncommand >> file.txt         # Append output to file\ncommand1 | command2         # Pipe: send output to next command\ngrep "pattern" file.txt     # Search for text in a file\ngrep -i "pattern" file.txt  # Case-insensitive search\ngrep -c "pattern" file.txt  # Count matching lines\nwc -l file.txt              # Count lines\nwc -w file.txt              # Count words\nsort file.txt               # Sort lines alphabetically\nsort -n file.txt            # Sort numerically\nsort -r file.txt            # Sort in reverse order\nuniq                        # Remove adjacent duplicate lines\nuniq -c                     # Count occurrences of each line',
          language: "bash",
        },

        // ── Common Pipe Patterns ──
        {
          type: "text",
          content: "## Common Pipe Patterns",
        },
        {
          type: "code",
          content:
            'cat file | grep "term"                  # Search a file\nls dir/ | wc -l                         # Count files in directory\ncat file | sort | uniq                  # Get unique sorted lines\ncat file | sort | uniq -c | sort -rn    # Frequency count (most common first)\ngrep "ERROR" log.txt | wc -l            # Count errors in a log\ncat data.csv | head -n 1                # View CSV headers',
          language: "bash",
        },

        // ── Environment Variables ──
        {
          type: "text",
          content: "## Environment Variables",
        },
        {
          type: "code",
          content:
            'echo $HOME                  # Print home directory path\necho $PATH                  # Print executable search path\necho $USER                  # Print current username\nMY_VAR="hello"              # Set a shell variable\nexport MY_VAR="hello"       # Set an environment variable\nenv                         # List all environment variables\nwhich command               # Show where a command lives in PATH',
          language: "bash",
        },

        // ── Getting Help ──
        {
          type: "text",
          content: "## Getting Help",
        },
        {
          type: "code",
          content:
            "command --help              # Quick usage summary\nman command                 # Full manual page (q to quit)\nwhich command               # Find where a command is installed\ntype command                # Show what type of command it is",
          language: "bash",
        },

        // ── Pro Tips ──
        {
          type: "text",
          content: "## Pro Tips",
        },
        {
          type: "tip",
          content:
            "Use Tab completion aggressively. Type the first few characters and press Tab -- the terminal will complete the rest. Double-tap Tab to see all possible completions. This alone will double your speed.",
        },
        {
          type: "tip",
          content:
            "Use `history | grep \"something\"` to search your command history. Find that complicated command you ran two days ago without remembering the exact syntax.",
        },
        {
          type: "tip",
          content:
            "Use `!!` to repeat the last command. Forgot to type `sudo`? Just run `sudo !!` to re-run the last command with elevated privileges.",
        },
        {
          type: "tip",
          content:
            "Create aliases for commands you type frequently. Add `alias ll='ls -la'` to your shell configuration file (`.bashrc` or `.zshrc`) to save keystrokes every day.",
        },
        {
          type: "text",
          content:
            "You now have the foundation to be productive in the terminal. These commands cover 90% of day-to-day developer terminal usage. The remaining 10% you'll pick up naturally as you encounter new tools and workflows. The most important thing is to keep practicing -- open a terminal, explore your filesystem, and build the muscle memory. You've got this.",
        },
      ],
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
