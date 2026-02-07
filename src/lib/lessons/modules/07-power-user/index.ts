import type { ModuleConfig } from "@/lib/lessons/types";

const powerUserModule: ModuleConfig = {
  slug: "power-user",
  title: "Power User Techniques",
  description: "Wildcards, brace expansion, and command chaining",
  lessons: [
    // ── Lesson 1: Wildcards & Globbing ─────────────────────────────
    {
      slug: "wildcards",
      title: "Wildcards & Globbing",
      description:
        "Use wildcard patterns to match multiple files at once instead of typing each name.",
      content: [
        {
          type: "text",
          content:
            "Typing file names one by one gets tedious fast. **Wildcards** (also called **globbing patterns**) let you match multiple files with a single expression. The shell expands the pattern into all matching file names before the command even runs. It's like a search filter built right into the command line.",
        },
        {
          type: "text",
          content:
            "The two most common wildcards are `*` and `?`. The asterisk `*` matches **any number of characters** (including zero). The question mark `?` matches exactly **one character**. You can combine them with regular text to build precise patterns.",
        },
        {
          type: "code",
          content:
            'ls *.txt        # All files ending in .txt\nls image?.png   # image1.png, image2.png, but not image10.png\nls *.js         # All JavaScript files\nls test_*       # All files starting with "test_"',
          language: "bash",
        },
        {
          type: "text",
          content:
            "Wildcards are expanded by the shell, not by the command itself. So `ls *.txt` and `cat *.txt` and `rm *.txt` all use the same pattern matching — the shell finds the matches and passes the file names as arguments. This is why wildcards work with virtually every command.",
        },
        {
          type: "tip",
          content:
            "Be cautious with `rm *` — it deletes every file in the current directory. Always double-check your pattern with `ls` first. Running `ls *.log` before `rm *.log` shows you exactly what will be deleted.",
        },
        {
          type: "warning",
          content:
            "Our terminal simulator uses `find` for glob matching rather than direct shell expansion. Use `find . -name \"*.txt\"` to search for patterns. In a real terminal, `ls *.txt` works directly.",
        },
        {
          type: "windows-callout",
          content:
            "In Command Prompt, wildcards work with `dir` (e.g., `dir *.txt`) but not all commands. PowerShell supports wildcards more broadly with `Get-ChildItem *.txt` or `ls *.txt`. In WSL, wildcards work exactly as shown here.",
        },
        {
          type: "text",
          content:
            "This workspace has a mix of file types. Try using a wildcard pattern to find all the `.txt` files. Use `find . -name \"*.txt\"` to search for them.",
        },
        {
          type: "code",
          content: 'find . -name "*.txt"',
          language: "bash",
        },
      ],
      fsSeed: {
        "notes.txt": "Some quick notes for the project.",
        "readme.md": "# Project Readme\nWelcome to the project.",
        "app.js": 'console.log("Hello from the app");',
        "utils.js": "function add(a, b) { return a + b; }",
        "data.py": "import pandas as pd\nprint('Loading data...')",
        "todo.txt": "- Buy groceries\n- Finish homework",
        "style.css": "body { margin: 0; }",
        "report.txt": "Quarterly report: all metrics up.",
        "config.json": '{ "debug": true }',
        "helper.py": "def greet(name):\n    return f'Hello, {name}'",
      },
      goals: [
        {
          id: "use-wildcard",
          description: "Use a *.txt wildcard pattern to find text files",
          type: "history_contains",
          value: "*.txt",
          hint: 'Type: find . -name "*.txt" and press Enter.',
        },
      ],
    },

    // ── Lesson 2: Brace Expansion ──────────────────────────────────
    {
      slug: "brace-expansion",
      title: "Brace Expansion",
      description:
        "Learn how brace expansion generates multiple arguments from a compact pattern.",
      content: [
        {
          type: "text",
          content:
            "**Brace expansion** is a shell feature that generates multiple strings from a single pattern. Instead of typing three separate commands to create three files, you can do it in one shot. It's one of those features that, once you learn it, you'll wonder how you ever lived without.",
        },
        {
          type: "text",
          content:
            "There are two forms. **List expansion** uses comma-separated values: `{a,b,c}` expands to `a b c`. **Range expansion** uses two dots: `{1..5}` expands to `1 2 3 4 5`. You can combine these with surrounding text to generate complex patterns.",
        },
        {
          type: "code",
          content:
            '# List expansion\ntouch file_{a,b,c}.txt       # Creates file_a.txt, file_b.txt, file_c.txt\n\n# Range expansion\ntouch report_{1..5}.md       # Creates report_1.md through report_5.md\n\n# Combine with paths\nmkdir -p src/{components,utils,hooks}  # Three subdirectories in one command',
          language: "bash",
        },
        {
          type: "text",
          content:
            "Brace expansion happens *before* wildcard expansion and is performed by the shell itself, not the command. This means it works with any command — `touch`, `mkdir`, `cp`, `echo`, anything. It's purely a text substitution: the shell replaces the brace expression with the expanded list, then runs the resulting command.",
        },
        {
          type: "tip",
          content:
            'You can preview what brace expansion produces by using `echo`. Running `echo file_{a,b,c}.txt` prints "file_a.txt file_b.txt file_c.txt" without creating anything. It\'s a great way to test your pattern before committing to it.',
        },
        {
          type: "warning",
          content:
            "Our terminal simulator does not support brace expansion natively. In a real terminal, you'd use these patterns directly. For practice here, we'll create files individually with `touch` to build the same muscle memory.",
        },
        {
          type: "windows-callout",
          content:
            "Brace expansion is not available in Command Prompt or PowerShell natively. PowerShell uses different approaches like `1..5 | ForEach-Object { New-Item \"file_$_.txt\" }`. In WSL or Git Bash on Windows, brace expansion works just like on Linux.",
        },
        {
          type: "text",
          content:
            "Since our simulator doesn't support brace expansion, let's practice the underlying skill — creating multiple files efficiently. Use `touch` to create three files: `file_a.txt`, `file_b.txt`, and `file_c.txt`. In a real terminal, you'd type `touch file_{a,b,c}.txt` to do this in one command.",
        },
        {
          type: "code",
          content:
            "touch file_a.txt\ntouch file_b.txt\ntouch file_c.txt",
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "create-file-a",
          description: "Create file_a.txt",
          type: "fs_exists",
          value: "/home/user/file_a.txt",
          hint: "Type: touch file_a.txt and press Enter.",
        },
        {
          id: "create-file-b",
          description: "Create file_b.txt",
          type: "fs_exists",
          value: "/home/user/file_b.txt",
          hint: "Type: touch file_b.txt and press Enter.",
        },
        {
          id: "create-file-c",
          description: "Create file_c.txt",
          type: "fs_exists",
          value: "/home/user/file_c.txt",
          hint: "Type: touch file_c.txt and press Enter.",
        },
      ],
    },

    // ── Lesson 3: Command Substitution ─────────────────────────────
    {
      slug: "command-substitution",
      title: "Command Substitution",
      description:
        "Understand how to use the output of one command as part of another.",
      content: [
        {
          type: "text",
          content:
            "**Command substitution** lets you use the output of one command as an argument to another. It's like nesting functions in programming — the inner command runs first, its output replaces the expression, and then the outer command runs with that result. This is one of the most powerful features of the shell.",
        },
        {
          type: "text",
          content:
            "The modern syntax is `$(command)`. The shell runs whatever is inside the parentheses, captures the output, and substitutes it in place. You'll also see the older backtick syntax `` `command` ``, which does the same thing but is harder to read and can't be nested easily.",
        },
        {
          type: "code",
          content:
            '# Store today\'s date in a file name\ntouch "backup_$(date +%Y-%m-%d).tar"\n\n# Count files in a directory\necho "There are $(ls | wc -l) files here"\n\n# Use current directory in a message\necho "You are in: $(pwd)"',
          language: "bash",
        },
        {
          type: "text",
          content:
            "Command substitution is everywhere in shell scripting. It's used for dynamic file names, building complex commands, assigning command output to variables (`CURRENT_DIR=$(pwd)`), and much more. Once you understand it, you'll start seeing opportunities to use it everywhere.",
        },
        {
          type: "tip",
          content:
            "Always prefer `$(command)` over backticks. The dollar-paren syntax is easier to read, nests cleanly (`$(echo $(pwd))`), and is the modern standard. Backticks are considered legacy style.",
        },
        {
          type: "warning",
          content:
            "Our terminal simulator has limited support for command substitution. In a real terminal, `$(command)` works everywhere. For this lesson, focus on understanding the concept and practice using `echo` to print output.",
        },
        {
          type: "windows-callout",
          content:
            "PowerShell uses a similar concept with `$(expression)` inside double-quoted strings, e.g., `\"Current dir: $(Get-Location)\"`. Command Prompt doesn't support command substitution directly — you'd use `for /f` loops instead. WSL supports `$(command)` natively.",
        },
        {
          type: "text",
          content:
            "Let's practice with what our simulator supports. Run `echo` with a message — in a real terminal, you could embed commands inside it with `$()`. Try running `echo hello world` and `pwd` to see output you could combine with substitution.",
        },
        {
          type: "code",
          content: 'echo "hello from the terminal"\npwd',
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "use-echo",
          description: "Use echo to print a message",
          type: "history_contains",
          value: "echo",
          hint: 'Type: echo "hello from the terminal" and press Enter.',
        },
      ],
    },

    // ── Lesson 4: Chaining Commands ────────────────────────────────
    {
      slug: "chaining-commands",
      title: "Chaining Commands",
      description:
        "Learn to run multiple commands in sequence using &&, ||, and ; operators.",
      content: [
        {
          type: "text",
          content:
            "So far, you've been running one command at a time. But the shell lets you **chain multiple commands** on a single line using special operators. This is incredibly useful for multi-step tasks — create a directory and immediately move into it, compile code and run it, or download a file and extract it, all in one line.",
        },
        {
          type: "text",
          content:
            "There are three main chaining operators. **`&&`** (AND) runs the second command only if the first one succeeds. **`||`** (OR) runs the second command only if the first one fails. **`;`** (semicolon) runs the second command no matter what. Each has a distinct purpose.",
        },
        {
          type: "code",
          content:
            '# AND — second runs only if first succeeds\nmkdir my-project && cd my-project\n\n# OR — second runs only if first fails\ncd my-project || echo "Directory doesn\'t exist"\n\n# Semicolon — always runs both\necho "Starting..." ; ls',
          language: "bash",
        },
        {
          type: "text",
          content:
            'The `&&` operator is the most commonly used. The classic pattern `mkdir my-project && cd my-project` is something you\'ll type hundreds of times as a developer. It\'s safe because if `mkdir` fails (maybe the directory already exists), the `cd` won\'t execute and you won\'t get a confusing error.',
        },
        {
          type: "tip",
          content:
            "You can chain more than two commands: `mkdir build && cd build && touch index.html && echo 'done'`. Each `&&` acts as a checkpoint — if any step fails, the rest are skipped.",
        },
        {
          type: "warning",
          content:
            "Our terminal simulator may not support `&&`, `||`, or `;` operators directly. In a real terminal, these work on every major shell. For practice, we'll run the commands individually to achieve the same result.",
        },
        {
          type: "windows-callout",
          content:
            "Command Prompt uses `&&` and `||` just like bash. PowerShell uses `-and` and `-or` in conditionals, or `;` to separate commands on one line. The `&&` operator was added to PowerShell 7. In WSL, all chaining operators work as shown.",
        },
        {
          type: "text",
          content:
            "Let's practice the most common pattern: creating a directory and moving into it. Run `mkdir my-project` first, then `cd my-project`. In a real terminal, you'd combine these as `mkdir my-project && cd my-project`.",
        },
        {
          type: "code",
          content: "mkdir my-project\ncd my-project",
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "create-directory",
          description: "Create the my-project directory",
          type: "fs_is_directory",
          value: "/home/user/my-project",
          hint: "Type: mkdir my-project and press Enter.",
        },
        {
          id: "enter-directory",
          description: "Navigate into the my-project directory",
          type: "cwd_equals",
          value: "/home/user/my-project",
          hint: "Type: cd my-project and press Enter.",
        },
      ],
    },

    // ── Lesson 5: Aliases ──────────────────────────────────────────
    {
      slug: "aliases",
      title: "Aliases",
      description:
        "Create shortcuts for long or frequently used commands with alias.",
      content: [
        {
          type: "text",
          content:
            "If you find yourself typing the same long command over and over, **aliases** are the answer. An alias is a custom shortcut that expands into a longer command. Instead of typing `ls -la --color=auto` every time, you can create an alias like `ll` that does the same thing in two keystrokes.",
        },
        {
          type: "text",
          content:
            "You create an alias with the `alias` command. The syntax is `alias name='command'`. Once defined, typing the alias name runs the full command. Aliases are one of the first things experienced developers set up when configuring a new machine.",
        },
        {
          type: "code",
          content:
            "alias ll='ls -la'           # Detailed file listing\nalias gs='git status'        # Quick git status\nalias ..='cd ..'             # Go up one directory\nalias cls='clear'            # Shorter clear command",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Like variables set with `export`, aliases created in the terminal only last for the current session. To make them permanent, you add them to your shell's configuration file (`~/.bashrc`, `~/.zshrc`, etc.). Many developers maintain a collection of aliases they carry from machine to machine.",
        },
        {
          type: "tip",
          content:
            "To see all your current aliases, just type `alias` with no arguments. To remove an alias, use `unalias name`. If an alias conflicts with a real command, you can bypass it by using the full path (e.g., `/bin/ls`) or prefixing with a backslash (`\\ls`).",
        },
        {
          type: "text",
          content:
            "Some popular aliases used by developers worldwide include shortcuts for git commands (`alias gc='git commit'`), navigation (`alias projects='cd ~/projects'`), and safety nets (`alias rm='rm -i'` to always confirm before deleting).",
        },
        {
          type: "windows-callout",
          content:
            "PowerShell uses `Set-Alias` (e.g., `Set-Alias ll Get-ChildItem`) or functions for more complex aliases. Command Prompt uses `doskey` (e.g., `doskey ll=dir /a $*`). In WSL, the bash `alias` command works as shown.",
        },
        {
          type: "text",
          content:
            "Try creating an alias. Use `alias` to define a shortcut for any command you like. For example, create an alias for a directory listing.",
        },
        {
          type: "code",
          content: "alias ll='ls -la'",
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "create-alias",
          description: "Create an alias using the alias command",
          type: "history_contains",
          value: "alias",
          hint: "Type: alias ll='ls -la' and press Enter.",
        },
      ],
    },
  ],
};

export default powerUserModule;
