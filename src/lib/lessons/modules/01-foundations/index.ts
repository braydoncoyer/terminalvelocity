import type { ModuleConfig } from "@/lib/lessons/types";

const foundationsModule: ModuleConfig = {
  slug: "terminal-foundations",
  title: "Terminal Foundations",
  description: "Get comfortable with the terminal and learn the core concepts",
  lessons: [
    // ── Lesson 1: What is a Terminal? ──────────────────────────────
    {
      slug: "what-is-a-terminal",
      title: "What is a Terminal?",
      description:
        "Understand what a terminal is, how it differs from a shell, and why it still matters in the age of AI.",
      content: [
        {
          type: "text",
          content:
            "Before graphical interfaces existed, the terminal was the *only* way to talk to a computer. You typed a command, pressed Enter, and the machine responded with text. That basic loop — type, enter, read — is still one of the most powerful ways to interact with a computer today.",
        },
        {
          type: "text",
          content:
            'You\'ll often hear the words **terminal**, **shell**, and **CLI** used interchangeably, but they mean different things. The **terminal** (or terminal emulator) is the window you type in. The **shell** is the program running inside that window — it interprets your commands and talks to the operating system. **CLI** stands for "command-line interface" and refers to any program you interact with by typing text commands.',
        },
        {
          type: "text",
          content:
            "Why does this matter now, when AI tools can generate entire apps? Because AI assistants, cloud servers, Docker containers, and developer tools all speak the terminal\'s language. Understanding the terminal means you can verify what AI generates, deploy your own projects, debug problems faster, and automate repetitive tasks. It\'s the universal remote control of computing.",
        },
        {
          type: "tip",
          content:
            "You don't need to memorize everything. Terminal skills are built through repetition. Every command you practice here will stick a little more each time.",
        },
        {
          type: "text",
          content:
            "Let's start simple. The `echo` command prints whatever text you give it back to the screen. Try running the command below to say hello to the terminal.",
        },
        {
          type: "code",
          content: 'echo "hello terminal"',
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "echo-hello",
          description: 'Run echo "hello terminal"',
          type: "command_output_contains",
          value: "hello terminal",
          hint: 'Type: echo "hello terminal" and press Enter.',
        },
      ],
    },

    // ── Lesson 2: Anatomy of a Command ─────────────────────────────
    {
      slug: "anatomy-of-a-command",
      title: "Anatomy of a Command",
      description:
        "Learn the three building blocks of every terminal command: the command name, flags, and arguments.",
      content: [
        {
          type: "text",
          content:
            "Every terminal command follows the same basic pattern. Once you see it, you can read *any* command — even ones you've never used before.",
        },
        {
          type: "code",
          content: "command  -flags  argument",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The **command** is the program you want to run (like `ls` to list files). **Flags** (also called options) modify how the command behaves — they usually start with a dash, like `-l` for a long listing or `-a` to show hidden files. **Arguments** tell the command *what* to operate on, like a file or directory path.",
        },
        {
          type: "text",
          content:
            'You can often combine single-letter flags. Instead of typing `ls -l -a`, you can write `ls -la` — same result, fewer keystrokes. Some flags use two dashes and a full word, like `--all`. Both styles are common and you\'ll get used to spotting them.',
        },
        {
          type: "tip",
          content:
            'Think of it like a sentence: the command is the verb ("list"), the flags are adverbs ("in detail"), and the argument is the noun ("this folder").',
        },
        {
          type: "text",
          content:
            "Let's try it. Run `ls -la /home` to list all files (including hidden ones) in the /home directory using a detailed format.",
        },
        {
          type: "code",
          content: "ls -la /home",
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            'On Windows, the equivalent command is `dir /a` in Command Prompt. In PowerShell you can use `Get-ChildItem -Force`. If you\'re using WSL (Windows Subsystem for Linux), `ls -la` works exactly as shown here.',
        },
      ],
      fsSeed: {
        "projects": null,
        "projects/website": null,
        "projects/website/index.html": "<!DOCTYPE html><html><body>Hello</body></html>",
        "projects/notes.txt": "My project notes",
        "documents": null,
        "documents/readme.md": "# Welcome\nThis is a readme file.",
      },
      goals: [
        {
          id: "ls-la-command",
          description: "Run ls -la /home to see a detailed file listing",
          type: "history_contains",
          value: "ls -la",
          hint: "Type: ls -la /home and press Enter to see all files in long format.",
        },
      ],
    },

    // ── Lesson 3: Your First Commands ──────────────────────────────
    {
      slug: "your-first-commands",
      title: "Your First Commands",
      description:
        "Practice the essential starter commands: pwd, whoami, echo, and clear.",
      content: [
        {
          type: "text",
          content:
            "Every developer uses a handful of commands hundreds of times a day. Let's learn four of the most fundamental ones. These are your orientation tools — they answer the basic questions: *Where am I?*, *Who am I?*, and *How do I communicate with the terminal?*",
        },
        {
          type: "code",
          content:
            "pwd        # Print Working Directory — shows where you are\nwhoami     # Prints your username\necho Hi!   # Prints text back to the screen\nclear      # Clears the terminal screen",
          language: "bash",
        },
        {
          type: "text",
          content:
            '`pwd` stands for "print working directory." It tells you the full path of the folder you\'re currently in — like checking the address on a street sign. `whoami` prints your current username, which is useful when you\'re working on remote servers or switching between accounts.',
        },
        {
          type: "text",
          content:
            "`echo` prints whatever you type after it. It might seem trivial, but it's one of the most used commands in scripting and automation. `clear` wipes the terminal screen when things get cluttered — your history isn't deleted, just scrolled out of view.",
        },
        {
          type: "tip",
          content:
            "On most terminals you can also press Ctrl+L as a shortcut for clear. Handy when you want a clean slate without typing a command.",
        },
        {
          type: "text",
          content:
            "Try running each of the four commands below. Complete all four goals to finish this lesson.",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "run-pwd",
          description: "Run pwd to see your current directory",
          type: "history_contains",
          value: "pwd",
          hint: "Type: pwd and press Enter.",
        },
        {
          id: "run-whoami",
          description: "Run whoami to see your username",
          type: "history_contains",
          value: "whoami",
          hint: "Type: whoami and press Enter.",
        },
        {
          id: "run-echo",
          description: "Run echo with any text",
          type: "history_contains",
          value: "echo",
          hint: 'Type something like: echo "hello world" and press Enter.',
        },
        {
          id: "run-clear",
          description: "Run clear to wipe the screen",
          type: "history_contains",
          value: "clear",
          hint: "Type: clear and press Enter (or try Ctrl+L).",
        },
      ],
    },

    // ── Lesson 4: Getting Help ─────────────────────────────────────
    {
      slug: "getting-help",
      title: "Getting Help",
      description:
        "Learn how to look up what any command does without leaving the terminal.",
      content: [
        {
          type: "text",
          content:
            "Nobody memorizes every flag for every command. The real skill is knowing how to look things up quickly. The terminal has built-in documentation, and learning to reach for it will save you countless trips to a search engine.",
        },
        {
          type: "text",
          content:
            "There are two main ways to get help. The first is the `--help` flag, which almost every command supports. It prints a short summary of the command's usage, flags, and arguments directly in the terminal.",
        },
        {
          type: "code",
          content: "ls --help",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The second way is the `man` command (short for \"manual\"). Running `man ls` opens a full manual page for the `ls` command. Manual pages are more detailed and include examples, related commands, and edge cases. Use the arrow keys to scroll and press `q` to quit.",
        },
        {
          type: "code",
          content: "man ls",
          language: "bash",
        },
        {
          type: "tip",
          content:
            "When you're unsure about a command, try --help first for a quick overview. If you need deeper detail, reach for man. Building this habit early makes learning new commands much faster.",
        },
        {
          type: "windows-callout",
          content:
            "Windows Command Prompt uses `command /?` for help (e.g., `dir /?`). PowerShell uses `Get-Help` (e.g., `Get-Help Get-ChildItem`). In WSL, `man` and `--help` work just like on Linux.",
        },
        {
          type: "text",
          content:
            "Try running `ls --help` or `man ls` to see the help output for the `ls` command.",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "get-help",
          description: "Run ls --help or man ls to view help information",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("--help") || cmd.includes("man")
            ),
          hint: "Type: ls --help or man ls and press Enter.",
        },
      ],
    },

    // ── Lesson 5: Understanding the Prompt ─────────────────────────
    {
      slug: "understanding-the-prompt",
      title: "Understanding the Prompt",
      description:
        "Read the information your terminal prompt gives you before every command.",
      content: [
        {
          type: "text",
          content:
            "The blinking cursor at the start of every line isn't just waiting for input — it's telling you useful information. That text before the cursor is called the **prompt**, and it typically shows your username, hostname (computer name), and current directory.",
        },
        {
          type: "code",
          content: "user@hostname:~/projects $",
          language: "bash",
        },
        {
          type: "text",
          content:
            'In the example above, `user` is your username, `hostname` is your computer\'s name, and `~/projects` is the directory you\'re in (the `~` is shorthand for your home directory). The `$` at the end means you\'re a regular user. If you ever see a `#` instead, that means you\'re the **root** (admin) user — be extra careful, because root can modify or delete anything on the system.',
        },
        {
          type: "tip",
          content:
            "The prompt is fully customizable. Many developers add colors, git branch info, or even emoji to their prompt. You'll learn how to customize yours in a later module.",
        },
        {
          type: "text",
          content:
            "For now, let's confirm what directory the prompt is showing. Run `pwd` to print your current working directory and verify it matches what the prompt displays.",
        },
        {
          type: "code",
          content: "pwd",
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "PowerShell's default prompt shows `PS C:\\Users\\you>`. The `PS` prefix indicates PowerShell, and the path shows your current location. The `>` symbol is PowerShell's equivalent of `$`.",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "verify-directory",
          description: "Run pwd to verify your current directory",
          type: "history_contains",
          value: "pwd",
          hint: "Type: pwd and press Enter to see your current directory.",
        },
      ],
    },
  ],
};

export default foundationsModule;
