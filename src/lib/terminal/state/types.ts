import { OutputLine } from "@/types/common";

export interface TerminalState {
  outputLines: OutputLine[];
  inputValue: string;
  cursorPosition: number;
  history: string[];
  historyIndex: number;
  suggestions: string[];
  reverseSearchMode: boolean;
  reverseSearchQuery: string;
  reverseSearchResult: string | null;
  isRunning: boolean;
  cwd: string;
  env: Record<string, string>;
  partyCount: number;
}

export interface TerminalActions {
  setInputValue: (value: string) => void;
  setCursorPosition: (pos: number) => void;
  pushOutput: (line: OutputLine) => void;
  clearOutput: () => void;
  executeCommand: (raw: string) => void;
  historyUp: () => void;
  historyDown: () => void;
  setSuggestions: (suggestions: string[]) => void;
  clearSuggestions: () => void;
  enterReverseSearch: () => void;
  exitReverseSearch: () => void;
  setReverseSearchQuery: (query: string) => void;
  updateCwd: (cwd: string) => void;
}

export type TerminalStore = TerminalState & TerminalActions;
