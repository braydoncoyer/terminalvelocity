"use client";

import { useRef, useEffect } from "react";
import {
  useInputValue,
  useCursorPosition,
  useTerminalActions,
  useCwd,
} from "@/lib/terminal/state/terminal-context";
import { VirtualFileSystem } from "@/lib/terminal/filesystem/virtual-fs";

// We need the display path, derive from cwd
function displayPath(cwd: string): string {
  if (cwd === "/home/user") return "~";
  if (cwd.startsWith("/home/user/")) return "~/" + cwd.slice(11);
  return cwd;
}

export function TerminalInputLine() {
  const inputValue = useInputValue();
  const cursorPos = useCursorPosition();
  const cwd = useCwd();
  const { setInputValue, setCursorPosition, executeCommand } = useTerminalActions();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const beforeCursor = inputValue.slice(0, cursorPos);
  const atCursor = inputValue[cursorPos] ?? " ";
  const afterCursor = inputValue.slice(cursorPos + 1);
  const prompt = `user@terminal:${displayPath(cwd)}$ `;

  return (
    <div
      className="flex items-start p-3 pt-0 font-mono text-[13px] leading-[1.6] cursor-text terminal-text"
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <span className="shrink-0 select-none">
        <span className="text-fg-muted">user@terminal</span>
        <span className="text-fg-muted">:</span>
        <span className="text-fg">{displayPath(cwd)}</span>
        <span className="text-accent">$ </span>
      </span>
      <span className="relative whitespace-pre-wrap break-all">
        <span>{beforeCursor}</span>
        <span className="relative inline-block">
          <span className="animate-blink absolute left-0 top-0 h-full w-[2px] bg-accent" />
          <span className={inputValue[cursorPos] ? "" : "\u00A0"}>
            {atCursor}
          </span>
        </span>
        <span>{afterCursor}</span>
      </span>
      <input
        ref={hiddenInputRef}
        className="absolute -left-[9999px] opacity-0"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onSelect={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.selectionStart !== null) {
            setCursorPosition(target.selectionStart);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            executeCommand(inputValue);
          }
        }}
        aria-label="Terminal input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
}
