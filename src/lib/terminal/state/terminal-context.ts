"use client";

import { createContext, useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import type { TerminalStoreInstance } from "./create-terminal-store";
import type { TerminalStore } from "./types";
import type { OutputLine } from "@/types/common";

export const TerminalStoreContext =
  createContext<TerminalStoreInstance | null>(null);

function useTerminalStore(): TerminalStoreInstance {
  const store = useContext(TerminalStoreContext);
  if (!store) {
    throw new Error("useTerminalStore must be used within a TerminalProvider");
  }
  return store;
}

// Typed selector hooks — components MUST use these, never raw store access

export function useOutputLines(): OutputLine[] {
  const store = useTerminalStore();
  return useStore(store, (s) => s.outputLines);
}

export function useInputValue(): string {
  const store = useTerminalStore();
  return useStore(store, (s) => s.inputValue);
}

export function useCursorPosition(): number {
  const store = useTerminalStore();
  return useStore(store, (s) => s.cursorPosition);
}

export function useHistoryNavigation() {
  const store = useTerminalStore();
  return useStore(
    store,
    useShallow((s: TerminalStore) => ({
      historyUp: s.historyUp,
      historyDown: s.historyDown,
    }))
  );
}

export function useSuggestions(): string[] {
  const store = useTerminalStore();
  return useStore(store, (s) => s.suggestions);
}

export function useReverseSearch() {
  const store = useTerminalStore();
  return useStore(
    store,
    useShallow((s: TerminalStore) => ({
      active: s.reverseSearchMode,
      query: s.reverseSearchQuery,
      result: s.reverseSearchResult,
      enter: s.enterReverseSearch,
      exit: s.exitReverseSearch,
      setQuery: s.setReverseSearchQuery,
    }))
  );
}

export function useTerminalActions() {
  const store = useTerminalStore();
  return useStore(
    store,
    useShallow((s: TerminalStore) => ({
      setInputValue: s.setInputValue,
      setCursorPosition: s.setCursorPosition,
      executeCommand: s.executeCommand,
      pushOutput: s.pushOutput,
      clearOutput: s.clearOutput,
      setSuggestions: s.setSuggestions,
      clearSuggestions: s.clearSuggestions,
    }))
  );
}

export function useCwd(): string {
  const store = useTerminalStore();
  return useStore(store, (s) => s.cwd);
}

export function useEnv(): Record<string, string> {
  const store = useTerminalStore();
  return useStore(store, (s) => s.env);
}

export function usePartyCount(): number {
  const store = useTerminalStore();
  return useStore(store, (s) => s.partyCount);
}
