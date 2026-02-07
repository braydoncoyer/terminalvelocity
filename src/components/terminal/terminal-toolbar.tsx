"use client";

export function TerminalToolbar({ title }: { title?: string }) {
  return (
    <div className="flex h-8 items-center gap-2 border-b border-bg-3 px-3">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      {title && (
        <span className="ml-2 text-xs text-fg-muted">{title}</span>
      )}
    </div>
  );
}
