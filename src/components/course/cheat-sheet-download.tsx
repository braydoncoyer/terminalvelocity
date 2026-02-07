"use client";

import Link from "next/link";

export function CheatSheetDownload() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-accent/20 bg-accent/5 px-6 py-8 text-center">
      <div className="text-4xl font-mono font-bold text-accent">&gt;_</div>
      <h3 className="text-lg font-semibold text-fg">Your Terminal Cheat Sheet</h3>
      <p className="max-w-md text-sm text-fg-muted">
        A printable reference of every command and shortcut from the course. Save
        it as a PDF or bookmark it for quick access.
      </p>
      <Link
        href="/cheat-sheet"
        target="_blank"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        View & Download Cheat Sheet
      </Link>
    </div>
  );
}
