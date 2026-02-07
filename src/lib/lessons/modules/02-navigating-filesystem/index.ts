import type { ModuleConfig } from "@/lib/lessons/types";

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
      content: [
        {
          type: "text",
          content:
            "Every file and folder on your computer lives inside a single tree structure. At the very top is the **root directory**, written as `/`. Everything — your documents, your programs, even the operating system itself — branches off from this single root.",
        },
        {
          type: "text",
          content:
            "Inside the root you'll find standard directories that each have a purpose. `/bin` holds essential programs (like `ls` and `cd`). `/etc` stores system configuration files. `/usr` contains user-installed software. `/var` keeps variable data like logs. `/tmp` is for temporary files that can be safely deleted on reboot. And `/home` is where each user gets their own personal directory.",
        },
        {
          type: "code",
          content:
            "/              ← root (the very top)\n├── bin/        ← essential programs\n├── etc/        ← system configuration\n├── home/       ← user home directories\n│   └── user/   ← your home directory (~)\n├── tmp/        ← temporary files\n├── usr/        ← user-installed software\n└── var/        ← logs, caches, variable data",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Your **home directory** is your personal space. It's usually at `/home/your-username`, and you can refer to it with the shorthand `~` (tilde). When you open a fresh terminal, you almost always start here.",
        },
        {
          type: "tip",
          content:
            "Think of the filesystem like an upside-down tree. The root is at the top and branches grow downward. Every path starts from root and follows branches down to the file or directory you want.",
        },
        {
          type: "windows-callout",
          content:
            "On Windows, the root of each drive is a letter like `C:\\`. There's no single root — each drive is its own tree. In WSL, the Linux filesystem starts at `/` and your Windows drives are accessible at `/mnt/c/`, `/mnt/d/`, etc.",
        },
        {
          type: "text",
          content:
            "Let's explore the root. Run `ls /` to see what directories live at the top level of the filesystem.",
        },
        {
          type: "code",
          content: "ls /",
          language: "bash",
        },
      ],
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

    // ── Lesson 2: Where Am I? ──────────────────────────────────────
    {
      slug: "where-am-i",
      title: "Where Am I?",
      description:
        "Master pwd to always know your current location in the filesystem.",
      content: [
        {
          type: "text",
          content:
            "Getting lost in the filesystem is one of the most common frustrations for beginners. The fix is simple: `pwd`. It stands for **print working directory**, and it tells you exactly where you are right now — the full path from the root to your current folder.",
        },
        {
          type: "text",
          content:
            "Whenever you change directories with `cd`, your **working directory** updates. Every command you run operates relative to this location. If you run `ls`, it lists the contents of your working directory. If you create a file, it's created here. Knowing where you are is the foundation of everything else.",
        },
        {
          type: "code",
          content: "pwd\n# /home/user\n\ncd projects/webapp\npwd\n# /home/user/projects/webapp",
          language: "bash",
        },
        {
          type: "tip",
          content:
            "Make `pwd` your reflex. Anytime you feel disoriented — maybe you ran a few `cd` commands and lost track — just type `pwd` to get your bearings. It costs nothing and saves a lot of confusion.",
        },
        {
          type: "text",
          content:
            "Try it now. Navigate to the `projects/api` directory using `cd projects/api`, then run `pwd` to confirm where you ended up.",
        },
        {
          type: "code",
          content: "cd projects/api\npwd",
          language: "bash",
        },
      ],
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
          id: "run-pwd",
          description: "Run pwd to print your working directory",
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
      content: [
        {
          type: "text",
          content:
            "You already know `ls` lists files, but plain `ls` only shows the basics. The real power comes from its flags. The most important ones are `-l` (long format with details), `-a` (show hidden files), and `-h` (human-readable file sizes). You can combine them freely.",
        },
        {
          type: "code",
          content:
            "ls         # basic listing\nls -l      # long format: permissions, size, date\nls -a      # show ALL files including hidden ones\nls -la     # long format + hidden files\nls -lah    # long format + hidden + human-readable sizes",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Hidden files in Linux and macOS start with a dot (`.`). They're hidden by default to reduce clutter — you don't usually need to see configuration files like `.gitconfig` or `.bashrc` in a normal listing. But when you do need them, `-a` reveals everything.",
        },
        {
          type: "text",
          content:
            "The long format (`-l`) shows you the file type, permissions, owner, group, size, modification date, and name. It looks dense at first, but you'll learn to read it quickly. The first character tells you if it's a file (`-`) or directory (`d`).",
        },
        {
          type: "tip",
          content:
            "Many developers alias `ls -la` to something shorter, like `ll`. You'll learn about aliases in a later module. For now, get comfortable typing the full command.",
        },
        {
          type: "text",
          content:
            "There are hidden files in your home directory. Run `ls -a` or `ls -la` to reveal them.",
        },
        {
          type: "code",
          content: "ls -la",
          language: "bash",
        },
      ],
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
          description: "Run ls -a or ls -la to reveal hidden files",
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
      content: [
        {
          type: "text",
          content:
            "There are two ways to refer to any file or directory: **absolute paths** and **relative paths**. An absolute path starts from the root (`/`) and spells out the entire route — like a full street address. A relative path starts from wherever you are right now — like saying \"two doors down.\"",
        },
        {
          type: "code",
          content:
            "# Absolute path — always starts with /\n/home/user/projects/webapp/index.html\n\n# Relative paths — depend on your current directory\nprojects/webapp/index.html    # from /home/user\n./webapp/index.html            # from /home/user/projects\n../api/server.js               # go up one level, then into api",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The dot shortcuts are essential. A single dot `.` means \"the current directory.\" Two dots `..` mean \"the parent directory\" (one level up). So `./projects` is the same as `projects` — both point to the projects folder relative to where you are. And `../` takes you up a level before going somewhere else.",
        },
        {
          type: "text",
          content:
            "When should you use which? Relative paths are shorter and more convenient for nearby files. Absolute paths are unambiguous — they work the same no matter where you are. In scripts, absolute paths are usually safer. In day-to-day terminal use, relative paths are faster.",
        },
        {
          type: "tip",
          content:
            "If you're ever unsure whether a path is right, tab completion can help. Start typing the path and press Tab — the shell will auto-complete if it finds a match, confirming the path exists.",
        },
        {
          type: "text",
          content:
            "Practice both styles. First, navigate to the webapp source directory using its absolute path. Then navigate back using a relative path.",
        },
        {
          type: "code",
          content: "cd /home/user/projects/webapp/src\ncd ../../api",
          language: "bash",
        },
      ],
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
          description: "Navigate using an absolute path (starting with /)",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.startsWith("cd /")
            ),
          hint: "Type a cd command with a path starting from root, like: cd /home/user/projects",
        },
        {
          id: "use-relative",
          description: "Navigate using a relative path (using .. or no leading /)",
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
      content: [
        {
          type: "text",
          content:
            "`cd` (change directory) is the command you'll use more than almost any other. You already know the basics, but `cd` has several powerful shortcuts that experienced developers use constantly.",
        },
        {
          type: "code",
          content:
            "cd projects          # move into a subdirectory\ncd ..                # go up one level\ncd ../..             # go up two levels\ncd ~                 # jump straight home\ncd /                 # jump to the root\ncd -                 # go back to the previous directory",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The `cd -` shortcut is a hidden gem. It takes you back to wherever you were before your last `cd`. It's like an \"undo\" for navigation — perfect for bouncing between two directories while working.",
        },
        {
          type: "text",
          content:
            "Running `cd` with no arguments is the same as `cd ~` — it always takes you home. This is a quick escape when you're deep in the filesystem and want to reset. From home, you can navigate anywhere with confidence.",
        },
        {
          type: "tip",
          content:
            "You can chain `..` to climb multiple levels: `cd ../../..` goes up three directories. Combine this with a path to go up and then down: `cd ../../other-project/src`.",
        },
        {
          type: "windows-callout",
          content:
            "In Command Prompt, `cd ..` works the same way. But to change drives you need to type the drive letter (like `D:`). In PowerShell, `cd ~` works, and `cd -` is available in newer versions. WSL behaves identically to Linux.",
        },
        {
          type: "text",
          content:
            "Time to practice. Navigate into the deeply nested components directory, then jump back home with `cd ~`.",
        },
        {
          type: "code",
          content: "cd projects/webapp/src/components\ncd ~",
          language: "bash",
        },
      ],
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
          description: "Navigate to /home/user/projects/webapp/src/components",
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
      content: [
        {
          type: "text",
          content:
            "If you take one habit away from this entire course, make it this: **press Tab**. Tab completion is the terminal's auto-complete. Start typing a file or directory name, press Tab, and the shell fills in the rest. It's faster than typing, and it eliminates typos.",
        },
        {
          type: "code",
          content:
            "cd pro<Tab>        →  cd projects/\ncd projects/web<Tab>  →  cd projects/webapp/\nls Doc<Tab>        →  ls Documents/",
          language: "bash",
        },
        {
          type: "text",
          content:
            "If there are multiple matches, pressing Tab twice shows you all the options. For example, if you have `projects/` and `photos/`, typing `cd p` and pressing Tab twice will list both. Type one more letter to disambiguate (`cd pr<Tab>`) and it completes to `projects/`.",
        },
        {
          type: "text",
          content:
            "Tab completion works for more than just file paths. It also completes command names, environment variables, and even git branches (in shells with enhanced completion). The deeper you get into the terminal, the more you'll rely on it.",
        },
        {
          type: "tip",
          content:
            "Pro tip: Tab doesn't just save keystrokes — it *validates* your path as you type. If Tab doesn't complete anything, the path probably doesn't exist. Use it as a check while navigating.",
        },
        {
          type: "windows-callout",
          content:
            "Tab completion works in PowerShell and the newer Windows Terminal. In the old Command Prompt, Tab cycles through matches one at a time instead of showing all options. WSL supports full bash-style tab completion.",
        },
        {
          type: "text",
          content:
            "Try navigating around using Tab to complete directory names. Type `cd` followed by the first few letters of a directory, then press Tab to auto-complete.",
        },
      ],
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
      goals: [
        {
          id: "practice-navigation",
          description: "Practice navigating with cd or listing with ls",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.startsWith("cd ") || cmd.startsWith("ls")
            ),
          hint: "Try navigating to a directory using cd, or list files with ls. Use Tab to auto-complete!",
        },
      ],
    },

    // ── Lesson 7: Finding Files ────────────────────────────────────
    {
      slug: "finding-files",
      title: "Finding Files",
      description:
        "Use find to search the filesystem by name, type, and other criteria.",
      content: [
        {
          type: "text",
          content:
            "When you know a file exists somewhere but can't remember where, `find` is your search tool. It walks through a directory tree and prints every file or directory matching your criteria. It's one of the most powerful commands in the terminal.",
        },
        {
          type: "code",
          content:
            'find . -name "README.md"       # find by exact name\nfind . -name "*.js"            # find by pattern (all .js files)\nfind . -type d -name "src"     # find directories named "src"\nfind / -type f -name ".env"    # search the entire filesystem',
          language: "bash",
        },
        {
          type: "text",
          content:
            'The first argument to `find` is where to start searching. A dot `.` means "start from here" (the current directory). You can also give an absolute path like `/home/user`. The `-name` flag matches filenames, and `-type` filters by type — `f` for files, `d` for directories.',
        },
        {
          type: "text",
          content:
            'Another useful command is `which`. It tells you the full path of a command\'s executable. Running `which ls` shows you where the `ls` program lives on disk. This is handy for debugging path issues or figuring out which version of a tool you\'re running.',
        },
        {
          type: "code",
          content: "which ls\n# /bin/ls\n\nwhich node\n# /usr/local/bin/node",
          language: "bash",
        },
        {
          type: "tip",
          content:
            'Use quotes around patterns with wildcards (like "*.js") to prevent the shell from expanding them before find sees them. Without quotes, the shell might try to match *.js in your current directory first.',
        },
        {
          type: "windows-callout",
          content:
            "Windows uses `dir /s /b filename` for recursive searches, or `where` instead of `which`. PowerShell offers `Get-ChildItem -Recurse -Filter \"*.js\"`. In WSL, `find` and `which` work as shown.",
        },
        {
          type: "text",
          content:
            "There's a hidden configuration file buried somewhere in the projects directory. Use `find` to track it down. Look for a file called `.secret-config`.",
        },
        {
          type: "code",
          content: 'find . -name ".secret-config"',
          language: "bash",
        },
      ],
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
          description: "Use find to locate the .secret-config file",
          type: "command_output_contains",
          value: ".secret-config",
          hint: 'Type: find . -name ".secret-config" to search for the hidden file.',
        },
      ],
    },
  ],
};

export default navigatingFilesystemModule;
