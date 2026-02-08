import type { ModuleConfig } from "@/lib/lessons/types";
import { parseLessonMarkdown } from "@/lib/lessons/parser/parse-lesson-markdown";

import configFilesMd from "./content/config-files.md";
import persistentConfigMd from "./content/persistent-config.md";
import promptCustomizationMd from "./content/prompt-customization.md";
import recommendedToolsMd from "./content/recommended-tools.md";

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
      content: parseLessonMarkdown(configFilesMd),
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
      content: parseLessonMarkdown(persistentConfigMd),
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
      content: parseLessonMarkdown(promptCustomizationMd),
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
      content: parseLessonMarkdown(recommendedToolsMd),
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
