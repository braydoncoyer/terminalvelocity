import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { VirtualFileSystem } from "../filesystem/virtual-fs";
import { execute } from "../executor/executor";
import { expandHistoryBangs } from "../history/command-history";
import { OutputLine } from "@/types/common";
import { TerminalStore } from "./types";

// Ensure commands are registered
import "../commands/index";

let lineId = 0;
function nextLineId(): string {
  return `line-${++lineId}`;
}

export interface TerminalStoreOptions {
  fs: VirtualFileSystem;
  onCommand?: (raw: string, output: string, error: string, history: string[]) => void;
  initialInput?: string;
  initialHistory?: string[];
  initialCommands?: string[];
}

export function createTerminalStore(options: TerminalStoreOptions) {
  const { fs, onCommand, initialInput, initialHistory, initialCommands } = options;

  // Pre-execute initial commands to build output lines and history
  const bootLines: OutputLine[] = [];
  const bootHistory: string[] = initialHistory ? [...initialHistory] : [];
  if (initialCommands) {
    for (const cmd of initialCommands) {
      const prompt = `user@terminal:${fs.getDisplayPath()}$ `;
      bootLines.push({ id: nextLineId(), type: "stdin", content: prompt + cmd });
      const result = execute(cmd, fs, {
        HOME: "/home/user",
        USER: "user",
        PATH: "/usr/local/bin:/usr/bin:/bin",
        SHELL: "/bin/bash",
        TERM: "xterm-256color",
      }, bootHistory);
      if (result.output && result.output !== "\x1Bclear" && result.output !== "\x1Bparty") {
        bootLines.push({ id: nextLineId(), type: "stdout", content: result.output });
      }
      if (result.error) {
        bootLines.push({ id: nextLineId(), type: "stderr", content: result.error });
      }
      if (bootHistory[bootHistory.length - 1] !== cmd) {
        bootHistory.push(cmd);
      }
    }
  }

  return createStore<TerminalStore>()(
    immer((set, get) => ({
      outputLines: bootLines,
      inputValue: initialInput ?? "",
      cursorPosition: initialInput?.length ?? 0,
      history: bootHistory,
      historyIndex: -1,
      suggestions: [],
      reverseSearchMode: false,
      reverseSearchQuery: "",
      reverseSearchResult: null,
      isRunning: false,
      cwd: fs.cwd,
      partyCount: 0,
      env: {
        HOME: "/home/user",
        USER: "user",
        PATH: "/usr/local/bin:/usr/bin:/bin",
        SHELL: "/bin/bash",
        TERM: "xterm-256color",
      },

      setInputValue: (value: string) => {
        set((state) => {
          state.inputValue = value;
          state.cursorPosition = value.length;
        });
      },

      setCursorPosition: (pos: number) => {
        set((state) => {
          state.cursorPosition = Math.max(
            0,
            Math.min(pos, state.inputValue.length)
          );
        });
      },

      pushOutput: (line: OutputLine) => {
        set((state) => {
          state.outputLines.push(line);
        });
      },

      clearOutput: () => {
        set((state) => {
          state.outputLines = [];
        });
      },

      executeCommand: (raw: string) => {
        const state = get();
        const trimmed = raw.trim();

        // Expand history bang shortcuts (!! !$ !n !cmd) before display
        const bangExpanded = expandHistoryBangs(trimmed, state.history);

        // Add input line to output (show expanded form)
        const prompt = `user@terminal:${fs.getDisplayPath()}$ `;
        set((s) => {
          s.outputLines.push({
            id: nextLineId(),
            type: "stdin",
            content: prompt + bangExpanded,
          });
          s.inputValue = "";
          s.cursorPosition = 0;
          s.historyIndex = -1;
          s.suggestions = [];
          s.reverseSearchMode = false;
          s.reverseSearchQuery = "";
          s.reverseSearchResult = null;
        });

        if (!bangExpanded) return;

        // Add expanded form to history (matches real bash behavior)
        set((s) => {
          if (s.history[s.history.length - 1] !== bangExpanded) {
            s.history.push(bangExpanded);
          }
        });

        // Handle alias expansion
        const expandedRaw = expandAliases(bangExpanded, state.env);

        // Execute the command
        const result = execute(expandedRaw, fs, state.env, state.history);

        // Check for clear command
        if (result.output === "\x1Bclear") {
          set((s) => {
            s.outputLines = [];
          });
        } else if (result.output === "\x1Bparty") {
          set((s) => {
            s.outputLines.push({
              id: nextLineId(),
              type: "stdout",
              content: "Party mode activated!",
            });
            s.partyCount += 1;
          });
        } else {
          set((s) => {
            if (result.output) {
              s.outputLines.push({
                id: nextLineId(),
                type: "stdout",
                content: result.output,
              });
            }
            if (result.error) {
              s.outputLines.push({
                id: nextLineId(),
                type: "stderr",
                content: result.error,
              });
            }
          });
        }

        // Update cwd in store
        set((s) => {
          s.cwd = fs.cwd;
        });

        // Call onCommand callback with full history
        if (onCommand) {
          const currentState = get();
          onCommand(trimmed, result.output, result.error, currentState.history);
        }
      },

      historyUp: () => {
        set((state) => {
          if (state.history.length === 0) return;
          const newIndex =
            state.historyIndex === -1
              ? state.history.length - 1
              : Math.max(0, state.historyIndex - 1);
          state.historyIndex = newIndex;
          state.inputValue = state.history[newIndex];
          state.cursorPosition = state.history[newIndex].length;
        });
      },

      historyDown: () => {
        set((state) => {
          if (state.historyIndex === -1) return;
          const newIndex = state.historyIndex + 1;
          if (newIndex >= state.history.length) {
            state.historyIndex = -1;
            state.inputValue = "";
            state.cursorPosition = 0;
          } else {
            state.historyIndex = newIndex;
            state.inputValue = state.history[newIndex];
            state.cursorPosition = state.history[newIndex].length;
          }
        });
      },

      setSuggestions: (suggestions: string[]) => {
        set((state) => {
          state.suggestions = suggestions;
        });
      },

      clearSuggestions: () => {
        set((state) => {
          state.suggestions = [];
        });
      },

      enterReverseSearch: () => {
        set((state) => {
          state.reverseSearchMode = true;
          state.reverseSearchQuery = "";
          state.reverseSearchResult = null;
        });
      },

      exitReverseSearch: () => {
        set((state) => {
          if (state.reverseSearchResult) {
            state.inputValue = state.reverseSearchResult;
            state.cursorPosition = state.reverseSearchResult.length;
          }
          state.reverseSearchMode = false;
          state.reverseSearchQuery = "";
          state.reverseSearchResult = null;
        });
      },

      setReverseSearchQuery: (query: string) => {
        set((state) => {
          state.reverseSearchQuery = query;
          // Search history from the end
          const match = state.history
            .slice()
            .reverse()
            .find((h) => h.includes(query));
          state.reverseSearchResult = match ?? null;
        });
      },

      updateCwd: (cwd: string) => {
        set((state) => {
          state.cwd = cwd;
        });
      },
    }))
  );
}

// Simple alias expansion — checks env for alias_<name> entries
function expandAliases(
  input: string,
  env: Record<string, string>
): string {
  const parts = input.split(" ");
  const cmd = parts[0];
  const aliasKey = `alias_${cmd}`;
  if (env[aliasKey]) {
    return env[aliasKey] + " " + parts.slice(1).join(" ");
  }
  return input;
}

export type TerminalStoreInstance = ReturnType<typeof createTerminalStore>;
