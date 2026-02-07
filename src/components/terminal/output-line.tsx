"use client";

import { OutputLine } from "@/types/common";

const typeStyles: Record<OutputLine["type"], string> = {
  stdin: "text-fg-muted",
  stdout: "text-fg",
  stderr: "text-error",
  system: "text-fg-muted italic",
};

export function TerminalOutputLine({ line }: { line: OutputLine }) {
  return (
    <div className={`whitespace-pre-wrap break-all font-mono text-[13px] leading-[1.6] ${typeStyles[line.type]}`}>
      {line.content}
    </div>
  );
}
