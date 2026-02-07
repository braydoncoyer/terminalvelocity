"use client";

import { useRef, useEffect } from "react";
import { useOutputLines } from "@/lib/terminal/state/terminal-context";
import { TerminalOutputLine } from "./output-line";

export function TerminalOutput() {
  const lines = useOutputLines();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines.length]);

  return (
    <div
      ref={scrollRef}
      role="log"
      aria-live="polite"
      className="flex-1 overflow-y-auto p-3 font-mono text-[13px] terminal-text"
    >
      {lines.map((line) => (
        <TerminalOutputLine key={line.id} line={line} />
      ))}
    </div>
  );
}
