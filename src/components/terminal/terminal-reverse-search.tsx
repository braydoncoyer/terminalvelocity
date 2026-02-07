"use client";

import { useReverseSearch } from "@/lib/terminal/state/terminal-context";

export function TerminalReverseSearch() {
  const { active, query, result } = useReverseSearch();

  if (!active) return null;

  return (
    <div className="px-3 pb-2 font-mono text-[13px] text-fg-muted">
      <span>(reverse-i-search)`</span>
      <span className="text-accent">{query}</span>
      <span>&apos;: </span>
      <span className="text-fg">{result ?? ""}</span>
    </div>
  );
}
