import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { VirtualFileSystem } from "../filesystem/virtual-fs";
import { execute } from "../executor/executor";
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
}

export function createTerminalStore(options: TerminalStoreOptions) {
  const { fs, onCommand } = options;

  return createStore<TerminalStore>()(
    immer((set, get) => ({
      outputLines: [],
      inputValue: "",
      cursorPosition: 0,
      history: [],
      historyIndex: -1,
      suggestions: [],
      reverseSearchMode: false,
      reverseSearchQuery: "",
      reverseSearchResult: null,
      isRunning: false,
      cwd: fs.cwd,
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

        // Add input line to output
        const prompt = `user@terminal:${fs.getDisplayPath()}$ `;
        set((s) => {
          s.outputLines.push({
            id: nextLineId(),
            type: "stdin",
            content: prompt + trimmed,
          });
          s.inputValue = "";
          s.cursorPosition = 0;
          s.historyIndex = -1;
          s.suggestions = [];
          s.reverseSearchMode = false;
          s.reverseSearchQuery = "";
          s.reverseSearchResult = null;
        });

        if (!trimmed) return;

        // Add to history
        set((s) => {
          if (s.history[s.history.length - 1] !== trimmed) {
            s.history.push(trimmed);
          }
        });

        // Handle alias expansion
        const expandedRaw = expandAliases(trimmed, state.env);

        // Execute the command
        const result = execute(expandedRaw, fs, state.env, state.history);

        // Check for clear command
        if (result.output === "\x1Bclear") {
          set((s) => {
            s.outputLines = [];
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
