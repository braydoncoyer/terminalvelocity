"use client";

export function TerminalWindowsCallout({ equivalent }: { equivalent: string }) {
  return (
    <div className="mx-3 mb-2 rounded border border-accent/20 bg-accent/5 px-3 py-1.5 font-mono text-xs text-accent">
      Windows: {equivalent}
    </div>
  );
}
