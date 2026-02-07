import type { ModuleConfig } from "@/lib/lessons/types";

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
      content: [
        {
          type: "text",
          content:
            "The `touch` command creates a new, empty file. If the file already exists, it updates the file's modification timestamp without changing its contents. The name comes from the idea of \"touching\" a file to update its date, but in practice, everyone uses it to create new files.",
        },
        {
          type: "code",
          content:
            "touch newfile.txt              # create a single file\ntouch index.html style.css     # create multiple files at once\ntouch projects/app.js          # create a file inside a directory",
          language: "bash",
        },
        {
          type: "text",
          content:
            "You can create multiple files in one command by listing them all as arguments. This is a common pattern when setting up a new project — create all your starter files in one shot. Note that the directory must already exist; `touch` creates files, not directories.",
        },
        {
          type: "tip",
          content:
            "You can also create files by redirecting output into them (like `echo \"hello\" > file.txt`), but `touch` is the clearest way to express \"I want an empty file to exist.\" It's also safe — it never overwrites existing content.",
        },
        {
          type: "windows-callout",
          content:
            "Windows Command Prompt doesn't have `touch`. The closest equivalent is `type nul > newfile.txt`. PowerShell offers `New-Item newfile.txt -ItemType File`. In WSL, `touch` works as shown.",
        },
        {
          type: "text",
          content:
            "You have a projects directory ready to go. Create a file called `hello.txt` inside it.",
        },
        {
          type: "code",
          content: "touch projects/hello.txt",
          language: "bash",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "`mkdir` (make directory) creates a new folder. By itself, it can only create one level at a time — the parent directory must already exist. If you try `mkdir a/b/c` and `a/b` doesn't exist yet, you'll get an error.",
        },
        {
          type: "code",
          content:
            "mkdir photos                     # create a single directory\nmkdir -p projects/webapp/src     # create the entire path at once",
          language: "bash",
        },
        {
          type: "text",
          content:
            'The `-p` flag (for "parents") is the solution. It creates every directory in the path that doesn\'t exist yet, and silently succeeds if they already do. This is the flag you\'ll use most of the time — it\'s safer and more convenient.',
        },
        {
          type: "text",
          content:
            "This is especially useful when setting up project structures. Instead of creating each folder one at a time, you can build the entire tree in a single command. Many developers keep a set of `mkdir -p` commands in their project setup scripts.",
        },
        {
          type: "tip",
          content:
            "Get in the habit of always using `mkdir -p`. It never hurts when the path already exists, and it saves you from errors when it doesn't. Think of the -p as a safety net.",
        },
        {
          type: "windows-callout",
          content:
            "In Command Prompt, `mkdir a\\b\\c` already creates the full path by default — no flag needed. PowerShell's `New-Item -ItemType Directory -Path a/b/c` also creates parent directories. In WSL, use `mkdir -p` as shown.",
        },
        {
          type: "text",
          content:
            "Create a nested project structure: `projects/webapp/src/components`. Use the `-p` flag to build it all at once.",
        },
        {
          type: "code",
          content: "mkdir -p projects/webapp/src/components",
          language: "bash",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "You don't always need to open a text editor to read a file. The terminal has several commands for quickly viewing file contents. The right choice depends on how much of the file you need to see.",
        },
        {
          type: "code",
          content:
            "cat notes.txt          # print the entire file\nhead notes.txt         # print the first 10 lines\ntail notes.txt         # print the last 10 lines\nhead -n 5 notes.txt    # print the first 5 lines\ntail -n 3 notes.txt    # print the last 3 lines",
          language: "bash",
        },
        {
          type: "text",
          content:
            "`cat` (short for concatenate) dumps the entire file to the screen. It's great for short files, but overwhelming for long ones. `head` shows just the beginning and `tail` shows just the end. Both default to 10 lines, but you can specify an exact number with the `-n` flag.",
        },
        {
          type: "text",
          content:
            "`tail` has a special trick: `tail -f logfile.log` will **follow** the file, showing new lines as they're added in real time. This is invaluable for watching server logs or debugging live systems. Press Ctrl+C to stop following.",
        },
        {
          type: "tip",
          content:
            "Use `cat` for short config files and quick checks. Use `head` when you just want to confirm what's at the top of a file (like checking CSV headers). Use `tail` for log files where the newest entries are at the bottom.",
        },
        {
          type: "windows-callout",
          content:
            "In Command Prompt, `type file.txt` is equivalent to `cat`. PowerShell uses `Get-Content file.txt` (or its alias `cat`). For head/tail equivalents, PowerShell offers `Get-Content file.txt -Head 5` and `Get-Content file.txt -Tail 5`.",
        },
        {
          type: "text",
          content:
            "There's a changelog file in the project directory with 20 entries. Use `head` to view just the first 5 lines.",
        },
        {
          type: "code",
          content: "head -n 5 projects/CHANGELOG.md",
          language: "bash",
        },
      ],
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
          description: "Use head to view the beginning of a file",
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
      content: [
        {
          type: "text",
          content:
            "When a file is too long for `cat` to display cleanly, `less` is the answer. It opens the file in a scrollable viewer, letting you move up and down at your own pace. Unlike `cat`, which floods the screen, `less` shows one page at a time.",
        },
        {
          type: "code",
          content:
            "less server.log        # open a file in the pager\n\n# Inside less:\n# Space / f    → next page\n# b            → previous page\n# j / ↓        → scroll down one line\n# k / ↑        → scroll up one line\n# /pattern     → search for text\n# n            → next search match\n# q            → quit",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The name `less` is a play on words — it's the improved successor to an older command called `more` (which could only scroll forward). The joke is \"less is more.\" The `less` pager is used throughout the terminal — it's the same viewer that opens when you run `man` to read manual pages.",
        },
        {
          type: "text",
          content:
            "One of the most useful features of `less` is searching. Press `/` followed by a word or pattern, then Enter. The viewer will jump to the first match and highlight it. Press `n` to jump to the next match, or `N` to go to the previous one. This makes finding information in large files fast.",
        },
        {
          type: "tip",
          content:
            "If you want line numbers, open the file with `less -N server.log`. The `-N` flag shows line numbers in the left margin, which is helpful when discussing code with teammates (\"look at line 47\").",
        },
        {
          type: "text",
          content:
            "There's a long server log file in the project. Open it with `less` and browse through it. Press `q` to quit when you're done.",
        },
        {
          type: "code",
          content: "less projects/server.log",
          language: "bash",
        },
      ],
      fsSeed: {
        "projects": null,
        "projects/server.log":
          "[2025-01-15 08:00:01] INFO  Server starting on port 3000\n[2025-01-15 08:00:01] INFO  Connected to database\n[2025-01-15 08:00:02] INFO  Loading middleware: cors\n[2025-01-15 08:00:02] INFO  Loading middleware: bodyParser\n[2025-01-15 08:00:02] INFO  Loading middleware: auth\n[2025-01-15 08:00:03] INFO  Registered route: GET /api/users\n[2025-01-15 08:00:03] INFO  Registered route: POST /api/users\n[2025-01-15 08:00:03] INFO  Registered route: GET /api/posts\n[2025-01-15 08:00:03] INFO  Registered route: POST /api/posts\n[2025-01-15 08:00:04] INFO  Server ready - accepting connections\n[2025-01-15 08:01:12] INFO  GET /api/users 200 45ms\n[2025-01-15 08:01:15] INFO  GET /api/posts 200 32ms\n[2025-01-15 08:02:30] WARN  Slow query detected: getUserById (230ms)\n[2025-01-15 08:03:01] INFO  POST /api/posts 201 67ms\n[2025-01-15 08:03:45] ERROR Connection timeout to database replica\n[2025-01-15 08:03:46] INFO  Retrying database connection...\n[2025-01-15 08:03:47] INFO  Database reconnected successfully\n[2025-01-15 08:04:10] INFO  GET /api/users 200 38ms\n[2025-01-15 08:05:00] INFO  Health check passed\n[2025-01-15 08:10:00] INFO  Health check passed\n[2025-01-15 08:15:00] INFO  Health check passed\n[2025-01-15 08:15:22] INFO  GET /api/posts?page=2 200 41ms\n[2025-01-15 08:16:03] WARN  Rate limit approaching for IP 192.168.1.50\n[2025-01-15 08:20:00] INFO  Health check passed\n[2025-01-15 08:21:44] INFO  POST /api/users 201 55ms\n[2025-01-15 08:25:00] INFO  Health check passed\n[2025-01-15 08:30:00] INFO  Health check passed\n[2025-01-15 08:30:12] INFO  Cache cleared for /api/posts\n[2025-01-15 08:35:00] INFO  Health check passed\n[2025-01-15 08:40:00] INFO  Health check passed",
        "projects/app.js": 'const express = require("express");\nconst app = express();\napp.listen(3000);',
      },
      goals: [
        {
          id: "use-less",
          description: "Open a file with less to browse its contents",
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
      content: [
        {
          type: "text",
          content:
            "`cp` (copy) duplicates a file from one location to another. The original stays untouched and a new copy is created at the destination. You need two arguments: the source (what to copy) and the destination (where to put it).",
        },
        {
          type: "code",
          content:
            "cp original.txt copy.txt              # copy to a new name\ncp config.json backups/config.json    # copy to another directory\ncp -r src/ src-backup/                # copy an entire directory",
          language: "bash",
        },
        {
          type: "text",
          content:
            "By default, `cp` only works on individual files. To copy a directory and everything inside it, you need the `-r` flag (recursive). Without `-r`, trying to copy a directory will give you an error. This is a safety measure — copying a large directory tree is a significant operation, so the terminal makes you be explicit about it.",
        },
        {
          type: "text",
          content:
            "Be careful: if the destination file already exists, `cp` will **overwrite** it without warning. If you want to be prompted before overwriting, use `cp -i` (interactive mode). For critical files, this extra safety check is worth the extra keystroke.",
        },
        {
          type: "tip",
          content:
            "Creating backups before making changes is a great habit. A quick `cp config.json config.json.bak` before editing gives you an easy way to restore the original if something goes wrong.",
        },
        {
          type: "windows-callout",
          content:
            "In Command Prompt, `copy file.txt dest.txt` copies files and `xcopy /s source dest` copies directories. PowerShell uses `Copy-Item source.txt dest.txt` and `Copy-Item -Recurse src/ dest/`. In WSL, `cp` works as shown.",
        },
        {
          type: "text",
          content:
            "There's an important configuration file that needs a backup. Copy `projects/config.json` to the `backups` directory.",
        },
        {
          type: "code",
          content: "cp projects/config.json backups/config.json",
          language: "bash",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "`mv` (move) serves double duty: it moves files to a new location *and* renames them. In fact, renaming is just moving a file to the same directory with a different name. One command, two jobs.",
        },
        {
          type: "code",
          content:
            "mv old-name.txt new-name.txt           # rename a file\nmv report.txt Documents/               # move to another directory\nmv draft.txt Documents/final.txt       # move AND rename in one step",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Unlike `cp`, `mv` doesn't leave the original behind. The file is gone from its old location and appears at the new one. This makes it perfect for organizing files — moving downloads into the right folders, renaming files to follow a convention, or restructuring a project.",
        },
        {
          type: "text",
          content:
            "Just like `cp`, `mv` will overwrite the destination without warning if a file with that name already exists. Use `mv -i` to get a confirmation prompt before overwriting. This is especially important when moving files into a directory that might already contain a file with the same name.",
        },
        {
          type: "warning",
          content:
            "There's no `mv` undo. Once a file is moved or renamed, the original path is gone. Double-check your destination before pressing Enter, especially when renaming files in bulk.",
        },
        {
          type: "tip",
          content:
            "A common workflow: download a file, rename it to something meaningful, then move it to the right place. You can do the rename and move in a single `mv` command.",
        },
        {
          type: "text",
          content:
            "There's a file called `draft-report.txt` that needs to be renamed to `report.txt` and moved into the `Documents` directory. Do it in one command.",
        },
        {
          type: "code",
          content: "mv draft-report.txt Documents/report.txt",
          language: "bash",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "Deleting files in the terminal is permanent. There is no Recycle Bin, no Trash, no undo. When you run `rm`, the file is gone. This makes the terminal incredibly efficient — and demands respect. Always pause before deleting to make sure you're targeting the right files.",
        },
        {
          type: "code",
          content:
            "rm file.txt                  # delete a single file\nrm file1.txt file2.txt       # delete multiple files\nrm -r old-project/           # delete a directory and its contents\nrmdir empty-folder/          # delete an empty directory only",
          language: "bash",
        },
        {
          type: "text",
          content:
            "`rm` removes files. To remove a directory and everything inside it, you need `rm -r` (recursive). If you only want to remove an *empty* directory, `rmdir` is a safer choice — it refuses to delete a directory that still has files in it, acting as a safety check.",
        },
        {
          type: "warning",
          content:
            "Never run `rm -rf /` or `rm -rf ~`. The `-rf` combination means \"recursive\" and \"force\" — it deletes everything without asking for confirmation. Pointed at root or home, it will destroy your entire system. Some systems have safeguards, but don't count on them. Always double-check the path.",
        },
        {
          type: "text",
          content:
            "For safer deletion, use `rm -i` which asks for confirmation before each file. It's slower, but it can save you from accidental data loss. Many experienced developers alias `rm` to `rm -i` as a default safety net.",
        },
        {
          type: "tip",
          content:
            "Before deleting with `rm -r`, run `ls` on the directory first to see what's inside. This two-second check can prevent catastrophic mistakes. Another safe pattern: move files to a \"trash\" directory first, then delete the trash later.",
        },
        {
          type: "windows-callout",
          content:
            "In Command Prompt, `del file.txt` deletes files and `rmdir /s folder` deletes directories. PowerShell uses `Remove-Item file.txt` and `Remove-Item -Recurse folder/`. Unlike the terminal, Windows does sometimes send files to the Recycle Bin.",
        },
        {
          type: "text",
          content:
            "Clean up the workspace. Delete the file `temp-notes.txt` and remove the empty `old-builds` directory using `rmdir`.",
        },
        {
          type: "code",
          content: "rm temp-notes.txt\nrmdir old-builds",
          language: "bash",
        },
      ],
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
