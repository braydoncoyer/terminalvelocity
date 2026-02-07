"use client";

import { useSuggestions } from "@/lib/terminal/state/terminal-context";

export function TerminalSuggestions() {
  const suggestions = useSuggestions();
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 pb-2 font-mono text-[13px] text-fg-muted">
      {suggestions.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>
  );
}
