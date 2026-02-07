# Terminal Velocity — Product Requirements Document

## Context

Developers are increasingly using terminal-based AI coding agents (Claude Code, Codex, etc.), but many lack confidence navigating the terminal beyond basic commands. They're stuck in an awkward middle ground — capable enough to run agents, but not fluent enough to feel in control. Terminal Velocity is a free, interactive web course that teaches terminal fundamentals through hands-on practice in a simulated terminal, targeting new-to-intermediate developers who want to become confident terminal users.

---

## 1. Product Vision

A single-page web application with two experiences:
1. **Landing page** — Long-scrolling marketing page (inspired by Total TypeScript, Epic React) that frames the problem, builds urgency, and funnels visitors into the course
2. **Course** — A sequence of 30-50 micro-lessons (1-3 min each), each with text instruction and an interactive terminal simulator where users practice what they learned

No video. No accounts. No paywalls. All text + interactive terminal.

---

## 2. Target Audience

- **Primary:** Developers who use the terminal occasionally but lack fluency — they can `cd` and `ls` but don't know Ctrl+R, piping, or cursor navigation shortcuts
- **Secondary:** Complete beginners encountering the terminal for the first time through AI coding tools
- **Out of scope:** Power users, sysadmins, DevOps engineers looking for advanced shell scripting

---

## 3. Curriculum

### Module 1: Terminal Foundations (5-6 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| What is a Terminal? | Terminal vs shell vs CLI, why it matters in the AI age | Type `echo "hello terminal"` |
| Opening Your Terminal | How to open terminal on Mac (Terminal.app, iTerm2); Windows callout (WSL, Git Bash, Windows Terminal) | N/A (informational, mark complete after reading) |
| Anatomy of a Command | Command, flags, arguments structure; `command -flag argument` pattern | Parse and run `ls -la /home` |
| Your First Commands | `pwd`, `whoami`, `echo`, `clear` | Run each command, observe output |
| Getting Help | `man`, `--help`, `command --help` pattern; how to read man pages | Use `man ls` or `ls --help` |
| Understanding the Prompt | What the prompt tells you (user, host, directory); `$` vs `#` | Identify current directory from prompt, then verify with `pwd` |

### Module 2: Navigating the Filesystem (6-7 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| The Filesystem Tree | Root `/`, home `~`, how directories are structured | Visualize with `ls /` |
| Where Am I? | `pwd` deep dive | Navigate and confirm location |
| Looking Around | `ls`, `ls -l`, `ls -a`, `ls -la`, `ls -lh` (human-readable sizes) | List hidden files in home directory |
| Absolute vs Relative Paths | `/home/user/projects` vs `projects` vs `./projects` | Navigate using both path types |
| Moving Around | `cd`, `cd ..`, `cd ~`, `cd /`, `cd -` (go back to previous directory) | Navigate a multi-level directory tree |
| Tab Completion | Tab to auto-complete paths and commands; double-tab to show options | Navigate using only tab completion |
| Finding Files | `find` with `-name`, `-type`; `which` for locating commands | Find a hidden file in a nested directory |

### Module 3: Working with Files & Directories (6-7 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Creating Files | `touch` to create empty files | Create specific files |
| Creating Directories | `mkdir`, `mkdir -p` for nested directories | Create a nested directory structure in one command |
| Viewing File Contents | `cat`, `head`, `tail`, `head -n 5`, `tail -n 5` | View the first 5 lines of a file |
| Reading Long Files | `less` (scroll, search with `/`, quit with `q`) | Find a specific line in a long file using `less` |
| Copying Files & Dirs | `cp`, `cp -r` for directories | Copy a file to a new location |
| Moving & Renaming | `mv` for both moving and renaming | Rename a file, then move it to another directory |
| Deleting Safely | `rm`, `rm -r`, `rmdir`; the danger of `rm -rf` | Delete specific files and an empty directory |

### Module 4: Terminal Navigation & Keyboard Shortcuts (8-10 lessons) — PRIMARY EMPHASIS
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Cursor Movement Basics | Left/Right arrows, Home/End keys | Position cursor at specific points in a long command |
| Jump to Start & End | Ctrl+A (start of line), Ctrl+E (end of line) | Edit the beginning of a command without arrow-keying |
| Move by Word | Alt+F (forward one word), Alt+B (back one word) | Navigate a multi-word command quickly |
| Deleting Text Efficiently | Ctrl+W (delete word back), Ctrl+U (clear to start), Ctrl+K (clear to end) | Fix a typo mid-command using word deletion |
| Command History | Up/Down arrows to browse history, `history` command | Retrieve and re-run a previous command |
| Reverse History Search | Ctrl+R to search history, type to filter, Enter to execute | Find and re-run a specific past command |
| History Shortcuts | `!!` (repeat last command), `!$` (last argument), `!n` (nth command) | Use `!!` with sudo, use `!$` to reference last path |
| Signals & Control | Ctrl+C (cancel), Ctrl+D (exit/EOF), Ctrl+Z (suspend), Ctrl+L (clear screen) | Cancel a running process, clear the screen |
| Combining Shortcuts | Real-world editing workflow: jump, delete, retype | Edit a complex command using only keyboard shortcuts (no arrow key spam) |
| Speed Challenge | Timed exercise combining all navigation shortcuts | Complete a series of editing tasks as fast as possible |

### Module 5: Piping & Redirection (5-6 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Standard Streams | stdin, stdout, stderr concept | Observe different output types |
| Output Redirection | `>` (overwrite), `>>` (append) | Redirect command output to a file |
| The Pipe Operator | `\|` — chaining command output as input to another command | Pipe `ls` into `grep` to filter results |
| Useful Pipe Chains | `cat file \| grep pattern`, `ls \| wc -l`, `sort \| uniq` | Count files in a directory using pipes |
| Text Processing Commands | `grep` (search), `wc` (count), `sort`, `uniq` | Extract and count unique entries from a file |
| Building Pipelines | Combining 3+ commands in a pipeline | Build a multi-stage pipeline to transform data |

### Module 6: Environment & Variables (3-4 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Environment Variables | `echo $PATH`, `echo $HOME`, `echo $USER`; what they are | Print and examine `$PATH` |
| Setting Variables | `export VAR=value`, difference between shell and env variables | Set and use a custom variable |
| The PATH Variable | What PATH does, why commands work, how to check if something is in PATH | Use `which` and `echo $PATH` to understand command resolution |

### Module 7: Power User Techniques (4-5 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Wildcards & Globbing | `*` (any chars), `?` (single char), `[]` (character class) | List all `.txt` files using `*.txt` |
| Brace Expansion | `{a,b,c}`, `file{1..5}.txt` | Create 5 numbered files in one command |
| Command Substitution | `$(command)` — using command output as an argument | Use `$(date)` in an echo, create a timestamped file |
| Chaining Commands | `&&` (and), `\|\|` (or), `;` (sequence) | Chain mkdir and cd together |
| Aliases | What aliases are, creating temporary aliases with `alias` | Create an alias for a long command |

### Module 8: Customizing Your Terminal (3-4 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Shell Config Files | `.bashrc`, `.zshrc`, `.bash_profile` — what they are and when they load | View contents of a simulated `.zshrc` |
| Persistent Aliases & PATH | Adding aliases and PATH entries to config files | Add an alias to `.zshrc` |
| Prompt Customization | PS1 variable, oh-my-zsh, Starship prompt; making it yours | Modify PS1 to show a custom prompt |
| Recommended Tools | Overview of modern terminal tools: `fzf`, `ripgrep`, `bat`, `eza`, `zoxide` | Informational lesson — mark complete after reading |

### Module 9: Putting It All Together (2-3 lessons)
| Lesson | What Users Learn | Practice Task |
|--------|-----------------|---------------|
| Real-World Workflow | Chain everything: navigate, find, read, pipe, redirect in a real scenario | Complete a multi-step task simulating a real dev workflow |
| Terminal Confidence Check | Final challenge combining skills from all modules | Series of progressively harder tasks |
| Your Cheat Sheet | Summary of everything learned + downloadable PDF reference | Download cheat sheet |

**Estimated total: ~42-50 micro-lessons**

---

## 4. Landing Page

### Structure (top to bottom)
1. **Hero** — Bold headline ("Master the Terminal. Command Your AI."), sub-headline tying terminal skills to AI agent workflows, prominent CTA button ("Start Learning — Free")
2. **Problem Statement** — "You can run commands... sort of." Speaks to the awkward in-between state. Reference the rise of CLI-based AI tools
3. **What You'll Learn** — Visual module overview (8 modules with icons), each with a one-line description
4. **Interactive Demo** — Embedded terminal simulator with a pre-canned mini-exercise visitors can try right on the landing page (e.g., "Try typing `ls` and pressing Enter")
5. **Course Features** — Grid of selling points: free, no video (learn by doing), works in your browser, covers Mac & Windows, 40+ interactive lessons, track your progress
6. **Curriculum Preview** — Expandable/collapsible module list showing lesson titles
7. **Email Capture** — Optional email signup ("Get notified about new lessons and terminal tips"), non-blocking — course is fully accessible without it
8. **Final CTA** — Repeat hero CTA ("Start Learning Now")
9. **Footer** — Minimal footer with credits, GitHub link (if open source)

### Design Direction
- Developer-polished aesthetic (Linear, Vercel, Raycast vibe)
- Dark mode default (terminal-native feel)
- Monospace accents for code/terminal references, clean sans-serif for body text
- Subtle animations on scroll (parallax on hero, fade-in sections)
- The embedded demo terminal is the visual centerpiece — it should feel premium and draw attention

---

## 5. Course UI/UX

### Layout
- **Left sidebar** — Module/lesson navigation. Shows all modules with expandable lesson lists. Completed lessons have a checkmark. Current lesson highlighted. Progress bar at top showing overall completion percentage
- **Main content area** — Two sections stacked vertically:
  1. **Lesson text** — Concise explanation (2-4 short paragraphs max) with code examples in styled `<code>` blocks. Windows callout boxes (blue-tinted) where commands differ
  2. **Interactive terminal** — The simulated terminal taking up ~50% of viewport height, with task checklist above/beside it showing objectives to complete

### Lesson Flow
1. User reads the lesson text
2. User completes tasks in the terminal (objectives shown as checklist)
3. Each completed objective gets a checkmark with optional feedback ("That works! The shortcut we were teaching is `Ctrl+A`")
4. When all objectives are complete → lesson marked as done, confetti or subtle celebration animation, "Next Lesson" button appears
5. User can re-read any lesson or redo its terminal exercises at any time

### Progress Tracking
- Stored in `localStorage` with versioned schema
- Progress bar in sidebar (e.g., "18/42 lessons completed")
- Streak counter (consecutive days with at least 1 lesson completed)
- Completion percentage per module
- Course completion state with celebration screen + cheat sheet download

### Playground
- Accessible from sidebar ("Sandbox" at the bottom)
- Full virtual filesystem with a default seed (realistic home directory structure)
- Persistent across sessions (filesystem state + history saved to localStorage)
- "Reset" button to start fresh

### Cheat Sheet
- Available as downloadable PDF at the end of the course (final lesson)
- Organized by category: Navigation, File Operations, Keyboard Shortcuts, Piping & Redirection, Power User
- Includes both Mac and Windows commands side by side

---

## 6. Interactive Terminal Simulator

### Build from Scratch (not xterm.js)
xterm.js is designed for real PTY connections and renders to canvas, fighting React's model and Tailwind styling. Since we have no real backend shell, a custom React-based terminal gives us full control over validation hooks, keyboard shortcuts, styling, and lesson integration.

### Virtual Filesystem
- In-memory `Map<string, FSNode>` keyed by absolute path
- `FSNode` types: `file` (with `content: string`), `directory` (with `children: string[]`), `symlink`
- `VirtualFileSystem` class: pure TypeScript, no React dependency, fully unit-testable
- `snapshot()` / `restore()` for lesson reset and sandbox persistence
- Each lesson provides a seed (JSON structure) defining the starting filesystem state

### Command Pipeline
Three-stage: **Tokenizer** (use `shell-quote` npm package) → **Parser** (builds AST with pipes, redirects) → **Executor** (resolves commands, chains pipes)

### Supported Commands
`cd`, `ls`, `pwd`, `mkdir`, `touch`, `cat`, `head`, `tail`, `less`, `cp`, `mv`, `rm`, `rmdir`, `echo`, `grep`, `wc`, `sort`, `uniq`, `find`, `which`, `whoami`, `history`, `clear`, `man`/`--help`, `export`, `alias`

Each command is a standalone handler function in its own file, registered in a central command registry. Windows equivalents stored alongside for callout display.

### Keyboard Shortcuts (intercepted via `keydown` with `{ capture: true }`)
| Shortcut | Action |
|----------|--------|
| Ctrl+A | Move cursor to start of line |
| Ctrl+E | Move cursor to end of line |
| Alt+F | Move cursor forward one word |
| Alt+B | Move cursor backward one word |
| Ctrl+W | Delete word before cursor |
| Ctrl+U | Clear line before cursor |
| Ctrl+K | Clear line after cursor |
| Ctrl+R | Reverse history search |
| Ctrl+C | Cancel/interrupt current command |
| Ctrl+L | Clear terminal output |
| Ctrl+D | EOF / exit |
| Ctrl+Z | Suspend (visual feedback, no real process) |
| Tab | Auto-complete (paths or command names) |
| Up/Down | Browse command history |

### Tab Completion
- First token: completes from command registry
- Subsequent tokens: completes from filesystem paths relative to cwd
- Single match: auto-completes inline (appends `/` for directories)
- Multiple matches: displays all options, second Tab cycles
- No match: visual flash/bell

### Lesson Validation
- **Goal-based**, not command-matching — checks filesystem state, cwd, output, or history after each command
- Validation types: `fs_exists`, `fs_is_directory`, `cwd_equals`, `fs_content_contains`, `history_contains`, `command_output_contains`, `custom`
- When user achieves goal via different method than intended: marks complete + shows feedback about the intended technique
- Hints shown after multiple failed attempts

### Windows Callouts
After each command, the executor checks a `WINDOWS_EQUIVALENTS` map. If a mapping exists, a blue-tinted callout appears below the output: "Windows: `dir` (or `Get-ChildItem` in PowerShell)"

---

## 7. Technical Architecture

### Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **State:** React `useReducer` + Context (no external state library)
- **Persistence:** `localStorage` with versioned schema
- **Dependencies:** `shell-quote` (tokenization), minimal others

### Component Architecture
Compound components following Vercel composition patterns:

```
Terminal.Provider    — State management (useReducer + context)
Terminal.Frame       — Outer container (border, bg, rounded corners)
Terminal.Toolbar     — Title bar with traffic light dots
Terminal.Output      — Scrollable output region (role="log")
Terminal.InputLine   — Prompt + hidden <input> element
Terminal.Suggestions — Tab completion dropdown
Terminal.ReverseSearch — Ctrl+R search UI
Terminal.WindowsCallout — Windows equivalent callout
```

Two explicit variants:
- `LessonTerminal` — Wraps base provider with validation logic + task checklist
- `SandboxTerminal` — Wraps base provider with localStorage persistence + reset button

### Key File Structure
```
src/
  app/
    page.tsx                           # Landing page
    learn/
      layout.tsx                       # Course layout (sidebar + main)
      page.tsx                         # Course overview / first lesson redirect
      [moduleSlug]/
        [lessonSlug]/
          page.tsx                     # Individual lesson page
    sandbox/
      page.tsx                         # Playground page
  lib/
    terminal/
      filesystem/
        virtual-fs.ts                  # VirtualFileSystem class
        types.ts                       # FSNode types
        seeds/                         # Per-lesson filesystem seeds
      parser/
        tokenizer.ts                   # shell-quote wrapper
        parser.ts                      # AST builder
      commands/
        registry.ts                    # Command registry + Windows equivalents
        *.ts                           # One file per command (ls.ts, cd.ts, etc.)
      executor/
        executor.ts                    # Pipeline execution
      completion/
        tab-completion.ts
      keyboard/
        shortcuts.ts                   # Shortcut definitions table
      validation/
        types.ts                       # Validation check types
        engine.ts                      # Validation engine
      history.ts                       # CommandHistory class
      state/
        reducer.ts                     # Terminal state reducer
    lessons/
      curriculum.ts                    # Module/lesson metadata, ordering
      types.ts                         # Lesson, Module types
    progress/
      store.ts                         # localStorage progress read/write
      types.ts                         # ProgressState type
  components/
    terminal/
      providers/
        terminal-provider.tsx          # Base terminal provider
        lesson-terminal-provider.tsx   # Adds validation
        sandbox-terminal-provider.tsx  # Adds persistence
      variants/
        lesson-terminal.tsx            # Lesson variant composition
        sandbox-terminal.tsx           # Sandbox variant composition
      terminal-frame.tsx
      terminal-toolbar.tsx
      terminal-output.tsx
      terminal-input-line.tsx
      terminal-suggestions.tsx
      terminal-reverse-search.tsx
      terminal-windows-callout.tsx
      validation-feedback.tsx
    course/
      sidebar.tsx                      # Module/lesson nav + progress
      lesson-content.tsx               # Markdown-like lesson text renderer
      progress-bar.tsx
    landing/
      hero.tsx
      problem-section.tsx
      features-grid.tsx
      curriculum-preview.tsx
      email-capture.tsx
      demo-terminal.tsx                # Landing page interactive demo
```

### Data Model (localStorage)

```typescript
// Progress state — versioned for migration
interface ProgressState {
  version: 1;
  completedLessons: string[];          // lesson slugs
  currentLesson: string | null;        // last active lesson slug
  streak: { currentCount: number; lastActiveDate: string };
  startedAt: string;                   // ISO date
}

// Sandbox state
interface SandboxState {
  version: 1;
  fs: FSSnapshot;                      // serialized virtual filesystem
  history: string[];                   // command history
}
```

---

## 8. Implementation Order

### Phase 1: Foundation
1. Initialize Next.js + Tailwind project
2. Implement `VirtualFileSystem` class with full test coverage
3. Implement command parser (tokenizer + AST)
4. Implement core commands: `cd`, `ls`, `pwd`, `mkdir`, `touch`, `cat`, `echo`, `clear`

### Phase 2: Terminal Simulator
5. Build terminal compound components (Frame, Toolbar, Output, InputLine)
6. Build TerminalProvider with useReducer
7. Implement keyboard shortcut system
8. Implement tab completion
9. Implement command history (up/down, Ctrl+R reverse search)
10. Build SandboxTerminal variant — verify the full loop works end-to-end

### Phase 3: Lesson System
11. Define lesson/module data model and curriculum metadata
12. Implement validation engine
13. Build LessonTerminal variant with validation feedback
14. Build course layout (sidebar, lesson content, progress bar)
15. Implement localStorage progress tracking
16. Create filesystem seeds for first module's lessons
17. Write lesson content for Module 1

### Phase 4: Remaining Commands & Content
18. Implement remaining commands: `grep`, `head`, `tail`, `less`, `wc`, `sort`, `uniq`, `find`, `which`, `whoami`, `history`, `rm`, `cp`, `mv`, `rmdir`, `man`, `export`, `alias`
19. Implement piping and redirection in the executor
20. Write all lesson content (Modules 2-9) with filesystem seeds and validations

### Phase 5: Landing Page
21. Build landing page sections (hero, problem, features, curriculum preview, email capture, demo terminal)
22. Polish animations and responsive design

### Phase 6: Polish
23. Light gamification (streak counter, completion percentage, celebration animations)
24. Downloadable cheat sheet (PDF generation or pre-built PDF)
25. Responsive design audit (mobile: terminal should still be usable, maybe full-width)
26. Accessibility audit (keyboard navigation, screen reader support, ARIA roles)

---

## 9. Verification

### Terminal Simulator
- Unit tests for `VirtualFileSystem` (create, read, delete, move, copy, path resolution, edge cases with `..` paths)
- Unit tests for each command handler (known input → expected output)
- Unit tests for parser (input string → correct AST)
- Unit tests for tab completion (partial input + filesystem state → correct suggestions)
- Unit tests for validation engine (filesystem state + rules → correct pass/fail)
- Integration test: render `LessonTerminal`, simulate keyboard input, verify output and validation

### Course Flow
- Manual walkthrough: complete every lesson start-to-finish
- Verify progress persists across page reloads (localStorage)
- Verify "pick up where you left off" works (returns to last active lesson)
- Verify sandbox persistence (filesystem state survives reload)
- Verify streak counter increments correctly

### Landing Page
- Visual review across viewport sizes (mobile, tablet, desktop)
- Verify email capture form submits (or logs, depending on backend decision)
- Verify embedded demo terminal works without navigating to course
- Lighthouse audit for performance and accessibility
