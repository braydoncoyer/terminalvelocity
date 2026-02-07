import type { ModuleConfig } from "@/lib/lessons/types";

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
      content: [
        {
          type: "text",
          content:
            "Every command in the terminal communicates through three invisible channels called **standard streams**. Understanding these streams is the key to unlocking one of the terminal's most powerful features: connecting commands together.",
        },
        {
          type: "text",
          content:
            "**Standard input (stdin)** is the channel through which a command receives data — usually from your keyboard. **Standard output (stdout)** is where a command sends its results — usually printed to your screen. **Standard error (stderr)** is a separate channel for error messages, also printed to your screen by default but kept logically separate from normal output.",
        },
        {
          type: "code",
          content:
            "Keyboard ──→ [stdin]  ──→ ┌─────────┐ ──→ [stdout] ──→ Screen\n                          │ Command │\n                          └─────────┘ ──→ [stderr] ──→ Screen",
          language: "bash",
        },
        {
          type: "text",
          content:
            "Why does this matter? Because once you understand that commands take input and produce output through these channels, you can start *rewiring* them. You can send a command's output into a file instead of the screen. You can feed one command's output as input to another. You can even separate error messages from normal output. This is the foundation of everything you'll learn in this module.",
        },
        {
          type: "tip",
          content:
            "Think of stdin, stdout, and stderr like plumbing. By default the pipes connect your keyboard to commands and commands to your screen. But you can reroute those pipes to go anywhere — into files, into other commands, or even into nothing at all.",
        },
        {
          type: "text",
          content:
            "Let's see streams in action. The `echo` command writes to stdout — it takes the text you give it and sends it to the screen. The `cat` command reads a file and sends its contents to stdout. Try both commands below.",
        },
        {
          type: "code",
          content:
            'echo "Hello from stdout!"\ncat message.txt',
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "Windows has the same concept of standard streams. In PowerShell, commands output objects to a pipeline (stdout equivalent) and errors go to an error stream (stderr equivalent). The core idea is identical across platforms.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "By default, every command's output goes to your screen. But what if you want to save it? The **redirect operator** `>` takes stdout and sends it to a file instead. If the file doesn't exist, it creates one. If it does exist, it **overwrites** the contents completely.",
        },
        {
          type: "code",
          content:
            'echo "first line" > output.txt     # creates file (or overwrites)\necho "second line" >> output.txt   # appends to the file\ncat output.txt                     # see both lines',
          language: "bash",
        },
        {
          type: "text",
          content:
            "The single `>` is like a fresh start — it replaces everything in the file with the new output. The double `>>` is the **append operator** — it adds to the end of the file without touching what's already there. This distinction is critical. Using `>` when you meant `>>` will destroy the file's previous contents.",
        },
        {
          type: "text",
          content:
            "Redirection works with any command, not just `echo`. You could run `ls > filelist.txt` to save a directory listing, or `cat notes.txt > backup.txt` to copy a file's contents. Anywhere stdout goes to the screen, you can redirect it to a file instead.",
        },
        {
          type: "warning",
          content:
            "Be careful with `>`. Running `echo \"oops\" > important-data.txt` will erase everything in that file and replace it with \"oops\". Always double-check the filename before using `>`. When in doubt, use `>>` to append instead.",
        },
        {
          type: "tip",
          content:
            "A useful trick: `> file.txt` with no command empties a file without deleting it. This is handy for clearing log files while keeping the file in place so other programs that reference it aren't disrupted.",
        },
        {
          type: "text",
          content:
            "Let's practice. Use `echo` with the `>` operator to create a file called `greeting.txt`, then use `>>` to append a second line to it.",
        },
        {
          type: "code",
          content:
            'echo "Hello, world!" > greeting.txt\necho "Welcome to piping & redirection." >> greeting.txt',
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "Windows Command Prompt uses the same `>` and `>>` operators for redirection. PowerShell also supports them, plus `Out-File` and `Add-Content` cmdlets for more control. The concepts transfer directly.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "Redirection sends output to a file. But what if you want to send one command's output directly into *another command* as input? That's what the **pipe operator** `|` does. It connects the stdout of one command to the stdin of the next, creating a chain.",
        },
        {
          type: "code",
          content:
            "ls | grep \".txt\"          # list files, then filter for .txt\ncat names.txt | sort       # read file, then sort the lines\nls -la | head -n 5         # list files in detail, show only first 5",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The pipe is the vertical bar character `|` (usually Shift + Backslash on most keyboards). The command on the left runs first, and its output flows into the command on the right. Think of it as literally piping water from one container to the next — the output of the first command pours into the input of the second.",
        },
        {
          type: "text",
          content:
            "This is one of the most powerful ideas in the terminal: small, focused commands that each do one thing well, connected together to accomplish complex tasks. Instead of needing one monolithic command that lists files AND filters by name, you combine `ls` (which lists) with `grep` (which filters). Each command stays simple; the pipe makes them powerful together.",
        },
        {
          type: "tip",
          content:
            "The Unix philosophy in one sentence: \"Write programs that do one thing and do it well, and write programs to work together.\" The pipe operator is what makes working together possible.",
        },
        {
          type: "text",
          content:
            "Your workspace has a directory full of different file types. Use `ls` piped to `grep` to filter and find only the JavaScript files.",
        },
        {
          type: "code",
          content: 'ls project/ | grep ".js"',
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "PowerShell also uses `|` for piping, but it pipes *objects* rather than plain text. The concept is the same: chain commands together so the output of one feeds into the next. For example: `Get-ChildItem | Where-Object { $_.Extension -eq '.js' }`.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "Now that you know how the pipe works, let's look at the combinations developers use every day. These patterns are so common they'll become second nature. Each one pairs a data-producing command with a data-processing command.",
        },
        {
          type: "code",
          content:
            'cat server.log | grep "ERROR"    # find error lines in a log\nls Documents/ | wc -l            # count files in a directory\ncat names.txt | sort | uniq      # sort names and remove duplicates',
          language: "bash",
        },
        {
          type: "text",
          content:
            '`cat | grep` is the classic "search a file" pattern. `cat` dumps the file contents and `grep` filters for lines matching a pattern. `ls | wc -l` counts items in a directory — `wc` stands for "word count" and the `-l` flag tells it to count lines instead. Since `ls` outputs one item per line when piped, this effectively counts files and directories.',
        },
        {
          type: "text",
          content:
            "`sort | uniq` is a powerful duo for cleaning up data. `sort` arranges lines in alphabetical order, and `uniq` removes consecutive duplicate lines. Since `uniq` only removes *adjacent* duplicates, you almost always sort first. Together they answer questions like \"what are the unique entries in this list?\"",
        },
        {
          type: "tip",
          content:
            "The `wc` command has several useful flags: `-l` counts lines, `-w` counts words, and `-c` counts bytes (characters). The `-l` flag is by far the most common — counting lines is surprisingly useful for everything from checking file lengths to counting search results.",
        },
        {
          type: "text",
          content:
            "A reports directory has been set up with a bunch of files. Use `ls` piped to `wc -l` to count how many files are in the directory.",
        },
        {
          type: "code",
          content: "ls reports/ | wc -l",
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "PowerShell equivalents: `Get-Content log.txt | Select-String 'ERROR'` replaces `cat | grep`. `(Get-ChildItem).Count` counts files without piping. The logic is the same even though the syntax differs.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "The terminal is exceptionally good at processing text. Four commands form the core of this capability: `grep` searches for patterns, `wc` counts things, `sort` orders lines, and `uniq` removes duplicates. Each is simple alone, but combined through pipes they can answer surprisingly complex questions about your data.",
        },
        {
          type: "code",
          content:
            'grep "error" log.txt          # find lines containing "error"\ngrep -i "error" log.txt       # case-insensitive search\ngrep -c "error" log.txt       # count matching lines\nwc -l data.txt                # count lines in a file\nsort names.txt                # sort lines alphabetically\nsort -r names.txt             # sort in reverse order\nuniq visitors.txt             # remove adjacent duplicate lines\nsort visitors.txt | uniq -c   # count occurrences of each line',
          language: "bash",
        },
        {
          type: "text",
          content:
            '`grep` is arguably the most-used text processing command. Its name comes from "Global Regular Expression Print" — it searches through text and prints lines that match a pattern. The `-i` flag makes it case-insensitive, and `-c` makes it count matches instead of printing them. You\'ll use `grep` constantly for searching log files, filtering command output, and finding specific data.',
        },
        {
          type: "text",
          content:
            "`sort` and `uniq` are best friends. `sort` arranges lines alphabetically (or numerically with `-n`), and `uniq` removes consecutive duplicates. The critical detail: `uniq` only removes *adjacent* duplicates, so always pipe through `sort` first. The `-c` flag on `uniq` is incredibly useful — it prefixes each line with the number of times it appeared, giving you a frequency count.",
        },
        {
          type: "tip",
          content:
            "The pattern `sort | uniq -c | sort -rn` is a terminal classic. It finds unique entries, counts how many times each appears, then sorts by count in descending order. This answers questions like \"what are the most common entries in this data?\"",
        },
        {
          type: "text",
          content:
            "There's a file called `visitors.txt` that contains a log of website visitors — many of them visited multiple times. Use `sort` and `uniq` together to find the unique visitors.",
        },
        {
          type: "code",
          content: "sort visitors.txt | uniq",
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "PowerShell equivalents: `Select-String` replaces `grep`, `Measure-Object -Line` replaces `wc -l`, `Sort-Object` replaces `sort`, and `Get-Unique` replaces `uniq`. The concepts carry over perfectly.",
        },
      ],
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
      content: [
        {
          type: "text",
          content:
            "You've piped two commands together. But there's no limit — you can chain three, four, or more commands in a single pipeline. Each command takes the output of the previous one, transforms it, and passes the result along. This is where the terminal starts to feel like a superpower.",
        },
        {
          type: "code",
          content:
            '# Find the top 3 most frequent visitors\nsort visitors.csv | uniq -c | sort -rn | head -n 3\n\n# Count how many ERROR lines are in the log\ncat server.log | grep "ERROR" | wc -l\n\n# Extract emails from column 3 of a CSV, sort, and deduplicate\ncat contacts.csv | cut -d"," -f3 | sort | uniq',
          language: "bash",
        },
        {
          type: "text",
          content:
            "The trick to building pipelines is to think about it step by step. Start with the raw data source (a file or command output). Then ask: what do I need to do to this data? Filter it? Sort it? Count it? Extract a column? Each operation becomes one stage in the pipeline, connected by `|`.",
        },
        {
          type: "text",
          content:
            "A good debugging technique: build your pipeline one stage at a time. First run just `cat data.csv` to see the raw data. Then add `| grep \"sales\"` and check the output. Then add `| wc -l` to get the count. At each stage you can see exactly what the data looks like before adding the next transformation.",
        },
        {
          type: "tip",
          content:
            "There's no prize for building the longest pipeline. If a three-command pipeline answers your question, stop there. Readability matters even in the terminal. That said, a well-crafted pipeline that replaces a 20-line script is a thing of beauty.",
        },
        {
          type: "text",
          content:
            "You have a `sales.csv` file with transaction records. Build a multi-stage pipeline (at least 3 commands) to process it. For example, extract the product names, sort them, and count the unique products.",
        },
        {
          type: "code",
          content:
            'cat sales.csv | grep -v "product" | sort | uniq -c | sort -rn',
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "Long pipelines work in PowerShell too, though the syntax is different. The mental model is the same: each `|` feeds data from one command into the next. PowerShell's object-based piping can actually be more readable for complex chains.",
        },
      ],
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
