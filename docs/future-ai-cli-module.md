# Future Content: AI + CLI Module

Parking lot for ideas on how to add AI-related content to Terminal Velocity later. The core course teaches terminal fundamentals — this would be an optional capstone module for learners who want to connect those skills to AI tooling.

## Why it could work

The course already teaches everything someone needs to be effective in a terminal: navigation, file manipulation, piping, environment variables, shell config. AI CLI tools (Claude Code, Codex CLI, aider, etc.) assume all of those skills. A short module at the end could bridge the gap: "you now know the terminal — here's how that unlocks AI tools."

## Potential lessons

### 1. How AI CLI Tools Work
- They spawn shell commands on your behalf
- They read/write files, run tests, execute builds — all through the same commands you just learned
- Understanding what they're doing (and when to intervene) requires terminal literacy

### 2. Reading AI-Generated Commands
- AI tools often chain commands with `&&`, use pipes, redirect output
- Practice: given a multi-step command an AI generated, break it down and explain each part
- Goal validation: identify what each segment does before running it

### 3. Your Terminal as an AI Workspace
- How to set up your shell environment for AI tools (PATH, env vars, API keys via `export`)
- Using `alias` to create shortcuts for common AI CLI invocations
- Shell history as a log of what AI tools executed

### 4. Debugging AI Tool Failures
- When an AI tool says "command not found" — you know how to check `$PATH` and `which`
- When it writes to the wrong directory — you know how to `find`, `ls`, and `cd` to investigate
- When a pipeline fails — you know how to break it apart and test each stage

## Open questions

- Should this be a full module (Module 10) or a bonus/appendix section?
- Does naming specific tools (Claude Code, Codex) date the content quickly?
- Should lessons be interactive (simulating AI tool output) or informational?
- Is there a way to do this without it feeling like an ad for specific products?

## Decision

Revisit once the core 9 modules are polished and shipped. The terminal-first framing is stronger without the AI angle muddying the pitch.
