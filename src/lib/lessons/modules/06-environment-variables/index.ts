import type { ModuleConfig } from "@/lib/lessons/types";

const environmentVariablesModule: ModuleConfig = {
  slug: "environment-variables",
  title: "Environment & Variables",
  description: "Understand and configure your shell environment",
  lessons: [
    // ── Lesson 1: Environment Variables ────────────────────────────
    {
      slug: "env-variables",
      title: "Environment Variables",
      description:
        "Learn what environment variables are and how to inspect them with echo.",
      content: [
        {
          type: "text",
          content:
            "Every time you open a terminal, the shell loads a set of **environment variables** — named values that store configuration about your system, your user account, and how programs should behave. Think of them as the settings panel for your terminal session. Programs read these variables to figure out things like where to find commands, who is logged in, and what your home directory is.",
        },
        {
          type: "text",
          content:
            "Environment variables are written in ALL_CAPS by convention. You reference them with a `$` prefix. Some of the most important ones include `$HOME` (your home directory), `$USER` (your username), and `$PATH` (where the shell looks for commands). These are set automatically when you log in, and nearly every tool on your system relies on them.",
        },
        {
          type: "code",
          content:
            "echo $HOME      # Prints your home directory\necho $USER      # Prints your username\necho $PATH      # Prints the list of directories searched for commands",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The `echo` command prints text to the screen, but when you give it a variable name starting with `$`, the shell **expands** that variable into its value before echo ever sees it. So `echo $HOME` doesn't literally print the text \"$HOME\" — it prints something like `/home/user`.",
        },
        {
          type: "tip",
          content:
            "You can see all environment variables at once by running `env` or `printenv` in a real terminal. It's a long list, but scanning it teaches you a lot about how your system is configured.",
        },
        {
          type: "windows-callout",
          content:
            "On Windows, environment variables use `%VARIABLE%` syntax in Command Prompt (e.g., `echo %PATH%`) and `$env:VARIABLE` in PowerShell (e.g., `$env:PATH`). In WSL, the Linux `$VARIABLE` syntax works as shown here.",
        },
        {
          type: "text",
          content:
            "Try printing some environment variables. Run `echo $PATH` or `echo $HOME` to see what your shell knows about your system.",
        },
        {
          type: "code",
          content: "echo $PATH",
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "echo-env-var",
          description: "Run echo $PATH or echo $HOME to inspect an environment variable",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) => cmd.includes("echo $PATH") || cmd.includes("echo $HOME")
            ),
          hint: "Type: echo $PATH or echo $HOME and press Enter.",
        },
      ],
    },

    // ── Lesson 2: Setting Variables ────────────────────────────────
    {
      slug: "setting-variables",
      title: "Setting Variables",
      description:
        "Learn to create your own variables with export and understand the difference between shell and environment variables.",
      content: [
        {
          type: "text",
          content:
            "You're not limited to the built-in variables — you can create your own. There are two kinds of variables in the shell: **shell variables** (local to your current session) and **environment variables** (available to your session *and* any programs you launch from it). The difference matters when you run scripts or other programs that need access to your values.",
        },
        {
          type: "text",
          content:
            "To create a shell variable, just assign it: `GREETING=hello`. No spaces around the `=` sign — this is a common mistake. To promote it to a full environment variable (so child processes can see it), use `export`: `export GREETING=hello`. Once set, you reference it with `$GREETING`.",
        },
        {
          type: "code",
          content:
            'export MY_NAME="terminal learner"\necho $MY_NAME',
          language: "bash",
        },
        {
          type: "text",
          content:
            "Variables set this way only last for the current session. When you close the terminal, they're gone. To make variables permanent, you'd add the `export` line to a configuration file like `~/.bashrc` or `~/.zshrc` — but that's a topic for a later module.",
        },
        {
          type: "tip",
          content:
            'Remember: no spaces around the equals sign. `MY_VAR="hello"` works. `MY_VAR = "hello"` does not — the shell thinks you\'re trying to run a command called MY_VAR with arguments = and hello.',
        },
        {
          type: "warning",
          content:
            "Be careful not to overwrite important system variables like PATH or HOME. If you accidentally clear PATH, your shell won't be able to find any commands until you fix it or open a new terminal.",
        },
        {
          type: "windows-callout",
          content:
            "In PowerShell, you set variables with `$MyVar = \"value\"` (spaces are fine). To set a persistent environment variable, use `[Environment]::SetEnvironmentVariable(\"MY_VAR\", \"value\", \"User\")`. In Command Prompt, use `set MY_VAR=value` for the session or `setx MY_VAR value` for persistence.",
        },
        {
          type: "text",
          content:
            "Try it yourself. Use `export` to create a variable, then use `echo` with a `$` prefix to read it back.",
        },
        {
          type: "code",
          content:
            'export FAVORITE_COLOR="blue"\necho $FAVORITE_COLOR',
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "use-export",
          description: "Create a variable using export",
          type: "history_contains",
          value: "export",
          hint: 'Type something like: export MY_VAR="hello" and press Enter.',
        },
        {
          id: "read-variable",
          description: "Read your variable back with echo $",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some((cmd) => cmd.match(/echo \$/)),
          hint: "Type: echo $MY_VAR (using whatever variable name you exported).",
        },
      ],
    },

    // ── Lesson 3: The PATH Variable ────────────────────────────────
    {
      slug: "path-variable",
      title: "The PATH Variable",
      description:
        "Understand how PATH determines which commands your shell can find and run.",
      content: [
        {
          type: "text",
          content:
            "When you type a command like `ls` or `git`, how does the shell know where that program lives on your system? It doesn't search your entire hard drive — that would be painfully slow. Instead, it checks a specific list of directories, and that list is stored in the `$PATH` environment variable.",
        },
        {
          type: "text",
          content:
            "`$PATH` contains a colon-separated list of directories. When you type a command, the shell walks through each directory in order, looking for an executable file with that name. The first match wins. If no directory in PATH contains the command, you get the dreaded \"command not found\" error.",
        },
        {
          type: "code",
          content:
            "echo $PATH\n# Output might look like:\n# /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
          language: "bash",
        },
        {
          type: "text",
          content:
            "The `which` command tells you exactly where a command lives. Running `which ls` shows the full path to the `ls` executable. This is invaluable for debugging — if a command isn't behaving as expected, `which` tells you which version is actually being run.",
        },
        {
          type: "code",
          content: "which ls\n# /bin/ls",
          language: "bash",
        },
        {
          type: "tip",
          content:
            "If you install a new tool and the terminal says \"command not found,\" the fix is almost always adding the tool's directory to your PATH. Installers usually do this automatically, but knowing how PATH works helps you fix it when they don't.",
        },
        {
          type: "text",
          content:
            "In a real terminal, you can add to PATH like this: `export PATH=\"$PATH:/new/directory\"`. This appends a new directory to the end of the list. Adding it to the beginning (`export PATH=\"/new/directory:$PATH\"`) gives it higher priority.",
        },
        {
          type: "windows-callout",
          content:
            "Windows uses semicolons instead of colons to separate PATH entries (e.g., `C:\\Windows;C:\\Program Files\\Git\\bin`). You can edit PATH through System Properties > Environment Variables, or in PowerShell with `$env:Path`. In WSL, the Linux colon-separated format applies.",
        },
        {
          type: "text",
          content:
            "Try using `which` to find where a command is located, and `echo $PATH` to see all the directories your shell searches.",
        },
        {
          type: "code",
          content: "which echo\necho $PATH",
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "use-which",
          description: "Use the which command to locate a program",
          type: "history_contains",
          value: "which",
          hint: "Type: which ls or which echo and press Enter.",
        },
        {
          id: "echo-path",
          description: "Print the PATH variable with echo $PATH",
          type: "history_contains",
          value: "echo $PATH",
          hint: "Type: echo $PATH and press Enter.",
        },
      ],
    },
  ],
};

export default environmentVariablesModule;
