# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terminal Velocity is a free, interactive web course that teaches terminal fundamentals through hands-on practice in a simulated browser-based terminal. Users learn by doing — each lesson presents instructional content alongside a working terminal where they complete goals like navigating directories, creating files, piping commands, and more. There is no backend; everything runs client-side.

The course contains **50 lessons across 9 modules**, progressing from absolute beginner to confident terminal user:

1. **Terminal Foundations** (5 lessons) — What a terminal is, command anatomy, first commands (`echo`, `pwd`, `whoami`, `clear`), getting help, understanding the prompt
2. **Navigating the Filesystem** (7 lessons) — Filesystem tree, `pwd`, `ls` (including hidden files), absolute vs relative paths, `cd` with shortcuts, tab completion, `find`
3. **Working with Files & Directories** (7 lessons) — `touch`, `mkdir -p`, `cat`/`head`/`tail`, `less`, `cp`/`cp -r`, `mv` (move + rename), `rm`/`rmdir`
4. **Keyboard Shortcuts** (10 lessons) — Cursor movement, Ctrl+A/E, Alt+F/B, Ctrl+W/U/K, command history, Ctrl+R reverse search, bang shortcuts, signals (Ctrl+C/D/Z/L), combining shortcuts, speed challenge
5. **Piping & Redirection** (6 lessons) — stdin/stdout/stderr, `>` and `>>` redirection, the `|` pipe operator, common pipe chains, `grep`/`wc`/`sort`/`uniq`, multi-stage pipelines
6. **Environment & Variables** (3 lessons) — `$HOME`/`$USER`/`$PATH`, `export`, the PATH variable and `which`
7. **Power User Techniques** (5 lessons) — Wildcards/globbing, brace expansion, command substitution `$()`, chaining with `&&`/`||`/`;`, aliases
8. **Customizing Your Terminal** (4 lessons) — `.bashrc`/`.zshrc` config files, persistent aliases and PATH, PS1 prompt customization (Oh My Zsh, Starship), recommended modern tools (fzf, ripgrep, bat, eza, zoxide)
9. **Putting It All Together** (3 lessons) — Real-world debugging workflow, final confidence check challenge, comprehensive cheat sheet

Some lessons are **informational** (read-only, no terminal) while most are **interactive** with a simulated terminal and validation goals.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (design tokens in `src/app/globals.css` via `@theme inline`)
- **State:** Zustand with `immer` and `persist` middleware
- **Language:** TypeScript (strict mode)
- **Key deps:** `shell-quote` (tokenization), `canvas-confetti` (celebration), `raw-loader` (Turbopack .md imports)

## Common Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npx tsc --noEmit` — Type-check without emitting
- `npm run lint` — Run ESLint

## Architecture

### Pages (App Router)

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/learn` | Module/lesson index |
| `/learn/[moduleSlug]/[lessonSlug]` | Individual lesson page (dynamic) |
| `/sandbox` | Free-form terminal playground (persisted state) |
| `/cheat-sheet` | Command reference card |

### Terminal Simulator

The terminal runs entirely in the browser with no server component.

- **VirtualFileSystem** (`src/lib/terminal/filesystem/virtual-fs.ts`) — In-memory Map-based filesystem seeded per lesson
- **Command Pipeline:** Tokenizer (shell-quote) → Parser (AST) → Executor
- **Commands** (`src/lib/terminal/commands/`) — One file per command, self-registering via `registerCommand()`. Implemented commands: `cd`, `ls`, `pwd`, `mkdir`, `touch`, `cat`, `echo`, `clear`, `head`, `tail`, `grep`, `wc`, `sort`, `uniq`, `find`, `which`, `whoami`, `history`, `rm`, `cp`, `mv`, `rmdir`, `less`, `man`, `export`, `alias`
- **Keyboard Shortcuts** (`src/lib/terminal/keyboard/shortcuts.ts`) — O(1) lookup table

### State Management (Zustand)

- **Progress Store** (`src/lib/progress/store.ts`) — Global singleton, persisted to `localStorage` as `tv-progress:v1`. Tracks completed lessons/goals across sessions.
- **Terminal Store** (`src/lib/terminal/state/create-terminal-store.ts`) — Per-instance factory, uses immer middleware. Manages terminal state (input, output lines, history, cwd).
- **Sandbox Store** (`src/lib/sandbox/store.ts`) — Global singleton, persisted as `tv-sandbox:v1`. Preserves sandbox filesystem and history between visits.

### Component Architecture

- Terminal components use compound pattern: `TerminalProvider` → `TerminalFrame` → `Output`/`InputLine`/etc.
- Two terminal variants: `LessonTerminal` (with validation) and `SandboxTerminal` (with persistence)
- Typed selector hooks (`useOutputLines`, `useInputValue`, etc.) prevent re-render storms

### Lesson System

Each module is a directory under `src/lib/lessons/modules/` containing:
- `index.ts` — TypeScript module config with `slug`, `title`, `description`, `fsSeed`, `goals`, and a `content` field produced by `parseLessonMarkdown()`
- `content/*.md` — One markdown file per lesson containing the instructional prose

The curriculum is assembled in `src/lib/lessons/curriculum.ts` which imports all 9 modules in order and exports helper functions (`getLesson`, `getNextLesson`, `getPrevLesson`, `getAllLessons`, etc.).

#### Lesson Content Format

Lesson prose lives in `.md` files under each module's `content/` directory. The markdown parser (`src/lib/lessons/parser/parse-lesson-markdown.ts`) converts these into `ContentSection[]` arrays using a line-by-line state machine.

Supported block types:

| Markdown | ContentSection type |
|----------|-------------------|
| Plain paragraphs (separated by blank lines) | `text` |
| Fenced code blocks (` ```bash `) | `code` (with `language` field) |
| `> [!TIP]` blockquotes | `tip` |
| `> [!WARNING]` blockquotes | `warning` |
| `> [!WINDOWS]` blockquotes | `windows-callout` |

Inline markdown (`**bold**`, `*italic*`, `` `code` ``, `[links]()`) passes through unchanged and is handled by `formatInlineMarkdown()` in the renderer.

Example markdown file:

```markdown
This is a paragraph of lesson text with **bold** and `inline code`.

```bash
ls -la /home
```

> [!TIP]
> Helpful hint text here.

> [!WARNING]
> Danger zone text here.

> [!WINDOWS]
> Windows equivalent info here.
```

#### Goal Validation

Each lesson defines `Goal[]` for interactive validation. Goal types include:
- `fs_exists` / `fs_is_directory` — Check filesystem state
- `cwd_equals` — Check current working directory
- `history_contains` — Check if a command was run
- `command_output_contains` — Check last command output
- `custom` — Arbitrary validation function with access to `ValidationContext` (fs, cwd, history, lastOutput, lastError, lastCommand)

The validation engine lives in `src/lib/terminal/validation/engine.ts`.

### Raw Markdown Imports

`.md` files are imported as raw strings via:
- **Webpack** (production build): `asset/source` rule in `next.config.ts`
- **Turbopack** (dev server): `raw-loader` rule in `next.config.ts`
- **TypeScript**: `src/types/markdown.d.ts` declares `*.md` modules as `string`

## Design Tokens

Colors: bg-0 (#0a0a0a), bg-1 (#111111), bg-2 (#1a1a1a), bg-3 (#262626), fg (#e0e0e0), fg-muted (#888888), accent (#3b82f6), success (#22c55e), error (#ef4444), warning (#f59e0b)

## Installed Agent Skills

The `.agents/skills/` directory contains Claude Code skills that should be referenced when writing code:

- **vercel-react-best-practices** — React/Next.js performance patterns
- **vercel-composition-patterns** — React composition patterns
- **web-design-guidelines** — Web UI design and accessibility review guidelines
