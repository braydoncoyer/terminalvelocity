import type { ModuleConfig } from "@/lib/lessons/types";

const customizingTerminalModule: ModuleConfig = {
  slug: "customizing-terminal",
  title: "Customizing Your Terminal",
  description: "Make the terminal your own",
  lessons: [
    // ── Lesson 1: Shell Config Files ───────────────────────────────
    {
      slug: "config-files",
      title: "Shell Config Files",
      description:
        "Understand .bashrc, .zshrc, and .bash_profile — what they are and when they load.",
      content: [
        {
          type: "text",
          content:
            "Every time you open a terminal, your shell reads one or more configuration files before it shows you a prompt. These files are where your aliases, PATH changes, custom functions, and environment variables live. Understanding which file loads when is the key to customizing your terminal reliably.",
        },
        {
          type: "text",
          content:
            "The two most common shells are **Bash** and **Zsh**. macOS switched its default shell from Bash to Zsh in 2019 (Catalina), while most Linux distributions still default to Bash. Each shell has its own set of config files, but they follow similar patterns.",
        },
        {
          type: "text",
          content:
            "For **Bash**, there are two main files. `~/.bash_profile` runs when you start a **login shell** — the first terminal session you open, or when you SSH into a server. `~/.bashrc` runs for every new **interactive non-login shell** — like opening a new tab in your terminal. A common pattern is to have `.bash_profile` source `.bashrc` so your settings are consistent everywhere.",
        },
        {
          type: "code",
          content:
            "# Inside ~/.bash_profile — source .bashrc so settings work everywhere\nif [ -f ~/.bashrc ]; then\n    source ~/.bashrc\nfi",
          language: "bash",
        },
        {
          type: "text",
          content:
            "For **Zsh**, life is simpler. `~/.zshrc` runs for every interactive shell session — login or not. This is the one file you'll edit most often if you use Zsh. There's also `~/.zprofile` (similar to `.bash_profile`) and `~/.zshenv` (which runs for *every* shell, even scripts), but `.zshrc` is the star.",
        },
        {
          type: "tip",
          content:
            "Not sure which shell you're running? Type `echo $SHELL` in your terminal. You'll see something like `/bin/zsh` or `/bin/bash`.",
        },
        {
          type: "text",
          content:
            "These config files are hidden — their names start with a dot. That's why you won't see them with a plain `ls`. You need `ls -a` to reveal them. Let's look at the simulated config files in this lesson. Try viewing the contents of `.bashrc` or `.zshrc` using `cat`.",
        },
        {
          type: "code",
          content: "cat .bashrc\ncat .zshrc",
          language: "bash",
        },
        {
          type: "windows-callout",
          content:
            "Windows doesn't use .bashrc or .zshrc. PowerShell uses a profile script located at `$PROFILE` (usually `~\\Documents\\PowerShell\\Microsoft.PowerShell_profile.ps1`). You can find its path by running `echo $PROFILE` in PowerShell. If you're using WSL, your Linux shell config files work exactly as described here.",
        },
      ],
      fsSeed: {
        ".bashrc":
          '# ~/.bashrc - executed for interactive non-login shells\n\n# ── History settings ──────────────────────────────────\nHISTSIZE=10000\nHISTFILESIZE=20000\nHISTCONTROL=ignoreboth   # ignore duplicates and lines starting with space\n\n# ── Aliases ───────────────────────────────────────────\nalias ll="ls -alF"\nalias la="ls -A"\nalias l="ls -CF"\nalias gs="git status"\nalias gp="git push"\nalias gco="git checkout"\n\n# ── PATH ──────────────────────────────────────────────\nexport PATH="$HOME/.local/bin:$PATH"\nexport PATH="$HOME/go/bin:$PATH"\n\n# ── Default editor ────────────────────────────────────\nexport EDITOR="vim"\nexport VISUAL="code"\n\n# ── Custom prompt ─────────────────────────────────────\nPS1="\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ "\n',
        ".zshrc":
          '# ~/.zshrc - executed for every interactive Zsh session\n\n# ── Oh My Zsh (if installed) ──────────────────────────\n# export ZSH="$HOME/.oh-my-zsh"\n# ZSH_THEME="robbyrussell"\n# plugins=(git docker node)\n# source $ZSH/oh-my-zsh.sh\n\n# ── History settings ──────────────────────────────────\nHISTSIZE=10000\nSAVEHIST=10000\nHISTFILE=~/.zsh_history\nsetopt SHARE_HISTORY        # share history across sessions\nsetopt HIST_IGNORE_ALL_DUPS # remove duplicate entries\n\n# ── Aliases ───────────────────────────────────────────\nalias ll="ls -alF"\nalias la="ls -A"\nalias gs="git status"\nalias gp="git push"\nalias gco="git checkout"\nalias dc="docker compose"\n\n# ── PATH ──────────────────────────────────────────────\nexport PATH="$HOME/.local/bin:$PATH"\nexport PATH="/opt/homebrew/bin:$PATH"\n\n# ── NVM (Node Version Manager) ────────────────────────\nexport NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"\n',
        ".bash_profile":
          '# ~/.bash_profile - executed for login shells\n\n# Source .bashrc if it exists (keeps settings consistent)\nif [ -f ~/.bashrc ]; then\n    source ~/.bashrc\nfi\n\n# ── Login-specific settings ───────────────────────────\necho "Welcome back, $USER!"\n',
      },
      goals: [
        {
          id: "view-config",
          description: "View the contents of .bashrc or .zshrc using cat",
          type: "custom",
          validate: (ctx) =>
            ctx.history.some(
              (cmd) =>
                (cmd.includes("cat") && cmd.includes(".bashrc")) ||
                (cmd.includes("cat") && cmd.includes(".zshrc"))
            ),
          hint: "Type: cat .bashrc or cat .zshrc to see the config file contents.",
        },
      ],
    },

    // ── Lesson 2: Persistent Aliases & PATH ────────────────────────
    {
      slug: "persistent-config",
      title: "Persistent Aliases & PATH",
      description:
        "Learn how to make aliases and PATH changes permanent by adding them to config files.",
      content: [
        {
          type: "text",
          content:
            "In earlier lessons, you learned to create aliases with `alias name='command'` and modify your PATH with `export PATH=\"/new/path:$PATH\"`. But those changes vanish the moment you close the terminal. To make them permanent, you need to add them to your shell config file.",
        },
        {
          type: "text",
          content:
            "The process is straightforward: open your config file (`~/.bashrc` for Bash or `~/.zshrc` for Zsh) in a text editor, add your alias or export line, save the file, and then either restart your terminal or run `source ~/.bashrc` (or `source ~/.zshrc`) to reload it.",
        },
        {
          type: "code",
          content:
            '# Step 1: Open the file in your editor\nnano ~/.bashrc        # or: code ~/.bashrc, vim ~/.bashrc\n\n# Step 2: Add your aliases and PATH entries\nalias projects="cd ~/projects"\nalias serve="python3 -m http.server"\nexport PATH="$HOME/.npm-global/bin:$PATH"\n\n# Step 3: Save and reload\nsource ~/.bashrc',
          language: "bash",
        },
        {
          type: "tip",
          content:
            "Keep your config file organized. Group aliases together, PATH entries together, and add comments explaining what each section does. Future-you will thank present-you.",
        },
        {
          type: "text",
          content:
            "A common best practice is to separate your customizations into their own file and source it from your main config. For example, you might create `~/.bash_aliases` for all your aliases and add `source ~/.bash_aliases` to your `.bashrc`. This keeps things clean and modular.",
        },
        {
          type: "code",
          content:
            '# In ~/.bashrc — source a separate aliases file\nif [ -f ~/.bash_aliases ]; then\n    source ~/.bash_aliases\nfi',
          language: "bash",
        },
        {
          type: "text",
          content:
            "When adding to **PATH**, order matters. Directories listed first take priority. If you have a custom version of a tool in `~/.local/bin`, putting it at the front of PATH ensures your version runs instead of the system default.",
        },
        {
          type: "code",
          content:
            '# Your custom tools take priority over system defaults\nexport PATH="$HOME/.local/bin:$PATH"\n\n# Append instead (system tools take priority)\nexport PATH="$PATH:/opt/new-tool/bin"',
          language: "bash",
        },
        {
          type: "warning",
          content:
            "Be careful not to overwrite PATH entirely. Always include `$PATH` in your export so you don't lose access to essential system commands. Writing `export PATH=\"/my/dir\"` without `$PATH` would make most commands stop working.",
        },
        {
          type: "text",
          content:
            "In our simulated terminal, we can't edit files with a text editor, but we can examine a `.bashrc` to see how these entries look in practice. Use `cat` to view the config file below.",
        },
        {
          type: "code",
          content: "cat .bashrc",
          language: "bash",
        },
      ],
      fsSeed: {
        ".bashrc":
          '# ~/.bashrc\n\n# ── Aliases ───────────────────────────────────────────\nalias ll="ls -alF"\nalias la="ls -A"\nalias gs="git status"\nalias gp="git push"\nalias projects="cd ~/projects"\nalias serve="python3 -m http.server 8000"\nalias weather="curl wttr.in"\n\n# ── PATH additions ───────────────────────────────────\nexport PATH="$HOME/.local/bin:$PATH"\nexport PATH="$HOME/.npm-global/bin:$PATH"\nexport PATH="/opt/homebrew/bin:$PATH"\n\n# ── Source separate files ─────────────────────────────\nif [ -f ~/.bash_aliases ]; then\n    source ~/.bash_aliases\nfi\n',
        ".bash_aliases":
          '# ~/.bash_aliases — custom aliases sourced from .bashrc\n\n# Navigation shortcuts\nalias ..="cd .."\nalias ...="cd ../.."\nalias ....="cd ../../.."\n\n# Safety nets\nalias rm="rm -i"    # confirm before deleting\nalias cp="cp -i"    # confirm before overwriting\nalias mv="mv -i"    # confirm before overwriting\n\n# Development\nalias dev="npm run dev"\nalias build="npm run build"\nalias test="npm test"\n',
      },
      goals: [
        {
          id: "view-bashrc",
          description: "View the .bashrc file with cat",
          type: "history_contains",
          value: "cat",
          hint: "Type: cat .bashrc to see how persistent aliases and PATH entries are configured.",
        },
      ],
    },

    // ── Lesson 3: Prompt Customization ─────────────────────────────
    {
      slug: "prompt-customization",
      title: "Prompt Customization",
      description:
        "Learn how the PS1 variable controls your prompt, and discover tools like oh-my-zsh and Starship.",
      content: [
        {
          type: "text",
          content:
            "Your terminal prompt — the text that appears before every command — is controlled by a variable called **PS1** (Prompt String 1). By changing PS1, you can display exactly the information you want: your username, current directory, git branch, time, or even colors and icons.",
        },
        {
          type: "text",
          content:
            "In Bash, PS1 uses special escape sequences that start with a backslash. Here are the most common ones:",
        },
        {
          type: "code",
          content:
            "\\u    → username          (e.g., braydon)\n\\h    → hostname          (e.g., macbook)\n\\w    → current directory  (e.g., ~/projects)\n\\W    → basename only      (e.g., projects)\n\\d    → date              (e.g., Mon Jan 15)\n\\t    → time (24h)        (e.g., 14:30:00)\n\\$    → $ for user, # for root",
          language: "bash",
        },
        {
          type: "text",
          content: "Here are some example PS1 values and the prompts they produce:",
        },
        {
          type: "code",
          content:
            '# Simple: just shows directory and $\nPS1="\\w \\$ "\n# Result: ~/projects $\n\n# Classic: user@host with directory\nPS1="\\u@\\h:\\w\\$ "\n# Result: braydon@macbook:~/projects$\n\n# Minimal: just an arrow\nPS1="→ "\n# Result: →\n\n# With timestamp\nPS1="[\\t] \\w \\$ "\n# Result: [14:30:00] ~/projects $',
          language: "bash",
        },
        {
          type: "text",
          content:
            "You can also add **colors** to your prompt using ANSI escape codes. The syntax is verbose but the results are worth it. Colors are wrapped in `\\[` and `\\]` to tell Bash they're non-printing characters (so line wrapping works correctly).",
        },
        {
          type: "code",
          content:
            '# Green username, blue directory, reset color at end\nPS1="\\[\\033[32m\\]\\u\\[\\033[0m\\]:\\[\\033[34m\\]\\w\\[\\033[0m\\]\\$ "\n# Result: braydon:~/projects$ (with green user and blue path)',
          language: "bash",
        },
        {
          type: "tip",
          content:
            "You don't need to memorize color codes. Most developers use a prompt framework that handles this for you. But understanding that PS1 is just a variable helps you troubleshoot when things look wrong.",
        },
        {
          type: "text",
          content:
            "**Oh My Zsh** is the most popular Zsh framework. It provides over 150 themes, hundreds of plugins, and sensible defaults. Installation is a single command, and switching themes is as easy as changing one line in your `.zshrc`.",
        },
        {
          type: "code",
          content:
            '# Install Oh My Zsh\nsh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"\n\n# Change theme in ~/.zshrc\nZSH_THEME="agnoster"     # popular powerline-style theme\nZSH_THEME="robbyrussell" # the default, clean and minimal\nZSH_THEME="spaceship"    # feature-rich with git, node, docker info',
          language: "bash",
        },
        {
          type: "text",
          content:
            "**Starship** is a newer, cross-shell prompt written in Rust. It works with Bash, Zsh, Fish, PowerShell, and more. It's fast, minimal by default, and highly configurable through a simple TOML file. It auto-detects your project context and shows relevant info (git branch, Node version, Python environment, etc.).",
        },
        {
          type: "code",
          content:
            '# Install Starship\ncurl -sS https://starship.rs/install.sh | sh\n\n# Add to end of ~/.bashrc or ~/.zshrc\neval "$(starship init bash)"   # for Bash\neval "$(starship init zsh)"    # for Zsh\n\n# Configure in ~/.config/starship.toml\n# https://starship.rs/config/',
          language: "bash",
        },
        {
          type: "text",
          content:
            "Try using `echo` to see what the current PS1 value looks like. You can also try setting PS1 to see how it changes the prompt (though the effect is simulated here).",
        },
        {
          type: "code",
          content: "echo $PS1",
          language: "bash",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "try-echo",
          description: "Use echo to explore prompt variables or values",
          type: "history_contains",
          value: "echo",
          hint: 'Try: echo $PS1 or echo "hello" to experiment with echo.',
        },
      ],
    },

    // ── Lesson 4: Recommended Tools ────────────────────────────────
    {
      slug: "recommended-tools",
      title: "Recommended Tools",
      description:
        "Discover modern terminal tools that supercharge your workflow: fzf, ripgrep, bat, eza, and zoxide.",
      informational: true,
      content: [
        {
          type: "text",
          content:
            "The classic Unix commands have served developers well for decades, but a wave of modern tools has emerged that are faster, more intuitive, and better-looking. These tools are drop-in replacements you can adopt one at a time. Here are five that are worth installing immediately.",
        },
        {
          type: "text",
          content:
            "**fzf — Fuzzy Finder**\n\nReplaces: manually typing file paths, Ctrl+R history search\n\n`fzf` is an interactive fuzzy finder that lets you search through any list — files, command history, git branches, processes — by typing a few characters. It matches fuzzily, so typing `srcidx` finds `src/index.js`. It hooks into Ctrl+R to give you a searchable, visual history browser instead of cycling through commands one at a time.",
        },
        {
          type: "code",
          content:
            "# Install\nbrew install fzf         # macOS\nsudo apt install fzf     # Ubuntu/Debian\n\n# Usage examples\nvim $(fzf)               # fuzzy-find a file and open it\ncd $(find . -type d | fzf)  # fuzzy-find a directory and cd into it\nexport FZF_CTRL_R_OPTS=\"--preview 'echo {}'\"  # enhanced history search",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**ripgrep (rg) — Search File Contents**\n\nReplaces: `grep -r`, `grep --include`\n\n`ripgrep` is a line-oriented search tool that recursively searches directories for a regex pattern. It's *significantly* faster than grep — often 5-10x — because it respects `.gitignore`, skips binary files, and uses parallelism. The output is color-highlighted with file names and line numbers by default.",
        },
        {
          type: "code",
          content:
            '# Install\nbrew install ripgrep     # macOS\nsudo apt install ripgrep # Ubuntu/Debian\n\n# Usage examples\nrg "TODO"                # search all files for "TODO"\nrg -i "error" --type js  # case-insensitive search in .js files only\nrg "function" -C 3       # show 3 lines of context around matches',
          language: "bash",
        },
        {
          type: "text",
          content:
            "**bat — A Better cat**\n\nReplaces: `cat`, `less`\n\n`bat` is a `cat` clone with syntax highlighting, line numbers, git integration, and automatic paging. When you `bat` a file, code is highlighted in color based on the language, modified lines are marked, and long files automatically page. It makes reading files in the terminal genuinely pleasant.",
        },
        {
          type: "code",
          content:
            "# Install\nbrew install bat          # macOS\nsudo apt install bat      # Ubuntu/Debian (may need: batcat)\n\n# Usage examples\nbat index.js             # syntax-highlighted file viewer\nbat --diff README.md     # show git changes\nbat -l json data.txt     # force JSON highlighting\n\n# Set as default man page viewer\nexport MANPAGER=\"sh -c 'col -bx | bat -l man -p'\"",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**eza — A Modern ls**\n\nReplaces: `ls`\n\n`eza` (the maintained successor to `exa`) is a modern replacement for `ls`. It adds color-coded file types, git status indicators, tree views, icons, and better human-readable sizes. The output is immediately more scannable than plain `ls`.",
        },
        {
          type: "code",
          content:
            "# Install\nbrew install eza          # macOS\nsudo apt install eza      # Ubuntu/Debian\n\n# Usage examples\neza -la                  # long listing, all files (like ls -la but prettier)\neza --tree --level=2     # tree view, 2 levels deep\neza --git --long         # show git status for each file\neza --icons              # show file-type icons (needs Nerd Font)\n\n# Recommended alias\nalias ls=\"eza --color=always --group-directories-first\"",
          language: "bash",
        },
        {
          type: "text",
          content:
            "**zoxide — Smarter cd**\n\nReplaces: `cd`\n\n`zoxide` learns which directories you visit most often and lets you jump to them by typing just a few characters. Instead of `cd ~/Development/personal/terminalvelocity`, you type `z terminal` and it takes you there. It builds a frequency database over time, getting smarter the more you use it.",
        },
        {
          type: "code",
          content:
            '# Install\nbrew install zoxide      # macOS\nsudo apt install zoxide  # Ubuntu/Debian\n\n# Add to ~/.bashrc or ~/.zshrc\neval "$(zoxide init bash)"   # for Bash\neval "$(zoxide init zsh)"    # for Zsh\n\n# Usage examples\nz projects               # jump to most-visited directory matching "projects"\nz web src                # jump to directory matching both "web" and "src"\nzi                       # interactive selection with fzf integration',
          language: "bash",
        },
        {
          type: "tip",
          content:
            "You don't need to install all of these at once. Start with one — fzf or ripgrep tend to have the most immediate impact — and add others as you get comfortable. Each one is a small upgrade that compounds over time.",
        },
        {
          type: "text",
          content:
            "These tools share a philosophy: respect the conventions of the classic commands, but make the defaults smarter and the output more useful. They're all open-source, actively maintained, and widely adopted by professional developers.",
        },
      ],
      fsSeed: {},
      goals: [
        {
          id: "informational-complete",
          description: "Lesson complete — no terminal practice needed",
          type: "custom",
          validate: () => true,
        },
      ],
    },
  ],
};

export default customizingTerminalModule;
