import type { ModuleConfig } from "@/lib/lessons/types";

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
      content: [
        {
          type: "text",
          content:
            "So far you've been typing commands and pressing Enter. But what happens when you type a long command and realize there's a typo near the beginning? You *could* hold Backspace and retype everything, but that's slow and frustrating. Learning to move your cursor efficiently through a command is the first step toward real terminal speed.",
        },
        {
          type: "text",
          content:
            "The most basic cursor movement uses the **Left** and **Right arrow keys**. Each press moves the cursor one character in that direction. This lets you position the cursor exactly where you need to make an edit, insert text, or delete a character.",
        },
        {
          type: "code",
          content:
            "Left Arrow   Move cursor one character left\nRight Arrow  Move cursor one character right\nHome         Jump to the beginning of the line\nEnd          Jump to the end of the line",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The **Home** key jumps your cursor all the way to the beginning of the line, and the **End** key jumps it to the end. These are great when you need to make a quick edit at either end of a long command without arrow-keying across the entire line.",
        },
        {
          type: "tip",
          content:
            "Start building the habit now: whenever you need to fix something at the start of a command, reach for Home instead of holding the Left arrow. It feels minor, but the seconds add up to minutes every day.",
        },
        {
          type: "text",
          content:
            "Let's practice. Try typing a long command like `echo The quick brown fox jumps over the lazy dog` and pressing Enter. The goal here is just to get comfortable with typing longer commands — we'll practice editing them in the next lessons.",
        },
        {
          type: "code",
          content: "echo The quick brown fox jumps over the lazy dog",
          language: "bash",
        },
      ],
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
          id: "type-long-command",
          description: "Type and run a long command (at least 20 characters)",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => cmd.length >= 20),
          hint: 'Try typing: echo The quick brown fox jumps over the lazy dog',
        },
      ],
    },

    // ── Lesson 2: Jump to Start & End ──────────────────────────────
    {
      slug: "jump-start-end",
      title: "Jump to Start & End",
      description:
        "Use Ctrl+A and Ctrl+E to jump to the beginning and end of a command instantly.",
      content: [
        {
          type: "text",
          content:
            "The Home and End keys work great, but not every keyboard has them (especially on laptops and compact keyboards). The terminal has dedicated shortcuts that keep your fingers on the home row: **Ctrl+A** jumps to the start of the line, and **Ctrl+E** jumps to the end.",
        },
        {
          type: "code",
          content:
            "Ctrl+A    Jump to the beginning of the line\nCtrl+E    Jump to the end of the line",
          language: "bash",
        },
        {
          type: "text",
          content:
            "These shortcuts come from Emacs, one of the oldest text editors. They're baked into almost every terminal, every shell, and most text input fields on macOS. Once you learn them, you'll use them everywhere — not just in the terminal.",
        },
        {
          type: "tip",
          content:
            "Memory trick: **A** is the first letter of the alphabet, so Ctrl+A goes to the **start**. **E** stands for **End**. These two shortcuts alone will save you more time than any other pair.",
        },
        {
          type: "text",
          content:
            "Here's a practical exercise. Imagine you typed a command but forgot to add `sudo` at the beginning. Instead of retyping, you can press **Ctrl+A** to jump to the start, type `sudo `, and press Enter. Try running this corrected command now.",
        },
        {
          type: "code",
          content: "sudo cat /etc/hosts",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Practice: type `cat /etc/hosts`, then use **Ctrl+A** to jump to the beginning and add `sudo ` before it. Or simply type the full command above. Either way, the goal is to run a command that starts with `sudo`.",
        },
        {
          type: "windows-callout",
          content:
            "Ctrl+A and Ctrl+E work in Bash and Zsh on Linux and macOS. In PowerShell, Home and End serve the same purpose. If you're using WSL, the Bash shortcuts work as expected.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "Moving one character at a time is precise but slow. Moving to the start or end is fast but imprecise. The sweet spot is **word-by-word navigation** — jumping across whole words to get close to where you need to edit, then fine-tuning with arrow keys.",
        },
        {
          type: "code",
          content:
            "Alt+F    Move forward one word\nAlt+B    Move backward one word",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Alt+F** moves the cursor forward to the end of the next word, and **Alt+B** moves it backward to the beginning of the previous word. A \"word\" in terminal terms is a sequence of characters separated by spaces or special characters.",
        },
        {
          type: "tip",
          content:
            "Memory trick: **F** for **Forward**, **B** for **Backward**. On macOS Terminal, you may need to enable \"Use Option as Meta key\" in Terminal preferences for Alt shortcuts to work. In iTerm2, go to Profiles > Keys and set the Option key to Esc+.",
        },
        {
          type: "text",
          content:
            "Let's practice with a multi-word command. Try running the command below. Before pressing Enter, try using Alt+B and Alt+F to move between the words. When you're done exploring, press Enter to run it.",
        },
        {
          type: "code",
          content: "ls -la projects/webapp/index.html",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Word movement is especially useful when you have long file paths or multiple arguments. Instead of arrow-keying 40 characters to change one directory name, you can jump 3-4 words and be right where you need to be.",
        },
        {
          type: "windows-callout",
          content:
            "In PowerShell and Windows Terminal, Ctrl+Left and Ctrl+Right move by word instead of Alt+F/Alt+B. In WSL, the Alt shortcuts work as described.",
        },
      ],
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
          id: "run-multiword-command",
          description: "Run a command with at least 3 space-separated parts",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => cmd.trim().split(/\s+/).length >= 3),
          hint: "Try running: ls -la projects/webapp/index.html",
        },
      ],
    },

    // ── Lesson 4: Deleting Text Efficiently ────────────────────────
    {
      slug: "deleting-text",
      title: "Deleting Text Efficiently",
      description:
        "Cut words and clear lines with Ctrl+W, Ctrl+U, and Ctrl+K.",
      content: [
        {
          type: "text",
          content:
            "Backspace deletes one character at a time. That's fine for a typo, but when you need to delete an entire word, clear the beginning of a line, or chop off everything after the cursor, there are much faster shortcuts.",
        },
        {
          type: "code",
          content:
            "Ctrl+W    Delete the word before the cursor\nCtrl+U    Clear everything from cursor to the start of the line\nCtrl+K    Clear everything from cursor to the end of the line",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Ctrl+W** is the one you'll use most. It deletes the word immediately before the cursor. Pressed repeatedly, it chews through the command word by word from right to left. This is far faster than holding Backspace.",
        },
        {
          type: "text",
          content:
            "**Ctrl+U** clears everything from the cursor to the beginning of the line. This is perfect when you've typed a command you've changed your mind about — instead of holding Backspace, one keystroke wipes it clean. **Ctrl+K** does the opposite: it clears from the cursor to the end of the line, which is useful when you want to keep the beginning of a command but replace the arguments.",
        },
        {
          type: "tip",
          content:
            "Deleted text with Ctrl+W, Ctrl+U, and Ctrl+K isn't gone forever — it's saved to a \"kill ring.\" You can paste it back with **Ctrl+Y**. This makes these shortcuts act like cut-and-paste for the command line.",
        },
        {
          type: "text",
          content:
            "Let's practice. The challenge: the command below has a typo. The file name should be `server.js`, not `servre.js`. Type the broken command, then fix it by positioning your cursor and using deletion shortcuts. Run the corrected command.",
        },
        {
          type: "code",
          content: "cat projects/api/server.js",
          language: "bash",
        },
        {
          type: "warning",
          content:
            "Be careful with Ctrl+U in the middle of a long command — it will delete everything to the left of your cursor. If you accidentally clear something, remember Ctrl+Y can paste it back.",
        },
      ],
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
          description: "Run cat projects/api/server.js (the corrected command)",
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
      content: [
        {
          type: "text",
          content:
            "The terminal remembers every command you've run. Instead of retyping commands you've already used, you can navigate through your command history to find and reuse them. This is one of the biggest time-savers in everyday terminal use.",
        },
        {
          type: "code",
          content:
            "Up Arrow     Show the previous command from history\nDown Arrow   Show the next command from history\nhistory      List all recent commands with line numbers",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Pressing the **Up arrow** cycles backward through your command history — the most recent command appears first. Press it again to go further back. **Down arrow** moves forward toward your most recent commands. If you press Down enough times, you'll get back to an empty prompt.",
        },
        {
          type: "text",
          content:
            "The `history` command prints a numbered list of all your recent commands. This is useful when you want to see what you've been running, or when you need the exact text of a command from several sessions ago. The numbers next to each command can be used with history shortcuts, which we'll cover in a later lesson.",
        },
        {
          type: "tip",
          content:
            "Build a habit: before retyping a command, press Up a few times. The command you need is almost always in your recent history. Advanced users rarely type the same command twice.",
        },
        {
          type: "text",
          content:
            "Try it now. First, run a few commands — anything you like (`ls`, `pwd`, `echo hello`). Then run `history` to see them all listed with numbers.",
        },
        {
          type: "code",
          content: "history",
          language: "bash",
        },
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
      content: [
        {
          type: "text",
          content:
            "Pressing Up through dozens of commands to find the one you want is tedious. **Ctrl+R** opens a reverse incremental search — you type a few characters and the terminal instantly shows the most recent command matching what you've typed.",
        },
        {
          type: "code",
          content:
            "Ctrl+R        Start reverse history search\n(type text)   Narrows the search as you type\nCtrl+R again  Jump to the next older match\nEnter         Run the displayed command\nEsc           Exit search and keep the command on the prompt\nCtrl+G        Cancel search and return to empty prompt",
          language: "bash",
        },
        {
          type: "text",
          content:
            "When you press Ctrl+R, the prompt changes to show `(reverse-i-search)`. As you type characters, the terminal searches backward through history for the most recent command containing that text. If the first match isn't what you want, press Ctrl+R again to jump to the next older match.",
        },
        {
          type: "text",
          content:
            "Once you see the command you want, press **Enter** to run it immediately, or press **Esc** (or the Right arrow) to place it on your command line so you can edit it before running.",
        },
        {
          type: "tip",
          content:
            "Ctrl+R is a game-changer once it becomes muscle memory. You only need to remember 2-3 characters from a long command to find it instantly. Try to use it every time you think \"I ran that command recently...\"",
        },
        {
          type: "text",
          content:
            "Let's practice. First, run the command `echo searching is powerful` so it's in your history. Then use Ctrl+R and type `search` to find it. Press Enter to rerun it.",
        },
        {
          type: "code",
          content: "echo searching is powerful",
          language: "bash",
        },
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
          description: "Run the command: echo searching is powerful",
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
      content: [
        {
          type: "text",
          content:
            "Beyond arrow keys and Ctrl+R, the shell provides special shortcuts called **bang commands** (because they use the `!` character). These let you reference and reuse parts of your previous commands without navigating through history.",
        },
        {
          type: "code",
          content:
            '!!     Repeat the entire last command\n!$     Reuse the last argument of the previous command\n!n     Repeat command number n from history (e.g., !42)\n!abc   Repeat the most recent command starting with "abc"',
          language: "bash",
        },
        {
          type: "text",
          content:
            "The most common use of `!!` is retrying a command with `sudo`. You run something, it says \"Permission denied,\" and you type `sudo !!` to instantly rerun it with elevated privileges. This is so common that experienced users do it reflexively.",
        },
        {
          type: "code",
          content:
            "$ cat /etc/shadow\nPermission denied\n$ sudo !!\nsudo cat /etc/shadow",
          language: "bash",
        },
        {
          type: "text",
          content:
            "`!$` grabs just the last argument from your previous command. This is perfect when you're working with the same file across multiple commands — view it, then edit it, then move it, all without retyping the path.",
        },
        {
          type: "code",
          content:
            "$ ls projects/webapp/index.html\n$ cat !$\n# expands to: cat projects/webapp/index.html",
          language: "bash",
        },
        {
          type: "tip",
          content:
            "You can preview what !! or !$ will expand to before running by pressing Esc, then typing a period (Esc + .) — this inserts the last argument directly. Safer than trusting bang expansion blindly.",
        },
        {
          type: "text",
          content:
            "Let's practice. First run `echo hello from the terminal`. Then use `!!` or `!$` in your next command. For example, try `sudo !!` or `echo !$`.",
        },
        {
          type: "code",
          content: "echo hello from the terminal",
          language: "bash",
        },
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
            ctx.history.some(
              (cmd) =>
                cmd.includes("!!") ||
                cmd.includes("!$") ||
                /![a-zA-Z]/.test(cmd) ||
                /!\d+/.test(cmd)
            ),
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
      content: [
        {
          type: "text",
          content:
            "Sometimes you need to interrupt what the terminal is doing. Maybe a command is running longer than expected, you want to cancel what you're typing, or you just want a clean screen. The terminal has a set of control shortcuts that act as emergency buttons.",
        },
        {
          type: "code",
          content:
            "Ctrl+C    Cancel the current command or running process\nCtrl+D    Send EOF (End of File) — closes the shell if the line is empty\nCtrl+Z    Suspend the current process (move it to background)\nCtrl+L    Clear the screen (same as typing 'clear')",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Ctrl+C** is your most important escape hatch. If a command is running too long, producing endless output, or you just changed your mind, Ctrl+C sends an interrupt signal that stops the process immediately. You can also use it to clear a partially typed command without running it.",
        },
        {
          type: "text",
          content:
            "**Ctrl+D** sends an \"end of file\" signal. If your command line is empty, it will close your terminal session (like typing `exit`). If a program is waiting for input (like `cat` with no arguments), Ctrl+D tells it you're done providing input.",
        },
        {
          type: "text",
          content:
            "**Ctrl+Z** suspends a running process and puts it in the background. The process isn't killed — it's paused. You can resume it with the `fg` command (foreground) or let it run in the background with `bg`. This is useful when you're in the middle of something (like editing a file with `nano`) and need to quickly run another command.",
        },
        {
          type: "text",
          content:
            "**Ctrl+L** clears the screen without erasing your command history. It's identical to running `clear`, but faster since you don't have to type anything. Many developers press Ctrl+L habitually before running important commands so the output is easy to read.",
        },
        {
          type: "tip",
          content:
            "Ctrl+C and Ctrl+L are the two most-used control shortcuts. Commit them to muscle memory first. Ctrl+C = \"stop everything\" and Ctrl+L = \"clean slate.\"",
        },
        {
          type: "warning",
          content:
            "Be careful with Ctrl+D on an empty prompt — it will close your terminal session. If you accidentally start closing a shell, most terminals will warn you or require pressing it twice.",
        },
        {
          type: "text",
          content:
            "Practice: run the `clear` command (or press Ctrl+L) to clear the screen. Then try running `echo hello` and observe the clean output.",
        },
        {
          type: "code",
          content: "clear",
          language: "bash",
        },
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
          id: "run-clear-or-echo",
          description: "Run clear (or Ctrl+L) and then echo a message",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("clear") || cmd.includes("echo")
            ),
          hint: "Type: clear to clean the screen, then try: echo hello",
        },
      ],
    },

    // ── Lesson 9: Combining Shortcuts ──────────────────────────────
    {
      slug: "combining-shortcuts",
      title: "Combining Shortcuts",
      description:
        "Put your shortcut skills together to edit commands in a real-world workflow.",
      content: [
        {
          type: "text",
          content:
            "Individual shortcuts are useful, but real power comes from combining them into a fluid editing workflow. An experienced terminal user edits a command line the way a pianist plays chords — multiple shortcuts in quick succession, each one building on the last.",
        },
        {
          type: "text",
          content:
            "Here's a typical scenario: you need to run a complex command, but you've made a mistake in the middle. Watch how shortcuts chain together:",
        },
        {
          type: "code",
          content:
            "# Scenario: You typed this, but the path is wrong:\ngit commit -m \"updated teh database migration\"\n\n# Fix workflow:\n# 1. Ctrl+A      → jump to start\n# 2. Alt+F x3    → jump forward 3 words to reach \"-m\"\n# 3. Alt+F       → jump forward to the quote\n# 4. Right Arrow  → enter the quoted text\n# 5. Alt+F       → move to 'teh'\n# 6. Ctrl+W      → delete 'teh'\n# 7. Type 'the'  → insert correct word\n# 8. Enter       → run the corrected command",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Let's break down the most useful shortcut combinations for common tasks:",
        },
        {
          type: "code",
          content:
            "Replace a word:          Alt+B, Ctrl+W, type new word\nPrepend sudo:            Ctrl+A, type 'sudo '\nChange last argument:    Ctrl+E, Ctrl+W, type new arg\nClear and retype:        Ctrl+U (or Ctrl+C for new prompt)\nCut end, paste later:    Ctrl+K, edit, Ctrl+Y",
          language: "bash",
        },
        {
          type: "tip",
          content:
            "The cut/paste pair of Ctrl+K and Ctrl+Y (or Ctrl+U and Ctrl+Y) is incredibly powerful. You can cut a section of a command, rearrange things, and paste it back. It's like clipboard for your command line.",
        },
        {
          type: "text",
          content:
            "Your challenge: run the following corrected deploy command. Imagine you started typing a broken version and used shortcuts to fix it. The important thing is that you practice typing and editing rather than just typing the final command from scratch.",
        },
        {
          type: "code",
          content: "echo deploy --env production --branch main --verbose",
          language: "bash",
        },
      ],
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
          description: "Run the corrected deploy command with all flags",
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
      content: [
        {
          type: "text",
          content:
            "You've learned all the essential keyboard shortcuts. Now it's time to put them to the test. This lesson presents a series of command tasks designed to exercise every shortcut you've practiced. Complete all the goals to prove your terminal navigation skills.",
        },
        {
          type: "text",
          content:
            "Here's a quick reference card of everything you've learned:",
        },
        {
          type: "code",
          content:
            "── Movement ──────────────────────────────────\nCtrl+A / Home     Jump to start of line\nCtrl+E / End      Jump to end of line\nAlt+F             Move forward one word\nAlt+B             Move backward one word\n\n── Deletion ──────────────────────────────────\nCtrl+W            Delete word before cursor\nCtrl+U            Clear to start of line\nCtrl+K            Clear to end of line\nCtrl+Y            Paste last deleted text\n\n── History ───────────────────────────────────\nUp/Down           Navigate command history\nCtrl+R            Reverse search history\n!!                Repeat last command\n!$                Last argument of previous command\n\n── Control ───────────────────────────────────\nCtrl+C            Cancel / interrupt\nCtrl+L            Clear screen\nCtrl+D            EOF / exit\nCtrl+Z            Suspend process",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Complete the following tasks. Try to use shortcuts instead of retyping from scratch — the goal is to build speed and muscle memory.",
        },
        {
          type: "text",
          content:
            "**Task 1:** List the contents of the logs directory in long format.",
        },
        {
          type: "code",
          content: "ls -la logs/",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Task 2:** View the contents of the server error log.",
        },
        {
          type: "code",
          content: "cat logs/error.log",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Task 3:** Run a multi-flag command to display the deploy script.",
        },
        {
          type: "code",
          content: "cat scripts/deploy.sh",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Task 4:** Use echo to print a victory message.",
        },
        {
          type: "code",
          content: 'echo "keyboard shortcuts mastered"',
          language: "bash",
        },
        {
          type: "tip",
          content:
            "Speed comes from not thinking about the shortcuts. If you had to pause and remember which key to press, that's normal — keep practicing and they'll become automatic. Most developers reach this point after about a week of deliberate use.",
        },
      ],
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
          type: "history_contains",
          value: "ls",
          hint: "Type: ls -la logs/",
        },
        {
          id: "view-error-log",
          description: "View the error log file",
          type: "history_contains",
          value: "cat logs/error.log",
          hint: "Type: cat logs/error.log",
        },
        {
          id: "view-deploy-script",
          description: "View the deploy script",
          type: "history_contains",
          value: "cat scripts/deploy.sh",
          hint: "Type: cat scripts/deploy.sh",
        },
        {
          id: "echo-victory",
          description: "Print a victory message with echo",
          type: "history_contains",
          value: "keyboard shortcuts mastered",
          hint: 'Type: echo "keyboard shortcuts mastered"',
        },
      ],
    },
  ],
};

export default keyboardShortcutsModule;
