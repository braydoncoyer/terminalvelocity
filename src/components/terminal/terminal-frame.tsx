"use client";

import { useRef, useCallback } from "react";
import {
  useInputValue,
  useCursorPosition,
  useTerminalActions,
  useHistoryNavigation,
  useReverseSearch,
} from "@/lib/terminal/state/terminal-context";
import {
  buildShortcutKey,
  getShortcutHandler,
} from "@/lib/terminal/keyboard/shortcuts";
import { tabComplete } from "@/lib/terminal/completion/tab-completion";
import { VirtualFileSystem } from "@/lib/terminal/filesystem/virtual-fs";
import { TerminalToolbar } from "./terminal-toolbar";
import { TerminalOutput } from "./terminal-output";
import { TerminalInputLine } from "./terminal-input-line";
import { TerminalSuggestions } from "./terminal-suggestions";
import { TerminalReverseSearch } from "./terminal-reverse-search";

interface TerminalFrameProps {
  fs: VirtualFileSystem;
  title?: string;
  children?: React.ReactNode;
}

export function TerminalFrame({ fs, title, children }: TerminalFrameProps) {
  const inputValue = useInputValue();
  const cursorPosition = useCursorPosition();
  const { setInputValue, setCursorPosition, executeCommand, clearOutput, setSuggestions, clearSuggestions } =
    useTerminalActions();
  const { historyUp, historyDown } = useHistoryNavigation();
  const reverseSearch = useReverseSearch();
  const frameRef = useRef<HTMLDivElement>(null);

  const handleTab = useCallback(() => {
    const result = tabComplete(inputValue, cursorPosition, fs);
    if (result.completed && result.completed !== inputValue.split(/\s+/).pop()) {
      // Replace the last token with the completion
      const tokens = inputValue.slice(0, cursorPosition).split(/\s+/);
      tokens[tokens.length - 1] = result.completed;
      const newValue = tokens.join(" ") + inputValue.slice(cursorPosition);
      setInputValue(newValue);
      setCursorPosition(tokens.join(" ").length);
    }
    if (result.suggestions.length > 0) {
      setSuggestions(result.suggestions);
    } else {
      clearSuggestions();
    }
  }, [inputValue, cursorPosition, fs, setInputValue, setCursorPosition, setSuggestions, clearSuggestions]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Escape unfocuses
      if (e.key === "Escape") {
        (e.target as HTMLElement).blur();
        frameRef.current?.blur();
        return;
      }

      // Handle reverse search input
      if (reverseSearch.active) {
        if (e.key === "Enter") {
          e.preventDefault();
          reverseSearch.exit();
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          reverseSearch.exit();
          return;
        }
        if (e.key === "Backspace") {
          e.preventDefault();
          reverseSearch.setQuery(reverseSearch.query.slice(0, -1));
          return;
        }
        // Check for Ctrl+R to exit
        const shortcutKey = buildShortcutKey(e.nativeEvent);
        if (shortcutKey === "ctrl+r") {
          e.preventDefault();
          reverseSearch.exit();
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          reverseSearch.setQuery(reverseSearch.query + e.key);
          return;
        }
        return;
      }

      // Build shortcut key
      const shortcutKey = buildShortcutKey(e.nativeEvent);
      if (shortcutKey) {
        const handler = getShortcutHandler(shortcutKey);
        if (handler) {
          e.preventDefault();
          e.stopPropagation();
          handler({
            inputValue,
            cursorPosition,
            setInputValue,
            setCursorPosition,
            executeCommand,
            historyUp,
            historyDown,
            enterReverseSearch: reverseSearch.enter,
            exitReverseSearch: reverseSearch.exit,
            clearOutput,
            handleTab,
            reverseSearchMode: reverseSearch.active,
          });
          return;
        }
      }

      // Arrow left/right for cursor
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCursorPosition(Math.max(0, cursorPosition - 1));
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCursorPosition(Math.min(inputValue.length, cursorPosition + 1));
        return;
      }

      // Enter executes
      if (e.key === "Enter") {
        e.preventDefault();
        clearSuggestions();
        executeCommand(inputValue);
        return;
      }

      // Backspace
      if (e.key === "Backspace") {
        e.preventDefault();
        if (cursorPosition > 0) {
          const newValue =
            inputValue.slice(0, cursorPosition - 1) +
            inputValue.slice(cursorPosition);
          setInputValue(newValue);
          setCursorPosition(cursorPosition - 1);
        }
        return;
      }

      // Delete key
      if (e.key === "Delete") {
        e.preventDefault();
        if (cursorPosition < inputValue.length) {
          const newValue =
            inputValue.slice(0, cursorPosition) +
            inputValue.slice(cursorPosition + 1);
          setInputValue(newValue);
        }
        return;
      }

      // Home/End
      if (e.key === "Home") {
        e.preventDefault();
        setCursorPosition(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        setCursorPosition(inputValue.length);
        return;
      }

      // Regular character input
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        clearSuggestions();
        const newValue =
          inputValue.slice(0, cursorPosition) +
          e.key +
          inputValue.slice(cursorPosition);
        setInputValue(newValue);
        setCursorPosition(cursorPosition + 1);
      }
    },
    [
      inputValue,
      cursorPosition,
      setInputValue,
      setCursorPosition,
      executeCommand,
      historyUp,
      historyDown,
      reverseSearch,
      clearOutput,
      handleTab,
      clearSuggestions,
    ]
  );

  return (
    <div
      ref={frameRef}
      role="application"
      aria-label="Terminal"
      tabIndex={0}
      onKeyDownCapture={handleKeyDown}
      className="flex flex-col overflow-hidden rounded-lg border border-bg-3 bg-bg-1 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    >
      <TerminalToolbar title={title} />
      <TerminalOutput />
      <TerminalSuggestions />
      <TerminalReverseSearch />
      <TerminalInputLine />
      {children}
    </div>
  );
}
