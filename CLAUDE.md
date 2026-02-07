# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terminal Velocity is a free, interactive web course that teaches terminal fundamentals through hands-on practice in a simulated terminal. It consists of a landing page and a 50-lesson course across 9 modules.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (design tokens in `src/app/globals.css` via `@theme inline`)
- **State:** Zustand with `immer` and `persist` middleware
- **Language:** TypeScript (strict mode)
- **Key deps:** `shell-quote` (tokenization), `canvas-confetti` (celebration)

## Common Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npx tsc --noEmit` — Type-check without emitting
- `npm run lint` — Run ESLint

## Architecture

### Terminal Simulator
- **VirtualFileSystem** (`src/lib/terminal/filesystem/virtual-fs.ts`) — In-memory Map-based filesystem
- **Command Pipeline:** Tokenizer (shell-quote) → Parser (AST) → Executor
- **Commands** (`src/lib/terminal/commands/`) — One file per command, self-registering via `registerCommand()`
- **Keyboard Shortcuts** (`src/lib/terminal/keyboard/shortcuts.ts`) — O(1) lookup table

### State Management (Zustand)
- **Progress Store** (`src/lib/progress/store.ts`) — Global singleton, persisted to `localStorage` as `tv-progress:v1`
- **Terminal Store** (`src/lib/terminal/state/create-terminal-store.ts`) — Per-instance factory, uses immer middleware
- **Sandbox Store** (`src/lib/sandbox/store.ts`) — Global singleton, persisted as `tv-sandbox:v1`

### Component Architecture
- Terminal components use compound pattern: `TerminalProvider` → `TerminalFrame` → `Output`/`InputLine`/etc.
- Two terminal variants: `LessonTerminal` (with validation) and `SandboxTerminal` (with persistence)
- Typed selector hooks (`useOutputLines`, `useInputValue`, etc.) prevent re-render storms

### Lesson System
- Lessons defined as TypeScript objects in `src/lib/lessons/modules/`
- Each lesson has `ContentSection[]` for text, `FSSeed` for filesystem, `Goal[]` for validation
- Validation engine in `src/lib/terminal/validation/engine.ts`

## Design Tokens

Colors: bg-0 (#0a0a0a), bg-1 (#111111), bg-2 (#1a1a1a), bg-3 (#262626), fg (#e0e0e0), fg-muted (#888888), accent (#3b82f6), success (#22c55e), error (#ef4444), warning (#f59e0b)

## Installed Agent Skills

The `.agents/skills/` directory contains Claude Code skills that should be referenced when writing code:

- **vercel-react-best-practices** — React/Next.js performance patterns
- **vercel-composition-patterns** — React composition patterns
- **web-design-guidelines** — Web UI design and accessibility review guidelines
